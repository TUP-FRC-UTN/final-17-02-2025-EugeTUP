import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasRoleGuard: CanActivateFn = (route, state) => {
 
  const router = inject(Router)
  const roles = route.data?.['roles'] as string[]

  const user = localStorage.getItem('name')
  const pass = localStorage.getItem('pass')
  const rol = localStorage.getItem('rol')
  
  if (user === null || user === '' || pass === null || pass === '') {
    return router.createUrlTree(['login']);
  }

  return true};
