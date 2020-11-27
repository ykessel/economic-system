import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Cuenta } from 'modelos';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActivosComponent {

  @Input() activos: Cuenta[];
  @Input() displayedColumns: string[];
  @Output() changeDataSource = new EventEmitter<Cuenta>();
  @Output() saldo = new EventEmitter<Cuenta>();

  constructor() {}
}
