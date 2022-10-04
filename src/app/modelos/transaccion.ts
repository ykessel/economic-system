export interface Transaccion {
  id: string;
  fecha: string;
  cuenta: string;
  ref: number;
  descripcion: string;
  debe: number;
  haber: number;
  afecta: string;
}
