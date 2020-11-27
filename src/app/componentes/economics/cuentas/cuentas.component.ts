import {Component, OnInit, ViewChild, Output} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Cuenta} from '../../../modelos/cuenta';
import {CuentasService} from '../../../servicios/cuentas.service';


@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource: MatTableDataSource<Cuenta>;
  displayedColumns = ['numero', 'nombre', 'saldo', 'categoria'];
  isLoading = true;

  constructor(private cuentasService: CuentasService) {}

  ngOnInit() {
    this.cuentasService.getCuentas().subscribe(d => {
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }
}
