import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.categories.$post>
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]

export const useCreateNewCategory = ()=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.categories.$post({json});

            return response.json();
        },
        onSuccess:()=>{
            toast.success("Category created successfully");
            queryClient.invalidateQueries({queryKey:['categories']});
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to create category");
        }
    })

    

}

