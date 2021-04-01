import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[arpaHasRole]',
})
export class HasRoleDirective implements OnInit, OnDestroy {

  @Input() arpaHasRole: string;

  stop$ = new Subject();

  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    // private rolesService: RolesService
  ) {
  }

  ngOnInit() {
    //  We subscribe to the roles$ to know the roles the user has
    /**this.rolesService.roles$.pipe(
     takeUntil(this.stop$)
     ).subscribe((roles: any) => {
      if (!roles) {
        this.viewContainerRef.clear();
      }
      if (roles.includes(this.arpaHasRole)) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    });*/
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
