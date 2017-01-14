import { Component, OnInit, ViewChild }        from '@angular/core';
import { Content }                  from '../../_models/index'
import { UserService, AdminService }  from '../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
// import { AutoCompleteComponent } from './auto_complete/auto_complete'
// import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
    templateUrl: 'transfer_tokens.component.html',
    styleUrls: [ './transfer_tokens.component.scss' ]
})
export class TransferTokensComponent implements OnInit{

  private name = new FormControl("", Validators.required);
  private value = new FormControl("", Validators.required);
  private message = new FormControl("");
  private transfer_form: FormGroup;
  private users: any = [];
  private searchStr: string;
  private user_id:any = 0;
  private user: any;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    // private completerService: CompleterService,
  )
  { 
    // this.dataService = completerService.local(this.searchData, 'color', 'color');
  }
  public setUser(e){
    this.user_id = e;
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.transfer_form = this.formBuilder.group({
      value: this.value,
      message: this.message
    });  
    this.adminService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
     );
  }
  transferTokens() {
    let sender_id = JSON.parse(localStorage.getItem('currentUser'))._id;
    let transfer_form = this.transfer_form["_value"];
    this.userService.transferTokens(sender_id, this.user_id, transfer_form.value, transfer_form.message).subscribe(
      (data) => {
        console.log("success", data);
        this.router.navigate(['/user/user']);  
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
