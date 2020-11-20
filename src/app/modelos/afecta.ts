export interface Afecta {
  id: number;
  cuenta: string;
  debe: number;
  haber: number;
  fecha?: string;
  descripcion?: string;
  afecta?: number[];
}
