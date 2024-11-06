'use client'

import { Pagination } from '@nextui-org/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FriendlyPagination from './friendly-pagination'

interface QueryPaginationProps {
    totalPages: number
    itemsPerPage: number
    totalItems: number
  }
  
  export default function QueryPagination({
    totalPages,
    itemsPerPage,
    totalItems,
  }: QueryPaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
  
    const router = useRouter()
    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams)
  
      params.set('page', pageNumber.toString())
  
      router.push(`${pathname}?${params.toString()}`)
    }
  
    return (
      <section className="my-10 flex flex-col items-center justify-between sm:flex-row">
        <FriendlyPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
        <Pagination
          showControls
          initialPage={1}
          page={currentPage}
          total={totalPages}
          onChange={createPageURL}
        />
      </section>
    )
  }