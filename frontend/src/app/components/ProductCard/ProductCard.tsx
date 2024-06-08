// "use client";
import React, { useRef, useState } from "react";
import { IProduct } from "../../shared/models/Products";
import "./style.scss";
import CustomTooltip from "../Tooltip/Tooltip";
import Tooltip from "../Tooltip/Tooltip";


const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div key={product.id} className="card">
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

        <div className="price">Min Bid Price: ${product.min_bid_price}</div>
      </div>
      <div className="card-footer">
        Last Date to Bid: {new Date(product.last_date_bid).toDateString()}
      </div>
    </div>
  );
};

export default ProductCard;
