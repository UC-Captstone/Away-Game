/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

var animation = require('./animation-Dg4yiuR2.js');
var index = require('./index-C845Ti6K.js');
var ios_transition = require('./ios.transition-trBiC95R.js');
var md_transition = require('./md.transition-CUQECuvD.js');
var cubicBezier = require('./cubic-bezier-DAjy1V-e.js');
var index$1 = require('./index-CAvQ7Tka.js');
var ionicGlobal = require('./ionic-global-Bc3kJi1Z.js');
var helpers = require('./helpers-CxTYJdbT.js');
var index$2 = require('./index-CqT-2gKy.js');
var config = require('./config-BukYi_pW.js');
var theme = require('./theme-CeDs6Hcv.js');
var index$3 = require('./index-CFUwM5x_.js');
var overlays = require('./overlays-C2jiBSNQ.js');
require('./index-DkNv4J_i.js');
require('./gesture-controller-dtqlP_q4.js');
require('./hardware-back-button-C4rMJ5uI.js');
require('./framework-delegate-CRgp8o_p.js');

const IonicSlides = (opts) => {
    const { swiper, extendParams } = opts;
    const slidesParams = {
        effect: undefined,
        direction: 'horizontal',
        initialSlide: 0,
        loop: false,
        parallax: false,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 300,
        slidesPerColumn: 1,
        slidesPerColumnFill: 'column',
        slidesPerGroup: 1,
        centeredSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        touchEventsTarget: 'container',
        freeMode: false,
        freeModeMomentum: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: false,
        freeModeMinimumVelocity: 0.02,
        autoHeight: false,
        setWrapperSize: false,
        zoom: {
            maxRatio: 3,
            minRatio: 1,
            toggle: false,
        },
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        touchStartPreventDefault: false,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: true,
        threshold: 0,
        touchMoveStopPropagation: true,
        touchReleaseOnEdges: false,
        iOSEdgeSwipeDetection: false,
        iOSEdgeSwipeThreshold: 20,
        resistance: true,
        resistanceRatio: 0.85,
        watchSlidesProgress: false,
        watchSlidesVisibility: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loopAdditionalSlides: 0,
        noSwiping: true,
        runCallbacksOnInit: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        flipEffect: {
            slideShadows: true,
            limitRotation: true,
        },
        cubeEffect: {
            slideShadows: true,
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        fadeEffect: {
            crossFade: false,
        },
        a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
        },
    };
    if (swiper.pagination) {
        slidesParams.pagination = {
            type: 'bullets',
            clickable: false,
            hideOnClick: false,
        };
    }
    if (swiper.scrollbar) {
        slidesParams.scrollbar = {
            hide: true,
        };
    }
    extendParams(slidesParams);
};

exports.createAnimation = animation.createAnimation;
exports.LIFECYCLE_DID_ENTER = index.LIFECYCLE_DID_ENTER;
exports.LIFECYCLE_DID_LEAVE = index.LIFECYCLE_DID_LEAVE;
exports.LIFECYCLE_WILL_ENTER = index.LIFECYCLE_WILL_ENTER;
exports.LIFECYCLE_WILL_LEAVE = index.LIFECYCLE_WILL_LEAVE;
exports.LIFECYCLE_WILL_UNLOAD = index.LIFECYCLE_WILL_UNLOAD;
exports.getIonPageElement = index.getIonPageElement;
exports.iosTransitionAnimation = ios_transition.iosTransitionAnimation;
exports.mdTransitionAnimation = md_transition.mdTransitionAnimation;
exports.getTimeGivenProgression = cubicBezier.getTimeGivenProgression;
exports.createGesture = index$1.createGesture;
exports.getPlatforms = ionicGlobal.getPlatforms;
exports.initialize = ionicGlobal.initialize;
exports.isPlatform = ionicGlobal.isPlatform;
exports.componentOnReady = helpers.componentOnReady;
Object.defineProperty(exports, "LogLevel", {
    enumerable: true,
    get: function () { return index$2.LogLevel; }
});
exports.IonicSafeString = config.IonicSafeString;
exports.getMode = config.getMode;
exports.setupConfig = config.setupConfig;
exports.openURL = theme.openURL;
exports.menuController = index$3.menuController;
exports.actionSheetController = overlays.actionSheetController;
exports.alertController = overlays.alertController;
exports.loadingController = overlays.loadingController;
exports.modalController = overlays.modalController;
exports.pickerController = overlays.pickerController;
exports.popoverController = overlays.popoverController;
exports.toastController = overlays.toastController;
exports.IonicSlides = IonicSlides;
