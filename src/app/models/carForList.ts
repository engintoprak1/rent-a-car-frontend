import { Image } from "./image";

export interface CarForList{
  id:number,
  brandName:string,
  modelName:string,
  description:string,
  colorName:string,
  dailyPrice:number,
  availableForRent:boolean,
  image: Image
}
