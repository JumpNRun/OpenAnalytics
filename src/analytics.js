import MouseTracker from "./MouseTracker"
import KeyboardTracker from "./KeyboardTracker";

class Analytics {
	constructor() {
		this.aTrackers = [
			new MouseTracker(),
			new KeyboardTracker()
		];
	}

	start() {
		for (let i = 0; i < this.aTrackers.length; i++) {
			this.aTrackers[i].start();
		}
	}

	paintData() {
		let oCanvas = this.createCanvas();

		for (let i = 0; i < this.aTrackers.length; i++) {
			this.aTrackers[i].paintData(oCanvas);
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

	static removeCanvas() {
		document.body.removeChild(document.getElementById("analytics-data-presentation"));
	}
}

let oAnalytics = new Analytics();
oAnalytics.start();
window.analytics = oAnalytics;