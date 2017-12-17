import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef }        from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AdminService }             from '../../../_services/admin.service.ts';
declare var jQuery: any;

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef }        from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AdminService }             from '../../../_services/admin.service.ts';
declare var jQuery: any;

@Component({
    selector: 'block_chart',
    templateUrl: 'block_chart.component.html',
    styles: [`
    .modal-header {
        border-bottom: none !important;
    }
    .modal-footer {
          border-top: none !important;
    }`]
})
export class BlockChartComponent implements OnInit {

    @ViewChild('date_from_el') date_from_el: ElementRef;
    @ViewChild('date_end_el') date_end_el: ElementRef;
    @ViewChild('canvas') canvasRef: ElementRef;

    @Input() public iframe_class: string = "card-primary";
    @Input() public iframe_options: any;
    @Input() public iframe_color: any;
    @Input() public iframe_data_sets: any;
    @Input() public iframe_type: any;
    @Input() public iframe_labels: any;
    @Input() public iframe_legent: any;
    @Input() public iframe_number: any;
    @Input() public iframe_title: any;
    @Input() public isDataSet: number = 1;
    @Input() public iframe_data: any;
    
    @Input() public users:any;
    @Input() public departments:any;
    @Input() public user_id: string;
    @Input() public department_id: string;
    @Input() public date_from: Date;
    @Input() public date_end: Date;

    @Output() public changeSettingEvent:EventEmitter<any> = new EventEmitter<any>();
    @Output() public getCanvasTag: EventEmitter<any> = new EventEmitter<any>();
    public user_name: string;
 
    setUser(e) {

    }
    ngAfterViewInit() {
        console.log(this.canvasRef)
        this.getCanvasTag.emit(this.canvasRef)   
    }
    ngOnInit() {
        if (this.user_name != null) {
            this.adminService.getUser(this.user_id).subscribe(
                user => {
                    this.user_name = user.first_name + user.last_name;
                },
                error => {
                    console.log(error);
                }
            );            
        }
        this.init_date_picker();
    }
    
    init_date_picker() {
        jQuery(this.date_from_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_from = new Date(value);
              }
            })
            .datepicker('setDate', this.date_from);
        jQuery(this.date_end_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_end = new Date(value);
              }
            })
            .datepicker('setDate', this.date_end);
    }
    constructor(private adminService: AdminService) { }

    settingDismissed() {
        console.log()
    }
    settingOK() {

    }

    changeUser(e) {
        this.user_id = e;
    }
    changeSetting() {
        this.changeSettingEvent.emit({
            user_id: this.user_id,
            department_id: this.department_id,
            date_from: this.date_from,
            date_end: this.date_end,
            chart_type: this.iframe_type
        });
    }
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    // lineChart
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    // barChart
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];

    // Doughnut
    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';

    // Radar
    public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

    public radarChartData:any = [
        {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];
    public radarChartType:string = 'radar';

    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';

    // PolarArea
    public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend:boolean = true;

    public polarAreaChartType:string = 'polarArea';

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef }        from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AdminService }             from '../../../_services/admin.service.ts';
declare var jQuery: any;

@Component({
    selector: 'block_chart',
    templateUrl: 'block_chart.component.html',
    styles: [`
    .modal-header {
        border-bottom: none !important;
    }
    .modal-footer {
          border-top: none !important;
    }`]
})
export class BlockChartComponent implements OnInit {

    @ViewChild('date_from_el') date_from_el: ElementRef;
    @ViewChild('date_end_el') date_end_el: ElementRef;
    @ViewChild('canvas') canvasRef: ElementRef;

    @Input() public iframe_class: string = "card-primary";
    @Input() public iframe_options: any;
    @Input() public iframe_color: any;
    @Input() public iframe_data_sets: any;
    @Input() public iframe_type: any;
    @Input() public iframe_labels: any;
    @Input() public iframe_legent: any;
    @Input() public iframe_number: any;
    @Input() public iframe_title: any;
    @Input() public isDataSet: number = 1;
    @Input() public iframe_data: any;
    
    @Input() public users:any;
    @Input() public departments:any;
    @Input() public user_id: string;
    @Input() public department_id: string;
    @Input() public date_from: Date;
    @Input() public date_end: Date;

    @Output() public changeSettingEvent:EventEmitter<any> = new EventEmitter<any>();
    @Output() public getCanvasTag: EventEmitter<any> = new EventEmitter<any>();
    public user_name: string;
 
    setUser(e) {

    }
    ngAfterViewInit() {
        console.log(this.canvasRef)
        this.getCanvasTag.emit(this.canvasRef)   
    }
    ngOnInit() {
        if (this.user_name != null) {
            this.adminService.getUser(this.user_id).subscribe(
                user => {
                    this.user_name = user.first_name + user.last_name;
                },
                error => {
                    console.log(error);
                }
            );            
        }
        this.init_date_picker();
    }
    
    init_date_picker() {
        jQuery(this.date_from_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_from = new Date(value);
              }
            })
            .datepicker('setDate', this.date_from);
        jQuery(this.date_end_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_end = new Date(value);
              }
            })
            .datepicker('setDate', this.date_end);
    }
    constructor(private adminService: AdminService) { }

    settingDismissed() {
        console.log()
    }
    settingOK() {

    }

    changeUser(e) {
        this.user_id = e;
    }
    changeSetting() {
        this.changeSettingEvent.emit({
            user_id: this.user_id,
            department_id: this.department_id,
            date_from: this.date_from,
            date_end: this.date_end,
            chart_type: this.iframe_type
        });
    }
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    // lineChart
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    // barChart
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];

    // Doughnut
    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';

    // Radar
    public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

    public radarChartData:any = [
        {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];
    public radarChartType:string = 'radar';

    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';

    // PolarArea
    public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend:boolean = true;

    public polarAreaChartType:string = 'polarArea';

}
