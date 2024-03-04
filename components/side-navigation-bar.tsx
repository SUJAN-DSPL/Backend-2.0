import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SideNavigationBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SideNavigationBar({ className }: SideNavigationBarProps) {
  return (
    <div className={cn("sticky top-0 z-40 w-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-1">
          {/* <h2 className="mb-2 px-4 text-2xl font-semibold tracking-tight">
            <span className="text-primary">Cron</span> <span>Master</span>
          </h2> */}
          <div className=" mt-5"></div>
        </div>
      </div>
    </div>
  );
}
