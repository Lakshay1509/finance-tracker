import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { insertCategorySchema } from '@/db/schema';
import { cn } from "@/lib/utils";
import{
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,

} from '@/components/ui/form';



const formSchema = insertCategorySchema.pick({
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


export const CategoryForm= ({id,initialValues,onSubmit,onDelete,disabled}:Props)=>{



    const form = useForm<FormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialValues,
    })

    const handleSubmit  = (values:FormValues)=>{
        onSubmit(values);
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
                            placeholder='eg. Food & Drinks'
                            {...field}
                            />
                        </FormControl>
                    </FormItem>
                ) }
                />
                
                <Button className={cn("w-full text-black font-primary")} type='submit' variant="ghost"
                disabled={disabled}>
                    {id ? 'Update Category' : 'Create Category'}
                </Button>
                
                

            </form>

        </Form>

    )
}