export interface Order {
  id?: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt?: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}