/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user';
import {Dependent} from '../models/dependent';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';

@Injectable()
export class DependentService extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    get (user: User): Promise<Dependent[]> {
        this.logger.debug('get()');

        var params = new URLSearchParams();
        params.set('filter', 'parentId=' + user.id);

        return this.http.get(this.config.API_ENDPOINT + '/dependents', {search: params, headers:this.headers}).toPromise().then(
            response => {
                this.logger.log('got dependent!');
                var result: any = response.json();
                let dependents: Array < Dependent > = [];
                result.resource.forEach((dependent) => {
                    dependents.push(Dependent.fromJson(dependent));
                });
                return dependents;
            }).catch(this.handleError);
    }

    save (dependent: Dependent): Promise<Dependent> {
        this.logger.debug('save()');
        if (dependent.id) {
            return this.http
                .patch(this.config.API_ENDPOINT + '/dependents', dependent.toJson(true), {headers:this.headers})
                .toPromise()
                .then(() => dependent)
                .catch(this.handleError);
        } else {
            return this.http
                .post(this.config.API_ENDPOINT + '/dependents', dependent.toJson(true), {headers:this.headers})
                .toPromise()
                .then(resp => {
                    var body = resp.json();
                    dependent.id = body.resource[0].id;
                    return dependent;
                })
                .catch(this.handleError);
        }
    }

    delete (dependent: Dependent): Promise<Dependent> {
        this.logger.debug ('delete()');
        return this.http
            .delete(this.config.API_ENDPOINT + '/dependents/' + dependent.id, {headers:this.headers})
            .toPromise()
            .then(() => dependent)
            .catch(this.handleError);
    }
}
