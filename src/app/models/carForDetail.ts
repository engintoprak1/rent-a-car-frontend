import { Image } from "./image";

export interface CarForDetail{
  id:number;
  brandName:string,
  modelName:string,
  colorName:string,
  description:string,
  images : Image[],
  dailyPrice:number,
  modelYear:number,
  findeks:number
}
