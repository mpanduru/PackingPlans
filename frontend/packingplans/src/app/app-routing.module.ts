import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterButtonComponent, RegisterComponent} from "./components/register/register.component";
import {LoginButtonComponent, LoginComponent} from "./components/login/login.component";
import {HomepageComponent} from "./components/homepage/homepage.component";

const routes: Routes = [
  {path: 'register', component: RegisterButtonComponent, children: [{path: 'dialog', component: RegisterComponent}]},
  {path: 'login', component: LoginButtonComponent, children: [{path: 'dialog', component: LoginComponent}]},
  {path: "home", title: "PackingPlans - Home", component: HomepageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
