import { Pipe, PipeTransform } from '@angular/core';
import { Cuenta } from 'modelos';
import memo from 'memo-decorator';
import { Observable, from, empty } from 'rxjs';
import { filter, map, reduce, tap, skipWhile } from 'rxjs/operators';

const sld = (cuentas: Cuenta[]): number => {
  return cuentas
    .filter(
      cuenta =>
        cuenta.categoria === 'Activo' ||
        cuenta.categoria === 'Gasto' ||
        cuenta.categoria === 'Retiro'
    )
    .map(c => c.saldo)
    .reduce((actual, siguiente) => actual + siguiente);
};

@Pipe({
  name: 'totalSaldoDeudor'
})
export class TotalSaldoDeudorPipe implements PipeTransform {
  @memo()
  transform(value: Cuenta[], ...args: unknown[]): number {
    return sld(value);
  }
}
