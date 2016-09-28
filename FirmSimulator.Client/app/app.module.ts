import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { HomeComponent } from "./home.component";
import { HeadquartersComponent } from "./headquarters.component";

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
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}