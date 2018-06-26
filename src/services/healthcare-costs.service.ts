/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {HealthCareCost} from '../models/healthcare-cost';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';

@Injectable()
export class HealthCareCostService extends BaseService{

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    searchByName (providerName: String, age: Number): Promise<HealthCareCost> {
        console.debug('search( ' + providerName + ', ' + age + ')');

        return this.http.get(this.config.API_ENDPOINT + '/ref-healthcare-costs/search/' + providerName+ '/' + age).toPromise().then(
            response => {
                console.log('got healthCareCost!');
                var healthCareCost: HealthCareCost;
                healthCareCost = HealthCareCost.fromJson(response.json());
                return healthCareCost;
            }).catch(this.handleError);
    }

    searchById (id: number, age: Number): Promise<HealthCareCost> {
        this.logger.debug('search( ' + id + ', ' + age + ')');

        return this.http.get(this.config.API_ENDPOINT + '/ref-healthcare-costs/' + id+ '/' + age).toPromise().then(
            response => {
                this.logger.log('got healthCareCost!');
                let healthCareCost: HealthCareCost;
                healthCareCost = HealthCareCost.fromJson(response.json());
                return healthCareCost;
            }).catch(this.handleError);
    }
}
