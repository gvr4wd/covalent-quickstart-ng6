/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Role, User} from '../models/';
import {LoadingService} from './loading.service';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Observable} from 'rxjs/Observable';
import {Logger} from '../shared/logger';
import {logger} from 'codelyzer/util/logger';
// import {Promise} from 'es6-promise';

// Import RxJs required methods

@Injectable()
export class RolesService extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                private loadingService: LoadingService,
                logger: Logger) {
        super(http, config, logger);
    }

    //noinspection TypeScriptUnresolvedVariable
    /**
     * get list of roles
     * @param {number} offset
     * @param {number} limit
     * @returns {Promise<any>}
     */
    get(offset: number = 0, limit: number = 10): Promise<any> {
        this.logger.debug('getting roles offset - %d, limit - %d', offset, limit);

        const params: URLSearchParams = new URLSearchParams();
        params.set('offset', offset.toString());
        params.set('limit', limit.toString());

        return this.http.get(this.config.API_ENDPOINT + '/roles',
            {search: params, headers: this.headers}).toPromise().then(
            response => {
                this.logger.log('got response', response);

                const result: any = response.json();
                // const roles = [];
                // result.forEach((role) => {
                //     roles.push(Role.fromJson(role));
                // });
                return result;
            }
        ).catch(error => {
            this.logger.log('error - ', error);
            return null;
        });
    }

    /**
     * add user to the role
     * @param {Role} role
     * @param {User} user
     * @returns {Promise<any>}
     */
    addUser(role: Role, user: User) {
        return this.http
            .post(this.config.API_ENDPOINT + '/roles/' + role.id + '/user/' + user.id, JSON.stringify(role), {headers: this.headers})
            .toPromise()
            .then(() => role)
            .catch(this.handleError);
    }

    deleteUser(role: Role, user: User) {
        return this.http
            .delete(this.config.API_ENDPOINT + '/roles/' + role.id + '/user/' + user.id, {headers: this.headers})
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    /**
     * get role by ID
     * @param id
     * @returns {Promise<Role>}
     */
    getOne(id: any): Promise<Role> {
        this.logger.debug('getOne()');
        this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/roles/' + String(id)).toPromise();
        return this.loadingService.busy.then(
            response => {
                // var result: any = response.json();
                this.logger.log('response from server - ', response.json());
                const role: Role = Role.fromJson(response.json());
                return role;
            }).catch(this.handleError);
    }


    /**
     * save role - POST or PATH
     * @param {Role} role
     * @returns {Promise<Role>}
     */
    save(role: Role): Promise<Role> {
        if (role.id) {
            return this.post(role);
        } else {
            return this.patch(role);
        }
    }

    /**
     * POST role
     * @param {Role} role
     * @returns {Promise<Role>}
     */
    post(role: Role): Promise<Role> {
        return this.http
            .patch(this.config.API_ENDPOINT + '/roles/' + role.id, JSON.stringify(role), {headers: this.headers})
            .toPromise()
            .then(() => role)
            .catch(this.handleError);
    }

    /**
     * PATCH role
     * @param {Role} role
     * @returns {Promise<Role>}
     */
    patch(role: Role): Promise<Role> {
        return this.http
            .patch(this.config.API_ENDPOINT + '/roles/' + role.id, JSON.stringify(role), {headers: this.headers})
            .toPromise()
            .then(() => role)
            .catch(this.handleError);
    }

    /**
     * DELETE role
     * @param {Role} role
     * @returns {Promise<Role>}
     */
    delete(role: Role): Promise<Role> {
        return this.http
            .delete(this.config.API_ENDPOINT + '/roles/' + role.id, {headers: this.headers})
            .toPromise()
            .then(() => role)
            .catch(this.handleError);
    }

    /**
     * search for roles matching searchTerm
     * @param searchTerm
     * @returns {Observable<R>}
     */
    search(searchTerm: String): Observable<Role[]> {
        this.logger.log('RolesService.search()');
        return this.http
            .get(this.config.API_ENDPOINT + '/roles/search/' + searchTerm, {headers: this.headers})
            .map(response => {
                return response.json() as Role[];
            });
    }
}
