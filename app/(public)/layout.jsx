import Navbar from "../components/sharedItems/Navbar/Navbar";


export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
