import DetailForm from "./DetailForm";

export const metadata = {
  title: "Contact Detail",
  description: "This page displays the details of a contact.",
};

function Page() {
  return (
    <div className="max-w-5xl mx-auto p-4 min-w-[320px] md:min-w-[640px] lg:min-w-[1080px]">
      <h3 className="text-xl font-semibold mb-2">Contact Detail</h3>
      <DetailForm />
    </div>
  );
}

export default Page;
