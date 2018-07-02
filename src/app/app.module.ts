import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { routerConfig } from './app.routing';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AdminPanelComponent } from './admin_panel/admin.panel.component';
import { UserPanelComponent } from './user_panel/user.panel.component';
import { NotFoundComponent } from './page_not_found/404.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
    declarations: [
        AppComponent,
        AdminPanelComponent,
        UserPanelComponent,
        NotFoundComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ToolbarModule,
        RouterModule.forRoot(routerConfig)
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
