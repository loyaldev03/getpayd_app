import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../_models/index'
import { UserService, AdminService }             from '../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
    templateUrl: 'quiz_activity.component.html',
    styleUrls: [ './quiz_activity.component.scss' ]
})
export class QuizActivityComponent implements OnInit{
  private content;
  private quizzes = [];
  private quiz_index: number = 0;
  private isLoading: boolean = true;
  private result: number[] = [];
  private correct_answers_number: number = 0;
  private tokens_awarded: number = 0;
  private user;
  private points_awarded:number = 0;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getContent(params['id']);
      this.quiz_index = 0;
      this.correct_answers_number = 0;
      this.tokens_awarded = 0;
      this.getUserInfo(JSON.parse(localStorage.getItem('currentUser'))._id);
      this.points_awarded = 100;
    });
  }

  getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => {
        this.content = data;
        this.quizzes = data.quizzes;
        console.log(this.quizzes[0]);
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  clickNext(){
    if (this.result[this.quiz_index] === this.quizzes[this.quiz_index].correct_answer){
      this.correct_answers_number += 1;
      this.tokens_awarded = this.user.available_tokens + this.correct_answers_number * this.content.reward;
    }
    this.quiz_index += 1;
  }

  clickBack(){
    this.quiz_index -= 1;
  }

  finalizeTest(){
    this.onFinish();
  }

  getUserInfo(id){
    this.adminService.getUser(id).subscribe(
      data => {
        this.user = data;
        this.tokens_awarded = this.user.available_tokens
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  onFinish() {
    if (this.result[this.quiz_index] === this.quizzes[this.quiz_index].correct_answer){
      this.correct_answers_number += 1;
      this.tokens_awarded = this.user.available_tokens + this.correct_answers_number * this.content.reward;
    }
    if (!this.user.activities){
      this.user.activities = [];
    }
    let current_date = new Date();
    this.user.activities.push({
      user: this.user.first_name+" "+this.user.last_name,
      content: this.content,
      points_awarded: this.correct_answers_number * this.content.reward,
      date: current_date
    });  
    
    let task_completed = {
      task: this.content,
      user: this.user,
      points_awarded: this.correct_answers_number * this.content.reward,
      time: new Date(),
    }
    this.adminService.addTaskCompleted(task_completed).subscribe(
      data => {
        console.log("success", data);
      },
      error => {
        console.log("error", error);
      });

    this.user.available_tokens += this.correct_answers_number * this.content.reward;
    this.adminService.editUser(this.user)
      .subscribe(
          data => {
                this.router.navigate(['/user/user']);                    
              },
          error => {
            console.log(error);
          },
          () => { }
      );  
  }
}
