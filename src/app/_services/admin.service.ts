import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User } from '../_models/index';
import { Content } from '../_models/index';
import { Reward } from '../_models/index';
import { Department } from '../_models/index';
import { Company } from '../_models/index';

import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  sendInvitationToUser(user) {
    return this.http.post('/send_invitation_to_user', JSON.stringify(user), this.options);
  }

  sendInvitationToCompany(company) {
    return this.http.post('/send_invitation_to_company', JSON.stringify(company), this.options);
  }

  sendEmailRegardingReward(user, reward, number) {
    let post_params = {user:user, reward: reward, number: number};
    console.log(post_params);
    return this.http.post('/send_email_regarding_reward', JSON.stringify(post_params), this.options);
  }

  //User Service
  getUsers() {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/users/${current_user._id}`).map(res => res.json());
  }
  getUser(user_id) {
    return this.http.get(`/specific_user/${user_id}`).map(res => res.json());
  }
  addUser(user: User) {
    user.date_joined =  Date.now();
    return this.http.post("/user", JSON.stringify(user), this.options);
  }
  send_password_reset_email(user: User) {
    return this.http.post('/send_password_reset_email', JSON.stringify(user), this.options);
  }
  editUser(user: User) {
    return this.http.put(`/user/${user._id}`, JSON.stringify(user), this.options);
  }
  deleteUser(user: User) {
    return this.http.delete(`/user/${user._id}`, this.options);
  }

  //Company Service
  getCompanies() {
    return this.http.get('/companies').map(res => res.json());
  }
  getCompany(company_id) {
    return this.http.get(`/specific_company/${company_id}`).map(res => res.json());
  }
  addCompany(company: Company) {
    company.date_joined =  Date.now();
    return this.http.post("/company", JSON.stringify(company), this.options);
  }
  editCompany(company: Company) {
    return this.http.put(`/company/${company._id}`, JSON.stringify(company), this.options);
  }
  deleteCompany(company: Company) {
    return this.http.delete(`/company/${company._id}`, this.options);
  }

  //Content Service
  getContents() {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/contents/${current_user._id}`).map(res => res.json());
  }
  getContent(content_id) {
    return this.http.get(`/content/${content_id}`).map(res => res.json());
  }
  addContent(content: Content) {
    return this.http.post("/content", JSON.stringify(content), this.options);
  }
  editContent(content: Content) {
    return this.http.put(`/content/${content._id}`, JSON.stringify(content), this.options);
  }
  deleteContent(content: Content) {
    return this.http.delete(`/content/${content._id}`, this.options);
  }

  //Quiz
  getQuizzes() {
    return this.http.get('/quizzes').map(res => res.json());
  }
  addQuiz(quiz) {
    return this.http.post("/quiz", JSON.stringify(quiz), this.options);
  }
  getQuiz(id) {
    return this.http.get("/quiz/${id}", this.options).map(res => res.json());
  }

  //Reward Service
  getRewards() {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/rewards/${current_user._id}`).map(res => res.json());
  }
  getAvailableRewards(department_v,department_id, department_name) {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/get_available_rewards/${current_user.company._id}/${department_v}/${department_id}/${department_name}`).map(res => res.json());
  }
  getReward(reward_id) {
    return this.http.get(`/reward/${reward_id}`).map(res => res.json());
  }
  addReward(reward) {
    return this.http.post("/reward", JSON.stringify(reward), this.options);
  }
  editReward(reward) {
    return this.http.put(`/reward/${reward._id}`, JSON.stringify(reward), this.options);
  }
  deleteReward(reward) {
    return this.http.delete(`/reward/${reward._id}`, this.options);
  }

  //Department
  getDepartments() {
    return this.http.get('/departments').map(res => res.json());
  }

}
