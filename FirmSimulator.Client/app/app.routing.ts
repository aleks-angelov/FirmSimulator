import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { HeadquartersComponent } from "./headquarters.component";

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
    }
];

export const routing = RouterModule.forRoot(appRoutes);