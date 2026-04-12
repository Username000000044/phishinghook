import { DNavigation } from "@/components/DNavigation";

export function DashboardPage() {
  return (
    <div className="grid-col-layout container">
      <div className="relative col-span-full lg:col-start-4 lg:col-end-10">
        <DNavigation />
      </div>
    </div>
  );
}
