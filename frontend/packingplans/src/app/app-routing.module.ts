import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {LocationPageComponent} from "./pages/location-page/location-page.component";
import {CardPageComponent} from "./pages/card-page/card-page.component";

const routes: Routes = [
  {path: "home", title: "PackingPlans - Home", component: HomepageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "locations", title: "PackingPlans - Locations", component: LocationPageComponent},
  {path: "locations/1", title: "PackingPlans - Location 1", component: CardPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
