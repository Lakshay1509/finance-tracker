import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]

export const useEditAccount = (id?:string)=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.accounts[":id"]["$patch"]({
                json,
                param : {id}
            })

            return response.json();
        },
        onSuccess:()=>{
            toast.success("Account Updated");
            queryClient.invalidateQueries({queryKey:['accounts']});
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to update account");
        }
    })

    

}

