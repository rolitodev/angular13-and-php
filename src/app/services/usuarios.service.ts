import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  @Output() public allInfo: EventEmitter<any> = new EventEmitter<any>();
  @Output() public refrescar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public refrescarInmuebles: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public refrescarContratos: EventEmitter<boolean> = new EventEmitter<boolean>();

  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  enviarData(data: any): void {
    this.allInfo.emit(data);
  }

  refrescarData(status: boolean) {
    this.refrescar.emit(status);
  }

  refrescarDataInmuebles(status: boolean) {
    this.refrescarInmuebles.emit(status);
  }

  refrescarDataContratos(status: boolean) {
    this.refrescarContratos.emit(status);
  }

  registro(registro: any): Observable<any> {
    if (registro.correo) {
      registro.correo = registro.correo.trim().toLowerCase();
    }
    return this.http.post(`${this.baseUrl}/registro.php`, registro).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  obtenerTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenerTodosUsuarios.php`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizarUsuario.php`, usuario).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  eliminarUsuario(usuario: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminarUsuario.php?idUser=${usuario.id}`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  enviarCorreo(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendEmail.php`, usuario).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  obtenerInmuebles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenerTodosInmuebles.php`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  registrarInmueble(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insertarInmueble.php`, datos).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  obtenerTipoInmueble(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenerTipoInmueble.php`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  obtenerUbicacionInmueble(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenerUbicacionInmueble.php`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  eliminarinmueble(data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminarInmueble.php?inmueble=${data.id}`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  actualizarInmueble(inmueble: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizarInmueble.php`, inmueble).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  obtenerContratos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenerTodosContratos.php`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  registrarContrato(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrarContrato.php`, datos).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
