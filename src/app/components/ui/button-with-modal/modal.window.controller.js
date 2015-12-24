export default class ModalWindowCtrl {
	constructor($scope) {
		this.$scope = $scope;

		this.showModalDialog = true;
	}

	showAlert() {
		alert("!!!!")
	}
}
