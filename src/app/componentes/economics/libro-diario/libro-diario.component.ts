import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Transaccion} from '../../../modelos/transaccion';
import {TransaccionesService} from '../../../servicios/transacciones.service';

@Component({
  selector: 'app-libro-diario',
  templateUrl: './libro-diario.component.html',
  styleUrls: ['./libro-diario.component.scss']
})
export class LibroDiarioComponent implements OnInit {

  afecta: Transaccion[];
  transacciones: Transaccion[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['fecha', 'cuenta', 'ref', 'descripcion', 'debe', 'haber'];
  dataSource: MatTableDataSource<Transaccion[]>;


  constructor(private transaccionesService: TransaccionesService) {
  }

  ngOnInit() {
    this.transaccionesService.getTransacciones().subscribe(t => {
      this.transaccionesService.getAfectadas().subscribe(a => {
        this.dataSource = this.OrdenarTransacciones(t, a);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  // Intercalar las transacciones con su respectivo efecto dual
  merge(ar: Transaccion[], af: Transaccion[]): Transaccion[] {
    const temp: Transaccion[] = [];
    ar.forEach(t => {
      af.forEach(a => {
        if (t.afecta === a.id) {
          temp.push(t);
          temp.push(a);
        }
      });
    });
    return temp;
  }

  OrdenarTransacciones(tr: Transaccion[], af: Transaccion[]): MatTableDataSource<Transaccion[]> {
    const temp: any[] = this.merge(tr, af);
    return new MatTableDataSource(temp);
  }

}
