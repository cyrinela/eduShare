import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UsercontentComponent } from './user/usercontent/usercontent.component';
import { UserfooterComponent } from './user/userfooter/userfooter.component';
import { UserheaderComponent } from './user/userheader/userheader.component';
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

export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'usercont', component: UsercontentComponent },
  { path: 'userhead', component: UserheaderComponent },
  { path: 'userfoot', component: UserfooterComponent },
  { path: 'userpage', component: UserpageComponent },
  { path: 'ressource', component: RessourcepageComponent },
  { path: 'studentdashboard', component: StudentpageComponent },
  { path: 'studentdash', component: StudentdashComponent },
  { path: 'studenteditprofile', component: StudenteditprofileComponent },
  { path: 'studentreviews', component: StudentreviewsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'studentgroups', component: StudentgroupsComponent },
  { path: 'studentaddgroup', component: StudentaddgroupComponent },
  { path: 'studentaddressource', component: StudentaddressourceComponent },




  


  { path: '', redirectTo: '/userpage', pathMatch: 'full' }, // Route par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ajoutez 'forRoot' pour configurer les routes
  exports: [RouterModule]
})
export class AppRoutingModule {}


