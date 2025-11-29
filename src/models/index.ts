import { UserModel } from "./User.Models"

export class ResponseModel<T> {
  data!: T
  status!: number
  message!: string
  success!: boolean
}

export class PageModel<T> {
  public items!: Array<T>;
  public total!: number;
  public currentPage!: number;
  public lastPage!: number;
}

export {
  UserModel,
}