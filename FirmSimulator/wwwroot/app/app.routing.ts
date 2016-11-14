import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { ScoresComponent } from "./scores/scores.component";
import { SettingsComponent } from "./settings/settings.component";
import { SimulationComponent } from "./simulation/simulation.component";
import { UsersComponent } from "./users/users.component";

import { AuthGuard } from "./shared/auth-guard.service";
import { ExitGuard } from "./simulation/exit-guard.service";

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
        canActivate: [AuthGuard],
        canDeactivate: [ExitGuard]
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