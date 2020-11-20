import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransaccionesService} from '../../../servicios/transacciones.service';
import {CuentasService} from '../../../servicios/cuentas.service';
import {Transaccion} from '../../../modelos/transaccion';
import {Afecta} from '../../../modelos/afecta';
import {Cuenta} from '../../../modelos/cuenta';
import uuid from '../../../../../node_modules/uuid';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {

  TForm: FormGroup;
  cuentas: Cuenta[];
  fecha = new Date(Date.now());

  constructor(private fb: FormBuilder,
              private transaccionesService: TransaccionesService,
              private cuentasService: CuentasService) {
                this.TForm = this.fb.group({
                  id: uuid(),
                  next: uuid(),
                  fecha: [`${this.fecha.getMonth() + 1}/${this.fecha.getDate()}/${this.fecha.getFullYear()}`, Validators.required],
                  cuenta: ['', Validators.required],
                  descripcion: ['', Validators.required],
                  debe: ['', Validators.required],
                  haber: ['', Validators.required],
                  afecta: ['', Validators.required],
                });
              }

  ngOnInit() {
    this.cuentasService.getCuentas().subscribe(_ => {
      this.cuentas = _;
    });
  }

  newT() {
    this.transaccionesService.newTransaccion(this.TForm.value);
    this.TForm.reset();
  }
}
