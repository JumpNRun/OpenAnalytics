import MouseTracker from "./MouseTracker"

var oMouseTracker = new MouseTracker();
oMouseTracker.start();

window.analytics = oMouseTracker;