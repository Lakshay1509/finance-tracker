import {z} from 'zod';
import {useForm} from 'react-hook-form';
import { Trash } from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { inserAccountSchema } from '@/db/schema';
import { cn } from "@/lib/utils";
import{
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage

} from '@/components/ui/form';



const formSchema = inserAccountSchema.pick({
    name:true,
})

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id? : string;
    initialValues?: FormValues;
    onSubmit:(values:FormValues)=>void;
    onDelete?:()=>void;
    disabled?:boolean;
}


export const AccountForm= ({id,initialValues,onSubmit,onDelete,disabled}:Props)=>{



    const form = useForm<FormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialValues,
    })

    const handleSubmit  = (values:FormValues)=>{
        onSubmit(values);
    }

    const handleDelete = ()=>{
        onDelete?.();
    }

    return(

        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)} >

                <FormField

                name = "name"
                control={form.control}
                render = {({field})=>(
                    <FormItem className={cn('mb-2')} >
                        <FormLabel className={cn('text-white font-primary ')}>Name</FormLabel>
                        <FormControl>
                            <Input
                            className='text-sm text-white '
                            disabled={disabled}
                            placeholder='eg.upi,cash,savings etc'
                            {...field}
                            />
                        </FormControl>
                    </FormItem>
                ) }
                />
                
                <Button className={cn("w-full text-black font-primary")} type='submit' variant="ghost"
                disabled={disabled}>
                    {id ? 'Update Account' : 'Create Account'}
                </Button>
                
                {!!id &&<Button type='button' disabled={disabled} onClick={handleDelete} className='w-full'>
                    <Trash size={24} className='mr-2'/>
                    Delete Account
                </Button>}

            </form>

        </Form>

    )
}