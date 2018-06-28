import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { UserPanelComponent } from './user_panel/user.panel.component';
import { AdminPanelComponent } from './admin_panel/admin.panel.component';
import { NotFoundComponent } from './page_not_found/404.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-panel', component: UserPanelComponent, canActivate: [AuthGuard] },
    { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] },
    // { path: '',
    //     redirectTo: '/heroes',
    //     pathMatch: 'full'
    // },
    { path: '**', component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
