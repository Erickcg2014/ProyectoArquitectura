export interface Payment {
  id?: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
  createdAt?: string;
}