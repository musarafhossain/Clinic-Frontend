import { BaseModel } from './Base.Models';

export class Patient {
  public id!: string;
  public name?: string;
}

export class PaymentHistoryModel extends BaseModel {
  public patient?: Patient;
  public amount!: string;
  public note?: string;
}