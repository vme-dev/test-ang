import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  errors = [];
  loading:boolean = false;

  constructor(private authService: AuthService) {}
  
  ngOnInit() {}

  handleSubmit () {
    if (this.isFormValid()) {
      this.errors = [];
      this.loading = true;

      this.authService.loginWithEmail(this.email,this.password)
                      .then(user => {
                        console.log("New user",user);
                        this.loading = false;
                      })
                      .catch(err => {
                          console.error(err);
                          this.errors.push({ message: err.message });
                          this.loading = false;
                      })
    }
  }

  enterWithGoogle () {
    this.authService.loginWithGoogle();
  }
 
  cleanInputs(){
    this.email="";
    this.password="";
  }

  isFormValid ()  {
    let error;
    this.errors = [];

    if (this.isFormEmpty(this.email,this.password)) {

      error = { message: "Fill in all fields" };
      this.errors.push(error);
      return false;

    } else {
      return true;
    }
  }

  isFormEmpty ( email, password )  {
    return !email.length || !password.length 
  }

}
