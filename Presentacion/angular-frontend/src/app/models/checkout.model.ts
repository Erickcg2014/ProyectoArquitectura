export interface UserAddress {
  id?: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
  name: string;
  lastFour?: string;
  expiryDate?: string;
}

export interface CheckoutData {
  address: UserAddress;
  paymentMethod: PaymentMethod;
  orderNotes?: string;
}