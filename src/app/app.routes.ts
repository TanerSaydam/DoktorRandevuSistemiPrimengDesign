import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DoctorsComponent } from './doctors/doctors.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "appointment/:value",
                component: AppointmentComponent
            },
            {
                path: "doctors",
                component: DoctorsComponent
            },
        ]
    },
    {
        path: "sign-in",
        component: SignInComponent
    }
    
];
