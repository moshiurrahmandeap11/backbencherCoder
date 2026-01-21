import Banner from "../components/HomeItems/Banner/Banner";
import Products from "../components/HomeItems/Products/Products";
import Services from "../components/HomeItems/Services/Services";
import Subscribe from "../components/HomeItems/Subscribe/Subscribe";

export default function Home() {
  return (
    <div>
      <Banner />
      <Products />
      <Services />
      <Subscribe />
    </div>
  );
}
