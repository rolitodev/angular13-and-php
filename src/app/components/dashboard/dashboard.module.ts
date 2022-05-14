import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContratosComponent } from './contratos/contratos.component';

@NgModule({
    declarations: [
        ContratosComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    entryComponents: []
})
export class DashboardModule { }
