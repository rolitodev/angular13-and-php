import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ContratoNuevoComponent } from './contrato-nuevo/contrato-nuevo.component';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})

export class ContratosComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public dataSource: any = [];
  public displayedColumns: string[] = ['id', 'id_propietario', 'id_inmueble', 'fecha_inicio', 'fecha_final', 'valor', 'fechaUpdate',];

  public user: any = null;

  public usuarios: any = [];
  public inmuebles: any = [];

  constructor(private _auth: AuthService, private _notificaciones: NotificacionesService,
    private _usuarios: UsuariosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this._auth.currentUser;
    this.obtenerDatos();
    this._usuarios.refrescarContratos.subscribe((res: any) => {
      if (res) {
        this.obtenerDatos();
      }
    });
  }

  obtenerDatos(): void {

    this._usuarios.obtenerContratos().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      throw err;
    });

    this._usuarios.obtenerTodos().subscribe((res: any) => {
      this.usuarios = res;
    }, err => {
      throw err;
    });

    this._usuarios.obtenerInmuebles().subscribe((res: any) => {
      this.inmuebles = res;
    }, err => {
      throw err;
    });

  }

  obtenerInmueble(id: number) {
    let inmuebleEncontrado = this.inmuebles.find((x: any) => x.id == id);
    return inmuebleEncontrado ? ("#" + inmuebleEncontrado.id + " | " + inmuebleEncontrado.matricula) : '';
  }

  obtenerPropietario(id: number) {
    let usuarioEncontrado = this.usuarios.find((x: any) => x.id == id);
    return usuarioEncontrado ? usuarioEncontrado.nombres + " " + usuarioEncontrado.apellidos : "";
  }

  openDialogNuevo() {
    const dialogRef = this.dialog.open(ContratoNuevoComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._usuarios.refrescarData(result);
      }
    });
  }

}
