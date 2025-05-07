import Footer from "@/app/_components/_layout/Footer";
import Header from "@/app/_components/_layout/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header mode="dark" />
      {children}
      <Footer />
    </>
  );
}
