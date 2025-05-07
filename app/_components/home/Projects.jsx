import { supabase } from "@/lib/supabaseClient";
import ProjectsCarousel from "./ProjectsCarousel";
import ProjectsSectionTitle from "./ProjectsSectionTitle";
import { fetchProjectCategories } from "@/api/projectCategories";

async function Projects() {
  // get project categories from API
  const { data, error } = await fetchProjectCategories();

  if (error) {
    console.error("Error fetching project categories:", error);
  } else {
    console.log("Project categories: ", data);
  }

  // LATER: Get data from API
  const projects = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 7,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 8,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
    {
      id: 9,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
    },
  ];

  return (
    <div className="py-16 px-5 md:pl-52 relative">
      <ProjectsSectionTitle></ProjectsSectionTitle>
      <ProjectsCarousel projects={projects}></ProjectsCarousel>
    </div>
  );
}

export default Projects;
