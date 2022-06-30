import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
// import {NgxPageScrollModule} from 'ngx-page-scroll';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Angular4PaystackModule } from 'angular4-paystack';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AddassetComponent } from './components/addasset/addasset.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InformationComponent } from './components/information/information.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { AssetsComponent } from './components/assets/assets.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthGuard } from './auth-guard.guard';
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ServerErrorsInterceptor } from './interceptors/error-handling.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    SidenavComponent,
    HomeComponent,
    AddassetComponent,
    SettingsComponent,
    InformationComponent,
    HeaderComponent,
    BodyComponent,
    AssetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    // NgxPageScrollModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxSpinnerModule,
    Angular4PaystackModule.forRoot('pk_test_xxxxxxxxxxxxxxxxxxxxxxxx'),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Your config
    LazyLoadImageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-left",
    }),
    NgToastModule
  ],
  exports: [RouterModule],
  // providers: [AuthGuard, {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ServerErrorsInterceptor,
  //   multi:true
  // }],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
