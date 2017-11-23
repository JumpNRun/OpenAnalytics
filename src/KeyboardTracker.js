import TrackerBase from "./TrackerBase";

export default class KeyboardTracker extends TrackerBase {
	start() {
		const aTrackedEvents = [
			"keypress"
		];

		aTrackedEvents.forEach((sEventName) => {
			document.addEventListener(sEventName, (oEvent) => {
				let mEventInfo = {
					name: oEvent.type,
					time: Date.now()
				};

				let bIsPasswordInput = oEvent.target instanceof HTMLInputElement && oEvent.target.type === "password";
				let oControl = jQuery && jQuery(oEvent.target).control(0);
				if (!bIsPasswordInput && oControl) {
					mEventInfo.control = oControl.getMetadata().getName();
					mEventInfo.controlId = oControl.getId();

					this.aData.push(mEventInfo);
					window.localStorage.keyboard = JSON.stringify(this.aData);
				}
			});
		})
	}
}