export interface ISeat {
  id: number;
  seat_number: string;
  created_at: string;
  user_name: string;
  user_email: string;
  product_name: string;
  product_description: string;
  product_price: string;
  product_image: string;
  last_date_bid: string;
}
export interface ISeatPayload {
  productId: number;
  seatNumber: string;
  userId: number;
}
