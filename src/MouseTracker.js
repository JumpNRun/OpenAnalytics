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
				this.aEvents.push({
					name: oEvent.type,
					time: Date.now(),
					x: oEvent.clientX,
					y: oEvent.clientY
				});
				window.localStorage.clickEvents = JSON.stringify(this.aEvents);
			});
		})
	}
}