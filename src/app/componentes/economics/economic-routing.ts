import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { CuentasComponent } from './cuentas/cuentas.component';
import { LibroDiarioComponent } from './libro-diario/libro-diario.component';
import { LibroMayorComponent } from './libro-mayor/libro-mayor.component';
import { EstadosFinancierosComponent } from './estados-financieros/estados-financieros.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { BalanzaComponent } from './balanza/balanza.component';
// routes
const routes: Routes = [
  {
    path: 'transacciones',
    component: TransaccionesComponent
  },
  {
    path: 'cuentas',
    component: CuentasComponent
  },
  {
    path: 'diario',
    component: LibroDiarioComponent
  },
  {
    path: 'mayor',
    component: LibroMayorComponent
  },
  {
    path: 'estados',
    component: EstadosFinancierosComponent
  },
  {
    path: 'balanza',
    component: BalanzaComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EconomicsRoutingModule { }
