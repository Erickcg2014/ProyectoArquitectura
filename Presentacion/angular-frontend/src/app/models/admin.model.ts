export interface AdminMetrics {
  totalUsers: number;
  totalProviders: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersToday: number;
  pendingOrders: number;
  systemHealth: string;
  recentActivities: AdminActivity[];
  topProducts: ProductStats[];
  revenueByPeriod: RevenueData[];
}

export interface AdminActivity {
  id: number;
  type: 'user_registered' | 'order_created' | 'product_added' | 'payment_processed';
  description: string;
  timestamp: string;
  userId?: number;
  userName?: string;
}

export interface ProductStats {
  productId: number;
  name: string;
  sales: number;
  revenue: number;
  providerName: string;
}

export interface RevenueData {
  period: string;
  revenue: number;
  orders: number;
  growth: number;
}

export interface UserManagement {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'provider' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  totalOrders?: number;
  totalSpent?: number;
}

export interface SystemConfig {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  smtpConfig: SmtpConfig;
  paymentConfig: PaymentConfig;
}

export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  enabled: boolean;
}

export interface PaymentConfig {
  gatewayUrl: string;
  apiKey: string;
  enabled: boolean;
}

export interface AdminReport {
  id: number;
  name: string;
  type: 'users' | 'orders' | 'revenue' | 'products';
  dateRange: {
    start: string;
    end: string;
  };
  data: any[];
  generatedAt: string;
  generatedBy: string;
}