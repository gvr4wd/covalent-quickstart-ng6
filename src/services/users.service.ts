/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user';
import {LoadingService} from './loading.service';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {ChargeNumber} from '../models/charge-number';
import {Observable} from 'rxjs/Observable';
import {Logger} from '../shared/logger';
// import {Promise} from 'es6-promise';

// Import RxJs required methods

@Injectable()
export class UsersService extends BaseService {

  private usersUrl = 'http://localhost:8080/api/v2/bom/_table/users';  // URL to web api

  constructor(protected http: Http,
              @Inject(APP_CONFIG) protected config: IAppConfig,
              private loadingService: LoadingService,
              logger: Logger) {
    super(http, config, logger);
  }

  //noinspection TypeScriptUnresolvedVariable
  getUsers(offset: number = 0, limit: number = 10): Promise<any> {
    this.logger.debug('getting users offset - %d, limit - %d', offset, limit);

    let params: URLSearchParams = new URLSearchParams();
    params.set('offset', offset.toString());
    params.set('limit', limit.toString());

    return this.http.get(this.config.API_ENDPOINT + '/users',
      {search: params, headers: this.headers}).toPromise().then(
      response => {
        this.logger.log('got response' + response);

        const result: any = response.json();
        // const users: Array < User > = [];
        // result.forEach((user) => {
        //     users.push(User.fromJson(user));
        // });
        return result;
      }
    ).catch(error => {
      this.logger.log('error');
      this.logger.log(error);

      return null;
    });
  }

  getUser(id: any): Promise<User> {
    this.logger.debug('getUser()');
    this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/users/' + String(id)).toPromise();
    return this.loadingService.busy.then(
      response => {
        // var result: any = response.json();
        this.logger.log('response from server - ', response.json());
        const user: User = User.fromJson(response.json());
        return user;
      }).catch(this.handleError);
  }

  // app.get('/api/users/:id/details', (req, res) => {
  getUserDetails(id: any): Promise<User> {
    this.logger.debug('getUserDerails - ', id);
    this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/users/' + String(id) + '/details').toPromise();
    return this.loadingService.busy.then(
      response => {
        // var result: any = response.json();
        this.logger.log('response from server - ', response.json());
        const user: User = User.fromJson(response.json());
        return user;
      }).catch(this.handleError);
  }

  getCurrentUser(): User {
    const value: string = sessionStorage.getItem('user');

    if (value && value !== 'undefined' && value !== 'null') {
      return <User>JSON.parse(value);
    }

    return null;
  }

  setCurrentUser(user): void {
    this.logger.debug('settin user - ' + user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  update(user: User): Promise<User> {
    return this.http
      .patch(this.config.API_ENDPOINT + '/users/' + user.id, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  /**
   * search for users matching searchTerm
   * @param searchTerm
   * @returns {Observable<R>}
   */
  search(searchTerm: String): Observable<User[]> {
    this.logger.log('UsersService.search()');
    return this.http
      .get(this.config.API_ENDPOINT + '/users/search/' + searchTerm, {headers: this.headers})
      .map(response => {
        return response.json() as User[];
      });
  }

  updateCurrentUser(user: User): Promise<User> {
    return this.http
      .put(this.config.API_ENDPOINT + '/users', JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(response => {
        let user: User;
        user = User.fromJson(response.json());
        this.logger.debug('setting user - ' + user);
        sessionStorage.setItem('user', JSON.stringify(user));
        return user;
      })
      .catch(this.handleError);
  }

  getUserObject(user: User, path: String): Promise<any> {
    this.logger.debug('getUserObject()');

    this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/users/' + String(user.id) + '/' + path).toPromise();
    return this.loadingService.busy.then(
      response => {
        this.logger.debug('got data from ' + path);
        const result: any = response.json();
        return result;
      }).catch(this.handleError);
  }

  // Todo for angular 5...
  // https://stackoverflow.com/questions/34475523/how-to-pass-url-arguments-query-string-to-a-http-request-on-angular-2
  // import { HttpParams, HttpClient } from '@angular/common/http';
  //
  // constructor(private http: HttpClient) { }
  //
  // let params = new HttpParams();
  // params = params.append('var1', val1);
  // params = params.append('var2', val2);
  //
  // this.http.get(StaticSettings.BASE_URL, {params: params}).subscribe(...);
  getUserObjects(user: User, path: String, params: URLSearchParams = null): Promise<any> {

    this.logger.debug('getUserObjects()');
    this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/users/' + String(user.id) + '/' + path,
      {search: params}).toPromise();
    return this.loadingService.busy.then(
      response => {
        this.logger.debug('got data from ' + path);
        const result: any = response.json();
        return result;
      }).catch(this.handleError);
  }

  saveUserObject(user: User, object: any, path: String): Promise<any> {
    this.logger.debug('saveUserObject()');
    if (object.id) {
      this.loadingService.busy = this.http
        .patch(this.config.API_ENDPOINT + '/users/' + String(user.id) + '/' + path,
          object.toJson(false), {headers: this.headers})
        .toPromise();
      return this.loadingService.busy
        .then(() => object)
        .catch(this.handleError);
    } else {
      this.loadingService.busy = this.http
        .post(this.config.API_ENDPOINT + '/users/' + String(user.id) + '/' + path, object.toJson(false),
          {headers: this.headers})
        .toPromise();
      return this.loadingService.busy
        .then(resp => {
          const body = resp.json();
          object.id = body.id;
          return object;
        })
        .catch(this.handleError);
    }
  }

  deleteUserObject(user: User, object: any, path: String): Promise<any> {
    this.logger.debug('deleteUserObject()');
    this.loadingService.busy = this.http
      .delete(this.config.API_ENDPOINT + '/users/' + String(user.id) + '/' + path + '/' + object.id,
        {headers: this.headers})
      .toPromise();
    return this.loadingService.busy
      .then(() => object)
      .catch(this.handleError);
  }

  /**
   * Todo change this to PUT?
   * @param user
   * @returns {Promise<any|User>|Promise<User>}
   */
  changePassword(user: User): Promise<User> {
    return this.http
      .put(this.config.API_ENDPOINT + '/users', JSON.stringify(user))
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }


  getChargeNumbers(): ChargeNumber[] {
    this.logger.debug('getting charge numbers');
    const chargeNumbers: ChargeNumber[] = [];
    for (let i = 0; i < 10; i++) {
      chargeNumbers.push(
        new ChargeNumber(i + 1, 'CHARGE-NUMBER ' + (i + 1), 'description for the charge number', 'PROJECT ' + (i + 1)));
    }
    return chargeNumbers;
  }

}
