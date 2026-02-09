import Header from "@/components/Header";
import { Empty } from "@/components/ui/empty";

export function EmailGamePage() {  
  return <div className="container flex flex-col h-screen">
    <Header />

    <div className="flex flex-1 justify-center items-center p-10 [&>*]:w-full [&>*]:h-full">
      <div className="grid grid-flow-col grid-rows-4 gap-4 max-h-150">

        {/* 1 */}
        <div className="md:col-span-3 md:row-span-3 border border-dashed">1</div>

        {/* 2 */}
        <div className="md:col-span-3 border border-dashed">2</div>

        {/* 3 */}
        <div className="md:row-span-4">
          <Empty className="border border-dashed h-full">3</Empty>
        </div>

    </div>
    </div>
  </div>
}
