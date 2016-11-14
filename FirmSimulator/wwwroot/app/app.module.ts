import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { HeadquartersComponent } from "./simulation/headquarters.component";
import { HomeComponent } from "./home/home.component";
import { IndicatorsComponent } from "./simulation/indicators.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { ScoresComponent } from "./scores/scores.component";
import { SettingsComponent } from "./settings/settings.component";
import { SimulationComponent } from "./simulation/simulation.component";
import { UsersComponent } from "./users/users.component";

import { AuthGuard } from "./shared/auth-guard.service";
import { ExitGuard } from "./simulation/exit-guard.service";

import { ChartService } from "./charts/chart.service";
import { HelperService } from "./shared/helper.service";
import { ScoresService } from "./scores/scores.service";
import { SettingsService } from "./settings/settings.service";
import { SimulationService } from "./simulation/simulation.service";
import { UsersService } from "./users/users.service";

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
        IndicatorsComponent,
        IntroductionComponent,
        ScoresComponent,
        SettingsComponent,
        SimulationComponent,
        UsersComponent
    ],
    providers: [
        Title,
        AuthGuard,
        ExitGuard,
        ChartService,
        HelperService,
        ScoresService,
        SettingsService,
        SimulationService,
        UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}