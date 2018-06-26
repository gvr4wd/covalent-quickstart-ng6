/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {User} from '../models/user';
import {Resume} from '../models/resume';
import {Project} from '../models/project';
import {Blog} from '../models/blog';
import {Logger} from '../shared/logger';

@Injectable()
export class SearchService extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    parseToObjects(rows, className): Object[] {
        const resultObjects = [];
        // parse users
        for (let j = 0; j < rows.length; j++) {
            resultObjects.push(className.fromJson(rows[j]));
        }
        return resultObjects;
    }

    search(searchStr): Promise<Object> {
        this.logger.debug('get()');

        return this.http.get(this.config.API_ENDPOINT + '/search/' + searchStr, {headers: this.headers}).toPromise().then(
            response => {
                const results: any = response.json();
                this.logger.log('got search results! - ' + results.length);
                for (let i = 0; i < results.length; i++) {
                    if (results[i].type == 'Users') {
                        results[i].results.rows = this.parseToObjects(results[i].results.rows, User);
                    } else if (results[i].type == 'Resumes') {
                        results[i].results.rows = this.parseToObjects(results[i].results.rows, Resume);
                    } else if (results[i].type == 'Projects') {
                        results[i].results.rows = this.parseToObjects(results[i].results.rows, Project);
                    } else if (results[i].type == 'Blogs') {
                        results[i].results.rows = this.parseToObjects(results[i].results.rows, Blog);
                    } else {
                        this.logger.warn('skipping Unhandled type - ' + results[i].type)
                    }
                }
                return results;
            }).catch(this.handleError);
    }


    searchUsers(searchStr): Promise<Object> {
        this.logger.debug('get()');

        return this.http.get(this.config.API_ENDPOINT + '/search/users/' + searchStr, {headers: this.headers}).toPromise().then(
            response => {
                const results: any = response.json();
                this.logger.log('got search results! - ' + results.length);
                for (let i = 0; i < results.length; i++) {
                    results[i].results.rows = this.parseToObjects(results[i].results.rows, User);
                }
                return results;
            }).catch(this.handleError);
    }
}
