import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PatientGuard implements CanActivate {
    canActivate() {
        let Role = sessionStorage.getItem("role");
        if (Role == "ROLE_PATIENT") {
            return true;
        }
        return false;
    }
}