import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.authService.getInternalToken();

        if (token) {
            // if the User is authenticated, redirect to home
            // Nathan: update to home after page is built out
            this.router.navigate(['/profile']);
            return false;
        }

        // No token, allow access to login page
        return true;
    }
}