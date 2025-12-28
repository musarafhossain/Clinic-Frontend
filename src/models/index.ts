import { UserModel } from "./User.Models"
import { DiseaseModel } from "./Disease.Models"
import { PatientModel } from "./Patient.Models"
import { PaymentHistoryModel } from "./PaymentHistory.Model"
import { LoginModel } from "./Auth.Models"
import { LoginResponseModel } from "./Auth.Models"
import { StatModel } from "./StatModel"
import { NotificationModel } from "./Notification.Models"

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
  public unreadCount?: number;
}

export {
  UserModel,
  DiseaseModel,
  PatientModel,
  LoginModel,
  LoginResponseModel,
  PaymentHistoryModel,
  StatModel,
  NotificationModel,
}