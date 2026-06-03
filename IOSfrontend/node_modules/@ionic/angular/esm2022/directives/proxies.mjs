import { __decorate } from "tslib";
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';
import * as i0 from "@angular/core";
let IonAccordion = class IonAccordion {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAccordion, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonAccordion, selector: "ion-accordion", inputs: { disabled: "disabled", mode: "mode", readonly: "readonly", toggleIcon: "toggleIcon", toggleIconSlot: "toggleIconSlot", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonAccordion = __decorate([
    ProxyCmp({
        inputs: ['disabled', 'mode', 'readonly', 'toggleIcon', 'toggleIconSlot', 'value']
    })
], IonAccordion);
export { IonAccordion };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAccordion, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-accordion',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['disabled', 'mode', 'readonly', 'toggleIcon', 'toggleIconSlot', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonAccordionGroup = class IonAccordionGroup {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAccordionGroup, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonAccordionGroup, selector: "ion-accordion-group", inputs: { animated: "animated", disabled: "disabled", expand: "expand", mode: "mode", multiple: "multiple", readonly: "readonly", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonAccordionGroup = __decorate([
    ProxyCmp({
        inputs: ['animated', 'disabled', 'expand', 'mode', 'multiple', 'readonly', 'value']
    })
], IonAccordionGroup);
export { IonAccordionGroup };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAccordionGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-accordion-group',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'disabled', 'expand', 'mode', 'multiple', 'readonly', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonActionSheet = class IonActionSheet {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionActionSheetDidPresent', 'ionActionSheetWillPresent', 'ionActionSheetWillDismiss', 'ionActionSheetDidDismiss', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonActionSheet, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonActionSheet, selector: "ion-action-sheet", inputs: { animated: "animated", backdropDismiss: "backdropDismiss", buttons: "buttons", cssClass: "cssClass", enterAnimation: "enterAnimation", header: "header", htmlAttributes: "htmlAttributes", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", mode: "mode", subHeader: "subHeader", translucent: "translucent", trigger: "trigger" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonActionSheet = __decorate([
    ProxyCmp({
        inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'isOpen', 'keyboardClose', 'leaveAnimation', 'mode', 'subHeader', 'translucent', 'trigger'],
        methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
    })
], IonActionSheet);
export { IonActionSheet };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonActionSheet, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-action-sheet',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'isOpen', 'keyboardClose', 'leaveAnimation', 'mode', 'subHeader', 'translucent', 'trigger'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonAlert = class IonAlert {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionAlertDidPresent', 'ionAlertWillPresent', 'ionAlertWillDismiss', 'ionAlertDidDismiss', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAlert, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonAlert, selector: "ion-alert", inputs: { animated: "animated", backdropDismiss: "backdropDismiss", buttons: "buttons", cssClass: "cssClass", enterAnimation: "enterAnimation", header: "header", htmlAttributes: "htmlAttributes", inputs: "inputs", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", message: "message", mode: "mode", subHeader: "subHeader", translucent: "translucent", trigger: "trigger" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonAlert = __decorate([
    ProxyCmp({
        inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'inputs', 'isOpen', 'keyboardClose', 'leaveAnimation', 'message', 'mode', 'subHeader', 'translucent', 'trigger'],
        methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
    })
], IonAlert);
export { IonAlert };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAlert, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-alert',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'inputs', 'isOpen', 'keyboardClose', 'leaveAnimation', 'message', 'mode', 'subHeader', 'translucent', 'trigger'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonApp = class IonApp {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonApp, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonApp, selector: "ion-app", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonApp = __decorate([
    ProxyCmp({
        methods: ['setFocus']
    })
], IonApp);
export { IonApp };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonApp, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-app',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: [],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonAvatar = class IonAvatar {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAvatar, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonAvatar, selector: "ion-avatar", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonAvatar = __decorate([
    ProxyCmp({})
], IonAvatar);
export { IonAvatar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonAvatar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-avatar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: [],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonBackdrop = class IonBackdrop {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionBackdropTap']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackdrop, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonBackdrop, selector: "ion-backdrop", inputs: { stopPropagation: "stopPropagation", tappable: "tappable", visible: "visible" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonBackdrop = __decorate([
    ProxyCmp({
        inputs: ['stopPropagation', 'tappable', 'visible']
    })
], IonBackdrop);
export { IonBackdrop };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBackdrop, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-backdrop',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['stopPropagation', 'tappable', 'visible'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonBadge = class IonBadge {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBadge, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonBadge, selector: "ion-badge", inputs: { color: "color", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonBadge = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode']
    })
], IonBadge);
export { IonBadge };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBadge, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-badge',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonBreadcrumb = class IonBreadcrumb {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBreadcrumb, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonBreadcrumb, selector: "ion-breadcrumb", inputs: { active: "active", color: "color", disabled: "disabled", download: "download", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", separator: "separator", target: "target" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonBreadcrumb = __decorate([
    ProxyCmp({
        inputs: ['active', 'color', 'disabled', 'download', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'separator', 'target']
    })
], IonBreadcrumb);
export { IonBreadcrumb };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBreadcrumb, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-breadcrumb',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['active', 'color', 'disabled', 'download', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'separator', 'target'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonBreadcrumbs = class IonBreadcrumbs {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionCollapsedClick']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBreadcrumbs, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonBreadcrumbs, selector: "ion-breadcrumbs", inputs: { color: "color", itemsAfterCollapse: "itemsAfterCollapse", itemsBeforeCollapse: "itemsBeforeCollapse", maxItems: "maxItems", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonBreadcrumbs = __decorate([
    ProxyCmp({
        inputs: ['color', 'itemsAfterCollapse', 'itemsBeforeCollapse', 'maxItems', 'mode']
    })
], IonBreadcrumbs);
export { IonBreadcrumbs };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonBreadcrumbs, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-breadcrumbs',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'itemsAfterCollapse', 'itemsBeforeCollapse', 'maxItems', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonButton = class IonButton {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonButton, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonButton, selector: "ion-button", inputs: { buttonType: "buttonType", color: "color", disabled: "disabled", download: "download", expand: "expand", fill: "fill", form: "form", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", shape: "shape", size: "size", strong: "strong", target: "target", type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonButton = __decorate([
    ProxyCmp({
        inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'form', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'shape', 'size', 'strong', 'target', 'type']
    })
], IonButton);
export { IonButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'form', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'shape', 'size', 'strong', 'target', 'type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonButtons = class IonButtons {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonButtons, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonButtons, selector: "ion-buttons", inputs: { collapse: "collapse" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonButtons = __decorate([
    ProxyCmp({
        inputs: ['collapse']
    })
], IonButtons);
export { IonButtons };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonButtons, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-buttons',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['collapse'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonCard = class IonCard {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCard, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCard, selector: "ion-card", inputs: { button: "button", color: "color", disabled: "disabled", download: "download", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", target: "target", type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCard = __decorate([
    ProxyCmp({
        inputs: ['button', 'color', 'disabled', 'download', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'target', 'type']
    })
], IonCard);
export { IonCard };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCard, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-card',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['button', 'color', 'disabled', 'download', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'target', 'type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonCardContent = class IonCardContent {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardContent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCardContent, selector: "ion-card-content", inputs: { mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCardContent = __decorate([
    ProxyCmp({
        inputs: ['mode']
    })
], IonCardContent);
export { IonCardContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-card-content',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonCardHeader = class IonCardHeader {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCardHeader, selector: "ion-card-header", inputs: { color: "color", mode: "mode", translucent: "translucent" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCardHeader = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode', 'translucent']
    })
], IonCardHeader);
export { IonCardHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-card-header',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode', 'translucent'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonCardSubtitle = class IonCardSubtitle {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardSubtitle, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCardSubtitle, selector: "ion-card-subtitle", inputs: { color: "color", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCardSubtitle = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode']
    })
], IonCardSubtitle);
export { IonCardSubtitle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardSubtitle, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-card-subtitle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonCardTitle = class IonCardTitle {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardTitle, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCardTitle, selector: "ion-card-title", inputs: { color: "color", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCardTitle = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode']
    })
], IonCardTitle);
export { IonCardTitle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCardTitle, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-card-title',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonCheckbox = class IonCheckbox {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCheckbox, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCheckbox, selector: "ion-checkbox", inputs: { alignment: "alignment", checked: "checked", color: "color", disabled: "disabled", errorText: "errorText", helperText: "helperText", indeterminate: "indeterminate", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", required: "required", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCheckbox = __decorate([
    ProxyCmp({
        inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'indeterminate', 'justify', 'labelPlacement', 'mode', 'name', 'required', 'value']
    })
], IonCheckbox);
export { IonCheckbox };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-checkbox',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['alignment', 'checked', 'color', 'disabled', 'errorText', 'helperText', 'indeterminate', 'justify', 'labelPlacement', 'mode', 'name', 'required', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonChip = class IonChip {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonChip, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonChip, selector: "ion-chip", inputs: { color: "color", disabled: "disabled", mode: "mode", outline: "outline" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonChip = __decorate([
    ProxyCmp({
        inputs: ['color', 'disabled', 'mode', 'outline']
    })
], IonChip);
export { IonChip };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonChip, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-chip',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'disabled', 'mode', 'outline'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonCol = class IonCol {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCol, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonCol, selector: "ion-col", inputs: { offset: "offset", offsetLg: "offsetLg", offsetMd: "offsetMd", offsetSm: "offsetSm", offsetXl: "offsetXl", offsetXs: "offsetXs", pull: "pull", pullLg: "pullLg", pullMd: "pullMd", pullSm: "pullSm", pullXl: "pullXl", pullXs: "pullXs", push: "push", pushLg: "pushLg", pushMd: "pushMd", pushSm: "pushSm", pushXl: "pushXl", pushXs: "pushXs", size: "size", sizeLg: "sizeLg", sizeMd: "sizeMd", sizeSm: "sizeSm", sizeXl: "sizeXl", sizeXs: "sizeXs" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonCol = __decorate([
    ProxyCmp({
        inputs: ['offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'pull', 'pullLg', 'pullMd', 'pullSm', 'pullXl', 'pullXs', 'push', 'pushLg', 'pushMd', 'pushSm', 'pushXl', 'pushXs', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs']
    })
], IonCol);
export { IonCol };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonCol, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-col',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'pull', 'pullLg', 'pullMd', 'pullSm', 'pullXl', 'pullXs', 'push', 'pushLg', 'pushMd', 'pushSm', 'pushXl', 'pushXs', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonContent = class IonContent {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionScrollStart', 'ionScroll', 'ionScrollEnd']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonContent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonContent, selector: "ion-content", inputs: { color: "color", fixedSlotPlacement: "fixedSlotPlacement", forceOverscroll: "forceOverscroll", fullscreen: "fullscreen", scrollEvents: "scrollEvents", scrollX: "scrollX", scrollY: "scrollY" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonContent = __decorate([
    ProxyCmp({
        inputs: ['color', 'fixedSlotPlacement', 'forceOverscroll', 'fullscreen', 'scrollEvents', 'scrollX', 'scrollY'],
        methods: ['getScrollElement', 'scrollToTop', 'scrollToBottom', 'scrollByPoint', 'scrollToPoint']
    })
], IonContent);
export { IonContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-content',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'fixedSlotPlacement', 'forceOverscroll', 'fullscreen', 'scrollEvents', 'scrollX', 'scrollY'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonDatetime = class IonDatetime {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionCancel', 'ionChange', 'ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonDatetime, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonDatetime, selector: "ion-datetime", inputs: { cancelText: "cancelText", clearText: "clearText", color: "color", dayValues: "dayValues", disabled: "disabled", doneText: "doneText", firstDayOfWeek: "firstDayOfWeek", formatOptions: "formatOptions", highlightedDates: "highlightedDates", hourCycle: "hourCycle", hourValues: "hourValues", isDateEnabled: "isDateEnabled", locale: "locale", max: "max", min: "min", minuteValues: "minuteValues", mode: "mode", monthValues: "monthValues", multiple: "multiple", name: "name", preferWheel: "preferWheel", presentation: "presentation", readonly: "readonly", showAdjacentDays: "showAdjacentDays", showClearButton: "showClearButton", showDefaultButtons: "showDefaultButtons", showDefaultTimeLabel: "showDefaultTimeLabel", showDefaultTitle: "showDefaultTitle", size: "size", titleSelectedDatesFormatter: "titleSelectedDatesFormatter", value: "value", yearValues: "yearValues" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonDatetime = __decorate([
    ProxyCmp({
        inputs: ['cancelText', 'clearText', 'color', 'dayValues', 'disabled', 'doneText', 'firstDayOfWeek', 'formatOptions', 'highlightedDates', 'hourCycle', 'hourValues', 'isDateEnabled', 'locale', 'max', 'min', 'minuteValues', 'mode', 'monthValues', 'multiple', 'name', 'preferWheel', 'presentation', 'readonly', 'showAdjacentDays', 'showClearButton', 'showDefaultButtons', 'showDefaultTimeLabel', 'showDefaultTitle', 'size', 'titleSelectedDatesFormatter', 'value', 'yearValues'],
        methods: ['confirm', 'reset', 'cancel']
    })
], IonDatetime);
export { IonDatetime };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonDatetime, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-datetime',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['cancelText', 'clearText', 'color', 'dayValues', 'disabled', 'doneText', 'firstDayOfWeek', 'formatOptions', 'highlightedDates', 'hourCycle', 'hourValues', 'isDateEnabled', 'locale', 'max', 'min', 'minuteValues', 'mode', 'monthValues', 'multiple', 'name', 'preferWheel', 'presentation', 'readonly', 'showAdjacentDays', 'showClearButton', 'showDefaultButtons', 'showDefaultTimeLabel', 'showDefaultTitle', 'size', 'titleSelectedDatesFormatter', 'value', 'yearValues'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonDatetimeButton = class IonDatetimeButton {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonDatetimeButton, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonDatetimeButton, selector: "ion-datetime-button", inputs: { color: "color", datetime: "datetime", disabled: "disabled", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonDatetimeButton = __decorate([
    ProxyCmp({
        inputs: ['color', 'datetime', 'disabled', 'mode']
    })
], IonDatetimeButton);
export { IonDatetimeButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonDatetimeButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-datetime-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'datetime', 'disabled', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonFab = class IonFab {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFab, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonFab, selector: "ion-fab", inputs: { activated: "activated", edge: "edge", horizontal: "horizontal", vertical: "vertical" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonFab = __decorate([
    ProxyCmp({
        inputs: ['activated', 'edge', 'horizontal', 'vertical'],
        methods: ['close']
    })
], IonFab);
export { IonFab };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFab, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-fab',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['activated', 'edge', 'horizontal', 'vertical'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonFabButton = class IonFabButton {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFabButton, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonFabButton, selector: "ion-fab-button", inputs: { activated: "activated", closeIcon: "closeIcon", color: "color", disabled: "disabled", download: "download", href: "href", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", show: "show", size: "size", target: "target", translucent: "translucent", type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonFabButton = __decorate([
    ProxyCmp({
        inputs: ['activated', 'closeIcon', 'color', 'disabled', 'download', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'show', 'size', 'target', 'translucent', 'type']
    })
], IonFabButton);
export { IonFabButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFabButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-fab-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['activated', 'closeIcon', 'color', 'disabled', 'download', 'href', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'show', 'size', 'target', 'translucent', 'type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonFabList = class IonFabList {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFabList, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonFabList, selector: "ion-fab-list", inputs: { activated: "activated", side: "side" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonFabList = __decorate([
    ProxyCmp({
        inputs: ['activated', 'side']
    })
], IonFabList);
export { IonFabList };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFabList, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-fab-list',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['activated', 'side'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonFooter = class IonFooter {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFooter, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonFooter, selector: "ion-footer", inputs: { collapse: "collapse", mode: "mode", translucent: "translucent" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonFooter = __decorate([
    ProxyCmp({
        inputs: ['collapse', 'mode', 'translucent']
    })
], IonFooter);
export { IonFooter };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonFooter, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-footer',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['collapse', 'mode', 'translucent'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonGrid = class IonGrid {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonGrid, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonGrid, selector: "ion-grid", inputs: { fixed: "fixed" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonGrid = __decorate([
    ProxyCmp({
        inputs: ['fixed']
    })
], IonGrid);
export { IonGrid };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonGrid, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-grid',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['fixed'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonHeader = class IonHeader {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonHeader, selector: "ion-header", inputs: { collapse: "collapse", mode: "mode", translucent: "translucent" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonHeader = __decorate([
    ProxyCmp({
        inputs: ['collapse', 'mode', 'translucent']
    })
], IonHeader);
export { IonHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-header',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['collapse', 'mode', 'translucent'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonIcon = class IonIcon {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonIcon, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonIcon, selector: "ion-icon", inputs: { color: "color", flipRtl: "flipRtl", icon: "icon", ios: "ios", lazy: "lazy", md: "md", mode: "mode", name: "name", sanitize: "sanitize", size: "size", src: "src" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonIcon = __decorate([
    ProxyCmp({
        inputs: ['color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'sanitize', 'size', 'src']
    })
], IonIcon);
export { IonIcon };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-icon',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'sanitize', 'size', 'src'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonImg = class IonImg {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionImgWillLoad', 'ionImgDidLoad', 'ionError']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonImg, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonImg, selector: "ion-img", inputs: { alt: "alt", src: "src" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonImg = __decorate([
    ProxyCmp({
        inputs: ['alt', 'src']
    })
], IonImg);
export { IonImg };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonImg, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-img',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['alt', 'src'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonInfiniteScroll = class IonInfiniteScroll {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionInfinite']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInfiniteScroll, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonInfiniteScroll, selector: "ion-infinite-scroll", inputs: { disabled: "disabled", position: "position", threshold: "threshold" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonInfiniteScroll = __decorate([
    ProxyCmp({
        inputs: ['disabled', 'position', 'threshold'],
        methods: ['complete']
    })
], IonInfiniteScroll);
export { IonInfiniteScroll };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInfiniteScroll, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-infinite-scroll',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['disabled', 'position', 'threshold'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonInfiniteScrollContent = class IonInfiniteScrollContent {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInfiniteScrollContent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonInfiniteScrollContent, selector: "ion-infinite-scroll-content", inputs: { loadingSpinner: "loadingSpinner", loadingText: "loadingText" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonInfiniteScrollContent = __decorate([
    ProxyCmp({
        inputs: ['loadingSpinner', 'loadingText']
    })
], IonInfiniteScrollContent);
export { IonInfiniteScrollContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInfiniteScrollContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-infinite-scroll-content',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['loadingSpinner', 'loadingText'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonInput = class IonInput {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionBlur', 'ionFocus']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInput, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonInput, selector: "ion-input", inputs: { autocapitalize: "autocapitalize", autocomplete: "autocomplete", autocorrect: "autocorrect", autofocus: "autofocus", clearInput: "clearInput", clearInputIcon: "clearInputIcon", clearOnEdit: "clearOnEdit", color: "color", counter: "counter", counterFormatter: "counterFormatter", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", errorText: "errorText", fill: "fill", helperText: "helperText", inputmode: "inputmode", label: "label", labelPlacement: "labelPlacement", max: "max", maxlength: "maxlength", min: "min", minlength: "minlength", mode: "mode", multiple: "multiple", name: "name", pattern: "pattern", placeholder: "placeholder", readonly: "readonly", required: "required", shape: "shape", spellcheck: "spellcheck", step: "step", type: "type", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonInput = __decorate([
    ProxyCmp({
        inputs: ['autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearInputIcon', 'clearOnEdit', 'color', 'counter', 'counterFormatter', 'debounce', 'disabled', 'enterkeyhint', 'errorText', 'fill', 'helperText', 'inputmode', 'label', 'labelPlacement', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'shape', 'spellcheck', 'step', 'type', 'value'],
        methods: ['setFocus', 'getInputElement']
    })
], IonInput);
export { IonInput };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInput, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-input',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearInputIcon', 'clearOnEdit', 'color', 'counter', 'counterFormatter', 'debounce', 'disabled', 'enterkeyhint', 'errorText', 'fill', 'helperText', 'inputmode', 'label', 'labelPlacement', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'shape', 'spellcheck', 'step', 'type', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonInputOtp = class IonInputOtp {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionComplete', 'ionBlur', 'ionFocus']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInputOtp, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonInputOtp, selector: "ion-input-otp", inputs: { autocapitalize: "autocapitalize", color: "color", disabled: "disabled", fill: "fill", inputmode: "inputmode", length: "length", pattern: "pattern", readonly: "readonly", separators: "separators", shape: "shape", size: "size", type: "type", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonInputOtp = __decorate([
    ProxyCmp({
        inputs: ['autocapitalize', 'color', 'disabled', 'fill', 'inputmode', 'length', 'pattern', 'readonly', 'separators', 'shape', 'size', 'type', 'value'],
        methods: ['setFocus']
    })
], IonInputOtp);
export { IonInputOtp };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInputOtp, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-input-otp',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['autocapitalize', 'color', 'disabled', 'fill', 'inputmode', 'length', 'pattern', 'readonly', 'separators', 'shape', 'size', 'type', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonInputPasswordToggle = class IonInputPasswordToggle {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInputPasswordToggle, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonInputPasswordToggle, selector: "ion-input-password-toggle", inputs: { color: "color", hideIcon: "hideIcon", mode: "mode", showIcon: "showIcon" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonInputPasswordToggle = __decorate([
    ProxyCmp({
        inputs: ['color', 'hideIcon', 'mode', 'showIcon']
    })
], IonInputPasswordToggle);
export { IonInputPasswordToggle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonInputPasswordToggle, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-input-password-toggle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'hideIcon', 'mode', 'showIcon'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonItem = class IonItem {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItem, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonItem, selector: "ion-item", inputs: { button: "button", color: "color", detail: "detail", detailIcon: "detailIcon", disabled: "disabled", download: "download", href: "href", lines: "lines", mode: "mode", rel: "rel", routerAnimation: "routerAnimation", routerDirection: "routerDirection", target: "target", type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonItem = __decorate([
    ProxyCmp({
        inputs: ['button', 'color', 'detail', 'detailIcon', 'disabled', 'download', 'href', 'lines', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'target', 'type']
    })
], IonItem);
export { IonItem };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-item',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['button', 'color', 'detail', 'detailIcon', 'disabled', 'download', 'href', 'lines', 'mode', 'rel', 'routerAnimation', 'routerDirection', 'target', 'type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonItemDivider = class IonItemDivider {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemDivider, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonItemDivider, selector: "ion-item-divider", inputs: { color: "color", mode: "mode", sticky: "sticky" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonItemDivider = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode', 'sticky']
    })
], IonItemDivider);
export { IonItemDivider };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemDivider, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-item-divider',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode', 'sticky'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonItemGroup = class IonItemGroup {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemGroup, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonItemGroup, selector: "ion-item-group", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonItemGroup = __decorate([
    ProxyCmp({})
], IonItemGroup);
export { IonItemGroup };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-item-group',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: [],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonItemOption = class IonItemOption {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemOption, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonItemOption, selector: "ion-item-option", inputs: { color: "color", disabled: "disabled", download: "download", expandable: "expandable", href: "href", mode: "mode", rel: "rel", target: "target", type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonItemOption = __decorate([
    ProxyCmp({
        inputs: ['color', 'disabled', 'download', 'expandable', 'href', 'mode', 'rel', 'target', 'type']
    })
], IonItemOption);
export { IonItemOption };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemOption, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-item-option',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'disabled', 'download', 'expandable', 'href', 'mode', 'rel', 'target', 'type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonItemOptions = class IonItemOptions {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionSwipe']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemOptions, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonItemOptions, selector: "ion-item-options", inputs: { side: "side" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonItemOptions = __decorate([
    ProxyCmp({
        inputs: ['side']
    })
], IonItemOptions);
export { IonItemOptions };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemOptions, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-item-options',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['side'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonItemSliding = class IonItemSliding {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionDrag']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemSliding, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonItemSliding, selector: "ion-item-sliding", inputs: { disabled: "disabled" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonItemSliding = __decorate([
    ProxyCmp({
        inputs: ['disabled'],
        methods: ['getOpenAmount', 'getSlidingRatio', 'open', 'close', 'closeOpened']
    })
], IonItemSliding);
export { IonItemSliding };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonItemSliding, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-item-sliding',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['disabled'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonLabel = class IonLabel {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonLabel, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonLabel, selector: "ion-label", inputs: { color: "color", mode: "mode", position: "position" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonLabel = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode', 'position']
    })
], IonLabel);
export { IonLabel };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonLabel, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-label',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode', 'position'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonList = class IonList {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonList, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonList, selector: "ion-list", inputs: { inset: "inset", lines: "lines", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonList = __decorate([
    ProxyCmp({
        inputs: ['inset', 'lines', 'mode'],
        methods: ['closeSlidingItems']
    })
], IonList);
export { IonList };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonList, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-list',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['inset', 'lines', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonListHeader = class IonListHeader {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonListHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonListHeader, selector: "ion-list-header", inputs: { color: "color", lines: "lines", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonListHeader = __decorate([
    ProxyCmp({
        inputs: ['color', 'lines', 'mode']
    })
], IonListHeader);
export { IonListHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonListHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-list-header',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'lines', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonLoading = class IonLoading {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionLoadingDidPresent', 'ionLoadingWillPresent', 'ionLoadingWillDismiss', 'ionLoadingDidDismiss', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonLoading, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonLoading, selector: "ion-loading", inputs: { animated: "animated", backdropDismiss: "backdropDismiss", cssClass: "cssClass", duration: "duration", enterAnimation: "enterAnimation", htmlAttributes: "htmlAttributes", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", message: "message", mode: "mode", showBackdrop: "showBackdrop", spinner: "spinner", translucent: "translucent", trigger: "trigger" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonLoading = __decorate([
    ProxyCmp({
        inputs: ['animated', 'backdropDismiss', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'isOpen', 'keyboardClose', 'leaveAnimation', 'message', 'mode', 'showBackdrop', 'spinner', 'translucent', 'trigger'],
        methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
    })
], IonLoading);
export { IonLoading };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonLoading, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-loading',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'backdropDismiss', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'isOpen', 'keyboardClose', 'leaveAnimation', 'message', 'mode', 'showBackdrop', 'spinner', 'translucent', 'trigger'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonMenu = class IonMenu {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionWillOpen', 'ionWillClose', 'ionDidOpen', 'ionDidClose']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMenu, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonMenu, selector: "ion-menu", inputs: { contentId: "contentId", disabled: "disabled", maxEdgeStart: "maxEdgeStart", menuId: "menuId", side: "side", swipeGesture: "swipeGesture", type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonMenu = __decorate([
    ProxyCmp({
        inputs: ['contentId', 'disabled', 'maxEdgeStart', 'menuId', 'side', 'swipeGesture', 'type'],
        methods: ['isOpen', 'isActive', 'open', 'close', 'toggle', 'setOpen']
    })
], IonMenu);
export { IonMenu };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-menu',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['contentId', 'disabled', 'maxEdgeStart', 'menuId', 'side', 'swipeGesture', 'type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonMenuButton = class IonMenuButton {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMenuButton, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonMenuButton, selector: "ion-menu-button", inputs: { autoHide: "autoHide", color: "color", disabled: "disabled", menu: "menu", mode: "mode", type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonMenuButton = __decorate([
    ProxyCmp({
        inputs: ['autoHide', 'color', 'disabled', 'menu', 'mode', 'type']
    })
], IonMenuButton);
export { IonMenuButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMenuButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-menu-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['autoHide', 'color', 'disabled', 'menu', 'mode', 'type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonMenuToggle = class IonMenuToggle {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMenuToggle, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonMenuToggle, selector: "ion-menu-toggle", inputs: { autoHide: "autoHide", menu: "menu" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonMenuToggle = __decorate([
    ProxyCmp({
        inputs: ['autoHide', 'menu']
    })
], IonMenuToggle);
export { IonMenuToggle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonMenuToggle, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-menu-toggle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['autoHide', 'menu'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonNavLink = class IonNavLink {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNavLink, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonNavLink, selector: "ion-nav-link", inputs: { component: "component", componentProps: "componentProps", routerAnimation: "routerAnimation", routerDirection: "routerDirection" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonNavLink = __decorate([
    ProxyCmp({
        inputs: ['component', 'componentProps', 'routerAnimation', 'routerDirection']
    })
], IonNavLink);
export { IonNavLink };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNavLink, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-nav-link',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['component', 'componentProps', 'routerAnimation', 'routerDirection'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonNote = class IonNote {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNote, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonNote, selector: "ion-note", inputs: { color: "color", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonNote = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode']
    })
], IonNote);
export { IonNote };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonNote, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-note',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonPicker = class IonPicker {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPicker, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonPicker, selector: "ion-picker", inputs: { mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonPicker = __decorate([
    ProxyCmp({
        inputs: ['mode']
    })
], IonPicker);
export { IonPicker };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-picker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonPickerColumn = class IonPickerColumn {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPickerColumn, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonPickerColumn, selector: "ion-picker-column", inputs: { color: "color", disabled: "disabled", mode: "mode", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonPickerColumn = __decorate([
    ProxyCmp({
        inputs: ['color', 'disabled', 'mode', 'value'],
        methods: ['setFocus']
    })
], IonPickerColumn);
export { IonPickerColumn };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPickerColumn, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-picker-column',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'disabled', 'mode', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonPickerColumnOption = class IonPickerColumnOption {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPickerColumnOption, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonPickerColumnOption, selector: "ion-picker-column-option", inputs: { color: "color", disabled: "disabled", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonPickerColumnOption = __decorate([
    ProxyCmp({
        inputs: ['color', 'disabled', 'value']
    })
], IonPickerColumnOption);
export { IonPickerColumnOption };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPickerColumnOption, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-picker-column-option',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'disabled', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonPickerLegacy = class IonPickerLegacy {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionPickerDidPresent', 'ionPickerWillPresent', 'ionPickerWillDismiss', 'ionPickerDidDismiss', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPickerLegacy, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonPickerLegacy, selector: "ion-picker-legacy", inputs: { animated: "animated", backdropDismiss: "backdropDismiss", buttons: "buttons", columns: "columns", cssClass: "cssClass", duration: "duration", enterAnimation: "enterAnimation", htmlAttributes: "htmlAttributes", isOpen: "isOpen", keyboardClose: "keyboardClose", leaveAnimation: "leaveAnimation", mode: "mode", showBackdrop: "showBackdrop", trigger: "trigger" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonPickerLegacy = __decorate([
    ProxyCmp({
        inputs: ['animated', 'backdropDismiss', 'buttons', 'columns', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'isOpen', 'keyboardClose', 'leaveAnimation', 'mode', 'showBackdrop', 'trigger'],
        methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss', 'getColumn']
    })
], IonPickerLegacy);
export { IonPickerLegacy };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonPickerLegacy, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-picker-legacy',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'backdropDismiss', 'buttons', 'columns', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'isOpen', 'keyboardClose', 'leaveAnimation', 'mode', 'showBackdrop', 'trigger'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonProgressBar = class IonProgressBar {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonProgressBar, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonProgressBar, selector: "ion-progress-bar", inputs: { buffer: "buffer", color: "color", mode: "mode", reversed: "reversed", type: "type", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonProgressBar = __decorate([
    ProxyCmp({
        inputs: ['buffer', 'color', 'mode', 'reversed', 'type', 'value']
    })
], IonProgressBar);
export { IonProgressBar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonProgressBar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-progress-bar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['buffer', 'color', 'mode', 'reversed', 'type', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonRadio = class IonRadio {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRadio, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRadio, selector: "ion-radio", inputs: { alignment: "alignment", color: "color", disabled: "disabled", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRadio = __decorate([
    ProxyCmp({
        inputs: ['alignment', 'color', 'disabled', 'justify', 'labelPlacement', 'mode', 'name', 'value']
    })
], IonRadio);
export { IonRadio };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRadio, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-radio',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['alignment', 'color', 'disabled', 'justify', 'labelPlacement', 'mode', 'name', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonRadioGroup = class IonRadioGroup {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRadioGroup, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRadioGroup, selector: "ion-radio-group", inputs: { allowEmptySelection: "allowEmptySelection", compareWith: "compareWith", errorText: "errorText", helperText: "helperText", name: "name", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRadioGroup = __decorate([
    ProxyCmp({
        inputs: ['allowEmptySelection', 'compareWith', 'errorText', 'helperText', 'name', 'value']
    })
], IonRadioGroup);
export { IonRadioGroup };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRadioGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-radio-group',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['allowEmptySelection', 'compareWith', 'errorText', 'helperText', 'name', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonRange = class IonRange {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionInput', 'ionFocus', 'ionBlur', 'ionKnobMoveStart', 'ionKnobMoveEnd']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRange, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRange, selector: "ion-range", inputs: { activeBarStart: "activeBarStart", color: "color", debounce: "debounce", disabled: "disabled", dualKnobs: "dualKnobs", label: "label", labelPlacement: "labelPlacement", max: "max", min: "min", mode: "mode", name: "name", pin: "pin", pinFormatter: "pinFormatter", snaps: "snaps", step: "step", ticks: "ticks", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRange = __decorate([
    ProxyCmp({
        inputs: ['activeBarStart', 'color', 'debounce', 'disabled', 'dualKnobs', 'label', 'labelPlacement', 'max', 'min', 'mode', 'name', 'pin', 'pinFormatter', 'snaps', 'step', 'ticks', 'value']
    })
], IonRange);
export { IonRange };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRange, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-range',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['activeBarStart', 'color', 'debounce', 'disabled', 'dualKnobs', 'label', 'labelPlacement', 'max', 'min', 'mode', 'name', 'pin', 'pinFormatter', 'snaps', 'step', 'ticks', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonRefresher = class IonRefresher {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionRefresh', 'ionPull', 'ionStart', 'ionPullStart', 'ionPullEnd']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRefresher, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRefresher, selector: "ion-refresher", inputs: { closeDuration: "closeDuration", disabled: "disabled", mode: "mode", pullFactor: "pullFactor", pullMax: "pullMax", pullMin: "pullMin", snapbackDuration: "snapbackDuration" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRefresher = __decorate([
    ProxyCmp({
        inputs: ['closeDuration', 'disabled', 'mode', 'pullFactor', 'pullMax', 'pullMin', 'snapbackDuration'],
        methods: ['complete', 'cancel', 'getProgress']
    })
], IonRefresher);
export { IonRefresher };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRefresher, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-refresher',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['closeDuration', 'disabled', 'mode', 'pullFactor', 'pullMax', 'pullMin', 'snapbackDuration'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonRefresherContent = class IonRefresherContent {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRefresherContent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRefresherContent, selector: "ion-refresher-content", inputs: { pullingIcon: "pullingIcon", pullingText: "pullingText", refreshingSpinner: "refreshingSpinner", refreshingText: "refreshingText" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRefresherContent = __decorate([
    ProxyCmp({
        inputs: ['pullingIcon', 'pullingText', 'refreshingSpinner', 'refreshingText']
    })
], IonRefresherContent);
export { IonRefresherContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRefresherContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-refresher-content',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['pullingIcon', 'pullingText', 'refreshingSpinner', 'refreshingText'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonReorder = class IonReorder {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonReorder, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonReorder, selector: "ion-reorder", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonReorder = __decorate([
    ProxyCmp({})
], IonReorder);
export { IonReorder };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonReorder, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-reorder',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: [],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonReorderGroup = class IonReorderGroup {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionItemReorder', 'ionReorderStart', 'ionReorderMove', 'ionReorderEnd']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonReorderGroup, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonReorderGroup, selector: "ion-reorder-group", inputs: { disabled: "disabled" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonReorderGroup = __decorate([
    ProxyCmp({
        inputs: ['disabled'],
        methods: ['complete']
    })
], IonReorderGroup);
export { IonReorderGroup };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonReorderGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-reorder-group',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['disabled'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonRippleEffect = class IonRippleEffect {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRippleEffect, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRippleEffect, selector: "ion-ripple-effect", inputs: { type: "type" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRippleEffect = __decorate([
    ProxyCmp({
        inputs: ['type'],
        methods: ['addRipple']
    })
], IonRippleEffect);
export { IonRippleEffect };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRippleEffect, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-ripple-effect',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['type'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonRow = class IonRow {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRow, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonRow, selector: "ion-row", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonRow = __decorate([
    ProxyCmp({})
], IonRow);
export { IonRow };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-row',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: [],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSearchbar = class IonSearchbar {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionCancel', 'ionClear', 'ionBlur', 'ionFocus']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSearchbar, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSearchbar, selector: "ion-searchbar", inputs: { animated: "animated", autocapitalize: "autocapitalize", autocomplete: "autocomplete", autocorrect: "autocorrect", cancelButtonIcon: "cancelButtonIcon", cancelButtonText: "cancelButtonText", clearIcon: "clearIcon", color: "color", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", inputmode: "inputmode", maxlength: "maxlength", minlength: "minlength", mode: "mode", name: "name", placeholder: "placeholder", searchIcon: "searchIcon", showCancelButton: "showCancelButton", showClearButton: "showClearButton", spellcheck: "spellcheck", type: "type", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSearchbar = __decorate([
    ProxyCmp({
        inputs: ['animated', 'autocapitalize', 'autocomplete', 'autocorrect', 'cancelButtonIcon', 'cancelButtonText', 'clearIcon', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'maxlength', 'minlength', 'mode', 'name', 'placeholder', 'searchIcon', 'showCancelButton', 'showClearButton', 'spellcheck', 'type', 'value'],
        methods: ['setFocus', 'getInputElement']
    })
], IonSearchbar);
export { IonSearchbar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSearchbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-searchbar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'autocapitalize', 'autocomplete', 'autocorrect', 'cancelButtonIcon', 'cancelButtonText', 'clearIcon', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'maxlength', 'minlength', 'mode', 'name', 'placeholder', 'searchIcon', 'showCancelButton', 'showClearButton', 'spellcheck', 'type', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSegment = class IonSegment {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegment, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSegment, selector: "ion-segment", inputs: { color: "color", disabled: "disabled", mode: "mode", scrollable: "scrollable", selectOnFocus: "selectOnFocus", swipeGesture: "swipeGesture", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSegment = __decorate([
    ProxyCmp({
        inputs: ['color', 'disabled', 'mode', 'scrollable', 'selectOnFocus', 'swipeGesture', 'value']
    })
], IonSegment);
export { IonSegment };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegment, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-segment',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'disabled', 'mode', 'scrollable', 'selectOnFocus', 'swipeGesture', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSegmentButton = class IonSegmentButton {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegmentButton, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSegmentButton, selector: "ion-segment-button", inputs: { contentId: "contentId", disabled: "disabled", layout: "layout", mode: "mode", type: "type", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSegmentButton = __decorate([
    ProxyCmp({
        inputs: ['contentId', 'disabled', 'layout', 'mode', 'type', 'value']
    })
], IonSegmentButton);
export { IonSegmentButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegmentButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-segment-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['contentId', 'disabled', 'layout', 'mode', 'type', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSegmentContent = class IonSegmentContent {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegmentContent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSegmentContent, selector: "ion-segment-content", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSegmentContent = __decorate([
    ProxyCmp({})
], IonSegmentContent);
export { IonSegmentContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegmentContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-segment-content',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: [],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSegmentView = class IonSegmentView {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionSegmentViewScroll']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegmentView, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSegmentView, selector: "ion-segment-view", inputs: { disabled: "disabled", swipeGesture: "swipeGesture" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSegmentView = __decorate([
    ProxyCmp({
        inputs: ['disabled', 'swipeGesture']
    })
], IonSegmentView);
export { IonSegmentView };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSegmentView, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-segment-view',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['disabled', 'swipeGesture'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSelect = class IonSelect {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionCancel', 'ionDismiss', 'ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelect, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSelect, selector: "ion-select", inputs: { cancelText: "cancelText", color: "color", compareWith: "compareWith", disabled: "disabled", errorText: "errorText", expandedIcon: "expandedIcon", fill: "fill", helperText: "helperText", interface: "interface", interfaceOptions: "interfaceOptions", justify: "justify", label: "label", labelPlacement: "labelPlacement", mode: "mode", multiple: "multiple", name: "name", okText: "okText", placeholder: "placeholder", required: "required", selectedText: "selectedText", shape: "shape", toggleIcon: "toggleIcon", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSelect = __decorate([
    ProxyCmp({
        inputs: ['cancelText', 'color', 'compareWith', 'disabled', 'errorText', 'expandedIcon', 'fill', 'helperText', 'interface', 'interfaceOptions', 'justify', 'label', 'labelPlacement', 'mode', 'multiple', 'name', 'okText', 'placeholder', 'required', 'selectedText', 'shape', 'toggleIcon', 'value'],
        methods: ['open']
    })
], IonSelect);
export { IonSelect };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-select',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['cancelText', 'color', 'compareWith', 'disabled', 'errorText', 'expandedIcon', 'fill', 'helperText', 'interface', 'interfaceOptions', 'justify', 'label', 'labelPlacement', 'mode', 'multiple', 'name', 'okText', 'placeholder', 'required', 'selectedText', 'shape', 'toggleIcon', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSelectModal = class IonSelectModal {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelectModal, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSelectModal, selector: "ion-select-modal", inputs: { cancelText: "cancelText", header: "header", multiple: "multiple", options: "options" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSelectModal = __decorate([
    ProxyCmp({
        inputs: ['cancelText', 'header', 'multiple', 'options']
    })
], IonSelectModal);
export { IonSelectModal };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelectModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-select-modal',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['cancelText', 'header', 'multiple', 'options'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSelectOption = class IonSelectOption {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelectOption, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSelectOption, selector: "ion-select-option", inputs: { disabled: "disabled", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSelectOption = __decorate([
    ProxyCmp({
        inputs: ['disabled', 'value']
    })
], IonSelectOption);
export { IonSelectOption };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSelectOption, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-select-option',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['disabled', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSkeletonText = class IonSkeletonText {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSkeletonText, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSkeletonText, selector: "ion-skeleton-text", inputs: { animated: "animated" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSkeletonText = __decorate([
    ProxyCmp({
        inputs: ['animated']
    })
], IonSkeletonText);
export { IonSkeletonText };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSkeletonText, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-skeleton-text',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSpinner = class IonSpinner {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSpinner, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSpinner, selector: "ion-spinner", inputs: { color: "color", duration: "duration", name: "name", paused: "paused" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSpinner = __decorate([
    ProxyCmp({
        inputs: ['color', 'duration', 'name', 'paused']
    })
], IonSpinner);
export { IonSpinner };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSpinner, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-spinner',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'duration', 'name', 'paused'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonSplitPane = class IonSplitPane {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionSplitPaneVisible']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSplitPane, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonSplitPane, selector: "ion-split-pane", inputs: { contentId: "contentId", disabled: "disabled", when: "when" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonSplitPane = __decorate([
    ProxyCmp({
        inputs: ['contentId', 'disabled', 'when']
    })
], IonSplitPane);
export { IonSplitPane };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonSplitPane, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-split-pane',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['contentId', 'disabled', 'when'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonTab = class IonTab {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTab, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTab, selector: "ion-tab", inputs: { component: "component", tab: "tab" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonTab = __decorate([
    ProxyCmp({
        inputs: ['component', 'tab'],
        methods: ['setActive']
    })
], IonTab);
export { IonTab };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTab, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-tab',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['component', 'tab'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonTabBar = class IonTabBar {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabBar, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTabBar, selector: "ion-tab-bar", inputs: { color: "color", mode: "mode", selectedTab: "selectedTab", translucent: "translucent" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonTabBar = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode', 'selectedTab', 'translucent']
    })
], IonTabBar);
export { IonTabBar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabBar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-tab-bar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode', 'selectedTab', 'translucent'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonTabButton = class IonTabButton {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabButton, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTabButton, selector: "ion-tab-button", inputs: { disabled: "disabled", download: "download", href: "href", layout: "layout", mode: "mode", rel: "rel", selected: "selected", tab: "tab", target: "target" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonTabButton = __decorate([
    ProxyCmp({
        inputs: ['disabled', 'download', 'href', 'layout', 'mode', 'rel', 'selected', 'tab', 'target']
    })
], IonTabButton);
export { IonTabButton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTabButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-tab-button',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['disabled', 'download', 'href', 'layout', 'mode', 'rel', 'selected', 'tab', 'target'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonText = class IonText {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonText, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonText, selector: "ion-text", inputs: { color: "color", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonText = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode']
    })
], IonText);
export { IonText };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonText, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-text',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonTextarea = class IonTextarea {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionInput', 'ionBlur', 'ionFocus']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTextarea, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTextarea, selector: "ion-textarea", inputs: { autoGrow: "autoGrow", autocapitalize: "autocapitalize", autofocus: "autofocus", clearOnEdit: "clearOnEdit", color: "color", cols: "cols", counter: "counter", counterFormatter: "counterFormatter", debounce: "debounce", disabled: "disabled", enterkeyhint: "enterkeyhint", errorText: "errorText", fill: "fill", helperText: "helperText", inputmode: "inputmode", label: "label", labelPlacement: "labelPlacement", maxlength: "maxlength", minlength: "minlength", mode: "mode", name: "name", placeholder: "placeholder", readonly: "readonly", required: "required", rows: "rows", shape: "shape", spellcheck: "spellcheck", value: "value", wrap: "wrap" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonTextarea = __decorate([
    ProxyCmp({
        inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'color', 'cols', 'counter', 'counterFormatter', 'debounce', 'disabled', 'enterkeyhint', 'errorText', 'fill', 'helperText', 'inputmode', 'label', 'labelPlacement', 'maxlength', 'minlength', 'mode', 'name', 'placeholder', 'readonly', 'required', 'rows', 'shape', 'spellcheck', 'value', 'wrap'],
        methods: ['setFocus', 'getInputElement']
    })
], IonTextarea);
export { IonTextarea };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTextarea, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-textarea',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'color', 'cols', 'counter', 'counterFormatter', 'debounce', 'disabled', 'enterkeyhint', 'errorText', 'fill', 'helperText', 'inputmode', 'label', 'labelPlacement', 'maxlength', 'minlength', 'mode', 'name', 'placeholder', 'readonly', 'required', 'rows', 'shape', 'spellcheck', 'value', 'wrap'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonThumbnail = class IonThumbnail {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonThumbnail, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonThumbnail, selector: "ion-thumbnail", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonThumbnail = __decorate([
    ProxyCmp({})
], IonThumbnail);
export { IonThumbnail };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonThumbnail, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-thumbnail',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: [],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonTitle = class IonTitle {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTitle, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonTitle, selector: "ion-title", inputs: { color: "color", size: "size" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonTitle = __decorate([
    ProxyCmp({
        inputs: ['color', 'size']
    })
], IonTitle);
export { IonTitle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonTitle, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-title',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'size'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonToast = class IonToast {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionToastDidPresent', 'ionToastWillPresent', 'ionToastWillDismiss', 'ionToastDidDismiss', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToast, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonToast, selector: "ion-toast", inputs: { animated: "animated", buttons: "buttons", color: "color", cssClass: "cssClass", duration: "duration", enterAnimation: "enterAnimation", header: "header", htmlAttributes: "htmlAttributes", icon: "icon", isOpen: "isOpen", keyboardClose: "keyboardClose", layout: "layout", leaveAnimation: "leaveAnimation", message: "message", mode: "mode", position: "position", positionAnchor: "positionAnchor", swipeGesture: "swipeGesture", translucent: "translucent", trigger: "trigger" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonToast = __decorate([
    ProxyCmp({
        inputs: ['animated', 'buttons', 'color', 'cssClass', 'duration', 'enterAnimation', 'header', 'htmlAttributes', 'icon', 'isOpen', 'keyboardClose', 'layout', 'leaveAnimation', 'message', 'mode', 'position', 'positionAnchor', 'swipeGesture', 'translucent', 'trigger'],
        methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
    })
], IonToast);
export { IonToast };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToast, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-toast',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['animated', 'buttons', 'color', 'cssClass', 'duration', 'enterAnimation', 'header', 'htmlAttributes', 'icon', 'isOpen', 'keyboardClose', 'layout', 'leaveAnimation', 'message', 'mode', 'position', 'positionAnchor', 'swipeGesture', 'translucent', 'trigger'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonToggle = class IonToggle {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToggle, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonToggle, selector: "ion-toggle", inputs: { alignment: "alignment", checked: "checked", color: "color", disabled: "disabled", enableOnOffLabels: "enableOnOffLabels", errorText: "errorText", helperText: "helperText", justify: "justify", labelPlacement: "labelPlacement", mode: "mode", name: "name", required: "required", value: "value" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonToggle = __decorate([
    ProxyCmp({
        inputs: ['alignment', 'checked', 'color', 'disabled', 'enableOnOffLabels', 'errorText', 'helperText', 'justify', 'labelPlacement', 'mode', 'name', 'required', 'value']
    })
], IonToggle);
export { IonToggle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToggle, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-toggle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['alignment', 'checked', 'color', 'disabled', 'enableOnOffLabels', 'errorText', 'helperText', 'justify', 'labelPlacement', 'mode', 'name', 'required', 'value'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
let IonToolbar = class IonToolbar {
    z;
    el;
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToolbar, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    /** @nocollapse */ static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: IonToolbar, selector: "ion-toolbar", inputs: { color: "color", mode: "mode" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
};
IonToolbar = __decorate([
    ProxyCmp({
        inputs: ['color', 'mode']
    })
], IonToolbar);
export { IonToolbar };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: IonToolbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-toolbar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-content></ng-content>',
                    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
                    inputs: ['color', 'mode'],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL3Byb3hpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQiw4Q0FBOEM7QUFDOUMsT0FBTyxFQUFFLHVCQUF1QixFQUFxQixTQUFTLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBRXhILE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBUXZFLElBT2EsWUFBWSxHQVB6QixNQU9hLFlBQVk7SUFFb0M7SUFEakQsRUFBRSxDQUEwQjtJQUN0QyxZQUFZLENBQW9CLEVBQUUsQ0FBYSxFQUFZLENBQVM7UUFBVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ2xFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDOzJIQUxVLFlBQVk7K0dBQVosWUFBWSx1TUFKYiwyQkFBMkI7O0FBSTFCLFlBQVk7SUFWeEIsUUFBUSxDQUFDO1FBQ1IsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sQ0FBQztLQUNsRixDQUFDO0dBUVcsWUFBWSxDQU14QjtTQU5ZLFlBQVk7NEZBQVosWUFBWTtrQkFQeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sQ0FBQztpQkFDbEY7O0FBZ0JELElBT2EsaUJBQWlCLEdBUDlCLE1BT2EsaUJBQWlCO0lBRStCO0lB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LHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLHVFQUF1RTtvQkFDdkUsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyogYXV0by1nZW5lcmF0ZWQgYW5ndWxhciBkaXJlY3RpdmUgcHJveGllcyAqL1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFByb3h5Q21wLCBwcm94eU91dHB1dHMgfSBmcm9tICcuL2FuZ3VsYXItY29tcG9uZW50LWxpYi91dGlscyc7XG5cbmltcG9ydCB7IENvbXBvbmVudHMgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ21vZGUnLCAncmVhZG9ubHknLCAndG9nZ2xlSWNvbicsICd0b2dnbGVJY29uU2xvdCcsICd2YWx1ZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWFjY29yZGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnbW9kZScsICdyZWFkb25seScsICd0b2dnbGVJY29uJywgJ3RvZ2dsZUljb25TbG90JywgJ3ZhbHVlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkFjY29yZGlvbiB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkFjY29yZGlvbkVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkFjY29yZGlvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uQWNjb3JkaW9uIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2Rpc2FibGVkJywgJ2V4cGFuZCcsICdtb2RlJywgJ211bHRpcGxlJywgJ3JlYWRvbmx5JywgJ3ZhbHVlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tYWNjb3JkaW9uLWdyb3VwJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhbmltYXRlZCcsICdkaXNhYmxlZCcsICdleHBhbmQnLCAnbW9kZScsICdtdWx0aXBsZScsICdyZWFkb25seScsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25BY2NvcmRpb25Hcm91cCB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkFjY29yZGlvbkdyb3VwRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJ10pO1xuICB9XG59XG5cblxuaW1wb3J0IHR5cGUgeyBBY2NvcmRpb25Hcm91cENoYW5nZUV2ZW50RGV0YWlsIGFzIElJb25BY2NvcmRpb25Hcm91cEFjY29yZGlvbkdyb3VwQ2hhbmdlRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25BY2NvcmRpb25Hcm91cCBleHRlbmRzIENvbXBvbmVudHMuSW9uQWNjb3JkaW9uR3JvdXAge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB2YWx1ZSBwcm9wZXJ0eSBoYXMgY2hhbmdlZCBhcyBhIHJlc3VsdCBvZiBhIHVzZXIgYWN0aW9uIHN1Y2ggYXMgYSBjbGljay5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkFjY29yZGlvbkdyb3VwQWNjb3JkaW9uR3JvdXBDaGFuZ2VFdmVudERldGFpbD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydhbmltYXRlZCcsICdiYWNrZHJvcERpc21pc3MnLCAnYnV0dG9ucycsICdjc3NDbGFzcycsICdlbnRlckFuaW1hdGlvbicsICdoZWFkZXInLCAnaHRtbEF0dHJpYnV0ZXMnLCAnaXNPcGVuJywgJ2tleWJvYXJkQ2xvc2UnLCAnbGVhdmVBbmltYXRpb24nLCAnbW9kZScsICdzdWJIZWFkZXInLCAndHJhbnNsdWNlbnQnLCAndHJpZ2dlciddLFxuICBtZXRob2RzOiBbJ3ByZXNlbnQnLCAnZGlzbWlzcycsICdvbkRpZERpc21pc3MnLCAnb25XaWxsRGlzbWlzcyddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWFjdGlvbi1zaGVldCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYmFja2Ryb3BEaXNtaXNzJywgJ2J1dHRvbnMnLCAnY3NzQ2xhc3MnLCAnZW50ZXJBbmltYXRpb24nLCAnaGVhZGVyJywgJ2h0bWxBdHRyaWJ1dGVzJywgJ2lzT3BlbicsICdrZXlib2FyZENsb3NlJywgJ2xlYXZlQW5pbWF0aW9uJywgJ21vZGUnLCAnc3ViSGVhZGVyJywgJ3RyYW5zbHVjZW50JywgJ3RyaWdnZXInXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uQWN0aW9uU2hlZXQge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25BY3Rpb25TaGVldEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkFjdGlvblNoZWV0RGlkUHJlc2VudCcsICdpb25BY3Rpb25TaGVldFdpbGxQcmVzZW50JywgJ2lvbkFjdGlvblNoZWV0V2lsbERpc21pc3MnLCAnaW9uQWN0aW9uU2hlZXREaWREaXNtaXNzJywgJ2RpZFByZXNlbnQnLCAnd2lsbFByZXNlbnQnLCAnd2lsbERpc21pc3MnLCAnZGlkRGlzbWlzcyddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgT3ZlcmxheUV2ZW50RGV0YWlsIGFzIElJb25BY3Rpb25TaGVldE92ZXJsYXlFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkFjdGlvblNoZWV0IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25BY3Rpb25TaGVldCB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBhY3Rpb24gc2hlZXQgaGFzIHByZXNlbnRlZC5cbiAgICovXG4gIGlvbkFjdGlvblNoZWV0RGlkUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBhY3Rpb24gc2hlZXQgaGFzIHByZXNlbnRlZC5cbiAgICovXG4gIGlvbkFjdGlvblNoZWV0V2lsbFByZXNlbnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGJlZm9yZSB0aGUgYWN0aW9uIHNoZWV0IGhhcyBkaXNtaXNzZWQuXG4gICAqL1xuICBpb25BY3Rpb25TaGVldFdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkFjdGlvblNoZWV0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBhY3Rpb24gc2hlZXQgaGFzIGRpc21pc3NlZC5cbiAgICovXG4gIGlvbkFjdGlvblNoZWV0RGlkRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25BY3Rpb25TaGVldE92ZXJsYXlFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgYWN0aW9uIHNoZWV0IGhhcyBwcmVzZW50ZWQuXG5TaG9ydGhhbmQgZm9yIGlvbkFjdGlvblNoZWV0V2lsbERpc21pc3MuXG4gICAqL1xuICBkaWRQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIGFjdGlvbiBzaGVldCBoYXMgcHJlc2VudGVkLlxuU2hvcnRoYW5kIGZvciBpb25BY3Rpb25TaGVldFdpbGxQcmVzZW50LlxuICAgKi9cbiAgd2lsbFByZXNlbnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGJlZm9yZSB0aGUgYWN0aW9uIHNoZWV0IGhhcyBkaXNtaXNzZWQuXG5TaG9ydGhhbmQgZm9yIGlvbkFjdGlvblNoZWV0V2lsbERpc21pc3MuXG4gICAqL1xuICB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25BY3Rpb25TaGVldE92ZXJsYXlFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgYWN0aW9uIHNoZWV0IGhhcyBkaXNtaXNzZWQuXG5TaG9ydGhhbmQgZm9yIGlvbkFjdGlvblNoZWV0RGlkRGlzbWlzcy5cbiAgICovXG4gIGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uQWN0aW9uU2hlZXRPdmVybGF5RXZlbnREZXRhaWw+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYmFja2Ryb3BEaXNtaXNzJywgJ2J1dHRvbnMnLCAnY3NzQ2xhc3MnLCAnZW50ZXJBbmltYXRpb24nLCAnaGVhZGVyJywgJ2h0bWxBdHRyaWJ1dGVzJywgJ2lucHV0cycsICdpc09wZW4nLCAna2V5Ym9hcmRDbG9zZScsICdsZWF2ZUFuaW1hdGlvbicsICdtZXNzYWdlJywgJ21vZGUnLCAnc3ViSGVhZGVyJywgJ3RyYW5zbHVjZW50JywgJ3RyaWdnZXInXSxcbiAgbWV0aG9kczogWydwcmVzZW50JywgJ2Rpc21pc3MnLCAnb25EaWREaXNtaXNzJywgJ29uV2lsbERpc21pc3MnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1hbGVydCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYmFja2Ryb3BEaXNtaXNzJywgJ2J1dHRvbnMnLCAnY3NzQ2xhc3MnLCAnZW50ZXJBbmltYXRpb24nLCAnaGVhZGVyJywgJ2h0bWxBdHRyaWJ1dGVzJywgJ2lucHV0cycsICdpc09wZW4nLCAna2V5Ym9hcmRDbG9zZScsICdsZWF2ZUFuaW1hdGlvbicsICdtZXNzYWdlJywgJ21vZGUnLCAnc3ViSGVhZGVyJywgJ3RyYW5zbHVjZW50JywgJ3RyaWdnZXInXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uQWxlcnQge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25BbGVydEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkFsZXJ0RGlkUHJlc2VudCcsICdpb25BbGVydFdpbGxQcmVzZW50JywgJ2lvbkFsZXJ0V2lsbERpc21pc3MnLCAnaW9uQWxlcnREaWREaXNtaXNzJywgJ2RpZFByZXNlbnQnLCAnd2lsbFByZXNlbnQnLCAnd2lsbERpc21pc3MnLCAnZGlkRGlzbWlzcyddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgT3ZlcmxheUV2ZW50RGV0YWlsIGFzIElJb25BbGVydE92ZXJsYXlFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkFsZXJ0IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25BbGVydCB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBhbGVydCBoYXMgcHJlc2VudGVkLlxuICAgKi9cbiAgaW9uQWxlcnREaWRQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIGFsZXJ0IGhhcyBwcmVzZW50ZWQuXG4gICAqL1xuICBpb25BbGVydFdpbGxQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIGFsZXJ0IGhhcyBkaXNtaXNzZWQuXG4gICAqL1xuICBpb25BbGVydFdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkFsZXJ0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBhbGVydCBoYXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgaW9uQWxlcnREaWREaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkFsZXJ0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBhbGVydCBoYXMgcHJlc2VudGVkLlxuU2hvcnRoYW5kIGZvciBpb25BbGVydFdpbGxEaXNtaXNzLlxuICAgKi9cbiAgZGlkUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBhbGVydCBoYXMgcHJlc2VudGVkLlxuU2hvcnRoYW5kIGZvciBpb25BbGVydFdpbGxQcmVzZW50LlxuICAgKi9cbiAgd2lsbFByZXNlbnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGJlZm9yZSB0aGUgYWxlcnQgaGFzIGRpc21pc3NlZC5cblNob3J0aGFuZCBmb3IgaW9uQWxlcnRXaWxsRGlzbWlzcy5cbiAgICovXG4gIHdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkFsZXJ0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBhbGVydCBoYXMgZGlzbWlzc2VkLlxuU2hvcnRoYW5kIGZvciBpb25BbGVydERpZERpc21pc3MuXG4gICAqL1xuICBkaWREaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkFsZXJ0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgbWV0aG9kczogWydzZXRGb2N1cyddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWFwcCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBJb25BcHAge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25BcHBFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25BcHAgZXh0ZW5kcyBDb21wb25lbnRzLklvbkFwcCB7fVxuXG5cbkBQcm94eUNtcCh7XG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWF2YXRhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBJb25BdmF0YXIge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25BdmF0YXJFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25BdmF0YXIgZXh0ZW5kcyBDb21wb25lbnRzLklvbkF2YXRhciB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydzdG9wUHJvcGFnYXRpb24nLCAndGFwcGFibGUnLCAndmlzaWJsZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWJhY2tkcm9wJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydzdG9wUHJvcGFnYXRpb24nLCAndGFwcGFibGUnLCAndmlzaWJsZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25CYWNrZHJvcCB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkJhY2tkcm9wRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQmFja2Ryb3BUYXAnXSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQmFja2Ryb3AgZXh0ZW5kcyBDb21wb25lbnRzLklvbkJhY2tkcm9wIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgYmFja2Ryb3AgaXMgdGFwcGVkLlxuICAgKi9cbiAgaW9uQmFja2Ryb3BUYXA6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1iYWRnZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnbW9kZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25CYWRnZSB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkJhZGdlRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQmFkZ2UgZXh0ZW5kcyBDb21wb25lbnRzLklvbkJhZGdlIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FjdGl2ZScsICdjb2xvcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdocmVmJywgJ21vZGUnLCAncmVsJywgJ3JvdXRlckFuaW1hdGlvbicsICdyb3V0ZXJEaXJlY3Rpb24nLCAnc2VwYXJhdG9yJywgJ3RhcmdldCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWJyZWFkY3J1bWInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2FjdGl2ZScsICdjb2xvcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdocmVmJywgJ21vZGUnLCAncmVsJywgJ3JvdXRlckFuaW1hdGlvbicsICdyb3V0ZXJEaXJlY3Rpb24nLCAnc2VwYXJhdG9yJywgJ3RhcmdldCddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25CcmVhZGNydW1iIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQnJlYWRjcnVtYkVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkZvY3VzJywgJ2lvbkJsdXInXSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQnJlYWRjcnVtYiBleHRlbmRzIENvbXBvbmVudHMuSW9uQnJlYWRjcnVtYiB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGJyZWFkY3J1bWIgaGFzIGZvY3VzLlxuICAgKi9cbiAgaW9uRm9jdXM6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGJyZWFkY3J1bWIgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xvcicsICdpdGVtc0FmdGVyQ29sbGFwc2UnLCAnaXRlbXNCZWZvcmVDb2xsYXBzZScsICdtYXhJdGVtcycsICdtb2RlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tYnJlYWRjcnVtYnMnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2l0ZW1zQWZ0ZXJDb2xsYXBzZScsICdpdGVtc0JlZm9yZUNvbGxhcHNlJywgJ21heEl0ZW1zJywgJ21vZGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uQnJlYWRjcnVtYnMge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25CcmVhZGNydW1ic0VsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkNvbGxhcHNlZENsaWNrJ10pO1xuICB9XG59XG5cblxuaW1wb3J0IHR5cGUgeyBCcmVhZGNydW1iQ29sbGFwc2VkQ2xpY2tFdmVudERldGFpbCBhcyBJSW9uQnJlYWRjcnVtYnNCcmVhZGNydW1iQ29sbGFwc2VkQ2xpY2tFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkJyZWFkY3J1bWJzIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25CcmVhZGNydW1icyB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGNvbGxhcHNlZCBpbmRpY2F0b3IgaXMgY2xpY2tlZCBvbi5cbiAgICovXG4gIGlvbkNvbGxhcHNlZENsaWNrOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkJyZWFkY3J1bWJzQnJlYWRjcnVtYkNvbGxhcHNlZENsaWNrRXZlbnREZXRhaWw+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYnV0dG9uVHlwZScsICdjb2xvcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdleHBhbmQnLCAnZmlsbCcsICdmb3JtJywgJ2hyZWYnLCAnbW9kZScsICdyZWwnLCAncm91dGVyQW5pbWF0aW9uJywgJ3JvdXRlckRpcmVjdGlvbicsICdzaGFwZScsICdzaXplJywgJ3N0cm9uZycsICd0YXJnZXQnLCAndHlwZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWJ1dHRvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYnV0dG9uVHlwZScsICdjb2xvcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdleHBhbmQnLCAnZmlsbCcsICdmb3JtJywgJ2hyZWYnLCAnbW9kZScsICdyZWwnLCAncm91dGVyQW5pbWF0aW9uJywgJ3JvdXRlckRpcmVjdGlvbicsICdzaGFwZScsICdzaXplJywgJ3N0cm9uZycsICd0YXJnZXQnLCAndHlwZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25CdXR0b24ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25CdXR0b25FbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25Gb2N1cycsICdpb25CbHVyJ10pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkJ1dHRvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uQnV0dG9uIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgYnV0dG9uIGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBidXR0b24gbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xsYXBzZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWJ1dHRvbnMnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbGxhcHNlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkJ1dHRvbnMge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25CdXR0b25zRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQnV0dG9ucyBleHRlbmRzIENvbXBvbmVudHMuSW9uQnV0dG9ucyB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydidXR0b24nLCAnY29sb3InLCAnZGlzYWJsZWQnLCAnZG93bmxvYWQnLCAnaHJlZicsICdtb2RlJywgJ3JlbCcsICdyb3V0ZXJBbmltYXRpb24nLCAncm91dGVyRGlyZWN0aW9uJywgJ3RhcmdldCcsICd0eXBlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY2FyZCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYnV0dG9uJywgJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2hyZWYnLCAnbW9kZScsICdyZWwnLCAncm91dGVyQW5pbWF0aW9uJywgJ3JvdXRlckRpcmVjdGlvbicsICd0YXJnZXQnLCAndHlwZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25DYXJkIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQ2FyZEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkNhcmQgZXh0ZW5kcyBDb21wb25lbnRzLklvbkNhcmQge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnbW9kZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNhcmQtY29udGVudCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnbW9kZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25DYXJkQ29udGVudCB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkNhcmRDb250ZW50RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQ2FyZENvbnRlbnQgZXh0ZW5kcyBDb21wb25lbnRzLklvbkNhcmRDb250ZW50IHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnLCAndHJhbnNsdWNlbnQnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1jYXJkLWhlYWRlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnbW9kZScsICd0cmFuc2x1Y2VudCddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25DYXJkSGVhZGVyIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQ2FyZEhlYWRlckVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkNhcmRIZWFkZXIgZXh0ZW5kcyBDb21wb25lbnRzLklvbkNhcmRIZWFkZXIge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY29sb3InLCAnbW9kZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNhcmQtc3VidGl0bGUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uQ2FyZFN1YnRpdGxlIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQ2FyZFN1YnRpdGxlRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQ2FyZFN1YnRpdGxlIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25DYXJkU3VidGl0bGUge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY29sb3InLCAnbW9kZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNhcmQtdGl0bGUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uQ2FyZFRpdGxlIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQ2FyZFRpdGxlRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQ2FyZFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25DYXJkVGl0bGUge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYWxpZ25tZW50JywgJ2NoZWNrZWQnLCAnY29sb3InLCAnZGlzYWJsZWQnLCAnZXJyb3JUZXh0JywgJ2hlbHBlclRleHQnLCAnaW5kZXRlcm1pbmF0ZScsICdqdXN0aWZ5JywgJ2xhYmVsUGxhY2VtZW50JywgJ21vZGUnLCAnbmFtZScsICdyZXF1aXJlZCcsICd2YWx1ZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNoZWNrYm94JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhbGlnbm1lbnQnLCAnY2hlY2tlZCcsICdjb2xvcicsICdkaXNhYmxlZCcsICdlcnJvclRleHQnLCAnaGVscGVyVGV4dCcsICdpbmRldGVybWluYXRlJywgJ2p1c3RpZnknLCAnbGFiZWxQbGFjZW1lbnQnLCAnbW9kZScsICduYW1lJywgJ3JlcXVpcmVkJywgJ3ZhbHVlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkNoZWNrYm94IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQ2hlY2tib3hFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25DaGFuZ2UnLCAnaW9uRm9jdXMnLCAnaW9uQmx1ciddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgQ2hlY2tib3hDaGFuZ2VFdmVudERldGFpbCBhcyBJSW9uQ2hlY2tib3hDaGVja2JveENoYW5nZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQ2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnRzLklvbkNoZWNrYm94IHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgY2hlY2tlZCBwcm9wZXJ0eSBoYXMgY2hhbmdlZCBhcyBhIHJlc3VsdCBvZiBhIHVzZXIgYWN0aW9uIHN1Y2ggYXMgYSBjbGljay5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgY2hlY2tlZGAgcHJvcGVydHkuXG4gICAqL1xuICBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uQ2hlY2tib3hDaGVja2JveENoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGNoZWNrYm94IGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBjaGVja2JveCBsb3NlcyBmb2N1cy5cbiAgICovXG4gIGlvbkJsdXI6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ21vZGUnLCAnb3V0bGluZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNoaXAnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ21vZGUnLCAnb3V0bGluZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25DaGlwIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQ2hpcEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkNoaXAgZXh0ZW5kcyBDb21wb25lbnRzLklvbkNoaXAge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnb2Zmc2V0JywgJ29mZnNldExnJywgJ29mZnNldE1kJywgJ29mZnNldFNtJywgJ29mZnNldFhsJywgJ29mZnNldFhzJywgJ3B1bGwnLCAncHVsbExnJywgJ3B1bGxNZCcsICdwdWxsU20nLCAncHVsbFhsJywgJ3B1bGxYcycsICdwdXNoJywgJ3B1c2hMZycsICdwdXNoTWQnLCAncHVzaFNtJywgJ3B1c2hYbCcsICdwdXNoWHMnLCAnc2l6ZScsICdzaXplTGcnLCAnc2l6ZU1kJywgJ3NpemVTbScsICdzaXplWGwnLCAnc2l6ZVhzJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY29sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydvZmZzZXQnLCAnb2Zmc2V0TGcnLCAnb2Zmc2V0TWQnLCAnb2Zmc2V0U20nLCAnb2Zmc2V0WGwnLCAnb2Zmc2V0WHMnLCAncHVsbCcsICdwdWxsTGcnLCAncHVsbE1kJywgJ3B1bGxTbScsICdwdWxsWGwnLCAncHVsbFhzJywgJ3B1c2gnLCAncHVzaExnJywgJ3B1c2hNZCcsICdwdXNoU20nLCAncHVzaFhsJywgJ3B1c2hYcycsICdzaXplJywgJ3NpemVMZycsICdzaXplTWQnLCAnc2l6ZVNtJywgJ3NpemVYbCcsICdzaXplWHMnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uQ29sIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uQ29sRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uQ29sIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25Db2wge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY29sb3InLCAnZml4ZWRTbG90UGxhY2VtZW50JywgJ2ZvcmNlT3ZlcnNjcm9sbCcsICdmdWxsc2NyZWVuJywgJ3Njcm9sbEV2ZW50cycsICdzY3JvbGxYJywgJ3Njcm9sbFknXSxcbiAgbWV0aG9kczogWydnZXRTY3JvbGxFbGVtZW50JywgJ3Njcm9sbFRvVG9wJywgJ3Njcm9sbFRvQm90dG9tJywgJ3Njcm9sbEJ5UG9pbnQnLCAnc2Nyb2xsVG9Qb2ludCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWNvbnRlbnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2ZpeGVkU2xvdFBsYWNlbWVudCcsICdmb3JjZU92ZXJzY3JvbGwnLCAnZnVsbHNjcmVlbicsICdzY3JvbGxFdmVudHMnLCAnc2Nyb2xsWCcsICdzY3JvbGxZJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkNvbnRlbnQge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25Db250ZW50RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uU2Nyb2xsU3RhcnQnLCAnaW9uU2Nyb2xsJywgJ2lvblNjcm9sbEVuZCddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgU2Nyb2xsQmFzZURldGFpbCBhcyBJSW9uQ29udGVudFNjcm9sbEJhc2VEZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFNjcm9sbERldGFpbCBhcyBJSW9uQ29udGVudFNjcm9sbERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkNvbnRlbnQgZXh0ZW5kcyBDb21wb25lbnRzLklvbkNvbnRlbnQge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBzY3JvbGwgaGFzIHN0YXJ0ZWQuIFRoaXMgZXZlbnQgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdC5cblNldCBgc2Nyb2xsRXZlbnRzYCB0byBgdHJ1ZWAgdG8gZW5hYmxlLlxuICAgKi9cbiAgaW9uU2Nyb2xsU3RhcnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uQ29udGVudFNjcm9sbEJhc2VEZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hpbGUgc2Nyb2xsaW5nLiBUaGlzIGV2ZW50IGlzIGRpc2FibGVkIGJ5IGRlZmF1bHQuXG5TZXQgYHNjcm9sbEV2ZW50c2AgdG8gYHRydWVgIHRvIGVuYWJsZS5cbiAgICovXG4gIGlvblNjcm9sbDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25Db250ZW50U2Nyb2xsRGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHNjcm9sbCBoYXMgZW5kZWQuIFRoaXMgZXZlbnQgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdC5cblNldCBgc2Nyb2xsRXZlbnRzYCB0byBgdHJ1ZWAgdG8gZW5hYmxlLlxuICAgKi9cbiAgaW9uU2Nyb2xsRW5kOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkNvbnRlbnRTY3JvbGxCYXNlRGV0YWlsPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NhbmNlbFRleHQnLCAnY2xlYXJUZXh0JywgJ2NvbG9yJywgJ2RheVZhbHVlcycsICdkaXNhYmxlZCcsICdkb25lVGV4dCcsICdmaXJzdERheU9mV2VlaycsICdmb3JtYXRPcHRpb25zJywgJ2hpZ2hsaWdodGVkRGF0ZXMnLCAnaG91ckN5Y2xlJywgJ2hvdXJWYWx1ZXMnLCAnaXNEYXRlRW5hYmxlZCcsICdsb2NhbGUnLCAnbWF4JywgJ21pbicsICdtaW51dGVWYWx1ZXMnLCAnbW9kZScsICdtb250aFZhbHVlcycsICdtdWx0aXBsZScsICduYW1lJywgJ3ByZWZlcldoZWVsJywgJ3ByZXNlbnRhdGlvbicsICdyZWFkb25seScsICdzaG93QWRqYWNlbnREYXlzJywgJ3Nob3dDbGVhckJ1dHRvbicsICdzaG93RGVmYXVsdEJ1dHRvbnMnLCAnc2hvd0RlZmF1bHRUaW1lTGFiZWwnLCAnc2hvd0RlZmF1bHRUaXRsZScsICdzaXplJywgJ3RpdGxlU2VsZWN0ZWREYXRlc0Zvcm1hdHRlcicsICd2YWx1ZScsICd5ZWFyVmFsdWVzJ10sXG4gIG1ldGhvZHM6IFsnY29uZmlybScsICdyZXNldCcsICdjYW5jZWwnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1kYXRldGltZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY2FuY2VsVGV4dCcsICdjbGVhclRleHQnLCAnY29sb3InLCAnZGF5VmFsdWVzJywgJ2Rpc2FibGVkJywgJ2RvbmVUZXh0JywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ2Zvcm1hdE9wdGlvbnMnLCAnaGlnaGxpZ2h0ZWREYXRlcycsICdob3VyQ3ljbGUnLCAnaG91clZhbHVlcycsICdpc0RhdGVFbmFibGVkJywgJ2xvY2FsZScsICdtYXgnLCAnbWluJywgJ21pbnV0ZVZhbHVlcycsICdtb2RlJywgJ21vbnRoVmFsdWVzJywgJ211bHRpcGxlJywgJ25hbWUnLCAncHJlZmVyV2hlZWwnLCAncHJlc2VudGF0aW9uJywgJ3JlYWRvbmx5JywgJ3Nob3dBZGphY2VudERheXMnLCAnc2hvd0NsZWFyQnV0dG9uJywgJ3Nob3dEZWZhdWx0QnV0dG9ucycsICdzaG93RGVmYXVsdFRpbWVMYWJlbCcsICdzaG93RGVmYXVsdFRpdGxlJywgJ3NpemUnLCAndGl0bGVTZWxlY3RlZERhdGVzRm9ybWF0dGVyJywgJ3ZhbHVlJywgJ3llYXJWYWx1ZXMnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uRGF0ZXRpbWUge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25EYXRldGltZUVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkNhbmNlbCcsICdpb25DaGFuZ2UnLCAnaW9uRm9jdXMnLCAnaW9uQmx1ciddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgRGF0ZXRpbWVDaGFuZ2VFdmVudERldGFpbCBhcyBJSW9uRGF0ZXRpbWVEYXRldGltZUNoYW5nZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uRGF0ZXRpbWUgZXh0ZW5kcyBDb21wb25lbnRzLklvbkRhdGV0aW1lIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgZGF0ZXRpbWUgc2VsZWN0aW9uIHdhcyBjYW5jZWxsZWQuXG4gICAqL1xuICBpb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHZhbHVlIChzZWxlY3RlZCBkYXRlKSBoYXMgY2hhbmdlZC5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbkRhdGV0aW1lRGF0ZXRpbWVDaGFuZ2VFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBkYXRldGltZSBoYXMgZm9jdXMuXG4gICAqL1xuICBpb25Gb2N1czogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgZGF0ZXRpbWUgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xvcicsICdkYXRldGltZScsICdkaXNhYmxlZCcsICdtb2RlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tZGF0ZXRpbWUtYnV0dG9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xvcicsICdkYXRldGltZScsICdkaXNhYmxlZCcsICdtb2RlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkRhdGV0aW1lQnV0dG9uIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uRGF0ZXRpbWVCdXR0b25FbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25EYXRldGltZUJ1dHRvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uRGF0ZXRpbWVCdXR0b24ge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYWN0aXZhdGVkJywgJ2VkZ2UnLCAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddLFxuICBtZXRob2RzOiBbJ2Nsb3NlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tZmFiJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhY3RpdmF0ZWQnLCAnZWRnZScsICdob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkZhYiB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkZhYkVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkZhYiBleHRlbmRzIENvbXBvbmVudHMuSW9uRmFiIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FjdGl2YXRlZCcsICdjbG9zZUljb24nLCAnY29sb3InLCAnZGlzYWJsZWQnLCAnZG93bmxvYWQnLCAnaHJlZicsICdtb2RlJywgJ3JlbCcsICdyb3V0ZXJBbmltYXRpb24nLCAncm91dGVyRGlyZWN0aW9uJywgJ3Nob3cnLCAnc2l6ZScsICd0YXJnZXQnLCAndHJhbnNsdWNlbnQnLCAndHlwZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWZhYi1idXR0b24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2FjdGl2YXRlZCcsICdjbG9zZUljb24nLCAnY29sb3InLCAnZGlzYWJsZWQnLCAnZG93bmxvYWQnLCAnaHJlZicsICdtb2RlJywgJ3JlbCcsICdyb3V0ZXJBbmltYXRpb24nLCAncm91dGVyRGlyZWN0aW9uJywgJ3Nob3cnLCAnc2l6ZScsICd0YXJnZXQnLCAndHJhbnNsdWNlbnQnLCAndHlwZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25GYWJCdXR0b24ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25GYWJCdXR0b25FbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25Gb2N1cycsICdpb25CbHVyJ10pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkZhYkJ1dHRvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uRmFiQnV0dG9uIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgYnV0dG9uIGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBidXR0b24gbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydhY3RpdmF0ZWQnLCAnc2lkZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWZhYi1saXN0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhY3RpdmF0ZWQnLCAnc2lkZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25GYWJMaXN0IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uRmFiTGlzdEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkZhYkxpc3QgZXh0ZW5kcyBDb21wb25lbnRzLklvbkZhYkxpc3Qge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY29sbGFwc2UnLCAnbW9kZScsICd0cmFuc2x1Y2VudCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWZvb3RlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sbGFwc2UnLCAnbW9kZScsICd0cmFuc2x1Y2VudCddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Gb290ZXIge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25Gb290ZXJFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25Gb290ZXIgZXh0ZW5kcyBDb21wb25lbnRzLklvbkZvb3RlciB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydmaXhlZCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWdyaWQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2ZpeGVkJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkdyaWQge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25HcmlkRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uR3JpZCBleHRlbmRzIENvbXBvbmVudHMuSW9uR3JpZCB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xsYXBzZScsICdtb2RlJywgJ3RyYW5zbHVjZW50J11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24taGVhZGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xsYXBzZScsICdtb2RlJywgJ3RyYW5zbHVjZW50J10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkhlYWRlciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkhlYWRlckVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkhlYWRlciBleHRlbmRzIENvbXBvbmVudHMuSW9uSGVhZGVyIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2ZsaXBSdGwnLCAnaWNvbicsICdpb3MnLCAnbGF6eScsICdtZCcsICdtb2RlJywgJ25hbWUnLCAnc2FuaXRpemUnLCAnc2l6ZScsICdzcmMnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1pY29uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xvcicsICdmbGlwUnRsJywgJ2ljb24nLCAnaW9zJywgJ2xhenknLCAnbWQnLCAnbW9kZScsICduYW1lJywgJ3Nhbml0aXplJywgJ3NpemUnLCAnc3JjJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkljb24ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25JY29uRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uSWNvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uSWNvbiB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydhbHQnLCAnc3JjJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24taW1nJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhbHQnLCAnc3JjJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkltZyB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkltZ0VsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkltZ1dpbGxMb2FkJywgJ2lvbkltZ0RpZExvYWQnLCAnaW9uRXJyb3InXSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uSW1nIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25JbWcge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpbWcgc3JjIGhhcyBiZWVuIHNldFxuICAgKi9cbiAgaW9uSW1nV2lsbExvYWQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGltYWdlIGhhcyBmaW5pc2hlZCBsb2FkaW5nXG4gICAqL1xuICBpb25JbWdEaWRMb2FkOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpbWcgZmFpbHMgdG8gbG9hZFxuICAgKi9cbiAgaW9uRXJyb3I6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3Bvc2l0aW9uJywgJ3RocmVzaG9sZCddLFxuICBtZXRob2RzOiBbJ2NvbXBsZXRlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24taW5maW5pdGUtc2Nyb2xsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydkaXNhYmxlZCcsICdwb3NpdGlvbicsICd0aHJlc2hvbGQnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uSW5maW5pdGVTY3JvbGwge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25JbmZpbml0ZVNjcm9sbEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkluZmluaXRlJ10pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkluZmluaXRlU2Nyb2xsIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25JbmZpbml0ZVNjcm9sbCB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHNjcm9sbCByZWFjaGVzXG50aGUgdGhyZXNob2xkIGRpc3RhbmNlLiBGcm9tIHdpdGhpbiB5b3VyIGluZmluaXRlIGhhbmRsZXIsXG55b3UgbXVzdCBjYWxsIHRoZSBpbmZpbml0ZSBzY3JvbGwncyBgY29tcGxldGUoKWAgbWV0aG9kIHdoZW5cbnlvdXIgYXN5bmMgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAqL1xuICBpb25JbmZpbml0ZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnbG9hZGluZ1NwaW5uZXInLCAnbG9hZGluZ1RleHQnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1pbmZpbml0ZS1zY3JvbGwtY29udGVudCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnbG9hZGluZ1NwaW5uZXInLCAnbG9hZGluZ1RleHQnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uSW5maW5pdGVTY3JvbGxDb250ZW50IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uSW5maW5pdGVTY3JvbGxDb250ZW50RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uSW5maW5pdGVTY3JvbGxDb250ZW50IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25JbmZpbml0ZVNjcm9sbENvbnRlbnQge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9jb3JyZWN0JywgJ2F1dG9mb2N1cycsICdjbGVhcklucHV0JywgJ2NsZWFySW5wdXRJY29uJywgJ2NsZWFyT25FZGl0JywgJ2NvbG9yJywgJ2NvdW50ZXInLCAnY291bnRlckZvcm1hdHRlcicsICdkZWJvdW5jZScsICdkaXNhYmxlZCcsICdlbnRlcmtleWhpbnQnLCAnZXJyb3JUZXh0JywgJ2ZpbGwnLCAnaGVscGVyVGV4dCcsICdpbnB1dG1vZGUnLCAnbGFiZWwnLCAnbGFiZWxQbGFjZW1lbnQnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ21vZGUnLCAnbXVsdGlwbGUnLCAnbmFtZScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3JlYWRvbmx5JywgJ3JlcXVpcmVkJywgJ3NoYXBlJywgJ3NwZWxsY2hlY2snLCAnc3RlcCcsICd0eXBlJywgJ3ZhbHVlJ10sXG4gIG1ldGhvZHM6IFsnc2V0Rm9jdXMnLCAnZ2V0SW5wdXRFbGVtZW50J11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24taW5wdXQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvY29ycmVjdCcsICdhdXRvZm9jdXMnLCAnY2xlYXJJbnB1dCcsICdjbGVhcklucHV0SWNvbicsICdjbGVhck9uRWRpdCcsICdjb2xvcicsICdjb3VudGVyJywgJ2NvdW50ZXJGb3JtYXR0ZXInLCAnZGVib3VuY2UnLCAnZGlzYWJsZWQnLCAnZW50ZXJrZXloaW50JywgJ2Vycm9yVGV4dCcsICdmaWxsJywgJ2hlbHBlclRleHQnLCAnaW5wdXRtb2RlJywgJ2xhYmVsJywgJ2xhYmVsUGxhY2VtZW50JywgJ21heCcsICdtYXhsZW5ndGgnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtb2RlJywgJ211bHRpcGxlJywgJ25hbWUnLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdyZWFkb25seScsICdyZXF1aXJlZCcsICdzaGFwZScsICdzcGVsbGNoZWNrJywgJ3N0ZXAnLCAndHlwZScsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25JbnB1dCB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbklucHV0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uSW5wdXQnLCAnaW9uQ2hhbmdlJywgJ2lvbkJsdXInLCAnaW9uRm9jdXMnXSk7XG4gIH1cbn1cblxuXG5pbXBvcnQgdHlwZSB7IElucHV0SW5wdXRFdmVudERldGFpbCBhcyBJSW9uSW5wdXRJbnB1dElucHV0RXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5pbXBvcnQgdHlwZSB7IElucHV0Q2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvbklucHV0SW5wdXRDaGFuZ2VFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbklucHV0IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25JbnB1dCB7XG4gIC8qKlxuICAgKiBUaGUgYGlvbklucHV0YCBldmVudCBpcyBmaXJlZCBlYWNoIHRpbWUgdGhlIHVzZXIgbW9kaWZpZXMgdGhlIGlucHV0J3MgdmFsdWUuXG5Vbmxpa2UgdGhlIGBpb25DaGFuZ2VgIGV2ZW50LCB0aGUgYGlvbklucHV0YCBldmVudCBpcyBmaXJlZCBmb3IgZWFjaCBhbHRlcmF0aW9uXG50byB0aGUgaW5wdXQncyB2YWx1ZS4gVGhpcyB0eXBpY2FsbHkgaGFwcGVucyBmb3IgZWFjaCBrZXlzdHJva2UgYXMgdGhlIHVzZXIgdHlwZXMuXG5cbkZvciBlbGVtZW50cyB0aGF0IGFjY2VwdCB0ZXh0IGlucHV0IChgdHlwZT10ZXh0YCwgYHR5cGU9dGVsYCwgZXRjLiksIHRoZSBpbnRlcmZhY2VcbmlzIFtgSW5wdXRFdmVudGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JbnB1dEV2ZW50KTsgZm9yIG90aGVycyxcbnRoZSBpbnRlcmZhY2UgaXMgW2BFdmVudGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudCkuIElmXG50aGUgaW5wdXQgaXMgY2xlYXJlZCBvbiBlZGl0LCB0aGUgdHlwZSBpcyBgbnVsbGAuXG4gICAqL1xuICBpb25JbnB1dDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25JbnB1dElucHV0SW5wdXRFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogVGhlIGBpb25DaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgbW9kaWZpZXMgdGhlIGlucHV0J3MgdmFsdWUuXG5Vbmxpa2UgdGhlIGBpb25JbnB1dGAgZXZlbnQsIHRoZSBgaW9uQ2hhbmdlYCBldmVudCBpcyBvbmx5IGZpcmVkIHdoZW4gY2hhbmdlc1xuYXJlIGNvbW1pdHRlZCwgbm90IGFzIHRoZSB1c2VyIHR5cGVzLlxuXG5EZXBlbmRpbmcgb24gdGhlIHdheSB0aGUgdXNlcnMgaW50ZXJhY3RzIHdpdGggdGhlIGVsZW1lbnQsIHRoZSBgaW9uQ2hhbmdlYFxuZXZlbnQgZmlyZXMgYXQgYSBkaWZmZXJlbnQgbW9tZW50OlxuLSBXaGVuIHRoZSB1c2VyIGNvbW1pdHMgdGhlIGNoYW5nZSBleHBsaWNpdGx5IChlLmcuIGJ5IHNlbGVjdGluZyBhIGRhdGVcbmZyb20gYSBkYXRlIHBpY2tlciBmb3IgYDxpb24taW5wdXQgdHlwZT1cImRhdGVcIj5gLCBwcmVzc2luZyB0aGUgXCJFbnRlclwiIGtleSwgZXRjLikuXG4tIFdoZW4gdGhlIGVsZW1lbnQgbG9zZXMgZm9jdXMgYWZ0ZXIgaXRzIHZhbHVlIGhhcyBjaGFuZ2VkOiBmb3IgZWxlbWVudHNcbndoZXJlIHRoZSB1c2VyJ3MgaW50ZXJhY3Rpb24gaXMgdHlwaW5nLlxuXG5UaGlzIGV2ZW50IHdpbGwgbm90IGVtaXQgd2hlbiBwcm9ncmFtbWF0aWNhbGx5IHNldHRpbmcgdGhlIGB2YWx1ZWAgcHJvcGVydHkuXG4gICAqL1xuICBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uSW5wdXRJbnB1dENoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGlucHV0IGxvc2VzIGZvY3VzLlxuICAgKi9cbiAgaW9uQmx1cjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PEZvY3VzRXZlbnQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzLlxuICAgKi9cbiAgaW9uRm9jdXM6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxGb2N1c0V2ZW50Pj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2F1dG9jYXBpdGFsaXplJywgJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ2ZpbGwnLCAnaW5wdXRtb2RlJywgJ2xlbmd0aCcsICdwYXR0ZXJuJywgJ3JlYWRvbmx5JywgJ3NlcGFyYXRvcnMnLCAnc2hhcGUnLCAnc2l6ZScsICd0eXBlJywgJ3ZhbHVlJ10sXG4gIG1ldGhvZHM6IFsnc2V0Rm9jdXMnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1pbnB1dC1vdHAnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2F1dG9jYXBpdGFsaXplJywgJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ2ZpbGwnLCAnaW5wdXRtb2RlJywgJ2xlbmd0aCcsICdwYXR0ZXJuJywgJ3JlYWRvbmx5JywgJ3NlcGFyYXRvcnMnLCAnc2hhcGUnLCAnc2l6ZScsICd0eXBlJywgJ3ZhbHVlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbklucHV0T3RwIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uSW5wdXRPdHBFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25JbnB1dCcsICdpb25DaGFuZ2UnLCAnaW9uQ29tcGxldGUnLCAnaW9uQmx1cicsICdpb25Gb2N1cyddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgSW5wdXRPdHBJbnB1dEV2ZW50RGV0YWlsIGFzIElJb25JbnB1dE90cElucHV0T3RwSW5wdXRFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcbmltcG9ydCB0eXBlIHsgSW5wdXRPdHBDaGFuZ2VFdmVudERldGFpbCBhcyBJSW9uSW5wdXRPdHBJbnB1dE90cENoYW5nZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBJbnB1dE90cENvbXBsZXRlRXZlbnREZXRhaWwgYXMgSUlvbklucHV0T3RwSW5wdXRPdHBDb21wbGV0ZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uSW5wdXRPdHAgZXh0ZW5kcyBDb21wb25lbnRzLklvbklucHV0T3RwIHtcbiAgLyoqXG4gICAqIFRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGVhY2ggdGltZSB0aGUgdXNlciBtb2RpZmllcyB0aGUgaW5wdXQncyB2YWx1ZS5cblVubGlrZSB0aGUgYGlvbkNoYW5nZWAgZXZlbnQsIHRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGZvciBlYWNoIGFsdGVyYXRpb25cbnRvIHRoZSBpbnB1dCdzIHZhbHVlLiBUaGlzIHR5cGljYWxseSBoYXBwZW5zIGZvciBlYWNoIGtleXN0cm9rZSBhcyB0aGUgdXNlciB0eXBlcy5cblxuRm9yIGVsZW1lbnRzIHRoYXQgYWNjZXB0IHRleHQgaW5wdXQgKGB0eXBlPXRleHRgLCBgdHlwZT10ZWxgLCBldGMuKSwgdGhlIGludGVyZmFjZVxuaXMgW2BJbnB1dEV2ZW50YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0lucHV0RXZlbnQpOyBmb3Igb3RoZXJzLFxudGhlIGludGVyZmFjZSBpcyBbYEV2ZW50YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50KS4gSWZcbnRoZSBpbnB1dCBpcyBjbGVhcmVkIG9uIGVkaXQsIHRoZSB0eXBlIGlzIGBudWxsYC5cbiAgICovXG4gIGlvbklucHV0OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbklucHV0T3RwSW5wdXRPdHBJbnB1dEV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBUaGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb2RpZmllcyB0aGUgaW5wdXQncyB2YWx1ZS5cblVubGlrZSB0aGUgYGlvbklucHV0YCBldmVudCwgdGhlIGBpb25DaGFuZ2VgIGV2ZW50IGlzIG9ubHkgZmlyZWQgd2hlbiBjaGFuZ2VzXG5hcmUgY29tbWl0dGVkLCBub3QgYXMgdGhlIHVzZXIgdHlwZXMuXG5cblRoZSBgaW9uQ2hhbmdlYCBldmVudCBmaXJlcyB3aGVuIHRoZSBgPGlvbi1pbnB1dC1vdHA+YCBjb21wb25lbnQgbG9zZXNcbmZvY3VzIGFmdGVyIGl0cyB2YWx1ZSBoYXMgY2hhbmdlZC5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvbklucHV0T3RwSW5wdXRPdHBDaGFuZ2VFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIGFsbCBpbnB1dCBib3hlcyBoYXZlIGJlZW4gZmlsbGVkIHdpdGggdmFsaWQgdmFsdWVzLlxuICAgKi9cbiAgaW9uQ29tcGxldGU6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uSW5wdXRPdHBJbnB1dE90cENvbXBsZXRlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgZ3JvdXAgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8Rm9jdXNFdmVudD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBncm91cCBoYXMgZm9jdXMuXG4gICAqL1xuICBpb25Gb2N1czogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PEZvY3VzRXZlbnQ+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY29sb3InLCAnaGlkZUljb24nLCAnbW9kZScsICdzaG93SWNvbiddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWlucHV0LXBhc3N3b3JkLXRvZ2dsZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnaGlkZUljb24nLCAnbW9kZScsICdzaG93SWNvbiddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25JbnB1dFBhc3N3b3JkVG9nZ2xlIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uSW5wdXRQYXNzd29yZFRvZ2dsZUVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbklucHV0UGFzc3dvcmRUb2dnbGUgZXh0ZW5kcyBDb21wb25lbnRzLklvbklucHV0UGFzc3dvcmRUb2dnbGUge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYnV0dG9uJywgJ2NvbG9yJywgJ2RldGFpbCcsICdkZXRhaWxJY29uJywgJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2hyZWYnLCAnbGluZXMnLCAnbW9kZScsICdyZWwnLCAncm91dGVyQW5pbWF0aW9uJywgJ3JvdXRlckRpcmVjdGlvbicsICd0YXJnZXQnLCAndHlwZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWl0ZW0nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2J1dHRvbicsICdjb2xvcicsICdkZXRhaWwnLCAnZGV0YWlsSWNvbicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdocmVmJywgJ2xpbmVzJywgJ21vZGUnLCAncmVsJywgJ3JvdXRlckFuaW1hdGlvbicsICdyb3V0ZXJEaXJlY3Rpb24nLCAndGFyZ2V0JywgJ3R5cGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uSXRlbSB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkl0ZW1FbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25JdGVtIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25JdGVtIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnLCAnc3RpY2t5J11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24taXRlbS1kaXZpZGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xvcicsICdtb2RlJywgJ3N0aWNreSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25JdGVtRGl2aWRlciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkl0ZW1EaXZpZGVyRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uSXRlbURpdmlkZXIgZXh0ZW5kcyBDb21wb25lbnRzLklvbkl0ZW1EaXZpZGVyIHt9XG5cblxuQFByb3h5Q21wKHtcbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24taXRlbS1ncm91cCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBJb25JdGVtR3JvdXAge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25JdGVtR3JvdXBFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25JdGVtR3JvdXAgZXh0ZW5kcyBDb21wb25lbnRzLklvbkl0ZW1Hcm91cCB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdleHBhbmRhYmxlJywgJ2hyZWYnLCAnbW9kZScsICdyZWwnLCAndGFyZ2V0JywgJ3R5cGUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1pdGVtLW9wdGlvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZWQnLCAnZG93bmxvYWQnLCAnZXhwYW5kYWJsZScsICdocmVmJywgJ21vZGUnLCAncmVsJywgJ3RhcmdldCcsICd0eXBlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkl0ZW1PcHRpb24ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25JdGVtT3B0aW9uRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uSXRlbU9wdGlvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uSXRlbU9wdGlvbiB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydzaWRlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24taXRlbS1vcHRpb25zJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydzaWRlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkl0ZW1PcHRpb25zIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uSXRlbU9wdGlvbnNFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25Td2lwZSddKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25JdGVtT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudHMuSW9uSXRlbU9wdGlvbnMge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpdGVtIGhhcyBiZWVuIGZ1bGx5IHN3aXBlZC5cbiAgICovXG4gIGlvblN3aXBlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8YW55Pj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gIG1ldGhvZHM6IFsnZ2V0T3BlbkFtb3VudCcsICdnZXRTbGlkaW5nUmF0aW8nLCAnb3BlbicsICdjbG9zZScsICdjbG9zZU9wZW5lZCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWl0ZW0tc2xpZGluZycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uSXRlbVNsaWRpbmcge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25JdGVtU2xpZGluZ0VsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkRyYWcnXSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uSXRlbVNsaWRpbmcgZXh0ZW5kcyBDb21wb25lbnRzLklvbkl0ZW1TbGlkaW5nIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgc2xpZGluZyBwb3NpdGlvbiBjaGFuZ2VzLlxuICAgKi9cbiAgaW9uRHJhZzogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PGFueT4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xvcicsICdtb2RlJywgJ3Bvc2l0aW9uJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tbGFiZWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnLCAncG9zaXRpb24nXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uTGFiZWwge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25MYWJlbEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbkxhYmVsIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25MYWJlbCB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydpbnNldCcsICdsaW5lcycsICdtb2RlJ10sXG4gIG1ldGhvZHM6IFsnY2xvc2VTbGlkaW5nSXRlbXMnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1saXN0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydpbnNldCcsICdsaW5lcycsICdtb2RlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkxpc3Qge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25MaXN0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uTGlzdCBleHRlbmRzIENvbXBvbmVudHMuSW9uTGlzdCB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xvcicsICdsaW5lcycsICdtb2RlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tbGlzdC1oZWFkZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2xpbmVzJywgJ21vZGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uTGlzdEhlYWRlciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbkxpc3RIZWFkZXJFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25MaXN0SGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25MaXN0SGVhZGVyIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2JhY2tkcm9wRGlzbWlzcycsICdjc3NDbGFzcycsICdkdXJhdGlvbicsICdlbnRlckFuaW1hdGlvbicsICdodG1sQXR0cmlidXRlcycsICdpc09wZW4nLCAna2V5Ym9hcmRDbG9zZScsICdsZWF2ZUFuaW1hdGlvbicsICdtZXNzYWdlJywgJ21vZGUnLCAnc2hvd0JhY2tkcm9wJywgJ3NwaW5uZXInLCAndHJhbnNsdWNlbnQnLCAndHJpZ2dlciddLFxuICBtZXRob2RzOiBbJ3ByZXNlbnQnLCAnZGlzbWlzcycsICdvbkRpZERpc21pc3MnLCAnb25XaWxsRGlzbWlzcyddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWxvYWRpbmcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2JhY2tkcm9wRGlzbWlzcycsICdjc3NDbGFzcycsICdkdXJhdGlvbicsICdlbnRlckFuaW1hdGlvbicsICdodG1sQXR0cmlidXRlcycsICdpc09wZW4nLCAna2V5Ym9hcmRDbG9zZScsICdsZWF2ZUFuaW1hdGlvbicsICdtZXNzYWdlJywgJ21vZGUnLCAnc2hvd0JhY2tkcm9wJywgJ3NwaW5uZXInLCAndHJhbnNsdWNlbnQnLCAndHJpZ2dlciddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Mb2FkaW5nIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uTG9hZGluZ0VsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkxvYWRpbmdEaWRQcmVzZW50JywgJ2lvbkxvYWRpbmdXaWxsUHJlc2VudCcsICdpb25Mb2FkaW5nV2lsbERpc21pc3MnLCAnaW9uTG9hZGluZ0RpZERpc21pc3MnLCAnZGlkUHJlc2VudCcsICd3aWxsUHJlc2VudCcsICd3aWxsRGlzbWlzcycsICdkaWREaXNtaXNzJ10pO1xuICB9XG59XG5cblxuaW1wb3J0IHR5cGUgeyBPdmVybGF5RXZlbnREZXRhaWwgYXMgSUlvbkxvYWRpbmdPdmVybGF5RXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25Mb2FkaW5nIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25Mb2FkaW5nIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIGxvYWRpbmcgaGFzIHByZXNlbnRlZC5cbiAgICovXG4gIGlvbkxvYWRpbmdEaWRQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIGxvYWRpbmcgaGFzIHByZXNlbnRlZC5cbiAgICovXG4gIGlvbkxvYWRpbmdXaWxsUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBsb2FkaW5nIGhhcyBkaXNtaXNzZWQuXG4gICAqL1xuICBpb25Mb2FkaW5nV2lsbERpc21pc3M6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uTG9hZGluZ092ZXJsYXlFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgbG9hZGluZyBoYXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgaW9uTG9hZGluZ0RpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uTG9hZGluZ092ZXJsYXlFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgbG9hZGluZyBpbmRpY2F0b3IgaGFzIHByZXNlbnRlZC5cblNob3J0aGFuZCBmb3IgaW9uTG9hZGluZ1dpbGxEaXNtaXNzLlxuICAgKi9cbiAgZGlkUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBsb2FkaW5nIGluZGljYXRvciBoYXMgcHJlc2VudGVkLlxuU2hvcnRoYW5kIGZvciBpb25Mb2FkaW5nV2lsbFByZXNlbnQuXG4gICAqL1xuICB3aWxsUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBsb2FkaW5nIGluZGljYXRvciBoYXMgZGlzbWlzc2VkLlxuU2hvcnRoYW5kIGZvciBpb25Mb2FkaW5nV2lsbERpc21pc3MuXG4gICAqL1xuICB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25Mb2FkaW5nT3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBsb2FkaW5nIGluZGljYXRvciBoYXMgZGlzbWlzc2VkLlxuU2hvcnRoYW5kIGZvciBpb25Mb2FkaW5nRGlkRGlzbWlzcy5cbiAgICovXG4gIGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uTG9hZGluZ092ZXJsYXlFdmVudERldGFpbD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb250ZW50SWQnLCAnZGlzYWJsZWQnLCAnbWF4RWRnZVN0YXJ0JywgJ21lbnVJZCcsICdzaWRlJywgJ3N3aXBlR2VzdHVyZScsICd0eXBlJ10sXG4gIG1ldGhvZHM6IFsnaXNPcGVuJywgJ2lzQWN0aXZlJywgJ29wZW4nLCAnY2xvc2UnLCAndG9nZ2xlJywgJ3NldE9wZW4nXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1tZW51JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb250ZW50SWQnLCAnZGlzYWJsZWQnLCAnbWF4RWRnZVN0YXJ0JywgJ21lbnVJZCcsICdzaWRlJywgJ3N3aXBlR2VzdHVyZScsICd0eXBlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbk1lbnUge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25NZW51RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uV2lsbE9wZW4nLCAnaW9uV2lsbENsb3NlJywgJ2lvbkRpZE9wZW4nLCAnaW9uRGlkQ2xvc2UnXSk7XG4gIH1cbn1cblxuXG5pbXBvcnQgdHlwZSB7IE1lbnVDbG9zZUV2ZW50RGV0YWlsIGFzIElJb25NZW51TWVudUNsb3NlRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25NZW51IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25NZW51IHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgbWVudSBpcyBhYm91dCB0byBiZSBvcGVuZWQuXG4gICAqL1xuICBpb25XaWxsT3BlbjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgbWVudSBpcyBhYm91dCB0byBiZSBjbG9zZWQuXG4gICAqL1xuICBpb25XaWxsQ2xvc2U6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uTWVudU1lbnVDbG9zZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIG1lbnUgaXMgb3Blbi5cbiAgICovXG4gIGlvbkRpZE9wZW46IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkLlxuICAgKi9cbiAgaW9uRGlkQ2xvc2U6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uTWVudU1lbnVDbG9zZUV2ZW50RGV0YWlsPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2F1dG9IaWRlJywgJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ21lbnUnLCAnbW9kZScsICd0eXBlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tbWVudS1idXR0b24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2F1dG9IaWRlJywgJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ21lbnUnLCAnbW9kZScsICd0eXBlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbk1lbnVCdXR0b24ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25NZW51QnV0dG9uRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uTWVudUJ1dHRvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uTWVudUJ1dHRvbiB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydhdXRvSGlkZScsICdtZW51J11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tbWVudS10b2dnbGUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2F1dG9IaWRlJywgJ21lbnUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uTWVudVRvZ2dsZSB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvbk1lbnVUb2dnbGVFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25NZW51VG9nZ2xlIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25NZW51VG9nZ2xlIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbXBvbmVudCcsICdjb21wb25lbnRQcm9wcycsICdyb3V0ZXJBbmltYXRpb24nLCAncm91dGVyRGlyZWN0aW9uJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tbmF2LWxpbmsnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbXBvbmVudCcsICdjb21wb25lbnRQcm9wcycsICdyb3V0ZXJBbmltYXRpb24nLCAncm91dGVyRGlyZWN0aW9uJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbk5hdkxpbmsge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25OYXZMaW5rRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uTmF2TGluayBleHRlbmRzIENvbXBvbmVudHMuSW9uTmF2TGluayB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xvcicsICdtb2RlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tbm90ZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnbW9kZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Ob3RlIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uTm90ZUVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvbk5vdGUgZXh0ZW5kcyBDb21wb25lbnRzLklvbk5vdGUge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnbW9kZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXBpY2tlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnbW9kZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25QaWNrZXIge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25QaWNrZXJFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25QaWNrZXIgZXh0ZW5kcyBDb21wb25lbnRzLklvblBpY2tlciB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlZCcsICdtb2RlJywgJ3ZhbHVlJ10sXG4gIG1ldGhvZHM6IFsnc2V0Rm9jdXMnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1waWNrZXItY29sdW1uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xvcicsICdkaXNhYmxlZCcsICdtb2RlJywgJ3ZhbHVlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblBpY2tlckNvbHVtbiB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblBpY2tlckNvbHVtbkVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkNoYW5nZSddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgUGlja2VyQ29sdW1uQ2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvblBpY2tlckNvbHVtblBpY2tlckNvbHVtbkNoYW5nZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUGlja2VyQ29sdW1uIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25QaWNrZXJDb2x1bW4ge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblBpY2tlckNvbHVtblBpY2tlckNvbHVtbkNoYW5nZUV2ZW50RGV0YWlsPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ3ZhbHVlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tcGlja2VyLWNvbHVtbi1vcHRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ3ZhbHVlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblBpY2tlckNvbHVtbk9wdGlvbiB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblBpY2tlckNvbHVtbk9wdGlvbkVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblBpY2tlckNvbHVtbk9wdGlvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uUGlja2VyQ29sdW1uT3B0aW9uIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2JhY2tkcm9wRGlzbWlzcycsICdidXR0b25zJywgJ2NvbHVtbnMnLCAnY3NzQ2xhc3MnLCAnZHVyYXRpb24nLCAnZW50ZXJBbmltYXRpb24nLCAnaHRtbEF0dHJpYnV0ZXMnLCAnaXNPcGVuJywgJ2tleWJvYXJkQ2xvc2UnLCAnbGVhdmVBbmltYXRpb24nLCAnbW9kZScsICdzaG93QmFja2Ryb3AnLCAndHJpZ2dlciddLFxuICBtZXRob2RzOiBbJ3ByZXNlbnQnLCAnZGlzbWlzcycsICdvbkRpZERpc21pc3MnLCAnb25XaWxsRGlzbWlzcycsICdnZXRDb2x1bW4nXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1waWNrZXItbGVnYWN5JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhbmltYXRlZCcsICdiYWNrZHJvcERpc21pc3MnLCAnYnV0dG9ucycsICdjb2x1bW5zJywgJ2Nzc0NsYXNzJywgJ2R1cmF0aW9uJywgJ2VudGVyQW5pbWF0aW9uJywgJ2h0bWxBdHRyaWJ1dGVzJywgJ2lzT3BlbicsICdrZXlib2FyZENsb3NlJywgJ2xlYXZlQW5pbWF0aW9uJywgJ21vZGUnLCAnc2hvd0JhY2tkcm9wJywgJ3RyaWdnZXInXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uUGlja2VyTGVnYWN5IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uUGlja2VyTGVnYWN5RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uUGlja2VyRGlkUHJlc2VudCcsICdpb25QaWNrZXJXaWxsUHJlc2VudCcsICdpb25QaWNrZXJXaWxsRGlzbWlzcycsICdpb25QaWNrZXJEaWREaXNtaXNzJywgJ2RpZFByZXNlbnQnLCAnd2lsbFByZXNlbnQnLCAnd2lsbERpc21pc3MnLCAnZGlkRGlzbWlzcyddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgT3ZlcmxheUV2ZW50RGV0YWlsIGFzIElJb25QaWNrZXJMZWdhY3lPdmVybGF5RXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25QaWNrZXJMZWdhY3kgZXh0ZW5kcyBDb21wb25lbnRzLklvblBpY2tlckxlZ2FjeSB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSBwaWNrZXIgaGFzIHByZXNlbnRlZC5cbiAgICovXG4gIGlvblBpY2tlckRpZFByZXNlbnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGJlZm9yZSB0aGUgcGlja2VyIGhhcyBwcmVzZW50ZWQuXG4gICAqL1xuICBpb25QaWNrZXJXaWxsUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBwaWNrZXIgaGFzIGRpc21pc3NlZC5cbiAgICovXG4gIGlvblBpY2tlcldpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblBpY2tlckxlZ2FjeU92ZXJsYXlFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgcGlja2VyIGhhcyBkaXNtaXNzZWQuXG4gICAqL1xuICBpb25QaWNrZXJEaWREaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblBpY2tlckxlZ2FjeU92ZXJsYXlFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBhZnRlciB0aGUgcGlja2VyIGhhcyBwcmVzZW50ZWQuXG5TaG9ydGhhbmQgZm9yIGlvblBpY2tlcldpbGxEaXNtaXNzLlxuICAgKi9cbiAgZGlkUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBwaWNrZXIgaGFzIHByZXNlbnRlZC5cblNob3J0aGFuZCBmb3IgaW9uUGlja2VyV2lsbFByZXNlbnQuXG4gICAqL1xuICB3aWxsUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSBwaWNrZXIgaGFzIGRpc21pc3NlZC5cblNob3J0aGFuZCBmb3IgaW9uUGlja2VyV2lsbERpc21pc3MuXG4gICAqL1xuICB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25QaWNrZXJMZWdhY3lPdmVybGF5RXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYWZ0ZXIgdGhlIHBpY2tlciBoYXMgZGlzbWlzc2VkLlxuU2hvcnRoYW5kIGZvciBpb25QaWNrZXJEaWREaXNtaXNzLlxuICAgKi9cbiAgZGlkRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25QaWNrZXJMZWdhY3lPdmVybGF5RXZlbnREZXRhaWw+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYnVmZmVyJywgJ2NvbG9yJywgJ21vZGUnLCAncmV2ZXJzZWQnLCAndHlwZScsICd2YWx1ZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXByb2dyZXNzLWJhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYnVmZmVyJywgJ2NvbG9yJywgJ21vZGUnLCAncmV2ZXJzZWQnLCAndHlwZScsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Qcm9ncmVzc0JhciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblByb2dyZXNzQmFyRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBDb21wb25lbnRzLklvblByb2dyZXNzQmFyIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FsaWdubWVudCcsICdjb2xvcicsICdkaXNhYmxlZCcsICdqdXN0aWZ5JywgJ2xhYmVsUGxhY2VtZW50JywgJ21vZGUnLCAnbmFtZScsICd2YWx1ZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXJhZGlvJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhbGlnbm1lbnQnLCAnY29sb3InLCAnZGlzYWJsZWQnLCAnanVzdGlmeScsICdsYWJlbFBsYWNlbWVudCcsICdtb2RlJywgJ25hbWUnLCAndmFsdWUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uUmFkaW8ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25SYWRpb0VsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkZvY3VzJywgJ2lvbkJsdXInXSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUmFkaW8gZXh0ZW5kcyBDb21wb25lbnRzLklvblJhZGlvIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgcmFkaW8gYnV0dG9uIGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSByYWRpbyBidXR0b24gbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydhbGxvd0VtcHR5U2VsZWN0aW9uJywgJ2NvbXBhcmVXaXRoJywgJ2Vycm9yVGV4dCcsICdoZWxwZXJUZXh0JywgJ25hbWUnLCAndmFsdWUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1yYWRpby1ncm91cCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYWxsb3dFbXB0eVNlbGVjdGlvbicsICdjb21wYXJlV2l0aCcsICdlcnJvclRleHQnLCAnaGVscGVyVGV4dCcsICduYW1lJywgJ3ZhbHVlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblJhZGlvR3JvdXAge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25SYWRpb0dyb3VwRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJ10pO1xuICB9XG59XG5cblxuaW1wb3J0IHR5cGUgeyBSYWRpb0dyb3VwQ2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvblJhZGlvR3JvdXBSYWRpb0dyb3VwQ2hhbmdlRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25SYWRpb0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25SYWRpb0dyb3VwIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQuXG5cblRoaXMgZXZlbnQgd2lsbCBub3QgZW1pdCB3aGVuIHByb2dyYW1tYXRpY2FsbHkgc2V0dGluZyB0aGUgYHZhbHVlYCBwcm9wZXJ0eS5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25SYWRpb0dyb3VwUmFkaW9Hcm91cENoYW5nZUV2ZW50RGV0YWlsPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FjdGl2ZUJhclN0YXJ0JywgJ2NvbG9yJywgJ2RlYm91bmNlJywgJ2Rpc2FibGVkJywgJ2R1YWxLbm9icycsICdsYWJlbCcsICdsYWJlbFBsYWNlbWVudCcsICdtYXgnLCAnbWluJywgJ21vZGUnLCAnbmFtZScsICdwaW4nLCAncGluRm9ybWF0dGVyJywgJ3NuYXBzJywgJ3N0ZXAnLCAndGlja3MnLCAndmFsdWUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1yYW5nZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYWN0aXZlQmFyU3RhcnQnLCAnY29sb3InLCAnZGVib3VuY2UnLCAnZGlzYWJsZWQnLCAnZHVhbEtub2JzJywgJ2xhYmVsJywgJ2xhYmVsUGxhY2VtZW50JywgJ21heCcsICdtaW4nLCAnbW9kZScsICduYW1lJywgJ3BpbicsICdwaW5Gb3JtYXR0ZXInLCAnc25hcHMnLCAnc3RlcCcsICd0aWNrcycsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25SYW5nZSB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblJhbmdlRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJywgJ2lvbklucHV0JywgJ2lvbkZvY3VzJywgJ2lvbkJsdXInLCAnaW9uS25vYk1vdmVTdGFydCcsICdpb25Lbm9iTW92ZUVuZCddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgUmFuZ2VDaGFuZ2VFdmVudERldGFpbCBhcyBJSW9uUmFuZ2VSYW5nZUNoYW5nZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBSYW5nZUtub2JNb3ZlU3RhcnRFdmVudERldGFpbCBhcyBJSW9uUmFuZ2VSYW5nZUtub2JNb3ZlU3RhcnRFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcbmltcG9ydCB0eXBlIHsgUmFuZ2VLbm9iTW92ZUVuZEV2ZW50RGV0YWlsIGFzIElJb25SYW5nZVJhbmdlS25vYk1vdmVFbmRFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblJhbmdlIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25SYW5nZSB7XG4gIC8qKlxuICAgKiBUaGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgZm9yIGA8aW9uLXJhbmdlPmAgZWxlbWVudHMgd2hlbiB0aGUgdXNlclxubW9kaWZpZXMgdGhlIGVsZW1lbnQncyB2YWx1ZTpcbi0gV2hlbiB0aGUgdXNlciByZWxlYXNlcyB0aGUga25vYiBhZnRlciBkcmFnZ2luZztcbi0gV2hlbiB0aGUgdXNlciBtb3ZlcyB0aGUga25vYiB3aXRoIGtleWJvYXJkIGFycm93c1xuXG5UaGlzIGV2ZW50IHdpbGwgbm90IGVtaXQgd2hlbiBwcm9ncmFtbWF0aWNhbGx5IHNldHRpbmcgdGhlIGB2YWx1ZWAgcHJvcGVydHkuXG4gICAqL1xuICBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uUmFuZ2VSYW5nZUNoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBUaGUgYGlvbklucHV0YCBldmVudCBpcyBmaXJlZCBmb3IgYDxpb24tcmFuZ2U+YCBlbGVtZW50cyB3aGVuIHRoZSB2YWx1ZVxuaXMgbW9kaWZpZWQuIFVubGlrZSBgaW9uQ2hhbmdlYCwgYGlvbklucHV0YCBpcyBmaXJlZCBjb250aW51b3VzbHlcbndoaWxlIHRoZSB1c2VyIGlzIGRyYWdnaW5nIHRoZSBrbm9iLlxuICAgKi9cbiAgaW9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uUmFuZ2VSYW5nZUNoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHJhbmdlIGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSByYW5nZSBsb3NlcyBmb2N1cy5cbiAgICovXG4gIGlvbkJsdXI6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIG1vdmluZyB0aGUgcmFuZ2Uga25vYiwgd2hldGhlciB0aHJvdWdoXG5tb3VzZSBkcmFnLCB0b3VjaCBnZXN0dXJlLCBvciBrZXlib2FyZCBpbnRlcmFjdGlvbi5cbiAgICovXG4gIGlvbktub2JNb3ZlU3RhcnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uUmFuZ2VSYW5nZUtub2JNb3ZlU3RhcnRFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIGZpbmlzaGVzIG1vdmluZyB0aGUgcmFuZ2Uga25vYiwgd2hldGhlciB0aHJvdWdoXG5tb3VzZSBkcmFnLCB0b3VjaCBnZXN0dXJlLCBvciBrZXlib2FyZCBpbnRlcmFjdGlvbi5cbiAgICovXG4gIGlvbktub2JNb3ZlRW5kOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblJhbmdlUmFuZ2VLbm9iTW92ZUVuZEV2ZW50RGV0YWlsPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2Nsb3NlRHVyYXRpb24nLCAnZGlzYWJsZWQnLCAnbW9kZScsICdwdWxsRmFjdG9yJywgJ3B1bGxNYXgnLCAncHVsbE1pbicsICdzbmFwYmFja0R1cmF0aW9uJ10sXG4gIG1ldGhvZHM6IFsnY29tcGxldGUnLCAnY2FuY2VsJywgJ2dldFByb2dyZXNzJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tcmVmcmVzaGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjbG9zZUR1cmF0aW9uJywgJ2Rpc2FibGVkJywgJ21vZGUnLCAncHVsbEZhY3RvcicsICdwdWxsTWF4JywgJ3B1bGxNaW4nLCAnc25hcGJhY2tEdXJhdGlvbiddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25SZWZyZXNoZXIge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25SZWZyZXNoZXJFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25SZWZyZXNoJywgJ2lvblB1bGwnLCAnaW9uU3RhcnQnLCAnaW9uUHVsbFN0YXJ0JywgJ2lvblB1bGxFbmQnXSk7XG4gIH1cbn1cblxuXG5pbXBvcnQgdHlwZSB7IFJlZnJlc2hlckV2ZW50RGV0YWlsIGFzIElJb25SZWZyZXNoZXJSZWZyZXNoZXJFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcbmltcG9ydCB0eXBlIHsgUmVmcmVzaGVyUHVsbEVuZEV2ZW50RGV0YWlsIGFzIElJb25SZWZyZXNoZXJSZWZyZXNoZXJQdWxsRW5kRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25SZWZyZXNoZXIgZXh0ZW5kcyBDb21wb25lbnRzLklvblJlZnJlc2hlciB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgbGV0cyBnbyBvZiB0aGUgY29udGVudCBhbmQgaGFzIHB1bGxlZCBkb3duXG5mdXJ0aGVyIHRoYW4gdGhlIGBwdWxsTWluYCBvciBwdWxscyB0aGUgY29udGVudCBkb3duIGFuZCBleGNlZWRzIHRoZSBwdWxsTWF4LlxuVXBkYXRlcyB0aGUgcmVmcmVzaGVyIHN0YXRlIHRvIGByZWZyZXNoaW5nYC4gVGhlIGBjb21wbGV0ZSgpYCBtZXRob2Qgc2hvdWxkIGJlXG5jYWxsZWQgd2hlbiB0aGUgYXN5bmMgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWQuXG4gICAqL1xuICBpb25SZWZyZXNoOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblJlZnJlc2hlclJlZnJlc2hlckV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoaWxlIHRoZSB1c2VyIGlzIHB1bGxpbmcgZG93biB0aGUgY29udGVudCBhbmQgZXhwb3NpbmcgdGhlIHJlZnJlc2hlci5cbiAgICovXG4gIGlvblB1bGw6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHVzZXIgYmVnaW5zIHRvIHN0YXJ0IHB1bGxpbmcgZG93bi4gQGRlcHJlY2F0ZWQgVXNlIGBpb25QdWxsU3RhcnRgIGluc3RlYWQuXG4gICAqL1xuICBpb25TdGFydDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgdXNlciBiZWdpbnMgdG8gc3RhcnQgcHVsbGluZyBkb3duLlxuICAgKi9cbiAgaW9uUHVsbFN0YXJ0OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSByZWZyZXNoZXIgaGFzIHJldHVybmVkIHRvIHRoZSBpbmFjdGl2ZSBzdGF0ZVxuYWZ0ZXIgYSBwdWxsIGdlc3R1cmUuIFRoaXMgZmlyZXMgd2hldGhlciB0aGUgcmVmcmVzaCBjb21wbGV0ZWRcbnN1Y2Nlc3NmdWxseSBvciB3YXMgY2FuY2VsZWQuXG4gICAqL1xuICBpb25QdWxsRW5kOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblJlZnJlc2hlclJlZnJlc2hlclB1bGxFbmRFdmVudERldGFpbD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydwdWxsaW5nSWNvbicsICdwdWxsaW5nVGV4dCcsICdyZWZyZXNoaW5nU3Bpbm5lcicsICdyZWZyZXNoaW5nVGV4dCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXJlZnJlc2hlci1jb250ZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydwdWxsaW5nSWNvbicsICdwdWxsaW5nVGV4dCcsICdyZWZyZXNoaW5nU3Bpbm5lcicsICdyZWZyZXNoaW5nVGV4dCddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25SZWZyZXNoZXJDb250ZW50IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uUmVmcmVzaGVyQ29udGVudEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblJlZnJlc2hlckNvbnRlbnQgZXh0ZW5kcyBDb21wb25lbnRzLklvblJlZnJlc2hlckNvbnRlbnQge31cblxuXG5AUHJveHlDbXAoe1xufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1yZW9yZGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogW10sXG59KVxuZXhwb3J0IGNsYXNzIElvblJlb3JkZXIge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25SZW9yZGVyRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUmVvcmRlciBleHRlbmRzIENvbXBvbmVudHMuSW9uUmVvcmRlciB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBtZXRob2RzOiBbJ2NvbXBsZXRlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tcmVvcmRlci1ncm91cCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uUmVvcmRlckdyb3VwIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uUmVvcmRlckdyb3VwRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uSXRlbVJlb3JkZXInLCAnaW9uUmVvcmRlclN0YXJ0JywgJ2lvblJlb3JkZXJNb3ZlJywgJ2lvblJlb3JkZXJFbmQnXSk7XG4gIH1cbn1cblxuXG5pbXBvcnQgdHlwZSB7IEl0ZW1SZW9yZGVyRXZlbnREZXRhaWwgYXMgSUlvblJlb3JkZXJHcm91cEl0ZW1SZW9yZGVyRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFJlb3JkZXJNb3ZlRXZlbnREZXRhaWwgYXMgSUlvblJlb3JkZXJHcm91cFJlb3JkZXJNb3ZlRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFJlb3JkZXJFbmRFdmVudERldGFpbCBhcyBJSW9uUmVvcmRlckdyb3VwUmVvcmRlckVuZEV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUmVvcmRlckdyb3VwIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25SZW9yZGVyR3JvdXAge1xuICAvKipcbiAgICogRXZlbnQgdGhhdCBuZWVkcyB0byBiZSBsaXN0ZW5lZCB0byBpbiBvcmRlciB0byBjb21wbGV0ZSB0aGUgcmVvcmRlciBhY3Rpb24uIEBkZXByZWNhdGVkIFVzZSBgaW9uUmVvcmRlckVuZGAgaW5zdGVhZC4gSWYgeW91IGFyZSBhY2Nlc3NpbmdcbmBldmVudC5kZXRhaWwuZnJvbWAgb3IgYGV2ZW50LmRldGFpbC50b2AgYW5kIHJlbHlpbmcgb24gdGhlbVxuYmVpbmcgZGlmZmVyZW50IHlvdSBzaG91bGQgbm93IGFkZCBjaGVja3MgYXMgdGhleSBhcmUgYWx3YXlzIGVtaXR0ZWRcbmluIGBpb25SZW9yZGVyRW5kYCwgZXZlbiB3aGVuIHRoZXkgYXJlIHRoZSBzYW1lLlxuICAgKi9cbiAgaW9uSXRlbVJlb3JkZXI6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxJSW9uUmVvcmRlckdyb3VwSXRlbVJlb3JkZXJFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHJlb3JkZXIgZ2VzdHVyZSBzdGFydHMuXG4gICAqL1xuICBpb25SZW9yZGVyU3RhcnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgYXMgdGhlIHJlb3JkZXIgZ2VzdHVyZSBtb3Zlcy5cbiAgICovXG4gIGlvblJlb3JkZXJNb3ZlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblJlb3JkZXJHcm91cFJlb3JkZXJNb3ZlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSByZW9yZGVyIGdlc3R1cmUgZW5kcy5cblRoZSBmcm9tIGFuZCB0byBwcm9wZXJ0aWVzIGFyZSBhbHdheXMgYXZhaWxhYmxlLCByZWdhcmRsZXNzIG9mXG5pZiB0aGUgcmVvcmRlciBnZXN0dXJlIG1vdmVkIHRoZSBpdGVtLiBJZiB0aGUgaXRlbSBkaWQgbm90IGNoYW5nZVxuZnJvbSBpdHMgc3RhcnQgcG9zaXRpb24sIHRoZSBmcm9tIGFuZCB0byBwcm9wZXJ0aWVzIHdpbGwgYmUgdGhlIHNhbWUuXG5PbmNlIHRoZSBldmVudCBoYXMgYmVlbiBlbWl0dGVkLCB0aGUgYGNvbXBsZXRlKClgIG1ldGhvZCB0aGVuIG5lZWRzXG50byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gZmluYWxpemUgdGhlIHJlb3JkZXIgYWN0aW9uLlxuICAgKi9cbiAgaW9uUmVvcmRlckVuZDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25SZW9yZGVyR3JvdXBSZW9yZGVyRW5kRXZlbnREZXRhaWw+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsndHlwZSddLFxuICBtZXRob2RzOiBbJ2FkZFJpcHBsZSddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXJpcHBsZS1lZmZlY3QnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ3R5cGUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uUmlwcGxlRWZmZWN0IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uUmlwcGxlRWZmZWN0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUmlwcGxlRWZmZWN0IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25SaXBwbGVFZmZlY3Qge31cblxuXG5AUHJveHlDbXAoe1xufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1yb3cnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uUm93IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uUm93RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uUm93IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25Sb3cge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9jb3JyZWN0JywgJ2NhbmNlbEJ1dHRvbkljb24nLCAnY2FuY2VsQnV0dG9uVGV4dCcsICdjbGVhckljb24nLCAnY29sb3InLCAnZGVib3VuY2UnLCAnZGlzYWJsZWQnLCAnZW50ZXJrZXloaW50JywgJ2lucHV0bW9kZScsICdtYXhsZW5ndGgnLCAnbWlubGVuZ3RoJywgJ21vZGUnLCAnbmFtZScsICdwbGFjZWhvbGRlcicsICdzZWFyY2hJY29uJywgJ3Nob3dDYW5jZWxCdXR0b24nLCAnc2hvd0NsZWFyQnV0dG9uJywgJ3NwZWxsY2hlY2snLCAndHlwZScsICd2YWx1ZSddLFxuICBtZXRob2RzOiBbJ3NldEZvY3VzJywgJ2dldElucHV0RWxlbWVudCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXNlYXJjaGJhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnYW5pbWF0ZWQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9jb3JyZWN0JywgJ2NhbmNlbEJ1dHRvbkljb24nLCAnY2FuY2VsQnV0dG9uVGV4dCcsICdjbGVhckljb24nLCAnY29sb3InLCAnZGVib3VuY2UnLCAnZGlzYWJsZWQnLCAnZW50ZXJrZXloaW50JywgJ2lucHV0bW9kZScsICdtYXhsZW5ndGgnLCAnbWlubGVuZ3RoJywgJ21vZGUnLCAnbmFtZScsICdwbGFjZWhvbGRlcicsICdzZWFyY2hJY29uJywgJ3Nob3dDYW5jZWxCdXR0b24nLCAnc2hvd0NsZWFyQnV0dG9uJywgJ3NwZWxsY2hlY2snLCAndHlwZScsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25TZWFyY2hiYXIge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25TZWFyY2hiYXJFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25JbnB1dCcsICdpb25DaGFuZ2UnLCAnaW9uQ2FuY2VsJywgJ2lvbkNsZWFyJywgJ2lvbkJsdXInLCAnaW9uRm9jdXMnXSk7XG4gIH1cbn1cblxuXG5pbXBvcnQgdHlwZSB7IFNlYXJjaGJhcklucHV0RXZlbnREZXRhaWwgYXMgSUlvblNlYXJjaGJhclNlYXJjaGJhcklucHV0RXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFNlYXJjaGJhckNoYW5nZUV2ZW50RGV0YWlsIGFzIElJb25TZWFyY2hiYXJTZWFyY2hiYXJDaGFuZ2VFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblNlYXJjaGJhciBleHRlbmRzIENvbXBvbmVudHMuSW9uU2VhcmNoYmFyIHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgYHZhbHVlYCBvZiB0aGUgYGlvbi1zZWFyY2hiYXJgIGVsZW1lbnQgaGFzIGNoYW5nZWQuXG4gICAqL1xuICBpb25JbnB1dDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25TZWFyY2hiYXJTZWFyY2hiYXJJbnB1dEV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBUaGUgYGlvbkNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgZm9yIGA8aW9uLXNlYXJjaGJhcj5gIGVsZW1lbnRzIHdoZW4gdGhlIHVzZXJcbm1vZGlmaWVzIHRoZSBlbGVtZW50J3MgdmFsdWUuIFVubGlrZSB0aGUgYGlvbklucHV0YCBldmVudCwgdGhlIGBpb25DaGFuZ2VgXG5ldmVudCBpcyBub3QgbmVjZXNzYXJpbHkgZmlyZWQgZm9yIGVhY2ggYWx0ZXJhdGlvbiB0byBhbiBlbGVtZW50J3MgdmFsdWUuXG5cblRoZSBgaW9uQ2hhbmdlYCBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBjb21taXR0ZWRcbmJ5IHRoZSB1c2VyLiBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgZWxlbWVudCBsb3NlcyBmb2N1cyBvclxud2hlbiB0aGUgXCJFbnRlclwiIGtleSBpcyBwcmVzc2VkLiBgaW9uQ2hhbmdlYCBjYW4gYWxzbyBmaXJlXG53aGVuIGNsaWNraW5nIHRoZSBjbGVhciBvciBjYW5jZWwgYnV0dG9ucy5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblNlYXJjaGJhclNlYXJjaGJhckNoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZC5cbiAgICovXG4gIGlvbkNhbmNlbDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgY2xlYXIgaW5wdXQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAqL1xuICBpb25DbGVhcjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBpbnB1dCBoYXMgZm9jdXMuXG4gICAqL1xuICBpb25Gb2N1czogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZWQnLCAnbW9kZScsICdzY3JvbGxhYmxlJywgJ3NlbGVjdE9uRm9jdXMnLCAnc3dpcGVHZXN0dXJlJywgJ3ZhbHVlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tc2VnbWVudCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZWQnLCAnbW9kZScsICdzY3JvbGxhYmxlJywgJ3NlbGVjdE9uRm9jdXMnLCAnc3dpcGVHZXN0dXJlJywgJ3ZhbHVlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblNlZ21lbnQge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25TZWdtZW50RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uQ2hhbmdlJ10pO1xuICB9XG59XG5cblxuaW1wb3J0IHR5cGUgeyBTZWdtZW50Q2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvblNlZ21lbnRTZWdtZW50Q2hhbmdlRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TZWdtZW50IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25TZWdtZW50IHtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgdmFsdWUgcHJvcGVydHkgaGFzIGNoYW5nZWQgYW5kIGFueSBkcmFnZ2luZyBwb2ludGVyIGhhcyBiZWVuIHJlbGVhc2VkIGZyb20gYGlvbi1zZWdtZW50YC5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblNlZ21lbnRTZWdtZW50Q2hhbmdlRXZlbnREZXRhaWw+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY29udGVudElkJywgJ2Rpc2FibGVkJywgJ2xheW91dCcsICdtb2RlJywgJ3R5cGUnLCAndmFsdWUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1zZWdtZW50LWJ1dHRvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29udGVudElkJywgJ2Rpc2FibGVkJywgJ2xheW91dCcsICdtb2RlJywgJ3R5cGUnLCAndmFsdWUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uU2VnbWVudEJ1dHRvbiB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblNlZ21lbnRCdXR0b25FbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TZWdtZW50QnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25TZWdtZW50QnV0dG9uIHt9XG5cblxuQFByb3h5Q21wKHtcbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tc2VnbWVudC1jb250ZW50JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogW10sXG59KVxuZXhwb3J0IGNsYXNzIElvblNlZ21lbnRDb250ZW50IHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uU2VnbWVudENvbnRlbnRFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TZWdtZW50Q29udGVudCBleHRlbmRzIENvbXBvbmVudHMuSW9uU2VnbWVudENvbnRlbnQge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnc3dpcGVHZXN0dXJlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tc2VnbWVudC12aWV3JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydkaXNhYmxlZCcsICdzd2lwZUdlc3R1cmUnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uU2VnbWVudFZpZXcge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25TZWdtZW50Vmlld0VsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvblNlZ21lbnRWaWV3U2Nyb2xsJ10pO1xuICB9XG59XG5cblxuaW1wb3J0IHR5cGUgeyBTZWdtZW50Vmlld1Njcm9sbEV2ZW50IGFzIElJb25TZWdtZW50Vmlld1NlZ21lbnRWaWV3U2Nyb2xsRXZlbnQgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TZWdtZW50VmlldyBleHRlbmRzIENvbXBvbmVudHMuSW9uU2VnbWVudFZpZXcge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBzZWdtZW50IHZpZXcgaXMgc2Nyb2xsZWQuXG4gICAqL1xuICBpb25TZWdtZW50Vmlld1Njcm9sbDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25TZWdtZW50Vmlld1NlZ21lbnRWaWV3U2Nyb2xsRXZlbnQ+Pjtcbn1cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnY2FuY2VsVGV4dCcsICdjb2xvcicsICdjb21wYXJlV2l0aCcsICdkaXNhYmxlZCcsICdlcnJvclRleHQnLCAnZXhwYW5kZWRJY29uJywgJ2ZpbGwnLCAnaGVscGVyVGV4dCcsICdpbnRlcmZhY2UnLCAnaW50ZXJmYWNlT3B0aW9ucycsICdqdXN0aWZ5JywgJ2xhYmVsJywgJ2xhYmVsUGxhY2VtZW50JywgJ21vZGUnLCAnbXVsdGlwbGUnLCAnbmFtZScsICdva1RleHQnLCAncGxhY2Vob2xkZXInLCAncmVxdWlyZWQnLCAnc2VsZWN0ZWRUZXh0JywgJ3NoYXBlJywgJ3RvZ2dsZUljb24nLCAndmFsdWUnXSxcbiAgbWV0aG9kczogWydvcGVuJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tc2VsZWN0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjYW5jZWxUZXh0JywgJ2NvbG9yJywgJ2NvbXBhcmVXaXRoJywgJ2Rpc2FibGVkJywgJ2Vycm9yVGV4dCcsICdleHBhbmRlZEljb24nLCAnZmlsbCcsICdoZWxwZXJUZXh0JywgJ2ludGVyZmFjZScsICdpbnRlcmZhY2VPcHRpb25zJywgJ2p1c3RpZnknLCAnbGFiZWwnLCAnbGFiZWxQbGFjZW1lbnQnLCAnbW9kZScsICdtdWx0aXBsZScsICduYW1lJywgJ29rVGV4dCcsICdwbGFjZWhvbGRlcicsICdyZXF1aXJlZCcsICdzZWxlY3RlZFRleHQnLCAnc2hhcGUnLCAndG9nZ2xlSWNvbicsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25TZWxlY3Qge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25TZWxlY3RFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25DaGFuZ2UnLCAnaW9uQ2FuY2VsJywgJ2lvbkRpc21pc3MnLCAnaW9uRm9jdXMnLCAnaW9uQmx1ciddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgU2VsZWN0Q2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvblNlbGVjdFNlbGVjdENoYW5nZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25TZWxlY3Qge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cblxuVGhpcyBldmVudCB3aWxsIG5vdCBlbWl0IHdoZW4gcHJvZ3JhbW1hdGljYWxseSBzZXR0aW5nIHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgKi9cbiAgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblNlbGVjdFNlbGVjdENoYW5nZUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGlvbiBpcyBjYW5jZWxsZWQuXG4gICAqL1xuICBpb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIG92ZXJsYXkgaXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgaW9uRGlzbWlzczogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBmb2N1cy5cbiAgICovXG4gIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgbG9zZXMgZm9jdXMuXG4gICAqL1xuICBpb25CbHVyOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjYW5jZWxUZXh0JywgJ2hlYWRlcicsICdtdWx0aXBsZScsICdvcHRpb25zJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tc2VsZWN0LW1vZGFsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjYW5jZWxUZXh0JywgJ2hlYWRlcicsICdtdWx0aXBsZScsICdvcHRpb25zJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblNlbGVjdE1vZGFsIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uU2VsZWN0TW9kYWxFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TZWxlY3RNb2RhbCBleHRlbmRzIENvbXBvbmVudHMuSW9uU2VsZWN0TW9kYWwge31cblxuXG5AUHJveHlDbXAoe1xuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndmFsdWUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1zZWxlY3Qtb3B0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydkaXNhYmxlZCcsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25TZWxlY3RPcHRpb24ge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25TZWxlY3RPcHRpb25FbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TZWxlY3RPcHRpb24gZXh0ZW5kcyBDb21wb25lbnRzLklvblNlbGVjdE9wdGlvbiB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydhbmltYXRlZCddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXNrZWxldG9uLXRleHQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblNrZWxldG9uVGV4dCB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblNrZWxldG9uVGV4dEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblNrZWxldG9uVGV4dCBleHRlbmRzIENvbXBvbmVudHMuSW9uU2tlbGV0b25UZXh0IHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ2R1cmF0aW9uJywgJ25hbWUnLCAncGF1c2VkJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tc3Bpbm5lcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnZHVyYXRpb24nLCAnbmFtZScsICdwYXVzZWQnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uU3Bpbm5lciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblNwaW5uZXJFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TcGlubmVyIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25TcGlubmVyIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbnRlbnRJZCcsICdkaXNhYmxlZCcsICd3aGVuJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tc3BsaXQtcGFuZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29udGVudElkJywgJ2Rpc2FibGVkJywgJ3doZW4nXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uU3BsaXRQYW5lIHtcbiAgcHJvdGVjdGVkIGVsOiBIVE1MSW9uU3BsaXRQYW5lRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFsnaW9uU3BsaXRQYW5lVmlzaWJsZSddKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25TcGxpdFBhbmUgZXh0ZW5kcyBDb21wb25lbnRzLklvblNwbGl0UGFuZSB7XG4gIC8qKlxuICAgKiBFeHByZXNzaW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBzcGxpdC1wYW5lIHZpc2liaWxpdHkgaGFzIGNoYW5nZWRcbiAgICovXG4gIGlvblNwbGl0UGFuZVZpc2libGU6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx7IHZpc2libGU6IGJvb2xlYW4gfT4+O1xufVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydjb21wb25lbnQnLCAndGFiJ10sXG4gIG1ldGhvZHM6IFsnc2V0QWN0aXZlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tdGFiJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb21wb25lbnQnLCAndGFiJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblRhYiB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblRhYkVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblRhYiBleHRlbmRzIENvbXBvbmVudHMuSW9uVGFiIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnLCAnc2VsZWN0ZWRUYWInLCAndHJhbnNsdWNlbnQnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi10YWItYmFyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xvcicsICdtb2RlJywgJ3NlbGVjdGVkVGFiJywgJ3RyYW5zbHVjZW50J10sXG59KVxuZXhwb3J0IGNsYXNzIElvblRhYkJhciB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblRhYkJhckVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblRhYkJhciBleHRlbmRzIENvbXBvbmVudHMuSW9uVGFiQmFyIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2hyZWYnLCAnbGF5b3V0JywgJ21vZGUnLCAncmVsJywgJ3NlbGVjdGVkJywgJ3RhYicsICd0YXJnZXQnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi10YWItYnV0dG9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydkaXNhYmxlZCcsICdkb3dubG9hZCcsICdocmVmJywgJ2xheW91dCcsICdtb2RlJywgJ3JlbCcsICdzZWxlY3RlZCcsICd0YWInLCAndGFyZ2V0J10sXG59KVxuZXhwb3J0IGNsYXNzIElvblRhYkJ1dHRvbiB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblRhYkJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblRhYkJ1dHRvbiBleHRlbmRzIENvbXBvbmVudHMuSW9uVGFiQnV0dG9uIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi10ZXh0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xvcicsICdtb2RlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblRleHQge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25UZXh0RWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uVGV4dCBleHRlbmRzIENvbXBvbmVudHMuSW9uVGV4dCB7fVxuXG5cbkBQcm94eUNtcCh7XG4gIGlucHV0czogWydhdXRvR3JvdycsICdhdXRvY2FwaXRhbGl6ZScsICdhdXRvZm9jdXMnLCAnY2xlYXJPbkVkaXQnLCAnY29sb3InLCAnY29scycsICdjb3VudGVyJywgJ2NvdW50ZXJGb3JtYXR0ZXInLCAnZGVib3VuY2UnLCAnZGlzYWJsZWQnLCAnZW50ZXJrZXloaW50JywgJ2Vycm9yVGV4dCcsICdmaWxsJywgJ2hlbHBlclRleHQnLCAnaW5wdXRtb2RlJywgJ2xhYmVsJywgJ2xhYmVsUGxhY2VtZW50JywgJ21heGxlbmd0aCcsICdtaW5sZW5ndGgnLCAnbW9kZScsICduYW1lJywgJ3BsYWNlaG9sZGVyJywgJ3JlYWRvbmx5JywgJ3JlcXVpcmVkJywgJ3Jvd3MnLCAnc2hhcGUnLCAnc3BlbGxjaGVjaycsICd2YWx1ZScsICd3cmFwJ10sXG4gIG1ldGhvZHM6IFsnc2V0Rm9jdXMnLCAnZ2V0SW5wdXRFbGVtZW50J11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tdGV4dGFyZWEnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgaW5wdXRzOiBbJ2F1dG9Hcm93JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9mb2N1cycsICdjbGVhck9uRWRpdCcsICdjb2xvcicsICdjb2xzJywgJ2NvdW50ZXInLCAnY291bnRlckZvcm1hdHRlcicsICdkZWJvdW5jZScsICdkaXNhYmxlZCcsICdlbnRlcmtleWhpbnQnLCAnZXJyb3JUZXh0JywgJ2ZpbGwnLCAnaGVscGVyVGV4dCcsICdpbnB1dG1vZGUnLCAnbGFiZWwnLCAnbGFiZWxQbGFjZW1lbnQnLCAnbWF4bGVuZ3RoJywgJ21pbmxlbmd0aCcsICdtb2RlJywgJ25hbWUnLCAncGxhY2Vob2xkZXInLCAncmVhZG9ubHknLCAncmVxdWlyZWQnLCAncm93cycsICdzaGFwZScsICdzcGVsbGNoZWNrJywgJ3ZhbHVlJywgJ3dyYXAnXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uVGV4dGFyZWEge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25UZXh0YXJlYUVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvbkNoYW5nZScsICdpb25JbnB1dCcsICdpb25CbHVyJywgJ2lvbkZvY3VzJ10pO1xuICB9XG59XG5cblxuaW1wb3J0IHR5cGUgeyBUZXh0YXJlYUNoYW5nZUV2ZW50RGV0YWlsIGFzIElJb25UZXh0YXJlYVRleHRhcmVhQ2hhbmdlRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5pbXBvcnQgdHlwZSB7IFRleHRhcmVhSW5wdXRFdmVudERldGFpbCBhcyBJSW9uVGV4dGFyZWFUZXh0YXJlYUlucHV0RXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJb25UZXh0YXJlYSBleHRlbmRzIENvbXBvbmVudHMuSW9uVGV4dGFyZWEge1xuICAvKipcbiAgICogVGhlIGBpb25DaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgbW9kaWZpZXMgdGhlIHRleHRhcmVhJ3MgdmFsdWUuXG5Vbmxpa2UgdGhlIGBpb25JbnB1dGAgZXZlbnQsIHRoZSBgaW9uQ2hhbmdlYCBldmVudCBpcyBmaXJlZCB3aGVuXG50aGUgZWxlbWVudCBsb3NlcyBmb2N1cyBhZnRlciBpdHMgdmFsdWUgaGFzIGJlZW4gbW9kaWZpZWQuXG5cblRoaXMgZXZlbnQgd2lsbCBub3QgZW1pdCB3aGVuIHByb2dyYW1tYXRpY2FsbHkgc2V0dGluZyB0aGUgYHZhbHVlYCBwcm9wZXJ0eS5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25UZXh0YXJlYVRleHRhcmVhQ2hhbmdlRXZlbnREZXRhaWw+PjtcbiAgLyoqXG4gICAqIFRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGVhY2ggdGltZSB0aGUgdXNlciBtb2RpZmllcyB0aGUgdGV4dGFyZWEncyB2YWx1ZS5cblVubGlrZSB0aGUgYGlvbkNoYW5nZWAgZXZlbnQsIHRoZSBgaW9uSW5wdXRgIGV2ZW50IGlzIGZpcmVkIGZvciBlYWNoIGFsdGVyYXRpb25cbnRvIHRoZSB0ZXh0YXJlYSdzIHZhbHVlLiBUaGlzIHR5cGljYWxseSBoYXBwZW5zIGZvciBlYWNoIGtleXN0cm9rZSBhcyB0aGUgdXNlciB0eXBlcy5cblxuV2hlbiBgY2xlYXJPbkVkaXRgIGlzIGVuYWJsZWQsIHRoZSBgaW9uSW5wdXRgIGV2ZW50IHdpbGwgYmUgZmlyZWQgd2hlblxudGhlIHVzZXIgY2xlYXJzIHRoZSB0ZXh0YXJlYSBieSBwZXJmb3JtaW5nIGEga2V5ZG93biBldmVudC5cbiAgICovXG4gIGlvbklucHV0OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblRleHRhcmVhVGV4dGFyZWFJbnB1dEV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGlucHV0IGxvc2VzIGZvY3VzLlxuICAgKi9cbiAgaW9uQmx1cjogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PEZvY3VzRXZlbnQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzLlxuICAgKi9cbiAgaW9uRm9jdXM6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDxGb2N1c0V2ZW50Pj47XG59XG5cblxuQFByb3h5Q21wKHtcbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tdGh1bWJuYWlsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogW10sXG59KVxuZXhwb3J0IGNsYXNzIElvblRodW1ibmFpbCB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblRodW1ibmFpbEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblRodW1ibmFpbCBleHRlbmRzIENvbXBvbmVudHMuSW9uVGh1bWJuYWlsIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ3NpemUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi10aXRsZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBpbnB1dHM6IFsnY29sb3InLCAnc2l6ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25UaXRsZSB7XG4gIHByb3RlY3RlZCBlbDogSFRNTElvblRpdGxlRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uVGl0bGUgZXh0ZW5kcyBDb21wb25lbnRzLklvblRpdGxlIHt9XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FuaW1hdGVkJywgJ2J1dHRvbnMnLCAnY29sb3InLCAnY3NzQ2xhc3MnLCAnZHVyYXRpb24nLCAnZW50ZXJBbmltYXRpb24nLCAnaGVhZGVyJywgJ2h0bWxBdHRyaWJ1dGVzJywgJ2ljb24nLCAnaXNPcGVuJywgJ2tleWJvYXJkQ2xvc2UnLCAnbGF5b3V0JywgJ2xlYXZlQW5pbWF0aW9uJywgJ21lc3NhZ2UnLCAnbW9kZScsICdwb3NpdGlvbicsICdwb3NpdGlvbkFuY2hvcicsICdzd2lwZUdlc3R1cmUnLCAndHJhbnNsdWNlbnQnLCAndHJpZ2dlciddLFxuICBtZXRob2RzOiBbJ3ByZXNlbnQnLCAnZGlzbWlzcycsICdvbkRpZERpc21pc3MnLCAnb25XaWxsRGlzbWlzcyddXG59KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLXRvYXN0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhbmltYXRlZCcsICdidXR0b25zJywgJ2NvbG9yJywgJ2Nzc0NsYXNzJywgJ2R1cmF0aW9uJywgJ2VudGVyQW5pbWF0aW9uJywgJ2hlYWRlcicsICdodG1sQXR0cmlidXRlcycsICdpY29uJywgJ2lzT3BlbicsICdrZXlib2FyZENsb3NlJywgJ2xheW91dCcsICdsZWF2ZUFuaW1hdGlvbicsICdtZXNzYWdlJywgJ21vZGUnLCAncG9zaXRpb24nLCAncG9zaXRpb25BbmNob3InLCAnc3dpcGVHZXN0dXJlJywgJ3RyYW5zbHVjZW50JywgJ3RyaWdnZXInXSxcbn0pXG5leHBvcnQgY2xhc3MgSW9uVG9hc3Qge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25Ub2FzdEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGM6IENoYW5nZURldGVjdG9yUmVmLCByOiBFbGVtZW50UmVmLCBwcm90ZWN0ZWQgejogTmdab25lKSB7XG4gICAgYy5kZXRhY2goKTtcbiAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIHByb3h5T3V0cHV0cyh0aGlzLCB0aGlzLmVsLCBbJ2lvblRvYXN0RGlkUHJlc2VudCcsICdpb25Ub2FzdFdpbGxQcmVzZW50JywgJ2lvblRvYXN0V2lsbERpc21pc3MnLCAnaW9uVG9hc3REaWREaXNtaXNzJywgJ2RpZFByZXNlbnQnLCAnd2lsbFByZXNlbnQnLCAnd2lsbERpc21pc3MnLCAnZGlkRGlzbWlzcyddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgT3ZlcmxheUV2ZW50RGV0YWlsIGFzIElJb25Ub2FzdE92ZXJsYXlFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElvblRvYXN0IGV4dGVuZHMgQ29tcG9uZW50cy5Jb25Ub2FzdCB7XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSB0b2FzdCBoYXMgcHJlc2VudGVkLlxuICAgKi9cbiAgaW9uVG9hc3REaWRQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIHRvYXN0IGhhcyBwcmVzZW50ZWQuXG4gICAqL1xuICBpb25Ub2FzdFdpbGxQcmVzZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8dm9pZD4+O1xuICAvKipcbiAgICogRW1pdHRlZCBiZWZvcmUgdGhlIHRvYXN0IGhhcyBkaXNtaXNzZWQuXG4gICAqL1xuICBpb25Ub2FzdFdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblRvYXN0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSB0b2FzdCBoYXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgaW9uVG9hc3REaWREaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblRvYXN0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSB0b2FzdCBoYXMgcHJlc2VudGVkLlxuU2hvcnRoYW5kIGZvciBpb25Ub2FzdFdpbGxEaXNtaXNzLlxuICAgKi9cbiAgZGlkUHJlc2VudDogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PHZvaWQ+PjtcbiAgLyoqXG4gICAqIEVtaXR0ZWQgYmVmb3JlIHRoZSB0b2FzdCBoYXMgcHJlc2VudGVkLlxuU2hvcnRoYW5kIGZvciBpb25Ub2FzdFdpbGxQcmVzZW50LlxuICAgKi9cbiAgd2lsbFByZXNlbnQ6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGJlZm9yZSB0aGUgdG9hc3QgaGFzIGRpc21pc3NlZC5cblNob3J0aGFuZCBmb3IgaW9uVG9hc3RXaWxsRGlzbWlzcy5cbiAgICovXG4gIHdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblRvYXN0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIGFmdGVyIHRoZSB0b2FzdCBoYXMgZGlzbWlzc2VkLlxuU2hvcnRoYW5kIGZvciBpb25Ub2FzdERpZERpc21pc3MuXG4gICAqL1xuICBkaWREaXNtaXNzOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ8SUlvblRvYXN0T3ZlcmxheUV2ZW50RGV0YWlsPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2FsaWdubWVudCcsICdjaGVja2VkJywgJ2NvbG9yJywgJ2Rpc2FibGVkJywgJ2VuYWJsZU9uT2ZmTGFiZWxzJywgJ2Vycm9yVGV4dCcsICdoZWxwZXJUZXh0JywgJ2p1c3RpZnknLCAnbGFiZWxQbGFjZW1lbnQnLCAnbW9kZScsICduYW1lJywgJ3JlcXVpcmVkJywgJ3ZhbHVlJ11cbn0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tdG9nZ2xlJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydhbGlnbm1lbnQnLCAnY2hlY2tlZCcsICdjb2xvcicsICdkaXNhYmxlZCcsICdlbmFibGVPbk9mZkxhYmVscycsICdlcnJvclRleHQnLCAnaGVscGVyVGV4dCcsICdqdXN0aWZ5JywgJ2xhYmVsUGxhY2VtZW50JywgJ21vZGUnLCAnbmFtZScsICdyZXF1aXJlZCcsICd2YWx1ZSddLFxufSlcbmV4cG9ydCBjbGFzcyBJb25Ub2dnbGUge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25Ub2dnbGVFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgIGMuZGV0YWNoKCk7XG4gICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgWydpb25DaGFuZ2UnLCAnaW9uRm9jdXMnLCAnaW9uQmx1ciddKTtcbiAgfVxufVxuXG5cbmltcG9ydCB0eXBlIHsgVG9nZ2xlQ2hhbmdlRXZlbnREZXRhaWwgYXMgSUlvblRvZ2dsZVRvZ2dsZUNoYW5nZUV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uVG9nZ2xlIGV4dGVuZHMgQ29tcG9uZW50cy5Jb25Ub2dnbGUge1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB1c2VyIHN3aXRjaGVzIHRoZSB0b2dnbGUgb24gb3Igb2ZmLlxuXG5UaGlzIGV2ZW50IHdpbGwgbm90IGVtaXQgd2hlbiBwcm9ncmFtbWF0aWNhbGx5IHNldHRpbmcgdGhlIGBjaGVja2VkYCBwcm9wZXJ0eS5cbiAgICovXG4gIGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PElJb25Ub2dnbGVUb2dnbGVDaGFuZ2VFdmVudERldGFpbD4+O1xuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIHRoZSB0b2dnbGUgaGFzIGZvY3VzLlxuICAgKi9cbiAgaW9uRm9jdXM6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIHRvZ2dsZSBsb3NlcyBmb2N1cy5cbiAgICovXG4gIGlvbkJsdXI6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudDx2b2lkPj47XG59XG5cblxuQFByb3h5Q21wKHtcbiAgaW5wdXRzOiBbJ2NvbG9yJywgJ21vZGUnXVxufSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi10b29sYmFyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIGlucHV0czogWydjb2xvcicsICdtb2RlJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvblRvb2xiYXIge1xuICBwcm90ZWN0ZWQgZWw6IEhUTUxJb25Ub29sYmFyRWxlbWVudDtcbiAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICBjLmRldGFjaCgpO1xuICAgIHRoaXMuZWwgPSByLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSW9uVG9vbGJhciBleHRlbmRzIENvbXBvbmVudHMuSW9uVG9vbGJhciB7fVxuXG5cbiJdfQ==