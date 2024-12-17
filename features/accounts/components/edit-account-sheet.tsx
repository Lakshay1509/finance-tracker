import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { inserAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { useEditAccount } from "../api/use-edit-new-account";
import { Loader2 } from "lucide-react";

const formSchema = inserAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  
  const accountQuery = useGetAccount(id);
  const editAccount = useEditAccount(id)
  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editAccount.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = accountQuery.data?{
    name: accountQuery.data.name,
  }:{
    name: "",
  }

  const isPending  = editAccount.isPending

 

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-white font-primary">
            Edit Account
          </SheetTitle>

          <SheetDescription className="font-primary text-sm">
            Edit an existing account
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
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
