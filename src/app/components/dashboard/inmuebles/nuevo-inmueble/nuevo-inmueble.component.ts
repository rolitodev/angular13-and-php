import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styleUrls: ['./nuevo-inmueble.component.css']
})

export class NuevoInmuebleComponent implements OnInit {

  public formularioCreacion: FormGroup;

  public cargandoDatos: boolean = false;
  public cargandoBoton: boolean = false;

  public usuarios: any = [];
  public tipoInmuebles: any = [];
  public ubicacion: any = [];

  constructor(
    private _fb: FormBuilder,
    public _notificaciones: NotificacionesService,
    public _usuarios: UsuariosService,
    public dialogRef: MatDialogRef<NuevoInmuebleComponent>
  ) {
    this.formularioCreacion = this._fb.group({
      matricula: [this.makeId(6), [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      id_propietario: [null, [Validators.required]],
      id_tipo_inmueble: [null, [Validators.required]],
      id_ubicacion_inmueble: [null, [Validators.required]],
      valor_comercial: [0, [Validators.required]],
      area_total: [0, [Validators.required]],
      area_construida: [0, [Validators.required]],
      fecha: [new Date()]
    });
  }

  ngOnInit(): void {
    this.cargandoDato();
  }

  cargandoDato(): void {

    this.cargandoDatos = true;

    let promesa1 = new Promise((resolve, reject) => {
      this._usuarios.obtenerTodos().subscribe((res: any) => {
        this.usuarios = res;
        resolve(res);
      }, err => {
        reject(err);
        throw err;
      });
    });

    let promesa2 = new Promise((resolve, reject) => {
      this._usuarios.obtenerTipoInmueble().subscribe((res: any) => {
        this.tipoInmuebles = res;
        resolve(res);
      }, err => {
        reject(err);
        throw err;
      });
    });

    let promesa3 = new Promise((resolve, reject) => {
      this._usuarios.obtenerUbicacionInmueble().subscribe((res: any) => {
        this.ubicacion = res;
        resolve(res);
      }, err => {
        reject(err);
        throw err;
      });
    });

    Promise.all([promesa1, promesa2, promesa3]).then(() => { // Si se cumplen las tres promesaas
      this.cargandoDatos = false; // Volvemos el botón falso
    }).catch(err => {
      this._notificaciones.mostrar('error', 'Ocurrió un error al realizar las peticiones a la base de datos.');
      throw err;
    });
  }

  registrarInmueble(): void {

    if (this.formularioCreacion.invalid) {
      this._notificaciones.mostrar('error', 'Debes completar el formulario para registrar el usuario.');
      return;
    }

    this.cargandoBoton = true;

    this._usuarios.registrarInmueble(this.formularioCreacion.getRawValue()).subscribe((res: any) => {
      if (res) {
        this._notificaciones.mostrar('correcto', 'El inmueble se ha registrado correctamente.');
        this.cerrarModal();
        this._usuarios.refrescarDataInmuebles(true);
      } else {
        this._notificaciones.mostrar('error', 'Ocurrió un error al intentar registrar el inmueble, intentalo de nuevo.');
      }
      this.cargandoBoton = false;
    }, err => {
      this._notificaciones.mostrar('error', 'Ocurrió un error al intentar registrar el inmueble, intentalo de nuevo.');
      this.cargandoBoton = false;
      throw err;
    });
  }

  makeId(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  validateNumber(e: any) {
    if (!e.key.match(/^[0-9.,]+$/)) {
      e.preventDefault();
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
