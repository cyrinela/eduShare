import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { UserpageComponent } from './user/userpage/userpage.component';
import { RessourcepageComponent } from './ressources/ressourcepage/ressourcepage.component';
import { StudentpageComponent } from './student/studentdashboard/studentdashboard.component';
import { StudentdashComponent } from './student/studentdash/studentdash.component';
import { StudenteditprofileComponent } from './student/studenteditprofile/studenteditprofile.component';
import { StudentreviewsComponent } from './student/studentreviews/studentreviews.component';
import { CategoriesComponent } from './categories/categories.component';
import { StudentgroupsComponent } from './student/studentgroups/studentgroups.component';
import { StudentaddgroupComponent } from './student/studentaddgroup/studentaddgroup.component';
import { StudentaddressourceComponent } from './student/studentaddressource/studentaddressource.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';


export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'userpage', component: UserpageComponent },
  { path: 'ressource/:id', component: RessourcepageComponent },
  { path: 'addressource', component: StudentaddressourceComponent },
  { path: 'editressource', component: StudentpageComponent },
  { path: 'studentdash', component: StudentdashComponent },
  { path: 'studenteditprofile', component: StudenteditprofileComponent },
  { path: 'studentreviews', component: StudentreviewsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'studentgroups', component: StudentgroupsComponent },
  { path: 'studentaddgroup', component: StudentaddgroupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },




  


  { path: '', redirectTo: '/userpage', pathMatch: 'full' }, // Route par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ajoutez 'forRoot' pour configurer les routes
  exports: [RouterModule]
})
export class AppRoutingModule {}


