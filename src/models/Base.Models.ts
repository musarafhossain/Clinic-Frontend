export abstract class BaseModel {
  public uuid?: string;
  public createdAt?: number;
  public updatedAt?: number;
  public createdBy?: string;
  public updatedBy?: string;
}

export class States {
  [key: string]: unknown;
}