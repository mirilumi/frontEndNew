import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { UserPanelComponent } from './user_panel/user.panel.component';
import { AdminPanelComponent } from './admin_panel/admin.panel.component';
import { NotFoundComponent } from './page_not_found/404.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-panel', component: UserPanelComponent, canActivate: [AuthGuard] },
    { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard] },

    { path: '**', component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
