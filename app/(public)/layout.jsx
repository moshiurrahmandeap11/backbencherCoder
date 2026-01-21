import Footer from "../components/HomeItems/Footer/Footer";
import Navbar from "../components/sharedItems/Navbar/Navbar";


export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
