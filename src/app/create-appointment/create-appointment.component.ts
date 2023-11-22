import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent implements OnInit{
  hour: string = "";
  day: string = "";

  name: string = "";
  lastName: string = "";

constructor(private config: DynamicDialogConfig, private dialog: DynamicDialogRef){}
  ngOnInit(): void {
    if (this.config && this.config.data) {
      // Dialog'dan gönderilen veriyi al
      const data = this.config.data;
      this.hour = data.hour;
      this.day = data.day;      
    }
  }

  save(){
    this.dialog.close({name: this.name, lastName: this.lastName});
  }
}
