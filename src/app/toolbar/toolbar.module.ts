import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { ToolbarComponent } from './toolbar.component';
import { SideBarComponent } from './sidebar.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    DragulaModule
  ],

  declarations: [
    ToolbarComponent,
    SideBarComponent,
  ],

  providers: [],

  exports: [
    ToolbarComponent,
    SideBarComponent
  ]
})
export class ToolbarModule {

}
