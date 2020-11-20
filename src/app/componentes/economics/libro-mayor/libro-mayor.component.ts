// Angular
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

// Modelos
import {Cuenta} from '../../../modelos/cuenta';
import {Transaccion} from '../../../modelos/transaccion';
import {Traspaso} from '../../../modelos/traspaso';

// Servicios
import {CuentasService} from '../../../servicios/cuentas.service';
import {TransaccionesService} from '../../../servicios/transacciones.service';

@Component({
  selector: 'app-libro-mayor',
  templateUrl: './libro-mayor.component.html',
  styleUrls: ['./libro-mayor.component.scss']
})
export class LibroMayorComponent implements OnInit {

  transacciones: MatTableDataSource<Transaccion>;
  rootSource: MatTableDataSource<Transaccion>;
  cuentas: Cuenta[];
  isLoading = true;
  displayedColumns: string[] = ['fecha', 'partida', 'referencia', 'debe', 'haber'];

  constructor(private cuentasService: CuentasService,
              private transaccionesService: TransaccionesService) { }

  ngOnInit(): void {
    this.transaccionesService.getTransacciones().subscribe(t => {
      this.transaccionesService.getAfectadas().subscribe(a => {
        this.cuentasService.getCuentas().subscribe(c => {
          this.rootSource = new MatTableDataSource(t.concat(a));
          this.cuentas = this.usedCuentas(c, t.concat(a));
          this.isLoading = false;
        });
      });
    });
  }

  // Filtrar solo las cuentas que son afectadas por las transacciones
  usedCuentas(c: Cuenta[], t: Transaccion[]) : Cuenta[] {
      let temp: string[] = [];
      let cue: Cuenta[] = [];
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

  // Calcular el salda de cada cuenta
  saldo(c: Cuenta) {
    let saldo = this.getTotalDebe(c) - this.getTotalHaber(c);
    //this.updateSaldo(c, saldo);
    return saldo;
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
