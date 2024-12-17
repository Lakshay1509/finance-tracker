import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import {z} from 'zod';
import { useCreateNewCategory } from "../api/use-create-new-category";

const formSchema = insertCategorySchema.pick({
    name:true,
})

type FormValues = z.infer<typeof formSchema>;

export const NewCategorySheet = () => {

    const {isOpen,onClose} =  useNewCategory();

    const mutation = useCreateNewCategory();

    const onSubmit = (values:FormValues)=>{
    mutation.mutate(values,{
        onSuccess:()=>{
            onClose();
        }
    })
    

    }

    
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent >
        <SheetHeader>
          <SheetTitle className="text-white font-primary">New Category</SheetTitle>
        
        <SheetDescription className="font-primary text-sm">
          Create a new catego 
        </SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} initialValues={{name:""}}/>
      </SheetContent>
    </Sheet>
  );
};
