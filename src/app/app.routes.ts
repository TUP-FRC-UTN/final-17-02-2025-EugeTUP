import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';
import { hasRoleGuard } from './core/guards/has-role.guard';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },
    {
        canActivate: [hasRoleGuard],
        data: {
            roles: ['admin', 'student']
         },
        path: 'game',
        component: GameComponent
    },
    {
        data: {
            roles: ['admin', 'student']
         },
        canActivate: [hasRoleGuard],
        path: 'scores',
        component: ScoreComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login'
    }


];
