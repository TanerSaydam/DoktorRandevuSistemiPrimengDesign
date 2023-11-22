import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,MenubarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: "/"
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off'
    }
  ];
}
