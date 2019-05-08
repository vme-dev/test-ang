import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivatePageComponent } from './private-page/private-page.component';

var firebaseConfig = {
  apiKey: "AIzaSyBQn8GZrtWja99x1YLj6IY0qA3eHyj7Qss",
  authDomain: "testapp-2f0dc.firebaseapp.com",
  databaseURL: "https://testapp-2f0dc.firebaseio.com",
  projectId: "testapp-2f0dc",
  storageBucket: "testapp-2f0dc.appspot.com",
  messagingSenderId: "977278167066",
  appId: "1:977278167066:web:196e6705fc9aef25"
};



const appRoutes: Routes =[
  { path: '', component: PrivatePageComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrivatePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
