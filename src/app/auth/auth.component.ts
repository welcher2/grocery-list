import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    isLoading = false;
    loggingIn = true;
    error: string = null;
    loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    constructor(private authService: AuthService, private route: Router) { }

    ngOnInit() {
    }

    onSwitchMode() {
        this.loggingIn = !this.loggingIn;
    }

    onSubmit() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (!this.loggingIn) {
            authObs = this.authService.signup(email, password);
        } else {
            authObs = this.authService.login(email, password);
        }

        authObs.subscribe(
            resData => {
                this.isLoading = false;
                this.route.navigate(['/recipes']);
            }, error => {
                this.error = error;
                this.isLoading = false;
            }
        )

        this.loginForm.reset();
    }

    onHandleError() {
        this.error = null;
    }

}
