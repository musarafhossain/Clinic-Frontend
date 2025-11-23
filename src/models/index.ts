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

export class Query {
  [key: string]: unknown;
  public q: string = '';
  public page: number = 1;
  public limit: number = 25;
}

export class DataList<T extends {}> {
  public items: Array<T> = [];
  public total: number = 0;
  public hasItem?: boolean;
}

export type FileOptionsType = {
  LABEL: string;
  VALUE: string;
};