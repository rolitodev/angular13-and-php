import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup;
  public hide: boolean = true;
  public cargandoBoton: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _notificaciones: NotificacionesService,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.formularioLogin = this._fb.group({
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  enviarFomulario(): void {
    if (this.formularioLogin.invalid) {
      this._notificaciones.mostrar("error", "No has llenado el formulario correctamente.");
      return;
    }
    this.obtenerUsuario();
  }

  obtenerUsuario(): void {
    this.cargandoBoton = true;
    this._auth.login({ password: this.formularioLogin.getRawValue().password, correo: this.formularioLogin.getRawValue().correo })
      .subscribe((res: any) => {
        if (!res) {
          this._notificaciones.mostrar("error", "El usuario o contraseña son incorrectos, intentalo de nuevo.");
        } else {
          this._router.navigate(["/dashboard"]);
        }
        this.cargandoBoton = false;
      }, error => {
        this._notificaciones.mostrar("error", "Ocurrió un error en el servidor backend, intentalo de nuevo.");
        this.cargandoBoton = false;
        return error;
      });
  }

}
