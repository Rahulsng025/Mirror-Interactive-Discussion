import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    WidgetsRoutingModule,
    ChartsModule,
    BsDropdownModule, 
    ReactiveFormsModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }
