import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {TdLoadingService} from '@covalent/core';

@Component({
    selector: 'app-dashboard-favorites',
    templateUrl: './dashboard-favorites.component.html',
    styleUrls: ['./dashboard-favorites.component.scss']
})
export class DashboardFavoritesComponent implements OnInit, AfterViewInit {

    products: Object[];

    constructor(private productsService: ProductsService,
                private loadingService: TdLoadingService) {
    }

    ngOnInit(): void {
        this.loadingService.register('favorites.load');
    }

    ngAfterViewInit(): void {
        this.productsService.query().subscribe((products: Object[]) => {
            this.products = products;
            setTimeout(() => {
                this.loadingService.resolve('favorites.load');
            }, 750);
        });
    }

}
