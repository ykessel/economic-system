import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Cuenta } from 'modelos';

@Component({
  selector: 'app-pasivos',
  templateUrl: './pasivos.component.html',
  styleUrls: ['./pasivos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasivosComponent {
  @Input()
  pasivos: Cuenta[];
  @Input()
  displayedColumns: string[];
  @Output()
  changeDataSource = new EventEmitter<Cuenta>();
  @Output()
  saldo = new EventEmitter<Cuenta>();
  constructor() {}
}
