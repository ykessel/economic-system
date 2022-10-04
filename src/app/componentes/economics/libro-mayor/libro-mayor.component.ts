// Angular
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
// Modelos
import { Cuenta } from "../../../modelos/cuenta";
import { Transaccion } from "../../../modelos/transaccion";
// Servicios
import { CuentasService } from "../../../servicios/cuentas.service";
import { TransaccionesService } from "../../../servicios/transacciones.service";
import { Observable, of } from "rxjs";

import { List } from "immutable";
import { filter } from "rxjs/internal/operators/filter";
import { map, reduce, startWith, delay } from "rxjs/operators";

@Component({
  selector: "app-libro-mayor",
  templateUrl: "./libro-mayor.component.html",
  styleUrls: ["./libro-mayor.component.scss"]
})
export class LibroMayorComponent implements OnInit {
  displayedColumns: string[] = [
    "fecha",
    "partida",
    "referencia",
    "debe",
    "haber"
  ];
  rootSource: Observable<MatTableDataSource<Transaccion>>;
  transacciones: Observable<MatTableDataSource<Transaccion>>;
  cuentasActivos: Observable<Cuenta[]>;
  cuentasPasivos: Observable<Cuenta[]>;
  cuentasCapital: Observable<Cuenta[]>;
  cuentasIngresos: Observable<Cuenta[]>;
  cuentasGastos: Observable<Cuenta[]>;
  isLoading = true;

  constructor(
    private cuentasService: CuentasService,
    private transaccionesService: TransaccionesService
  ) {}

  ngOnInit(): void {
    this.transaccionesService.getTransacciones().subscribe(t => {
      this.transaccionesService.getAfectadas().subscribe(a => {
        this.cuentasService.getCuentas().subscribe(c => {
          this.rootSource = of(new MatTableDataSource(t.concat(a)));
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
  distribuirCuentas(cuentas: Cuenta[]) {
    let activos: Cuenta[] = [];
    let pasivos: Cuenta[] = [];
    let capital: Cuenta[] = [];
    let ingresos: Cuenta[] = [];
    let gastos: Cuenta[] = [];
    cuentas.forEach(cuenta => {
      if (cuenta.categoria === "Activo") {
        activos.push(cuenta);
      } else if (cuenta.categoria === "Pasivo") {
        pasivos.push(cuenta);
      } else if (
        cuenta.categoria === "Capital" ||
        cuenta.categoria === "Retiro"
      ) {
        capital.push(cuenta);
      } else if (cuenta.categoria === "Ingreso") {
        ingresos.push(cuenta);
      } else if (cuenta.categoria === "Gasto") {
        gastos.push(cuenta);
      }
    });

    this.cuentasActivos = of(activos);
    this.cuentasPasivos = of(pasivos);
    this.cuentasCapital = of(capital);
    this.cuentasIngresos = of(ingresos);
    this.cuentasGastos = of(gastos);
  }

  // Filtrar el stream para crear un stream para cada cuenta
  changeDataSource(
    cuenta: Cuenta
  ): Observable<MatTableDataSource<Transaccion>> {
    let t: Transaccion[];
    this.rootSource
      .pipe(
        map(t => t.data),
        map(s => s.filter(x => x.cuenta === cuenta.nombre))
      )
      .subscribe(x => (t = x));
    return of(new MatTableDataSource(t));
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
    return of(Math.abs(saldo));
  }

  // Calcular el debe total de cada cuenta
  getTotalDebe(c: Cuenta) {
    let d: number;
    this.changeDataSource(c)
      .pipe(
        map(t => t.data),
        map(x =>
          x.map(t => t.debe).reduce((actual, siguiente) => actual + siguiente)
        )
      )
      .subscribe(x => (d = x));
    return d;
  }

  // Calcular el haber total de cada cuenta
  getTotalHaber(c: Cuenta) {
    let h: number;
    this.changeDataSource(c)
      .pipe(
        map(t => t.data),
        map(x =>
          x.map(t => t.haber).reduce((actual, siguiente) => actual + siguiente)
        )
      )
      .subscribe(x => (h = x));
    return h;
  }
}
