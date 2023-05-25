import { Injectable } from "@angular/core";


@Injectable()
export class Product{
    productID: string;
    category: string;
    categoryID: string;
    subCategory: string;
    subCategoryID: string;
    name: string;
    description: string;
    brand: string;
    brandID: string;
    varient: [];
}