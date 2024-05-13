import { ItemCategory } from './item-category';

export class Item {
      id!: number;
      name!: string;
      description!: string;
      quantity!: number;
      unitPrice!: number;
      expiryDate!: Date; 
      category!: ItemCategory;
}
