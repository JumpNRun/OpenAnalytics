export default class TrackerBase {
	constructor() {
		this.aData = [];
		this.aEventListeners = [];
	}

	start() {}

	stop() {
		for (var i = 0; i < this.aEventListeners.length; i++) {
			document.removeEventListener(this.aEventListeners[i].name, this.aEventListeners[i].listener);
		}
	}

	paintData(oCanvas) {}

	clearData() {
		this.aData = [];
	}
}