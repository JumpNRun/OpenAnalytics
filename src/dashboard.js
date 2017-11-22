var aAnalyticsData = JSON.parse(window.localStorage.clickEvents);

var oApp = new sap.m.App;

var oModel = new sap.ui.model.json.JSONModel();
oModel.setData(aAnalyticsData);

var oTable = new sap.ui.table.Table("dashboardReportTable", {
	alternateRowColors: true,
	visibleRowCount: 20,
	visibleRowCountMode: "Auto",
	rows: {
		path: "/"
	},
	columns: [
		new sap.ui.table.Column("eventName", {
			label: new sap.m.Label({text: "Event name"}),
			template: new sap.m.Text({text: "{name}", wrapping: false}),
			sortProperty: "name",
			filterProperty: "name"
		}),
		new sap.ui.table.Column("executedAt", {
			label: "Event executed at",
			template: new sap.m.Text({text: "{time}", wrapping: false}),
			sortProperty: "time"
		}),
		new sap.ui.table.Column("xPosition", {
			label: "X position",
			template: new sap.m.Text({text: "{x}", wrapping: false})
		}),
		new sap.ui.table.Column("yPosition", {
			label: "Y position",
			template: new sap.m.Text({text: "{y}", wrapping: false})
		}),
		new sap.ui.table.Column("controlName", {
			label: "Control Name",
			template: new sap.m.Text({text: "{control}", wrapping: false})
		}),
		new sap.ui.table.Column("controlId", {
			label: "Control ID",
			template: new sap.m.Text({text: "{controlId}", wrapping: false})
		})
	]
});

oTable.setModel(oModel);
window.oTable = oTable;

var oPage = new sap.m.Page({
	enableScrolling : true,
	content : [oTable]
});

oApp.addPage(oPage).placeAt("content");