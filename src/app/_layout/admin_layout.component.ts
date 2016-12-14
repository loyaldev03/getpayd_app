import { Component } from '@angular/core'

@Component({
  selector: 'admin-layout',
  templateUrl: './admin_layout.component.html',
  styleUrls: ['./admin_layout.component.scss']
})
export class AdminLayoutComponent {
  private user_name;
  private account_type;

  ngOnInit() {
    this.user_name = JSON.parse(localStorage.getItem('currentUser')).first_name;
    this.account_type = 0;
    if (JSON.parse(localStorage.getItem('currentUser')).company_name != null) {
      this.user_name = JSON.parse(localStorage.getItem('currentUser')).company_name
      this.account_type = 1;
    }
  }
}
