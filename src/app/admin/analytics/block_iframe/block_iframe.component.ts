import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef }        from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';
import { AdminService }             from '../../../_services/admin.service.ts';

declare var jQuery: any;

@Component({
    selector: 'block_iframe',
    templateUrl: 'block_iframe.component.html',
    styleUrls: [ './block_iframe.component.scss' ]
})
export class BlockIframeComponent implements OnInit {
  
    @ViewChild('date_from_el') date_from_el: ElementRef;
    @ViewChild('date_end_el') date_end_el: ElementRef;

    @Input() public iframe_class: string = "card-primary";
    @Input() public iframe_options: any;
    @Input() public iframe_color: any;
    @Input() public iframe_data_sets: any;
    @Input() public iframe_type: any;
    @Input() public iframe_labels: any;
    @Input() public iframe_legent: any;
    @Input() public iframe_number: any;
    @Input() public iframe_title: any;

    @Input() public users:any;
    @Input() public departments:any;
    @Input() public user_id: string;
    @Input() public department_id: string;
    @Input() public date_from: Date;
    @Input() public date_end: Date;

    @Output() public changeSettingEvent:EventEmitter<any> = new EventEmitter<any>();
    
    public user_name: string;
    
    ngOnInit(){
        if (this.user_id != null) {
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

    constructor(public adminService: AdminService) { 
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
}
