import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  public formularioRegistro: FormGroup;
  public hide: boolean = true;
  public cargandoBoton: boolean = false;

  constructor(
    public _fb: FormBuilder,
    private _usuarios: UsuariosService,
    private _notificaciones: NotificacionesService,
    private router: Router
  ) {
    this.formularioRegistro = this._fb.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  enviarFomulario(): void {

    if (this.formularioRegistro.invalid) {
      this._notificaciones.mostrar("error", "No has llenado el formulario correctamente.");
      return;
    }

    this.cargandoBoton = true;

    this._usuarios.registro(this.formularioRegistro.getRawValue()).subscribe((res: any) => {
      this.cargandoBoton = false;
      if (res) {
        this._notificaciones.mostrar("exito", "Tu usuario ha sido registrado correctamente. Debes iniciar sesión.");
        this.router.navigate(["/login"]);
      } else {
        this._notificaciones.mostrar("error", "Tu usuario no se ha podido registrar, quizás el correo ya está siendo usado. Intenta de nuevo.");
      }
    }), catchError((error) => {
      this.cargandoBoton = false;
      return error;
    });

  }

}
