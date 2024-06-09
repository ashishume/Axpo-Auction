import { IProduct } from "@/app/shared/models/Products";
import { getProductsDataById } from "../../services/auth/products-service";

const ProductPage = async ({ params }: any) => {
  const response = await getProductsDataById(params?.id as string);
  const product: IProduct = response?.data;
  return (
    <div className="flex gap-8 p-8">
      <aside className="w-64 bg-white p-4 rounded-lg shadow-lg shadow-black-100">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <img src={product.product_image} />
        <p className="">{product.description}</p>
      </aside>
      <main className="flex-1 bg-white p-4 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p>{product.description}</p>
      </main>
    </div>
  );
};

export default ProductPage;
