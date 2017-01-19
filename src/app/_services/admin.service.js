"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var AdminService = (function () {
    function AdminService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    AdminService.prototype.sendInvitationToUser = function (user) {
        return this.http.post('/send_invitation_to_user', JSON.stringify(user), this.options);
    };
    AdminService.prototype.sendInvitationToCompany = function (company) {
        return this.http.post('/send_invitation_to_company', JSON.stringify(company), this.options);
    };
    AdminService.prototype.sendEmailRegardingReward = function (user, reward, number) {
        var post_params = { user: user, reward: reward, number: number };
        console.log(post_params);
        return this.http.post('/send_email_regarding_reward', JSON.stringify(post_params), this.options);
    };
    //User Service
    AdminService.prototype.getUsers = function () {
        var current_user = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get("/users/" + current_user._id).map(function (res) { return res.json(); });
    };
    AdminService.prototype.getUser = function (user_id) {
        return this.http.get("/specific_user/" + user_id).map(function (res) { return res.json(); });
    };
    AdminService.prototype.addUser = function (user) {
        user.date_joined = Date.now();
        return this.http.post("/user", JSON.stringify(user), this.options);
    };
    AdminService.prototype.send_password_reset_email = function (user) {
        return this.http.post('/send_password_reset_email', JSON.stringify(user), this.options);
    };
    AdminService.prototype.editUser = function (user) {
        return this.http.put("/user/" + user._id, JSON.stringify(user), this.options);
    };
    AdminService.prototype.deleteUser = function (user) {
        return this.http.delete("/user/" + user._id, this.options);
    };
    //Company Service
    AdminService.prototype.getCompanies = function () {
        return this.http.get('/companies').map(function (res) { return res.json(); });
    };
    AdminService.prototype.getCompany = function (company_id) {
        return this.http.get("/specific_company/" + company_id).map(function (res) { return res.json(); });
    };
    AdminService.prototype.addCompany = function (company) {
        company.date_joined = Date.now();
        return this.http.post("/company", JSON.stringify(company), this.options);
    };
    AdminService.prototype.editCompany = function (company) {
        return this.http.put("/company/" + company._id, JSON.stringify(company), this.options);
    };
    AdminService.prototype.deleteCompany = function (company) {
        return this.http.delete("/company/" + company._id, this.options);
    };
    //Content Service
    AdminService.prototype.getContents = function () {
        var current_user = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get("/contents/" + current_user._id).map(function (res) { return res.json(); });
    };
    AdminService.prototype.getContent = function (content_id) {
        return this.http.get("/content/" + content_id).map(function (res) { return res.json(); });
    };
    AdminService.prototype.addContent = function (content) {
        return this.http.post("/content", JSON.stringify(content), this.options);
    };
    AdminService.prototype.editContent = function (content) {
        return this.http.put("/content/" + content._id, JSON.stringify(content), this.options);
    };
    AdminService.prototype.deleteContent = function (content) {
        return this.http.delete("/content/" + content._id, this.options);
    };
    //Quiz
    AdminService.prototype.getQuizzes = function () {
        return this.http.get('/quizzes').map(function (res) { return res.json(); });
    };
    AdminService.prototype.addQuiz = function (quiz) {
        return this.http.post("/quiz", JSON.stringify(quiz), this.options);
    };
    AdminService.prototype.getQuiz = function (id) {
        return this.http.get("/quiz/${id}", this.options).map(function (res) { return res.json(); });
    };
    //Reward Service
    AdminService.prototype.getRewards = function () {
        var current_user = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get("/rewards/" + current_user._id).map(function (res) { return res.json(); });
    };
    AdminService.prototype.getAvailableRewards = function (department_v, department_id, department_name) {
        var current_user = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get("/get_available_rewards/" + current_user.company._id + "/" + department_v + "/" + department_id + "/" + department_name).map(function (res) { return res.json(); });
    };
    AdminService.prototype.getReward = function (reward_id) {
        return this.http.get("/reward/" + reward_id).map(function (res) { return res.json(); });
    };
    AdminService.prototype.addReward = function (reward) {
        return this.http.post("/reward", JSON.stringify(reward), this.options);
    };
    AdminService.prototype.editReward = function (reward) {
        return this.http.put("/reward/" + reward._id, JSON.stringify(reward), this.options);
    };
    AdminService.prototype.deleteReward = function (reward) {
        return this.http.delete("/reward/" + reward._id, this.options);
    };
    //Department
    AdminService.prototype.getDepartments = function () {
        return this.http.get('/departments').map(function (res) { return res.json(); });
    };
    //get Log Ons
    AdminService.prototype.getLogOns = function (company_id, department_id, user_id, date_from, date_end) {
        return this.http.get("/get_log_ons/" + company_id + "/" + department_id + "/" + user_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //add task completed
    AdminService.prototype.addTaskCompleted = function (task_completed) {
        return this.http.post("/new_task_completed", JSON.stringify(task_completed), this.options);
    };
    //Get Task Completd
    AdminService.prototype.getTaskCompleted = function (company_id, department_id, user_id, date_from, date_end) {
        return this.http.get("/get_task_completed/" + company_id + "/" + department_id + "/" + user_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //add Points Awarded
    AdminService.prototype.addPointsAwarded = function (points_awarded) {
        return this.http.post("/new_points_awarded", JSON.stringify(points_awarded), this.options);
    };
    //Get Task Completd
    AdminService.prototype.getPointsAwarded = function (company_id, department_id, user_id, date_from, date_end) {
        return this.http.get("/get_points_awarded/" + company_id + "/" + department_id + "/" + user_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //add Reward Redemptions
    AdminService.prototype.addRewardRedemptions = function (reward_redemptions) {
        return this.http.post("/new_reward_redemptions", JSON.stringify(reward_redemptions), this.options);
    };
    //update Reward Redemptions
    AdminService.prototype.updateRewardRedemptions = function (reward_redemptions) {
        return this.http.put("/update_reward_redemptions", JSON.stringify(reward_redemptions), this.options);
    };
    //Get Reward Redemptions
    AdminService.prototype.getRewardRedemptions = function (company_id, department_id, user_id, date_from, date_end) {
        return this.http.get("/get_reward_redemptions/" + company_id + "/" + department_id + "/" + user_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get Top Videos
    AdminService.prototype.getTopVideos = function (company_id, department_id, user_id, date_from, date_end) {
        return this.http.get("/get_top_videos/" + company_id + "/" + department_id + "/" + user_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get Top Quizzes
    AdminService.prototype.getTopQuizzes = function (company_id, department_id, user_id, date_from, date_end) {
        return this.http.get("/get_top_quizzes/" + company_id + "/" + department_id + "/" + user_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get Most Point Users
    AdminService.prototype.getMostPointUsers = function (company_id, department_id, date_from, date_end) {
        return this.http.get("/get_most_point_users/" + company_id + "/" + department_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get Most Point Departments
    AdminService.prototype.getMostPointDepartments = function (company_id, date_from, date_end) {
        return this.http.get("/get_most_point_departments/" + company_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get total tasks by users
    AdminService.prototype.getTotalNumberOfTasksByUser = function (company_id, department_id, date_from, date_end) {
        return this.http.get("/get_total_tasks_completed_by_users/" + company_id + "/" + department_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get Average Point per assignment
    AdminService.prototype.getAveragePointPerAssignment = function (company_id, department_id, date_from, date_end) {
        return this.http.get("/get_average_points_per_assignment/" + company_id + "/" + department_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get Most Reward Redemptions
    AdminService.prototype.getMostRewardRedemptions = function (company_id, department_id, user_id, date_from, date_end) {
        return this.http.get("/get_most_reward_redemptions/" + company_id + "/" + department_id + "/" + user_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    //Get Most Sent Point User
    AdminService.prototype.getMostSentPointUser = function (company_id, department_id, date_from, date_end) {
        return this.http.get("/get_most_sent_point_user/" + company_id + "/" + department_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    AdminService.prototype.getMostReceivedPointUser = function (company_id, department_id, date_from, date_end) {
        return this.http.get("/get_most_received_point_user/" + company_id + "/" + department_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    AdminService.prototype.getUsersForAnalytic = function (company_id, department_id, date_from, date_end) {
        return this.http.get("/get_user_for_analytic/" + company_id + "/" + department_id + "/" + date_from + "/" + date_end).map(function (res) { return res.json(); });
    };
    AdminService = __decorate([
        core_1.Injectable()
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
