import { Image } from "./image";

export interface AddForCar{
  brandId:number,
  colorId:number,
  modelName:string,
  dailyPrice:number,
  modelYear:number,
  description:string,
  images:Image[]
}
