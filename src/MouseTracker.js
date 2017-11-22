export default class MouseTracker {
	constructor() {
		this.aEvents = [];
	}

	start() {
		const aTrackedMouseEvents = [
			"click",
			"mousedown",
			"mouseenter",
			"mouseleave",
			"mousemove",
			"mouseout",
			"mouseover",
			"mouseup"
		];

		aTrackedMouseEvents.forEach((sEventName) => {
			document.addEventListener(sEventName, (oEvent) => {
				let mEventInfo = {
					name: oEvent.type,
					time: Date.now(),
					x: oEvent.clientX,
					y: oEvent.clientY
				};

				let oControl = jQuery(oEvent.target).control(0);
				if (oControl) {
					mEventInfo.control = oControl.getMetadata().getName();
				}

				this.aEvents.push(mEventInfo);
				window.localStorage.clickEvents = JSON.stringify(this.aEvents);
			});
		})
	}
}