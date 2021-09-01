import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button"; //how to import Material in Material 9+
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [MatButtonModule, MatIconModule],
    exports: [MatButtonModule, MatIconModule]
})
export class MaterialModule {}