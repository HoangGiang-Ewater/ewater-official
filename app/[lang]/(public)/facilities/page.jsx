import HeaderTag from "@/app/_components/reusable/HeaderTag";
import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "../../../_components/reusable/data-table/data-table";

export const metadata = {
  title: "EWATER - Facilities",
  description: "Trang thiết bị",
};

const getFacilites = async () => {
  return [
    {
      id: 1,
      name: "Thiết bị 1",
      amount: 10,
    },
    {
      id: 2,
      name: "Thiết bị 2",
      amount: 20,
    },
    {
      id: 3,
      name: "Thiết bị 3",
      amount: 30,
    },
    {
      id: 4,
      name: "Thiết bị 4",
      amount: 40,
    },
    {
      id: 5,
      name: "Thiết bị 5",
      amount: 50,
    },
    {
      id: 6,
      name: "Thiết bị 6",
      amount: 60,
    },
    {
      id: 7,
      name: "Thiết bị 7",
      amount: 70,
    },
    {
      id: 8,
      name: "Thiết bị 8",
      amount: 80,
    },
    {
      id: 9,
      name: "Thiết bị 9",
      amount: 90,
    },
    {
      id: 10,
      name: "Thiết bị 10",
      amount: 100,
    },
    {
      id: 11,
      name: "Thiết bị 11",
      amount: 110,
    },
    {
      id: 12,
      name: "Thiết bị 12",
      amount: 120,
    },
    {
      id: 13,
      name: "Thiết bị 13",
      amount: 130,
    },
    {
      id: 14,
      name: "Thiết bị 14",
      amount: 140,
    },
    {
      id: 15,
      name: "Thiết bị 15",
      amount: 150,
    },
  ];
};

async function page() {
  const facilites = await getFacilites();

  return (
    <div>
      <Hero />
      <div className="max-w-5xl my-16 mx-auto">
        <HeaderTag className="text-foreground">EWATER - FACILITIES</HeaderTag>
        <h2 className="font-semibold text-lg my-5 uppercase">Trang thiết bị</h2>
        <DataTable columns={columns} data={facilites} />
      </div>
    </div>
  );
}

export default page;

function Hero() {
  return (
    <div className="mt-44">
      <div
        className={cn(
          "w-full h-[300px] md:h-[450px] bg-cover bg-center bg-no-repeat relative"
        )}
        style={{
          backgroundImage: "url('/backgrounds/facilities-bg.png')",
        }}
      >
        <div className="absolute max-w-5xl w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-5">
          <HeaderTag className="text-white" lineClassName="bg-white">
            EWATER
          </HeaderTag>
          <h1 className="[text-shadow:_0_4px_4px_rgb(0_0_0_/_0.8)] text-3xl md:text-6xl font-bold text-white my-5 shadow-2xl">
            TRANG THIẾT BỊ
          </h1>
          <p className="[text-shadow:_0_4px_4px_rgb(0_0_0_/_0.8)] max-w-xl text-sm md:text-base">
            EWATER sở hữu hàng loạt các trang thiết bị hiện đại, phục vụ cho đa
            dạng các loại dự án.
          </p>
        </div>
      </div>
    </div>
  );
}
