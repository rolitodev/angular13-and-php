import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { allCountries } from 'src/app/tools/countries.tool';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})

export class CrearUsuariosComponent implements OnInit {

  public countries: any = [];
  public formularioCreacion: FormGroup;

  public cargandoBoton: boolean = false;

  constructor(private _fb: FormBuilder, public _notificaciones: NotificacionesService,
    private _usuarios: UsuariosService, public dialogRef: MatDialogRef<CrearUsuariosComponent>) {
    this.formularioCreacion = this._fb.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      password: [null, [Validators.required]],
      pais: [[], [Validators.required]],
      telefono: [null, [Validators.required, Validators.maxLength(11)]],
      direccion: [null, [Validators.required]],
      idrol: [null],
      fecha: [new Date()]
    });
  }

  ngOnInit(): void {
    this.countries = allCountries();
  }

  registrarUsuario(): void {

    if (this.formularioCreacion.invalid) {
      this._notificaciones.mostrar('error', 'Debes completar el formulario para registrar el usuario.');
      return;
    }

    this.cargandoBoton = true;

    this._usuarios.registro(this.formularioCreacion.getRawValue()).subscribe((res: any) => {
      if (res) { 
        this._notificaciones.mostrar('correcto', 'Hemos registrado el usuario correctamente.');
        this.cerrarModal();
      } else { 
        this._notificaciones.mostrar('error', 'No pudimos registrar el usuario. Intentalo de nuevo.');
      }
      this.cargandoBoton = false;
    }, err => {
      this.cargandoBoton = false;
      this._notificaciones.mostrar('error', 'No pudimos registrar el usuario. Intentalo de nuevo.');
      throw err;
    });

  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
