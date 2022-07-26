import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MirrorService } from 'src/app/Service/mirror.service';

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent {

  constructor(public mirrorService: MirrorService,
    public fb: FormBuilder) { }
    meetingForm: FormGroup
    meetingLink:any

  show=true;
  hour =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  min =[0,15,30,45];
  timezone=["(GMT-11:00) Midway Island, Samoa",
    "(GMT-11:00) Pago Pago(GMT-11:00) Pago Pago","(GMT+5:30) Mumbai, Kolkata, New Delhi(GMT+5:30) Mumbai, Kolkata, New Delhi"];
  add(){
    this.show=false;
  }

  ngOnInit():void {
    this.getMeetingLink()
    // Meeting Form
    this.meetingForm  = this.fb.group({
      topic: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      time_slot: new FormControl('', [Validators.required]),
      time_zone: new FormControl('', [Validators.required])
    })
  }

  getMeetingLink(){
    this.mirrorService.getMeetingLink().toPromise().then((data) =>{
      this.meetingLink = data;
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  addMeetingLink(Topic: { value: any; }, Duration: any, Time_slot: any, Time_zone: any){
    const formData = new FormData();
    formData.append('topic', this.meetingForm.value.topic);
    formData.append('duration', this.meetingForm.value.duration);
    formData.append('time_slot', this.meetingForm.value.time_slot);
    formData.append('time_zone', this.meetingForm.value.time_zone);
    this.mirrorService.addMeetingLink(formData).toPromise().then(
      data=>{
        console.log('Meeting link successfully generated');
        this.meetingForm.reset();
        this.getMeetingLink();
        Topic.value = null;
        Duration.value = null;
        Time_slot.value = null;
        Time_zone.value = null;
      }
    ).catch((err)=>{
      console.log(err);
    });
  }

}
