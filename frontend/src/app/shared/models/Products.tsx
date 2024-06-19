export interface IProduct {
  id: number;
  name: string;
  description: string;
  min_bid_price: string | number;
  last_date_bid: string;
  product_image: string;
  created_at: string;
  is_bidding_date_expired: boolean;
}

export interface IChartData {
  data: { amount: string }[];
  highestBidderDetails: {
    amount: string;
    entered_at: string;
    name: string;
    email: string;
  };
}

export interface IProductPayload {
  name: string;
  description: string;
  minBidPrice: number;
  isExclusive: boolean;
  productImage: string;
  lastDateBid: string;
  createdAt: string;
}
