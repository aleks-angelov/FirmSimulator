import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";
import { HeadquartersComponent } from "./headquarters.component";

import { ChartService } from "./chart.service";
import { HelperService } from "./helper.service";

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
        HeadquartersComponent
    ],
    providers: [
        Title,
        ChartService,
        HelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}