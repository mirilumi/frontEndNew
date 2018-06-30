import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SideBarComponent } from './sidebar.component';

@Component({
  selector: 'toolbar-options',
  templateUrl: './toolbar.component.html'

})

export class ToolbarComponent implements OnInit {
  @ViewChild(SideBarComponent)
  private sideBarComponent: SideBarComponent;
  private toolbarOptions: Array<any> = [];
  getItems: Array<any> = [];
  userId;
  errorMessage: string;
  toolbarList: any = [];
  updateToolbar: any = [];
  sidebarEditDashboards;

  constructor(
    private _dragulaService: DragulaService) {

  }
  ngOnInit() {

    this.sidebarEditDashboards = false;
  }
  onRouteChangeEvent() {
    this.sideBarComponent.ChangeOrganisation();
  }
  getToolbarOptions(userId: any) {
    userId = 'C8B13C8F-583B-430D-8A56-1C134081C10E';
  }

  getEvent() {
    // to avoid the error of existing bag in dragula
    const bag: any = this._dragulaService.find('testingToolbar-bag');
    if (bag !== undefined) {
        this._dragulaService.destroy('testingToolbar-bag');
    }

    this._dragulaService.setOptions('testingToolbar-bag', {
      revertOnSpill: true
    });

    this._dragulaService.drag.subscribe((value: any) => {
      let currentToolbar = this.toolbarList;
    });

    this._dragulaService.drop.subscribe((value: any[]) => {
      let currentToolbar = this.toolbarList;
      const [bagName, e, el] = value;
      this.onDrop(value.slice(1));
    });
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }

  private onDrop(args) {
    let [e, el] = args;
    // do something
  }
}
