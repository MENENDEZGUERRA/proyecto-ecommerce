export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPercentage: number;
    imageUrl: string;
  }

  export interface Comment {
    id: string;
    productId: number;
    text: string;
    timestamp: number;
  }