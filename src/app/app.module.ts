import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotificationMsgModule } from 'ngx-notification-msg';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarUsuariosComponent } from './components/dashboard/tabla-usuarios/editar-usuarios/editar-usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { InmueblesComponent } from './components/dashboard/inmuebles/inmuebles.component';
import { CrearUsuariosComponent } from './components/dashboard/tabla-usuarios/crear-usuarios/crear-usuarios.component';
import { TablaUsuariosComponent } from './components/dashboard/tabla-usuarios/tabla-usuarios.component';
import { NuevoInmuebleComponent } from './components/dashboard/inmuebles/nuevo-inmueble/nuevo-inmueble.component';
import { EditarInmuebleComponent } from './components/dashboard/inmuebles/editar-inmueble/editar-inmueble.component';
import { ContratosComponent } from './components/dashboard/contratos/contratos.component';
import { ContratoNuevoComponent } from './components/dashboard/contratos/contrato-nuevo/contrato-nuevo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistroComponent,
    EditarUsuariosComponent,
    HomeComponent,
    RecuperarComponent,
    InmueblesComponent,
    CrearUsuariosComponent,
    TablaUsuariosComponent,
    NuevoInmuebleComponent,
    EditarInmuebleComponent,
    ContratosComponent,
    ContratoNuevoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxNotificationMsgModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
