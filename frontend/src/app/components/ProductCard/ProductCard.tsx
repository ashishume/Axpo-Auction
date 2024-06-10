"use client";
import React from "react";
import { IProduct } from "../../shared/models/Products";
import "./style.scss";
import Tooltip from "../Tooltip/Tooltip";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/product/${product.id}`);
  };
  return (
    <div key={product.id} className="card" onClick={clickHandler}>
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <img
          src={product.product_image}
          alt={product.name}
          className="product-image"
        />
        <Tooltip content={product.description}>
          <div className="description">{product.description}</div>
        </Tooltip>

        <div className="price">Min Bid Price: ₹{product.min_bid_price}</div>
      </div>
      <div className="card-footer">
        Last Date to Bid: {new Date(product.last_date_bid).toDateString()}
      </div>
    </div>
  );
};

export default ProductCard;
