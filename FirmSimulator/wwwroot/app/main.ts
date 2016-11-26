import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app.module";

enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

// Codelyzer: .\node_modules\.bin\tslint -c tslint.json .\wwwroot\app\**\*.ts -t verbose

// ngrok: ./ngrok http -region eu -host-header=rewrite localhost:53434