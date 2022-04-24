import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  public user: any = null;

  public displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'correo', 'botones'];
  public dataSource: any = [];

  public cargandoDatos: boolean = false;
  public mostrarModal: boolean = false;

  public usuarioAEditar: any = {};

  public actualYear = new Date().getFullYear();

  public usuariosRegistrados: number = 0;

  constructor(private _auth: AuthService, private _usuarios: UsuariosService, private _notificaciones: NotificacionesService) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.user = this._auth.currentUser;

    if (this.user) {

      this.cargandoDatos = true;

      let primeraPromesa = new Promise((resolve, reject) => {
        this._usuarios.contadorUsuarios().subscribe((res: any) => {
          if (res.contador_usuarios) {
            this.usuariosRegistrados = res.contador_usuarios;
            resolve(res);
          }
        }), catchError((error) => {
          reject(error);
          this._notificaciones.mostrar("error", "Hubo un error al intentar cargar el contador de los usuarios desde base de datos.");
          return error;
        });
      })

      let segundaPromesa = new Promise((resolve, reject) => {
        this._usuarios.obtenerTodos().subscribe((res: any) => {
          if (res) {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
          } else {
            this._notificaciones.mostrar("info", "No hay usuarios para cargar desde la base de datos.");
          }
          resolve(res);
        }), catchError((error) => {
          reject(error);
          this._notificaciones.mostrar("error", "Hubo un error al intentar cargar los usuarios desde base de datos.");
          return error;
        });
      });

      Promise.all([primeraPromesa, segundaPromesa]).then(() => {
        this.cargandoDatos = false;
      });

    }

  }

  editarUsuario(elemento: any) {
    this.usuarioAEditar = elemento;
    this.mostrarModal = true;
  }

  recibirEmitirEstado(estado: boolean): void {
    this.mostrarModal = estado;
    this.usuarioAEditar = null;
  }

  cerarSesion(): void {
    this._auth.logout();
  }

}
