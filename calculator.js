/**
 * Created by maiquel on 14/11/16.
 */

(function () {
	"use strict";
	//calculator core functions
	let controller = {
		acc: 0,																//accumulator
		diplayValue: 0,														//value diplayed on de calculator
		expression: "",														//expression displayed to the user
		currentOperation: null,												//detect witch operation is going on
		newValue: false,													//controls the user input, when he is inserting a new value or the same number

		/* processe de digits of the user */
		processDigit: function (value) {
			if (this.filterInt(value)) {									/* if is numeral */
				this.expression += value;

				if(this.newValue){
					this.diplayValue = 0;
					this.newValue = false;
				}

				let displayStr = this.diplayValue + "" + value;
				this.diplayValue = parseInt(displayStr);
			}
			else {															/* if is an operation */
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
						this.acc = this.diplayValue;
						break;
					case "mul":
						this.expression += " x ";
						this.calculate();
						this.currentOperation = "mul";
						this.acc = this.diplayValue;
						break;
					case "plus":
						this.expression += " + ";
						this.calculate();
						this.currentOperation = "plus";
						this.acc = this.diplayValue;
						break;
					case "sub":
						this.expression += " - ";
						this.calculate();
						this.currentOperation = "sub";
						this.acc = this.diplayValue;
						break;
					case "equal":
						this.calculate();
						this.expression = this.acc + "";
						this.currentOperation = null;
				}
				this.newValue = true;
			}
			view.renderValues(this.expression, this.diplayValue);
		},

		/* detect the imput, if is numeral or an operation */
		filterInt: function (value) {
			if (value >= 0 && value <= 9) {
				return true;
			}
			return false;
		},

		/* reset de calculator */
		reset: function () {
			this.acc = 0;
			this.diplayValue = 0;
			this.expression = "";
			this.currentOperation = null;
			this.newValue = false;
		},

		/* calculate conform the operation */
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

	/* object that control the render options */
	let view = {

		renderValues: function (expression, acc) {
			let expressionField = document.getElementById("expression"),
				displayValueField = document.getElementById("acc");

			expressionField.innerHTML = expression;
			displayValueField.innerHTML = (acc + "").substr(0,8);
		}
	};

	/* initialize calculator */
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