/**
 * Created by dshin on 9/30/16.
 */
import {Inject, Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Http} from '@angular/http';
import {User} from '../models/user';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Logger} from '../shared/logger';

//noinspection TypeScriptUnresolvedFunction
@Injectable()
export class AuthService extends BaseService {
  // isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private authenticationState = new Subject<any>();

  constructor(protected http: Http,
              @Inject(APP_CONFIG) protected config: IAppConfig,
              logger: Logger) {
    super(http, config, logger);
  }

  isLoggedIn(): boolean {
    var user = sessionStorage.getItem('user');
    return user != null;
  }

  getUser(): User {
    return User.fromJson(JSON.parse(sessionStorage.getItem('user')));
  }

  login(email: string, password: string): Promise<User> {
    this.logger.debug('attempting to login - user info: ' + email);
    let user: User = new User();
    user.login = email;
    user.password = password;

    return this.http.post('/api/users/login', user, {headers: this.headers}).toPromise().then(
      response => {
        this.logger.debug('login success!');
        user = User.fromJson(response.json());
        this.logger.debug('setting user - ', user);
        sessionStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    ).catch(error => {
      this.logger.error('error - login failed.');
      return this.handleError(error);
    });
  }

  logout(): void {
    this.logger.debug('setting user to null');
    sessionStorage.removeItem('user');
  }

  hasAnyAuthorityDirect(authorities: string[]): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    const user: User = this.getUser();
    for (let i = 0; i < authorities.length; i++) {
      if (user.hasRole(authorities[i])) {
        return true;
      }
    }
    return false;
  }

  hasAnyAuthority(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
  }

  authenticate(identity) {
    const user: User = this.getUser();
    this.authenticationState.next(user);
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }
}
