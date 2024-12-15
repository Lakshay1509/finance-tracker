import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";
import { inserAccountSchema } from "@/db/schema";
import {z} from 'zod';
import { useCreateNewAccount } from "../api/use-create-new-account";

const formSchema = inserAccountSchema.pick({
    name:true,
})

type FormValues = z.infer<typeof formSchema>;

export const NewAccountSheet = () => {

    const {isOpen,onClose} =  useNewAccount();

    const mutation = useCreateNewAccount();

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
          <SheetTitle className="text-white font-primary">New Account</SheetTitle>
        
        <SheetDescription className="font-primary text-sm">
          Create a new account to track your expenses and income.
        </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending}/>
      </SheetContent>
    </Sheet>
  );
};
