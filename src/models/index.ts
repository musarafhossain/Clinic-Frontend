import { UserModel } from "./User.Models"
import { DiseaseModel } from "./Disease.Models"
import { PatientModel } from "./Patient.Models"

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
  DiseaseModel,
  PatientModel,
}