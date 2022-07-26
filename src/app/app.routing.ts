import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './Component/auth/forget-password/forget-password.component';
import { LoginFromComponent } from './Component/auth/login-from/login-from.component';
import { SignUpComponent } from './Component/auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './Component/auth/verify-email/verify-email.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './gaurds/auth.guard';

// Meeting Components
import { WelcomeComponent } from './Component/meeting/pages/welcome/welcome.component';
import { MeetingPreviewComponent } from './Component/meeting/pages/meeting-preview/meeting-preview.component';
import { InputOutputSettingsComponent } from './Component/meeting/shared/components/input-output-settings/input-output-settings.component';
import { MeetingPageComponent } from './Component/meeting/pages/meeting-page/meeting-page.component';

import { AboutComponent } from './Landing-Page/about/about.component';
import { BlogComponent } from './Landing-Page/blog/blog.component';
import { ContactComponent } from './Landing-Page/contact/contact.component';
import { HomeComponent } from './Landing-Page/home/home.component';
import { ServicesComponent } from './Landing-Page/services/services.component';


export const routes: Routes = [
  
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeComponent},
  {path:'contact',component:ContactComponent},
  {path:'services',component:ServicesComponent},
  {path:'blog',component:BlogComponent},

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
   
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'login-form',
    component: LoginFromComponent,
  
    data: {
      title: 'Login Form'
    }
  },
  {
    path: 'register-user',
    component: SignUpComponent,
    
    data: {
      title: 'Register'
    }
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent,
   
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
  
    data: {
      title: 'Verify Email'
    }
  },
 {
   path: 'welcome', component: WelcomeComponent,
   data: {
     title: 'Welcome'
   }
 },
 {
  path: 'preview', component: MeetingPreviewComponent,
  data: {
    title: 'Preview'
  }
}, {
  path: 'settings', component: InputOutputSettingsComponent,
  data: {
    title: 'Setting'
  }
}, {
  path: 'meeting', component: MeetingPageComponent,
  data: {
    title: 'Meeting'
  }
},


  {
    path: '',
    component: DefaultLayoutComponent,
   
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
        
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
