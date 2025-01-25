import "./App.css";
import Banner from "./components/Shared/Banner";
import ProductSec from "./components/Shared/ProductSec";
import SingleProductPage from "./components/Shared/SingleProductPage";

function App() {
  return (
    <div className="">
      <div className="h-screen">
        <Banner />
      </div>

      <ProductSec />
      <SingleProductPage />
    </div>
  );
}

export default App;
