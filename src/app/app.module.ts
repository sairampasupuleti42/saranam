import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGuard } from './auth/user.guard';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './layouts/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
// admin
import { DashboardComponent } from './layouts/admin/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/admin/sidebar/sidebar.component';

import { AdminHeaderComponent } from './layouts/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './layouts/admin/admin-footer/admin-footer.component';
import { TemplesComponent } from './layouts/admin/temples/temples.component';
import { PanditsComponent } from './layouts/admin/pandits/pandits.component';
import { PoojasComponent } from './layouts/admin/poojas/poojas.component';

import { TempleService } from './services/temple.service';
import { DashboardService } from './services/dashboard.service';
import { CategoryService } from './services/category.service';
import { TempleDetailsComponent } from './layouts/admin/temples/temple-details/temple-details.component';
import { TempleAddComponent } from './layouts/admin/temples/temple-add/temple-add.component';
import { CategoryListComponent } from './layouts/admin/temples/categories/category-list/category-list.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { AddCategoryComponent } from './layouts/admin/temples/categories/add-category/add-category.component';
import { UserService } from './services/user.service';
import { EditCategoryComponent } from './layouts/admin/temples/categories/edit-category/edit-category.component';
import { TempleEditComponent } from './layouts/admin/temples/temple-edit/temple-edit.component';
import { UsersListComponent } from './layouts/users/users-list/users-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    TemplesComponent,
    PanditsComponent,
    PoojasComponent,
    TempleDetailsComponent,
    TempleAddComponent,
    CategoryListComponent,
    LogoutComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    TempleEditComponent,
    UsersListComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }, TempleService, CategoryService, UserGuard,UserService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
