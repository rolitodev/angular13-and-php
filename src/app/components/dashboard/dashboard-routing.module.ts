import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { DashboardComponent } from './dashboard.component';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { ContratosComponent } from './contratos/contratos.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', component: TablaUsuariosComponent },
            { path: 'inmuebles', component: InmueblesComponent },
            { path: 'contratos', component: ContratosComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
