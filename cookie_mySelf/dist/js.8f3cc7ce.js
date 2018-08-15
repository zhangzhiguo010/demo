// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"..\\..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"..\\..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"..\\..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js"}],"src\\css\\sign.scss":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"..\\..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\css-loader.js"}],"src\\js\\sign_up.js":[function(require,module,exports) {
// 登录模块
!function () {
    var view = document.querySelector('.wrapper>.sign_up');
    var controller = {
        view: null,
        need: null,
        needText: null,
        hash: null,
        verifyResult: null,
        init: function init(view) {
            this.view = view;
            this.need = ['email', 'password'];
            this.needText = { 'email': '邮箱', 'password': '密码', 'confirmPassword': '确认密码' };
            this.hash = {};
            this.verifyResult = true;
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            var _this = this;

            this.showFloatFrame();
            this.view.querySelector('form').addEventListener('submit', function (e) {
                e.preventDefault();
                _this.clearData();
                _this.gatherData();
                _this.verifyData();
                _this.ajaxModule();
            }, false);
        },
        showFloatFrame: function showFloatFrame() {
            var signButtons = document.querySelectorAll('.signButton>div');
            signButtons.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    var targetName = e.currentTarget.getAttribute('name');
                    document.querySelector('.' + targetName).classList.add('active');
                    document.querySelector('.welcome').classList.add('active');
                }, false);
            });
        },
        clearData: function clearData() {
            this.verifyResult = true;
            this.view.querySelectorAll('[class=error]').forEach(function (value) {
                value.innerHTML = '';
            });
        },
        gatherData: function gatherData() {
            var _this2 = this;

            this.need.forEach(function (value) {
                _this2.hash[value] = _this2.view.querySelector('[id=' + value + ']').value;
            });
        },
        verifyData: function verifyData() {
            var _this3 = this;

            if (this.hash['email'].indexOf('@') === -1) {
                this.view.querySelector('[id=email]').nextElementSibling.innerHTML = '邮箱格式不对';
                this.view.querySelector('[id=email]').value = '';
                this.verifyResult = false;
            }
            this.need.forEach(function (value) {
                if (_this3.hash[value] === '') {
                    _this3.view.querySelector('[id=' + value + ']').nextElementSibling.innerHTML = '\u8BF7\u8F93\u5165' + _this3.needText[value];
                    _this3.verifyResult = false;
                }
            });
        },
        ajaxModule: function ajaxModule() {
            var _this4 = this;

            if (this.verifyResult) {
                window.ajax({ 'method': 'POST', 'path': '/sign_up', 'body': this.hash }).then(function (response) {
                    if (response === 'success') {
                        console.log('登录成功');
                    }
                }, function (object) {
                    object = JSON.parse(object);
                    switch (object.error.errorType) {
                        case 'passwordError':
                            _this4.view.querySelector('[id=password]').nextElementSibling.innerHTML = '密码错误';
                            _this4.view.querySelector('[id=password]').value = '';
                            break;
                        case 'emailUnregister':
                            _this4.view.querySelector('[id=email]').nextElementSibling.innerHTML = '邮箱未注册';
                            break;
                        default:
                            break;
                    }
                });
            }
        }
    };
    controller.init.call(controller, view);
}.call();
},{}],"src\\js\\sign_in.js":[function(require,module,exports) {
// 注册模块
!function () {
    var view = document.querySelector('.wrapper>.sign_in');
    var controller = {
        view: null,
        need: null,
        needText: null,
        hash: null,
        verifyResult: null,
        init: function init(view) {
            this.view = view;
            this.need = ['email', 'password', 'confirmPassword'];
            this.needText = { 'email': '邮箱', 'password': '密码', 'confirmPassword': '确认密码' };
            this.hash = {};
            this.verifyResult = true;
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            var _this = this;

            this.showFloatFrame();
            this.view.querySelector('form').addEventListener('submit', function (e) {
                e.preventDefault();
                var verifyResult = true;
                _this.clearData();
                _this.gatherData();
                _this.verifyData(verifyResult);
                _this.ajaxModule(verifyResult);
            }, false);
        },
        showFloatFrame: function showFloatFrame() {
            var signButtons = document.querySelectorAll('.signButton>div');
            signButtons.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    var targetName = e.currentTarget.getAttribute('name');
                    document.querySelector('.' + targetName).classList.add('active');
                    document.querySelector('.welcome').classList.add('active');
                }, false);
            });
        },
        clearData: function clearData() {
            this.verifyResult = true;
            this.view.querySelectorAll('span[class=error]').forEach(function (value) {
                value.innerHTML = '';
            });
        },
        gatherData: function gatherData() {
            var _this2 = this;

            this.need.forEach(function (value) {
                _this2.hash[value] = _this2.view.querySelector('[name=' + value + ']').value;
            });
        },
        verifyData: function verifyData() {
            var _this3 = this;

            if (this.hash['email'].indexOf('@') === -1) {
                this.view.querySelector('[name=email]').nextElementSibling.innerHTML = '\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E';
                this.view.querySelector('[name=email]').value = '';
                this.verifyResult = false;
            }
            if (this.hash['password'] !== this.hash['confirmPassword']) {
                this.view.querySelector('[name=confirmPassword]').nextElementSibling.innerHTML = '确认密码错误';
                this.verifyResult = false;
                this.view.querySelector('[name=confirmPassword]').value = '';
            }
            this.need.forEach(function (value) {
                if (_this3.hash[value] === '') {
                    _this3.view.querySelector('[name=' + value + ']').nextElementSibling.innerHTML = '\u8BF7\u8F93\u5165' + _this3.needText[value];
                    _this3.verifyResult = false;
                }
            });
            return this.verifyResult;
        },
        ajaxModule: function ajaxModule() {
            var _this4 = this;

            //hash = {email: "xx@", password: "00", confirmPassword: "00"}
            if (this.verifyResult === true) {
                window.ajax({ method: 'POST', path: '/sign_in', body: this.hash }).then(function (response) {
                    if (response === 'success') {
                        console.log('注册成功');
                    }
                }, function (response) {
                    response = JSON.parse(response);
                    if (response.error.errorType === 'emailRepeat') {
                        _this4.view.querySelector('[name=email]').nextElementSibling.innerHTML = '\u90AE\u7BB1\u5DF2\u88AB\u6CE8\u518C';
                    }
                });
            } else {
                console.log('验证失败');
            }
        }
    };
    controller.init.call(controller, view);
}.call();
},{}],"src\\js\\ajax.js":[function(require,module,exports) {
window.ajax = function (object) {
    var method = object.method,
        path = object.path,
        body = object.body;

    body = JSON.stringify(body);
    return new Promise(function (resolve, reject) {
        var XHR = new XMLHttpRequest();
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4) {
                if (XHR.status >= 200 && XHR.status < 300 || XHR.status === 304) {
                    resolve(XHR.responseText);
                } else if (XHR.status >= 400) {
                    reject(XHR.responseText);
                }
            }
        };
        XHR.open(method, path);
        XHR.send(body);
    });
};
},{}],"src\\js\\index.js":[function(require,module,exports) {
'use strict';

require('../css/sign.scss');

require('./sign_up');

require('./sign_in');

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ajax2.default;
},{"../css/sign.scss":"src\\css\\sign.scss","./sign_up":"src\\js\\sign_up.js","./sign_in":"src\\js\\sign_in.js","./ajax":"src\\js\\ajax.js"}],"..\\..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '8842' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","src\\js\\index.js"], null)
//# sourceMappingURL=/js.8f3cc7ce.map