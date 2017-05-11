import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        SidebarComponent
    ],
    imports: [
        RouterModule
    ],
    exports: [
        SidebarComponent
    ]
})
export class SidebarModule {
}
