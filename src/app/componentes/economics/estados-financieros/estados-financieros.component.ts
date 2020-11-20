import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
// Modelos
import {Cuenta} from '../../../modelos/cuenta';
import {Transaccion} from '../../../modelos/transaccion';
// Servicios
import {CuentasService} from '../../../servicios/cuentas.service';
import {TransaccionesService} from '../../../servicios/transacciones.service';

export interface Estado {
  id: number;
  nombre: string;
}

const data: Estado[] = [
  {id: 1, nombre: 'Estado de Resultados'},
  {id: 2, nombre: 'Estado del capital contable del propietario'},
  {id: 3, nombre: 'Balance general'},
  {id: 4, nombre: 'Estado del flujo de efectivo'}
];

@Component({
  selector: 'app-estados-financieros',
  templateUrl: './estados-financieros.component.html',
  styleUrls: ['./estados-financieros.component.scss'],
})
export class EstadosFinancierosComponent implements OnInit {

  capital = 0;
  estados = data;
  utilidadPerdida: number;
  isLoading = true;
  cuentas: Cuenta[];
  companyName = 'Kessel Dynamics Corp.';
  cuentasGastos: MatTableDataSource<Cuenta>;
  cuentasIngresos: MatTableDataSource<Cuenta>;
  transacciones: MatTableDataSource<Transaccion>;
  displayedColumns: string[] = ['nombre', 'empty', 'saldo'];

  constructor(private cuentasService: CuentasService,
              private transaccionesService: TransaccionesService) {
  }

  ngOnInit() {
    this.cuentasService.getCuentas().subscribe(c => {
      this.cuentasIngresos = this.changeDataSource('Ingreso', c);
      this.cuentasGastos = this.changeDataSource('Gasto', c);
      this.utilidadPerdida = this.utilidadTotal(c);
      this.cuentas = c;
      this.isLoading = false;
    });

    this.transaccionesService.getTransacciones().subscribe(t => {
      this.transaccionesService.getAfectadas().subscribe(a => {
        this.transacciones = new MatTableDataSource(t.concat(a).filter(x => x.ref === 301 || x.ref === 311));
      });
    });

  }

  // Recibe una categoria y devuelve un MatTableDataSource
  // con todas las cuentas asociadas a esa categoria
  changeDataSource(categoria: string, source: Cuenta[]): MatTableDataSource<Cuenta> {
    return new MatTableDataSource(source.filter(c => c.categoria === categoria && c.saldo > 0));
  }

  // Calcula la utilidad o perdida neta de la empresa
  utilidadTotal(cuentas: Cuenta[]) {
    const totalIngresos = cuentas.filter(c => c.categoria === 'Ingreso')
      .map(i => i.saldo)
      .reduce((acc, value) => acc + value, 0);
    const totalGastos = cuentas.filter(c => c.categoria === 'Gasto')
      .map(g => g.saldo)
      .reduce((acc, value) => acc + value, 0);

    return totalIngresos - totalGastos;
  }

  // Actualizar capital
  updateCapital(monto: number) {
    if (this.utilidadPerdida > 0) {
      this.capital = this.aumentarCapital(monto);
    } else if (this.utilidadPerdida < 0) {
      this.capital = this.reducirCapital(monto);
    }
  }

  // Aumentar el capital contable del propietario
  // solo la utilidad neta aumenta el capital
  aumentarCapital(monto: number) {
    return this.capital + monto;
  }

  // Disminuir el capital contable del propietario
  // Solo la perdida neta y los retiros disminuyen el capital
  reducirCapital(monto: number) {
    return this.capital - monto;
  }
}
