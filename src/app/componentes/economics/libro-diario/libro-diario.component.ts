import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Transaccion} from '../../../modelos/transaccion';
import {TransaccionesService} from '../../../servicios/transacciones.service';
import flatten from '../../../../../node_modules/array-flatten';

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
  displayedColumns: string[] = ['fecha', 'cuenta', 'descripcion', 'debe', 'haber'];
  dataSource: MatTableDataSource<Transaccion[]>;


  constructor(private transaccionesService: TransaccionesService) { }

  ngOnInit() {
    this.transaccionesService.getTransacciones().subscribe(t => {
      this.transaccionesService.getAfectadas().subscribe(a => {
         this.dataSource = this.OrdenarTransacciones(t, a);
      });
     });
  }

  merge(ar: Transaccion[], af: Transaccion[]): Transaccion[] {
    const temp: Transaccion[] = [];
    ar.forEach(tr => {
       af.forEach(af => {
           if(tr.afecta === af.id) {
             temp.push(tr);
             temp.push(af);
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
