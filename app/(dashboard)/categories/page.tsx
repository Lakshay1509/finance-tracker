"use client"

import { Button } from '@/components/ui/button'
import {Card,CardContent,CardHeader,CardTitle} from '@/components/ui/card'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/Data-Table'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDelete } from '@/features/categories/api/use-bulk-delete'


const page = () => {

  const newCategory = useNewCategory()

  const categoryQuery = useGetCategories();
  const categories = categoryQuery.data || [];

  const deleteCategory = useBulkDelete()

  const isDisabled = categoryQuery.isLoading || deleteCategory.isPending

  if(categoryQuery.isLoading){
    return(
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24 '>
         <Card className='border border-white drop-shadow-sm font-primary text-black bg-white '>
         <CardHeader >
            <Skeleton className='h-8 w-48 '/>
         </CardHeader>
         <CardContent>
          <div className='h-[500px] w-full flex items-center justify-center'>

            <Loader2 className='size-6 text-slate-300 animate-spin'/>

          </div>
         </CardContent>
         </Card>
      </div>

    )
  }
 
  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24 '>
      <Card className='border border-white drop-shadow-sm font-primary text-black bg-white '>
        <CardHeader className='gap-y-2
         lg:flex-row lg:items-center lg:justify-between '>
          <CardTitle className='text-xl line-clamp-1'>Categories Page</CardTitle>
        
        <Button size="sm" onClick={newCategory.onOpen}>
          <Plus className='mr-2 size-4' />
          Add new 
        </Button>

        </CardHeader>

        <CardContent >
          <DataTable columns={columns} data={categories} onDelete={(row)=>{
            const ids = row.map((r)=>r.original.id)
            deleteCategory.mutate({ids})
          }} filterKey='name' disabled={isDisabled}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default page