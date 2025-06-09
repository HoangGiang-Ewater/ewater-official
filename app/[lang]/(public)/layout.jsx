import Footer from "@/app/_components/_layout/Footer";
import Header from "@/app/_components/_layout/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <Header mode="dark" />
      {children}
      <Footer />
    </ReactQueryProvider>
  );
}
