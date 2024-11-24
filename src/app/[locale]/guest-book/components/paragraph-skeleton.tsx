import { Skeleton } from './skeleton'

function ParagraphSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export default ParagraphSkeleton
