import MediaMain from "./MediaMain";

export const metadata = {
  title: "Media",
  description: "Manage your media files",
};

function page() {
  return (
    <div className="max-w-6xl mx-auto p-4 min-w-[300px] md:min-w-[600px] lg:max-w-[1080px]">
      <MediaMain />
    </div>
  );
}

export default page;
