/**
 * Created by maiquel on 14/11/16.
 */

(function () {
	"use strict";
	//calculator core functions
	let controller = {
		acc: 0,
		diplayValue: 0,
		expression: "",
		currentOperation: null,
		newValue: false,

		/* processe de digits of the user */
		processDigit: function (value) {
			if (this.filterInt(value)) {							/* if is numeral */
				this.expression += value;

				if(this.newValue){
					this.diplayValue = 0;
					this.newValue = false;
				}

				let displayStr = this.diplayValue + "" + value;
				this.diplayValue = parseInt(displayStr);
			}
			else {
				switch (value) {
					case "clear":
						this.reset();
						break;
					case "signal":
						this.diplayValue = this.diplayValue * -1;
						break;
					case "percent":
						this.diplayValue = this.diplayValue * (1/100);
						break;
					case "sqrt":
						this.diplayValue = Math.sqrt(this.diplayValue);
						break;
					case "div":
						this.expression += " / ";
						this.calculate();
						this.currentOperation = "div";
						break;
					case "mul":
						this.expression += " x ";
						this.calculate();
						this.currentOperation = "mul";
						break;
					case "plus":
						this.expression += " + ";
						this.calculate();
						this.currentOperation = "plus";
						break;
					case "sub":
						this.expression += " - ";
						this.calculate();
						this.currentOperation = "sub";
						break;
					case "equal":
						this.expression += " = ";
						this.calculate();
				}
				this.newValue = true;
			}
			view.renderValues(this.expression, this.diplayValue);
		},

		filterInt: function (value) {
			if (value >= 0 && value <= 9) {
				return true;
			}
			return false;
		},

		reset: function () {
			this.acc = 0;
			this.diplayValue = 0;
			this.expression = "";
			this.currentOperation = null;
		},


		calculate: function () {
			if(this.currentOperation){
				switch (this.currentOperation) {
					case "div":
						this.acc /= this.diplayValue;
						break;
					case "mul":
						this.acc *= this.diplayValue;
						break;
					case "plus":
						this.acc += this.diplayValue;
						break;
					case "sub":
						this.acc -= this.diplayValue;
						break;
				}
				this.diplayValue = this.acc;
			}
		}
	};

	let view = {

		renderValues: function (expression, acc) {
			let expressionField = document.getElementById("expression"),
				displayValueField = document.getElementById("acc");

			expressionField.innerHTML = expression;
			displayValueField.innerHTML = acc;
		}
	};


	let calculator = document.getElementsByClassName("calculator")[0],
		bts = document.getElementsByClassName("num");

	for (let i = 0; i < bts.length; i++) {
		bts[i].onclick = buttomClickHandler;
	}

	function buttomClickHandler(e) {
		let id = this.getAttribute("id");
		controller.processDigit(id);
	}

}());