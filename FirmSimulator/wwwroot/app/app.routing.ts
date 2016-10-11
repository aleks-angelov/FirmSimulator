import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { HeadquartersComponent } from "./headquarters.component";
import { ScoresComponent } from "./scores.component";
import { SettingsComponent } from "./settings.component";
import { UsersComponent } from "./users.component";

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
        path: "headquarters",
        component: HeadquartersComponent
    },
    {
        path: "scores",
        component: ScoresComponent
    },
    {
        path: "settings",
        component: SettingsComponent
    },
    {
        path: "users",
        component: UsersComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);