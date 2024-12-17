import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {and,eq, inArray} from "drizzle-orm"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { categories,insertCategorySchema } from "@/db/schema";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import {z} from "zod";



const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const data = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(
        and(
          eq(categories.userId, auth.userId),
        )
      )

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const {id} = c.req.valid("param");
      if (!id) {
        throw new HTTPException(400, {
          res: c.json({ error: "Missing Id" }, 400),
        });
      }

      if(!auth?.userId){
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const [data]= await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(
        and(
          eq(categories.userId, auth.userId),
          eq(categories.id, id)
        )
      );

      if(!data){
        throw new HTTPException(404, {
          res: c.json({ error: "Not Found" }, 404),
        });
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertCategorySchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const [data] = await db
        .insert(categories)
        .values({
          userId: auth.userId,
          ...values,
          id: createId(),
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string())
      }),
    ),

    async (c)=>{
      const auth = getAuth(c);
      const value = c.req.valid("json");
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const data = await db
        .delete(categories)
        .where(
         and (
          eq(categories.userId, auth.userId),
          inArray(categories.id, value.ids)
         )
        )
        .returning({id:categories.id});

      return c.json({ data  });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string().optional() })),zValidator("json", insertCategorySchema.pick({ name: true })),
    async(c)=>{

      const auth = getAuth(c);
      const {id} = c.req.valid("param");
      const values = c.req.valid("json");


      if(!id){
        throw new HTTPException(400, {
          res: c.json({ error: "Missing Id" }, 400),
        });
      }

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }


      const [data] = await db
        .update(categories)
        .set(values)
        .where(
          and(
            eq(categories.userId, auth.userId),
            eq(categories.id, id)
          )
        )
        .returning();

      if(!data){
        throw new HTTPException(404, {
          res: c.json({ error: "Not Found" }, 404),
        });
      }

      return c.json({ data });
    }
  );
  

export default app;
