"use client"

import { Button } from '@/components/ui/button'
import {Card,CardContent,CardHeader,CardTitle} from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/Data-Table'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDelete } from '@/features/accounts/api/use-bulk-delete'



const page = () => {

  const newAccount = useNewAccount()

  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const deleteAccount = useBulkDelete()

  const isDisabled = accountsQuery.isLoading || deleteAccount.isPending

  if(accountsQuery.isLoading){
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
          <CardTitle className='text-xl line-clamp-1'>Accounts Page</CardTitle>
        
        <Button size="sm" onClick={newAccount.onOpen}>
          <Plus className='mr-2 size-4' />
          Add new 
        </Button>

        </CardHeader>

        <CardContent >
          <DataTable columns={columns} data={accounts} onDelete={(row)=>{
            const ids = row.map((r)=>r.original.id)
            deleteAccount.mutate({ids})
          }} filterKey='name' disabled={isDisabled}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default page