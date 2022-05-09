import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent },
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "registro", component: RegistroComponent },
    { path: "recuperar", component: RecuperarComponent },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "/dashboard" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }