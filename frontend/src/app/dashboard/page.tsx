import ProductCard from "../components/ProductCard/ProductCard";
import { getProductsData } from "../services/auth/products-service";
import { IProduct } from "../shared/models/Products";

const Dashboard = async () => {
  const products = await getProductsData();
  return (
    <div className="auction-container">
      {products?.data?.map((product: IProduct) => {
        return <ProductCard product={product} />;
      })}
    </div>
  );
};

export default Dashboard;
