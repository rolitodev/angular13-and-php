import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;

  public user: any = null;
  public cargandoDatos: boolean = false;

  public usuariosRegistrados: number = 0;
  public contratosRegistrados: number = 0;
  public contadorInmuebles: number = 0;

  public dataUsuarios: any = {};

  public config: { version: string; };

  constructor(
    private _auth: AuthService, private _usuarios: UsuariosService, private _notificaciones: NotificacionesService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public router: Router
  ) {
    this.config = { version: "0" };
    this.config = require("../../../assets/version.json"); // Obtenemos el archivo de la version
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.router.events.subscribe((res: any) => { // Nos suscribimos al cambio de route (ruta)
      if (res instanceof NavigationEnd) {
        this.obtenerTodosLosUsuarios(); // Lamammos a los usuarios
      }
    });

    this._usuarios.refrescar.subscribe((res: any) => {
      if (res) {
        this.obtenerTodosLosUsuarios();
      }
    });

  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges(); // Despues de que termine de cargar la vista detectamos cambios
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  obtenerTodosLosUsuarios(): void {

    this.user = this._auth.currentUser;

    if (this.user) {

      this.cargandoDatos = true;
      this._usuarios.obtenerTodos(this.user.idrol, this.user.id).subscribe((res: any) => {
        if (res) {
          this.dataUsuarios.todos = res;
        } else {
          this._notificaciones.mostrar("info", "No hay usuarios para cargar desde la base de datos.");
        }
        this._usuarios.enviarData(this.dataUsuarios); // Llamamos al método enviarData del servicio para enviarle toda la data
        this.cargandoDatos = false; // Volvemos el botón falso
      }, err => {
        this._notificaciones.mostrar("error", "Hubo un error al intentar cargar los usuarios desde base de datos.");
        throw err;
      });
    }

  }

  cerrarSesion(): void {
    this._auth.logout();
  }

}