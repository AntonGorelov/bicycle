import { IProduct } from './product.interface';

export interface ICompany {
  name: string;
  about: string;
  products: IProduct[];
}
