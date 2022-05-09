import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: any = null;
  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private router: Router,
    private _storage: StorageService
  ) {
    this.setUser();
  }

  get currentUser(): any {
    return this.user;
  }

  setUser() {
    this.user = this.getAuthFromLocalStorage();
  }

  login(login: any): Observable<any> {

    if (login.correo) {
      login.correo = login.correo.trim().toLowerCase();
    }

    return this.http.post(`${this.baseUrl}/login.php`, login).pipe(
      map((respuesta: any) => {
        if (respuesta) {
          this._storage.setItem("user", { ...respuesta });
          this.user = this.getAuthFromLocalStorage();
        }
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  private getAuthFromLocalStorage() {
    try {
      return this._storage.getItem("user");
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logout() {
    await this._storage.removeItem("user")
    await this._storage.clear();
    this.router.navigate(['/inicio'], {
      queryParams: {},
    });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
