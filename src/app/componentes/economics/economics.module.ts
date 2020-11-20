import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EconomicsRoutingModule} from './economic-routing';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const componentes = [];

@NgModule({
  imports: [
    CommonModule,
    EconomicsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: componentes,
  exports: componentes,
})
export class EconomicsModule {}
