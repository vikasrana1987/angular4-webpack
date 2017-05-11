import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        SidebarModule
    ],
    exports: [
        NavbarModule,
        SidebarModule
    ]
})
export class CoreModule {
}
