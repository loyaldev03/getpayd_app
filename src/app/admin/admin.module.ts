import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';
import { FileUploadModule } from 'ng2-file-upload'
import { ChartsModule }      from 'ng2-charts/ng2-charts';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import {CsvService} from "angular2-json2csv";
// import { DropdownModule } from 'ng2-bootstrap';

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
import { ManageAwardedRewardsComponent } from './reward/manage_awarded_rewards/manage_awarded_rewards.component';
import { NewRewardComponent }      from './reward/new/new_reward.component';
import { ViewActivityComponent }   from './activity/view_activity.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BlockIframeComponent} from './analytics/block_iframe/block_iframe.component';
import { BlockChartComponent} from './analytics/block_chart/block_chart.component';
import { UsersForAnalyticsComponent } from './analytics/users_for_analytics/users_for_analytics.component';
import { AutoCompleteComponent } from './analytics/autocomplete/autocomplete.component';

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
    AdminRoutingModule,
    ChartsModule,
    Ng2Bs3ModalModule,
    // DropdownModule.forRoot(),
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
    ManageAwardedRewardsComponent,
    ViewActivityComponent,
    AnalyticsComponent,
    BlockIframeComponent,
    BlockChartComponent,
    UsersForAnalyticsComponent,
    AutoCompleteComponent,

    SearchPipe,
    OrderByPipe
  ],
  providers: [
    AuthenticationService,
    UserService,
    CsvService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AdminModule { }



