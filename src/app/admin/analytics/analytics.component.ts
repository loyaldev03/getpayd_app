import { Component, OnInit }        from '@angular/core';
import { AdminService } from '../../_services/admin.service';            
import { UserService } from '../../_services/user.service';            

@Component({
    templateUrl: 'analytics.component.html',
    styleUrls: [ './analytics.component.scss' ]
})
export class AnalyticsComponent implements OnInit {
    public brandPrimary:string =  '#20a8d8';
    public brandSuccess:string =  '#4dbd74';
    public brandInfo:string =     '#63c2de';
    public brandWarning:string =  '#f8cb00';
    public brandDanger:string =   '#f86c6b';

    //convert Hex to RGBA
    public convertHex(hex:string,opacity:number){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return rgba;
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    // lineChart1
    public lineChart1Data:Array<any> = [
        {
            data: [65, 59, 84, 84, 51, 55, 40],
            label: 'Series A'
        }
    ];
    public lineChart1Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart1Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 40 - 5,
                    max: 84 + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart1Colours:Array<any> = [
        { // grey
            backgroundColor: this.brandPrimary,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart1Legend:boolean = false;
    public lineChart1Type:string = 'line';

    // lineChart2
    public lineChart2Data:Array<any> = [
        {
            data: [1, 18, 9, 17, 34, 22, 11],
            label: 'Series A'
        }
    ];
    public lineChart2Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart2Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 1 - 5,
                    max: 34 + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart2Colours:Array<any> = [
        { // grey
            backgroundColor: this.brandInfo,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart2Legend:boolean = false;
    public lineChart2Type:string = 'line';


    // lineChart3
    public lineChart3Data:Array<any> = [
        {
            data: [78, 81, 80, 45, 34, 12, 40],
            label: 'Series A'
        }
    ];
    public lineChart3Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart3Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart3Colours:Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
        }
    ];
    public lineChart3Legend:boolean = false;
    public lineChart3Type:string = 'line';


    // barChart1
    public barChart1Data:Array<any> = [
        {
            data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
            label: 'Series A'
        }
    ];
    public barChart1Labels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
    public barChart1Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        }
    };
    public barChart1Colours:Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.3)',
            borderWidth: 0
        }
    ];
    public barChart1Legend:boolean = false;
    public barChart1Type:string = 'bar';

    // lineChart4
    public lineChart4Data:Array<any> = [
        {
            data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
            label: 'Series A'
        }
    ];
    public lineChart4Labels:Array<any> = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    public lineChart4Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display:false,
                points:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: { point: { radius: 0 } },
        legend: {
            display: false
        }
    };
    public lineChart4Colours:Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            borderWidth: 2
        }
    ];
    public lineChart4Legend:boolean = false;
    public lineChart4Type:string = 'line';


    // barChart2
    public barChart2Data:Array<any> = [
        {
            data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
            label: 'Series A'
        }
    ];
    public barChart2Labels:Array<any> = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    public barChart2Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display:false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display:false,
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        legend: {
            display: false
        }
    };
    public barChart2Colours:Array<any> = [
        {
            backgroundColor: 'rgba(0,0,0,.2)',
            borderWidth: 0
        }
    ];
    public barChart2Legend:boolean = false;
    public barChart2Type:string = 'bar';


    // barChart3
    public barChart3Data:Array<any> = [
        {
            data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
            label: 'Series A'
        }
    ];
    public barChart3Labels:Array<any> = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    public barChart3Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        }
    };
    public barChart3Primary:Array<any> = [
        {
            backgroundColor: this.brandPrimary,
            borderColor: 'transparent',
            borderWidth: 1
        }
    ];
    public barChart3Danger:Array<any> = [
        {
            backgroundColor: this.brandDanger,
            borderColor: 'transparent',
            borderWidth: 1
        }
    ];
    public barChart3Success:Array<any> = [
        {
            backgroundColor: this.brandSuccess,
            borderColor: 'transparent',
            borderWidth: 1
        }
    ];
    public barChart3Legend:boolean = false;
    public barChart3Type:string = 'bar';


    // lineChart5
    public lineChart5Data:Array<any> = [
        {
            data: [65, 59, 84, 84, 51, 55, 40],
            label: 'Series A'
        }
    ];
    public lineChart5Labels:Array<any> = ['January','February','March','April','May','June','July'];
    public lineChart5Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display:false,
                points:false,
            }],
            yAxes: [{
                display:false,
            }]
        },
        elements: { point: { radius: 0 } },
        legend: {
            display: false
        }
    };
    public lineChart5Info:Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandInfo,
            borderWidth: 2
        }
    ];
    public lineChart5Success:Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandInfo,
            borderWidth: 2
        }
    ];
    public lineChart5Warning:Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: this.brandWarning,
            borderWidth: 2
        }
    ];
    public lineChart5Legend:boolean = false;
    public lineChart5Type:string = 'line';


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

    public total_logons: number = 0;
    public company_id: string;
    public department_id: string;
    public user_id: string;
    public date_from: Date;
    public date_end: Date;
    public mode: String = "monthly";
    public base_log_on = 50;
    public unit_per_user = 5;
    public hourly_unit = 4;

    public total_tasks_completed: number = 0;
    public base_tasks_completed: number=20;

    public total_points_awarded: number = 0;
    public base_points_awarded: number = 100;

    public total_reward_redemptions: number = 0;
    public base_reward_redemptions: number = 100;
    
    public numberOfTasksByUserData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public numberOfTasksByUserLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public avgPointOfAssignmentChartData: any[] = [65, 59, 80, 81, 56, 55, 40];
    public avgPointOfAssignmentChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public mostRewardRedemptionsChardData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public mostRewardRedemptionsChardLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public pointValueOverTimeChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public pointValueOverTimeChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012']

    constructor(
        private adminService: AdminService,
        private userService: UserService) 
    {
        this.date_end = new Date();
        this.date_from = new Date();
        // this.user_id = "587881a10eff174f93740995";
        // this.user_id = "5879c34f88701f3c1194665a"
        this.user_id = null;
        this.department_id = "5879f63530456b6947c6d665";

        // //monthly test
        // this.date_from.setDate(this.date_end.getDate() - 11);
        // // console.log("current user", localStorage.getItem('currentUser'));
        // this.company_id = JSON.parse(localStorage.getItem('currentUser'))._id;
        // this.mode = "monthly"

        // //daily test
        // this.date_from.setDate(this.date_end.getDate() - 5);
        // // console.log("current user", localStorage.getItem('currentUser'));
        // this.company_id = JSON.parse(localStorage.getItem('currentUser'))._id;
        // this.department_id = "587881a10eff174f93740996";
        // this.mode = "daily"

        //hourly test
        this.date_from.setTime(this.date_end.getTime() - (24*60*60*1000));
        console.log("date from", this.date_from);
        this.company_id = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.mode = "hourly"
    }
    ngOnInit() {
        this.adminService.getLogOns(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log("get Log ons", data);
                this.lineChart1Data = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.lineChart1Labels = [];
                this.total_logons = data.length;
                if (this.mode == 'monthly') {
                    // lineChart1
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setMonth(date.getMonth() + 1)){
                        var number_for_monthly = this.base_log_on;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setMonth(date.getMonth() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_monthly += this.unit_per_user;
                            }
                        }
                        console.log(number_for_monthly, "   ", date.getMonth() + 1)
                        this.lineChart1Data[0].data.push(number_for_monthly);
                        this.lineChart1Labels.push(date.getMonth() + 1);
                    }
                }
                if (this.mode == 'daily') {
                    // lineChart1
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setDate(date.getDate() + 1)){
                        var number_for_daily = this.base_log_on;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setDate(date.getDate() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_daily += this.unit_per_user;
                            }
                        }
                        this.lineChart1Data[0].data.push(number_for_daily);
                        this.lineChart1Labels.push(date.getDate() + 1);
                    }    
                }
                if (this.mode == 'hourly') {
                    // lineChart1
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setTime(date.getTime() + (this.hourly_unit*60*60*1000))){
                        var number_for_hourly = this.base_log_on;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setTime(date.getTime() + (this.hourly_unit*60*60*1000));
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_hourly += this.unit_per_user;
                            }
                        }
                        this.lineChart1Data[0].data.push(number_for_hourly);
                        this.lineChart1Labels.push(date.getHours() + 1);
                    }    
                }              
            },
            error => {
              console.log(error);
            }
        );
        this.adminService.getTaskCompleted(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                this.lineChart2Data = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.lineChart2Labels = [];
                this.total_tasks_completed = data.length;
                if (this.mode == 'monthly') {
                    // lineChart2
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setMonth(date.getMonth() + 1)){
                        var number_for_monthly = this.base_tasks_completed;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setMonth(date.getMonth() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_monthly += this.unit_per_user;
                            }
                        }
                        this.lineChart2Data[0].data.push(number_for_monthly);
                        this.lineChart2Labels.push(date.getMonth() + 1);
                    }
                }
                if (this.mode == 'daily') {
                    // lineChart2
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setDate(date.getDate() + 1)){
                        var number_for_daily = this.base_tasks_completed;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setDate(date.getDate() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_daily += this.unit_per_user;
                            }
                        }
                        this.lineChart2Data[0].data.push(number_for_daily);
                        this.lineChart2Labels.push(date.getDate() + 1);
                    }    
                }
                if (this.mode == 'hourly') {
                    // lineChart2
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setTime(date.getTime() + (this.hourly_unit*60*60*1000))){
                        var number_for_hourly = this.base_tasks_completed;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setTime(date.getTime() + (this.hourly_unit*60*60*1000));
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_hourly += this.unit_per_user;
                            }
                        }
                        this.lineChart2Data[0].data.push(number_for_hourly);
                        this.lineChart2Labels.push(date.getHours() + 1);
                    }    
                }
            },
            error => {

            }
        );
        //Points Awarded
        this.adminService.getTaskCompleted(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                this.lineChart3Data = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.lineChart3Labels = [];
                if (this.mode == 'monthly') {
                    // lineChart3
                    for (var item of data) {
                        this.total_points_awarded += parseInt(item.points_awarded);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setMonth(date.getMonth() + 1)){
                        var number_for_monthly = this.base_points_awarded;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setMonth(date.getMonth() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_monthly += item.points_awarded;
                            }
                        }
                        this.lineChart3Data[0].data.push(number_for_monthly);
                        this.lineChart3Labels.push(date.getMonth() + 1);
                    }
                    // this
                }
                if (this.mode == 'daily') {
                    // lineChart3
                    for (var item of data) {
                        this.total_points_awarded += parseInt(item.points_awarded);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setDate(date.getDate() + 1)){
                        var number_for_daily = this.base_points_awarded;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setDate(date.getDate() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_daily += item.points_awarded;
                            }
                        }
                        this.lineChart3Data[0].data.push(number_for_daily);
                        this.lineChart3Labels.push(date.getDate() + 1);
                    }    
                }
                if (this.mode == 'hourly') {
                    // lineChart3
                    for (var item of data) {
                        this.total_points_awarded += parseInt(item.points_awarded);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setTime(date.getTime() + (this.hourly_unit*60*60*1000))){
                        var number_for_hourly = this.base_points_awarded;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setTime(date.getTime() + (this.hourly_unit*60*60*1000));
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_hourly += item.points_awarded;
                            }
                        }
                        this.lineChart3Data[0].data.push(number_for_hourly);
                        this.lineChart3Labels.push(date.getHours() + 1);
                    }    
                }
            },
            error => {

            }
        );
        this.adminService.getRewardRedemptions(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log("reward redemptions", data);
                this.lineChart4Data = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.lineChart4Labels = [];
                if (this.mode == 'monthly') {
                    // lineChart4
                    for (var item of data) {
                        this.total_reward_redemptions += parseInt(item.number_of_reward);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setMonth(date.getMonth() + 1)){
                        var number_for_monthly = this.base_reward_redemptions;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setMonth(date.getMonth() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_monthly += item.number_of_reward;
                            }
                        }
                        this.lineChart4Data[0].data.push(number_for_monthly);
                        this.lineChart4Labels.push(date.getMonth() + 1);
                    }
                    // this
                }
                if (this.mode == 'daily') {
                    // lineChart4
                    for (var item of data) {
                        this.total_reward_redemptions += parseInt(item.number_of_reward);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setDate(date.getDate() + 1)){
                        var number_for_daily = this.base_reward_redemptions;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setDate(date.getDate() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_daily += item.number_of_reward;
                            }
                        }
                        this.lineChart4Data[0].data.push(number_for_daily);
                        this.lineChart4Labels.push(date.getDate() + 1);
                    }    
                }
                if (this.mode == 'hourly') {
                    // lineChart4
                    for (var item of data) {
                        this.total_reward_redemptions += parseInt(item.number_of_reward);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setTime(date.getTime() + (this.hourly_unit*60*60*1000))){
                        var number_for_hourly = this.base_reward_redemptions;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setTime(date.getTime() + (this.hourly_unit*60*60*1000));
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_hourly += item.number_of_reward;
                            }
                        }
                        this.lineChart4Data[0].data.push(number_for_hourly);
                        this.lineChart4Labels.push(date.getHours() + 1);
                    }    
                }
            },
            error => {

            }
        );
        this.adminService.getTopVideos(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log("get top videos", data);
                this.lineChartData = [
                    {data: [], label: 'Top Videos'},
                ];
                this.lineChartLabels = [];
                for (let item of data) {
                    this.lineChartData[0].data.push(item.total);
                    this.lineChartLabels.push(item._id);
                }
            },
            error => {
                console.log(error);
            });
        this.adminService.getTopQuizzes(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log("get top quizzes", data);
                this.barChartData = [
                    {data: [], label: 'Top Quizzes'},
                ];
                this.barChartLabels = [];
                for (let item of data) {
                    this.barChartData[0].data.push(item.total);
                    this.barChartLabels.push(item._id);
                }
            },
            error => {
                console.log(error);
            });
        this.adminService.getMostPointUsers(this.company_id, this.department_id, this.date_from, this.date_end).subscribe(
            data => {
                this.doughnutChartData = [];
                this.doughnutChartLabels = [];
                for (let item of data) {
                    this.doughnutChartData.push(item.available_tokens);
                    let full_name = item.first_name + item.last_name;
                    this.doughnutChartLabels.push(full_name);
                }    
            },
            error => {

            });
        this.adminService.getMostPointDepartments(this.company_id, this.date_from, this.date_end).subscribe(
            data => {
                this.radarChartData = [
                    {data: [], label: 'Top Departments'},
                ];
                this.radarChartLabels = [];
                for (let item of data) {
                    this.radarChartData[0].data.push(item.total);
                    this.radarChartLabels.push(item._id);
                }    
            },
            error => {

            });        
        this.adminService.getTotalNumberOfTasksByUser(this.company_id, this.department_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log(data);
                this.numberOfTasksByUserData = [
                    {data: [], label: 'Number Of Tasks By User'}
                ];
                this.numberOfTasksByUserLabels = [];
                for (let item of data) {
                    this.numberOfTasksByUserData[0].data.push(item.total);
                    this.numberOfTasksByUserLabels.push(item._id.first_name + " " + item._id.last_name);
                }    
            },
            error => {
                console.log(error);
            });  
        this.adminService.getAveragePointPerAssignment(this.company_id, this.department_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log(data);
                this.avgPointOfAssignmentChartData = [];
                this.avgPointOfAssignmentChartLabels = [];
                for (let item of data) {
                    this.avgPointOfAssignmentChartData.push(item.avg);
                    this.avgPointOfAssignmentChartLabels.push(item.user.first_name + " " + item.user.last_name);
                }    
            },
            error => {
                console.log(error);
            });  
        this.adminService.getMostRewardRedemptions(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log(data);
                this.mostRewardRedemptionsChardData = [
                    {data: [], label: 'Most Reward Redemptions'}
                ];
                this.mostRewardRedemptionsChardLabels = [];
                for (let item of data) {
                    this.mostRewardRedemptionsChardData[0].data.push(item.number_of_reward);
                    this.mostRewardRedemptionsChardLabels.push(item.reward.name);
                }    
            },
            error => {
                console.log(error);
            });  
        this.adminService.getTaskCompleted(this.company_id, this.department_id, this.user_id, this.date_from, this.date_end).subscribe(
            data => {
                this.pointValueOverTimeChartData = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.pointValueOverTimeChartLabels = [];
                if (this.mode == 'monthly') {
                    // lineChart3
                    for (var item of data) {
                        this.total_points_awarded += parseInt(item.points_awarded);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setMonth(date.getMonth() + 1)){
                        var number_for_monthly = this.base_points_awarded;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setMonth(date.getMonth() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_monthly += item.points_awarded;
                            }
                        }
                        this.pointValueOverTimeChartData[0].data.push(number_for_monthly);
                        var num = date.getMonth() + 1;
                        this.pointValueOverTimeChartLabels.push(num.toString());

                    }
                    // this
                }
                if (this.mode == 'daily') {
                    // lineChart3
                    for (var item of data) {
                        this.total_points_awarded += parseInt(item.points_awarded);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setDate(date.getDate() + 1)){
                        var number_for_daily = this.base_points_awarded;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setDate(date.getDate() + 1);
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_daily += item.points_awarded;
                            }
                        }
                        this.pointValueOverTimeChartData[0].data.push(number_for_daily);
                        var num = date.getDate() + 1;
                        this.pointValueOverTimeChartLabels.push(num.toString());
                    }    
                }
                if (this.mode == 'hourly') {
                    // lineChart3
                    for (var item of data) {
                        this.total_points_awarded += parseInt(item.points_awarded);
                    }
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setTime(date.getTime() + (this.hourly_unit*60*60*1000))){
                        var number_for_hourly = this.base_points_awarded;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setTime(date.getTime() + (this.hourly_unit*60*60*1000));
                            var item_time = new Date(item.time);
                            if (item_time >= date && item_time <= date_range) {
                              number_for_hourly += item.points_awarded;
                            }
                        }
                        this.pointValueOverTimeChartData[0].data.push(number_for_hourly);
                        var num = date.getHours() + 1;
                        this.pointValueOverTimeChartLabels.push(num.toString());

                    }    
                }
            },
            error => {

            }
        );
    }
}
