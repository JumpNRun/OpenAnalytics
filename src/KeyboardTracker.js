import TrackerBase from "./TrackerBase";

export default class KeyboardTracker extends TrackerBase {
	start() {
		const aTrackedEvents = [
			"keydown",
			"keyup",
			"keypress"
		];

		aTrackedEvents.forEach((sEventName) => {
			document.addEventListener(sEventName, (oEvent) => {
				let mEventInfo = {
					name: oEvent.type,
					time: Date.now()
				};

				let oControl = jQuery(oEvent.target).control(0);
				if (oControl) {
					mEventInfo.control = oControl.getMetadata().getName();

					this.aData.push(mEventInfo);
					window.localStorage.keyboard = JSON.stringify(this.aData);
				}
			});
		})
	}
}