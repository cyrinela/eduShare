import { CommonModule } from '@angular/common';
import { HttpClientModule,provideHttpClient, withFetch  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidenav/sidenav.component';
import { RouterLinkActiveExactDirective } from './main/appRouterLinkActiveExact.directive';
import { MainComponent } from './main/main.component';
import { AddRessourceComponent } from './pages/add-ressource/add-ressource.component';
import { StudentaddressourceComponent } from './student/studentaddressource/studentaddressource.component';
import { CreateStudyGroupComponent } from './pages/create-study-group/create-study-group.component';
import { JoinStudyGroupComponent } from './pages/join-study-group/join-study-group.component';
import { ListeCategoriesComponent } from './pages/liste-categories/liste-categories.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RechercheCategorieRessourceComponent } from './pages/recherche-categorie-ressource/recherche-categorie-ressource.component';
import { RessourcesComponent } from './pages/ressources/ressources.component'; // Import FormsModule
import { TimetableComponent } from './pages/timetable/timetable.component';
import { UpdateCategorieComponent } from './pages/update-categorie/update-categorie.component';
import { UpdateRessourceComponent } from './pages/update-ressource/update-ressource.component';

@NgModule({
  declarations: [
    StudentaddressourceComponent,
    //AppComponent,
    //HeaderComponent,
    //CreateStudyGroupComponent,
    //JoinStudyGroupComponent,
    //SidebarComponent,
    HomeComponent,
    DashboardComponent,
    MainComponent,
    RouterLinkActiveExactDirective,
    ProfileComponent,
    TimetableComponent,
    FooterComponent,
    RessourcesComponent,
    AddRessourceComponent,
    UpdateRessourceComponent,
    //RechercheCategorieRessourceComponent,
    //ListeCategoriesComponent,
    UpdateCategorieComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    //MatTableModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch()), // This line enables `fetch` APIs for HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
