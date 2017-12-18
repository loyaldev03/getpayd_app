import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../../_models/index'
import { UserService, AdminService }             from '../../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }                 from '@angular/common';

import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../../_models/index'
import { UserService, AdminService }             from '../../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
    templateUrl: 'quiz_show.component.html',
    styleUrls: [ './quiz_show.component.scss' ]
})
export class QuizShowComponent implements OnInit{
  private content;
  private quizzes = [];
  private quiz_index: number = 0;
  private isLoading: boolean = true;
  private result: number[] = [];
  private correct_answers_number: number = 0;
  private tokens_awarded: number = 0;
  private user;
  private points_awarded:number = 0;
  private quiz_id: string;
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quiz_id = params['id'];
      this.getContent(this.quiz_id);
    });
  }

  getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => {
        console.log("quiz log", data);
        this.content = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

      getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => {
        console.log("quiz log", data);
        this.content = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

    
  to_quiz_activity() {
    this.router.navigate(['/user/quiz_activity/', this.quiz_id]); 
  }
}

import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../../_models/index'
import { UserService, AdminService }             from '../../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
    templateUrl: 'quiz_show.component.html',
    styleUrls: [ './quiz_show.component.scss' ]
})
export class QuizShowComponent implements OnInit{
  private content;
  private quizzes = [];
  private quiz_index: number = 0;
  private isLoading: boolean = true;
  private result: number[] = [];
  private correct_answers_number: number = 0;
  private tokens_awarded: number = 0;
  private user;
  private points_awarded:number = 0;
  private quiz_id: string;
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quiz_id = params['id'];
      this.getContent(this.quiz_id);
    });
  }

  getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => {
        console.log("quiz log", data);
        this.content = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  to_quiz_activity() {
    this.router.navigate(['/user/quiz_activity/', this.quiz_id]); 
  }

  to_quiz_activity() {
    this.router.navigate(['/user/quiz_activity/', this.quiz_id]); 
  }
}


import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../../_models/index'
import { UserService, AdminService }             from '../../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }                 from '@angular/common';

import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../../_models/index'
import { UserService, AdminService }             from '../../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
    templateUrl: 'quiz_show.component.html',
    styleUrls: [ './quiz_show.component.scss' ]
})
export class QuizShowComponent implements OnInit{
  private content;
  private quizzes = [];
  private quiz_index: number = 0;
  private isLoading: boolean = true;
  private result: number[] = [];
  private correct_answers_number: number = 0;
  private tokens_awarded: number = 0;
  private user;
  private points_awarded:number = 0;
  private quiz_id: string;
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quiz_id = params['id'];
      this.getContent(this.quiz_id);
    });
  }

  getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => {
        console.log("quiz log", data);
        this.content = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

      getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => {
        console.log("quiz log", data);
        this.content = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

    
  to_quiz_activity() {
    this.router.navigate(['/user/quiz_activity/', this.quiz_id]); 
  }
}

import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../../_models/index'
import { UserService, AdminService }             from '../../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
    templateUrl: 'quiz_show.component.html',
    styleUrls: [ './quiz_show.component.scss' ]
})
export class QuizShowComponent implements OnInit{
  private content;
  private quizzes = [];
  private quiz_index: number = 0;
  private isLoading: boolean = true;
  private result: number[] = [];
  private correct_answers_number: number = 0;
  private tokens_awarded: number = 0;
  private user;
  private points_awarded:number = 0;
  private quiz_id: string;
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quiz_id = params['id'];
      this.getContent(this.quiz_id);
    });
  }

  getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => {
        console.log("quiz log", data);
        this.content = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  to_quiz_activity() {
    this.router.navigate(['/user/quiz_activity/', this.quiz_id]); 
  }

  to_quiz_activity() {
    this.router.navigate(['/user/quiz_activity/', this.quiz_id]); 
  }
}
