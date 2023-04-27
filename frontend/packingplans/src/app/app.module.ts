import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from "./helpers/http.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LocationCardComponent} from './components/location-card/location-card.component';
import {LocationPageComponent} from './pages/location-page/location-page.component';
import {MatCardModule} from "@angular/material/card";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {LocationTagComponent} from './components/location-tag/location-tag.component';
import {MatSelectModule} from "@angular/material/select";
import {CardPageComponent} from './pages/card-page/card-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    HomepageComponent,
    CarouselComponent,
    LocationCardComponent,
    LocationPageComponent,
    LocationTagComponent,
    CardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MdbCarouselModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNqPlc0-a9AsgTOnR9GR7dN5lp-hiXWDw'
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
