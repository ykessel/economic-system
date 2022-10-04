import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Cuenta } from 'modelos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GastosComponent implements OnInit {
  @Input()
  gastos: Observable<Cuenta[]>;
  @Input()
  displayedColumns: string[];
  @Output()
  changeDataSource = new EventEmitter<Cuenta>();
  @Output()
  saldo = new EventEmitter<Cuenta>();
  constructor() {}

  ngOnInit(): void {}
}
