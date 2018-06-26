/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {RefSkill} from '../models/ref-skill';
import {BaseService} from './base.service';
import {APP_CONFIG, IAppConfig} from '../app/app.config';
import {Logger} from '../shared/logger';

@Injectable()
export class RefSkillsService extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    get(): Promise<RefSkill[]> {
        this.logger.debug('get()');

        return this.http.get(this.config.API_ENDPOINT + '/ref-skills').toPromise().then(
            response => {
                this.logger.log('got colleges!');
                const result: any = response.json();
                const rfSkills: Array < RefSkill > = [];
                result.forEach((rfSkill) => {
                    rfSkills.push(RefSkill.fromJson(rfSkill));
                });
                return rfSkills;
            }).catch(this.handleError);
    }
}
