import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-new-category";
import { Loader2 } from "lucide-react";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  
  const CategoryQuery = useGetCategory(id);
  const editCategory = useEditCategory(id)
  const isLoading = CategoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editCategory.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = CategoryQuery.data?{
    name: CategoryQuery.data.name,
  }:{
    name: "",
  }

  const isPending  = editCategory.isPending

 

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-white font-primary">
            Edit Category
          </SheetTitle>

          <SheetDescription className="font-primary text-sm">
            Edit an existing category
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <CategoryForm
            onSubmit={onSubmit}
            disabled={isPending}
            initialValues={defaultValues}
            id={id}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
