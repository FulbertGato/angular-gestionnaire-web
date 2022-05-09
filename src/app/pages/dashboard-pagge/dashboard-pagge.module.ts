import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPaggeRoutingModule } from './dashboard-pagge-routing.module';
import { DashboardPaggeComponent } from './dashboard-pagge.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { TypeComplementComponent } from './type-complement/type-complement.component';
import { ComplementComponent } from './complement/complement.component';
import { BurgerComponent } from './burger/burger.component';
import { MenuComponent } from './menu/menu.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { AddBurgerComponent } from './add-burger/add-burger.component';
import { CommandeComponent } from './commande/commande.component';
import { PaiementComponent } from './paiement/paiement.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgToastModule } from 'ng-angular-popup';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { ClientComponent } from './client/client.component';
import { DetailCommandeComponent } from './detail-commande/detail-commande.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    DashboardPaggeComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    TypeComplementComponent,
    ComplementComponent,
    BurgerComponent,
    MenuComponent,
    StatistiqueComponent,
    AddBurgerComponent,
    CommandeComponent,
    PaiementComponent,
    UserComponent,
    EditMenuComponent,
    ClientComponent,
    DetailCommandeComponent

  ],
  imports: [
    CommonModule,
    DashboardPaggeRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgToastModule,
    NgMultiSelectDropDownModule
  ]
})
export class DashboardPaggeModule { }
