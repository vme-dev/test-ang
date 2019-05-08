import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(  public afAuth: AngularFireAuth, 
                private router: Router,
                private authService: AuthService  ) { }

  canActivate(): Observable<boolean> | 
                 Promise<boolean> | 
                 boolean {
    if ( this.authService.authUser() ) {
      return true;
    } else {
      this.router.navigate([ '/login' ]);  
      return false;
    }
  } 

}
