import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app.module";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

// Codelyzer: .\node_modules\.bin\tslint -c tslint.json .\wwwroot\app\*.ts