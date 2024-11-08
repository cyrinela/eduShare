import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddRessourceComponent } from './pages/add-ressource/add-ressource.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RessourcesComponent } from './pages/ressources/ressources.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { UpdateRessourceComponent } from './pages/update-ressource/update-ressource.component';
import { CreateStudyGroupComponent } from './pages/create-study-group/create-study-group.component';
import { JoinStudyGroupComponent } from './pages/join-study-group/join-study-group.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'timetable', component: TimetableComponent },
  {path: "ressources", component : RessourcesComponent},
  {path: "add-ressource", component : AddRessourceComponent},
  {path: "updateRessource/:id", component : UpdateRessourceComponent},
  { path: 'create-study-group', component: CreateStudyGroupComponent },
  { path: 'join-study-group', component: JoinStudyGroupComponent },
  { path: '', redirectTo: '/join-study-group', pathMatch: 'full' },
  { path: 'groupes', component: JoinStudyGroupComponent },  // Route pour afficher la liste des groupes
  { path: '**', redirectTo: '' }  // Redirection si l'URL n'existe pas
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
