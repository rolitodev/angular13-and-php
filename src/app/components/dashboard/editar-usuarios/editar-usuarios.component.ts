import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  @Output() public emitirEstado: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() public mostrarModal: boolean = false;
  @Input() public usuarioAEditar: any;

  public estadoActualModal: boolean = false;
  public hide: boolean = true;
  public cargandoBoton: boolean = false;

  public formularioActualizacion: FormGroup;
  public countries: any = [];

  constructor(
    private _fb: FormBuilder,
    private _notificaciones: NotificacionesService,
    private _usuarios: UsuariosService,
    public _auth: AuthService
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
      idrol: [null]
    });
  }

  ngOnInit(): void {
    this.countries = allCountries();
  }

  ngOnChanges() {

    if (this.mostrarModal) {
      this.estadoActualModal = true;
    }

    if (this.usuarioAEditar) {
      this.formularioActualizacion.controls['id'].setValue(this.usuarioAEditar ? this.usuarioAEditar.id : null);
      this.formularioActualizacion.controls['nombres'].setValue(this.usuarioAEditar ? this.usuarioAEditar.nombres : null);
      this.formularioActualizacion.controls['apellidos'].setValue(this.usuarioAEditar ? this.usuarioAEditar.apellidos : null);
      this.formularioActualizacion.controls['correo'].setValue(this.usuarioAEditar ? this.usuarioAEditar.correo : null);
      this.formularioActualizacion.controls['password'].setValue(this.usuarioAEditar ? this.usuarioAEditar.password : null);
      this.formularioActualizacion.controls['pais'].setValue(this.usuarioAEditar ? this.usuarioAEditar.pais : null);
      this.formularioActualizacion.controls['telefono'].setValue(this.usuarioAEditar ? this.usuarioAEditar.telefono : null);
      this.formularioActualizacion.controls['direccion'].setValue(this.usuarioAEditar ? this.usuarioAEditar.direccion : null);
      this.formularioActualizacion.controls['idrol'].setValue(this.usuarioAEditar ? this.usuarioAEditar.idrol : null);

      if (this.usuarioAEditar.id === this._auth.currentUser.id) {
        this.formularioActualizacion.controls['idrol'].disable();
      }

    }

  }

  cerrarModal(): void {
    this.estadoActualModal = false;
    this.emitirEstado.emit(false);
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
        this.cerrarModal();
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

}
