import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home.component";
import { IntroductionComponent } from "./introduction.component";
import { ScoresComponent } from "./scores.component";
import { SettingsComponent } from "./settings.component";
import { SimulationComponent } from "./simulation.component";
import { UsersComponent } from "./users.component";

import { AuthGuard } from "./auth-guard.service";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "introduction",
        component: IntroductionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "simulation",
        component: SimulationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "scores",
        component: ScoresComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "users",
        component: UsersComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);