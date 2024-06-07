export interface IProduct {
  id: number;
  name: string;
  description: string;
  min_bid_price: string | number;
  last_date_bid: string;
  product_image: string;
  created_at: string;
  isBiddingDateExpired: boolean;
}
