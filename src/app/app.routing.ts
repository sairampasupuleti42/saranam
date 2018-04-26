import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Layouts
import { LoginComponent } from './layouts/login/login.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { DashboardComponent } from './layouts/admin/dashboard/dashboard.component';

import { PanditsComponent } from './layouts/admin/pandits/pandits.component';
import { PoojasComponent } from './layouts/admin/poojas/poojas.component';
import { CategoryListComponent } from './layouts/admin/temples/categories/category-list/category-list.component';
import { AddCategoryComponent } from './layouts/admin/temples/categories/add-category/add-category.component';
import { EditCategoryComponent } from './layouts/admin/temples/categories/edit-category/edit-category.component';
import { TemplesComponent } from './layouts/admin/temples/temples.component';
import { TempleDetailsComponent } from './layouts/admin/temples/temple-details/temple-details.component';
import { TempleAddComponent } from './layouts/admin/temples/temple-add/temple-add.component';
import { UserGuard } from './auth/user.guard';
import { TempleEditComponent } from './layouts/admin/temples/temple-edit/temple-edit.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuard]
  }, {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [UserGuard]
  }, {
    path: 'category/add',
    component: AddCategoryComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'category/edit',
    component: EditCategoryComponent,
    canActivate: [UserGuard]
  }, {
    path: 'temples',
    component: TemplesComponent,
    canActivate: [UserGuard]
  }, {
    path: 'temples/add',
    component: TempleAddComponent,
    canActivate: [UserGuard]
  }, {
    path: 'temple/edit/:temple_id',
    component: TempleEditComponent,
    canActivate: [UserGuard]
  }
  , {
    path: 'temples/view/:temple',
    component: TempleDetailsComponent,
    canActivate: [UserGuard]
  }, {
    path: 'logout',
    component: LogoutComponent,
  }
  // }, {
  //   path: 'pandits',
  //   component: PanditsComponent,
  // }, {
  //   path: 'poojas',
  //   component: PoojasComponent,
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
