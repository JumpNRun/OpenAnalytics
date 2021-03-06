import TrackerBase from "./TrackerBase";

export default class MouseTracker extends TrackerBase {
	constructor() {
		super();
		let sMouseData = window.localStorage.mouse;
		if (sMouseData) {
			this.aData = JSON.parse(sMouseData);
		}
	}

	start() {
		const aTrackedEvents = [
			"click",
			"mousedown",
			"mousemove",
			"mouseup",
			"dragstart",
			"dragover",
			"dragend"
		];

		aTrackedEvents.forEach((sEventName) => {
			let oListener = {
				name: sEventName,
				listener: (oEvent) => {
					let mEventInfo = {
						name: oEvent.type,
						time: new Date(Date.now()),
						x: oEvent.clientX,
						y: oEvent.clientY
					};

					if (oEvent.type === "click") {
						let oControl = jQuery && jQuery(oEvent.target).control(0);
						if (oControl) {
							mEventInfo.control = oControl.getMetadata().getName();
							mEventInfo.controlId = oControl.getId();
						}
					}

					this.aData.push(mEventInfo);
					window.localStorage.mouse = JSON.stringify(this.aData);
				}
			};
			document.addEventListener(oListener.name, oListener.listener);
			this.aEventListeners.push(oListener);
		})
	}

	paintData(oCanvas) {
		if (!oCanvas) {
			return;
		}

		let ctx = oCanvas.getContext("2d");
		let bDragging = false;

		for (let i = 0; i < this.aData.length; i++) {
			let mEventInfo = this.aData[i];

			switch (mEventInfo.name) {
				case "click":
					ctx.fillStyle = "rgba(255, 165, 0, 0.2)";
					ctx.beginPath();
					ctx.arc(mEventInfo.x, mEventInfo.y, 15, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
					ctx.fillStyle = "#000";
					break;
				case "mousedown":
				case "dragstart":
					bDragging = true;
					ctx.strokeStyle = "blue";
					ctx.lineWidth = 5;
					ctx.setLineDash([5, 3]);
					ctx.beginPath();
					ctx.moveTo(mEventInfo.x, mEventInfo.y);
					break;
				case "mousemove":
				case "dragover":
					if (bDragging) {
						ctx.lineTo(mEventInfo.x, mEventInfo.y);
					}
					break;
				case "mouseup":
				case "dragend":
					bDragging = false;
					ctx.stroke();
					ctx.strokeStyle = "#000";
					ctx.lineWidth = 1;
					ctx.setLineDash([]);
					break;
				default:
			}
		}
	}

	clearData() {
		super.clearData();
		window.localStorage.removeItem("mouse");
	}
}