import { Component, OnInit }        from '@angular/core';
import { Router } from '@angular/router';
import { Department }           from '../../../_models/index';
import { AdminService }     from '../../../_services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
require ('aws-sdk/dist/aws-sdk');
declare var AWS: any;

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
  private title = new FormControl("", Validators.required);
  private content = new FormControl("", Validators.required);
  private answers = new FormControl();
  private correct_answer = new FormControl();
  private available_to = new FormControl();
  private reward = new FormControl(0, Validators.required);
  private date_end = new FormControl("", Validators.required);
  private message_subject = new FormControl("");
  private message_content = new FormControl("");
  private reference_link = new FormControl("");
  private isSendMessage = 1;
  private attachment_data: any="";
  private isUploading = false;

  constructor( 
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ){ }

  ngOnInit() {
    this.addQuizForm = this.formBuilder.group({
      title: this.title,
      available_to: this.available_to,
      reward: this.reward,
      date_end: this.date_end,
      message_subject: this.message_subject,
      message_content: this.message_content,
      reference_link: this.reference_link      
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
    content.isSendMessage = this.isSendMessage;
    content.quizzes = this.quizzes.map(function(quiz){
      let result = {question:"", answers:[], correct_answer:1};
      result.question = quiz.question;
      result.answers = quiz.answers.map(function(answer){return answer.value;});
      result.correct_answer = Number(quiz.correct_answer);
      return result;
    });
    //attachment data upload

    if (this.attachment_data != "") {
      this.isUploading = true;
      console.log("attachment data", this.attachment_data);
      let file = this.attachment_data;
      AWS.config.region = "us-east-1";
      AWS.config.accessKeyId = "AKIAIMSEK6YLJZGNTIJQ";
      AWS.config.secretAccessKey = "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";
      let bucket = new AWS.S3({params: {Bucket:"ledgerofthings"}});
      let params = {Key: file.name, Body: file, ACL: 'public-read'};
      bucket.upload(params, (error, res) => {
        if (error) return console.log(error);
        content.attachment_data = res.Location;
        this.adminService.addContent(content)
        .subscribe(
            data => {
                this.isUploading = false;
                this.router.navigate(['/admin/manage_content']);
            },
            error => {
                console.log("service error");
            });      
      });
    }
    else {
      content.attachment_data = "";
      this.adminService.addContent(content)
      .subscribe(
          data => {
              this.router.navigate(['/admin/manage_content']);
          },
          error => {
              console.log("service error");
          });      
    }
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

  toggleSendMessage() {
    this.isSendMessage = 1 - this.isSendMessage;
    console.log("SendMessage", this.isSendMessage);
  }
  selectAttachmentFile(fileInput: any) {
    this.attachment_data = fileInput.target.files[0];
  }
}
