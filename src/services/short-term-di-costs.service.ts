/**
 * Created by dshin on 10/1/16.
 */
import {Inject, Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import {ShortTermDiCost} from "../models/short-term-di-cost";
import {BaseService} from "./base.service";
import {APP_CONFIG, IAppConfig} from "../app/app.config";
import {Logger} from '../shared/logger';

@Injectable()
export class ShortTermDiCostsService extends BaseService {

    constructor(protected http: Http,
                @Inject(APP_CONFIG) protected config: IAppConfig,
                logger: Logger) {
        super(http, config, logger);
    }

    search(age: Number): Promise<ShortTermDiCost> {
        this.logger.debug('search( ' + age + ')');

        return this.http.get(this.config.API_ENDPOINT + '/ref-short-term-di-costs/search/' + age).toPromise().then(
            response => {
                this.logger.log('got ShortTermDiCost!');
                var shortTermDiCost: ShortTermDiCost;
                shortTermDiCost = ShortTermDiCost.fromJson(response.json());
                return shortTermDiCost;
            }).catch(this.handleError);
    }
}
