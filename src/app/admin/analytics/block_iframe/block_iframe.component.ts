import { Component, OnInit, Input }        from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

@Component({
    selector: 'block_iframe',
    templateUrl: 'block_iframe.component.html',
    styleUrls: [ './block_iframe.component.scss' ]
})
export class BlockIframeComponent implements OnInit {
  
    @Input() public iframe_class: string = "card-primary";
    @Input() public iframe_options: any;
    @Input() public iframe_color: any;
    @Input() public iframe_data_sets: any;
    @Input() public iframe_type: any;
    @Input() public iframe_labels: any;
    @Input() public iframe_legent: any;
    @Input() public iframe_number: any;
    @Input() public iframe_title: any;
    
    ngOnInit(){
            
    }

    constructor() { 
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}
