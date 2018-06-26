import {AfterViewInit, Component} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {TdLoadingService} from '@covalent/core';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../environments/environment';
import {Logger} from '../../shared/logger';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['././login.component.scss'],
})
export class LoginComponent implements AfterViewInit{

  environment = environment;
  username: string = environment.username;
  password: string = environment.password;
  loginFailed: boolean = false;
  loginError: string;

  constructor(private router: Router,
              private titleService: Title,
              private loadingService: TdLoadingService,
              private authService: AuthService,
              private logger: Logger) {
    console.log(this.environment);
  }

  ngAfterViewInit(): void {
    this.titleService.setTitle('Login');
  }

  login(): void {
    this.loginFailed = false;
    this.loadingService.register('main');
    console.log('attempting to log in as ' + this.username);

    //noinspection TypeScriptUnresolvedFunction
    this.authService.login(this.username, this.password).then(
      res => {
        if (res) {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard';

          // Set our navigation extras object
          // that passes on our global query params and fragment
          const navigationExtras: NavigationExtras = {
            preserveQueryParams: true,
            preserveFragment: true
          };

          // Redirect the user
          // this.router.navigate(['home']);
          this.router.navigate(['/']);
          this.loadingService.resolve('main');
        } else {
          this.logger.error('login failed - ', res);
          this.loginFailed = true;
          this.loginError = 'Make sure login/password are set correctly';
          this.loadingService.resolve('main');
        }
      }
    ).catch(error => {
      console.error('error logggin in....');
      this.loginError = error;
      this.loginFailed = true;
      this.loginError = error.toString();
      this.loadingService.resolve('main');
    });

  }
}
