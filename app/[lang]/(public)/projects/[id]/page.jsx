import PageHeader from "@/app/_components/reusable/PageHeader";
import { cn } from "@/lib/utils";
import Image from "next/image";

function page({}) {
  const project = {
    id: "#kdkfj3",
    name: "Ứng phó biến đổi khí hậu vùng Đồng bằng Sông Cửu Long",
    description: "Dự án của chúng tôi",
    createdDate: "2021-09-01",
    thumbnail: "/images/project-thumbnail.jpg",
    video: "/videos/about-us-video.mp4",
    images: [
      "/images/post_image_placeholder.jpg",
      "/images/post_image_placeholder.jpg",
    ],
    contents: [
      {
        title: "Content 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nemo sapiente excepturi, perspiciatis aspernatur tempora nobis, amet reprehenderit veniam est quisquam nesciunt praesentium sunt deleniti, ex nam consectetur libero unde?",
        images: ["/images/post_image_placeholder.jpg"],
      },
      {
        title: "Content 2",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad inventore explicabo ipsa accusamus voluptatem odit atque exercitationem accusantium hic quia. Non error maxime, harum temporibus voluptates repellat quam fugit eveniet.
      Voluptate id sapiente repudiandae? Recusandae, at aut harum tempora ipsa nemo ratione ab illum, dicta magni illo rerum possimus excepturi, rem necessitatibus perferendis voluptates perspiciatis id dolores suscipit incidunt obcaecati?
      Sequi odio, odit repudiandae asperiores consectetur nisi sit commodi corporis esse quaerat numquam eveniet placeat dolor quisquam, facilis in sapiente, est ipsam possimus accusantium corrupti eos delectus modi. Accusantium, maiores.
      Tempora impedit, ut ea autem et, vitae nemo perferendis nulla doloremque, labore atque sed cumque ex alias maiores laboriosam blanditiis? Nam aspernatur optio facilis veritatis dolores accusamus amet dolore quae!
      Hic totam aspernatur necessitatibus. Vitae minus nesciunt nobis nostrum et, assumenda, corporis voluptates non eaque voluptatibus libero dolor doloremque quia laudantium. Saepe vero placeat nemo, magni inventore totam repellendus quae!`,
        images: [
          "/images/post_image_placeholder.jpg",
          "/images/post_image_placeholder.jpg",
          "/images/post_image_placeholder.jpg",
        ],
      },
      {
        title: "Content 3",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad inventore explicabo ipsa accusamus voluptatem odit atque exercitationem accusantium hic quia. Non error maxime, harum temporibus voluptates repellat quam fugit eveniet.
      Voluptate id sapiente repudiandae? Recusandae, at aut harum tempora ipsa nemo ratione ab illum, dicta magni illo rerum possimus excepturi, rem necessitatibus perferendis voluptates perspiciatis id dolores suscipit incidunt obcaecati?
      Sequi odio, odit repudiandae asperiores consectetur nisi sit commodi corporis esse quaerat numquam eveniet placeat dolor quisquam, facilis in sapiente, est ipsam possimus accusantium corrupti eos delectus modi. Accusantium, maiores.
      Tempora impedit, ut ea autem et, vitae nemo perferendis nulla doloremque, labore atque sed cumque ex alias maiores laboriosam blanditiis? Nam aspernatur optio facilis veritatis dolores accusamus amet dolore quae!
      Hic totam aspernatur necessitatibus. Vitae minus nesciunt nobis nostrum et, assumenda, corporis voluptates non eaque voluptatibus libero dolor doloremque quia laudantium. Saepe vero placeat nemo, magni inventore totam repellendus quae!`,
        images: [
          "/images/post_image_placeholder.jpg",
          "/images/post_image_placeholder.jpg",
          "/images/post_image_placeholder.jpg",
          "/images/post_image_placeholder.jpg",
          "/images/post_image_placeholder.jpg",
        ],
      },
    ],
  };

  return (
    <div className="mt-32">
      <div role="post" className="max-w-5xl mx-auto py-10 px-5 lg:px-0">
        <PageHeader title={"project"} />
        <h1 className="text-4xl font-semibold mt-8">{project.name}</h1>
        {project.contents.map((content, index) => (
          <div key={index} className="mt-10">
            <h2 className="text-2xl font-semibold">{content.title}</h2>
            <p className="mt-5">{content.description}</p>
            <div
              className={cn(
                "gap-5 mt-5 grid",
                `grid-cols-${
                  content.images.length > 3 ? 3 : content.images.length
                }`,
                {
                  "md:grid-cols-2": content.images.length > 1,
                  "lg:grid-cols-3": content.images.length > 3,
                }
              )}
            >
              {content.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="content"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
