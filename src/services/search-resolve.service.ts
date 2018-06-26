/**
 * Created by dshin on 10/29/16.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {TdLoadingService} from '@covalent/core';
import {SearchService} from './search.service';
import {Logger} from '../shared/logger';

@Injectable()
export class SearchResolve implements Resolve<Object> {
    constructor(private router: Router,
                private searchService: SearchService,
                private loadingService: TdLoadingService,
                private logger: Logger) {
    }

    resolve(route: ActivatedRouteSnapshot): Object {
        const searchStr = +route.params['searchStr'];
        this.logger.log('resolving in SearchResolve() - ' + searchStr);

        return this.searchService.search(searchStr).then(result => {
            if (result) {
                this.logger.log('got result - ', result);
                return result;
            } else { // id not found
                this.logger.error('error searching result');
                // this.router.navigate(['/home']);
                // this.loadingService.resolve('main');
                return null;
            }
        });
    }
}
