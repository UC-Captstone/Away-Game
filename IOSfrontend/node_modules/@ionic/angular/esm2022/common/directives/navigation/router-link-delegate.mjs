import { Directive, HostListener, Input, Optional } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../providers/nav-controller";
import * as i3 from "@angular/router";
/**
 * Adds support for Ionic routing directions and animations to the base Angular router link directive.
 *
 * When the router link is clicked, the directive will assign the direction and
 * animation so that the routing integration will transition correctly.
 */
class RouterLinkDelegateDirective {
    locationStrategy;
    navCtrl;
    elementRef;
    router;
    routerLink;
    routerDirection = 'forward';
    routerAnimation;
    constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
        this.locationStrategy = locationStrategy;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
        this.router = router;
        this.routerLink = routerLink;
    }
    ngOnInit() {
        this.updateTargetUrlAndHref();
        this.updateTabindex();
    }
    ngOnChanges() {
        this.updateTargetUrlAndHref();
    }
    /**
     * The `tabindex` is set to `0` by default on the host element when
     * the `routerLink` directive is used. This causes issues with Ionic
     * components that wrap an `a` or `button` element, such as `ion-item`.
     * See issue https://github.com/angular/angular/issues/28345
     *
     * This method removes the `tabindex` attribute from the host element
     * to allow the Ionic component to manage the focus state correctly.
     */
    updateTabindex() {
        // Ionic components that render a native anchor or button element
        const ionicComponents = [
            'ION-BACK-BUTTON',
            'ION-BREADCRUMB',
            'ION-BUTTON',
            'ION-CARD',
            'ION-FAB-BUTTON',
            'ION-ITEM',
            'ION-ITEM-OPTION',
            'ION-MENU-BUTTON',
            'ION-SEGMENT-BUTTON',
            'ION-TAB-BUTTON',
        ];
        const hostElement = this.elementRef.nativeElement;
        if (ionicComponents.includes(hostElement.tagName)) {
            if (hostElement.getAttribute('tabindex') === '0') {
                hostElement.removeAttribute('tabindex');
            }
        }
    }
    updateTargetUrlAndHref() {
        if (this.routerLink?.urlTree) {
            const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
            this.elementRef.nativeElement.href = href;
        }
    }
    /**
     * @internal
     */
    onClick(ev) {
        this.navCtrl.setDirection(this.routerDirection, undefined, undefined, this.routerAnimation);
        /**
         * This prevents the browser from
         * performing a page reload when pressing
         * an Ionic component with routerLink.
         * The page reload interferes with routing
         * and causes ion-back-button to disappear
         * since the local history is wiped on reload.
         */
        ev.preventDefault();
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkDelegateDirective, deps: [{ token: i1.LocationStrategy }, { token: i2.NavController }, { token: i0.ElementRef }, { token: i3.Router }, { token: i3.RouterLink, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: RouterLinkDelegateDirective, selector: ":not(a):not(area)[routerLink]", inputs: { routerDirection: "routerDirection", routerAnimation: "routerAnimation" }, host: { listeners: { "click": "onClick($event)" } }, usesOnChanges: true, ngImport: i0 });
}
export { RouterLinkDelegateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkDelegateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: ':not(a):not(area)[routerLink]',
                }]
        }], ctorParameters: function () { return [{ type: i1.LocationStrategy }, { type: i2.NavController }, { type: i0.ElementRef }, { type: i3.Router }, { type: i3.RouterLink, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { routerDirection: [{
                type: Input
            }], routerAnimation: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
class RouterLinkWithHrefDelegateDirective {
    locationStrategy;
    navCtrl;
    elementRef;
    router;
    routerLink;
    routerDirection = 'forward';
    routerAnimation;
    constructor(locationStrategy, navCtrl, elementRef, router, routerLink) {
        this.locationStrategy = locationStrategy;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
        this.router = router;
        this.routerLink = routerLink;
    }
    ngOnInit() {
        this.updateTargetUrlAndHref();
    }
    ngOnChanges() {
        this.updateTargetUrlAndHref();
    }
    updateTargetUrlAndHref() {
        if (this.routerLink?.urlTree) {
            const href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.routerLink.urlTree));
            this.elementRef.nativeElement.href = href;
        }
    }
    /**
     * @internal
     */
    onClick() {
        this.navCtrl.setDirection(this.routerDirection, undefined, undefined, this.routerAnimation);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkWithHrefDelegateDirective, deps: [{ token: i1.LocationStrategy }, { token: i2.NavController }, { token: i0.ElementRef }, { token: i3.Router }, { token: i3.RouterLink, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: RouterLinkWithHrefDelegateDirective, selector: "a[routerLink],area[routerLink]", inputs: { routerDirection: "routerDirection", routerAnimation: "routerAnimation" }, host: { listeners: { "click": "onClick()" } }, usesOnChanges: true, ngImport: i0 });
}
export { RouterLinkWithHrefDelegateDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RouterLinkWithHrefDelegateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[routerLink],area[routerLink]',
                }]
        }], ctorParameters: function () { return [{ type: i1.LocationStrategy }, { type: i2.NavController }, { type: i0.ElementRef }, { type: i3.Router }, { type: i3.RouterLink, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { routerDirection: [{
                type: Input
            }], routerAnimation: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLWxpbmstZGVsZWdhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9yb3V0ZXItbGluay1kZWxlZ2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWlDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFNeEc7Ozs7O0dBS0c7QUFDSCxNQUdhLDJCQUEyQjtJQVE1QjtJQUNBO0lBQ0E7SUFDQTtJQUNZO0lBVnRCLGVBQWUsR0FBb0IsU0FBUyxDQUFDO0lBRzdDLGVBQWUsQ0FBb0I7SUFFbkMsWUFDVSxnQkFBa0MsRUFDbEMsT0FBc0IsRUFDdEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNGLFVBQXVCO1FBSm5DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDRixlQUFVLEdBQVYsVUFBVSxDQUFhO0lBQzFDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ssY0FBYztRQUNwQixpRUFBaUU7UUFDakUsTUFBTSxlQUFlLEdBQUc7WUFDdEIsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixVQUFVO1lBQ1YsaUJBQWlCO1lBQ2pCLGlCQUFpQjtZQUNqQixvQkFBb0I7WUFDcEIsZ0JBQWdCO1NBQ2pCLENBQUM7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUVsRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pELElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ2hELFdBQVcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDekM7U0FDRjtJQUNILENBQUM7SUFFTyxzQkFBc0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRTtZQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFFSCxPQUFPLENBQUMsRUFBVztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTVGOzs7Ozs7O1dBT0c7UUFDSCxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdEIsQ0FBQzsySEEvRVUsMkJBQTJCOytHQUEzQiwyQkFBMkI7O1NBQTNCLDJCQUEyQjs0RkFBM0IsMkJBQTJCO2tCQUh2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwrQkFBK0I7aUJBQzFDOzswQkFhSSxRQUFROzRDQVZYLGVBQWU7c0JBRGQsS0FBSztnQkFJTixlQUFlO3NCQURkLEtBQUs7Z0JBK0ROLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBZ0JuQyxNQUdhLG1DQUFtQztJQVFwQztJQUNBO0lBQ0E7SUFDQTtJQUNZO0lBVnRCLGVBQWUsR0FBb0IsU0FBUyxDQUFDO0lBRzdDLGVBQWUsQ0FBb0I7SUFFbkMsWUFDVSxnQkFBa0MsRUFDbEMsT0FBc0IsRUFDdEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNGLFVBQXVCO1FBSm5DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDRixlQUFVLEdBQVYsVUFBVSxDQUFhO0lBQzFDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBRUgsT0FBTztRQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUYsQ0FBQzsySEFwQ1UsbUNBQW1DOytHQUFuQyxtQ0FBbUM7O1NBQW5DLG1DQUFtQzs0RkFBbkMsbUNBQW1DO2tCQUgvQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7aUJBQzNDOzswQkFhSSxRQUFROzRDQVZYLGVBQWU7c0JBRGQsS0FBSztnQkFJTixlQUFlO3NCQURkLEtBQUs7Z0JBOEJOLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIE9uSW5pdCwgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJMaW5rIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB0eXBlIHsgQW5pbWF0aW9uQnVpbGRlciwgUm91dGVyRGlyZWN0aW9uIH0gZnJvbSAnQGlvbmljL2NvcmUvY29tcG9uZW50cyc7XG5cbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvbmF2LWNvbnRyb2xsZXInO1xuXG4vKipcbiAqIEFkZHMgc3VwcG9ydCBmb3IgSW9uaWMgcm91dGluZyBkaXJlY3Rpb25zIGFuZCBhbmltYXRpb25zIHRvIHRoZSBiYXNlIEFuZ3VsYXIgcm91dGVyIGxpbmsgZGlyZWN0aXZlLlxuICpcbiAqIFdoZW4gdGhlIHJvdXRlciBsaW5rIGlzIGNsaWNrZWQsIHRoZSBkaXJlY3RpdmUgd2lsbCBhc3NpZ24gdGhlIGRpcmVjdGlvbiBhbmRcbiAqIGFuaW1hdGlvbiBzbyB0aGF0IHRoZSByb3V0aW5nIGludGVncmF0aW9uIHdpbGwgdHJhbnNpdGlvbiBjb3JyZWN0bHkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJzpub3QoYSk6bm90KGFyZWEpW3JvdXRlckxpbmtdJyxcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyTGlua0RlbGVnYXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICByb3V0ZXJEaXJlY3Rpb246IFJvdXRlckRpcmVjdGlvbiA9ICdmb3J3YXJkJztcblxuICBASW5wdXQoKVxuICByb3V0ZXJBbmltYXRpb24/OiBBbmltYXRpb25CdWlsZGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSxcbiAgICBwcml2YXRlIG5hdkN0cmw6IE5hdkNvbnRyb2xsZXIsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXJMaW5rPzogUm91dGVyTGlua1xuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XG4gICAgdGhpcy51cGRhdGVUYWJpbmRleCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGB0YWJpbmRleGAgaXMgc2V0IHRvIGAwYCBieSBkZWZhdWx0IG9uIHRoZSBob3N0IGVsZW1lbnQgd2hlblxuICAgKiB0aGUgYHJvdXRlckxpbmtgIGRpcmVjdGl2ZSBpcyB1c2VkLiBUaGlzIGNhdXNlcyBpc3N1ZXMgd2l0aCBJb25pY1xuICAgKiBjb21wb25lbnRzIHRoYXQgd3JhcCBhbiBgYWAgb3IgYGJ1dHRvbmAgZWxlbWVudCwgc3VjaCBhcyBgaW9uLWl0ZW1gLlxuICAgKiBTZWUgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjgzNDVcbiAgICpcbiAgICogVGhpcyBtZXRob2QgcmVtb3ZlcyB0aGUgYHRhYmluZGV4YCBhdHRyaWJ1dGUgZnJvbSB0aGUgaG9zdCBlbGVtZW50XG4gICAqIHRvIGFsbG93IHRoZSBJb25pYyBjb21wb25lbnQgdG8gbWFuYWdlIHRoZSBmb2N1cyBzdGF0ZSBjb3JyZWN0bHkuXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVRhYmluZGV4KCkge1xuICAgIC8vIElvbmljIGNvbXBvbmVudHMgdGhhdCByZW5kZXIgYSBuYXRpdmUgYW5jaG9yIG9yIGJ1dHRvbiBlbGVtZW50XG4gICAgY29uc3QgaW9uaWNDb21wb25lbnRzID0gW1xuICAgICAgJ0lPTi1CQUNLLUJVVFRPTicsXG4gICAgICAnSU9OLUJSRUFEQ1JVTUInLFxuICAgICAgJ0lPTi1CVVRUT04nLFxuICAgICAgJ0lPTi1DQVJEJyxcbiAgICAgICdJT04tRkFCLUJVVFRPTicsXG4gICAgICAnSU9OLUlURU0nLFxuICAgICAgJ0lPTi1JVEVNLU9QVElPTicsXG4gICAgICAnSU9OLU1FTlUtQlVUVE9OJyxcbiAgICAgICdJT04tU0VHTUVOVC1CVVRUT04nLFxuICAgICAgJ0lPTi1UQUItQlVUVE9OJyxcbiAgICBdO1xuICAgIGNvbnN0IGhvc3RFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoaW9uaWNDb21wb25lbnRzLmluY2x1ZGVzKGhvc3RFbGVtZW50LnRhZ05hbWUpKSB7XG4gICAgICBpZiAoaG9zdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID09PSAnMCcpIHtcbiAgICAgICAgaG9zdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpIHtcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rPy51cmxUcmVlKSB7XG4gICAgICBjb25zdCBocmVmID0gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnByZXBhcmVFeHRlcm5hbFVybCh0aGlzLnJvdXRlci5zZXJpYWxpemVVcmwodGhpcy5yb3V0ZXJMaW5rLnVybFRyZWUpKTtcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmhyZWYgPSBocmVmO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldjogVUlFdmVudCk6IHZvaWQge1xuICAgIHRoaXMubmF2Q3RybC5zZXREaXJlY3Rpb24odGhpcy5yb3V0ZXJEaXJlY3Rpb24sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLnJvdXRlckFuaW1hdGlvbik7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHByZXZlbnRzIHRoZSBicm93c2VyIGZyb21cbiAgICAgKiBwZXJmb3JtaW5nIGEgcGFnZSByZWxvYWQgd2hlbiBwcmVzc2luZ1xuICAgICAqIGFuIElvbmljIGNvbXBvbmVudCB3aXRoIHJvdXRlckxpbmsuXG4gICAgICogVGhlIHBhZ2UgcmVsb2FkIGludGVyZmVyZXMgd2l0aCByb3V0aW5nXG4gICAgICogYW5kIGNhdXNlcyBpb24tYmFjay1idXR0b24gdG8gZGlzYXBwZWFyXG4gICAgICogc2luY2UgdGhlIGxvY2FsIGhpc3RvcnkgaXMgd2lwZWQgb24gcmVsb2FkLlxuICAgICAqL1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYVtyb3V0ZXJMaW5rXSxhcmVhW3JvdXRlckxpbmtdJyxcbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyTGlua1dpdGhIcmVmRGVsZWdhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIHJvdXRlckRpcmVjdGlvbjogUm91dGVyRGlyZWN0aW9uID0gJ2ZvcndhcmQnO1xuXG4gIEBJbnB1dCgpXG4gIHJvdXRlckFuaW1hdGlvbj86IEFuaW1hdGlvbkJ1aWxkZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5LFxuICAgIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlcixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlckxpbms/OiBSb3V0ZXJMaW5rXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlVGFyZ2V0VXJsQW5kSHJlZigpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCkge1xuICAgIGlmICh0aGlzLnJvdXRlckxpbms/LnVybFRyZWUpIHtcbiAgICAgIGNvbnN0IGhyZWYgPSB0aGlzLmxvY2F0aW9uU3RyYXRlZ3kucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLnNlcmlhbGl6ZVVybCh0aGlzLnJvdXRlckxpbmsudXJsVHJlZSkpO1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaHJlZiA9IGhyZWY7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMubmF2Q3RybC5zZXREaXJlY3Rpb24odGhpcy5yb3V0ZXJEaXJlY3Rpb24sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLnJvdXRlckFuaW1hdGlvbik7XG4gIH1cbn1cbiJdfQ==