import { Component } from '@angular/core'

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.scss' ]
})

export class DashboardComponent {
  private account_type = 0;
  constructor() {
    if (JSON.parse(localStorage.getItem('currentUser')).company_name != null) {
      this.account_type = 1;
    }
  }
}