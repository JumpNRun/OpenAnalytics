export default class MouseTracker {
	constructor() {
		this.aEvents = [];
	}

	start() {
		const aTrackedMouseEvents = [
			"click",
			"mousedown",
			"mousemove",
			"mouseup",
			"dragstart",
			"dragover",
			"dragend"
		];

		aTrackedMouseEvents.forEach((sEventName) => {
			document.addEventListener(sEventName, (oEvent) => {
				let mEventInfo = {
					name: oEvent.type,
					time: new Date(Date.now()),
					x: oEvent.clientX,
					y: oEvent.clientY
				};

				let oControl = jQuery(oEvent.target).control(0);
				if (oControl && oEvent.type === "click") {
					mEventInfo.control = oControl.getMetadata().getName();
					mEventInfo.controlId = oControl.getId();
				}

				this.aEvents.push(mEventInfo);
				window.localStorage.clickEvents = JSON.stringify(this.aEvents);
			});
		})
	}

	paintData() {
		let oCanvas = this.createCanvas();
		let ctx = oCanvas.getContext("2d");
		let bDragging = false;

		for (let i = 0; i < this.aEvents.length; i++) {
			let mEventInfo = this.aEvents[i];

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

	createCanvas() {
		if (document.getElementById("analytics-data-presentation")) {
			this.removeCanvas();
		}

		let oCanvas = document.createElement("canvas");
		let mBodyRect = document.body.getBoundingClientRect();

		oCanvas.setAttribute("id", "analytics-data-presentation");
		oCanvas.setAttribute("width", mBodyRect.width + "px");
		oCanvas.setAttribute("height", mBodyRect.height + "px");
		oCanvas.style.position = "absolute";
		oCanvas.style.top = 0;
		oCanvas.style.left = 0;
		oCanvas.style.backgroundColor = "transparent";
		document.body.appendChild(oCanvas);

		return oCanvas;
	}

	removeCanvas() {
		document.body.removeChild(document.getElementById("analytics-data-presentation"));
	}
}