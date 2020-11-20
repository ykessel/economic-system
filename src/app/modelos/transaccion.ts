export interface Transaccion {
  id: string;
  fecha: string;
  cuenta: string;
  descripcion: string;
  debe: number;
  haber: number;
  afecta: string;
}
