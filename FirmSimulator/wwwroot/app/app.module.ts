import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";
import { HeadquartersComponent } from "./headquarters.component";
import { ScoresComponent } from "./scores.component";

import { HelperService } from "./helper.service";
import { ChartService } from "./chart.service";
import { ScoresService } from "./scores.service";
import { SettingsService } from "./settings.service";
import { SettingsComponent } from "./settings.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HeadquartersComponent,
        ScoresComponent,
        SettingsComponent
    ],
    providers: [
        Title,
        HelperService,
        ChartService,
        ScoresService,
        SettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}