import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';
import { FileUploadModule } from 'ng2-file-upload'
import { AdminRoutingModule } from './admin.routing';

import { AuthenticationService, UserService } from '../_services/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCompanyComponent} from './company/manage_company.component';
import { NewCompanyComponent } from './company/new/new_company.component';
import { ManageUserComponent }   from './user/manage_user.component';
import { NewUserComponent } from './user/new/new_user.component';
import { ManageContentComponent }   from './content/manage_content.component';
import { NewVideoComponent } from './content/video/new_video.component';
import { NewQuizComponent } from './content/quiz/new_quiz.component'; 
import { ManageRewardComponent }   from './reward/manage_reward.component';
import { NewRewardComponent }      from './reward/new/new_reward.component';
import { ViewActivityComponent }   from './activity/view_activity.component';

import { OrderByPipe } from '../_pipes/order_by.pipe';
import { SearchPipe } from '../_pipes/search.pipe';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2UploaderModule,
    FileUploadModule,
    AdminRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ManageCompanyComponent,
    NewCompanyComponent,
    ManageUserComponent,
    NewUserComponent,
    ManageContentComponent,
    NewVideoComponent,
    NewQuizComponent,
    ManageRewardComponent,
    NewRewardComponent,
    ViewActivityComponent,

    SearchPipe,
    OrderByPipe
  ],
  providers: [
    AuthenticationService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AdminModule { }



