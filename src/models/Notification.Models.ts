import { BaseModel } from './Base.Models';

export class NotificationModel extends BaseModel {
  public patient_id!: string;
  public patient_name!: string;
  public total_attendance_count!: number;
  public amount_paid!: number;
  public total_bill!: number;
  public is_read!: number;
  public message!: string;
}