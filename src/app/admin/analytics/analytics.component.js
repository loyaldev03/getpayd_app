"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/Rx');
var AnalyticsComponent = (function () {
    function AnalyticsComponent(adminService, userService, csvService) {
        // // this.user_id = "587881a10eff174f93740995";
        // // this.user_id = "5879c34f88701f3c1194665a"
        // this.user_id = null;
        // this.department_id = "5879f63530456b6947c6d665";
        // console.log("current user", localStorage.getItem('currentUser'));
        this.adminService = adminService;
        this.userService = userService;
        this.csvService = csvService;
        this.brandPrimary = '#20a8d8';
        this.brandSuccess = '#4dbd74';
        this.brandInfo = '#63c2de';
        this.brandWarning = '#f8cb00';
        this.brandDanger = '#f86c6b';
        this.total_logons = 0;
        this.mode = "monthly";
        this.base_log_on = 10;
        this.unit_per_user = 5;
        this.hourly_unit = 4;
        this.total_tasks_completed = 0;
        this.base_tasks_completed = 20;
        this.total_points_awarded = 0;
        this.base_points_awarded = 100;
        this.total_reward_redemptions = 0;
        this.base_reward_redemptions = 100;
        this.data_set_number_of_tasks_completed_by_user = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        this.labels_number_of_tasks_completed_by_user = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.data_set_average_point_of_assignment = [65, 59, 80, 81, 56, 55, 40];
        this.labels_average_point_of_assignment = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.data_set_most_reward_redemptions = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        this.labels_most_reward_redemptions = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.data_set_point_value_over_time = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        this.labels_point_value_over_time = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.data_set_most_sent_point_user = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        this.labels_most_sent_point_user = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.data_set_most_received_point_user = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        this.labels_most_received_point_user = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.users_for_analytics = [];
        this.users = [];
        this.departments = [];
        this.export_list = [];
        this.final_export_list = [];
        // lineChart1
        this.lineChart1Data = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Series A'
            }
        ];
        this.lineChart1Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart1Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent'
                        }
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                            min: 40 - 5,
                            max: 84 + 5
                        }
                    }]
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            },
            legend: {
                display: false
            }
        };
        this.lineChart1Colours = [
            {
                backgroundColor: this.brandPrimary,
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart1Legend = false;
        this.lineChart1Type = 'line';
        // lineChart2
        this.lineChart2Data = [
            {
                data: [1, 18, 9, 17, 34, 22, 11],
                label: 'Series A'
            }
        ];
        this.lineChart2Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart2Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent'
                        }
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                            min: 1 - 5,
                            max: 34 + 5
                        }
                    }]
            },
            elements: {
                line: {
                    tension: 0.00001,
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            },
            legend: {
                display: false
            }
        };
        this.lineChart2Colours = [
            {
                backgroundColor: this.brandInfo,
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart2Legend = false;
        this.lineChart2Type = 'line';
        // lineChart3
        this.lineChart3Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40],
                label: 'Series A'
            }
        ];
        this.lineChart3Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart3Options = {
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
                    hoverRadius: 4
                }
            },
            legend: {
                display: false
            }
        };
        this.lineChart3Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart3Legend = false;
        this.lineChart3Type = 'line';
        // barChart1
        this.barChart1Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
                label: 'Series A'
            }
        ];
        this.barChart1Labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
        this.barChart1Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        barPercentage: 0.6
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            legend: {
                display: false
            }
        };
        this.barChart1Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderWidth: 0
            }
        ];
        this.barChart1Legend = false;
        this.barChart1Type = 'bar';
        // lineChart4
        this.lineChart4Data = [
            {
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
                label: 'Series A'
            }
        ];
        this.lineChart4Labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.lineChart4Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        points: false
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            elements: { point: { radius: 0 } },
            legend: {
                display: false
            }
        };
        this.lineChart4Colours = [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                borderWidth: 2
            }
        ];
        this.lineChart4Legend = false;
        this.lineChart4Type = 'line';
        // barChart2
        this.barChart2Data = [
            {
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
                label: 'Series A'
            }
        ];
        this.barChart2Labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.barChart2Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        barPercentage: 0.6
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            },
            legend: {
                display: false
            }
        };
        this.barChart2Colours = [
            {
                backgroundColor: 'rgba(0,0,0,.2)',
                borderWidth: 0
            }
        ];
        this.barChart2Legend = false;
        this.barChart2Type = 'bar';
        // barChart3
        this.barChart3Data = [
            {
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
                label: 'Series A'
            }
        ];
        this.barChart3Labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.barChart3Options = {
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
        this.barChart3Primary = [
            {
                backgroundColor: this.brandPrimary,
                borderColor: 'transparent',
                borderWidth: 1
            }
        ];
        this.barChart3Danger = [
            {
                backgroundColor: this.brandDanger,
                borderColor: 'transparent',
                borderWidth: 1
            }
        ];
        this.barChart3Success = [
            {
                backgroundColor: this.brandSuccess,
                borderColor: 'transparent',
                borderWidth: 1
            }
        ];
        this.barChart3Legend = false;
        this.barChart3Type = 'bar';
        // lineChart5
        this.lineChart5Data = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Series A'
            }
        ];
        this.lineChart5Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart5Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        points: false
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            elements: { point: { radius: 0 } },
            legend: {
                display: false
            }
        };
        this.lineChart5Info = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandInfo,
                borderWidth: 2
            }
        ];
        this.lineChart5Success = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandInfo,
                borderWidth: 2
            }
        ];
        this.lineChart5Warning = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandWarning,
                borderWidth: 2
            }
        ];
        this.lineChart5Legend = false;
        this.lineChart5Type = 'line';
        // lineChart
        this.data_set_top_videos = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        this.labels_top_videos = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        // public lineChartOptions:any = {
        //     animation: false,
        //     responsive: true,        
        //     defaultFontColor: 'rgba(255,0,0,1)',
        //     legend: {
        //         display: true,
        //         labels: {
        //             fontColor: 'rgb(255,0,0)'
        //         }
        //     },
        //     scales: {
        //         xAxes: [{
        //             gridLines: {
        //                 show: true,
        //                 color: "F3F3F3",
        //             },
        //             // display: true,
        //             ticks: {
        //               fontColor: "rgb(255,0,0)" // this here
        //             },
        //         }],
        //         yAxes: [{
        //             gridLines: {
        //                 show: true,
        //                 color: "F3F3F3",
        //             },
        //         //     display: true,
        //             ticks: {
        //               fontColor: "rgb(255,0,0)" // this here
        //             },
        //         }],
        //         // scaleLineColor: "red"
        //     },
        // };
        // public lineChartColours:Array<any> = [
        //     { // grey
        //         backgroundColor: 'rgba(255,0,0,1)',
        //         borderColor: 'rgba(255,0,0,1)',
        //         pointBackgroundColor: 'rgba(255,0,0,1)',
        //         pointBorderColor: 'rgba(255,0,0,1)',
        //         pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        //         pointHoverBorderColor: 'rgba(255,0,0,1)'
        //     },
        //     { // dark grey
        //         backgroundColor: 'rgba(255,0,0,1)',
        //         borderColor: 'rgba(255,0,0,1)',
        //         pointBackgroundColor: 'rgba(255,0,0,1)',
        //         pointBorderColor: 'rgba(255,0,0,1)',
        //         pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        //         pointHoverBorderColor: 'rgba(255,0,0,1)'
        //     },
        //     { // grey
        //         backgroundColor: 'rgba(255,0,0,1)',
        //         borderColor: 'rgba(255,0,0,1)',
        //         pointBackgroundColor: 'rgba(255,0,0,1)',
        //         pointBorderColor: 'rgba(255,0,0,1)',
        //         pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        //         pointHoverBorderColor: 'rgba(255,0,0,1)'
        //     }
        // ];
        this.lineChartColours = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartOptions = {
            // maintainAspectRatio: false,
            backgroundColor: 'rgb(255,255,0)',
            scales: {
                xAxes: [{
                        display: true,
                        ticks: {
                            fontColor: "rgb(0,0,255)" // this here
                        },
                        gridLines: {
                            color: "rgba(255,0,0,0.5)",
                            zeroLineColor: "rgba(255,0,0,0.5)"
                        }
                    }],
                yAxes: [{
                        display: true,
                        ticks: {
                            fontColor: "rgb(0,0,255)" // this here
                        },
                        gridLines: {
                            color: "rgba(255,0,0,0.5)",
                            zeroLineColor: "rgba(255,0,0,0.5)"
                        }
                    }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            },
            legend: {
                display: true
            }
        };
        // public lineChartColours:Array<any> = [
        //     {
        //         backgroundColor: 'rgba(0,0,0,1)',
        //         borderColor: 'rgba(0,0,0,1)',
        //         defaultFontColor: 'rgba(255,0,0,1)'
        //     }
        // ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        // barChart
        this.barChartOptions = {
            // maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: true,
                        ticks: {
                            fontColor: "rgb(255,0,0)" // this here
                        },
                        gridLines: {
                            color: "rgba(255,0,0,0.5)",
                            zeroLineColor: "rgba(255,0,0,0.5)"
                        }
                    }],
                yAxes: [{
                        display: true,
                        ticks: {
                            fontColor: "rgb(255,0,0)" // this here
                        },
                        gridLines: {
                            color: "rgba(255,0,0,0.5)",
                            zeroLineColor: "rgba(255,0,0,0.5)"
                        }
                    }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            },
            legend: {
                display: true
            }
        };
        this.labels_top_quizzes = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.data_set_top_quizzes = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
        // Doughnut
        this.labels_most_point_users = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        this.data_set_most_point_users = [350, 450, 100];
        this.doughnutChartType = 'doughnut';
        // Radar
        this.labels_most_point_departments = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
        this.data_set_most_point_departments = [
            { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
        ];
        this.radarChartType = 'radar';
        // Pie
        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        this.pieChartData = [300, 500, 100];
        this.pieChartType = 'pie';
        // PolarArea
        this.polarAreaChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        this.polarAreaChartData = [300, 500, 100, 40, 120];
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';
        //monthly test
        this.date_end = new Date();
        this.date_from = new Date();
        this.date_from.setDate(this.date_end.getDate() - 15);
        this.company_id = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.mode = "daily";
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
            { value: 'top_videos', label: 'top videos' },
            { value: 'top_quizzes', label: 'top quizzes' },
            { value: 'most_point_users', label: 'most point users' },
            { value: 'most_point_departments', label: 'most point departments' },
            { value: 'number_of_tasks_completed_by_user', label: 'number of tasks completed by user' },
            { value: 'most_reward_redemptions', label: 'most reward redemptions' },
            { value: 'average_point_of_assignment', label: 'average point of assignment' },
            { value: 'point_value_over_time', label: 'point value over time' },
            { value: 'most_sent_point_user', label: 'most sent point users' },
            { value: 'most_received_point_user', label: 'most received point users' }
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
    //convert Hex to RGBA
    AnalyticsComponent.prototype.convertHex = function (hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return rgba;
    };
    // events
    AnalyticsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    AnalyticsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    AnalyticsComponent.prototype.get_canvas_tag_top_video = function (e) {
        this.canvas_tag_top_videos = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_top_quizzes = function (e) {
        this.canvas_tag_top_quizzes = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_most_point_users = function (e) {
        this.canvas_tag_most_point_users = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_most_point_departments = function (e) {
        this.canvas_tag_most_point_departments = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_number_of_tasks_completed_by_user = function (e) {
        this.canvas_tag_number_of_tasks_completed_by_user = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_most_reward_redemptions = function (e) {
        this.canvas_tag_most_reward_redemptions = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_average_point_of_assignment = function (e) {
        this.canvas_tag_average_point_of_assignment = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_point_value_over_time = function (e) {
        this.canvas_tag_point_value_over_time = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_most_sent_point_user = function (e) {
        this.canvas_tag_most_sent_point_user = e;
    };
    AnalyticsComponent.prototype.get_canvas_tag_most_received_point_user = function (e) {
        this.canvas_tag_most_received_point_user = e;
    };
    AnalyticsComponent.prototype.exportChartAsCsv = function () {
        var pdf = new jsPDF();
        var height_per_graph = 60;
        var width_per_graph = 100;
        var i = 0;
        var export_data = [];
        if (this.final_export_list.indexOf("top_videos") >= 0) {
            var top_videos = {};
            for (var index in this.data_set_top_videos[0].data) {
                top_videos[this.labels_top_videos[index]] = this.data_set_top_videos[0].data[index];
            }
            export_data.push(top_videos);
            var canvas = this.canvas_tag_top_videos.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("top_quizzes") >= 0) {
            var top_quizzes = {};
            for (var index in this.data_set_top_quizzes[0].data) {
                top_quizzes[this.labels_top_quizzes[index]] = this.data_set_top_quizzes[0].data[index];
            }
            export_data.push(top_quizzes);
            var canvas = this.canvas_tag_top_quizzes.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_users") >= 0) {
            var most_point_users = {};
            for (var index in this.data_set_most_point_users) {
                most_point_users[this.labels_most_point_users[index]] = this.data_set_most_point_users[index];
            }
            export_data.push(most_point_users);
            var canvas = this.canvas_tag_most_point_users.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_departments") >= 0) {
            var most_point_departments = {};
            for (var index in this.data_set_most_point_departments[0].data) {
                most_point_departments[this.labels_most_point_departments[index]] = this.data_set_most_point_departments[0].data[index];
            }
            export_data.push(most_point_departments);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_point_departments.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("number_of_tasks_completed_by_user") >= 0) {
            var data_set_number_of_tasks_completed_by_user = {};
            for (var index in this.data_set_number_of_tasks_completed_by_user[0].data) {
                data_set_number_of_tasks_completed_by_user[this.labels_number_of_tasks_completed_by_user[index]] = this.data_set_number_of_tasks_completed_by_user[0].data[index];
            }
            export_data.push(data_set_number_of_tasks_completed_by_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_number_of_tasks_completed_by_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_reward_redemptions") >= 0) {
            var most_reward_redemptions = {};
            for (var index in this.data_set_most_reward_redemptions[0].data) {
                most_reward_redemptions[this.labels_most_reward_redemptions[index]] = this.data_set_most_reward_redemptions[0].data[index];
            }
            export_data.push(most_reward_redemptions);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_reward_redemptions.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("average_point_of_assignment") >= 0) {
            var average_point_of_assignment = {};
            for (var index in this.data_set_average_point_of_assignment[0].data) {
                average_point_of_assignment[this.labels_average_point_of_assignment[index]] = this.data_set_average_point_of_assignment[0].data[index];
            }
            export_data.push(average_point_of_assignment);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_average_point_of_assignment.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("point_value_over_time") >= 0) {
            var point_value_over_time = {};
            for (var index in this.data_set_point_value_over_time[0].data) {
                point_value_over_time[this.labels_point_value_over_time[index]] = this.data_set_point_value_over_time[0].data[index];
            }
            export_data.push(point_value_over_time);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_point_value_over_time.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_sent_point_user") >= 0) {
            var most_sent_point_user = {};
            for (var index in this.data_set_most_sent_point_user[0].data) {
                most_sent_point_user[this.labels_most_sent_point_user[index]] = this.data_set_most_sent_point_user[0].data[index];
            }
            export_data.push(most_sent_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_sent_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_received_point_user") >= 0) {
            var most_received_point_user = {};
            for (var index in this.data_set_most_received_point_user[0].data) {
                most_received_point_user[this.labels_most_received_point_user[index]] = this.data_set_most_received_point_user[0].data[index];
            }
            export_data.push(most_received_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_received_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        // let csv_data = json2csv({data: export_data, flatten: true});
        this.csvService.download(export_data, 'Filename');
    };
    AnalyticsComponent.prototype.getCsvFromNestedJson = function (json_data) {
        var row = "";
        for (var i in json_data) {
            for (var index in json_data[i]) {
                var data = json_data[i][index];
                if (typeof data === 'object') {
                    data = data.name;
                }
                row += '"' + data + '",';
            }
        }
    };
    AnalyticsComponent.prototype.exportChartAsGraph = function () {
        // let canvas = this.canvas_tag_top_videos.nativeElement;
        // var imgData = canvas.toDataURL("image/jpeg", 1.0);
        // pdf.addImage(imgData, 'JPEG', 0, 0);
        var pdf = new jsPDF();
        var height_per_graph = 80;
        var width_per_graph = 100;
        var i = 0;
        var export_data = [];
        if (this.final_export_list.indexOf("top_videos") >= 0) {
            var top_videos = {};
            for (var index in this.data_set_top_videos[0].data) {
                top_videos[this.labels_top_videos[index]] = this.data_set_top_videos[0].data[index];
            }
            export_data.push(top_videos);
            var canvas = this.canvas_tag_top_videos.nativeElement;
            var imgData = canvas.toDataURL("image/png", 1.0);
            pdf.addImage(imgData, 'png', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("top_quizzes") >= 0) {
            var top_quizzes = {};
            for (var index in this.data_set_top_quizzes[0].data) {
                top_quizzes[this.labels_top_quizzes[index]] = this.data_set_top_quizzes[0].data[index];
            }
            export_data.push(top_quizzes);
            var canvas = this.canvas_tag_top_quizzes.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_users") >= 0) {
            var most_point_users = {};
            for (var index in this.data_set_most_point_users) {
                most_point_users[this.labels_most_point_users[index]] = this.data_set_most_point_users[index];
            }
            export_data.push(most_point_users);
            var canvas = this.canvas_tag_most_point_users.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_point_departments") >= 0) {
            var most_point_departments = {};
            for (var index in this.data_set_most_point_departments[0].data) {
                most_point_departments[this.labels_most_point_departments[index]] = this.data_set_most_point_departments[0].data[index];
            }
            export_data.push(most_point_departments);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_point_departments.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("number_of_tasks_completed_by_user") >= 0) {
            var data_set_number_of_tasks_completed_by_user = {};
            for (var index in this.data_set_number_of_tasks_completed_by_user[0].data) {
                data_set_number_of_tasks_completed_by_user[this.labels_number_of_tasks_completed_by_user[index]] = this.data_set_number_of_tasks_completed_by_user[0].data[index];
            }
            export_data.push(data_set_number_of_tasks_completed_by_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_number_of_tasks_completed_by_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_reward_redemptions") >= 0) {
            var most_reward_redemptions = {};
            for (var index in this.data_set_most_reward_redemptions[0].data) {
                most_reward_redemptions[this.labels_most_reward_redemptions[index]] = this.data_set_most_reward_redemptions[0].data[index];
            }
            export_data.push(most_reward_redemptions);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_reward_redemptions.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("average_point_of_assignment") >= 0) {
            var average_point_of_assignment = {};
            for (var index in this.data_set_average_point_of_assignment[0].data) {
                average_point_of_assignment[this.labels_average_point_of_assignment[index]] = this.data_set_average_point_of_assignment[0].data[index];
            }
            export_data.push(average_point_of_assignment);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_average_point_of_assignment.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("point_value_over_time") >= 0) {
            var point_value_over_time = {};
            for (var index in this.data_set_point_value_over_time[0].data) {
                point_value_over_time[this.labels_point_value_over_time[index]] = this.data_set_point_value_over_time[0].data[index];
            }
            export_data.push(point_value_over_time);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_point_value_over_time.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_sent_point_user") >= 0) {
            var most_sent_point_user = {};
            for (var index in this.data_set_most_sent_point_user[0].data) {
                most_sent_point_user[this.labels_most_sent_point_user[index]] = this.data_set_most_sent_point_user[0].data[index];
            }
            export_data.push(most_sent_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_sent_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        if (this.final_export_list.indexOf("most_received_point_user") >= 0) {
            var most_received_point_user = {};
            for (var index in this.data_set_most_received_point_user[0].data) {
                most_received_point_user[this.labels_most_received_point_user[index]] = this.data_set_most_received_point_user[0].data[index];
            }
            export_data.push(most_received_point_user);
            if (i === 4) {
                pdf.addPage();
                i = 0;
            }
            var canvas = this.canvas_tag_most_received_point_user.nativeElement;
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(imgData, 'JPEG', (i % 2) * width_per_graph, i * height_per_graph + 20);
            i++;
        }
        // this.csvService.download(export_data, 'Filename');
        pdf.save("download.pdf");
    };
    // convert Json to CSV data in Angular2
    AnalyticsComponent.prototype.ConvertToCSV = function (objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";
        console.log("convert to csv, ");
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
                if (line != '')
                    line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        console.log("csv convert", str);
        return str;
    };
    AnalyticsComponent.prototype.downloadFile = function (data) {
        var blob = new Blob([data], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    AnalyticsComponent.prototype.chart_for_log_ons = function () {
        var _this = this;
        this.adminService.getLogOns(this.company_id, this.department_id_log_ons, this.user_id_log_ons, this.date_from_log_ons, this.date_end_log_ons).subscribe(function (data) {
            console.log("get Log ons", data);
            _this.lineChart1Data = [
                {
                    data: [],
                    label: 'Series A'
                }
            ];
            _this.lineChart1Labels = [];
            _this.total_logons = data.length;
            if (_this.mode == 'monthly') {
                // lineChart1
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setMonth(date.getMonth() + 1)) {
                    var number_for_monthly = _this.base_log_on;
                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                        var item = data_1[_i];
                        var date_range = new Date(date);
                        date_range.setMonth(date.getMonth() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_monthly += _this.unit_per_user;
                        }
                    }
                    console.log(number_for_monthly, "   ", date.getMonth() + 1);
                    _this.lineChart1Data[0].data.push(number_for_monthly);
                    _this.lineChart1Labels.push(date.getMonth() + 1);
                }
            }
            if (_this.mode == 'daily') {
                // lineChart1
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setDate(date.getDate() + 3)) {
                    var number_for_daily = _this.base_log_on;
                    for (var _a = 0, data_2 = data; _a < data_2.length; _a++) {
                        var item = data_2[_a];
                        var date_range = new Date(date);
                        date_range.setDate(date.getDate() + 2);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_daily += _this.unit_per_user;
                        }
                    }
                    _this.lineChart1Data[0].data.push(number_for_daily);
                    _this.lineChart1Labels.push(date.getDate() + 1);
                }
            }
            if (_this.mode == 'hourly') {
                // lineChart1
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000))) {
                    var number_for_hourly = _this.base_log_on;
                    for (var _b = 0, data_3 = data; _b < data_3.length; _b++) {
                        var item = data_3[_b];
                        var date_range = new Date(date);
                        date_range.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000));
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_hourly += _this.unit_per_user;
                        }
                    }
                    _this.lineChart1Data[0].data.push(number_for_hourly);
                    _this.lineChart1Labels.push(date.getHours() + 1);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_for_log_ons = function (e) {
        console.log(e);
        this.user_id_log_ons = e.user_id;
        this.department_id_log_ons = e.department_id;
        this.date_from_log_ons = e.date_from;
        this.date_end_log_ons = e.date_end;
        this.chart_for_log_ons();
    };
    AnalyticsComponent.prototype.chart_for_tasks_completed = function () {
        var _this = this;
        this.adminService.getTaskCompleted(this.company_id, this.department_id_tasks_completed, this.user_id_tasks_completed, this.date_from_tasks_completed, this.date_end_tasks_completed).subscribe(function (data) {
            _this.lineChart2Data = [
                {
                    data: [],
                    label: 'Series A'
                }
            ];
            _this.lineChart2Labels = [];
            _this.total_tasks_completed = data.length;
            if (_this.mode == 'monthly') {
                // lineChart2
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setMonth(date.getMonth() + 1)) {
                    var number_for_monthly = _this.base_tasks_completed;
                    for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
                        var item = data_4[_i];
                        var date_range = new Date(date);
                        date_range.setMonth(date.getMonth() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_monthly += _this.unit_per_user;
                        }
                    }
                    _this.lineChart2Data[0].data.push(number_for_monthly);
                    _this.lineChart2Labels.push(date.getMonth() + 1);
                }
            }
            if (_this.mode == 'daily') {
                // lineChart2
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setDate(date.getDate() + 1)) {
                    var number_for_daily = _this.base_tasks_completed;
                    for (var _a = 0, data_5 = data; _a < data_5.length; _a++) {
                        var item = data_5[_a];
                        var date_range = new Date(date);
                        date_range.setDate(date.getDate() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_daily += _this.unit_per_user;
                        }
                    }
                    _this.lineChart2Data[0].data.push(number_for_daily);
                    _this.lineChart2Labels.push(date.getDate() + 1);
                }
            }
            if (_this.mode == 'hourly') {
                // lineChart2
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000))) {
                    var number_for_hourly = _this.base_tasks_completed;
                    for (var _b = 0, data_6 = data; _b < data_6.length; _b++) {
                        var item = data_6[_b];
                        var date_range = new Date(date);
                        date_range.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000));
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_hourly += _this.unit_per_user;
                        }
                    }
                    _this.lineChart2Data[0].data.push(number_for_hourly);
                    _this.lineChart2Labels.push(date.getHours() + 1);
                }
            }
        }, function (error) {
        });
    };
    AnalyticsComponent.prototype.change_setting_for_tasks_completed = function (e) {
        console.log(e);
        this.user_id_tasks_completed = e.user_id;
        this.department_id_tasks_completed = e.department_id;
        this.date_from_tasks_completed = e.date_from;
        this.date_end_tasks_completed = e.date_end;
        this.chart_for_tasks_completed();
    };
    AnalyticsComponent.prototype.chart_for_points_awarded = function () {
        var _this = this;
        //Points Awarded
        console.log("points awarded.................", this.company_id, this.department_id_points_awarded);
        this.adminService.getTaskCompleted(this.company_id, this.department_id_points_awarded, this.user_id_points_awarded, this.date_from_points_awarded, this.date_end_points_awarded).subscribe(function (data) {
            _this.lineChart3Data = [
                {
                    data: [],
                    label: 'Series A'
                }
            ];
            _this.lineChart3Labels = [];
            _this.total_points_awarded = 0;
            if (_this.mode == 'monthly') {
                // lineChart3
                console.log("monthly------------------");
                for (var _i = 0, data_7 = data; _i < data_7.length; _i++) {
                    var item = data_7[_i];
                    _this.total_points_awarded += parseInt(item.points_awarded);
                }
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setMonth(date.getMonth() + 1)) {
                    var number_for_monthly = _this.base_points_awarded;
                    for (var _a = 0, data_8 = data; _a < data_8.length; _a++) {
                        var item = data_8[_a];
                        var date_range = new Date(date);
                        date_range.setMonth(date.getMonth() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_monthly += item.points_awarded;
                        }
                    }
                    _this.lineChart3Data[0].data.push(number_for_monthly);
                    _this.lineChart3Labels.push(date.getMonth() + 1);
                }
            }
            if (_this.mode == 'daily') {
                // lineChart3
                console.log("daily------------------");
                console.log("total points awarded start", _this.total_points_awarded);
                _this.total_points_awarded = 0;
                for (var _b = 0, data_9 = data; _b < data_9.length; _b++) {
                    var item = data_9[_b];
                    _this.total_points_awarded += parseInt(item.points_awarded);
                    console.log("points awarded-----------", parseInt(item.points_awarded));
                }
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setDate(date.getDate() + 1)) {
                    var number_for_daily = _this.base_points_awarded;
                    for (var _c = 0, data_10 = data; _c < data_10.length; _c++) {
                        var item = data_10[_c];
                        var date_range = new Date(date);
                        date_range.setDate(date.getDate() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_daily += item.points_awarded;
                        }
                    }
                    _this.lineChart3Data[0].data.push(number_for_daily);
                    _this.lineChart3Labels.push(date.getDate() + 1);
                }
                console.log("total points awarded end", _this.total_points_awarded);
            }
            if (_this.mode == 'hourly') {
                // lineChart3
                console.log("hourly------------------");
                for (var _d = 0, data_11 = data; _d < data_11.length; _d++) {
                    var item = data_11[_d];
                    _this.total_points_awarded += parseInt(item.points_awarded);
                }
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000))) {
                    var number_for_hourly = _this.base_points_awarded;
                    for (var _e = 0, data_12 = data; _e < data_12.length; _e++) {
                        var item = data_12[_e];
                        var date_range = new Date(date);
                        date_range.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000));
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_hourly += item.points_awarded;
                        }
                    }
                    _this.lineChart3Data[0].data.push(number_for_hourly);
                    _this.lineChart3Labels.push(date.getHours() + 1);
                }
            }
        }, function (error) {
        });
    };
    AnalyticsComponent.prototype.change_setting_for_points_awarded = function (e) {
        console.log(e);
        this.user_id_points_awarded = e.user_id;
        this.department_id_points_awarded = e.department_id;
        this.date_from_points_awarded = e.date_from;
        this.date_end_points_awarded = e.date_end;
        this.chart_for_points_awarded();
    };
    AnalyticsComponent.prototype.chart_for_reward_redemptions = function () {
        var _this = this;
        this.adminService.getRewardRedemptions(this.company_id, this.department_id_reward_redemptions, this.user_id_reward_redemptions, this.date_from_reward_redemptions, this.date_end_reward_redemptions).subscribe(function (data) {
            console.log("reward redemptions", data);
            _this.lineChart4Data = [
                {
                    data: [],
                    label: 'Series A'
                }
            ];
            _this.lineChart4Labels = [];
            _this.total_reward_redemptions = 0;
            if (_this.mode == 'monthly') {
                // lineChart4
                for (var _i = 0, data_13 = data; _i < data_13.length; _i++) {
                    var item = data_13[_i];
                    _this.total_reward_redemptions += parseInt(item.number_of_reward);
                }
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setMonth(date.getMonth() + 1)) {
                    var number_for_monthly = _this.base_reward_redemptions;
                    for (var _a = 0, data_14 = data; _a < data_14.length; _a++) {
                        var item = data_14[_a];
                        var date_range = new Date(date);
                        date_range.setMonth(date.getMonth() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_monthly += item.number_of_reward;
                        }
                    }
                    _this.lineChart4Data[0].data.push(number_for_monthly);
                    _this.lineChart4Labels.push(date.getMonth() + 1);
                }
            }
            if (_this.mode == 'daily') {
                // lineChart4
                for (var _b = 0, data_15 = data; _b < data_15.length; _b++) {
                    var item = data_15[_b];
                    _this.total_reward_redemptions += parseInt(item.number_of_reward);
                }
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setDate(date.getDate() + 1)) {
                    var number_for_daily = _this.base_reward_redemptions;
                    for (var _c = 0, data_16 = data; _c < data_16.length; _c++) {
                        var item = data_16[_c];
                        var date_range = new Date(date);
                        date_range.setDate(date.getDate() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_daily += item.number_of_reward;
                        }
                    }
                    _this.lineChart4Data[0].data.push(number_for_daily);
                    _this.lineChart4Labels.push(date.getDate() + 1);
                }
            }
            if (_this.mode == 'hourly') {
                // lineChart4
                for (var _d = 0, data_17 = data; _d < data_17.length; _d++) {
                    var item = data_17[_d];
                    _this.total_reward_redemptions += parseInt(item.number_of_reward);
                }
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000))) {
                    var number_for_hourly = _this.base_reward_redemptions;
                    for (var _e = 0, data_18 = data; _e < data_18.length; _e++) {
                        var item = data_18[_e];
                        var date_range = new Date(date);
                        date_range.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000));
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_hourly += item.number_of_reward;
                        }
                    }
                    _this.lineChart4Data[0].data.push(number_for_hourly);
                    _this.lineChart4Labels.push(date.getHours() + 1);
                }
            }
        }, function (error) {
        });
    };
    AnalyticsComponent.prototype.change_setting_for_reward_redemptions = function (e) {
        console.log(e);
        this.user_id_reward_redemptions = e.user_id;
        this.department_id_reward_redemptions = e.department_id;
        this.date_from_reward_redemptions = e.date_from;
        this.date_end_reward_redemptions = e.date_end;
        this.chart_for_reward_redemptions();
    };
    AnalyticsComponent.prototype.chart_for_top_videos = function () {
        var _this = this;
        this.adminService.getTopVideos(this.company_id, this.department_id_top_videos, this.user_id_top_videos, this.date_from_top_videos, this.date_end_top_videos).subscribe(function (data) {
            console.log("get top videos", data);
            _this.data_set_top_videos = [
                { data: [], label: 'Top Videos' },
            ];
            _this.labels_top_videos = [];
            for (var _i = 0, data_19 = data; _i < data_19.length; _i++) {
                var item = data_19[_i];
                _this.data_set_top_videos[0].data.push(item.total);
                _this.labels_top_videos.push(item._id);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_top_videos = function (e) {
        console.log(e);
        this.user_id_top_videos = e.user_id;
        this.department_id_top_videos = e.department_id;
        this.date_from_top_videos = e.date_from;
        this.date_end_top_videos = e.date_end;
        this.chart_for_top_videos();
    };
    AnalyticsComponent.prototype.chart_for_top_quizzes = function () {
        var _this = this;
        this.adminService.getTopQuizzes(this.company_id, this.department_id_top_quizzes, this.user_id_top_quizzes, this.date_from_top_quizzes, this.date_end_top_quizzes).subscribe(function (data) {
            console.log("get top quizzes", data);
            _this.data_set_top_quizzes = [
                { data: [], label: 'Top Quizzes' },
            ];
            _this.labels_top_quizzes = [];
            for (var _i = 0, data_20 = data; _i < data_20.length; _i++) {
                var item = data_20[_i];
                _this.data_set_top_quizzes[0].data.push(item.total);
                _this.labels_top_quizzes.push(item._id);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_top_quizzes = function (e) {
        console.log(e);
        this.user_id_top_quizzes = e.user_id;
        this.department_id_top_quizzes = e.department_id;
        this.date_from_top_quizzes = e.date_from;
        this.date_end_top_quizzes = e.date_end;
        this.chart_for_top_quizzes();
    };
    AnalyticsComponent.prototype.chart_for_most_point_users = function () {
        var _this = this;
        this.adminService.getMostPointUsers(this.company_id, this.department_id_most_point_users, this.date_from_most_point_users, this.date_end_most_point_users).subscribe(function (data) {
            _this.data_set_most_point_users = [];
            _this.labels_most_point_users = [];
            for (var _i = 0, data_21 = data; _i < data_21.length; _i++) {
                var item = data_21[_i];
                _this.data_set_most_point_users.push(item.available_tokens);
                var full_name = item.first_name + item.last_name;
                _this.labels_most_point_users.push(full_name);
            }
        }, function (error) {
        });
    };
    AnalyticsComponent.prototype.change_setting_most_point_users = function (e) {
        console.log(e);
        this.user_id_most_point_users = e.user_id;
        this.department_id_most_point_users = e.department_id;
        this.date_from_most_point_users = e.date_from;
        this.date_end_most_point_users = e.date_end;
        this.chart_for_most_point_users();
    };
    AnalyticsComponent.prototype.chart_for_most_point_departments = function () {
        var _this = this;
        this.adminService.getMostPointDepartments(this.company_id, this.date_from_most_point_departments, this.date_end_most_point_departments).subscribe(function (data) {
            _this.data_set_most_point_departments = [
                { data: [], label: 'Top Departments' },
            ];
            _this.labels_most_point_departments = [];
            for (var _i = 0, data_22 = data; _i < data_22.length; _i++) {
                var item = data_22[_i];
                _this.data_set_most_point_departments[0].data.push(item.total);
                _this.labels_most_point_departments.push(item._id);
            }
        }, function (error) {
        });
    };
    AnalyticsComponent.prototype.change_setting_most_point_departments = function (e) {
        console.log(e);
        this.user_id_most_point_departments = e.user_id;
        this.department_id_most_point_departments = e.department_id;
        this.date_from_most_point_departments = e.date_from;
        this.date_end_most_point_departments = e.date_end;
        this.chart_for_most_point_departments();
    };
    AnalyticsComponent.prototype.chart_for_number_of_tasks_completed_by_user = function () {
        var _this = this;
        this.adminService.getTotalNumberOfTasksByUser(this.company_id, this.department_id_number_of_tasks_completed_by_user, this.date_from_number_of_tasks_completed_by_user, this.date_end_number_of_tasks_completed_by_user).subscribe(function (data) {
            console.log(data);
            _this.data_set_number_of_tasks_completed_by_user = [
                { data: [], label: 'Number Of Tasks By User' }
            ];
            _this.labels_number_of_tasks_completed_by_user = [];
            for (var _i = 0, data_23 = data; _i < data_23.length; _i++) {
                var item = data_23[_i];
                _this.data_set_number_of_tasks_completed_by_user[0].data.push(item.total);
                _this.labels_number_of_tasks_completed_by_user.push(item._id.first_name + " " + item._id.last_name);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_number_of_tasks_completed_by_user = function (e) {
        console.log(e);
        this.user_id_number_of_tasks_completed_by_user = e.user_id;
        this.department_id_number_of_tasks_completed_by_user = e.department_id;
        this.date_from_number_of_tasks_completed_by_user = e.date_from;
        this.date_end_number_of_tasks_completed_by_user = e.date_end;
        this.chart_for_number_of_tasks_completed_by_user();
    };
    AnalyticsComponent.prototype.chart_for_average_point_of_assignment = function () {
        var _this = this;
        this.adminService.getAveragePointPerAssignment(this.company_id, this.department_id_average_point_of_assignment, this.date_from_average_point_of_assignment, this.date_end_average_point_of_assignment).subscribe(function (data) {
            console.log(data);
            _this.data_set_average_point_of_assignment = [];
            _this.labels_average_point_of_assignment = [];
            for (var _i = 0, data_24 = data; _i < data_24.length; _i++) {
                var item = data_24[_i];
                _this.data_set_average_point_of_assignment.push(item.avg);
                _this.labels_average_point_of_assignment.push(item.user.first_name + " " + item.user.last_name);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_average_point_of_assignment = function (e) {
        console.log(e);
        this.user_id_average_point_of_assignment = e.user_id;
        this.department_id_average_point_of_assignment = e.department_id;
        this.date_from_average_point_of_assignment = e.date_from;
        this.date_end_average_point_of_assignment = e.date_end;
        this.chart_for_average_point_of_assignment();
    };
    AnalyticsComponent.prototype.chart_for_most_reward_redemptions = function () {
        var _this = this;
        this.adminService.getMostRewardRedemptions(this.company_id, this.department_id_most_reward_redemptions, this.user_id_most_reward_redemptions, this.date_from_most_reward_redemptions, this.date_end_most_reward_redemptions).subscribe(function (data) {
            console.log(data);
            _this.data_set_most_reward_redemptions = [
                { data: [], label: 'Most Reward Redemptions' }
            ];
            _this.labels_most_reward_redemptions = [];
            for (var _i = 0, data_25 = data; _i < data_25.length; _i++) {
                var item = data_25[_i];
                _this.data_set_most_reward_redemptions[0].data.push(item.number_of_reward);
                _this.labels_most_reward_redemptions.push(item.reward.name);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_most_reward_redemptions = function (e) {
        console.log(e);
        this.user_id_most_reward_redemptions = e.user_id;
        this.department_id_most_reward_redemptions = e.department_id;
        this.date_from_most_reward_redemptions = e.date_from;
        this.date_end_most_reward_redemptions = e.date_end;
        this.chart_for_most_reward_redemptions();
    };
    AnalyticsComponent.prototype.chart_for_point_value_over_time = function () {
        var _this = this;
        this.adminService.getTaskCompleted(this.company_id, this.department_id_point_value_over_time, this.user_id_point_value_over_time, this.date_from_point_value_over_time, this.date_end_point_value_over_time).subscribe(function (data) {
            _this.data_set_point_value_over_time = [
                {
                    data: [],
                    label: 'Series A'
                }
            ];
            _this.labels_point_value_over_time = [];
            if (_this.mode == 'monthly') {
                // lineChart3
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setMonth(date.getMonth() + 1)) {
                    var number_for_monthly = _this.base_points_awarded;
                    for (var _i = 0, data_26 = data; _i < data_26.length; _i++) {
                        var item = data_26[_i];
                        var date_range = new Date(date);
                        date_range.setMonth(date.getMonth() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_monthly += item.points_awarded;
                        }
                    }
                    _this.data_set_point_value_over_time[0].data.push(number_for_monthly);
                    var num = date.getMonth() + 1;
                    _this.labels_point_value_over_time.push(num.toString());
                }
            }
            if (_this.mode == 'daily') {
                // lineChart3
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setDate(date.getDate() + 1)) {
                    var number_for_daily = _this.base_points_awarded;
                    for (var _a = 0, data_27 = data; _a < data_27.length; _a++) {
                        var item = data_27[_a];
                        var date_range = new Date(date);
                        date_range.setDate(date.getDate() + 1);
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_daily += item.points_awarded;
                        }
                    }
                    _this.data_set_point_value_over_time[0].data.push(number_for_daily);
                    var num = date.getDate() + 1;
                    _this.labels_point_value_over_time.push(num.toString());
                }
            }
            if (_this.mode == 'hourly') {
                // lineChart3
                for (var date = new Date(_this.date_from); date <= _this.date_end; date.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000))) {
                    var number_for_hourly = _this.base_points_awarded;
                    for (var _b = 0, data_28 = data; _b < data_28.length; _b++) {
                        var item = data_28[_b];
                        var date_range = new Date(date);
                        date_range.setTime(date.getTime() + (_this.hourly_unit * 60 * 60 * 1000));
                        var item_time = new Date(item.time);
                        if (item_time >= date && item_time <= date_range) {
                            number_for_hourly += item.points_awarded;
                        }
                    }
                    _this.data_set_point_value_over_time[0].data.push(number_for_hourly);
                    var num = date.getHours() + 1;
                    _this.labels_point_value_over_time.push(num.toString());
                }
            }
        }, function (error) {
        });
    };
    AnalyticsComponent.prototype.change_setting_point_value_over_time = function (e) {
        console.log(e);
        this.user_id_point_value_over_time = e.user_id;
        this.department_id_point_value_over_time = e.department_id;
        this.date_from_point_value_over_time = e.date_from;
        this.date_end_point_value_over_time = e.date_end;
        this.chart_for_point_value_over_time();
    };
    AnalyticsComponent.prototype.chart_for_most_sent_point_user = function () {
        var _this = this;
        this.adminService.getMostSentPointUser(this.company_id, this.department_id_most_sent_point_user, this.date_from_most_sent_point_user, this.date_end_most_sent_point_user).subscribe(function (data) {
            console.log(data);
            _this.data_set_most_sent_point_user = [
                { data: [], label: 'Most Sent Point User' }
            ];
            _this.labels_most_sent_point_user = [];
            for (var _i = 0, data_29 = data; _i < data_29.length; _i++) {
                var item = data_29[_i];
                _this.data_set_most_sent_point_user[0].data.push(item.total);
                _this.labels_most_sent_point_user.push(item._id.first_name + " " + item._id.last_name);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_most_sent_point_user = function (e) {
        console.log(e);
        this.user_id_most_sent_point_user = e.user_id;
        this.department_id_most_sent_point_user = e.department_id;
        this.date_from_most_sent_point_user = e.date_from;
        this.date_end_most_sent_point_user = e.date_end;
        this.chart_for_most_sent_point_user();
    };
    AnalyticsComponent.prototype.chart_for_most_received_point_user = function () {
        var _this = this;
        this.adminService.getMostReceivedPointUser(this.company_id, this.department_id_most_received_point_user, this.date_from_most_received_point_user, this.date_end_most_received_point_user).subscribe(function (data) {
            console.log(data);
            _this.data_set_most_received_point_user = [
                { data: [], label: 'Most Received Point User' }
            ];
            _this.labels_most_received_point_user = [];
            for (var _i = 0, data_30 = data; _i < data_30.length; _i++) {
                var item = data_30[_i];
                _this.data_set_most_received_point_user[0].data.push(item.total);
                _this.labels_most_received_point_user.push(item._id.first_name + " " + item._id.last_name);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.change_setting_most_received_point_user = function (e) {
        console.log(e);
        this.user_id_most_received_point_user = e.user_id;
        this.department_id_most_received_point_user = e.department_id;
        this.date_from_most_received_point_user = e.date_from;
        this.date_end_most_received_point_user = e.date_end;
        this.chart_for_most_received_point_user();
    };
    AnalyticsComponent.prototype.employee_part = function () {
        var _this = this;
        this.adminService.getUsers().subscribe(function (data) {
            _this.users = data;
        }, function (error) {
            console.log(error);
        });
        this.adminService.getDepartments().subscribe(function (data) {
            _this.departments = data;
            _this.departments.push({ _id: "undefined", "department": "all" });
        }, function (error) {
            console.log(error);
        });
    };
    AnalyticsComponent.prototype.ngOnInit = function () {
        this.init_date_picker();
        this.update_all_chart();
    };
    AnalyticsComponent.prototype.init_date_picker = function () {
        var _this = this;
        jQuery(this.date_from_el.nativeElement).datepicker({
            onSelect: function (value) {
                _this.date_from = new Date(value);
                _this.update_all_chart();
            }
        })
            .datepicker('setDate', this.date_from);
        jQuery(this.date_end_el.nativeElement).datepicker({
            onSelect: function (value) {
                _this.date_end = new Date(value);
                _this.update_all_chart();
            }
        })
            .datepicker('setDate', this.date_end);
    };
    AnalyticsComponent.prototype.update_all_chart = function () {
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
    };
    AnalyticsComponent.prototype.setUser = function (e) {
        this.user_id = e;
        this.update_all_chart();
    };
    AnalyticsComponent.prototype.select_department = function () {
        this.update_all_chart();
    };
    AnalyticsComponent.prototype.onMultipleSelected = function (item) {
        console.log(item.value);
    };
    AnalyticsComponent.prototype.onMultipleDeselected = function (item) {
        console.log(item.value);
    };
    AnalyticsComponent.prototype.dropdownItemClickEvent = function (event) {
        var element = event.target;
        if (element.classList.contains('fa-check')) {
            element.classList.remove('fa-check');
            this.final_export_list.splice(this.final_export_list.indexOf(element.attributes.value.value), 1);
        }
        else {
            element.classList.add('fa-check');
            this.final_export_list.push(element.attributes.value.value);
        }
        console.log(this.final_export_list);
    };
    __decorate([
        core_1.ViewChild('date_from_el')
    ], AnalyticsComponent.prototype, "date_from_el");
    __decorate([
        core_1.ViewChild('date_end_el')
    ], AnalyticsComponent.prototype, "date_end_el");
    __decorate([
        core_1.ViewChild('content')
    ], AnalyticsComponent.prototype, "content");
    __decorate([
        core_1.ViewChild('exportthis')
    ], AnalyticsComponent.prototype, "exportthis");
    AnalyticsComponent = __decorate([
        core_1.Component({
            templateUrl: 'analytics.component.html',
            styleUrls: ['./analytics.component.scss']
        })
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());
exports.AnalyticsComponent = AnalyticsComponent;
