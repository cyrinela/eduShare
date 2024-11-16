import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    AppComponent,
    HeaderComponent,
    CreateStudyGroupComponent,
    JoinStudyGroupComponent,
    SidebarComponent,
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
    RechercheCategorieRessourceComponent,
    ListeCategoriesComponent,
    UpdateCategorieComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
