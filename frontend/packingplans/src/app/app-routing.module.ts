import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LocationPageComponent} from "./components/location-page/location-page.component";

const routes: Routes = [
  {path: "home", title: "PackingPlans - Home", component: HomepageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "locations", title: "PackingPlans - Locations", component: LocationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
