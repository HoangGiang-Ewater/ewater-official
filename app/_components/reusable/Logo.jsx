import Image from "next/image";
import Link from "next/link";

function Logo({ mode = "light" }) {
  return (
    <Link href={"/"} className="shrink-0">
      <Image
        src={mode === "dark" ? "/ewater-logo.svg" : "/ewater-logo-dark.svg"}
        alt="EWater"
        width={100}
        height={100}
        className="shrink-0"
      />
    </Link>
  );
}

export default Logo;
