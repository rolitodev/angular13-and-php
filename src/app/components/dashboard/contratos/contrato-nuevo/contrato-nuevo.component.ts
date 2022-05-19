import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-contrato-nuevo',
  templateUrl: './contrato-nuevo.component.html',
  styleUrls: ['./contrato-nuevo.component.css']
})

export class ContratoNuevoComponent implements OnInit {

  public formularioContratoNuevo: FormGroup;

  public cargandoBoton: boolean = false;

  public usuarios: any = [];
  public inmuebles: any = [];

  public formData: FormData = new FormData();;
  public randomId: any = null;

  public user: any = null;

  constructor(private _fb: FormBuilder,
    private _notificaciones: NotificacionesService,
    private _usuarios: UsuariosService,
    public _auth: AuthService,
    public dialogRef: MatDialogRef<ContratoNuevoComponent>
  ) {
    this.formularioContratoNuevo = this._fb.group({
      id_propietario: [null, [Validators.required]],
      id_inmueble: [null, [Validators.required]],
      fecha_inicio: [null, [Validators.required]],
      fecha_final: [null, [Validators.required]],
      valor: [0, [Validators.required]],
      archivo: [null, [Validators.required]],
      fecha: [new Date()]
    });
  }

  ngOnInit(): void {
    this.user = this._auth.currentUser;
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this._usuarios.obtenerTodos(this.user.idrol, this.user.id).subscribe((res: any) => {
      this.usuarios = res;
    }, err => {
      throw err;
    });

    this._usuarios.obtenerInmuebles(this.user.idrol, this.user.id).subscribe((res: any) => {
      this.inmuebles = res;
    }, err => {
      throw err;
    });
  }

  handleFileInput(event: any) {
    this.randomId = this.randomString(8);
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    if (file.type === 'application/pdf') {
      this.formData.append('uploadFile', file, this.randomId + ".pdf");
      this.formData.append('datos', JSON.stringify(this.formularioContratoNuevo.getRawValue()));
    } else {
      this._notificaciones.mostrar('error', 'Solo permitimos archivos con extensión .pdf');
    }
  }

  registrarDatos(): void {

    if (this.formularioContratoNuevo.invalid) {
      this._notificaciones.mostrar('error', 'Debes llenar el formulario antes de registrar el contrato.');
      return;
    }

    if (this.formularioContratoNuevo.getRawValue().fecha_final < this.formularioContratoNuevo.getRawValue().fecha_inicio) {
      this._notificaciones.mostrar('error', 'La fecha final debe ser mayor a la fecha de inicio.');
      return;
    }

    if (moment(this.formularioContratoNuevo.getRawValue().fecha_inicio).isSame(this.formularioContratoNuevo.getRawValue().fecha_final)) {
      this._notificaciones.mostrar('error', 'El contrato no puede vencer el mismo día.');
      return;
    }

    this.cargandoBoton = true;
    this._usuarios.registrarContrato(this.randomId, this.formData).subscribe((res: any) => {
      if (res) {
        this._notificaciones.mostrar('correcto', 'Se ha registrado el contrato exitosamente.');
        this._usuarios.refrescarDataContratos(true);
        this.cerrarModal();
      }
      this.cargandoBoton = false;
    }, err => {
      this._notificaciones.mostrar('error', 'No se pudo realizar la petición. Intentalo de nuevo.');
      this.cargandoBoton = false;
      throw err;
    });

  }

  validateNumber(e: any) {
    if (!e.key.match(/^[0-9.,]+$/)) {
      e.preventDefault();
    }
  }

  randomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
