import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { HeadquartersComponent } from "./headquarters.component";
import { HomeComponent } from "./home.component";
import { ScoresComponent } from "./scores.component";
import { SettingsComponent } from "./settings.component";
import { UsersComponent } from "./users.component";

import { AuthGuard } from "./auth-guard.service";
import { ChartService } from "./chart.service";
import { HeadquartersService } from "./headquarters.service";
import { HelperService } from "./helper.service";
import { ScoresService } from "./scores.service";
import { SettingsService } from "./settings.service";
import { UsersService } from "./users.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HeadquartersComponent,
        HomeComponent,
        ScoresComponent,
        SettingsComponent,
        UsersComponent
    ],
    providers: [
        Title,
        AuthGuard,
        ChartService,
        HeadquartersService,
        HelperService,
        ScoresService,
        SettingsService,
        UsersService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}