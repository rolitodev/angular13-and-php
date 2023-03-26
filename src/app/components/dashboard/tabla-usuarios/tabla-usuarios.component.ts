import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})

export class TablaUsuariosComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public displayedColumns: string[] = ['id', 'fecha_registro', 'ultimo_update', 'nombres', 'apellidos', 'correo', 'pais', 'idrol', 'botones'];
  public dataSource: any = [];

  public mostrarModal: boolean = false;
  public mostrarModalUsuarios: boolean = false;

  public usuarioAEditar: any = null;
  public user: any = null;

  public allData: any = null;

  constructor(
    private _auth: AuthService, private _notificaciones: NotificacionesService,
    private _usuarios: UsuariosService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = this._auth.currentUser;
    console.log(this.user)
    this._usuarios.allInfo.subscribe((res: any) => {
      this.allData = res;
      this.dataSource = new MatTableDataSource(this.allData.todos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editarUsuario(elemento: any) {
    this.usuarioAEditar = elemento;
    this.openDialogEditar();
  }

  eliminarUsuario(usuario: any) {
    if (usuario.id === this._auth.currentUser.id) {
      this._notificaciones.mostrar("error", "No puedes eliminarte a ti mismo de la base de datos.");
      return;
    }
    this._usuarios.eliminarUsuario(usuario).subscribe((res: any) => {
      if (res) {
        this._notificaciones.mostrar("correcto", "Has eliminado el usuario correctamente.");
        this._usuarios.refrescarData(true);
      } else {
        this._notificaciones.mostrar("error", "Hubo un error al intentar eliminar el usuario desde base de datos.");
      }
    }, err => {
      this._notificaciones.mostrar("error", "Hubo un error al intentar eliminar el usuario desde base de datos.");
      return err;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogEditar(): void {
    const dialogRef = this.dialog.open(EditarUsuariosComponent, {
      width: '700px',
      data: { data: this.usuarioAEditar },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._usuarios.refrescarData(result);
      }
    });
  }

  openDialogNuevo(): void {
    const dialogRef = this.dialog.open(CrearUsuariosComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._usuarios.refrescarData(result);
      }
    });
  }

}
