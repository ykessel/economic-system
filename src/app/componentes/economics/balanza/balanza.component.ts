import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CuentasService } from '../../../servicios/cuentas.service';
import { Cuenta } from '../../../modelos/cuenta';

@Component({
  selector: 'app-balanza',
  templateUrl: './balanza.component.html',
  styleUrls: ['./balanza.component.scss']
})
export class BalanzaComponent implements OnInit {
  displayedColumns: string[] = ['cuenta', 'saldo_debe', 'saldo_haber'];
  cuentas: MatTableDataSource<Cuenta>;
  fecha = new Date(Date.now());
  isLoading = true;
  sa: number;
  sd: number;

  constructor(private cuentasService: CuentasService) {}

  ngOnInit() {
    this.cuentasService.getCuentas().subscribe(c => {
      this.cuentas = new MatTableDataSource(this.quitarCuentaSinSaldo(c));
      this.sa = this.saldoAcreedor(c);
      this.sd = this.saldoDeudor(c);
      this.isLoading = false;
    });
  }

  // Filtrar solo las cuentas con saldo
  quitarCuentaSinSaldo(c: Cuenta[]): Cuenta[] {
    const clean = c.filter(x => x.saldo !== 0);
    return clean;
  }

  saldoAcreedor(cuentas: Cuenta[]): number {
    return cuentas
      .filter(cuenta => cuenta.categoria === 'Pasivo' || cuenta.categoria === 'Capital' || cuenta.categoria === 'Ingreso')
      .map(c => c.saldo)
      .reduce((actual, siguiente) => actual + siguiente);
  }

  saldoDeudor(cuentas: Cuenta[]): number {
    return cuentas
      .filter(cuenta => cuenta.categoria === 'Activo' || cuenta.categoria === 'Gasto' || cuenta.categoria === 'Retiro')
      .map(c => c.saldo)
      .reduce((actual, siguiente) => actual + siguiente);
  }
}
