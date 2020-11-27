import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter,  } from '@angular/core';
import { Cuenta } from 'modelos';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrls: ['./capital.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalComponent implements OnInit {
  @Input()
  capital: Cuenta[];
  @Input()
  displayedColumns: string[];
  @Output()
  changeDataSource = new EventEmitter<Cuenta>();
  @Output()
  saldo = new EventEmitter<Cuenta>();
  constructor() {}

  ngOnInit(): void {}
}
