import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateNewAccount = ()=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.accounts.$post({json});

            return response.json();
        },
        onSuccess:()=>{
            toast.success("Account created successfully");
            queryClient.invalidateQueries({queryKey:['accounts']});
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to create account");
        }
    })

    

}

