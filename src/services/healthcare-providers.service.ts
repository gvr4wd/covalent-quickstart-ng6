/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {HealthCareProvider} from '../models/healthcare-provider';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';
import {logger} from 'codelyzer/util/logger';

@Injectable()
export class HealthCareProviderService extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    get (): Promise<HealthCareProvider[]> {
        this.logger.debug('get()');

        return this.http.get(this.config.API_ENDPOINT + '/ref-healthcare-providers/').toPromise().then(
            response => {
                this.logger.log('got HealthCareProvider!');
                var result: any = response.json();
                let rfHealthCareProviders: Array < HealthCareProvider > = [];
                result.forEach((rfHealthCareProvider) => {
                    rfHealthCareProviders.push(HealthCareProvider.fromJson(rfHealthCareProvider));
                });
                return rfHealthCareProviders;
            }).catch(this.handleError);
    }
}
