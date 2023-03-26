import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarInmuebleComponent } from './editar-inmueble/editar-inmueble.component';
import { NuevoInmuebleComponent } from './nuevo-inmueble/nuevo-inmueble.component';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})

export class InmueblesComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public displayedColumns: string[] = ['id', 'fecha', 'matricula', 'id_propietario', 'id_tipo_inmueble', 'direccion', 'valor_comercial', 'area_total', 'area_construida', 'botones'];
  public dataSource: any = [];

  public user: any = null;

  public usuarios: any = [];
  public tipoInmuebles: any = [];
  public ubicacion: any = [];

  constructor(
    private _auth: AuthService, private _usuarios: UsuariosService,
    public dialog: MatDialog, public _notificaciones: NotificacionesService
  ) { }

  ngOnInit(): void {
    this.user = this._auth.currentUser;
    console.log(this.user);
    this.obtenerDatos();
    this._usuarios.refrescarInmuebles.subscribe((res: any) => {
      if (res) {
        this.obtenerTodosInmuebles();
      }
    });
  }

  obtenerDatos(): void {
    this._usuarios.obtenerTodos(this.user.idrol, this.user.id).subscribe((res: any) => {
      this.usuarios = res;
    }, err => {
      throw err;
    });
    this.obtenerTodosInmuebles();
  }

  obtenerTodosInmuebles(): void {
    this._usuarios.obtenerInmuebles(this.user.idrol, this.user.id).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      throw err;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornarPropietario(id: number) {
    let usuarioEncontrado = this.usuarios.find((x: any) => x.id == id);
    return usuarioEncontrado ? usuarioEncontrado.nombres + " " + usuarioEncontrado.apellidos : "";
  }

  retornarUbicacionInmueble(id: number) {
    let ubicacionEncontrada = this.ubicacion.find((x: any) => x.id == id);
    return ubicacionEncontrada ? ubicacionEncontrada.direccion : "";
  }

  retornarTipoInmueble(id: any) {
    let tipo: any = [
      { id: 1, name: 'Residencial' },
      { id: 2, name: 'Simple y Multifamiliar' },
      { id: 5, name: 'Edificio de Apartamentos' },
      { id: 6, name: 'Industrial' },
      { id: 7, name: 'Minorista' }
    ];
    return tipo.find((x: any) => x.id == id);
  }

  editarInmueble(inmueble: any) {
    const dialogRef = this.dialog.open(EditarInmuebleComponent, {
      width: '700px',
      data: { inmueble: inmueble, usuarios: this.usuarios, ubicacion: this.ubicacion }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerTodosInmuebles();
      }
    });
  }

  eliminarInmueble(inmueble: any) {
    this._usuarios.eliminarinmueble(inmueble).subscribe((res: any) => {
      if (res) {
        this._notificaciones.mostrar("correcto", "Has eliminado el inmueble correctamente.");
        this.obtenerTodosInmuebles();
      } else {
        this._notificaciones.mostrar("error", "Hubo un error al intentar eliminar el inmueble desde base de datos.");
      }
    }, err => {
      this._notificaciones.mostrar("error", "Hubo un error al intentar eliminar el inmueble desde base de datos.");
      return err;
    });
  }

  openDialogNuevo(): void {
    const dialogRef = this.dialog.open(NuevoInmuebleComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerTodosInmuebles();
      }
    });
  }

}
