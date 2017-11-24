import MouseTracker from "./MouseTracker"
import KeyboardTracker from "./KeyboardTracker";

class Analytics {
	constructor() {
		this.oDialog = null;
		this.oMouseTable = null;
		this.oKeyboardTable = null;
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

	stop() {
		for (let i = 0; i < this.aTrackers.length; i++) {
			this.aTrackers[i].stop();
		}
	}

	showInteraction() {
		let oCanvas = this.createCanvas();

		for (let i = 0; i < this.aTrackers.length; i++) {
			this.aTrackers[i].paintData(oCanvas);
		}
	}

	hideInteraction() {
		this.removeCanvas();
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

	openDashboard() {
		if (!sap) {
			console.log("ui5 not yet loaded, try again later!");
			return;
		}

		if (!this.oDialog) {
			sap.ui.getCore().loadLibrary("sap.ui.table");

			this.oMouseTable = new sap.ui.table.Table("mouseTable", {
				title: "Mouse Interaction",
				alternateRowColors: true,
				rows: {
					path: "/"
				},
				columns: [
					new sap.ui.table.Column({
						label: new sap.m.Label({text: "Event name"}),
						template: new sap.m.Text({text: "{name}", wrapping: false}),
						sortProperty: "name",
						filterProperty: "name"
					}),
					new sap.ui.table.Column({
						label: "Event executed at",
						template: new sap.m.Text({text: "{time}", wrapping: false}),
						sortProperty: "time"
					}),
					new sap.ui.table.Column({
						label: "X position",
						template: new sap.m.Text({text: "{x}", wrapping: false})
					}),
					new sap.ui.table.Column({
						label: "Y position",
						template: new sap.m.Text({text: "{y}", wrapping: false})
					}),
					new sap.ui.table.Column({
						label: "Control Name",
						template: new sap.m.Text({text: "{control}", wrapping: false}),
						filterProperty: "control"
					}),
					new sap.ui.table.Column({
						label: "Control ID",
						template: new sap.m.Text({text: "{controlId}", wrapping: false})
					})
				]
			});

			this.oKeyboardTable = new sap.ui.table.Table("keyboardTable", {
				title: "Keyboard Interaction",
				alternateRowColors: true,
				rows: {
					path: "/"
				},
				columns: [
					new sap.ui.table.Column({
						label: new sap.m.Label({text: "Event name"}),
						template: new sap.m.Text({text: "{name}", wrapping: false}),
						sortProperty: "name",
						filterProperty: "name"
					}),
					new sap.ui.table.Column({
						label: "Event executed at",
						template: new sap.m.Text({text: "{time}", wrapping: false}),
						sortProperty: "time"
					}),
					new sap.ui.table.Column({
						label: "Key",
						template: new sap.m.Text({text: {
							path: "charCode",
							formatter: function(sCharCode) {
								return String.fromCharCode(sCharCode);
							}
						}, wrapping: false})
					}),
					new sap.ui.table.Column({
						label: "Character Code",
						template: new sap.m.Text({text: "{charCode}", wrapping: false})
					}),
					new sap.ui.table.Column({
						label: "Control Name",
						template: new sap.m.Text({text: "{control}", wrapping: false}),
						filterProperty: "control"
					}),
					new sap.ui.table.Column({
						label: "Control ID",
						template: new sap.m.Text({text: "{controlId}", wrapping: false})
					})
				]
			});

			let oVBox = new sap.m.VBox({
				height: "100%",
				width: "100%",
				items: [
					new sap.m.VBox({
						height: "50%",
						width: "auto",
						items: [this.oMouseTable]
					}).addStyleClass("sapUiResponsiveContentPadding"),
					new sap.m.VBox({
						height: "50%",
						width: "auto",
						items: [this.oKeyboardTable]
					}).addStyleClass("sapUiResponsiveContentPadding")
				]
			}).addStyleClass("sapUiResponsiveContentPadding");

			this.oDialog = new sap.m.Dialog({
				title: "Analytics Report",
				contentWidth: "100%",
				contentHeight: "100%",
				horizontalScrolling: false,
				content: [oVBox]
			});
		}

		let sMouseData = window.localStorage.mouse;
		if (sMouseData) {
			let aMouseData = JSON.parse(sMouseData);
			let oModel = new sap.ui.model.json.JSONModel(aMouseData);
			this.oMouseTable.setModel(oModel);
		} else {
			this.oMouseTable.setModel(new sap.ui.model.json.JSONModel());
		}

		let sKeyboardData = window.localStorage.keyboard;
		if (sKeyboardData) {
			let aKeyboardData = JSON.parse(sKeyboardData);
			let oModel = new sap.ui.model.json.JSONModel(aKeyboardData);
			this.oKeyboardTable.setModel(oModel);
		} else {
			this.oKeyboardTable.setModel(new sap.ui.model.json.JSONModel());
		}

		this.stop();
		this.oDialog.open();
	}

	closeDashboard() {
		if (this.oDialog) {
			this.oDialog.close();
			this.start();
		}
	}

	clearData() {
		for (let i = 0; i < this.aTrackers.length; i++) {
			this.aTrackers[i].clearData();
		}
	}
}

let oAnalytics = new Analytics();
oAnalytics.start();
window.analytics = oAnalytics;