export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  monthlyGrowth: number;
  pendingOrders: number;
  lowStockProducts: number;
  recentOrders: OrderSummary[];
  salesByCategory: CategorySales[];
  revenueChart: ChartData[];
}

export interface OrderSummary {
  id: number;
  customerName: string;
  total: number;
  status: string;
  date: string;
}

export interface CategorySales {
  category: string;
  sales: number;
  percentage: number;
}

export interface ChartData {
  label: string;
  value: number;
  date?: string;
}

export interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  growth: number;
}

export interface ProductAnalytics {
  productId: number;
  name: string;
  sales: number;
  revenue: number;
  views: number;
  conversionRate: number;
}