import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { UserDashboardComponent }  from './dashboard/user_dashboard.component';
import { RedeemComponent }         from './redeem/redeem.component';
import { TransferTokensComponent }         from './transfer_tokens/transfer_tokens.component';
import { VideoActivityComponent }  from './video_activity/video_activity.component';
import { QuizActivityComponent }  from './quiz_activity/quiz_activity.component';
import { QuizShowComponent }  from './quiz_activity/quiz_show/quiz_show.component';
import { RewardDetailComponent }   from './reward_detail/reward_detail.component';
import { ShoppingCartComponent }   from './shopping_cart/shopping_cart.component';

export const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user',                    component: UserDashboardComponent},
    { path: 'redeem',                  component: RedeemComponent},
    { path: 'transfer_tokens',         component: TransferTokensComponent},
    { path: 'video_activity/:id',       component: VideoActivityComponent },
    { path: 'quiz_activity/:id',       component: QuizActivityComponent },
    { path: 'quiz_show/:id',            component: QuizShowComponent},    
    { path: 'reward_detail/:id',        component: RewardDetailComponent },
    { path: 'shopping_cart',        component: ShoppingCartComponent },
    { path: '**', redirectTo: '' }
];
export const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user',                    component: UserDashboardComponent},
    { path: 'redeem',                  component: RedeemComponent},
    { path: 'transfer_tokens',         component: TransferTokensComponent},
    { path: 'video_activity/:id',       component: VideoActivityComponent },
    { path: 'quiz_activity/:id',       component: QuizActivityComponent },
    { path: 'quiz_show/:id',            component: QuizShowComponent},    
    { path: 'reward_detail/:id',        component: RewardDetailComponent },
    { path: 'shopping_cart',        component: ShoppingCartComponent },
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class UserRoutingModule {}
