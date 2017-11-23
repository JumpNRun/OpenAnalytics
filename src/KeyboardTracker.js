import TrackerBase from "./TrackerBase";

export default class KeyboardTracker extends TrackerBase {
	constructor() {
		super();
		let sMouseData = window.localStorage.mouse;
		if (sMouseData) {
			this.aData = JSON.parse(sMouseData);
		}
	}

	start() {
		const aTrackedEvents = [
			"keypress"
		];

		aTrackedEvents.forEach((sEventName) => {
			let oListener = {
				name: sEventName,
				listener: (oEvent) => {
					let bIsPasswordInput = oEvent.target instanceof HTMLInputElement && oEvent.target.type === "password";
					let oControl = jQuery && jQuery(oEvent.target).control(0);

					if (!bIsPasswordInput && oControl) {
						let mEventInfo = {
							name: oEvent.type,
							time: Date.now(),
							charCode: oEvent.charCode,
							control: oControl.getMetadata().getName(),
							controlId: oControl.getId()
						};

						this.aData.push(mEventInfo);
						window.localStorage.keyboard = JSON.stringify(this.aData);
					}
				}
			};
			document.addEventListener(oListener.name, oListener.listener);
			this.aEventListeners.push(oListener);
		});
	}
}