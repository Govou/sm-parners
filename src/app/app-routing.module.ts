import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InformationComponent } from './components/information/information.component';
import { HeaderComponent } from './components/header/header.component';
import { AssetsComponent } from './components/assets/assets.component';
import { AddassetComponent } from './components/addasset/addasset.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'', component:AuthenticationComponent},
  {path:'asset', component:AssetsComponent},
  {path:'sidenav', component:SidenavComponent},
  {path:'home', component:HomeComponent},
  {path:'settings', component:SettingsComponent},
  {path:'info', component:InformationComponent},
  {path:'header', component:HeaderComponent},
  {path:'addasset', component:AddassetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
