import { Component, OnInit }        from '@angular/core';
import { Router } from '@angular/router';
import { Department }           from '../../../_models/index';
import { AdminService }     from '../../../_services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import * as FileUpload from 'ng2-file-upload'; 

require ('aws-sdk/dist/aws-sdk');
declare var AWS: any;

const URL = 'http://localhost:3000/upload';

@Component({
    templateUrl: 'new_video.component.html',
    styleUrls: [ './new_video.component.scss' ]
})
export class NewVideoComponent implements OnInit{

  private uploader:FileUpload.FileUploader = new FileUpload.FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  private isLoading: boolean = true;
  private available_tos: Department[] = [];  
  private video_file;
  private addVideoForm: FormGroup;
  private content = new FormControl("", Validators.required);
  private type = "video"
  private available_to = new FormControl();
  private reward = new FormControl(0, Validators.required);
  private date_end = new FormControl("", Validators.required);
  private video_to_upload = null;
  private isUploading = false;
  private config;
  
  uploadFile: any;
  options: Object = {
    url: 'http://localhost:3000/upload'
  };

  handleUpload(data): void {
    if (data && data.response) {
      this.uploadFile = data;
    }
  }

  constructor( 
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
  ){ 
  }

  ngOnInit() {
    this.addVideoForm = this.formBuilder.group({
      available_to: this.available_to,
      reward: this.reward,
      date_end: this.date_end,
    });
    this.video_to_upload = null;
    this.getAvailableTo();
  }

  getAvailableTo() {
    this.adminService.getDepartments().subscribe(
      data => this.available_tos = data,
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  onFileSelect(data) {
    this.video_file = data;
  }

  videoFileChange(fileInput: any){
    this.video_to_upload = fileInput.target.files[0];
  }
  addVideo() {
    this.isUploading = true;
    let file = this.video_to_upload
    AWS.config.region = "us-east-1";
    AWS.config.accessKeyId = "AKIAIMSEK6YLJZGNTIJQ";
    AWS.config.secretAccessKey = "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";
    let bucket = new AWS.S3({params: {Bucket:"ledgerofthings"}});
    let params = {Key: file.name, Body: file, ACL: 'public-read'};
    bucket.upload(params, (error, res) => {
      if (error) return console.log(error);
      let content;
      let form:any = this.addVideoForm;
      content = form._value;
      content.type = "video";
      content.content = res.Location;
      content.company = JSON.parse(localStorage.getItem('currentUser'));
      this.adminService.addContent(content)
      .subscribe(
          data => {
            this.router.navigate(['/admin/manage_content']);
            this.isUploading = false;
          },
          error => {
              console.log("service error");
          });
    });
  }
}
