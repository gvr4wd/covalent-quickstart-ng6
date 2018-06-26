import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TdLoadingService} from '@covalent/core';
import {AlertsService} from '../../../services/alerts.service';

@Component({
    selector: 'app-dashboard-alerts',
    templateUrl: './dashboard-alerts.component.html',
    styleUrls: ['./dashboard-alerts.component.scss']
})
export class DashboardAlertsComponent implements OnInit, AfterViewInit {
    alerts: Object[];

    constructor(private alertsService: AlertsService,
                private loadingService: TdLoadingService) {
    }

    ngOnInit(): void {
        this.loadingService.register('alerts.load');
    }

    ngAfterViewInit(): void {
        this.alertsService.query().subscribe((alerts: Object[]) => {
            this.alerts = alerts;
            setTimeout(() => {
                this.loadingService.resolve('alerts.load');
            }, 750);
        });
    }
}
