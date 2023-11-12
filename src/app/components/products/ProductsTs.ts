 
 export interface ProductsTs {
    brand: string;
    category: string;
    description: string;
    discountPercentage: string;
    images: ImageData;
    thumbnail: ImageData;
    title: string;
    id: number;
    rating:number;
    price:any;
  }
  export interface ImageTs {
    images: ImageData;
  }