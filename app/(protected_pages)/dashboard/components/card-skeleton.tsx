import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-4 w-[80px]" />
        </CardTitle>
        <Skeleton className="h-4 w-4" />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className=" font-bold flex items-center gap-2">
          <Skeleton className="h-8  w-[250px]" />
        </div>

        <div className="text-xs text-muted-foreground">
          <Skeleton className="h-4 w-[150divx]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
