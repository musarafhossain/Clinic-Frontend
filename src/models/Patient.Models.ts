import { BaseModel } from './Base.Models';
import { GENDER, PATIENT_STATUS } from '@/helpers/enum';

export class Disease {
  public id!: string;
  public name?: string;
  public amount?: string;
}

export class Attendance {
  public is_present?: boolean;
  public patient_id?: string;
  public disease?: string;
  public amount?: string;
}

export class PatientModel extends BaseModel {
  public name!: string;
  public father_name?: string;
  public dob?: string;
  public gender?: GENDER;
  public status?: PATIENT_STATUS;
  public disease?: Disease | null;
  public phone?: string;
  public address?: string;
  public enrollment_date?: string;
  public amount_paid?: number;
  public total_bill?: number;
  public attendance?: Attendance;
}