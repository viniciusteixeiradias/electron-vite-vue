export interface BackDisplay {
  clean(): Promise<void>;
  showPrice(value: number): Promise<void>;
  showTotal(value: number): Promise<void>;
  showCollect(value: number): Promise<void>;
  showChange(value: number): Promise<void>;
}
