import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.getUserRole()) {
    if (route.routeConfig?.path === 'admin' && authService.getUserRole() !== 'admin') {
      console.log('沒有權限')
      return router.createUrlTree(['/home']);
    }
    return true;
  }
  return router.createUrlTree(['/login']);
};
