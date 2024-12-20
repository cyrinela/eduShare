import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddCategorieComponent } from './admin/admin-add-categorie/admin-add-categorie.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminRessourcesComponent } from './admin/admin-ressources/admin-ressources.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CategoriesComponent } from './categories/categories.component';
import { RessourcepageComponent } from './ressources/ressourcepage/ressourcepage.component';
import { StudentaddgroupComponent } from './student/studentaddgroup/studentaddgroup.component';
import { StudentaddressourceComponent } from './student/studentaddressource/studentaddressource.component';
import { StudentdashComponent } from './student/studentdash/studentdash.component';
import { StudentpageComponent } from './student/studentdashboard/studentdashboard.component';
import { StudenteditprofileComponent } from './student/studenteditprofile/studenteditprofile.component';
import { StudentgroupsComponent } from './student/studentgroups/studentgroups.component';
import { StudentreviewsComponent } from './student/studentreviews/studentreviews.component';
import { UserpageComponent } from './user/userpage/userpage.component';


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
<<<<<<< Updated upstream
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
=======
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'admin-ressources', component: AdminRessourcesComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-categories', component: AdminCategoriesComponent },
  { path: 'admin-add-categorie', component: AdminAddCategorieComponent},
>>>>>>> Stashed changes






  { path: '', redirectTo: '/userpage', pathMatch: 'full' }, // Route par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ajoutez 'forRoot' pour configurer les routes
  exports: [RouterModule]
})
export class AppRoutingModule {}


