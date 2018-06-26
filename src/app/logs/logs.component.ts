import {AfterViewInit, Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {TdLoadingService} from '@covalent/core';

import {ItemsService, ProductsService, UsersService} from '../../services';

@Component({
    selector: 'logs',
    templateUrl: './logs.component.html',
    styleUrls: ['././logs.component.scss'],
    viewProviders: [ItemsService, UsersService, ProductsService],
})
export class LogsComponent implements AfterViewInit {

    items: Object[];
    users: Object[];
    products: Object[];

    constructor(private titleService: Title,
                private itemsService: ItemsService,
                private usersService: UsersService,
                private _productsService: ProductsService,
                private loadingService: TdLoadingService) {

    }

    ngAfterViewInit(): void {
        this.titleService.setTitle('Boss-O-Matic Logs');
    }

}
