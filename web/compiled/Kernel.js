/// <reference path='interfaces.d.ts' />
var Kernel;
(function (Kernel) {
    var Distance = (function () {
        function Distance(width, height) {
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(Distance.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Distance.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        return Distance;
    })();
    Kernel.Distance = Distance;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var Point = (function () {
        function Point(x, y) {
            this._x = x;
            this._y = y;
        }
        Point.prototype.distanceToCoords = function (x, y) {
            return new Kernel.Distance(Math.abs(this.x - x), Math.abs(this.y - y));
        };
        Point.prototype.distanceToPoint = function (point) {
            return new Kernel.Distance(Math.abs(this.x - point.x), Math.abs(this.y - point.y));
        };
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        return Point;
    })();
    Kernel.Point = Point;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var ProcessListItem = (function () {
        function ProcessListItem(id, process) {
            this._id = id;
            this._process = process;
        }
        Object.defineProperty(ProcessListItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProcessListItem.prototype, "process", {
            get: function () {
                return this._process;
            },
            set: function (value) {
                this._process = value;
            },
            enumerable: true,
            configurable: true
        });
        return ProcessListItem;
    })();
    Kernel.ProcessListItem = ProcessListItem;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var Process = (function () {
        function Process(name, processManager) {
            var _this = this;
            this._type = 'base';
            this.close = function () {
                _this._processManager.closeProcess(_this._pid);
            };
            this.run = function () {
                _this._pid = _this._processManager.addProcess(_this._name, _this._type, _this);
            };
            this._name = name;
            this._processManager = processManager;
        }
        Object.defineProperty(Process.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Process.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Process.prototype, "pid", {
            get: function () {
                return this._pid;
            },
            set: function (value) {
                this._pid = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Process.prototype, "processManager", {
            get: function () {
                return this._processManager;
            },
            enumerable: true,
            configurable: true
        });
        return Process;
    })();
    Kernel.Process = Process;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Kernel;
(function (Kernel) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(name, settings, processManager, windowManager) {
            var _this = this;
            _super.call(this, name, processManager);
            this.windowManager = windowManager;
            this.collapse = function () {
                var left;
                if (_this.collapsed === false) {
                    _this.windowManager.setActive(_this.pid);
                    if (_this.maximized === true) {
                        var dimensions = _this.windowManager.getWindowDimensions();
                        left = -dimensions.width - 100;
                    }
                    else {
                        left = -_this.settings.windowBox.left - _this.settings.windowBox.width - 100;
                    }
                }
                else {
                    left = 0;
                }
                var top = 0;
                if (_this.maximized === true) {
                    top = -_this.settings.windowBox.top;
                    left -= _this.settings.windowBox.left;
                }
                snabbt(_this.window, {
                    'position': [left, top, 0],
                    'duration': 550
                });
                _this.collapsed = !_this.collapsed;
            };
            this.maximize = function (top, left) {
                _this.windowManager.maximizeWindow(_this.pid, top, left);
            };
            this.makeActive = function () { _this.windowManager.setActive(_this.pid); };
            this.onMouseDown = function (e) {
                if (e.which === 1 && _this.maximized === false &&
                    _this.isCursorModified === false && _this.isResizing === false) {
                    _this.prevX = e.pageX;
                    _this.prevY = e.pageY;
                    _this.isDrags = true;
                }
            };
            this.onMouseDownResize = function (e) {
                if (_this.active === true) {
                    _this.isResizing = true;
                    _this.resizeType = _this.detectArea(e.clientX, e.clientY);
                }
            };
            this.onMouseUpResize = function (e) {
                if (_this.active === true) {
                    _this.isResizing = false;
                    _this.resizeType = null;
                }
            };
            this.onMouseMoveOnMe = function (e) {
                if (_this.maximized === false) {
                    var area = _this.detectArea(e.clientX, e.clientY);
                    if (_this.isResizing === false) {
                        if (area !== null) {
                            _this.window.css('cursor', area);
                            _this.isCursorModified = true;
                        }
                        else if (_this.isCursorModified === true) {
                            _this.window.css('cursor', 'default');
                            _this.isCursorModified = false;
                        }
                    }
                    else if (_this.isResizing === true) {
                        if (_this.resizeType === 'w-resize') {
                            var diffX = e.clientX - _this.settings.windowBox.left;
                            _this.settings.windowBox.left += diffX;
                            _this.settings.windowBox.width -= diffX;
                            _this.resizeWidth(_this.settings.windowBox.left, _this.settings.windowBox.width);
                            _this.onResize();
                        }
                        else if (_this.resizeType === 'e-resize') {
                            _this.settings.windowBox.width +=
                                e.clientX - (_this.settings.windowBox.left + _this.settings.windowBox.width);
                            _this.resizeWidth(_this.settings.windowBox.left, _this.settings.windowBox.width);
                            _this.onResize();
                        }
                        else if (_this.resizeType === 's-resize') {
                            _this.settings.windowBox.height +=
                                e.clientY - (_this.settings.windowBox.top + _this.settings.windowBox.height);
                            _this.resizeHeight(_this.settings.windowBox.top, _this.settings.windowBox.height);
                            _this.onResize();
                        }
                        else if (_this.resizeType === 'n-resize') {
                            var diffY = e.clientY - _this.settings.windowBox.top;
                            _this.settings.windowBox.top += diffY;
                            _this.settings.windowBox.height -= diffY;
                            _this.resizeHeight(_this.settings.windowBox.top, _this.settings.windowBox.height);
                            _this.onResize();
                        }
                    }
                }
            };
            this.resizeHeight = function (top, height) {
                if (_this.settings.windowBox.height > 80 || height > _this.settings.windowBox.height) {
                    _this.window.css('top', top + 'px');
                    _this.window.css('height', height + 'px');
                }
            };
            this.resizeWidth = function (left, width) {
                if (_this.settings.windowBox.width > 80 || width > _this.settings.windowBox.width) {
                    _this.window.css('left', left + 'px');
                    _this.window.css('width', width + 'px');
                }
            };
            this.detectArea = function (x, y) {
                var minX = _this.settings.windowBox.left;
                var maxX = _this.settings.windowBox.left + _this.settings.windowBox.width;
                var minY = _this.settings.windowBox.top;
                var maxY = _this.settings.windowBox.top + _this.settings.windowBox.height;
                if (x >= minX - 2 && x < minX + 6) {
                    return 'w-resize';
                }
                else if (x <= maxX + 2 && x >= maxX - 6) {
                    return 'e-resize';
                }
                else if (y <= maxY + 2 && y >= maxY - 6) {
                    return 's-resize';
                }
                else if (y >= minY - 2 && y <= minY + 6) {
                    return 'n-resize';
                }
                else {
                    return null;
                }
            };
            this.onMouseMove = function (e) {
                if (_this.isDrags === true) {
                    _this.settings.windowBox.left += e.pageX - _this.prevX;
                    _this.settings.windowBox.top += e.pageY - _this.prevY;
                    _this.window.css('left', _this.settings.windowBox.left);
                    _this.window.css('top', _this.settings.windowBox.top);
                    _this.prevX = e.pageX;
                    _this.prevY = e.pageY;
                    _this.isBeingMagnified = _this.windowManager.checkPosition(_this, e.clientX, e.clientY);
                    if (_this.isBeingMagnified === null) {
                        if (_this.magnifyRegion !== null) {
                            _this.magnifyRegion.remove();
                        }
                        _this.magnifyRegion = null;
                    }
                }
            };
            this.onResize = function () {
                var view = _this.window.find('div.application-window');
                view.css('height', _this.window.height() - 25 + 'px');
            };
            this.onMouseUp = function (e) {
                if (_this.isDrags === true && _this.isBeingMagnified !== null) {
                    snabbt(_this.magnifyRegion, {
                        'opacityFrom': '0.4',
                        'opacity': '0.0',
                        'duration': 200,
                        'allDone': function () {
                            _this.magnifyRegion.remove();
                            _this.magnifyRegion = null;
                        }
                    });
                    if (_this.isBeingMagnified === 'top') {
                        _this.maximize(50, 50);
                    }
                    else {
                        var dimensions = _this.windowManager.getWindowDimensions();
                        _this.settings.windowBox.top = 0;
                        if (_this.isBeingMagnified === 'left') {
                            _this.settings.windowBox.left = 0;
                        }
                        else {
                            _this.settings.windowBox.left = dimensions.width / 2;
                        }
                        _this.settings.windowBox.height = dimensions.height;
                        _this.settings.windowBox.width = dimensions.width / 2;
                        _this.window.animate({
                            'top': _this.settings.windowBox.top,
                            'left': _this.settings.windowBox.left,
                            'height': _this.settings.windowBox.height,
                            'width': _this.settings.windowBox.width
                        }, 350);
                    }
                    _this.isBeingMagnified = null;
                }
                _this.isDrags = false;
                _this.isResizing = false;
            };
            this.createMagnifyRegion = function (width, height, position, half) {
                if (_this.magnifyRegion === null) {
                    var element = angular.element('<div></div>');
                    element.css('position', 'fixed');
                    element.css('z-index', '500');
                    element.css('opacity', '0.0');
                    element.css(position, '0');
                    element.css('top', '0');
                    element.css('background-color', 'orangered');
                    element.css('opacity', '0.4');
                    _this.magnifyRegion = element;
                    _this.windowManager.appendMagnifyArea(element);
                    if (half === true) {
                        element.css('width', '0');
                        element.css('height', height + 'px');
                        snabbt(element, {
                            fromOpacity: 0.0, opacity: 0.4,
                            fromWidth: 0, width: width,
                            duration: 400
                        });
                    }
                    else {
                        element.css('height', '0');
                        element.css('width', width + 'px');
                        snabbt(element, {
                            fromOpacity: 0.0, opacity: 0.4,
                            fromHeight: 0, height: height,
                            duration: 400
                        });
                    }
                }
            };
            this.createTemplate = function (settings) {
                return [
                    "<div style=\"color: " + settings.header.textColor + "; " +
                        "top: " + settings.windowBox.top + "px; " +
                        "left: " + settings.windowBox.left + "px; " +
                        "width: " + settings.windowBox.width + "px;" +
                        "height: " + settings.windowBox.height + "px;\"" +
                        "class=\"no-select application\"" +
                        "ng-mousedown=\"makeActive(); onMouseDownResize($event);\">",
                    '<p class="application-header" style="background-color: ' + settings.header.bgColor + ';" ' +
                        'ng-mousedown=\"onMouseDown($event);\">',
                    '<span class="menu-button" ng-click="close();"><i class="fa fa-close fa-fw"></i></span>',
                    '<span class="menu-button" ng-click="maximize();"><i class="fa fa-windows fa-fw"></i></span>',
                    '<span class="menu-button" ng-click="collapse();"><i class="fa fa-minus fa-fw"></i></span>',
                    '</p>',
                    '</div>'
                ].join('');
            };
            this.closeProcess = function () {
                snabbt(_this.window, {
                    position: [-_this.settings.windowBox.width - _this.settings.windowBox.left - 100, 0, 0],
                    fromRotation: [0, 0, 2 * Math.PI],
                    duration: 500,
                    'easing': 'easeIn',
                    'allDone': function () { _this.close(); }
                });
            };
            this.runProcess = function () {
                _this.run();
            };
            this._settings = settings;
            this._template = this.createTemplate(settings);
            this._collapsed = false;
            this._maximized = false;
            this._active = true;
            this.isBeingMagnified = null;
            this.isCursorModified = false;
            this.isResizing = false;
            this.magnifyRegion = null;
        }
        Object.defineProperty(Application.prototype, "template", {
            get: function () {
                return this._template;
            },
            set: function (value) {
                this._template = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "settings", {
            get: function () {
                return this._settings;
            },
            set: function (value) {
                this._settings = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "$scope", {
            get: function () {
                return this._$scope;
            },
            set: function (value) {
                this._$scope = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "prevX", {
            get: function () {
                return this._prevX;
            },
            set: function (value) {
                this._prevX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "prevY", {
            get: function () {
                return this._prevY;
            },
            set: function (value) {
                this._prevY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "isDrags", {
            get: function () {
                return this._isDrags;
            },
            set: function (value) {
                this._isDrags = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "window", {
            get: function () {
                return this._window;
            },
            set: function (value) {
                this._window = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "maximized", {
            get: function () {
                return this._maximized;
            },
            set: function (value) {
                this._maximized = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "collapsed", {
            get: function () {
                return this._collapsed;
            },
            set: function (value) {
                this._collapsed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (value) {
                this._active = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "isCursorModified", {
            get: function () {
                return this._isCursorModified;
            },
            set: function (value) {
                this._isCursorModified = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "isResizing", {
            get: function () {
                return this._isResizing;
            },
            set: function (value) {
                this._isResizing = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "resizeType", {
            get: function () {
                return this._resizeType;
            },
            set: function (value) {
                this._resizeType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "isBeingMagnified", {
            get: function () {
                return this._isBeingMagnified;
            },
            set: function (value) {
                this._isBeingMagnified = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "magnifyRegion", {
            get: function () {
                return this._magnifyRegion;
            },
            set: function (value) {
                this._magnifyRegion = value;
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    })(Kernel.Process);
    Kernel.Application = Application;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var ApplicationWindowSettings = (function () {
        function ApplicationWindowSettings(box) {
            this._header = new Kernel.Block();
            this._header.textColor = "black";
            this._header.bgColor = "lightblue";
            this._header.height = "23px";
            this._windowBox = box;
        }
        Object.defineProperty(ApplicationWindowSettings.prototype, "header", {
            get: function () {
                return this._header;
            },
            set: function (value) {
                this._header = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ApplicationWindowSettings.prototype, "windowBox", {
            get: function () {
                return this._windowBox;
            },
            enumerable: true,
            configurable: true
        });
        return ApplicationWindowSettings;
    })();
    Kernel.ApplicationWindowSettings = ApplicationWindowSettings;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var SystemApplication = (function (_super) {
        __extends(SystemApplication, _super);
        function SystemApplication(name, settings, processManager, windowManger) {
            _super.call(this, name, settings, processManager, windowManger);
            this.type = 'system';
        }
        return SystemApplication;
    })(Kernel.Application);
    Kernel.SystemApplication = SystemApplication;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var UserApplication = (function (_super) {
        __extends(UserApplication, _super);
        function UserApplication(name, settings, processManager, windowManger) {
            _super.call(this, name, settings, processManager, windowManger);
            this.type = 'user';
        }
        return UserApplication;
    })(Kernel.Application);
    Kernel.UserApplication = UserApplication;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var WindowBox = (function () {
        function WindowBox(top, left, width, height) {
            if (width === void 0) { width = 640; }
            if (height === void 0) { height = 480; }
            this._width = width;
            this._height = height;
            this._top = top;
            this._left = left;
        }
        Object.defineProperty(WindowBox.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowBox.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowBox.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (value) {
                this._top = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowBox.prototype, "left", {
            get: function () {
                return this._left;
            },
            set: function (value) {
                this._left = value;
            },
            enumerable: true,
            configurable: true
        });
        return WindowBox;
    })();
    Kernel.WindowBox = WindowBox;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var WindowListItem = (function () {
        function WindowListItem(pid, template, process, applicationPackage) {
            this.pid = pid;
            this.template = template;
            this.process = process;
            this.applicationPackage = applicationPackage;
        }
        return WindowListItem;
    })();
    Kernel.WindowListItem = WindowListItem;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var WindowContainer = (function () {
        function WindowContainer() {
            this.windowList = [];
        }
        WindowContainer.prototype.addWindow = function (window) {
            this.windowList.push(window);
        };
        WindowContainer.prototype.removeWindow = function (pid) {
            var index = this.findByPid(pid);
            if (index !== null) {
                this.windowList.splice(index, 1);
            }
        };
        WindowContainer.prototype.getWindow = function (pid) {
            var index = this.findByPid(pid);
            if (index !== null) {
                return this.windowList[index];
            }
            else {
                return null;
            }
        };
        WindowContainer.prototype.findByPid = function (pid) {
            var wl = this.windowList;
            var index = null;
            for (var i = 0; i < wl.length; i++) {
                if (wl[i].pid === pid) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        return WindowContainer;
    })();
    Kernel.WindowContainer = WindowContainer;
})(Kernel || (Kernel = {}));
/// <reference path='decorations.d.ts' />
var Kernel;
(function (Kernel) {
    var Block = (function () {
        function Block() {
        }
        Object.defineProperty(Block.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "textColor", {
            get: function () {
                return this._textColor;
            },
            set: function (value) {
                this._textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "bgColor", {
            get: function () {
                return this._bgColor;
            },
            set: function (value) {
                this._bgColor = value;
            },
            enumerable: true,
            configurable: true
        });
        return Block;
    })();
    Kernel.Block = Block;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopSettings = (function () {
        function DesktopSettings(data) {
            this._backgroundImage = data.backgroundImage;
            this._backgroundPosition = data.backgroundPosition;
            this._backgroundSize = data.backgroundSize;
        }
        DesktopSettings.prototype.getCss = function () {
            return {
                'background-image': 'url(' + this.backgroundImage + ')',
                'background-position': this.backgroundPosition,
                'background-size': this.backgroundSize,
            };
        };
        Object.defineProperty(DesktopSettings.prototype, "backgroundImage", {
            get: function () {
                return this._backgroundImage;
            },
            set: function (value) {
                this._backgroundImage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopSettings.prototype, "backgroundPosition", {
            get: function () {
                return this._backgroundPosition;
            },
            set: function (value) {
                this._backgroundPosition = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopSettings.prototype, "backgroundSize", {
            get: function () {
                return this._backgroundSize;
            },
            set: function (value) {
                this._backgroundSize = value;
            },
            enumerable: true,
            configurable: true
        });
        return DesktopSettings;
    })();
    Kernel.DesktopSettings = DesktopSettings;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopItem = (function () {
        function DesktopItem(data) {
            if (angular.isDefined(data)) {
                this._id = data.id;
                this._desktopId = data.desktopId;
                this._row = data.row;
                this._col = data.col;
                this._type = data.type;
                this.element = data.element;
            }
            this.width = 50;
            this.height = 40;
        }
        Object.defineProperty(DesktopItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "desktopId", {
            get: function () {
                return this._desktopId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "row", {
            get: function () {
                return this._row;
            },
            set: function (value) {
                this._row = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "col", {
            get: function () {
                return this._col;
            },
            set: function (value) {
                this._col = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "element", {
            get: function () {
                return this._element;
            },
            set: function (value) {
                this._element = value;
            },
            enumerable: true,
            configurable: true
        });
        return DesktopItem;
    })();
    Kernel.DesktopItem = DesktopItem;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var DesktopGrid = (function () {
        function DesktopGrid(height, width, data) {
            if (angular.isDefined(data) === true) {
            }
            else {
                this.rows = [];
                this.rowsCount = 15;
                this.colsCount = 26;
                for (var i = 0; i < this.rowsCount; i++) {
                    var array = [];
                    for (var j = 0; j < this.colsCount; j++) {
                        var item = new Kernel.DesktopItem();
                        item.row = i;
                        item.col = j;
                        array.push(item);
                    }
                    this.rows.push(array);
                }
            }
        }
        Object.defineProperty(DesktopGrid.prototype, "rowsCount", {
            get: function () {
                return this._rowsCount;
            },
            set: function (value) {
                this._rowsCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopGrid.prototype, "colsCount", {
            get: function () {
                return this._colsCount;
            },
            set: function (value) {
                this._colsCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopGrid.prototype, "rows", {
            get: function () {
                return this._rows;
            },
            set: function (value) {
                this._rows = value;
            },
            enumerable: true,
            configurable: true
        });
        return DesktopGrid;
    })();
    Kernel.DesktopGrid = DesktopGrid;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopGridSelection = (function () {
        function DesktopGridSelection(from, to, distance) {
            this._from = from;
            this._to = to;
            this._distance = distance;
        }
        Object.defineProperty(DesktopGridSelection.prototype, "from", {
            get: function () {
                return this._from;
            },
            set: function (value) {
                this._from = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopGridSelection.prototype, "to", {
            get: function () {
                return this._to;
            },
            set: function (value) {
                this._to = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopGridSelection.prototype, "distance", {
            get: function () {
                return this._distance;
            },
            set: function (value) {
                this._distance = value;
            },
            enumerable: true,
            configurable: true
        });
        return DesktopGridSelection;
    })();
    Kernel.DesktopGridSelection = DesktopGridSelection;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var Desktop = (function () {
        function Desktop(width, height, data) {
            this.width = width;
            this.height = height;
            this._id = data.id;
            this._userId = data.userId;
            this._settings = new Kernel.DesktopSettings(data.settings);
            this._created = data.created;
            this._updated = data.updated;
            this.grid = new Kernel.DesktopGrid(height, width /*, data.TODO */);
        }
        Object.defineProperty(Desktop.prototype, "grid", {
            get: function () {
                return this._grid;
            },
            set: function (value) {
                this._grid = value;
            },
            enumerable: true,
            configurable: true
        });
        Desktop.prototype.initGrid = function (height, width) {
            this._grid = new Kernel.DesktopGrid(height, width);
        };
        Object.defineProperty(Desktop.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "userId", {
            get: function () {
                return this._userId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "settings", {
            get: function () {
                return this._settings;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "created", {
            get: function () {
                return this._created;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "updated", {
            get: function () {
                return this._updated;
            },
            enumerable: true,
            configurable: true
        });
        return Desktop;
    })();
    Kernel.Desktop = Desktop;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var WindowPanel = (function () {
        function WindowPanel() {
        }
        return WindowPanel;
    })();
    Kernel.WindowPanel = WindowPanel;
})(Kernel || (Kernel = {}));
/// <reference path='services.d.ts' />
var Kernel;
(function (Kernel) {
    var ProcessManagerService = (function () {
        function ProcessManagerService(rootScope, window) {
            var _this = this;
            this.rootScope = rootScope;
            this.window = window;
            this.addProcess = function (name, type, instance) {
                var id = _this.findFreeId();
                var listItem = new Kernel.ProcessListItem(id, instance);
                _this._processList.push(listItem);
                _this._processCount++;
                instance.pid = id;
                _this.rootScope.$broadcast('ProcessCreated', instance);
                return id;
            };
            this.closeProcess = function (pid) {
                var closed = false;
                var processIndex = _this.findProcess(pid);
                if (processIndex !== null) {
                    var item = _this._processList[processIndex].process;
                    _this._processList.splice(processIndex, 1);
                    closed = true;
                    _this._processCount--;
                    _this.rootScope.$broadcast('ProcessClosed', item);
                }
                return closed;
            };
            this.findFreeId = function () {
                var id = 0;
                do {
                    id++;
                } while (_this.isIdClaimed(id) === true);
                return id;
            };
            this.findProcess = function (id) {
                var index = null;
                for (var i = 0; i < _this._processCount; i++) {
                    if (_this._processList[i].id === id) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
            this.isIdClaimed = function (id) {
                var claimed = false;
                for (var i = 0; i < _this._processCount; i++) {
                    if (_this._processList[i].id === id) {
                        claimed = true;
                        break;
                    }
                }
                return claimed;
            };
            this._processCount = 0;
            this._processList = [];
        }
        ProcessManagerService.Factory = function () {
            var processManager = function ($rootScope, $window) {
                if (angular.isDefined($window.processManager) === false) {
                    $window.processManager = new ProcessManagerService($rootScope, $window);
                }
                return $window.processManager;
            };
            return processManager;
        };
        Object.defineProperty(ProcessManagerService.prototype, "processList", {
            get: function () {
                return this._processList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProcessManagerService.prototype, "processCount", {
            get: function () {
                return this._processCount;
            },
            enumerable: true,
            configurable: true
        });
        ProcessManagerService.$inject = ['$rootScope', '$window'];
        return ProcessManagerService;
    })();
    Kernel.ProcessManagerService = ProcessManagerService;
})(Kernel || (Kernel = {}));
/// <reference path='services.d.ts' />
var Kernel;
(function (Kernel) {
    var SpinnerService = (function () {
        function SpinnerService(rootScope) {
            this.rootScope = rootScope;
            this.spinner = false;
            this.promises = [];
            rootScope.$broadcast('SpinnerInactive');
        }
        SpinnerService.prototype.getSpinner = function () {
            return this.spinner;
        };
        SpinnerService.prototype.addPromise = function (promise) {
            var _this = this;
            if (this.spinner === false) {
                this.spinner = true;
                this.rootScope.$broadcast('SpinnerActive');
            }
            this.promises.push(promise);
            promise.then(function () {
                _this.promises.splice(_this.promises.indexOf(promise), 1);
                if (_this.promises.length === 0) {
                    _this.spinner = false;
                    _this.rootScope.$broadcast('SpinnerInactive');
                }
            });
        };
        SpinnerService.Factory = function () {
            var spinner = function ($rootScope) { return new SpinnerService($rootScope); };
            return spinner;
        };
        SpinnerService.$inject = ['$rootScope'];
        return SpinnerService;
    })();
    Kernel.SpinnerService = SpinnerService;
})(Kernel || (Kernel = {}));
/// <reference path="services.d.ts" />
var Kernel;
(function (Kernel) {
    var FilesystemService = (function () {
        function FilesystemService(http, q) {
            this.http = http;
            this.q = q;
        }
        FilesystemService.prototype.getDir = function (id) {
            return this.http.get('/api/filesystem/directory/' + id);
        };
        FilesystemService.prototype.getRootDir = function () {
            return this.http.get('/api/filesystem/directory');
        };
        FilesystemService.prototype.mkDir = function (parent_id, dir) {
            return this.http.put('/api/filesystem/directory/' + parent_id, {
                'name': dir
            });
        };
        FilesystemService.prototype.uploadFiles = function (files) {
            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append("file[" + i + "]", files[i]);
            }
            var promise = this.http.post('/api/filesystem/file/' + 1, formData, {
                'transformRequest': angular.identity,
                'headers': { 'Content-Type': undefined }
            });
            promise.success(function (response) {
                console.log("Good");
            });
            return this.handlePromise(promise);
        };
        FilesystemService.prototype.handlePromise = function (promise) {
            var defer = this.q.defer();
            promise.success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        };
        FilesystemService.prototype.rmDir = function (dir) {
            return this.createPromise(dir);
        };
        FilesystemService.prototype.mvDir = function (dir, newdir) {
            return this.createPromise(dir);
        };
        FilesystemService.prototype.getFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.saveFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.mvFile = function (file, newfile) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.rmFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.mkFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.createPromise = function (promise) {
            var defer = this.q.defer();
            //promise.success(public (promise) {
            defer.resolve(promise);
            //});
            return defer.promise;
        };
        FilesystemService.Factory = function () {
            var service = function ($http, $q) { return new FilesystemService($http, $q); };
            return service;
        };
        FilesystemService.$inject = ['$http', '$q'];
        return FilesystemService;
    })();
    Kernel.FilesystemService = FilesystemService;
})(Kernel || (Kernel = {}));
/// <reference path='services.d.ts' />
var Kernel;
(function (Kernel) {
    var DesktopService = (function () {
        function DesktopService(http, q, rootScope, window) {
            var _this = this;
            this.http = http;
            this.q = q;
            this.rootScope = rootScope;
            this.window = window;
            this.getDesktop = function (id) {
                _this.desktopID = id;
                var promise = _this.http.get(Routing.generate('get-desktop', { 'desktop_id': id }));
                return _this.handlePromise(promise);
            };
            this.changeBackground = function (file) {
                var formData = new FormData();
                formData.append('file', file);
                var promise = _this.http.post('/api/desktop/' + _this.desktopID + '/settings/upload-image', formData, {
                    'transformRequest': angular.identity,
                    'headers': { 'Content-Type': undefined }
                });
                promise.success(function (response) {
                    _this.rootScope.$broadcast('DesktopImageChanged', response.image);
                });
                return _this.handlePromise(promise);
            };
            this.desktopID = null;
        }
        DesktopService.prototype.saveGrid = function (id, grid) {
            var promise = this.http.put(Routing.generate('save-desktop-grid', { 'desktop_id': id }), grid);
            return this.handlePromise(promise);
        };
        DesktopService.prototype.saveSettings = function (desktopID, settings) {
            var promise = this.http.patch('/api/desktop/' + desktopID + '/settings', settings.getCss());
            return this.handlePromise(promise);
        };
        DesktopService.prototype.handlePromise = function (promise) {
            var defer = this.q.defer();
            promise.success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        };
        DesktopService.Factory = function () {
            var desktopService = function ($http, $q, $rootScope, $window) {
                if (angular.isDefined($window.superScope.desktopService) === false) {
                    $window.superScope.desktopService = new DesktopService($http, $q, $rootScope, $window); // singleton
                }
                return $window.superScope.desktopService;
            };
            return desktopService;
        };
        DesktopService.$inject = ['$http', '$q', '$rootScope', '$window'];
        return DesktopService;
    })();
    Kernel.DesktopService = DesktopService;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var ApplicationLauncher = (function () {
        function ApplicationLauncher(http, processManager, document, rootScope, resourceLoader, windowManager) {
            var _this = this;
            this.http = http;
            this.processManager = processManager;
            this.document = document;
            this.rootScope = rootScope;
            this.resourceLoader = resourceLoader;
            this.windowManager = windowManager;
            this.launchApplication = function (pack) {
                // Get app package
                var promise = _this.http.get(pack);
                // Handle response
                promise.success(_this.bootstrap);
            };
            this.bootstrap = function (response) {
                var windowBox = new Kernel.WindowBox(response.settings.top, response.settings.left, response.settings.width, response.settings.height);
                // Create application settings
                var appSettings = new Kernel.ApplicationWindowSettings(windowBox);
                // Create instance of System app
                var application = new Kernel.SystemApplication(response.module.name, appSettings, _this.processManager, _this.windowManager);
                // Compile application template
                var compiledTemplate = application.window = _this.compileTemplate(application);
                // Merge arrays with application files
                var files = response.stylesheet.concat(response.javascript);
                // Load module files
                var promise = _this.loadModule(response.folder, response.module, files);
                promise.then(function () {
                    // Add application to process manager
                    application.runProcess();
                    compiledTemplate.attr('id', 'application-' + application.pid);
                    // Bootstrap new angular module
                    var app = angular.bootstrap(compiledTemplate, [response.module.name]);
                    // Define application standard events
                    _this.defineWindowEvents(app.get('$rootScope'), application);
                    // Register window in window manager
                    var listItem = new Kernel.WindowListItem(application.pid, compiledTemplate, application, response);
                    _this.windowManager.addWindow(listItem);
                    // Make application active
                    _this.windowManager.setActive(application.pid);
                    _this.rootScope.$broadcast('WindowCreated', listItem);
                });
            };
            this.loadModule = function (folder, module, files) {
                // Extract files that need to load
                var basePath = 'http://desktop.dev/applications/system/' + folder + '/';
                var filesToLoad = [];
                for (var i = 0; i < files.length; i++) {
                    filesToLoad.push(basePath + files[i].file);
                }
                filesToLoad.push(basePath + module.file);
                // Load application files
                return _this.resourceLoader.load(filesToLoad);
            };
            this.compileTemplate = function (application) {
                var appContainer = angular.element(application.template);
                // Create new application container
                var container = angular.element('<div></div>');
                // Add attributes
                container.attr('ui-view', application.name);
                container.attr('class', application.name + '-main');
                container.addClass('application-window');
                container.css('height', application.settings.windowBox.height - 25 + 'px');
                container.css('z-index', '1010');
                container.css('position', 'relative');
                appContainer.append(container);
                // Append template to div#applications-layer
                _this.applicationLayer.append(appContainer);
                return appContainer;
            };
            this.defineWindowEvents = function ($rootScope, application) {
                // Define application close event
                $rootScope.close = application.closeProcess;
                // Define mouse events to move application
                $rootScope.onMouseDown = application.onMouseDown;
                _this.document.on('mousemove', function (event) {
                    application.onMouseMove(event);
                    application.onMouseMoveOnMe(event);
                });
                _this.document.on('mouseup', function (event) {
                    application.onMouseUp(event);
                    application.onMouseUpResize(event);
                });
                $rootScope.maximize = application.maximize;
                $rootScope.collapse = application.collapse;
                $rootScope.makeActive = application.makeActive;
                $rootScope.onMouseDownResize = application.onMouseDownResize;
                application.$scope = $rootScope;
                $rootScope.process = application;
            };
            // *************** EVENTS ***************
            this.onApplicationClosed = function (event, data) {
                // Find Window Process
                var windowProcess = _this.windowManager.getWindow(data.pid);
                if (windowProcess !== null) {
                    // Remove window if exist
                    windowProcess.template.remove();
                    // Destroy application scope
                    windowProcess.process.$scope.$destroy();
                    // Delete window from window list
                    _this.windowManager.removeWindow(data.pid);
                    // Broadcast event that window destroyed
                    _this.rootScope.$broadcast('WindowClosed', windowProcess);
                }
            };
            // Register events
            this.rootScope.$on('ProcessClosed', this.onApplicationClosed);
            this.applicationLayer = this.document.find('div#applications-layer');
        }
        ApplicationLauncher.Factory = function () {
            var factory = function ($http, processManagerService, $document, $rootScope, resourceLoaderService, windowManagerService) {
                return new ApplicationLauncher($http, processManagerService, $document, $rootScope, resourceLoaderService, windowManagerService);
            };
            return factory;
        };
        ApplicationLauncher.$inject = [
            '$http', 'processManagerService', '$document',
            '$rootScope', 'resourceLoaderService', 'windowManagerService'
        ];
        return ApplicationLauncher;
    })();
    Kernel.ApplicationLauncher = ApplicationLauncher;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var ResourceLoader = (function () {
        function ResourceLoader(document, q) {
            var _this = this;
            this.document = document;
            this.q = q;
            this.load = function (files) {
                var defer = _this.q.defer();
                if (files.length > 0) {
                    var file = files[files.length - 1];
                    var exploded = file.split('.');
                    var extension = exploded[exploded.length - 1];
                    var callback = function () {
                        files.pop();
                        var promise = _this.load(files);
                        promise.then(function () { defer.resolve(); });
                    };
                    if (extension === 'js') {
                        yepnope.injectJs(file, callback);
                    }
                    else if (extension === 'css') {
                        yepnope.injectCss(file, callback);
                    }
                }
                else {
                    defer.resolve();
                }
                return defer.promise;
            };
            this.unload = function (script) {
                angular.element('script[src="' + script + '"]').remove();
            };
            this.scriptsContainer = this.document.find('div#application-scripts');
        }
        ResourceLoader.Factory = function () {
            var factory = function ($document, $q) { return new ResourceLoader($document, $q); };
            return factory;
        };
        ResourceLoader.$inject = ['$document', '$q'];
        return ResourceLoader;
    })();
    Kernel.ResourceLoader = ResourceLoader;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var WindowManager = (function (_super) {
        __extends(WindowManager, _super);
        function WindowManager(document, rootScope, window) {
            var _this = this;
            _super.call(this);
            this.window = window;
            this.appendMagnifyArea = function (area) {
                _this.magnifyContainer.append(area);
            };
            this.checkPosition = function (process, mouseX, mouseY) {
                var magnification = null;
                if (_this.isLeft(mouseX) === true) {
                    magnification = 'left';
                }
                else if (_this.isRight(mouseX) === true) {
                    magnification = 'right';
                }
                else if (_this.isTop(mouseY) === true) {
                    magnification = 'top';
                }
                if (magnification !== null) {
                    if (magnification === 'left' || magnification === 'right') {
                        var width = _this.window.innerWidth / 2;
                        var height = _this.window.innerHeight;
                        process.createMagnifyRegion(width, height, magnification, true);
                    }
                    else {
                        var width = _this.window.innerWidth;
                        var height = _this.window.innerHeight;
                        process.createMagnifyRegion(width, height, magnification, false);
                    }
                }
                return magnification;
            };
            this.maximizeWindow = function (pid, top, left) {
                var window = _this.getWindow(pid);
                if (window === null) {
                    return;
                }
                if (window.process.maximized === true) {
                    window.process.maximized = false;
                    window.template.animate({
                        'height': window.process.settings.windowBox.height,
                        'width': window.process.settings.windowBox.width,
                        'top': window.process.settings.windowBox.top,
                        'left': window.process.settings.windowBox.left,
                    }, 550, function () {
                        window.process.onResize();
                    });
                    window.template.removeClass('maximized');
                }
                else {
                    window.process.maximized = true;
                    window.template.animate({
                        'width': _this.document.innerWidth(),
                        'height': _this.document.innerHeight(),
                        'top': 0,
                        'left': 0
                    }, 550, function () {
                        if (angular.isDefined(top) && angular.isDefined(left)) {
                            window.process.settings.windowBox.top = top;
                            window.process.settings.windowBox.left = left;
                        }
                        window.process.onResize();
                    });
                    window.template.addClass('maximized');
                }
            };
            this.getWindowDimensions = function () {
                return {
                    'width': _this.window.innerWidth,
                    'height': _this.window.innerHeight,
                };
            };
            this.isLeft = function (x) {
                return x < 4;
            };
            this.isRight = function (x) {
                return x > _this.window.innerWidth - 4;
            };
            this.isBottom = function (y) {
                return y > _this.window.innerHeight - 4;
            };
            this.isTop = function (y) {
                return y < 4;
            };
            this._document = document;
            this._rootScope = rootScope;
            this.magnifyContainer = document.find('#magnify-container');
        }
        WindowManager.prototype.setActive = function (pid) {
            var window = this.getWindow(pid);
            if (window !== null) {
                angular.forEach(this.windowList, function (item) {
                    if (item.process.active === true && item.pid !== pid) {
                        item.process.active = false;
                        item.template.css('z-index', '1001');
                        item.template.css('opacity', '0.9');
                    }
                    if (item.pid === pid) {
                        item.process.active = true;
                        item.template.css('z-index', '1010');
                        item.template.css('opacity', '1.0');
                    }
                });
            }
        };
        WindowManager.Factory = function () {
            var factory = function ($document, $rootScope, $window) {
                return new WindowManager($document, $rootScope, $window);
            };
            return factory;
        };
        Object.defineProperty(WindowManager.prototype, "document", {
            get: function () {
                return this._document;
            },
            set: function (value) {
                this._document = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowManager.prototype, "rootScope", {
            get: function () {
                return this._rootScope;
            },
            set: function (value) {
                this._rootScope = value;
            },
            enumerable: true,
            configurable: true
        });
        WindowManager.$inject = ['$document', '$rootScope', '$window'];
        return WindowManager;
    })(Kernel.WindowContainer);
    Kernel.WindowManager = WindowManager;
})(Kernel || (Kernel = {}));
/// <reference path='controllers.d.ts' />
var Kernel;
(function (Kernel) {
    var ApplicationController = (function () {
        function ApplicationController(scope, spinnerService) {
            this.scope = scope;
            this.spinnerService = spinnerService;
            // get current state of spinner
            this.spinner = this.spinnerService.getSpinner();
            // Register event listeners
            scope.$on('SpinnerActive', this.onSpinnerActive);
            scope.$on('SpinnerInactive', this.onSpinnerInactive);
        }
        ApplicationController.prototype.onSpinnerActive = function () {
            this.spinner = true;
        };
        ApplicationController.prototype.onSpinnerInactive = function () {
            this.spinner = false;
        };
        ApplicationController.$inject = ['$scope', 'spinnerService'];
        return ApplicationController;
    })();
    Kernel.ApplicationController = ApplicationController;
})(Kernel || (Kernel = {}));
/// <reference path='components.d.ts' />
var Kernel;
(function (Kernel) {
    var DesktopDirective = (function () {
        function DesktopDirective() {
            this.restrict = 'E';
            this.templateUrl = '/views/desktop.html';
            this.bindToController = { 'desktopId': '@' };
            this.scope = true;
            this.controller = 'DesktopDirectiveController';
            this.controllerAs = 'desktop';
        }
        DesktopDirective.Factory = function () {
            var directive = function () { return new DesktopDirective(); };
            return directive;
        };
        return DesktopDirective;
    })();
    Kernel.DesktopDirective = DesktopDirective;
    var DesktopDirectiveController = (function () {
        function DesktopDirectiveController(scope, window, document, fs, rootScope, http, desktopService, applicationLauncher, timeout) {
            var _this = this;
            this.scope = scope;
            this.window = window;
            this.document = document;
            this.fs = fs;
            this.rootScope = rootScope;
            this.http = http;
            this.desktopService = desktopService;
            this.applicationLauncher = applicationLauncher;
            this.timeout = timeout;
            this.launch = function (pack) {
                _this.applicationLauncher.launchApplication(pack);
            };
            // EVENTS
            this.DesktopImageChanged = function (event, data) {
                _this.scope.background.settings['background-image'] = 'url(\'' + data + '\')';
            };
            this.DesktopGridStateChanged = function (event, data) {
                _this.desktop.saveGrid(_this.scope.desktopId, _this.desktop.grid);
            };
            this.onKeyDown = function (event) {
                if (event.ctrlKey && event.shiftKey) {
                    switch (event.which) {
                        case 37:
                            alert('suck');
                            break;
                        case 39:
                            alert('suck');
                            break;
                    }
                }
            };
            this.onResize = function (event) {
                _this.timeout(function () {
                    _this.scope.background.settings.width = _this.window.innerWidth;
                    _this.scope.background.settings.height = _this.window.innerHeight;
                });
            };
            var promise = this.desktopService.getDesktop(this.scope.desktop.desktopId);
            promise.then(function (response) {
                if (response !== null) {
                    _this.desktop = new Kernel.Desktop(_this.window.innerWidth, _this.window.innerHeight, response);
                    _this.scope.background = _this.createBackground(response);
                    scope.background.settings.width = _this.window.innerWidth;
                    scope.background.settings.height = _this.window.innerHeight;
                    scope.package = '/applications/system/ProcessManager/process-manager.ae';
                }
            });
            // Register events
            this.rootScope.$on('DesktopImageChanged', this.DesktopImageChanged);
            this.scope.$on('DesktopGridStateChanged', this.DesktopGridStateChanged);
            var $window = angular.element(this.window);
            $window.on('keydown', this.onKeyDown);
            $window.on('resize', this.onResize);
        }
        DesktopDirectiveController.prototype.createBackground = function (response) {
            return { 'settings': this.desktop.settings.getCss() };
        };
        DesktopDirectiveController.$inject = [
            '$scope', '$window', '$document', 'filesystemService',
            '$rootScope', '$http', 'desktopService',
            'applicationLauncherService', '$timeout'
        ];
        return DesktopDirectiveController;
    })();
    Kernel.DesktopDirectiveController = DesktopDirectiveController;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopPanelDirective = (function () {
        function DesktopPanelDirective(window, document) {
            var _this = this;
            this.window = window;
            this.document = document;
            this.templateUrl = '/views/desktop.panel.html';
            this.scope = true;
            this.bindToController = { 'settings': '=settings' };
            this.restrict = "E";
            this.controller = 'DesktopPanelDirectiveController';
            this.controllerAs = 'panel';
            this.link = function ($scope, $element) {
                var window = _this.window;
                if (!$scope.settings) {
                    $scope.settings = {
                        'height': '30px',
                        'width': '100%',
                        'background-color': 'rgba(143, 195, 255, 0.6)',
                        'position': 'fixed',
                        'bottom': '0',
                        'left': '0'
                    };
                }
                $scope.menuPanel = $element.find('div.desktop-panel-menu');
                var panelBottom = parseInt($scope.settings.height.replace('px', '')) + 3;
                $scope.menuPanel.css('bottom', panelBottom + 'px');
                $scope.menuVisible = false;
                var resizePanelMenu = function () {
                    $scope.menuPanel.css('height', (window.innerHeight / 2) + 'px');
                    $scope.menuPanel.css('width', (window.innerWidth * 0.35) + 'px');
                };
                var $window = angular.element(_this.window);
                $window.on('resize', resizePanelMenu);
                resizePanelMenu();
            };
        }
        DesktopPanelDirective.Factory = function () {
            var directive = function ($window, $document) {
                return new DesktopPanelDirective($window, $document);
            };
            return directive;
        };
        DesktopPanelDirective.$inject = ['$window', '$document'];
        return DesktopPanelDirective;
    })();
    Kernel.DesktopPanelDirective = DesktopPanelDirective;
    var DesktopPanelDirectiveController = (function (_super) {
        __extends(DesktopPanelDirectiveController, _super);
        function DesktopPanelDirectiveController(rootScope, windowManager, scope, timeout) {
            var _this = this;
            _super.call(this);
            this.rootScope = rootScope;
            this.windowManager = windowManager;
            this.scope = scope;
            this.timeout = timeout;
            this.onWindowCreated = function (event, data) {
                _this.timeout(function () { _this.addWindow(_this.windowManager.getWindow(data.pid)); });
            };
            this.onWindowClosed = function (event, data) {
                _this.timeout(function () { _this.removeWindow(data.pid); });
            };
            this.rootScope.$on('WindowCreated', this.onWindowCreated);
            this.rootScope.$on('WindowClosed', this.onWindowClosed);
        }
        DesktopPanelDirectiveController.prototype.toggleWindow = function (app) {
            app.collapse();
        };
        DesktopPanelDirectiveController.$inject = ['$rootScope', 'windowManagerService', '$scope', '$timeout'];
        return DesktopPanelDirectiveController;
    })(Kernel.WindowContainer);
    Kernel.DesktopPanelDirectiveController = DesktopPanelDirectiveController;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopGridDirective = (function () {
        function DesktopGridDirective() {
            this.templateUrl = '/views/desktop.grid.directive.html';
            this.restrict = 'E';
            this.bindToController = { 'grid': '=grid' };
            this.scope = true;
            this.controller = 'DesktopGridDirectiveController';
            this.controllerAs = 'controller';
            this.link = function ($scope, $element) {
                $scope.selectionInProgress = false;
                $scope.selectionArea = new Kernel.DesktopGridSelection();
                $scope.DOM = $element.find('div.desktop-grid-selection');
                $scope.mouseDown = function (event) {
                    $scope.selectionArea.from = new Kernel.Point(event.clientX, event.clientY);
                    $scope.selectionInProgress = true;
                    $scope.DOM.css('display', 'block');
                };
                $scope.mouseMove = function (event) {
                    if (event.clientX < 0 || event.clientY < 0 || $scope.selectionInProgress === false) {
                        return;
                    }
                    var point = new Kernel.Point(event.clientX, event.clientY);
                    $scope.selectionArea.distance = $scope.selectionArea.from.distanceToPoint(point);
                    $scope.selectionArea.to = point;
                    if ($scope.selectionArea.from.x < $scope.selectionArea.to.x) {
                        $scope.DOM.css('left', $scope.selectionArea.from.x + 'px');
                    }
                    else {
                        $scope.DOM.css('left', $scope.selectionArea.to.x + 'px');
                    }
                    if ($scope.selectionArea.from.y < $scope.selectionArea.to.y) {
                        $scope.DOM.css('top', $scope.selectionArea.from.y + 'px');
                    }
                    else {
                        $scope.DOM.css('top', $scope.selectionArea.to.y + 'px');
                    }
                    $scope.DOM.css('width', $scope.selectionArea.distance.width + 'px');
                    $scope.DOM.css('height', $scope.selectionArea.distance.height + 'px');
                };
                $scope.mouseUp = function (event) {
                    $scope.DOM.css('width', '0px');
                    $scope.DOM.css('height', '0px');
                    $scope.DOM.css('display', 'none');
                    $scope.selectionInProgress = false;
                };
            };
        }
        DesktopGridDirective.Factory = function () {
            var factory = function () { return new DesktopGridDirective(); };
            return factory;
        };
        return DesktopGridDirective;
    })();
    Kernel.DesktopGridDirective = DesktopGridDirective;
    var DesktopGridDirectiveController = (function () {
        function DesktopGridDirectiveController(scope) {
            var _this = this;
            this.scope = scope;
            this.gridWatcher = function (newVal, oldVal) {
                _this.grid = newVal;
            };
            this.scope.$watch('grid', this.gridWatcher);
        }
        DesktopGridDirectiveController.$inject = ['$scope'];
        return DesktopGridDirectiveController;
    })();
    Kernel.DesktopGridDirectiveController = DesktopGridDirectiveController;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    angular.module('kernel', [
        'ngAnimate',
        'ngSanitize',
        'pascalprecht.translate',
        'com.2fdevs.videogular',
        'com.2fdevs.videogular.plugins.controls',
        'com.2fdevs.videogular.plugins.overlayplay',
        'com.2fdevs.videogular.plugins.poster',
        'com.2fdevs.videogular.plugins.buffering',
    ])
        .factory('$globalScope', globalScope)
        .factory('resourceLoaderService', Kernel.ResourceLoader.Factory())
        .factory('processManagerService', Kernel.ProcessManagerService.Factory())
        .factory('windowManagerService', Kernel.WindowManager.Factory())
        .factory('filesystemService', Kernel.FilesystemService.Factory())
        .factory('applicationLauncherService', Kernel.ApplicationLauncher.Factory())
        .factory('desktopService', Kernel.DesktopService.Factory())
        .factory('spinnerService', Kernel.SpinnerService.Factory())
        .controller('applicationController', Kernel.ApplicationController)
        .controller('DesktopDirectiveController', Kernel.DesktopDirectiveController)
        .controller('DesktopPanelDirectiveController', Kernel.DesktopPanelDirectiveController)
        .controller('DesktopGridDirectiveController', Kernel.DesktopGridDirectiveController)
        .directive('desktop', Kernel.DesktopDirective.Factory())
        .directive('desktopGrid', Kernel.DesktopGridDirective.Factory())
        .directive('desktopPanel', Kernel.DesktopPanelDirective.Factory())
        .run(run);
    globalScope.$inject = ['$window', '$rootScope'];
    function globalScope($window, $rootScope) {
        if (angular.isDefined($window.superScope) === false) {
            $window.superScope = $rootScope;
        }
        return $window.superScope;
    }
    run.$inject = ['$globalScope'];
    function run($globalScope) { }
})(Kernel || (Kernel = {}));
/// <reference path='typings/tsd.d.ts' />
/// <reference path='Declarations/declarations.d.ts' />
/// <reference path='Interfaces/interfaces.d.ts' />
/// <reference path='Models/models.d.ts' />
/// <reference path='Services/services.d.ts' />
/// <reference path='Controllers/controllers.d.ts' />
/// <reference path='Components/components.d.ts' />
/// <reference path="Kernel.ts" /> 
//# sourceMappingURL=Kernel.js.map