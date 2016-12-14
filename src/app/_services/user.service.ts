import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User } from '../_models/index';
import { Content } from '../_models/index';
import { Reward } from '../_models/index';
import { Department } from '../_models/index';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  //Get available contents
  getAvailableContents(department_v,department_id, department_name) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get(`/get_available_contents/${currentUser.company._id}/${department_v}/${department_id}/${department_name}`).map(res => res.json());
  }
}
