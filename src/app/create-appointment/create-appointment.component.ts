import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, FormsModule, OrganizationChartModule],
  providers: [DatePipe],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent implements OnInit {
  hour: string = "";
  day: string = "";
  date: string = "";

  name: string = "";
  lastName: string = "";

  data: TreeNode[] = [];

  constructor(private config: DynamicDialogConfig, private dialog: DynamicDialogRef, private _date: DatePipe) { }
  ngOnInit(): void {
    if (this.config && this.config.data) {
      // Dialog'dan gönderilen veriyi al
      const data = this.config.data;
      this.hour = data.hour;
      this.day = data.day;
      this.date = data.date;

      this.data = [
        {
          label: this.day + " (" + this._date.transform(this.date,"dd.MM.yyyy") + ")",
          expanded: true,
          children: [
            {
              label: this.hour,
              expanded: false
            }
          ]
        }
      ];
    }
  }

  save() {
    this.dialog.close({ name: this.name, lastName: this.lastName });
  }
}
