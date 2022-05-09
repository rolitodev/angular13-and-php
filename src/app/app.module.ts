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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditarUsuariosComponent } from './components/dashboard/editar-usuarios/editar-usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistroComponent,
    EditarUsuariosComponent,
    HomeComponent,
    RecuperarComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
