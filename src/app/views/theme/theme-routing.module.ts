import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { SettingsComponent } from './settings/settings.component';
import { TypographyComponent } from './typography.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'meeting',
        component: ColorsComponent,
        data: {
          title: 'Colors'
        }
      },
      {
        path: 'profile',
        component: TypographyComponent,
        data: {
          title: 'Typography'
        }
      },
      {
        path:'recordings',
        component: RecordingsComponent,
        data: {
          title: 'Recording'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Setting'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
