import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]

export const useEditCategory = (id?:string)=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.categories[":id"]["$patch"]({
                json,
                param : {id}
            })

            return response.json();
        },
        onSuccess:()=>{
            toast.success("Category Updated");
            queryClient.invalidateQueries({queryKey:['categories']});
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to update category");
        }
    })

    

}

