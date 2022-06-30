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
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path:'', component:AuthenticationComponent},
  {path:'asset', component:AssetsComponent, canActivate: [AuthGuard]},
  {path:'sidenav', component:SidenavComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthenticationComponent},
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'settings', component:SettingsComponent, canActivate: [AuthGuard]},
  {path:'info', component:InformationComponent},
  {path:'header', component:HeaderComponent},
  {path:'addasset', component:AddassetComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
