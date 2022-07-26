import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase Service + environment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

// Meeting Components
import { NgxAgoraSdkNgModule } from 'ngx-agora-sdk-ng';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MeetingComponent } from './Component/meeting/pages/meeting/meeting.component';
import { MeetingPreviewComponent } from './Component/meeting/pages/meeting-preview/meeting-preview.component';
import { RoundTranparentIconButtonComponent } from './Component/meeting/shared/components/round-tranparent-icon-button/round-tranparent-icon-button.component';
import { InputOutputSettingsComponent } from './Component/meeting/shared/components/input-output-settings/input-output-settings.component';
import { SoundMeterComponent } from './Component/meeting/shared/components/sound-meter/sound-meter.component';
import { CameraPreviewComponent } from './Component/meeting/shared/components/camera-preview/camera-preview.component';
import { WelcomeComponent } from './Component/meeting/pages/welcome/welcome.component';
import { MeetingPageComponent } from './Component/meeting/pages/meeting-page/meeting-page.component';
import { AgoraVideoPlayerDirective } from './Component/meeting/shared/directives/agora-video-player.directive';
import { MeetingControlsComponent } from './Component/meeting/shared/components/meeting-controls/meeting-controls.component';
import { MeetingParticipantComponent } from './Component/meeting/shared/components/meeting-participant/meeting-participant.component';
import { MeetingParticipantControlsComponent } from './Component/meeting/shared/components/meeting-participant-controls/meeting-participant-controls.component';
import { SoundVisualizerComponent } from './Component/meeting/shared/components/sound-visualizer/sound-visualizer.component';


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { LoginFromComponent } from './Component/auth/login-from/login-from.component';
import { SignUpComponent } from './Component/auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './Component/auth/verify-email/verify-email.component';
import { ForgetPasswordComponent } from './Component/auth/forget-password/forget-password.component';
import { AngularMaterialModule } from './angular-material.module'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeComponent } from './Landing-Page/home/home.component';
import { ServicesComponent } from './Landing-Page/services/services.component';
import { BlogComponent } from './Landing-Page/blog/blog.component';
import { ContactComponent } from './Landing-Page/contact/contact.component';
import { AboutComponent } from './Landing-Page/about/about.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    //Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    
    NgxAgoraSdkNgModule.forRoot({
      AppID: '457dfc38aaa44da286808f25fef58363',
      Video: { codec:'h264', mode:'rtc', role:'host' }
    }),
    FontAwesomeModule,
    AngularMaterialModule,
     // Material
     MatFormFieldModule,
     MatIconModule,
     MatCheckboxModule
  ],

  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule
  ],

  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    LoginFromComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgetPasswordComponent,
    // Meeting Declarations
    MeetingComponent,
    MeetingPreviewComponent,
    RoundTranparentIconButtonComponent,
    InputOutputSettingsComponent,
    SoundMeterComponent,
    CameraPreviewComponent,
    WelcomeComponent,
    MeetingPageComponent,
    AgoraVideoPlayerDirective,
    MeetingControlsComponent,
    MeetingParticipantComponent,
    MeetingParticipantControlsComponent,
    SoundVisualizerComponent,
    HomeComponent,
    ServicesComponent,
    BlogComponent,
    ContactComponent,
    AboutComponent
  ],


  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
