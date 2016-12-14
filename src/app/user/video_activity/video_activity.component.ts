import { Component, OnInit, ViewChild }        from '@angular/core';
import { Content }                  from '../../_models/index'
import { UserService, AdminService }  from '../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'video_activity.component.html',
    styleUrls: [ './video_activity.component.scss' ]
})
export class VideoActivityComponent implements OnInit{
  @ViewChild('video') video;

  private content;
  private isLoading: boolean = true;
  private user;
  private points_awarded:number = 0;
  private currTime;
  private currentTimeRange;
  private tokens_awarded;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  playPause(video) {
    console.log("playpause");
    if (video.paused) {
      video.play();
    }
    else {
      video.pause();
    }
  }

  updateDisplayTime(video) {
    this.currTime = this.secondsToMinutesAndSeconds(video.currentTime);
    this.currentTimeRange = video.currentTime;
    this.tokens_awarded = Math.round(this.currentTimeRange) * this.content.reward
  }

  secondsToMinutesAndSeconds(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.round(time % 60);
      return "" + minutes + ":" + seconds;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getContent(params['id']);
      this.getUserInfo(JSON.parse(localStorage.getItem('currentUser'))._id);
      this.points_awarded = 100;
    });
  }

  getContent(id) {
    this.adminService.getContent(id).subscribe(
      data => this.content = data,
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  getUserInfo(id){
    this.adminService.getUser(id).subscribe(
      data => {
        this.user = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  onFinish() {
    if (!this.user.activities){
      this.user.activities = [];
    }
    let current_date = new Date();
    this.user.activities.push({
      user: this.user.first_name+" "+this.user.last_name,
      content: this.content,
      points_awarded: this.points_awarded,
      date: current_date,
    });  
    this.user.available_tokens += Math.round(this.currentTimeRange) * this.content.reward;
    console.log(this.currentTimeRange);
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
