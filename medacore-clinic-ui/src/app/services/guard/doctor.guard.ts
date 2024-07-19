import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
    canActivate() {
        let Role = sessionStorage.getItem("role");
        if (Role == "ROLE_DOCTOR") {
            return true;
        }
        return false;
    }
}