import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransaccionesService} from '../../../servicios/transacciones.service';
import {CuentasService} from '../../../servicios/cuentas.service';
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
  reft: number;
  refa: number;
  value: any;

  constructor(private fb: FormBuilder,
              private transaccionesService: TransaccionesService,
              private cuentasService: CuentasService) {
    this.TForm = this.fb.group({
      id: uuid(),
      next: uuid(),
      fecha: [`${this.fecha.getMonth() + 1}/${this.fecha.getDate()}/${this.fecha.getFullYear()}`, Validators.required],
      cuenta: ['', Validators.required],
      reft: ['', Validators.required],
      refa: ['', Validators.required],
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

  newT(t: any, a: any) {
    this.TForm.patchValue({
      cuenta: t.value.nombre,
      afecta: a.value.nombre,
      reft: t.value.numero,
      refa: a.value.numero
    });
    this.transaccionesService.newTransaccion(this.TForm.value);
    this.TForm.reset();
  }
}
