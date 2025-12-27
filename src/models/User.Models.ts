import { BaseModel } from './Base.Models';

export class UserModel extends BaseModel {
  public name?: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public lastLogin?: string;
}