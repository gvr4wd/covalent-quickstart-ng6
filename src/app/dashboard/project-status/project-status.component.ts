import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ItemsService} from "../../../services/items.service";
import {AlertsService} from "../../../services/alerts.service";
import {ProductsService} from "../../../services/products.service";
import {TdDigitsPipe} from "@covalent/core";

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit, AfterViewInit {

    items: Object[];
    users: Object[];
    products: Object[];
    alerts: Object[];

    selectedValue: string;
    foods: any[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    data = [
        {
            "name": "Tickts",
            "value": 89
        }
    ];


    // Chart
    single: any[];
    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = true;
    showLegend: boolean = false;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = '';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Sales';

    colorScheme: any = {
        domain: ['#1565C0', '#03A9F4', '#FFA726', '#FFCC80'],
    };


    // colorScheme = {
    //     domain: ['#5AA454', '#A10A28', '#C7B42C']
    // };

    // line, area
    autoScale: boolean = true;

    constructor(private itemsService: ItemsService,
                private alertsService: AlertsService,
                private productsService: ProductsService) {
        this.options = {
            chart: {
                type: 'solidgauge'
            },

            title: 'Project Sprint Completion %',

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: '%'
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Completion %',
                data: [80],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    'black' + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">% Completed</span></div>'
                },
                tooltip: {
                    valueSuffix: ' % Completed'
                }
            }]
        };

        // Chart Single
        Object.assign(this, {single});
        // Chart Multi
        this.multi = multi.map((group: any) => {
            group.series = group.series.map((dataItem: any) => {
                dataItem.name = new Date(dataItem.name);
                return dataItem;
            });
            return group;
        });
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.itemsService.staticQuery().subscribe((items: Object[]) => {
            this.items = items;
            setTimeout(() => {;
            }, 750);
        });

        this.alertsService.query().subscribe((alerts: Object[]) => {
            this.alerts = alerts;
            setTimeout(() => {
            }, 750);
        });
        this.productsService.query().subscribe((products: Object[]) => {
            this.products = products;
            setTimeout(() => {
            }, 750);
        });
    }
    onSelect(event) {
        console.log(event);
    }

    // ngx transform using covalent digits pipe
    axisDigits(val: any): any {
        return new TdDigitsPipe().transform(val);
    }

    // highchart
    options: Object;
};

export let single: any = [
    {
        'name': 'Project Revenue YTD',
        'value': 382941,
    },
    {
        'name': 'Containers',
        'value': 152294,
    },
    {
        'name': 'Streams',
        'value': 283000,
    },
    {
        'name': 'Queries',
        'value': 828921,
    },
];

export let multi: any = [
    {
        'name': 'Databases',
        'series': [
            {
                'value': 2469,
                'name': '2016-09-15T19:25:07.773Z',
            },
            {
                'value': 3619,
                'name': '2016-09-17T17:16:53.279Z',
            },
            {
                'value': 3885,
                'name': '2016-09-15T10:34:32.344Z',
            },
            {
                'value': 4289,
                'name': '2016-09-19T14:33:45.710Z',
            },
            {
                'value': 3309,
                'name': '2016-09-12T18:48:58.925Z',
            },
        ],
    },
    {
        'name': 'Containers',
        'series': [
            {
                'value': 2452,
                'name': '2016-09-15T19:25:07.773Z',
            },
            {
                'value': 4938,
                'name': '2016-09-17T17:16:53.279Z',
            },
            {
                'value': 4110,
                'name': '2016-09-15T10:34:32.344Z',
            },
            {
                'value': 3828,
                'name': '2016-09-19T14:33:45.710Z',
            },
            {
                'value': 5772,
                'name': '2016-09-12T18:48:58.925Z',
            },
        ],
    },
    {
        'name': 'Streams',
        'series': [
            {
                'value': 4022,
                'name': '2016-09-15T19:25:07.773Z',
            },
            {
                'value': 2345,
                'name': '2016-09-17T17:16:53.279Z',
            },
            {
                'value': 5148,
                'name': '2016-09-15T10:34:32.344Z',
            },
            {
                'value': 6868,
                'name': '2016-09-19T14:33:45.710Z',
            },
            {
                'value': 5415,
                'name': '2016-09-12T18:48:58.925Z',
            },
        ],
    },
    {
        'name': 'Queries',
        'series': [
            {
                'value': 6194,
                'name': '2016-09-15T19:25:07.773Z',
            },
            {
                'value': 6585,
                'name': '2016-09-17T17:16:53.279Z',
            },
            {
                'value': 6857,
                'name': '2016-09-15T10:34:32.344Z',
            },
            {
                'value': 2545,
                'name': '2016-09-19T14:33:45.710Z',
            },
            {
                'value': 5986,
                'name': '2016-09-12T18:48:58.925Z',
            },
        ],
    },
];
