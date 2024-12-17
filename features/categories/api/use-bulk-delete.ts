import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {client} from "@/lib/hono"


type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"]

export const useBulkDelete = ()=>{

    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>
    ({
        mutationFn : async(json)=>{
            const response = await client.api.categories["bulk-delete"]["$post"]({json});

            return await response.json();
        },
        onSuccess:()=>{
            toast.success("Categories Deleted");
            queryClient.invalidateQueries({queryKey:['categories']});
        },
        onError:(error)=>{
            console.error(error);
            toast.error("Failed to delete category");
        }
    })

    

}
