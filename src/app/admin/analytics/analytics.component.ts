import { Component, OnInit, ViewChild, ElementRef, AfterViewInit }        from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';
import { AdminService } from '../../_services/admin.service';            
import { UserService } from '../../_services/user.service';         
import {CsvService} from "angular2-json2csv";
declare let jsPDF;
import 'rxjs/Rx' ;
declare var jQuery: any;

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

    @ViewChild('date_from_el') date_from_el: ElementRef;
    @ViewChild('date_end_el') date_end_el: ElementRef;
    @ViewChild('content') content: ElementRef;

    public total_logons: number = 0;
    public company_id: string;
    public department_id: string;
    public user_id: string;
    public date_from: Date;
    public date_end: Date;
    public mode: String = "monthly";
    public base_log_on = 10;
    public unit_per_user = 5;
    public hourly_unit = 4;

    public user_id_log_ons: string;
    public department_id_log_ons: string;
    public date_from_log_ons: Date;
    public date_end_log_ons: Date;

    public user_id_tasks_completed: string;
    public department_id_tasks_completed: string;
    public date_from_tasks_completed: Date;
    public date_end_tasks_completed: Date;

    public user_id_points_awarded: string;
    public department_id_points_awarded: string;
    public date_from_points_awarded: Date;
    public date_end_points_awarded: Date;

    public user_id_reward_redemptions: string;
    public department_id_reward_redemptions: string;
    public date_from_reward_redemptions: Date;
    public date_end_reward_redemptions: Date;

    public user_id_top_videos: string;
    public department_id_top_videos: string;
    public date_from_top_videos: Date;
    public date_end_top_videos: Date;
    public chart_type_top_videos: string;
    public canvas_tag_top_videos: any;

    public user_id_top_quizzes: string;
    public department_id_top_quizzes: string;
    public date_from_top_quizzes: Date;
    public date_end_top_quizzes: Date;
    public chart_type_top_quizzes: string;
    public canvas_tag_top_quizzes: any;

    public user_id_most_point_users: string;
    public department_id_most_point_users: string;
    public date_from_most_point_users: Date;
    public date_end_most_point_users: Date;
    public chart_type_most_point_users: string;
    public canvas_tag_most_point_users: any;


    public user_id_most_point_departments: string;
    public department_id_most_point_departments: string;
    public date_from_most_point_departments: Date;
    public date_end_most_point_departments: Date;
    public chart_type_most_point_departments: string;
    public canvas_tag_most_point_departments: any;

    public user_id_number_of_tasks_completed_by_user: string;
    public department_id_number_of_tasks_completed_by_user: string;
    public date_from_number_of_tasks_completed_by_user: Date;
    public date_end_number_of_tasks_completed_by_user: Date;
    public chart_type_number_of_tasks_completed_by_user: string;
    public canvas_tag_number_of_tasks_completed_by_user: any;

    public user_id_most_reward_redemptions: string;
    public department_id_most_reward_redemptions: string;
    public date_from_most_reward_redemptions: Date;
    public date_end_most_reward_redemptions: Date;
    public chart_type_most_reward_redemptions: string;
    public canvas_tag_most_reward_redemptions: any;

    public user_id_average_point_of_assignment: string;
    public department_id_average_point_of_assignment: string;
    public date_from_average_point_of_assignment: Date;
    public date_end_average_point_of_assignment: Date;
    public chart_type_average_point_of_assignment: string;
    public canvas_tag_average_point_of_assignment: any;

    public user_id_point_value_over_time: string;
    public department_id_point_value_over_time: string;
    public date_from_point_value_over_time: Date;
    public date_end_point_value_over_time: Date;
    public chart_type_point_value_over_time: string;
    public canvas_tag_point_value_over_time: any;

    public user_id_most_sent_point_user: string;
    public department_id_most_sent_point_user: string;
    public date_from_most_sent_point_user: Date;
    public date_end_most_sent_point_user: Date;
    public chart_type_most_sent_point_user: string;
    public canvas_tag_most_sent_point_user: any;

    public user_id_most_received_point_user: string;
    public department_id_most_received_point_user: string;
    public date_from_most_received_point_user: Date;
    public date_end_most_received_point_user: Date;
    public chart_type_most_received_point_user: string;
    public canvas_tag_most_received_point_user: any;

    public total_tasks_completed: number = 0;
    public base_tasks_completed: number=20;

    public total_points_awarded: number = 0;
    public base_points_awarded: number = 100;

    public total_reward_redemptions: number = 0;
    public base_reward_redemptions: number = 100;
    
    public data_set_number_of_tasks_completed_by_user: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public labels_number_of_tasks_completed_by_user: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public data_set_average_point_of_assignment: any[] = [65, 59, 80, 81, 56, 55, 40];
    public labels_average_point_of_assignment: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public data_set_most_reward_redemptions: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public labels_most_reward_redemptions: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public data_set_point_value_over_time: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public labels_point_value_over_time: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012']

    public data_set_most_sent_point_user: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public labels_most_sent_point_user: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public data_set_most_received_point_user: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];
    public labels_most_received_point_user: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    public users_for_analytics: any = [];
    public users: any = [];
    public departments: any = [];
    public export_list: any = [];
    public final_export_list: any = [];



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
    public data_set_top_videos:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public labels_top_videos:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true,        
    };
    public lineChartColours:Array<any> = [
        { // grey
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor: 'rgba(255,0,0,1)',
            pointBorderColor: 'rgba(255,0,0,1)',
            pointHoverBackgroundColor: 'rgba(255,0,0,1)',
            pointHoverBorderColor: 'rgba(255,0,0,1)'
        },
        { // dark grey
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor: 'rgba(255,0,0,1)',
            pointBorderColor: 'rgba(255,0,0,1)',
            pointHoverBackgroundColor: 'rgba(255,0,0,1)',
            pointHoverBorderColor: 'rgba(255,0,0,1)'
        },
        { // grey
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor: 'rgba(255,0,0,1)',
            pointBorderColor: 'rgba(255,0,0,1)',
            pointHoverBackgroundColor: 'rgba(255,0,0,1)',
            pointHoverBorderColor: 'rgba(255,0,0,1)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    // barChart
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public labels_top_quizzes:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public data_set_top_quizzes:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];

    // Doughnut
    public labels_most_point_users:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public data_set_most_point_users:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';

    // Radar
    public labels_most_point_departments:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

    public data_set_most_point_departments:any = [
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

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private csvService: CsvService) 
    {
        // // this.user_id = "587881a10eff174f93740995";
        // // this.user_id = "5879c34f88701f3c1194665a"
        // this.user_id = null;
        // this.department_id = "5879f63530456b6947c6d665";
        // console.log("current user", localStorage.getItem('currentUser'));

        //monthly test
        this.date_end = new Date();
        this.date_from = new Date();
        this.date_from.setDate(this.date_end.getDate() - 15);
        this.company_id = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.mode = "daily"

        this.user_id_log_ons = this.user_id;
        this.department_id_log_ons = this.department_id;
        this.date_from_log_ons = this.date_from;
        this.date_end_log_ons = this.date_end;

        this.user_id_tasks_completed = this.user_id;
        this.department_id_tasks_completed = this.department_id;
        this.date_from_tasks_completed = this.date_from;
        this.date_end_tasks_completed = this.date_end;

        this.user_id_points_awarded = this.user_id;
        this.department_id_points_awarded = this.department_id;
        this.date_from_points_awarded = this.date_from;
        this.date_end_points_awarded = this.date_end;

        this.user_id_reward_redemptions = this.user_id;
        this.department_id_reward_redemptions = this.department_id;
        this.date_from_reward_redemptions = this.date_from;
        this.date_end_reward_redemptions = this.date_end;
                        
        this.user_id_top_videos = this.user_id;
        this.department_id_top_videos = this.department_id;
        this.date_from_top_videos = this.date_from;
        this.date_end_top_videos = this.date_end;
        this.chart_type_top_videos = "line";

        this.user_id_top_quizzes = this.user_id;
        this.department_id_top_quizzes = this.department_id;
        this.date_from_top_quizzes = this.date_from;
        this.date_end_top_quizzes = this.date_end;
        this.chart_type_top_quizzes = "bar";

        this.user_id_most_point_users = this.user_id;
        this.department_id_most_point_users = this.department_id;
        this.date_from_most_point_users = this.date_from;
        this.date_end_most_point_users = this.date_end;
        this.chart_type_most_point_users = "doughnut";

        this.user_id_most_point_departments = this.user_id;
        this.department_id_most_point_departments = this.department_id;
        this.date_from_most_point_departments = this.date_from;
        this.date_end_most_point_departments = this.date_end;
        this.chart_type_most_point_departments = "radar";

        this.user_id_number_of_tasks_completed_by_user = this.user_id;
        this.department_id_number_of_tasks_completed_by_user = this.department_id;
        this.date_from_number_of_tasks_completed_by_user = this.date_from;
        this.date_end_number_of_tasks_completed_by_user = this.date_end;
        this.chart_type_number_of_tasks_completed_by_user = "bar";

        this.user_id_most_reward_redemptions = this.user_id;
        this.department_id_most_reward_redemptions = this.department_id;
        this.date_from_most_reward_redemptions = this.date_from;
        this.date_end_most_reward_redemptions = this.date_end;
        this.chart_type_most_reward_redemptions = "line";

        this.user_id_average_point_of_assignment = this.user_id;
        this.department_id_average_point_of_assignment = this.department_id;
        this.date_from_average_point_of_assignment = this.date_from;
        this.date_end_average_point_of_assignment = this.date_end;
        this.chart_type_average_point_of_assignment = "doughnut";

        this.user_id_point_value_over_time = this.user_id;
        this.department_id_point_value_over_time = this.department_id;
        this.date_from_point_value_over_time = this.date_from;
        this.date_end_point_value_over_time = this.date_end;
        this.chart_type_point_value_over_time = "line";

        this.user_id_most_sent_point_user = this.user_id;
        this.department_id_most_sent_point_user = this.department_id;
        this.date_from_most_sent_point_user = this.date_from;
        this.date_end_most_sent_point_user = this.date_end;
        this.chart_type_most_sent_point_user = "line";

        this.user_id_most_received_point_user = this.user_id;
        this.department_id_most_received_point_user = this.department_id;
        this.date_from_most_received_point_user = this.date_from;
        this.date_end_most_received_point_user = this.date_end;
        this.chart_type_most_received_point_user = "line";

        this.export_list = [
            {value:'top_videos', label: 'top videos'}, 
            {value:'top_quizzes', label: 'top quizzes'},
            {value: 'most_point_users', label: 'most point users'}, 
            {value: 'most_point_departments', label: 'most point departments'}, 
            {value: 'number_of_tasks_completed_by_user', label: 'number of tasks completed by user'}, 
            {value: 'most_reward_redemptions', label: 'most reward redemptions'}, 
            {value: 'average_point_of_assignment', label: 'average point of assignment'}, 
            {value: 'point_value_over_time', label: 'point value over time'}, 
            {value: 'most_sent_point_user', label: 'most sent point users'}, 
            {value: 'most_received_point_user', label: 'most received point users'}
        ];

        // //daily test
        // this.date_from.setDate(this.date_end.getDate() - 5);
        // // console.log("current user", localStorage.getItem('currentUser'));
        // this.company_id = JSON.parse(localStorage.getItem('currentUser'))._id;
        // this.department_id = "587881a10eff174f93740996";
        // this.mode = "daily"

        //hourly test
        // this.date_from.setTime(this.date_end.getTime() - (24*60*60*1000));
        // console.log("date from", this.date_from);
        // this.company_id = JSON.parse(localStorage.getItem('currentUser'))._id;
        // this.mode = "hourly"
    }
    get_canvas_tag_top_video(e) {
        this.canvas_tag_top_videos = e;
    }
    get_canvas_tag_top_quizzes(e) {
        this.canvas_tag_top_quizzes = e;
    }
    get_canvas_tag_most_point_users(e) {
        this.canvas_tag_most_point_users = e;
    }
    get_canvas_tag_most_point_departments(e) {
        this.canvas_tag_most_point_departments = e;
    }
    get_canvas_tag_number_of_tasks_completed_by_user(e) {
        this.canvas_tag_number_of_tasks_completed_by_user = e;
    }
    get_canvas_tag_most_reward_redemptions(e) {
        this.canvas_tag_most_reward_redemptions = e;
    }
    get_canvas_tag_average_point_of_assignment(e) {
        this.canvas_tag_average_point_of_assignment = e;
    }
    get_canvas_tag_point_value_over_time(e) {
        this.canvas_tag_point_value_over_time = e;
    }
    get_canvas_tag_most_sent_point_user(e) {
        this.canvas_tag_most_sent_point_user = e;
    }
    get_canvas_tag_most_received_point_user(e) {
        this.canvas_tag_most_received_point_user = e;
    }

    exportChartAsCsv() {
        var pdf = new jsPDF();
        let height_per_graph: number = 60;
        let width_per_graph: number = 100; 
        let i: number = 0;
        let export_data = [];
        if (this.final_export_list.indexOf("top_videos") >= 0) {
            let top_videos = {};
            for (let index in this.data_set_top_videos[0].data) {
                top_videos[this.labels_top_videos[index]] = this.data_set_top_videos[0].data[index]; 
            }
            export_data.push(top_videos);
            let canvas = this.canvas_tag_top_videos.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("top_quizzes") >= 0) {
            let top_quizzes = {};
            for (let index in this.data_set_top_quizzes[0].data) {
                top_quizzes[this.labels_top_quizzes[index]] = this.data_set_top_quizzes[0].data[index]; 
            }
            export_data.push(top_quizzes);
            let canvas = this.canvas_tag_top_quizzes.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_users") >= 0) {
            let most_point_users = {};
            for (let index in this.data_set_most_point_users) {
                most_point_users[this.labels_most_point_users[index]] = this.data_set_most_point_users[index]; 
            }
            export_data.push(most_point_users);
            let canvas = this.canvas_tag_most_point_users.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_departments") >= 0) {
            let most_point_departments = {};
            for (let index in this.data_set_most_point_departments[0].data) {
                most_point_departments[this.labels_most_point_departments[index]] = this.data_set_most_point_departments[0].data[index]; 
            }
            export_data.push(most_point_departments);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_point_departments.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("number_of_tasks_completed_by_user") >= 0) {
            let data_set_number_of_tasks_completed_by_user = {};
            for (let index in this.data_set_number_of_tasks_completed_by_user[0].data) {
                data_set_number_of_tasks_completed_by_user[this.labels_number_of_tasks_completed_by_user[index]] = this.data_set_number_of_tasks_completed_by_user[0].data[index]; 
            }
            export_data.push(data_set_number_of_tasks_completed_by_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_number_of_tasks_completed_by_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_reward_redemptions") >= 0) {
            let most_reward_redemptions = {};
            for (let index in this.data_set_most_reward_redemptions[0].data) {
                most_reward_redemptions[this.labels_most_reward_redemptions[index]] = this.data_set_most_reward_redemptions[0].data[index]; 
            }
            export_data.push(most_reward_redemptions);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_reward_redemptions.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }        
        if (this.final_export_list.indexOf("average_point_of_assignment") >= 0) {
            let average_point_of_assignment = {};
            for (let index in this.data_set_average_point_of_assignment[0].data) {
                average_point_of_assignment[this.labels_average_point_of_assignment[index]] = this.data_set_average_point_of_assignment[0].data[index]; 
            }
            export_data.push(average_point_of_assignment);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_average_point_of_assignment.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("point_value_over_time") >= 0) {
            let point_value_over_time = {};
            for (let index in this.data_set_point_value_over_time[0].data) {
                point_value_over_time[this.labels_point_value_over_time[index]] = this.data_set_point_value_over_time[0].data[index]; 
            }
            export_data.push(point_value_over_time);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_point_value_over_time.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_sent_point_user") >= 0) {
            let most_sent_point_user = {};
            for (let index in this.data_set_most_sent_point_user[0].data) {
                most_sent_point_user[this.labels_most_sent_point_user[index]] = this.data_set_most_sent_point_user[0].data[index]; 
            }
            export_data.push(most_sent_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_sent_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_received_point_user") >= 0) {
            let most_received_point_user = {};
            for (let index in this.data_set_most_received_point_user[0].data) {
                most_received_point_user[this.labels_most_received_point_user[index]] = this.data_set_most_received_point_user[0].data[index]; 
            }
            export_data.push(most_received_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_received_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        // let csv_data = json2csv({data: export_data, flatten: true});
        this.csvService.download(export_data, 'Filename');
    }
    exportChartAsGraph(){
        // let canvas = this.canvas_tag_top_videos.nativeElement;
        // var imgData = canvas.toDataURL("image/jpeg", 1.0);
        // pdf.addImage(imgData, 'JPEG', 0, 0);
        var pdf = new jsPDF();
        let height_per_graph: number = 60;
        let width_per_graph: number = 100; 
        let i: number = 0;
        let export_data = [];
        if (this.final_export_list.indexOf("top_videos") >= 0) {
            let top_videos = {};
            for (let index in this.data_set_top_videos[0].data) {
                top_videos[this.labels_top_videos[index]] = this.data_set_top_videos[0].data[index]; 
            }
            export_data.push(top_videos);
            let canvas = this.canvas_tag_top_videos.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("top_quizzes") >= 0) {
            let top_quizzes = {};
            for (let index in this.data_set_top_quizzes[0].data) {
                top_quizzes[this.labels_top_quizzes[index]] = this.data_set_top_quizzes[0].data[index]; 
            }
            export_data.push(top_quizzes);
            let canvas = this.canvas_tag_top_quizzes.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_users") >= 0) {
            let most_point_users = {};
            for (let index in this.data_set_most_point_users) {
                most_point_users[this.labels_most_point_users[index]] = this.data_set_most_point_users[index]; 
            }
            export_data.push(most_point_users);
            let canvas = this.canvas_tag_most_point_users.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_departments") >= 0) {
            let most_point_departments = {};
            for (let index in this.data_set_most_point_departments[0].data) {
                most_point_departments[this.labels_most_point_departments[index]] = this.data_set_most_point_departments[0].data[index]; 
            }
            export_data.push(most_point_departments);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_point_departments.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("number_of_tasks_completed_by_user") >= 0) {
            let data_set_number_of_tasks_completed_by_user = {};
            for (let index in this.data_set_number_of_tasks_completed_by_user[0].data) {
                data_set_number_of_tasks_completed_by_user[this.labels_number_of_tasks_completed_by_user[index]] = this.data_set_number_of_tasks_completed_by_user[0].data[index]; 
            }
            export_data.push(data_set_number_of_tasks_completed_by_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_number_of_tasks_completed_by_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_reward_redemptions") >= 0) {
            let most_reward_redemptions = {};
            for (let index in this.data_set_most_reward_redemptions[0].data) {
                most_reward_redemptions[this.labels_most_reward_redemptions[index]] = this.data_set_most_reward_redemptions[0].data[index]; 
            }
            export_data.push(most_reward_redemptions);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_reward_redemptions.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }        
        if (this.final_export_list.indexOf("average_point_of_assignment") >= 0) {
            let average_point_of_assignment = {};
            for (let index in this.data_set_average_point_of_assignment[0].data) {
                average_point_of_assignment[this.labels_average_point_of_assignment[index]] = this.data_set_average_point_of_assignment[0].data[index]; 
            }
            export_data.push(average_point_of_assignment);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_average_point_of_assignment.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("point_value_over_time") >= 0) {
            let point_value_over_time = {};
            for (let index in this.data_set_point_value_over_time[0].data) {
                point_value_over_time[this.labels_point_value_over_time[index]] = this.data_set_point_value_over_time[0].data[index]; 
            }
            export_data.push(point_value_over_time);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_point_value_over_time.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_sent_point_user") >= 0) {
            let most_sent_point_user = {};
            for (let index in this.data_set_most_sent_point_user[0].data) {
                most_sent_point_user[this.labels_most_sent_point_user[index]] = this.data_set_most_sent_point_user[0].data[index]; 
            }
            export_data.push(most_sent_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_sent_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_received_point_user") >= 0) {
            let most_received_point_user = {};
            for (let index in this.data_set_most_received_point_user[0].data) {
                most_received_point_user[this.labels_most_received_point_user[index]] = this.data_set_most_received_point_user[0].data[index]; 
            }
            export_data.push(most_received_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            let canvas = this.canvas_tag_most_received_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        // this.csvService.download(export_data, 'Filename');
        pdf.save("download.pdf");        
    }
    // convert Json to CSV data in Angular2
    ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";
        console.log("convert to csv, ")
        for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        console.log("csv convert", str);
        return str;
    }
    downloadFile(data){
      let blob = new Blob([data], { type: 'text/csv' });
      let url= window.URL.createObjectURL(blob);
      window.open(url);
    }

    chart_for_log_ons() {
        this.adminService.getLogOns(this.company_id, this.department_id_log_ons, this.user_id_log_ons, this.date_from_log_ons, this.date_end_log_ons).subscribe(
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
                    for (var date=new Date(this.date_from); date <= this.date_end; date.setDate(date.getDate() + 3)){
                        var number_for_daily = this.base_log_on;
                        for (var item of data) {
                            var date_range = new Date(date);
                            date_range.setDate(date.getDate() + 2);
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
    }
    change_setting_for_log_ons(e) {
        console.log(e);
        this.user_id_log_ons = e.user_id;
        this.department_id_log_ons = e.department_id;
        this.date_from_log_ons = e.date_from;
        this.date_end_log_ons = e.date_end;
        this.chart_for_log_ons();
    }
    chart_for_tasks_completed() {
        this.adminService.getTaskCompleted(this.company_id, this.department_id_tasks_completed, this.user_id_tasks_completed, this.date_from_tasks_completed, this.date_end_tasks_completed).subscribe(
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
    }
    change_setting_for_tasks_completed(e) {
        console.log(e);
        this.user_id_tasks_completed = e.user_id;
        this.department_id_tasks_completed = e.department_id;
        this.date_from_tasks_completed = e.date_from;
        this.date_end_tasks_completed = e.date_end;
        this.chart_for_tasks_completed();
    }
    chart_for_points_awarded() {
        //Points Awarded
        console.log("points awarded.................",this.company_id, this.department_id_points_awarded);
        this.adminService.getTaskCompleted(this.company_id, this.department_id_points_awarded, this.user_id_points_awarded, this.date_from_points_awarded, this.date_end_points_awarded).subscribe(
            data => {
                this.lineChart3Data = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.lineChart3Labels = [];
                this.total_points_awarded = 0;
                if (this.mode == 'monthly') {
                    // lineChart3
                    console.log("monthly------------------");
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
                    console.log("daily------------------");
                    console.log("total points awarded start", this.total_points_awarded);
                    this.total_points_awarded = 0;
                    for (var item of data) {
                        this.total_points_awarded += parseInt(item.points_awarded);
                        console.log("points awarded-----------", parseInt(item.points_awarded));
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
                    console.log("total points awarded end", this.total_points_awarded);
                }
                if (this.mode == 'hourly') {
                    // lineChart3
                    console.log("hourly------------------");
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
    }
    change_setting_for_points_awarded(e) {
        console.log(e);
        this.user_id_points_awarded = e.user_id;
        this.department_id_points_awarded = e.department_id;
        this.date_from_points_awarded = e.date_from;
        this.date_end_points_awarded = e.date_end;
        this.chart_for_points_awarded();
    }
    chart_for_reward_redemptions() {
        this.adminService.getRewardRedemptions(this.company_id, this.department_id_reward_redemptions, this.user_id_reward_redemptions, this.date_from_reward_redemptions, this.date_end_reward_redemptions).subscribe(
            data => {
                console.log("reward redemptions", data);
                this.lineChart4Data = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.lineChart4Labels = [];
                this.total_reward_redemptions = 0;
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
    }
    change_setting_for_reward_redemptions(e) {
        console.log(e);
        this.user_id_reward_redemptions = e.user_id;
        this.department_id_reward_redemptions = e.department_id;
        this.date_from_reward_redemptions = e.date_from;
        this.date_end_reward_redemptions = e.date_end;
        this.chart_for_reward_redemptions();
    }
    chart_for_top_videos() {
        this.adminService.getTopVideos(this.company_id, this.department_id_top_videos, this.user_id_top_videos, this.date_from_top_videos, this.date_end_top_videos).subscribe(
            data => {
                console.log("get top videos", data);
                this.data_set_top_videos = [
                    {data: [], label: 'Top Videos'},
                ];
                this.labels_top_videos = [];
                for (let item of data) {
                    this.data_set_top_videos[0].data.push(item.total);
                    this.labels_top_videos.push(item._id);
                }
            },
            error => {
                console.log(error);
            });
    }
    change_setting_top_videos(e) {
        console.log(e);
        this.user_id_top_videos = e.user_id;
        this.department_id_top_videos = e.department_id;
        this.date_from_top_videos = e.date_from;
        this.date_end_top_videos = e.date_end;
        this.chart_for_top_videos();
    }
    chart_for_top_quizzes() {
        this.adminService.getTopQuizzes(this.company_id, this.department_id_top_quizzes, this.user_id_top_quizzes, this.date_from_top_quizzes, this.date_end_top_quizzes).subscribe(
            data => {
                console.log("get top quizzes", data);
                this.data_set_top_quizzes = [
                    {data: [], label: 'Top Quizzes'},
                ];
                this.labels_top_quizzes = [];
                for (let item of data) {
                    this.data_set_top_quizzes[0].data.push(item.total);
                    this.labels_top_quizzes.push(item._id);
                }
            },
            error => {
                console.log(error);
            });
    }
    change_setting_top_quizzes(e) {
        console.log(e);
        this.user_id_top_quizzes = e.user_id;
        this.department_id_top_quizzes = e.department_id;
        this.date_from_top_quizzes = e.date_from;
        this.date_end_top_quizzes = e.date_end;
        this.chart_for_top_quizzes();
    }
    chart_for_most_point_users() {
        this.adminService.getMostPointUsers(this.company_id, this.department_id_most_point_users, this.date_from_most_point_users, this.date_end_most_point_users).subscribe(
            data => {
                this.data_set_most_point_users = [];
                this.labels_most_point_users = [];
                for (let item of data) {
                    this.data_set_most_point_users.push(item.available_tokens);
                    let full_name = item.first_name + item.last_name;
                    this.labels_most_point_users.push(full_name);
                }    
            },
            error => {

            });
    }
    change_setting_most_point_users(e) {
        console.log(e);
        this.user_id_most_point_users = e.user_id;
        this.department_id_most_point_users = e.department_id;
        this.date_from_most_point_users = e.date_from;
        this.date_end_most_point_users = e.date_end;
        this.chart_for_most_point_users();
    }
    chart_for_most_point_departments() {
        this.adminService.getMostPointDepartments(this.company_id, this.date_from_most_point_departments, this.date_end_most_point_departments).subscribe(
            data => {
                this.data_set_most_point_departments = [
                    {data: [], label: 'Top Departments'},
                ];
                this.labels_most_point_departments = [];
                for (let item of data) {
                    this.data_set_most_point_departments[0].data.push(item.total);
                    this.labels_most_point_departments.push(item._id);
                }    
            },
            error => {

            }); 
    }
    change_setting_most_point_departments(e) {
        console.log(e);
        this.user_id_most_point_departments = e.user_id;
        this.department_id_most_point_departments = e.department_id;
        this.date_from_most_point_departments = e.date_from;
        this.date_end_most_point_departments = e.date_end;
        this.chart_for_most_point_departments();
    }    
    chart_for_number_of_tasks_completed_by_user() {
        this.adminService.getTotalNumberOfTasksByUser(this.company_id, this.department_id_number_of_tasks_completed_by_user, this.date_from_number_of_tasks_completed_by_user, this.date_end_number_of_tasks_completed_by_user).subscribe(
            data => {
                console.log(data);
                this.data_set_number_of_tasks_completed_by_user = [
                    {data: [], label: 'Number Of Tasks By User'}
                ];
                this.labels_number_of_tasks_completed_by_user = [];
                for (let item of data) {
                    this.data_set_number_of_tasks_completed_by_user[0].data.push(item.total);
                    this.labels_number_of_tasks_completed_by_user.push(item._id.first_name + " " + item._id.last_name);
                }    
            },
            error => {
                console.log(error);
            });
    }
    change_setting_number_of_tasks_completed_by_user(e) {
        console.log(e);
        this.user_id_number_of_tasks_completed_by_user = e.user_id;
        this.department_id_number_of_tasks_completed_by_user = e.department_id;
        this.date_from_number_of_tasks_completed_by_user = e.date_from;
        this.date_end_number_of_tasks_completed_by_user = e.date_end;
        this.chart_for_number_of_tasks_completed_by_user();
    }
    chart_for_average_point_of_assignment() {
        this.adminService.getAveragePointPerAssignment(this.company_id, this.department_id_average_point_of_assignment, this.date_from_average_point_of_assignment, this.date_end_average_point_of_assignment).subscribe(
            data => {
                console.log(data);
                this.data_set_average_point_of_assignment = [];
                this.labels_average_point_of_assignment = [];
                for (let item of data) {
                    this.data_set_average_point_of_assignment.push(item.avg);
                    this.labels_average_point_of_assignment.push(item.user.first_name + " " + item.user.last_name);
                }    
            },
            error => {
                console.log(error);
            });
    }
    change_setting_average_point_of_assignment(e) {
        console.log(e);
        this.user_id_average_point_of_assignment = e.user_id;
        this.department_id_average_point_of_assignment = e.department_id;
        this.date_from_average_point_of_assignment = e.date_from;
        this.date_end_average_point_of_assignment = e.date_end;
        this.chart_for_average_point_of_assignment();
    }
    chart_for_most_reward_redemptions() {
        this.adminService.getMostRewardRedemptions(this.company_id, this.department_id_most_reward_redemptions, this.user_id_most_reward_redemptions, this.date_from_most_reward_redemptions, this.date_end_most_reward_redemptions).subscribe(
            data => {
                console.log(data);
                this.data_set_most_reward_redemptions = [
                    {data: [], label: 'Most Reward Redemptions'}
                ];
                this.labels_most_reward_redemptions = [];
                for (let item of data) {
                    this.data_set_most_reward_redemptions[0].data.push(item.number_of_reward);
                    this.labels_most_reward_redemptions.push(item.reward.name);
                }    
            },
            error => {
                console.log(error);
            }); 
    }
    change_setting_most_reward_redemptions(e) {
        console.log(e);
        this.user_id_most_reward_redemptions = e.user_id;
        this.department_id_most_reward_redemptions = e.department_id;
        this.date_from_most_reward_redemptions = e.date_from;
        this.date_end_most_reward_redemptions = e.date_end;
        this.chart_for_most_reward_redemptions();
    }
    chart_for_point_value_over_time() {
        this.adminService.getTaskCompleted(this.company_id, this.department_id_point_value_over_time, this.user_id_point_value_over_time, this.date_from_point_value_over_time, this.date_end_point_value_over_time).subscribe(
            data => {
                this.data_set_point_value_over_time = [
                    {
                        data: [],
                        label: 'Series A'
                    }
                ];
                this.labels_point_value_over_time = [];
                if (this.mode == 'monthly') {
                    // lineChart3
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
                        this.data_set_point_value_over_time[0].data.push(number_for_monthly);
                        var num = date.getMonth() + 1;
                        this.labels_point_value_over_time.push(num.toString());

                    }
                    // this
                }
                if (this.mode == 'daily') {
                    // lineChart3
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
                        this.data_set_point_value_over_time[0].data.push(number_for_daily);
                        var num = date.getDate() + 1;
                        this.labels_point_value_over_time.push(num.toString());
                    }    
                }
                if (this.mode == 'hourly') {
                    // lineChart3
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
                        this.data_set_point_value_over_time[0].data.push(number_for_hourly);
                        var num = date.getHours() + 1;
                        this.labels_point_value_over_time.push(num.toString());

                    }    
                }
            },
            error => {

            }
        );
    }
    change_setting_point_value_over_time(e) {
        console.log(e);
        this.user_id_point_value_over_time = e.user_id;
        this.department_id_point_value_over_time = e.department_id;
        this.date_from_point_value_over_time = e.date_from;
        this.date_end_point_value_over_time = e.date_end;
        this.chart_for_point_value_over_time();
    }
    chart_for_most_sent_point_user() {
        this.adminService.getMostSentPointUser(this.company_id, this.department_id_most_sent_point_user, this.date_from_most_sent_point_user, this.date_end_most_sent_point_user).subscribe(
            data => {
                console.log(data);
                this.data_set_most_sent_point_user = [
                    {data: [], label: 'Most Sent Point User'}
                ];
                this.labels_most_sent_point_user = [];
                for (let item of data) {
                    this.data_set_most_sent_point_user[0].data.push(item.total);
                    this.labels_most_sent_point_user.push(item._id.first_name + " " + item._id.last_name);
                }    
            },
            error => {
                console.log(error);
            });
    }
    change_setting_most_sent_point_user(e) {
        console.log(e);
        this.user_id_most_sent_point_user = e.user_id;
        this.department_id_most_sent_point_user = e.department_id;
        this.date_from_most_sent_point_user = e.date_from;
        this.date_end_most_sent_point_user = e.date_end;
        this.chart_for_most_sent_point_user();
    }
    chart_for_most_received_point_user() {
        this.adminService.getMostReceivedPointUser(this.company_id, this.department_id_most_received_point_user, this.date_from_most_received_point_user, this.date_end_most_received_point_user).subscribe(
            data => {
                console.log(data);
                this.data_set_most_received_point_user = [
                    {data: [], label: 'Most Received Point User'}
                ];
                this.labels_most_received_point_user = [];
                for (let item of data) {
                    this.data_set_most_received_point_user[0].data.push(item.total);
                    this.labels_most_received_point_user.push(item._id.first_name + " " + item._id.last_name);
                }    
            },
            error => {
                console.log(error);
            }); 
    }
    change_setting_most_received_point_user(e) {
        console.log(e);
        this.user_id_most_received_point_user = e.user_id;
        this.department_id_most_received_point_user = e.department_id;
        this.date_from_most_received_point_user = e.date_from;
        this.date_end_most_received_point_user = e.date_end;
        this.chart_for_most_received_point_user();
    }
    employee_part() {
        this.adminService.getUsers().subscribe(
            data => {
                this.users = data;
            },    
            error => {
                console.log(error);
            });
        this.adminService.getDepartments().subscribe(
            data => {
                this.departments = data;
                this.departments.push({_id: "undefined", "department": "all"});
            },    
            error => {
                console.log(error);
            }); 
    }
    ngOnInit() {
        this.init_date_picker()
        this.update_all_chart();
    }

    init_date_picker() {
        jQuery(this.date_from_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_from = new Date(value);
                this.update_all_chart();
              }
            })
            .datepicker('setDate', this.date_from);
        jQuery(this.date_end_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_end = new Date(value);
                this.update_all_chart();
              }
            })
            .datepicker('setDate', this.date_end);
    }
    update_all_chart() {
        console.log("update all chart");
        this.chart_for_log_ons();
        this.chart_for_tasks_completed();
        this.chart_for_points_awarded();
        this.chart_for_reward_redemptions();
        this.chart_for_top_videos();
        this.chart_for_top_quizzes();
        this.chart_for_most_point_users();
        this.chart_for_most_point_departments();
        this.chart_for_number_of_tasks_completed_by_user();
        this.chart_for_average_point_of_assignment();
        this.chart_for_most_reward_redemptions();
        this.chart_for_point_value_over_time();
        this.chart_for_most_sent_point_user();
        this.chart_for_most_received_point_user();
        this.employee_part();
    }
    setUser(e) {
        this.user_id = e;
        this.update_all_chart();
    }

    select_department() {
        this.update_all_chart();
    }

    onMultipleSelected(item) {
        console.log(item.value);
    }
    onMultipleDeselected(item) {
        console.log(item.value);
    }


    dropdownItemClickEvent(event) {
        let element = event.target;
        if (element.classList.contains('fa-check')){
            element.classList.remove('fa-check');
            this.final_export_list.splice(this.final_export_list.indexOf(element.attributes.value.value), 1);
        }
        else {
            element.classList.add('fa-check');
            this.final_export_list.push(element.attributes.value.value)
        }
        console.log(this.final_export_list);
    }

}
