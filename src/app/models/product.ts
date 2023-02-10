import { Category } from './category';

export interface Product {
  name: string;
  createdAt: Date;
  haveStock?: number;
  stock: number;
  price: number;
  truePrice: number;
  categories: Category[];
  productImage: File & string;
}
