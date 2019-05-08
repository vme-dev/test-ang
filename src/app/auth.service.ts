import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: any;

  constructor( private afauth: AngularFireAuth,
               private router: Router ) { 
    this.afauth.authState.subscribe( (user) => {
      this.authState = user;
      if (this.authUser()) {
        this.redirect("");
      }
    })
  }

  authUser():boolean {
    return this.authState !== null && this.authState !== undefined ? true : false;
  }

  loginWithGoogle() {
    this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout(url) {
    this.afauth.auth.signOut();
    this.redirect(url);
  }

  redirect(url:string){
    this.router.navigate([ url ]);
  }

  getUserName () {
    if (this.authState) {
      return this.authState.displayName;
    } else {
      return false;
    }
  }

  loginWithEmail(email: string, password: string){
    return this.afauth.auth.signInWithEmailAndPassword(email,password);        
  }

  registerWithEmail (email: string, password: string) {
    return this.afauth.auth.createUserWithEmailAndPassword(email,password);              
  }

}
