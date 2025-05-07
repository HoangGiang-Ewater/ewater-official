import HeaderTag from "@/app/_components/reusable/HeaderTag";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";

function ContactInformations() {
  return (
    <div className="max-w-5xl my-16 mx-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div role="contact-information" className="p-5 lg:p-0">
          <HeaderTag className="text-foreground">
            EWATER - INFORMATIONS
          </HeaderTag>
          <h2 className="font-semibold text-lg mt-5">THÔNG TIN CHÍNH THỨC</h2>
          <h4 className="text-base font-bold mt-5">CÔNG TY CỔ PHẦN EWATER</h4>
          <p className="text-base mt-5">MST: 0315118703</p>
          <p className="text-base mt-5 flex gap-5">
            <MapPinIcon />
            21 Lô K, KDC Phú Nhuận, Đường 659, Phường Phước Long B, Tp. Thủ Đức,
            Tp.HCM
          </p>
          <p className="text-base mt-5 flex gap-5">
            <PhoneIcon />
            028 2210 9676
          </p>
          <p className="text-base mt-5 flex gap-5">
            <MailIcon />
            ewater.corp@gmail.com
          </p>
        </div>
        <div
          role="contact-banner"
          className="bg-gray-300 relative min-h-[300px]"
        >
          <Image
            src={"/backgrounds/fields-of-operation-bg.png"}
            alt="contact banner"
            fill
            sizes="500"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactInformations;
