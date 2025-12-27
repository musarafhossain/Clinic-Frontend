export class PatientStatsModel {
  public total_patient!: number;
  public ongoing_patient!: number;
  public completed_patient!: number;
  public cancelled_patient!: number;
}

export class TodayStatsModel {
  public todays_attendance!: number;
  public todays_revenue!: number;
}

export class StatModel {
  public last_7_days_attendance!: number[];
  public patients_stats!: PatientStatsModel;
  public todays_stats!: TodayStatsModel;
}