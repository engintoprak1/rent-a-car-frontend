import { TokenModel } from './tokenModel';
export interface UserLoginResultModel{
  accessToken:TokenModel
  firstName:string;
  lastName:string;
}
