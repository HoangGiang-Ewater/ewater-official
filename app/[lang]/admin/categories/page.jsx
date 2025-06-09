import Table from "./Table";

function page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-w-[300px] md:min-w-[600px] lg:min-w-[900px] xl:min-w-[1200px]">
      <h1 className="text-2xl font-bold mb-4">Project Categories</h1>
      <Table />
    </div>
  );
}

export default page;
