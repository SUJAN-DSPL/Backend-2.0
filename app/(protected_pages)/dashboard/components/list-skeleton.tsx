import { Skeleton } from "@/components/ui/skeleton";

const ListSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            {Array.from({ length: 5 }, () => null).map((_, index) => (
                <div className="flex items-center space-x-4" key={index}>
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListSkeleton;
