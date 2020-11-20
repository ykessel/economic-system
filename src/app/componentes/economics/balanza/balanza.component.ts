import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CuentasService} from '../../../servicios/cuentas.service';
import {Cuenta} from '../../../modelos/cuenta';


@Component({
  selector: 'app-balanza',
  templateUrl: './balanza.component.html',
  styleUrls: ['./balanza.component.scss']
})
export class BalanzaComponent implements OnInit {

  displayedColumns: string[] = ['cuenta', 'saldo_debe', 'saldo_haber'];
  cuentas: MatTableDataSource<Cuenta>;
  saldoDeudor: number;
  saldoAcreedor: number;

  constructor(private cuentasService: CuentasService) { }

  ngOnInit() {
    this.cuentasService.getCuentas().subscribe(c => {
        this.cuentas = new MatTableDataSource(this.quitarCuentaSinSaldo(c));
        this.saldoDeudor = this.totalSaldoDeudor(c);
        this.saldoAcreedor = this.totalSaldoAcreedor(c);
    });
  }

  // Filtrar solo las cuentas con saldo
  quitarCuentaSinSaldo(c: Cuenta[]): Cuenta[] {
    let clean = c.filter(x => x.saldo != 0);
    return clean;
  }
  // Calcular el saldo deudor
  totalSaldoDeudor(c: Cuenta[]) {
    return c.filter(x => x.categoria === 'Activo' || x.categoria === 'Gasto' || x.categoria === 'Retiro').map(c =>  c.saldo).reduce((acc, value) => acc + value, 0);
  }

  // Calcular el saldo acreedor
  totalSaldoAcreedor(c: Cuenta[]) {
    return c.filter(x => x.categoria === 'Pasivo' || x.categoria === 'Capital' || x.categoria === 'Ingreso').map(c =>  c.saldo).reduce((acc, value) => acc + value, 0);
  }

}
