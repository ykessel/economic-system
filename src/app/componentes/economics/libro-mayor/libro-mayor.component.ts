// Angular
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
// Modelos
import {Cuenta} from '../../../modelos/cuenta';
import {Transaccion} from '../../../modelos/transaccion';
// Servicios
import {CuentasService} from '../../../servicios/cuentas.service';
import {TransaccionesService} from '../../../servicios/transacciones.service';

@Component({
  selector: 'app-libro-mayor',
  templateUrl: './libro-mayor.component.html',
  styleUrls: ['./libro-mayor.component.scss']
})
export class LibroMayorComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'partida', 'referencia', 'debe', 'haber'];
  transacciones: MatTableDataSource<Transaccion>;
  rootSource: MatTableDataSource<Transaccion>;
  cuentasActivos: Cuenta[] = [];
  cuentasPasivos: Cuenta[] = [];
  cuentasCapital: Cuenta[] = [];
  cuentasIngresos: Cuenta[] = [];
  cuentasGastos: Cuenta[] = [];
  isLoading = true;

  constructor(private cuentasService: CuentasService,
              private transaccionesService: TransaccionesService) {
  }

  ngOnInit(): void {
    this.transaccionesService.getTransacciones().subscribe(t => {
      this.transaccionesService.getAfectadas().subscribe(a => {
        this.cuentasService.getCuentas().subscribe(c => {
          this.rootSource = new MatTableDataSource(t.concat(a));
          const cuentas = this.usedCuentas(c, t.concat(a));
          this.distribuirCuentas(cuentas);
          this.isLoading = false;
        });
      });
    });
  }

  // Filtrar solo las cuentas que son afectadas por las transacciones
  usedCuentas(c: Cuenta[], t: Transaccion[]): Cuenta[] {
    const temp: string[] = [];
    const cue: Cuenta[] = [];
    t.forEach(e => {
      temp.push(e.cuenta);
    });

    c.forEach(e => {
      temp.forEach(te => {
        if (!cue.includes(e) && te === e.nombre) {
          cue.push(e);
        }
      });
    });

    return cue;
  }

  // Distribuir cuentas por categoria
  distribuirCuentas(c: Cuenta[]) {
    c.forEach(e => {
      if (e.categoria === 'Activo') {
        this.cuentasActivos.push(e);
      } else if (e.categoria === 'Pasivo') {
        this.cuentasPasivos.push(e);
      } else if (e.categoria === 'Capital' || e.categoria === 'Retiro') {
        this.cuentasCapital.push(e);
      } else if (e.categoria === 'Ingreso') {
        this.cuentasIngresos.push(e);
      } else if (e.categoria === 'Gasto') {
        this.cuentasGastos.push(e);
      }

    });
  }

  // Filtrar el stream para crear un stream para cada cuenta
  changeDataSource(c: Cuenta): MatTableDataSource<Transaccion> {
    let data: Transaccion[];
    data = this.rootSource.data.filter(x => x.cuenta === c.nombre);
    return new MatTableDataSource(data);
  }

  // Actulizar el saldo de la cuenta
  updateSaldo(c: Cuenta, saldo: number) {
    c.saldo = saldo;
    this.cuentasService.updateCuenta(c).subscribe();
  }

  // TODO:  Arreglar el updateSaldo - Calcular el saldo de cada cuenta
  saldo(c: Cuenta) {
    const saldo = this.getTotalDebe(c) - this.getTotalHaber(c);
    // this.updateSaldo(c, saldo);
    return Math.abs(saldo);
  }

  // Calcular el debe total de cada cuenta
  getTotalDebe(c: Cuenta) {
    return this.changeDataSource(c).data.map(t => t.debe).reduce((acc, value) => acc + value, 0);
  }

  // Calcular el haber total de cada cuenta
  getTotalHaber(c: Cuenta) {
    return this.changeDataSource(c).data.map(t => t.haber).reduce((acc, value) => acc + value, 0);
  }

}
