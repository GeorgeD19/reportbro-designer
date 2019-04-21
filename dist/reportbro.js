/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setInputInteger */
/* harmony export (immutable) */ __webpack_exports__["f"] = setInputPositiveInteger;
/* harmony export (immutable) */ __webpack_exports__["h"] = setInputDecimal;
/* harmony export (immutable) */ __webpack_exports__["i"] = checkInputDecimal;
/* harmony export (immutable) */ __webpack_exports__["a"] = convertInputToNumber;
/* harmony export (immutable) */ __webpack_exports__["c"] = roundValueToInterval;
/* harmony export (immutable) */ __webpack_exports__["d"] = roundValueToLowerInterval;
/* harmony export (immutable) */ __webpack_exports__["e"] = roundValueToUpperInterval;
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAll;
/* harmony export (immutable) */ __webpack_exports__["g"] = initColorPicker;
/* harmony export (immutable) */ __webpack_exports__["j"] = insertAtCaret;
/* unused harmony export getDataTransferType */
String.prototype.reverse = function () { return this.split('').reverse().join(''); };

function setInputInteger(el) {
    el.on('keyup', function() {
        var nvalue = this.value.reverse().replace(/[^0-9\-]|\-(?=.)/g, '').reverse();
        if (this.value !== nvalue) this.value = nvalue;
    });
}

function setInputPositiveInteger(el) {
    el.on('keyup', function() {
        var nvalue = this.value.replace(/[^0-9]/g, '');
        if (this.value !== nvalue) this.value = nvalue;
    });
}

function setInputDecimal(el) {
    el.on('keyup', function() {
        var nvalue = this.value.reverse().replace(/[^0-9\-\.,]|[\-](?=.)|[\.,](?=[0-9]*[\.,])/g, '').reverse();
        var className = this.className;
        var pos = className.indexOf('decimalPlaces');
        if (pos !== -1) {
            pos += 13;
            var pos2 = className.indexOf(' ', pos);
            var places;
            if (pos2 !== -1) {
                places = parseInt(className.substring(pos, pos2), 10);
            } else {
                places = parseInt(className.substr(pos), 10);
            }
            if (!isNaN(places)) {
                pos = nvalue.indexOf('.');
                if (pos === -1) {
                    pos = nvalue.indexOf(',');
                }
                if (pos !== -1 && (nvalue.length - 1 - pos) > places) {
                    nvalue = nvalue.substring(0, pos + places + 1);
                }
            }
        }
        if(this.value !== nvalue) this.value = nvalue;
    });
}

function checkInputDecimal(val, min, max) {
    let value = parseFloat(val.replace(',', '.'));
    if (isNaN(value)) {
        return '' + min;
    } else if (value < min) {
        return '' + min;
    } else if (value > max) {
        return '' + max;
    }
    return val;
}

function convertInputToNumber(val) {
    if (typeof(val) === 'number') {
        return val;
    }
    if (typeof(val) === 'string' && val !== '') {
        let rv = parseFloat(val.replace(',', '.'));
        if (!isNaN(rv)) {
            return rv;
        }
    }
    return 0;
}

function roundValueToInterval(val, interval) {
    let tmp = Math.ceil(val / interval) * interval;
    if ((tmp - val) <= (interval >> 1)) {
        return tmp;
    }
    return tmp - interval;
}

function roundValueToLowerInterval(val, interval) {
    return Math.floor(val / interval) * interval;
}

function roundValueToUpperInterval(val, interval) {
    return Math.ceil(val / interval) * interval;
}

function replaceAll(str, oldVal, newVal) {
    // not the fastest solution but works
    let ret = str;
    while (ret.indexOf(oldVal) !== -1) {
        ret = ret.replace(oldVal, newVal);
    }
    return ret;
}

function initColorPicker(el, rb, options) {
    var allOptions = {
        showInitial: false,
        preferredFormat: "hex",
        containerClassName: "rbroColorContainer",
        replacerClassName: "rbroColorPicker",
        showPalette: true,
        showButtons: false,
        showSelectionPalette: false,  // disable showing previous selections by user
        palette: [
            ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
        ],
        change: function(color) {
            el.spectrum("hide");
        },
        show: function(color) {
            el.parent().addClass('rbroActive');
        },
        hide: function(color) {
            el.parent().removeClass('rbroActive');
        }
    };
    $.extend( allOptions, options || {} );
    el.spectrum(allOptions);
    el.show();  // show original text input
    el.focus(event => {
            el.parent().addClass('rbroActive');
        });
    el.blur(event => {
            el.parent().removeClass('rbroActive');
        });
}

function insertAtCaret(element, text) {
    if (document.selection) {
        element.focus();
        var sel = document.selection.createRange();
        sel.text = text;
        element.focus();
    } else if (element.selectionStart || element.selectionStart === 0) {
        var startPos = element.selectionStart;
        var endPos = element.selectionEnd;
        var scrollTop = element.scrollTop;
        element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);
        element.focus();
        element.selectionStart = startPos + text.length;
        element.selectionEnd = startPos + text.length;
        element.scrollTop = scrollTop;
    } else {
        element.value += text;
        element.focus();
    }
}

function getDataTransferType(transferType, prefix) {
    let parts = transferType.split('/');
    if (parts.length >= 2 && parts[0] == prefix) {
        return parts[1];
    }
    return null;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_MovePanelItemCmd__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_AddDeleteDocElementCmd__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(0);







/**
 * Base class for all doc elements.
 * @class
 */
class DocElement {
    constructor(name, id, defaultWidth, defaultHeight, rb) {
        this.rb = rb;
        this.id = id;
        this.name = name;
        this.panelItem = null;
        this.x = '0';
        this.y = '0';
        this.width = '' + defaultWidth;
        this.height = '' + defaultHeight;
        this.containerId = null;
        // in case of frame or band element, this is the container represented by the element
        this.linkedContainerId = null;
        this.printIf = '';
        this.removeEmptyElement = false;

        this.el = null;
        this.selected = false;

        this.xVal = 0;
        this.yVal = 0;
        this.widthVal = 0;
        this.heightVal = 0;

        this.errors = [];
    }

    setInitialData(initialData) {
        for (let key in initialData) {
            if (initialData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = initialData[key];
            }
        }

        // make sure x, y, width and height are strings (they are stored as numbers when serialized)
        this.x = '' + this.x;
        this.y = '' + this.y;
        this.width = '' + this.width;
        this.height = '' + this.height;
        
        this.xVal = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.x);
        this.yVal = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.y);
        this.widthVal = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.width);
        this.heightVal = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.height);
    }

    /**
     * Called after initialization is finished.
     */
    setup(openPanelItem) {
        let container = this.getContainer();
        if (container !== null) {
            // adapt position if new element is outside container
            let containerSize = container.getContentSize();
            if (this.xVal + this.widthVal > containerSize.width) {
                this.xVal = containerSize.width - this.widthVal;
            }
            if (this.xVal < 0) {
                this.xVal = 0;
            }
            if (this.yVal + this.heightVal > containerSize.height) {
                this.yVal = containerSize.height - this.heightVal;
            }
            if (this.yVal < 0) {
                this.yVal = 0;
            }
            this.x = '' + this.xVal;
            this.y = '' + this.yVal;
        }
    }

    /**
     * Register event handlers so element can be selected, dragged and resized.
     */
    registerEventHandlers() {
        this.el
            .dblclick(event => {
                this.handleClick(event, true);
            })
            .mousedown(event => {
                this.handleClick(event, false);
            });
    }

    /**
     * Handle mouse click on this element so the element can be selected, dragged and resized.
     * @param {jQuery.Event} event - browser event object.
     * @param {Boolean} ignoreSelectedContainer - if true the element will always be selected in case it
     * was not selected before. Otherwise the element will only be selected if it's container is
     * not selected (e.g. the frame container when this element is inside a frame).
     */
    handleClick(event, ignoreSelectedContainer) {
        if (!this.rb.isSelectedObject(this.id)) {
            if (ignoreSelectedContainer || !this.isContainerSelected()) {
                let allowSelection = true;
                if (event.shiftKey) {
                    // do not allow selecting element if one of its children is already selected
                    let children = [];
                    this.appendContainerChildren(children);
                    for (let child of children) {
                        if (this.rb.isSelectedObject(child.getId())) {
                            allowSelection = false;
                            break;
                        }
                    }
                }
                if (allowSelection) {
                    this.rb.selectObject(this.id, !event.shiftKey);
                }
                event.stopPropagation();
            }
        } else {
            if (event.shiftKey) {
                this.rb.deselectObject(this.id);
            } else {
                this.rb.getDocument().startDrag(event.originalEvent.pageX, event.originalEvent.pageY,
                    this.id, this.containerId, this.linkedContainerId,
                    this.getElementType(), DocElement.dragType.element);
            }
            event.stopPropagation();
        }
    }

    getId() {
        return this.id;
    }

    /**
     * Returns highest id of this component including all its child components.
     * @returns {Number}
     */
    getMaxId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPanelItem() {
        return this.panelItem;
    }

    setPanelItem(panelItem) {
        this.panelItem = panelItem;
    }

    getContainerId() {
        return this.containerId;
    }

    getContainer() {
        return this.rb.getDataObject(this.getContainerId());
    }

    getLinkedContainer() {
        if (this.linkedContainerId !== null) {
            return this.rb.getDataObject(this.linkedContainerId);
        }
        return null;
    }

    getContainerContentSize() {
        let container = this.getContainer();
        return (container !== null) ? container.getContentSize() : { width: 0, height: 0 };
    }

    appendToContainer() {
        let container = this.getContainer();
        if (container !== null) {
            container.appendElement(this.el);
        }
    }

    isContainerSelected() {
        let container = this.getContainer();
        if (container !== null) {
            return container.isSelected();
        }
        return false;
    }

    appendContainerChildren(elements) {
        if (this.linkedContainerId !== null) {
            if (this.panelItem !== null) {
                let children = this.panelItem.getChildren();
                for (let child of children) {
                    if (child.getData() instanceof DocElement) {
                        elements.push(child.getData());
                        child.getData().appendContainerChildren(elements);
                    }
                }
            }
        }
    }

    /**
     * Returns absolute position inside document.
     * @returns {Object} x and y coordinates.
     */
    getAbsolutePosition() {
        let pos = { x: this.xVal, y: this.yVal };
        let container = this.getContainer();
        if (container !== null) {
            let offset = container.getOffset();
            pos.x += offset.x;
            pos.y += offset.y;
        }
        return pos;
    }

    /**
     * Check element bounds within container and adapt position/size if necessary.
     *
     * This should be called when an element is resized or moved to another container to guarantee that
     * the element is not out of bounds.
     * @param {Number} x - x value of doc element.
     * @param {Number} y - y value of doc element.
     * @param {Number} width - width value of doc element.
     * @param {Number} height - height value of doc element.
     * @param {Object} containerSize - width and height of container where this doc element belongs to.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    checkBounds(x, y, width, height, containerSize, cmdGroup) {
        if ((x + width) > containerSize.width) {
            x = containerSize.width - width;
        }
        if (x < 0)  {
            x = 0;
        }
        if ((x + width) > containerSize.width) {
            width = containerSize.width - x;
        }
        if ((y + height) > containerSize.height) {
            y = containerSize.height - height;
        }
        if (y < 0)  {
            y = 0;
        }
        if ((y + height) > containerSize.height) {
            height = containerSize.height - y;
        }

        if (x !== this.xVal && this.getXTagId() !== '') {
            let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.id, this.getXTagId(), 'x',
                '' + x, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
            cmd.disableSelect();
            cmdGroup.addCommand(cmd);
        }
        if (y !== this.yVal && this.getYTagId() !== '') {
            let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.id, this.getYTagId(), 'y',
                '' + y, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
            cmd.disableSelect();
            cmdGroup.addCommand(cmd);
        }
        if (width !== this.widthVal && this.getWidthTagId() !== '') {
            let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.id, this.getWidthTagId(), 'width',
                '' + width, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
            cmd.disableSelect();
            cmdGroup.addCommand(cmd);
        }
        if (height !== this.heightVal && this.getHeightTagId() !== '') {
            let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.id, this.getHeightTagId(), 'height',
                '' + height, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
            cmd.disableSelect();
            cmdGroup.addCommand(cmd);
        }

        let linkedContainer = this.getLinkedContainer();
        if (linkedContainer !== null && linkedContainer.getPanelItem() !== null) {
            let linkedContainerSize = { width: width, height: height };
            for (let child of linkedContainer.getPanelItem().getChildren()) {
                if (child.getData() instanceof DocElement) {
                    let docElement = child.getData();
                    docElement.checkBounds(docElement.getValue('xVal'), docElement.getValue('yVal'),
                        docElement.getValue('widthVal'), docElement.getValue('heightVal'),
                        linkedContainerSize, cmdGroup);
                }
            }
        }
    }

    getValue(field) {
        return this[field];
    }

    setValue(field, value, elSelector, isShown) {
        this[field] = value;
        if (field === 'x' || field === 'y' || field === 'width' || field === 'height') {
            this[field + 'Val'] = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](value);
            this.updateDisplay();
        } else if (field === 'containerId') {
            if (this.el !== null) {
                // detach dom node from container and then attach it to new container
                this.el.detach();
                this.appendToContainer();
            }
            if (this.linkedContainerId !== null) {
                let linkedContainer = this.getLinkedContainer();
                if (linkedContainer !== null) {
                    linkedContainer.setParent(this.getContainer());
                }
            }
        } else if (['styleId', 'bold', 'italic', 'underline', 'horizontalAlignment', 'verticalAlignment',
                'textColor', 'backgroundColor', 'font', 'fontSize', 'lineSpacing', 'borderColor', 'borderWidth',
                'borderAll', 'borderLeft', 'borderTop', 'borderRight', 'borderBottom',
                'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom'].indexOf(field) !== -1) {

            this.updateStyle();

            if (['borderWidth', 'borderAll', 'borderLeft', 'borderTop', 'borderRight', 'borderBottom',
                'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom'].indexOf(field) !== -1) {
                this.updateDisplay();
            }
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return [];
    }

    getElementType() {
        return DocElement.type.none;
    }

    setBorderAll(fieldPrefix, value) {
        this[fieldPrefix + 'borderAll'] = value;
    }

    updateDisplay() {
        this.updateDisplayInternal(this.xVal, this.yVal, this.widthVal, this.heightVal);
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { left: this.rb.toPixel(x), top: this.rb.toPixel(y),
                width: this.rb.toPixel(width), height: this.rb.toPixel(height) };
            this.el.css(props);
        }
    }

    updateStyle() {
    }

    updateChangedStyle(styleId) {
        if (this.styleId === styleId) {
            this.updateStyle();
        }
    }

    getDragDiff(diffX, diffY, dragType, gridSize) {
        let rv = { x: 0, y: 0 };
        let dragX, dragY;
        let posX1 = this.xVal;
        let posY1 = this.yVal;
        let posX2 = posX1 + this.widthVal;
        let posY2 = posY1 + this.heightVal;
        let maxWidth = this.getMaxWidth();
        const MIN_DRAG_SIZE = 20;
        if (dragType === DocElement.dragType.element) {
            dragX = posX1 + diffX;
            if (gridSize !== 0) {
                dragX = __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* roundValueToInterval */](dragX, gridSize);
            }
            dragY = posY1 + diffY;
            if (gridSize !== 0) {
                dragY = __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* roundValueToInterval */](dragY, gridSize);
            }
            rv.x = dragX - posX1;
            rv.y = dragY - posY1;
        } else {
            let containerSize = this.getContainerContentSize();
            if (dragType === DocElement.dragType.sizerNW || dragType === DocElement.dragType.sizerN || dragType === DocElement.dragType.sizerNE) {
                dragY = posY1 + diffY;
                if (gridSize !== 0) {
                    dragY = __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* roundValueToInterval */](dragY, gridSize);
                }
                if (dragY > posY2 - MIN_DRAG_SIZE) {
                    if (gridSize !== 0) {
                        dragY = __WEBPACK_IMPORTED_MODULE_5__utils__["d" /* roundValueToLowerInterval */](posY2 - MIN_DRAG_SIZE, gridSize);
                    } else {
                        dragY = posY2 - MIN_DRAG_SIZE;
                    }
                } else if (dragY < 0) {
                    dragY = 0;
                }
                rv.y = dragY - posY1;
            }
            if (dragType === DocElement.dragType.sizerNE || dragType === DocElement.dragType.sizerE || dragType === DocElement.dragType.sizerSE) {
                dragX = posX2 + diffX;
                if (gridSize !== 0) {
                    dragX = __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* roundValueToInterval */](dragX, gridSize);
                }
                if (dragX < posX1 + MIN_DRAG_SIZE) {
                    if (gridSize !== 0) {
                        dragX = __WEBPACK_IMPORTED_MODULE_5__utils__["e" /* roundValueToUpperInterval */](posX1 + MIN_DRAG_SIZE, gridSize);
                    } else {
                        dragX = posX1 + MIN_DRAG_SIZE;
                    }
                } else if (dragX > maxWidth) {
                    dragX = maxWidth;
                }
                rv.x = dragX - posX2;
            }
            if (dragType === DocElement.dragType.sizerSE || dragType === DocElement.dragType.sizerS || dragType === DocElement.dragType.sizerSW) {
                dragY = posY2 + diffY;
                if (gridSize !== 0) {
                    dragY = __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* roundValueToInterval */](dragY, gridSize);
                }
                if (dragY < posY1 + MIN_DRAG_SIZE) {
                    if (gridSize !== 0) {
                        dragY = __WEBPACK_IMPORTED_MODULE_5__utils__["e" /* roundValueToUpperInterval */](posY1 + MIN_DRAG_SIZE, gridSize);
                    } else {
                        dragY = posY1 + MIN_DRAG_SIZE;
                    }
                } else if (dragY > containerSize.height) {
                    dragY = containerSize.height;
                }
                rv.y = dragY - posY2;
            }
            if (dragType === DocElement.dragType.sizerSW || dragType === DocElement.dragType.sizerW || dragType === DocElement.dragType.sizerNW) {
                dragX = posX1 + diffX;
                if (gridSize !== 0) {
                    dragX = __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* roundValueToInterval */](dragX, gridSize);
                }
                if (dragX > posX2 - MIN_DRAG_SIZE) {
                    if (gridSize !== 0) {
                        dragX = __WEBPACK_IMPORTED_MODULE_5__utils__["d" /* roundValueToLowerInterval */](posX2 - MIN_DRAG_SIZE, gridSize);
                    } else {
                        dragX = posX2 - MIN_DRAG_SIZE;
                    }
                } else if (dragX < 0) {
                    dragX = 0;
                }
                rv.x = dragX - posX1;
            }
        }
        return rv;
    }

    updateDrag(diffX, diffY, dragType, dragContainer, cmdGroup) {
        let posX1 = this.xVal;
        let posY1 = this.yVal;
        let posX2 = posX1 + this.widthVal;
        let posY2 = posY1 + this.heightVal;
        let maxWidth = this.getMaxWidth();
        let containerSize = this.getContainerContentSize();
        if (dragType === DocElement.dragType.element) {
            posX1 += diffX;
            posX2 = posX1 + this.widthVal;
            posY1 += diffY;
            posY2 = posY1 + this.heightVal;
        } else {
            if (dragType === DocElement.dragType.sizerNW || dragType === DocElement.dragType.sizerN ||
                dragType === DocElement.dragType.sizerNE) {
                posY1 += diffY;
            }
            if (dragType === DocElement.dragType.sizerNE || dragType === DocElement.dragType.sizerE ||
                dragType === DocElement.dragType.sizerSE) {
                posX2 += diffX;
            }
            if (dragType === DocElement.dragType.sizerSE || dragType === DocElement.dragType.sizerS ||
                dragType === DocElement.dragType.sizerSW) {
                posY2 += diffY;
            }
            if (dragType === DocElement.dragType.sizerSW || dragType === DocElement.dragType.sizerW ||
                dragType === DocElement.dragType.sizerNW) {
                posX1 += diffX;
            }
            if (posX1 < 0) {
                posX1 = 0;
            }
            if (posX2 < posX1) {
                posX2 = posX1;
            }
            if (posY1 < 0) {
                posY1 = 0;
            }
            if (posY2 < posY1) {
                posY2 = posY1;
            }
            if (posX2 > maxWidth) {
                posX2 = maxWidth;
            }
            if (posY2 > containerSize.height) {
                posY2 = containerSize.height;
            }
        }
        let width = posX2 - posX1;
        let height = posY2 - posY1;
        if (cmdGroup !== null) {
            let containerChanged = false;
            let container = this.getContainer();
            let containerSize = { width: 0, height: 0};
            if (dragContainer !== null && dragContainer.getId() !== this.getContainerId()) {
                containerChanged = true;
                containerSize = dragContainer.getContentSize();
                if (container !== null) {
                    let relativeOffset = dragContainer.getOffsetTo(container);
                    posX1 -= relativeOffset.x;
                    posY1 -= relativeOffset.y;
                }
            } else {
                containerSize = container.getContentSize();
            }
            if (!containerChanged || dragContainer.isElementAllowed(this.getElementType())) {
                this.checkBounds(posX1, posY1, width, height, containerSize, cmdGroup);

                if (containerChanged) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.id, null, 'containerId',
                        dragContainer.getId(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.internal, this.rb);
                    cmdGroup.addCommand(cmd);
                    cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_MovePanelItemCmd__["a" /* default */](this.getPanelItem(), dragContainer.getPanelItem(),
                        dragContainer.getPanelItem().getChildren().length, this.rb);
                    cmdGroup.addCommand(cmd);
                }

                if (cmdGroup.isEmpty()) {
                    // nothing was changed, make sure displayed element is updated to saved position/size after drag
                    this.updateDisplay();
                }
            } else {
                this.updateDisplayInternal(this.xVal, this.yVal, this.widthVal, this.heightVal);
            }
        } else {
            this.updateDisplayInternal(posX1, posY1, width, height);
        }
    }

    select() {
        if (this.el !== null) {
            let elSizerContainer = this.getSizerContainerElement();
            let sizers = this.getSizers();
            for (let sizer of sizers) {
                let sizerVal = sizer;
                let elSizer = $(`<div class="rbroSizer rbroSizer${sizer}"></div>`)
                    .mousedown(event => {
                        this.rb.getDocument().startDrag(event.pageX, event.pageY,
                            this.id, this.containerId, this.linkedContainerId,
                            this.getElementType(), DocElement.dragType['sizer' + sizerVal]);
                        event.stopPropagation();
                    });
                elSizerContainer.append(elSizer);
            }
            this.el.addClass('rbroSelected');
            this.el.css('z-index', '10');
        }
        this.selected = true;
    }

    deselect() {
        if (this.el !== null) {
            let elSizerContainer = this.getSizerContainerElement();
            elSizerContainer.find('.rbroSizer').remove();
            this.el.css('z-index', '');
            this.el.removeClass('rbroSelected');
        }
        this.selected = false;
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    }

    /**
     * Returns id for dom element of x value.
     * @returns {String} Is empty in case doc element does not have x value.
     */
    getXTagId() {
        return '';
    }

    /**
     * Returns id for dom element of y value.
     * @returns {String} Is empty in case doc element does not have y value.
     */
    getYTagId() {
        return '';
    }

    /**
     * Returns id for dom element of width value.
     * @returns {String} Is empty in case doc element does not have width value.
     */
    getWidthTagId() {
        return '';
    }

    /**
     * Returns id for dom element of height value.
     * @returns {String} Is empty in case doc element does not have height value.
     */
    getHeightTagId() {
        return '';
    }

    hasBorderSettings() {
        return false;
    }

    isDraggingAllowed() {
        return true;
    }

    /**
     * Returns true if another element can be dropped into this element (or its corresponding panel item).
     */
    isDroppingAllowed() {
        return true;
    }

    /**
     * Returns maximum allowed width of element.
     * This is needed when the element is resized by dragging so the resized element does not overflow its container.
     * @returns {Number}.
     */
    getMaxWidth() {
        let containerSize = this.getContainerContentSize();
        return containerSize.width;
    }

    createElement() {
    }

    getElement() {
        return this.el;
    }

    getSizerContainerElement() {
        return this.el;
    }

    /**
     * Returns dom node where elements will be added if they are inside this element.
     * Is null in case this element is not a container element like a frame or a band.
     * @returns {[Object]} dom node
     */
    getContentElement() {
        return null;
    }

    /**
     * Returns all parameters of the data source (which must be an array parameter).
     * Must be overridden when the element has a data source.
     * @returns {[Object]} contains the data source name and all parameters of the data source.
     * Is null in case element does not have a data source.
     */
    getDataSource() {
        return null;
    }

    /**
     * Returns all data source parameters of this element and any possible parent elements.
     * @param {Parameter[]} dataSources - array where the data sources will be appended to.
     * @param {DocElement} child - optional child element where the method was called from.
     */
    getAllDataSources(dataSources, child) {
        if (this.getElementType() === DocElement.type.table || this.getElementType() == DocElement.type.section) {
            if (child && child.getValue('bandType') === __WEBPACK_IMPORTED_MODULE_3__container_Band__["a" /* default */].bandType.content) {
                let dataSource = this.getDataSource();
                if (dataSource !== null) {
                    dataSources.push(dataSource);
                }
            }
        }
        let panelItem = this.getPanelItem();
        if (panelItem !== null) {
            let parentPanelItem = panelItem.getParent();
            if (parentPanelItem !== null && parentPanelItem.getData() instanceof DocElement) {
                parentPanelItem.getData().getAllDataSources(dataSources, this);
            }
        }
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
    }

    /**
     * Adds SetValue command to command group parameter in case the specified parameter is used in the
     * specified object field.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {String} tagId
     * @param {String} field
     * @param {CommandGroupCmd} cmdGroup - possible SetValue command will be added to this command group.
     */
    addCommandForChangedParameterName(parameter, newParameterName, tagId, field, cmdGroup) {
        let paramParent = parameter.getParent();
        let dataSources = [];
        let paramRef = null;
        let newParamRef = null;
        
        this.getAllDataSources(dataSources, null);

        if (paramParent !== null && paramParent.getValue('type') === __WEBPACK_IMPORTED_MODULE_4__data_Parameter__["a" /* default */].type.array) {
            if (dataSources.length > 0 && dataSources[0].parameters.indexOf(parameter) !== -1) {
                paramRef = '${' + parameter.getName() + '}';
                newParamRef = '${' + newParameterName + '}';
            }
        } else {
            if (paramParent !== null && paramParent.getValue('type') === __WEBPACK_IMPORTED_MODULE_4__data_Parameter__["a" /* default */].type.map) {
                paramRef = '${' + paramParent.getName() + '.' + parameter.getName() + '}';
                newParamRef = '${' + paramParent.getName() + '.' + newParameterName + '}';
            } else if (parameter.getValue('type') === __WEBPACK_IMPORTED_MODULE_4__data_Parameter__["a" /* default */].type.map) {
                paramRef = '${' + parameter.getName() + '.';
                newParamRef = '${' + newParameterName + '.';
            } else {
                let isDataSourceParam = false;
                for (let dataSource of dataSources) {
                    for (let dataSourceParam of dataSource.parameters) {
                        if (dataSourceParam.getName() === parameter.getName()) {
                            // the changed parameter has the same name as a used data source parameter, therefor
                            // we are not going to change the parameter reference because it references the data source parameter
                            isDataSourceParam = true;
                            break;
                        }
                    }
                }
                if (!isDataSourceParam) {
                    paramRef = '${' + parameter.getName() + '}';
                    newParamRef = '${' + newParameterName + '}';
                }
            }
        }

        if (paramRef !== null && newParamRef !== null && this.getValue(field).indexOf(paramRef) !== -1) {
            let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](
                this.id, tagId, field, __WEBPACK_IMPORTED_MODULE_5__utils__["b" /* replaceAll */](this.getValue(field), paramRef, newParamRef),
                __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
            cmdGroup.addCommand(cmd);
        }
    }

    /**
     * Adds AddDeleteDocElementCmd commands to command group parameter to delete this element and
     * any possible existing children.
     * @param {CommandGroupCmd} cmdGroup - AddDeleteDocElementCmd commands will be added to this command group.
     */
    addCommandsForDelete(cmdGroup) {
        let elements = [];
        this.appendContainerChildren(elements);
        elements.push(this);
        for (let element of elements) {
            let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_AddDeleteDocElementCmd__["a" /* default */](
                false, element.getPanelItem().getPanelName(),
                element.toJS(), element.getId(), element.getContainerId(),
                element.getPanelItem().getSiblingPosition(), this.rb);
            cmdGroup.addCommand(cmd);
        }
    }

    addChildren(docElements) {
    }

    addError(error) {
        this.errors.push(error);
    }

    clearErrors() {
        this.errors = [];
    }

    getErrors() {
        return this.errors;
    }

    remove() {
        if (this.el !== null) {
            this.el.remove();
            this.el = null;
        }
        if (this.panelItem !== null) {
            this.panelItem.getParent().removeChild(this.panelItem);
            this.panelItem = null;
        }
    }

    toJS() {
        let ret = { elementType: this.getElementType() };
        for (let field of this.getFields()) {
            if (['x', 'y', 'width', 'height'].indexOf(field) === -1) {
                ret[field] = this.getValue(field);
            } else {
                ret[field] = this.getValue(field + 'Val');
            }
        }
        return ret;
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DocElement;


DocElement.type = {
    none: 'none',
    text: 'text',
    image: 'image',
    line: 'line',
    table: 'table',
    pageBreak: 'page_break',
    tableText: 'table_text',
    barCode: 'bar_code',
    frame: 'frame',
    section: 'section'
};

DocElement.dragType = {
    none: -1,
    element: 0,
    sizerN: 1,
    sizerNE: 2,
    sizerE: 3,
    sizerSE: 4,
    sizerS: 5,
    sizerSW: 6,
    sizerW: 7,
    sizerNW: 8
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__(5);


/**
 * Command to set a single value of a data object.
 * @class
 */
class SetValueCmd {
    constructor(objId, tagId, field, value, type, rb) {
        this.objId = objId;
        this.tagId = tagId;
        this.field = field;
        this.value = value;
        this.type = type;
        this.rb = rb;

        let obj = rb.getDataObject(objId);
        this.oldValue = obj.getValue(field);
        this.firstExecution = true;
        this.select = true;
    }

    getName() {
        return 'Set value';
    }

    do() {
        if (!this.firstExecution && this.select) {
            this.rb.selectObject(this.objId, true);
        }
        this.setValue(this.value);
        this.firstExecution = false;
    }

    undo() {
        if (this.select) {
            this.rb.selectObject(this.objId, true);
        }
        this.setValue(this.oldValue);
    }

    setValue(value) {
        let obj = this.rb.getDataObject(this.objId);
        let detailData = this.rb.getDetailData();
        let isShown = (detailData !== null && detailData.getId() === this.objId);
        let elSelector = `#${this.tagId}`;
        obj.setValue(this.field, value, elSelector, isShown);

        if (this.field === 'name') {
            $(`#rbro_menu_item_name${this.objId}`).text(value);
            $(`#rbro_menu_item_name${this.objId}`).attr('title', value);
            this.rb.notifyEvent(obj, __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */].operation.rename);
        } else {
            this.rb.notifyEvent(obj, __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */].operation.change, this.field);
        }
        if (isShown) {
            if (this.type === SetValueCmd.type.text || this.type === SetValueCmd.type.select) {
                $(elSelector).val(value);
            } else if (this.type === SetValueCmd.type.filename) {
                $(elSelector).text(value);
                if (value === '') {
                    $(`#${this.tagId}_container`).addClass('rbroHidden');
                } else {
                    $(`#${this.tagId}_container`).removeClass('rbroHidden');
                }
            } else if (this.type === SetValueCmd.type.checkbox) {
                $(elSelector).prop('checked', value);
            } else if (this.type === SetValueCmd.type.button) {
                if (value) {
                    $(elSelector).addClass('rbroButtonActive');
                } else {
                    $(elSelector).removeClass('rbroButtonActive');
                }
            } else if (this.type === SetValueCmd.type.buttonGroup) {
                $(elSelector).find('button').removeClass('rbroButtonActive');
                $(elSelector).find(`button[value="${value}"]`).addClass('rbroButtonActive');
            } else if (this.type === SetValueCmd.type.color) {
                $(elSelector).spectrum("set", value);
            }
        }
    }

    /**
     * Disables selection of the element containing the changed field. By default an element is automatically
     * selected after one of its fields was changed.
     */
    disableSelect() {
        this.select = false;
    }

    /**
     * Returns true if the given command targets the same field. This information can be useful to avoid separate
     * commands for every keystroke in a text field and generate just one command for the whole changed text instead.
     * @param {SetValueCmd} newCmd
     * @returns {boolean}
     */
    allowReplace(newCmd) {
        return (this.type === SetValueCmd.type.text && this.objId === newCmd.objId &&
            this.tagId === newCmd.tagId && this.field === newCmd.field);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SetValueCmd;


SetValueCmd.type = {
    text: 'text',
    select: 'select',
    file: 'file',
    filename: 'filename',
    checkbox: 'checkbox',
    button: 'button',
    buttonGroup: 'buttonGroup',  // one button inside a group of buttons with only one active button
    color: 'color',
    internal: 'internal'
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_MainPanelItem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Parameter data object. Contains all parameter settings including test data.
 * @class
 */
class Parameter {
    constructor(id, initialData, rb) {
        this.rb = rb;
        this.id = id;
        this.name = rb.getLabel('parameter');
        this.panelItem = null;
        this.errors = [];
        
        this.type = Parameter.type.string;
        this.arrayItemType = Parameter.type.string;
        this.eval = !rb.getProperty('adminMode');  // if false value comes from database
        this.nullable = false;
        this.pattern = '';
        this.expression = '';
        this.testData = '';
        this.children = [];
        this.editable = rb.getProperty('adminMode');
        this.showOnlyNameType = false;
        this.setInitialData(initialData);
    }

    setInitialData(initialData) {
        for (let key in initialData) {
            if (initialData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = initialData[key];
            }
        }
        if ('showOnlyNameType' in initialData && initialData['showOnlyNameType']) {
            this.editable = false;
        }
    }

    /**
     * Called after initialization is finished.
     */
    setup() {
        if (this.type === Parameter.type.array || this.type === Parameter.type.map) {
            for (let child of this.children) {
                let parameter = new Parameter(child.id || this.rb.getUniqueId(), child, this.rb);
                this.rb.addParameter(parameter);
                let panelItem = new __WEBPACK_IMPORTED_MODULE_2__menu_MainPanelItem__["a" /* default */](
                    'parameter', this.panelItem, parameter,
                    { hasChildren: true, showAdd: this.editable, showDelete: this.editable, draggable: true }, this.rb);
                parameter.setPanelItem(panelItem);
                this.panelItem.appendChild(panelItem);
                parameter.setup();
                this.rb.notifyEvent(parameter, __WEBPACK_IMPORTED_MODULE_0__commands_Command__["a" /* default */].operation.add);
            }
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'name', 'type', 'arrayItemType', 'eval', 'nullable', 'pattern', 'expression', 'showOnlyNameType', 'testData'];
    }

    getId() {
        return this.id;
    }

    /**
     * Returns highest id of this component including all its child components.
     * @returns {Number}
     */
    getMaxId() {
        let maxId = this.id;
        if (this.type === Parameter.type.array || this.type === Parameter.type.map) {
            for (let child of this.children) {
                if (child.id > maxId) {
                    maxId = child.id;
                }
            }
        }
        return maxId;
    }

    getName() {
        return this.name;
    }

    getPanelItem() {
        return this.panelItem;
    }

    setPanelItem(panelItem) {
        this.panelItem = panelItem;
    }

    getValue(field) {
        return this[field];
    }

    setValue(field, value, elSelector, isShown) {
        this[field] = value;
        if (field === 'type') {
            if (isShown && value === Parameter.type.date) {
                $('#rbro_parameter_test_data').attr('placeholder', this.rb.getLabel('parameterTestDataDatePattern'));
            } else {
                $('#rbro_parameter_test_data').attr('placeholder', '');
            }
        }
    }

    /**
     * Returns parent in case parameter is child of a map/array parameter.
     * @returns {[Parameter]} parent parameter if available, null otherwise.
     */
    getParent() {
        if (this.panelItem !== null && this.panelItem.getParent().getData() instanceof Parameter) {
            return this.panelItem.getParent().getData();
        }
        return null;
    }

    addError(error) {
        this.errors.push(error);
    }

    clearErrors() {
        this.errors = [];
    }

    getErrors() {
        return this.errors;
    }

    remove() {
    }

    select() {
    }

    deselect() {
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_parameter_expression', 'expression', cmdGroup);
        for (let child of this.getChildren()) {
            child.addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup);
        }
    }

    /**
     * Adds SetValue command to command group parameter in case the specified parameter is used in the
     * specified object field.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {String} tagId
     * @param {String} field
     * @param {CommandGroupCmd} cmdGroup - possible SetValue command will be added to this command group.
     */
    addCommandForChangedParameterName(parameter, newParameterName, tagId, field, cmdGroup) {
        let paramParent = parameter.getParent();
        let paramRef = null;
        let newParamRef = null;
        if (paramParent !== null && paramParent.getValue('type') === Parameter.type.map) {
            paramRef = '${' + paramParent.getName() + '.' + parameter.getName() + '}';
            newParamRef = '${' + paramParent.getName() + '.' + newParameterName + '}';
        } else if (parameter.getValue('type') === Parameter.type.map) {
            paramRef = '${' + parameter.getName() + '.';
            newParamRef = '${' + newParameterName + '.';
        } else {
            paramRef = '${' + parameter.getName() + '}';
            newParamRef = '${' + newParameterName + '}';
        }

        if (paramRef !== null && newParamRef !== null && this.getValue(field).indexOf(paramRef) !== -1) {
            let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](
                this.id, tagId, field, __WEBPACK_IMPORTED_MODULE_3__utils__["b" /* replaceAll */](this.getValue(field), paramRef, newParamRef),
                __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
            cmdGroup.addCommand(cmd);
        }
    }

    /**
     * Update test data for arrays. Adapt field names of list items so test data is still valid when a
     * parameter of a list item is renamed.
     * @param {String} oldParameterName
     * @param {String} newParameterName
     * @param {CommandGroupCmd} cmdGroup - possible SetValue command will be added to this command group.
     */
    addUpdateTestDataCmdForChangedParameter(oldParameter, newParameter, cmdGroup) {
        if (this.type === Parameter.type.array) {
            let rows = [];
            try {
                let testData = JSON.parse(this.testData);
                if (Array.isArray(testData)) {
                    for (let row of testData) {
                        let itemRow = {};
                        for (let val in row) {
                            if (row.hasOwnProperty(val)) {
                                if (val === oldParameter) {
                                    itemRow[newParameter] = row[val];
                                } else {
                                    itemRow[val] = row[val];
                                }
                            }
                        }
                        rows.push(itemRow);
                    }
                }
                let testDataStr = JSON.stringify(rows);
                if (this.testData !== testDataStr) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.id, 'rbro_parameter_test_data', 'testData',
                        testDataStr, __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    cmdGroup.addCommand(cmd);
                }
            } catch (e) {
            }
        }
    }

    toJS() {
        let ret = {};
        for (let field of this.getFields()) {
            ret[field] = this.getValue(field);
        }
        if (this.type === Parameter.type.array || this.type === Parameter.type.map) {
            let children = [];
            for (let child of this.panelItem.getChildren()) {
                children.push(child.getData().toJS());
            }
            ret.children = children;
        }
        return ret;
    }

    getChildren() {
        let children = [];
        if (this.type === Parameter.type.array || this.type === Parameter.type.map) {
            for (let child of this.panelItem.getChildren()) {
                children.push(child.getData());
            }
        }
        return children;
    }

    /**
     * In case of map parameter all child parameters are appended, for other parameter types the
     * parameter itself is appended. Parameters with type array are only added if explicitly
     * specified in allowedTypes parameter.
     * Used for parameter popup window.
     * @param {Object[]} parameters - list where parameter items will be appended to.
     * @param {String[]} allowedTypes - specify allowed parameter types which will be added to the
     * parameter list. If not set all parameter types are allowed.
     */
    appendParameterItems(parameters, allowedTypes) {
        if (this.type === Parameter.type.map) {
            let parametersToAppend = [];
            if (Array.isArray(allowedTypes)) {
                for (let child of this.getChildren()) {
                    if (allowedTypes.indexOf(child.type) !== -1) {
                        parametersToAppend.push(child);
                    }
                }
            } else {
                parametersToAppend = this.getChildren();
            }
            if (parametersToAppend.length > 0) {
                parameters.push({
                    separator: true, id: this.id,
                    separatorClass: 'rbroParameterGroup', name: this.name });
            }
            for (let parameter of parametersToAppend) {
                let paramName = this.name + '.' + parameter.getName();
                parameters.push({
                    name: paramName, nameLowerCase: paramName.toLowerCase(),
                    id: parameter.getId(), description: '' });
            }
        } else if (this.type !== Parameter.type.array) {
            if (!Array.isArray(allowedTypes) || allowedTypes.indexOf(this.type) !== -1) {
                parameters.push({
                    name: this.name, nameLowerCase: this.name.toLowerCase(),
                    id: this.id, description: '' });
            }
        } else if (Array.isArray(allowedTypes) && allowedTypes.indexOf(this.type) !== -1) {
            // add array parameter only if explicitly specified in allowedTypes
            parameters.push({
                name: this.name, nameLowerCase: this.name.toLowerCase(),
                id: this.id, description: '' });
        }
    }

    /**
     * Appends field parameters of array parameter.
     * Used for parameter popup window of sum/average expression field.
     * @param {Object[]} parameters - list where parameter items will be appended to.
     * @param {String} fieldType - allowed parameter type which will be added to the
     * parameter list. If empty all parameter types are allowed.
     */
    appendFieldParameterItems(parameters, fieldType) {
        if (this.type === Parameter.type.array) {
            for (let child of this.panelItem.getChildren()) {
                let parameter = child.getData();
                if (!fieldType || parameter.getValue('type') === fieldType) {
                    parameters.push({ name: this.name + '.' + parameter.getName(), description: '' });
                }
            }
        }
    }

    /**
     * Returns test data of array parameter as array.
     * @param {Boolean} includeFieldInfo - if true a row containing info about the fields will be inserted
     * in the returned rows (first row).
     * @returns {[Object[]]} rows of test data. Null in case parameter is not an array.
     */
    getTestDataRows(includeFieldInfo) {
        if (this.type !== Parameter.type.array && this.type !== Parameter.type.simpleArray) {
            return null;
        }
        let fields = [];
        if (this.type === Parameter.type.simpleArray) {
            let fieldInfo = { name: 'data', type: this.arrayItemType, allowMultiple: false };
            fields.push(fieldInfo);
        } else {
            for (let child of this.getChildren()) {
                let fieldInfo = { name: child.getName() };
                if (child.getValue('type') === Parameter.type.simpleArray) {
                    fieldInfo.type = child.getValue('arrayItemType');
                    fieldInfo.allowMultiple = true;
                    fieldInfo.arraySize = 1;
                } else {
                    fieldInfo.type = child.getValue('type');
                    fieldInfo.allowMultiple = false;
                }
                fields.push(fieldInfo);
            }
        }
        let rows = [];
        if (fields.length > 0) {
            if (includeFieldInfo) {
                rows.push(fields);
            }
            try {
                let testData = JSON.parse(this.testData);
                if (Array.isArray(testData)) {
                    for (let row of testData) {
                        let itemRow = {};
                        let hasData = false;
                        for (let field of fields) {
                            if (field.name in row) {
                                let fieldData = row[field.name];
                                if((field.allowMultiple && Array.isArray(fieldData)) ||
                                        (!field.allowMultiple && !Array.isArray(fieldData))) {
                                    hasData = true;
                                    itemRow[field.name] = fieldData;
                                    if (field.allowMultiple && fieldData.length > 0) {
                                        field.arraySize = fieldData.length;
                                    }
                                }
                            }
                        }
                        if (hasData) {
                            rows.push(itemRow);
                        }
                    }
                }
            } catch (e) {
            }
        }
        return rows;
    }

    /**
     * Removes ids of possible child elements.
     * @param {Object} data - map containing parameter data.
     */
    static removeIds(data) {
        if (data.children) {
            for (let child of data.children) {
                if ('id' in child) {
                    delete child.id;
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Parameter;


Parameter.type = {
    'none': 'none',
    'string': 'string',
    'number': 'number',
    'boolean': 'boolean',
    'date': 'date',
    'image': 'image',
    'array': 'array',
    'simpleArray': 'simple_array',
    'map': 'map',
    'sum': 'sum',
    'average': 'average'
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);




/**
 * Popup window to show selectable items (parameters, patterns, etc.) or to edit test data for array parameter.
 * @class
 */
class PopupWindow {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.elWindow = null;
        this.elContent = null;
        this.input = null;
        this.objId = null;
        this.type = null;
        this.parameters = null;
        this.visible = false;
        this.items = null;
    }

    render() {
        this.elWindow = $('<div class="rbroPopupWindow rbroHidden"></div>');
        this.elContent = $('<div class="rbroPopupWindowContent"></div>')
            .mouseup(event => {
                // stop propagation so popup window is not closed
                event.stopPropagation();
            });
        this.elWindow.append(this.elContent);
        let btn = $('<div class="rbroButton rbroRoundButton rbroPopupWindowCancel rbroIcon-cancel"></div>')
            .click(event => {
                this.hide();
            });
        this.elWindow.append(btn);
        $('body').append(this.elWindow);
    }

    /**
     * Shows a popup window for the given items.
     * @param {Object[]} items - items to display in the popup window. Each item must contain a name (String), and
     * optional a description (String) and separator (Boolean). If separator is true the item is not selectable.
     * @param {String} objId - id of data object where the field belongs to.
     * @param {String} tagId - id of DOM element in the panel for the given field. In case of empty string there is no
     * input element available.
     * @param {String} field - field of data object where selected item will be written into.
     * @param {PopupWindow.type} type
     */
    show(items, objId, tagId, field, type) {
        let winWidth = $(window).width();
        let winHeight = $(window).height();
        let elSearch = null;
        this.input = (tagId !== '') ? $('#' + tagId) : null;
        this.objId = objId;
        this.type = type;
        this.items = items;
        this.elContent.empty();
        $('#rbro_background_overlay').remove();
        if (type === PopupWindow.type.testData) {
            this.parameters = items[0];
            items.splice(0, 1);
            this.createTestDataTable(items);
            let width = Math.round(winWidth * 0.8);
            let height = Math.round(winHeight * 0.8);
            this.elWindow.css({ left: Math.round((winWidth - width) / 2) + 'px', top: Math.round((winHeight - height) / 2) + $(window).scrollTop() + 'px',
                    width: width + 'px', height: height + 'px' });
            $('body').append($('<div id="rbro_background_overlay" class="rbroBackgroundOverlay"></div>'));
            $('body').addClass('rbroFixedBackground'); // no scroll bars for background while popup is shown
        } else {
            if (type === PopupWindow.type.parameterSet || type === PopupWindow.type.parameterAppend) {
                elSearch = $(`<input class="rbroPopupSearch" placeholder="${this.rb.getLabel('parameterSearchPlaceholder')}">`)
                    .on('input', event => {
                        this.filterParameters(elSearch.val());
                    });
                this.elContent.append(elSearch);
            }
            let ul = $('<ul></ul>')
                .mousedown(event => {
                    // prevent default so blur event of input is not triggered,
                    // otherwise popup window would be closed before click event handler of selected
                    // item is triggered
                    event.preventDefault();
                });
            for (let item of items) {
                let li = $('<li></li>');
                if (item.separator) {
                    if ((type === PopupWindow.type.parameterSet ||
                            type === PopupWindow.type.parameterAppend) && item.id) {
                        li.attr('id', 'parameter_group_' + item.id);
                    }
                    let separatorClass = 'rbroPopupItemSeparator';
                    if (item.separatorClass) {
                        separatorClass += ' ' + item.separatorClass;
                    }
                    li.attr('class', separatorClass);
                } else {
                    if ((type === PopupWindow.type.parameterSet ||
                            type === PopupWindow.type.parameterAppend) && item.id) {
                        li.attr('id', 'parameter_' + item.id);
                    }
                    li.mousedown(event => {
                        if (type === PopupWindow.type.pattern) {
                            this.input.val(item.name);
                            this.input.trigger('input');
                            this.hide();
                        } else if (type === PopupWindow.type.parameterSet) {
                            let paramText = '${' + item.name + '}';
                            this.input.val(paramText);
                            this.input.trigger('input');
                            autosize.update(this.input);
                            this.hide();
                        } else if (type === PopupWindow.type.parameterAppend) {
                            let paramText = '${' + item.name + '}';
                            __WEBPACK_IMPORTED_MODULE_2__utils__["j" /* insertAtCaret */](this.input.get(0), paramText);
                            autosize.update(this.input);
                            this.input.trigger('input');
                            this.hide();
                        }
                        event.preventDefault();
                    });
                }
                li.append(`<div class="rbroPopupItemHeader">${item.name}</div>`);
                if (item.description && item.description !== '') {
                    li.append(`<div class="rbroPopupItemDescription">${item.description}</div>`);
                }
                ul.append(li);
            }
            this.elContent.append(ul);
            let offset = this.input.offset();
            let top = offset.top;
            // test if popup window should be shown above or below input field
            if (top < (winHeight / 2) || top < 300) {
                // make sure there is enough space for popup below input, otherwise just show it over input field
                if ((top + this.input.height() + 300) < winHeight) {
                    top += this.input.height();
                }
            } else {
                top -= 300;
            }
            this.elWindow.css({ left: offset.left + 'px', top: top + 'px', width: '400px', height: '300px' });
        }

        this.elWindow.removeClass('rbroHidden');
        this.visible = true;
        if (elSearch !== null) {
            elSearch.focus();
        }
    }

    hide() {
        if (this.visible) {
            if (this.input !== null) {
                this.input.focus();
            }
            if (this.type === PopupWindow.type.testData) {
                let testData = this.getTestData(null, -1);
                let obj = this.rb.getDataObject(this.objId);
                let testDataStr = JSON.stringify(testData);
                if (obj !== null && obj.getValue('testData') !== testDataStr) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.objId, 'rbro_parameter_test_data', 'testData',
                        testDataStr, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
                $('#rbro_background_overlay').remove();
            }
            this.elWindow.addClass('rbroHidden');
            this.elContent.empty();
            $('body').removeClass('rbroFixedBackground');
            this.visible = false;
            this.items = null;
        }
    }

    addTestDataRow(tableBody, parameters, testData) {
        let newRow = $('<tr></tr>');
        newRow.append($('<td></td>').append($('<div class="rbroButton rbroDeleteButton rbroIcon-cancel"></div>')
            .click(event => {
                $(event.target).parent().parent().remove();
            })
        ));
        for (let parameter of parameters) {
            if (parameter.allowMultiple && parameter.arraySize > 0) {
                let values = null;
                if (testData !== null && parameter.name in testData) {
                    values = testData[parameter.name];
                }
                for (let i=0; i < parameter.arraySize; i++) {
                    let data = '';
                    if (Array.isArray(values) && i < values.length) {
                        data = values[i];
                    }
                    this.appendColumn(newRow, parameter, data);
                }
            } else {
                let data = '';
                if (testData !== null && parameter.name in testData) {
                    data = testData[parameter.name];
                }
                if (parameter.allowMultiple && parameter.arraySize > 0 && Array.isArray(data)) {
                    for (let arrayItem of data) {
                        this.appendColumn(newRow, parameter, arrayItem);
                    }
                } else {
                    this.appendColumn(newRow, parameter, data);
                }
            }
        }
        tableBody.append(newRow);
    }

    appendColumn(row, parameter, data) {
        let input = $(`<input type="text" value="${data}">`)
            .focus(event => {
                input.parent().addClass('rbroHasFocus');
            })
            .blur(event => {
                input.parent().removeClass('rbroHasFocus');
            });

        if (parameter.type === __WEBPACK_IMPORTED_MODULE_1__data_Parameter__["a" /* default */].type.number) {
            __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](input);
        } else if (parameter.type === __WEBPACK_IMPORTED_MODULE_1__data_Parameter__["a" /* default */].type.date) {
            input.attr('placeholder', this.rb.getLabel('parameterTestDataDatePattern'));
        }
        row.append($('<td></td>').append(input));
    }

    getTestData(excludeParameter, excludeParameterArrayItemIndex) {
        let testData = [];
        let rows = this.elContent.find('tbody').find('tr');
        for (let row of rows) {
            let inputs = $(row).find('input');
            let rowData = {};
            let i = 0;
            for (let parameter of this.parameters) {
                if (parameter.allowMultiple && parameter.arraySize > 0) {
                    let fieldData = [];
                    for (let j=0; j < parameter.arraySize; j++) {
                        let input = inputs.eq(i);
                        if (parameter !== excludeParameter || j !== excludeParameterArrayItemIndex) {
                            fieldData.push(input.val().trim());
                        }
                        i++;
                    }
                    rowData[parameter.name] = fieldData;
                } else {
                    let input = inputs.eq(i);
                    rowData[parameter.name] = input.val().trim();
                    i++;
                }
            }
            testData.push(rowData);
        }
        return testData;
    }

    createTestDataTable(items) {
        let div = $('<div></div>');
        let table = $('<table></table>');
        let tableHeaderRow = $('<tr></tr>');
        let tableBody = $('<tbody></tbody>');
        let i;
        tableHeaderRow.append('<th></th>');
        for (let parameter of this.parameters) {
            if (parameter.allowMultiple) {
                for (let arrayIndex=0; arrayIndex < parameter.arraySize; arrayIndex++) {
                    let th = $('<th></th>');
                    th.append($(`<span>${parameter.name} ${arrayIndex + 1}</span>`));
                    if (arrayIndex === 0) {
                        th.append($(`<div class="rbroButton rbroRoundButton rbroIcon-plus"></div>`)
                            .click(event => {
                                let testData = this.getTestData(null, -1);
                                parameter.arraySize++;
                                this.createTestDataTable(testData);
                            })
                        );
                    } else {
                        th.append($(`<div class="rbroButton rbroRoundButton rbroIcon-minus"></div>`)
                            .click(event => {
                                let testData = this.getTestData(parameter, arrayIndex);
                                parameter.arraySize--;
                                this.createTestDataTable(testData);
                            })
                        );
                    }
                    tableHeaderRow.append(th);
                }
            } else {
                tableHeaderRow.append(`<th>${parameter.name}</th>`);
            }
        }
        table.append($('<thead></thead>').append(tableHeaderRow));
        if (items.length === 0) {
            this.addTestDataRow(tableBody, this.parameters, null);
        }
        for (i=0; i < items.length; i++) {
            this.addTestDataRow(tableBody, this.parameters, items[i]);
        }
        table.append(tableBody);
        div.append(table);
        div.append($(`<div class="rbroFullWidthButton"><div class="rbroButton rbroPopupWindowButton">${this.rb.getLabel('parameterAddTestData')}</div></div>`)
            .click(event => {
                this.addTestDataRow(tableBody, this.parameters, null);
            })
        );
        this.elContent.empty().append(div);
    }

    /**
     * Filters list of displayed parameter items. Only parameters containing given search value are
     * shown.
     * @param {String} searchVal - search value.
     */
    filterParameters(searchVal) {
        let currentGroupId = null;
        let groupCount = 0;
        if (this.items !== null) {
            searchVal = searchVal.toLowerCase();
            for (let item of this.items) {
                if (item.separator) {
                    if (currentGroupId !== null) {
                        // hide groups (data source parameters and parameter maps) if they do not contain any visible items
                        if (groupCount > 0) {
                            $('#parameter_group_' + currentGroupId).show();
                        } else {
                            $('#parameter_group_' + currentGroupId).hide();
                        }
                    }
                    currentGroupId = item.id ? item.id : null;
                    groupCount = 0;
                } else {
                    if (item.nameLowerCase.indexOf(searchVal) !== -1) {
                        $('#parameter_' + item.id).show();
                        if (currentGroupId !== -1) {
                            groupCount++;
                        }
                    } else {
                        $('#parameter_' + item.id).hide();
                    }
                }
            }
            if (currentGroupId !== null) {
                if (groupCount > 0) {
                    $('#parameter_group_' + currentGroupId).show();
                } else {
                    $('#parameter_group_' + currentGroupId).hide();
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PopupWindow;


PopupWindow.type = {
    parameterSet: 0,
    parameterAppend: 1,
    pattern: 2,
    testData: 3
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Interface for all commands.
 * @class
 */
class Command {
    getName() {}
    do() {}
    undo() {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Command;


Command.operation = {
    rename: 'rename',
    change: 'change',
    add: 'add',
    remove: 'remove',
    move: 'move'
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Container__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Document__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Standard band container for header, content and footer band.
 * @class
 */
class Band extends __WEBPACK_IMPORTED_MODULE_0__Container__["a" /* default */] {
    constructor(bandType, section, id, name, rb) {
        super(id, name, rb);
        this.panelItem = null;
        this.bandType = bandType;
        this.section = section;
        if (!section) {
            if (bandType === Band.bandType.header) {
                this.id = '0_header';
                this.name = rb.getLabel('bandHeader');
            } else if (bandType === Band.bandType.content) {
                this.id = '0_content';
                this.name = rb.getLabel('bandContent');
                this.allowAllElements = true;
            } else if (bandType === Band.bandType.footer) {
                this.id = '0_footer';
                this.name = rb.getLabel('bandFooter');
            }
        }
        this.el = null;
    }

    /**
     * Called after initialization is finished.
     */
    setup() {
        if (!this.section) {
            this.el = this.rb.getDocument().getElement(this.bandType);
            this.elContent = this.el;
        }
    }

    /**
     * Returns true if the given element type can be added to this container.
     * @param {String} elementType
     */
    isElementAllowed(elementType) {
        if (elementType === __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.tableText) {
            return false;
        }
        return (this.bandType === Band.bandType.content ||
            (elementType !== __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.pageBreak && elementType !== __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.table && elementType !== __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.section)) &&
            (!this.section || elementType !== __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.section);
    }

    /**
     * Returns absolute container offset.
     * @returns {Object} x and y offset coordinates.
     */
    getOffset() {
        let y = 0;
        if (this.section) {
            if (this.owner !== null) {
                let absPos = this.owner.getAbsolutePosition();
                y = absPos.y;
            }
        } else {
            let docProperties = this.rb.getDocumentProperties();
            if (this.bandType === Band.bandType.content && docProperties.getValue('header')) {
                y = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](docProperties.getValue('headerSize'));
            } else if (this.bandType === Band.bandType.footer) {
                y = this.rb.getDocument().getHeight() - __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](docProperties.getValue('footerSize'));
            }
        }
        return { x: 0, y: y };
    }

    /**
     * Returns container size.
     * @returns {Object} width and height of container.
     */
    getSize() {
        let documentProperties = this.rb.getDocumentProperties();
        let width = documentProperties.getValue('width') -
            documentProperties.getValue('marginLeftVal') - documentProperties.getValue('marginRightVal');
        let height = 0;
        if (this.section) {
            if (this.owner !== null) {
                height = this.owner.getValue('heightVal');
            }
        } else if (this.bandType === Band.bandType.header) {
            height = documentProperties.getValue('headerSizeVal');
        } else if (this.bandType === Band.bandType.content) {
            height = documentProperties.getValue('height') - documentProperties.getValue('headerSizeVal') -
                documentProperties.getValue('footerSizeVal') -
                documentProperties.getValue('marginTopVal') - documentProperties.getValue('marginBottomVal');
        } else if (this.bandType === Band.bandType.footer) {
            height = documentProperties.getValue('footerSizeVal');
        }
        return { width: width, height: height };
    }
    
    /**
     * Returns container content size. Same as container size.
     * @returns {Object} width and height of container.
     */
    getContentSize() {
        return this.getSize();
    }
    
    isInside(posX, posY) {
        if (this.section && this.owner !== null && this.owner && !this.owner.isVisible()) {
            return false;
        }
        return super.isInside(posX, posY);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Band;


Band.bandType = {
    header: 'header',
    content: 'content',
    footer: 'footer'
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


/**
 * Style data object. Contains all text styles (alignment, border, etc.):
 * @class
 */
class Style {
    constructor(id, initialData, rb) {
        this.rb = rb;
        this.id = id;
        this.name = rb.getLabel('style');
        this.panelItem = null;
        this.errors = [];
        
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.horizontalAlignment = Style.alignment.left;
        this.verticalAlignment = Style.alignment.top;
        this.textColor = '#000000';
        this.backgroundColor = '';
        this.font = Style.font.courier;
        this.fontSize = 12;
        this.lineSpacing = 1;
        this.borderColor = '#000000';
        this.borderWidth = '1';
        this.borderAll = false;
        this.borderLeft = false;
        this.borderTop = false;
        this.borderRight = false;
        this.borderBottom = false;
        this.paddingLeft = '';
        this.paddingTop = '';
        this.paddingRight = '';
        this.paddingBottom = '';

        this.borderWidthVal = 0;

        this.setInitialData(initialData);
    }

    setInitialData(initialData) {
        for (let key in initialData) {
            if (initialData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = initialData[key];
            }
        }
        this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.borderWidth);
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'name', 'bold', 'italic', 'underline', 'horizontalAlignment', 'verticalAlignment',
            'textColor', 'backgroundColor', 'font', 'fontSize', 'lineSpacing', 'borderColor', 'borderWidth',
            'borderAll', 'borderLeft', 'borderTop', 'borderRight', 'borderBottom',
            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom'];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPanelItem() {
        return this.panelItem;
    }

    setPanelItem(panelItem) {
        this.panelItem = panelItem;
    }

    getValue(field) {
        return this[field];
    }

    setValue(field, value, elSelector, isShown) {
        this[field] = value;
        if (field.indexOf('border') !== -1) {
            Style.setBorderValue(this, field, '', value, elSelector, isShown);
        }
    }

    setBorderAll(fieldPrefix, value) {
        this[fieldPrefix + 'borderAll'] = value;
    }

    addError(error) {
        this.errors.push(error);
    }

    clearErrors() {
        this.errors = [];
    }

    getErrors() {
        return this.errors;
    }

    remove() {
    }

    select() {
    }

    deselect() {
    }

    toJS() {
        let ret = {};
        for (let field of this.getFields()) {
            ret[field] = this.getValue(field);
        }
        return ret;
    }

    /**
     * Updates GUI for border settings and borderAll setting of object.
     * @param {Object} obj - document element of which the border settings will be updated.
     * @param {String} field - border field which was modified.
     * @param {String} fieldPrefix - prefix of field to reuse style settings for different
     * sections (e.g. for conditional style).
     * @param {Boolean} value - new value for specified field.
     * @param {String} elSelector - jquery selector to specify the DOM element.
     * @param {Boolean} isShown - true if the specified object is currently visible in the GUI.
     */
    static setBorderValue(obj, field, fieldPrefix, value, elSelector, isShown) {
        if (field === `${fieldPrefix}borderAll`) {
            obj.borderLeft = obj.borderTop = obj.borderRight = obj.borderBottom = value;
            if (isShown) {
                if (value) {
                    $(elSelector).parent().find('button').addClass('rbroButtonActive');
                } else {
                    $(elSelector).parent().find('button').removeClass('rbroButtonActive');
                }
            }
        } else if (field === `${fieldPrefix}borderLeft` || field === `${fieldPrefix}borderTop` ||
                field === `${fieldPrefix}borderRight` || field === `${fieldPrefix}borderBottom`) {
            if (obj.getValue(`${fieldPrefix}borderLeft`) && obj.getValue(`${fieldPrefix}borderTop`) &&
                    obj.getValue(`${fieldPrefix}borderRight`) && obj.getValue(`${fieldPrefix}borderBottom`)) {
                obj.setBorderAll(fieldPrefix, true);
                if (isShown) {
                    $(elSelector).parent().find(`button[value="${fieldPrefix}borderAll"]`).addClass('rbroButtonActive');
                }
            } else {
                obj.setBorderAll(fieldPrefix, false);
                if (isShown) {
                    $(elSelector).parent().find(`button[value="${fieldPrefix}borderAll"]`).removeClass('rbroButtonActive');
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Style;


// Verdana, Arial
// ['Courier', 'Courier-Bold', 'Courier-BoldOblique', 'Courier-Oblique', 'Helvetica', 'Helvetica-Bold', 'Helvetica-BoldOblique', 'Helvetica-Oblique', 'Symbol', 'Times-Bold', 'Times-BoldItalic', 'Times-Italic', 'Times-Roman', 'ZapfDingbats']
Style.font = {
    courier: 'courier',
    helvetica: 'helvetica',
    timesRoman: 'times_roman'
};

Style.alignment = {
    // horizontal
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify',
    // vertical
    top: 'top',
    middle: 'middle',
    bottom: 'bottom'
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_AddDeleteDocElementCmd__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_AddDeleteParameterCmd__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteStyleCmd__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commands_CommandGroupCmd__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commands_MovePanelItemCmd__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__container_Container__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Document__ = __webpack_require__(9);












/**
 * A main panel item either represents a data object (doc element, parameter, etc.) or a container (e.g. page header) for
 * other panel items.
 * @class
 */
class MainPanelItem {
    constructor(panelName, parent, data, properties, rb) {
        this.properties = { hasChildren: false, showAdd: false, showDelete: true, hasDetails: true, visible: true, draggable: false };
        $.extend( this.properties, properties );
        this.panelName = panelName;
        let name = (data !== null) ? data.getName() : '';
        this.id = (data !== null) ? data.getId() : properties.id;
        this.parent = parent;
        this.data = data;
        this.rb = rb;
        this.children = [];
        this.dragEnterCount = 0;

        this.element = $('<li></li>');
        if (!this.properties.visible) {
            this.element.addClass('rbroHidden');
        }
        let itemDiv = $(`<div id="rbro_menu_item${this.id}" class="rbroMenuItem"></div>`);
        if (this.properties.draggable) {
            itemDiv.attr('draggable', 'true');
            itemDiv.on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');  // without setData dragging does not work in FF
                event.originalEvent.dataTransfer.effectAllowed = 'move';
                this.rb.startBrowserDrag('panelItem', null, this.id);
                // avoid calling dragstart handler for main div which disables dragging for all other elements
                event.stopPropagation();
            });
        }
        itemDiv
            .on('dragover', event => {
                if (this.rb.isBrowserDragActive('panelItem') && this.rb.getBrowserDragId() !== this.id) {
                    let dropInfo = this.getDropObjectInfo();
                    if (dropInfo.allowDrop) {
                        // without preventDefault for dragover event, the drop event is not fired
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            })
            .on('dragenter', event => {
                if (this.rb.isBrowserDragActive('panelItem') && this.rb.getBrowserDragId() !== this.id) {
                    let dropInfo = this.getDropObjectInfo();
                    if (dropInfo.allowDrop) {
                        itemDiv.addClass('rbroMenuItemDragOver');
                        this.dragEnterCount++;
                        event.preventDefault(); // needed for IE
                    }
                }
            })
            .on('dragleave', event => {
                if (this.rb.isBrowserDragActive('panelItem') && this.rb.getBrowserDragId() !== this.id) {
                    let dropInfo = this.getDropObjectInfo();
                    if (dropInfo.allowDrop) {
                        this.dragEnterCount--;
                        if (this.dragEnterCount === 0) {
                            itemDiv.removeClass('rbroMenuItemDragOver');
                        }
                    }
                }
            })
            .on('drop', event => {
                if (this.rb.isBrowserDragActive('panelItem') && this.rb.getBrowserDragId() !== this.id) {
                    let dropInfo = this.getDropObjectInfo();
                    if (dropInfo.allowDrop) {
                        this.dragEnterCount--;
                        itemDiv.removeClass('rbroMenuItemDragOver');

                        let cmdGroup = new __WEBPACK_IMPORTED_MODULE_3__commands_CommandGroupCmd__["a" /* default */]('Move panel item', this.rb);

                        let draggedObj = this.rb.getDataObject(this.rb.getBrowserDragId());
                        if (draggedObj instanceof __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */] && draggedObj.getValue('containerId') !== dropInfo.container.getId()) {
                            draggedObj.checkBounds(draggedObj.getValue('xVal'), draggedObj.getValue('yVal'),
                                draggedObj.getValue('widthVal'), draggedObj.getValue('heightVal'),
                                dropInfo.container.getSize(), cmdGroup);

                            let cmd = new __WEBPACK_IMPORTED_MODULE_5__commands_SetValueCmd__["a" /* default */](draggedObj.getId(), null, 'containerId',
                                dropInfo.container.getId(), __WEBPACK_IMPORTED_MODULE_5__commands_SetValueCmd__["a" /* default */].type.internal, this.rb);
                            cmdGroup.addCommand(cmd);
                        }
                        let cmd = new __WEBPACK_IMPORTED_MODULE_4__commands_MovePanelItemCmd__["a" /* default */](draggedObj.getPanelItem(), dropInfo.panel, dropInfo.position, this.rb);
                        cmdGroup.addCommand(cmd);
                        this.rb.executeCommand(cmdGroup);
                        event.preventDefault();
                        return false;
                    }
                }
            });
        
        let nameDiv = $(`<div class="rbroMenuItemText"><span id="rbro_menu_item_name${this.id}">${name}</span></div>`);
        if (this.properties.showAdd) {
            itemDiv.append($(`<span id="rbro_menu_item_add${this.id}" class="rbroButton rbroRoundButton rbroIcon-plus"></span>`)
                .click(event => {
                    if (panelName === 'parameter') {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_AddDeleteParameterCmd__["a" /* default */](true, {}, this.rb.getUniqueId(), this.getId(), -1, this.rb);
                        this.rb.executeCommand(cmd);
                    } else if (panelName === 'style') {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteStyleCmd__["a" /* default */](true, {}, this.rb.getUniqueId(), this.getId(), -1, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                    let newItem = this.children[this.children.length - 1];
                    this.rb.selectObject(newItem.getId(), true);
                    event.stopPropagation();
                })
            );
        }
        if (this.properties.showDelete) {
            itemDiv.append($('<div class="rbroButton rbroDeleteButton rbroIcon-cancel"></div>')
                .click(event => {
                    let initialData = this.getData().toJS();
                    let pos = this.getSiblingPosition();
                    let cmd = null;
                    if (panelName === 'parameter') {
                        cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_AddDeleteParameterCmd__["a" /* default */](false, initialData, this.getId(), this.parent.getId(), pos, this.rb);
                    } else if (panelName === 'style') {
                        cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteStyleCmd__["a" /* default */](false, initialData, this.getId(), this.parent.getId(), pos, this.rb);
                    } else if (panelName === __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */].type.text || panelName === __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */].type.image ||
                            panelName === __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */].type.line || panelName === __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */].type.table ||
                            panelName === __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */].type.pageBreak ||
                            panelName === __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */].type.frame || panelName === __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */].type.section) {
                        if (this.getData() instanceof __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */]) {
                            cmd = new __WEBPACK_IMPORTED_MODULE_3__commands_CommandGroupCmd__["a" /* default */]('Delete', this);
                            this.getData().addCommandsForDelete(cmd);
                        }
                    }
                    if (cmd !== null) {
                        this.rb.executeCommand(cmd);
                    }
                })
            );
        }
        itemDiv.click(event => {
            // only allow toggle children list of menu item if there are no details or menu item is currently selected
            if (!this.properties.hasDetails || $(`#rbro_menu_item${this.id}`).hasClass('rbroMenuItemActive')) {
                let elChildren = $(`#rbro_menu_item_children${this.id}`);
                if (elChildren.length > 0) {
                    itemDiv.toggleClass('rbroMenuItemOpen');
                    elChildren.toggleClass('rbroHidden');
                }
            }
            if (this.properties.hasDetails) {
                this.rb.selectObject(this.id, true);
            }
        });
        if (this.properties.hasChildren) {
            itemDiv.addClass('rbroMenuItemNoChildren');
            nameDiv.append(`<div id="rbro_menu_item_children_toggle${this.id}" class="rbroMenuArrow rbroIcon-arrow-right"></div>`);
            this.element.append($(`<ul id="rbro_menu_item_children${this.id}" class="rbroHidden"></ul>`));
        }
        itemDiv.prepend(nameDiv);
        this.element.prepend(itemDiv);
    }

    getId() {
        return this.id;
    }

    getElement() {
        return this.element;
    }

    show() {
        this.element.removeClass('rbroHidden');
    }

    hide() {
        this.element.addClass('rbroHidden');
    }

    getPanelName() {
        return this.panelName;
    }

    getParent() {
        return this.parent;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
        let name = (data !== null) ? data.getName() : '';
        $(`#rbro_menu_item_name${this.id}`).text(name);
    }

    setActive() {
        $('.rbroMenuItem').removeClass('rbroMenuItemActive');
        $(`#rbro_menu_item${this.id}`).addClass('rbroMenuItemActive');
        if (this.properties.hasDetails) {
            this.rb.setDetailPanel(this.panelName, this.data);
        }
    }

    getParentIds() {
        let ids = [];
        let parent = this.getParent();
        while (parent !== null) {
            ids.push(parent.id);
            parent = parent.getParent();
        }
        return ids;
    }

    openParentItems() {
        let parent = this.getParent();
        while (parent !== null) {
            parent.open();
            parent = parent.getParent();
        }
    }

    open() {
        let elChildren = $(`#rbro_menu_item_children${this.getId()}`);
        if (elChildren.length > 0) {
            $(`#rbro_menu_item${this.getId()}`).addClass('rbroMenuItemOpen');
            elChildren.removeClass('rbroHidden');
        }
    }

    close() {
        let elChildren = $(`#rbro_menu_item_children${this.getId()}`);
        if (elChildren.length > 0) {
            $(`#rbro_menu_item${this.getId()}`).removeClass('rbroMenuItemOpen');
            elChildren.addClass('rbroHidden');
        }
    }

    appendChild(child) {
        if (this.children.length === 0) {
            $(`#rbro_menu_item${this.getId()}`).removeClass('rbroMenuItemNoChildren');
        }
        this.children.push(child);
        $(`#rbro_menu_item_children${this.getId()}`).append(child.getElement());
    }

    insertChild(pos, child) {
        if (this.children.length === 0) {
            $(`#rbro_menu_item${this.getId()}`).removeClass('rbroMenuItemNoChildren');
        }
        if (pos !== -1) {
                this.children.splice(pos, 0, child);
        } else {
            this.children.push(child);
        }
        let elChildren = $(`#rbro_menu_item_children${this.getId()} > li`);
        if (pos !== -1 && pos < elChildren.length) {
            elChildren.eq(pos).before(child.getElement());
        } else {
            $(`#rbro_menu_item_children${this.getId()}`).append(child.getElement());
        }
    }

    getChildren() {
        return this.children;
    }

    removeChild(child) {
        this.removeChildInternal(child, true);
    }

    removeChildInternal(child, deleteDomNode) {
        for (let i=0; i < this.children.length; i++) {
            if (child.getId() === this.children[i].getId()) {
                this.children.splice(i, 1);
                if (deleteDomNode) {
                    child.getElement().remove();
                }
                if (this.children.length === 0) {
                    $(`#rbro_menu_item${this.getId()}`).addClass('rbroMenuItemNoChildren');
                }
                break;
            }
        }
    }

    getSiblingPosition() {
        if (this.getParent() !== null) {
            let siblings = this.getParent().getChildren();
            for (let i=0; i < siblings.length; i++) {
                if (siblings[i] === this) {
                    return i;
                }
            }
        }
        return 0;
    }

    /**
     * Move panel item to another parent.
     * The panel will be appended to the parent, i.e. added after all children of the parent.
     * @param {MainPanelItem} parentPanelItem - new parent panel
     */
    moveTo(parentPanelItem) {
        let el = this.element.detach();
        this.parent.removeChildInternal(this, false);
        this.parent = parentPanelItem;
        parentPanelItem.appendChild(this);
    }

    /**
     * Move panel item to another parent at given position.
     * @param {MainPanelItem} parentPanelItem - new parent panel
     * @param {Number} pos - Position index in children list of new parent where the panel will be inserted.
     */
    moveToPosition(parentPanelItem, pos) {
        let el = this.element.detach();
        this.parent.removeChildInternal(this, false);
        this.parent = parentPanelItem;
        parentPanelItem.insertChild(pos, this);
    }

    clear() {
        $(`#rbro_menu_item_children${this.id}`).empty();
        this.children = [];
    }

    getDropObjectInfo() {
        let rv = { allowDrop: false, panel: null, position: -1, container: null };
        let draggedObj = this.rb.getDataObject(this.rb.getBrowserDragId());
        if (draggedObj !== null) {
            let dropIntoParent = false;
            if (draggedObj instanceof __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */]) {
                if (this.data instanceof __WEBPACK_IMPORTED_MODULE_9__elements_DocElement__["a" /* default */] && this.data.isDroppingAllowed()) {
                    // get linked container if available (e.g. container of frame element),
                    // otherwise use the parent container
                    rv.container = this.data.getLinkedContainer();
                    if (rv.container === null) {
                        rv.container = this.data.getContainer();
                        dropIntoParent = true;
                    }
                } else if (this.panelName === 'band') {
                    rv.container = this.data;
                }
                if (rv.container !== null && rv.container.isElementAllowed(draggedObj.getElementType())) {
                    rv.allowDrop = true;
                }
            } else if (draggedObj instanceof __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */]) {
                if (this.data instanceof __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */]) {
                    let parent = this.data.getParent();
                    if (parent !== null) {
                        if (parent.getValue('type') === __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.array) {
                            if (draggedObj.getValue('type') !== __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.array &&
                                    draggedObj.getValue('type') !== __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.map &&
                                    draggedObj.getValue('type') !== __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.sum &&
                                    draggedObj.getValue('type') !== __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.average) {
                                rv.allowDrop = true;
                                dropIntoParent = true;
                            }
                        } else if (parent.getValue('type') === __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.map) {
                            if (draggedObj.getValue('type') !== __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.array &&
                                    draggedObj.getValue('type') !== __WEBPACK_IMPORTED_MODULE_7__data_Parameter__["a" /* default */].type.map) {
                                rv.allowDrop = true;
                                dropIntoParent = true;
                            }
                        }
                    } else {
                        rv.allowDrop = true;
                        dropIntoParent = true;
                    }
                } else if (this.panelName === 'parameter') {
                    rv.allowDrop = true;
                }
            } else if (draggedObj instanceof __WEBPACK_IMPORTED_MODULE_8__data_Style__["a" /* default */]) {
                if (this.data instanceof __WEBPACK_IMPORTED_MODULE_8__data_Style__["a" /* default */]) {
                    rv.allowDrop = true;
                    dropIntoParent = true;
                } else if (this.panelName === 'style') {
                    rv.allowDrop = true;
                }
            }

            if (rv.allowDrop) {
                if (dropIntoParent) {
                    rv.panel = this.getParent();
                    rv.position = this.getSiblingPosition() + 1;
                } else {
                    rv.panel = this;
                    rv.position = 0;
                }
                if (rv.panel === null || (rv.panel === draggedObj.getPanelItem().getParent() &&
                        rv.position === draggedObj.getPanelItem().getSiblingPosition())) {
                        // do not allow drop if object is not moved (same parent and position)
                        rv.allowDrop = false;
                    }
            }
        }
        return rv;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainPanelItem;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_AddDeleteDocElementCmd__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DocumentProperties__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);






/**
 * Area to display all bands and its doc elements.
 * Further handles dragging of doc elements.
 * @class
 */
class Document {
    constructor(rootElement, showGrid, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.elDocContent = null;
        this.elHeader = null;
        this.elContent = null;
        this.elFooter = null;
        this.elSelectionArea = null;
        this.gridVisible = showGrid;
        this.gridSize = 10;
        this.pdfPreviewExists = false;

        // moving/resizing of element
        this.dragging = false;
        this.dragElementType = null;
        this.dragType = __WEBPACK_IMPORTED_MODULE_3__elements_DocElement__["a" /* default */].dragType.none;
        this.dragObjectId = null;
        this.dragContainerId = null;
        this.dragLinkedContainerId = null;
        this.dragCurrentContainerId = null;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragCurrentX = 0;
        this.dragCurrentY = 0;
        this.dragSnapToGrid = false;
        this.dragEnterCount = 0;

        // drawing rectangle to select multiple elements
        this.selectionAreaStarted = false;
        this.selectionAreaStartX = 0;
        this.selectionAreaStartY = 0;
    }

    render() {
        let panel = $('#rbro_document_panel')
            .mousedown(event => {
                if (this.rb.isDocElementSelected() && !event.shiftKey) {
                    this.rb.deselectAll();
                }
                let offset = this.elDocContent.offset();
                this.startSelectionArea(
                    event.originalEvent.pageX - offset.left, event.originalEvent.pageY - offset.top);
            });

        let elDocTabs = $('<div id="rbro_document_tabs" class="rbroDocumentTabs"></div>')
            .mousedown(event => {
                // avoid deselection of doc elements when clicking document tab
                event.stopPropagation();
            });

        elDocTabs.append(
            $(`<div id="rbro_document_tab_pdf_layout" class="rbroDocumentTab rbroButton rbroTabButton">
               ${this.rb.getLabel('documentTabPdfLayout')}</div>`)
            .click(event => {
                this.setDocumentTab(Document.tab.pdfLayout);
            }));
        let btnPdfPreview = $(
            `<div id="rbro_document_tab_pdf_preview" class="rbroDocumentTab rbroButton rbroTabButton rbroHidden rbroPdfPreview 
                ${this.rb.getProperty('enableSpreadsheet') ? 'rbroXlsxDownload' : ''}">
                ${this.rb.getLabel('documentTabPdfPreview')}</div>`)
            .click(event => {
                this.setDocumentTab(Document.tab.pdfPreview);
            });
        if (this.rb.getProperty('enableSpreadsheet')) {
            btnPdfPreview.append($(
                `<span class="rbroIcon-xlsx rbroXlsxDownlaodButton" title="${this.rb.getLabel('documentTabXlsxDownload')}"></span>`)
                .click(event => { this.rb.downloadSpreadsheet(); }));
        }
        btnPdfPreview.append($(
            `<span class="rbroIcon-cancel" title="${this.rb.getLabel('documentTabClose')}"></span>`)
            .click(event => { this.closePdfPreviewTab(); }));
        elDocTabs.append(btnPdfPreview);
        panel.append(elDocTabs);

        let elDoc = $('<div id="rbro_document_pdf" class="rbroDocument rbroDragTarget rbroHidden"></div>');
        let docProperties = this.rb.getDocumentProperties();
        this.elDocContent = $(`<div id="rbro_document_content"
            class="rbroDocumentContent ${this.gridVisible ? 'rbroDocumentGrid' : ''}"></div>`);
        this.elHeader = $(`<div id="rbro_header" class="rbroDocumentBand rbroElementContainer"
            style="top: 0px; left: 0px;"></div>`);
        this.elHeader.append($(`<div class="rbroDocumentBandDescription">${this.rb.getLabel('bandHeader')}</div>`));
        this.elDocContent.append(this.elHeader);
        this.elContent = $('<div id="rbro_content" class="rbroDocumentBand rbroElementContainer"></div>');
        this.elContent.append($(`<div class="rbroDocumentBandDescription">${this.rb.getLabel('bandContent')}</div>`));
        this.elDocContent.append(this.elContent);
        this.elFooter = $(`<div id="rbro_footer" class="rbroDocumentBand rbroElementContainer"
            style="bottom: 0px; left 0px;"></div>`);
        this.elFooter.append($(`<div class="rbroDocumentBandDescription">${this.rb.getLabel('bandFooter')}</div>`));
        this.elDocContent.append(this.elFooter);
        elDoc.append(this.elDocContent);

        this.elSelectionArea = $('<div id="rbro_selection_area" class="rbroHidden rbroSelectionArea"></div>');
        this.elDocContent.append(this.elSelectionArea);

        this.initializeEventHandlers();

        elDoc.append('<div id="rbro_divider_margin_left" class="rbroDivider rbroDividerMarginLeft"></div>');
        elDoc.append('<div id="rbro_divider_margin_top" class="rbroDivider rbroDividerMarginTop"></div>');
        elDoc.append('<div id="rbro_divider_margin_right" class="rbroDivider rbroDividerMarginRight"></div>');
        elDoc.append('<div id="rbro_divider_margin_bottom" class="rbroDivider rbroDividerMarginBottom"></div>');
        elDoc.append('<div id="rbro_divider_header" class="rbroDivider rbroDividerHeader"></div>');
        elDoc.append('<div id="rbro_divider_footer" class="rbroDivider rbroDividerFooter"></div>');
        panel.append(elDoc);

        panel.append($('<div id="rbro_document_pdf_preview" class="rbroDocumentPreview"></div>'));

        let size = docProperties.getPageSize();
        this.updatePageSize(size.width, size.height);
        this.updateHeader();
        this.updateFooter();
        this.updatePageMargins();
        this.updateDocumentTabs();

        this.setDocumentTab(Document.tab.pdfLayout);
    }

    initializeEventHandlers() {
        $('#rbro_document_panel').mousemove(event => {
            if (this.dragging) {
                if (this.dragType === __WEBPACK_IMPORTED_MODULE_3__elements_DocElement__["a" /* default */].dragType.element) {
                    let container = this.getContainer(
                        event.originalEvent.pageX, event.originalEvent.pageY, this.dragElementType);
                    let containerId = null;
                    if (container !== null) {
                        containerId = container.getId();
                        if (containerId === this.dragLinkedContainerId) {
                            // container is the same as the linked container of dragged element, this is
                            // the case when dragging container elements like frames
                            container = container.getParent();
                            containerId = (container !== null) ? container.getId() : null;
                        }
                    }
                    if (containerId !== this.dragCurrentContainerId) {
                        $('.rbroElementContainer').removeClass('rbroElementDragOver');
                        if (container !== null && containerId !== this.dragContainerId) {
                            container.dragOver();
                        }
                    }
                    this.dragCurrentContainerId = containerId;
                }
                this.dragCurrentX = event.originalEvent.pageX;
                this.dragCurrentY = event.originalEvent.pageY;
                this.dragSnapToGrid = !event.ctrlKey;

                let dragObject = this.rb.getDataObject(this.dragObjectId);
                if (dragObject !== null) {
                    let dragDiff = dragObject.getDragDiff(
                        event.originalEvent.pageX - this.dragStartX,
                        event.originalEvent.pageY - this.dragStartY, this.dragType,
                        (this.dragSnapToGrid && this.isGridVisible()) ? this.getGridSize() : 0);
                    this.rb.updateSelectionDrag(dragDiff.x, dragDiff.y, this.dragType, null, false);
                }
            }
            if (this.selectionAreaStarted) {
                let offset = this.elDocContent.offset();
                let area = this.getSelectionArea(
                    event.originalEvent.pageX - offset.left, event.originalEvent.pageY - offset.top);
                let props = {
                    left: this.rb.toPixel(area.left), top: this.rb.toPixel(area.top),
                    width: this.rb.toPixel(area.width), height: this.rb.toPixel(area.height)};
                this.elSelectionArea.css(props);
                if (this.elSelectionArea.hasClass('rbroHidden')) {
                    // show element after css properties are set
                    this.elSelectionArea.removeClass('rbroHidden');
                }
            }
        });
        this.elDocContent.on('dragover', event => {
            if (this.rb.isBrowserDragActive('docElement')) {
                let container = this.getContainer(
                    event.originalEvent.pageX, event.originalEvent.pageY, this.dragElementType);
                let containerId = (container !== null) ? container.getId() : null;
                if (containerId !== this.dragContainerId) {
                    $('.rbroElementContainer').removeClass('rbroElementDragOver');
                    if (container !== null) {
                        container.dragOver();
                    }
                    this.dragContainerId = containerId;
                }
                // without preventDefault for dragover event, the drop event is not fired
                event.preventDefault();
                event.stopPropagation();
            }
        })
        .on('dragenter', event => {
            if (this.rb.isBrowserDragActive('docElement')) {
                this.dragEnterCount++;
                event.preventDefault(); // needed for IE
            }
        })
        .on('dragleave', event => {
            if (this.rb.isBrowserDragActive('docElement')) {
                this.dragEnterCount--;
                if (this.dragEnterCount === 0) {
                    $('.rbroElementContainer').removeClass('rbroElementDragOver');
                    this.dragContainerId = null;
                }
            }
        })
        .on('drop', event => {
            if (this.rb.isBrowserDragActive('docElement')) {
                $('.rbroElementContainer').removeClass('rbroElementDragOver');
                let docProperties = this.rb.getDocumentProperties();
                let container = this.getContainer(
                    event.originalEvent.pageX, event.originalEvent.pageY, this.dragElementType);
                while (container !== null && !container.isElementAllowed(this.dragElementType)) {
                    container = container.getParent();
                }
                if (container !== null && container.isElementAllowed(this.dragElementType)) {
                    let offset = this.elDocContent.offset();
                    let x = event.originalEvent.pageX - offset.left;
                    let y = event.originalEvent.pageY - offset.top;
                    let containerOffset = container.getOffset();
                    x -= containerOffset.x;
                    y -= containerOffset.y;
                    if (!event.ctrlKey && this.rb.getDocument().isGridVisible()) {
                        let gridSize = this.rb.getDocument().getGridSize();
                        x = __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* roundValueToInterval */](x, gridSize);
                        y = __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* roundValueToInterval */](y, gridSize);
                    }
                    let initialData = { x: '' + x, y: '' + y, containerId: container.getId() };
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_AddDeleteDocElementCmd__["a" /* default */](true, this.dragElementType, initialData,
                        this.rb.getUniqueId(), container.getId(), -1, this.rb);
                    this.rb.executeCommand(cmd);
                }
                event.preventDefault();
                return false;
            }
        });
    }

    updatePageSize(width, height) {
        $('#rbro_document_pdf').css({ width: this.rb.toPixel(width), height: this.rb.toPixel(height) });
    }

    updatePageMargins() {
        let docProperties = this.rb.getDocumentProperties();
        let left = this.rb.toPixel(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('marginLeft')) - 1);
        let top = this.rb.toPixel(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('marginTop')) - 1);
        let marginRight = __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('marginRight'));
        let marginBottom = __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('marginBottom'));
        let right = this.rb.toPixel(marginRight);
        let bottom = this.rb.toPixel(marginBottom);
        $('#rbro_divider_margin_left').css('left', left);
        $('#rbro_divider_margin_top').css('top', top);
        // hide right/bottom divider in case margin is 0, otherwise divider is still visible
        // because it is one pixel to the left/top of document border
        if (marginRight !== 0) {
            $('#rbro_divider_margin_right').css('right', right).show();
        } else {
            $('#rbro_divider_margin_right').hide();
        }
        if (marginBottom !== 0) {
            $('#rbro_divider_margin_bottom').css('bottom', bottom).show();
        } else {
            $('#rbro_divider_margin_bottom').hide();
        }
        this.elDocContent.css({ left: left, top: top, right: right, bottom: bottom });
    }

    updateHeader() {
        let docProperties = this.rb.getDocumentProperties();
        if (docProperties.getValue('header')) {
            let headerSize = this.rb.toPixel(docProperties.getValue('headerSize'));
            this.elHeader.css('height', headerSize);
            this.elHeader.show();
            $('#rbro_divider_header').css('top', this.rb.toPixel(
                __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('marginTop')) +
                __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('headerSize')) - 1));
            $('#rbro_divider_header').show();
            this.elContent.css('top', headerSize);
        } else {
            this.elHeader.hide();
            $('#rbro_divider_header').hide();
            this.elContent.css('top', this.rb.toPixel(0));
        }
    }

    updateFooter() {
        let docProperties = this.rb.getDocumentProperties();
        if (docProperties.getValue('footer')) {
            let footerSize = this.rb.toPixel(docProperties.getValue('footerSize'));
            this.elFooter.css('height', footerSize);
            this.elFooter.show();
            $('#rbro_divider_footer').css('bottom', this.rb.toPixel(
                __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('marginBottom')) +
                __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](docProperties.getValue('footerSize'))));
            $('#rbro_divider_footer').show();
            this.elContent.css('bottom', footerSize);
        } else {
            this.elFooter.hide();
            $('#rbro_divider_footer').hide();
            this.elContent.css('bottom', this.rb.toPixel(0));
        }
    }

    setDocumentTab(tab) {
        $('#rbro_document_tabs .rbroDocumentTab').removeClass('rbroActive');
        // use z-index to show pdf preview instead of show/hide of div because otherwise pdf is reloaded (and generated) again
        if (tab === Document.tab.pdfLayout) {
            $('#rbro_document_tab_pdf_layout').addClass('rbroActive');
            $('#rbro_document_pdf').removeClass('rbroHidden');
            $('#rbro_document_pdf_preview').css('z-index', '');
            $('.rbroElementButtons .rbroMenuButton').removeClass('rbroDisabled').prop('draggable', true);
            $('.rbroActionButtons .rbroActionButton').prop('disabled', false);
        } else if (this.pdfPreviewExists && tab === Document.tab.pdfPreview) {
            $('#rbro_document_tab_pdf_preview').addClass('rbroActive');
            $('#rbro_document_pdf').addClass('rbroHidden');
            $('#rbro_document_pdf_preview').css('z-index', '1');
            $('.rbroElementButtons .rbroMenuButton').addClass('rbroDisabled').prop('draggable', false);
            $('.rbroActionButtons .rbroActionButton').prop('disabled', true);
        }
    }

    openPdfPreviewTab(reportUrl) {
        let pdfObj = '<object data="' + reportUrl + '" type="application/pdf" width="100%" height="100%"></object>';
        this.pdfPreviewExists = true;
        $('#rbro_document_pdf_preview').empty();
        $('#rbro_document_pdf_preview').append(pdfObj);
        this.setDocumentTab(Document.tab.pdfPreview);
        this.updateDocumentTabs();
    }

    closePdfPreviewTab() {
        this.pdfPreviewExists = false;
        $('#rbro_document_pdf_preview').empty();
        this.setDocumentTab(Document.tab.pdfLayout);
        this.updateDocumentTabs();
    }

    updateDocumentTabs() {
        let tabCount = 1;
        if (this.pdfPreviewExists) {
            $('#rbro_document_tab_pdf_preview').removeClass('rbroHidden');
            tabCount++;
        } else {
            $('#rbro_document_tab_pdf_preview').addClass('rbroHidden');
        }
        if (tabCount > 1) {
            $('#rbro_document_tabs').show();
            $('#rbro_document_panel').addClass('rbroHasTabs');
        } else {
            $('#rbro_document_tabs').hide();
            $('#rbro_document_panel').removeClass('rbroHasTabs');
        }
    }

    /**
     * Returns container for given absolute position.
     * @param {Number} absPosX - absolute x position.
     * @param {Number} absPosY - absolute y position.
     * @param {String} elementType - needed for finding container, not all elements are allowed
     * in all containers (e.g. a frame cannot contain another frame).
     * @returns {[Container]} Container or null in case no container was found for given position.
     */
    getContainer(absPosX, absPosY, elementType) {
        let offset = this.elDocContent.offset();
        return this.rb.getContainer(absPosX - offset.left, absPosY - offset.top, elementType);
    }

    isGridVisible() {
        return this.gridVisible;
    }

    toggleGrid() {
        this.gridVisible = !this.gridVisible;
        if (this.gridVisible) {
            this.elDocContent.addClass('rbroDocumentGrid');
        } else {
            this.elDocContent.removeClass('rbroDocumentGrid');
        }
    }

    getGridSize() {
        return this.gridSize;
    }

    getHeight() {
        return this.elDocContent.height();
    }

    getElement(band) {
        if (band === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.header) {
            return this.elHeader;
        } else if (band === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.content) {
            return this.elContent;
        } else if (band === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.footer) {
            return this.elFooter;
        }
        return null;
    }

    isDragging() {
        return this.dragging;
    }

    isDragged() {
        return this.dragging && ((this.dragStartX !== this.dragCurrentX) || (this.dragStartY !== this.dragCurrentY));
    }

    startDrag(x, y, objectId, containerId, linkedContainerId, elementType, dragType) {
        this.dragging = true;
        this.dragStartX = this.dragCurrentX = x;
        this.dragStartY = this.dragCurrentY = y;
        this.dragElementType = elementType;
        this.dragType = dragType;
        this.dragObjectId = objectId;
        this.dragContainerId = containerId;
        this.dragLinkedContainerId = linkedContainerId;
        this.dragCurrentContainerId = null;
        this.dragSnapToGrid = false;
    }

    stopDrag() {
        let diffX = this.dragCurrentX - this.dragStartX;
        let diffY = this.dragCurrentY - this.dragStartY;
        let dragObject = this.rb.getDataObject(this.dragObjectId);
        if (dragObject !== null && (diffX !== 0 || diffY !== 0)) {
            let container = null;
            if (this.dragType === __WEBPACK_IMPORTED_MODULE_3__elements_DocElement__["a" /* default */].dragType.element) {
                container = this.rb.getDataObject(this.dragCurrentContainerId);
            }
            let dragDiff = dragObject.getDragDiff(
                diffX, diffY, this.dragType, (this.dragSnapToGrid && this.isGridVisible()) ? this.getGridSize() : 0);
            this.rb.updateSelectionDrag(dragDiff.x, dragDiff.y, this.dragType, container, true);
        } else {
            this.rb.updateSelectionDrag(0, 0, this.dragType, null, false);
        }
        this.dragging = false;
        this.dragType = __WEBPACK_IMPORTED_MODULE_3__elements_DocElement__["a" /* default */].dragType.none;
        this.dragObjectId = null;
        this.dragContainerId = null;
        this.dragCurrentContainerId = null;
        $('.rbroElementContainer').removeClass('rbroElementDragOver');
    }

    startBrowserDrag(dragElementType) {
        this.dragEnterCount = 0;
        this.dragObjectId = null;
        this.dragContainerId = null;
        this.dragLinkedContainerId = null;
        this.dragElementType = dragElementType;
    }

    startSelectionArea(x, y) {
        this.selectionAreaStarted = true;
        this.selectionAreaStartX = x;
        this.selectionAreaStartY = y;
    }

    stopSelectionArea(x, y, clearSelection) {
        let area = this.getSelectionArea(x, y);
        if (area.width > 10 && area.height > 10) {
            let docElements = this.rb.getDocElements(true);
            for (let docElement of docElements) {
                // do not select table text and table band elements
                if (docElement.isDraggingAllowed()) {
                    let pos = docElement.getAbsolutePosition();
                    if (area.left < (pos.x + docElement.getValue('widthVal')) &&
                        (area.left + area.width) >= pos.x &&
                        area.top < (pos.y + docElement.getValue('heightVal')) &&
                        (area.top + area.height) >= pos.y) {
                        let allowSelect = true;
                        // do not allow selection of element if its container is already selected,
                        // e.g. text inside selected frame element
                        if (docElement.getContainerId()) {
                            let container = docElement.getContainer();
                            if (container !== null && container.isSelected()) {
                                allowSelect = false;
                            }
                        }
                        if (allowSelect) {
                            this.rb.selectObject(docElement.getId(), clearSelection);
                            clearSelection = false;
                        }
                    }
                }
            }
        }

        this.selectionAreaStarted = false;
        this.selectionAreaStartX = 0;
        this.selectionAreaStartY = 0;
        this.elSelectionArea.addClass('rbroHidden');
    }

    getSelectionArea(x, y) {
        let area = {};
        if (x > this.selectionAreaStartX) {
            area.left = this.selectionAreaStartX;
            area.width = x - this.selectionAreaStartX;
        } else {
            area.left = x;
            area.width = this.selectionAreaStartX - x;
        }
        if (y > this.selectionAreaStartY) {
            area.top = this.selectionAreaStartY;
            area.height = y - this.selectionAreaStartY;
        } else {
            area.top = y;
            area.height = this.selectionAreaStartY - y;
        }
        return area;
    }

    mouseUp(event) {
        if (this.isDragging()) {
            this.stopDrag();
        }
        if (this.selectionAreaStarted) {
            let offset = this.elDocContent.offset();
            this.stopSelectionArea(
                event.originalEvent.pageX - offset.left,
                event.originalEvent.pageY - offset.top,
                !event.shiftKey);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Document;


Document.tab = {
    pdfLayout: 'pdfLayout',
    pdfPreview: 'pdfPreview'
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SetValueCmd__ = __webpack_require__(2);


/**
 * Command container for multiple commands. All commands of this container will be executed in a single do/undo operation.
 * @class
 */
class CommandGroupCmd {
    constructor(name, rb) {
        this.name;
        this.rb = rb;
        this.commands = [];
    }

    getName() {
        return this.name;
    }

    do() {
        for (let i=0; i < this.commands.length; i++) {
            this.commands[i].do();
        }
    }

    undo() {
        for (let i=this.commands.length - 1; i >= 0; i--) {
            this.commands[i].undo();
        }
    }

    addCommand(cmd) {
        if (this.commands.length > 0 && cmd instanceof __WEBPACK_IMPORTED_MODULE_0__SetValueCmd__["a" /* default */]) {
            cmd.disableSelect();
        }
        this.commands.push(cmd);
    }

    isEmpty() {
        return this.commands.length === 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CommandGroupCmd;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_BarCodeElement__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__elements_FrameElement__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__elements_ImageElement__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__elements_LineElement__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__elements_PageBreakElement__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__elements_SectionElement__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__elements_TableElement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__elements_TextElement__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__menu_MainPanelItem__ = __webpack_require__(8);












/**
 * Command to add and delete a doc element.
 * @class
 */
class AddDeleteDocElementCmd {
    constructor(add, elementType, initialData, id, parentId, position, rb) {
        this.add = add;
        this.elementType = elementType;
        this.initialData = initialData;
        this.parentId = parentId;
        this.position = position;
        this.rb = rb;
        this.id = id;
        this.firstExecution = true;
    }

    getName() {
        if (this.add) {
            return 'Add element';
        } else {
            return 'Delete element';
        }
    }

    do() {
        if (this.add) {
            this.addElement();
        } else {
            this.deleteElement();
        }
        this.firstExecution = false;
    }

    undo() {
        if (this.add) {
            this.deleteElement();
        } else {
            this.addElement();
        }
    }

    addElement() {
        let parent = this.rb.getDataObject(this.parentId);
        if (parent !== null) {
            let element = AddDeleteDocElementCmd.createElement(this.id, this.initialData, this.elementType, this.position, true, this.rb);
            
            this.rb.notifyEvent(element, __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */].operation.add);
            this.rb.selectObject(this.id, true);

            if (this.add && this.firstExecution) {
                // in case of add command we serialize initialData on first execution so it contains all data
                // created during setup (e.g. ids of table bands and table cells for a table)
                this.initialData = element.toJS();
            }
        }
    }

    deleteElement() {
        let element = this.rb.getDataObject(this.id);
        if (element !== null) {
            this.rb.notifyEvent(element, __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */].operation.remove);
            this.rb.deleteDocElement(element);
        }
    }

    static createElement(id, data, elementType, panelPos, openPanelItem, rb) {
        let element;
        let properties = { draggable: true };
        if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
            element = new __WEBPACK_IMPORTED_MODULE_9__elements_TextElement__["a" /* default */](id, data, rb);
        } else if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.line) {
            element = new __WEBPACK_IMPORTED_MODULE_5__elements_LineElement__["a" /* default */](id, data, rb);
        } else if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.image) {
            element = new __WEBPACK_IMPORTED_MODULE_4__elements_ImageElement__["a" /* default */](id, data, rb);
        } else if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.pageBreak) {
            element = new __WEBPACK_IMPORTED_MODULE_6__elements_PageBreakElement__["a" /* default */](id, data, rb);
        } else if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.table) {
            element = new __WEBPACK_IMPORTED_MODULE_8__elements_TableElement__["a" /* default */](id, data, rb);
            properties.hasChildren = true;
        } else if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.frame) {
            element = new __WEBPACK_IMPORTED_MODULE_3__elements_FrameElement__["a" /* default */](id, data, rb);
            properties.hasChildren = true;
        } else if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.section) {
            element = new __WEBPACK_IMPORTED_MODULE_7__elements_SectionElement__["a" /* default */](id, data, rb);
            properties.hasChildren = true;
        } else if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.barCode) {
            element = new __WEBPACK_IMPORTED_MODULE_1__elements_BarCodeElement__["a" /* default */](id, data, rb);
        }
        rb.addDocElement(element);
        let parentPanel = element.getContainer().getPanelItem();
        let panelItem = new __WEBPACK_IMPORTED_MODULE_10__menu_MainPanelItem__["a" /* default */](elementType, parentPanel, element, properties, rb);
        element.setPanelItem(panelItem);
        parentPanel.insertChild(panelPos, panelItem);
        element.setup(openPanelItem);
        return element;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddDeleteDocElementCmd;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Container can contain doc elements. The doc elements are always relative to the container offset.
 * @class
 */
class Container {
    constructor(id, name, rb) {
        this.rb = rb;
        this.id = id;
        this.panelItem = null;
        this.name = name;
        this.el = null;
        this.elContent = null;
        this.owner = null;
        this.level = 0;  // number of containers "above"
        this.parent = null;  // parent container
    }

    init(owner) {
        this.owner = owner;
        this.el = owner.getElement();
        this.elContent = owner.getContentElement();
        this.panelItem = owner.getPanelItem();
        this.parent = owner.getContainer();
        this.level = 0;
        let parent = this.parent;
        while (parent !== null) {
            this.level++;
            parent = parent.getParent();
        }
    }

    /**
     * Called after initialization is finished.
     */
    setup() {
    }

    remove() {
    }

    appendElement(el) {
        if (this.elContent !== null) {
            this.elContent.append(el);
        }
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPanelItem() {
        return this.panelItem;
    }

    setPanelItem(panelItem) {
        this.panelItem = panelItem;
    }

    getLevel() {
        return this.level;
    }

    getParent() {
        return this.parent;
    }

    setParent(parent) {
        this.parent = parent;
        this.level = 0;
        while (parent !== null) {
            this.level++;
            parent = parent.getParent();
        }
    }

    isSelected() {
        if (this.owner !== null && this.rb.isSelectedObject(this.owner.getId())) {
            return true;
        }
        return false;
    }

    /**
     * Returns true if the given element type can be added to this container.
     * @param {String} elementType
     */
    isElementAllowed(elementType) {
        return false;
    }

    /**
     * Update container style when an element is currently dragged over this container.
     */
    dragOver() {
        if (this.el !== null) {
            this.el.addClass('rbroElementDragOver');
        }
    }

    /**
     * Returns absolute container offset.
     * @returns {Object} x and y offset coordinates.
     */
    getOffset() {
        return { x: 0, y: 0 };
    }

    /**
     * Returns offset relative to other container.
     * @param {Container} otherContainer
     * @returns {Object} x and y offset coordinates.
     */
    getOffsetTo(otherContainer) {
        if (otherContainer !== null && otherContainer != this) {
            let offset = this.getOffset();
            let otherOffset = otherContainer.getOffset();
            return { x: offset.x - otherOffset.x, y: offset.y - otherOffset.y };
        }
        return { x: 0, y: 0 };
    }

    /**
     * Returns container size.
     * @returns {Object} width and height of container.
     */
    getSize() {
        return { width: 0, height: 0 };
    }

    /**
     * Returns container content size.
     * @returns {Object} width and height of container content area.
     */
    getContentSize() {
        return { width: 0, height: 0 };
    }

    /**
     * Returns true if given absolute position is inside container.
     * @param {Number} posX - absolute x coordinate.
     * @param {Number} posY - absolute y coordinate.
     */
    isInside(posX, posY) {
        let offset = this.getOffset();
        let size = this.getSize();
        posX -= offset.x;
        posY -= offset.y;
        if (posX >= 0 && posY >= 0 && posX < size.width && posY < size.height) {
            return true;
        }
        return false;
    }

    clearErrors() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Container;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Panel to edit all style properties.
 * @class
 */
class StylePanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render(data) {
        let panel = $('<div id="rbro_style_panel" class="rbroHidden"></div>');
        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_style_name">${this.rb.getLabel('styleName')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elStyleName = $(`<input id="rbro_style_name">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    if (elStyleName.val().trim() !== '') {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_style_name', 'name',
                            elStyleName.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    } else {
                        elStyleName.val(style.getName());
                    }
                }
            });
        elFormField.append(elStyleName);
        elDiv.append(elFormField);
        panel.append(elDiv);

        StylePanel.renderStyle(panel, 'style_', '', __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none, this, this.rb);

        $('#rbro_detail_panel').append(panel);
    }

    static renderPaddingControls(elPanel, idPrefix, fieldPrefix, panel, rb) {
        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_${idPrefix}padding">${rb.getLabel('stylePadding')}:</label>`);
        let elFormField = $('<div class="rbroFormField rbroSmallInput"></div>');
        
        let elPaddingTopDiv = $('<div class="rbroColumnCenter"></div>');
        let elPaddingTop = $(`<input id="rbro_${idPrefix}padding_top" placeholder="${rb.getLabel('orientationTop')}">`)
            .on('input', event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}padding_top`,
                        `${fieldPrefix}paddingTop`, elPaddingTop.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, rb);
                    rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elPaddingTop);
        elPaddingTopDiv.append(elPaddingTop);
        elFormField.append(elPaddingTopDiv);

        let elDiv2 = $('<div class="rbroSplit"></div>');
        let elPaddingLeft = $(`<input id="rbro_${idPrefix}padding_left" placeholder="${rb.getLabel('orientationLeft')}">`)
            .on('input', event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}padding_left`,
                        `${fieldPrefix}paddingLeft`, elPaddingLeft.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, rb);
                    rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elPaddingLeft);
        elDiv2.append(elPaddingLeft);
        let elPaddingRight = $(`<input id="rbro_${idPrefix}padding_right" placeholder="${rb.getLabel('orientationRight')}">`)
            .on('input', event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}padding_right`,
                        `${fieldPrefix}paddingRight`, elPaddingRight.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, rb);
                    rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elPaddingRight);
        elDiv2.append(elPaddingRight);
        elFormField.append(elDiv2);

        let elPaddingBottomDiv = $('<div class="rbroColumnCenter"></div>');
        let elPaddingBottom = $(`<input id="rbro_${idPrefix}padding_bottom" placeholder="${rb.getLabel('orientationBottom')}">`)
            .on('input', event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}padding_bottom`,
                        `${fieldPrefix}paddingBottom`, elPaddingBottom.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, rb);
                    rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elPaddingBottom);
        elPaddingBottomDiv.append(elPaddingBottom);
        elFormField.append(elPaddingBottomDiv);
        elDiv.append(elFormField);
        elPanel.append(elDiv);
    }

    static renderStyle(elPanel, idPrefix, fieldPrefix, elementType, panel, rb) {
        let elDiv, elFormField;
        if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
            elDiv = $('<div class="rbroFormRow"></div>');
            elDiv.append(`<label>${rb.getLabel('styleTextStyle')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elTextStyle = $(`<div id="rbro_${idPrefix}textstyle"></div>`);
            let elBold = $(`<button id="rbro_${idPrefix}bold" name="style_bold" class="rbroButton rbroActionButton rbroIcon-bold" type="button"
                    title="${rb.getLabel('styleBold')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}bold`,
                            `${fieldPrefix}bold`, !elBold.hasClass('rbroButtonActive'), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elTextStyle.append(elBold);
            let elItalic = $(`<button id="rbro_${idPrefix}italic"
                    class="rbroButton rbroActionButton rbroIcon-italic" type="button"
                    title="${rb.getLabel('styleItalic')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}italic`,
                            `${fieldPrefix}italic`, !elItalic.hasClass('rbroButtonActive'), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elTextStyle.append(elItalic);
            let elunderline = $(`<button id="rbro_${idPrefix}underline"
                    class="rbroButton rbroActionButton rbroIcon-underline" type="button"
                    title="${rb.getLabel('styleunderline')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}underline`,
                            `${fieldPrefix}underline`, !elunderline.hasClass('rbroButtonActive'), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elTextStyle.append(elunderline);
            elFormField.append(elTextStyle);
            elDiv.append(elFormField);
            elPanel.append(elDiv);
        }

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label>${rb.getLabel('styleAlignment')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elHAlignment = $(`<div id="rbro_${idPrefix}halignment"></div>`);
        let elHAlignmentLeft = $(`<button id="rbro_${idPrefix}halignment_left"
                class="rbroButton rbroActionButton rbroIcon-text-align-left" type="button" value="left"
                title="${rb.getLabel('styleHAlignmentLeft')}"></button>`)
            .click(event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}halignment`,
                        `${fieldPrefix}horizontalAlignment`, __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.left, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.buttonGroup, rb);
                    rb.executeCommand(cmd);
                }
            });
        elHAlignment.append(elHAlignmentLeft);
        let elHAlignmentCenter = $(`<button id="rbro_${idPrefix}halignment_center"
                class="rbroButton rbroActionButton rbroIcon-text-align-center" type="button" value="center"
                title="${rb.getLabel('styleHAlignmentCenter')}"></button>`)
            .click(event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}halignment`,
                        `${fieldPrefix}horizontalAlignment`, __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.center, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.buttonGroup, rb);
                    rb.executeCommand(cmd);
                }
            });
        elHAlignment.append(elHAlignmentCenter);
        let elHAlignmentRight = $(`<button id="rbro_${idPrefix}halignment_right"
                class="rbroButton rbroActionButton rbroIcon-text-align-right" type="button" value="right"
                title="${rb.getLabel('styleHAlignmentRight')}"></button>`)
            .click(event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}halignment`,
                        `${fieldPrefix}horizontalAlignment`, __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.right, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.buttonGroup, rb);
                    rb.executeCommand(cmd);
                }
            });
        elHAlignment.append(elHAlignmentRight);
        if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
            let elHAlignmentJustify = $(`<button id="rbro_${idPrefix}halignment_justify"
                    class="rbroButton rbroActionButton rbroIcon-text-align-justify" type="button" value="justify"
                    title="${rb.getLabel('styleHAlignmentJustify')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}halignment`,
                            `${fieldPrefix}horizontalAlignment`, __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.justify, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.buttonGroup, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elHAlignment.append(elHAlignmentJustify);
        }
        elFormField.append(elHAlignment);

        let elVAlignment = $(`<div id="rbro_${idPrefix}valignment"></div>`);
        let elVAlignmentTop = $(`<button id="rbro_${idPrefix}valignment_top"
                class="rbroButton rbroActionButton rbroIcon-align-top" type="button" value="top"
                title="${rb.getLabel('styleVAlignmentTop')}"></button>`)
            .click(event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}valignment`,
                        `${fieldPrefix}verticalAlignment`, __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.top, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.buttonGroup, rb);
                    rb.executeCommand(cmd);
                }
            });
        elVAlignment.append(elVAlignmentTop);
        let elVAlignmentMiddle = $(`<button id="rbro_${idPrefix}valignment_middle"
                class="rbroButton rbroActionButton rbroIcon-align-middle" type="button" value="middle"
                title="${rb.getLabel('styleVAlignmentMiddle')}"></button>`)
            .click(event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}valignment`,
                        `${fieldPrefix}verticalAlignment`, __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.middle, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.buttonGroup, rb);
                    rb.executeCommand(cmd);
                }
            });
        elVAlignment.append(elVAlignmentMiddle);
        let elVAlignmentBottom = $(`<button id="rbro_${idPrefix}valignment_bottom"
                class="rbroButton rbroActionButton rbroIcon-align-bottom" type="button" value="bottom"
                title="${rb.getLabel('styleVAlignmentBottom')}"></button>`)
            .click(event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}valignment`,
                        `${fieldPrefix}verticalAlignment`, __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.bottom, __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.buttonGroup, rb);
                    rb.executeCommand(cmd);
                }
            });
        elVAlignment.append(elVAlignmentBottom);
        elFormField.append(elVAlignment);
        elDiv.append(elFormField);
        elPanel.append(elDiv);

        if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
            elDiv = $('<div class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_${idPrefix}text_color">${rb.getLabel('styleTextColor')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elTextColorContainer = $('<div class="rbroColorPickerContainer"></div>');
            let elTextColor = $(`<input id="rbro_${idPrefix}text_color">`)
                .change(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}text_color`,
                            `${fieldPrefix}textColor`, elTextColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elTextColorContainer.append(elTextColor);
            elFormField.append(elTextColorContainer);
            elDiv.append(elFormField);
            elPanel.append(elDiv);
            __WEBPACK_IMPORTED_MODULE_3__utils__["g" /* initColorPicker */](elTextColor, rb);
        }

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_${idPrefix}background_color">${rb.getLabel('styleBackgroundColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBgColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elBgColor = $(`<input id="rbro_${idPrefix}background_color">`)
            .change(event => {
                if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}background_color`,
                        `${fieldPrefix}backgroundColor`, elBgColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, rb);
                    rb.executeCommand(cmd);
                }
            });
        elBgColorContainer.append(elBgColor);
        elFormField.append(elBgColorContainer);
        elDiv.append(elFormField);
        elPanel.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_3__utils__["g" /* initColorPicker */](elBgColor, rb, { allowEmpty: true });

        if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
            elDiv = $('<div class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_${idPrefix}font">${rb.getLabel('styleFont')}:</label>`);
            elFormField = $('<div class="rbroFormField rbroSplit rbroSelectFont"></div>');
            let strFont = `<select id="rbro_${idPrefix}font">`;
            for (let font of rb.getFonts()) {
                strFont += `<option value="${font.value}">${font.name}</option>`;
            }
            strFont += '</select>';
            let elFont = $(strFont)
                .change(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}font`,
                            `${fieldPrefix}font`, elFont.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.select, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elFont);
            let strFontSize = `<select id="rbro_${idPrefix}font_size">`;
            for (let size of [8,9,10,11,12,13,14,15,16,18,20,22,24,26,28,32,36,40,44,48,54,60,66,72,80]) {
                strFontSize += `<option value="${size}">${size}</option>`;
            }
            strFontSize += '</select>';
            let elFontSize = $(strFontSize)
                .change(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}font_size`,
                            `${fieldPrefix}fontSize`, elFontSize.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.select, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elFontSize);
            elFormField.append(`<span>${rb.getLabel('styleFontSizeUnit')}</span>`);
            elDiv.append(elFormField);
            elPanel.append(elDiv);

            elDiv = $('<div class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_${idPrefix}line_spacing">${rb.getLabel('styleLineSpacing')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elLineSpacing = $(`<select id="rbro_${idPrefix}line_spacing">
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                </select>`)
                .change(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}line_spacing`,
                            `${fieldPrefix}lineSpacing`, elLineSpacing.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.select, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elLineSpacing);
            elDiv.append(elFormField);
            elPanel.append(elDiv);

            let elBorderDiv = $(`<div id="rbro_${idPrefix}border_div"></div>`);
            elDiv = $('<div class="rbroFormRow"></div>');
            elDiv.append(`<label>${rb.getLabel('styleBorder')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elBorderStyle = $(`<div id="rbro_${idPrefix}border"></div>`);
            let elBorderAll = $(`<button id="rbro_${idPrefix}border_all" class="rbroButton rbroActionButton rbroIcon-border-all"
                    type="button" value="${fieldPrefix}borderAll"
                    title="${rb.getLabel('styleBorderAll')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}border_all`,
                            `${fieldPrefix}borderAll`, !elBorderAll.hasClass('rbroButtonActive'),
                            __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elBorderStyle.append(elBorderAll);
            let elBorderLeft = $(`<button id="rbro_${idPrefix}border_left" class="rbroButton rbroActionButton rbroIcon-border-left"
                    type="button" value="${fieldPrefix}borderLeft"
                    title="${rb.getLabel('orientationLeft')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}border_left`,
                            `${fieldPrefix}borderLeft`, !elBorderLeft.hasClass('rbroButtonActive'),
                            __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elBorderStyle.append(elBorderLeft);
            let elBorderTop = $(`<button id="rbro_${idPrefix}border_top" class="rbroButton rbroActionButton rbroIcon-border-top"
                    type="button" value="${fieldPrefix}borderTop"
                    title="${rb.getLabel('orientationTop')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}border_top`,
                            `${fieldPrefix}borderTop`, !elBorderTop.hasClass('rbroButtonActive'),
                            __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elBorderStyle.append(elBorderTop);
            let elBorderRight = $(`<button id="rbro_${idPrefix}border_right" class="rbroButton rbroActionButton rbroIcon-border-right"
                    type="button" value="${fieldPrefix}borderRight"
                    title="${rb.getLabel('orientationRight')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}border_right`,
                            `${fieldPrefix}borderRight`, !elBorderRight.hasClass('rbroButtonActive'),
                            __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elBorderStyle.append(elBorderRight);
            let elBorderBottom = $(`<button id="rbro_${idPrefix}border_bottom" class="rbroButton rbroActionButton rbroIcon-border-bottom"
                    type="button" value="${fieldPrefix}borderBottom"
                    title="${rb.getLabel('orientationBottom')}"></button>`)
                .click(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}border_bottom`,
                            `${fieldPrefix}borderBottom`, !elBorderBottom.hasClass('rbroButtonActive'),
                            __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elBorderStyle.append(elBorderBottom);
            elFormField.append(elBorderStyle);
            elDiv.append(elFormField);
            elBorderDiv.append(elDiv);

            elDiv = $('<div class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_${idPrefix}border_color">${rb.getLabel('styleBorderColor')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elBorderColorContainer = $('<div class="rbroColorPickerContainer"></div>');
            let elBorderColor = $(`<input id="rbro_${idPrefix}border_color">`)
                .change(event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}border_color`,
                            `${fieldPrefix}borderColor`, elBorderColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elBorderColorContainer.append(elBorderColor);
            elFormField.append(elBorderColorContainer);
            elDiv.append(elFormField);
            elBorderDiv.append(elDiv);
            __WEBPACK_IMPORTED_MODULE_3__utils__["g" /* initColorPicker */](elBorderColor, rb);

            elDiv = $('<div class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_${idPrefix}border_width">${rb.getLabel('styleBorderWidth')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elBorderWidth = $(`<input id="rbro_${idPrefix}border_width">`)
                .on('input', event => {
                    if (rb.getDataObject(panel.getSelectedObjId()) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](panel.getSelectedObjId(), `rbro_${idPrefix}border_width`,
                            `${fieldPrefix}borderWidth`, elBorderWidth.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, rb);
                        rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elBorderWidth);
            elDiv.append(elFormField);
            elBorderDiv.append(elDiv);
            __WEBPACK_IMPORTED_MODULE_3__utils__["h" /* setInputDecimal */](elBorderWidth);
            elPanel.append(elBorderDiv);

            StylePanel.renderPaddingControls(elPanel, idPrefix, fieldPrefix, panel, rb);
        }
    }

    show(data) {
        $('#rbro_style_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_style_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {Style} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_style_name').prop('disabled', false);
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_style_name').prop('disabled', true);
        }
        StylePanel.updateStyleData(data, 'style_', '', __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none);
        this.updateErrors();
    }

    static updateStyleData(data, idPrefix, fieldPrefix, elementType) {
        if (data !== null) {
            $(`#rbro_${idPrefix}halignment_left`).prop('disabled', false);
            $(`#rbro_${idPrefix}halignment_center`).prop('disabled', false);
            $(`#rbro_${idPrefix}halignment_right`).prop('disabled', false);
            $(`#rbro_${idPrefix}valignment_top`).prop('disabled', false);
            $(`#rbro_${idPrefix}valignment_middle`).prop('disabled', false);
            $(`#rbro_${idPrefix}valignment_bottom`).prop('disabled', false);
            $(`#rbro_${idPrefix}background_color`).spectrum('enable');
            $(`#rbro_${idPrefix}border_all`).prop('disabled', false);
            $(`#rbro_${idPrefix}border_left`).prop('disabled', false);
            $(`#rbro_${idPrefix}border_top`).prop('disabled', false);
            $(`#rbro_${idPrefix}border_right`).prop('disabled', false);
            $(`#rbro_${idPrefix}border_bottom`).prop('disabled', false);
            $(`#rbro_${idPrefix}border_color`).spectrum('enable');
            $(`#rbro_${idPrefix}border_width`).prop('disabled', false);
            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none) {
                $(`#rbro_${idPrefix}name`).prop('disabled', false);
            }
            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
                $(`#rbro_${idPrefix}bold`).prop('disabled', false);
                $(`#rbro_${idPrefix}italic`).prop('disabled', false);
                $(`#rbro_${idPrefix}underline`).prop('disabled', false);
                $(`#rbro_${idPrefix}halignment_justify`).prop('disabled', false);
                $(`#rbro_${idPrefix}text_color`).spectrum('enable');
                $(`#rbro_${idPrefix}font`).prop('disabled', false);
                $(`#rbro_${idPrefix}font_size`).prop('disabled', false);
                $(`#rbro_${idPrefix}line_spacing`).prop('disabled', false);
                $(`#rbro_${idPrefix}padding_top`).prop('disabled', false);
                $(`#rbro_${idPrefix}padding_left`).prop('disabled', false);
                $(`#rbro_${idPrefix}padding_right`).prop('disabled', false);
                $(`#rbro_${idPrefix}padding_bottom`).prop('disabled', false);
            }

            $(`#rbro_${idPrefix}halignment_left`).parent().find('button').removeClass('rbroButtonActive');
            let horizontalAlignment = data.getValue(`${fieldPrefix}horizontalAlignment`);
            if (horizontalAlignment === __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.left) {
                $(`#rbro_${idPrefix}halignment_left`).addClass('rbroButtonActive');
            }
            else if (horizontalAlignment === __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.center) {
                $(`#rbro_${idPrefix}halignment_center`).addClass('rbroButtonActive');
            }
            else if (horizontalAlignment === __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.right) {
                $(`#rbro_${idPrefix}halignment_right`).addClass('rbroButtonActive');
            }
            else if (horizontalAlignment === __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.justify) {
                $(`#rbro_${idPrefix}halignment_justify`).addClass('rbroButtonActive');
            }
            $(`#rbro_${idPrefix}valignment_top`).parent().find('button').removeClass('rbroButtonActive');
            let verticalAlignment = data.getValue(`${fieldPrefix}verticalAlignment`);
            if (verticalAlignment == __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.top) {
                $(`#rbro_${idPrefix}valignment_top`).addClass('rbroButtonActive');
            }
            else if (verticalAlignment === __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.middle) {
                $(`#rbro_${idPrefix}valignment_middle`).addClass('rbroButtonActive');
            }
            else if (verticalAlignment === __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */].alignment.bottom) {
                $(`#rbro_${idPrefix}valignment_bottom`).addClass('rbroButtonActive');
            }

            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.image) {
                $(`#rbro_${idPrefix}background_color`).spectrum("set", data.getValue(`${fieldPrefix}backgroundColor`));
                if (data.getValue(`${fieldPrefix}borderAll`)) {
                    $(`#rbro_${idPrefix}border_all`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}border_all`).removeClass('rbroButtonActive');
                }
                if (data.getValue(`${fieldPrefix}borderLeft`)) {
                    $(`#rbro_${idPrefix}border_left`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}border_left`).removeClass('rbroButtonActive');
                }
                if (data.getValue(`${fieldPrefix}borderTop`)) {
                    $(`#rbro_${idPrefix}border_top`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}border_top`).removeClass('rbroButtonActive');
                }
                if (data.getValue(`${fieldPrefix}borderRight`)) {
                    $(`#rbro_${idPrefix}border_right`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}border_right`).removeClass('rbroButtonActive');
                }
                if (data.getValue(`${fieldPrefix}borderBottom`)) {
                    $(`#rbro_${idPrefix}border_bottom`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}border_bottom`).removeClass('rbroButtonActive');
                }
                $(`#rbro_${idPrefix}border_color`).spectrum("set", data.getValue(`${fieldPrefix}borderColor`));
                $(`#rbro_${idPrefix}border_width`).val(data.getValue(`${fieldPrefix}borderWidth`));
            }

            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none) {
                $(`#rbro_${idPrefix}name`).val(data.getName());
            }
            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
                if (data.getValue(`${fieldPrefix}bold`)) {
                    $(`#rbro_${idPrefix}bold`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}bold`).removeClass('rbroButtonActive');
                }
                if (data.getValue(`${fieldPrefix}italic`)) {
                    $(`#rbro_${idPrefix}italic`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}italic`).removeClass('rbroButtonActive');
                }
                if (data.getValue(`${fieldPrefix}underline`)) {
                    $(`#rbro_${idPrefix}underline`).addClass('rbroButtonActive');
                } else {
                    $(`#rbro_${idPrefix}underline`).removeClass('rbroButtonActive');
                }
                $(`#rbro_${idPrefix}text_color`).spectrum("set", data.getValue(`${fieldPrefix}textColor`));
                $(`#rbro_${idPrefix}font`).val(data.getValue(`${fieldPrefix}font`));
                $(`#rbro_${idPrefix}font_size`).val(data.getValue(`${fieldPrefix}fontSize`));
                $(`#rbro_${idPrefix}line_spacing`).val(data.getValue(`${fieldPrefix}lineSpacing`));
                $(`#rbro_${idPrefix}padding_top`).val(data.getValue(`${fieldPrefix}paddingTop`));
                $(`#rbro_${idPrefix}padding_left`).val(data.getValue(`${fieldPrefix}paddingLeft`));
                $(`#rbro_${idPrefix}padding_right`).val(data.getValue(`${fieldPrefix}paddingRight`));
                $(`#rbro_${idPrefix}padding_bottom`).val(data.getValue(`${fieldPrefix}paddingBottom`));
            }
        } else {
            $(`#rbro_${idPrefix}halignment_left`).prop('disabled', true);
            $(`#rbro_${idPrefix}halignment_center`).prop('disabled', true);
            $(`#rbro_${idPrefix}halignment_right`).prop('disabled', true);
            $(`#rbro_${idPrefix}valignment_top`).prop('disabled', true);
            $(`#rbro_${idPrefix}valignment_middle`).prop('disabled', true);
            $(`#rbro_${idPrefix}valignment_bottom`).prop('disabled', true);
            $(`#rbro_${idPrefix}background_color`).spectrum('disable');
            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.image) {
                $(`#rbro_${idPrefix}border_left`).prop('disabled', true);
                $(`#rbro_${idPrefix}border_top`).prop('disabled', true);
                $(`#rbro_${idPrefix}border_right`).prop('disabled', true);
                $(`#rbro_${idPrefix}border_bottom`).prop('disabled', true);
                $(`#rbro_${idPrefix}border_color`).spectrum('disable');
                $(`#rbro_${idPrefix}border_width`).prop('disabled', true);
            }

            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none) {
                $(`#rbro_${idPrefix}name`).prop('disabled', true);
            }
            if (elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.none || elementType === __WEBPACK_IMPORTED_MODULE_2__elements_DocElement__["a" /* default */].type.text) {
                $(`#rbro_${idPrefix}bold`).prop('disabled', true);
                $(`#rbro_${idPrefix}italic`).prop('disabled', true);
                $(`#rbro_${idPrefix}underline`).prop('disabled', true);
                $(`#rbro_${idPrefix}halignment_justify`).prop('disabled', true);
                $(`#rbro_${idPrefix}text_color`).spectrum('disable');
                $(`#rbro_${idPrefix}font`).prop('disabled', true);
                $(`#rbro_${idPrefix}font_size`).prop('disabled', true);
                $(`#rbro_${idPrefix}line_spacing`).prop('disabled', true);
                $(`#rbro_${idPrefix}padding_top`).prop('disabled', true);
                $(`#rbro_${idPrefix}padding_left`).prop('disabled', true);
                $(`#rbro_${idPrefix}padding_right`).prop('disabled', true);
                $(`#rbro_${idPrefix}padding_bottom`).prop('disabled', true);
            }
        }
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_style_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_style_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StylePanel;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


/**
 * Data object containing all document properties like page size, margins, etc.
 * @class
 */
class DocumentProperties {
    constructor(rb) {
        this.rb = rb;
        this.id = '0_document_properties';
        this.panelItem = null;
        this.errors = [];

        this.pageFormat = DocumentProperties.pageFormat.A4;
        this.pageWidth = '';
        this.pageHeight = '';
        this.unit = DocumentProperties.unit.mm;
        this.orientation = DocumentProperties.orientation.portrait;
        this.contentHeight = '';
        this.marginLeft = '';
        this.marginLeftVal = 0;
        this.marginTop = '';
        this.marginTopVal = 0;
        this.marginRight = '';
        this.marginRightVal = 0;
        this.marginBottom = '';
        this.marginBottomVal = 0;

        this.header = true;
        this.headerSize = '80';
        this.headerDisplay = DocumentProperties.display.always;
        this.footer = true;
        this.footerSize = '80';
        this.footerDisplay = DocumentProperties.display.always;

        this.headerSizeVal = this.header ? __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.headerSize) : 0;
        this.footerSizeVal = this.footer ? __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.footerSize) : 0;

        this.patternLocale = rb.getProperty('patternLocale');
        this.patternCurrencySymbol = rb.getProperty('patternCurrencySymbol');

        // width and height in pixel
        this.width = 0;
        this.height = 0;
    }

    setInitialData(initialData) {
        for (let key in initialData) {
            if (initialData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = initialData[key];
            }
        }
        this.headerSizeVal = this.header ? __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.headerSize) : 0;
        this.footerSizeVal = this.footer ? __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.footerSize) : 0;
        this.marginLeftVal = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.marginLeft);
        this.marginTopVal = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.marginTop);
        this.marginRightVal = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.marginRight);
        this.marginBottomVal = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.marginBottom);
    }

    /**
     * Called after initialization is finished.
     */
    setup() {
        let size = this.getPageSize();
        this.updatePageSize(size);
        this.rb.getDocument().updatePageMargins();
        this.rb.getDocument().updateHeader();
        this.rb.getDocument().updateFooter();
        this.updateHeader();
        this.updateFooter();
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['pageFormat', 'pageWidth', 'pageHeight', 'unit', 'orientation',
            'contentHeight', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom',
            'header', 'headerSize', 'headerDisplay', 'footer', 'footerSize', 'footerDisplay',
            'patternLocale', 'patternCurrencySymbol'];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.rb.getLabel('documentProperties');
    }

    getPanelItem() {
        return this.panelItem;
    }

    setPanelItem(panelItem) {
        this.panelItem = panelItem;
    }

    getValue(field) {
        return this[field];
    }

    setValue(field, value, elSelector, isShown) {
        this[field] = value;
        if (field === 'marginLeft' || field === 'marginTop' || field === 'marginRight' || field === 'marginBottom') {
            this[field + 'Val'] = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](value);
            this.rb.getDocument().updatePageMargins();
            this.rb.getDocument().updateHeader();
            this.rb.getDocument().updateFooter();
        } else if (field === 'header') {
            this.updateHeader();
        } else if (field === 'footer') {
            this.updateFooter();
        }
        if (field === 'header' || field === 'headerSize') {
            this.rb.getDocument().updateHeader();
            this.headerSizeVal = this.header ? __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.headerSize) : 0;
        }
        if (field === 'footer' || field === 'footerSize') {
            this.rb.getDocument().updateFooter();
            this.footerSizeVal = this.footer ? __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.footerSize) : 0;
        }
        if (field === 'pageFormat' ||field === 'pageWidth' || field === 'pageHeight' || field === 'unit' ||
                field === 'orientation' || field === 'contentHeight' ||
                field === 'marginTop' || field === 'marginBottom') {
            let size = this.getPageSize();
            this.updatePageSize(size);
        }
    }

    updatePageSize(size) {
        this.width = size.width;
        this.height = size.height;
        this.rb.getDocument().updatePageSize(size.width, size.height);
    }

    updateHeader() {
        if (this.header) {
            this.rb.getMainPanel().showHeader();
        } else {
            this.rb.getMainPanel().hideHeader();
        }
    }

    updateFooter() {
        if (this.footer) {
            this.rb.getMainPanel().showFooter();
        } else {
            this.rb.getMainPanel().hideFooter();
        }
    }

    /**
     * Returns page size in pixels at 72 dpi.
     * @returns {Object} width, height
     */
    getPageSize() {
        let pageWidth;
        let pageHeight;
        let unit;
        let dpi = 72;
        if (this.pageFormat === DocumentProperties.pageFormat.A4) {
            if (this.orientation === DocumentProperties.orientation.portrait) {
                pageWidth = 210;
                pageHeight = 297;
            } else {
                pageWidth = 297;
                pageHeight = 210;
            }
            unit = DocumentProperties.unit.mm;
        } else if (this.pageFormat === DocumentProperties.pageFormat.A5) {
            if (this.orientation === DocumentProperties.orientation.portrait) {
                pageWidth = 148;
                pageHeight = 210;
            } else {
                pageWidth = 210;
                pageHeight = 148;
            }
            unit = DocumentProperties.unit.mm;
        } else if (this.pageFormat === DocumentProperties.pageFormat.letter) {
            if (this.orientation === DocumentProperties.orientation.portrait) {
                pageWidth = 8.5;
                pageHeight = 11;
            } else {
                pageWidth = 11;
                pageHeight = 8.5;
            }
            unit = DocumentProperties.unit.inch;
        } else {
            pageWidth = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.pageWidth);
            pageHeight = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.pageHeight);
            unit = this.unit;
        }
        if (unit === DocumentProperties.unit.mm) {
            pageWidth = Math.round((dpi * pageWidth) / 25.4);
            pageHeight = Math.round((dpi * pageHeight) / 25.4);
        } else {
            pageWidth = Math.round(dpi * pageWidth);
            pageHeight = Math.round(dpi * pageHeight);
        }
        if (this.contentHeight.trim() !== '') {
            pageHeight = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.contentHeight) +
                    this.marginTopVal + this.marginBottomVal + this.headerSizeVal + this.footerSizeVal;
        }
        return { width: pageWidth, height: pageHeight };
    }

    /**
     * Returns size of content band without any margins.
     * @returns {Object} width, height
     */
    getContentSize() {
        let size = this.getPageSize();
        let height;
        if (this.contentHeight.trim() !== '') {
            height = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* convertInputToNumber */](this.contentHeight);
        } else {
            height = size.height - this.marginTopVal - this.marginBottomVal -
                this.headerSizeVal - this.footerSizeVal;
        }
        return { width: size.width - this.marginLeftVal - this.marginRightVal,
            height: height };
    }

    addError(error) {
        this.errors.push(error);
    }

    clearErrors() {
        this.errors = [];
    }

    getErrors() {
        return this.errors;
    }

    remove() {
    }

    select() {
    }

    deselect() {
    }

    toJS() {
        let ret = {};
        for (let field of this.getFields()) {
            ret[field] = this.getValue(field);
        }
        return ret;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DocumentProperties;


DocumentProperties.outputFormat = {
    pdf: 'pdf',
    xlsx: 'xlsx'
};

DocumentProperties.pageFormat = {
    A4: 'A4',
    A5: 'A5',
    letter: 'letter', // 215.9 x 279.4 mm
    userDefined: 'user_defined'
};

DocumentProperties.unit = {
    mm: 'mm',
    inch: 'inch'
};

DocumentProperties.orientation = {
    portrait: 'portrait',
    landscape: 'landscape'
};

DocumentProperties.display = {
    always: 'always',
    notOnFirstPage: 'not_on_first_page'
};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TableBandElement__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_MainPanelItem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(0);







/**
 * Table doc element. Each table cell consists of a text element.
 * @class
 */
class TableElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementTable'), id, 200, 40, rb);
        this.setupComplete = false;
        this.dataSource = '';
        this.borderColor = '#000000';
        this.borderWidth = '1';
        this.border = TableElement.border.grid;
        this.header = true;
        this.footer = false;
        this.contentRows = '1';
        this.columns = '2';
        this.headerData = null;
        this.contentDataRows = [];
        this.footerData = null;
        this.spreadsheet_hide = false;
        this.spreadsheet_column = '';
        this.spreadsheet_addEmptyRow = false;

        this.setInitialData(initialData);

        this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.borderWidth);
    }

    setup(openPanelItem) {
        super.setup(openPanelItem);
        this.createElement();
        this.updateDisplay();

        this.headerData = this.createBand('header', -1, null);
        let contentRows = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.contentRows);
        if (contentRows < 1) {
            contentRows = 1;
        }
        let contentDataRows = [];
        for (let i=0; i < contentRows; i++) {
            contentDataRows.push(this.createBand('content', i, null));
        }
        this.contentDataRows = contentDataRows;
        this.footerData = this.createBand('footer', -1, null);
        this.setupComplete = true;
        this.updateWidth();
        this.updateStyle();
        this.updateName();
        if (openPanelItem) {
            this.panelItem.open();
        }
    }

    createBand(band, index, dataValues) {
        let data;
        let dataKey = band + (band === 'content' ? 'DataRows' : 'Data');
        let dataId;
        let panelItemProperties = { hasChildren: true, showDelete: false };
        if (dataValues) {
            data = dataValues;
        } else if (this[dataKey] && (band !== 'content' || index < this[dataKey].length)) {
            if (band === 'content') {
                data = this[dataKey][index];
            } else {
                data = this[dataKey];
            }
            dataId = data.id;
        } else {
            data = {};
        }
        data.parentId = this.id;
        if (!dataId) {
            dataId = this.rb.getUniqueId();
        }
        if ((band === 'header' && !this.header) || (band === 'footer' && !this.footer)) {
            panelItemProperties.visible = false;
        }
        let bandElement = new __WEBPACK_IMPORTED_MODULE_1__TableBandElement__["a" /* default */](dataId, data, band, this.rb);
        this.rb.addDataObject(bandElement);
        let panelItemBand = new __WEBPACK_IMPORTED_MODULE_4__menu_MainPanelItem__["a" /* default */]('table_band', this.panelItem, bandElement, panelItemProperties, this.rb);
        bandElement.setPanelItem(panelItemBand);
        this.panelItem.appendChild(panelItemBand);
        bandElement.setup();
        let columns = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.columns);
        bandElement.createColumns(columns, false);
        panelItemBand.open();

        if (band === 'header') {
            bandElement.show(this.header);
        } else if (band === 'footer') {
            bandElement.show(this.footer);
        }
        return bandElement;
    }

    /**
     * Returns highest id of this component including all its child components.
     * @returns {Number}
     */
    getMaxId() {
        let maxId = this.id;
        let tempId;
        tempId = this.headerData.getMaxId();
        if (tempId > maxId) {
            maxId = tempId;
        }
        for (let i=0; i < this.contentDataRows.length; i++) {
            tempId = this.contentDataRows[i].getMaxId();
            if (tempId > maxId) {
                maxId = tempId;
            }
        }
        tempId = this.footerData.getMaxId();
        if (tempId > maxId) {
            maxId = tempId;
        }
        return maxId;
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);
        if (field === 'dataSource') {
            this.updateName();
        } else if (field === 'header') {
            this.headerData.show(value);
            if (value) {
                this.headerData.getPanelItem().show();
            } else {
                this.headerData.getPanelItem().hide();
            }
        } else if (field === 'footer') {
            this.footerData.show(value);
            if (value) {
                this.footerData.getPanelItem().show();
            } else {
                this.footerData.getPanelItem().hide();
            }
        } else if (field.indexOf('border') !== -1) {
            if (field === 'borderWidth') {
                this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](value);
            }
            this.updateStyle();
        }
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { left: this.rb.toPixel(x), top: this.rb.toPixel(y) };
            this.el.css(props);
        }
    }

    updateStyle() {
        let elTable = this.el.find('table');
        let i;
        if (this.border === TableElement.border.grid || this.border === TableElement.border.frameRow ||
                this.border === TableElement.border.frame) {
            elTable.css({
                'border-style': 'solid',
                'border-width': this.borderWidthVal + 'px',
                'border-color': this.borderColor
            });
        } else {
            elTable.css({ 'border-style': 'none' });
        }
        let styleProperties;
        if (this.border === TableElement.border.grid || this.border === TableElement.border.frameRow ||
                this.border === TableElement.border.row) {
            styleProperties = {
                'border-style': 'solid none solid none',
                'border-width': this.borderWidthVal + 'px',
                'border-color': this.borderColor
            };
        } else {
            styleProperties = { 'border-style': 'none' };
        }
        this.headerData.getElement().css(styleProperties);
        for (i=0; i < this.contentDataRows.length; i++) {
            this.contentDataRows[i].getElement().css(styleProperties);
        }
        this.footerData.getElement().css(styleProperties);

        if (this.border === TableElement.border.grid) {
            styleProperties = {
                'border-style': 'none solid none solid',
                'border-width': this.borderWidthVal + 'px',
                'border-color': this.borderColor
            };
        } else {
            styleProperties = { 'border-style': 'none' };
        }
        this.headerData.getElement().find('td').css(styleProperties);
        for (i=0; i < this.contentDataRows.length; i++) {
            this.contentDataRows[i].getElement().find('td').css(styleProperties);
        }
        this.footerData.getElement().find('td').css(styleProperties);

        this.el.removeClass('rbroBorderTableGrid rbroBorderTableFrameRow rbroBorderTableFrame rbroBorderTableRow rbroBorderTableNone');
        this.el.addClass('rbroBorderTable' + this.border.charAt(0).toUpperCase() + this.border.slice(1));
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'x', 'y', 'dataSource', 'columns', 'header', 'contentRows', 'footer',
            'border', 'borderColor', 'borderWidth',
            'spreadsheet_hide', 'spreadsheet_column', 'spreadsheet_addEmptyRow'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.table;
    }

    select() {
        super.select();
        let elSizerContainer = this.getSizerContainerElement();
        for (let sizer of ['NE', 'SE', 'SW', 'NW']) {
            elSizerContainer.append($(`<div class="rbroSizer rbroSizer${sizer} rbroSizerInactive"></div>`));
        }
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return [];
    }

    getXTagId() {
        return 'rbro_table_element_position_x';
    }

    getYTagId() {
        return 'rbro_table_element_position_y';
    }

    getWidthTagId() {
        return 'rbro_table_element_width';
    }

    getHeightTagId() {
        return 'rbro_table_element_height';
    }

    isDroppingAllowed() {
        return false;
    }

    createElement() {
        this.el = $(`<div class="rbroDocElement rbroTableElement">
                <table id="rbro_el_table${this.id}">
                    <thead id="rbro_el_table_header${this.id}">
                    </thead>
                    <tbody id="rbro_el_table_content${this.id}">
                    </tbody>
                    <tfoot id="rbro_el_table_footer${this.id}">
                    </tfoot>
                </table>
            </div>`);
        this.appendToContainer();
        this.registerEventHandlers();
    }

    remove() {
        super.remove();
        this.rb.deleteDataObject(this.headerData);
        this.headerData.remove();
        this.headerData = null;
        for (let i=0; i < this.contentDataRows.length; i++) {
            this.rb.deleteDataObject(this.contentDataRows[i]);
            this.contentDataRows[i].remove();
        }
        this.contentDataRows = [];
        this.rb.deleteDataObject(this.footerData);
        this.footerData.remove();
        this.footerData = null;
    }

    /**
     * Is called when column width of a single column was changed to update the column width of all table bands.
     * @param {Number} columnIndex - index of changed column.
     * @param {Number} width - new column width.
     * @param {Boolean} updateTableWidth - if true the table width will be updated as well.
     */
    updateColumnWidth(columnIndex, width, updateTableWidth) {
        if (this.setupComplete) {
            this.headerData.updateColumnWidth(columnIndex, width);
            for (let i=0; i < this.contentDataRows.length; i++) {
                this.contentDataRows[i].updateColumnWidth(columnIndex, width);
            }
            this.footerData.updateColumnWidth(columnIndex, width);
            if (updateTableWidth) {
                this.updateWidth();
            }
        }
    }

    /**
     * Update table width based on width of all cells of content band.
     */
    updateWidth() {
        if (this.setupComplete) {
            let width = this.headerData.getWidth();
            this.width = '' + width;
            this.widthVal = width;
            $(`#rbro_el_table${this.id}`).css('width', (this.widthVal + 1) + 'px');
        }
    }

    /**
     * Is called when column width of a cell was changed to update all DOM elements accordingly.
     * @param {TableBandElement} tableBand - band containing the changed cell.
     * @param {Number} columnIndex - column index of changed cell.
     * @param {Number} newColumnWidth
     */
    notifyColumnWidthResized(tableBand, columnIndex, newColumnWidth) {
        if (!this.setupComplete)
            return;

        if (tableBand !== this.headerData) {
            let column = this.headerData.getColumn(columnIndex);
            if (column !== null) {
                column.updateDisplayInternalNotify(0, 0, newColumnWidth, column.getValue('heightVal'), false);
            }
        }
        for (let i=0; i < this.contentDataRows.length; i++) {
            if (tableBand !== this.contentDataRows[i]) {
                let column = this.contentDataRows[i].getColumn(columnIndex);
                if (column !== null) {
                    column.updateDisplayInternalNotify(0, 0, newColumnWidth, column.getValue('heightVal'), false);
                }
            }
        }
        if (tableBand !== this.footerData) {
            let column = this.footerData.getColumn(columnIndex);
            if (column !== null) {
                column.updateDisplayInternalNotify(0, 0, newColumnWidth, column.getValue('heightVal'), false);
            }
        }
        let width = this.headerData.getWidth();
        let column = this.headerData.getColumn(columnIndex);
        if (column !== null) {
            width -= column.getValue('widthVal') - newColumnWidth;
        }
        $(`#rbro_el_table${this.id}`).css('width', (width + 1) + 'px');
    }

    updateName() {
        this.name = this.rb.getLabel('docElementTable');
        if (this.dataSource.trim() !== '') {
            this.name += ' ' + this.dataSource;
        }
        $(`#rbro_menu_item_name${this.id}`).text(this.name);
    }

    /**
     * Returns all parameters of the data source (which must be an array parameter).
     * @returns {[Object]} contains the data source name and all parameters of the data source.
     */
    getDataSource() {
        let parameters = [];
        let dataSource = this.dataSource.trim();
        let dataSourceParameter = '';
        if (dataSource.length >= 3 && dataSource.substr(0, 2) === '${' &&
                dataSource.charAt(dataSource.length - 1) === '}') {
            dataSourceParameter = dataSource.substring(2, dataSource.length - 1);
            let param = this.rb.getParameterByName(dataSourceParameter);
            if (param !== null && param.getValue('type') === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array) {
                parameters = param.getChildren();
            }
        }
        return { name: dataSourceParameter, parameters: parameters };
    }

    addChildren(docElements) {
        let i;
        docElements.push(this.headerData);
        for (i=0; i < this.contentDataRows.length; i++) {
            docElements.push(this.contentDataRows[i]);
        }
        docElements.push(this.footerData);
        this.headerData.addChildren(docElements);
        for (i=0; i < this.contentDataRows.length; i++) {
            this.contentDataRows[i].addChildren(docElements);
        }
        this.footerData.addChildren(docElements);
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_table_element_data_source', 'dataSource', cmdGroup);
    }

    /**
     * Adds commands to command group parameter to recreate table with new column count.
     * @param {Number} columns - requested new column count.
     * @param {CommandGroupCmd} cmdGroup - possible commands will be added to this command group.
     * @returns {Number} either new column count or existing column count in case there is not enough space
     * for all column.
     */
    addCommandsForChangedColumns(columns, cmdGroup) {
        const COLUMN_MIN_WIDTH = 20;
        let existingColumns = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.columns);
        let maxColumns = Math.floor(this.widthVal / COLUMN_MIN_WIDTH);
        if (columns > existingColumns && columns > maxColumns) {
            // not enough space for all columns
            return existingColumns;
        }

        // delete table with current settings and restore below with new columns, necessary for undo/redo
        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__["a" /* default */](false, this.getPanelItem().getPanelName(),
            this.toJS(), this.id, this.getContainerId(), -1, this.rb);
        cmdGroup.addCommand(cmd);

        if (columns > existingColumns) {
            let newColumns = columns - existingColumns;
            let spaceNeeded = newColumns * COLUMN_MIN_WIDTH;
            // reduce width of all existing columns until there is enough space
            let i = existingColumns - 1;
            while (i >= 0) {
                let column = this.headerData.getColumn(i);
                let freeSpace = column.getValue('widthVal') - COLUMN_MIN_WIDTH;
                let newWidth = COLUMN_MIN_WIDTH;
                if (freeSpace > spaceNeeded) {
                    newWidth = column.getValue('widthVal') - spaceNeeded;
                }
                this.updateColumnWidth(i, newWidth, false);
                spaceNeeded -= freeSpace;
                if (spaceNeeded <= 0)
                    break;
                i--;
            }
        } else if (columns < existingColumns) {
            let usedWidth = 0;
            for (let i=0; i < columns; i++) {
                usedWidth += this.headerData.getColumn(i).getValue('widthVal');
            }
            // add remaining space to last column
            let column = this.headerData.getColumn(columns - 1);
            if (this.widthVal - usedWidth > 0) {
                this.updateColumnWidth(columns - 1, column.getValue('widthVal') + (this.widthVal - usedWidth), false);
            }
        }

        this.columns = columns;
        this.headerData.createColumns(columns, true);
        for (let i=0; i < this.contentDataRows.length; i++) {
            this.contentDataRows[i].createColumns(columns, true);
        }
        this.footerData.createColumns(columns, true);

        // restore table with new column count and updated settings
        cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__["a" /* default */](true, this.getPanelItem().getPanelName(),
            this.toJS(), this.id, this.getContainerId(), -1, this.rb);
        cmdGroup.addCommand(cmd);
        
        return columns;
    }

    /**
     * Adds commands to command group parameter to recreate table with new content rows.
     * @param {Number} contentRows - new content rows count.
     * @param {CommandGroupCmd} cmdGroup - possible commands will be added to this command group.
     */
    addCommandsForChangedContentRows(contentRows, cmdGroup) {
        if (contentRows === __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* convertInputToNumber */](this.contentRows)) {
            return;
        }
        // delete table with current settings and restore below with new columns, necessary for undo/redo
        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__["a" /* default */](false, this.getPanelItem().getPanelName(),
            this.toJS(), this.id, this.getContainerId(), -1, this.rb);
        cmdGroup.addCommand(cmd);

        let i;
        if (contentRows < this.contentDataRows.length) {
            for (i = contentRows; i < this.contentDataRows.length; i++) {
                this.rb.deleteDataObject(this.contentDataRows[i]);
                this.contentDataRows[i].remove();
            }
            this.contentDataRows.splice(contentRows, this.contentDataRows.length - contentRows);
        } else {
            let data;
            if (this.contentDataRows.length > 0) {
                data = { height: this.contentDataRows[0].height, columnData: [] };
                for (let columnData of this.contentDataRows[0].columnData) {
                    data.columnData.push({ width: columnData.width });
                }
            }
            for (i = this.contentDataRows.length; i < contentRows; i++) {
                this.contentDataRows.push(this.createBand('content', i, data));
            }
        }

        this.contentRows = '' + contentRows;
        // restore table with new content rows and updated settings
        cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__["a" /* default */](true, this.getPanelItem().getPanelName(),
            this.toJS(), this.id, this.getContainerId(), -1, this.rb);
        cmdGroup.addCommand(cmd);
    }

    toJS() {
        let ret = super.toJS();
        ret['headerData'] = this.headerData.toJS();
        let contentDataRows = [];
        for (let i=0; i < this.contentDataRows.length; i++) {
            contentDataRows.push(this.contentDataRows[i].toJS());
        }
        ret['contentDataRows'] = contentDataRows;
        ret['footerData'] = this.footerData.toJS();
        return ret;
    }

    static removeIds(data) {
        for (let bandKey of ['headerData', 'footerData']) {
            TableElement.removeBandIds(data[bandKey]);
        }
        for (let i=0; i < data.contentDataRows.length; i++) {
            TableElement.removeBandIds(data.contentDataRows[i]);
        }
    }

    static removeBandIds(bandData) {
        delete bandData.id;
        let columns = bandData.columnData;
        for (let column of columns) {
            delete column.id;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TableElement;


TableElement.border = {
    grid: 'grid',
    frameRow: 'frame_row',
    frame: 'frame',
    row: 'row',
    none: 'none'
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextElement__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Table text doc element. A text element inside a table cell.
 * @class
 */
class TableTextElement extends __WEBPACK_IMPORTED_MODULE_1__TextElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(id, initialData, rb);
        this.columnIndex = initialData.columnIndex;
        this.parentId = initialData.parentId;
        this.tableId = initialData.tableId;
    }

    registerEventHandlers() {
        this.el
            .dblclick(event => {
                if (!this.rb.isSelectedObject(this.id)) {
                    if (this.rb.isSelectedObject(this.tableId)) {
                        this.rb.selectObject(this.id, !event.shiftKey);
                        event.stopPropagation();
                    }
                }
            })
            .mousedown(event => {
                if (!this.rb.isSelectedObject(this.id)) {
                    if (this.rb.isTableElementSelected(this.tableId)) {
                        this.rb.selectObject(this.id, !event.shiftKey);
                        event.stopPropagation();
                    }
                } else {
                    if (event.shiftKey) {
                        this.rb.deselectObject(this.id);
                    }
                    event.stopPropagation();
                }
            });
    }

    getContainerId() {
        let table = this.getTable();
        if (table !== null) {
            return table.getContainerId();
        }
        return null;
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);
        if (field === 'width') {
            let tableObj = this.rb.getDataObject(this.tableId);
            if (tableObj !== null) {
                tableObj.updateColumnWidth(this.columnIndex, value, true);
            }
        } else if (field === 'height') {
            this.updateDisplayInternalNotify(0, 0, this.widthVal, this.heightVal, false);
        }
    }

    updateColumnWidth(width) {
        this.width = width;
        this.widthVal = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](this.width);
        this.updateDisplayInternalNotify(0, 0, this.widthVal, this.heightVal, false);
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        let fields = ['id', 'width', 'height', 'content', 'eval',
            'styleId', 'bold', 'italic', 'underline',
            'horizontalAlignment', 'verticalAlignment', 'textColor', 'backgroundColor', 'font', 'fontSize', 'lineSpacing',
            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
            'removeEmptyElement', 'alwaysPrintOnSamePage', 'pattern',
            'cs_condition', 'cs_styleId', 'cs_bold', 'cs_italic', 'cs_underline',
            'cs_horizontalAlignment', 'cs_verticalAlignment', 'cs_textColor', 'cs_backgroundColor',
            'cs_font', 'cs_fontSize', 'cs_lineSpacing',
            'cs_paddingLeft', 'cs_paddingTop', 'cs_paddingRight', 'cs_paddingBottom'];
        let tableBandObj = this.rb.getDataObject(this.parentId);
        if (tableBandObj !== null && tableBandObj.getValue('bandType') === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.header) {
            fields.push('printIf');
        }
        return fields;
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.tableText;
    }

    updateDisplayInternal(x, y, width, height) {
        this.updateDisplayInternalNotify(x, y, width, height, true);
    }

    updateDisplayInternalNotify(x, y, width, height, notifyTableElement) {
        if (this.el !== null) {
            // set td width to width - 1 because border consumes 1 pixel
            let props = { width: this.rb.toPixel(width - 1) };
            this.el.css(props);
        }
        // update inner text element width
        let contentSize = this.getContentSize(width, height, this.getStyle());
        $(`#rbro_el_content_text${this.id}`).css({ width: this.rb.toPixel(contentSize.width), height: this.rb.toPixel(contentSize.height) });

        if (notifyTableElement) {
            let tableObj = this.rb.getDataObject(this.tableId);
            if (tableObj !== null) {
                let tableBandObj = this.rb.getDataObject(this.parentId);
                tableObj.notifyColumnWidthResized(tableBandObj, this.columnIndex, width);
            }
        }
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return ['E'];
    }

    getXTagId() {
        return '';
    }

    getYTagId() {
        return '';
    }

    getWidthTagId() {
        return 'rbro_text_element_width';
    }

    getHeightTagId() {
        return '';
    }

    hasBorderSettings() {
        return false;
    }

    isDraggingAllowed() {
        return false;
    }

    isDroppingAllowed() {
        return false;
    }

    /**
     * Returns maximum allowed width of element.
     * This is needed when the element is resized by dragging so the resized element does not overflow its container.
     * @returns {Number}.
     */
    getMaxWidth() {
        let tableObj = this.rb.getDataObject(this.tableId);
        let tableBandObj = this.rb.getDataObject(this.parentId);
        if (tableObj !== null && tableBandObj !== null) {
            let contentWidth = this.rb.getDocumentProperties().getContentSize().width;
            let widths = tableBandObj.getColumnWidths();
            let widthOther = 0;  // width of other cells
            for (let i = 0; i < widths.length; i++) {
                if (i !== this.columnIndex) {
                    widthOther += widths[i];
                }
            }
            return contentWidth - widthOther - tableObj.xVal;
        }
        return 0;
    }

    /**
     * Returns x-offset relative to table.
     * @returns {Number}.
     */
    getOffsetX() {
        let tableBandObj = this.rb.getDataObject(this.parentId);
        if (tableBandObj !== null) {
            let widths = tableBandObj.getColumnWidths();
            let offsetX = 0;
            for (let i = 0; i < this.columnIndex; i++) {
                offsetX += widths[i];
            }
            return offsetX;
        }
        return 0;
    }

    createElement() {
        this.el = $(`<td id="rbro_el${this.id}" class="rbroTableTextElement"></td>`)
            .append($(`<div id="rbro_el_content${this.id}" class="rbroContentContainerHelper"></div>`)
                .append($(`<div id="rbro_el_content_text${this.id}" class="rbroDocElementContentText"></div>`)
                    .append($(`<span id="rbro_el_content_text_data${this.id}"></span>`))
            ));
        $(`#rbro_el_table_band${this.parentId}`).append(this.el);
        $(`#rbro_el_content_text_data${this.id}`).text(this.content);
        this.registerEventHandlers();
    }

    getParent() {
        return this.rb.getDataObject(this.parentId);
    }

    getTable() {
        return this.rb.getDataObject(this.tableId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TableTextElement;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Text doc element.
 * @class
 */
class TextElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementText'), id, 100, 20, rb);
        this.content = '';
        this.eval = false;

        this.styleId = '';
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.horizontalAlignment = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].alignment.left;
        this.verticalAlignment = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].alignment.top;
        this.textColor = '#000000';
        this.backgroundColor = '';
        this.font = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].font.helvetica;
        this.fontSize = 12;
        this.lineSpacing = 1;
        this.borderColor = '#000000';
        this.borderWidth = '1';
        this.borderAll = false;
        this.borderLeft = false;
        this.borderTop = false;
        this.borderRight = false;
        this.borderBottom = false;
        this.paddingLeft = '2';
        this.paddingTop = '2';
        this.paddingRight = '2';
        this.paddingBottom = '2';
        
        this.cs_condition = '';
        this.cs_styleId = '';
        this.cs_bold = false;
        this.cs_italic = false;
        this.cs_underline = false;
        this.cs_horizontalAlignment = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].alignment.left;
        this.cs_verticalAlignment = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].alignment.top;
        this.cs_textColor = '#000000';
        this.cs_backgroundColor = '';
        this.cs_font = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].font.helvetica;
        this.cs_fontSize = 12;
        this.cs_lineSpacing = 1;
        this.cs_borderColor = '#000000';
        this.cs_borderWidth = '1';
        this.cs_borderAll = false;
        this.cs_borderLeft = false;
        this.cs_borderTop = false;
        this.cs_borderRight = false;
        this.cs_borderBottom = false;
        this.cs_paddingLeft = '2';
        this.cs_paddingTop = '2';
        this.cs_paddingRight = '2';
        this.cs_paddingBottom = '2';
        
        this.alwaysPrintOnSamePage = true;
        this.pattern = '';

        this.spreadsheet_hide = false;
        this.spreadsheet_column = '';
        this.spreadsheet_colspan = '';
        this.spreadsheet_addEmptyRow = false;

        this.setInitialData(initialData);

        this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](this.borderWidth);
    }

    setup(openPanelItem) {
        super.setup(openPanelItem);
        this.createElement();
        this.updateDisplay();
        this.updateStyle();
        this.updateContent(this.content);
    }

    setValue(field, value, elSelector, isShown) {
        if (field.indexOf('border') !== -1) {
            // Style.setBorderValue needs to be called before super.setValue because it calls updateStyle() which expects
            // the correct border settings
            this[field] = value;
            if (field.substr(0, 3) === 'cs_') {
                __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].setBorderValue(this, field, 'cs_', value, elSelector, isShown);
            } else {
                if (field === 'borderWidth') {
                    this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](value);
                }
                __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].setBorderValue(this, field, '', value, elSelector, isShown);
            }
        }

        super.setValue(field, value, elSelector, isShown);

        if (field === 'content') {
            this.updateContent(value);
        } else if (field === 'width' || field === 'height') {
            this.updateDisplay();
        } else if (field === 'styleId') {
            if (value !== '') {
                $('#rbro_text_element_style_settings').hide();
            } else {
                $('#rbro_text_element_style_settings').show();
            }
        } else if (field === 'cs_styleId') {
            if (value !== '') {
                $('#rbro_text_element_cs_style_settings').hide();
            } else {
                $('#rbro_text_element_cs_style_settings').show();
            }
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'x', 'y', 'width', 'height', 'content', 'eval',
            'styleId', 'bold', 'italic', 'underline',
            'horizontalAlignment', 'verticalAlignment', 'textColor', 'backgroundColor', 'font', 'fontSize',
            'lineSpacing', 'borderColor', 'borderWidth',
            'borderAll', 'borderLeft', 'borderTop', 'borderRight', 'borderBottom',
            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
            'printIf', 'removeEmptyElement', 'alwaysPrintOnSamePage', 'pattern',
            'cs_condition', 'cs_styleId', 'cs_bold', 'cs_italic', 'cs_underline',
            'cs_horizontalAlignment', 'cs_verticalAlignment', 'cs_textColor', 'cs_backgroundColor', 'cs_font', 'cs_fontSize',
            'cs_lineSpacing', 'cs_borderColor', 'cs_borderWidth',
            'cs_borderAll', 'cs_borderLeft', 'cs_borderTop', 'cs_borderRight', 'cs_borderBottom',
            'cs_paddingLeft', 'cs_paddingTop', 'cs_paddingRight', 'cs_paddingBottom',
            'spreadsheet_hide', 'spreadsheet_column', 'spreadsheet_colspan', 'spreadsheet_addEmptyRow'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.text;
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { left: this.rb.toPixel(x), top: this.rb.toPixel(y),
                width: this.rb.toPixel(width), height: this.rb.toPixel(height) };
            this.el.css(props);
        }
        // update inner text element size
        let contentSize = this.getContentSize(width, height, this.getStyle());
        let styleProperties = {};
        styleProperties['width'] = this.rb.toPixel(contentSize.width);
        styleProperties['height'] = this.rb.toPixel(contentSize.height);
        $(`#rbro_el_content_text${this.id}`).css(styleProperties);
    }

    getStyle() {
        let style = this;
        if (this.styleId !== '') {
            let styleObj = this.rb.getDataObject(this.styleId);
            if (styleObj !== null) {
                style = styleObj;
            }
        }
        return style;
    }

    getContentSize(width, height, style) {
        let borderWidth = style.getValue('borderWidthVal');
        width -= __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](style.getValue('paddingLeft')) + __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](style.getValue('paddingRight'));
        if (style.getValue('borderLeft')) {
            width -= borderWidth;
        }
        if (style.getValue('borderRight')) {
            width -= borderWidth;
        }
        height -= __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](style.getValue('paddingTop')) + __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](style.getValue('paddingBottom'));
        if (style.getValue('borderTop')) {
            height -= borderWidth;
        }
        if (style.getValue('borderBottom')) {
            height -= borderWidth;
        }
        return { width: width, height: height };
    }

    updateStyle() {
        let styleProperties = {};
        let borderStyleProperties = {};
        let style = this.getStyle();
        let contentSize = this.getContentSize(this.widthVal, this.heightVal, style);
        let horizontalAlignment = style.getValue('horizontalAlignment');
        let verticalAlignment = style.getValue('verticalAlignment');
        let alignClass = 'rbroDocElementAlign' + horizontalAlignment.charAt(0).toUpperCase() + horizontalAlignment.slice(1);
        let valignClass = 'rbroDocElementVAlign' + verticalAlignment.charAt(0).toUpperCase() + verticalAlignment.slice(1);
        styleProperties['width'] = this.rb.toPixel(contentSize.width);
        styleProperties['height'] = this.rb.toPixel(contentSize.height);
        styleProperties['text-align'] = horizontalAlignment;
        styleProperties['vertical-align'] = verticalAlignment;
        styleProperties['background-color'] = style.getValue('backgroundColor');
        styleProperties['font-weight'] = style.getValue('bold') ? 'bold' : '';
        styleProperties['font-style'] = style.getValue('italic') ? 'italic' : 'normal';
        styleProperties['text-decoration'] = style.getValue('underline') ? 'underline' : 'none';
        styleProperties['color'] = style.getValue('textColor');
        styleProperties['font-family'] = style.getValue('font');
        styleProperties['font-size'] = style.getValue('fontSize') + 'px';
        styleProperties['line-height'] = (style.getValue('lineSpacing') * 100.0) + '%';
        if (style.getValue('borderLeft') || style.getValue('borderTop') ||
                style.getValue('borderRight') || style.getValue('borderBottom')) {
            borderStyleProperties['border-style'] = style.getValue('borderTop') ? 'solid' : 'none';
            borderStyleProperties['border-style'] += style.getValue('borderRight') ? ' solid' : ' none';
            borderStyleProperties['border-style'] += style.getValue('borderBottom') ? ' solid' : ' none';
            borderStyleProperties['border-style'] += style.getValue('borderLeft') ? ' solid' : ' none';
            borderStyleProperties['border-width'] = style.getValue('borderWidthVal') + 'px';
            borderStyleProperties['border-color'] = style.getValue('borderColor');
        } else {
            borderStyleProperties['border-style'] = 'none';
        }
        if (style.getValue('paddingLeft') !== '' || style.getValue('paddingTop') !== '' ||
                style.getValue('paddingRight') !== '' || style.getValue('paddingBottom') !== '') {
            styleProperties['padding'] = this.rb.toPixel(style.getValue('paddingTop'));
            styleProperties['padding'] += ' ' + this.rb.toPixel(style.getValue('paddingRight'));
            styleProperties['padding'] += ' ' + this.rb.toPixel(style.getValue('paddingBottom'));
            styleProperties['padding'] += ' ' + this.rb.toPixel(style.getValue('paddingLeft'));
        } else {
            styleProperties['padding'] = '';
        }
        $(`#rbro_el_content${this.id}`).css(borderStyleProperties);
        $(`#rbro_el_content${this.id}`).removeClass().addClass('rbroContentContainerHelper').addClass(alignClass).addClass(valignClass);
        $(`#rbro_el_content_text${this.id}`).css(styleProperties);
    }

    getXTagId() {
        return 'rbro_text_element_position_x';
    }

    getYTagId() {
        return 'rbro_text_element_position_y';
    }

    getWidthTagId() {
        return 'rbro_text_element_width';
    }

    getHeightTagId() {
        return 'rbro_text_element_height';
    }

    hasBorderSettings() {
        return true;
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroDocElement rbroTextElement"></div>`);
        // rbroContentContainerHelper contains border styles and alignment classes
        // rbroDocElementContentText contains specific styles
        // span is needed to preserve whitespaces and word-wrap of actual text content
        this.el
            .append($(`<div id="rbro_el_content${this.id}" class="rbroContentContainerHelper"></div>`)
                .append($(`<div id="rbro_el_content_text${this.id}" class="rbroDocElementContentText"></div>`)
                    .append($(`<span id="rbro_el_content_text_data${this.id}"></span>`))
            ));
        this.appendToContainer();
        $(`#rbro_el_content_text_data${this.id}`).text(this.content);
        super.registerEventHandlers();
    }

    updateContent(value) {
        if (value.trim() === '') {
            this.name = this.rb.getLabel('docElementText');
        } else {
            this.name = value;
        }
        $(`#rbro_menu_item_name${this.id}`).text(this.name);
        $(`#rbro_menu_item_name${this.id}`).attr('title', this.name);
        $(`#rbro_el_content_text_data${this.id}`).text(value);
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_text_element_content', 'content', cmdGroup);
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_text_element_print_if', 'printIf', cmdGroup);
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_text_element_cs_condition', 'cs_condition', cmdGroup);
    }

    toJS() {
        let ret = super.toJS();
        for (let field of ['borderWidth', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
                'cs_paddingLeft', 'cs_paddingTop', 'cs_paddingRight', 'cs_paddingBottom']) {
            ret[field] = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](this.getValue(field));
        }
        return ret;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextElement;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_MainPanelItem__ = __webpack_require__(8);




/**
 * Command to add and delete a parameter.
 * @class
 */
class AddDeleteParameterCmd {
    constructor(add, initialData, id, parentId, position, rb) {
        this.add = add;
        this.initialData = initialData;
        this.parentId = parentId;
        this.position = position;
        this.rb = rb;
        this.id = id;
    }

    getName() {
        if (this.add) {
            return 'Add parameter';
        } else {
            return 'Delete parameter';
        }
    }

    do() {
        if (this.add) {
            this.addParameter();
        } else {
            this.deleteParameter();
        }
    }

    undo() {
        if (this.add) {
            this.deleteParameter();
        } else {
            this.addParameter();
        }
    }

    addParameter() {
        let parent = this.rb.getDataObject(this.parentId);
        if (parent !== null) {
            let parameter = new __WEBPACK_IMPORTED_MODULE_1__data_Parameter__["a" /* default */](this.id, this.initialData, this.rb);
            this.rb.addParameter(parameter);
            let panelItem = new __WEBPACK_IMPORTED_MODULE_2__menu_MainPanelItem__["a" /* default */](
                'parameter', parent.getPanelItem(), parameter, { hasChildren: true, showAdd: true, draggable: true }, this.rb);
            panelItem.openParentItems();
            parameter.setPanelItem(panelItem);
            parent.getPanelItem().insertChild(this.position, panelItem);
            parameter.setup();
            this.rb.notifyEvent(parameter, __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */].operation.add);
        }
    }

    deleteParameter() {
        let parameter = this.rb.getDataObject(this.id);
        if (parameter !== null) {
            this.initialData = parameter.toJS();
            this.rb.notifyEvent(parameter, __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */].operation.remove);
            this.rb.deleteParameter(parameter);
            parameter.getPanelItem().getParent().removeChild(parameter.getPanelItem());
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddDeleteParameterCmd;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_MainPanelItem__ = __webpack_require__(8);




/**
 * Command to add and delete a style.
 * @class
 */
class AddDeleteStyleCmd {
    constructor(add, initialData, id, parentId, position, rb) {
        this.add = add;
        this.initialData = initialData;
        this.parentId = parentId;
        this.position = position;
        this.rb = rb;
        this.id = id;
    }

    getName() {
        if (this.add) {
            return 'Add style';
        } else {
            return 'Delete style';
        }
    }

    do() {
        if (this.add) {
            this.addStyle();
        } else {
            this.deleteStyle();
        }
    }

    undo() {
        if (this.add) {
            this.deleteStyle();
        } else {
            this.addStyle();
        }
    }

    addStyle() {
        let parent = this.rb.getDataObject(this.parentId);
        if (parent !== null) {
            let style = new __WEBPACK_IMPORTED_MODULE_1__data_Style__["a" /* default */](this.id, this.initialData, this.rb);
            let panelItem = new __WEBPACK_IMPORTED_MODULE_2__menu_MainPanelItem__["a" /* default */]('style', parent.getPanelItem(), style, { draggable: true }, this.rb);
            panelItem.openParentItems();
            style.setPanelItem(panelItem);
            parent.getPanelItem().insertChild(this.position, panelItem);
            this.rb.addStyle(style);
        }
    }

    deleteStyle() {
        let style = this.rb.getDataObject(this.id);
        if (style !== null) {
            this.initialData = style.toJS();
            this.rb.deleteStyle(style);
            style.getPanelItem().getParent().removeChild(style.getPanelItem());
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddDeleteStyleCmd;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Document__ = __webpack_require__(9);




/**
 * Command to move a menu panel item. In case the item is moved to a different container (e.g. from content to header band)
 * the corresponding doc element is moved to the new container as well.
 * @class
 */
class MovePanelItemCmd {
    constructor(panelItem, moveToParentPanel, moveToPosition, rb) {
        this.objId = panelItem.getId();
        this.moveToParentId = moveToParentPanel.getId();
        this.moveToPosition = moveToPosition;
        this.oldParentId = panelItem.getParent().getId();
        this.oldPosition = panelItem.getSiblingPosition();
        this.oldContainerId = null;
        this.moveToContainerId = null;
        if (panelItem.getData() instanceof __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */]) {
            let docElement = panelItem.getData();
            this.oldContainerId = docElement.getValue('containerId');
            let moveToContainer = rb.getMainPanel().getContainerByItem(moveToParentPanel);
            if (moveToContainer !== null) {
                this.moveToContainerId = moveToContainer.getId();
            }
        }
        this.rb = rb;
    }

    getName() {
        return 'Move panel item';
    }

    do() {
        let pos = this.moveToPosition;
        if (this.moveToParentId === this.oldParentId && this.oldPosition < pos) {
            pos--;
        }
        this.moveTo(this.moveToParentId, pos, (this.moveToContainerId !== this.oldContainerId) ? this.moveToContainerId : null);
    }

    undo() {
        this.moveTo(this.oldParentId, this.oldPosition, (this.moveToContainerId !== this.oldContainerId) ? this.oldContainerId : null);
    }

    moveTo(toParentId, toPosition, toContainerId) {
        let obj = this.rb.getDataObject(this.objId);
        let parent = this.rb.getDataObject(toParentId);
        if (obj !== null && parent !== null) {
            obj.getPanelItem().moveToPosition(parent.getPanelItem(), toPosition);
            obj.getPanelItem().openParentItems();
            this.rb.notifyEvent(obj, __WEBPACK_IMPORTED_MODULE_0__Command__["a" /* default */].operation.move);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MovePanelItemCmd;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_AddDeleteDocElementCmd__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__container_Frame__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_MainPanelItem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(0);








/**
 * Frame element. Frames can contain any number of other doc element. These doc elements
 * are positioned relative to the frame.
 * @class
 */
class FrameElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementFrame'), id, 100, 100, rb);
        this.frame = null;
        this.setupComplete = false;
        this.label = '';
        this.backgroundColor = '';
        this.borderAll = false;
        this.borderLeft = false;
        this.borderTop = false;
        this.borderRight = false;
        this.borderBottom = false;
        this.borderColor = '#000000';
        this.borderWidth = '1';
        
        this.shrinkToContentHeight = false;

        this.spreadsheet_hide = false;
        this.spreadsheet_column = '';
        this.spreadsheet_addEmptyRow = false;
        
        this.setInitialData(initialData);

        this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_6__utils__["a" /* convertInputToNumber */](this.borderWidth);
    }

    setup(openPanelItem) {
        this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_6__utils__["a" /* convertInputToNumber */](this.borderWidth);
        super.setup();
        this.createElement();
        this.updateDisplay();

        if (this.linkedContainerId === null) {
            this.linkedContainerId = this.rb.getUniqueId();
        }
        this.frame = new __WEBPACK_IMPORTED_MODULE_2__container_Frame__["a" /* default */](this.linkedContainerId, 'frame_' + this.linkedContainerId, this.rb);
        this.frame.init(this);
        this.rb.addContainer(this.frame);

        this.setupComplete = true;
        this.updateStyle();
        this.updateName();
        if (openPanelItem){
            this.panelItem.open();
        }
    }

    /**
     * Returns highest id of this component, this is the id of the linked container because it is
     * created after the frame element.
     * @returns {Number}
     */
    getMaxId() {
        return this.linkedContainerId;
    }
    
    setValue(field, value, elSelector, isShown) {
        if (field.indexOf('border') !== -1) {
            // Style.setBorderValue needs to be called before super.setValue because it calls updateStyle() which expects
            // the correct border settings
            this[field] = value;
            if (field === 'borderWidth') {
                this.borderWidthVal = __WEBPACK_IMPORTED_MODULE_6__utils__["a" /* convertInputToNumber */](value);
            }
            __WEBPACK_IMPORTED_MODULE_4__data_Style__["a" /* default */].setBorderValue(this, field, '', value, elSelector, isShown);
        }

        super.setValue(field, value, elSelector, isShown);

        if (field === 'label') {
            this.updateName();
        }
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { left: this.rb.toPixel(x), top: this.rb.toPixel(y),
                width: this.rb.toPixel(width), height: this.rb.toPixel(height) };
            this.el.css(props);
        }
        // update inner frame element size
        if (this.borderLeft) {
            width -= this.borderWidthVal;
        }
        if (this.borderRight) {
            width -= this.borderWidthVal;
        }
        if (this.borderTop) {
            height -= this.borderWidthVal;
        }
        if (this.borderBottom) {
            height -= this.borderWidthVal;
        }

        let styleProperties = {};
        styleProperties['width'] = this.rb.toPixel(width);
        styleProperties['height'] = this.rb.toPixel(height);
        $(`#rbro_el_content_frame${this.id}`).css(styleProperties);
    }

    updateStyle() {
        let styleProperties = {};
        let borderStyleProperties = {};
        styleProperties['background-color'] = this.getValue('backgroundColor');
        if (this.getValue('borderLeft') || this.getValue('borderTop') ||
                this.getValue('borderRight') || this.getValue('borderBottom')) {
            borderStyleProperties['border-style'] = this.getValue('borderTop') ? 'solid' : 'none';
            borderStyleProperties['border-style'] += this.getValue('borderRight') ? ' solid' : ' none';
            borderStyleProperties['border-style'] += this.getValue('borderBottom') ? ' solid' : ' none';
            borderStyleProperties['border-style'] += this.getValue('borderLeft') ? ' solid' : ' none';
            borderStyleProperties['border-width'] = this.getValue('borderWidthVal') + 'px';
            borderStyleProperties['border-color'] = this.getValue('borderColor');
        } else {
            borderStyleProperties['border-style'] = 'none';
        }
        $(`#rbro_el_content${this.id}`).css(borderStyleProperties);
        this.el.css(styleProperties);
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'linkedContainerId', 'label',
            'x', 'y', 'width', 'height', 'backgroundColor',
            'borderAll', 'borderLeft', 'borderTop', 'borderRight', 'borderBottom', 'borderColor', 'borderWidth',
            'printIf', 'removeEmptyElement', 'shrinkToContentHeight',
            'spreadsheet_hide', 'spreadsheet_column', 'spreadsheet_addEmptyRow'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.frame;
    }

    getXTagId() {
        return 'rbro_frame_element_position_x';
    }

    getYTagId() {
        return 'rbro_frame_element_position_y';
    }

    getWidthTagId() {
        return 'rbro_frame_element_width';
    }

    getHeightTagId() {
        return 'rbro_frame_element_height';
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroDocElement rbroFrameElement rbroElementContainer"></div>`);
        // rbroContentContainerHelper contains border styles
        // rbroDocElementContentFrame contains width and height
        this.el
            .append($(`<div id="rbro_el_content${this.id}" class="rbroContentContainerHelper"></div>`)
                .append($(`<div id="rbro_el_content_frame${this.id}" class="rbroDocElementContentFrame"></div>`))
            );
        this.appendToContainer();
        this.registerEventHandlers();
    }

    getContentElement() {
        return $(`#rbro_el_content_frame${this.id}`);
    }

    remove() {
        super.remove();
        this.rb.deleteContainer(this.frame);
    }

    updateName() {
        if (this.label.trim() !== '') {
            this.name = this.label;
        } else {
            this.name = this.rb.getLabel('docElementFrame');
        }
        $(`#rbro_menu_item_name${this.id}`).text(this.name);
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_frame_element_print_if', 'printIf', cmdGroup);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FrameElement;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);


/**
 * Page break doc element. A page break triggers a new page when the document is printed.
 * @class
 */
class PageBreakElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementPageBreak'), id, -1, 1, rb);
        this.setInitialData(initialData);
    }

    setup(openPanelItem) {
        super.setup(openPanelItem);
        this.createElement();
        this.updateDisplay();
        this.updateStyle();
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'y'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.pageBreak;
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { left: this.rb.toPixel(0), top: this.rb.toPixel(y),
                width: '100%', height: this.rb.toPixel(1) };
            this.el.css(props);
        }
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return [];
    }

    getYTagId() {
        return 'rbro_page_break_element_position_y';
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroDocElement rbroPageBreakElement"></div>`);
        this.appendToContainer();
        super.registerEventHandlers();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageBreakElement;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SectionBandElement__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_MainPanelItem__ = __webpack_require__(8);






/**
 * Section element. Sections can be added to the content band and contain a content band and optional
 * header/footer bands.
 * @class
 */
class SectionElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementSection'), id, -1, 60, rb);
        this.setupComplete = false;
        this.dataSource = '';
        this.label = '';
        this.header = false;
        this.footer = false;
        this.headerData = null;
        this.contentData = null;
        this.footerData = null;

        this.setInitialData(initialData);
    }

    setup(openPanelItem) {
        super.setup(openPanelItem);
        this.createElement();
        this.updateDisplay();

        this.headerData = this.createBand(__WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.header, null);
        this.contentData = this.createBand(__WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.content, null);
        this.footerData = this.createBand(__WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.footer, null);
        this.updateHeight();

        this.setupComplete = true;
        this.updateName();
        if (openPanelItem) {
            this.panelItem.open();
        }
    }

    createBand(bandType, dataValues) {
        let data;
        let dataKey = bandType + 'Data';
        let dataId;
        let panelItemProperties = { hasChildren: true, showDelete: false };
        if (dataValues) {
            data = dataValues;
        } else if (this[dataKey]) {
            data = this[dataKey];
            dataId = data.id;
        } else {
            data = {};
        }
        data.parentId = this.id;
        data.containerId = this.containerId;
        if (!dataId) {
            dataId = this.rb.getUniqueId();
        }
        let y = 0;
        if (bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.header) {
            data.y = '' + y;
        } else if (bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.content) {
            if (this.header && this.headerData !== null) {
                y += this.headerData.getValue('heightVal');
            }
            data.y = '' + y;
        } else if (bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.footer) {
            if (this.header && this.headerData !== null) {
                y += this.headerData.getValue('heightVal');
            }
            if (this.contentData !== null) {
                y += this.contentData.getValue('heightVal');
            }
            data.y = '' + y;
        }
        if ((bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.header && !this.header) || (bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.footer && !this.footer)) {
            panelItemProperties.visible = false;
        }
        let bandElement = new __WEBPACK_IMPORTED_MODULE_1__SectionBandElement__["a" /* default */](dataId, data, bandType, this.rb);
        this.rb.addDataObject(bandElement);
        let panelItemBand = new __WEBPACK_IMPORTED_MODULE_4__menu_MainPanelItem__["a" /* default */]('section_band', this.panelItem, bandElement, panelItemProperties, this.rb);
        bandElement.setPanelItem(panelItemBand);
        this.panelItem.appendChild(panelItemBand);
        bandElement.setup();

        if (bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.header) {
            bandElement.show(this.header);
        } else if (bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.footer) {
            bandElement.show(this.footer);
        }
        return bandElement;
    }

    /**
     * Do not register any event handlers so element cannot be selected.
     */
    registerEventHandlers() {
    }
    
    /**
     * Returns highest id of this component, this is the max id of the footer band because it is created last.
     * @returns {Number}
     */
    getMaxId() {
        let id = this.id;
        if (this.footerData !== null) {
            id = this.footerData.getMaxId();
        }
        return id;
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);

        if (field === 'label' || field === 'dataSource') {
            this.updateName();
        } else if (field === 'header') {
            this.headerData.show(value);
            if (value) {
                this.headerData.getPanelItem().show();
            } else {
                this.headerData.getPanelItem().hide();
            }
        } else if (field === 'footer') {
            this.footerData.show(value);
            if (value) {
                this.footerData.getPanelItem().show();
            } else {
                this.footerData.getPanelItem().hide();
            }
        } else if (field === 'containerId') {
            this.headerData.containerId = value;
            this.contentData.containerId = value;
            this.footerData.containerId = value;
        }
        if (field === 'header' || field === 'footer') {
            this.updateBands(null);
        }
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { top: this.rb.toPixel(y), width: '100%', height: this.rb.toPixel(height) };
            this.el.css(props);
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'y', 'label', 'dataSource', 'header', 'footer', 'printIf'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.section;
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return [];
    }

    getYTagId() {
        return 'rbro_section_element_position_y';
    }

    getHeightTagId() {
        return '';
    }

    isDroppingAllowed() {
        return false;
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroSectionElement"></div>`);
        this.el.append($(`<div id="rbro_divider_section_top${this.id}" class="rbroDivider rbroDividerSection" style="top: 0px"></div>`));
        this.el.append($(`<div id="rbro_divider_section_header${this.id}" class="rbroDivider rbroDividerSectionBand rbroHidden"></div>`));
        this.el.append($(`<div id="rbro_divider_section_footer${this.id}" class="rbroDivider rbroDividerSectionBand rbroHidden"></div>`));
        this.el.append($(`<div id="rbro_divider_section_bottom${this.id}" class="rbroDivider rbroDividerSection"></div>`));
        this.appendToContainer();
    }

    updateName() {
        if (this.label.trim() !== '') {
            this.name = this.label;
        } else {
            this.name = this.rb.getLabel('docElementSection');
            if (this.dataSource.trim() !== '') {
                this.name += ' ' + this.dataSource;
            }
        }
        $(`#rbro_menu_item_name${this.id}`).text(this.name);
    }

    /**
     * Update section element height and position, visibility of dividers for header/footer bands.
    */
    updateHeight() {
        let height = 0;
        if (this.header && this.headerData !== null) {
            height += this.headerData.getValue('heightVal');
            $(`#rbro_divider_section_header${this.id}`).css({ top: this.rb.toPixel(height) }).removeClass('rbroHidden');
        } else {
            $(`#rbro_divider_section_header${this.id}`).addClass('rbroHidden');
        }
        if (this.contentData !== null) {
            height += this.contentData.getValue('heightVal');
        }
        if (this.footer && this.footerData !== null) {
            $(`#rbro_divider_section_footer${this.id}`).css({ top: this.rb.toPixel(height) }).removeClass('rbroHidden');
            height += this.footerData.getValue('heightVal');
        } else {
            $(`#rbro_divider_section_footer${this.id}`).addClass('rbroHidden');
        }
        $(`#rbro_divider_section_bottom${this.id}`).css({ top: this.rb.toPixel(height) });
        this.height = '' + height;
        this.heightVal = height;
        this.updateDisplay();
    }

    /**
     * Update height and y-coordinate of all sub-bands (header, content, footer).
     */
    updateBands(ignoreBandData) {
        if (this.setupComplete) {
            let y = 0;
            if (this.header) {
                if (this.headerData !== ignoreBandData) {
                    this.headerData.setValue('y', '' + y, null, true);
                }
                y += this.headerData.getValue('heightVal');
            }
            if (this.contentData !== ignoreBandData) {
                this.contentData.setValue('y', '' + y, null, true);
            }
            y += this.contentData.getValue('heightVal');
            if (this.footer && this.footerData !== ignoreBandData) {
                this.footerData.setValue('y', '' + y, null, true);
            }
        }
        this.updateHeight();
    }

    /**
     * Get linked containers of all bands.
     * @returns {Container[]} array with all linked containers of header/content/footer section bands.
     */
    getLinkedContainers() {
        let containers = [];
        let container;
        for (let band of ['headerData', 'contentData', 'footerData']) {
            if (this[band] !== null) {
                container = this[band].getLinkedContainer();
                if (container !== null) {
                    containers.push(container);
                }
            }
        }
        return containers;
    }

    /**
     * Returns all parameters of the data source (which must be an array parameter).
     * @returns {[Object]} contains the data source name and all parameters of the data source.
     */
    getDataSource() {
        let parameters = [];
        let dataSource = this.dataSource.trim();
        let dataSourceParameter = '';
        if (dataSource.length >= 3 && dataSource.substr(0, 2) === '${' &&
                dataSource.charAt(dataSource.length - 1) === '}') {
            dataSourceParameter = dataSource.substring(2, dataSource.length - 1);
            let param = this.rb.getParameterByName(dataSourceParameter);
            if (param !== null && param.getValue('type') === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array) {
                parameters = param.getChildren();
            }
        }
        return { name: dataSourceParameter, parameters: parameters };
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_section_element_data_source', 'dataSource', cmdGroup);
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_section_element_print_if', 'printIf', cmdGroup);
    }

    toJS() {
        let ret = super.toJS();
        ret['headerData'] = this.headerData.toJS();
        ret['contentData'] = this.contentData.toJS();
        ret['footerData'] = this.footerData.toJS();
        return ret;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SectionElement;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TableTextElement__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_MainPanelItem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);






/**
 * Table band doc element. This is the header, content or footer of a table.
 * @class
 */
class TableBandElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, bandType, rb) {
        let name = (bandType === 'header') ? rb.getLabel('bandHeader') : ((bandType === 'footer') ? rb.getLabel('bandFooter') : rb.getLabel('bandContent'));
        super(name, id, 0, 20, rb);
        this.bandType = bandType;
        this.repeatHeader = false;
        this.alwaysPrintOnSamePage = true;
        this.backgroundColor = '';
        this.alternateBackgroundColor = '';
        this.groupExpression = '';
        this.parentId = initialData.parentId;
        this.columnData = [];

        this.heightVal = 0;
        
        this.setInitialData(initialData);
    }

    setInitialData(initialData) {
        for (let key in initialData) {
            if (initialData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = initialData[key];
            }
        }
        this.heightVal = __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](this.height);
    }

    setup() {
        this.createElement();
        this.updateStyle();
    }

    registerEventHandlers() {
    }

    /**
     * Returns highest id of this component including all its child components.
     * @returns {Number}
     */
    getMaxId() {
        let maxId = this.id;
        for (let col of this.columnData) {
            if (col.getId() > maxId) {
                maxId = col.getId();
            }
        }
        return maxId;
    }

    getContainerId() {
        let parent = this.getParent();
        if (parent !== null) {
            return parent.getContainerId();
        }
        return null;
    }

    setValue(field, value, elSelector, isShown) {
        this[field] = value;
        if (field === 'height') {
            let height = __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* convertInputToNumber */](value);
            this[field + 'Val'] = height;
            // set td height to height - 1 because border consumes 1 pixel
            this.getElement().find('td').css({ height: this.rb.toPixel(height - 1) });
            for (let col of this.columnData) {
                col.setValue(field, value, elSelector, isShown);
            }
        } else if (field === 'backgroundColor') {
            this.updateStyle();
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        let fields = ['id', 'height', 'backgroundColor'];
        if (this.bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.header) {
            fields.push('repeatHeader');
        } else if (this.bandType === __WEBPACK_IMPORTED_MODULE_2__container_Band__["a" /* default */].bandType.content) {
            fields.push('alternateBackgroundColor');
            fields.push('groupExpression');
            fields.push('printIf');
            fields.push('alwaysPrintOnSamePage');
        }
        return fields;
    }

    updateDisplayInternal(x, y, width, height) {
    }

    updateStyle() {
        this.el.css('background-color', this.backgroundColor);
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return [];
    }

    getHeightTagId() {
        return 'rbro_table_band_element_height';
    }

    getHeight() {
        return this.heightVal;
    }

    isDraggingAllowed() {
        return false;
    }

    isDroppingAllowed() {
        return false;
    }

    createElement() {
        this.el = $(`<tr id="rbro_el_table_band${this.id}" class="rbroTableBandElement"></tr>`);
        $(`#rbro_el_table_${this.bandType}${this.parentId}`).append(this.el);
    }

    remove() {
        super.remove();
        for (let i=0; i < this.columnData.length; i++) {
            this.rb.deleteDataObject(this.columnData[i]);
        }
    }

    getParent() {
        return this.rb.getDataObject(this.parentId);
    }

    createColumns(columns, isUpdate) {
        if (this.panelItem === null) {
            return;
        }

        if (isUpdate) {
            for (let i=0; i < this.columnData.length; i++) {
                this.columnData[i].remove();
                if (i >= columns) {
                    this.rb.deleteDataObject(this.columnData[i]);
                }
            }
        }
        let newColumnData = [];
        for (let i=0; i < columns; i++) {
            let data;
            let dataId;
            if (i < this.columnData.length) {
                data = this.columnData[i];
                dataId = data.id;
                if (!isUpdate) {
                    data.band = this.band;
                    data.columnIndex = i;
                    data.parentId = this.id;
                    data.tableId = this.parentId;
                }
            } else {
                data = { band: this.band, columnIndex: i, parentId: this.id, tableId: this.parentId,
                        width: isUpdate ? 20 : 100, height: this.height };
            }
            if (!dataId) {
                dataId = this.rb.getUniqueId();
            }

            let textElement = new __WEBPACK_IMPORTED_MODULE_1__TableTextElement__["a" /* default */](dataId, data, this.rb);
            newColumnData.push(textElement);
        	this.rb.addDataObject(textElement);
            let panelItemText = new __WEBPACK_IMPORTED_MODULE_3__menu_MainPanelItem__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.text, this.panelItem, textElement, { showDelete: false }, this.rb);
            textElement.setPanelItem(panelItemText);
            this.panelItem.appendChild(panelItemText);
            textElement.setup(true);
        }
        this.columnData = newColumnData;
        this.getElement().find('td').css({ height: this.rb.toPixel(this.heightVal - 1) });
    }

    show(visible) {
        if (visible) {
            $(`#rbro_el_table_band${this.id}`).removeClass('rbroHidden');
        } else {
            $(`#rbro_el_table_band${this.id}`).addClass('rbroHidden');
        }
    }

    updateColumnWidth(columnIndex, width) {
        if (columnIndex < this.columnData.length) {
            let colData = this.columnData[columnIndex];
            colData.updateColumnWidth(width);
        }
    }

    getColumn(columnIndex) {
        if (columnIndex >= 0 && columnIndex < this.columnData.length) {
            return this.columnData[columnIndex];
        }
        return null;
    }

    getWidth() {
        let width = 0;
        for (let col of this.columnData) {
            width += col.getValue('widthVal');
        }
        return width;
    }

    getColumnWidths() {
        let widths = [];
        for (let col of this.columnData) {
            widths.push(col.getValue('widthVal'));
        }
        return widths;
    }

    addChildren(docElements) {
        for (let column of this.columnData) {
            docElements.push(column);
        }
    }

    toJS() {
        let ret = super.toJS();
        ret['columnData'] = [];
        for (let column of this.columnData) {
            ret['columnData'].push(column.toJS());
        }
        return ret;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TableBandElement;



/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReportBro__ = __webpack_require__(29);
//
// Copyright (C) 2018 jobsta
//
// This file is part of ReportBro, a library to generate PDF and Excel reports.
// Demos can be found at https://www.reportbro.com
//
// Dual licensed under AGPLv3 and ReportBro commercial license:
// https://www.reportbro.com/license
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see https://www.gnu.org/licenses/
//
// Details for ReportBro commercial license can be found at
// https://www.reportbro.com/license/agreement
//




$.fn.reportBro = function(options) {
    var args = Array.prototype.slice.call(arguments, 1); // arguments for method call
    var rv = null;

    this.each(function(i, _element) {
        var element = $(_element);
        var reportBro = element.data('reportBro');
        var currentResult;

        // method call
        if (typeof options === 'string') {
            if (reportBro && $.isFunction(reportBro[options])) {
                currentResult = reportBro[options].apply(reportBro, args);
                if (i === 0) {
                    rv = currentResult;
                }
                if (options === 'destroy') {
                    element.removeData('reportBro');
                }
            }
        } else {
            // new ReportBro instance
            if (!reportBro) {
                reportBro = new __WEBPACK_IMPORTED_MODULE_0__ReportBro__["a" /* default */](element, options);
                element.data('reportBro', reportBro);
                reportBro.render();
                reportBro.setup();
            }
            // return ReportBro instance
            rv = reportBro;
        }
    });
    
    return rv;
};


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Document__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commands_AddDeleteParameterCmd__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commands_AddDeleteStyleCmd__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__commands_Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__commands_CommandGroupCmd__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__container_Container__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__data_DocumentProperties__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__elements_FrameElement__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__elements_PageBreakElement__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__elements_SectionElement__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__elements_TableBandElement__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__elements_TableElement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__elements_TableTextElement__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__elements_TextElement__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__panels_BarCodeElementPanel__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__panels_DocumentPropertiesPanel__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__panels_EmptyDetailPanel__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__panels_FrameElementPanel__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__panels_ImageElementPanel__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__panels_LineElementPanel__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__panels_SectionBandElementPanel__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__panels_SectionElementPanel__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__menu_MainPanel__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__menu_MainPanelItem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__menu_MenuPanel__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__panels_PageBreakElementPanel__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__panels_ParameterPanel__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__panels_StylePanel__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__panels_TableElementPanel__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__panels_TableBandElementPanel__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__panels_TextElementPanel__ = __webpack_require__(49);







































/**
 * Used for the main ReportBro instance.
 * @class
 */
class ReportBro {
    constructor(element, properties) {
        this.element = element;
        this.nextId = 1;
        this.locale = {
            bandContent: 'Content',
            bandFooter: 'Footer',
            bandHeader: 'Header',
            barCodeElementContent: 'Content',
            barCodeElementDisplayValue: 'Display value',
            barCodeElementFormat: 'Format',
            contentHeight: 'Content height',
            contentHeightInfo: 'affects only GUI size to place elements and not the real page size',
            docElementAlwaysPrintOnSamePage: 'Always on same page',
            docElementBarCode: 'Bar code',
            docElementColor: 'Color',
            docElementConditionalStyle: 'Conditional style',
            docElementConditionalStyleCondition: 'Condition',
            docElementDataSource: 'Data source',
            docElementFrame: 'Frame',
            docElementHeight: 'Height',
            docElementImage: 'Image',
            docElementLabel: 'Label',
            docElementLine: 'Line',
            docElementPageBreak: 'Page break',
            docElementPosition: 'Position (x, y)',
            docElementPositionX: 'Position (x)',
            docElementPositionY: 'Position (y)',
            docElementPrintIf: 'Print if',
            docElementPrintSettings: 'Print settings',
            docElementRemoveEmptyElement: 'Remove when empty',
            docElementRoot: 'Document',
            docElementSection: 'Section',
            docElementSize: 'Size (width, height)',
            docElementSpreadsheet: 'Spreadsheet',
            docElementSpreadsheetAddEmptyRow: 'Add empty row below',
            docElementSpreadsheetColspan: 'Column range',
            docElementSpreadsheetColumn: 'Fixed column',
            docElementSpreadsheetHide: 'Hide',
            docElementWidth: 'Width',
            docElementStyle: 'Style',
            docElementTable: 'Table',
            docElementText: 'Text',
            documentProperties: 'Document properties',
            documentTabClose: 'Close',
            documentTabPdfLayout: 'PDF Layout',
            documentTabPdfPreview: 'PDF Preview',
            documentTabXlsxDownload: 'XLSX Download',
            emptyPanel: 'Empty panel',
            errorMsgDuplicateParameterField: 'Field already exists',
            errorMsgInvalidArray: 'Invalid list',
            errorMsgInvalidAvgSumExpression: 'Expression must contain number field of a list parameter',
            errorMsgInvalidBarCode: 'Invalid bar code content',
            errorMsgInvalidDataSource: 'Invalid data source',
            errorMsgInvalidDataSourceParameter: 'Parameter must be a list',
            errorMsgInvalidDate: 'Invalid date, expected format is YYYY-MM-DD ( or YYYY-MM-DD hh:mm for date with time)',
            errorMsgInvalidExpression: 'Invalid expression: ${info}',
            errorMsgInvalidExpressionFuncNotDefined: 'Function ${info} not defined',
            errorMsgInvalidExpressionNameNotDefined: 'Name ${info} not defined',
            errorMsgInvalidImage: 'Invalid image data, image must be base64 encoded',
            errorMsgInvalidImageSource: 'Invalid source, expected url starting with http:// or https://',
            errorMsgInvalidImageSourceParameter: 'Parameter must be an image or string (containing a url)',
            errorMsgInvalidMap: 'Invalid collection',
            errorMsgInvalidNumber: 'Invalid number',
            errorMsgInvalidPageSize: 'Invalid page size',
            errorMsgInvalidParameterData: 'Data does not match parameter',
            errorMsgInvalidParameterName: 'Name must start with a character or underscore, and must only contain characters, digits and underscores (_)',
            errorMsgInvalidPattern: 'Invalid pattern',
            errorMsgInvalidPosition: 'The position is outside the area',
            errorMsgInvalidSize: 'The element is outside the area',
            errorMsgInvalidTestData: 'Invalid test data',
            errorMsgMissingData: 'Missing data',
            errorMsgMissingDataSourceParameter: 'Data source parameter not found',
            errorMsgMissingExpression: 'Expression must be set',
            errorMsgMissingImage: 'Missing image, no source or image file specified',
            errorMsgMissingParameter: 'Parameter not found',
            errorMsgMissingParameterData: 'Data for parameter {info} not found',
            errorMsgSectionBandNotOnSamePage: 'Section band does not fit on same page',
            errorMsgUnicodeEncodeError: 'Text contains non printable character',
            errorMsgUnsupportedImageType: 'Image does not have supported image type (.jpg, .png)',
            footer: 'Footer',
            footerDisplay: 'Display',
            footerSize: 'Footer size',
            frameElementShrinkToContentHeight: 'Shrink to content height',
            imageElementImage: 'Image file',
            imageElementLoadErrorMsg: 'Loading image failed',
            imageElementSource: 'Source',
            header: 'Header',
            headerDisplay: 'Display',
            headerFooterDisplayAlways: 'Always',
            headerFooterDisplayNotOnFirstPage: 'Do not show on first page',
            headerSize: 'Header size',
            menuAlignBottom: 'Align bottom',
            menuAlignCenter: 'Align center',
            menuAlignLeft: 'Align left',
            menuAlignMiddle: 'Align middle',
            menuAlignRight: 'Align right',
            menuAlignTop: 'Align top',
            menuPreview: 'PREVIEW',
            menuPreviewTip: 'Preview report',
            menuRedo: 'REDO',
            menuRedoTip: 'Repeat last undone command',
            menuSave: 'SAVE',
            menuSaveTip: 'Save report',
            menuToggleGrid: 'Show/Hide grid',
            menuUndo: 'UNDO',
            menuUndoTip: 'Undo last command',
            orientation: 'Orientation',
            orientationBottom: 'bottom',
            orientationLandscape: 'Landscape',
            orientationLeft: 'left',
            orientationPortrait: 'Portrait',
            orientationRight: 'right',
            orientationTop: 'top',
            pageFormat: 'Page format',
            pageFormatA4: 'DIN A4 (210 x 297 mm)',
            pageFormatA5: 'DIN A5 (148 x 210 mm)',
            pageFormatLetter: 'Letter (8.5 x 11.0 inches)',
            pageFormatUserDefined: 'Own dimensions',
            pageHeight: 'height',
            pageMargins: 'Page margins',
            pageWidth: 'width',
            parameter: 'Parameter',
            parameterAddTestData: 'Add row',
            parameterArrayItemType: 'List item type',
            parameterEditTestData: 'Edit',
            parameterEditTestDataNoFields: 'No fields defined for this list',
            parameterEval: 'Evaluate',
            parameterExpression: 'Expression',
            parameterListType: 'List type',
            parameterName: 'Name',
            parameterNullable: 'Nullable',
            parameterPattern: 'Pattern',
            parameterSearchPlaceholder: 'Search parameters...',
            parameterTestData: 'Test data',
            parameterTestDataDatePattern: 'YYYY-MM-DD',
            parameterType: 'Type',
            parameterTypeArray: 'List',
            parameterTypeAverage: 'Average',
            parameterTypeBoolean: 'Boolean',
            parameterTypeDate: 'Date',
            parameterTypeImage: 'Image',
            parameterTypeMap: 'Collection',
            parameterTypeNumber: 'Number',
            parameterTypeSimpleArray: 'Simple List',
            parameterTypeString: 'Text',
            parameterTypeSum: 'Sum',
            parameters: 'Parameters',
            parametersDataSource: 'Data source parameters',
            patternCurrencySymbol: 'Pattern currency symbol',
            patternDate1: 'day.month.year, e.g. 1.6.1980',
            patternDate2: 'day.month.year (2-digit), hour(24h):minute, e.g. 1.6.80, 14:30',
            patternDate3: 'day/month/year (month abbreviation), e.g. 1/Jun/1980',
            patternDate4: 'month/day/year (day and month with leading zero if single digit), e.g. 06/01/1980',
            patternLocale: 'Pattern locale',
            patternNumber1: 'Show thousand separator',
            patternNumber2: 'Show decimal point followed by 3 decimal places',
            patternNumber3: 'Show decimal point followed by minimum of 2 and maximum of 4 decimal places',
            patternNumber4: 'Show thousand separator and decimal point followed by 2 decimal places',
            patternNumber5: 'Show currency symbol in front of number',
            patternSeparatorDates: '--- Date patterns ---',
            patternSeparatorNumbers: '--- Number patterns ---',
            select: 'select...',
            style: 'Style',
            styleAlignment: 'Alignment',
            styleBackgroundColor: 'Background color',
            styleBold: 'Bold',
            styleBorder: 'Border',
            styleBorderAll: 'borders',
            styleBorderColor: 'Border color',
            styleBorderWidth: 'Border width',
            styleFont: 'Font',
            styleFontSizeUnit: 'pt',
            styleHAlignmentCenter: 'Center',
            styleHAlignmentLeft: 'Left',
            styleHAlignmentJustify: 'Justify',
            styleHAlignmentRight: 'Right',
            styleItalic: 'Italic',
            styleLineSpacing: 'Line spacing',
            styleName: 'Name',
            styleNone: 'None',
            stylePadding: 'Padding',
            styleTextColor: 'Text color',
            styleTextStyle: 'Text style',
            styleUnderline: 'Underline',
            styleVAlignmentBottom: 'Bottom',
            styleVAlignmentMiddle: 'Middle',
            styleVAlignmentTop: 'Top',
            styles: 'Styles',
            tableElementAlternateBackgroundColor: 'Alternate background color',
            tableElementBorderFrame: 'Frame',
            tableElementBorderFrameRow: 'Frame and row',
            tableElementBorderGrid: 'Grid',
            tableElementBorderNone: 'None',
            tableElementBorderRow: 'Row',
            tableElementColumns: 'Columns',
            tableElementContentRows: 'Content rows',
            tableElementGroupExpression: 'Group expression',
            tableElementRepeatHeader: 'Repeat header',
            textElementContent: 'Text',
            textElementEval: 'Evaluate',
            textElementPattern: 'Pattern'
        };

        this.properties = {
            additionalFonts: [],
            adminMode: true,
            enableSpreadsheet: true,
            fonts: [
                { name: 'Courier', value: 'courier' },
                { name: 'Helvetica', value: 'helvetica' },
                { name: 'Times New Roman', value: 'times' }
            ],
            localStorageReportKey: null,
            menuShowButtonLabels: false,
            menuSidebar: false,
            saveCallback: null,
            showGrid: true,
            patternAdditionalDates: [],
            patternAdditionalNumbers: [],
            patternCurrencySymbol: '$',
            patternDates: [
                { name: 'd.M.yyyy', description: this.locale['patternDate1'] },
                { name: 'd.M.yy, H:mm', description: this.locale['patternDate2'] },
                { name: 'd/MMM/yyyy', description: this.locale['patternDate3'] },
                { name: 'MM/dd/yyyy', description: this.locale['patternDate4'] }
            ],
            patternLocale: 'en',
            patternNumbers: [
                { name: '#,##0', description: this.locale['patternNumber1'] },
                { name: '0.000', description: this.locale['patternNumber2'] },
                { name: '0.00##', description: this.locale['patternNumber3'] },
                { name: '#,##0.00', description: this.locale['patternNumber4'] },
                { name: '$ #,##0.00', description: this.locale['patternNumber5'] }
            ],
            reportServerTimeout: 20000,
            reportServerUrl: 'https://www.reportbro.com/report/run',
            reportServerUrlCrossDomain: false
        };
        if (properties) {
            for (let prop in properties) {
                if (this.properties.hasOwnProperty(prop)) {
                    this.properties[prop] = properties[prop];
                }
            }
            $.extend( this.locale, properties['locale'] || {} );
        }
        if (this.properties.additionalFonts.length > 0) {
            this.properties.fonts = this.properties.fonts.concat(this.properties.additionalFonts);
        }
        if (this.properties.patternAdditionalDates.length > 0) {
            this.properties.patternDates = this.properties.patternDates.concat(this.properties.patternAdditionalDates);
        }
        if (this.properties.patternAdditionalNumbers.length > 0) {
            this.properties.patternNumbers = this.properties.patternNumbers.concat(this.properties.patternAdditionalNumbers);
        }

        this.detailData = null;
        this.document = new __WEBPACK_IMPORTED_MODULE_0__Document__["a" /* default */](element, this.properties.showGrid, this);
        this.popupWindow = new __WEBPACK_IMPORTED_MODULE_1__PopupWindow__["a" /* default */](element, this);
        this.docElements = [];
        this.headerBand = new __WEBPACK_IMPORTED_MODULE_8__container_Band__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__container_Band__["a" /* default */].bandType.header, false, '', '', this);
        this.contentBand = new __WEBPACK_IMPORTED_MODULE_8__container_Band__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__container_Band__["a" /* default */].bandType.content, false, '', '', this);
        this.footerBand = new __WEBPACK_IMPORTED_MODULE_8__container_Band__["a" /* default */](__WEBPACK_IMPORTED_MODULE_8__container_Band__["a" /* default */].bandType.footer, false, '', '', this);
        this.parameterContainer = new __WEBPACK_IMPORTED_MODULE_9__container_Container__["a" /* default */]('0_parameters', this.getLabel('parameters'), this);
        this.styleContainer = new __WEBPACK_IMPORTED_MODULE_9__container_Container__["a" /* default */]('0_styles', this.getLabel('styles'), this);
        this.documentProperties = new __WEBPACK_IMPORTED_MODULE_10__data_DocumentProperties__["a" /* default */](this);
        this.clipboardElements = [];

        this.mainPanel = new __WEBPACK_IMPORTED_MODULE_29__menu_MainPanel__["a" /* default */](element, this.headerBand, this.contentBand, this.footerBand,
                this.parameterContainer, this.styleContainer, this);
        this.menuPanel = new __WEBPACK_IMPORTED_MODULE_31__menu_MenuPanel__["a" /* default */](element, this);
        this.activeDetailPanel = 'none';
        this.detailPanels = {
            'none': new __WEBPACK_IMPORTED_MODULE_23__panels_EmptyDetailPanel__["a" /* default */](element, this),
            'bar_code': new __WEBPACK_IMPORTED_MODULE_21__panels_BarCodeElementPanel__["a" /* default */](element, this),
            'frame': new __WEBPACK_IMPORTED_MODULE_24__panels_FrameElementPanel__["a" /* default */](element, this),
            'text': new __WEBPACK_IMPORTED_MODULE_37__panels_TextElementPanel__["a" /* default */](element, this),
            'line': new __WEBPACK_IMPORTED_MODULE_26__panels_LineElementPanel__["a" /* default */](element, this),
            'image': new __WEBPACK_IMPORTED_MODULE_25__panels_ImageElementPanel__["a" /* default */](element, this),
            'page_break': new __WEBPACK_IMPORTED_MODULE_32__panels_PageBreakElementPanel__["a" /* default */](element, this),
            'table': new __WEBPACK_IMPORTED_MODULE_35__panels_TableElementPanel__["a" /* default */](element, this),
            'table_band': new __WEBPACK_IMPORTED_MODULE_36__panels_TableBandElementPanel__["a" /* default */](element, this),
            'parameter': new __WEBPACK_IMPORTED_MODULE_33__panels_ParameterPanel__["a" /* default */](element, this),
            'section': new __WEBPACK_IMPORTED_MODULE_28__panels_SectionElementPanel__["a" /* default */](element, this),
            'section_band': new __WEBPACK_IMPORTED_MODULE_27__panels_SectionBandElementPanel__["a" /* default */](element, this),
            'style': new __WEBPACK_IMPORTED_MODULE_34__panels_StylePanel__["a" /* default */](element, this),
            'documentProperties': new __WEBPACK_IMPORTED_MODULE_22__panels_DocumentPropertiesPanel__["a" /* default */](this.documentProperties, element, this)
        };
        this.commandStack = [];
        this.lastCommandIndex = -1;
        this.modified = false;
        this.selectionSinceLastCommand = false;
        this.objectMap = {};
        this.containers = [this.headerBand, this.contentBand, this.footerBand];
        this.selections = [];
        this.reportKey = null;  // key of last report preview to allow download of xlsx file for this report

        this.browserDragType = '';
        this.browserDragId = '';

        this.documentProperties.setPanelItem(this.mainPanel.getDocumentPropertiesItem());
        this.initObjectMap();

        $(document).keydown(event => {
            // check metaKey instead of ctrl for Mac
            if (event.metaKey || event.ctrlKey) {
                switch (event.which) {
                    case 67: {
                        // Ctrl + C: copy
                        if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
                            let cleared = false;
                            let idMap = {};
                            let serializedObj;
                            let i;
                            for (let selectionId of this.selections) {
                                let obj = this.getDataObject(selectionId);
                                if ((obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */] && !(obj instanceof __WEBPACK_IMPORTED_MODULE_19__elements_TableTextElement__["a" /* default */])) ||
                                        (obj instanceof __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */] && !obj.showOnlyNameType) ||
                                        (obj instanceof __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */])) {
                                    if (!cleared) {
                                        this.clipboardElements = [];
                                        cleared = true;
                                    }
                                    if (!(obj.getId() in idMap)) {
                                        idMap[obj.getId()] = true;
                                        serializedObj = obj.toJS();
                                        this.clipboardElements.push(serializedObj);
                                        if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */]) {
                                            serializedObj.baseClass = 'DocElement';
                                            if (obj instanceof __WEBPACK_IMPORTED_MODULE_14__elements_FrameElement__["a" /* default */]) {
                                                let nestedElements = [];
                                                obj.appendContainerChildren(nestedElements);
                                                for (let nestedElement of nestedElements) {
                                                    if (nestedElement.getId() in idMap) {
                                                        // in case a nested element is also selected we make sure to add it only once to
                                                        // the clipboard objects and to add it after its parent element
                                                        for (i = 0; i < this.clipboardElements.length; i++) {
                                                            if (nestedElement.getId() === this.clipboardElements[i].id) {
                                                                this.clipboardElements.splice(i, 1);
                                                                break;
                                                            }
                                                        }
                                                    } else {
                                                        idMap[nestedElement.getId()] = true;
                                                    }
                                                    serializedObj = nestedElement.toJS();
                                                    serializedObj.baseClass = 'DocElement';
                                                    this.clipboardElements.push(serializedObj);
                                                }
                                            }
                                        } else if (obj instanceof __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */]) {
                                            serializedObj.baseClass = 'Parameter';
                                        } else if (obj instanceof __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */]) {
                                            serializedObj.baseClass = 'Style';
                                        }
                                    }
                                }
                            }
                            event.preventDefault();
                        }
                        break;
                    }
                    case 86: {
                        // Ctrl + V: paste
                        if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
                            let cmd;
                            let cmdGroup = new __WEBPACK_IMPORTED_MODULE_6__commands_CommandGroupCmd__["a" /* default */]('Paste from clipboard', this);
                            let mappedContainerIds = {};
                            for (let clipboardElement of this.clipboardElements) {
                                clipboardElement.id = this.getUniqueId();
                                if (clipboardElement.baseClass === 'DocElement') {
                                    if (clipboardElement.linkedContainerId) {
                                        let linkedContainerId = this.getUniqueId();
                                        mappedContainerIds[clipboardElement.linkedContainerId] = linkedContainerId;
                                        clipboardElement.linkedContainerId = linkedContainerId;
                                    }
                                    if (clipboardElement.elementType === __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */].type.table) {
                                        __WEBPACK_IMPORTED_MODULE_18__elements_TableElement__["a" /* default */].removeIds(clipboardElement);
                                    }
                                }
                            }
                            for (let clipboardElement of this.clipboardElements) {
                                if (clipboardElement.baseClass === 'DocElement') {
                                    // map id of container in case element is inside other pasted container (frame/band)
                                    if (clipboardElement.containerId in mappedContainerIds) {
                                        clipboardElement.containerId = mappedContainerIds[clipboardElement.containerId];
                                        // since element is inside pasted container we can keep x/y coordinates
                                    } else {
                                        // paste new element at top/left of container
                                        clipboardElement.x = clipboardElement.y = 0;
                                    }
                                    cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__["a" /* default */](
                                        true, clipboardElement.elementType, clipboardElement,
                                        clipboardElement.id, clipboardElement.containerId, -1, this);
                                    cmdGroup.addCommand(cmd);

                                } else if (clipboardElement.baseClass === 'Parameter') {
                                    __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].removeIds(clipboardElement);
                                    cmd = new __WEBPACK_IMPORTED_MODULE_3__commands_AddDeleteParameterCmd__["a" /* default */](
                                        true, clipboardElement, clipboardElement.id,
                                        this.parameterContainer.getId(), -1, this);
                                    cmdGroup.addCommand(cmd);
                                } else if (clipboardElement.baseClass === 'Style') {
                                    cmd = new __WEBPACK_IMPORTED_MODULE_4__commands_AddDeleteStyleCmd__["a" /* default */](
                                        true, clipboardElement, clipboardElement.id,
                                        this.styleContainer.getId(), -1, this);
                                    cmdGroup.addCommand(cmd);
                                }
                            }
                            if (!cmdGroup.isEmpty()) {
                                this.executeCommand(cmdGroup);
                                let clearSelection = true;
                                for (let clipboardElement of this.clipboardElements) {
                                    this.selectObject(clipboardElement.id, clearSelection);
                                    clearSelection = false;
                                }
                            }
                            event.preventDefault();
                        }
                        break;
                    }
                    case 89: {
                        // Ctrl + Y: redo
                        this.redoCommand();
                        event.preventDefault();
                        break; 
                    }
                    case 90: {
                        // Ctrl + Z: undo
                        this.undoCommand();
                        event.preventDefault();
                        break;
                    }
                }
            } else {
                if (event.which === 27) {  // escape
                    this.popupWindow.hide();
                }
                else if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
                    switch (event.which) {
                        case 8:  // backspace
                        case 46: {  // delete
                            let cmdGroup = new __WEBPACK_IMPORTED_MODULE_6__commands_CommandGroupCmd__["a" /* default */]('Delete', this);
                            for (let selectionId of this.selections) {
                                let obj = this.getDataObject(selectionId);
                                if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */]) {
                                    obj.addCommandsForDelete(cmdGroup);
                                }
                            }
                            if (!cmdGroup.isEmpty()) {
                                this.executeCommand(cmdGroup);
                            }
                            event.preventDefault();
                            break;
                        }
                        case 37:  // left
                        case 38:  // up
                        case 39:  // right
                        case 40: {  // down
                            let cmdGroup = new __WEBPACK_IMPORTED_MODULE_6__commands_CommandGroupCmd__["a" /* default */]('Move element', this);
                            let tagId;
                            let field = (event.which === 37 || event.which === 39) ? 'x' : 'y';
                            let bandWidth = this.getDocumentProperties().getContentSize().width;
                            for (let selectionId of this.selections) {
                                let obj = this.getDataObject(selectionId);
                                if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */]) {
                                    if (event.which === 37 || event.which === 39) {
                                        tagId = obj.getXTagId();
                                    } else {
                                        tagId = obj.getYTagId();
                                    }
                                    if (tagId !== '') {
                                        let val = null;
                                        if (event.which === 37) {
                                            if (obj.getValue('xVal') > 0) {
                                                val = obj.getValue('xVal') - 1;
                                            }
                                        } else if (event.which === 38) {
                                            if (obj.getValue('yVal') > 0) {
                                                val = obj.getValue('yVal') - 1;
                                            }
                                        } else if (event.which === 39) {
                                            let containerSize = obj.getContainerContentSize();
                                            if ((obj.getValue('xVal') + obj.getValue('widthVal')) < containerSize.width) {
                                                val = obj.getValue('xVal') + 1;
                                            }
                                        } else if (event.which === 40) {
                                            let containerSize = obj.getContainerContentSize();
                                            if ((obj.getValue('yVal') + obj.getValue('heightVal')) < containerSize.height) {
                                                val = obj.getValue('yVal') + 1;											
                                            }
                                        }
                                        if (val !== null) {
                                            let cmd = new __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */](selectionId, tagId, field,
                                                val, __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */].type.text, this);
                                            cmdGroup.addCommand(cmd);
                                        }
                                    }
                                }
                            }
                            if (!cmdGroup.isEmpty()) {
                                this.executeCommand(cmdGroup);
                            }
                            event.preventDefault();
                            break;
                        }
                    }
                }
            }
        });
    }

    /**
     * Adds default parameters like page count/number.
     */
    addDefaultParameters() {
        for (let parameterData of [
                { name: 'page_count', type: __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.number, eval: false, editable: false, showOnlyNameType: true },
                { name: 'page_number', type: __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.number, eval: false, editable: false, showOnlyNameType: true }]) {
            let parameter = new __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */](this.getUniqueId(), parameterData, this);
            let parentPanel = this.mainPanel.getParametersItem();
            let panelItem = new __WEBPACK_IMPORTED_MODULE_30__menu_MainPanelItem__["a" /* default */](
                'parameter', parentPanel, parameter, { hasChildren: false, showAdd: false, showDelete: false, draggable: false }, this);
            parameter.setPanelItem(panelItem);
            parentPanel.appendChild(panelItem);
            parameter.setup();
            this.addParameter(parameter);
        }
    }

    render() {
        this.element.empty();
        if (this.getProperty('menuSidebar')) {
            this.element.addClass('rbroMenuPanelSidebar');
        }
        this.element.append('<div class="rbroLogo"></div>');
        this.element.append('<div class="rbroMenuPanel" id="rbro_menu_panel"></div>');
        this.element.append(
            `<div class="rbroContainer">
                <div class="rbroMainPanel" id="rbro_main_panel"><ul id="rbro_main_panel_list"></ul></div>
                <div class="rbroDetailPanel" id="rbro_detail_panel"></div>
                <div class="rbroDocumentPanel" id="rbro_document_panel"></div>
            </div>`);
        this.mainPanel.render();
        this.menuPanel.render();
        for (let panelName in this.detailPanels) {
            this.detailPanels[panelName].render();
        }
        this.detailPanels[this.activeDetailPanel].show(this.detailData);
        this.document.render();
        this.popupWindow.render();
        this.updateMenuButtons();

        $(document).mouseup(event => {
            this.document.mouseUp(event);
            this.popupWindow.hide();
        });
        this.element
            .on('dragstart', event => {
                // disable dragging per default, otherwise e.g. a text selection can be dragged in Chrome
                event.preventDefault();
           });
    }

    setup() {
        this.addDefaultParameters();
        this.headerBand.setup();
        this.contentBand.setup();
        this.footerBand.setup();
        this.documentProperties.setup();
    }

    initObjectMap() {
        this.addDataObject(this.headerBand);
        this.addDataObject(this.contentBand);
        this.addDataObject(this.footerBand);
        this.addDataObject(this.parameterContainer);
        this.addDataObject(this.styleContainer);
        this.addDataObject(this.documentProperties);
    }

    /**
     * Returns the label for given key.
     * @param {String} key
     * @returns {String} Label for given key, if it does not exist then the key is returned.
     */
    getLabel(key) {
        if (key in this.locale) {
            return this.locale[key];
        }
        return key;
    }

    getProperty(key) {
        return this.properties[key];
    }

    /**
     * Returns a new unique id which can be used for any data object.
     * @returns {Number}
     */
    getUniqueId() {
        return this.nextId++;
    }

    getMainPanel() {
        return this.mainPanel;
    }

    getDocument() {
        return this.document;
    }

    getPopupWindow() {
        return this.popupWindow;
    }

    getFonts() {
        return this.properties.fonts;
    }

    /**
     * Returns a list of all number and date patterns.
     * @returns {Object[]} Each item contains name (String), optional description (String) and optional separator (Boolean).
     */
    getPatterns() {
        let patterns = [];
        if (this.properties.patternNumbers.length > 0) {
            patterns.push({ separator: true, name: this.getLabel('patternSeparatorNumbers') });
            for (let pattern of this.properties.patternNumbers) {
                patterns.push(pattern);
            }
        }
        if (this.properties.patternDates.length > 0) {
            patterns.push({ separator: true, name: this.getLabel('patternSeparatorDates') });
            for (let pattern of this.properties.patternDates) {
                patterns.push(pattern);
            }
        }
        return patterns;
    }

    /**
     * Returns a list of parameter items.
     * Used for parameter popup window.
     * @param {DocElement|Parameter} obj - adds all parameters available for this object (which is either a doc element or a parameter).
     * For doc elements the parameters from the data source are included (e.g. array field parameters of a table data source).
     * @param {String[]} allowedTypes - specify allowed parameter types which will be added to the
     * parameters list. If not set all parameter types are allowed.
     * @returns {Object[]} Each item contains name (String), optional description (String) and
     * optional separator (Boolean).
     */
    getParameterItems(obj, allowedTypes) {
        let parameters = [];
        let parameterItems = this.getMainPanel().getParametersItem().getChildren();
        // dataSourceIndex is only needed for separator id which is used to hide the separator
        // when there are no data source parameters available (due to search filter)
        let dataSourceIndex = 0;
        let dataSources = [];
        if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */]) {
            obj.getAllDataSources(dataSources, null);
            for (let dataSource of dataSources) {
                if (dataSource.parameters.length > 0) {
                    parameters.push({
                        separator: true, separatorClass: 'rbroParameterDataSourceGroup', id: 'ds' + dataSourceIndex,
                        name: this.getLabel('parametersDataSource')
                    });
                    dataSourceIndex++;
                    for (let dataSourceParameter of dataSource.parameters) {
                        dataSourceParameter.appendParameterItems(parameters, allowedTypes);
                    }
                }
            }
        }

        parameters.push({ separator: true, name: this.getLabel('parameters') });
        let mapParameters = []; // add all parameters of collections at end of list with a header containing the collection name
        for (let parameterItem of parameterItems) {
            let parameter = parameterItem.getData();
            if (parameter.getValue('type') === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.map) {
                parameter.appendParameterItems(mapParameters, allowedTypes);
            } else {
                parameter.appendParameterItems(parameters, allowedTypes);
            }
        }
        return parameters.concat(mapParameters);
    }

    /**
     * Returns a list of all array field parameter items.
     * Used for parameter popup window.
     * @param {String} fieldType - allowed parameter type which will be added to the
     * parameter list. If empty all parameter types are allowed.
     * @returns {Object[]} Each item contains name (String), optional description (String) and
     * optional separator (Boolean).
     */
    getArrayFieldParameterItems(fieldType) {
        let parameters = [];
        let parameterItems = this.getMainPanel().getParametersItem().getChildren();
        parameters.push({ separator: true, name: this.getLabel('parameters') });
        for (let parameterItem of parameterItems) {
            let parameter = parameterItem.getData();
            if (parameter.getValue('type') === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.array) {
                parameter.appendFieldParameterItems(parameters, fieldType);
            }
        }
        return parameters;
    }

    getParameterByName(parameterName) {
        let parameters = this.getParameters();
        for (let parameter of parameters) {
            if (parameter.getValue('name') === parameterName) {
                return parameter;
            }
        }
        return null;
    }

    /**
     * Append document elements of given container.
     * @param {Container} container
     * @param {Boolean} asObjects - if true the document element instances are returned, otherwise
     * each instance is transformed to a js map.
     * @param {DocElement[]} docElements - list where document elements will be appended to.
     */
    appendContainerDocElements(container, asObjects, docElements) {
        let children = container.getPanelItem().getChildren();
        for (let child of children) {
            if (child.getData() instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */]) {
                let docElement = child.getData();
                if (asObjects) {
                    docElements.push(docElement);
                    // we are also adding all internal children (document elements which belong
                    // to other document elements and cannot be created independently),
                    // e.g. a table band or a table cell (table text) of a table element.
                    docElement.addChildren(docElements);
                } else {
                    // js map also includes data of internal children
                    docElements.push(docElement.toJS());
                }
                let containers = [];
                if (docElement instanceof __WEBPACK_IMPORTED_MODULE_16__elements_SectionElement__["a" /* default */]) {
                    containers = docElement.getLinkedContainers();
                } else {
                    let linkedContainer = docElement.getLinkedContainer();
                    if (linkedContainer !== null) {
                        containers.push(linkedContainer);
                    }
                }
                // add children of doc elements which represent containers, e.g. frames or section bands
                for (let container of containers) {
                    this.appendContainerDocElements(container, asObjects, docElements);
                }
            }
        }
    };

    /**
     * Get document elements of all bands.
     * @param {Boolean} asObjects - if true the document element instances are returned, otherwise
     * each instance is transformed to a js map.
     * @returns {DocElement[]} List of document elements.
     */
    getDocElements(asObjects) {
        let docElements = [];
        this.appendContainerDocElements(this.headerBand, asObjects, docElements);
        this.appendContainerDocElements(this.contentBand, asObjects, docElements);
        this.appendContainerDocElements(this.footerBand, asObjects, docElements);
        return docElements;
    }

    setDetailPanel(panelName, data) {
        this.detailPanels[this.activeDetailPanel].hide();
        this.activeDetailPanel = panelName;
        this.detailData = data;
        this.detailPanels[panelName].show(data);
    }

    updateDetailPanel() {
        this.detailPanels[this.activeDetailPanel].updateData(this.detailData);
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     * @param {[String]} field - affected field in case of change operation.
     */
    notifyEvent(obj, operation, field) {
        if (obj instanceof __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */]) {
            if (obj.getValue('type') === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.array || obj.getValue('type') === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.map) {
                $(`#rbro_menu_item_add${obj.getId()}`).show();
                $(`#rbro_menu_item_children${obj.getId()}`).show();
                $(`#rbro_menu_item_children_toggle${obj.getId()}`).show();
            } else {
                $(`#rbro_menu_item_add${obj.getId()}`).hide();
                $(`#rbro_menu_item_children${obj.getId()}`).hide();
                $(`#rbro_menu_item_children_toggle${obj.getId()}`).hide();
            }
        } else if (obj instanceof __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */]) {
            for (let docElement of this.docElements) {
                docElement.updateChangedStyle(obj.getId());
            }
            
        }
        for (let panelName in this.detailPanels) {
            this.detailPanels[panelName].notifyEvent(obj, operation);
        }
    }	

    addParameter(parameter) {
        this.addDataObject(parameter);
    }

    deleteParameter(parameter) {
        this.deleteDataObject(parameter);
    }

    addStyle(style) {
        this.addDataObject(style);
        this.notifyEvent(style, __WEBPACK_IMPORTED_MODULE_5__commands_Command__["a" /* default */].operation.add);
    }

    deleteStyle(style) {
        this.deleteDataObject(style);
        this.notifyEvent(style, __WEBPACK_IMPORTED_MODULE_5__commands_Command__["a" /* default */].operation.remove);
    }

    getStyles() {
        let styles = [];
        for (let styleItem of this.getMainPanel().getStylesItem().getChildren()) {
            styles.push(styleItem.getData());
        }
        return styles;
    }

    getParameters() {
        let parameters = [];
        for (let parameterItem of this.getMainPanel().getParametersItem().getChildren()) {
            parameters.push(parameterItem.getData());
        }
        return parameters;
    }

    addDocElement(element) {
        this.docElements.push(element);
        this.addDataObject(element);
    }

    deleteDocElement(element) {
        for (let i=0; i < this.docElements.length; i++) {
            if (this.docElements[i].getId() === element.getId()) {
                if (this.detailData === this.docElements[i]) {
                    this.setDetailPanel('none', null);
                }
                this.docElements.splice(i, 1);
                this.deleteDataObject(element);
                break;
            }
        }
    }

    getDetailData() {
        return this.detailData;
    }

    getDocumentProperties() {
        return this.documentProperties;
    }

    executeCommand(cmd) {
        cmd.do();
        if (this.lastCommandIndex < (this.commandStack.length - 1)) {
            this.commandStack = this.commandStack.slice(0, this.lastCommandIndex + 1);
        }
        if (!this.selectionSinceLastCommand && cmd instanceof __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */] && this.commandStack.length > 0) {
            // if previous and current command are both SetValueCmds and target the same text field,
            // we can discard the previous command and only keep the latest update
            let prevCmd = this.commandStack[this.commandStack.length - 1];
            if (prevCmd instanceof __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */] && prevCmd.allowReplace(cmd)) {
                cmd.oldValue = prevCmd.oldValue;
                this.commandStack = this.commandStack.slice(0, this.commandStack.length - 1);
                this.lastCommandIndex--;
            }
        }
        this.commandStack.push(cmd);
        this.lastCommandIndex++;
        this.modified = true;
        this.selectionSinceLastCommand = false;
        this.updateMenuButtons();
    }

    undoCommand() {
        if (this.lastCommandIndex >= 0) {
            this.commandStack[this.lastCommandIndex].undo();
            this.lastCommandIndex--;
            this.modified = true;
            this.updateMenuButtons();
        }
    }

    redoCommand() {
        if (this.lastCommandIndex < (this.commandStack.length - 1)) {
            this.lastCommandIndex++;
            this.commandStack[this.lastCommandIndex].do();
            this.modified = true;
            this.updateMenuButtons();
        }
    }

    updateMenuButtons() {
        $('#rbro_menu_save').prop('disabled', (this.commandStack.length === 0 || !this.modified));
        $('#rbro_menu_undo').prop('disabled', (this.lastCommandIndex < 0));
        $('#rbro_menu_redo').prop('disabled', (this.lastCommandIndex >= (this.commandStack.length - 1)));
    }

    updateMenuAlignButtons() {
        let elementCount = 0;
        let previousContainerOffset = { x: 0, y: 0 };
        let elementSameContainerOffsetX = true;
        let elementSameContainerOffsetY = true;
        for (let selectionId of this.selections) {
            let obj = this.getDataObject(selectionId);
            if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */] && obj.getXTagId() !== '') {
                elementCount++;
                let container = obj.getContainer();
                let offset = container.getOffset();
                if (elementCount === 1) {
                    previousContainerOffset = offset;
                } else {
                    if (offset.x !== previousContainerOffset.x) {
                        elementSameContainerOffsetX = false;
                    }
                    if (offset.y !== previousContainerOffset.y) {
                        elementSameContainerOffsetY = false;
                    }
                }
            }
        }
        if (elementCount > 1) {
            // allow alignment of elements if their parent container has the same x/y offset
            if (elementSameContainerOffsetX) {
                $('#rbro_menu_align').show();
            } else {
                $('#rbro_menu_align').hide();
            }
            if (elementSameContainerOffsetY) {
                $('#rbro_menu_valign').show();
            } else {
                $('#rbro_menu_valign').hide();
            }
            $('#rbo_menu_elements .rbroMenuButton').hide();
        } else {
            $('#rbro_menu_align').hide();
            $('#rbro_menu_valign').hide();
            $('#rbo_menu_elements .rbroMenuButton').show();
        }
    }

    debugCommandStack() {
        console.clear();		
        for (let i=0; i < this.commandStack.length; i++) {
            if (i > this.lastCommandIndex) {
                console.log('( ' + i + ' ' + this.commandStack[i].getName() + ' )');
            } else {
                console.log(i + ' ' + this.commandStack[i].getName());
            }
        }
    }

    addDataObject(obj) {
        this.objectMap[obj.getId()] = obj;
    }

    deleteDataObject(obj) {
        if (this.isSelectedObject(obj.getId())) {
            this.deselectObject(obj.getId());
        }
        if (obj.getId() in this.objectMap) {
            obj.remove();
            delete this.objectMap[obj.getId()];
        }
    }

    getDataObject(id) {
        if (id !== null && id in this.objectMap) {
            return this.objectMap[id];
        }
        return null;
    }

    isSelectedObject(id) {
        return this.selections.indexOf(id) !== -1;
    }

    isDocElementSelected() {
        for (let selectionId of this.selections) {
            let obj = this.getDataObject(selectionId);
            if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */]) {
                return true;
            }
        }
        return false;
    }

    isTableElementSelected(tableId) {
        for (let selectionId of this.selections) {
            let obj = this.getDataObject(selectionId);
            if (obj instanceof __WEBPACK_IMPORTED_MODULE_19__elements_TableTextElement__["a" /* default */]) {
                if (obj.getValue('tableId') === tableId) {
                    return true;
                }
            }
        }
        return false;
    }

    selectObject(id, clearSelection) {
        if (clearSelection) {
            this.deselectAll();
        }
        let obj = this.getDataObject(id);
        if (obj !== null) {
            this.selections.push(id);
            obj.select();
            if (obj.getPanelItem() !== null) {
                obj.getPanelItem().openParentItems();
                obj.getPanelItem().setActive();
            }
        }
        this.selectionSinceLastCommand = true;
        this.updateMenuAlignButtons();
    }

    deselectObject(id) {
        this.deselectObjectInternal(id, true);
        this.updateMenuAlignButtons();
    }

    deselectObjectInternal(id, updateSelections) {
        let obj = this.getDataObject(id);
        if (obj !== null) {
            obj.deselect();
            if (this.detailData === obj) {
                this.setDetailPanel('none', null);
                $('.rbroMenuItem').removeClass('rbroMenuItemActive');
            }
        }
        if (updateSelections) {
            let selectionIndex = this.selections.indexOf(id);
            if (selectionIndex !== -1) {
                this.selections.splice(selectionIndex, 1);
            }
        }
    }

    deselectAll() {
        for (let selectionId of this.selections) {
            this.deselectObjectInternal(selectionId, false);
        }
        this.selections = [];
        this.updateMenuAlignButtons();
    }

    getContainer(posX, posY, elementType) {
        let bestMatch = null;
        let bestMatchLevel = -1;
        for (let i = 0; i < this.containers.length; i++) {
            let container = this.containers[i];
            if (container.getLevel() > bestMatchLevel && container.isElementAllowed(elementType) &&
                    container.isInside(posX, posY)) {
                bestMatch = container;
                bestMatchLevel = container.getLevel();
            }
        }
        return bestMatch;
    }

    addContainer(container) {
        this.containers.push(container);
        this.addDataObject(container);
    }

    deleteContainer(container) {
        for (let i = 0; i < this.containers.length; i++) {
            if (this.containers[i].getId() === container.getId()) {
                this.containers.splice(i, 1);
                break;
            }
        }
        this.deleteDataObject(container);
    }

    /**
     * Store our own drag data because dataTransfer data of event is not available in
     * dragenter/dragover/dragleave events (in some browsers).
     */
    startBrowserDrag(browserDragType, browserDragElementType, browserDragId) {
        this.browserDragType = browserDragType;
        this.browserDragId = browserDragId;
        this.getDocument().startBrowserDrag(browserDragElementType);
    }

    isBrowserDragActive(browserDragType) {
        return this.browserDragType === browserDragType;
    }

    getBrowserDragId() {
        return this.browserDragId;
    }

    updateSelectionDrag(diffX, diffY, dragType, dragContainer, store) {
        let cmdGroup;
        if (store) {
            cmdGroup = new __WEBPACK_IMPORTED_MODULE_6__commands_CommandGroupCmd__["a" /* default */](dragType === __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */].dragType.element ? 'Update position' : 'Resize', this);
        }
        for (let selectionId of this.selections) {
            let obj = this.getDataObject(selectionId);
            if (obj !== null) {
                if (dragType !== __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */].dragType.element || obj.isDraggingAllowed()) {
                    obj.updateDrag(diffX, diffY, dragType, dragContainer, store ? cmdGroup : null);
                }
            }
        }
        if (store && !cmdGroup.isEmpty()) {
            this.executeCommand(cmdGroup);
        }
    }

    /**
     * Aligns all currently selected doc elements to each other.
     * @param {Style.alignment} alignment
     */
    alignSelections(alignment) {
        let alignVal = NaN;
        let x, y, width, height;
        let minX = Number.MAX_VALUE, maxX = Number.MIN_VALUE, minY = Number.MAX_VALUE, maxY = Number.MIN_VALUE;
        let elementCount = 0;
        for (let selectionId of this.selections) {
            let obj = this.getDataObject(selectionId);
            if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */] && obj.getXTagId() !== '') {
                elementCount++;
                x = obj.getValue('xVal');
                y = obj.getValue('yVal');
                width = obj.getValue('widthVal');
                height = obj.getValue('heightVal');
                if (x < minX) {
                    minX = x;
                }
                if ((x + width) > maxX) {
                    maxX = x + width;
                }
                if (y < minY) {
                    minY = y;
                }
                if ((y + height) > maxY) {
                    maxY = y + height;
                }
            }
        }
        let center = minX + ((maxX - minX) / 2);
        let vcenter  = minY + ((maxY - minY) / 2);
        if (elementCount > 1) {
            let cmdGroup = new __WEBPACK_IMPORTED_MODULE_6__commands_CommandGroupCmd__["a" /* default */]('Align elements', this);
            for (let selectionId of this.selections) {
                let obj = this.getDataObject(selectionId);
                if (obj instanceof __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */] && !(obj instanceof __WEBPACK_IMPORTED_MODULE_15__elements_PageBreakElement__["a" /* default */])) {
                    switch (alignment) {
                        case __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */].alignment.left: {
                            let cmd = new __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */](obj.getId(), obj.getXTagId(), 'x',
                                '' + minX, __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */].type.text, this);
                            cmdGroup.addCommand(cmd);
                        }
                        break;
                        case __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */].alignment.center: {
                            let cmd = new __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */](obj.getId(), obj.getXTagId(), 'x',
                                '' + (center - (obj.getValue('widthVal') / 2)), __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */].type.text, this);
                            cmdGroup.addCommand(cmd);
                        }
                        break;
                        case __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */].alignment.right: {
                            let cmd = new __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */](obj.getId(), obj.getXTagId(), 'x',
                                '' + (maxX - obj.getValue('widthVal')), __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */].type.text, this);
                            cmdGroup.addCommand(cmd);
                        }
                        break;
                        case __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */].alignment.top: {
                            let cmd = new __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */](obj.getId(), obj.getYTagId(), 'y',
                                '' + minY, __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */].type.text, this);
                            cmdGroup.addCommand(cmd);
                        }
                        break;
                        case __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */].alignment.middle: {
                            let cmd = new __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */](obj.getId(), obj.getYTagId(), 'y',
                                '' + (vcenter - (obj.getValue('heightVal') / 2)), __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */].type.text, this);
                            cmdGroup.addCommand(cmd);
                        }
                        break;
                        case __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */].alignment.bottom: {
                            let cmd = new __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */](obj.getId(), obj.getYTagId(), 'y',
                                '' + (maxY - obj.getValue('heightVal')), __WEBPACK_IMPORTED_MODULE_7__commands_SetValueCmd__["a" /* default */].type.text, this);
                            cmdGroup.addCommand(cmd);
                        }
                        break;
                    }
                }
            }
            this.executeCommand(cmdGroup);
        }
    }

    /**
     * Converts given value to a string which can be used in css style attribute
     * where a position or size must be specified.
     * @param {String|Number} val - a number value, can also be given as a string.
     * @returns {String}
     */
    toPixel(val) {
        if (val === '') {
            return '0px';
        }
        if ($.type(val) === 'string') {
            val = parseFloat(val.replace(',', '.'));
            if (isNaN(val)) {
                return '0px';
            }
        }
        return val + 'px';
    }

    createDocElement(docElementData) {
        let element = __WEBPACK_IMPORTED_MODULE_2__commands_AddDeleteDocElementCmd__["a" /* default */].createElement(
            docElementData.id, docElementData, docElementData.elementType, -1, false, this);
        let maxId = element.getMaxId();
        if (maxId >= this.nextId) {
            this.nextId = maxId + 1;
        }
        return element;
    }

    createParameter(parameterData) {
        let parameter = new __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */](parameterData.id, parameterData, this);
        let parentPanel = this.mainPanel.getParametersItem();
        let panelItem = new __WEBPACK_IMPORTED_MODULE_30__menu_MainPanelItem__["a" /* default */](
            'parameter', parentPanel, parameter,
            { hasChildren: true, showAdd: parameter.getValue('editable'), showDelete: parameter.getValue('editable'), draggable: true }, this);
        parameter.setPanelItem(panelItem);
        parentPanel.appendChild(panelItem);
        parameter.setup();
        if (parameter.getValue('type') !== __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.array && parameter.getValue('type') !== __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.map) {
            $(`#rbro_menu_item_add${parameter.getId()}`).hide();
            $(`#rbro_menu_item_children${parameter.getId()}`).hide();
            $(`#rbro_menu_item_children_toggle${parameter.getId()}`).hide();
        }
        this.addParameter(parameter);
        let maxId = parameter.getMaxId();
        if (maxId >= this.nextId) {
            this.nextId = maxId + 1;
        }
    }

    createStyle(styleData) {
        let style = new __WEBPACK_IMPORTED_MODULE_12__data_Style__["a" /* default */](styleData.id, styleData, this);
        let parentPanel = this.mainPanel.getStylesItem();
        let panelItem = new __WEBPACK_IMPORTED_MODULE_30__menu_MainPanelItem__["a" /* default */]('style', parentPanel, style, { draggable: true }, this);
        style.setPanelItem(panelItem);
        parentPanel.appendChild(panelItem);
        this.addStyle(style);
        if (styleData.id >= this.nextId) {
            this.nextId = styleData.id + 1;
        }
    }

    /**
     * Shows a global loading image which disables all controls.
     */
    showLoading() {
        if ($('#rbro_loading_div').length == 0) {
            $('body').append('<div id="rbro_loading_div" class="rbroLoadingIndicator"></div>');
        }
    }

    /**
     * Hides global loading image.
     */
    hideLoading() {
        $('#rbro_loading_div').remove();
    }

    getTestData() {
        let ret = {};
        for (let parameter of this.getParameters()) {
            if (!parameter.getValue('showOnlyNameType')) {
                let type = parameter.getValue('type');
                if (type === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.map) {
                    let testData = {};
                    for (let child of parameter.getChildren()) {
                        testData[child.getName()] = child.getValue('testData');
                    }
                    ret[parameter.getName()] = testData;
                } else if (type === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.array) {
                    ret[parameter.getName()] = parameter.getTestDataRows(false);
                } else if (type === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.simpleArray) {
                    let testDataRows = [];
                    // because test data rows are stored as map items we convert the list to a list of simple values
                    for (let testDataRow of parameter.getTestDataRows(false)) {
                        if ('data' in testDataRow) {
                            testDataRows.push(testDataRow['data']);
                        }
                    }
                    ret[parameter.getName()] = testDataRows;
                } else if (type === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.string || type === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.number || type === __WEBPACK_IMPORTED_MODULE_11__data_Parameter__["a" /* default */].type.date) {
                    ret[parameter.getName()] = parameter.getValue('testData');
                }
            }
        }
        return ret;
    }

    processErrors(errors) {
        for (let error of errors) {
            if (error.object_id) {
                $(`#rbro_menu_item${error.object_id}`).addClass('rbroError');
                let obj = this.getDataObject(error.object_id);
                if (obj !== null) {
                    obj.addError(error);
                }
            }
        }
        if (errors.length > 0) {
            this.detailPanels[this.activeDetailPanel].updateErrors();
            this.selectObject(errors[0].object_id, true);
        }
    }

    /**
     * Performs ajax request to upload the report and either update displayed errors or
     * display report pdf in case report is valid.
     * @param {Object} data - report data.
     * @param {Boolean} isTestData - true if data contains test data from parameters.
     */
    previewInternal(data, isTestData) {
        let self = this;
        $('.rbroMenuItem').removeClass('rbroError');
        for (let objId in this.objectMap) {
            this.objectMap[objId].clearErrors();
        }
        this.detailPanels[this.activeDetailPanel].updateErrors();
        this.showLoading();
        $.ajax(this.properties.reportServerUrl, {
            data: JSON.stringify({
                report: this.getReport(),
                outputFormat: __WEBPACK_IMPORTED_MODULE_10__data_DocumentProperties__["a" /* default */].outputFormat.pdf,
                data: data,
                isTestData: isTestData
            }),
            type: "PUT", contentType: "application/json",
            timeout: this.properties.reportServerTimeout,
            crossDomain: this.properties.reportServerUrlCrossDomain,
            success: function(data) {
                self.hideLoading();
                let pdfPrefix = 'data:application/pdf';
                if (data.substr(0, 4) === 'key:') {
                    self.reportKey = data.substr(4);
                    self.getDocument().openPdfPreviewTab(self.properties.reportServerUrl + '?key=' + self.reportKey + '&outputFormat=pdf');
                } else {
                    self.reportKey = null;
                    try {
                        let obj = JSON.parse(data);
                        if (obj.errors.length > 0) {
                            self.processErrors(obj.errors);
                        }
                    } catch (e) {
                        alert('preview failed');
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                self.hideLoading();
                if (textStatus === "timeout") {
                    alert('preview failed (timeout)');
                } else {
                    alert('preview failed');
                }
            }
        });
    }

    ///////////////////////////////////////////////////////////////////////////
    // API functions
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Sets the internal modified flag.
     * If true the save button is enabled, otherwise the save button is disabled.
     * @param {Boolean} modified
     */
    setModified(modified) {
        this.modified = modified;
        this.updateMenuButtons();
    }

    /**
     * Returns report object containing everything needed for the report.
     * @returns {Object}
     */
    getReport() {
        let ret = { docElements: [], parameters: [], styles: [], version: 2 };
        let i;
        ret.docElements = this.getDocElements(false);
        for (let parameter of this.getParameters()) {
            ret.parameters.push(parameter.toJS());
        }
        for (let style of this.getStyles()) {
            ret.styles.push(style.toJS());
        }
        ret.documentProperties = this.documentProperties.toJS();
        
        return ret;
    }

    /**
     * Either calls saveCallback (if available) or stores report in local storage (if key is available).
     */
    save() {
        if (this.properties.saveCallback) {
            this.properties.saveCallback();
        } else if (this.properties.localStorageReportKey) {
            if ('localStorage' in window && window['localStorage'] !== null) {
                try {
                    let report = this.getReport();
                    // console.log(JSON.stringify(report));
                    window.localStorage.setItem(this.properties.localStorageReportKey, JSON.stringify(report));
                    this.modified = false;
                } catch (e) {
                }
            }
        }
        this.updateMenuButtons();
    }

    /**
     * Loads report object into ReportBro Designer.
     * @param {Object} report - the report object.
     */
    load(report) {
        for (let parameter of this.getParameters()) {
            this.deleteParameter(parameter);
        }
        for (let style of this.getStyles()) {
            this.deleteStyle(style);
        }
        
        this.nextId = 1;
        this.setDetailPanel('none', null);
        this.docElements = [];
        this.objectMap = {};
        this.initObjectMap();
        this.selections = [];
        this.getMainPanel().clearAll();
        this.getMainPanel().getHeaderItem().close();
        this.getMainPanel().getDocumentItem().close();
        this.getMainPanel().getFooterItem().close();
        this.getMainPanel().getParametersItem().close();
        this.getMainPanel().getStylesItem().close();

        if (report.version < 2) {
            for (let docElementData of report.docElements) {
                if (docElementData.elementType === __WEBPACK_IMPORTED_MODULE_13__elements_DocElement__["a" /* default */].type.table) {
                    docElementData.contentDataRows = [docElementData.contentData];
                    docElementData.contentRows = '1';
                }
            }
        }

        this.documentProperties.setInitialData(report.documentProperties);
        this.documentProperties.setup();

        for (let styleData of report.styles) {
            this.createStyle(styleData);
        }
        for (let parameterData of report.parameters) {
            this.createParameter(parameterData);
        }
        for (let docElementData of report.docElements) {
            this.createDocElement(docElementData);
        }

        this.browserDragType = '';
        this.browserDragId = '';

        this.commandStack = [];
        this.lastCommandIndex = -1;
        this.modified = false;
        this.updateMenuButtons();
    }

    /**
     * Loads report from local storage (if key and report is available).
     */
    loadLocalReport() {
        if (this.properties.localStorageReportKey) {
            if ('localStorage' in window && window['localStorage'] !== null) {
                let report = null;
                try {
                    report = JSON.parse(window.localStorage[this.properties.localStorageReportKey]);
                } catch (e) {
                }
                if (report !== null) {
                    this.load(report);
                }
            }
        }
    }
  
    preview() {
        this.previewInternal(this.getTestData(), true);
    }

    previewWithData(data) {
        this.previewInternal(data, false);
    }

    /**
     * Downloads spreadsheet file for a report where a preview was executed before.
     */
    downloadSpreadsheet() {
        if (this.reportKey !== null) {
            window.open(this.properties.reportServerUrl + '?key=' + this.reportKey + '&outputFormat=xlsx', '_blank');
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReportBro;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Container__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Document__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * A frame container which can contain various doc elements.
 * @class
 */
class Frame extends __WEBPACK_IMPORTED_MODULE_0__Container__["a" /* default */] {
    constructor(id, name, rb) {
        super(id, name, rb);
    }

    /**
     * Called after initialization is finished.
     */
    setup() {
        this.el = this.rb.getDocument().getElement(this.band);
    }

    /**
     * Returns true if the given element type can be added to this container.
     * @param {String} elementType
     */
    isElementAllowed(elementType) {
        return elementType !== __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.pageBreak && elementType !== __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.frame &&
            elementType !== __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.section;
    }

    /**
     * Returns absolute container offset.
     * @returns {Object} x and y offset coordinates.
     */
    getOffset() {
        let x = 0, y = 0;
        if (this.owner !== null) {
            x = this.owner.getValue('xVal');
            y = this.owner.getValue('yVal');
        }
        if (this.parent !== null) {
            let offset = this.parent.getOffset();
            x += offset.x;
            y += offset.y;
        }
        return { x: x, y: y };
    }

    /**
     * Returns container size.
     * @returns {Object} width and height of container.
     */
    getSize() {
        let width = 0, height = 0;
        if (this.owner !== null) {
            width = this.owner.getValue('widthVal');
            height = this.owner.getValue('heightVal');
        }
        return { width: width, height: height };
    }
    
    /**
     * Returns container content size.
     * This is the container minus optional borders, thus the available area for
     * elements inside the frame.
     * @returns {Object} width and height of container content area.
     */
    getContentSize() {
        let width = 0, height = 0;
        if (this.owner !== null) {
            width = this.owner.getValue('widthVal');
            height = this.owner.getValue('heightVal');
            let borderWidth = this.owner.getValue('borderWidthVal');
            if (this.owner.getValue('borderLeft')) {
                width -= borderWidth;
            }
            if (this.owner.getValue('borderRight')) {
                width -= borderWidth;
            }
            if (this.owner.getValue('borderTop')) {
                height -= borderWidth;
            }
            if (this.owner.getValue('borderBottom')) {
                height -= borderWidth;
            }
        }
        return { width: width, height: height };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Frame;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Barcode doc element. Currently only Code-128 is supported.
 * @class
 */
class BarCodeElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementImage'), id, 80, 80, rb);
        this.elBarCode = null;
        this.content = '';
        this.format = 'CODE128';
        this.displayValue = true;
        this.spreadsheet_hide = false;
        this.spreadsheet_column = '';
        this.spreadsheet_colspan = '';
        this.spreadsheet_addEmptyRow = false;
        this.setInitialData(initialData);
        this.name = this.rb.getLabel('docElementBarCode');
        $(`#rbro_menu_item_name${this.id}`).text(this.name);
    }

    setup(openPanelItem) {
        super.setup(openPanelItem);
        this.createElement();
        if (this.content !== '') {
            this.updateBarCode();
        }
        this.updateDisplay();
        this.updateStyle();
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);
        if (field === 'content' ||field === 'format' || field === 'displayValue' || field === 'height') {
            this.updateBarCode();
            this.updateDisplay();
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'x', 'y', 'height', 'content', 'format', 'displayValue',
            'printIf', 'removeEmptyElement',
            'spreadsheet_hide', 'spreadsheet_column', 'spreadsheet_colspan', 'spreadsheet_addEmptyRow'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.barCode;
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { left: this.rb.toPixel(x), top: this.rb.toPixel(y),
                width: this.rb.toPixel(width), height: this.rb.toPixel(height) };
            this.el.css(props);
        }
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return ['N', 'S'];
    }

    getXTagId() {
        return 'rbro_bar_code_element_position_x';
    }

    getYTagId() {
        return 'rbro_bar_code_element_position_y';
    }

    getHeightTagId() {
        return 'rbro_bar_code_element_height';
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroDocElement rbroBarCodeElement"></div>`);
        this.elBarCode = $('<canvas></canvas>');
        this.el.append(this.elBarCode);
        this.appendToContainer();
        this.updateBarCode();
        super.registerEventHandlers();
    }

    remove() {
        super.remove();
    }

    updateBarCode() {
        let valid = false;
        let options = { format: this.format, height: this.displayValue ? (this.heightVal - 22) : this.heightVal,
                margin: 0, displayValue: this.displayValue };
        if (this.content !== '' && this.content.indexOf('${') === -1) {
            try {
                this.elBarCode.JsBarcode(this.content, options);
                valid = true;
            } catch (ex) {
            }
        }
        if (!valid) {
            // in case barcode cannot be created because of invalid input use default content appropriate
            // for selected format
            let content = '';
            if (this.format === 'CODE39' || this.format === 'CODE128') {
                content = '12345678';
            } else if (this.format === 'EAN13') {
                content = '5901234123457';
            } else if (this.format === 'EAN8') {
                content = '96385074';
            } else if (this.format === 'EAN5') {
                content = '12345';
            } else if (this.format === 'EAN2') {
                content = '12';
            } else if (this.format === 'ITF14') {
                content = '12345678901231';
            } else if (this.format === 'MSI' ||this.format === 'MSI10' || this.format === 'MSI11' ||
                    this.format === 'MSI1010' || this.format === 'MSI1110' || this.format == 'pharmacode') {
                content = '1234';
            }
            this.elBarCode.JsBarcode(content, options);
        }
        this.widthVal = this.elBarCode.width();
        this.width = '' + this.widthVal;
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_bar_code_element_content', 'content', cmdGroup);
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_bar_code_element_print_if', 'printIf', cmdGroup);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BarCodeElement;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Image doc element. Supported formats are png and jpg.
 * @class
 */
class ImageElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementImage'), id, 80, 80, rb);
        this.source = '';
        this.image = '';
        this.imageWidth = 0;
        this.imageHeight = 0;
        this.imageRatio = 0;
        this.imageFilename = '';
        this.elImg = null;
        this.horizontalAlignment = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].alignment.left;
        this.verticalAlignment = __WEBPACK_IMPORTED_MODULE_2__data_Style__["a" /* default */].alignment.top;
        this.backgroundColor = '';
        this.spreadsheet_hide = false;
        this.spreadsheet_column = '';
        this.spreadsheet_addEmptyRow = false;
        this.setInitialData(initialData);
    }

    setup(openPanelItem) {
        super.setup(openPanelItem);
        this.createElement();
        if (this.image !== '') {
            // setImage must be called after createElement so load event handler of image element is triggered
            this.setImage(this.image);
        }
        this.updateDisplay();
        this.updateStyle();
        this.updateName();
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);
        if (field === 'source' || field === 'imageFilename') {
            this.updateName();
        } else if (field === 'image') {
            this.setImage(value);
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'x', 'y', 'width', 'height', 'source', 'image', 'imageFilename',
            'horizontalAlignment', 'verticalAlignment', 'backgroundColor',
            'printIf', 'removeEmptyElement',
            'spreadsheet_hide', 'spreadsheet_column', 'spreadsheet_addEmptyRow'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.image;
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { left: this.rb.toPixel(x), top: this.rb.toPixel(y),
                width: this.rb.toPixel(width), height: this.rb.toPixel(height) };
            this.el.css(props);

            let imgWidth = 0;
            let imgHeight = 0;
            if (this.imageRatio !== 0) {
                imgWidth = (this.imageWidth < width) ? this.imageWidth : width;
                imgHeight = (this.imageHeight < height) ? this.imageHeight : height;
                if (imgWidth !== this.imageWidth || imgHeight !== this.imageHeight) {
                    let scaledWidth = Math.floor(imgHeight * this.imageRatio);
                    if (scaledWidth < width) {
                        imgWidth = scaledWidth;
                    } else {
                        imgHeight = Math.floor(imgWidth / this.imageRatio);
                    }
                }
            }
            this.elImg.css({ width: this.rb.toPixel(imgWidth), height: this.rb.toPixel(imgHeight) });
        }
    }

    updateStyle() {
        let styleProperties = {};
        let horizontalAlignment = this.getValue('horizontalAlignment');
        let verticalAlignment = this.getValue('verticalAlignment');
        let alignClass = 'rbroDocElementAlign' + horizontalAlignment.charAt(0).toUpperCase() + horizontalAlignment.slice(1);
        let valignClass = 'rbroDocElementVAlign' + verticalAlignment.charAt(0).toUpperCase() + verticalAlignment.slice(1);
        styleProperties['text-align'] = horizontalAlignment;
        styleProperties['vertical-align'] = verticalAlignment;
        styleProperties['background-color'] = this.getValue('backgroundColor');
        $(`#rbro_el_content${this.id}`).css(styleProperties);
        $(`#rbro_el_content${this.id}`).removeClass().addClass('rbroContentContainerHelper').addClass(alignClass).addClass(valignClass);
    }

    getXTagId() {
        return 'rbro_image_element_position_x';
    }

    getYTagId() {
        return 'rbro_image_element_position_y';
    }

    getWidthTagId() {
        return 'rbro_image_element_width';
    }

    getHeightTagId() {
        return 'rbro_image_element_height';
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroDocElement rbroImageElement"></div>`);
        this.elImg = $('<img src="">')
            .on('load', event => {
                // get image width and height in load event, because width/height are not
                // directly available in some browsers after setting src
                this.imageWidth = this.elImg.get(0).naturalWidth;
                this.imageHeight = this.elImg.get(0).naturalHeight;
                if (this.imageHeight !== 0) {
                    this.imageRatio = this.imageWidth / this.imageHeight;
                } else {
                    this.imageRatio = 0;
                }
                this.updateDisplay();
            });
        this.el
            .append($(`<div id="rbro_el_content${this.id}" class="rbroContentContainerHelper"></div>`)
                .append(this.elImg)
            );
        this.appendToContainer();
        this.setImage(this.image);
        super.registerEventHandlers();
    }

    remove() {
        this.elImg = null;
        super.remove();
    }

    setImage(imgBase64) {
        this.elImg.attr('src', '');
        if (imgBase64 !== '') {
            this.elImg.attr('src', imgBase64);
        } else {
            this.imageWidth = 0;
            this.imageHeight = 0;
            this.imageRatio = 0;
            this.updateDisplay();
        }
    }

    updateName() {
        if (this.getValue('imageFilename').trim() !== '') {
            this.name = this.getValue('imageFilename')
        } else if (this.getValue('source').trim() !== '') {
            this.name = this.getValue('source');
        } else {
            this.name = this.rb.getLabel('docElementImage');
        }
        $(`#rbro_menu_item_name${this.id}`).text(this.name);
        $(`#rbro_menu_item_name${this.id}`).attr('title', this.name);
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_image_element_source', 'source', cmdGroup);
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_image_element_print_if', 'printIf', cmdGroup);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageElement;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);


/**
 * Line doc element. Currently only horizontal lines are supported.
 * @class
 */
class LineElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, rb) {
        super(rb.getLabel('docElementLine'), id, 100, 1, rb);
        this.color = '#000000';
        this.setInitialData(initialData);
    }

    setup(openPanelItem) {
        super.setup(openPanelItem);
        this.createElement();
        this.updateDisplay();
        this.updateStyle();
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);
        if (field === 'color') {
            this.updateStyle();
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        return ['id', 'containerId', 'x', 'y', 'width', 'height', 'color', 'printIf'];
    }

    getElementType() {
        return __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */].type.line;
    }

    updateStyle() {
        let styleProperties = {};
        styleProperties['background-color'] = this.getValue('color');
        this.el.css(styleProperties);
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return ['E', 'W'];
    }

    getXTagId() {
        return 'rbro_line_element_position_x';
    }

    getYTagId() {
        return 'rbro_line_element_position_y';
    }

    getWidthTagId() {
        return 'rbro_line_element_width';
    }

    getHeightTagId() {
        return 'rbro_line_element_height';
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroDocElement rbroLineElement"></div>`);
        this.appendToContainer();
        super.registerEventHandlers();
    }

    /**
     * Adds SetValue commands to command group parameter in case the specified parameter is used in any of
     * the object fields.
     * @param {Parameter} parameter - parameter which will be renamed.
     * @param {String} newParameterName - new name of the parameter.
     * @param {CommandGroupCmd} cmdGroup - possible SetValue commands will be added to this command group.
     */
    addCommandsForChangedParameterName(parameter, newParameterName, cmdGroup) {
        this.addCommandForChangedParameterName(parameter, newParameterName, 'rbro_line_element_print_if', 'printIf', cmdGroup);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineElement;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Document__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Section band doc element. This is the header, content or footer of a custom section.
 *  All Elements inside the band are positioned relative.
 * @class
 */
class SectionBandElement extends __WEBPACK_IMPORTED_MODULE_0__DocElement__["a" /* default */] {
    constructor(id, initialData, bandType, rb) {
        let name = (bandType === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.header) ?
            rb.getLabel('bandHeader') : ((bandType === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.footer) ? rb.getLabel('bandFooter') : rb.getLabel('bandContent'));
        super(name, id, 0, 100, rb);
        this.band = null;
        this.bandType = bandType;
        this.repeatHeader = false;
        this.alwaysPrintOnSamePage = true;
        this.shrinkToContentHeight = false;
        this.parentId = initialData.parentId;

        this.heightVal = 0;
        this.visible = (bandType === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.content);

        this.setInitialData(initialData);
    }

    setup() {
        this.createElement();
        this.updateDisplay();
        this.updateStyle();

        if (this.linkedContainerId === null) {
            this.linkedContainerId = this.rb.getUniqueId();
        }
        this.band = new __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */](this.bandType, true, this.linkedContainerId, 'section_' + this.bandType + '_' + this.linkedContainerId, this.rb);
        this.band.init(this);
        this.rb.addContainer(this.band);
    }

    /**
     * Do not register any event handlers so element cannot be selected.
     */
    registerEventHandlers() {
    }

    /**
     * Returns highest id of this component, this is the id of the linked container because it is
     * created after the band element.
     * @returns {Number}
     */
    getMaxId() {
        return this.linkedContainerId;
    }

    /**
     * Returns absolute position inside document.
     * @returns {Object} x and y coordinates.
     */
    getAbsolutePosition() {
        let pos = { x: 0, y: 0 };
        let parent = this.rb.getDataObject(this.parentId);
        if (parent !== null) {
            pos = parent.getAbsolutePosition();
        }
        pos.y += this.yVal;
        return pos;
    }

    setValue(field, value, elSelector, isShown) {
        super.setValue(field, value, elSelector, isShown);

        if (field === 'height') {
            this[field + 'Val'] = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* convertInputToNumber */](value);
            let parent = this.rb.getDataObject(this.parentId);
            if (parent !== null) {
                parent.updateBands(this);
            }
        }
    }

    /**
     * Returns all data fields of this object. The fields are used when serializing the object.
     * @returns {String[]}
     */
    getFields() {
        let fields = ['id', 'containerId', 'linkedContainerId', 'height', 'alwaysPrintOnSamePage', 'shrinkToContentHeight'];
        if (this.bandType === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.header) {
            fields.push('repeatHeader');
        }
        return fields;
    }

    updateDisplayInternal(x, y, width, height) {
        if (this.el !== null) {
            let props = { top: this.rb.toPixel(y), width: '100%', height: this.rb.toPixel(height) };
            this.el.css(props);
        }
    }

    /**
     * Returns allowed sizers when element is selected.
     * @returns {String[]}
     */
    getSizers() {
        return [];
    }

    getHeightTagId() {
        return 'rbro_section_band_element_height';
    }

    getHeight() {
        return this.heightVal;
    }

    isDraggingAllowed() {
        return false;
    }

    createElement() {
        this.el = $(`<div id="rbro_el${this.id}" class="rbroSectionBandElement rbroElementContainer"></div>`);
        this.el.append($(`<div class="rbroDocumentBandDescription">${this.rb.getLabel('docElementSection')} ${this.name}</div>`));
        $(`#rbro_el${this.parentId}`).append(this.el);
    }

    getContentElement() {
        return this.el;
    }

    getParent() {
        return this.rb.getDataObject(this.parentId);
    }

    show(visible) {
        this.visible = visible;
        if (visible) {
            $(`#rbro_el${this.id}`).removeClass('rbroHidden');
        } else {
            $(`#rbro_el${this.id}`).addClass('rbroHidden');
        }
    }

    isVisible() {
        return this.visible;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SectionBandElement;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainPanelItem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__container_Container__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Document__ = __webpack_require__(9);




/**
 * Main panel which contains all report elements like doc elements, parameters and styles.
 * The main panel shows the structure and all components of the report.
 * @class
 */
class MainPanel {
    constructor(rootElement, headerBand, contentBand, footerBand, parameterContainer, styleContainer, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.headerItem = new __WEBPACK_IMPORTED_MODULE_0__MainPanelItem__["a" /* default */](
            'band', null, headerBand,
            { hasChildren: true, showAdd: false, showDelete: false, hasDetails: false, visible: this.rb.getDocumentProperties().getValue('header') }, rb);
        
        this.documentItem = new __WEBPACK_IMPORTED_MODULE_0__MainPanelItem__["a" /* default */](
            'band', null, contentBand,
            { hasChildren: true, showAdd: false, showDelete: false, hasDetails: false }, rb);
        
        this.footerItem = new __WEBPACK_IMPORTED_MODULE_0__MainPanelItem__["a" /* default */](
            'band', null, footerBand,
            { hasChildren: true, showAdd: false, showDelete: false, hasDetails: false, visible: this.rb.getDocumentProperties().getValue('footer') }, rb);

        this.parametersItem = new __WEBPACK_IMPORTED_MODULE_0__MainPanelItem__["a" /* default */](
            'parameter', null, parameterContainer,
            { hasChildren: true, showAdd: rb.getProperty('adminMode'), showDelete: false, hasDetails: false }, rb);

        this.stylesItem = new __WEBPACK_IMPORTED_MODULE_0__MainPanelItem__["a" /* default */](
            'style', null, styleContainer,
            { hasChildren: true, showAdd: true, showDelete: false, hasDetails: false }, rb);
        
        this.documentPropertiesItem = new __WEBPACK_IMPORTED_MODULE_0__MainPanelItem__["a" /* default */](
            'documentProperties', null, rb.getDocumentProperties(), { showDelete: false, hasDetails: true }, rb);
        
        this.items = [
            this.headerItem,
            this.documentItem,
            this.footerItem,
            this.parametersItem,
            this.stylesItem,
            this.documentPropertiesItem
        ];

        headerBand.setPanelItem(this.headerItem);
        contentBand.setPanelItem(this.documentItem);
        footerBand.setPanelItem(this.footerItem);
        parameterContainer.setPanelItem(this.parametersItem);
        styleContainer.setPanelItem(this.stylesItem);
    }

    getHeaderItem() {
        return this.headerItem;
    }

    getDocumentItem() {
        return this.documentItem;
    }

    getFooterItem() {
        return this.footerItem;
    }

    getParametersItem() {
        return this.parametersItem;
    }

    getStylesItem() {
        return this.stylesItem;
    }

    getContainerByItem(item) {
        while (item !== null) {
            if (item.getData() instanceof __WEBPACK_IMPORTED_MODULE_1__container_Container__["a" /* default */]) {
                return item.getData();
            }
            item = item.getParent();
        }
        return null;
    }

    getDocumentPropertiesItem() {
        return this.documentPropertiesItem;
    }

    render() {
        let panel = $('#rbro_main_panel_list');
        this.appendChildren(panel, this.items);
    }

    appendChildren(el, items) {
        for (let item of items) {
            el.append(item.getElement());
            let children = item.getChildren();
            if (children.length > 0) {
                let elChildren = $(`#${item.getId()}_children`);
                this.appendChildren(el, children);
            }
        }
    }

    showHeader() {
        this.headerItem.show();
    }

    hideHeader() {
        this.headerItem.hide();
    }

    showFooter() {
        this.footerItem.show();
    }

    hideFooter() {
        this.footerItem.hide();
    }

    clearAll() {
        for (let item of this.items) {
            item.clear();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainPanel;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__ = __webpack_require__(1);



/**
 * The menu panel contains all menu buttons.
 * @class
 */
class MenuPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
    }

    render() {
        let menuShowButtonLabels = this.rb.getProperty('menuShowButtonLabels');
        let menuButtonClass = menuShowButtonLabels ? '' : 'rbroHidden';
        let panel = $('#rbro_menu_panel');
        let panelLeft = $('<div class="rbroToolButtonContainer"></div>');
        if (this.rb.getProperty('saveCallback') || this.rb.getProperty('localStorageReportKey')) {
            panelLeft.append($(`<button id="rbro_menu_save" class="rbroButton rbroMenuButton" title="${this.rb.getLabel('menuSaveTip')}">
                    <span class="rbroIcon-save"></span><span class="${menuButtonClass}">${this.rb.getLabel('menuSave')}</span></button>`)
                .click(event => {
                    this.rb.save();
                })
            );
        }
        panelLeft.append($(`<button id="rbro_menu_undo" class="rbroButton rbroMenuButton" title="${this.rb.getLabel('menuUndoTip')}">
                <span class="rbroIcon-undo"></span><span class="${menuButtonClass}">${this.rb.getLabel('menuUndo')}</span></button>`)
            .click(event => {
                this.rb.undoCommand();
            })
        );
        panelLeft.append($(`<button id="rbro_menu_redo" class="rbroButton rbroMenuButton" title="${this.rb.getLabel('menuRedoTip')}">
                <span class="rbroIcon-redo"></span><span class="${menuButtonClass}">${this.rb.getLabel('menuRedo')}</span></button>`)
            .click(event => {
                this.rb.redoCommand();
            })
        );
        panelLeft.append($(`<button id="rbro_menu_preview" class="rbroButton rbroMenuButton" title="${this.rb.getLabel('menuPreviewTip')}">
                <span class="rbroIcon-play"></span><span class="${menuButtonClass}">${this.rb.getLabel('menuPreview')}</span></button>`)
            .click(event => {
                this.rb.preview();
            })
        );
        panel.append(panelLeft);

        let panelRight = $('<div class="rbroElementButtonContainer"></div>');
        let elElementsDiv = $('<div id="rbo_menu_elements" class="rbroElementButtons"></div>');
        elElementsDiv.append($(`<div id="rbro_menu_element_text" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementText')}">
                    <span class="rbroIcon-text"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');  // without setData dragging does not work in FF
                event.originalEvent.dataTransfer.effectAllowed = 'copy';

                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.text, '');

                // avoid calling dragstart handler for main div which disables dragging for all other elements
                event.stopPropagation();
            })
        );
        elElementsDiv.append($(`<div id="rbro_menu_element_line" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementLine')}">
                    <span class="rbroIcon-line"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.line, '');
                event.stopPropagation();
            })
        );
        elElementsDiv.append($(`<div id="rbro_menu_element_image" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementImage')}">
                    <span class="rbroIcon-image"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.image, '');
                event.stopPropagation();
            })
        );
        elElementsDiv.append($(`<div id="rbro_menu_element_bar_code" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementBarCode')}">
                    <span class="rbroIcon-barcode"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.barCode, '');
                event.stopPropagation();
            })
        );
        elElementsDiv.append($(`<div id="rbro_menu_element_table" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementTable')}">
                    <span class="rbroIcon-table"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.table, '');
                event.stopPropagation();
            })
        );
        elElementsDiv.append($(`<div id="rbro_menu_element_frame" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementFrame')}">
                    <span class="rbroIcon-frame"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.frame, '');
                event.stopPropagation();
            })
        );
        elElementsDiv.append($(`<div id="rbro_menu_element_section" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementSection')}">
                    <span class="rbroIcon-section"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.section, '');
                event.stopPropagation();
            })
        );
        elElementsDiv.append($(`<div id="rbro_menu_element_page_break" class="rbroButton rbroMenuButton" draggable="true"
                title="${this.rb.getLabel('docElementPageBreak')}">
                    <span class="rbroIcon-page-break"></span>
                </div>`)
            .on('dragstart', event => {
                event.originalEvent.dataTransfer.setData('text/plain', '');
                event.originalEvent.dataTransfer.effectAllowed = 'copy';
                this.rb.startBrowserDrag('docElement', __WEBPACK_IMPORTED_MODULE_1__elements_DocElement__["a" /* default */].type.pageBreak, '');
                event.stopPropagation();
            })
        );
        panelRight.append(elElementsDiv);
        
        let elActionsDiv = $('<div class="rbroActionButtons"></div>');
        let elAlignDiv = $('<div id="rbro_menu_align" style="display: none;"></div>');
        let elAlignLeft = $(`<button id="rbro_menu_align_left"
                class="rbroButton rbroActionButton rbroIcon-align-left" type="button"
                title="${this.rb.getLabel('menuAlignLeft')}"></button>`)
            .click(event => {
                this.rb.alignSelections(__WEBPACK_IMPORTED_MODULE_0__data_Style__["a" /* default */].alignment.left);
            });
        elAlignDiv.append(elAlignLeft);
        let elAlignCenter = $(`<button id="rbro_menu_align_center"
                class="rbroButton rbroActionButton rbroIcon-align-center" type="button"
                title="${this.rb.getLabel('menuAlignCenter')}"></button>`)
            .click(event => {
                this.rb.alignSelections(__WEBPACK_IMPORTED_MODULE_0__data_Style__["a" /* default */].alignment.center);
            });
        elAlignDiv.append(elAlignCenter);
        let elAlignRight = $(`<button id="rbro_menu_align_right"
                class="rbroButton rbroActionButton rbroIcon-align-right" type="button"
                title="${this.rb.getLabel('menuAlignRight')}"></button>`)
            .click(event => {
                this.rb.alignSelections(__WEBPACK_IMPORTED_MODULE_0__data_Style__["a" /* default */].alignment.right);
            });
        elAlignDiv.append(elAlignRight);
        elActionsDiv.append(elAlignDiv);
        let elVAlignDiv = $('<div id="rbro_menu_valign" style="display: none;"></div>');
        let elAlignTop = $(`<button id="rbro_menu_align_top"
                class="rbroButton rbroActionButton rbroIcon-align-top" type="button"
                title="${this.rb.getLabel('menuAlignTop')}"></button>`)
            .click(event => {
                this.rb.alignSelections(__WEBPACK_IMPORTED_MODULE_0__data_Style__["a" /* default */].alignment.top);
            });
        elVAlignDiv.append(elAlignTop);
        let elAlignMiddle = $(`<button id="rbro_menu_align_middle"
                class="rbroButton rbroActionButton rbroIcon-align-middle" type="button"
                title="${this.rb.getLabel('menuAlignMiddle')}"></button>`)
            .click(event => {
                this.rb.alignSelections(__WEBPACK_IMPORTED_MODULE_0__data_Style__["a" /* default */].alignment.middle);
            });
        elVAlignDiv.append(elAlignMiddle);
        let elAlignBottom = $(`<button id="rbro_menu_align_bottom"
                class="rbroButton rbroActionButton rbroIcon-align-bottom" type="button"
                title="${this.rb.getLabel('menuAlignBottom')}"></button>`)
            .click(event => {
                this.rb.alignSelections(__WEBPACK_IMPORTED_MODULE_0__data_Style__["a" /* default */].alignment.bottom);
            });
        elVAlignDiv.append(elAlignBottom);
        elActionsDiv.append(elVAlignDiv);

        let elMenuToggleGrid = $(`<button id="rbro_menu_toggle_grid"
                class="rbroButton rbroGridButton rbroActionButton rbroIcon-grid ${this.rb.getProperty('showGrid') ? 'rbroButtonActive' : ''}" type="button"
                title="${this.rb.getLabel('menuToggleGrid')}"></button>`)
            .click(event => {
                elMenuToggleGrid.toggleClass('rbroButtonActive');
                this.rb.getDocument().toggleGrid();
            });
        elActionsDiv.append(elMenuToggleGrid);
        panelRight.append(elActionsDiv);
        panel.append(panelRight);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MenuPanel;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StylePanel__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_CommandGroupCmd__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(0);







/**
 * Panel to edit all barcode properties.
 * @class
 */
class BarCodeElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_bar_code_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div id="rbro_bar_code_element_content_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_bar_code_element_content">${this.rb.getLabel('barCodeElementContent')}:</label>`);
        let elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elContent = $(`<textarea id="rbro_bar_code_element_content" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_bar_code_element_content', 'content',
                        elContent.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elContent);
        elFormField.append(elContent);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_bar_code_element_content', 'content', __WEBPACK_IMPORTED_MODULE_4__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_bar_code_element_content_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_bar_code_element_format_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_bar_code_element_format">${this.rb.getLabel('barCodeElementFormat')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elFormat = $(`<select id="rbro_bar_code_element_format" disabled="disabled">
                <option value="CODE128">CODE128</option>
            </select>`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_bar_code_element_format',
                        'format', elFormat.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elFormat);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_bar_code_element_display_value_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_bar_code_element_display_value">${this.rb.getLabel('barCodeElementDisplayValue')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elDisplayValue = $(`<input id="rbro_bar_code_element_display_value" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_bar_code_element_display_value', 'displayValue',
                        elDisplayValue.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elDisplayValue);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_bar_code_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_bar_code_element_position">${this.rb.getLabel('docElementPosition')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elPosX = $(`<input id="rbro_bar_code_element_position_x">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('x') !== elPosX.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_bar_code_element_position_x', 'x',
                        elPosX.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_5__utils__["h" /* setInputDecimal */](elPosX);
        elFormField.append(elPosX);
        let elPosY = $(`<input id="rbro_bar_code_element_position_y">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('y') !== elPosY.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_bar_code_element_position_y', 'y',
                        elPosY.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_5__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elFormField.append('<div id="rbro_bar_code_element_position_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_bar_code_element_size_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_bar_code_element_size">${this.rb.getLabel('docElementHeight')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elHeight = $(`<input id="rbro_bar_code_element_height">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('height') !== elHeight.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_bar_code_element_height', 'height',
                        elHeight.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_5__utils__["h" /* setInputDecimal */](elHeight);
        elFormField.append(elHeight);
        elFormField.append('<div id="rbro_bar_code_element_size_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        let elPrintHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elPrintHeaderIcon = $('<span id="rbro_bar_code_element_print_header_icon" class="rbroIcon-plus"></span>');
        elDiv = $('<div id="rbro_bar_code_element_print_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    $('#rbro_bar_code_element_print_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_bar_code_element_print_section').toggleClass('rbroHidden');
                    elPrintHeaderIcon.toggleClass('rbroIcon-plus');
                    elPrintHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elPrintHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop(elPrintHeader.position().top);
                    }
                    autosize.update($('#rbro_bar_code_element_print_if'));
                });
        elPrintHeader.append(elPrintHeaderIcon);
        elPrintHeader.append(`<span>${this.rb.getLabel('docElementPrintSettings')}</span>`);
        elDiv.append(elPrintHeader);
        panel.append(elDiv);

        let elPrintSectionDiv = $('<div id="rbro_bar_code_element_print_section" class="rbroHidden"></div>');
        elDiv = $('<div id="rbro_bar_code_element_print_if_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_bar_code_element_print_if">${this.rb.getLabel('docElementPrintIf')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPrintIf = $(`<textarea id="rbro_bar_code_element_print_if" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_bar_code_element_print_if', 'printIf',
                        elPrintIf.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elPrintIf);
        elFormField.append(elPrintIf);
        elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_bar_code_element_print_if', 'printIf', __WEBPACK_IMPORTED_MODULE_4__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_bar_code_element_print_if_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_bar_code_element_remove_empty_element">${this.rb.getLabel('docElementRemoveEmptyElement')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elRemoveEmptyElement = $(`<input id="rbro_bar_code_element_remove_empty_element" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_bar_code_element_remove_empty_element', 'removeEmptyElement',
                        elRemoveEmptyElement.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elRemoveEmptyElement);
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);
        panel.append(elPrintSectionDiv);

        if (this.rb.getProperty('enableSpreadsheet')) {
            let elSpreadsheetHeader = $('<div class="rbroPanelSectionHeader"></div>');
            let elSpreadsheetHeaderIcon = $('<span id="rbro_bar_code_element_spreadsheet_header_icon" class="rbroIcon-plus"></span>');
            elDiv = $('<div id="rbro_bar_code_element_spreadsheet_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        $('#rbro_bar_code_element_spreadsheet_header').toggleClass('rbroPanelSectionHeaderOpen');
                        $('#rbro_bar_code_element_spreadsheet_section').toggleClass('rbroHidden');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-plus');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-minus');
                        if (elSpreadsheetHeaderIcon.hasClass('rbroIcon-minus')) {
                            $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elSpreadsheetHeader.position().top);
                        }
                    }
                });
            elSpreadsheetHeader.append(elSpreadsheetHeaderIcon);
            elSpreadsheetHeader.append(`<span>${this.rb.getLabel('docElementSpreadsheet')}</span>`);
            elDiv.append(elSpreadsheetHeader);
            panel.append(elDiv);

            let elSpreadsheetSectionDiv = $('<div id="rbro_bar_code_element_spreadsheet_section" class="rbroHidden"></div>');
            elDiv = $('<div id="rbro_bar_code_element_spreadsheet_hide_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_bar_code_element_spreadsheet_hide">${this.rb.getLabel('docElementSpreadsheetHide')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetHide = $(`<input id="rbro_bar_code_element_spreadsheet_hide" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_bar_code_element_spreadsheet_hide', 'spreadsheet_hide',
                            elSpreadsheetHide.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetHide);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_bar_code_element_spreadsheet_column_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_bar_code_element_spreadsheet_column">${this.rb.getLabel('docElementSpreadsheetColumn')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetColumn = $(`<input id="rbro_bar_code_element_spreadsheet_column">`)
                .on('input', event => {
                    let obj = this.rb.getDataObject(this.selectedObjId);
                    if (obj !== null && obj.getValue('spreadsheet_column') !== elSpreadsheetColumn.val()) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_bar_code_element_spreadsheet_column', 'spreadsheet_column',
                            elSpreadsheetColumn.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            __WEBPACK_IMPORTED_MODULE_5__utils__["f" /* setInputPositiveInteger */](elSpreadsheetColumn);
            elFormField.append(elSpreadsheetColumn);
            elFormField.append('<div id="rbro_bar_code_element_spreadsheet_column_error" class="rbroErrorMessage"></div>');
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_bar_code_element_spreadsheet_colspan_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_bar_code_element_spreadsheet_colspan">${this.rb.getLabel('docElementSpreadsheetColspan')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetColspan = $(`<input id="rbro_bar_code_element_spreadsheet_colspan">`)
                .on('input', event => {
                    let obj = this.rb.getDataObject(this.selectedObjId);
                    if (obj !== null && obj.getValue('spreadsheet_colspan') !== elSpreadsheetColspan.val()) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_bar_code_element_spreadsheet_colspan', 'spreadsheet_colspan',
                            elSpreadsheetColspan.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            __WEBPACK_IMPORTED_MODULE_5__utils__["f" /* setInputPositiveInteger */](elSpreadsheetColspan);
            elFormField.append(elSpreadsheetColspan);
            elFormField.append('<div id="rbro_bar_code_element_spreadsheet_colspan_error" class="rbroErrorMessage"></div>');
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_bar_code_element_spreadsheet_add_empty_row_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_bar_code_element_spreadsheet_add_empty_row">${this.rb.getLabel('docElementSpreadsheetAddEmptyRow')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetAddEmptyRow = $(`<input id="rbro_bar_code_element_spreadsheet_add_empty_row" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_bar_code_element_spreadsheet_add_empty_row', 'spreadsheet_addEmptyRow',
                            elSpreadsheetAddEmptyRow.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetAddEmptyRow);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);
            panel.append(elSpreadsheetSectionDiv);
        }

        $('#rbro_detail_panel').append(panel);
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_bar_code_element_content'));
        autosize.update($('#rbro_bar_code_element_print_if'));
    }

    show(data) {
        this.updateData(data);
        $('#rbro_bar_code_element_panel').removeClass('rbroHidden');
        this.updateAutosizeInputs();
    }

    hide() {
        $('#rbro_bar_code_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {BarCodeElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_bar_code_element_content').prop('disabled', false);
            $('#rbro_bar_code_element_display_value').prop('disabled', false);
            $('#rbro_bar_code_element_position_x').prop('disabled', false);
            $('#rbro_bar_code_element_position_y').prop('disabled', false);
            $('#rbro_bar_code_element_width').prop('disabled', false);
            $('#rbro_bar_code_element_height').prop('disabled', false);
            $('#rbro_bar_code_element_print_if').prop('disabled', false);
            $('#rbro_bar_code_element_remove_empty_element').prop('disabled', false);
            $('#rbro_bar_code_element_spreadsheet_hide').prop('disabled', false);
            $('#rbro_bar_code_element_spreadsheet_column').prop('disabled', false);
            $('#rbro_bar_code_element_spreadsheet_colspan').prop('disabled', false);
            $('#rbro_bar_code_element_spreadsheet_add_empty_row').prop('disabled', false);

            $('#rbro_bar_code_element_content').val(data.getValue('content'));
            $('#rbro_bar_code_element_format').val(data.getValue('format'));
            $('#rbro_bar_code_element_display_value').prop('checked', data.getValue('displayValue'));
            $('#rbro_bar_code_element_position_x').val(data.getValue('x'));
            $('#rbro_bar_code_element_position_y').val(data.getValue('y'));
            $('#rbro_bar_code_element_width').val(data.getValue('width'));
            $('#rbro_bar_code_element_height').val(data.getValue('height'));
            $('#rbro_bar_code_element_print_if').val(data.getValue('printIf'));
            $('#rbro_bar_code_element_remove_empty_element').prop('checked', data.getValue('removeEmptyElement'));
            $('#rbro_bar_code_element_spreadsheet_hide').prop('checked', data.getValue('spreadsheet_hide'));
            $('#rbro_bar_code_element_spreadsheet_column').val(data.getValue('spreadsheet_column'));
            $('#rbro_bar_code_element_spreadsheet_colspan').val(data.getValue('spreadsheet_colspan'));
            $('#rbro_bar_code_element_spreadsheet_add_empty_row').prop('checked', data.getValue('spreadsheet_addEmptyRow'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_bar_code_element_content').prop('disabled', true);
            $('#rbro_bar_code_element_display_value').prop('disabled', true);
            $('#rbro_bar_code_element_position_x').prop('disabled', true);
            $('#rbro_bar_code_element_position_y').prop('disabled', true);
            $('#rbro_bar_code_element_width').prop('disabled', true);
            $('#rbro_bar_code_element_height').prop('disabled', true);
            $('#rbro_bar_code_element_print_if').prop('disabled', true);
            $('#rbro_bar_code_element_remove_empty_element').prop('disabled', true);
            $('#rbro_bar_code_element_spreadsheet_hide').prop('disabled', true);
            $('#rbro_bar_code_element_spreadsheet_column').prop('disabled', true);
            $('#rbro_bar_code_element_spreadsheet_colspan').prop('disabled', true);
            $('#rbro_bar_code_element_spreadsheet_add_empty_row').prop('disabled', true);
        }
        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_bar_code_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_bar_code_element_panel .rbroPanelSection').removeClass('rbroError');
        $('#rbro_bar_code_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_bar_code_element_' + error.field + '_row';
                let errorId = 'rbro_bar_code_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
                if (error.field === 'print_if') {
                    $('#rbro_bar_code_element_print_header').addClass('rbroError');
                    if (!$('#rbro_bar_code_element_print_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_bar_code_element_print_header').trigger('click');
                    }
                } else if (error.field === 'spreadsheet_column' || error.field === 'spreadsheet_colspan') {
                    $('#rbro_bar_code_element_spreadsheet_header').addClass('rbroError');
                    if (!$('#rbro_bar_code_element_spreadsheet_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_bar_code_element_spreadsheet_header').trigger('click');
                    }
                }
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BarCodeElementPanel;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DocumentProperties__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Panel to edit all document properties.
 * @class
 */
class DocumentPropertiesPanel {
    constructor(documentProperties, rootElement, rb) {
        this.documentProperties = documentProperties;
        this.rootElement = rootElement;
        this.rb = rb;
    }

    render(data) {
        let panel = $('<div id="rbro_document_properties_panel" class="rbroHidden"></div>');
        let elDiv = $('<div id="rbro_document_properties_page_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_page_format">${this.rb.getLabel('pageFormat')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elPageFormat = $(`<select id="rbro_document_properties_page_format">
                <option value="A4">${this.rb.getLabel('pageFormatA4')}</option>
                <option value="A5">${this.rb.getLabel('pageFormatA5')}</option>
                <option value="letter">${this.rb.getLabel('pageFormatLetter')}</option>
                <option value="user_defined">${this.rb.getLabel('pageFormatUserDefined')}</option>
            </select>`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_page_format', 'pageFormat',
                    elPageFormat.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                this.rb.executeCommand(cmd);
            });
        elFormField.append(elPageFormat);

        let elPageSizeDiv = $('<div id="rbro_document_properties_page_size_row" class="rbroTripleSplit"></div>');
        let elPageWidth = $('<input id="rbro_document_properties_page_width" maxlength="5">')
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_page_width', 'pageWidth',
                    elPageWidth.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elPageWidth);
        elPageSizeDiv.append(elPageWidth);
        let elPageHeight = $('<input id="rbro_document_properties_page_height" maxlength="5">')
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_page_height', 'pageHeight',
                    elPageHeight.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elPageHeight);
        elPageSizeDiv.append(elPageHeight);
        let elUnit = $(`<select id="rbro_document_properties_unit">
            <option value="mm">mm</option>
            <option value="inch">inch</option>
        </select>`)
        .change(event => {
            let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_unit', 'unit',
                elUnit.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
            this.rb.executeCommand(cmd);
        });
        elPageSizeDiv.append(elUnit);
        elFormField.append(elPageSizeDiv);
        elFormField.append('<div id="rbro_document_properties_page_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);
        if (this.documentProperties.getValue('pageFormat') !== __WEBPACK_IMPORTED_MODULE_2__data_DocumentProperties__["a" /* default */].pageFormat.userDefined) {
            elPageSizeDiv.hide();
        }

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_orientation">${this.rb.getLabel('orientation')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elOrientation = $(`<select id="rbro_document_properties_orientation">
                <option value="portrait">${this.rb.getLabel('orientationPortrait')}</option>
                <option value="landscape">${this.rb.getLabel('orientationLandscape')}</option>
            </select>`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_orientation', 'orientation',
                    elOrientation.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                this.rb.executeCommand(cmd);
            });
        elFormField.append(elOrientation);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_content_height">${this.rb.getLabel('contentHeight')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elContentHeight = $('<input id="rbro_document_properties_content_height">')
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_content_height', 'contentHeight',
                    elContentHeight.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elContentHeight);
        elFormField.append(elContentHeight);
        elFormField.append(`<div class="rbroInfo">${this.rb.getLabel('contentHeightInfo')}</div>`);
        elDiv.append(elFormField);
        panel.append(elDiv);

        this.renderMarginControls(panel);
        this.renderHeaderFooter(panel);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_pattern_locale">${this.rb.getLabel('patternLocale')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elPatternLocale = $(`<select id="rbro_document_properties_pattern_locale">
                <option value="de">de</option>
                <option value="en">en</option>
                <option value="es">es</option>
                <option value="fr">fr</option>
                <option value="it">it</option>
            </select>`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_pattern_locale', 'patternLocale',
                    elPatternLocale.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                this.rb.executeCommand(cmd);
            });
        elFormField.append(elPatternLocale);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_pattern_currency_symbol">${this.rb.getLabel('patternCurrencySymbol')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elPatternCurrencySymbol = $('<input id="rbro_document_properties_pattern_currency_symbol">')
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.rb.getDetailData().getId(),
                    'rbro_document_properties_pattern_currency_symbol', 'patternCurrencySymbol',
                    elPatternCurrencySymbol.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        elFormField.append(elPatternCurrencySymbol);
        elDiv.append(elFormField);
        panel.append(elDiv);

        $('#rbro_detail_panel').append(panel);

        this.updateData(this.documentProperties);
    }

    renderMarginControls(panel) {
        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_page_margin_top">${this.rb.getLabel('pageMargins')}:</label>`);
        let elFormField = $('<div class="rbroFormField rbroSmallInput"></div>');
        
        let elMarginTopDiv = $('<div class="rbroColumnCenter"></div>');
        let elMarginTop = $(`<input id="rbro_document_properties_page_margin_top" placeholder="${this.rb.getLabel('orientationTop')}">`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_page_margin_top', 'marginTop',
                    elMarginTop.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elMarginTop);
        elMarginTopDiv.append(elMarginTop);
        elFormField.append(elMarginTopDiv);

        let elDiv2 = $('<div class="rbroSplit"></div>');
        let elMarginLeft = $(`<input id="rbro_document_properties_page_margin_left" placeholder="${this.rb.getLabel('orientationLeft')}">`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_page_margin_left', 'marginLeft',
                    elMarginLeft.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elMarginLeft);
        elDiv2.append(elMarginLeft);
        let elMarginRight = $(`<input id="rbro_document_properties_page_margin_right" placeholder="${this.rb.getLabel('orientationRight')}">`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_page_margin_right', 'marginRight',
                    elMarginRight.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elMarginRight);
        elDiv2.append(elMarginRight);
        elFormField.append(elDiv2);

        let elMarginBottomDiv = $('<div class="rbroColumnCenter"></div>');
        let elMarginBottom = $(`<input id="rbro_document_properties_page_margin_bottom" placeholder="${this.rb.getLabel('orientationBottom')}">`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_page_margin_bottom', 'marginBottom',
                    elMarginBottom.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elMarginBottom);
        elMarginBottomDiv.append(elMarginBottom);
        elFormField.append(elMarginBottomDiv);
        elDiv.append(elFormField);
        panel.append(elDiv);
    }

    renderHeaderFooter(panel) {
        let elHeaderDiv = $('<div class="rbroFormRowContainer"></div>');
        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_header">${this.rb.getLabel('header')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elHeaderLabel = $(`<label class="switch-light switch-material"></label>`);
        let elHeader = $(`<input id="rbro_document_properties_header" type="checkbox">`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_header', 'header',
                    elHeader.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                this.rb.executeCommand(cmd);
            });
        elHeaderLabel.append(elHeader);
        let elHeaderSpan = $('<span></span>');
        elHeaderSpan.append($('<span></span>'));
        elHeaderSpan.append($('<span></span>'));
        elHeaderSpan.append($('<a></a>'));
        elHeaderLabel.append(elHeaderSpan);
        elFormField.append(elHeaderLabel);
        elDiv.append(elFormField);
        elHeaderDiv.append(elDiv);
        let elHeaderSettings = $('<div id="rbro_document_properties_header_settings"></div>');
        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_header_size">${this.rb.getLabel('headerSize')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elHeaderSize = $('<input id="rbro_document_properties_header_size">')
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_header_size', 'headerSize',
                    elHeaderSize.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elHeaderSize);
        elFormField.append(elHeaderSize);
        elDiv.append(elFormField);
        elHeaderSettings.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_header_display">${this.rb.getLabel('headerDisplay')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elHeaderDisplay = $(`<select id="rbro_document_properties_header_display">
                <option value="always">${this.rb.getLabel('headerFooterDisplayAlways')}</option>
                <option value="not_on_first_page">${this.rb.getLabel('headerFooterDisplayNotOnFirstPage')}</option>
            </select>`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_header_display', 'headerDisplay',
                    elHeaderDisplay.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                this.rb.executeCommand(cmd);
            });
        elFormField.append(elHeaderDisplay);
        elDiv.append(elFormField);
        elHeaderSettings.append(elDiv);
        elHeaderDiv.append(elHeaderSettings);
        panel.append(elHeaderDiv);

        let elFooterDiv = $('<div class="rbroFormRowContainer"></div>');
        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_footer">${this.rb.getLabel('footer')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elFooterLabel = $(`<label class="switch-light switch-material"></label>`);
        let elFooter = $(`<input id="rbro_document_properties_footer" type="checkbox">`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_footer', 'footer',
                    elFooter.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                this.rb.executeCommand(cmd);
            });
        elFooterLabel.append(elFooter);
        let elFooterSpan = $('<span></span>');
        elFooterSpan.append($('<span></span>'));
        elFooterSpan.append($('<span></span>'));
        elFooterSpan.append($('<a></a>'));
        elFooterLabel.append(elFooterSpan);
        elFormField.append(elFooterLabel);
        elDiv.append(elFormField);
        elFooterDiv.append(elDiv);
        let elFooterSettings = $('<div id="rbro_document_properties_footer_settings"></div>');
        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_footer_size">${this.rb.getLabel('footerSize')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elFooterSize = $('<input id="rbro_document_properties_footer_size">')
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_footer_size', 'footerSize',
                    elFooterSize.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                this.rb.executeCommand(cmd);
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["f" /* setInputPositiveInteger */](elFooterSize);
        elFormField.append(elFooterSize);
        elDiv.append(elFormField);
        elFooterSettings.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_document_properties_footer_display">${this.rb.getLabel('footerDisplay')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elFooterDisplay = $(`<select id="rbro_document_properties_footer_display">
                <option value="always">${this.rb.getLabel('headerFooterDisplayAlways')}</option>
                <option value="not_on_first_page">${this.rb.getLabel('headerFooterDisplayNotOnFirstPage')}</option>
            </select>`)
            .change(event => {
                let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.documentProperties.getId(), 'rbro_document_properties_footer_display', 'footerDisplay',
                    elFooterDisplay.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                this.rb.executeCommand(cmd);
            });
        elFormField.append(elFooterDisplay);
        elDiv.append(elFormField);
        elFooterSettings.append(elDiv);
        elFooterDiv.append(elFooterSettings);
        panel.append(elFooterDiv);
    }

    show(data) {
        $('#rbro_document_properties_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_document_properties_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {DocumentProperties} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_document_properties_page_format').val(data.getValue('pageFormat'));
            $('#rbro_document_properties_page_width').val(data.getValue('pageWidth'));
            $('#rbro_document_properties_page_height').val(data.getValue('pageHeight'));
            $('#rbro_document_properties_unit').val(data.getValue('unit'));
            $('#rbro_document_properties_orientation').val(data.getValue('orientation'));
            $('#rbro_document_properties_content_height').val(data.getValue('contentHeight'));
            $('#rbro_document_properties_page_margin_top').val(data.getValue('marginTop'));
            $('#rbro_document_properties_page_margin_left').val(data.getValue('marginLeft'));
            $('#rbro_document_properties_page_margin_right').val(data.getValue('marginRight'));
            $('#rbro_document_properties_page_margin_bottom').val(data.getValue('marginBottom'));
            $('#rbro_document_properties_header').prop('checked', data.getValue('header'));
            $('#rbro_document_properties_header_size').val(data.getValue('headerSize'));
            $('#rbro_document_properties_header_display').val(data.getValue('headerDisplay'));
            $('#rbro_document_properties_footer').prop('checked', data.getValue('footer'));
            $('#rbro_document_properties_footer_size').val(data.getValue('footerSize'));
            $('#rbro_document_properties_footer_display').val(data.getValue('footerDisplay'));
            $('#rbro_document_properties_pattern_locale').val(data.getValue('patternLocale'));
            $('#rbro_document_properties_pattern_currency_symbol').val(data.getValue('patternCurrencySymbol'));
            this.updateVisibility(data);
        }
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
        if (obj instanceof __WEBPACK_IMPORTED_MODULE_2__data_DocumentProperties__["a" /* default */] && obj === this.rb.getDetailData() && operation === __WEBPACK_IMPORTED_MODULE_0__commands_Command__["a" /* default */].operation.change) {
            this.updateVisibility(obj);
        }
    }

    updateVisibility(obj) {
        if (obj.getValue('pageFormat') === __WEBPACK_IMPORTED_MODULE_2__data_DocumentProperties__["a" /* default */].pageFormat.userDefined) {
            $('#rbro_document_properties_page_size_row').show();
        } else {
            $('#rbro_document_properties_page_size_row').hide();
        }
        if (obj.getValue('header')) {
            $('#rbro_document_properties_header_settings').show();
        } else {
            $('#rbro_document_properties_header_settings').hide();
        }
        if (obj.getValue('footer')) {
            $('#rbro_document_properties_footer_settings').show();
        } else {
            $('#rbro_document_properties_footer_settings').hide();
        }
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_document_properties_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_document_properties_panel .rbroErrorMessage').text('');
        for (let error of this.documentProperties.getErrors()) {
            let rowId = 'rbro_document_properties_' + error.field + '_row';
            let errorId = 'rbro_document_properties_' + error.field + '_error';
            let errorMsg = this.rb.getLabel(error.msg_key);
            if (error.info) {
                errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
            }
            $('#' + rowId).addClass('rbroError');
            $('#' + errorId).html(errorMsg);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DocumentPropertiesPanel;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Empty panel which is shown when no data object is selected.
 * @class
 */
class EmptyDetailPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
    }

    render() {
        let panel = $('#rbro_detail_panel');
        $('#rbro_detail_panel').append(`<div id="rbro_empty_detail_panel" class="rbroEmptyDetailPanel rbroHidden">
                <div class="rbroLogo"></div>
            </div>`);
    }

    show(data) {
        $('#rbro_empty_detail_panel').removeClass('rbroHidden');
    }

    hide() {
        $('#rbro_empty_detail_panel').addClass('rbroHidden');
    }

    notifyEvent(obj, operation) {
    }

    updateErrors() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EmptyDetailPanel;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);




/**
 * Panel to edit all frame properties.
 * @class
 */
class FrameElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_frame_element_panel" class="rbroHidden"></div>');

        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_label">${this.rb.getLabel('docElementLabel')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elLabel = $(`<input id="rbro_frame_element_label">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.getSelectedObjId(), 'rbro_frame_element_label',
                        'label', elLabel.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elLabel);
        elDiv.append(elFormField);
        panel.append(elDiv);
        
        elDiv = $('<div id="rbro_frame_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_position_x">${this.rb.getLabel('docElementPosition')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elPosX = $(`<input id="rbro_frame_element_position_x">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('x') !== elPosX.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_position_x', 'x',
                        elPosX.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elPosX);
        elFormField.append(elPosX);
        let elPosY = $(`<input id="rbro_frame_element_position_y">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('y') !== elPosY.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_position_y', 'y',
                        elPosY.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elFormField.append('<div id="rbro_frame_element_position_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_frame_element_size_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_width">${this.rb.getLabel('docElementSize')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elWidth = $(`<input id="rbro_frame_element_width">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('width') !== elWidth.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_width', 'width',
                        elWidth.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elWidth);
        elFormField.append(elWidth);
        let elHeight = $(`<input id="rbro_frame_element_height">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('height') !== elHeight.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_height', 'height',
                        elHeight.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elHeight);
        elFormField.append(elHeight);
        elFormField.append('<div id="rbro_frame_element_size_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_background_color">${this.rb.getLabel('styleBackgroundColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBgColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elBgColor = $('<input id="rbro_frame_element_background_color">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_background_color',
                        'backgroundColor', elBgColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBgColorContainer.append(elBgColor);
        elFormField.append(elBgColorContainer);
        elDiv.append(elFormField);
        panel.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_2__utils__["g" /* initColorPicker */](elBgColor, this.rb, { allowEmpty: true });

        let elBorderDiv = $(`<div id="rbro_frame_element_border_div"></div>`);
        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label>${this.rb.getLabel('styleBorder')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderStyle = $('<div id="rbro_frame_element_border"></div>');
        let elBorderAll = $(`<button id="rbro_frame_element_border_all"
                class="rbroButton rbroActionButton rbroIcon-border-all"
                type="button" value="borderAll"
                title="${this.rb.getLabel('styleBorderAll')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_border_all',
                        'borderAll', !elBorderAll.hasClass('rbroButtonActive'),
                        __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorderStyle.append(elBorderAll);
        let elBorderLeft = $(`<button id="rbro_frame_element_border_left"
                class="rbroButton rbroActionButton rbroIcon-border-left"
                type="button" value="borderLeft"
                title="${this.rb.getLabel('orientationLeft')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_border_left',
                        'borderLeft', !elBorderLeft.hasClass('rbroButtonActive'),
                        __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorderStyle.append(elBorderLeft);
        let elBorderTop = $(`<button id="rbro_frame_element_border_top"
                class="rbroButton rbroActionButton rbroIcon-border-top"
                type="button" value="borderTop"
                title="${this.rb.getLabel('orientationTop')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_border_top',
                        'borderTop', !elBorderTop.hasClass('rbroButtonActive'),
                        __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorderStyle.append(elBorderTop);
        let elBorderRight = $(`<button id="rbro_frame_element_border_right"
                class="rbroButton rbroActionButton rbroIcon-border-right"
                type="button" value="borderRight"
                title="${this.rb.getLabel('orientationRight')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_border_right',
                        'borderRight', !elBorderRight.hasClass('rbroButtonActive'),
                        __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorderStyle.append(elBorderRight);
        let elBorderBottom = $(`<button id="rbro_frame_element_border_bottom"
                class="rbroButton rbroActionButton rbroIcon-border-bottom"
                type="button" value="borderBottom"
                title="${this.rb.getLabel('orientationBottom')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_border_bottom',
                        'borderBottom', !elBorderBottom.hasClass('rbroButtonActive'),
                        __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.button, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorderStyle.append(elBorderBottom);
        elFormField.append(elBorderStyle);
        elDiv.append(elFormField);
        elBorderDiv.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_border_color">${this.rb.getLabel('styleBorderColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elBorderColor = $('<input id="rbro_frame_element_border_color">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_border_color',
                        'borderColor', elBorderColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorderColorContainer.append(elBorderColor);
        elFormField.append(elBorderColorContainer);
        elDiv.append(elFormField);
        elBorderDiv.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_2__utils__["g" /* initColorPicker */](elBorderColor, this.rb);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_border_width">${this.rb.getLabel('styleBorderWidth')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderWidth = $(`<input id="rbro_frame_element_border_width">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.getSelectedObjId(), 'rbro_frame_element_border_width',
                        'borderWidth', elBorderWidth.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elBorderWidth);
        elDiv.append(elFormField);
        elBorderDiv.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elBorderWidth);
        panel.append(elBorderDiv);

        let elPrintHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elPrintHeaderIcon = $('<span id="rbro_frame_element_print_header_icon" class="rbroIcon-plus"></span>');
        elDiv = $('<div id="rbro_frame_element_print_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    $('#rbro_frame_element_print_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_frame_element_print_section').toggleClass('rbroHidden');
                    elPrintHeaderIcon.toggleClass('rbroIcon-plus');
                    elPrintHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elPrintHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop(elPrintHeader.position().top);
                    }
                    autosize.update($('#rbro_frame_element_print_if'));
                });
        elPrintHeader.append(elPrintHeaderIcon);
        elPrintHeader.append(`<span>${this.rb.getLabel('docElementPrintSettings')}</span>`);
        elDiv.append(elPrintHeader);
        panel.append(elDiv);
        
        let elPrintSectionDiv = $('<div id="rbro_frame_element_print_section" class="rbroHidden"></div>');
        elDiv = $('<div id="rbro_frame_element_print_if_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_print_if">${this.rb.getLabel('docElementPrintIf')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPrintIf = $(`<textarea id="rbro_frame_element_print_if" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_frame_element_print_if', 'printIf',
                        elPrintIf.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elPrintIf);
        elFormField.append(elPrintIf);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_frame_element_print_if', 'printIf', __WEBPACK_IMPORTED_MODULE_1__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_frame_element_print_if_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_remove_empty_element">${this.rb.getLabel('docElementRemoveEmptyElement')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elRemoveEmptyElement = $(`<input id="rbro_frame_element_remove_empty_element" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_frame_element_remove_empty_element', 'removeEmptyElement',
                        elRemoveEmptyElement.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elRemoveEmptyElement);
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_frame_element_shrink_to_content_height">${this.rb.getLabel('frameElementShrinkToContentHeight')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elShrinkToContentHeight = $(`<input id="rbro_frame_element_shrink_to_content_height" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_frame_element_shrink_to_content_height', 'shrinkToContentHeight',
                        elShrinkToContentHeight.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elShrinkToContentHeight);
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);
        panel.append(elPrintSectionDiv);
        
        if (this.rb.getProperty('enableSpreadsheet')) {
            let elSpreadsheetHeader = $('<div class="rbroPanelSectionHeader"></div>');
            let elSpreadsheetHeaderIcon = $('<span id="rbro_frame_element_spreadsheet_header_icon" class="rbroIcon-plus"></span>');
            elDiv = $('<div id="rbro_frame_element_spreadsheet_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        $('#rbro_frame_element_spreadsheet_header').toggleClass('rbroPanelSectionHeaderOpen');
                        $('#rbro_frame_element_spreadsheet_section').toggleClass('rbroHidden');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-plus');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-minus');
                        if (elSpreadsheetHeaderIcon.hasClass('rbroIcon-minus')) {
                            $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elSpreadsheetHeader.position().top);
                        }
                    }
                });
            elSpreadsheetHeader.append(elSpreadsheetHeaderIcon);
            elSpreadsheetHeader.append(`<span>${this.rb.getLabel('docElementSpreadsheet')}</span>`);
            elDiv.append(elSpreadsheetHeader);
            panel.append(elDiv);

            let elSpreadsheetSectionDiv = $('<div id="rbro_frame_element_spreadsheet_section" class="rbroHidden"></div>');
            elDiv = $('<div id="rbro_frame_element_spreadsheet_hide_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_frame_element_spreadsheet_hide">${this.rb.getLabel('docElementSpreadsheetHide')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetHide = $(`<input id="rbro_frame_element_spreadsheet_hide" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_frame_element_spreadsheet_hide', 'spreadsheet_hide',
                            elSpreadsheetHide.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetHide);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_frame_element_spreadsheet_column_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_frame_element_spreadsheet_column">${this.rb.getLabel('docElementSpreadsheetColumn')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetColumn = $(`<input id="rbro_frame_element_spreadsheet_column">`)
                .on('input', event => {
                    let obj = this.rb.getDataObject(this.selectedObjId);
                    if (obj !== null && obj.getValue('spreadsheet_column') !== elSpreadsheetColumn.val()) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_frame_element_spreadsheet_column', 'spreadsheet_column',
                            elSpreadsheetColumn.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            __WEBPACK_IMPORTED_MODULE_2__utils__["f" /* setInputPositiveInteger */](elSpreadsheetColumn);
            elFormField.append(elSpreadsheetColumn);
            elFormField.append('<div id="rbro_frame_element_spreadsheet_column_error" class="rbroErrorMessage"></div>');
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_frame_element_spreadsheet_add_empty_row_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_frame_element_spreadsheet_add_empty_row">${this.rb.getLabel('docElementSpreadsheetAddEmptyRow')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetAddEmptyRow = $(`<input id="rbro_frame_element_spreadsheet_add_empty_row" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_frame_element_spreadsheet_add_empty_row', 'spreadsheet_addEmptyRow',
                            elSpreadsheetAddEmptyRow.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetAddEmptyRow);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);
            panel.append(elSpreadsheetSectionDiv);
        }

        $('#rbro_detail_panel').append(panel);
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_frame_element_print_if'));
    }

    show(data) {
        $('#rbro_frame_element_panel').removeClass('rbroHidden');
        this.updateData(data);
        this.updateAutosizeInputs();
    }

    hide() {
        $('#rbro_frame_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {LineElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_frame_element_label').prop('disabled', false);
            $('#rbro_frame_element_position_x').prop('disabled', false);
            $('#rbro_frame_element_position_y').prop('disabled', false);
            $('#rbro_frame_element_width').prop('disabled', false);
            $('#rbro_frame_element_height').prop('disabled', false);
            $('#rbro_frame_element_background_color').spectrum('enable');
            $('#rbro_frame_element_border_all').prop('disabled', false);
            $('#rbro_frame_element_border_left').prop('disabled', false);
            $('#rbro_frame_element_border_top').prop('disabled', false);
            $('#rbro_frame_element_border_right').prop('disabled', false);
            $('#rbro_frame_element_border_bottom').prop('disabled', false);
            $('#rbro_frame_element_border_color').spectrum('enable');
            $('#rbro_frame_element_border_width').prop('disabled', false);
            $('#rbro_frame_element_print_if').prop('disabled', false);
            $('#rbro_frame_element_remove_empty_element').prop('disabled', false);
            $('#rbro_frame_element_shrink_to_content_height').prop('disabled', false);
            $('#rbro_frame_element_spreadsheet_hide').prop('disabled', false);
            $('#rbro_frame_element_spreadsheet_column').prop('disabled', false);
            $('#rbro_frame_element_spreadsheet_add_empty_row').prop('disabled', false);
            
            $('#rbro_frame_element_label').val(data.getValue('label'));
            $('#rbro_frame_element_position_x').val(data.getValue('x'));
            $('#rbro_frame_element_position_y').val(data.getValue('y'));
            $('#rbro_frame_element_width').val(data.getValue('width'));
            $('#rbro_frame_element_height').val(data.getValue('height'));
            $('#rbro_frame_element_background_color').spectrum("set", data.getValue('backgroundColor'));
            if (data.getValue('borderAll')) {
                $('#rbro_frame_element_border_all').addClass('rbroButtonActive');
            } else {
                $('#rbro_frame_element_border_all').removeClass('rbroButtonActive');
            }
            if (data.getValue('borderLeft')) {
                $('#rbro_frame_element_border_left').addClass('rbroButtonActive');
            } else {
                $('#rbro_frame_element_border_left').removeClass('rbroButtonActive');
            }
            if (data.getValue('borderTop')) {
                $('#rbro_frame_element_border_top').addClass('rbroButtonActive');
            } else {
                $('#rbro_frame_element_border_top').removeClass('rbroButtonActive');
            }
            if (data.getValue('borderRight')) {
                $('#rbro_frame_element_border_right').addClass('rbroButtonActive');
            } else {
                $('#rbro_frame_element_border_right').removeClass('rbroButtonActive');
            }
            if (data.getValue('borderBottom')) {
                $('#rbro_frame_element_border_bottom').addClass('rbroButtonActive');
            } else {
                $('#rbro_frame_element_border_bottom').removeClass('rbroButtonActive');
            }
            $('#rbro_frame_element_border_color').spectrum("set", data.getValue('borderColor'));
            $('#rbro_frame_element_border_width').val(data.getValue('borderWidth'));
            $('#rbro_frame_element_print_if').val(data.getValue('printIf'));
            $('#rbro_frame_element_remove_empty_element').prop('checked', data.getValue('removeEmptyElement'));
            $('#rbro_frame_element_shrink_to_content_height').prop('checked', data.getValue('shrinkToContentHeight'));
            $('#rbro_frame_element_spreadsheet_hide').prop('checked', data.getValue('spreadsheet_hide'));
            $('#rbro_frame_element_spreadsheet_column').val(data.getValue('spreadsheet_column'));
            $('#rbro_frame_element_spreadsheet_add_empty_row').prop('checked', data.getValue('spreadsheet_addEmptyRow'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_frame_element_label').prop('disabled', true);
            $('#rbro_frame_element_position_x').prop('disabled', true);
            $('#rbro_frame_element_position_y').prop('disabled', true);
            $('#rbro_frame_element_width').prop('disabled', true);
            $('#rbro_frame_element_height').prop('disabled', true);
            $('#rbro_frame_element_background_color').spectrum('disable');
            $('#rbro_frame_element_border_all').prop('disabled', true);
            $('#rbro_frame_element_border_left').prop('disabled', true);
            $('#rbro_frame_element_border_top').prop('disabled', true);
            $('#rbro_frame_element_border_right').prop('disabled', true);
            $('#rbro_frame_element_border_bottom').prop('disabled', true);
            $('#rbro_frame_element_border_color').spectrum('disable');
            $('#rbro_frame_element_border_width').prop('disabled', true);
            $('#rbro_frame_element_print_if').prop('disabled', true);
            $('#rbro_frame_element_remove_empty_element').prop('disabled', true);
            $('#rbro_frame_element_shrink_to_content_height').prop('disabled', true);
            $('#rbro_frame_element_spreadsheet_hide').prop('disabled', true);
            $('#rbro_frame_element_spreadsheet_column').prop('disabled', true);
            $('#rbro_frame_element_spreadsheet_add_empty_row').prop('disabled', true);
        }

        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_frame_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_frame_element_panel .rbroPanelSection').removeClass('rbroError');
        $('#rbro_frame_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_frame_element_' + error.field + '_row';
                let errorId = 'rbro_frame_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
                if (error.field === 'print_if') {
                    $('#rbro_frame_element_print_header').addClass('rbroError');
                    if (!$('#rbro_frame_element_print_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_frame_element_print_header').trigger('click');
                    }
                } else if (error.field === 'spreadsheet_column') {
                    $('#rbro_frame_element_spreadsheet_header').addClass('rbroError');
                    if (!$('#rbro_frame_element_spreadsheet_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_frame_element_spreadsheet_header').trigger('click');
                    }
                }
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FrameElementPanel;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StylePanel__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_CommandGroupCmd__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(0);








/**
 * Panel to edit all image properties.
 * @class
 */
class ImageElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_image_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div id="rbro_image_element_source_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_image_element_source">${this.rb.getLabel('imageElementSource')}:</label>`);
        let elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elSource = $(`<textarea id="rbro_image_element_source" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_source', 'source',
                        elSource.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elSource);
        elFormField.append(elSource);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj,
                        [__WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.image, __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.string]), this.selectedObjId,
                        'rbro_image_element_source', 'source', __WEBPACK_IMPORTED_MODULE_5__PopupWindow__["a" /* default */].type.parameterSet);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_image_element_source_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_image_element_image_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_image_element_image">${this.rb.getLabel('imageElementImage')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elImage = $('<input id="rbro_image_element_image" type="file">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let files = event.target.files;
                    if (files && files[0]) {
                        let fileReader = new FileReader();
                        let rb = this.rb;
                        let fileName = files[0].name;
                        let objId = this.selectedObjId;
                        fileReader.onload = function(e) {
                            let cmdGroup = new __WEBPACK_IMPORTED_MODULE_1__commands_CommandGroupCmd__["a" /* default */]('Load image', this.rb);
                            let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](objId, 'rbro_image_element_image', 'image',
                                e.target.result, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.file, rb);
                            cmdGroup.addCommand(cmd);
                            cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](objId, 'rbro_image_element_image_filename', 'imageFilename',
                                fileName, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.filename, rb);
                            cmdGroup.addCommand(cmd);
                            rb.executeCommand(cmdGroup);
                        };
                        fileReader.onerror = function(e) {
                            alert(this.rb.getLabel('imageElementLoadErrorMsg'));
                        };
                        fileReader.readAsDataURL(files[0]);
                    }
                }
            });
        elFormField.append(elImage);
        let elFilenameDiv = $('<div class="rbroSplit rbroHidden" id="rbro_image_element_image_filename_container"></div>');
        elFilenameDiv.append($('<div id="rbro_image_element_image_filename"></div>'));
        elFilenameDiv.append($('<div id="rbro_image_element_image_filename_clear" class="rbroIcon-cancel rbroButton rbroDeleteButton rbroRoundButton"></div>')
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    elImage.val('');
                    let cmdGroup = new __WEBPACK_IMPORTED_MODULE_1__commands_CommandGroupCmd__["a" /* default */]('Clear image', this.rb);
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_image', 'image',
                        '', __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.file, this.rb);
                    cmdGroup.addCommand(cmd);
                    cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_image_filename', 'imageFilename',
                        '', __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.filename, this.rb);
                    cmdGroup.addCommand(cmd);
                    this.rb.executeCommand(cmdGroup);
                }
            })
        );
        elFormField.append(elFilenameDiv);
        elFormField.append('<div id="rbro_image_element_image_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_image_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_image_element_position">${this.rb.getLabel('docElementPosition')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elPosX = $(`<input id="rbro_image_element_position_x">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let val = __WEBPACK_IMPORTED_MODULE_6__utils__["i" /* checkInputDecimal */](elPosX.val(), 0, 1000);
                    if (val !== elPosX.val()) {
                        elPosX.val(val);
                    }
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_position_x', 'x',
                        val, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["h" /* setInputDecimal */](elPosX);
        elFormField.append(elPosX);
        let elPosY = $(`<input id="rbro_image_element_position_y">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let val = __WEBPACK_IMPORTED_MODULE_6__utils__["i" /* checkInputDecimal */](elPosY.val(), 0, 1000);
                    if (val !== elPosY.val()) {
                        elPosY.val(val);
                    }
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_position_y', 'y',
                        val, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elFormField.append('<div id="rbro_image_element_position_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_image_element_size_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_image_element_size">${this.rb.getLabel('docElementSize')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elWidth = $(`<input id="rbro_image_element_width">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let val = __WEBPACK_IMPORTED_MODULE_6__utils__["i" /* checkInputDecimal */](elWidth.val(), 10, 1000);
                    if (val !== elWidth.val()) {
                        elWidth.val(val);
                    }
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_width', 'width',
                        val, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["h" /* setInputDecimal */](elWidth);
        elFormField.append(elWidth);
        let elHeight = $(`<input id="rbro_image_element_height">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let val = __WEBPACK_IMPORTED_MODULE_6__utils__["i" /* checkInputDecimal */](elHeight.val(), 10, 1000);
                    if (val !== elHeight.val()) {
                        elHeight.val(val);
                    }
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_height', 'height',
                        val, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["h" /* setInputDecimal */](elHeight);
        elFormField.append(elHeight);
        elFormField.append('<div id="rbro_image_element_size_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        let elStyleHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elStyleHeaderIcon = $('<div id="rbro_image_element_style_header_icon" class="rbroPanelSectionHeaderOpen rbroIcon-minus"></div>');
        elDiv = $('<div id="rbro_image_element_style_header" class="rbroFormRow rbroPanelSection rbroPanelSectionHeaderOpen"></div>')
                .click(event => {
                    $('#rbro_image_element_style_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_image_element_style_section').toggleClass('rbroHidden');
                    elStyleHeaderIcon.toggleClass('rbroIcon-plus');
                    elStyleHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elStyleHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop(elStyleHeader.position().top);
                    }
                });
        elStyleHeader.append(elStyleHeaderIcon);
        elStyleHeader.append(`<span>${this.rb.getLabel('docElementStyle')}</span>`);
        elDiv.append(elStyleHeader);
        panel.append(elDiv);

        let elStyleSectionDiv = $('<div id="rbro_image_element_style_section"></div>');
        __WEBPACK_IMPORTED_MODULE_0__StylePanel__["a" /* default */].renderStyle(elStyleSectionDiv, 'image_element_', '', __WEBPACK_IMPORTED_MODULE_4__elements_DocElement__["a" /* default */].type.image, this, this.rb);
        panel.append(elStyleSectionDiv);

        let elPrintHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elPrintHeaderIcon = $('<span id="rbro_image_element_print_header_icon" class="rbroIcon-plus"></span>');
        elDiv = $('<div id="rbro_image_element_print_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    $('#rbro_image_element_print_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_image_element_print_section').toggleClass('rbroHidden');
                    elPrintHeaderIcon.toggleClass('rbroIcon-plus');
                    elPrintHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elPrintHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop(elPrintHeader.position().top);
                    }
                    autosize.update($('#rbro_image_element_print_if'));
                });
        elPrintHeader.append(elPrintHeaderIcon);
        elPrintHeader.append(`<span>${this.rb.getLabel('docElementPrintSettings')}</span>`);
        elDiv.append(elPrintHeader);
        panel.append(elDiv);

        let elPrintSectionDiv = $('<div id="rbro_image_element_print_section" class="rbroHidden"></div>');
        elDiv = $('<div id="rbro_image_element_print_if_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_image_element_print_if">${this.rb.getLabel('docElementPrintIf')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPrintIf = $(`<textarea id="rbro_image_element_print_if" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_image_element_print_if', 'printIf',
                        elPrintIf.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elPrintIf);
        elFormField.append(elPrintIf);
        elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_image_element_print_if', 'printIf', __WEBPACK_IMPORTED_MODULE_5__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_image_element_print_if_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_image_element_remove_empty_element">${this.rb.getLabel('docElementRemoveEmptyElement')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elRemoveEmptyElement = $(`<input id="rbro_image_element_remove_empty_element" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_image_element_remove_empty_element', 'removeEmptyElement',
                        elRemoveEmptyElement.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elRemoveEmptyElement);
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);
        panel.append(elPrintSectionDiv);

        if (this.rb.getProperty('enableSpreadsheet')) {
            let elSpreadsheetHeader = $('<div class="rbroPanelSectionHeader"></div>');
            let elSpreadsheetHeaderIcon = $('<span id="rbro_image_element_spreadsheet_header_icon" class="rbroIcon-plus"></span>');
            elDiv = $('<div id="rbro_image_element_spreadsheet_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        $('#rbro_image_element_spreadsheet_header').toggleClass('rbroPanelSectionHeaderOpen');
                        $('#rbro_image_element_spreadsheet_section').toggleClass('rbroHidden');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-plus');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-minus');
                        if (elSpreadsheetHeaderIcon.hasClass('rbroIcon-minus')) {
                            $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elSpreadsheetHeader.position().top);
                        }
                    }
                });
            elSpreadsheetHeader.append(elSpreadsheetHeaderIcon);
            elSpreadsheetHeader.append(`<span>${this.rb.getLabel('docElementSpreadsheet')}</span>`);
            elDiv.append(elSpreadsheetHeader);
            panel.append(elDiv);

            let elSpreadsheetSectionDiv = $('<div id="rbro_image_element_spreadsheet_section" class="rbroHidden"></div>');
            elDiv = $('<div id="rbro_image_element_spreadsheet_hide_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_image_element_spreadsheet_hide">${this.rb.getLabel('docElementSpreadsheetHide')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetHide = $(`<input id="rbro_image_element_spreadsheet_hide" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_image_element_spreadsheet_hide', 'spreadsheet_hide',
                            elSpreadsheetHide.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetHide);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_image_element_spreadsheet_column_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_image_element_spreadsheet_column">${this.rb.getLabel('docElementSpreadsheetColumn')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetColumn = $(`<input id="rbro_image_element_spreadsheet_column">`)
                .on('input', event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_image_element_spreadsheet_column', 'spreadsheet_column',
                            elSpreadsheetColumn.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            __WEBPACK_IMPORTED_MODULE_6__utils__["f" /* setInputPositiveInteger */](elSpreadsheetColumn);
            elFormField.append(elSpreadsheetColumn);
            elFormField.append('<div id="rbro_image_element_spreadsheet_column_error" class="rbroErrorMessage"></div>');
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_image_element_spreadsheet_add_empty_row_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_image_element_spreadsheet_add_empty_row">${this.rb.getLabel('docElementSpreadsheetAddEmptyRow')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetAddEmptyRow = $(`<input id="rbro_image_element_spreadsheet_add_empty_row" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_image_element_spreadsheet_add_empty_row', 'spreadsheet_addEmptyRow',
                            elSpreadsheetAddEmptyRow.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetAddEmptyRow);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);
            panel.append(elSpreadsheetSectionDiv);
        }

        $('#rbro_detail_panel').append(panel);
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_image_element_source'));
        autosize.update($('#rbro_image_element_print_if'));
    }

    show(data) {
        $('#rbro_image_element_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_image_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {ImageElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_image_element_source').prop('disabled', false);
            $('#rbro_image_element_image').prop('disabled', false);
            $('#rbro_image_element_position_x').prop('disabled', false);
            $('#rbro_image_element_position_y').prop('disabled', false);
            $('#rbro_image_element_width').prop('disabled', false);
            $('#rbro_image_element_height').prop('disabled', false);
            $('#rbro_image_element_print_if').prop('disabled', false);
            $('#rbro_image_element_remove_empty_element').prop('disabled', false);
            $('#rbro_image_element_spreadsheet_hide').prop('disabled', false);
            $('#rbro_image_element_spreadsheet_column').prop('disabled', false);
            $('#rbro_image_element_spreadsheet_add_empty_row').prop('disabled', false);

            $('#rbro_image_element_source').val(data.getValue('source'));
            $('#rbro_image_element_image_filename').text(data.getValue('imageFilename'));
            if (data.getValue('imageFilename') !== '') {
                $('#rbro_image_element_image_filename_container').removeClass('rbroHidden');
            } else {
                $('#rbro_image_element_image_filename_container').addClass('rbroHidden');
            }
            $('#rbro_image_element_position_x').val(data.getValue('x'));
            $('#rbro_image_element_position_y').val(data.getValue('y'));
            $('#rbro_image_element_width').val(data.getValue('width'));
            $('#rbro_image_element_height').val(data.getValue('height'));
            $('#rbro_image_element_print_if').val(data.getValue('printIf'));
            $('#rbro_image_element_remove_empty_element').prop('checked', data.getValue('removeEmptyElement'));
            $('#rbro_image_element_spreadsheet_hide').prop('checked', data.getValue('spreadsheet_hide'));
            $('#rbro_image_element_spreadsheet_column').val(data.getValue('spreadsheet_column'));
            $('#rbro_image_element_spreadsheet_add_empty_row').prop('checked', data.getValue('spreadsheet_addEmptyRow'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_image_element_source').prop('disabled', true);
            $('#rbro_image_element_image_filename').text('');
            $('#rbro_image_element_image_filename_container').addClass('rbroHidden');
            $('#rbro_image_element_image').prop('disabled', true);
            $('#rbro_image_element_position_x').prop('disabled', true);
            $('#rbro_image_element_position_y').prop('disabled', true);
            $('#rbro_image_element_width').prop('disabled', true);
            $('#rbro_image_element_height').prop('disabled', true);
            $('#rbro_image_element_print_if').prop('disabled', true);
            $('#rbro_image_element_remove_empty_element').prop('disabled', true);
            $('#rbro_image_element_spreadsheet_hide').prop('disabled', true);
            $('#rbro_image_element_spreadsheet_column').prop('disabled', true);
            $('#rbro_image_element_spreadsheet_add_empty_row').prop('disabled', true);
        }
        $('#rbro_image_element_image').val('');
        __WEBPACK_IMPORTED_MODULE_0__StylePanel__["a" /* default */].updateStyleData(data, 'image_element_', '', __WEBPACK_IMPORTED_MODULE_4__elements_DocElement__["a" /* default */].type.image);

        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_image_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_image_element_panel .rbroPanelSection').removeClass('rbroError');
        $('#rbro_image_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_image_element_' + error.field + '_row';
                let errorId = 'rbro_image_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
                if (error.field === 'print_if') {
                    $('#rbro_image_element_print_header').addClass('rbroError');
                    if (!$('#rbro_image_element_print_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_image_element_print_header').trigger('click');
                    }
                } else if (error.field === 'spreadsheet_column') {
                    $('#rbro_image_element_spreadsheet_header').addClass('rbroError');
                    if (!$('#rbro_image_element_spreadsheet_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_image_element_spreadsheet_header').trigger('click');
                    }
                }
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageElementPanel;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);




/**
 * Panel to edit all line properties.
 * @class
 */
class LineElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_line_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div id="rbro_line_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_line_element_position">${this.rb.getLabel('docElementPosition')}:</label>`);
        let elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elPosX = $(`<input id="rbro_line_element_position_x">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('x') !== elPosX.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_line_element_position_x', 'x',
                        elPosX.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elPosX);
        elFormField.append(elPosX);
        let elPosY = $(`<input id="rbro_line_element_position_y">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('y') !== elPosY.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_line_element_position_y', 'y',
                        elPosY.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elFormField.append('<div id="rbro_line_element_position_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_line_element_size_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_line_element_size">${this.rb.getLabel('docElementSize')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elWidth = $(`<input id="rbro_line_element_width">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('width') !== elWidth.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_line_element_width', 'width',
                        elWidth.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elWidth);
        elFormField.append(elWidth);
        let elHeight = $(`<input id="rbro_line_element_height">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('height') !== elHeight.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_line_element_height', 'height',
                        elHeight.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elHeight);
        elFormField.append(elHeight);
        elFormField.append('<div id="rbro_line_element_size_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_line_element_color">${this.rb.getLabel('docElementColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elColor = $('<input id="rbro_line_element_color">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_line_element_color',
                        'color', elColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elColorContainer.append(elColor);
        elFormField.append(elColorContainer);
        elDiv.append(elFormField);
        panel.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_2__utils__["g" /* initColorPicker */](elColor, this.rb);

        elDiv = $('<div id="rbro_line_element_print_if_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_line_element_print_if">${this.rb.getLabel('docElementPrintIf')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPrintIf = $(`<textarea id="rbro_line_element_print_if" rows="1"></textarea>`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('printIf') !== elPrintIf.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_line_element_print_if', 'printIf',
                        elPrintIf.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elPrintIf);
        elFormField.append(elPrintIf);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_line_element_print_if', 'printIf', __WEBPACK_IMPORTED_MODULE_1__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_line_element_print_if_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        $('#rbro_detail_panel').append(panel);
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_line_element_print_if'));
    }

    show(data) {
        $('#rbro_line_element_panel').removeClass('rbroHidden');
        this.updateData(data);
        this.updateAutosizeInputs();
    }

    hide() {
        $('#rbro_line_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {LineElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_line_element_position_x').prop('disabled', false);
            $('#rbro_line_element_position_y').prop('disabled', false);
            $('#rbro_line_element_width').prop('disabled', false);
            $('#rbro_line_element_height').prop('disabled', false);
            $('#rbro_line_element_color').spectrum('enable');
            $('#rbro_line_element_print_if').prop('disabled', false);

            $('#rbro_line_element_position_x').val(data.getValue('x'));
            $('#rbro_line_element_position_y').val(data.getValue('y'));
            $('#rbro_line_element_width').val(data.getValue('width'));
            $('#rbro_line_element_height').val(data.getValue('height'));
            $('#rbro_line_element_color').spectrum("set", data.getValue('color'));
            $('#rbro_line_element_print_if').val(data.getValue('printIf'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_line_element_position_x').prop('disabled', true);
            $('#rbro_line_element_position_y').prop('disabled', true);
            $('#rbro_line_element_width').prop('disabled', true);
            $('#rbro_line_element_height').prop('disabled', true);
            $('#rbro_line_element_color').spectrum('disable');
            $('#rbro_line_element_print_if').prop('disabled', true);
        }

        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_line_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_line_element_panel .rbroPanelSection').removeClass('rbroError');
        $('#rbro_line_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_line_element_' + error.field + '_row';
                let errorId = 'rbro_line_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineElementPanel;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);



/**
 * Panel to edit all page break properties.
 * @class
 */
class PageBreakElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_page_break_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div id="rbro_page_break_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_page_break_element_position_y">${this.rb.getLabel('docElementPositionY')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elPosY = $(`<input id="rbro_page_break_element_position_y">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_page_break_element_position_y', 'y',
                        elPosY.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_1__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elDiv.append(elFormField);
        panel.append(elDiv);

        $('#rbro_detail_panel').append(panel);
    }

    show(data) {
        $('#rbro_page_break_element_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_page_break_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {PageBreakElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_page_break_element_position_y').prop('disabled', false);
            $('#rbro_page_break_element_position_y').val(data.getValue('y'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_page_break_element_position_y').prop('disabled', true);
        }
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_page_break_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_page_break_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageBreakElementPanel;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_CommandGroupCmd__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(0);







/**
 * Panel to edit all parameter properties.
 * @class
 */
class ParameterPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render(data) {
        let panel = $('<div id="rbro_parameter_panel" class="rbroHidden"></div>');
        let elDiv = $('<div id="rbro_parameter_name_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_parameter_name">${this.rb.getLabel('parameterName')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elParameterName = $('<input id="rbro_parameter_name">')
            .change(event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null) {
                    if (elParameterName.val().trim() !== '') {
                        let newParameterName = elParameterName.val();
                        let cmdGroup = new __WEBPACK_IMPORTED_MODULE_1__commands_CommandGroupCmd__["a" /* default */]('Rename parameter');
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_parameter_name', 'name',
                            newParameterName, __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        cmdGroup.addCommand(cmd);
                        let parent = obj.getParent();
                        if (parent !== null) {
                            parent.addUpdateTestDataCmdForChangedParameter(obj.getName(), newParameterName, cmdGroup);
                        }
                        // add commands to convert all values containing the currently changed parameter
                        let docElements = this.rb.getDocElements(true);
                        for (let docElement of docElements) {
                            docElement.addCommandsForChangedParameterName(obj, newParameterName, cmdGroup);
                        }
                        for (let parameter of this.rb.getParameters()) {
                            parameter.addCommandsForChangedParameterName(obj, newParameterName, cmdGroup);
                        }
                        this.rb.executeCommand(cmdGroup);
                    } else {
                        elParameterName.val(parameter.getName());
                    }
                }
            });
        elFormField.append(elParameterName);
        elFormField.append('<div id="rbro_parameter_name_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_parameter_type_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_parameter_type">${this.rb.getLabel('parameterType')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elType = $(`<select id="rbro_parameter_type">
                <option value="string">${this.rb.getLabel('parameterTypeString')}</option>
                <option value="number">${this.rb.getLabel('parameterTypeNumber')}</option>
                <option value="boolean">${this.rb.getLabel('parameterTypeBoolean')}</option>
                <option value="date">${this.rb.getLabel('parameterTypeDate')}</option>
                <option value="image">${this.rb.getLabel('parameterTypeImage')}</option>
                <option value="array">${this.rb.getLabel('parameterTypeArray')}</option>
                <option value="simple_array">${this.rb.getLabel('parameterTypeSimpleArray')}</option>
                <option value="map">${this.rb.getLabel('parameterTypeMap')}</option>
                <option value="sum">${this.rb.getLabel('parameterTypeSum')}</option>
                <option value="average">${this.rb.getLabel('parameterTypeAverage')}</option>
            </select>`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_parameter_type',
                        'type', elType.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elType);
        elFormField.append('<div id="rbro_parameter_type_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_parameter_array_item_type_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_parameter_array_item_type_row">${this.rb.getLabel('parameterArrayItemType')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elArrayItemType = $(`<select id="rbro_parameter_array_item_type">
                <option value="string">${this.rb.getLabel('parameterTypeString')}</option>
                <option value="number">${this.rb.getLabel('parameterTypeNumber')}</option>
                <option value="boolean">${this.rb.getLabel('parameterTypeBoolean')}</option>
                <option value="date">${this.rb.getLabel('parameterTypeDate')}</option>
                <option value="image">${this.rb.getLabel('parameterTypeImage')}</option>
            </select>`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_parameter_array_item_type',
                        'arrayItemType', elArrayItemType.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elArrayItemType);
        elFormField.append('<div id="rbro_parameter_array_item_type_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        if (this.rb.getProperty('adminMode')) {
            elDiv = $('<div class="rbroFormRow" id="rbro_parameter_eval_row"></div>');
            elDiv.append(`<label for="rbro_parameter_eval">${this.rb.getLabel('parameterEval')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elEval = $('<input id="rbro_parameter_eval" type="checkbox">')
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_parameter_eval', 'eval',
                            elEval.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elEval);
            elDiv.append(elFormField);
            panel.append(elDiv);
        }

        elDiv = $('<div class="rbroFormRow" id="rbro_parameter_nullable_row"></div>');
        elDiv.append(`<label for="rbro_parameter_nullable">${this.rb.getLabel('parameterNullable')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elNullable = $('<input id="rbro_parameter_nullable" type="checkbox">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_parameter_nullable', 'nullable',
                        elNullable.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elNullable);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow" id="rbro_parameter_pattern_row"></div>');
        elDiv.append(`<label for="rbro_parameter_pattern">${this.rb.getLabel('parameterPattern')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPattern = $('<input id="rbro_parameter_pattern">')
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_parameter_pattern', 'pattern',
                        elPattern.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elPattern);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    let patterns;
                    let type = selectedObj.getValue('type');
                    let valueType = (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.simpleArray) ? selectedObj.getValue('arrayItemType') : type;
                    if (valueType === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.date) {
                        patterns = this.rb.getProperty('patternDates');
                    } else {
                        patterns = this.rb.getProperty('patternNumbers');
                    }
                    this.rb.getPopupWindow().show(patterns, this.selectedObjId,
                        'rbro_parameter_pattern', 'pattern', __WEBPACK_IMPORTED_MODULE_4__PopupWindow__["a" /* default */].type.pattern);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_parameter_pattern_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow" id="rbro_parameter_expression_row"></div>');
        elDiv.append(`<label for="rbro_parameter_expression">${this.rb.getLabel('parameterExpression')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elExpression = $('<textarea id="rbro_parameter_expression" rows="1"></textarea>')
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_parameter_expression', 'expression',
                        elExpression.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elExpression);
        elFormField.append(elExpression);
        elParameterButton = $(`<div id="rbro_parameter_expression_param_button"
        class="rbroButton rbroRoundButton rbroIcon-select"></div>`)
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    let items;
                    let popupType;
                    if (selectedObj.getValue('type') === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.sum ||
                            selectedObj.getValue('type') === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.average) {
                        items = this.rb.getArrayFieldParameterItems(__WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.number);
                        popupType = __WEBPACK_IMPORTED_MODULE_4__PopupWindow__["a" /* default */].type.parameterSet;
                    } else {
                        items = this.rb.getParameterItems(selectedObj);
                        popupType = __WEBPACK_IMPORTED_MODULE_4__PopupWindow__["a" /* default */].type.parameterAppend;
                    }
                    this.rb.getPopupWindow().show(items, this.selectedObjId,
                        'rbro_parameter_expression', 'expression', popupType);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_parameter_expression_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow" id="rbro_parameter_test_data_row"></div>');
        elDiv.append(`<label for="rbro_parameter_test_data">${this.rb.getLabel('parameterTestData')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elTestData = $('<input id="rbro_parameter_test_data">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_parameter_test_data', 'testData',
                        elTestData.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elTestData);
        let elEditTestDataButton = $(`<button id="rbro_parameter_edit_test_data"
        class="rbroButton rbroActionButton" style="display: none;">
                    <span>${this.rb.getLabel('parameterEditTestData')}</span>
                    <span class="rbroIcon-edit"></span>
                </button>`)
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    let rows = selectedObj.getTestDataRows(true);
                    if (rows.length > 0) {
                        this.rb.getPopupWindow().show(
                            rows, this.selectedObjId, '', 'testData', __WEBPACK_IMPORTED_MODULE_4__PopupWindow__["a" /* default */].type.testData);
                    } else {
                        alert(this.rb.getLabel('parameterEditTestDataNoFields'));
                    }
                }
            });
        elFormField.append(elEditTestDataButton);
        elFormField.append('<div id="rbro_parameter_test_data_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        $('#rbro_detail_panel').append(panel);
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_parameter_expression'));
    }

    show(data) {
        $('#rbro_parameter_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_parameter_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {Parameter} data
     */
    updateData(data) {
        if (data !== null) {
            let editable = data.getValue('editable');
            $('#rbro_parameter_name').prop('disabled', !editable);
            $('#rbro_parameter_type').prop('disabled', !editable);
            $('#rbro_parameter_eval').prop('disabled', !editable);
            $('#rbro_parameter_nullable').prop('disabled', !editable);
            $('#rbro_parameter_pattern').prop('disabled', !editable);
            $('#rbro_parameter_expression').prop('disabled', !editable);
            if (editable) {
                $('#rbro_parameter_name_row label').removeClass('rbroDisabled');
                $('#rbro_parameter_type_row label').removeClass('rbroDisabled');
                $('#rbro_parameter_eval_row label').removeClass('rbroDisabled');
                $('#rbro_parameter_nullable_row label').removeClass('rbroDisabled');
                $('#rbro_parameter_pattern_row label').removeClass('rbroDisabled');
                $('#rbro_parameter_expression_row label').removeClass('rbroDisabled');
            } else {
                $('#rbro_parameter_name_row label').addClass('rbroDisabled');
                $('#rbro_parameter_type_row label').addClass('rbroDisabled');
                $('#rbro_parameter_eval_row label').addClass('rbroDisabled');
                $('#rbro_parameter_nullable_row label').addClass('rbroDisabled');
                $('#rbro_parameter_pattern_row label').addClass('rbroDisabled');
                $('#rbro_parameter_expression_row label').addClass('rbroDisabled');
            }
            $('#rbro_parameter_test_data').prop('disabled', false);

            $('#rbro_parameter_name').val(data.getName());
            $('#rbro_parameter_type').val(data.getValue('type'));
            $('#rbro_parameter_eval').prop('checked', data.getValue('eval'));
            $('#rbro_parameter_nullable').prop('checked', data.getValue('nullable'));
            $('#rbro_parameter_pattern').val(data.getValue('pattern'));
            $('#rbro_parameter_expression').val(data.getValue('expression'));
            $('#rbro_parameter_test_data').val(data.getValue('testData'));
            this.updatePatternPlaceholder(data);
            this.updateVisibility(data);
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_parameter_name').prop('disabled', true);
            $('#rbro_parameter_type').prop('disabled', true);
            $('#rbro_parameter_eval').prop('disabled', true);
            $('#rbro_parameter_nullable').prop('disabled', true);
            $('#rbro_parameter_pattern').prop('disabled', true);
            $('#rbro_parameter_expression').prop('disabled', true);
            $('#rbro_parameter_test_data').prop('disabled', true);
        }
        
        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
        if (obj instanceof __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */] && obj === this.rb.getDetailData() && operation === __WEBPACK_IMPORTED_MODULE_0__commands_Command__["a" /* default */].operation.change) {
            this.updateVisibility(obj);
        }
    }

    updatePatternPlaceholder(obj) {
        if (obj !== null && obj.getValue('type') === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.date) {
            $('#rbro_parameter_test_data').attr('placeholder', this.rb.getLabel('parameterTestDataDatePattern'));
        } else {
            $('#rbro_parameter_test_data').attr('placeholder', '');
        }
    }

    updateVisibility(obj) {
        let type = obj.getValue('type');
        let valueType = (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.simpleArray) ? obj.getValue('arrayItemType') : type;
        let showOnlyNameType = obj.getValue('showOnlyNameType');
        let parentParameter = null;
        if (obj.getPanelItem() !== null && obj.getPanelItem().getParent().getData() instanceof __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */]) {
            parentParameter = obj.getPanelItem().getParent().getData();
        }

        if (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.simpleArray) {
            $('#rbro_parameter_array_item_type_row').show();
        } else {
            $('#rbro_parameter_array_item_type_row').hide();
        }
        if (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.string || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.number || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.boolean || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.date ||
                type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.simpleArray || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.map) {
            $('#rbro_parameter_nullable_row').show();
        } else {
            $('#rbro_parameter_nullable_row').hide();
        }
        if ((valueType === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.number || valueType === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.date ||
                valueType === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.sum || valueType === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.average) && !showOnlyNameType) {
            $('#rbro_parameter_pattern_row').show();
        } else {
            $('#rbro_parameter_pattern_row').hide();
        }
        if (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.image || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.sum || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.average ||
                showOnlyNameType) {
            $('#rbro_parameter_eval_row').hide();
            $('#rbro_parameter_test_data_row').hide();
        } else {
            if (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.image || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.simpleArray || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.map) {
                $('#rbro_parameter_eval_row').hide();
            } else {
                $('#rbro_parameter_eval_row').show();
            }
            if ((parentParameter !== null && parentParameter.getValue('type') === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array) ||
                    type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.map) {
                $('#rbro_parameter_test_data_row').hide();
            } else {
                if (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.simpleArray || !obj.getValue('eval')) {
                    $('#rbro_parameter_test_data_row').show();
                } else {
                    $('#rbro_parameter_test_data_row').hide();
                }
            }
            if (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.simpleArray) {
                $('#rbro_parameter_test_data').hide();
                $('#rbro_parameter_edit_test_data').show();
            } else {
                $('#rbro_parameter_test_data').show();
                $('#rbro_parameter_edit_test_data').hide();
            }
        }
        if (((obj.getValue('eval') && (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.string || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.number ||
              type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.boolean || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.date)) ||
                (type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.sum || type === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.average)) && !showOnlyNameType) {
            $('#rbro_parameter_expression_row').show();
        } else {
            $('#rbro_parameter_expression_row').hide();
        }
        // do not allow nested array/map
        if (obj.getPanelItem() !== null && obj.getPanelItem().getParent() === this.rb.getMainPanel().getParametersItem()) {
            $('#rbro_parameter_type option[value="array"]').removeClass('rbroHidden');
            $('#rbro_parameter_type option[value="map"]').removeClass('rbroHidden');
        } else {
            $('#rbro_parameter_type option[value="array"]').addClass('rbroHidden');
            $('#rbro_parameter_type option[value="map"]').addClass('rbroHidden');
        }
        // do not allow image and sum/average parameter in list
        if (parentParameter !== null && parentParameter.getValue('type') === __WEBPACK_IMPORTED_MODULE_3__data_Parameter__["a" /* default */].type.array) {
            // $('#rbro_parameter_type option[value="image"]').addClass('rbroHidden');
            $('#rbro_parameter_type option[value="sum"]').addClass('rbroHidden');
            $('#rbro_parameter_type option[value="average"]').addClass('rbroHidden');
        } else {
            // $('#rbro_parameter_type option[value="image"]').removeClass('rbroHidden');
            $('#rbro_parameter_type option[value="sum"]').removeClass('rbroHidden');
            $('#rbro_parameter_type option[value="average"]').removeClass('rbroHidden');
        }
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_parameter_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_parameter_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_parameter_' + error.field + '_row';
                let errorId = 'rbro_parameter_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ParameterPanel;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_CommandGroupCmd__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__container_Band__ = __webpack_require__(6);





/**
 * Panel to edit all band properties of custom section.
 * @class
 */
class SectionBandElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_section_band_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_band_element_height">${this.rb.getLabel('docElementHeight')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elHeight = $('<input id="rbro_section_band_element_height">')
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_section_band_element_height', 'height',
                        elHeight.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elHeight);
        elFormField.append(elHeight);
        elFormField.append('<div id="rbro_section_element_size_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);
        
        elDiv = $('<div id="rbro_section_band_element_repeat_header_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_band_element_repeat_header">${this.rb.getLabel('tableElementRepeatHeader')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elRepeatHeader = $('<input id="rbro_section_band_element_repeat_header" type="checkbox">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_section_band_element_repeat_header', 'repeatHeader',
                        elRepeatHeader.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elRepeatHeader);
        elDiv.append(elFormField);
        panel.append(elDiv);
        
        elDiv = $('<div id="rbro_section_band_element_always_print_on_same_page_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_band_element_always_print_on_same_page">${this.rb.getLabel('docElementAlwaysPrintOnSamePage')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elAlwaysPrintOnSamePage = $(`<input id="rbro_section_band_element_always_print_on_same_page" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_section_band_element_always_print_on_same_page', 'alwaysPrintOnSamePage',
                        elAlwaysPrintOnSamePage.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elAlwaysPrintOnSamePage);
        elFormField.append('<div id="rbro_section_band_element_always_print_on_same_page_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_band_element_shrink_to_content_height">${this.rb.getLabel('frameElementShrinkToContentHeight')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elShrinkToContentHeight = $(`<input id="rbro_section_band_element_shrink_to_content_height" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_section_band_element_shrink_to_content_height', 'shrinkToContentHeight',
                        elShrinkToContentHeight.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elShrinkToContentHeight);
        elDiv.append(elFormField);
        panel.append(elDiv);

        $('#rbro_detail_panel').append(panel);
    }

    show(data) {
        $('#rbro_section_band_element_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_section_band_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {TableBandElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_section_band_element_height').prop('disabled', false);
            $('#rbro_section_band_element_repeat_header').prop('disabled', false);
            $('#rbro_section_band_shrink_to_content_height').prop('disabled', false);

            $('#rbro_section_band_element_height').val(data.getValue('height'));
            if (data.getValue('bandType') === __WEBPACK_IMPORTED_MODULE_3__container_Band__["a" /* default */].bandType.header) {
                $('#rbro_section_band_element_repeat_header').prop('checked', data.getValue('repeatHeader'));
                $('#rbro_section_band_element_repeat_header_row').show();
                $('#rbro_section_band_element_always_print_on_same_page_row').hide();
            } else {
                $('#rbro_section_band_element_repeat_header_row').hide();
                $('#rbro_section_band_element_always_print_on_same_page').prop(
                    'checked', data.getValue('alwaysPrintOnSamePage'));
                $('#rbro_section_band_element_always_print_on_same_page_row').show();
            }
            $('#rbro_section_band_shrink_to_content_height').prop('checked', data.getValue('shrinkToContentHeight'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_section_band_element_height').prop('disabled', true);
            $('#rbro_section_band_element_repeat_header').prop('disabled', true);
            $('#rbro_section_band_shrink_to_content_height').prop('disabled', true);
        }
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_section_band_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_section_band_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_section_band_element_' + error.field + '_row';
                let errorId = 'rbro_section_band_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SectionBandElementPanel;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);





/**
 * Panel to edit all section properties.
 * @class
 */
class SectionElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_section_element_panel" class="rbroHidden"></div>');

        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_element_label">${this.rb.getLabel('docElementLabel')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elLabel = $(`<input id="rbro_section_element_label">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.getSelectedObjId(), 'rbro_section_element_label',
                        'label', elLabel.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elLabel);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow" id="rbro_section_element_data_source_row"></div>');
        elDiv.append(`<label for="rbro_section_element_data_source">${this.rb.getLabel('docElementDataSource')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elDataSource = $(`<textarea id="rbro_section_element_data_source" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_section_element_data_source', 'dataSource',
                        elDataSource.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elDataSource);
        elFormField.append(elDataSource);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj, [__WEBPACK_IMPORTED_MODULE_1__data_Parameter__["a" /* default */].type.array]), this.selectedObjId,
                        'rbro_section_element_data_source', 'dataSource', __WEBPACK_IMPORTED_MODULE_2__PopupWindow__["a" /* default */].type.parameterSet);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_section_element_data_source_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_section_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_element_position_y">${this.rb.getLabel('docElementPositionY')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elPosY = $(`<input id="rbro_section_element_position_y">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_section_element_position_y', 'y',
                        elPosY.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_3__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elFormField.append('<div id="rbro_section_element_position_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_element_header">${this.rb.getLabel('header')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elHeaderLabel = $(`<label class="switch-light switch-material"></label>`);
        let elHeader = $(`<input id="rbro_section_element_header" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_section_element_header', 'header',
                        elHeader.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elHeaderLabel.append(elHeader);
        let elHeaderSpan = $('<span></span>');
        elHeaderSpan.append($('<span></span>'));
        elHeaderSpan.append($('<span></span>'));
        elHeaderSpan.append($('<a></a>'));
        elHeaderLabel.append(elHeaderSpan);
        elFormField.append(elHeaderLabel);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_element_footer">${this.rb.getLabel('footer')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elFooterLabel = $(`<label class="switch-light switch-material"></label>`);
        let elFooter = $(`<input id="rbro_section_element_footer" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_section_element_footer', 'footer',
                        elFooter.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFooterLabel.append(elFooter);
        let elFooterSpan = $('<span></span>');
        elFooterSpan.append($('<span></span>'));
        elFooterSpan.append($('<span></span>'));
        elFooterSpan.append($('<a></a>'));
        elFooterLabel.append(elFooterSpan);
        elFormField.append(elFooterLabel);
        elDiv.append(elFormField);
        panel.append(elDiv);

        let elPrintHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elPrintHeaderIcon = $('<span id="rbro_section_element_print_header_icon" class="rbroIcon-plus"></span>');
        elDiv = $('<div id="rbro_section_element_print_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    $('#rbro_section_element_print_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_section_element_print_section').toggleClass('rbroHidden');
                    elPrintHeaderIcon.toggleClass('rbroIcon-plus');
                    elPrintHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elPrintHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop(elPrintHeader.position().top);
                    }
                    autosize.update($('#rbro_section_element_print_if'));
                });
        elPrintHeader.append(elPrintHeaderIcon);
        elPrintHeader.append(`<span>${this.rb.getLabel('docElementPrintSettings')}</span>`);
        elDiv.append(elPrintHeader);
        panel.append(elDiv);
        
        let elPrintSectionDiv = $('<div id="rbro_section_element_print_section" class="rbroHidden"></div>');
        elDiv = $('<div id="rbro_section_element_print_if_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_section_element_print_if">${this.rb.getLabel('docElementPrintIf')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPrintIf = $(`<textarea id="rbro_section_element_print_if" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_section_element_print_if', 'printIf',
                        elPrintIf.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elPrintIf);
        elFormField.append(elPrintIf);
        elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_section_element_print_if', 'parameter', __WEBPACK_IMPORTED_MODULE_2__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_section_element_print_if_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);
        panel.append(elPrintSectionDiv);

        $('#rbro_detail_panel').append(panel);
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_section_element_print_if'));
    }

    show(data) {
        $('#rbro_section_element_panel').removeClass('rbroHidden');
        this.updateData(data);
        this.updateAutosizeInputs();
    }

    hide() {
        $('#rbro_section_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {LineElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_section_element_data_source').prop('disabled', false);
            $('#rbro_section_element_label').prop('disabled', false);
            $('#rbro_section_element_position_y').prop('disabled', false);
            $('#rbro_table_element_header').prop('disabled', false);
            $('#rbro_table_element_footer').prop('disabled', false);
            $('#rbro_section_element_print_if').prop('disabled', false);
            
            $('#rbro_section_element_data_source').val(data.getValue('dataSource'));
            $('#rbro_section_element_label').val(data.getValue('label'));
            $('#rbro_section_element_position_y').val(data.getValue('y'));
            $('#rbro_section_element_header').prop('checked', data.getValue('header'));
            $('#rbro_section_element_footer').prop('checked', data.getValue('footer'));
            $('#rbro_section_element_print_if').val(data.getValue('printIf'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_section_element_data_source').prop('disabled', true);
            $('#rbro_section_element_label').prop('disabled', true);
            $('#rbro_section_element_position_y').prop('disabled', true);
            $('#rbro_table_element_header').prop('disabled', true);
            $('#rbro_table_element_footer').prop('disabled', true);
            $('#rbro_section_element_print_if').prop('disabled', true);
        }

        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_section_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_section_element_panel .rbroPanelSection').removeClass('rbroError');
        $('#rbro_section_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_section_element_' + error.field + '_row';
                let errorId = 'rbro_section_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
                if (error.field === 'print_if') {
                    $('#rbro_section_element_print_header').addClass('rbroError');
                    if (!$('#rbro_section_element_print_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_section_element_print_header').trigger('click');
                    }
                }
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SectionElementPanel;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PopupWindow__ = __webpack_require__(4);





/**
 * Panel to edit all table band properties.
 * @class
 */
class TableBandElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_table_band_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_band_element_height">${this.rb.getLabel('docElementHeight')}:</label>`);
        let elFormField = $('<div class="rbroFormField"></div>');
        let elHeight = $('<input id="rbro_table_band_element_height">')
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_band_element_height', 'height',
                        elHeight.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_2__utils__["h" /* setInputDecimal */](elHeight);
        elFormField.append(elHeight);
        elDiv.append(elFormField);
        panel.append(elDiv);
        
        elDiv = $('<div id="rbro_table_band_element_repeat_header_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_band_element_repeat_header">${this.rb.getLabel('tableElementRepeatHeader')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elRepeatHeader = $('<input id="rbro_table_band_element_repeat_header" type="checkbox">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_table_band_element_repeat_header', 'repeatHeader',
                        elRepeatHeader.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elRepeatHeader);
        elDiv.append(elFormField);
        panel.append(elDiv);
        
        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_band_element_background_color">${this.rb.getLabel('styleBackgroundColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBgColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elBgColor = $('<input id="rbro_table_band_element_background_color">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_band_element_background_color',
                        'backgroundColor', elBgColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBgColorContainer.append(elBgColor);
        elFormField.append(elBgColorContainer);
        elDiv.append(elFormField);
        panel.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_2__utils__["g" /* initColorPicker */](elBgColor, this.rb, { allowEmpty: true });

        elDiv = $('<div id="rbro_table_band_element_alternate_background_color_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_band_element_alternate_background_color">${this.rb.getLabel('tableElementAlternateBackgroundColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elAltBgColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elAltBgColor = $('<input id="rbro_table_band_element_alternate_background_color">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_band_element_alternate_background_color',
                        'alternateBackgroundColor', elAltBgColor.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.color, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elAltBgColorContainer.append(elAltBgColor);
        elFormField.append(elAltBgColorContainer);
        elDiv.append(elFormField);
        panel.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_2__utils__["g" /* initColorPicker */](elAltBgColor, this.rb, { allowEmpty: true });

        elDiv = $('<div id="rbro_table_band_element_always_print_on_same_page_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_band_element_always_print_on_same_page">${this.rb.getLabel('docElementAlwaysPrintOnSamePage')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elAlwaysPrintOnSamePage = $(`<input id="rbro_table_band_element_always_print_on_same_page" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_table_band_element_always_print_on_same_page', 'alwaysPrintOnSamePage',
                        elAlwaysPrintOnSamePage.is(":checked"), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elAlwaysPrintOnSamePage);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_table_band_element_group_expression_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_band_element_group_expression">${this.rb.getLabel('tableElementGroupExpression')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elGroupExpression = $(`<textarea id="rbro_table_band_element_group_expression" rows="1"></textarea>`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('groupExpression') !== elGroupExpression.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_table_band_element_group_expression', 'groupExpression',
                        elGroupExpression.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            })
            .blur(event => {
                this.rb.getPopupWindow().hide();
            });
        autosize(elGroupExpression);
        elFormField.append(elGroupExpression);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_table_band_element_group_expression', 'groupExpression', __WEBPACK_IMPORTED_MODULE_3__PopupWindow__["a" /* default */].type.parameterSet);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_text_element_group_expression_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_table_band_element_print_if_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_band_element_print_if">${this.rb.getLabel('docElementPrintIf')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPrintIf = $(`<textarea id="rbro_table_band_element_print_if" rows="1"></textarea>`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('printIf') !== elPrintIf.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_table_band_element_print_if', 'printIf',
                        elPrintIf.val(), __WEBPACK_IMPORTED_MODULE_0__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elPrintIf);
        elFormField.append(elPrintIf);
        elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_table_band_element_print_if', 'printIf', __WEBPACK_IMPORTED_MODULE_3__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_text_element_print_if_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        $('#rbro_detail_panel').append(panel);
    }

    show(data) {
        $('#rbro_table_band_element_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_table_band_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {TableBandElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_table_band_element_height').prop('disabled', false);
            $('#rbro_table_band_element_repeat_header').prop('disabled', false);

            $('#rbro_table_band_element_height').val(data.getValue('height'));
            $('#rbro_table_band_element_background_color').spectrum("set", data.getValue('backgroundColor'));
            if (data.getValue('bandType') === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.header) {
                $('#rbro_table_band_element_repeat_header').prop('checked', data.getValue('repeatHeader'));
                $('#rbro_table_band_element_repeat_header_row').show();
            } else {
                $('#rbro_table_band_element_repeat_header_row').hide();
            }
            if (data.getValue('bandType') === __WEBPACK_IMPORTED_MODULE_1__container_Band__["a" /* default */].bandType.content) {
                $('#rbro_table_band_element_alternate_background_color').spectrum("set", data.getValue('alternateBackgroundColor'));
                $('#rbro_table_band_element_always_print_on_same_page').prop('checked', data.getValue('alwaysPrintOnSamePage'));
                $('#rbro_table_band_element_group_expression').val(data.getValue('groupExpression'));
                $('#rbro_table_band_element_print_if').val(data.getValue('printIf'));
                $('#rbro_table_band_element_alternate_background_color_row').show();
                $('#rbro_table_band_element_always_print_on_same_page_row').show();
                $('#rbro_table_band_element_group_expression_row').show();
                $('#rbro_table_band_element_print_if_row').show();
            } else {
                $('#rbro_table_band_element_alternate_background_color_row').hide();
                $('#rbro_table_band_element_always_print_on_same_page_row').hide();
                $('#rbro_table_band_element_group_expression_row').hide();
                $('#rbro_table_band_element_print_if_row').hide();
            }
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_table_band_element_height').prop('disabled', true);
            $('#rbro_table_band_element_repeat_header').prop('disabled', true);
        }
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_table_band_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_table_band_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TableBandElementPanel;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_CommandGroupCmd__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Parameter__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__elements_TableElement__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(0);








/**
 * Panel to edit all table properties.
 * @class
 */
class TableElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_table_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div class="rbroFormRow" id="rbro_table_element_data_source_row"></div>');
        elDiv.append(`<label for="rbro_table_element_data_source">${this.rb.getLabel('docElementDataSource')}:</label>`);
        let elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elDataSource = $(`<textarea id="rbro_table_element_data_source" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_data_source', 'dataSource',
                        elDataSource.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elDataSource);
        elFormField.append(elDataSource);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj, [__WEBPACK_IMPORTED_MODULE_2__data_Parameter__["a" /* default */].type.array]), this.selectedObjId,
                        'rbro_table_element_data_source', 'dataSource', __WEBPACK_IMPORTED_MODULE_5__PopupWindow__["a" /* default */].type.parameterSet);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_table_element_data_source_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_table_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_element_position">${this.rb.getLabel('docElementPosition')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elPosX = $(`<input id="rbro_table_element_position_x">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_position_x', 'x',
                        elPosX.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["h" /* setInputDecimal */](elPosX);
        elFormField.append(elPosX);
        let elPosY = $(`<input id="rbro_table_element_position_y">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_position_y', 'y',
                        elPosY.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elFormField.append('<div id="rbro_table_element_position_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_element_columns">${this.rb.getLabel('tableElementColumns')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elColumns = $(`<input id="rbro_table_element_columns">`)
            .change(event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null) {
                    let val = __WEBPACK_IMPORTED_MODULE_6__utils__["i" /* checkInputDecimal */](elColumns.val(), 1, 20);
                    if (val !== elColumns.val()) {
                        elColumns.val(val);
                    }
                    let cmdGroup = new __WEBPACK_IMPORTED_MODULE_0__commands_CommandGroupCmd__["a" /* default */]('Set value');
                    let columns = __WEBPACK_IMPORTED_MODULE_6__utils__["a" /* convertInputToNumber */](val);
                    let newColumns = obj.addCommandsForChangedColumns(columns, cmdGroup);
                    if (newColumns !== columns) {
                        elColumns.val(newColumns);
                    }
                    if (!cmdGroup.isEmpty()) {
                        this.rb.executeCommand(cmdGroup);
                    }
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["f" /* setInputPositiveInteger */](elColumns);
        elFormField.append(elColumns);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_element_header">${this.rb.getLabel('header')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elHeaderLabel = $(`<label class="switch-light switch-material"></label>`);
        let elHeader = $(`<input id="rbro_table_element_header" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_header', 'header',
                        elHeader.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elHeaderLabel.append(elHeader);
        let elHeaderSpan = $('<span></span>');
        elHeaderSpan.append($('<span></span>'));
        elHeaderSpan.append($('<span></span>'));
        elHeaderSpan.append($('<a></a>'));
        elHeaderLabel.append(elHeaderSpan);
        elFormField.append(elHeaderLabel);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_element_content_rows">${this.rb.getLabel('tableElementContentRows')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        // let elContentRows = $(`<input id="rbro_table_element_content_rows" maxlength="1">`)
        let elContentRows = $(`<input id="rbro_table_element_content_rows">`) // Unlimited rows
            .change(event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null) {
                    // let val = utils.checkInputDecimal(elContentRows.val(), 1, 9); // Unlimited rows
                    let val = elContentRows.val();
                    console.log('val', val);
                    if (val < 1) {
                        val = 1;
                    }
                    console.log('val', val);
                    if (val !== elContentRows.val()) {
                        elContentRows.val(val);
                    }
                    let cmdGroup = new __WEBPACK_IMPORTED_MODULE_0__commands_CommandGroupCmd__["a" /* default */]('Set value');
                    let contentRows = __WEBPACK_IMPORTED_MODULE_6__utils__["a" /* convertInputToNumber */](val);
                    obj.addCommandsForChangedContentRows(contentRows, cmdGroup);
                    if (!cmdGroup.isEmpty()) {
                        this.rb.executeCommand(cmdGroup);
                    }
                }
            });
        __WEBPACK_IMPORTED_MODULE_6__utils__["f" /* setInputPositiveInteger */](elContentRows);
        elFormField.append(elContentRows);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_element_footer">${this.rb.getLabel('footer')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elFooterLabel = $(`<label class="switch-light switch-material"></label>`);
        let elFooter = $(`<input id="rbro_table_element_footer" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_footer', 'footer',
                        elFooter.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFooterLabel.append(elFooter);
        let elFooterSpan = $('<span></span>');
        elFooterSpan.append($('<span></span>'));
        elFooterSpan.append($('<span></span>'));
        elFooterSpan.append($('<a></a>'));
        elFooterLabel.append(elFooterSpan);
        elFormField.append(elFooterLabel);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label>${this.rb.getLabel('styleBorder')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorder = $('<div id="rbro_table_element_border"></div>');
        let elBorderGrid = $(`<button id="rbro_table_element_border_grid" class="rbroButton rbroActionButton rbroIcon-border-table-grid"
                type="button" value="grid"
                title="${this.rb.getLabel('tableElementBorderGrid')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_border',
                        'border', __WEBPACK_IMPORTED_MODULE_4__elements_TableElement__["a" /* default */].border.grid, __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.buttonGroup, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorder.append(elBorderGrid);
        let elBorderFrameRow = $(`<button id="rbro_table_element_border_frame_row" class="rbroButton rbroActionButton rbroIcon-border-table-frame-row"
                type="button" value="frame_row"
                title="${this.rb.getLabel('tableElementBorderFrameRow')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_border',
                        'border', __WEBPACK_IMPORTED_MODULE_4__elements_TableElement__["a" /* default */].border.frameRow, __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.buttonGroup, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorder.append(elBorderFrameRow);
        let elBorderFrame = $(`<button id="rbro_table_element_border_frame" class="rbroButton rbroActionButton rbroIcon-border-table-frame"
                type="button" value="frame"
                title="${this.rb.getLabel('tableElementBorderFrame')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_border',
                        'border', __WEBPACK_IMPORTED_MODULE_4__elements_TableElement__["a" /* default */].border.frame, __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.buttonGroup, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorder.append(elBorderFrame);
        let elBorderRow = $(`<button id="rbro_table_element_border_row" class="rbroButton rbroActionButton rbroIcon-border-table-row"
                type="button" value="row"
                title="${this.rb.getLabel('tableElementBorderRow')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_border',
                        'border', __WEBPACK_IMPORTED_MODULE_4__elements_TableElement__["a" /* default */].border.row, __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.buttonGroup, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorder.append(elBorderRow);
        let elBorderNone = $(`<button id="rbro_table_element_border_none" class="rbroButton rbroActionButton rbroIcon-border-table-none"
                type="button" value="none"
                title="${this.rb.getLabel('tableElementBorderNone')}"></button>`)
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_border',
                        'border', __WEBPACK_IMPORTED_MODULE_4__elements_TableElement__["a" /* default */].border.none, __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.buttonGroup, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorder.append(elBorderNone);
        elFormField.append(elBorder);
        elDiv.append(elFormField);
        panel.append(elDiv);
        
        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_element_border_color">${this.rb.getLabel('styleBorderColor')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderColorContainer = $('<div class="rbroColorPickerContainer"></div>');
        let elBorderColor = $('<input id="rbro_table_element_border_color">')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_border_color',
                        'borderColor', elBorderColor.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.color, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elBorderColorContainer.append(elBorderColor);
        elFormField.append(elBorderColorContainer);
        elDiv.append(elFormField);
        panel.append(elDiv);
        __WEBPACK_IMPORTED_MODULE_6__utils__["g" /* initColorPicker */](elBorderColor, this.rb);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_table_element_border_width">${this.rb.getLabel('styleBorderWidth')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elBorderWidth = $(`<input id="rbro_table_element_border_width">`)
            .on('input', event => {
                if (this.rb.getDataObject(this.getSelectedObjId()) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.getSelectedObjId(), 'rbro_table_element_border_width',
                        'borderWidth', elBorderWidth.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elBorderWidth);
        elDiv.append(elFormField);
        __WEBPACK_IMPORTED_MODULE_6__utils__["h" /* setInputDecimal */](elBorderWidth);
        panel.append(elDiv);

        if (this.rb.getProperty('enableSpreadsheet')) {
            let elSpreadsheetHeader = $('<div class="rbroPanelSectionHeader"></div>');
            let elSpreadsheetHeaderIcon = $('<span id="rbro_table_element_spreadsheet_header_icon" class="rbroIcon-plus"></span>');
            elDiv = $('<div id="rbro_table_element_spreadsheet_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        $('#rbro_table_element_spreadsheet_header').toggleClass('rbroPanelSectionHeaderOpen');
                        $('#rbro_table_element_spreadsheet_section').toggleClass('rbroHidden');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-plus');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-minus');
                        if (elSpreadsheetHeaderIcon.hasClass('rbroIcon-minus')) {
                            $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elSpreadsheetHeader.position().top);
                        }
                    }
                });
            elSpreadsheetHeader.append(elSpreadsheetHeaderIcon);
            elSpreadsheetHeader.append(`<span>${this.rb.getLabel('docElementSpreadsheet')}</span>`);
            elDiv.append(elSpreadsheetHeader);
            panel.append(elDiv);

            let elSpreadsheetSectionDiv = $('<div id="rbro_table_element_spreadsheet_section" class="rbroHidden"></div>');
            elDiv = $('<div id="rbro_table_element_spreadsheet_hide_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_table_element_spreadsheet_hide">${this.rb.getLabel('docElementSpreadsheetHide')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetHide = $(`<input id="rbro_table_element_spreadsheet_hide" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_table_element_spreadsheet_hide', 'spreadsheet_hide',
                            elSpreadsheetHide.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetHide);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_table_element_spreadsheet_column_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_table_element_spreadsheet_column">${this.rb.getLabel('docElementSpreadsheetColumn')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetColumn = $(`<input id="rbro_table_element_spreadsheet_column">`)
                .on('input', event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_table_element_spreadsheet_column', 'spreadsheet_column',
                            elSpreadsheetColumn.val(), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            __WEBPACK_IMPORTED_MODULE_6__utils__["f" /* setInputPositiveInteger */](elSpreadsheetColumn);
            elFormField.append(elSpreadsheetColumn);
            elFormField.append('<div id="rbro_table_element_spreadsheet_column_error" class="rbroErrorMessage"></div>');
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_table_element_spreadsheet_add_empty_row_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_table_element_spreadsheet_add_empty_row">${this.rb.getLabel('docElementSpreadsheetAddEmptyRow')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetAddEmptyRow = $(`<input id="rbro_table_element_spreadsheet_add_empty_row" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_table_element_spreadsheet_add_empty_row', 'spreadsheet_addEmptyRow',
                            elSpreadsheetAddEmptyRow.is(":checked"), __WEBPACK_IMPORTED_MODULE_1__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetAddEmptyRow);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);
            panel.append(elSpreadsheetSectionDiv);
        }

        $('#rbro_detail_panel').append(panel);
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_table_element_data_source'));
    }

    show(data) {
        $('#rbro_table_element_panel').removeClass('rbroHidden');
        this.updateData(data);
        this.updateAutosizeInputs();
    }

    hide() {
        $('#rbro_table_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {TableElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_table_element_data_source').prop('disabled', false);
            $('#rbro_table_element_position_x').prop('disabled', false);
            $('#rbro_table_element_position_y').prop('disabled', false);
            $('#rbro_table_element_columns').prop('disabled', false);
            $('#rbro_table_element_header').prop('disabled', false);
            $('#rbro_table_element_footer').prop('disabled', false);
            $('#rbro_table_element_border_grid').prop('disabled', false);
            $('#rbro_table_element_border_frame_row').prop('disabled', false);
            $('#rbro_table_element_border_frame').prop('disabled', false);
            $('#rbro_table_element_border_row').prop('disabled', false);
            $('#rbro_table_element_border_none').prop('disabled', false);
            $('#rbro_table_element_border_color').spectrum('enable');
            $('#rbro_table_element_border_width').prop('disabled', false);
            $('#rbro_table_element_spreadsheet_hide').prop('disabled', false);
            $('#rbro_table_element_spreadsheet_column').prop('disabled', false);
            $('#rbro_table_element_spreadsheet_add_empty_row').prop('disabled', false);

            $('#rbro_table_element_data_source').val(data.getValue('dataSource'));
            $('#rbro_table_element_position_x').val(data.getValue('x'));
            $('#rbro_table_element_position_y').val(data.getValue('y'));
            $('#rbro_table_element_columns').val(data.getValue('columns'));
            $('#rbro_table_element_header').prop('checked', data.getValue('header'));
            $('#rbro_table_element_content_rows').val(data.getValue('contentRows'));
            $('#rbro_table_element_footer').prop('checked', data.getValue('footer'));

            $('#rbro_table_element_border').find('button').removeClass('rbroButtonActive');
            $('#rbro_table_element_border').find(`button[value="${data.getValue('border')}"]`).addClass('rbroButtonActive');
            $('#rbro_table_element_border_color').spectrum('set', data.getValue('borderColor'));
            $('#rbro_table_element_border_width').val(data.getValue('borderWidth'));
            $('#rbro_table_element_spreadsheet_hide').prop('checked', data.getValue('spreadsheet_hide'));
            $('#rbro_table_element_spreadsheet_column').val(data.getValue('spreadsheet_column'));
            $('#rbro_table_element_spreadsheet_add_empty_row').prop('checked', data.getValue('spreadsheet_addEmptyRow'));
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_table_element_data_source').prop('disabled', true);
            $('#rbro_table_element_position_x').prop('disabled', true);
            $('#rbro_table_element_position_y').prop('disabled', true);
            $('#rbro_table_element_columns').prop('disabled', true);
            $('#rbro_table_element_header').prop('disabled', true);
            $('#rbro_table_element_content_rows').prop('disabled', true);
            $('#rbro_table_element_footer').prop('disabled', true);
            $('#rbro_table_element_border_grid').prop('disabled', true);
            $('#rbro_table_element_border_frame_row').prop('disabled', true);
            $('#rbro_table_element_border_frame').prop('disabled', true);
            $('#rbro_table_element_border_row').prop('disabled', true);
            $('#rbro_table_element_border_none').prop('disabled', true);
            $('#rbro_table_element_border_color').spectrum('disable');
            $('#rbro_table_element_border_width').prop('disabled', true);
            $('#rbro_table_element_spreadsheet_hide').prop('disabled', true);
            $('#rbro_table_element_spreadsheet_column').prop('disabled', true);
            $('#rbro_table_element_spreadsheet_add_empty_row').prop('disabled', true);
        }
        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_table_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_table_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_table_element_' + error.field + '_row';
                let errorId = 'rbro_table_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
                if (error.field === 'spreadsheet_column') {
                    $('#rbro_table_element_spreadsheet_header').addClass('rbroError');
                    if (!$('#rbro_table_element_spreadsheet_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_table_element_spreadsheet_header').trigger('click');
                    }
                }
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TableElementPanel;



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StylePanel__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_Command__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__container_Band__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__elements_DocElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__elements_TableTextElement__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__PopupWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(0);










/**
 * Panel to edit all text properties.
 * @class
 */
class TextElementPanel {
    constructor(rootElement, rb) {
        this.rootElement = rootElement;
        this.rb = rb;
        this.elStyle = null;
        this.cs_elStyle = null;
        this.selectedObjId = null;
    }

    render() {
        let panel = $('<div id="rbro_text_element_panel" class="rbroHidden"></div>');
        let elDiv = $('<div id="rbro_text_element_content_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_content">${this.rb.getLabel('textElementContent')}:</label>`);
        let elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elContent = $(`<textarea id="rbro_text_element_content" rows="1"></textarea>`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('content') !== elContent.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_content', 'content',
                        elContent.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            })
            .blur(event => {
                this.rb.getPopupWindow().hide();
            });
        autosize(elContent);
        elFormField.append(elContent);
        let elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_text_element_content', 'content', __WEBPACK_IMPORTED_MODULE_7__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_text_element_content_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div class="rbroFormRow" id="rbro_text_element_eval_row"></div>');
        elDiv.append(`<label for="rbro_text_element_eval">${this.rb.getLabel('textElementEval')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elEval = $(`<input id="rbro_text_element_eval" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_text_element_eval', 'eval',
                        elEval.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elEval);
        elDiv.append(elFormField);
        panel.append(elDiv);

        elDiv = $('<div id="rbro_text_element_position_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_position_x">${this.rb.getLabel('docElementPosition')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elPosX = $(`<input id="rbro_text_element_position_x">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('x') !== elPosX.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_position_x', 'x',
                        elPosX.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_8__utils__["h" /* setInputDecimal */](elPosX);
        elFormField.append(elPosX);
        let elPosY = $(`<input id="rbro_text_element_position_y">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('y') !== elPosY.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_position_y', 'y',
                        elPosY.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_8__utils__["h" /* setInputDecimal */](elPosY);
        elFormField.append(elPosY);
        elFormField.append('<div id="rbro_text_element_position_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);
        
        elDiv = $('<div id="rbro_text_element_size_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_size">${this.rb.getLabel('docElementSize')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit"></div>');
        let elWidth = $(`<input id="rbro_text_element_width">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('width') !== elWidth.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_width', 'width',
                        elWidth.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_8__utils__["h" /* setInputDecimal */](elWidth);
        elFormField.append(elWidth);
        let elHeight = $(`<input id="rbro_text_element_height">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('height') !== elHeight.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_height', 'height',
                        elHeight.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        __WEBPACK_IMPORTED_MODULE_8__utils__["h" /* setInputDecimal */](elHeight);
        elFormField.append(elHeight);
        elFormField.append('<div id="rbro_text_element_size_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        panel.append(elDiv);

        let elStyleHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elStyleHeaderIcon = $('<span id="rbro_text_element_style_header_icon" class="rbroPanelSectionHeaderOpen rbroIcon-minus"></span>');
        elDiv = $('<div id="rbro_text_element_style_header" class="rbroFormRow rbroPanelSection rbroPanelSectionHeaderOpen"></div>')
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    $('#rbro_text_element_style_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_text_element_style_section').toggleClass('rbroHidden');
                    elStyleHeaderIcon.toggleClass('rbroIcon-plus');
                    elStyleHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elStyleHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elStyleHeader.position().top);
                    }
                }
            });
        elStyleHeader.append(elStyleHeaderIcon);
        elStyleHeader.append(`<span>${this.rb.getLabel('docElementStyle')}</span>`);
        elDiv.append(elStyleHeader);
        panel.append(elDiv);

        let elStyleSectionDiv = $('<div id="rbro_text_element_style_section"></div>');
        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_style_id">${this.rb.getLabel('docElementStyle')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        this.elStyle = $('<select id="rbro_text_element_style_id"></select>')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_style_id', 'styleId',
                        this.elStyle.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(this.elStyle);
        elDiv.append(elFormField);
        elStyleSectionDiv.append(elDiv);

        let elStyleDiv = $('<div id="rbro_text_element_style_settings"></div>');
        __WEBPACK_IMPORTED_MODULE_0__StylePanel__["a" /* default */].renderStyle(elStyleDiv, 'text_element_', '', __WEBPACK_IMPORTED_MODULE_5__elements_DocElement__["a" /* default */].type.text, this, this.rb);
        elStyleSectionDiv.append(elStyleDiv);
        panel.append(elStyleSectionDiv);

        let elPrintHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elPrintHeaderIcon = $('<span id="rbro_text_element_print_header_icon" class="rbroIcon-plus"></span>');
        elDiv = $('<div id="rbro_text_element_print_header" class="rbroFormRow rbroPanelSection"></div>')
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    $('#rbro_text_element_print_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_text_element_print_section').toggleClass('rbroHidden');
                    elPrintHeaderIcon.toggleClass('rbroIcon-plus');
                    elPrintHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elPrintHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elPrintHeader.position().top);
                    }
                    autosize.update($('#rbro_text_element_print_if'));
                }
            });
        elPrintHeader.append(elPrintHeaderIcon);
        elPrintHeader.append(`<span>${this.rb.getLabel('docElementPrintSettings')}</span>`);
        elDiv.append(elPrintHeader);
        panel.append(elDiv);

        let elPrintSectionDiv = $('<div id="rbro_text_element_print_section" class="rbroHidden"></div>');
        elDiv = $('<div id="rbro_text_element_print_if_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_print_if">${this.rb.getLabel('docElementPrintIf')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPrintIf = $(`<textarea id="rbro_text_element_print_if" rows="1"></textarea>`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('printIf') !== elPrintIf.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_text_element_print_if', 'printIf',
                        elPrintIf.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elPrintIf);
        elFormField.append(elPrintIf);
        elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_text_element_print_if', 'printIf', __WEBPACK_IMPORTED_MODULE_7__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_text_element_print_if_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);

        elDiv = $('<div id="rbro_text_element_remove_empty_element_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_remove_empty_element">${this.rb.getLabel('docElementRemoveEmptyElement')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elRemoveEmptyElement = $(`<input id="rbro_text_element_remove_empty_element" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_text_element_remove_empty_element', 'removeEmptyElement',
                        elRemoveEmptyElement.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elRemoveEmptyElement);
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);
        panel.append(elPrintSectionDiv);

        elDiv = $('<div id="rbro_text_element_always_print_on_same_page_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_always_print_on_same_page">${this.rb.getLabel('docElementAlwaysPrintOnSamePage')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        let elAlwaysPrintOnSamePage = $(`<input id="rbro_text_element_always_print_on_same_page" type="checkbox">`)
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_text_element_always_print_on_same_page', 'alwaysPrintOnSamePage',
                        elAlwaysPrintOnSamePage.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elAlwaysPrintOnSamePage);
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);
        panel.append(elPrintSectionDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_pattern">${this.rb.getLabel('textElementPattern')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elPattern = $(`<input id="rbro_text_element_pattern">`)
            .on('input', event => {
                let obj = this.rb.getDataObject(this.selectedObjId);
                if (obj !== null && obj.getValue('pattern') !== elPattern.val()) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_text_element_pattern', 'pattern',
                        elPattern.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(elPattern);
        elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getPatterns(), this.selectedObjId,
                        'rbro_text_element_pattern', 'pattern', __WEBPACK_IMPORTED_MODULE_7__PopupWindow__["a" /* default */].type.pattern);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_text_element_pattern_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        elPrintSectionDiv.append(elDiv);
        panel.append(elPrintSectionDiv);

        let elConditionalStyleHeader = $('<div class="rbroPanelSectionHeader"></div>');
        let elConditionalStyleHeaderIcon = $('<span id="rbro_text_element_cs_header_icon" class="rbroIcon-plus"></span>');
        elDiv = $('<div id="rbro_text_element_cs_header" class="rbroFormRow rbroPanelSection"></div>')
            .click(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    $('#rbro_text_element_cs_header').toggleClass('rbroPanelSectionHeaderOpen');
                    $('#rbro_text_element_cs_section').toggleClass('rbroHidden');
                    elConditionalStyleHeaderIcon.toggleClass('rbroIcon-plus');
                    elConditionalStyleHeaderIcon.toggleClass('rbroIcon-minus');
                    if (elConditionalStyleHeaderIcon.hasClass('rbroIcon-minus')) {
                        $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elConditionalStyleHeader.position().top);
                    }
                    autosize.update($('#rbro_text_element_cs_condition'));
                }
            });
        elConditionalStyleHeader.append(elConditionalStyleHeaderIcon);
        elConditionalStyleHeader.append(`<span>${this.rb.getLabel('docElementConditionalStyle')}</span>`);
        elDiv.append(elConditionalStyleHeader);
        panel.append(elDiv);

        let elCondStyleSectionDiv = $('<div id="rbro_text_element_cs_section" class="rbroHidden"></div>');
        elDiv = $('<div id="rbro_text_element_cs_condition_row" class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_cs_condition">${this.rb.getLabel('docElementConditionalStyleCondition')}:</label>`);
        elFormField = $('<div class="rbroFormField rbroSplit rbroSelector"></div>');
        let elCondStyleCondition = $(`<textarea id="rbro_text_element_cs_condition" rows="1"></textarea>`)
            .on('input', event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                        'rbro_text_element_cs_condition', 'cs_condition',
                        elCondStyleCondition.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        autosize(elCondStyleCondition);
        elFormField.append(elCondStyleCondition);
        elParameterButton = $('<div class="rbroButton rbroRoundButton rbroIcon-select"></div>')
            .click(event => {
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    this.rb.getPopupWindow().show(this.rb.getParameterItems(selectedObj), this.selectedObjId,
                        'rbro_text_element_cs_condition', 'cs_condition', __WEBPACK_IMPORTED_MODULE_7__PopupWindow__["a" /* default */].type.parameterAppend);
                }
            });
        elFormField.append(elParameterButton);
        elFormField.append('<div id="rbro_text_element_cs_condition_error" class="rbroErrorMessage"></div>');
        elDiv.append(elFormField);
        elCondStyleSectionDiv.append(elDiv);

        elDiv = $('<div class="rbroFormRow"></div>');
        elDiv.append(`<label for="rbro_text_element_cs_style_id">${this.rb.getLabel('docElementStyle')}:</label>`);
        elFormField = $('<div class="rbroFormField"></div>');
        this.cs_elStyle = $('<select id="rbro_text_element_cs_style_id"></select>')
            .change(event => {
                if (this.rb.getDataObject(this.selectedObjId) !== null) {
                    let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, `rbro_text_element_cs_style_id`, 'cs_styleId',
                        this.cs_elStyle.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.select, this.rb);
                    this.rb.executeCommand(cmd);
                }
            });
        elFormField.append(this.cs_elStyle);
        elDiv.append(elFormField);
        elCondStyleSectionDiv.append(elDiv);
        
        let elCondStyleDiv = $('<div id="rbro_text_element_cs_style_settings"></div>');
        __WEBPACK_IMPORTED_MODULE_0__StylePanel__["a" /* default */].renderStyle(elCondStyleDiv, 'text_element_cs_', 'cs_', __WEBPACK_IMPORTED_MODULE_5__elements_DocElement__["a" /* default */].type.text, this, this.rb);
        elCondStyleSectionDiv.append(elCondStyleDiv);
        panel.append(elCondStyleSectionDiv);

        if (this.rb.getProperty('enableSpreadsheet')) {
            let elSpreadsheetHeader = $('<div class="rbroPanelSectionHeader"></div>');
            let elSpreadsheetHeaderIcon = $('<span id="rbro_text_element_spreadsheet_header_icon" class="rbroIcon-plus"></span>');
            elDiv = $('<div id="rbro_text_element_spreadsheet_header" class="rbroFormRow rbroPanelSection"></div>')
                .click(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        $('#rbro_text_element_spreadsheet_header').toggleClass('rbroPanelSectionHeaderOpen');
                        $('#rbro_text_element_spreadsheet_section').toggleClass('rbroHidden');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-plus');
                        elSpreadsheetHeaderIcon.toggleClass('rbroIcon-minus');
                        if (elSpreadsheetHeaderIcon.hasClass('rbroIcon-minus')) {
                            $('#rbro_detail_panel').scrollTop($('#rbro_detail_panel').scrollTop() + elSpreadsheetHeader.position().top);
                        }
                    }
                });
            elSpreadsheetHeader.append(elSpreadsheetHeaderIcon);
            elSpreadsheetHeader.append(`<span>${this.rb.getLabel('docElementSpreadsheet')}</span>`);
            elDiv.append(elSpreadsheetHeader);
            panel.append(elDiv);

            let elSpreadsheetSectionDiv = $('<div id="rbro_text_element_spreadsheet_section" class="rbroHidden"></div>');
            elDiv = $('<div id="rbro_text_element_spreadsheet_hide_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_text_element_spreadsheet_hide">${this.rb.getLabel('docElementSpreadsheetHide')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetHide = $(`<input id="rbro_text_element_spreadsheet_hide" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_text_element_spreadsheet_hide', 'spreadsheet_hide',
                            elSpreadsheetHide.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetHide);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_text_element_spreadsheet_column_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_text_element_spreadsheet_column">${this.rb.getLabel('docElementSpreadsheetColumn')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetColumn = $(`<input id="rbro_text_element_spreadsheet_column">`)
                .on('input', event => {
                    let obj = this.rb.getDataObject(this.selectedObjId);
                    if (obj !== null && obj.getValue('spreadsheet_column') !== elSpreadsheetColumn.val()) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_spreadsheet_column', 'spreadsheet_column',
                            elSpreadsheetColumn.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            __WEBPACK_IMPORTED_MODULE_8__utils__["f" /* setInputPositiveInteger */](elSpreadsheetColumn);
            elFormField.append(elSpreadsheetColumn);
            elFormField.append('<div id="rbro_text_element_spreadsheet_column_error" class="rbroErrorMessage"></div>');
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_text_element_spreadsheet_colspan_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_text_element_spreadsheet_colspan">${this.rb.getLabel('docElementSpreadsheetColspan')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetColspan = $(`<input id="rbro_text_element_spreadsheet_colspan">`)
                .on('input', event => {
                    let obj = this.rb.getDataObject(this.selectedObjId);
                    if (obj !== null && obj.getValue('spreadsheet_colspan') !== elSpreadsheetColspan.val()) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId, 'rbro_text_element_spreadsheet_colspan', 'spreadsheet_colspan',
                            elSpreadsheetColspan.val(), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.text, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            __WEBPACK_IMPORTED_MODULE_8__utils__["f" /* setInputPositiveInteger */](elSpreadsheetColspan);
            elFormField.append(elSpreadsheetColspan);
            elFormField.append('<div id="rbro_text_element_spreadsheet_colspan_error" class="rbroErrorMessage"></div>');
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);

            elDiv = $('<div id="rbro_text_element_spreadsheet_add_empty_row_row" class="rbroFormRow"></div>');
            elDiv.append(`<label for="rbro_text_element_spreadsheet_add_empty_row">${this.rb.getLabel('docElementSpreadsheetAddEmptyRow')}:</label>`);
            elFormField = $('<div class="rbroFormField"></div>');
            let elSpreadsheetAddEmptyRow = $(`<input id="rbro_text_element_spreadsheet_add_empty_row" type="checkbox">`)
                .change(event => {
                    if (this.rb.getDataObject(this.selectedObjId) !== null) {
                        let cmd = new __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */](this.selectedObjId,
                            'rbro_text_element_spreadsheet_add_empty_row', 'spreadsheet_addEmptyRow',
                            elSpreadsheetAddEmptyRow.is(":checked"), __WEBPACK_IMPORTED_MODULE_2__commands_SetValueCmd__["a" /* default */].type.checkbox, this.rb);
                        this.rb.executeCommand(cmd);
                    }
                });
            elFormField.append(elSpreadsheetAddEmptyRow);
            elDiv.append(elFormField);
            elSpreadsheetSectionDiv.append(elDiv);
            panel.append(elSpreadsheetSectionDiv);
        }

        $('#rbro_detail_panel').append(panel);
        this.renderStyleSelect();
    }

    renderStyleSelect() {
        this.elStyle.empty();
        this.cs_elStyle.empty();
        this.elStyle.append(`<option value="">${this.rb.getLabel('styleNone')}</option>`);
        this.cs_elStyle.append(`<option value="">${this.rb.getLabel('styleNone')}</option>`);
        let styles = this.rb.getStyles();
        for (let style of styles) {
            this.elStyle.append(`<option value="${style.getId()}">${style.getName()}</option>`);
            this.cs_elStyle.append(`<option value="${style.getId()}">${style.getName()}</option>`);
        }
    }

    updateAutosizeInputs() {
        autosize.update($('#rbro_text_element_content'));
        autosize.update($('#rbro_text_element_print_if'));
        autosize.update($('#rbro_text_element_cs_condition'));
    }

    show(data) {
        $('#rbro_text_element_panel').removeClass('rbroHidden');
        this.updateData(data);
    }

    hide() {
        $('#rbro_text_element_panel').addClass('rbroHidden');
    }

    /**
     * Is called when the selected element was changed.
     * The panel is updated to show the values of the selected data object.
     * @param {TextElement|TableTextElement} data
     */
    updateData(data) {
        if (data !== null) {
            $('#rbro_text_element_content').prop('disabled', false);
            $('#rbro_text_element_eval').prop('disabled', false);
            $('#rbro_text_element_position_x').prop('disabled', false);
            $('#rbro_text_element_position_y').prop('disabled', false);
            $('#rbro_text_element_width').prop('disabled', false);
            $('#rbro_text_element_height').prop('disabled', false);
            $('#rbro_text_element_print_if').prop('disabled', false);
            $('#rbro_text_element_remove_empty_element').prop('disabled', false);
            $('#rbro_text_element_always_print_on_same_page').prop('disabled', false);
            $('#rbro_text_element_pattern').prop('disabled', false);
            $('#rbro_text_element_cs_condition').prop('disabled', false);
            $('#rbro_text_element_style_id').prop('disabled', false);
            $('#rbro_text_element_spreadsheet_hide').prop('disabled', false);
            $('#rbro_text_element_spreadsheet_column').prop('disabled', false);
            $('#rbro_text_element_spreadsheet_colspan').prop('disabled', false);
            $('#rbro_text_element_spreadsheet_add_empty_row').prop('disabled', false);

            $('#rbro_text_element_content').val(data.getValue('content'));
            $('#rbro_text_element_eval').prop('checked', data.getValue('eval'));
            $('#rbro_text_element_width').val(data.getValue('width'));
            $('#rbro_text_element_height').val(data.getValue('height'));
            $('#rbro_text_element_print_if').val(data.getValue('printIf'));
            $('#rbro_text_element_pattern').val(data.getValue('pattern'));
            if (!(data instanceof __WEBPACK_IMPORTED_MODULE_6__elements_TableTextElement__["a" /* default */])) {
                $('#rbro_text_element_position_x').val(data.getValue('x'));
                $('#rbro_text_element_position_y').val(data.getValue('y'));
                $('#rbro_text_element_remove_empty_element').prop('checked', data.getValue('removeEmptyElement'));
                $('#rbro_text_element_always_print_on_same_page').prop('checked', data.getValue('alwaysPrintOnSamePage'));
                $('#rbro_text_element_spreadsheet_hide').prop('checked', data.getValue('spreadsheet_hide'));
                $('#rbro_text_element_spreadsheet_column').val(data.getValue('spreadsheet_column'));
                $('#rbro_text_element_spreadsheet_colspan').val(data.getValue('spreadsheet_colspan'));
                $('#rbro_text_element_spreadsheet_add_empty_row').prop('checked', data.getValue('spreadsheet_addEmptyRow'));
                $('#rbro_text_element_print_if_row').show();
                $('#rbro_text_element_remove_empty_element_row').show();
                $('#rbro_text_element_always_print_on_same_page_row').show();
                $('#rbro_text_element_spreadsheet_hide').show();
                $('#rbro_text_element_spreadsheet_column').show();
                $('#rbro_text_element_spreadsheet_colspan').show();
                $('#rbro_text_element_spreadsheet_header').show();
                $('#rbro_text_element_spreadsheet_section').show();
            } else {
                $('#rbro_text_element_position_x').val(data.getOffsetX());
                $('#rbro_text_element_remove_empty_element_row').hide();
                $('#rbro_text_element_always_print_on_same_page_row').hide();
                let tableBandObj = this.rb.getDataObject(data.parentId);
                if (tableBandObj !== null && tableBandObj.getValue('bandType') === __WEBPACK_IMPORTED_MODULE_3__container_Band__["a" /* default */].bandType.header) {
                    $('#rbro_text_element_print_if_row').show();
                } else {
                    $('#rbro_text_element_print_if_row').hide();
                }
                $('#rbro_text_element_spreadsheet_hide').hide();
                $('#rbro_text_element_spreadsheet_column').hide();
                $('#rbro_text_element_spreadsheet_colspan').hide();
                $('#rbro_text_element_spreadsheet_header').hide();
                $('#rbro_text_element_spreadsheet_section').hide();
            }
            $('#rbro_text_element_cs_condition').val(data.getValue('cs_condition'));

            $('#rbro_text_element_style_id').val(data.getValue('styleId'));
            if (data.getValue('styleId') !== '') {
                $('#rbro_text_element_style_settings').hide();
            } else {
                $('#rbro_text_element_style_settings').show();
            }
            $('#rbro_text_element_cs_style_id').val(data.getValue('cs_styleId'));
            if (data.getValue('cs_styleId') != '') {
                $('#rbro_text_element_cs_style_settings').hide();
            } else {
                $('#rbro_text_element_cs_style_settings').show();
            }
            if (data.getXTagId() !== '') {
                $('#rbro_text_element_position_row label').text(this.rb.getLabel('docElementPosition') + ':');
                $('#rbro_text_element_position_row label').removeClass('rbroDisabled');
                $('#rbro_text_element_position_x').prop('disabled', false);
            } else {
                $('#rbro_text_element_position_row label').text(this.rb.getLabel('docElementPositionX') + ':');
                $('#rbro_text_element_position_row label').addClass('rbroDisabled');
                $('#rbro_text_element_position_x').prop('disabled', true);
            }
            if (data.getYTagId() !== '') {
                $('#rbro_text_element_position_y').show();
            } else {
                $('#rbro_text_element_position_y').hide();
            }
            if (data.getHeightTagId() !== '') {
                $('#rbro_text_element_size_row label').text(this.rb.getLabel('docElementSize') + ':');
                $('#rbro_text_element_height').show();
            } else {
                $('#rbro_text_element_size_row label').text(this.rb.getLabel('docElementWidth') + ':');
                $('#rbro_text_element_height').hide();
            }
            if (data.hasBorderSettings()) {
                $('#rbro_text_element_border_div').show();
                $('#rbro_text_element_cs_border_div').show();
            } else {
                $('#rbro_text_element_border_div').hide();
                $('#rbro_text_element_cs_border_div').hide();
            }
            this.selectedObjId = data.getId();
        } else {
            $('#rbro_text_element_content').prop('disabled', true);
            $('#rbro_text_element_eval').prop('disabled', true);
            $('#rbro_text_element_position_x').prop('disabled', true);
            $('#rbro_text_element_position_y').prop('disabled', true);
            $('#rbro_text_element_width').prop('disabled', true);
            $('#rbro_text_element_height').prop('disabled', true);
            $('#rbro_text_element_print_if').prop('disabled', true);
            $('#rbro_text_element_remove_empty_element').prop('disabled', true);
            $('#rbro_text_element_always_print_on_same_page').prop('disabled', true);
            $('#rbro_text_element_pattern').prop('disabled', false);
            $('#rbro_text_element_cs_condition').prop('disabled', true);
            $('#rbro_text_element_style_id').prop('disabled', true);
            $('#rbro_text_element_spreadsheet_hide').prop('disabled', true);
            $('#rbro_text_element_spreadsheet_column').prop('disabled', true);
            $('#rbro_text_element_spreadsheet_colspan').prop('disabled', true);
            $('#rbro_text_element_spreadsheet_add_empty_row').prop('disabled', true);
            this.selectedObjId = null;
        }
        __WEBPACK_IMPORTED_MODULE_0__StylePanel__["a" /* default */].updateStyleData(data, 'text_element_', '', __WEBPACK_IMPORTED_MODULE_5__elements_DocElement__["a" /* default */].type.text);
        __WEBPACK_IMPORTED_MODULE_0__StylePanel__["a" /* default */].updateStyleData(data, 'text_element_cs_', 'cs_', __WEBPACK_IMPORTED_MODULE_5__elements_DocElement__["a" /* default */].type.text);

        this.updateAutosizeInputs();
        this.updateErrors();
    }

    /**
     * Is called when a data object was modified (including new and deleted data objects).
     * @param {*} obj - new/deleted/modified data object.
     * @param {String} operation - operation which caused the notification.
     */
    notifyEvent(obj, operation) {
        if (obj instanceof __WEBPACK_IMPORTED_MODULE_4__data_Style__["a" /* default */]) {
            if (operation === __WEBPACK_IMPORTED_MODULE_1__commands_Command__["a" /* default */].operation.add || operation === __WEBPACK_IMPORTED_MODULE_1__commands_Command__["a" /* default */].operation.move) {
                this.renderStyleSelect();
                let selectedObj = this.rb.getDataObject(this.selectedObjId);
                if (selectedObj !== null) {
                    $('#rbro_text_element_style_id').val(selectedObj.getValue('styleId'));
                    $('#rbro_text_element_cs_style_id').val(selectedObj.getValue('cs_styleId'));
                }
            } else if (operation === __WEBPACK_IMPORTED_MODULE_1__commands_Command__["a" /* default */].operation.remove) {
                this.elStyle.find(`option[value='${obj.getId()}']`).remove();
                this.cs_elStyle.find(`option[value='${obj.getId()}']`).remove();
            } else if (operation === __WEBPACK_IMPORTED_MODULE_1__commands_Command__["a" /* default */].operation.rename) {
                this.elStyle.find(`option[value='${obj.getId()}']`).text(obj.getName());
                this.cs_elStyle.find(`option[value='${obj.getId()}']`).text(obj.getName());
            }
            if ($('#rbro_text_element_style_id').val() === '') {
                $('#rbro_text_element_style_settings').show();
            } else {
                $('#rbro_text_element_style_settings').hide();
            }
            if ($('#rbro_text_element_cs_style_id').val() === '') {
                $('#rbro_text_element_cs_style_settings').show();
            } else {
                $('#rbro_text_element_cs_style_settings').hide();
            }
        }
    }

    /**
     * Updates displayed errors of currently selected data object.
     */
    updateErrors() {
        $('#rbro_text_element_panel .rbroFormRow').removeClass('rbroError');
        $('#rbro_text_element_panel .rbroPanelSection').removeClass('rbroError');
        $('#rbro_text_element_panel .rbroErrorMessage').text('');
        let selectedObj = this.rb.getDataObject(this.selectedObjId);
        if (selectedObj !== null) {
            for (let error of selectedObj.getErrors()) {
                let rowId = 'rbro_text_element_' + error.field + '_row';
                let errorId = 'rbro_text_element_' + error.field + '_error';
                let errorMsg = this.rb.getLabel(error.msg_key);
                if (error.info) {
                    errorMsg = errorMsg.replace('${info}', '<span class="rbroErrorMessageInfo">' + error.info + '</span>');
                }
                $('#' + rowId).addClass('rbroError');
                $('#' + errorId).html(errorMsg);
                if (error.field === 'print_if' || error.field === 'pattern') {
                    $('#rbro_text_element_print_header').addClass('rbroError');
                    if (!$('#rbro_text_element_print_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_text_element_print_header').trigger('click');
                    }
                } else if (error.field === 'cs_condition') {
                    $('#rbro_text_element_cs_header').addClass('rbroError');
                    if (!$('#rbro_text_element_cs_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_text_element_cs_header').trigger('click');
                    }
                } else if (error.field === 'spreadsheet_column' || error.field === 'spreadsheet_colspan') {
                    $('#rbro_text_element_spreadsheet_header').addClass('rbroError');
                    if (!$('#rbro_text_element_spreadsheet_header').hasClass('rbroPanelSectionHeaderOpen')) {
                        $('#rbro_text_element_spreadsheet_header').trigger('click');
                    }
                }
            }
        }
    }

    getSelectedObjId() {
        return this.selectedObjId;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextElementPanel;



/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(26);
__webpack_require__(25);
module.exports = __webpack_require__(27);


/***/ })
/******/ ]);
//# sourceMappingURL=reportbro.js.map