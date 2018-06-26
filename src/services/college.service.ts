/**
 * Created by dshin on 11/6/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {College} from '../models/college';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';

@Injectable()
export class CollegeService extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    get (): Promise<College[]> {
        console.debug('get()');

        return this.http.get(this.config.API_ENDPOINT + '/colleges', {headers:this.headers}).toPromise().then(
            response => {
                console.log('got colleges!');
                const result: any = response.json();
                const colleges: Array < College > = [];
                result.forEach((college) => {
                    colleges.push(College.fromJson(college));
                });
                return colleges;
            }).catch(this.handleError);
    }

    search(term: string): Observable<College[]> {
        this.logger.debug('search()');

        var params = new URLSearchParams();
        params.set('filter', 'name like %' + term + '%');

        return this.http.get(this.config.API_ENDPOINT + '/ref-colleges/search/' + term, {headers:this.headers})
            .map((response) => {
                const result: any = response.json();
                const colleges: Array < College > = [];
                result.forEach((college) => {
                    colleges.push(College.fromJson(college));
                });
                this.logger.log (colleges);
                return colleges;
            }).catch(this.handleError);
    }
}
