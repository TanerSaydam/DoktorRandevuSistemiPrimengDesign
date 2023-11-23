import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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
    }
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ){
    if(auth.checkIsAuthenticated()){
      this.items.push({
        label: 'Giriş Yap',
        icon: 'pi pi-sign-in',
        routerLink: "/sign-in"
      })
    }else{
      this.items.push({
        label: 'Doktorlar',
        icon: 'pi pi-power-off',
        routerLink: "/doctors"
      })
      this.items.push({
        label: 'Çıkış Yap',
        icon: 'pi pi-power-off',
        command: (event)=> {
          this.signOut(event);
        }
      })
    }
  }

  signOut(event: MenuItemCommandEvent){
    localStorage.clear();
    this.router.navigateByUrl("/sign-in");
  }
}
