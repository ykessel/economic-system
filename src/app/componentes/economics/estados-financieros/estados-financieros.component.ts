import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// Modelos
import { Cuenta } from '../../../modelos/cuenta';
import { Transaccion } from '../../../modelos/transaccion';
// Servicios
import { CuentasService } from '../../../servicios/cuentas.service';
import { TransaccionesService } from '../../../servicios/transacciones.service';

import flatten from '../../../../../node_modules/array-flatten';

export interface Estado {
  id: number;
  nombre: string;
}

const data: Estado[] = [
  { id: 1, nombre: 'Estado de Resultados' },
  { id: 2, nombre: 'Estado del capital contable del propietario' },
  { id: 3, nombre: 'Balance general' },
  { id: 4, nombre: 'Estado del flujo de efectivo' }
];

@Component({
  selector: 'app-estados-financieros',
  templateUrl: './estados-financieros.component.html',
  styleUrls: ['./estados-financieros.component.scss']
})
export class EstadosFinancierosComponent implements OnInit {
  // Varible generales
  capital = 0;
  estados = data;
  isLoading = true;
  cuentas: Cuenta[];
  utilidadPerdida: number;
  companyName = 'Lessek Dynamics Corp.';

  // Variables estado de resultados
  cuentasGastos: MatTableDataSource<Cuenta>;
  cuentasIngresos: MatTableDataSource<Cuenta>;
  displayedColumns: string[] = ['nombre', 'empty', 'saldo'];

  // Estado del capital contable del propietario
  transaccionesMas: MatTableDataSource<Transaccion>;
  transaccionesMenos: MatTableDataSource<Transaccion>;

  // Balance General
  cuentasActivos: MatTableDataSource<Cuenta>;
  cuentasPasivos: MatTableDataSource<Cuenta>;
  totalActivos: number;
  totalPasivos: number;

  constructor(
    private cuentasService: CuentasService,
    private transaccionesService: TransaccionesService
  ) {}

  ngOnInit() {
    this.cuentasService.getCuentas().subscribe(c => {
      this.cuentasIngresos = this.changeDataSource(c, 'Ingreso');
      this.cuentasGastos = this.changeDataSource(c, 'Gasto');
      this.cuentasActivos = this.changeDataSource(c, 'Activo');
      this.cuentasPasivos = this.changeDataSource(c, 'Pasivo');
      this.utilidadPerdida = this.utilidadTotal(c);
      this.getTotalActivos();
      this.getTotalPasivos();
      this.totalCapital(c);
      this.cuentas = c;
      this.isLoading = false;
    });

    this.transaccionesService.getTransacciones().subscribe(t => {
      this.transaccionesService.getAfectadas().subscribe(a => {
        this.transaccionesMas = new MatTableDataSource(
          t.concat(a).filter(x => x.ref === 301)
        );
        this.transaccionesMenos = new MatTableDataSource(
          t.concat(a).filter(x => x.ref === 311)
        );
      });
    });
  }

  // Calcular el saldo total de activos en el balance general
  getTotalActivos() {
    this.totalActivos = this.cuentasActivos.data
      .map(c => c.saldo)
      .reduce((actual, siguiente) => actual + siguiente);
  }

  // Calcular el saldo total de pasivos en el balance general
  getTotalPasivos() {
    this.totalPasivos = this.cuentasPasivos.data
      .map(c => c.saldo)
      .reduce((anterior, siguiente) => anterior + siguiente);
  }

  // Calcular el capital contable del propietario
  totalCapital(cuentas) {
    const totalMas = cuentas
      .filter(x => x.numero === 301)
      .map(c => c.saldo)
      .reduce((acc, value) => acc + value, 0);
    const totalMenos = cuentas
      .filter(x => x.numero === 311)
      .map(c => c.saldo)
      .reduce((acc, value) => acc + value, 0);

    if (this.utilidadPerdida > 0) {
      this.capital += this.utilidadPerdida;
    } else {
      this.capital -= this.utilidadPerdida;
    }
    this.capital += totalMas;
    this.capital -= totalMenos;
  }

  // Obtener el saldo de una cuenta
  getSaldo(cuenta) {
    return this.cuentas.find(x => x.nombre === cuenta).saldo;
  }

  // Recibe una categoria y devuelve un MatTableDataSource
  // con todas las cuentas asociadas a esa categoria
  changeDataSource(source, ...categorias): MatTableDataSource<Cuenta> {
    let temp: MatTableDataSource<Cuenta>;
    temp = new MatTableDataSource([]);
    categorias.forEach(e => {
      temp.data.push(source.filter(c => c.categoria === e && c.saldo > 0));
    });
    temp.data = flatten(temp.data);
    return temp;
  }

  // Calcula la utilidad o perdida neta de la empresa
  utilidadTotal(cuentas) {
    const totalIngresos = cuentas
      .filter(c => c.categoria === 'Ingreso')
      .map(i => i.saldo)
      .reduce((acc, value) => acc + value, 0);
    const totalGastos = cuentas
      .filter(c => c.categoria === 'Gasto')
      .map(g => g.saldo)
      .reduce((acc, value) => acc + value, 0);

    return totalIngresos - totalGastos;
  }

  // Aumentar el capital contable del propietario
  // solo la utilidad neta aumenta el capital
  aumentarCapital(monto, capital) {
    this.capital = capital + monto;
  }

  // Disminuir el capital contable del propietario
  // Solo la perdida neta y los retiros disminuyen el capital
  reducirCapital(monto, capital) {
    this.capital = capital - monto;
  }
}
