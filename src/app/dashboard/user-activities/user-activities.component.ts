import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ItemsService} from '../../../services/items.service';
import {TdLoadingService} from '@covalent/core';

@Component({
    selector: 'app-user-activities',
    templateUrl: './user-activities.component.html',
    styleUrls: ['./user-activities.component.scss']
})
export class UserActivitiesComponent implements OnInit, AfterViewInit {

    items: Object[];

    constructor(private itemsService: ItemsService,
                private loadingService: TdLoadingService) {
    }

    ngOnInit() {
        this.loadingService.register('items.load');
    }

    ngAfterViewInit(): void {

        this.itemsService.staticQuery().subscribe((items: Object[]) => {
            this.items = items;
            setTimeout(() => {
                this.loadingService.resolve('items.load');
            }, 750);
        });
    }
}
