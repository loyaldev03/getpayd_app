import { Component, ElementRef,OnInit, Input, Output, EventEmitter} from '@angular/core';


const KEY_DW = 40;
const KEY_RT = 39;
const KEY_UP = 38;
const KEY_LF = 37;
const KEY_ES = 27;
const KEY_EN = 13;
const KEY_TAB = 9;

@Component({
    selector: 'autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    template: `
        <div class=" autocomplete" >
            <div class="">
              <input type="text" class="validate filter-input"
               [(ngModel)]='query' 
               (keyup)=filter($event)
               (focus)=focus()
               (blur)=blur() 
               placeholder = "Name"
               class="form-control">

            </div>
            <div class="suggestions" *ngIf="(filteredList.length > 0  && focused) ">
                <ul class="">
                    <li *ngFor="let item of filteredList;let i = index" class="{{selectId==i?'active':''}}">
                        <a (click)="select(item)" 
                        [innerHTML]=listFormatter(item.first_name+item.last_name)></a>
                    </li>
                    <li *ngIf="searching">
                      Searching...
                    </li>
                </ul>
            </div>

            <div class="suggestions" *ngIf="(filteredList.length == 0  && !searching) && !preloaded && selected">
                <ul>
                    <li>
                      No Result..
                    </li>
                </ul>
            </div>
        </div>  
        `,
  	styleUrls: [ 'auto_complete.component.css' ],

})
export class AutoCompleteComponent implements OnInit {
    public query = '';
    public list:any = [];
    public filteredList:any = [];
    public elementRef:any;
    public preload :any = [];
    public focused: boolean = false;
    public searching:boolean = false;
    public selectId: number = -1;
    public preloaded:boolean = false;
    public selected:boolean = false;


    @Input()
    public data:any;
    @Output()
    setUser:EventEmitter<any> = new EventEmitter<any>();
    /**
   * Handle the nameListService observable
   */
    
    constructor( public myElement: ElementRef) {
        this.elementRef = myElement;
    }
    ngOnInit() {
    }
    focus(){
        this.focused = true;
    }
    blur(){
    }
    handleSpecialKey(event: any){
      if (event.keyCode === KEY_EN) {
          event.preventDefault();
          if(this.selectId != -1)
            this.select(this.filteredList[this.selectId]);
          else if(this.filteredList != 0)
            this.select(this.filteredList[0]);
          return true;
      } else if (event.keyCode === KEY_DW) {
          event.preventDefault();
          if(this.selectId<this.filteredList.length-1)
            this.selectId ++;
          return true;
      } else if (event.keyCode === KEY_UP) {
          event.preventDefault();
          if(this.selectId>0)
            this.selectId --;
          return true;
      } else if (event.keyCode === KEY_TAB) {
          event.preventDefault();
          if(this.selectId != -1)
            this.select(this.filteredList[this.selectId]);
          return true;
      } else if (event.keyCode === KEY_ES) {
          // This is very specific to IE10/11 #272
          // without this, IE clears the input text
          event.preventDefault();
          return true;
      }
      return false;
    }
    filter(event:any) {
        this.selected = false;
        if(this.handleSpecialKey(event))
          return;
        this.selectId = -1;
        if(this.query.includes(','))
          return;
        if(this.query == ""){
            this.filteredList = [];
            return;
        }

        this.filteredList = this.data.filter((item:any) => {
            return (item["first_name"] + " " + item["last_name"]).toString().toLowerCase().includes(this.query);
        });
        
  }
	 
	select(item:any){
      this.setUser.emit(item._id);

	    this.query = item.first_name+item.last_name;
      this.selected == true;
	    this.filteredList = [];
      this.filteredList<<item;
      this.selected == true;
	}

  listFormatter(data:string):string{
      let html: string = ""; 
      let str:string  = data;
      if(!this.query)
        return `<span style="font-weight:400"> ${str}</span>`;
      let fir : number = str.toLowerCase().indexOf(this.query.toLowerCase());
      if(fir==-1)
        return `<span style="font-weight:400">${str}</span>`;
      let last : number = fir;
      while((last-fir)<this.query.length){
        if(str[last].toLowerCase() == this.query[last-fir].toLowerCase()){
          last ++;
        }
        else
          break;
      };
      html = `<span style="font-weight:400">${str.slice(0, fir)}<strong class="stressWord">${str.slice(fir, last)}</strong>${str.slice(last)}</span>`;
      return html;
  }
	handleClick(event:any){
	    var clickedComponent = event.target;
	    var inside = false;
	    do {
	        if (clickedComponent === this.elementRef.nativeElement) {
	            inside = true;
	        }
	       clickedComponent = clickedComponent.parentNode;
	    } while (clickedComponent);
	    if(!inside){
	        this.filteredList = [];
	    }
	}
}
