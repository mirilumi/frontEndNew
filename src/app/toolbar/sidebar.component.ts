import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import swal from 'sweetalert2';
import { Router, NavigationStart } from '@angular/router';

declare var $: any;


@Component({
  selector: 'layout-sidebar',
  templateUrl: 'sidebar.component.html',
  providers: []
})

export class SideBarComponent implements OnInit, AfterViewInit, DoCheck {
  NavbarHiden: boolean;
  Users: any[];

  selectedOrganization: any;
  userOrganizations: any[];
  currentSection;
  routes: Array<any> = [];
  DashboardRoute: boolean = false;
  AdminRoute: boolean = false;
  MyAppsRoute: boolean = false;
  PlatformAdminRoute: boolean = false;

  adminNavLabels: Array<any> = [
    { ref: '/admin/users', label: 'User management' },
    { ref: '/admin/groups', label: 'Group management' },
    { ref: '/admin/applications', label: 'Application management' },
    { ref: '/admin/roles', label: 'Role management' },
    { ref: '/admin/able-settings', label: 'Able+ settings' },
    { ref: '/admin/integrations', label: 'Integrations' }
  ];
  platformNavLabels: Array<any> = [
    { ref: '/platform-admin/platform-settings', label: 'Settings' },
    { ref: '/platform-admin/customers', label: 'Customers' },
    { ref: '/platform-admin/applications', label: 'Applications' },
    { ref: '/platform-admin/templates', label: 'Templates' },
    { ref: '/platform-admin/reporting', label: 'Reporting' },
    { ref: '/platform-admin/platform-mdx', label: 'MDX settings' },
    { ref: '/platform-admin/new-era-staff', label: 'New Era staff' }
  ];
  private adminPermissionRoute: Array<any> = [];
  private platformPermissionRoute: Array<any> = [];

  @Input() avaliableItems: Array<any>;

  constructor(
       public router: Router
    ) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url == "/admin" && this.adminNavLabels) {
          this.router.navigateByUrl(this.adminNavLabels[0].ref.toString());
        } else if (event.url == "/platform-admin" && this.platformNavLabels) {
          this.router.navigateByUrl(this.platformNavLabels[0].ref.toString());
        }
      }
    });
  }

  ngOnInit() {
    let dataRoute = localStorage.getItem('route');
    this.routes = JSON.parse(dataRoute);
    if (this.routes && this.routes.length > 0) {
      this.routes = JSON.parse(dataRoute);
    } else {
      this.loadOrganizations();
    }
  }

  ngDoCheck() {
  }

  ngAfterViewInit() {
    let dataRoute = localStorage.getItem('route');
    this.routes = JSON.parse(dataRoute);
  }

  ChangeOrganisation() {
    let dataRoute = localStorage.getItem('route');
    this.routes = JSON.parse(dataRoute);

  }

  private getRoutes(Users: any[], selectedOrganization: any) {
    let UserIdByOrganisation = Users.filter((item: any) => item.organisation.id == selectedOrganization.id);
    this.getUserGroup(UserIdByOrganisation[0].id, selectedOrganization.id);
    this.getCurrentUserData(UserIdByOrganisation[0].id, selectedOrganization.id);
  }

  // Think for a better solution later
  private updateNavLabels() {
    if (localStorage.getItem('route')) {
      this.adminPermissionRoute = [];
      this.platformPermissionRoute = [];
      if (this.adminNavLabels != undefined) {
        this.HieararchyRoute(this.routes, "admin");
      }
      if (this.platformNavLabels != undefined) {
        this.HieararchyRoute(this.routes, "platform");
      }
      if (this.adminPermissionRoute.length > 0) {
        this.adminNavLabels = [];
        this.adminNavLabels = this.adminPermissionRoute;
      }
      if (this.platformPermissionRoute.length > 0) {
        this.platformNavLabels = [];
        this.platformNavLabels = this.platformPermissionRoute;
      }
    } else {
      setTimeout(() => {
        this.updateNavLabels();
      }, 4000);
    }
  }

  private HieararchyRoute(hierarchy: Array<any>, location: string) {
    if (location == "admin") {
      if ((hierarchy != null)) {
        hierarchy.forEach(element => {
          for (let i in this.adminNavLabels) {
            if (this.adminNavLabels[i].ref.toLowerCase() == element.route.toLowerCase()) {
              this.adminPermissionRoute.push(this.adminNavLabels[i]);
            }
          }
          this.HieararchyRoute(element.subRoute, location);
        });
      }
    } else {
      if ((hierarchy != null)) {
        hierarchy.forEach(element => {
          for (let i in this.platformNavLabels) {
            if (this.platformNavLabels[i].ref.toLowerCase() == element.route.toLowerCase()) {
              this.platformPermissionRoute.push(this.platformNavLabels[i]);
            }
          }
          this.HieararchyRoute(element.subRoute, location);
        });
      }
    }
  }

  private getUserGroup(userId: any, organisationId: any) {
  }

  private loadOrganizations(): void {
  }


  private getAndSortUserOrganisations(personUsers: Array<any>) {

  }

  private getCurrentUserData(userId: any, organisationId: any) {

  }

  private recoveryEmailPrompt(personId: any) {
    swal({
      title: ' Recovery Email!',
      text: 'You do not have a recovery email address stored in Able+. Without a recovery email address you will be unable to log in if you forget your username or password.',
      type: 'warning',
      input: 'email',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Skip',
      confirmButtonText: 'Save',
      cancelButtonClass: 'btn btn-secondary',
      confirmButtonClass: 'btn btn-primary',
      buttonsStyling: false,
      inputPlaceholder: 'Enter recovery email.',
      allowEscapeKey: false,
      allowOutsideClick: false,
      inputValidator: (value) => {
        return !value && 'Invalid email address';
      }
    }).then((result) => {
      if (result.dismiss) {
      } else {
        if (result.value.toString() != "" || result.value.toString() != null) {
          // post new contact email (recovery)
          let contact = {
            "communicationType": "HOME",
            "defaultContact": false,
            "recovery": true,
            "type": "EMAIL",
            "value": result.value.toString()
          };
        }
      }
    });
  }

  private checkUserAge(year: number, month: number, DoB: string): boolean {
    const dob = new Date(DoB);
    const dobYear = dob.getFullYear();
    const dobMonth = dob.getMonth() + 1;

    if (year > dobYear) {
      return true;
    } else if (year == dobYear && (month > dobMonth || month == dobMonth)) {
      return true;
    }
    return false;
  }

}
