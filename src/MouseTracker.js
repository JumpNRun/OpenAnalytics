export default class MouseTracker {
	constructor() {
		this.aEvents = [];
	}

	start() {
		const aTrackedMouseEvents = [
			"click",
			"mousedown",
			"mousemove",
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
					ctx.arc(mEventInfo.x, mEventInfo.y, 10, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
					break;
				case "mousedown":
					bDragging = true;
					ctx.strokeStyle = "blue";
					ctx.beginPath();
					ctx.moveTo(mEventInfo.x, mEventInfo.y);
					break;
				case "mousemove":
					if (bDragging) {
						ctx.lineTo(mEventInfo.x, mEventInfo.y);
					}
					break;
				case "mouseup":
					bDragging = false;
					ctx.stroke();
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