import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  email: string = "";
  password: string = "";
  errors = [];
  loading:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  handleSubmit () {
    if (this.isFormValid()) {
      this.errors = [];
      this.loading = true;

      this.authService.registerWithEmail(this.email,this.password)
                      .then(createdUser => {
                        console.log("New user",createdUser);
                        this.loading = false;
                      })
                      .catch(err => {
                          console.error(err);
                          this.errors.push({ message: err.message });
                          this.loading = false;
                      })
    } 
  }

  cleanInputs () {
    this.email="";
    this.password="";
  }

  isFormValid ()  {
    let error;
    this.errors = [];

    if (this.isFormEmpty(this.email,this.password)) {

      error = { message: "Fill in all fields" };
      this.errors.push(error);
      console.log(this.errors);
      return false;

    } else if (!this.isPasswordValid(this.password)) {

      error = { message: "Password is invalid" };
      this.errors.push(error);
      console.log(this.errors);
      return false;

    } else {
      return true;
    }
  }

  isFormEmpty ( email, password )  {
    return !email.length || !password.length 
  }

  isPasswordValid ( password )  {
    if (password.length < 6 ) {
      return false;
    } else {
      return true;
    }
  };
}
