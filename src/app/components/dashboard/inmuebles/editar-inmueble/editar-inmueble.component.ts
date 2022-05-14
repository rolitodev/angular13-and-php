import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})

export class EditarInmuebleComponent implements OnInit {

  public formularioEdicion: FormGroup;

  public cargandoBoton: boolean = false;
  public tipoInmueble: any = [];

  constructor(
    public _fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarInmuebleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _usuarios: UsuariosService,
    public _notificaciones: NotificacionesService
  ) {
    this.formularioEdicion = this._fb.group({
      id: [null],
      matricula: [{ value: null, disabled: true }, [Validators.required]],
      id_propietario: [null, [Validators.required]],
      id_tipo_inmueble: [null, [Validators.required]],
      id_ubicacion_inmueble: [null, [Validators.required]],
      valor_comercial: [0, [Validators.required]],
      area_total: [0, [Validators.required]],
      area_construida: [0, [Validators.required]],
      fechaUpdate: [new Date()]
    });
  }

  ngOnInit(): void {

    this._usuarios.obtenerTipoInmueble().subscribe((res: any) => {
      this.tipoInmueble = res;
    }, err => {
      throw err;
    });
    if (this.data.inmueble) {
      this.formularioEdicion.controls['id'].setValue(this.data.inmueble.id);
      this.formularioEdicion.controls['matricula'].setValue(this.data.inmueble.matricula);
      this.formularioEdicion.controls['id_propietario'].setValue(this.data.inmueble.id_propietario);
      this.formularioEdicion.controls['id_tipo_inmueble'].setValue(this.data.inmueble.id_tipo_inmueble);
      this.formularioEdicion.controls['id_ubicacion_inmueble'].setValue(this.data.inmueble.id_ubicacion_inmueble);
      this.formularioEdicion.controls['valor_comercial'].setValue(this.data.inmueble.valor_comercial);
      this.formularioEdicion.controls['area_total'].setValue(this.data.inmueble.area_total);
      this.formularioEdicion.controls['area_construida'].setValue(this.data.inmueble.area_construida);
    }
  }

  validateNumber(e: any) {
    if (!e.key.match(/^[0-9.,]+$/)) {
      e.preventDefault();
    }
  }

  actualizarInmueble() {
    if (this.formularioEdicion.invalid) {
      this._notificaciones.mostrar("error", "Debes completar el formulario para poder actualizar el usuario.");
      return;
    }
    this.cargandoBoton = true;
    this._usuarios.actualizarInmueble(this.formularioEdicion.getRawValue()).subscribe((res: any) => {
      if (res) {
        this.cerrarModal();
        this._usuarios.refrescarDataInmuebles(true);
        this._notificaciones.mostrar("correcto", "Actualizaste correctamente el inmueble.");
      }
      this.cargandoBoton = false;
    }, err => {
      this._notificaciones.mostrar("error", "Ocurió un error al intentar realizar la actualización.");
      this.cargandoBoton = false;
      throw err;
    });
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
