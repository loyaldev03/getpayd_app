import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit }        from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';
import { AdminService } from '../../../_services/admin.service';            
declare var jQuery: any;

@Component({
    selector: 'users_for_analytics',
    templateUrl: 'users_for_analytics.component.html',
    styleUrls: [ './users_for_analytics.component.scss' ]
})
export class UsersForAnalyticsComponent implements OnInit {
      
    @ViewChild('date_from_el') date_from_el: ElementRef;
    @ViewChild('date_end_el') date_end_el: ElementRef;

    @Input() public company_id: string;
    @Input() public department_id: string;

    public date_from: Date;
    public date_end: Date;

    public all_users: any = [];
    public all_users_last_login: any = {};
    public users_for_analytics: any = [];

    ngOnInit(){
        this.init_date_picker()
        this.preload_users();
    }

    init_date_picker() {
        this.date_from = new Date();
        this.date_from.setMonth(this.date_from.getMonth() - 1);
        this.date_end = new Date();
        jQuery(this.date_from_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_from = new Date(value);
                this.set_users_for_analytics();
              }
            })
            .datepicker('setDate', this.date_from);
        jQuery(this.date_end_el.nativeElement).datepicker({
              onSelect: (value) => {
                this.date_end = new Date(value);
                this.set_users_for_analytics();
              }
            })
            .datepicker('setDate', this.date_end);
    }
    constructor(
        private adminService: AdminService) 
    { 

    }

    preload_users() {
        this.adminService.getUsersForAnalytic(this.company_id, this.department_id, this.date_from, this.date_end).subscribe(
            data => {
                console.log("analytics users", data);
                this.all_users = data.users;
                let user_log_ons = data.user_log_ons;
                for (let user of this.all_users) {
                    for (let user_log_on of user_log_ons) {
                        if (user_log_on.user_id === user._id) {
                            if ((this.all_users_last_login[user._id] == null) || (this.all_users_last_login[user._id] && this.all_users_last_login[user._id] < user_log_on.time)) {
                                console.log("push last login");
                                this.all_users_last_login[user._id] = user_log_on.time;
                            } 
                        }
                    }
                }
                this.set_users_for_analytics();
            },
            error => {
                console.log(error);
            });        
    }
    set_users_for_analytics() {
        if (this.date_from != null && this.date_end != null){
            this.users_for_analytics = [];
            for (let user of this.all_users) {
                let activities = user.activities;
                let points_earned = 0;
                for (let activity of activities) {
                    let activity_date = new Date(activity.date);
                    if (activity_date > this.date_from && activity_date < this.date_end)
                    {    
                        points_earned += activity.points_awarded;
                    } 
                }
                let rewards = user.rewards;
                let points_redeemed = 0;
                for (let reward of rewards) {
                    let reward_date = new Date(reward.date);
                    if (reward_date > this.date_from && reward_date < this.date_end)
                    {
                        points_redeemed += reward.number * reward.reward.cost;
                    }
                }
                this.users_for_analytics.push({
                    user_id: user._id,
                    user_name: user.first_name+" " + user.last_name,
                    points_earned: points_earned,
                    points_redeemed: points_redeemed,
                    last_login: this.all_users_last_login[user._id]
                });
            }            
        }
    }
    sort_by_user_name() {
        for (let i=0; i<this.users_for_analytics.length;i++) {
            for (let j=i+1; j<this.users_for_analytics.length;j++) {
                if (this.users_for_analytics[i].user_name > this.users_for_analytics[j].user_name) {
                    let temp = this.users_for_analytics[i];
                    this.users_for_analytics[i] = this.users_for_analytics[j];
                    this.users_for_analytics[j] = temp;
                }
            }
        }
    }
    sort_by_points_earned() {
        for (let i=0; i<this.users_for_analytics.length;i++) {
            for (let j=i+1; j<this.users_for_analytics.length;j++) {
                if (this.users_for_analytics[i].points_earned > this.users_for_analytics[j].points_earned) {
                    let temp = this.users_for_analytics[i];
                    this.users_for_analytics[i] = this.users_for_analytics[j];
                    this.users_for_analytics[j] = temp;
                }
            }
        }
    }
    sort_by_points_redeemed() {
        for (let i=0; i<this.users_for_analytics.length;i++) {
            for (let j=i+1; j<this.users_for_analytics.length;j++) {
                if (this.users_for_analytics[i].points_redeemed > this.users_for_analytics[j].points_redeemed) {
                    let temp = this.users_for_analytics[i];
                    this.users_for_analytics[i] = this.users_for_analytics[j];
                    this.users_for_analytics[j] = temp;
                }
            }
        }

    }
    sort_by_last_login() {
        for (let i=0; i<this.users_for_analytics.length;i++) {
            for (let j=i+1; j<this.users_for_analytics.length;j++) {
                if (this.users_for_analytics[i].last_login > this.users_for_analytics[j].last_login) {
                    let temp = this.users_for_analytics[i];
                    this.users_for_analytics[i] = this.users_for_analytics[j];
                    this.users_for_analytics[j] = temp;
                }
            }
        }
    }
}
