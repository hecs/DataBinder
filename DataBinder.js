﻿/*jshint -W054 */
define([], function(){

	function Binder(model, containerElement) {
		this.model = model;
		this.containerElement = containerElement;
	}

	Binder.prototype.updateModelFromDOM = function() {
		var ATTR_JSONPATH = "data-jsonpath";
		var json = this.model;

		var getControlValue = function() {
			var type = control.getAttribute('type');
			switch (control.tagName) {
			case 'INPUT':
				if (type === 'text' ||
					type === 'password') {
					return control.value;
				} else if (type === 'checkbox') {
					return control.checked;
				}
				break;
			case 'TEXTAREA':
				return control.value;
			case 'SELECT':
				return control.options[control.selectedIndex].value;
			}
			throw "Could not determine control type";
		};

		var setValue = function(jsonPath) {
			var value = getControlValue(control);
			control.modelType = control.modelType || getValueType(jsonPath);
			if (control.modelType === "number") {
				value = convertToNumber(jsonPath, value);
			}

			new Function(["json", "value"], "json." + jsonPath + " = value")(json, value);
		};
		
		var getValueType = function(jsonPath){
			return typeof new Function(["json"], "return json." + jsonPath)(json);
		};

		var convertToNumber = function(jsonPath, newValue) {
			var newValueNumber = parseFloat(newValue);

			if (!isNaN(newValueNumber)) {
				return newValueNumber;
			}
			return newValue;
		};

		var elements = this.containerElement.getElementsByTagName('*');
		for (var i = 0; i < elements.length; i++) {
			var control = elements[i];
			var path = control.getAttribute(ATTR_JSONPATH);
			if (path === null) {
				continue;
			}
			setValue(path);
		}
		return this;
	};
	
	return Binder;
});