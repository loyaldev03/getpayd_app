import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { ManageCompanyComponent}             from './company/manage_company.component';
import { NewCompanyComponent }               from './company/new/new_company.component';
import { ManageUserComponent }               from './user/manage_user.component';
import { NewUserComponent }         from './user/new/new_user.component';
import { ManageContentComponent }   from './content/manage_content.component';
import { NewVideoComponent }        from './content/video/new_video.component';
import { NewQuizComponent }         from './content/quiz/new_quiz.component'; 
import { ManageRewardComponent }   from './reward/manage_reward.component';
import { ManageAwardedRewardsComponent } from './reward/manage_awarded_rewards/manage_awarded_rewards.component';
import { NewRewardComponent }      from './reward/new/new_reward.component';
import { ViewActivityComponent }   from './activity/view_activity.component';
import { DashboardComponent }         from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';

export const routes: Routes = [
    { path: '', redirectTo: 'analytics', pathMatch: 'full' },
    { path: 'manage_company',            component: ManageCompanyComponent },
    { path: 'new_company',                component: NewCompanyComponent },
    { path: 'manage_user',            component: ManageUserComponent },
    { path: 'new_user',                component: NewUserComponent },
    { path: 'manage_content',         component: ManageContentComponent },
    { path: 'new_video',               component: NewVideoComponent },
    { path: 'new_quiz',                component: NewQuizComponent },
    { path: 'manage_reward',          component: ManageRewardComponent },
    { path: 'manage_awarded_rewards',  component:ManageAwardedRewardsComponent},
    { path: 'new_reward',              component: NewRewardComponent },
    { path: 'view_activity/:user_id',         component: ViewActivityComponent },
    { path: 'dashboard',                component: DashboardComponent},
    { path: 'analytics',                 component: AnalyticsComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AdminRoutingModule {}
