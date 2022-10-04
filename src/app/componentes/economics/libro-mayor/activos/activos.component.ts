import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Cuenta, Transaccion } from 'modelos';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "app-activos",
  templateUrl: "./activos.component.html",
  styleUrls: ["./activos.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivosComponent implements AfterViewInit, OnInit {
  @Input() activos: Observable<Cuenta[]>;
  @Input() displayedColumns: string[];
  @Input() transacciones: Observable<MatTableDataSource<Transaccion>>;
  @Input() saldoT: Observable<number>;
    
  @Output() sourceEvento = new EventEmitter<Cuenta>();
  @Output() saldoEvento = new EventEmitter<Cuenta>();
  

  constructor() {}

  ngOnInit() {
    this.sourceEvento.emit(activos[0])
  }

  ngAfterViewInit() {
    this.transacciones.subscribe(x => console.log(x.data));
  }

}
