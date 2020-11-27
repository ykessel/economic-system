import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Cuenta } from 'modelos';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngresosComponent implements OnInit {
  @Input()
  ingresos: Cuenta[];
  @Input()
  displayedColumns: string[];
  @Output()
  changeDataSource = new EventEmitter<Cuenta>();
  @Output()
  saldo = new EventEmitter<Cuenta>();
  constructor() {}

  ngOnInit(): void {}
}
