import { TABLE_ELEMENT_FIELD_TYPE } from "../enums/common.enum";

export interface ITableElement<T> {
  field: T;
  title: string;

  fieldType?: TABLE_ELEMENT_FIELD_TYPE;

  child?: ITableElement<T>[];
  index?: number;
  sortField?: string;
  get?: Function;
  colSpan?: number;
  rowSpan?: number;
  translateTitle?: boolean;
  width: number | string | null;
  align?: 'center' | 'right' | 'left';
  padding?: string;

  isUnix?: boolean;

  value?: any;
  show?: boolean;
  notAllowHide?: boolean;
  sortOrder: null | 'asc' | 'desc';
  showSort: boolean;
  isHide?: boolean;
  isLock?: boolean;
}

export interface ITableLayoutProps {
  data?: any[];
  expandFilter?: boolean;
  showExpand?: boolean;
  showReset?: boolean;
  showRefresh?: boolean;
  showExportExcel?: boolean;
  showDefaultButtons?: boolean;
  showSummarize?: boolean;
  showPagination?: boolean;
  minWidth?: number;
  maxHeight?: string;
  no_data_msg?: string;
  showTable?: boolean;
  param?: IApiBaseMeta;
  alertReset?: boolean;
  nzWidthConfig?: string[];
  nzPageSizeOptions?: number[];
}

export interface IApiBaseMeta {
  // updatedAt?: number;
  // sort?: any[];
  // filter?: any[];

  pageNumber: number,
  pageSize: number;
  totalPages: number;
  totalElements?: number;
}
