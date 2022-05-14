import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { allCountries } from 'src/app/tools/countries.tool';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})

export class EditarUsuariosComponent implements OnInit {

  public estadoActualModal: boolean = false;
  public hide: boolean = true;
  public cargandoBoton: boolean = false;

  public formularioActualizacion: FormGroup;
  public countries: any = [];

  constructor(
    private _fb: FormBuilder,
    private _notificaciones: NotificacionesService,
    private _usuarios: UsuariosService,
    public _auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarUsuariosComponent>
  ) {
    this.formularioActualizacion = this._fb.group({
      id: [null],
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      correo: [{ value: null, disabled: true }],
      password: [null, [Validators.required]],
      pais: [[], [Validators.required]],
      telefono: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      idrol: [null],
      fechaUpdate: [new Date()]
    });
  }

  ngOnInit(): void {
    this.countries = allCountries()
    if (this.data.data) {
      this.formularioActualizacion.controls['id'].setValue(this.data.data ? this.data.data.id : null);
      this.formularioActualizacion.controls['nombres'].setValue(this.data.data ? this.data.data.nombres : null);
      this.formularioActualizacion.controls['apellidos'].setValue(this.data.data ? this.data.data.apellidos : null);
      this.formularioActualizacion.controls['correo'].setValue(this.data.data ? this.data.data.correo : null);
      this.formularioActualizacion.controls['password'].setValue(this.data.data ? this.data.data.password : null);
      this.formularioActualizacion.controls['pais'].setValue(this.data.data ? this.data.data.pais : null);
      this.formularioActualizacion.controls['telefono'].setValue(this.data.data ? this.data.data.telefono : null);
      this.formularioActualizacion.controls['direccion'].setValue(this.data.data ? this.data.data.direccion : null);
      this.formularioActualizacion.controls['idrol'].setValue(this.data.data ? this.data.data.idrol : null);
      if (this.data.data.id === this._auth.currentUser.id) {
        this.formularioActualizacion.controls['idrol'].disable();
      }
    }
  }

  guardarDatos(): void {

    if (this.formularioActualizacion.invalid) {
      this._notificaciones.mostrar("error", "Debes completar el formulario para poder actualizar el usuario.");
      return;
    }

    this.cargandoBoton = true;

    this._usuarios.actualizarUsuario(this.formularioActualizacion.getRawValue()).subscribe((res: any) => {
      if (res) {
        this._notificaciones.mostrar("correcto", "Has actualizado el usuario correctamente");
        this.dialogRef.close(true);
      } else {
        this._notificaciones.mostrar("error", "No pudimos actualizar el usuario, intental ode nuevo.");
      }
      this.cargandoBoton = false;
    }), catchError((error) => {
      this.cargandoBoton = false;
      this._notificaciones.mostrar("error", "No pudimos actualizar el usuario, intental ode nuevo.");
      throw error;
    });

  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
