import { Component, OnInit} from '@angular/core'

@Component({
  selector: 'user-layout',
  templateUrl: './user_layout.component.html',
  styleUrls: ['./user_layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
  private user_name;

  ngOnInit() {
    this.user_name = JSON.parse(localStorage.getItem('currentUser')).first_name;
  }
}
