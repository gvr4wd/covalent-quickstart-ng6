import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TdLoadingService, TdMediaService} from '@covalent/core';
import {AlertsService, ItemsService, ProductsService, UsersService} from '../../services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    viewProviders: [ItemsService, UsersService, ProductsService, AlertsService],
})
export class DashboardComponent implements OnInit, AfterViewInit {

    single: any[];

    colorScheme: any = {
        domain: ['#1565C0', '#03A9F4', '#FFA726', '#FFCC80'],
    };

    constructor(public media: TdMediaService,
                private titleService: Title,
                private loadingService: TdLoadingService) {
        // Chart Single
        Object.assign(this, {single});
    }

    ngOnInit(): void {
        this.loadingService.register('favorites.load');
    }

    ngAfterViewInit(): void {
        // broadcast to all listener observables when loading the page
        this.media.broadcast();

        this.titleService.setTitle('Dashboard');
    }

    dollarValueFormat(c): string {
        return `\$${c.value.toLocaleString()}`;
    }
};


export let single: any = [
    {
        'name': 'Project Revenue YTD',
        'value': 828921,
    },
    {
        'name': 'Total Compensation YTD',
        'value': 382941
    },
    {
        'name': 'Bonuses and Extras YTD',
        'value': 152294,
    },
    {
        'name': 'Your Labor YTD',
        'value': 283000,
    },
];
