import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  public fileToUpload: File | null = null;

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
      fecha: [new Date()]
    });
  }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this._usuarios.obtenerTodos().subscribe((res: any) => {
      this.usuarios = res;
    }, err => {
      throw err;
    });

    this._usuarios.obtenerInmuebles().subscribe((res: any) => {
      this.inmuebles = res;
    }, err => {
      throw err;
    });
  }

  handleFileInput(files: any) {
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

    this.cargandoBoton = true;
    this._usuarios.registrarContrato(this.formularioContratoNuevo.getRawValue()).subscribe((res: any) => {
      if (res) {
        this._notificaciones.mostrar('correcto', 'Se ha registrado el contrato exitosamente.');
        this._usuarios.refrescarDataContratos(true);
        this.cerrarModal();
      }
      this.cargandoBoton = false;
    }, err => {
      this.cargandoBoton = false;
      throw err;
    });
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
