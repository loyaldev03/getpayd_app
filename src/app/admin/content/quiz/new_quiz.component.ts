import { Component, OnInit }        from '@angular/core';
import { Router } from '@angular/router';
import { Department }           from '../../../_models/index';
import { AdminService }     from '../../../_services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
    templateUrl: 'new_quiz.component.html',
    styleUrls: [ './new_quiz.component.scss' ]
})
export class NewQuizComponent implements OnInit{

  private quizzes = [{question:"", answers:[{value:""}], correct_answer:"" }]
  private isLoading: boolean = true;
  private available_tos: Department[] = [];
  private addQuizForm: FormGroup;
  private type = "quiz"
  private content = new FormControl("", Validators.required);
  private answers = new FormControl();
  private correct_answer = new FormControl();
  private available_to = new FormControl();
  private reward = new FormControl(0, Validators.required);
  private date_end = new FormControl("", Validators.required);

  constructor( 
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ){ }

  ngOnInit() {
    this.addQuizForm = this.formBuilder.group({
      available_to: this.available_to,
      reward: this.reward,
      date_end: this.date_end,
    });
    this.getAvailableTo();
  }

  getAvailableTo() {
    this.adminService.getDepartments().subscribe(
      data => this.available_tos = data,
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  createQuizzes() {
    let content;
    content = this.addQuizForm.value;
    content.type = "quiz";
    content.content = this.quizzes[0].question;
    content.company = JSON.parse(localStorage.getItem('currentUser'));
    content.quizzes = this.quizzes.map(function(quiz){
      let result = {question:"", answers:[], correct_answer:1};
      result.question = quiz.question;
      result.answers = quiz.answers.map(function(answer){return answer.value;});
      result.correct_answer = Number(quiz.correct_answer);
      return result;
    });
    console.log(content);
    this.adminService.addContent(content)
    .subscribe(
        data => {
            this.router.navigate(['/admin/manage_content']);
        },
        error => {
            console.log("service error");
        });
  }

  addQuiz() {
    this.quizzes.push({question:"", answers: [{value:""}], correct_answer:""});
  }

  removeQuiz(quiz_index) {
    this.quizzes.splice(quiz_index, 1);
  }

  addAnswer(quiz_index) {
    this.quizzes[quiz_index].answers.push({value:""});
  }

  removeAnswer(quiz_index, answer_index) {
    this.quizzes[quiz_index].answers.splice(answer_index, 1);
  }
}
