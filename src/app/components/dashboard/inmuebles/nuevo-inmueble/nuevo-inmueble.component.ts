import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
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

  public user: any = null;

  constructor(
    private _fb: FormBuilder,
    public _notificaciones: NotificacionesService,
    public _usuarios: UsuariosService,
    public dialogRef: MatDialogRef<NuevoInmuebleComponent>,
    public _auth: AuthService
  ) {
    this.formularioCreacion = this._fb.group({
      matricula: [{value: this.makeId(6), disabled: true}],
      id_propietario: [null, [Validators.required]],
      id_tipo_inmueble: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      valor_comercial: [0, [Validators.required]],
      area_total: [0, [Validators.required]],
      area_construida: [0, [Validators.required]],
      fecha: [new Date()]
    });
  }

  ngOnInit(): void {
    this.user = this._auth.currentUser;
    this.cargandoDato();
  }

  cargandoDato(): void {

    this.cargandoDatos = true;

    let promesa1 = new Promise((resolve, reject) => {
      this._usuarios.obtenerTodos(this.user.idrol, this.user.id).subscribe((res: any) => {
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

    Promise.all([promesa1, promesa2]).then(() => { // Si se cumplen las tres promesaas
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
