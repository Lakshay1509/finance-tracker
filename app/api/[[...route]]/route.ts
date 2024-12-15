
import { Hono } from 'hono'
import { handle } from 'hono/vercel'


import accounts from './account'
import { HTTPException } from 'hono/http-exception'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.onError((e, c) => {
  if(e instanceof HTTPException){
    return e.getResponse();
  }

  return c.json({error : "Internal Server Error"},500)
})

const routes = app
  .route("/accounts",accounts)

export const GET = handle(app)
export const POST = handle(app)


export type Apptype = typeof routes;