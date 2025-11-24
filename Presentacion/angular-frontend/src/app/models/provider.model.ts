export interface ProviderOrder {
  id: number;
  orderId: number;
  customerName: string;
  customerEmail: string;
  products: ProviderOrderItem[];
  total: number;
  status: string;
  orderDate: string;
  shippingAddress: string;
}

export interface ProviderOrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ProviderOrderSummary {
  id: number;
  orderId: number;
  customerName: string;
  total: number;
  status: string;
  date: string;
  itemCount: number;
}