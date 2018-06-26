/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {LifeInsuranceCost} from '../models/life-insurance-cost';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';

@Injectable()
export class LifeInsuranceCostService extends BaseService{

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    search(age: Number): Promise<LifeInsuranceCost> {
        this.logger.debug('search( ' + age + ')');

        return this.http.get(this.config.API_ENDPOINT + '/ref-life-insurance-costs/search/' + age).toPromise().then(
            response => {
                this.logger.log('got LifeInsuranceCost!');
                var lifeInsuranceCost: LifeInsuranceCost;
                lifeInsuranceCost = LifeInsuranceCost.fromJson(response.json());
                return lifeInsuranceCost;
            }).catch(this.handleError);
    }
}
