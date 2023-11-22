import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, CardModule,SkeletonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isloaded: boolean = false;

  doctors: {
    name: string,
    image: string,
    specialty: string,
    biography: string
  }[] = [
    {
      name: "Dr.Emre Yılmaz",
      image: "1.png",
      specialty: "Kardiyoloji",
      biography: "Dr. Emre Yılmaz, İstanbul'da doğmuş ve İstanbul Üniversitesi Tıp Fakültesi'nden mezun olmuştur. Kardiyoloji alanında uzmanlık eğitimini Ankara Üniversitesi'nde tamamlamıştır. Profesyonel kariyerine çeşitli hastanelerde çalışarak başlayan Dr. Yılmaz, koroner hastalıklar, hipertansiyon ve kalp yetmezliği konusunda derinlemesine uzmanlaşmıştır."
    },
    {
      name: "Dr.Leyla Demir",
      image: "2.png",
      specialty: "Nöroloji",
      biography: "Ege Üniversitesi Tıp Fakültesi'nden mezun olan Dr. Leyla Demir, nöroloji uzmanlığını Hacettepe Üniversitesi'nde tamamlamıştır. Migren, baş ağrıları ve nörodejeneratif hastalıklar üzerine çalışmalar yapmıştır. Meslek hayatında hem klinik hem de akademik çalışmalarla öne çıkan Dr. Demir, ayrıca resim yapmayı ve seyahat etmeyi çok seviyor."
    },
    {
      name: "Dr.Ahmet Özcan",
      image: "3.png",
      specialty: "Pediatri",
      biography: "Ankara Üniversitesi Tıp Fakültesi mezunu olan Dr. Ahmet Özcan, pediatrik cerrahi alanında uzmanlığını Gazi Üniversitesi'nde tamamlamıştır. Çocuk cerrahisi konusunda geniş bir tecrübeye sahip olan Dr. Özcan, özellikle doğumsal anomaliler üzerine çalışmalar yapmaktadır."
    },
    {
      name: "Dr.Fatma Kaya",
      image: "4.png",
      specialty: "Ortopedi",
      biography: "İstanbul'da doğan ve büyüyen Dr. Fatma Kaya, İstanbul Üniversitesi Tıp Fakültesi'nden mezun olduktan sonra dermatoloji ihtisasını aynı üniversitede tamamlamıştır. Cilt hastalıkları ve estetik dermatoloji üzerine yoğunlaşan Dr. Kaya, klinik çalışmalarının yanı sıra dermatoloji eğitimi konusunda da aktif."
    },
    {
      name: "Dr.Murat Çelik",
      image: "5.png",
      specialty: "Dermatoloji",
      biography: "Dr. Murat Çelik, Ankara doğumlu olup, tıp eğitimini Ankara Üniversitesi'nde tamamlamıştır. Ortopedi ve travmatoloji alanında uzmanlık eğitimini de aynı üniversitede almıştır. Spor yaralanmaları ve eklem cerrahisi konularında uzman olan Dr. Çelik, profesyonel sporcularla çalışmalar yapmıştır."
    }
  ]

  constructor(){
    setTimeout(()=> {
      this.isloaded = true;
    },1000)
  }
  
}
