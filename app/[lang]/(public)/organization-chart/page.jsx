import HeaderTag from "@/app/_components/reusable/HeaderTag";
import Image from "next/image";

function page() {
  return (
    <div className="max-w-5xl my-16 mx-auto mt-44">
      <HeaderTag className="text-foreground">EWATER - ORGANIZATION</HeaderTag>
      <h2 className="font-semibold text-lg mt-5 uppercase">Sơ đồ tổ chức</h2>
      <Image
        src={"/organization_chart.svg"}
        alt="Ewater - Organization chart"
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default page;
