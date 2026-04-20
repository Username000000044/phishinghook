import { DNavigation } from "@/components/DNavigation";

export function TeamPage() {
  return (
    <>
      <div className="grid-col-layout container gap-0">Team Page</div>

      {/* Sub Nav */}
      <div className="absolute w-full bottom-0 px-8 md:px-[8rem] pb-18">
        <DNavigation />
      </div>
    </>
  );
}
