import Vue from "vue";
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const isServer = Vue.prototype.$isServer;
const ieVersion = isServer ? 0 : Number(document.documentMode);
function isObject(obj) {
  return Object.prototype.toString.call(obj) == "[object Object]";
}
const camelCase = function (name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, "Moz$1");
};
/* istanbul ignore next */
export const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
export const getStyle =
  ieVersion < 9
    ? function (element, styleName) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === "float") {
          styleName = "styleFloat";
        }
        try {
          switch (styleName) {
            case "opacity":
              try {
                return element.filters.item("alpha").opacity / 100;
              } catch (e) {
                return 1.0;
              }
            default:
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null;
          }
        } catch (e) {
          return element.style[styleName];
        }
      }
    : function (element, styleName) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === "float") {
          styleName = "cssFloat";
        }
        try {
          var computed = document.defaultView.getComputedStyle(element, "");
          return element.style[styleName] || computed
            ? computed[styleName]
            : null;
        } catch (e) {
          return element.style[styleName];
        }
      };

/* istanbul ignore next */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === "opacity" && ieVersion < 9) {
      element.style.filter = isNaN(value)
        ? ""
        : "alpha(opacity=" + value * 100 + ")";
    } else {
      element.style[styleName] = value;
    }
  }
}

export const isScroll = (el, vertical) => {
  if (isServer) return;

  const determinedDirection = vertical !== null || vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, "overflow-y")
      : getStyle(el, "overflow-x")
    : getStyle(el, "overflow");

  return overflow.match(/(scroll|auto)/);
};

export function rafThrottle(fn) {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame((_) => {
      fn.apply(this, args);
      locked = false;
    });
  };
}


export const isFirefox = function() {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i);
};