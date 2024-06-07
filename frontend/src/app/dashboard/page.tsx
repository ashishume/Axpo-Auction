import { IProduct } from "../shared/models/Products";
import "./style.scss";
async function getData() {
  const res = await fetch("http://localhost:7000/api/v1/products");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <div className="auction-container">
      {data?.data?.map((product: IProduct) => {
        return (
            <div key={product.id} className="card">
            <div className="card-header">{product.name}</div>
            <div className="card-body">
              <img src={product.product_image} alt={product.name} className="product-image" />
              <p>{product.description}</p>
              <div className="price">Min Bid Price: ${product.min_bid_price}</div>
            </div>
            <div className="card-footer">
              Last Date to Bid: {new Date(product.last_date_bid).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
