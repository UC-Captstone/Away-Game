/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, forceUpdate, h } from "@stencil/core";
import { inheritAttributes, raf } from "../../utils/helpers";
import { createColorClasses, hostContext, openURL } from "../../utils/theme";
import { chevronForward } from "ionicons/icons";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot start - Content is placed to the left of the item text in LTR, and to the right in RTL.
 * @slot end - Content is placed to the right of the item text in LTR, and to the left in RTL.
 *
 * @part native - The native HTML button, anchor or div element that wraps all child elements.
 * @part inner - The inner wrapper element that arranges the item content.
 * @part container - The wrapper element that contains the default slot.
 * @part detail-icon - The chevron icon for the item. Only applies when `detail="true"`.
 */
export class Item {
    constructor() {
        this.labelColorStyles = {};
        this.itemStyles = new Map();
        this.inheritedAriaAttributes = {};
        this.multipleInputs = false;
        this.focusable = true;
        this.isInteractive = false;
        /**
         * If `true`, a button tag will be rendered and the item will be tappable.
         */
        this.button = false;
        /**
         * The icon to use when `detail` is set to `true`.
         */
        this.detailIcon = chevronForward;
        /**
         * If `true`, the user cannot interact with the item.
         */
        this.disabled = false;
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        /**
         * The type of the button. Only used when an `onclick` or `button` property is present.
         */
        this.type = 'button';
        // slot change listener updates state to reflect how/if item should be interactive
        this.updateInteractivityOnSlotChange = () => {
            this.setIsInteractive();
            this.setMultipleInputs();
        };
    }
    buttonChanged() {
        // Update the focusable option when the button option is changed
        this.focusable = this.isFocusable();
    }
    labelColorChanged(ev) {
        const { color } = this;
        // There will be a conflict with item color if
        // we apply the label color to item, so we ignore
        // the label color if the user sets a color on item
        if (color === undefined) {
            this.labelColorStyles = ev.detail;
        }
    }
    itemStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.itemStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach((key) => {
            if (updatedStyles[key]) {
                const itemKey = `item-${key}`;
                if (!childStyles[itemKey]) {
                    hasStyleChange = true;
                }
                newStyles[itemKey] = true;
            }
        });
        if (!hasStyleChange && Object.keys(newStyles).length !== Object.keys(childStyles).length) {
            hasStyleChange = true;
        }
        if (hasStyleChange) {
            this.itemStyles.set(tagName, newStyles);
            forceUpdate(this);
        }
    }
    connectedCallback() {
        this.hasStartEl();
    }
    componentWillLoad() {
        this.inheritedAriaAttributes = inheritAttributes(this.el, ['aria-label']);
    }
    componentDidLoad() {
        raf(() => {
            this.setMultipleInputs();
            this.setIsInteractive();
            this.focusable = this.isFocusable();
        });
    }
    totalNestedInputs() {
        // The following elements have a clickable cover that is relative to the entire item
        const covers = this.el.querySelectorAll('ion-checkbox, ion-datetime, ion-select, ion-radio');
        // The following elements can accept focus alongside the previous elements
        // therefore if these elements are also a child of item, we don't want the
        // input cover on top of those interfering with their clicks
        const inputs = this.el.querySelectorAll('ion-input, ion-range, ion-searchbar, ion-segment, ion-textarea, ion-toggle');
        // The following elements should also stay clickable when an input with cover is present
        const clickables = this.el.querySelectorAll('ion-router-link, ion-button, a, button');
        return {
            covers,
            inputs,
            clickables,
        };
    }
    // If the item contains multiple clickable elements and/or inputs, then the item
    // should not have a clickable input cover over the entire item to prevent
    // interfering with their individual click events
    setMultipleInputs() {
        const { covers, inputs, clickables } = this.totalNestedInputs();
        // Check for multiple inputs to change the position of the input cover to relative
        // for all of the covered inputs above
        this.multipleInputs =
            covers.length + inputs.length > 1 ||
                covers.length + clickables.length > 1 ||
                (covers.length > 0 && this.isClickable());
    }
    setIsInteractive() {
        // If item contains any interactive children, set isInteractive to `true`
        const { covers, inputs, clickables } = this.totalNestedInputs();
        this.isInteractive = covers.length > 0 || inputs.length > 0 || clickables.length > 0;
    }
    // If the item contains an input including a checkbox, datetime, select, or radio
    // then the item will have a clickable input cover that covers the item
    // that should get the hover, focused and activated states UNLESS it has multiple
    // inputs, then those need to individually get each click
    hasCover() {
        const inputs = this.el.querySelectorAll('ion-checkbox, ion-datetime, ion-select, ion-radio');
        return inputs.length === 1 && !this.multipleInputs;
    }
    // If the item has an href or button property it will render a native
    // anchor or button that is clickable
    isClickable() {
        return this.href !== undefined || this.button;
    }
    canActivate() {
        return this.isClickable() || this.hasCover();
    }
    isFocusable() {
        const focusableChild = this.el.querySelector('.ion-focusable');
        return this.canActivate() || focusableChild !== null;
    }
    hasStartEl() {
        const startEl = this.el.querySelector('[slot="start"]');
        if (startEl !== null) {
            this.el.classList.add('item-has-start-slot');
        }
    }
    getFirstInteractive() {
        const controls = this.el.querySelectorAll('ion-toggle:not([disabled]), ion-checkbox:not([disabled]), ion-radio:not([disabled]), ion-select:not([disabled]), ion-input:not([disabled]), ion-textarea:not([disabled])');
        return controls[0];
    }
    render() {
        const { detail, detailIcon, download, labelColorStyles, lines, disabled, href, rel, target, routerAnimation, routerDirection, inheritedAriaAttributes, multipleInputs, } = this;
        const childStyles = {};
        const mode = getIonMode(this);
        const clickable = this.isClickable();
        const canActivate = this.canActivate();
        const TagType = clickable ? (href === undefined ? 'button' : 'a') : 'div';
        const attrs = TagType === 'button'
            ? { type: this.type }
            : {
                download,
                href,
                rel,
                target,
            };
        let clickFn = {};
        const firstInteractive = this.getFirstInteractive();
        // Only set onClick if the item is clickable to prevent screen
        // readers from reading all items as clickable
        if (clickable || (firstInteractive !== undefined && !multipleInputs)) {
            clickFn = {
                onClick: (ev) => {
                    if (clickable) {
                        openURL(href, ev, routerDirection, routerAnimation);
                    }
                    if (firstInteractive !== undefined && !multipleInputs) {
                        const path = ev.composedPath();
                        const target = path[0];
                        if (ev.isTrusted) {
                            /**
                             * Dispatches a click event to the first interactive element,
                             * when it is the result of a user clicking on the item.
                             *
                             * We check if the click target is in the shadow root,
                             * which means the user clicked on the .item-native or
                             * .item-inner padding.
                             */
                            const clickedWithinShadowRoot = this.el.shadowRoot.contains(target);
                            if (clickedWithinShadowRoot) {
                                /**
                                 * For input/textarea clicking the padding should focus the
                                 * text field (thus making it editable). For everything else,
                                 * we want to click the control so it activates.
                                 */
                                if (firstInteractive.tagName === 'ION-INPUT' || firstInteractive.tagName === 'ION-TEXTAREA') {
                                    firstInteractive.setFocus();
                                }
                                firstInteractive.click();
                                /**
                                 * Stop the item event from being triggered
                                 * as the firstInteractive click event will also
                                 * trigger the item click event.
                                 */
                                ev.stopImmediatePropagation();
                            }
                        }
                    }
                },
            };
        }
        const showDetail = detail !== undefined ? detail : mode === 'ios' && clickable;
        this.itemStyles.forEach((value) => {
            Object.assign(childStyles, value);
        });
        const ariaDisabled = disabled || childStyles['item-interactive-disabled'] ? 'true' : null;
        const inList = hostContext('ion-list', this.el) && !hostContext('ion-radio-group', this.el);
        /**
         * Inputs and textareas do not need to show a cursor pointer.
         * However, other form controls such as checkboxes and radios do.
         */
        const firstInteractiveNeedsPointerCursor = firstInteractive !== undefined && !['ION-INPUT', 'ION-TEXTAREA'].includes(firstInteractive.tagName);
        return (h(Host, { key: '3977491399280a2aa3f796f0549235f3dc8b5681', "aria-disabled": ariaDisabled, class: Object.assign(Object.assign(Object.assign({}, childStyles), labelColorStyles), createColorClasses(this.color, {
                item: true,
                [mode]: true,
                'item-lines-default': lines === undefined,
                [`item-lines-${lines}`]: lines !== undefined,
                'item-control-needs-pointer-cursor': firstInteractiveNeedsPointerCursor,
                'item-disabled': disabled,
                'in-list': inList,
                'item-multiple-inputs': this.multipleInputs,
                'ion-activatable': canActivate,
                'ion-focusable': this.focusable,
                'item-rtl': document.dir === 'rtl',
            })), role: inList ? 'listitem' : null }, h(TagType, Object.assign({ key: '8aff72457004553e83d74a4dda2f9a6b8cf523d7' }, attrs, inheritedAriaAttributes, { class: "item-native", part: "native", disabled: disabled }, clickFn), h("slot", { key: 'aba9a0f2ad101be6598f364c83236ca3de437a04', name: "start", onSlotchange: this.updateInteractivityOnSlotChange }), h("div", { key: '5e7851e49959e4ed114fcd51cb167db9bd8c0f00', class: "item-inner", part: "inner" }, h("div", { key: 'eee6511845d8459450ca856819839d83cd507c0c', class: "input-wrapper", part: "container" }, h("slot", { key: '76e13f86cd144951b1999eb333a2027b42cdf6e2', onSlotchange: this.updateInteractivityOnSlotChange })), h("slot", { key: 'b264f7b4c367e7700a9a05343177abf7b17045d8', name: "end", onSlotchange: this.updateInteractivityOnSlotChange }), showDetail && (h("ion-icon", { key: '66b930bdfebb55ea0b2e784a1c902eb6c64b2370', icon: detailIcon, lazy: false, class: "item-detail-icon", part: "detail-icon", "aria-hidden": "true", "flip-rtl": detailIcon === chevronForward }))), canActivate && mode === 'md' && h("ion-ripple-effect", { key: '06ab8e87917b545f3c221602b9b6d8004a1895ad' }))));
    }
    static get is() { return "ion-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["item.ios.scss"],
            "md": ["item.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["item.ios.css"],
            "md": ["item.md.css"]
        };
    }
    static get properties() {
        return {
            "color": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Color",
                    "resolved": "\"danger\" | \"dark\" | \"light\" | \"medium\" | \"primary\" | \"secondary\" | \"success\" | \"tertiary\" | \"warning\" | string & Record<never, never> | undefined",
                    "references": {
                        "Color": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::Color",
                            "referenceLocation": "Color"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The color to use from your application's color palette.\nDefault options are: `\"primary\"`, `\"secondary\"`, `\"tertiary\"`, `\"success\"`, `\"warning\"`, `\"danger\"`, `\"light\"`, `\"medium\"`, and `\"dark\"`.\nFor more information on colors, see [theming](/docs/theming/basics)."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "color"
            },
            "button": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, a button tag will be rendered and the item will be tappable."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "button",
                "defaultValue": "false"
            },
            "detail": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "If `true`, a detail arrow will appear on the item. Defaults to `false` unless the `mode`\nis `ios` and an `href` or `button` property is present."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "detail"
            },
            "detailIcon": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The icon to use when `detail` is set to `true`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "detail-icon",
                "defaultValue": "chevronForward"
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the user cannot interact with the item."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "download": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "This attribute instructs browsers to download a URL instead of navigating to\nit, so the user will be prompted to save it as a local file. If the attribute\nhas a value, it is used as the pre-filled file name in the Save prompt\n(the user can still change the file name if they want)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "download"
            },
            "href": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Contains a URL or a URL fragment that the hyperlink points to.\nIf this property is set, an anchor tag will be rendered."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "href"
            },
            "rel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Specifies the relationship of the target object to the link object.\nThe value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "rel"
            },
            "lines": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'full' | 'inset' | 'none'",
                    "resolved": "\"full\" | \"inset\" | \"none\" | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "How the bottom border should be displayed on the item."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "lines"
            },
            "routerAnimation": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "AnimationBuilder | undefined",
                    "resolved": "((baseEl: any, opts?: any) => Animation) | undefined",
                    "references": {
                        "AnimationBuilder": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::AnimationBuilder",
                            "referenceLocation": "AnimationBuilder"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When using a router, it specifies the transition animation when navigating to\nanother page using `href`."
                },
                "getter": false,
                "setter": false
            },
            "routerDirection": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "RouterDirection",
                    "resolved": "\"back\" | \"forward\" | \"root\"",
                    "references": {
                        "RouterDirection": {
                            "location": "import",
                            "path": "../router/utils/interface",
                            "id": "src/components/router/utils/interface.ts::RouterDirection",
                            "referenceLocation": "RouterDirection"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When using a router, it specifies the transition direction when navigating to\nanother page using `href`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "router-direction",
                "defaultValue": "'forward'"
            },
            "target": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Specifies where to display the linked URL.\nOnly applies when an `href` is provided.\nSpecial keywords: `\"_blank\"`, `\"_self\"`, `\"_parent\"`, `\"_top\"`."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "target"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'submit' | 'reset' | 'button'",
                    "resolved": "\"button\" | \"reset\" | \"submit\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The type of the button. Only used when an `onclick` or `button` property is present."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "type",
                "defaultValue": "'button'"
            }
        };
    }
    static get states() {
        return {
            "multipleInputs": {},
            "focusable": {},
            "isInteractive": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "button",
                "methodName": "buttonChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "ionColor",
                "method": "labelColorChanged",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "ionStyle",
                "method": "itemStyle",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
