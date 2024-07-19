import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NursingGuard implements CanActivate {
    canActivate() {
        let Role = sessionStorage.getItem("role");
        if (Role == "ROLE_NURSING") {
            return true;
        }
        return false;
    }
}