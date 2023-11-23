import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, CardModule, PanelModule, TableModule, CalendarModule, FormsModule, ChipModule, MessagesModule, SkeletonModule, DynamicDialogModule, ToastModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  providers: [DialogService, MessageService]
})
export class AppointmentComponent {
  firstDayOfWeek: Date = new Date();
  ref: DynamicDialogRef | undefined;
  visible: boolean = false;

  deleteHour: string = "";
  deleteDay: string = "";
  deletePatient: string = "";

  days: { day: string, date: Date, patients: any[] }[] = [
    { day: "Pazartesi", date: new Date(), patients: [] },
    { day: "Salı", date: new Date(), patients: [] },
    { day: "Çarşamba", date: new Date(), patients: [] },
    { day: "Perşembe", date: new Date(), patients: [] },
    { day: "Cuma", date: new Date(), patients: [] },
    { day: "Cumartesi", date: new Date(), patients: [] },
    { day: "Pazar", date: new Date(), patients: [] }
  ]
  hours: { hour: string, days: { day: string, date: Date, patients: any[] }[] }[] = [];
  date: Date | undefined = new Date("2023-11-22");
  constructor(public dialogService: DialogService, public messageService: MessageService) {
    let n = 0;
    this.getNowWeekDays();
    for (let i = 1; i < 49; i++) {
      if (i % 2 === 0) {
        n++;
        this.hours.push({ hour: (n) + ":00", days: this.cloneDays() });
      } else {
        this.hours.push({ hour: (n) + ":30", days: this.cloneDays() });
        if (n === 23) {
          this.hours.push({ hour: "00:00", days: this.cloneDays() });
          break;
        }
      }
    }

    console.log("Appointment Çalıştı");
  }

  cloneDays() {
    return this.days.map(d => ({ ...d, patients: [] }));
  }

  createAppointment(hour: string, day: string, date: string) {
    this.ref = this.dialogService.open(CreateAppointmentComponent, {
      data: {
        hour: hour,
        day: day,
        date: date
      },
      header: 'Randevu Ekle',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((data: any) => {
      console.log(data);

      if (data) {
        const hourIndex = this.hours.findIndex(p => p.hour === hour);
        const dayIndex = this.hours[hourIndex].days.findIndex(p => p.day === day);

        this.hours[hourIndex].days[dayIndex].patients.push(data.name + " " + data.lastName);
        //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: data.name });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }

  getNowWeekDays() {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    this.firstDayOfWeek = firstDayOfWeek;
    this.setupWeekDays(firstDayOfWeek);
  }

  setupWeekDays(startDay: Date) {
    let day = new Date(startDay);
    for (let d of this.days) {
      d.date = new Date(day);
      day.setDate(day.getDate() + 1);
    }
  }

  changeWeek(direction: string) {
    const currentWeekStart = new Date(this.firstDayOfWeek);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bugünün saatini sıfırla

    if (direction === "-" && currentWeekStart <= today) {
      // Eğer mevcut hafta bugünün haftası veya sonrasında ise geri gitme
      return;
    }

    const dayChange = direction === "+" ? 7 : -7;
    this.firstDayOfWeek.setDate(this.firstDayOfWeek.getDate() + dayChange);
    this.setupWeekDays(this.firstDayOfWeek);
  }

  showConfirm(hour: string, day: string, patient: string) {
    if (!this.visible) {
      this.deleteHour = hour;
      this.deleteDay = day;
      this.deletePatient = patient;

      this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'Randevuyu Sil?', detail: `${patient} hastanın randevusunu silmek istiyor musunuz` });
      this.visible = true;
    }
  }

  onConfirm() {
    const hourIndex = this.hours.findIndex(p => p.hour === this.deleteHour);
    const dayIndex = this.hours[hourIndex].days.findIndex(p => p.day === this.deleteDay);

    const patientIndex = this.hours[hourIndex].days[dayIndex].patients.findIndex(p => p == this.deletePatient);

    this.hours[hourIndex].days[dayIndex].patients.splice(patientIndex, 1)
    this.messageService.clear('confirm');
    this.visible = false;
  }

  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }
}
