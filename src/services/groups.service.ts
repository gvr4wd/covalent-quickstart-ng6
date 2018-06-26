/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Group, User} from '../models/';
import {LoadingService} from './loading.service';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Observable} from 'rxjs/Observable';
import {Logger} from '../shared/logger';
// import {Promise} from 'es6-promise';

// Import RxJs required methods

@Injectable()
export class GroupsService extends BaseService {

  constructor(protected http: Http,
              @Inject(APP_CONFIG) protected config: IAppConfig,
              private loadingService: LoadingService,
              logger: Logger) {
    super(http, config, logger);
  }

  //noinspection TypeScriptUnresolvedVariable
  /**
   * get list of groups
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<any>}
   */
  get(offset: number = 0, limit: number = 10): Promise<any> {
    this.logger.debug('getting groups offset - %d, limit - %d', offset, limit);

    const params: URLSearchParams = new URLSearchParams();
    params.set('offset', offset.toString());
    params.set('limit', limit.toString());

    return this.http.get(this.config.API_ENDPOINT + '/groups',
      {search: params, headers: this.headers}).toPromise().then(
      response => {
        this.logger.log('got response', response);

        const result: any = response.json();
        // const groups = [];
        // result.forEach((group) => {
        //     groups.push(Group.fromJson(group));
        // });
        return result;
      }
    ).catch(error => {
      this.logger.log('error - ', error);
      return null;
    });
  }

  /**
   * set owner for the group
   * @param {Group} group
   * @param {User} owner
   * @returns {Promise<any>}
   */
  setOwner(group: Group, owner: User) {
    return this.http
      .post(this.config.API_ENDPOINT + '/groups/' + group.id + '/owner/' + owner.id, JSON.stringify(group), {headers: this.headers})
      .toPromise()
      .then(() => group)
      .catch(this.handleError);
  }

  /**
   * add member to the group
   * @param {Group} group
   * @param {User} member
   * @returns {Promise<any>}
   */
  addMember(group: Group, member: User) {
    return this.http
      .post(this.config.API_ENDPOINT + '/groups/' + group.id + '/member/' + member.id, JSON.stringify(group), {headers: this.headers})
      .toPromise()
      .then(() => group)
      .catch(this.handleError);
  }

  deleteMember(group: Group, member: User) {
    return this.http
      .delete(this.config.API_ENDPOINT + '/groups/' + group.id + '/member/' + member.id, {headers: this.headers})
      .toPromise()
      .then(() => member)
      .catch(this.handleError);
  }

  /**
   * get group by ID
   * @param id
   * @returns {Promise<Group>}
   */
  getOne(id: any): Promise<Group> {
    this.logger.debug('getOne()');
    this.loadingService.busy = this.http.get(this.config.API_ENDPOINT + '/groups/' + String(id)).toPromise();
    return this.loadingService.busy.then(
      response => {
        // var result: any = response.json();
        this.logger.log('response from server - ', response.json());
        const group: Group = Group.fromJson(response.json());
        return group;
      }).catch(this.handleError);
  }


  /**
   * save group - POST or PATH
   * @param {Group} group
   * @returns {Promise<Group>}
   */
  save(group: Group): Promise<Group> {
    this.logger.debug('saving group');
    if (group.id) {
      return this.patch(group);
    } else {
      return this.post(group);
    }
  }

  /**
   * POST group
   * @param {Group} group
   * @returns {Promise<Group>}
   */
  post(group: Group): Promise<Group> {
    this.logger.debug('group.post()');
    return this.http
      .post(this.config.API_ENDPOINT + '/groups', JSON.stringify(group), {headers: this.headers})
      .toPromise()
      .then((response) => {
        return Group.fromJson(response.json());
      })
      .catch(this.handleError);
  }

  /**
   * PATCH group
   * @param {Group} group
   * @returns {Promise<Group>}
   */
  patch(group: Group): Promise<Group> {
    this.logger.debug('group.patch()');
    return this.http
      .patch(this.config.API_ENDPOINT + '/groups/' + group.id, JSON.stringify(group), {headers: this.headers})
      .toPromise()
      .then(() => group)
      .catch(this.handleError);
  }

  /**
   * DELETE group
   * @param {Group} group
   * @returns {Promise<Group>}
   */
  delete(group: Group): Promise<Group> {
    return this.http
      .delete(this.config.API_ENDPOINT + '/groups/' + group.id, {headers: this.headers})
      .toPromise()
      .then(() => group)
      .catch(this.handleError);
  }

  /**
   * search for groups matching searchTerm
   * @param searchTerm
   * @returns {Observable<R>}
   */
  search(searchTerm: String): Observable<Group[]> {
    this.logger.log('GroupsService.search()');
    return this.http
      .get(this.config.API_ENDPOINT + '/groups/search/' + searchTerm, {headers: this.headers})
      .map(response => {
        return response.json() as Group[];
      });
  }
}
