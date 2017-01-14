import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserRoutingModule } from './user.routing';
// import { Ng2CompleterModule } from "ng2-completer";

import { AlertService, AuthenticationService, UserService, AdminService } from '../_services/index';

import { UserDashboardComponent }  from './dashboard/user_dashboard.component';
import { RedeemComponent }         from './redeem/redeem.component';
import { TransferTokensComponent }         from './transfer_tokens/transfer_tokens.component';
import { AutoCompleteComponent }     from './transfer_tokens/auto_complete/auto_complete.component';

import { VideoActivityComponent }  from './video_activity/video_activity.component';
import { QuizActivityComponent }  from './quiz_activity/quiz_activity.component';
import { QuizShowComponent }  from './quiz_activity/quiz_show/quiz_show.component';
import { RewardDetailComponent }   from './reward_detail/reward_detail.component';
import { ShoppingCartComponent }   from './shopping_cart/shopping_cart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UserRoutingModule,
    // Ng2CompleterModule
  ],
  declarations: [
    UserDashboardComponent,
    RedeemComponent,
    TransferTokensComponent,
    AutoCompleteComponent,
    VideoActivityComponent,
    QuizActivityComponent,
    QuizShowComponent,
    RewardDetailComponent,
    ShoppingCartComponent,
  ],
  providers: [
    AuthenticationService,
    AdminService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class UserModule { }



