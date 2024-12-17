"use client"

import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal } from "lucide-react"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"


type Props={
    id:string
}

export const Actions=({id}:Props)=>{

    const {onOpen} = useOpenCategory();
    return(
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

                <DropdownMenuItem disabled={false} onClick={()=>onOpen(id)}>
                    <Edit className="size-4 mr-2"/>
                    Edit
                </DropdownMenuItem>

            </DropdownMenuContent>
            
        </DropdownMenu>
        </>
    )
}