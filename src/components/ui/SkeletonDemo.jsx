import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4 pt-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-500" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px] bg-gray-500" />
        <Skeleton className="h-4 w-[200px] bg-gray-500" />
      </div>
    </div>
  )
}
