export interface Recommendation {
  id: number;
  productId: number;
  userId: number;
  score: number;
  reason: string;
  createdAt?: string;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  products: any[]; // Productos recomendados
}