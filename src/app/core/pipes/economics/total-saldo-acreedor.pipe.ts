import { Pipe, PipeTransform } from '@angular/core';
import { Cuenta } from 'modelos';
import memo from 'memo-decorator';

const sla = (cuentas: Cuenta[]): number => {
  return cuentas
    .filter(
      cuenta =>
        cuenta.categoria === 'Pasivo' ||
        cuenta.categoria === 'Capital' ||
        cuenta.categoria === 'Ingreso'
    )
    .map(c => c.saldo)
    .reduce((actual, siguiente) => actual + siguiente);
};

@Pipe({
  name: 'totalSaldoAcreedor'
})
export class TotalSaldoAcreedorPipe implements PipeTransform {
  @memo()
  transform(value: Cuenta[], ...args: unknown[]): number {
    return sla(value);
  }
}
