import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})

export class RecuperarComponent implements OnInit {

  public recuperarForm: FormGroup;
  public cargandoBoton: boolean = false;

  constructor(private _fb: FormBuilder,
    private _notificaciones: NotificacionesService,
    private _usuarios: UsuariosService,
    public _router: Router) {
    this.recuperarForm = this._fb.group({
      correo: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  enviarCorreoUsuario(): void {

    if (this.recuperarForm.invalid) {
      this._notificaciones.mostrar('error', 'Debes ingresar un correo electrónico para enviar el correo.');
      return;
    }

    this.cargandoBoton = true;

    this._usuarios.enviarCorreo(this.recuperarForm.getRawValue()).subscribe((res: any) => {
      if (res) {
        this._notificaciones.mostrar('correcto', 'Hemos enviado tu nueva contraseña a tu correo.');
        this._router.navigate(["/login"]);
      } else {
        this._notificaciones.mostrar('error', 'Tuvimos un error al intentar enviarte el correo, intentalo de nuevo.');
      }
      this.cargandoBoton = false;
    }, err => {
      this._notificaciones.mostrar('error', err.error.text);
      this.cargandoBoton = false;
      throw err;
    });
  }

}
