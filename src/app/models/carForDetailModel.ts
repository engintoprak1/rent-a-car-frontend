import { Image } from "./image";

export interface CarForDetailModel{
  brandName:string,
  modelName:string,
  colorName:string,
  description:string,
  images : Image[],
  dailyPrice:string,
  modelYear:number
}
