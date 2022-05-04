import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBurgerComponent } from './add-burger/add-burger.component';
import { BurgerComponent } from './burger/burger.component';
import { ComplementComponent } from './complement/complement.component';
import { DashboardPaggeComponent } from './dashboard-pagge.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { MenuComponent } from './menu/menu.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { TypeComplementComponent } from './type-complement/type-complement.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: DashboardPaggeComponent,
    children:[
      {path: 'types', component: TypeComplementComponent},
      {path:'complements',component:ComplementComponent},
      {path:'burgers',component:BurgerComponent},
      {path:'menus',component:MenuComponent},
      {path:'menus/add',component:AddBurgerComponent},
      {path:'menus/edit/:id',component:EditMenuComponent},
      {path:'commandes',component:MenuComponent},
      {path:'paiements',component:MenuComponent},
      {path:'users',component:UserComponent},
      {path:'dashboard',component:StatistiqueComponent},
      {path:'',component:StatistiqueComponent,pathMatch:'full'}
    ]



  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPaggeRoutingModule { }
