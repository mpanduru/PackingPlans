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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {FooterComponent} from './components/footer/footer.component';
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TripActionsComponent} from './components/trip-actions/trip-actions.component';
import {DatePipe} from "@angular/common";
import {TripPlanPageComponent} from './pages/trip-plan-page/trip-plan-page.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog-component/confirmation-dialog.component';
import { SpecificTripActivitiesComponent } from './components/specific-trip-activities/specific-trip-activities.component';
import { LowerHomepageComponent } from './pages/lower-homepage/lower-homepage.component';
import { AddUserToTripComponent } from './components/add-user-to-trip/add-user-to-trip.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';

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
    CardPageComponent,
    DatePickerComponent,
    FooterComponent,
    CalendarPageComponent,
    TripActionsComponent,
    TripPlanPageComponent,
    ConfirmationDialogComponent,
    SpecificTripActivitiesComponent,
    LowerHomepageComponent,
    AddUserToTripComponent,
    AllUsersComponent,
    NewActivityComponent
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
    }),
    FullCalendarModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [httpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
