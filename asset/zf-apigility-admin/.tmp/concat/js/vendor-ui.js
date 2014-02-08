(function (window, undefined) {
  var rootjQuery, readyList, core_strundefined = typeof undefined, location = window.location, document = window.document, docElem = document.documentElement, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = '2.0.3', core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
      return letter.toUpperCase();
    }, completed = function () {
      document.removeEventListener('DOMContentLoaded', completed, false);
      window.removeEventListener('load', completed, false);
      jQuery.ready();
    };
  jQuery.fn = jQuery.prototype = {
    jquery: core_version,
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
      var match, elem;
      if (!selector) {
        return this;
      }
      if (typeof selector === 'string') {
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
          match = [
            null,
            selector,
            null
          ];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    },
    selector: '',
    length: 0,
    toArray: function () {
      return core_slice.call(this);
    },
    get: function (num) {
      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
    },
    pushStack: function (elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args);
    },
    ready: function (fn) {
      jQuery.ready.promise().done(fn);
      return this;
    },
    slice: function () {
      return this.pushStack(core_slice.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (i) {
      var len = this.length, j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: core_push,
    sort: [].sort,
    splice: [].splice
  };
  jQuery.fn.init.prototype = jQuery.fn;
  jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {};
    }
    if (length === i) {
      target = this;
      --i;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: 'jQuery' + (core_version + Math.random()).replace(/\D/g, ''),
    noConflict: function (deep) {
      if (window.$ === jQuery) {
        window.$ = _$;
      }
      if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery;
      }
      return jQuery;
    },
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.trigger) {
        jQuery(document).trigger('ready').off('ready');
      }
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === 'function';
    },
    isArray: Array.isArray,
    isWindow: function (obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    type: function (obj) {
      if (obj == null) {
        return String(obj);
      }
      return typeof obj === 'object' || typeof obj === 'function' ? class2type[core_toString.call(obj)] || 'object' : typeof obj;
    },
    isPlainObject: function (obj) {
      if (jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    error: function (msg) {
      throw new Error(msg);
    },
    parseHTML: function (data, context, keepScripts) {
      if (!data || typeof data !== 'string') {
        return null;
      }
      if (typeof context === 'boolean') {
        keepScripts = context;
        context = false;
      }
      context = context || document;
      var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
      if (parsed) {
        return [context.createElement(parsed[1])];
      }
      parsed = jQuery.buildFragment([data], context, scripts);
      if (scripts) {
        jQuery(scripts).remove();
      }
      return jQuery.merge([], parsed.childNodes);
    },
    parseJSON: JSON.parse,
    parseXML: function (data) {
      var xml, tmp;
      if (!data || typeof data !== 'string') {
        return null;
      }
      try {
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, 'text/xml');
      } catch (e) {
        xml = undefined;
      }
      if (!xml || xml.getElementsByTagName('parsererror').length) {
        jQuery.error('Invalid XML: ' + data);
      }
      return xml;
    },
    noop: function () {
    },
    globalEval: function (code) {
      var script, indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf('use strict') === 1) {
          script = document.createElement('script');
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function (obj, callback, args) {
      var value, i = 0, length = obj.length, isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: function (text) {
      return text == null ? '' : core_trim.call(text);
    },
    makeArray: function (arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
        } else {
          core_push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : core_indexOf.call(arr, elem, i);
    },
    merge: function (first, second) {
      var l = second.length, i = first.length, j = 0;
      if (typeof l === 'number') {
        for (; j < l; j++) {
          first[i++] = second[j];
        }
      } else {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    grep: function (elems, callback, inv) {
      var retVal, ret = [], i = 0, length = elems.length;
      inv = !!inv;
      for (; i < length; i++) {
        retVal = !!callback(elems[i], i);
        if (inv !== retVal) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    map: function (elems, callback, arg) {
      var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      }
      return core_concat.apply([], ret);
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy;
      if (typeof context === 'string') {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = core_slice.call(arguments, 2);
      proxy = function () {
        return fn.apply(context || this, args.concat(core_slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    access: function (elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0, length = elems.length, bulk = key == null;
      if (jQuery.type(key) === 'object') {
        chainable = true;
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
        }
      } else if (value !== undefined) {
        chainable = true;
        if (!jQuery.isFunction(value)) {
          raw = true;
        }
        if (bulk) {
          if (raw) {
            fn.call(elems, value);
            fn = null;
          } else {
            bulk = fn;
            fn = function (elem, key, value) {
              return bulk.call(jQuery(elem), value);
            };
          }
        }
        if (fn) {
          for (; i < length; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    },
    now: Date.now,
    swap: function (elem, options, callback, args) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }
      ret = callback.apply(elem, args || []);
      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    }
  });
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === 'complete') {
        setTimeout(jQuery.ready);
      } else {
        document.addEventListener('DOMContentLoaded', completed, false);
        window.addEventListener('load', completed, false);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  });
  function isArraylike(obj) {
    var length = obj.length, type = jQuery.type(obj);
    if (jQuery.isWindow(obj)) {
      return false;
    }
    if (obj.nodeType === 1 && length) {
      return true;
    }
    return type === 'array' || type !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
  }
  rootjQuery = jQuery(document);
  (function (window, undefined) {
    var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = 'sizzle' + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), hasDuplicate = false, sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        return 0;
      }, strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function (elem) {
        var i = 0, len = this.length;
        for (; i < len; i++) {
          if (this[i] === elem) {
            return i;
          }
        }
        return -1;
      }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', whitespace = '[\\x20\\t\\r\\n\\f]', characterEncoding = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+', identifier = characterEncoding.replace('w', 'w#'), attributes = '\\[' + whitespace + '*(' + characterEncoding + ')' + whitespace + '*(?:([*^$|!~]?=)' + whitespace + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + identifier + ')|)|)' + whitespace + '*\\]', pseudos = ':(' + characterEncoding + ')(?:\\((([\'"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|' + attributes.replace(3, 8) + ')*)|.*)\\)|)', rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rsibling = new RegExp(whitespace + '*[+~]'), rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*)' + whitespace + '*\\]', 'g'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
        'ID': new RegExp('^#(' + characterEncoding + ')'),
        'CLASS': new RegExp('^\\.(' + characterEncoding + ')'),
        'TAG': new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
      }, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
        var high = '0x' + escaped - 65536;
        return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      };
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? function (target, els) {
          push_native.apply(target, slice.call(els));
        } : function (target, els) {
          var j = target.length, i = 0;
          while (target[j++] = els[i++]) {
          }
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
        setDocument(context);
      }
      context = context || document;
      results = results || [];
      if (!selector || typeof selector !== 'string') {
        return results;
      }
      if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
        return [];
      }
      if (documentIsHTML && !seed) {
        if (match = rquickExpr.exec(selector)) {
          if (m = match[1]) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;
          } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;
          if (nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
            groups = tokenize(selector);
            if (old = context.getAttribute('id')) {
              nid = old.replace(rescape, '\\$&');
            } else {
              context.setAttribute('id', nid);
            }
            nid = '[id=\'' + nid + '\'] ';
            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = rsibling.test(selector) && context.parentNode || context;
            newSelector = groups.join(',');
          }
          if (newSelector) {
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
            } finally {
              if (!old) {
                context.removeAttribute('id');
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, '$1'), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key += ' ') > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return cache[key] = value;
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement('div');
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split('|'), i = attrs.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    isXML = Sizzle.isXML = function (elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== 'HTML' : false;
    };
    support = Sizzle.support = {};
    setDocument = Sizzle.setDocument = function (node) {
      var doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = doc.documentElement;
      documentIsHTML = !isXML(doc);
      if (parent && parent.attachEvent && parent !== parent.top) {
        parent.attachEvent('onbeforeunload', function () {
          setDocument();
        });
      }
      support.attributes = assert(function (div) {
        div.className = 'i';
        return !div.getAttribute('className');
      });
      support.getElementsByTagName = assert(function (div) {
        div.appendChild(doc.createComment(''));
        return !div.getElementsByTagName('*').length;
      });
      support.getElementsByClassName = assert(function (div) {
        div.innerHTML = '<div class=\'a\'></div><div class=\'a i\'></div>';
        div.firstChild.className = 'i';
        return div.getElementsByClassName('i').length === 2;
      });
      support.getById = assert(function (div) {
        docElem.appendChild(div).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== strundefined && documentIsHTML) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : [];
          }
        };
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute('id') === attrId;
          };
        };
      } else {
        delete Expr.find['ID'];
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode('id');
            return node && node.value === attrId;
          };
        };
      }
      Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== strundefined) {
          return context.getElementsByTagName(tag);
        }
      } : function (tag, context) {
        var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
        if (tag === '*') {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if (support.qsa = rnative.test(doc.querySelectorAll)) {
        assert(function (div) {
          div.innerHTML = '<select><option selected=\'\'></option></select>';
          if (!div.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
          }
          if (!div.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
        });
        assert(function (div) {
          var input = doc.createElement('input');
          input.setAttribute('type', 'hidden');
          div.appendChild(input).setAttribute('t', '');
          if (div.querySelectorAll('[t^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
          }
          if (!div.querySelectorAll(':enabled').length) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          div.querySelectorAll('*,:x');
          rbuggyQSA.push(',.*:');
        });
      }
      if (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (div) {
          support.disconnectedMatch = matches.call(div, 'div');
          matches.call(div, '[s!=\'\']:x');
          rbuggyMatches.push('!=', pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
      contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = docElem.compareDocumentPosition ? function (a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
        if (compare) {
          if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
            if (a === doc || contains(preferredDoc, a)) {
              return -1;
            }
            if (b === doc || contains(preferredDoc, b)) {
              return 1;
            }
            return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
          }
          return compare & 4 ? -1 : 1;
        }
        return a.compareDocumentPosition ? -1 : 1;
      } : function (a, b) {
        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
        if (a === b) {
          hasDuplicate = true;
          return 0;
        } else if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return doc;
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, '=\'$1\']');
      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function (context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function (elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val;
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], j = 0, i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      return results;
    };
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        for (; node = elem[i]; i++) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === 'string') {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[4] || match[5] || '').replace(runescape, funescape);
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === 'nth') {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
            match[5] = +(match[7] + match[8] || match[3] === 'odd');
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var excess, unquoted = !match[5] && match[2];
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          if (match[3] && match[4] !== undefined) {
            match[2] = match[4];
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        'TAG': function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === '*' ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
          return first === 1 && last === 0 ? function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === 'only' && !start && 'nextSibling';
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [
                      dirruns,
                      nodeIndex,
                      diff
                    ];
                    break;
                  }
                }
              } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                diff = cache[1];
              } else {
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                    if (useCache) {
                      (node[expando] || (node[expando] = {}))[type] = [
                        dirruns,
                        diff
                      ];
                    }
                    if (node === elem) {
                      break;
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf.call(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        'not': markFunction(function (selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        'lang': markFunction(function (lang) {
          if (!ridentifier.test(lang || '')) {
            Sizzle.error('unsupported lang: ' + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        'target': function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        'root': function (elem) {
          return elem === docElem;
        },
        'focus': function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        'enabled': function (elem) {
          return elem.disabled === false;
        },
        'disabled': function (elem) {
          return elem.disabled === true;
        },
        'checked': function (elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        'empty': function (elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeName > '@' || elem.nodeType === 3 || elem.nodeType === 4) {
              return false;
            }
          }
          return true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'text': function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === elem.type);
        },
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
        submit: true,
        reset: true
      }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, ' ')
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }
    function toSelector(tokens) {
      var i = 0, len = tokens.length, selector = '';
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && dir === 'parentNode', doneName = done++;
      return combinator.first ? function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function (elem, context, xml) {
        var data, cache, outerCache, dirkey = dirruns + ' ' + doneName;
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                if ((data = cache[1]) === true || data === cachedruns) {
                  return data === true;
                }
              } else {
                cache = outerCache[dir] = [dirkey];
                cache[1] = matcher(elem, context, xml) || cachedruns;
                if (cache[1] === true) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var matcherCachedRuns = 0, bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, expandContext) {
          var elem, j, matcher, setMatched = [], matchedCount = 0, i = '0', unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext, elems = seed || byElement && Expr.find['TAG']('*', expandContext && context.parentNode || context), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1;
          if (outermost) {
            outermostContext = context !== document && context;
            cachedruns = matcherCachedRuns;
          }
          for (; (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                cachedruns = ++matcherCachedRuns;
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, group) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        while (i--) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    };
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function select(selector, context, results, seed) {
      var i, tokens, token, type, find, match = tokenize(selector);
      if (!seed) {
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
            context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
            if (!context) {
              return results;
            }
            selector = selector.slice(tokens.shift().value.length);
          }
          i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
          while (i--) {
            token = tokens[i];
            if (Expr.relative[type = token.type]) {
              break;
            }
            if (find = Expr.find[type]) {
              if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context)) {
                tokens.splice(i, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push.apply(results, seed);
                  return results;
                }
                break;
              }
            }
          }
        }
      }
      compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector));
      return results;
    }
    support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
    support.detectDuplicates = hasDuplicate;
    setDocument();
    support.sortDetached = assert(function (div1) {
      return div1.compareDocumentPosition(document.createElement('div')) & 1;
    });
    if (!assert(function (div) {
        div.innerHTML = '<a href=\'#\'></a>';
        return div.firstChild.getAttribute('href') === '#';
      })) {
      addHandle('type|href|height|width', function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function (div) {
        div.innerHTML = '<input/>';
        div.firstChild.setAttribute('value', '');
        return div.firstChild.getAttribute('value') === '';
      })) {
      addHandle('value', function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === 'input') {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function (div) {
        return div.getAttribute('disabled') == null;
      })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;
        if (!isXML) {
          return (val = elem.getAttributeNode(name)) && val.specified ? val.value : elem[name] === true ? name.toLowerCase() : null;
        }
      });
    }
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
  }(window));
  var optionsCache = {};
  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function (options) {
    options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      }, self = {
        add: function () {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg);
                if (type === 'function') {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && type !== 'string') {
                  add(arg);
                }
              });
            }(arguments));
            if (firing) {
              firingLength = list.length;
            } else if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
          return this;
        },
        remove: function () {
          if (list) {
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--;
                  }
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              }
            });
          }
          return this;
        },
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
        },
        empty: function () {
          list = [];
          firingLength = 0;
          return this;
        },
        disable: function () {
          list = stack = memory = undefined;
          return this;
        },
        disabled: function () {
          return !list;
        },
        lock: function () {
          stack = undefined;
          if (!memory) {
            self.disable();
          }
          return this;
        },
        locked: function () {
          return !stack;
        },
        fireWith: function (context, args) {
          if (list && (!fired || stack)) {
            args = args || [];
            args = [
              context,
              args.slice ? args.slice() : args
            ];
            if (firing) {
              stack.push(args);
            } else {
              fire(args);
            }
          }
          return this;
        },
        fire: function () {
          self.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!fired;
        }
      };
    return self;
  };
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          [
            'resolve',
            'done',
            jQuery.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            jQuery.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            jQuery.Callbacks('memory')
          ]
        ], state = 'pending', promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var action = tuple[0], fn = jQuery.isFunction(fns[i]) && fns[i];
                deferred[tuple[1]](function () {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && jQuery.isFunction(returned.promise)) {
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                  } else {
                    newDefer[action + 'With'](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                  }
                });
              });
              fns = null;
            }).promise();
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2], stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function () {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + 'With'](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + 'With'] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function (subordinate) {
      var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        }, progressValues, progressContexts, resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  jQuery.support = function (support) {
    var input = document.createElement('input'), fragment = document.createDocumentFragment(), div = document.createElement('div'), select = document.createElement('select'), opt = select.appendChild(document.createElement('option'));
    if (!input.type) {
      return support;
    }
    input.type = 'checkbox';
    support.checkOn = input.value !== '';
    support.optSelected = opt.selected;
    support.reliableMarginRight = true;
    support.boxSizingReliable = true;
    support.pixelPosition = false;
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement('input');
    input.value = 't';
    input.type = 'radio';
    support.radioValue = input.value === 't';
    input.setAttribute('checked', 't');
    input.setAttribute('name', 't');
    fragment.appendChild(input);
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    support.focusinBubbles = 'onfocusin' in window;
    div.style.backgroundClip = 'content-box';
    div.cloneNode(true).style.backgroundClip = '';
    support.clearCloneStyle = div.style.backgroundClip === 'content-box';
    jQuery(function () {
      var container, marginDiv, divReset = 'padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box', body = document.getElementsByTagName('body')[0];
      if (!body) {
        return;
      }
      container = document.createElement('div');
      container.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px';
      body.appendChild(container).appendChild(div);
      div.innerHTML = '';
      div.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%';
      jQuery.swap(body, body.style.zoom != null ? { zoom: 1 } : {}, function () {
        support.boxSizing = div.offsetWidth === 4;
      });
      if (window.getComputedStyle) {
        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== '1%';
        support.boxSizingReliable = (window.getComputedStyle(div, null) || { width: '4px' }).width === '4px';
        marginDiv = div.appendChild(document.createElement('div'));
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = '0';
        div.style.width = '1px';
        support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
      }
      body.removeChild(container);
    });
    return support;
  }({});
  var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
  function Data() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function () {
        return {};
      }
    });
    this.expando = jQuery.expando + Math.random();
  }
  Data.uid = 1;
  Data.accepts = function (owner) {
    return owner.nodeType ? owner.nodeType === 1 || owner.nodeType === 9 : true;
  };
  Data.prototype = {
    key: function (owner) {
      if (!Data.accepts(owner)) {
        return 0;
      }
      var descriptor = {}, unlock = owner[this.expando];
      if (!unlock) {
        unlock = Data.uid++;
        try {
          descriptor[this.expando] = { value: unlock };
          Object.defineProperties(owner, descriptor);
        } catch (e) {
          descriptor[this.expando] = unlock;
          jQuery.extend(owner, descriptor);
        }
      }
      if (!this.cache[unlock]) {
        this.cache[unlock] = {};
      }
      return unlock;
    },
    set: function (owner, data, value) {
      var prop, unlock = this.key(owner), cache = this.cache[unlock];
      if (typeof data === 'string') {
        cache[data] = value;
      } else {
        if (jQuery.isEmptyObject(cache)) {
          jQuery.extend(this.cache[unlock], data);
        } else {
          for (prop in data) {
            cache[prop] = data[prop];
          }
        }
      }
      return cache;
    },
    get: function (owner, key) {
      var cache = this.cache[this.key(owner)];
      return key === undefined ? cache : cache[key];
    },
    access: function (owner, key, value) {
      var stored;
      if (key === undefined || key && typeof key === 'string' && value === undefined) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function (owner, key) {
      var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
      if (key === undefined) {
        this.cache[unlock] = {};
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [
              key,
              camel
            ];
          } else {
            name = camel;
            name = name in cache ? [name] : name.match(core_rnotwhite) || [];
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
    },
    hasData: function (owner) {
      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
    },
    discard: function (owner) {
      if (owner[this.expando]) {
        delete this.cache[owner[this.expando]];
      }
    }
  };
  data_user = new Data();
  data_priv = new Data();
  jQuery.extend({
    acceptData: Data.accepts,
    hasData: function (elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem);
    },
    data: function (elem, name, data) {
      return data_user.access(elem, name, data);
    },
    removeData: function (elem, name) {
      data_user.remove(elem, name);
    },
    _data: function (elem, name, data) {
      return data_priv.access(elem, name, data);
    },
    _removeData: function (elem, name) {
      data_priv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var attrs, name, elem = this[0], i = 0, data = null;
      if (key === undefined) {
        if (this.length) {
          data = data_user.get(elem);
          if (elem.nodeType === 1 && !data_priv.get(elem, 'hasDataAttrs')) {
            attrs = elem.attributes;
            for (; i < attrs.length; i++) {
              name = attrs[i].name;
              if (name.indexOf('data-') === 0) {
                name = jQuery.camelCase(name.slice(5));
                dataAttr(elem, name, data[name]);
              }
            }
            data_priv.set(elem, 'hasDataAttrs', true);
          }
        }
        return data;
      }
      if (typeof key === 'object') {
        return this.each(function () {
          data_user.set(this, key);
        });
      }
      return jQuery.access(this, function (value) {
        var data, camelKey = jQuery.camelCase(key);
        if (elem && value === undefined) {
          data = data_user.get(elem, key);
          if (data !== undefined) {
            return data;
          }
          data = data_user.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        this.each(function () {
          var data = data_user.get(this, camelKey);
          data_user.set(this, camelKey, value);
          if (key.indexOf('-') !== -1 && data !== undefined) {
            data_user.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function (key) {
      return this.each(function () {
        data_user.remove(this, key);
      });
    }
  });
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === 'string') {
        try {
          data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : +data + '' === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
        } catch (e) {
        }
        data_user.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || 'fx') + 'queue';
        queue = data_priv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = data_priv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || 'fx';
      var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
          jQuery.dequeue(elem, type);
        };
      if (fn === 'inprogress') {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === 'fx') {
          queue.unshift('inprogress');
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + 'queueHooks';
      return data_priv.get(elem, key) || data_priv.access(elem, key, {
        empty: jQuery.Callbacks('once memory').add(function () {
          data_priv.remove(elem, [
            type + 'queue',
            key
          ]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== 'string') {
        data = type;
        type = 'fx';
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === 'fx' && queue[0] !== 'inprogress') {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    delay: function (time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || 'fx';
      return this.queue(type, function (next, hooks) {
        var timeout = setTimeout(next, time);
        hooks.stop = function () {
          clearTimeout(timeout);
        };
      });
    },
    clearQueue: function (type) {
      return this.queue(type || 'fx', []);
    },
    promise: function (type, obj) {
      var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== 'string') {
        obj = type;
        type = undefined;
      }
      type = type || 'fx';
      while (i--) {
        tmp = data_priv.get(elements[i], type + 'queueHooks');
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var nodeHook, boolHook, rclass = /[\t\r\n\f]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button)$/i;
  jQuery.fn.extend({
    attr: function (name, value) {
      return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    },
    prop: function (name, value) {
      return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    },
    addClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = typeof value === 'string' && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || '').match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : ' ');
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              if (cur.indexOf(' ' + clazz + ' ') < 0) {
                cur += clazz + ' ';
              }
            }
            elem.className = jQuery.trim(cur);
          }
        }
      }
      return this;
    },
    removeClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = arguments.length === 0 || typeof value === 'string' && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || '').match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : '');
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              while (cur.indexOf(' ' + clazz + ' ') >= 0) {
                cur = cur.replace(' ' + clazz + ' ', ' ');
              }
            }
            elem.className = value ? jQuery.trim(cur) : '';
          }
        }
      }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === 'boolean' && type === 'string') {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
        });
      }
      return this.each(function () {
        if (type === 'string') {
          var className, i = 0, self = jQuery(this), classNames = value.match(core_rnotwhite) || [];
          while (className = classNames[i++]) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (type === core_strundefined || type === 'boolean') {
          if (this.className) {
            data_priv.set(this, '__className__', this.className);
          }
          this.className = this.className || value === false ? '' : data_priv.get(this, '__className__') || '';
        }
      });
    },
    hasClass: function (selector) {
      var className = ' ' + selector + ' ', i = 0, l = this.length;
      for (; i < l; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
    },
    val: function (value) {
      var hooks, ret, isFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === 'string' ? ret.replace(rreturn, '') : ret == null ? '' : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = '';
        } else if (typeof val === 'number') {
          val += '';
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? '' : value + '';
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select: {
        get: function (elem) {
          var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function (elem, value) {
          var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    },
    attr: function (elem, name, value) {
      var hooks, ret, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === core_strundefined) {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
        } else if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          elem.setAttribute(name, value + '');
          return value;
        }
      } else if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      } else {
        ret = jQuery.find.attr(elem, name);
        return ret == null ? undefined : ret;
      }
    },
    removeAttr: function (elem, value) {
      var name, propName, i = 0, attrNames = value && value.match(core_rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (!jQuery.support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
            var val = elem.value;
            elem.setAttribute('type', value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    },
    propFix: {
      'for': 'htmlFor',
      'class': 'className'
    },
    prop: function (elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        return hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
      } else {
        return hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
      }
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          return elem.hasAttribute('tabindex') || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
        }
      }
    }
  });
  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
    jQuery.expr.attrHandle[name] = function (elem, name, isXML) {
      var fn = jQuery.expr.attrHandle[name], ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
      jQuery.expr.attrHandle[name] = fn;
      return ret;
    };
  });
  if (!jQuery.support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }
    };
  }
  jQuery.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  jQuery.each([
    'radio',
    'checkbox'
  ], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
        }
      }
    };
    if (!jQuery.support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value;
      };
    }
  });
  var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {
    }
  }
  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
        };
        eventHandle.elem = elem;
      }
      types = (types || '').match(core_rnotwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join('.')
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
      elem = null;
    },
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || '').match(core_rnotwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        data_priv.remove(elem, 'events');
      }
    },
    trigger: function (event, data, elem, onlyHandlers) {
      var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = core_hasOwn.call(event, 'type') ? event.type : event, namespaces = core_hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf('.') >= 0) {
        namespaces = type.split('.');
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(':') < 0 && 'on' + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === 'object' && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join('.');
      event.namespace_re = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (data_priv.get(cur, 'events') || {})[event.type] && data_priv.get(cur, 'handle');
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
          event.preventDefault();
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event);
      var i, j, ret, matched, handleObj, handlerQueue = [], args = core_slice.call(arguments), handlers = (data_priv.get(this, 'events') || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function (event, handlers) {
      var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || event.type !== 'click')) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || event.type !== 'click') {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + ' ';
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (event, original) {
        var eventDoc, doc, body, button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: { noBubble: true },
      focus: {
        trigger: function () {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function () {
          if (this.type === 'checkbox' && this.click && jQuery.nodeName(this, 'input')) {
            this.click();
            return false;
          }
        },
        _default: function (event) {
          return jQuery.nodeName(event.target, 'a');
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          if (event.result !== undefined) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: true,
          originalEvent: {}
        });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.removeEvent = function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  };
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  if (!jQuery.support.focusinBubbles) {
    jQuery.each({
      focus: 'focusin',
      blur: 'focusout'
    }, function (orig, fix) {
      var attaches = 0, handler = function (event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
        };
      jQuery.event.special[fix] = {
        setup: function () {
          if (attaches++ === 0) {
            document.addEventListener(orig, handler, true);
          }
        },
        teardown: function () {
          if (--attaches === 0) {
            document.removeEventListener(orig, handler, true);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var origFn, type;
      if (typeof types === 'object') {
        if (typeof selector !== 'string') {
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === 'string') {
          fn = data;
          data = undefined;
        } else {
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function (event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function () {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === 'object') {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === 'function') {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  var isSimple = /^.[^:#\[\.,]*$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    find: function (selector) {
      var i, ret = [], self = this, len = self.length;
      if (typeof selector !== 'string') {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + ' ' + selector : selector;
      return ret;
    },
    has: function (target) {
      var targets = jQuery(target, this), l = targets.length;
      return this.filter(function () {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    is: function (selector) {
      return !!winnow(this, typeof selector === 'string' && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    },
    closest: function (selectors, context) {
      var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            cur = matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
    },
    index: function (elem) {
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }
      if (typeof elem === 'string') {
        return core_indexOf.call(jQuery(elem), this[0]);
      }
      return core_indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function (selector, context) {
      var set = typeof selector === 'string' ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
      return this.pushStack(jQuery.unique(all));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {
    }
    return cur;
  }
  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return jQuery.dir(elem, 'parentNode');
    },
    parentsUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'parentNode', until);
    },
    next: function (elem) {
      return sibling(elem, 'nextSibling');
    },
    prev: function (elem) {
      return sibling(elem, 'previousSibling');
    },
    nextAll: function (elem) {
      return jQuery.dir(elem, 'nextSibling');
    },
    prevAll: function (elem) {
      return jQuery.dir(elem, 'previousSibling');
    },
    nextUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'nextSibling', until);
    },
    prevUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'previousSibling', until);
    },
    siblings: function (elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents: function (elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== 'Until') {
        selector = until;
      }
      if (selector && typeof selector === 'string') {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.unique(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  jQuery.extend({
    filter: function (expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ':not(' + expr + ')';
      }
      return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
        return elem.nodeType === 1;
      }));
    },
    dir: function (elem, dir, until) {
      var matched = [], truncate = until !== undefined;
      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    },
    sibling: function (n, elem) {
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    }
  });
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    }
    if (typeof qualifier === 'string') {
      if (isSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function (elem) {
      return core_indexOf.call(qualifier, elem) >= 0 !== not;
    });
  }
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      col: [
        2,
        '<table><colgroup>',
        '</colgroup></table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  jQuery.fn.extend({
    text: function (value) {
      return jQuery.access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
      }, null, value, arguments.length);
    },
    append: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove: function (selector, keepData) {
      var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
      for (; (elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, 'script'));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty: function () {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = '';
        }
      }
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return jQuery.access(this, function (value) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === 'string' && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [
            '',
            ''
          ])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, '<$1></$2>');
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function () {
      var args = jQuery.map(this, function (elem) {
          return [
            elem.nextSibling,
            elem.parentNode
          ];
        }), i = 0;
      this.domManip(arguments, function (elem) {
        var next = args[i++], parent = args[i++];
        if (parent) {
          if (next && next.parentNode !== parent) {
            next = this.nextSibling;
          }
          jQuery(this).remove();
          parent.insertBefore(elem, next);
        }
      }, true);
      return i ? this : this.remove();
    },
    detach: function (selector) {
      return this.remove(selector, true);
    },
    domManip: function (args, callback, allowIntersection) {
      args = core_concat.apply([], args);
      var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
      if (isFunction || !(l <= 1 || typeof value !== 'string' || jQuery.support.checkClone || !rchecked.test(value))) {
        return this.each(function (index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          self.domManip(args, callback, allowIntersection);
        });
      }
      if (l) {
        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, !allowIntersection && this);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
          hasScripts = scripts.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, 'script'));
              }
            }
            callback.call(this[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery.map(scripts, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || '') && !data_priv.access(node, 'globalEval') && jQuery.contains(doc, node)) {
                if (node.src) {
                  jQuery._evalUrl(node.src);
                } else {
                  jQuery.globalEval(node.textContent.replace(rcleanScript, ''));
                }
              }
            }
          }
        }
      }
      return this;
    }
  });
  jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        core_push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!jQuery.support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, 'script');
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
      }
      return clone;
    },
    buildFragment: function (elems, context, scripts, selection) {
      var elem, tmp, tag, wrap, contains, j, i = 0, l = elems.length, fragment = context.createDocumentFragment(), nodes = [];
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (jQuery.type(elem) === 'object') {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement('div'));
            tag = (rtagName.exec(elem) || [
              '',
              ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, '<$1></$2>') + wrap[2];
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            jQuery.merge(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = '';
          }
        }
      }
      fragment.textContent = '';
      i = 0;
      while (elem = nodes[i++]) {
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue;
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        tmp = getAll(fragment.appendChild(elem), 'script');
        if (contains) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || '')) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    },
    cleanData: function (elems) {
      var data, elem, events, type, key, j, special = jQuery.event.special, i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (Data.accepts(elem)) {
          key = elem[data_priv.expando];
          if (key && (data = data_priv.cache[key])) {
            events = Object.keys(data.events || {});
            if (events.length) {
              for (j = 0; (type = events[j]) !== undefined; j++) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (data_priv.cache[key]) {
              delete data_priv.cache[key];
            }
          }
        }
        delete data_user.cache[elem[data_user.expando]];
      }
    },
    _evalUrl: function (url) {
      return jQuery.ajax({
        url: url,
        type: 'GET',
        dataType: 'script',
        async: false,
        global: false,
        'throws': true
      });
    }
  });
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, 'table') && jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, 'tr') ? elem.getElementsByTagName('tbody')[0] || elem.appendChild(elem.ownerDocument.createElement('tbody')) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute('type');
    }
    return elem;
  }
  function setGlobalEval(elems, refElements) {
    var l = elems.length, i = 0;
    for (; i < l; i++) {
      data_priv.set(elems[i], 'globalEval', !refElements || data_priv.get(refElements[i], 'globalEval'));
    }
  }
  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (data_priv.hasData(src)) {
      pdataOld = data_priv.access(src);
      pdataCur = data_priv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (data_user.hasData(src)) {
      udataOld = data_user.access(src);
      udataCur = jQuery.extend({}, udataOld);
      data_user.set(dest, udataCur);
    }
  }
  function getAll(context, tag) {
    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || '*') : context.querySelectorAll ? context.querySelectorAll(tag || '*') : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === 'input' && manipulation_rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === 'input' || nodeName === 'textarea') {
      dest.defaultValue = src.defaultValue;
    }
  }
  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this), contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        if (!jQuery.nodeName(this, 'body')) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i'), rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i'), rrelNum = new RegExp('^([+-])=(' + core_pnum + ')', 'i'), elemdisplay = { BODY: 'block' }, cssShow = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, cssNormalTransform = {
      letterSpacing: 0,
      fontWeight: 400
    }, cssExpand = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], cssPrefixes = [
      'Webkit',
      'O',
      'Moz',
      'ms'
    ];
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function isHidden(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
  }
  function getStyles(elem) {
    return window.getComputedStyle(elem, null);
  }
  function showHide(elements, show) {
    var display, elem, hidden, values = [], index = 0, length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = data_priv.get(elem, 'olddisplay');
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === 'none') {
          elem.style.display = '';
        }
        if (elem.style.display === '' && isHidden(elem)) {
          values[index] = data_priv.access(elem, 'olddisplay', css_defaultDisplay(elem.nodeName));
        }
      } else {
        if (!values[index]) {
          hidden = isHidden(elem);
          if (display && display !== 'none' || !hidden) {
            data_priv.set(elem, 'olddisplay', hidden ? display : jQuery.css(elem, 'display'));
          }
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === 'none' || elem.style.display === '') {
        elem.style.display = show ? values[index] || '' : 'none';
      }
    }
    return elements;
  }
  jQuery.fn.extend({
    css: function (name, value) {
      return jQuery.access(this, function (elem, name, value) {
        var styles, len, map = {}, i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state) {
      if (typeof state === 'boolean') {
        return state ? this.show() : this.hide();
      }
      return this.each(function () {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, 'opacity');
            return ret === '' ? '1' : ret;
          }
        }
      }
    },
    cssNumber: {
      'columnCount': true,
      'fillOpacity': true,
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'order': true,
      'orphans': true,
      'widows': true,
      'zIndex': true,
      'zoom': true
    },
    cssProps: { 'float': 'cssFloat' },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === 'string' && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = 'number';
        }
        if (value == null || type === 'number' && isNaN(value)) {
          return;
        }
        if (type === 'number' && !jQuery.cssNumber[origName]) {
          value += 'px';
        }
        if (!jQuery.support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
          style[name] = 'inherit';
        }
        if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function (elem, name, extra, styles) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === '' || extra) {
        num = parseFloat(val);
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    }
  });
  curCSS = function (elem, name, _computed) {
    var width, minWidth, maxWidth, computed = _computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined, style = elem.style;
    if (computed) {
      if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      if (rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret;
  };
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : name === 'width' ? 1 : 0, val = 0;
    for (; i < 4; i += 2) {
      if (extra === 'margin') {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === 'content') {
          val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
        }
        if (extra !== 'margin') {
          val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
        }
      } else {
        val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
        if (extra !== 'padding') {
          val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true, val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles) + 'px';
  }
  function css_defaultDisplay(nodeName) {
    var doc = document, display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === 'none' || !display) {
        iframe = (iframe || jQuery('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>').css('cssText', 'display:block !important')).appendTo(doc.documentElement);
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
        doc.write('<!doctype html><html><body>');
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], 'display');
    elem.remove();
    return display;
  }
  jQuery.each([
    'height',
    'width'
  ], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, 'display')) ? jQuery.swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function (elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles) : 0);
      }
    };
  });
  jQuery(function () {
    if (!jQuery.support.reliableMarginRight) {
      jQuery.cssHooks.marginRight = {
        get: function (elem, computed) {
          if (computed) {
            return jQuery.swap(elem, { 'display': 'inline-block' }, curCSS, [
              elem,
              'marginRight'
            ]);
          }
        }
      };
    }
    if (!jQuery.support.pixelPosition && jQuery.fn.position) {
      jQuery.each([
        'top',
        'left'
      ], function (i, prop) {
        jQuery.cssHooks[prop] = {
          get: function (elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + 'px' : computed;
            }
          }
        };
      });
    }
  });
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.hidden = function (elem) {
      return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function (elem) {
      return !jQuery.expr.filters.hidden(elem);
    };
  }
  jQuery.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0, expanded = {}, parts = typeof value === 'string' ? value.split(' ') : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var elements = jQuery.prop(this, 'elements');
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type;
        return this.name && !jQuery(this).is(':disabled') && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, '\r\n')
        };
      }).get();
    }
  });
  jQuery.param = function (a, traditional) {
    var prefix, s = [], add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join('&').replace(r20, '+');
  };
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === 'object') {
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
    }
  });
  var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = '*/'.concat('*');
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement('a');
    ajaxLocation.href = '';
    ajaxLocation = ajaxLocation.href;
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression;
        dataTypeExpression = '*';
      }
      var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while (dataType = dataTypes[i++]) {
          if (dataType[0] === '+') {
            dataType = dataType.slice(1) || '*';
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {}, seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === 'string' && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
  }
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== 'string' && _load) {
      return _load.apply(this, arguments);
    }
    var selector, type, response, self = this, off = url.indexOf(' ');
    if (off >= 0) {
      selector = url.slice(off);
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === 'object') {
      type = 'POST';
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type,
        dataType: 'html',
        data: params
      }).done(function (responseText) {
        response = arguments;
        self.html(selector ? jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).complete(callback && function (jqXHR, status) {
        self.each(callback, response || [
          jqXHR.responseText,
          status,
          jqXHR
        ]);
      });
    }
    return this;
  };
  jQuery.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'
  ], function (i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: 'GET',
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },
      converters: {
        '* text': String,
        'text html': true,
        'text json': jQuery.parseJSON,
        'text xml': jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function (target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === 'object') {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = 'canceled', jqXHR = {
          readyState: 0,
          getResponseHeader: function (key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match == null ? null : match;
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null;
          },
          setRequestHeader: function (name, value) {
            var lname = name.toLowerCase();
            if (!state) {
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          statusCode: function (map) {
            var code;
            if (map) {
              if (state < 2) {
                for (code in map) {
                  statusCode[code] = [
                    statusCode[code],
                    map[code]
                  ];
                }
              } else {
                jqXHR.always(map[jqXHR.status]);
              }
            }
            return this;
          },
          abort: function (statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || ajaxLocation) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().match(core_rnotwhite) || [''];
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? '80' : '443')) !== (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? '80' : '443'))));
      }
      if (s.data && s.processData && typeof s.data !== 'string') {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger('ajaxStart');
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = s.url += (ajax_rquery.test(cacheURL) ? '&' : '?') + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, '$1_=' + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? '&' : '?') + '_=' + ajax_nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader('Content-Type', s.contentType);
      }
      jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = 'abort';
      for (i in {
          success: 1,
          error: 1,
          complete: 1
        }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, 'No Transport');
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger('ajaxSend', [
            jqXHR,
            s
          ]);
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            jqXHR.abort('timeout');
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || '';
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader('Last-Modified');
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader('etag');
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === 'HEAD') {
            statusText = 'nocontent';
          } else if (status === 304) {
            statusText = 'notmodified';
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = 'error';
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + '';
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [
            success,
            statusText,
            jqXHR
          ]);
        } else {
          deferred.rejectWith(callbackContext, [
            jqXHR,
            statusText,
            error
          ]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
            jqXHR,
            s,
            isSuccess ? success : error
          ]);
        }
        completeDeferred.fireWith(callbackContext, [
          jqXHR,
          statusText
        ]);
        if (fireGlobals) {
          globalEventContext.trigger('ajaxComplete', [
            jqXHR,
            s
          ]);
          if (!--jQuery.active) {
            jQuery.event.trigger('ajaxStop');
          }
        }
      }
      return jqXHR;
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, 'json');
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, 'script');
    }
  });
  jQuery.each([
    'get',
    'post'
  ], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
    while (dataTypes[0] === '*') {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === '*') {
          current = prev;
        } else if (prev !== '*' && prev !== current) {
          conv = converters[prev + ' ' + current] || converters['* ' + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(' ');
              if (tmp[1] === current) {
                conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s['throws']) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: 'success',
      data: response
    };
  }
  jQuery.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });
  jQuery.ajaxPrefilter('script', function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = 'GET';
    }
  });
  jQuery.ajaxTransport('script', function (s) {
    if (s.crossDomain) {
      var script, callback;
      return {
        send: function (_, complete) {
          script = jQuery('<script>').prop({
            async: true,
            charset: s.scriptCharset,
            src: s.url
          }).on('load error', callback = function (evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === 'error' ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + '_' + ajax_nonce++;
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? 'url' : typeof s.data === 'string' && !(s.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp.test(s.data) && 'data');
    if (jsonProp || s.dataTypes[0] === 'jsonp') {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (ajax_rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
      }
      s.converters['script json'] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + ' was not called');
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = 'json';
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments;
      };
      jqXHR.always(function () {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return 'script';
    }
  });
  jQuery.ajaxSettings.xhr = function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {
    }
  };
  var xhrSupported = jQuery.ajaxSettings.xhr(), xhrSuccessStatus = {
      0: 200,
      1223: 204
    }, xhrId = 0, xhrCallbacks = {};
  if (window.ActiveXObject) {
    jQuery(window).on('unload', function () {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key]();
      }
      xhrCallbacks = undefined;
    });
  }
  jQuery.support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
  jQuery.support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var callback;
    if (jQuery.support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function (headers, complete) {
          var i, id, xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function (type) {
            return function () {
              if (callback) {
                delete xhrCallbacks[id];
                callback = xhr.onload = xhr.onerror = null;
                if (type === 'abort') {
                  xhr.abort();
                } else if (type === 'error') {
                  complete(xhr.status || 404, xhr.statusText);
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === 'string' ? { text: xhr.responseText } : undefined, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          xhr.onerror = callback('error');
          callback = xhrCallbacks[id = xhrId++] = callback('abort');
          xhr.send(options.hasContent && options.data || null);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp('^(?:([+-])=|)(' + core_pnum + ')([a-z%]*)$', 'i'), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
      '*': [function (prop, value) {
          var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? '' : 'px'), start = (jQuery.cssNumber[prop] || unit !== 'px' && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
          if (start && start[3] !== unit) {
            unit = unit || start[3];
            parts = parts || [];
            start = +target || 1;
            do {
              scale = scale || '.5';
              start = start / scale;
              jQuery.style(tween.elem, prop, start + unit);
            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
          }
          if (parts) {
            start = tween.start = +start || +target || 0;
            tween.unit = unit;
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
          }
          return tween;
        }]
    };
  function createFxNow() {
    setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = jQuery.now();
  }
  function createTween(value, prop, animation) {
    var tween, collection = (tweeners[prop] || []).concat(tweeners['*']), index = 0, length = collection.length;
    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        return tween;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
        delete tick.elem;
      }), tick = function () {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [
          animation,
          percent,
          remaining
        ]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, { specialEasing: {} }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function (gotoEnd) {
          var index = 0, length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [
              animation,
              gotoEnd
            ]);
          } else {
            deferred.rejectWith(elem, [
              animation,
              gotoEnd
            ]);
          }
          return this;
        }
      }), props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && 'expand' in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ['*'];
      } else {
        props = props.split(' ');
      }
      var prop, index = 0, length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function (callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, tween, hooks, oldfire, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, 'fxshow');
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx');
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
      opts.overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ];
      if (jQuery.css(elem, 'display') === 'inline' && jQuery.css(elem, 'float') === 'none') {
        style.display = 'inline-block';
      }
    }
    if (opts.overflow) {
      style.overflow = 'hidden';
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === 'toggle';
        if (value === (hidden ? 'hide' : 'show')) {
          if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ('hidden' in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = data_priv.access(elem, 'fxshow', {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function () {
          jQuery(elem).hide();
        });
      }
      anim.done(function () {
        var prop;
        data_priv.remove(elem, 'fxshow');
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === 'width' || prop === 'height' ? 1 : 0;
          }
        }
      }
    }
  }
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || 'swing';
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, '');
        return !result || result === 'auto' ? 0 : result;
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.each([
    'toggle',
    'show',
    'hide'
  ], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean' ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || data_priv.get(this, 'finish')) {
            anim.stop(true);
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== 'string') {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || 'fx', []);
      }
      return this.each(function () {
        var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = data_priv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function (type) {
      if (type !== false) {
        type = type || 'fx';
      }
      return this.each(function () {
        var index, data = data_priv.get(this), queue = data[type + 'queue'], hooks = data[type + 'queueHooks'], timers = jQuery.timers, length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  function genFx(type, includeWidth) {
    var which, attrs = { height: type }, i = 0;
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs['margin' + which] = attrs['padding' + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  jQuery.each({
    slideDown: genFx('show'),
    slideUp: genFx('hide'),
    slideToggle: genFx('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
      };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = 'fx';
    }
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.timers = [];
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.tick = function () {
    var timer, timers = jQuery.timers, i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    if (timer() && jQuery.timers.push(timer)) {
      jQuery.fx.start();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function () {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fx.step = {};
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.animated = function (elem) {
      return jQuery.grep(jQuery.timers, function (fn) {
        return elem === fn.elem;
      }).length;
    };
  }
  jQuery.fn.offset = function (options) {
    if (arguments.length) {
      return options === undefined ? this : this.each(function (i) {
        jQuery.offset.setOffset(this, options, i);
      });
    }
    var docElem, win, elem = this[0], box = {
        top: 0,
        left: 0
      }, doc = elem && elem.ownerDocument;
    if (!doc) {
      return;
    }
    docElem = doc.documentElement;
    if (!jQuery.contains(docElem, elem)) {
      return box;
    }
    if (typeof elem.getBoundingClientRect !== core_strundefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  };
  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, 'position'), curElem = jQuery(elem), props = {};
      if (position === 'static') {
        elem.style.position = 'relative';
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, 'top');
      curCSSLeft = jQuery.css(elem, 'left');
      calculatePosition = (position === 'absolute' || position === 'fixed') && (curCSSTop + curCSSLeft).indexOf('auto') > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ('using' in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    position: function () {
      if (!this[0]) {
        return;
      }
      var offsetParent, offset, elem = this[0], parentOffset = {
          top: 0,
          left: 0
        };
      if (jQuery.css(elem, 'position') === 'fixed') {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], 'html')) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true);
        parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
        left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
      };
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent || docElem;
        while (offsetParent && (!jQuery.nodeName(offsetParent, 'html') && jQuery.css(offsetParent, 'position') === 'static')) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (method, prop) {
    var top = 'pageYOffset' === prop;
    jQuery.fn[method] = function (val) {
      return jQuery.access(this, function (elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.each({
    Height: 'height',
    Width: 'width'
  }, function (name, type) {
    jQuery.each({
      padding: 'inner' + name,
      content: type,
      '': 'outer' + name
    }, function (defaultExtra, funcName) {
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
        return jQuery.access(this, function (elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement['client' + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.size = function () {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = jQuery;
  } else {
    if (typeof define === 'function' && define.amd) {
      define('jquery', [], function () {
        return jQuery;
      });
    }
  }
  if (typeof window === 'object' && typeof window.document === 'object') {
    window.jQuery = window.$ = jQuery;
  }
}(window));
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap requires jQuery');
}
+function ($) {
  'use strict';
  function transitionEnd() {
    var el = document.createElement('bootstrap');
    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'transition': 'transitionend'
      };
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }
  }
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this;
    $(this).one($.support.transition.end, function () {
      called = true;
    });
    var callback = function () {
      if (!called)
        $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };
  $(function () {
    $.support.transition = transitionEnd();
  });
}(jQuery);
+function ($) {
  'use strict';
  var dismiss = '[data-dismiss="alert"]';
  var Alert = function (el) {
    $(el).on('click', dismiss, this.close);
  };
  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr('data-target');
    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
    }
    var $parent = $(selector);
    if (e)
      e.preventDefault();
    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent();
    }
    $parent.trigger(e = $.Event('close.bs.alert'));
    if (e.isDefaultPrevented())
      return;
    $parent.removeClass('in');
    function removeElement() {
      $parent.trigger('closed.bs.alert').remove();
    }
    $.support.transition && $parent.hasClass('fade') ? $parent.one($.support.transition.end, removeElement).emulateTransitionEnd(150) : removeElement();
  };
  var old = $.fn.alert;
  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.alert');
      if (!data)
        $this.data('bs.alert', data = new Alert(this));
      if (typeof option == 'string')
        data[option].call($this);
    });
  };
  $.fn.alert.Constructor = Alert;
  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery);
+function ($) {
  'use strict';
  var Button = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
  };
  Button.DEFAULTS = { loadingText: 'loading...' };
  Button.prototype.setState = function (state) {
    var d = 'disabled';
    var $el = this.$element;
    var val = $el.is('input') ? 'val' : 'html';
    var data = $el.data();
    state = state + 'Text';
    if (!data.resetText)
      $el.data('resetText', $el[val]());
    $el[val](data[state] || this.options[state]);
    setTimeout(function () {
      state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
    }, 0);
  };
  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]');
    var changed = true;
    if ($parent.length) {
      var $input = this.$element.find('input');
      if ($input.prop('type') === 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active'))
          changed = false;
        else
          $parent.find('.active').removeClass('active');
      }
      if (changed)
        $input.prop('checked', !this.$element.hasClass('active')).trigger('change');
    }
    if (changed)
      this.$element.toggleClass('active');
  };
  var old = $.fn.button;
  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.button');
      var options = typeof option == 'object' && option;
      if (!data)
        $this.data('bs.button', data = new Button(this, options));
      if (option == 'toggle')
        data.toggle();
      else if (option)
        data.setState(option);
    });
  };
  $.fn.button.Constructor = Button;
  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };
  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target);
    if (!$btn.hasClass('btn'))
      $btn = $btn.closest('.btn');
    $btn.button('toggle');
    e.preventDefault();
  });
}(jQuery);
+function ($) {
  'use strict';
  var Carousel = function (element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;
    this.options.pause == 'hover' && this.$element.on('mouseenter', $.proxy(this.pause, this)).on('mouseleave', $.proxy(this.cycle, this));
  };
  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  };
  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
    return this;
  };
  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active');
    this.$items = this.$active.parent().children();
    return this.$items.index(this.$active);
  };
  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getActiveIndex();
    if (pos > this.$items.length - 1 || pos < 0)
      return;
    if (this.sliding)
      return this.$element.one('slid.bs.carousel', function () {
        that.to(pos);
      });
    if (activeIndex == pos)
      return this.pause().cycle();
    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]));
  };
  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);
    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }
    this.interval = clearInterval(this.interval);
    return this;
  };
  Carousel.prototype.next = function () {
    if (this.sliding)
      return;
    return this.slide('next');
  };
  Carousel.prototype.prev = function () {
    if (this.sliding)
      return;
    return this.slide('prev');
  };
  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || $active[type]();
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var fallback = type == 'next' ? 'first' : 'last';
    var that = this;
    if (!$next.length) {
      if (!this.options.wrap)
        return;
      $next = this.$element.find('.item')[fallback]();
    }
    this.sliding = true;
    isCycling && this.pause();
    var e = $.Event('slide.bs.carousel', {
        relatedTarget: $next[0],
        direction: direction
      });
    if ($next.hasClass('active'))
      return;
    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
        $nextIndicator && $nextIndicator.addClass('active');
      });
    }
    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e);
      if (e.isDefaultPrevented())
        return;
      $next.addClass(type);
      $next[0].offsetWidth;
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one($.support.transition.end, function () {
        $next.removeClass([
          type,
          direction
        ].join(' ')).addClass('active');
        $active.removeClass([
          'active',
          direction
        ].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger('slid.bs.carousel');
        }, 0);
      }).emulateTransitionEnd(600);
    } else {
      this.$element.trigger(e);
      if (e.isDefaultPrevented())
        return;
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger('slid.bs.carousel');
    }
    isCycling && this.cycle();
    return this;
  };
  var old = $.fn.carousel;
  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;
      if (!data)
        $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number')
        data.to(option);
      else if (action)
        data[action]();
      else if (options.interval)
        data.pause().cycle();
    });
  };
  $.fn.carousel.Constructor = Carousel;
  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };
  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href;
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex)
      options.interval = false;
    $target.carousel(options);
    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex);
    }
    e.preventDefault();
  });
  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      $carousel.carousel($carousel.data());
    });
  });
}(jQuery);
+function ($) {
  'use strict';
  var Collapse = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.transitioning = null;
    if (this.options.parent)
      this.$parent = $(this.options.parent);
    if (this.options.toggle)
      this.toggle();
  };
  Collapse.DEFAULTS = { toggle: true };
  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };
  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in'))
      return;
    var startEvent = $.Event('show.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented())
      return;
    var actives = this.$parent && this.$parent.find('> .panel > .in');
    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse');
      if (hasData && hasData.transitioning)
        return;
      actives.collapse('hide');
      hasData || actives.data('bs.collapse', null);
    }
    var dimension = this.dimension();
    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0);
    this.transitioning = 1;
    var complete = function () {
      this.$element.removeClass('collapsing').addClass('in')[dimension]('auto');
      this.transitioning = 0;
      this.$element.trigger('shown.bs.collapse');
    };
    if (!$.support.transition)
      return complete.call(this);
    var scrollSize = $.camelCase([
        'scroll',
        dimension
      ].join('-'));
    this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize]);
  };
  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in'))
      return;
    var startEvent = $.Event('hide.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented())
      return;
    var dimension = this.dimension();
    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
    this.$element.addClass('collapsing').removeClass('collapse').removeClass('in');
    this.transitioning = 1;
    var complete = function () {
      this.transitioning = 0;
      this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse');
    };
    if (!$.support.transition)
      return complete.call(this);
    this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350);
  };
  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };
  var old = $.fn.collapse;
  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
      if (!data)
        $this.data('bs.collapse', data = new Collapse(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.collapse.Constructor = Collapse;
  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };
  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href;
    var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
    var $target = $(target);
    var data = $target.data('bs.collapse');
    var option = data ? 'toggle' : $this.data();
    var parent = $this.attr('data-parent');
    var $parent = parent && $(parent);
    if (!data || !data.transitioning) {
      if ($parent)
        $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed');
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
    }
    $target.collapse(option);
  });
}(jQuery);
+function ($) {
  'use strict';
  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle=dropdown]';
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };
  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);
    if ($this.is('.disabled, :disabled'))
      return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');
    clearMenus();
    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
      }
      $parent.trigger(e = $.Event('show.bs.dropdown'));
      if (e.isDefaultPrevented())
        return;
      $parent.toggleClass('open').trigger('shown.bs.dropdown');
      $this.focus();
    }
    return false;
  };
  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode))
      return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is('.disabled, :disabled'))
      return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');
    if (!isActive || isActive && e.keyCode == 27) {
      if (e.which == 27)
        $parent.find(toggle).focus();
      return $this.click();
    }
    var $items = $('[role=menu] li:not(.divider):visible a', $parent);
    if (!$items.length)
      return;
    var index = $items.index($items.filter(':focus'));
    if (e.keyCode == 38 && index > 0)
      index--;
    if (e.keyCode == 40 && index < $items.length - 1)
      index++;
    if (!~index)
      index = 0;
    $items.eq(index).focus();
  };
  function clearMenus() {
    $(backdrop).remove();
    $(toggle).each(function (e) {
      var $parent = getParent($(this));
      if (!$parent.hasClass('open'))
        return;
      $parent.trigger(e = $.Event('hide.bs.dropdown'));
      if (e.isDefaultPrevented())
        return;
      $parent.removeClass('open').trigger('hidden.bs.dropdown');
    });
  }
  function getParent($this) {
    var selector = $this.attr('data-target');
    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
    }
    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent();
  }
  var old = $.fn.dropdown;
  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');
      if (!data)
        $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string')
        data[option].call($this);
    });
  };
  $.fn.dropdown.Constructor = Dropdown;
  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };
  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown);
}(jQuery);
+function ($) {
  'use strict';
  var Modal = function (element, options) {
    this.options = options;
    this.$element = $(element);
    this.$backdrop = this.isShown = null;
    if (this.options.remote)
      this.$element.load(this.options.remote);
  };
  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };
  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget);
  };
  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented())
      return;
    this.isShown = true;
    this.escape();
    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');
      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body);
      }
      that.$element.show();
      if (transition) {
        that.$element[0].offsetWidth;
      }
      that.$element.addClass('in').attr('aria-hidden', false);
      that.enforceFocus();
      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });
      transition ? that.$element.find('.modal-dialog').one($.support.transition.end, function () {
        that.$element.focus().trigger(e);
      }).emulateTransitionEnd(300) : that.$element.focus().trigger(e);
    });
  };
  Modal.prototype.hide = function (e) {
    if (e)
      e.preventDefault();
    e = $.Event('hide.bs.modal');
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented())
      return;
    this.isShown = false;
    this.escape();
    $(document).off('focusin.bs.modal');
    this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.modal');
    $.support.transition && this.$element.hasClass('fade') ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
  };
  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function (e) {
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.focus();
      }
    }, this));
  };
  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal');
    }
  };
  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.removeBackdrop();
      that.$element.trigger('hidden.bs.modal');
    });
  };
  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };
  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';
    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget)
          return;
        this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
      }, this));
      if (doAnimate)
        this.$backdrop[0].offsetWidth;
      this.$backdrop.addClass('in');
      if (!callback)
        return;
      doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');
      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
    } else if (callback) {
      callback();
    }
  };
  var old = $.fn.modal;
  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
      if (!data)
        $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string')
        data[option](_relatedTarget);
      else if (options.show)
        data.show(_relatedTarget);
    });
  };
  $.fn.modal.Constructor = Modal;
  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, ''));
    var option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());
    e.preventDefault();
    $target.modal(option, this).one('hide', function () {
      $this.is(':visible') && $this.focus();
    });
  });
  $(document).on('show.bs.modal', '.modal', function () {
    $(document.body).addClass('modal-open');
  }).on('hidden.bs.modal', '.modal', function () {
    $(document.body).removeClass('modal-open');
  });
}(jQuery);
+function ($) {
  'use strict';
  var Tooltip = function (element, options) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
    this.init('tooltip', element, options);
  };
  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  };
  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    var triggers = this.options.trigger.split(' ');
    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];
      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focus';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur';
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }
    this.options.selector ? this._options = $.extend({}, this.options, {
      trigger: 'manual',
      selector: ''
    }) : this.fixTitle();
  };
  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };
  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);
    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }
    return options;
  };
  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();
    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value)
        options[key] = value;
    });
    return options;
  };
  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
    clearTimeout(self.timeout);
    self.hoverState = 'in';
    if (!self.options.delay || !self.options.delay.show)
      return self.show();
    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in')
        self.show();
    }, self.options.delay.show);
  };
  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
    clearTimeout(self.timeout);
    self.hoverState = 'out';
    if (!self.options.delay || !self.options.delay.hide)
      return self.hide();
    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out')
        self.hide();
    }, self.options.delay.hide);
  };
  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      if (e.isDefaultPrevented())
        return;
      var $tip = this.tip();
      this.setContent();
      if (this.options.animation)
        $tip.addClass('fade');
      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace)
        placement = placement.replace(autoToken, '') || 'top';
      $tip.detach().css({
        top: 0,
        left: 0,
        display: 'block'
      }).addClass(placement);
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;
      if (autoPlace) {
        var $parent = this.$element.parent();
        var orgPlacement = placement;
        var docScroll = document.documentElement.scrollTop || document.body.scrollTop;
        var parentWidth = this.options.container == 'body' ? window.innerWidth : $parent.outerWidth();
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight();
        var parentLeft = this.options.container == 'body' ? 0 : $parent.offset().left;
        placement = placement == 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' : placement == 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' : placement == 'right' && pos.right + actualWidth > parentWidth ? 'left' : placement == 'left' && pos.left - actualWidth < parentLeft ? 'right' : placement;
        $tip.removeClass(orgPlacement).addClass(placement);
      }
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
      this.applyPlacement(calculatedOffset, placement);
      this.$element.trigger('shown.bs.' + this.type);
    }
  };
  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace;
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;
    var marginTop = parseInt($tip.css('margin-top'), 10);
    var marginLeft = parseInt($tip.css('margin-left'), 10);
    if (isNaN(marginTop))
      marginTop = 0;
    if (isNaN(marginLeft))
      marginLeft = 0;
    offset.top = offset.top + marginTop;
    offset.left = offset.left + marginLeft;
    $tip.offset(offset).addClass('in');
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;
    if (placement == 'top' && actualHeight != height) {
      replace = true;
      offset.top = offset.top + height - actualHeight;
    }
    if (/bottom|top/.test(placement)) {
      var delta = 0;
      if (offset.left < 0) {
        delta = offset.left * -2;
        offset.left = 0;
        $tip.offset(offset);
        actualWidth = $tip[0].offsetWidth;
        actualHeight = $tip[0].offsetHeight;
      }
      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left');
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top');
    }
    if (replace)
      $tip.offset(offset);
  };
  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + '%' : '');
  };
  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };
  Tooltip.prototype.hide = function () {
    var that = this;
    var $tip = this.tip();
    var e = $.Event('hide.bs.' + this.type);
    function complete() {
      if (that.hoverState != 'in')
        $tip.detach();
    }
    this.$element.trigger(e);
    if (e.isDefaultPrevented())
      return;
    $tip.removeClass('in');
    $.support.transition && this.$tip.hasClass('fade') ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
    this.$element.trigger('hidden.bs.' + this.type);
    return this;
  };
  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };
  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };
  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0];
    return $.extend({}, typeof el.getBoundingClientRect == 'function' ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset());
  };
  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? {
      top: pos.top + pos.height,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == 'top' ? {
      top: pos.top - actualHeight,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == 'left' ? {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left - actualWidth
    } : {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left + pos.width
    };
  };
  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;
    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
    return title;
  };
  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template);
  };
  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };
  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide();
      this.$element = null;
      this.options = null;
    }
  };
  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };
  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };
  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };
  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this;
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
  };
  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type);
  };
  var old = $.fn.tooltip;
  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tooltip');
      var options = typeof option == 'object' && option;
      if (!data)
        $this.data('bs.tooltip', data = new Tooltip(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.tooltip.Constructor = Tooltip;
  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);
+function ($) {
  'use strict';
  var Popover = function (element, options) {
    this.init('popover', element, options);
  };
  if (!$.fn.tooltip)
    throw new Error('Popover requires tooltip.js');
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
  Popover.prototype.constructor = Popover;
  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };
  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content);
    $tip.removeClass('fade top bottom left right in');
    if (!$tip.find('.popover-title').html())
      $tip.find('.popover-title').hide();
  };
  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };
  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;
    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
  };
  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow');
  };
  Popover.prototype.tip = function () {
    if (!this.$tip)
      this.$tip = $(this.options.template);
    return this.$tip;
  };
  var old = $.fn.popover;
  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.popover');
      var options = typeof option == 'object' && option;
      if (!data)
        $this.data('bs.popover', data = new Popover(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.popover.Constructor = Popover;
  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
}(jQuery);
+function ($) {
  'use strict';
  function ScrollSpy(element, options) {
    var href;
    var process = $.proxy(this.process, this);
    this.$element = $(element).is('body') ? $(window) : $(element);
    this.$body = $('body');
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || (href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') || '') + ' .nav li > a';
    this.offsets = $([]);
    this.targets = $([]);
    this.activeTarget = null;
    this.refresh();
    this.process();
  }
  ScrollSpy.DEFAULTS = { offset: 10 };
  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position';
    this.offsets = $([]);
    this.targets = $([]);
    var self = this;
    var $targets = this.$body.find(this.selector).map(function () {
        var $el = $(this);
        var href = $el.data('target') || $el.attr('href');
        var $href = /^#\w/.test(href) && $(href);
        return $href && $href.length && [[
            $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()),
            href
          ]] || null;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).each(function () {
        self.offsets.push(this[0]);
        self.targets.push(this[1]);
      });
  };
  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
    var maxScroll = scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;
    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i);
    }
    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
    }
  };
  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;
    $(this.selector).parents('.active').removeClass('active');
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
    var active = $(selector).parents('li').addClass('active');
    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }
    active.trigger('activate.bs.scrollspy');
  };
  var old = $.fn.scrollspy;
  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = typeof option == 'object' && option;
      if (!data)
        $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.scrollspy.Constructor = ScrollSpy;
  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };
  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      $spy.scrollspy($spy.data());
    });
  });
}(jQuery);
+function ($) {
  'use strict';
  var Tab = function (element) {
    this.element = $(element);
  };
  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');
    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
    }
    if ($this.parent('li').hasClass('active'))
      return;
    var previous = $ul.find('.active:last a')[0];
    var e = $.Event('show.bs.tab', { relatedTarget: previous });
    $this.trigger(e);
    if (e.isDefaultPrevented())
      return;
    var $target = $(selector);
    this.activate($this.parent('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      });
    });
  };
  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && $active.hasClass('fade');
    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');
      element.addClass('active');
      if (transition) {
        element[0].offsetWidth;
        element.addClass('in');
      } else {
        element.removeClass('fade');
      }
      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active');
      }
      callback && callback();
    }
    transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next();
    $active.removeClass('in');
  };
  var old = $.fn.tab;
  $.fn.tab = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');
      if (!data)
        $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.tab.Constructor = Tab;
  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };
  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
}(jQuery);
+function ($) {
  'use strict';
  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    this.$window = $(window).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
    this.$element = $(element);
    this.affixed = this.unpin = null;
    this.checkPosition();
  };
  Affix.RESET = 'affix affix-top affix-bottom';
  Affix.DEFAULTS = { offset: 0 };
  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };
  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible'))
      return;
    var scrollHeight = $(document).height();
    var scrollTop = this.$window.scrollTop();
    var position = this.$element.offset();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    if (typeof offset != 'object')
      offsetBottom = offsetTop = offset;
    if (typeof offsetTop == 'function')
      offsetTop = offset.top();
    if (typeof offsetBottom == 'function')
      offsetBottom = offset.bottom();
    var affix = this.unpin != null && scrollTop + this.unpin <= position.top ? false : offsetBottom != null && position.top + this.$element.height() >= scrollHeight - offsetBottom ? 'bottom' : offsetTop != null && scrollTop <= offsetTop ? 'top' : false;
    if (this.affixed === affix)
      return;
    if (this.unpin)
      this.$element.css('top', '');
    this.affixed = affix;
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null;
    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''));
    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() });
    }
  };
  var old = $.fn.affix;
  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.affix');
      var options = typeof option == 'object' && option;
      if (!data)
        $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.affix.Constructor = Affix;
  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  };
  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();
      data.offset = data.offset || {};
      if (data.offsetBottom)
        data.offset.bottom = data.offsetBottom;
      if (data.offsetTop)
        data.offset.top = data.offsetTop;
      $spy.affix(data);
    });
  });
}(jQuery);
(function ($, undefined) {
  var uuid = 0, runiqueId = /^ui-id-\d+$/;
  $.ui = $.ui || {};
  $.extend($.ui, {
    version: '1.10.3',
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  });
  $.fn.extend({
    focus: function (orig) {
      return function (delay, fn) {
        return typeof delay === 'number' ? this.each(function () {
          var elem = this;
          setTimeout(function () {
            $(elem).focus();
            if (fn) {
              fn.call(elem);
            }
          }, delay);
        }) : orig.apply(this, arguments);
      };
    }($.fn.focus),
    scrollParent: function () {
      var scrollParent;
      if ($.ui.ie && /(static|relative)/.test(this.css('position')) || /absolute/.test(this.css('position'))) {
        scrollParent = this.parents().filter(function () {
          return /(relative|absolute|fixed)/.test($.css(this, 'position')) && /(auto|scroll)/.test($.css(this, 'overflow') + $.css(this, 'overflow-y') + $.css(this, 'overflow-x'));
        }).eq(0);
      } else {
        scrollParent = this.parents().filter(function () {
          return /(auto|scroll)/.test($.css(this, 'overflow') + $.css(this, 'overflow-y') + $.css(this, 'overflow-x'));
        }).eq(0);
      }
      return /fixed/.test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
    },
    zIndex: function (zIndex) {
      if (zIndex !== undefined) {
        return this.css('zIndex', zIndex);
      }
      if (this.length) {
        var elem = $(this[0]), position, value;
        while (elem.length && elem[0] !== document) {
          position = elem.css('position');
          if (position === 'absolute' || position === 'relative' || position === 'fixed') {
            value = parseInt(elem.css('zIndex'), 10);
            if (!isNaN(value) && value !== 0) {
              return value;
            }
          }
          elem = elem.parent();
        }
      }
      return 0;
    },
    uniqueId: function () {
      return this.each(function () {
        if (!this.id) {
          this.id = 'ui-id-' + ++uuid;
        }
      });
    },
    removeUniqueId: function () {
      return this.each(function () {
        if (runiqueId.test(this.id)) {
          $(this).removeAttr('id');
        }
      });
    }
  });
  function focusable(element, isTabIndexNotNaN) {
    var map, mapName, img, nodeName = element.nodeName.toLowerCase();
    if ('area' === nodeName) {
      map = element.parentNode;
      mapName = map.name;
      if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
        return false;
      }
      img = $('img[usemap=#' + mapName + ']')[0];
      return !!img && visible(img);
    }
    return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : 'a' === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
  }
  function visible(element) {
    return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
      return $.css(this, 'visibility') === 'hidden';
    }).length;
  }
  $.extend($.expr[':'], {
    data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
      return function (elem) {
        return !!$.data(elem, dataName);
      };
    }) : function (elem, i, match) {
      return !!$.data(elem, match[3]);
    },
    focusable: function (element) {
      return focusable(element, !isNaN($.attr(element, 'tabindex')));
    },
    tabbable: function (element) {
      var tabIndex = $.attr(element, 'tabindex'), isTabIndexNaN = isNaN(tabIndex);
      return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
    }
  });
  if (!$('<a>').outerWidth(1).jquery) {
    $.each([
      'Width',
      'Height'
    ], function (i, name) {
      var side = name === 'Width' ? [
          'Left',
          'Right'
        ] : [
          'Top',
          'Bottom'
        ], type = name.toLowerCase(), orig = {
          innerWidth: $.fn.innerWidth,
          innerHeight: $.fn.innerHeight,
          outerWidth: $.fn.outerWidth,
          outerHeight: $.fn.outerHeight
        };
      function reduce(elem, size, border, margin) {
        $.each(side, function () {
          size -= parseFloat($.css(elem, 'padding' + this)) || 0;
          if (border) {
            size -= parseFloat($.css(elem, 'border' + this + 'Width')) || 0;
          }
          if (margin) {
            size -= parseFloat($.css(elem, 'margin' + this)) || 0;
          }
        });
        return size;
      }
      $.fn['inner' + name] = function (size) {
        if (size === undefined) {
          return orig['inner' + name].call(this);
        }
        return this.each(function () {
          $(this).css(type, reduce(this, size) + 'px');
        });
      };
      $.fn['outer' + name] = function (size, margin) {
        if (typeof size !== 'number') {
          return orig['outer' + name].call(this, size);
        }
        return this.each(function () {
          $(this).css(type, reduce(this, size, true, margin) + 'px');
        });
      };
    });
  }
  if (!$.fn.addBack) {
    $.fn.addBack = function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    };
  }
  if ($('<a>').data('a-b', 'a').removeData('a-b').data('a-b')) {
    $.fn.removeData = function (removeData) {
      return function (key) {
        if (arguments.length) {
          return removeData.call(this, $.camelCase(key));
        } else {
          return removeData.call(this);
        }
      };
    }($.fn.removeData);
  }
  $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
  $.support.selectstart = 'onselectstart' in document.createElement('div');
  $.fn.extend({
    disableSelection: function () {
      return this.bind(($.support.selectstart ? 'selectstart' : 'mousedown') + '.ui-disableSelection', function (event) {
        event.preventDefault();
      });
    },
    enableSelection: function () {
      return this.unbind('.ui-disableSelection');
    }
  });
  $.extend($.ui, {
    plugin: {
      add: function (module, option, set) {
        var i, proto = $.ui[module].prototype;
        for (i in set) {
          proto.plugins[i] = proto.plugins[i] || [];
          proto.plugins[i].push([
            option,
            set[i]
          ]);
        }
      },
      call: function (instance, name, args) {
        var i, set = instance.plugins[name];
        if (!set || !instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11) {
          return;
        }
        for (i = 0; i < set.length; i++) {
          if (instance.options[set[i][0]]) {
            set[i][1].apply(instance.element, args);
          }
        }
      }
    },
    hasScroll: function (el, a) {
      if ($(el).css('overflow') === 'hidden') {
        return false;
      }
      var scroll = a && a === 'left' ? 'scrollLeft' : 'scrollTop', has = false;
      if (el[scroll] > 0) {
        return true;
      }
      el[scroll] = 1;
      has = el[scroll] > 0;
      el[scroll] = 0;
      return has;
    }
  });
}(jQuery));
(function ($, undefined) {
  var uuid = 0, slice = Array.prototype.slice, _cleanData = $.cleanData;
  $.cleanData = function (elems) {
    for (var i = 0, elem; (elem = elems[i]) != null; i++) {
      try {
        $(elem).triggerHandler('remove');
      } catch (e) {
      }
    }
    _cleanData(elems);
  };
  $.widget = function (name, base, prototype) {
    var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {}, namespace = name.split('.')[0];
    name = name.split('.')[1];
    fullName = namespace + '-' + name;
    if (!prototype) {
      prototype = base;
      base = $.Widget;
    }
    $.expr[':'][fullName.toLowerCase()] = function (elem) {
      return !!$.data(elem, fullName);
    };
    $[namespace] = $[namespace] || {};
    existingConstructor = $[namespace][name];
    constructor = $[namespace][name] = function (options, element) {
      if (!this._createWidget) {
        return new constructor(options, element);
      }
      if (arguments.length) {
        this._createWidget(options, element);
      }
    };
    $.extend(constructor, existingConstructor, {
      version: prototype.version,
      _proto: $.extend({}, prototype),
      _childConstructors: []
    });
    basePrototype = new base();
    basePrototype.options = $.widget.extend({}, basePrototype.options);
    $.each(prototype, function (prop, value) {
      if (!$.isFunction(value)) {
        proxiedPrototype[prop] = value;
        return;
      }
      proxiedPrototype[prop] = function () {
        var _super = function () {
            return base.prototype[prop].apply(this, arguments);
          }, _superApply = function (args) {
            return base.prototype[prop].apply(this, args);
          };
        return function () {
          var __super = this._super, __superApply = this._superApply, returnValue;
          this._super = _super;
          this._superApply = _superApply;
          returnValue = value.apply(this, arguments);
          this._super = __super;
          this._superApply = __superApply;
          return returnValue;
        };
      }();
    });
    constructor.prototype = $.widget.extend(basePrototype, { widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name }, proxiedPrototype, {
      constructor: constructor,
      namespace: namespace,
      widgetName: name,
      widgetFullName: fullName
    });
    if (existingConstructor) {
      $.each(existingConstructor._childConstructors, function (i, child) {
        var childPrototype = child.prototype;
        $.widget(childPrototype.namespace + '.' + childPrototype.widgetName, constructor, child._proto);
      });
      delete existingConstructor._childConstructors;
    } else {
      base._childConstructors.push(constructor);
    }
    $.widget.bridge(name, constructor);
  };
  $.widget.extend = function (target) {
    var input = slice.call(arguments, 1), inputIndex = 0, inputLength = input.length, key, value;
    for (; inputIndex < inputLength; inputIndex++) {
      for (key in input[inputIndex]) {
        value = input[inputIndex][key];
        if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
          if ($.isPlainObject(value)) {
            target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value);
          } else {
            target[key] = value;
          }
        }
      }
    }
    return target;
  };
  $.widget.bridge = function (name, object) {
    var fullName = object.prototype.widgetFullName || name;
    $.fn[name] = function (options) {
      var isMethodCall = typeof options === 'string', args = slice.call(arguments, 1), returnValue = this;
      options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
      if (isMethodCall) {
        this.each(function () {
          var methodValue, instance = $.data(this, fullName);
          if (!instance) {
            return $.error('cannot call methods on ' + name + ' prior to initialization; ' + 'attempted to call method \'' + options + '\'');
          }
          if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
            return $.error('no such method \'' + options + '\' for ' + name + ' widget instance');
          }
          methodValue = instance[options].apply(instance, args);
          if (methodValue !== instance && methodValue !== undefined) {
            returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
            return false;
          }
        });
      } else {
        this.each(function () {
          var instance = $.data(this, fullName);
          if (instance) {
            instance.option(options || {})._init();
          } else {
            $.data(this, fullName, new object(options, this));
          }
        });
      }
      return returnValue;
    };
  };
  $.Widget = function () {
  };
  $.Widget._childConstructors = [];
  $.Widget.prototype = {
    widgetName: 'widget',
    widgetEventPrefix: '',
    defaultElement: '<div>',
    options: {
      disabled: false,
      create: null
    },
    _createWidget: function (options, element) {
      element = $(element || this.defaultElement || this)[0];
      this.element = $(element);
      this.uuid = uuid++;
      this.eventNamespace = '.' + this.widgetName + this.uuid;
      this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
      this.bindings = $();
      this.hoverable = $();
      this.focusable = $();
      if (element !== this) {
        $.data(element, this.widgetFullName, this);
        this._on(true, this.element, {
          remove: function (event) {
            if (event.target === element) {
              this.destroy();
            }
          }
        });
        this.document = $(element.style ? element.ownerDocument : element.document || element);
        this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
      }
      this._create();
      this._trigger('create', null, this._getCreateEventData());
      this._init();
    },
    _getCreateOptions: $.noop,
    _getCreateEventData: $.noop,
    _create: $.noop,
    _init: $.noop,
    destroy: function () {
      this._destroy();
      this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
      this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(this.widgetFullName + '-disabled ' + 'ui-state-disabled');
      this.bindings.unbind(this.eventNamespace);
      this.hoverable.removeClass('ui-state-hover');
      this.focusable.removeClass('ui-state-focus');
    },
    _destroy: $.noop,
    widget: function () {
      return this.element;
    },
    option: function (key, value) {
      var options = key, parts, curOption, i;
      if (arguments.length === 0) {
        return $.widget.extend({}, this.options);
      }
      if (typeof key === 'string') {
        options = {};
        parts = key.split('.');
        key = parts.shift();
        if (parts.length) {
          curOption = options[key] = $.widget.extend({}, this.options[key]);
          for (i = 0; i < parts.length - 1; i++) {
            curOption[parts[i]] = curOption[parts[i]] || {};
            curOption = curOption[parts[i]];
          }
          key = parts.pop();
          if (value === undefined) {
            return curOption[key] === undefined ? null : curOption[key];
          }
          curOption[key] = value;
        } else {
          if (value === undefined) {
            return this.options[key] === undefined ? null : this.options[key];
          }
          options[key] = value;
        }
      }
      this._setOptions(options);
      return this;
    },
    _setOptions: function (options) {
      var key;
      for (key in options) {
        this._setOption(key, options[key]);
      }
      return this;
    },
    _setOption: function (key, value) {
      this.options[key] = value;
      if (key === 'disabled') {
        this.widget().toggleClass(this.widgetFullName + '-disabled ui-state-disabled', !!value).attr('aria-disabled', value);
        this.hoverable.removeClass('ui-state-hover');
        this.focusable.removeClass('ui-state-focus');
      }
      return this;
    },
    enable: function () {
      return this._setOption('disabled', false);
    },
    disable: function () {
      return this._setOption('disabled', true);
    },
    _on: function (suppressDisabledCheck, element, handlers) {
      var delegateElement, instance = this;
      if (typeof suppressDisabledCheck !== 'boolean') {
        handlers = element;
        element = suppressDisabledCheck;
        suppressDisabledCheck = false;
      }
      if (!handlers) {
        handlers = element;
        element = this.element;
        delegateElement = this.widget();
      } else {
        element = delegateElement = $(element);
        this.bindings = this.bindings.add(element);
      }
      $.each(handlers, function (event, handler) {
        function handlerProxy() {
          if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass('ui-state-disabled'))) {
            return;
          }
          return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
        }
        if (typeof handler !== 'string') {
          handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
        }
        var match = event.match(/^(\w+)\s*(.*)$/), eventName = match[1] + instance.eventNamespace, selector = match[2];
        if (selector) {
          delegateElement.delegate(selector, eventName, handlerProxy);
        } else {
          element.bind(eventName, handlerProxy);
        }
      });
    },
    _off: function (element, eventName) {
      eventName = (eventName || '').split(' ').join(this.eventNamespace + ' ') + this.eventNamespace;
      element.unbind(eventName).undelegate(eventName);
    },
    _delay: function (handler, delay) {
      function handlerProxy() {
        return (typeof handler === 'string' ? instance[handler] : handler).apply(instance, arguments);
      }
      var instance = this;
      return setTimeout(handlerProxy, delay || 0);
    },
    _hoverable: function (element) {
      this.hoverable = this.hoverable.add(element);
      this._on(element, {
        mouseenter: function (event) {
          $(event.currentTarget).addClass('ui-state-hover');
        },
        mouseleave: function (event) {
          $(event.currentTarget).removeClass('ui-state-hover');
        }
      });
    },
    _focusable: function (element) {
      this.focusable = this.focusable.add(element);
      this._on(element, {
        focusin: function (event) {
          $(event.currentTarget).addClass('ui-state-focus');
        },
        focusout: function (event) {
          $(event.currentTarget).removeClass('ui-state-focus');
        }
      });
    },
    _trigger: function (type, event, data) {
      var prop, orig, callback = this.options[type];
      data = data || {};
      event = $.Event(event);
      event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
      event.target = this.element[0];
      orig = event.originalEvent;
      if (orig) {
        for (prop in orig) {
          if (!(prop in event)) {
            event[prop] = orig[prop];
          }
        }
      }
      this.element.trigger(event, data);
      return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
    }
  };
  $.each({
    show: 'fadeIn',
    hide: 'fadeOut'
  }, function (method, defaultEffect) {
    $.Widget.prototype['_' + method] = function (element, options, callback) {
      if (typeof options === 'string') {
        options = { effect: options };
      }
      var hasOptions, effectName = !options ? method : options === true || typeof options === 'number' ? defaultEffect : options.effect || defaultEffect;
      options = options || {};
      if (typeof options === 'number') {
        options = { duration: options };
      }
      hasOptions = !$.isEmptyObject(options);
      options.complete = callback;
      if (options.delay) {
        element.delay(options.delay);
      }
      if (hasOptions && $.effects && $.effects.effect[effectName]) {
        element[method](options);
      } else if (effectName !== method && element[effectName]) {
        element[effectName](options.duration, options.easing, callback);
      } else {
        element.queue(function (next) {
          $(this)[method]();
          if (callback) {
            callback.call(element[0]);
          }
          next();
        });
      }
    };
  });
}(jQuery));
(function ($, undefined) {
  var mouseHandled = false;
  $(document).mouseup(function () {
    mouseHandled = false;
  });
  $.widget('ui.mouse', {
    version: '1.10.3',
    options: {
      cancel: 'input,textarea,button,select,option',
      distance: 1,
      delay: 0
    },
    _mouseInit: function () {
      var that = this;
      this.element.bind('mousedown.' + this.widgetName, function (event) {
        return that._mouseDown(event);
      }).bind('click.' + this.widgetName, function (event) {
        if (true === $.data(event.target, that.widgetName + '.preventClickEvent')) {
          $.removeData(event.target, that.widgetName + '.preventClickEvent');
          event.stopImmediatePropagation();
          return false;
        }
      });
      this.started = false;
    },
    _mouseDestroy: function () {
      this.element.unbind('.' + this.widgetName);
      if (this._mouseMoveDelegate) {
        $(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
      }
    },
    _mouseDown: function (event) {
      if (mouseHandled) {
        return;
      }
      this._mouseStarted && this._mouseUp(event);
      this._mouseDownEvent = event;
      var that = this, btnIsLeft = event.which === 1, elIsCancel = typeof this.options.cancel === 'string' && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false;
      if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
        return true;
      }
      this.mouseDelayMet = !this.options.delay;
      if (!this.mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function () {
          that.mouseDelayMet = true;
        }, this.options.delay);
      }
      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = this._mouseStart(event) !== false;
        if (!this._mouseStarted) {
          event.preventDefault();
          return true;
        }
      }
      if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
        $.removeData(event.target, this.widgetName + '.preventClickEvent');
      }
      this._mouseMoveDelegate = function (event) {
        return that._mouseMove(event);
      };
      this._mouseUpDelegate = function (event) {
        return that._mouseUp(event);
      };
      $(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate);
      event.preventDefault();
      mouseHandled = true;
      return true;
    },
    _mouseMove: function (event) {
      if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
        return this._mouseUp(event);
      }
      if (this._mouseStarted) {
        this._mouseDrag(event);
        return event.preventDefault();
      }
      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== false;
        this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event);
      }
      return !this._mouseStarted;
    },
    _mouseUp: function (event) {
      $(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
      if (this._mouseStarted) {
        this._mouseStarted = false;
        if (event.target === this._mouseDownEvent.target) {
          $.data(event.target, this.widgetName + '.preventClickEvent', true);
        }
        this._mouseStop(event);
      }
      return false;
    },
    _mouseDistanceMet: function (event) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function () {
      return this.mouseDelayMet;
    },
    _mouseStart: function () {
    },
    _mouseDrag: function () {
    },
    _mouseStop: function () {
    },
    _mouseCapture: function () {
      return true;
    }
  });
}(jQuery));
(function ($, undefined) {
  $.widget('ui.draggable', $.ui.mouse, {
    version: '1.10.3',
    widgetEventPrefix: 'drag',
    options: {
      addClasses: true,
      appendTo: 'parent',
      axis: false,
      connectToSortable: false,
      containment: false,
      cursor: 'auto',
      cursorAt: false,
      grid: false,
      handle: false,
      helper: 'original',
      iframeFix: false,
      opacity: false,
      refreshPositions: false,
      revert: false,
      revertDuration: 500,
      scope: 'default',
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: false,
      snapMode: 'both',
      snapTolerance: 20,
      stack: false,
      zIndex: false,
      drag: null,
      start: null,
      stop: null
    },
    _create: function () {
      if (this.options.helper === 'original' && !/^(?:r|a|f)/.test(this.element.css('position'))) {
        this.element[0].style.position = 'relative';
      }
      if (this.options.addClasses) {
        this.element.addClass('ui-draggable');
      }
      if (this.options.disabled) {
        this.element.addClass('ui-draggable-disabled');
      }
      this._mouseInit();
    },
    _destroy: function () {
      this.element.removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled');
      this._mouseDestroy();
    },
    _mouseCapture: function (event) {
      var o = this.options;
      if (this.helper || o.disabled || $(event.target).closest('.ui-resizable-handle').length > 0) {
        return false;
      }
      this.handle = this._getHandle(event);
      if (!this.handle) {
        return false;
      }
      $(o.iframeFix === true ? 'iframe' : o.iframeFix).each(function () {
        $('<div class=\'ui-draggable-iframeFix\' style=\'background: #fff;\'></div>').css({
          width: this.offsetWidth + 'px',
          height: this.offsetHeight + 'px',
          position: 'absolute',
          opacity: '0.001',
          zIndex: 1000
        }).css($(this).offset()).appendTo('body');
      });
      return true;
    },
    _mouseStart: function (event) {
      var o = this.options;
      this.helper = this._createHelper(event);
      this.helper.addClass('ui-draggable-dragging');
      this._cacheHelperProportions();
      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }
      this._cacheMargins();
      this.cssPosition = this.helper.css('position');
      this.scrollParent = this.helper.scrollParent();
      this.offsetParent = this.helper.offsetParent();
      this.offsetParentCssPosition = this.offsetParent.css('position');
      this.offset = this.positionAbs = this.element.offset();
      this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      };
      this.offset.scroll = false;
      $.extend(this.offset, {
        click: {
          left: event.pageX - this.offset.left,
          top: event.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      });
      this.originalPosition = this.position = this._generatePosition(event);
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY;
      o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);
      this._setContainment();
      if (this._trigger('start', event) === false) {
        this._clear();
        return false;
      }
      this._cacheHelperProportions();
      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      }
      this._mouseDrag(event, true);
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStart(this, event);
      }
      return true;
    },
    _mouseDrag: function (event, noPropagation) {
      if (this.offsetParentCssPosition === 'fixed') {
        this.offset.parent = this._getParentOffset();
      }
      this.position = this._generatePosition(event);
      this.positionAbs = this._convertPositionTo('absolute');
      if (!noPropagation) {
        var ui = this._uiHash();
        if (this._trigger('drag', event, ui) === false) {
          this._mouseUp({});
          return false;
        }
        this.position = ui.position;
      }
      if (!this.options.axis || this.options.axis !== 'y') {
        this.helper[0].style.left = this.position.left + 'px';
      }
      if (!this.options.axis || this.options.axis !== 'x') {
        this.helper[0].style.top = this.position.top + 'px';
      }
      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }
      return false;
    },
    _mouseStop: function (event) {
      var that = this, dropped = false;
      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        dropped = $.ui.ddmanager.drop(this, event);
      }
      if (this.dropped) {
        dropped = this.dropped;
        this.dropped = false;
      }
      if (this.options.helper === 'original' && !$.contains(this.element[0].ownerDocument, this.element[0])) {
        return false;
      }
      if (this.options.revert === 'invalid' && !dropped || this.options.revert === 'valid' && dropped || this.options.revert === true || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped)) {
        $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
          if (that._trigger('stop', event) !== false) {
            that._clear();
          }
        });
      } else {
        if (this._trigger('stop', event) !== false) {
          this._clear();
        }
      }
      return false;
    },
    _mouseUp: function (event) {
      $('div.ui-draggable-iframeFix').each(function () {
        this.parentNode.removeChild(this);
      });
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStop(this, event);
      }
      return $.ui.mouse.prototype._mouseUp.call(this, event);
    },
    cancel: function () {
      if (this.helper.is('.ui-draggable-dragging')) {
        this._mouseUp({});
      } else {
        this._clear();
      }
      return this;
    },
    _getHandle: function (event) {
      return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
    },
    _createHelper: function (event) {
      var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : o.helper === 'clone' ? this.element.clone().removeAttr('id') : this.element;
      if (!helper.parents('body').length) {
        helper.appendTo(o.appendTo === 'parent' ? this.element[0].parentNode : o.appendTo);
      }
      if (helper[0] !== this.element[0] && !/(fixed|absolute)/.test(helper.css('position'))) {
        helper.css('position', 'absolute');
      }
      return helper;
    },
    _adjustOffsetFromHelper: function (obj) {
      if (typeof obj === 'string') {
        obj = obj.split(' ');
      }
      if ($.isArray(obj)) {
        obj = {
          left: +obj[0],
          top: +obj[1] || 0
        };
      }
      if ('left' in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }
      if ('right' in obj) {
        this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
      }
      if ('top' in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }
      if ('bottom' in obj) {
        this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },
    _getParentOffset: function () {
      var po = this.offsetParent.offset();
      if (this.cssPosition === 'absolute' && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }
      if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === 'html' && $.ui.ie) {
        po = {
          top: 0,
          left: 0
        };
      }
      return {
        top: po.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
        left: po.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
      };
    },
    _getRelativeOffset: function () {
      if (this.cssPosition === 'relative') {
        var p = this.element.position();
        return {
          top: p.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
          left: p.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.element.css('marginLeft'), 10) || 0,
        top: parseInt(this.element.css('marginTop'), 10) || 0,
        right: parseInt(this.element.css('marginRight'), 10) || 0,
        bottom: parseInt(this.element.css('marginBottom'), 10) || 0
      };
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function () {
      var over, c, ce, o = this.options;
      if (!o.containment) {
        this.containment = null;
        return;
      }
      if (o.containment === 'window') {
        this.containment = [
          $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
          $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
          $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left,
          $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
        ];
        return;
      }
      if (o.containment === 'document') {
        this.containment = [
          0,
          0,
          $(document).width() - this.helperProportions.width - this.margins.left,
          ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
        ];
        return;
      }
      if (o.containment.constructor === Array) {
        this.containment = o.containment;
        return;
      }
      if (o.containment === 'parent') {
        o.containment = this.helper[0].parentNode;
      }
      c = $(o.containment);
      ce = c[0];
      if (!ce) {
        return;
      }
      over = c.css('overflow') !== 'hidden';
      this.containment = [
        (parseInt(c.css('borderLeftWidth'), 10) || 0) + (parseInt(c.css('paddingLeft'), 10) || 0),
        (parseInt(c.css('borderTopWidth'), 10) || 0) + (parseInt(c.css('paddingTop'), 10) || 0),
        (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css('borderRightWidth'), 10) || 0) - (parseInt(c.css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
        (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css('borderBottomWidth'), 10) || 0) - (parseInt(c.css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom
      ];
      this.relative_container = c;
    },
    _convertPositionTo: function (d, pos) {
      if (!pos) {
        pos = this.position;
      }
      var mod = d === 'absolute' ? 1 : -1, scroll = this.cssPosition === 'absolute' && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent;
      if (!this.offset.scroll) {
        this.offset.scroll = {
          top: scroll.scrollTop(),
          left: scroll.scrollLeft()
        };
      }
      return {
        top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - (this.cssPosition === 'fixed' ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * mod,
        left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - (this.cssPosition === 'fixed' ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * mod
      };
    },
    _generatePosition: function (event) {
      var containment, co, top, left, o = this.options, scroll = this.cssPosition === 'absolute' && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, pageX = event.pageX, pageY = event.pageY;
      if (!this.offset.scroll) {
        this.offset.scroll = {
          top: scroll.scrollTop(),
          left: scroll.scrollLeft()
        };
      }
      if (this.originalPosition) {
        if (this.containment) {
          if (this.relative_container) {
            co = this.relative_container.offset();
            containment = [
              this.containment[0] + co.left,
              this.containment[1] + co.top,
              this.containment[2] + co.left,
              this.containment[3] + co.top
            ];
          } else {
            containment = this.containment;
          }
          if (event.pageX - this.offset.click.left < containment[0]) {
            pageX = containment[0] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top < containment[1]) {
            pageY = containment[1] + this.offset.click.top;
          }
          if (event.pageX - this.offset.click.left > containment[2]) {
            pageX = containment[2] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top > containment[3]) {
            pageY = containment[3] + this.offset.click.top;
          }
        }
        if (o.grid) {
          top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
          pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top;
          left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
          pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
        }
      }
      return {
        top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === 'fixed' ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
        left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === 'fixed' ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
      };
    },
    _clear: function () {
      this.helper.removeClass('ui-draggable-dragging');
      if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
        this.helper.remove();
      }
      this.helper = null;
      this.cancelHelperRemoval = false;
    },
    _trigger: function (type, event, ui) {
      ui = ui || this._uiHash();
      $.ui.plugin.call(this, type, [
        event,
        ui
      ]);
      if (type === 'drag') {
        this.positionAbs = this._convertPositionTo('absolute');
      }
      return $.Widget.prototype._trigger.call(this, type, event, ui);
    },
    plugins: {},
    _uiHash: function () {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  });
  $.ui.plugin.add('draggable', 'connectToSortable', {
    start: function (event, ui) {
      var inst = $(this).data('ui-draggable'), o = inst.options, uiSortable = $.extend({}, ui, { item: inst.element });
      inst.sortables = [];
      $(o.connectToSortable).each(function () {
        var sortable = $.data(this, 'ui-sortable');
        if (sortable && !sortable.options.disabled) {
          inst.sortables.push({
            instance: sortable,
            shouldRevert: sortable.options.revert
          });
          sortable.refreshPositions();
          sortable._trigger('activate', event, uiSortable);
        }
      });
    },
    stop: function (event, ui) {
      var inst = $(this).data('ui-draggable'), uiSortable = $.extend({}, ui, { item: inst.element });
      $.each(inst.sortables, function () {
        if (this.instance.isOver) {
          this.instance.isOver = 0;
          inst.cancelHelperRemoval = true;
          this.instance.cancelHelperRemoval = false;
          if (this.shouldRevert) {
            this.instance.options.revert = this.shouldRevert;
          }
          this.instance._mouseStop(event);
          this.instance.options.helper = this.instance.options._helper;
          if (inst.options.helper === 'original') {
            this.instance.currentItem.css({
              top: 'auto',
              left: 'auto'
            });
          }
        } else {
          this.instance.cancelHelperRemoval = false;
          this.instance._trigger('deactivate', event, uiSortable);
        }
      });
    },
    drag: function (event, ui) {
      var inst = $(this).data('ui-draggable'), that = this;
      $.each(inst.sortables, function () {
        var innermostIntersecting = false, thisSortable = this;
        this.instance.positionAbs = inst.positionAbs;
        this.instance.helperProportions = inst.helperProportions;
        this.instance.offset.click = inst.offset.click;
        if (this.instance._intersectsWith(this.instance.containerCache)) {
          innermostIntersecting = true;
          $.each(inst.sortables, function () {
            this.instance.positionAbs = inst.positionAbs;
            this.instance.helperProportions = inst.helperProportions;
            this.instance.offset.click = inst.offset.click;
            if (this !== thisSortable && this.instance._intersectsWith(this.instance.containerCache) && $.contains(thisSortable.instance.element[0], this.instance.element[0])) {
              innermostIntersecting = false;
            }
            return innermostIntersecting;
          });
        }
        if (innermostIntersecting) {
          if (!this.instance.isOver) {
            this.instance.isOver = 1;
            this.instance.currentItem = $(that).clone().removeAttr('id').appendTo(this.instance.element).data('ui-sortable-item', true);
            this.instance.options._helper = this.instance.options.helper;
            this.instance.options.helper = function () {
              return ui.helper[0];
            };
            event.target = this.instance.currentItem[0];
            this.instance._mouseCapture(event, true);
            this.instance._mouseStart(event, true, true);
            this.instance.offset.click.top = inst.offset.click.top;
            this.instance.offset.click.left = inst.offset.click.left;
            this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
            this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
            inst._trigger('toSortable', event);
            inst.dropped = this.instance.element;
            inst.currentItem = inst.element;
            this.instance.fromOutside = inst;
          }
          if (this.instance.currentItem) {
            this.instance._mouseDrag(event);
          }
        } else {
          if (this.instance.isOver) {
            this.instance.isOver = 0;
            this.instance.cancelHelperRemoval = true;
            this.instance.options.revert = false;
            this.instance._trigger('out', event, this.instance._uiHash(this.instance));
            this.instance._mouseStop(event, true);
            this.instance.options.helper = this.instance.options._helper;
            this.instance.currentItem.remove();
            if (this.instance.placeholder) {
              this.instance.placeholder.remove();
            }
            inst._trigger('fromSortable', event);
            inst.dropped = false;
          }
        }
      });
    }
  });
  $.ui.plugin.add('draggable', 'cursor', {
    start: function () {
      var t = $('body'), o = $(this).data('ui-draggable').options;
      if (t.css('cursor')) {
        o._cursor = t.css('cursor');
      }
      t.css('cursor', o.cursor);
    },
    stop: function () {
      var o = $(this).data('ui-draggable').options;
      if (o._cursor) {
        $('body').css('cursor', o._cursor);
      }
    }
  });
  $.ui.plugin.add('draggable', 'opacity', {
    start: function (event, ui) {
      var t = $(ui.helper), o = $(this).data('ui-draggable').options;
      if (t.css('opacity')) {
        o._opacity = t.css('opacity');
      }
      t.css('opacity', o.opacity);
    },
    stop: function (event, ui) {
      var o = $(this).data('ui-draggable').options;
      if (o._opacity) {
        $(ui.helper).css('opacity', o._opacity);
      }
    }
  });
  $.ui.plugin.add('draggable', 'scroll', {
    start: function () {
      var i = $(this).data('ui-draggable');
      if (i.scrollParent[0] !== document && i.scrollParent[0].tagName !== 'HTML') {
        i.overflowOffset = i.scrollParent.offset();
      }
    },
    drag: function (event) {
      var i = $(this).data('ui-draggable'), o = i.options, scrolled = false;
      if (i.scrollParent[0] !== document && i.scrollParent[0].tagName !== 'HTML') {
        if (!o.axis || o.axis !== 'x') {
          if (i.overflowOffset.top + i.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
            i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
          } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
            i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
          }
        }
        if (!o.axis || o.axis !== 'y') {
          if (i.overflowOffset.left + i.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
            i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
          } else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
            i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
          }
        }
      } else {
        if (!o.axis || o.axis !== 'x') {
          if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
          } else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
          }
        }
        if (!o.axis || o.axis !== 'y') {
          if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
          } else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
          }
        }
      }
      if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(i, event);
      }
    }
  });
  $.ui.plugin.add('draggable', 'snap', {
    start: function () {
      var i = $(this).data('ui-draggable'), o = i.options;
      i.snapElements = [];
      $(o.snap.constructor !== String ? o.snap.items || ':data(ui-draggable)' : o.snap).each(function () {
        var $t = $(this), $o = $t.offset();
        if (this !== i.element[0]) {
          i.snapElements.push({
            item: this,
            width: $t.outerWidth(),
            height: $t.outerHeight(),
            top: $o.top,
            left: $o.left
          });
        }
      });
    },
    drag: function (event, ui) {
      var ts, bs, ls, rs, l, r, t, b, i, first, inst = $(this).data('ui-draggable'), o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;
      for (i = inst.snapElements.length - 1; i >= 0; i--) {
        l = inst.snapElements[i].left;
        r = l + inst.snapElements[i].width;
        t = inst.snapElements[i].top;
        b = t + inst.snapElements[i].height;
        if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
          if (inst.snapElements[i].snapping) {
            inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item }));
          }
          inst.snapElements[i].snapping = false;
          continue;
        }
        if (o.snapMode !== 'inner') {
          ts = Math.abs(t - y2) <= d;
          bs = Math.abs(b - y1) <= d;
          ls = Math.abs(l - x2) <= d;
          rs = Math.abs(r - x1) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo('relative', {
              top: t - inst.helperProportions.height,
              left: 0
            }).top - inst.margins.top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo('relative', {
              top: b,
              left: 0
            }).top - inst.margins.top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo('relative', {
              top: 0,
              left: l - inst.helperProportions.width
            }).left - inst.margins.left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo('relative', {
              top: 0,
              left: r
            }).left - inst.margins.left;
          }
        }
        first = ts || bs || ls || rs;
        if (o.snapMode !== 'outer') {
          ts = Math.abs(t - y1) <= d;
          bs = Math.abs(b - y2) <= d;
          ls = Math.abs(l - x1) <= d;
          rs = Math.abs(r - x2) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo('relative', {
              top: t,
              left: 0
            }).top - inst.margins.top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo('relative', {
              top: b - inst.helperProportions.height,
              left: 0
            }).top - inst.margins.top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo('relative', {
              top: 0,
              left: l
            }).left - inst.margins.left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo('relative', {
              top: 0,
              left: r - inst.helperProportions.width
            }).left - inst.margins.left;
          }
        }
        if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
          inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item }));
        }
        inst.snapElements[i].snapping = ts || bs || ls || rs || first;
      }
    }
  });
  $.ui.plugin.add('draggable', 'stack', {
    start: function () {
      var min, o = this.data('ui-draggable').options, group = $.makeArray($(o.stack)).sort(function (a, b) {
          return (parseInt($(a).css('zIndex'), 10) || 0) - (parseInt($(b).css('zIndex'), 10) || 0);
        });
      if (!group.length) {
        return;
      }
      min = parseInt($(group[0]).css('zIndex'), 10) || 0;
      $(group).each(function (i) {
        $(this).css('zIndex', min + i);
      });
      this.css('zIndex', min + group.length);
    }
  });
  $.ui.plugin.add('draggable', 'zIndex', {
    start: function (event, ui) {
      var t = $(ui.helper), o = $(this).data('ui-draggable').options;
      if (t.css('zIndex')) {
        o._zIndex = t.css('zIndex');
      }
      t.css('zIndex', o.zIndex);
    },
    stop: function (event, ui) {
      var o = $(this).data('ui-draggable').options;
      if (o._zIndex) {
        $(ui.helper).css('zIndex', o._zIndex);
      }
    }
  });
}(jQuery));
(function ($, undefined) {
  function isOverAxis(x, reference, size) {
    return x > reference && x < reference + size;
  }
  $.widget('ui.droppable', {
    version: '1.10.3',
    widgetEventPrefix: 'drop',
    options: {
      accept: '*',
      activeClass: false,
      addClasses: true,
      greedy: false,
      hoverClass: false,
      scope: 'default',
      tolerance: 'intersect',
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function () {
      var o = this.options, accept = o.accept;
      this.isover = false;
      this.isout = true;
      this.accept = $.isFunction(accept) ? accept : function (d) {
        return d.is(accept);
      };
      this.proportions = {
        width: this.element[0].offsetWidth,
        height: this.element[0].offsetHeight
      };
      $.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [];
      $.ui.ddmanager.droppables[o.scope].push(this);
      o.addClasses && this.element.addClass('ui-droppable');
    },
    _destroy: function () {
      var i = 0, drop = $.ui.ddmanager.droppables[this.options.scope];
      for (; i < drop.length; i++) {
        if (drop[i] === this) {
          drop.splice(i, 1);
        }
      }
      this.element.removeClass('ui-droppable ui-droppable-disabled');
    },
    _setOption: function (key, value) {
      if (key === 'accept') {
        this.accept = $.isFunction(value) ? value : function (d) {
          return d.is(value);
        };
      }
      $.Widget.prototype._setOption.apply(this, arguments);
    },
    _activate: function (event) {
      var draggable = $.ui.ddmanager.current;
      if (this.options.activeClass) {
        this.element.addClass(this.options.activeClass);
      }
      if (draggable) {
        this._trigger('activate', event, this.ui(draggable));
      }
    },
    _deactivate: function (event) {
      var draggable = $.ui.ddmanager.current;
      if (this.options.activeClass) {
        this.element.removeClass(this.options.activeClass);
      }
      if (draggable) {
        this._trigger('deactivate', event, this.ui(draggable));
      }
    },
    _over: function (event) {
      var draggable = $.ui.ddmanager.current;
      if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
        return;
      }
      if (this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
        if (this.options.hoverClass) {
          this.element.addClass(this.options.hoverClass);
        }
        this._trigger('over', event, this.ui(draggable));
      }
    },
    _out: function (event) {
      var draggable = $.ui.ddmanager.current;
      if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
        return;
      }
      if (this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
        if (this.options.hoverClass) {
          this.element.removeClass(this.options.hoverClass);
        }
        this._trigger('out', event, this.ui(draggable));
      }
    },
    _drop: function (event, custom) {
      var draggable = custom || $.ui.ddmanager.current, childrenIntersection = false;
      if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
        return false;
      }
      this.element.find(':data(ui-droppable)').not('.ui-draggable-dragging').each(function () {
        var inst = $.data(this, 'ui-droppable');
        if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && $.ui.intersect(draggable, $.extend(inst, { offset: inst.element.offset() }), inst.options.tolerance)) {
          childrenIntersection = true;
          return false;
        }
      });
      if (childrenIntersection) {
        return false;
      }
      if (this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
        if (this.options.activeClass) {
          this.element.removeClass(this.options.activeClass);
        }
        if (this.options.hoverClass) {
          this.element.removeClass(this.options.hoverClass);
        }
        this._trigger('drop', event, this.ui(draggable));
        return this.element;
      }
      return false;
    },
    ui: function (c) {
      return {
        draggable: c.currentItem || c.element,
        helper: c.helper,
        position: c.position,
        offset: c.positionAbs
      };
    }
  });
  $.ui.intersect = function (draggable, droppable, toleranceMode) {
    if (!droppable.offset) {
      return false;
    }
    var draggableLeft, draggableTop, x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width, y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height, l = droppable.offset.left, r = l + droppable.proportions.width, t = droppable.offset.top, b = t + droppable.proportions.height;
    switch (toleranceMode) {
    case 'fit':
      return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
    case 'intersect':
      return l < x1 + draggable.helperProportions.width / 2 && x2 - draggable.helperProportions.width / 2 < r && t < y1 + draggable.helperProportions.height / 2 && y2 - draggable.helperProportions.height / 2 < b;
    case 'pointer':
      draggableLeft = (draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left;
      draggableTop = (draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top;
      return isOverAxis(draggableTop, t, droppable.proportions.height) && isOverAxis(draggableLeft, l, droppable.proportions.width);
    case 'touch':
      return (y1 >= t && y1 <= b || y2 >= t && y2 <= b || y1 < t && y2 > b) && (x1 >= l && x1 <= r || x2 >= l && x2 <= r || x1 < l && x2 > r);
    default:
      return false;
    }
  };
  $.ui.ddmanager = {
    current: null,
    droppables: { 'default': [] },
    prepareOffsets: function (t, event) {
      var i, j, m = $.ui.ddmanager.droppables[t.options.scope] || [], type = event ? event.type : null, list = (t.currentItem || t.element).find(':data(ui-droppable)').addBack();
      droppablesLoop:
        for (i = 0; i < m.length; i++) {
          if (m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element)) {
            continue;
          }
          for (j = 0; j < list.length; j++) {
            if (list[j] === m[i].element[0]) {
              m[i].proportions.height = 0;
              continue droppablesLoop;
            }
          }
          m[i].visible = m[i].element.css('display') !== 'none';
          if (!m[i].visible) {
            continue;
          }
          if (type === 'mousedown') {
            m[i]._activate.call(m[i], event);
          }
          m[i].offset = m[i].element.offset();
          m[i].proportions = {
            width: m[i].element[0].offsetWidth,
            height: m[i].element[0].offsetHeight
          };
        }
    },
    drop: function (draggable, event) {
      var dropped = false;
      $.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function () {
        if (!this.options) {
          return;
        }
        if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance)) {
          dropped = this._drop.call(this, event) || dropped;
        }
        if (!this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element)) {
          this.isout = true;
          this.isover = false;
          this._deactivate.call(this, event);
        }
      });
      return dropped;
    },
    dragStart: function (draggable, event) {
      draggable.element.parentsUntil('body').bind('scroll.droppable', function () {
        if (!draggable.options.refreshPositions) {
          $.ui.ddmanager.prepareOffsets(draggable, event);
        }
      });
    },
    drag: function (draggable, event) {
      if (draggable.options.refreshPositions) {
        $.ui.ddmanager.prepareOffsets(draggable, event);
      }
      $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function () {
        if (this.options.disabled || this.greedyChild || !this.visible) {
          return;
        }
        var parentInstance, scope, parent, intersects = $.ui.intersect(draggable, this, this.options.tolerance), c = !intersects && this.isover ? 'isout' : intersects && !this.isover ? 'isover' : null;
        if (!c) {
          return;
        }
        if (this.options.greedy) {
          scope = this.options.scope;
          parent = this.element.parents(':data(ui-droppable)').filter(function () {
            return $.data(this, 'ui-droppable').options.scope === scope;
          });
          if (parent.length) {
            parentInstance = $.data(parent[0], 'ui-droppable');
            parentInstance.greedyChild = c === 'isover';
          }
        }
        if (parentInstance && c === 'isover') {
          parentInstance.isover = false;
          parentInstance.isout = true;
          parentInstance._out.call(parentInstance, event);
        }
        this[c] = true;
        this[c === 'isout' ? 'isover' : 'isout'] = false;
        this[c === 'isover' ? '_over' : '_out'].call(this, event);
        if (parentInstance && c === 'isout') {
          parentInstance.isout = false;
          parentInstance.isover = true;
          parentInstance._over.call(parentInstance, event);
        }
      });
    },
    dragStop: function (draggable, event) {
      draggable.element.parentsUntil('body').unbind('scroll.droppable');
      if (!draggable.options.refreshPositions) {
        $.ui.ddmanager.prepareOffsets(draggable, event);
      }
    }
  };
}(jQuery));
(function ($, undefined) {
  function num(v) {
    return parseInt(v, 10) || 0;
  }
  function isNumber(value) {
    return !isNaN(parseInt(value, 10));
  }
  $.widget('ui.resizable', $.ui.mouse, {
    version: '1.10.3',
    widgetEventPrefix: 'resize',
    options: {
      alsoResize: false,
      animate: false,
      animateDuration: 'slow',
      animateEasing: 'swing',
      aspectRatio: false,
      autoHide: false,
      containment: false,
      ghost: false,
      grid: false,
      handles: 'e,s,se',
      helper: false,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 90,
      resize: null,
      start: null,
      stop: null
    },
    _create: function () {
      var n, i, handle, axis, hname, that = this, o = this.options;
      this.element.addClass('ui-resizable');
      $.extend(this, {
        _aspectRatio: !!o.aspectRatio,
        aspectRatio: o.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper: o.helper || o.ghost || o.animate ? o.helper || 'ui-resizable-helper' : null
      });
      if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
        this.element.wrap($('<div class=\'ui-wrapper\' style=\'overflow: hidden;\'></div>').css({
          position: this.element.css('position'),
          width: this.element.outerWidth(),
          height: this.element.outerHeight(),
          top: this.element.css('top'),
          left: this.element.css('left')
        }));
        this.element = this.element.parent().data('ui-resizable', this.element.data('ui-resizable'));
        this.elementIsWrapper = true;
        this.element.css({
          marginLeft: this.originalElement.css('marginLeft'),
          marginTop: this.originalElement.css('marginTop'),
          marginRight: this.originalElement.css('marginRight'),
          marginBottom: this.originalElement.css('marginBottom')
        });
        this.originalElement.css({
          marginLeft: 0,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0
        });
        this.originalResizeStyle = this.originalElement.css('resize');
        this.originalElement.css('resize', 'none');
        this._proportionallyResizeElements.push(this.originalElement.css({
          position: 'static',
          zoom: 1,
          display: 'block'
        }));
        this.originalElement.css({ margin: this.originalElement.css('margin') });
        this._proportionallyResize();
      }
      this.handles = o.handles || (!$('.ui-resizable-handle', this.element).length ? 'e,s,se' : {
        n: '.ui-resizable-n',
        e: '.ui-resizable-e',
        s: '.ui-resizable-s',
        w: '.ui-resizable-w',
        se: '.ui-resizable-se',
        sw: '.ui-resizable-sw',
        ne: '.ui-resizable-ne',
        nw: '.ui-resizable-nw'
      });
      if (this.handles.constructor === String) {
        if (this.handles === 'all') {
          this.handles = 'n,e,s,w,se,sw,ne,nw';
        }
        n = this.handles.split(',');
        this.handles = {};
        for (i = 0; i < n.length; i++) {
          handle = $.trim(n[i]);
          hname = 'ui-resizable-' + handle;
          axis = $('<div class=\'ui-resizable-handle ' + hname + '\'></div>');
          axis.css({ zIndex: o.zIndex });
          if ('se' === handle) {
            axis.addClass('ui-icon ui-icon-gripsmall-diagonal-se');
          }
          this.handles[handle] = '.ui-resizable-' + handle;
          this.element.append(axis);
        }
      }
      this._renderAxis = function (target) {
        var i, axis, padPos, padWrapper;
        target = target || this.element;
        for (i in this.handles) {
          if (this.handles[i].constructor === String) {
            this.handles[i] = $(this.handles[i], this.element).show();
          }
          if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
            axis = $(this.handles[i], this.element);
            padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
            padPos = [
              'padding',
              /ne|nw|n/.test(i) ? 'Top' : /se|sw|s/.test(i) ? 'Bottom' : /^e$/.test(i) ? 'Right' : 'Left'
            ].join('');
            target.css(padPos, padWrapper);
            this._proportionallyResize();
          }
          if (!$(this.handles[i]).length) {
            continue;
          }
        }
      };
      this._renderAxis(this.element);
      this._handles = $('.ui-resizable-handle', this.element).disableSelection();
      this._handles.mouseover(function () {
        if (!that.resizing) {
          if (this.className) {
            axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          }
          that.axis = axis && axis[1] ? axis[1] : 'se';
        }
      });
      if (o.autoHide) {
        this._handles.hide();
        $(this.element).addClass('ui-resizable-autohide').mouseenter(function () {
          if (o.disabled) {
            return;
          }
          $(this).removeClass('ui-resizable-autohide');
          that._handles.show();
        }).mouseleave(function () {
          if (o.disabled) {
            return;
          }
          if (!that.resizing) {
            $(this).addClass('ui-resizable-autohide');
            that._handles.hide();
          }
        });
      }
      this._mouseInit();
    },
    _destroy: function () {
      this._mouseDestroy();
      var wrapper, _destroy = function (exp) {
          $(exp).removeClass('ui-resizable ui-resizable-disabled ui-resizable-resizing').removeData('resizable').removeData('ui-resizable').unbind('.resizable').find('.ui-resizable-handle').remove();
        };
      if (this.elementIsWrapper) {
        _destroy(this.element);
        wrapper = this.element;
        this.originalElement.css({
          position: wrapper.css('position'),
          width: wrapper.outerWidth(),
          height: wrapper.outerHeight(),
          top: wrapper.css('top'),
          left: wrapper.css('left')
        }).insertAfter(wrapper);
        wrapper.remove();
      }
      this.originalElement.css('resize', this.originalResizeStyle);
      _destroy(this.originalElement);
      return this;
    },
    _mouseCapture: function (event) {
      var i, handle, capture = false;
      for (i in this.handles) {
        handle = $(this.handles[i])[0];
        if (handle === event.target || $.contains(handle, event.target)) {
          capture = true;
        }
      }
      return !this.options.disabled && capture;
    },
    _mouseStart: function (event) {
      var curleft, curtop, cursor, o = this.options, iniPos = this.element.position(), el = this.element;
      this.resizing = true;
      if (/absolute/.test(el.css('position'))) {
        el.css({
          position: 'absolute',
          top: el.css('top'),
          left: el.css('left')
        });
      } else if (el.is('.ui-draggable')) {
        el.css({
          position: 'absolute',
          top: iniPos.top,
          left: iniPos.left
        });
      }
      this._renderProxy();
      curleft = num(this.helper.css('left'));
      curtop = num(this.helper.css('top'));
      if (o.containment) {
        curleft += $(o.containment).scrollLeft() || 0;
        curtop += $(o.containment).scrollTop() || 0;
      }
      this.offset = this.helper.offset();
      this.position = {
        left: curleft,
        top: curtop
      };
      this.size = this._helper ? {
        width: el.outerWidth(),
        height: el.outerHeight()
      } : {
        width: el.width(),
        height: el.height()
      };
      this.originalSize = this._helper ? {
        width: el.outerWidth(),
        height: el.outerHeight()
      } : {
        width: el.width(),
        height: el.height()
      };
      this.originalPosition = {
        left: curleft,
        top: curtop
      };
      this.sizeDiff = {
        width: el.outerWidth() - el.width(),
        height: el.outerHeight() - el.height()
      };
      this.originalMousePosition = {
        left: event.pageX,
        top: event.pageY
      };
      this.aspectRatio = typeof o.aspectRatio === 'number' ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
      cursor = $('.ui-resizable-' + this.axis).css('cursor');
      $('body').css('cursor', cursor === 'auto' ? this.axis + '-resize' : cursor);
      el.addClass('ui-resizable-resizing');
      this._propagate('start', event);
      return true;
    },
    _mouseDrag: function (event) {
      var data, el = this.helper, props = {}, smp = this.originalMousePosition, a = this.axis, prevTop = this.position.top, prevLeft = this.position.left, prevWidth = this.size.width, prevHeight = this.size.height, dx = event.pageX - smp.left || 0, dy = event.pageY - smp.top || 0, trigger = this._change[a];
      if (!trigger) {
        return false;
      }
      data = trigger.apply(this, [
        event,
        dx,
        dy
      ]);
      this._updateVirtualBoundaries(event.shiftKey);
      if (this._aspectRatio || event.shiftKey) {
        data = this._updateRatio(data, event);
      }
      data = this._respectSize(data, event);
      this._updateCache(data);
      this._propagate('resize', event);
      if (this.position.top !== prevTop) {
        props.top = this.position.top + 'px';
      }
      if (this.position.left !== prevLeft) {
        props.left = this.position.left + 'px';
      }
      if (this.size.width !== prevWidth) {
        props.width = this.size.width + 'px';
      }
      if (this.size.height !== prevHeight) {
        props.height = this.size.height + 'px';
      }
      el.css(props);
      if (!this._helper && this._proportionallyResizeElements.length) {
        this._proportionallyResize();
      }
      if (!$.isEmptyObject(props)) {
        this._trigger('resize', event, this.ui());
      }
      return false;
    },
    _mouseStop: function (event) {
      this.resizing = false;
      var pr, ista, soffseth, soffsetw, s, left, top, o = this.options, that = this;
      if (this._helper) {
        pr = this._proportionallyResizeElements;
        ista = pr.length && /textarea/i.test(pr[0].nodeName);
        soffseth = ista && $.ui.hasScroll(pr[0], 'left') ? 0 : that.sizeDiff.height;
        soffsetw = ista ? 0 : that.sizeDiff.width;
        s = {
          width: that.helper.width() - soffsetw,
          height: that.helper.height() - soffseth
        };
        left = parseInt(that.element.css('left'), 10) + (that.position.left - that.originalPosition.left) || null;
        top = parseInt(that.element.css('top'), 10) + (that.position.top - that.originalPosition.top) || null;
        if (!o.animate) {
          this.element.css($.extend(s, {
            top: top,
            left: left
          }));
        }
        that.helper.height(that.size.height);
        that.helper.width(that.size.width);
        if (this._helper && !o.animate) {
          this._proportionallyResize();
        }
      }
      $('body').css('cursor', 'auto');
      this.element.removeClass('ui-resizable-resizing');
      this._propagate('stop', event);
      if (this._helper) {
        this.helper.remove();
      }
      return false;
    },
    _updateVirtualBoundaries: function (forceAspectRatio) {
      var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
      b = {
        minWidth: isNumber(o.minWidth) ? o.minWidth : 0,
        maxWidth: isNumber(o.maxWidth) ? o.maxWidth : Infinity,
        minHeight: isNumber(o.minHeight) ? o.minHeight : 0,
        maxHeight: isNumber(o.maxHeight) ? o.maxHeight : Infinity
      };
      if (this._aspectRatio || forceAspectRatio) {
        pMinWidth = b.minHeight * this.aspectRatio;
        pMinHeight = b.minWidth / this.aspectRatio;
        pMaxWidth = b.maxHeight * this.aspectRatio;
        pMaxHeight = b.maxWidth / this.aspectRatio;
        if (pMinWidth > b.minWidth) {
          b.minWidth = pMinWidth;
        }
        if (pMinHeight > b.minHeight) {
          b.minHeight = pMinHeight;
        }
        if (pMaxWidth < b.maxWidth) {
          b.maxWidth = pMaxWidth;
        }
        if (pMaxHeight < b.maxHeight) {
          b.maxHeight = pMaxHeight;
        }
      }
      this._vBoundaries = b;
    },
    _updateCache: function (data) {
      this.offset = this.helper.offset();
      if (isNumber(data.left)) {
        this.position.left = data.left;
      }
      if (isNumber(data.top)) {
        this.position.top = data.top;
      }
      if (isNumber(data.height)) {
        this.size.height = data.height;
      }
      if (isNumber(data.width)) {
        this.size.width = data.width;
      }
    },
    _updateRatio: function (data) {
      var cpos = this.position, csize = this.size, a = this.axis;
      if (isNumber(data.height)) {
        data.width = data.height * this.aspectRatio;
      } else if (isNumber(data.width)) {
        data.height = data.width / this.aspectRatio;
      }
      if (a === 'sw') {
        data.left = cpos.left + (csize.width - data.width);
        data.top = null;
      }
      if (a === 'nw') {
        data.top = cpos.top + (csize.height - data.height);
        data.left = cpos.left + (csize.width - data.width);
      }
      return data;
    },
    _respectSize: function (data) {
      var o = this._vBoundaries, a = this.axis, ismaxw = isNumber(data.width) && o.maxWidth && o.maxWidth < data.width, ismaxh = isNumber(data.height) && o.maxHeight && o.maxHeight < data.height, isminw = isNumber(data.width) && o.minWidth && o.minWidth > data.width, isminh = isNumber(data.height) && o.minHeight && o.minHeight > data.height, dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height, cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
      if (isminw) {
        data.width = o.minWidth;
      }
      if (isminh) {
        data.height = o.minHeight;
      }
      if (ismaxw) {
        data.width = o.maxWidth;
      }
      if (ismaxh) {
        data.height = o.maxHeight;
      }
      if (isminw && cw) {
        data.left = dw - o.minWidth;
      }
      if (ismaxw && cw) {
        data.left = dw - o.maxWidth;
      }
      if (isminh && ch) {
        data.top = dh - o.minHeight;
      }
      if (ismaxh && ch) {
        data.top = dh - o.maxHeight;
      }
      if (!data.width && !data.height && !data.left && data.top) {
        data.top = null;
      } else if (!data.width && !data.height && !data.top && data.left) {
        data.left = null;
      }
      return data;
    },
    _proportionallyResize: function () {
      if (!this._proportionallyResizeElements.length) {
        return;
      }
      var i, j, borders, paddings, prel, element = this.helper || this.element;
      for (i = 0; i < this._proportionallyResizeElements.length; i++) {
        prel = this._proportionallyResizeElements[i];
        if (!this.borderDif) {
          this.borderDif = [];
          borders = [
            prel.css('borderTopWidth'),
            prel.css('borderRightWidth'),
            prel.css('borderBottomWidth'),
            prel.css('borderLeftWidth')
          ];
          paddings = [
            prel.css('paddingTop'),
            prel.css('paddingRight'),
            prel.css('paddingBottom'),
            prel.css('paddingLeft')
          ];
          for (j = 0; j < borders.length; j++) {
            this.borderDif[j] = (parseInt(borders[j], 10) || 0) + (parseInt(paddings[j], 10) || 0);
          }
        }
        prel.css({
          height: element.height() - this.borderDif[0] - this.borderDif[2] || 0,
          width: element.width() - this.borderDif[1] - this.borderDif[3] || 0
        });
      }
    },
    _renderProxy: function () {
      var el = this.element, o = this.options;
      this.elementOffset = el.offset();
      if (this._helper) {
        this.helper = this.helper || $('<div style=\'overflow:hidden;\'></div>');
        this.helper.addClass(this._helper).css({
          width: this.element.outerWidth() - 1,
          height: this.element.outerHeight() - 1,
          position: 'absolute',
          left: this.elementOffset.left + 'px',
          top: this.elementOffset.top + 'px',
          zIndex: ++o.zIndex
        });
        this.helper.appendTo('body').disableSelection();
      } else {
        this.helper = this.element;
      }
    },
    _change: {
      e: function (event, dx) {
        return { width: this.originalSize.width + dx };
      },
      w: function (event, dx) {
        var cs = this.originalSize, sp = this.originalPosition;
        return {
          left: sp.left + dx,
          width: cs.width - dx
        };
      },
      n: function (event, dx, dy) {
        var cs = this.originalSize, sp = this.originalPosition;
        return {
          top: sp.top + dy,
          height: cs.height - dy
        };
      },
      s: function (event, dx, dy) {
        return { height: this.originalSize.height + dy };
      },
      se: function (event, dx, dy) {
        return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [
          event,
          dx,
          dy
        ]));
      },
      sw: function (event, dx, dy) {
        return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [
          event,
          dx,
          dy
        ]));
      },
      ne: function (event, dx, dy) {
        return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [
          event,
          dx,
          dy
        ]));
      },
      nw: function (event, dx, dy) {
        return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [
          event,
          dx,
          dy
        ]));
      }
    },
    _propagate: function (n, event) {
      $.ui.plugin.call(this, n, [
        event,
        this.ui()
      ]);
      n !== 'resize' && this._trigger(n, event, this.ui());
    },
    plugins: {},
    ui: function () {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      };
    }
  });
  $.ui.plugin.add('resizable', 'animate', {
    stop: function (event) {
      var that = $(this).data('ui-resizable'), o = that.options, pr = that._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && $.ui.hasScroll(pr[0], 'left') ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, style = {
          width: that.size.width - soffsetw,
          height: that.size.height - soffseth
        }, left = parseInt(that.element.css('left'), 10) + (that.position.left - that.originalPosition.left) || null, top = parseInt(that.element.css('top'), 10) + (that.position.top - that.originalPosition.top) || null;
      that.element.animate($.extend(style, top && left ? {
        top: top,
        left: left
      } : {}), {
        duration: o.animateDuration,
        easing: o.animateEasing,
        step: function () {
          var data = {
              width: parseInt(that.element.css('width'), 10),
              height: parseInt(that.element.css('height'), 10),
              top: parseInt(that.element.css('top'), 10),
              left: parseInt(that.element.css('left'), 10)
            };
          if (pr && pr.length) {
            $(pr[0]).css({
              width: data.width,
              height: data.height
            });
          }
          that._updateCache(data);
          that._propagate('resize', event);
        }
      });
    }
  });
  $.ui.plugin.add('resizable', 'containment', {
    start: function () {
      var element, p, co, ch, cw, width, height, that = $(this).data('ui-resizable'), o = that.options, el = that.element, oc = o.containment, ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
      if (!ce) {
        return;
      }
      that.containerElement = $(ce);
      if (/document/.test(oc) || oc === document) {
        that.containerOffset = {
          left: 0,
          top: 0
        };
        that.containerPosition = {
          left: 0,
          top: 0
        };
        that.parentData = {
          element: $(document),
          left: 0,
          top: 0,
          width: $(document).width(),
          height: $(document).height() || document.body.parentNode.scrollHeight
        };
      } else {
        element = $(ce);
        p = [];
        $([
          'Top',
          'Right',
          'Left',
          'Bottom'
        ]).each(function (i, name) {
          p[i] = num(element.css('padding' + name));
        });
        that.containerOffset = element.offset();
        that.containerPosition = element.position();
        that.containerSize = {
          height: element.innerHeight() - p[3],
          width: element.innerWidth() - p[1]
        };
        co = that.containerOffset;
        ch = that.containerSize.height;
        cw = that.containerSize.width;
        width = $.ui.hasScroll(ce, 'left') ? ce.scrollWidth : cw;
        height = $.ui.hasScroll(ce) ? ce.scrollHeight : ch;
        that.parentData = {
          element: ce,
          left: co.left,
          top: co.top,
          width: width,
          height: height
        };
      }
    },
    resize: function (event) {
      var woset, hoset, isParent, isOffsetRelative, that = $(this).data('ui-resizable'), o = that.options, co = that.containerOffset, cp = that.position, pRatio = that._aspectRatio || event.shiftKey, cop = {
          top: 0,
          left: 0
        }, ce = that.containerElement;
      if (ce[0] !== document && /static/.test(ce.css('position'))) {
        cop = co;
      }
      if (cp.left < (that._helper ? co.left : 0)) {
        that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left);
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
        }
        that.position.left = o.helper ? co.left : 0;
      }
      if (cp.top < (that._helper ? co.top : 0)) {
        that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top);
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
        }
        that.position.top = that._helper ? co.top : 0;
      }
      that.offset.left = that.parentData.left + that.position.left;
      that.offset.top = that.parentData.top + that.position.top;
      woset = Math.abs((that._helper ? that.offset.left - cop.left : that.offset.left - cop.left) + that.sizeDiff.width);
      hoset = Math.abs((that._helper ? that.offset.top - cop.top : that.offset.top - co.top) + that.sizeDiff.height);
      isParent = that.containerElement.get(0) === that.element.parent().get(0);
      isOffsetRelative = /relative|absolute/.test(that.containerElement.css('position'));
      if (isParent && isOffsetRelative) {
        woset -= that.parentData.left;
      }
      if (woset + that.size.width >= that.parentData.width) {
        that.size.width = that.parentData.width - woset;
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
        }
      }
      if (hoset + that.size.height >= that.parentData.height) {
        that.size.height = that.parentData.height - hoset;
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
        }
      }
    },
    stop: function () {
      var that = $(this).data('ui-resizable'), o = that.options, co = that.containerOffset, cop = that.containerPosition, ce = that.containerElement, helper = $(that.helper), ho = helper.offset(), w = helper.outerWidth() - that.sizeDiff.width, h = helper.outerHeight() - that.sizeDiff.height;
      if (that._helper && !o.animate && /relative/.test(ce.css('position'))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
      if (that._helper && !o.animate && /static/.test(ce.css('position'))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
    }
  });
  $.ui.plugin.add('resizable', 'alsoResize', {
    start: function () {
      var that = $(this).data('ui-resizable'), o = that.options, _store = function (exp) {
          $(exp).each(function () {
            var el = $(this);
            el.data('ui-resizable-alsoresize', {
              width: parseInt(el.width(), 10),
              height: parseInt(el.height(), 10),
              left: parseInt(el.css('left'), 10),
              top: parseInt(el.css('top'), 10)
            });
          });
        };
      if (typeof o.alsoResize === 'object' && !o.alsoResize.parentNode) {
        if (o.alsoResize.length) {
          o.alsoResize = o.alsoResize[0];
          _store(o.alsoResize);
        } else {
          $.each(o.alsoResize, function (exp) {
            _store(exp);
          });
        }
      } else {
        _store(o.alsoResize);
      }
    },
    resize: function (event, ui) {
      var that = $(this).data('ui-resizable'), o = that.options, os = that.originalSize, op = that.originalPosition, delta = {
          height: that.size.height - os.height || 0,
          width: that.size.width - os.width || 0,
          top: that.position.top - op.top || 0,
          left: that.position.left - op.left || 0
        }, _alsoResize = function (exp, c) {
          $(exp).each(function () {
            var el = $(this), start = $(this).data('ui-resizable-alsoresize'), style = {}, css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? [
                'width',
                'height'
              ] : [
                'width',
                'height',
                'top',
                'left'
              ];
            $.each(css, function (i, prop) {
              var sum = (start[prop] || 0) + (delta[prop] || 0);
              if (sum && sum >= 0) {
                style[prop] = sum || null;
              }
            });
            el.css(style);
          });
        };
      if (typeof o.alsoResize === 'object' && !o.alsoResize.nodeType) {
        $.each(o.alsoResize, function (exp, c) {
          _alsoResize(exp, c);
        });
      } else {
        _alsoResize(o.alsoResize);
      }
    },
    stop: function () {
      $(this).removeData('resizable-alsoresize');
    }
  });
  $.ui.plugin.add('resizable', 'ghost', {
    start: function () {
      var that = $(this).data('ui-resizable'), o = that.options, cs = that.size;
      that.ghost = that.originalElement.clone();
      that.ghost.css({
        opacity: 0.25,
        display: 'block',
        position: 'relative',
        height: cs.height,
        width: cs.width,
        margin: 0,
        left: 0,
        top: 0
      }).addClass('ui-resizable-ghost').addClass(typeof o.ghost === 'string' ? o.ghost : '');
      that.ghost.appendTo(that.helper);
    },
    resize: function () {
      var that = $(this).data('ui-resizable');
      if (that.ghost) {
        that.ghost.css({
          position: 'relative',
          height: that.size.height,
          width: that.size.width
        });
      }
    },
    stop: function () {
      var that = $(this).data('ui-resizable');
      if (that.ghost && that.helper) {
        that.helper.get(0).removeChild(that.ghost.get(0));
      }
    }
  });
  $.ui.plugin.add('resizable', 'grid', {
    resize: function () {
      var that = $(this).data('ui-resizable'), o = that.options, cs = that.size, os = that.originalSize, op = that.originalPosition, a = that.axis, grid = typeof o.grid === 'number' ? [
          o.grid,
          o.grid
        ] : o.grid, gridX = grid[0] || 1, gridY = grid[1] || 1, ox = Math.round((cs.width - os.width) / gridX) * gridX, oy = Math.round((cs.height - os.height) / gridY) * gridY, newWidth = os.width + ox, newHeight = os.height + oy, isMaxWidth = o.maxWidth && o.maxWidth < newWidth, isMaxHeight = o.maxHeight && o.maxHeight < newHeight, isMinWidth = o.minWidth && o.minWidth > newWidth, isMinHeight = o.minHeight && o.minHeight > newHeight;
      o.grid = grid;
      if (isMinWidth) {
        newWidth = newWidth + gridX;
      }
      if (isMinHeight) {
        newHeight = newHeight + gridY;
      }
      if (isMaxWidth) {
        newWidth = newWidth - gridX;
      }
      if (isMaxHeight) {
        newHeight = newHeight - gridY;
      }
      if (/^(se|s|e)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
      } else if (/^(ne)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.top = op.top - oy;
      } else if (/^(sw)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.left = op.left - ox;
      } else {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.top = op.top - oy;
        that.position.left = op.left - ox;
      }
    }
  });
}(jQuery));
(function ($, undefined) {
  $.widget('ui.selectable', $.ui.mouse, {
    version: '1.10.3',
    options: {
      appendTo: 'body',
      autoRefresh: true,
      distance: 0,
      filter: '*',
      tolerance: 'touch',
      selected: null,
      selecting: null,
      start: null,
      stop: null,
      unselected: null,
      unselecting: null
    },
    _create: function () {
      var selectees, that = this;
      this.element.addClass('ui-selectable');
      this.dragged = false;
      this.refresh = function () {
        selectees = $(that.options.filter, that.element[0]);
        selectees.addClass('ui-selectee');
        selectees.each(function () {
          var $this = $(this), pos = $this.offset();
          $.data(this, 'selectable-item', {
            element: this,
            $element: $this,
            left: pos.left,
            top: pos.top,
            right: pos.left + $this.outerWidth(),
            bottom: pos.top + $this.outerHeight(),
            startselected: false,
            selected: $this.hasClass('ui-selected'),
            selecting: $this.hasClass('ui-selecting'),
            unselecting: $this.hasClass('ui-unselecting')
          });
        });
      };
      this.refresh();
      this.selectees = selectees.addClass('ui-selectee');
      this._mouseInit();
      this.helper = $('<div class=\'ui-selectable-helper\'></div>');
    },
    _destroy: function () {
      this.selectees.removeClass('ui-selectee').removeData('selectable-item');
      this.element.removeClass('ui-selectable ui-selectable-disabled');
      this._mouseDestroy();
    },
    _mouseStart: function (event) {
      var that = this, options = this.options;
      this.opos = [
        event.pageX,
        event.pageY
      ];
      if (this.options.disabled) {
        return;
      }
      this.selectees = $(options.filter, this.element[0]);
      this._trigger('start', event);
      $(options.appendTo).append(this.helper);
      this.helper.css({
        'left': event.pageX,
        'top': event.pageY,
        'width': 0,
        'height': 0
      });
      if (options.autoRefresh) {
        this.refresh();
      }
      this.selectees.filter('.ui-selected').each(function () {
        var selectee = $.data(this, 'selectable-item');
        selectee.startselected = true;
        if (!event.metaKey && !event.ctrlKey) {
          selectee.$element.removeClass('ui-selected');
          selectee.selected = false;
          selectee.$element.addClass('ui-unselecting');
          selectee.unselecting = true;
          that._trigger('unselecting', event, { unselecting: selectee.element });
        }
      });
      $(event.target).parents().addBack().each(function () {
        var doSelect, selectee = $.data(this, 'selectable-item');
        if (selectee) {
          doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass('ui-selected');
          selectee.$element.removeClass(doSelect ? 'ui-unselecting' : 'ui-selected').addClass(doSelect ? 'ui-selecting' : 'ui-unselecting');
          selectee.unselecting = !doSelect;
          selectee.selecting = doSelect;
          selectee.selected = doSelect;
          if (doSelect) {
            that._trigger('selecting', event, { selecting: selectee.element });
          } else {
            that._trigger('unselecting', event, { unselecting: selectee.element });
          }
          return false;
        }
      });
    },
    _mouseDrag: function (event) {
      this.dragged = true;
      if (this.options.disabled) {
        return;
      }
      var tmp, that = this, options = this.options, x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
      if (x1 > x2) {
        tmp = x2;
        x2 = x1;
        x1 = tmp;
      }
      if (y1 > y2) {
        tmp = y2;
        y2 = y1;
        y1 = tmp;
      }
      this.helper.css({
        left: x1,
        top: y1,
        width: x2 - x1,
        height: y2 - y1
      });
      this.selectees.each(function () {
        var selectee = $.data(this, 'selectable-item'), hit = false;
        if (!selectee || selectee.element === that.element[0]) {
          return;
        }
        if (options.tolerance === 'touch') {
          hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1);
        } else if (options.tolerance === 'fit') {
          hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2;
        }
        if (hit) {
          if (selectee.selected) {
            selectee.$element.removeClass('ui-selected');
            selectee.selected = false;
          }
          if (selectee.unselecting) {
            selectee.$element.removeClass('ui-unselecting');
            selectee.unselecting = false;
          }
          if (!selectee.selecting) {
            selectee.$element.addClass('ui-selecting');
            selectee.selecting = true;
            that._trigger('selecting', event, { selecting: selectee.element });
          }
        } else {
          if (selectee.selecting) {
            if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
              selectee.$element.removeClass('ui-selecting');
              selectee.selecting = false;
              selectee.$element.addClass('ui-selected');
              selectee.selected = true;
            } else {
              selectee.$element.removeClass('ui-selecting');
              selectee.selecting = false;
              if (selectee.startselected) {
                selectee.$element.addClass('ui-unselecting');
                selectee.unselecting = true;
              }
              that._trigger('unselecting', event, { unselecting: selectee.element });
            }
          }
          if (selectee.selected) {
            if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
              selectee.$element.removeClass('ui-selected');
              selectee.selected = false;
              selectee.$element.addClass('ui-unselecting');
              selectee.unselecting = true;
              that._trigger('unselecting', event, { unselecting: selectee.element });
            }
          }
        }
      });
      return false;
    },
    _mouseStop: function (event) {
      var that = this;
      this.dragged = false;
      $('.ui-unselecting', this.element[0]).each(function () {
        var selectee = $.data(this, 'selectable-item');
        selectee.$element.removeClass('ui-unselecting');
        selectee.unselecting = false;
        selectee.startselected = false;
        that._trigger('unselected', event, { unselected: selectee.element });
      });
      $('.ui-selecting', this.element[0]).each(function () {
        var selectee = $.data(this, 'selectable-item');
        selectee.$element.removeClass('ui-selecting').addClass('ui-selected');
        selectee.selecting = false;
        selectee.selected = true;
        selectee.startselected = true;
        that._trigger('selected', event, { selected: selectee.element });
      });
      this._trigger('stop', event);
      this.helper.remove();
      return false;
    }
  });
}(jQuery));
(function ($, undefined) {
  function isOverAxis(x, reference, size) {
    return x > reference && x < reference + size;
  }
  function isFloating(item) {
    return /left|right/.test(item.css('float')) || /inline|table-cell/.test(item.css('display'));
  }
  $.widget('ui.sortable', $.ui.mouse, {
    version: '1.10.3',
    widgetEventPrefix: 'sort',
    ready: false,
    options: {
      appendTo: 'parent',
      axis: false,
      connectWith: false,
      containment: false,
      cursor: 'auto',
      cursorAt: false,
      dropOnEmpty: true,
      forcePlaceholderSize: false,
      forceHelperSize: false,
      grid: false,
      handle: false,
      helper: 'original',
      items: '> *',
      opacity: false,
      placeholder: false,
      revert: false,
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: 'default',
      tolerance: 'intersect',
      zIndex: 1000,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },
    _create: function () {
      var o = this.options;
      this.containerCache = {};
      this.element.addClass('ui-sortable');
      this.refresh();
      this.floating = this.items.length ? o.axis === 'x' || isFloating(this.items[0].item) : false;
      this.offset = this.element.offset();
      this._mouseInit();
      this.ready = true;
    },
    _destroy: function () {
      this.element.removeClass('ui-sortable ui-sortable-disabled');
      this._mouseDestroy();
      for (var i = this.items.length - 1; i >= 0; i--) {
        this.items[i].item.removeData(this.widgetName + '-item');
      }
      return this;
    },
    _setOption: function (key, value) {
      if (key === 'disabled') {
        this.options[key] = value;
        this.widget().toggleClass('ui-sortable-disabled', !!value);
      } else {
        $.Widget.prototype._setOption.apply(this, arguments);
      }
    },
    _mouseCapture: function (event, overrideHandle) {
      var currentItem = null, validHandle = false, that = this;
      if (this.reverting) {
        return false;
      }
      if (this.options.disabled || this.options.type === 'static') {
        return false;
      }
      this._refreshItems(event);
      $(event.target).parents().each(function () {
        if ($.data(this, that.widgetName + '-item') === that) {
          currentItem = $(this);
          return false;
        }
      });
      if ($.data(event.target, that.widgetName + '-item') === that) {
        currentItem = $(event.target);
      }
      if (!currentItem) {
        return false;
      }
      if (this.options.handle && !overrideHandle) {
        $(this.options.handle, currentItem).find('*').addBack().each(function () {
          if (this === event.target) {
            validHandle = true;
          }
        });
        if (!validHandle) {
          return false;
        }
      }
      this.currentItem = currentItem;
      this._removeCurrentsFromItems();
      return true;
    },
    _mouseStart: function (event, overrideHandle, noActivation) {
      var i, body, o = this.options;
      this.currentContainer = this;
      this.refreshPositions();
      this.helper = this._createHelper(event);
      this._cacheHelperProportions();
      this._cacheMargins();
      this.scrollParent = this.helper.scrollParent();
      this.offset = this.currentItem.offset();
      this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      };
      $.extend(this.offset, {
        click: {
          left: event.pageX - this.offset.left,
          top: event.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      });
      this.helper.css('position', 'absolute');
      this.cssPosition = this.helper.css('position');
      this.originalPosition = this._generatePosition(event);
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY;
      o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);
      this.domPosition = {
        prev: this.currentItem.prev()[0],
        parent: this.currentItem.parent()[0]
      };
      if (this.helper[0] !== this.currentItem[0]) {
        this.currentItem.hide();
      }
      this._createPlaceholder();
      if (o.containment) {
        this._setContainment();
      }
      if (o.cursor && o.cursor !== 'auto') {
        body = this.document.find('body');
        this.storedCursor = body.css('cursor');
        body.css('cursor', o.cursor);
        this.storedStylesheet = $('<style>*{ cursor: ' + o.cursor + ' !important; }</style>').appendTo(body);
      }
      if (o.opacity) {
        if (this.helper.css('opacity')) {
          this._storedOpacity = this.helper.css('opacity');
        }
        this.helper.css('opacity', o.opacity);
      }
      if (o.zIndex) {
        if (this.helper.css('zIndex')) {
          this._storedZIndex = this.helper.css('zIndex');
        }
        this.helper.css('zIndex', o.zIndex);
      }
      if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== 'HTML') {
        this.overflowOffset = this.scrollParent.offset();
      }
      this._trigger('start', event, this._uiHash());
      if (!this._preserveHelperProportions) {
        this._cacheHelperProportions();
      }
      if (!noActivation) {
        for (i = this.containers.length - 1; i >= 0; i--) {
          this.containers[i]._trigger('activate', event, this._uiHash(this));
        }
      }
      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }
      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      }
      this.dragging = true;
      this.helper.addClass('ui-sortable-helper');
      this._mouseDrag(event);
      return true;
    },
    _mouseDrag: function (event) {
      var i, item, itemElement, intersection, o = this.options, scrolled = false;
      this.position = this._generatePosition(event);
      this.positionAbs = this._convertPositionTo('absolute');
      if (!this.lastPositionAbs) {
        this.lastPositionAbs = this.positionAbs;
      }
      if (this.options.scroll) {
        if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== 'HTML') {
          if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
            this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
          } else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
            this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
          }
          if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
            this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
          } else if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
            this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
          }
        } else {
          if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
          } else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
          }
          if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
          } else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
          }
        }
        if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(this, event);
        }
      }
      this.positionAbs = this._convertPositionTo('absolute');
      if (!this.options.axis || this.options.axis !== 'y') {
        this.helper[0].style.left = this.position.left + 'px';
      }
      if (!this.options.axis || this.options.axis !== 'x') {
        this.helper[0].style.top = this.position.top + 'px';
      }
      for (i = this.items.length - 1; i >= 0; i--) {
        item = this.items[i];
        itemElement = item.item[0];
        intersection = this._intersectsWithPointer(item);
        if (!intersection) {
          continue;
        }
        if (item.instance !== this.currentContainer) {
          continue;
        }
        if (itemElement !== this.currentItem[0] && this.placeholder[intersection === 1 ? 'next' : 'prev']()[0] !== itemElement && !$.contains(this.placeholder[0], itemElement) && (this.options.type === 'semi-dynamic' ? !$.contains(this.element[0], itemElement) : true)) {
          this.direction = intersection === 1 ? 'down' : 'up';
          if (this.options.tolerance === 'pointer' || this._intersectsWithSides(item)) {
            this._rearrange(event, item);
          } else {
            break;
          }
          this._trigger('change', event, this._uiHash());
          break;
        }
      }
      this._contactContainers(event);
      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }
      this._trigger('sort', event, this._uiHash());
      this.lastPositionAbs = this.positionAbs;
      return false;
    },
    _mouseStop: function (event, noPropagation) {
      if (!event) {
        return;
      }
      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        $.ui.ddmanager.drop(this, event);
      }
      if (this.options.revert) {
        var that = this, cur = this.placeholder.offset(), axis = this.options.axis, animation = {};
        if (!axis || axis === 'x') {
          animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft);
        }
        if (!axis || axis === 'y') {
          animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);
        }
        this.reverting = true;
        $(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function () {
          that._clear(event);
        });
      } else {
        this._clear(event, noPropagation);
      }
      return false;
    },
    cancel: function () {
      if (this.dragging) {
        this._mouseUp({ target: null });
        if (this.options.helper === 'original') {
          this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper');
        } else {
          this.currentItem.show();
        }
        for (var i = this.containers.length - 1; i >= 0; i--) {
          this.containers[i]._trigger('deactivate', null, this._uiHash(this));
          if (this.containers[i].containerCache.over) {
            this.containers[i]._trigger('out', null, this._uiHash(this));
            this.containers[i].containerCache.over = 0;
          }
        }
      }
      if (this.placeholder) {
        if (this.placeholder[0].parentNode) {
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
        }
        if (this.options.helper !== 'original' && this.helper && this.helper[0].parentNode) {
          this.helper.remove();
        }
        $.extend(this, {
          helper: null,
          dragging: false,
          reverting: false,
          _noFinalSort: null
        });
        if (this.domPosition.prev) {
          $(this.domPosition.prev).after(this.currentItem);
        } else {
          $(this.domPosition.parent).prepend(this.currentItem);
        }
      }
      return this;
    },
    serialize: function (o) {
      var items = this._getItemsAsjQuery(o && o.connected), str = [];
      o = o || {};
      $(items).each(function () {
        var res = ($(o.item || this).attr(o.attribute || 'id') || '').match(o.expression || /(.+)[\-=_](.+)/);
        if (res) {
          str.push((o.key || res[1] + '[]') + '=' + (o.key && o.expression ? res[1] : res[2]));
        }
      });
      if (!str.length && o.key) {
        str.push(o.key + '=');
      }
      return str.join('&');
    },
    toArray: function (o) {
      var items = this._getItemsAsjQuery(o && o.connected), ret = [];
      o = o || {};
      items.each(function () {
        ret.push($(o.item || this).attr(o.attribute || 'id') || '');
      });
      return ret;
    },
    _intersectsWith: function (item) {
      var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width, y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height, l = item.left, r = l + item.width, t = item.top, b = t + item.height, dyClick = this.offset.click.top, dxClick = this.offset.click.left, isOverElementHeight = this.options.axis === 'x' || y1 + dyClick > t && y1 + dyClick < b, isOverElementWidth = this.options.axis === 'y' || x1 + dxClick > l && x1 + dxClick < r, isOverElement = isOverElementHeight && isOverElementWidth;
      if (this.options.tolerance === 'pointer' || this.options.forcePointerForContainers || this.options.tolerance !== 'pointer' && this.helperProportions[this.floating ? 'width' : 'height'] > item[this.floating ? 'width' : 'height']) {
        return isOverElement;
      } else {
        return l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b;
      }
    },
    _intersectsWithPointer: function (item) {
      var isOverElementHeight = this.options.axis === 'x' || isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height), isOverElementWidth = this.options.axis === 'y' || isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width), isOverElement = isOverElementHeight && isOverElementWidth, verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
      if (!isOverElement) {
        return false;
      }
      return this.floating ? horizontalDirection && horizontalDirection === 'right' || verticalDirection === 'down' ? 2 : 1 : verticalDirection && (verticalDirection === 'down' ? 2 : 1);
    },
    _intersectsWithSides: function (item) {
      var isOverBottomHalf = isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height), isOverRightHalf = isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width), verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
      if (this.floating && horizontalDirection) {
        return horizontalDirection === 'right' && isOverRightHalf || horizontalDirection === 'left' && !isOverRightHalf;
      } else {
        return verticalDirection && (verticalDirection === 'down' && isOverBottomHalf || verticalDirection === 'up' && !isOverBottomHalf);
      }
    },
    _getDragVerticalDirection: function () {
      var delta = this.positionAbs.top - this.lastPositionAbs.top;
      return delta !== 0 && (delta > 0 ? 'down' : 'up');
    },
    _getDragHorizontalDirection: function () {
      var delta = this.positionAbs.left - this.lastPositionAbs.left;
      return delta !== 0 && (delta > 0 ? 'right' : 'left');
    },
    refresh: function (event) {
      this._refreshItems(event);
      this.refreshPositions();
      return this;
    },
    _connectWith: function () {
      var options = this.options;
      return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
    },
    _getItemsAsjQuery: function (connected) {
      var i, j, cur, inst, items = [], queries = [], connectWith = this._connectWith();
      if (connectWith && connected) {
        for (i = connectWith.length - 1; i >= 0; i--) {
          cur = $(connectWith[i]);
          for (j = cur.length - 1; j >= 0; j--) {
            inst = $.data(cur[j], this.widgetFullName);
            if (inst && inst !== this && !inst.options.disabled) {
              queries.push([
                $.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
                inst
              ]);
            }
          }
        }
      }
      queries.push([
        $.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
          options: this.options,
          item: this.currentItem
        }) : $(this.options.items, this.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
        this
      ]);
      for (i = queries.length - 1; i >= 0; i--) {
        queries[i][0].each(function () {
          items.push(this);
        });
      }
      return $(items);
    },
    _removeCurrentsFromItems: function () {
      var list = this.currentItem.find(':data(' + this.widgetName + '-item)');
      this.items = $.grep(this.items, function (item) {
        for (var j = 0; j < list.length; j++) {
          if (list[j] === item.item[0]) {
            return false;
          }
        }
        return true;
      });
    },
    _refreshItems: function (event) {
      this.items = [];
      this.containers = [this];
      var i, j, cur, inst, targetData, _queries, item, queriesLength, items = this.items, queries = [[
            $.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element),
            this
          ]], connectWith = this._connectWith();
      if (connectWith && this.ready) {
        for (i = connectWith.length - 1; i >= 0; i--) {
          cur = $(connectWith[i]);
          for (j = cur.length - 1; j >= 0; j--) {
            inst = $.data(cur[j], this.widgetFullName);
            if (inst && inst !== this && !inst.options.disabled) {
              queries.push([
                $.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element),
                inst
              ]);
              this.containers.push(inst);
            }
          }
        }
      }
      for (i = queries.length - 1; i >= 0; i--) {
        targetData = queries[i][1];
        _queries = queries[i][0];
        for (j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
          item = $(_queries[j]);
          item.data(this.widgetName + '-item', targetData);
          items.push({
            item: item,
            instance: targetData,
            width: 0,
            height: 0,
            left: 0,
            top: 0
          });
        }
      }
    },
    refreshPositions: function (fast) {
      if (this.offsetParent && this.helper) {
        this.offset.parent = this._getParentOffset();
      }
      var i, item, t, p;
      for (i = this.items.length - 1; i >= 0; i--) {
        item = this.items[i];
        if (item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
          continue;
        }
        t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;
        if (!fast) {
          item.width = t.outerWidth();
          item.height = t.outerHeight();
        }
        p = t.offset();
        item.left = p.left;
        item.top = p.top;
      }
      if (this.options.custom && this.options.custom.refreshContainers) {
        this.options.custom.refreshContainers.call(this);
      } else {
        for (i = this.containers.length - 1; i >= 0; i--) {
          p = this.containers[i].element.offset();
          this.containers[i].containerCache.left = p.left;
          this.containers[i].containerCache.top = p.top;
          this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
          this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
        }
      }
      return this;
    },
    _createPlaceholder: function (that) {
      that = that || this;
      var className, o = that.options;
      if (!o.placeholder || o.placeholder.constructor === String) {
        className = o.placeholder;
        o.placeholder = {
          element: function () {
            var nodeName = that.currentItem[0].nodeName.toLowerCase(), element = $('<' + nodeName + '>', that.document[0]).addClass(className || that.currentItem[0].className + ' ui-sortable-placeholder').removeClass('ui-sortable-helper');
            if (nodeName === 'tr') {
              that.currentItem.children().each(function () {
                $('<td>&#160;</td>', that.document[0]).attr('colspan', $(this).attr('colspan') || 1).appendTo(element);
              });
            } else if (nodeName === 'img') {
              element.attr('src', that.currentItem.attr('src'));
            }
            if (!className) {
              element.css('visibility', 'hidden');
            }
            return element;
          },
          update: function (container, p) {
            if (className && !o.forcePlaceholderSize) {
              return;
            }
            if (!p.height()) {
              p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css('paddingTop') || 0, 10) - parseInt(that.currentItem.css('paddingBottom') || 0, 10));
            }
            if (!p.width()) {
              p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css('paddingLeft') || 0, 10) - parseInt(that.currentItem.css('paddingRight') || 0, 10));
            }
          }
        };
      }
      that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));
      that.currentItem.after(that.placeholder);
      o.placeholder.update(that, that.placeholder);
    },
    _contactContainers: function (event) {
      var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, base, cur, nearBottom, floating, innermostContainer = null, innermostIndex = null;
      for (i = this.containers.length - 1; i >= 0; i--) {
        if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
          continue;
        }
        if (this._intersectsWith(this.containers[i].containerCache)) {
          if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
            continue;
          }
          innermostContainer = this.containers[i];
          innermostIndex = i;
        } else {
          if (this.containers[i].containerCache.over) {
            this.containers[i]._trigger('out', event, this._uiHash(this));
            this.containers[i].containerCache.over = 0;
          }
        }
      }
      if (!innermostContainer) {
        return;
      }
      if (this.containers.length === 1) {
        if (!this.containers[innermostIndex].containerCache.over) {
          this.containers[innermostIndex]._trigger('over', event, this._uiHash(this));
          this.containers[innermostIndex].containerCache.over = 1;
        }
      } else {
        dist = 10000;
        itemWithLeastDistance = null;
        floating = innermostContainer.floating || isFloating(this.currentItem);
        posProperty = floating ? 'left' : 'top';
        sizeProperty = floating ? 'width' : 'height';
        base = this.positionAbs[posProperty] + this.offset.click[posProperty];
        for (j = this.items.length - 1; j >= 0; j--) {
          if (!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
            continue;
          }
          if (this.items[j].item[0] === this.currentItem[0]) {
            continue;
          }
          if (floating && !isOverAxis(this.positionAbs.top + this.offset.click.top, this.items[j].top, this.items[j].height)) {
            continue;
          }
          cur = this.items[j].item.offset()[posProperty];
          nearBottom = false;
          if (Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base)) {
            nearBottom = true;
            cur += this.items[j][sizeProperty];
          }
          if (Math.abs(cur - base) < dist) {
            dist = Math.abs(cur - base);
            itemWithLeastDistance = this.items[j];
            this.direction = nearBottom ? 'up' : 'down';
          }
        }
        if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
          return;
        }
        if (this.currentContainer === this.containers[innermostIndex]) {
          return;
        }
        itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
        this._trigger('change', event, this._uiHash());
        this.containers[innermostIndex]._trigger('change', event, this._uiHash(this));
        this.currentContainer = this.containers[innermostIndex];
        this.options.placeholder.update(this.currentContainer, this.placeholder);
        this.containers[innermostIndex]._trigger('over', event, this._uiHash(this));
        this.containers[innermostIndex].containerCache.over = 1;
      }
    },
    _createHelper: function (event) {
      var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [
          event,
          this.currentItem
        ])) : o.helper === 'clone' ? this.currentItem.clone() : this.currentItem;
      if (!helper.parents('body').length) {
        $(o.appendTo !== 'parent' ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
      }
      if (helper[0] === this.currentItem[0]) {
        this._storedCSS = {
          width: this.currentItem[0].style.width,
          height: this.currentItem[0].style.height,
          position: this.currentItem.css('position'),
          top: this.currentItem.css('top'),
          left: this.currentItem.css('left')
        };
      }
      if (!helper[0].style.width || o.forceHelperSize) {
        helper.width(this.currentItem.width());
      }
      if (!helper[0].style.height || o.forceHelperSize) {
        helper.height(this.currentItem.height());
      }
      return helper;
    },
    _adjustOffsetFromHelper: function (obj) {
      if (typeof obj === 'string') {
        obj = obj.split(' ');
      }
      if ($.isArray(obj)) {
        obj = {
          left: +obj[0],
          top: +obj[1] || 0
        };
      }
      if ('left' in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }
      if ('right' in obj) {
        this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
      }
      if ('top' in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }
      if ('bottom' in obj) {
        this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var po = this.offsetParent.offset();
      if (this.cssPosition === 'absolute' && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }
      if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === 'html' && $.ui.ie) {
        po = {
          top: 0,
          left: 0
        };
      }
      return {
        top: po.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
        left: po.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
      };
    },
    _getRelativeOffset: function () {
      if (this.cssPosition === 'relative') {
        var p = this.currentItem.position();
        return {
          top: p.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
          left: p.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
        top: parseInt(this.currentItem.css('marginTop'), 10) || 0
      };
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function () {
      var ce, co, over, o = this.options;
      if (o.containment === 'parent') {
        o.containment = this.helper[0].parentNode;
      }
      if (o.containment === 'document' || o.containment === 'window') {
        this.containment = [
          0 - this.offset.relative.left - this.offset.parent.left,
          0 - this.offset.relative.top - this.offset.parent.top,
          $(o.containment === 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
          ($(o.containment === 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
        ];
      }
      if (!/^(document|window|parent)$/.test(o.containment)) {
        ce = $(o.containment)[0];
        co = $(o.containment).offset();
        over = $(ce).css('overflow') !== 'hidden';
        this.containment = [
          co.left + (parseInt($(ce).css('borderLeftWidth'), 10) || 0) + (parseInt($(ce).css('paddingLeft'), 10) || 0) - this.margins.left,
          co.top + (parseInt($(ce).css('borderTopWidth'), 10) || 0) + (parseInt($(ce).css('paddingTop'), 10) || 0) - this.margins.top,
          co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css('borderLeftWidth'), 10) || 0) - (parseInt($(ce).css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left,
          co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css('borderTopWidth'), 10) || 0) - (parseInt($(ce).css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top
        ];
      }
    },
    _convertPositionTo: function (d, pos) {
      if (!pos) {
        pos = this.position;
      }
      var mod = d === 'absolute' ? 1 : -1, scroll = this.cssPosition === 'absolute' && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
      return {
        top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - (this.cssPosition === 'fixed' ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
        left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - (this.cssPosition === 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
      };
    },
    _generatePosition: function (event) {
      var top, left, o = this.options, pageX = event.pageX, pageY = event.pageY, scroll = this.cssPosition === 'absolute' && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
      if (this.cssPosition === 'relative' && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
        this.offset.relative = this._getRelativeOffset();
      }
      if (this.originalPosition) {
        if (this.containment) {
          if (event.pageX - this.offset.click.left < this.containment[0]) {
            pageX = this.containment[0] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top < this.containment[1]) {
            pageY = this.containment[1] + this.offset.click.top;
          }
          if (event.pageX - this.offset.click.left > this.containment[2]) {
            pageX = this.containment[2] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top > this.containment[3]) {
            pageY = this.containment[3] + this.offset.click.top;
          }
        }
        if (o.grid) {
          top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
          pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top;
          left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
          pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
        }
      }
      return {
        top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === 'fixed' ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
        left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
      };
    },
    _rearrange: function (event, i, a, hardRefresh) {
      a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === 'down' ? i.item[0] : i.item[0].nextSibling);
      this.counter = this.counter ? ++this.counter : 1;
      var counter = this.counter;
      this._delay(function () {
        if (counter === this.counter) {
          this.refreshPositions(!hardRefresh);
        }
      });
    },
    _clear: function (event, noPropagation) {
      this.reverting = false;
      var i, delayedTriggers = [];
      if (!this._noFinalSort && this.currentItem.parent().length) {
        this.placeholder.before(this.currentItem);
      }
      this._noFinalSort = null;
      if (this.helper[0] === this.currentItem[0]) {
        for (i in this._storedCSS) {
          if (this._storedCSS[i] === 'auto' || this._storedCSS[i] === 'static') {
            this._storedCSS[i] = '';
          }
        }
        this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper');
      } else {
        this.currentItem.show();
      }
      if (this.fromOutside && !noPropagation) {
        delayedTriggers.push(function (event) {
          this._trigger('receive', event, this._uiHash(this.fromOutside));
        });
      }
      if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not('.ui-sortable-helper')[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
        delayedTriggers.push(function (event) {
          this._trigger('update', event, this._uiHash());
        });
      }
      if (this !== this.currentContainer) {
        if (!noPropagation) {
          delayedTriggers.push(function (event) {
            this._trigger('remove', event, this._uiHash());
          });
          delayedTriggers.push(function (c) {
            return function (event) {
              c._trigger('receive', event, this._uiHash(this));
            };
          }.call(this, this.currentContainer));
          delayedTriggers.push(function (c) {
            return function (event) {
              c._trigger('update', event, this._uiHash(this));
            };
          }.call(this, this.currentContainer));
        }
      }
      for (i = this.containers.length - 1; i >= 0; i--) {
        if (!noPropagation) {
          delayedTriggers.push(function (c) {
            return function (event) {
              c._trigger('deactivate', event, this._uiHash(this));
            };
          }.call(this, this.containers[i]));
        }
        if (this.containers[i].containerCache.over) {
          delayedTriggers.push(function (c) {
            return function (event) {
              c._trigger('out', event, this._uiHash(this));
            };
          }.call(this, this.containers[i]));
          this.containers[i].containerCache.over = 0;
        }
      }
      if (this.storedCursor) {
        this.document.find('body').css('cursor', this.storedCursor);
        this.storedStylesheet.remove();
      }
      if (this._storedOpacity) {
        this.helper.css('opacity', this._storedOpacity);
      }
      if (this._storedZIndex) {
        this.helper.css('zIndex', this._storedZIndex === 'auto' ? '' : this._storedZIndex);
      }
      this.dragging = false;
      if (this.cancelHelperRemoval) {
        if (!noPropagation) {
          this._trigger('beforeStop', event, this._uiHash());
          for (i = 0; i < delayedTriggers.length; i++) {
            delayedTriggers[i].call(this, event);
          }
          this._trigger('stop', event, this._uiHash());
        }
        this.fromOutside = false;
        return false;
      }
      if (!noPropagation) {
        this._trigger('beforeStop', event, this._uiHash());
      }
      this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
      if (this.helper[0] !== this.currentItem[0]) {
        this.helper.remove();
      }
      this.helper = null;
      if (!noPropagation) {
        for (i = 0; i < delayedTriggers.length; i++) {
          delayedTriggers[i].call(this, event);
        }
        this._trigger('stop', event, this._uiHash());
      }
      this.fromOutside = false;
      return true;
    },
    _trigger: function () {
      if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
        this.cancel();
      }
    },
    _uiHash: function (_inst) {
      var inst = _inst || this;
      return {
        helper: inst.helper,
        placeholder: inst.placeholder || $([]),
        position: inst.position,
        originalPosition: inst.originalPosition,
        offset: inst.positionAbs,
        item: inst.currentItem,
        sender: _inst ? _inst.element : null
      };
    }
  });
}(jQuery));
(function ($, undefined) {
  var dataSpace = 'ui-effects-';
  $.effects = { effect: {} };
  (function (jQuery, undefined) {
    var stepHooks = 'backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor', rplusequals = /^([\-+])=\s*(\d+\.?\d*)/, stringParsers = [
        {
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function (execResult) {
            return [
              execResult[1],
              execResult[2],
              execResult[3],
              execResult[4]
            ];
          }
        },
        {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function (execResult) {
            return [
              execResult[1] * 2.55,
              execResult[2] * 2.55,
              execResult[3] * 2.55,
              execResult[4]
            ];
          }
        },
        {
          re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
          parse: function (execResult) {
            return [
              parseInt(execResult[1], 16),
              parseInt(execResult[2], 16),
              parseInt(execResult[3], 16)
            ];
          }
        },
        {
          re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
          parse: function (execResult) {
            return [
              parseInt(execResult[1] + execResult[1], 16),
              parseInt(execResult[2] + execResult[2], 16),
              parseInt(execResult[3] + execResult[3], 16)
            ];
          }
        },
        {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          space: 'hsla',
          parse: function (execResult) {
            return [
              execResult[1],
              execResult[2] / 100,
              execResult[3] / 100,
              execResult[4]
            ];
          }
        }
      ], color = jQuery.Color = function (color, green, blue, alpha) {
        return new jQuery.Color.fn.parse(color, green, blue, alpha);
      }, spaces = {
        rgba: {
          props: {
            red: {
              idx: 0,
              type: 'byte'
            },
            green: {
              idx: 1,
              type: 'byte'
            },
            blue: {
              idx: 2,
              type: 'byte'
            }
          }
        },
        hsla: {
          props: {
            hue: {
              idx: 0,
              type: 'degrees'
            },
            saturation: {
              idx: 1,
              type: 'percent'
            },
            lightness: {
              idx: 2,
              type: 'percent'
            }
          }
        }
      }, propTypes = {
        'byte': {
          floor: true,
          max: 255
        },
        'percent': { max: 1 },
        'degrees': {
          mod: 360,
          floor: true
        }
      }, support = color.support = {}, supportElem = jQuery('<p>')[0], colors, each = jQuery.each;
    supportElem.style.cssText = 'background-color:rgba(1,1,1,.5)';
    support.rgba = supportElem.style.backgroundColor.indexOf('rgba') > -1;
    each(spaces, function (spaceName, space) {
      space.cache = '_' + spaceName;
      space.props.alpha = {
        idx: 3,
        type: 'percent',
        def: 1
      };
    });
    function clamp(value, prop, allowEmpty) {
      var type = propTypes[prop.type] || {};
      if (value == null) {
        return allowEmpty || !prop.def ? null : prop.def;
      }
      value = type.floor ? ~~value : parseFloat(value);
      if (isNaN(value)) {
        return prop.def;
      }
      if (type.mod) {
        return (value + type.mod) % type.mod;
      }
      return 0 > value ? 0 : type.max < value ? type.max : value;
    }
    function stringParse(string) {
      var inst = color(), rgba = inst._rgba = [];
      string = string.toLowerCase();
      each(stringParsers, function (i, parser) {
        var parsed, match = parser.re.exec(string), values = match && parser.parse(match), spaceName = parser.space || 'rgba';
        if (values) {
          parsed = inst[spaceName](values);
          inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
          rgba = inst._rgba = parsed._rgba;
          return false;
        }
      });
      if (rgba.length) {
        if (rgba.join() === '0,0,0,0') {
          jQuery.extend(rgba, colors.transparent);
        }
        return inst;
      }
      return colors[string];
    }
    color.fn = jQuery.extend(color.prototype, {
      parse: function (red, green, blue, alpha) {
        if (red === undefined) {
          this._rgba = [
            null,
            null,
            null,
            null
          ];
          return this;
        }
        if (red.jquery || red.nodeType) {
          red = jQuery(red).css(green);
          green = undefined;
        }
        var inst = this, type = jQuery.type(red), rgba = this._rgba = [];
        if (green !== undefined) {
          red = [
            red,
            green,
            blue,
            alpha
          ];
          type = 'array';
        }
        if (type === 'string') {
          return this.parse(stringParse(red) || colors._default);
        }
        if (type === 'array') {
          each(spaces.rgba.props, function (key, prop) {
            rgba[prop.idx] = clamp(red[prop.idx], prop);
          });
          return this;
        }
        if (type === 'object') {
          if (red instanceof color) {
            each(spaces, function (spaceName, space) {
              if (red[space.cache]) {
                inst[space.cache] = red[space.cache].slice();
              }
            });
          } else {
            each(spaces, function (spaceName, space) {
              var cache = space.cache;
              each(space.props, function (key, prop) {
                if (!inst[cache] && space.to) {
                  if (key === 'alpha' || red[key] == null) {
                    return;
                  }
                  inst[cache] = space.to(inst._rgba);
                }
                inst[cache][prop.idx] = clamp(red[key], prop, true);
              });
              if (inst[cache] && jQuery.inArray(null, inst[cache].slice(0, 3)) < 0) {
                inst[cache][3] = 1;
                if (space.from) {
                  inst._rgba = space.from(inst[cache]);
                }
              }
            });
          }
          return this;
        }
      },
      is: function (compare) {
        var is = color(compare), same = true, inst = this;
        each(spaces, function (_, space) {
          var localCache, isCache = is[space.cache];
          if (isCache) {
            localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [];
            each(space.props, function (_, prop) {
              if (isCache[prop.idx] != null) {
                same = isCache[prop.idx] === localCache[prop.idx];
                return same;
              }
            });
          }
          return same;
        });
        return same;
      },
      _space: function () {
        var used = [], inst = this;
        each(spaces, function (spaceName, space) {
          if (inst[space.cache]) {
            used.push(spaceName);
          }
        });
        return used.pop();
      },
      transition: function (other, distance) {
        var end = color(other), spaceName = end._space(), space = spaces[spaceName], startColor = this.alpha() === 0 ? color('transparent') : this, start = startColor[space.cache] || space.to(startColor._rgba), result = start.slice();
        end = end[space.cache];
        each(space.props, function (key, prop) {
          var index = prop.idx, startValue = start[index], endValue = end[index], type = propTypes[prop.type] || {};
          if (endValue === null) {
            return;
          }
          if (startValue === null) {
            result[index] = endValue;
          } else {
            if (type.mod) {
              if (endValue - startValue > type.mod / 2) {
                startValue += type.mod;
              } else if (startValue - endValue > type.mod / 2) {
                startValue -= type.mod;
              }
            }
            result[index] = clamp((endValue - startValue) * distance + startValue, prop);
          }
        });
        return this[spaceName](result);
      },
      blend: function (opaque) {
        if (this._rgba[3] === 1) {
          return this;
        }
        var rgb = this._rgba.slice(), a = rgb.pop(), blend = color(opaque)._rgba;
        return color(jQuery.map(rgb, function (v, i) {
          return (1 - a) * blend[i] + a * v;
        }));
      },
      toRgbaString: function () {
        var prefix = 'rgba(', rgba = jQuery.map(this._rgba, function (v, i) {
            return v == null ? i > 2 ? 1 : 0 : v;
          });
        if (rgba[3] === 1) {
          rgba.pop();
          prefix = 'rgb(';
        }
        return prefix + rgba.join() + ')';
      },
      toHslaString: function () {
        var prefix = 'hsla(', hsla = jQuery.map(this.hsla(), function (v, i) {
            if (v == null) {
              v = i > 2 ? 1 : 0;
            }
            if (i && i < 3) {
              v = Math.round(v * 100) + '%';
            }
            return v;
          });
        if (hsla[3] === 1) {
          hsla.pop();
          prefix = 'hsl(';
        }
        return prefix + hsla.join() + ')';
      },
      toHexString: function (includeAlpha) {
        var rgba = this._rgba.slice(), alpha = rgba.pop();
        if (includeAlpha) {
          rgba.push(~~(alpha * 255));
        }
        return '#' + jQuery.map(rgba, function (v) {
          v = (v || 0).toString(16);
          return v.length === 1 ? '0' + v : v;
        }).join('');
      },
      toString: function () {
        return this._rgba[3] === 0 ? 'transparent' : this.toRgbaString();
      }
    });
    color.fn.parse.prototype = color.fn;
    function hue2rgb(p, q, h) {
      h = (h + 1) % 1;
      if (h * 6 < 1) {
        return p + (q - p) * h * 6;
      }
      if (h * 2 < 1) {
        return q;
      }
      if (h * 3 < 2) {
        return p + (q - p) * (2 / 3 - h) * 6;
      }
      return p;
    }
    spaces.hsla.to = function (rgba) {
      if (rgba[0] == null || rgba[1] == null || rgba[2] == null) {
        return [
          null,
          null,
          null,
          rgba[3]
        ];
      }
      var r = rgba[0] / 255, g = rgba[1] / 255, b = rgba[2] / 255, a = rgba[3], max = Math.max(r, g, b), min = Math.min(r, g, b), diff = max - min, add = max + min, l = add * 0.5, h, s;
      if (min === max) {
        h = 0;
      } else if (r === max) {
        h = 60 * (g - b) / diff + 360;
      } else if (g === max) {
        h = 60 * (b - r) / diff + 120;
      } else {
        h = 60 * (r - g) / diff + 240;
      }
      if (diff === 0) {
        s = 0;
      } else if (l <= 0.5) {
        s = diff / add;
      } else {
        s = diff / (2 - add);
      }
      return [
        Math.round(h) % 360,
        s,
        l,
        a == null ? 1 : a
      ];
    };
    spaces.hsla.from = function (hsla) {
      if (hsla[0] == null || hsla[1] == null || hsla[2] == null) {
        return [
          null,
          null,
          null,
          hsla[3]
        ];
      }
      var h = hsla[0] / 360, s = hsla[1], l = hsla[2], a = hsla[3], q = l <= 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
      return [
        Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        Math.round(hue2rgb(p, q, h) * 255),
        Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
        a
      ];
    };
    each(spaces, function (spaceName, space) {
      var props = space.props, cache = space.cache, to = space.to, from = space.from;
      color.fn[spaceName] = function (value) {
        if (to && !this[cache]) {
          this[cache] = to(this._rgba);
        }
        if (value === undefined) {
          return this[cache].slice();
        }
        var ret, type = jQuery.type(value), arr = type === 'array' || type === 'object' ? value : arguments, local = this[cache].slice();
        each(props, function (key, prop) {
          var val = arr[type === 'object' ? key : prop.idx];
          if (val == null) {
            val = local[prop.idx];
          }
          local[prop.idx] = clamp(val, prop);
        });
        if (from) {
          ret = color(from(local));
          ret[cache] = local;
          return ret;
        } else {
          return color(local);
        }
      };
      each(props, function (key, prop) {
        if (color.fn[key]) {
          return;
        }
        color.fn[key] = function (value) {
          var vtype = jQuery.type(value), fn = key === 'alpha' ? this._hsla ? 'hsla' : 'rgba' : spaceName, local = this[fn](), cur = local[prop.idx], match;
          if (vtype === 'undefined') {
            return cur;
          }
          if (vtype === 'function') {
            value = value.call(this, cur);
            vtype = jQuery.type(value);
          }
          if (value == null && prop.empty) {
            return this;
          }
          if (vtype === 'string') {
            match = rplusequals.exec(value);
            if (match) {
              value = cur + parseFloat(match[2]) * (match[1] === '+' ? 1 : -1);
            }
          }
          local[prop.idx] = value;
          return this[fn](local);
        };
      });
    });
    color.hook = function (hook) {
      var hooks = hook.split(' ');
      each(hooks, function (i, hook) {
        jQuery.cssHooks[hook] = {
          set: function (elem, value) {
            var parsed, curElem, backgroundColor = '';
            if (value !== 'transparent' && (jQuery.type(value) !== 'string' || (parsed = stringParse(value)))) {
              value = color(parsed || value);
              if (!support.rgba && value._rgba[3] !== 1) {
                curElem = hook === 'backgroundColor' ? elem.parentNode : elem;
                while ((backgroundColor === '' || backgroundColor === 'transparent') && curElem && curElem.style) {
                  try {
                    backgroundColor = jQuery.css(curElem, 'backgroundColor');
                    curElem = curElem.parentNode;
                  } catch (e) {
                  }
                }
                value = value.blend(backgroundColor && backgroundColor !== 'transparent' ? backgroundColor : '_default');
              }
              value = value.toRgbaString();
            }
            try {
              elem.style[hook] = value;
            } catch (e) {
            }
          }
        };
        jQuery.fx.step[hook] = function (fx) {
          if (!fx.colorInit) {
            fx.start = color(fx.elem, hook);
            fx.end = color(fx.end);
            fx.colorInit = true;
          }
          jQuery.cssHooks[hook].set(fx.elem, fx.start.transition(fx.end, fx.pos));
        };
      });
    };
    color.hook(stepHooks);
    jQuery.cssHooks.borderColor = {
      expand: function (value) {
        var expanded = {};
        each([
          'Top',
          'Right',
          'Bottom',
          'Left'
        ], function (i, part) {
          expanded['border' + part + 'Color'] = value;
        });
        return expanded;
      }
    };
    colors = jQuery.Color.names = {
      aqua: '#00ffff',
      black: '#000000',
      blue: '#0000ff',
      fuchsia: '#ff00ff',
      gray: '#808080',
      green: '#008000',
      lime: '#00ff00',
      maroon: '#800000',
      navy: '#000080',
      olive: '#808000',
      purple: '#800080',
      red: '#ff0000',
      silver: '#c0c0c0',
      teal: '#008080',
      white: '#ffffff',
      yellow: '#ffff00',
      transparent: [
        null,
        null,
        null,
        0
      ],
      _default: '#ffffff'
    };
  }(jQuery));
  (function () {
    var classAnimationActions = [
        'add',
        'remove',
        'toggle'
      ], shorthandStyles = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
      };
    $.each([
      'borderLeftStyle',
      'borderRightStyle',
      'borderBottomStyle',
      'borderTopStyle'
    ], function (_, prop) {
      $.fx.step[prop] = function (fx) {
        if (fx.end !== 'none' && !fx.setAttr || fx.pos === 1 && !fx.setAttr) {
          jQuery.style(fx.elem, prop, fx.end);
          fx.setAttr = true;
        }
      };
    });
    function getElementStyles(elem) {
      var key, len, style = elem.ownerDocument.defaultView ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : elem.currentStyle, styles = {};
      if (style && style.length && style[0] && style[style[0]]) {
        len = style.length;
        while (len--) {
          key = style[len];
          if (typeof style[key] === 'string') {
            styles[$.camelCase(key)] = style[key];
          }
        }
      } else {
        for (key in style) {
          if (typeof style[key] === 'string') {
            styles[key] = style[key];
          }
        }
      }
      return styles;
    }
    function styleDifference(oldStyle, newStyle) {
      var diff = {}, name, value;
      for (name in newStyle) {
        value = newStyle[name];
        if (oldStyle[name] !== value) {
          if (!shorthandStyles[name]) {
            if ($.fx.step[name] || !isNaN(parseFloat(value))) {
              diff[name] = value;
            }
          }
        }
      }
      return diff;
    }
    if (!$.fn.addBack) {
      $.fn.addBack = function (selector) {
        return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
      };
    }
    $.effects.animateClass = function (value, duration, easing, callback) {
      var o = $.speed(duration, easing, callback);
      return this.queue(function () {
        var animated = $(this), baseClass = animated.attr('class') || '', applyClassChange, allAnimations = o.children ? animated.find('*').addBack() : animated;
        allAnimations = allAnimations.map(function () {
          var el = $(this);
          return {
            el: el,
            start: getElementStyles(this)
          };
        });
        applyClassChange = function () {
          $.each(classAnimationActions, function (i, action) {
            if (value[action]) {
              animated[action + 'Class'](value[action]);
            }
          });
        };
        applyClassChange();
        allAnimations = allAnimations.map(function () {
          this.end = getElementStyles(this.el[0]);
          this.diff = styleDifference(this.start, this.end);
          return this;
        });
        animated.attr('class', baseClass);
        allAnimations = allAnimations.map(function () {
          var styleInfo = this, dfd = $.Deferred(), opts = $.extend({}, o, {
              queue: false,
              complete: function () {
                dfd.resolve(styleInfo);
              }
            });
          this.el.animate(this.diff, opts);
          return dfd.promise();
        });
        $.when.apply($, allAnimations.get()).done(function () {
          applyClassChange();
          $.each(arguments, function () {
            var el = this.el;
            $.each(this.diff, function (key) {
              el.css(key, '');
            });
          });
          o.complete.call(animated[0]);
        });
      });
    };
    $.fn.extend({
      addClass: function (orig) {
        return function (classNames, speed, easing, callback) {
          return speed ? $.effects.animateClass.call(this, { add: classNames }, speed, easing, callback) : orig.apply(this, arguments);
        };
      }($.fn.addClass),
      removeClass: function (orig) {
        return function (classNames, speed, easing, callback) {
          return arguments.length > 1 ? $.effects.animateClass.call(this, { remove: classNames }, speed, easing, callback) : orig.apply(this, arguments);
        };
      }($.fn.removeClass),
      toggleClass: function (orig) {
        return function (classNames, force, speed, easing, callback) {
          if (typeof force === 'boolean' || force === undefined) {
            if (!speed) {
              return orig.apply(this, arguments);
            } else {
              return $.effects.animateClass.call(this, force ? { add: classNames } : { remove: classNames }, speed, easing, callback);
            }
          } else {
            return $.effects.animateClass.call(this, { toggle: classNames }, force, speed, easing);
          }
        };
      }($.fn.toggleClass),
      switchClass: function (remove, add, speed, easing, callback) {
        return $.effects.animateClass.call(this, {
          add: add,
          remove: remove
        }, speed, easing, callback);
      }
    });
  }());
  (function () {
    $.extend($.effects, {
      version: '1.10.3',
      save: function (element, set) {
        for (var i = 0; i < set.length; i++) {
          if (set[i] !== null) {
            element.data(dataSpace + set[i], element[0].style[set[i]]);
          }
        }
      },
      restore: function (element, set) {
        var val, i;
        for (i = 0; i < set.length; i++) {
          if (set[i] !== null) {
            val = element.data(dataSpace + set[i]);
            if (val === undefined) {
              val = '';
            }
            element.css(set[i], val);
          }
        }
      },
      setMode: function (el, mode) {
        if (mode === 'toggle') {
          mode = el.is(':hidden') ? 'show' : 'hide';
        }
        return mode;
      },
      getBaseline: function (origin, original) {
        var y, x;
        switch (origin[0]) {
        case 'top':
          y = 0;
          break;
        case 'middle':
          y = 0.5;
          break;
        case 'bottom':
          y = 1;
          break;
        default:
          y = origin[0] / original.height;
        }
        switch (origin[1]) {
        case 'left':
          x = 0;
          break;
        case 'center':
          x = 0.5;
          break;
        case 'right':
          x = 1;
          break;
        default:
          x = origin[1] / original.width;
        }
        return {
          x: x,
          y: y
        };
      },
      createWrapper: function (element) {
        if (element.parent().is('.ui-effects-wrapper')) {
          return element.parent();
        }
        var props = {
            width: element.outerWidth(true),
            height: element.outerHeight(true),
            'float': element.css('float')
          }, wrapper = $('<div></div>').addClass('ui-effects-wrapper').css({
            fontSize: '100%',
            background: 'transparent',
            border: 'none',
            margin: 0,
            padding: 0
          }), size = {
            width: element.width(),
            height: element.height()
          }, active = document.activeElement;
        try {
          active.id;
        } catch (e) {
          active = document.body;
        }
        element.wrap(wrapper);
        if (element[0] === active || $.contains(element[0], active)) {
          $(active).focus();
        }
        wrapper = element.parent();
        if (element.css('position') === 'static') {
          wrapper.css({ position: 'relative' });
          element.css({ position: 'relative' });
        } else {
          $.extend(props, {
            position: element.css('position'),
            zIndex: element.css('z-index')
          });
          $.each([
            'top',
            'left',
            'bottom',
            'right'
          ], function (i, pos) {
            props[pos] = element.css(pos);
            if (isNaN(parseInt(props[pos], 10))) {
              props[pos] = 'auto';
            }
          });
          element.css({
            position: 'relative',
            top: 0,
            left: 0,
            right: 'auto',
            bottom: 'auto'
          });
        }
        element.css(size);
        return wrapper.css(props).show();
      },
      removeWrapper: function (element) {
        var active = document.activeElement;
        if (element.parent().is('.ui-effects-wrapper')) {
          element.parent().replaceWith(element);
          if (element[0] === active || $.contains(element[0], active)) {
            $(active).focus();
          }
        }
        return element;
      },
      setTransition: function (element, list, factor, value) {
        value = value || {};
        $.each(list, function (i, x) {
          var unit = element.cssUnit(x);
          if (unit[0] > 0) {
            value[x] = unit[0] * factor + unit[1];
          }
        });
        return value;
      }
    });
    function _normalizeArguments(effect, options, speed, callback) {
      if ($.isPlainObject(effect)) {
        options = effect;
        effect = effect.effect;
      }
      effect = { effect: effect };
      if (options == null) {
        options = {};
      }
      if ($.isFunction(options)) {
        callback = options;
        speed = null;
        options = {};
      }
      if (typeof options === 'number' || $.fx.speeds[options]) {
        callback = speed;
        speed = options;
        options = {};
      }
      if ($.isFunction(speed)) {
        callback = speed;
        speed = null;
      }
      if (options) {
        $.extend(effect, options);
      }
      speed = speed || options.duration;
      effect.duration = $.fx.off ? 0 : typeof speed === 'number' ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default;
      effect.complete = callback || options.complete;
      return effect;
    }
    function standardAnimationOption(option) {
      if (!option || typeof option === 'number' || $.fx.speeds[option]) {
        return true;
      }
      if (typeof option === 'string' && !$.effects.effect[option]) {
        return true;
      }
      if ($.isFunction(option)) {
        return true;
      }
      if (typeof option === 'object' && !option.effect) {
        return true;
      }
      return false;
    }
    $.fn.extend({
      effect: function () {
        var args = _normalizeArguments.apply(this, arguments), mode = args.mode, queue = args.queue, effectMethod = $.effects.effect[args.effect];
        if ($.fx.off || !effectMethod) {
          if (mode) {
            return this[mode](args.duration, args.complete);
          } else {
            return this.each(function () {
              if (args.complete) {
                args.complete.call(this);
              }
            });
          }
        }
        function run(next) {
          var elem = $(this), complete = args.complete, mode = args.mode;
          function done() {
            if ($.isFunction(complete)) {
              complete.call(elem[0]);
            }
            if ($.isFunction(next)) {
              next();
            }
          }
          if (elem.is(':hidden') ? mode === 'hide' : mode === 'show') {
            elem[mode]();
            done();
          } else {
            effectMethod.call(elem[0], args, done);
          }
        }
        return queue === false ? this.each(run) : this.queue(queue || 'fx', run);
      },
      show: function (orig) {
        return function (option) {
          if (standardAnimationOption(option)) {
            return orig.apply(this, arguments);
          } else {
            var args = _normalizeArguments.apply(this, arguments);
            args.mode = 'show';
            return this.effect.call(this, args);
          }
        };
      }($.fn.show),
      hide: function (orig) {
        return function (option) {
          if (standardAnimationOption(option)) {
            return orig.apply(this, arguments);
          } else {
            var args = _normalizeArguments.apply(this, arguments);
            args.mode = 'hide';
            return this.effect.call(this, args);
          }
        };
      }($.fn.hide),
      toggle: function (orig) {
        return function (option) {
          if (standardAnimationOption(option) || typeof option === 'boolean') {
            return orig.apply(this, arguments);
          } else {
            var args = _normalizeArguments.apply(this, arguments);
            args.mode = 'toggle';
            return this.effect.call(this, args);
          }
        };
      }($.fn.toggle),
      cssUnit: function (key) {
        var style = this.css(key), val = [];
        $.each([
          'em',
          'px',
          '%',
          'pt'
        ], function (i, unit) {
          if (style.indexOf(unit) > 0) {
            val = [
              parseFloat(style),
              unit
            ];
          }
        });
        return val;
      }
    });
  }());
  (function () {
    var baseEasings = {};
    $.each([
      'Quad',
      'Cubic',
      'Quart',
      'Quint',
      'Expo'
    ], function (i, name) {
      baseEasings[name] = function (p) {
        return Math.pow(p, i + 2);
      };
    });
    $.extend(baseEasings, {
      Sine: function (p) {
        return 1 - Math.cos(p * Math.PI / 2);
      },
      Circ: function (p) {
        return 1 - Math.sqrt(1 - p * p);
      },
      Elastic: function (p) {
        return p === 0 || p === 1 ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
      },
      Back: function (p) {
        return p * p * (3 * p - 2);
      },
      Bounce: function (p) {
        var pow2, bounce = 4;
        while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {
        }
        return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
      }
    });
    $.each(baseEasings, function (name, easeIn) {
      $.easing['easeIn' + name] = easeIn;
      $.easing['easeOut' + name] = function (p) {
        return 1 - easeIn(1 - p);
      };
      $.easing['easeInOut' + name] = function (p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * -2 + 2) / 2;
      };
    });
  }());
}(jQuery));
(function ($, undefined) {
  var uid = 0, hideProps = {}, showProps = {};
  hideProps.height = hideProps.paddingTop = hideProps.paddingBottom = hideProps.borderTopWidth = hideProps.borderBottomWidth = 'hide';
  showProps.height = showProps.paddingTop = showProps.paddingBottom = showProps.borderTopWidth = showProps.borderBottomWidth = 'show';
  $.widget('ui.accordion', {
    version: '1.10.3',
    options: {
      active: 0,
      animate: {},
      collapsible: false,
      event: 'click',
      header: '> li > :first-child,> :not(li):even',
      heightStyle: 'auto',
      icons: {
        activeHeader: 'ui-icon-triangle-1-s',
        header: 'ui-icon-triangle-1-e'
      },
      activate: null,
      beforeActivate: null
    },
    _create: function () {
      var options = this.options;
      this.prevShow = this.prevHide = $();
      this.element.addClass('ui-accordion ui-widget ui-helper-reset').attr('role', 'tablist');
      if (!options.collapsible && (options.active === false || options.active == null)) {
        options.active = 0;
      }
      this._processPanels();
      if (options.active < 0) {
        options.active += this.headers.length;
      }
      this._refresh();
    },
    _getCreateEventData: function () {
      return {
        header: this.active,
        panel: !this.active.length ? $() : this.active.next(),
        content: !this.active.length ? $() : this.active.next()
      };
    },
    _createIcons: function () {
      var icons = this.options.icons;
      if (icons) {
        $('<span>').addClass('ui-accordion-header-icon ui-icon ' + icons.header).prependTo(this.headers);
        this.active.children('.ui-accordion-header-icon').removeClass(icons.header).addClass(icons.activeHeader);
        this.headers.addClass('ui-accordion-icons');
      }
    },
    _destroyIcons: function () {
      this.headers.removeClass('ui-accordion-icons').children('.ui-accordion-header-icon').remove();
    },
    _destroy: function () {
      var contents;
      this.element.removeClass('ui-accordion ui-widget ui-helper-reset').removeAttr('role');
      this.headers.removeClass('ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top').removeAttr('role').removeAttr('aria-selected').removeAttr('aria-controls').removeAttr('tabIndex').each(function () {
        if (/^ui-accordion/.test(this.id)) {
          this.removeAttribute('id');
        }
      });
      this._destroyIcons();
      contents = this.headers.next().css('display', '').removeAttr('role').removeAttr('aria-expanded').removeAttr('aria-hidden').removeAttr('aria-labelledby').removeClass('ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled').each(function () {
        if (/^ui-accordion/.test(this.id)) {
          this.removeAttribute('id');
        }
      });
      if (this.options.heightStyle !== 'content') {
        contents.css('height', '');
      }
    },
    _setOption: function (key, value) {
      if (key === 'active') {
        this._activate(value);
        return;
      }
      if (key === 'event') {
        if (this.options.event) {
          this._off(this.headers, this.options.event);
        }
        this._setupEvents(value);
      }
      this._super(key, value);
      if (key === 'collapsible' && !value && this.options.active === false) {
        this._activate(0);
      }
      if (key === 'icons') {
        this._destroyIcons();
        if (value) {
          this._createIcons();
        }
      }
      if (key === 'disabled') {
        this.headers.add(this.headers.next()).toggleClass('ui-state-disabled', !!value);
      }
    },
    _keydown: function (event) {
      if (event.altKey || event.ctrlKey) {
        return;
      }
      var keyCode = $.ui.keyCode, length = this.headers.length, currentIndex = this.headers.index(event.target), toFocus = false;
      switch (event.keyCode) {
      case keyCode.RIGHT:
      case keyCode.DOWN:
        toFocus = this.headers[(currentIndex + 1) % length];
        break;
      case keyCode.LEFT:
      case keyCode.UP:
        toFocus = this.headers[(currentIndex - 1 + length) % length];
        break;
      case keyCode.SPACE:
      case keyCode.ENTER:
        this._eventHandler(event);
        break;
      case keyCode.HOME:
        toFocus = this.headers[0];
        break;
      case keyCode.END:
        toFocus = this.headers[length - 1];
        break;
      }
      if (toFocus) {
        $(event.target).attr('tabIndex', -1);
        $(toFocus).attr('tabIndex', 0);
        toFocus.focus();
        event.preventDefault();
      }
    },
    _panelKeyDown: function (event) {
      if (event.keyCode === $.ui.keyCode.UP && event.ctrlKey) {
        $(event.currentTarget).prev().focus();
      }
    },
    refresh: function () {
      var options = this.options;
      this._processPanels();
      if (options.active === false && options.collapsible === true || !this.headers.length) {
        options.active = false;
        this.active = $();
      } else if (options.active === false) {
        this._activate(0);
      } else if (this.active.length && !$.contains(this.element[0], this.active[0])) {
        if (this.headers.length === this.headers.find('.ui-state-disabled').length) {
          options.active = false;
          this.active = $();
        } else {
          this._activate(Math.max(0, options.active - 1));
        }
      } else {
        options.active = this.headers.index(this.active);
      }
      this._destroyIcons();
      this._refresh();
    },
    _processPanels: function () {
      this.headers = this.element.find(this.options.header).addClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all');
      this.headers.next().addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom').filter(':not(.ui-accordion-content-active)').hide();
    },
    _refresh: function () {
      var maxHeight, options = this.options, heightStyle = options.heightStyle, parent = this.element.parent(), accordionId = this.accordionId = 'ui-accordion-' + (this.element.attr('id') || ++uid);
      this.active = this._findActive(options.active).addClass('ui-accordion-header-active ui-state-active ui-corner-top').removeClass('ui-corner-all');
      this.active.next().addClass('ui-accordion-content-active').show();
      this.headers.attr('role', 'tab').each(function (i) {
        var header = $(this), headerId = header.attr('id'), panel = header.next(), panelId = panel.attr('id');
        if (!headerId) {
          headerId = accordionId + '-header-' + i;
          header.attr('id', headerId);
        }
        if (!panelId) {
          panelId = accordionId + '-panel-' + i;
          panel.attr('id', panelId);
        }
        header.attr('aria-controls', panelId);
        panel.attr('aria-labelledby', headerId);
      }).next().attr('role', 'tabpanel');
      this.headers.not(this.active).attr({
        'aria-selected': 'false',
        tabIndex: -1
      }).next().attr({
        'aria-expanded': 'false',
        'aria-hidden': 'true'
      }).hide();
      if (!this.active.length) {
        this.headers.eq(0).attr('tabIndex', 0);
      } else {
        this.active.attr({
          'aria-selected': 'true',
          tabIndex: 0
        }).next().attr({
          'aria-expanded': 'true',
          'aria-hidden': 'false'
        });
      }
      this._createIcons();
      this._setupEvents(options.event);
      if (heightStyle === 'fill') {
        maxHeight = parent.height();
        this.element.siblings(':visible').each(function () {
          var elem = $(this), position = elem.css('position');
          if (position === 'absolute' || position === 'fixed') {
            return;
          }
          maxHeight -= elem.outerHeight(true);
        });
        this.headers.each(function () {
          maxHeight -= $(this).outerHeight(true);
        });
        this.headers.next().each(function () {
          $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()));
        }).css('overflow', 'auto');
      } else if (heightStyle === 'auto') {
        maxHeight = 0;
        this.headers.next().each(function () {
          maxHeight = Math.max(maxHeight, $(this).css('height', '').height());
        }).height(maxHeight);
      }
    },
    _activate: function (index) {
      var active = this._findActive(index)[0];
      if (active === this.active[0]) {
        return;
      }
      active = active || this.active[0];
      this._eventHandler({
        target: active,
        currentTarget: active,
        preventDefault: $.noop
      });
    },
    _findActive: function (selector) {
      return typeof selector === 'number' ? this.headers.eq(selector) : $();
    },
    _setupEvents: function (event) {
      var events = { keydown: '_keydown' };
      if (event) {
        $.each(event.split(' '), function (index, eventName) {
          events[eventName] = '_eventHandler';
        });
      }
      this._off(this.headers.add(this.headers.next()));
      this._on(this.headers, events);
      this._on(this.headers.next(), { keydown: '_panelKeyDown' });
      this._hoverable(this.headers);
      this._focusable(this.headers);
    },
    _eventHandler: function (event) {
      var options = this.options, active = this.active, clicked = $(event.currentTarget), clickedIsActive = clicked[0] === active[0], collapsing = clickedIsActive && options.collapsible, toShow = collapsing ? $() : clicked.next(), toHide = active.next(), eventData = {
          oldHeader: active,
          oldPanel: toHide,
          newHeader: collapsing ? $() : clicked,
          newPanel: toShow
        };
      event.preventDefault();
      if (clickedIsActive && !options.collapsible || this._trigger('beforeActivate', event, eventData) === false) {
        return;
      }
      options.active = collapsing ? false : this.headers.index(clicked);
      this.active = clickedIsActive ? $() : clicked;
      this._toggle(eventData);
      active.removeClass('ui-accordion-header-active ui-state-active');
      if (options.icons) {
        active.children('.ui-accordion-header-icon').removeClass(options.icons.activeHeader).addClass(options.icons.header);
      }
      if (!clickedIsActive) {
        clicked.removeClass('ui-corner-all').addClass('ui-accordion-header-active ui-state-active ui-corner-top');
        if (options.icons) {
          clicked.children('.ui-accordion-header-icon').removeClass(options.icons.header).addClass(options.icons.activeHeader);
        }
        clicked.next().addClass('ui-accordion-content-active');
      }
    },
    _toggle: function (data) {
      var toShow = data.newPanel, toHide = this.prevShow.length ? this.prevShow : data.oldPanel;
      this.prevShow.add(this.prevHide).stop(true, true);
      this.prevShow = toShow;
      this.prevHide = toHide;
      if (this.options.animate) {
        this._animate(toShow, toHide, data);
      } else {
        toHide.hide();
        toShow.show();
        this._toggleComplete(data);
      }
      toHide.attr({
        'aria-expanded': 'false',
        'aria-hidden': 'true'
      });
      toHide.prev().attr('aria-selected', 'false');
      if (toShow.length && toHide.length) {
        toHide.prev().attr('tabIndex', -1);
      } else if (toShow.length) {
        this.headers.filter(function () {
          return $(this).attr('tabIndex') === 0;
        }).attr('tabIndex', -1);
      }
      toShow.attr({
        'aria-expanded': 'true',
        'aria-hidden': 'false'
      }).prev().attr({
        'aria-selected': 'true',
        tabIndex: 0
      });
    },
    _animate: function (toShow, toHide, data) {
      var total, easing, duration, that = this, adjust = 0, down = toShow.length && (!toHide.length || toShow.index() < toHide.index()), animate = this.options.animate || {}, options = down && animate.down || animate, complete = function () {
          that._toggleComplete(data);
        };
      if (typeof options === 'number') {
        duration = options;
      }
      if (typeof options === 'string') {
        easing = options;
      }
      easing = easing || options.easing || animate.easing;
      duration = duration || options.duration || animate.duration;
      if (!toHide.length) {
        return toShow.animate(showProps, duration, easing, complete);
      }
      if (!toShow.length) {
        return toHide.animate(hideProps, duration, easing, complete);
      }
      total = toShow.show().outerHeight();
      toHide.animate(hideProps, {
        duration: duration,
        easing: easing,
        step: function (now, fx) {
          fx.now = Math.round(now);
        }
      });
      toShow.hide().animate(showProps, {
        duration: duration,
        easing: easing,
        complete: complete,
        step: function (now, fx) {
          fx.now = Math.round(now);
          if (fx.prop !== 'height') {
            adjust += fx.now;
          } else if (that.options.heightStyle !== 'content') {
            fx.now = Math.round(total - toHide.outerHeight() - adjust);
            adjust = 0;
          }
        }
      });
    },
    _toggleComplete: function (data) {
      var toHide = data.oldPanel;
      toHide.removeClass('ui-accordion-content-active').prev().removeClass('ui-corner-top').addClass('ui-corner-all');
      if (toHide.length) {
        toHide.parent()[0].className = toHide.parent()[0].className;
      }
      this._trigger('activate', null, data);
    }
  });
}(jQuery));
(function ($, undefined) {
  var requestIndex = 0;
  $.widget('ui.autocomplete', {
    version: '1.10.3',
    defaultElement: '<input>',
    options: {
      appendTo: null,
      autoFocus: false,
      delay: 300,
      minLength: 1,
      position: {
        my: 'left top',
        at: 'left bottom',
        collision: 'none'
      },
      source: null,
      change: null,
      close: null,
      focus: null,
      open: null,
      response: null,
      search: null,
      select: null
    },
    pending: 0,
    _create: function () {
      var suppressKeyPress, suppressKeyPressRepeat, suppressInput, nodeName = this.element[0].nodeName.toLowerCase(), isTextarea = nodeName === 'textarea', isInput = nodeName === 'input';
      this.isMultiLine = isTextarea ? true : isInput ? false : this.element.prop('isContentEditable');
      this.valueMethod = this.element[isTextarea || isInput ? 'val' : 'text'];
      this.isNewMenu = true;
      this.element.addClass('ui-autocomplete-input').attr('autocomplete', 'off');
      this._on(this.element, {
        keydown: function (event) {
          if (this.element.prop('readOnly')) {
            suppressKeyPress = true;
            suppressInput = true;
            suppressKeyPressRepeat = true;
            return;
          }
          suppressKeyPress = false;
          suppressInput = false;
          suppressKeyPressRepeat = false;
          var keyCode = $.ui.keyCode;
          switch (event.keyCode) {
          case keyCode.PAGE_UP:
            suppressKeyPress = true;
            this._move('previousPage', event);
            break;
          case keyCode.PAGE_DOWN:
            suppressKeyPress = true;
            this._move('nextPage', event);
            break;
          case keyCode.UP:
            suppressKeyPress = true;
            this._keyEvent('previous', event);
            break;
          case keyCode.DOWN:
            suppressKeyPress = true;
            this._keyEvent('next', event);
            break;
          case keyCode.ENTER:
          case keyCode.NUMPAD_ENTER:
            if (this.menu.active) {
              suppressKeyPress = true;
              event.preventDefault();
              this.menu.select(event);
            }
            break;
          case keyCode.TAB:
            if (this.menu.active) {
              this.menu.select(event);
            }
            break;
          case keyCode.ESCAPE:
            if (this.menu.element.is(':visible')) {
              this._value(this.term);
              this.close(event);
              event.preventDefault();
            }
            break;
          default:
            suppressKeyPressRepeat = true;
            this._searchTimeout(event);
            break;
          }
        },
        keypress: function (event) {
          if (suppressKeyPress) {
            suppressKeyPress = false;
            if (!this.isMultiLine || this.menu.element.is(':visible')) {
              event.preventDefault();
            }
            return;
          }
          if (suppressKeyPressRepeat) {
            return;
          }
          var keyCode = $.ui.keyCode;
          switch (event.keyCode) {
          case keyCode.PAGE_UP:
            this._move('previousPage', event);
            break;
          case keyCode.PAGE_DOWN:
            this._move('nextPage', event);
            break;
          case keyCode.UP:
            this._keyEvent('previous', event);
            break;
          case keyCode.DOWN:
            this._keyEvent('next', event);
            break;
          }
        },
        input: function (event) {
          if (suppressInput) {
            suppressInput = false;
            event.preventDefault();
            return;
          }
          this._searchTimeout(event);
        },
        focus: function () {
          this.selectedItem = null;
          this.previous = this._value();
        },
        blur: function (event) {
          if (this.cancelBlur) {
            delete this.cancelBlur;
            return;
          }
          clearTimeout(this.searching);
          this.close(event);
          this._change(event);
        }
      });
      this._initSource();
      this.menu = $('<ul>').addClass('ui-autocomplete ui-front').appendTo(this._appendTo()).menu({ role: null }).hide().data('ui-menu');
      this._on(this.menu.element, {
        mousedown: function (event) {
          event.preventDefault();
          this.cancelBlur = true;
          this._delay(function () {
            delete this.cancelBlur;
          });
          var menuElement = this.menu.element[0];
          if (!$(event.target).closest('.ui-menu-item').length) {
            this._delay(function () {
              var that = this;
              this.document.one('mousedown', function (event) {
                if (event.target !== that.element[0] && event.target !== menuElement && !$.contains(menuElement, event.target)) {
                  that.close();
                }
              });
            });
          }
        },
        menufocus: function (event, ui) {
          if (this.isNewMenu) {
            this.isNewMenu = false;
            if (event.originalEvent && /^mouse/.test(event.originalEvent.type)) {
              this.menu.blur();
              this.document.one('mousemove', function () {
                $(event.target).trigger(event.originalEvent);
              });
              return;
            }
          }
          var item = ui.item.data('ui-autocomplete-item');
          if (false !== this._trigger('focus', event, { item: item })) {
            if (event.originalEvent && /^key/.test(event.originalEvent.type)) {
              this._value(item.value);
            }
          } else {
            this.liveRegion.text(item.value);
          }
        },
        menuselect: function (event, ui) {
          var item = ui.item.data('ui-autocomplete-item'), previous = this.previous;
          if (this.element[0] !== this.document[0].activeElement) {
            this.element.focus();
            this.previous = previous;
            this._delay(function () {
              this.previous = previous;
              this.selectedItem = item;
            });
          }
          if (false !== this._trigger('select', event, { item: item })) {
            this._value(item.value);
          }
          this.term = this._value();
          this.close(event);
          this.selectedItem = item;
        }
      });
      this.liveRegion = $('<span>', {
        role: 'status',
        'aria-live': 'polite'
      }).addClass('ui-helper-hidden-accessible').insertBefore(this.element);
      this._on(this.window, {
        beforeunload: function () {
          this.element.removeAttr('autocomplete');
        }
      });
    },
    _destroy: function () {
      clearTimeout(this.searching);
      this.element.removeClass('ui-autocomplete-input').removeAttr('autocomplete');
      this.menu.element.remove();
      this.liveRegion.remove();
    },
    _setOption: function (key, value) {
      this._super(key, value);
      if (key === 'source') {
        this._initSource();
      }
      if (key === 'appendTo') {
        this.menu.element.appendTo(this._appendTo());
      }
      if (key === 'disabled' && value && this.xhr) {
        this.xhr.abort();
      }
    },
    _appendTo: function () {
      var element = this.options.appendTo;
      if (element) {
        element = element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0);
      }
      if (!element) {
        element = this.element.closest('.ui-front');
      }
      if (!element.length) {
        element = this.document[0].body;
      }
      return element;
    },
    _initSource: function () {
      var array, url, that = this;
      if ($.isArray(this.options.source)) {
        array = this.options.source;
        this.source = function (request, response) {
          response($.ui.autocomplete.filter(array, request.term));
        };
      } else if (typeof this.options.source === 'string') {
        url = this.options.source;
        this.source = function (request, response) {
          if (that.xhr) {
            that.xhr.abort();
          }
          that.xhr = $.ajax({
            url: url,
            data: request,
            dataType: 'json',
            success: function (data) {
              response(data);
            },
            error: function () {
              response([]);
            }
          });
        };
      } else {
        this.source = this.options.source;
      }
    },
    _searchTimeout: function (event) {
      clearTimeout(this.searching);
      this.searching = this._delay(function () {
        if (this.term !== this._value()) {
          this.selectedItem = null;
          this.search(null, event);
        }
      }, this.options.delay);
    },
    search: function (value, event) {
      value = value != null ? value : this._value();
      this.term = this._value();
      if (value.length < this.options.minLength) {
        return this.close(event);
      }
      if (this._trigger('search', event) === false) {
        return;
      }
      return this._search(value);
    },
    _search: function (value) {
      this.pending++;
      this.element.addClass('ui-autocomplete-loading');
      this.cancelSearch = false;
      this.source({ term: value }, this._response());
    },
    _response: function () {
      var that = this, index = ++requestIndex;
      return function (content) {
        if (index === requestIndex) {
          that.__response(content);
        }
        that.pending--;
        if (!that.pending) {
          that.element.removeClass('ui-autocomplete-loading');
        }
      };
    },
    __response: function (content) {
      if (content) {
        content = this._normalize(content);
      }
      this._trigger('response', null, { content: content });
      if (!this.options.disabled && content && content.length && !this.cancelSearch) {
        this._suggest(content);
        this._trigger('open');
      } else {
        this._close();
      }
    },
    close: function (event) {
      this.cancelSearch = true;
      this._close(event);
    },
    _close: function (event) {
      if (this.menu.element.is(':visible')) {
        this.menu.element.hide();
        this.menu.blur();
        this.isNewMenu = true;
        this._trigger('close', event);
      }
    },
    _change: function (event) {
      if (this.previous !== this._value()) {
        this._trigger('change', event, { item: this.selectedItem });
      }
    },
    _normalize: function (items) {
      if (items.length && items[0].label && items[0].value) {
        return items;
      }
      return $.map(items, function (item) {
        if (typeof item === 'string') {
          return {
            label: item,
            value: item
          };
        }
        return $.extend({
          label: item.label || item.value,
          value: item.value || item.label
        }, item);
      });
    },
    _suggest: function (items) {
      var ul = this.menu.element.empty();
      this._renderMenu(ul, items);
      this.isNewMenu = true;
      this.menu.refresh();
      ul.show();
      this._resizeMenu();
      ul.position($.extend({ of: this.element }, this.options.position));
      if (this.options.autoFocus) {
        this.menu.next();
      }
    },
    _resizeMenu: function () {
      var ul = this.menu.element;
      ul.outerWidth(Math.max(ul.width('').outerWidth() + 1, this.element.outerWidth()));
    },
    _renderMenu: function (ul, items) {
      var that = this;
      $.each(items, function (index, item) {
        that._renderItemData(ul, item);
      });
    },
    _renderItemData: function (ul, item) {
      return this._renderItem(ul, item).data('ui-autocomplete-item', item);
    },
    _renderItem: function (ul, item) {
      return $('<li>').append($('<a>').text(item.label)).appendTo(ul);
    },
    _move: function (direction, event) {
      if (!this.menu.element.is(':visible')) {
        this.search(null, event);
        return;
      }
      if (this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction)) {
        this._value(this.term);
        this.menu.blur();
        return;
      }
      this.menu[direction](event);
    },
    widget: function () {
      return this.menu.element;
    },
    _value: function () {
      return this.valueMethod.apply(this.element, arguments);
    },
    _keyEvent: function (keyEvent, event) {
      if (!this.isMultiLine || this.menu.element.is(':visible')) {
        this._move(keyEvent, event);
        event.preventDefault();
      }
    }
  });
  $.extend($.ui.autocomplete, {
    escapeRegex: function (value) {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    },
    filter: function (array, term) {
      var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), 'i');
      return $.grep(array, function (value) {
        return matcher.test(value.label || value.value || value);
      });
    }
  });
  $.widget('ui.autocomplete', $.ui.autocomplete, {
    options: {
      messages: {
        noResults: 'No search results.',
        results: function (amount) {
          return amount + (amount > 1 ? ' results are' : ' result is') + ' available, use up and down arrow keys to navigate.';
        }
      }
    },
    __response: function (content) {
      var message;
      this._superApply(arguments);
      if (this.options.disabled || this.cancelSearch) {
        return;
      }
      if (content && content.length) {
        message = this.options.messages.results(content.length);
      } else {
        message = this.options.messages.noResults;
      }
      this.liveRegion.text(message);
    }
  });
}(jQuery));
(function ($, undefined) {
  var lastActive, startXPos, startYPos, clickDragged, baseClasses = 'ui-button ui-widget ui-state-default ui-corner-all', stateClasses = 'ui-state-hover ui-state-active ', typeClasses = 'ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only', formResetHandler = function () {
      var form = $(this);
      setTimeout(function () {
        form.find(':ui-button').button('refresh');
      }, 1);
    }, radioGroup = function (radio) {
      var name = radio.name, form = radio.form, radios = $([]);
      if (name) {
        name = name.replace(/'/g, '\\\'');
        if (form) {
          radios = $(form).find('[name=\'' + name + '\']');
        } else {
          radios = $('[name=\'' + name + '\']', radio.ownerDocument).filter(function () {
            return !this.form;
          });
        }
      }
      return radios;
    };
  $.widget('ui.button', {
    version: '1.10.3',
    defaultElement: '<button>',
    options: {
      disabled: null,
      text: true,
      label: null,
      icons: {
        primary: null,
        secondary: null
      }
    },
    _create: function () {
      this.element.closest('form').unbind('reset' + this.eventNamespace).bind('reset' + this.eventNamespace, formResetHandler);
      if (typeof this.options.disabled !== 'boolean') {
        this.options.disabled = !!this.element.prop('disabled');
      } else {
        this.element.prop('disabled', this.options.disabled);
      }
      this._determineButtonType();
      this.hasTitle = !!this.buttonElement.attr('title');
      var that = this, options = this.options, toggleButton = this.type === 'checkbox' || this.type === 'radio', activeClass = !toggleButton ? 'ui-state-active' : '', focusClass = 'ui-state-focus';
      if (options.label === null) {
        options.label = this.type === 'input' ? this.buttonElement.val() : this.buttonElement.html();
      }
      this._hoverable(this.buttonElement);
      this.buttonElement.addClass(baseClasses).attr('role', 'button').bind('mouseenter' + this.eventNamespace, function () {
        if (options.disabled) {
          return;
        }
        if (this === lastActive) {
          $(this).addClass('ui-state-active');
        }
      }).bind('mouseleave' + this.eventNamespace, function () {
        if (options.disabled) {
          return;
        }
        $(this).removeClass(activeClass);
      }).bind('click' + this.eventNamespace, function (event) {
        if (options.disabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
      this.element.bind('focus' + this.eventNamespace, function () {
        that.buttonElement.addClass(focusClass);
      }).bind('blur' + this.eventNamespace, function () {
        that.buttonElement.removeClass(focusClass);
      });
      if (toggleButton) {
        this.element.bind('change' + this.eventNamespace, function () {
          if (clickDragged) {
            return;
          }
          that.refresh();
        });
        this.buttonElement.bind('mousedown' + this.eventNamespace, function (event) {
          if (options.disabled) {
            return;
          }
          clickDragged = false;
          startXPos = event.pageX;
          startYPos = event.pageY;
        }).bind('mouseup' + this.eventNamespace, function (event) {
          if (options.disabled) {
            return;
          }
          if (startXPos !== event.pageX || startYPos !== event.pageY) {
            clickDragged = true;
          }
        });
      }
      if (this.type === 'checkbox') {
        this.buttonElement.bind('click' + this.eventNamespace, function () {
          if (options.disabled || clickDragged) {
            return false;
          }
        });
      } else if (this.type === 'radio') {
        this.buttonElement.bind('click' + this.eventNamespace, function () {
          if (options.disabled || clickDragged) {
            return false;
          }
          $(this).addClass('ui-state-active');
          that.buttonElement.attr('aria-pressed', 'true');
          var radio = that.element[0];
          radioGroup(radio).not(radio).map(function () {
            return $(this).button('widget')[0];
          }).removeClass('ui-state-active').attr('aria-pressed', 'false');
        });
      } else {
        this.buttonElement.bind('mousedown' + this.eventNamespace, function () {
          if (options.disabled) {
            return false;
          }
          $(this).addClass('ui-state-active');
          lastActive = this;
          that.document.one('mouseup', function () {
            lastActive = null;
          });
        }).bind('mouseup' + this.eventNamespace, function () {
          if (options.disabled) {
            return false;
          }
          $(this).removeClass('ui-state-active');
        }).bind('keydown' + this.eventNamespace, function (event) {
          if (options.disabled) {
            return false;
          }
          if (event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER) {
            $(this).addClass('ui-state-active');
          }
        }).bind('keyup' + this.eventNamespace + ' blur' + this.eventNamespace, function () {
          $(this).removeClass('ui-state-active');
        });
        if (this.buttonElement.is('a')) {
          this.buttonElement.keyup(function (event) {
            if (event.keyCode === $.ui.keyCode.SPACE) {
              $(this).click();
            }
          });
        }
      }
      this._setOption('disabled', options.disabled);
      this._resetButton();
    },
    _determineButtonType: function () {
      var ancestor, labelSelector, checked;
      if (this.element.is('[type=checkbox]')) {
        this.type = 'checkbox';
      } else if (this.element.is('[type=radio]')) {
        this.type = 'radio';
      } else if (this.element.is('input')) {
        this.type = 'input';
      } else {
        this.type = 'button';
      }
      if (this.type === 'checkbox' || this.type === 'radio') {
        ancestor = this.element.parents().last();
        labelSelector = 'label[for=\'' + this.element.attr('id') + '\']';
        this.buttonElement = ancestor.find(labelSelector);
        if (!this.buttonElement.length) {
          ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
          this.buttonElement = ancestor.filter(labelSelector);
          if (!this.buttonElement.length) {
            this.buttonElement = ancestor.find(labelSelector);
          }
        }
        this.element.addClass('ui-helper-hidden-accessible');
        checked = this.element.is(':checked');
        if (checked) {
          this.buttonElement.addClass('ui-state-active');
        }
        this.buttonElement.prop('aria-pressed', checked);
      } else {
        this.buttonElement = this.element;
      }
    },
    widget: function () {
      return this.buttonElement;
    },
    _destroy: function () {
      this.element.removeClass('ui-helper-hidden-accessible');
      this.buttonElement.removeClass(baseClasses + ' ' + stateClasses + ' ' + typeClasses).removeAttr('role').removeAttr('aria-pressed').html(this.buttonElement.find('.ui-button-text').html());
      if (!this.hasTitle) {
        this.buttonElement.removeAttr('title');
      }
    },
    _setOption: function (key, value) {
      this._super(key, value);
      if (key === 'disabled') {
        if (value) {
          this.element.prop('disabled', true);
        } else {
          this.element.prop('disabled', false);
        }
        return;
      }
      this._resetButton();
    },
    refresh: function () {
      var isDisabled = this.element.is('input, button') ? this.element.is(':disabled') : this.element.hasClass('ui-button-disabled');
      if (isDisabled !== this.options.disabled) {
        this._setOption('disabled', isDisabled);
      }
      if (this.type === 'radio') {
        radioGroup(this.element[0]).each(function () {
          if ($(this).is(':checked')) {
            $(this).button('widget').addClass('ui-state-active').attr('aria-pressed', 'true');
          } else {
            $(this).button('widget').removeClass('ui-state-active').attr('aria-pressed', 'false');
          }
        });
      } else if (this.type === 'checkbox') {
        if (this.element.is(':checked')) {
          this.buttonElement.addClass('ui-state-active').attr('aria-pressed', 'true');
        } else {
          this.buttonElement.removeClass('ui-state-active').attr('aria-pressed', 'false');
        }
      }
    },
    _resetButton: function () {
      if (this.type === 'input') {
        if (this.options.label) {
          this.element.val(this.options.label);
        }
        return;
      }
      var buttonElement = this.buttonElement.removeClass(typeClasses), buttonText = $('<span></span>', this.document[0]).addClass('ui-button-text').html(this.options.label).appendTo(buttonElement.empty()).text(), icons = this.options.icons, multipleIcons = icons.primary && icons.secondary, buttonClasses = [];
      if (icons.primary || icons.secondary) {
        if (this.options.text) {
          buttonClasses.push('ui-button-text-icon' + (multipleIcons ? 's' : icons.primary ? '-primary' : '-secondary'));
        }
        if (icons.primary) {
          buttonElement.prepend('<span class=\'ui-button-icon-primary ui-icon ' + icons.primary + '\'></span>');
        }
        if (icons.secondary) {
          buttonElement.append('<span class=\'ui-button-icon-secondary ui-icon ' + icons.secondary + '\'></span>');
        }
        if (!this.options.text) {
          buttonClasses.push(multipleIcons ? 'ui-button-icons-only' : 'ui-button-icon-only');
          if (!this.hasTitle) {
            buttonElement.attr('title', $.trim(buttonText));
          }
        }
      } else {
        buttonClasses.push('ui-button-text-only');
      }
      buttonElement.addClass(buttonClasses.join(' '));
    }
  });
  $.widget('ui.buttonset', {
    version: '1.10.3',
    options: { items: 'button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)' },
    _create: function () {
      this.element.addClass('ui-buttonset');
    },
    _init: function () {
      this.refresh();
    },
    _setOption: function (key, value) {
      if (key === 'disabled') {
        this.buttons.button('option', key, value);
      }
      this._super(key, value);
    },
    refresh: function () {
      var rtl = this.element.css('direction') === 'rtl';
      this.buttons = this.element.find(this.options.items).filter(':ui-button').button('refresh').end().not(':ui-button').button().end().map(function () {
        return $(this).button('widget')[0];
      }).removeClass('ui-corner-all ui-corner-left ui-corner-right').filter(':first').addClass(rtl ? 'ui-corner-right' : 'ui-corner-left').end().filter(':last').addClass(rtl ? 'ui-corner-left' : 'ui-corner-right').end().end();
    },
    _destroy: function () {
      this.element.removeClass('ui-buttonset');
      this.buttons.map(function () {
        return $(this).button('widget')[0];
      }).removeClass('ui-corner-left ui-corner-right').end().button('destroy');
    }
  });
}(jQuery));
(function ($, undefined) {
  $.extend($.ui, { datepicker: { version: '1.10.3' } });
  var PROP_NAME = 'datepicker', instActive;
  function Datepicker() {
    this._curInst = null;
    this._keyEvent = false;
    this._disabledInputs = [];
    this._datepickerShowing = false;
    this._inDialog = false;
    this._mainDivId = 'ui-datepicker-div';
    this._inlineClass = 'ui-datepicker-inline';
    this._appendClass = 'ui-datepicker-append';
    this._triggerClass = 'ui-datepicker-trigger';
    this._dialogClass = 'ui-datepicker-dialog';
    this._disableClass = 'ui-datepicker-disabled';
    this._unselectableClass = 'ui-datepicker-unselectable';
    this._currentClass = 'ui-datepicker-current-day';
    this._dayOverClass = 'ui-datepicker-days-cell-over';
    this.regional = [];
    this.regional[''] = {
      closeText: 'Done',
      prevText: 'Prev',
      nextText: 'Next',
      currentText: 'Today',
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      dayNamesShort: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ],
      dayNamesMin: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
      ],
      weekHeader: 'Wk',
      dateFormat: 'mm/dd/yy',
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };
    this._defaults = {
      showOn: 'focus',
      showAnim: 'fadeIn',
      showOptions: {},
      defaultDate: null,
      appendText: '',
      buttonText: '...',
      buttonImage: '',
      buttonImageOnly: false,
      hideIfNoPrevNext: false,
      navigationAsDateFormat: false,
      gotoCurrent: false,
      changeMonth: false,
      changeYear: false,
      yearRange: 'c-10:c+10',
      showOtherMonths: false,
      selectOtherMonths: false,
      showWeek: false,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: '+10',
      minDate: null,
      maxDate: null,
      duration: 'fast',
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: '',
      altFormat: '',
      constrainInput: true,
      showButtonPanel: false,
      autoSize: false,
      disabled: false
    };
    $.extend(this._defaults, this.regional['']);
    this.dpDiv = bindHover($('<div id=\'' + this._mainDivId + '\' class=\'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>'));
  }
  $.extend(Datepicker.prototype, {
    markerClassName: 'hasDatepicker',
    maxRows: 4,
    _widgetDatepicker: function () {
      return this.dpDiv;
    },
    setDefaults: function (settings) {
      extendRemove(this._defaults, settings || {});
      return this;
    },
    _attachDatepicker: function (target, settings) {
      var nodeName, inline, inst;
      nodeName = target.nodeName.toLowerCase();
      inline = nodeName === 'div' || nodeName === 'span';
      if (!target.id) {
        this.uuid += 1;
        target.id = 'dp' + this.uuid;
      }
      inst = this._newInst($(target), inline);
      inst.settings = $.extend({}, settings || {});
      if (nodeName === 'input') {
        this._connectDatepicker(target, inst);
      } else if (inline) {
        this._inlineDatepicker(target, inst);
      }
    },
    _newInst: function (target, inline) {
      var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, '\\\\$1');
      return {
        id: id,
        input: target,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: inline,
        dpDiv: !inline ? this.dpDiv : bindHover($('<div class=\'' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>'))
      };
    },
    _connectDatepicker: function (target, inst) {
      var input = $(target);
      inst.append = $([]);
      inst.trigger = $([]);
      if (input.hasClass(this.markerClassName)) {
        return;
      }
      this._attachments(input, inst);
      input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
      this._autoSize(inst);
      $.data(target, PROP_NAME, inst);
      if (inst.settings.disabled) {
        this._disableDatepicker(target);
      }
    },
    _attachments: function (input, inst) {
      var showOn, buttonText, buttonImage, appendText = this._get(inst, 'appendText'), isRTL = this._get(inst, 'isRTL');
      if (inst.append) {
        inst.append.remove();
      }
      if (appendText) {
        inst.append = $('<span class=\'' + this._appendClass + '\'>' + appendText + '</span>');
        input[isRTL ? 'before' : 'after'](inst.append);
      }
      input.unbind('focus', this._showDatepicker);
      if (inst.trigger) {
        inst.trigger.remove();
      }
      showOn = this._get(inst, 'showOn');
      if (showOn === 'focus' || showOn === 'both') {
        input.focus(this._showDatepicker);
      }
      if (showOn === 'button' || showOn === 'both') {
        buttonText = this._get(inst, 'buttonText');
        buttonImage = this._get(inst, 'buttonImage');
        inst.trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
          src: buttonImage,
          alt: buttonText,
          title: buttonText
        }) : $('<button type=\'button\'></button>').addClass(this._triggerClass).html(!buttonImage ? buttonText : $('<img/>').attr({
          src: buttonImage,
          alt: buttonText,
          title: buttonText
        })));
        input[isRTL ? 'before' : 'after'](inst.trigger);
        inst.trigger.click(function () {
          if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
            $.datepicker._hideDatepicker();
          } else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
            $.datepicker._hideDatepicker();
            $.datepicker._showDatepicker(input[0]);
          } else {
            $.datepicker._showDatepicker(input[0]);
          }
          return false;
        });
      }
    },
    _autoSize: function (inst) {
      if (this._get(inst, 'autoSize') && !inst.inline) {
        var findMax, max, maxI, i, date = new Date(2009, 12 - 1, 20), dateFormat = this._get(inst, 'dateFormat');
        if (dateFormat.match(/[DM]/)) {
          findMax = function (names) {
            max = 0;
            maxI = 0;
            for (i = 0; i < names.length; i++) {
              if (names[i].length > max) {
                max = names[i].length;
                maxI = i;
              }
            }
            return maxI;
          };
          date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? 'monthNames' : 'monthNamesShort')));
          date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? 'dayNames' : 'dayNamesShort')) + 20 - date.getDay());
        }
        inst.input.attr('size', this._formatDate(inst, date).length);
      }
    },
    _inlineDatepicker: function (target, inst) {
      var divSpan = $(target);
      if (divSpan.hasClass(this.markerClassName)) {
        return;
      }
      divSpan.addClass(this.markerClassName).append(inst.dpDiv);
      $.data(target, PROP_NAME, inst);
      this._setDate(inst, this._getDefaultDate(inst), true);
      this._updateDatepicker(inst);
      this._updateAlternate(inst);
      if (inst.settings.disabled) {
        this._disableDatepicker(target);
      }
      inst.dpDiv.css('display', 'block');
    },
    _dialogDatepicker: function (input, date, onSelect, settings, pos) {
      var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
      if (!inst) {
        this.uuid += 1;
        id = 'dp' + this.uuid;
        this._dialogInput = $('<input type=\'text\' id=\'' + id + '\' style=\'position: absolute; top: -100px; width: 0px;\'/>');
        this._dialogInput.keydown(this._doKeyDown);
        $('body').append(this._dialogInput);
        inst = this._dialogInst = this._newInst(this._dialogInput, false);
        inst.settings = {};
        $.data(this._dialogInput[0], PROP_NAME, inst);
      }
      extendRemove(inst.settings, settings || {});
      date = date && date.constructor === Date ? this._formatDate(inst, date) : date;
      this._dialogInput.val(date);
      this._pos = pos ? pos.length ? pos : [
        pos.pageX,
        pos.pageY
      ] : null;
      if (!this._pos) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;
        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        this._pos = [
          browserWidth / 2 - 100 + scrollX,
          browserHeight / 2 - 150 + scrollY
        ];
      }
      this._dialogInput.css('left', this._pos[0] + 20 + 'px').css('top', this._pos[1] + 'px');
      inst.settings.onSelect = onSelect;
      this._inDialog = true;
      this.dpDiv.addClass(this._dialogClass);
      this._showDatepicker(this._dialogInput[0]);
      if ($.blockUI) {
        $.blockUI(this.dpDiv);
      }
      $.data(this._dialogInput[0], PROP_NAME, inst);
      return this;
    },
    _destroyDatepicker: function (target) {
      var nodeName, $target = $(target), inst = $.data(target, PROP_NAME);
      if (!$target.hasClass(this.markerClassName)) {
        return;
      }
      nodeName = target.nodeName.toLowerCase();
      $.removeData(target, PROP_NAME);
      if (nodeName === 'input') {
        inst.append.remove();
        inst.trigger.remove();
        $target.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp);
      } else if (nodeName === 'div' || nodeName === 'span') {
        $target.removeClass(this.markerClassName).empty();
      }
    },
    _enableDatepicker: function (target) {
      var nodeName, inline, $target = $(target), inst = $.data(target, PROP_NAME);
      if (!$target.hasClass(this.markerClassName)) {
        return;
      }
      nodeName = target.nodeName.toLowerCase();
      if (nodeName === 'input') {
        target.disabled = false;
        inst.trigger.filter('button').each(function () {
          this.disabled = false;
        }).end().filter('img').css({
          opacity: '1.0',
          cursor: ''
        });
      } else if (nodeName === 'div' || nodeName === 'span') {
        inline = $target.children('.' + this._inlineClass);
        inline.children().removeClass('ui-state-disabled');
        inline.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', false);
      }
      this._disabledInputs = $.map(this._disabledInputs, function (value) {
        return value === target ? null : value;
      });
    },
    _disableDatepicker: function (target) {
      var nodeName, inline, $target = $(target), inst = $.data(target, PROP_NAME);
      if (!$target.hasClass(this.markerClassName)) {
        return;
      }
      nodeName = target.nodeName.toLowerCase();
      if (nodeName === 'input') {
        target.disabled = true;
        inst.trigger.filter('button').each(function () {
          this.disabled = true;
        }).end().filter('img').css({
          opacity: '0.5',
          cursor: 'default'
        });
      } else if (nodeName === 'div' || nodeName === 'span') {
        inline = $target.children('.' + this._inlineClass);
        inline.children().addClass('ui-state-disabled');
        inline.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', true);
      }
      this._disabledInputs = $.map(this._disabledInputs, function (value) {
        return value === target ? null : value;
      });
      this._disabledInputs[this._disabledInputs.length] = target;
    },
    _isDisabledDatepicker: function (target) {
      if (!target) {
        return false;
      }
      for (var i = 0; i < this._disabledInputs.length; i++) {
        if (this._disabledInputs[i] === target) {
          return true;
        }
      }
      return false;
    },
    _getInst: function (target) {
      try {
        return $.data(target, PROP_NAME);
      } catch (err) {
        throw 'Missing instance data for this datepicker';
      }
    },
    _optionDatepicker: function (target, name, value) {
      var settings, date, minDate, maxDate, inst = this._getInst(target);
      if (arguments.length === 2 && typeof name === 'string') {
        return name === 'defaults' ? $.extend({}, $.datepicker._defaults) : inst ? name === 'all' ? $.extend({}, inst.settings) : this._get(inst, name) : null;
      }
      settings = name || {};
      if (typeof name === 'string') {
        settings = {};
        settings[name] = value;
      }
      if (inst) {
        if (this._curInst === inst) {
          this._hideDatepicker();
        }
        date = this._getDateDatepicker(target, true);
        minDate = this._getMinMaxDate(inst, 'min');
        maxDate = this._getMinMaxDate(inst, 'max');
        extendRemove(inst.settings, settings);
        if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
          inst.settings.minDate = this._formatDate(inst, minDate);
        }
        if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
          inst.settings.maxDate = this._formatDate(inst, maxDate);
        }
        if ('disabled' in settings) {
          if (settings.disabled) {
            this._disableDatepicker(target);
          } else {
            this._enableDatepicker(target);
          }
        }
        this._attachments($(target), inst);
        this._autoSize(inst);
        this._setDate(inst, date);
        this._updateAlternate(inst);
        this._updateDatepicker(inst);
      }
    },
    _changeDatepicker: function (target, name, value) {
      this._optionDatepicker(target, name, value);
    },
    _refreshDatepicker: function (target) {
      var inst = this._getInst(target);
      if (inst) {
        this._updateDatepicker(inst);
      }
    },
    _setDateDatepicker: function (target, date) {
      var inst = this._getInst(target);
      if (inst) {
        this._setDate(inst, date);
        this._updateDatepicker(inst);
        this._updateAlternate(inst);
      }
    },
    _getDateDatepicker: function (target, noDefault) {
      var inst = this._getInst(target);
      if (inst && !inst.inline) {
        this._setDateFromField(inst, noDefault);
      }
      return inst ? this._getDate(inst) : null;
    },
    _doKeyDown: function (event) {
      var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target), handled = true, isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
      inst._keyEvent = true;
      if ($.datepicker._datepickerShowing) {
        switch (event.keyCode) {
        case 9:
          $.datepicker._hideDatepicker();
          handled = false;
          break;
        case 13:
          sel = $('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')', inst.dpDiv);
          if (sel[0]) {
            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
          }
          onSelect = $.datepicker._get(inst, 'onSelect');
          if (onSelect) {
            dateStr = $.datepicker._formatDate(inst);
            onSelect.apply(inst.input ? inst.input[0] : null, [
              dateStr,
              inst
            ]);
          } else {
            $.datepicker._hideDatepicker();
          }
          return false;
        case 27:
          $.datepicker._hideDatepicker();
          break;
        case 33:
          $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths'), 'M');
          break;
        case 34:
          $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths'), 'M');
          break;
        case 35:
          if (event.ctrlKey || event.metaKey) {
            $.datepicker._clearDate(event.target);
          }
          handled = event.ctrlKey || event.metaKey;
          break;
        case 36:
          if (event.ctrlKey || event.metaKey) {
            $.datepicker._gotoToday(event.target);
          }
          handled = event.ctrlKey || event.metaKey;
          break;
        case 37:
          if (event.ctrlKey || event.metaKey) {
            $.datepicker._adjustDate(event.target, isRTL ? +1 : -1, 'D');
          }
          handled = event.ctrlKey || event.metaKey;
          if (event.originalEvent.altKey) {
            $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths'), 'M');
          }
          break;
        case 38:
          if (event.ctrlKey || event.metaKey) {
            $.datepicker._adjustDate(event.target, -7, 'D');
          }
          handled = event.ctrlKey || event.metaKey;
          break;
        case 39:
          if (event.ctrlKey || event.metaKey) {
            $.datepicker._adjustDate(event.target, isRTL ? -1 : +1, 'D');
          }
          handled = event.ctrlKey || event.metaKey;
          if (event.originalEvent.altKey) {
            $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths'), 'M');
          }
          break;
        case 40:
          if (event.ctrlKey || event.metaKey) {
            $.datepicker._adjustDate(event.target, +7, 'D');
          }
          handled = event.ctrlKey || event.metaKey;
          break;
        default:
          handled = false;
        }
      } else if (event.keyCode === 36 && event.ctrlKey) {
        $.datepicker._showDatepicker(this);
      } else {
        handled = false;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    _doKeyPress: function (event) {
      var chars, chr, inst = $.datepicker._getInst(event.target);
      if ($.datepicker._get(inst, 'constrainInput')) {
        chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
        chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
        return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
      }
    },
    _doKeyUp: function (event) {
      var date, inst = $.datepicker._getInst(event.target);
      if (inst.input.val() !== inst.lastVal) {
        try {
          date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));
          if (date) {
            $.datepicker._setDateFromField(inst);
            $.datepicker._updateAlternate(inst);
            $.datepicker._updateDatepicker(inst);
          }
        } catch (err) {
        }
      }
      return true;
    },
    _showDatepicker: function (input) {
      input = input.target || input;
      if (input.nodeName.toLowerCase() !== 'input') {
        input = $('input', input.parentNode)[0];
      }
      if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) {
        return;
      }
      var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
      inst = $.datepicker._getInst(input);
      if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
        $.datepicker._curInst.dpDiv.stop(true, true);
        if (inst && $.datepicker._datepickerShowing) {
          $.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
        }
      }
      beforeShow = $.datepicker._get(inst, 'beforeShow');
      beforeShowSettings = beforeShow ? beforeShow.apply(input, [
        input,
        inst
      ]) : {};
      if (beforeShowSettings === false) {
        return;
      }
      extendRemove(inst.settings, beforeShowSettings);
      inst.lastVal = null;
      $.datepicker._lastInput = input;
      $.datepicker._setDateFromField(inst);
      if ($.datepicker._inDialog) {
        input.value = '';
      }
      if (!$.datepicker._pos) {
        $.datepicker._pos = $.datepicker._findPos(input);
        $.datepicker._pos[1] += input.offsetHeight;
      }
      isFixed = false;
      $(input).parents().each(function () {
        isFixed |= $(this).css('position') === 'fixed';
        return !isFixed;
      });
      offset = {
        left: $.datepicker._pos[0],
        top: $.datepicker._pos[1]
      };
      $.datepicker._pos = null;
      inst.dpDiv.empty();
      inst.dpDiv.css({
        position: 'absolute',
        display: 'block',
        top: '-1000px'
      });
      $.datepicker._updateDatepicker(inst);
      offset = $.datepicker._checkOffset(inst, offset, isFixed);
      inst.dpDiv.css({
        position: $.datepicker._inDialog && $.blockUI ? 'static' : isFixed ? 'fixed' : 'absolute',
        display: 'none',
        left: offset.left + 'px',
        top: offset.top + 'px'
      });
      if (!inst.inline) {
        showAnim = $.datepicker._get(inst, 'showAnim');
        duration = $.datepicker._get(inst, 'duration');
        inst.dpDiv.zIndex($(input).zIndex() + 1);
        $.datepicker._datepickerShowing = true;
        if ($.effects && $.effects.effect[showAnim]) {
          inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration);
        } else {
          inst.dpDiv[showAnim || 'show'](showAnim ? duration : null);
        }
        if ($.datepicker._shouldFocusInput(inst)) {
          inst.input.focus();
        }
        $.datepicker._curInst = inst;
      }
    },
    _updateDatepicker: function (inst) {
      this.maxRows = 4;
      instActive = inst;
      inst.dpDiv.empty().append(this._generateHTML(inst));
      this._attachHandlers(inst);
      inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
      var origyearshtml, numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], width = 17;
      inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
      if (cols > 1) {
        inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', width * cols + 'em');
      }
      inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? 'add' : 'remove') + 'Class']('ui-datepicker-multi');
      inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl');
      if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) {
        inst.input.focus();
      }
      if (inst.yearshtml) {
        origyearshtml = inst.yearshtml;
        setTimeout(function () {
          if (origyearshtml === inst.yearshtml && inst.yearshtml) {
            inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
          }
          origyearshtml = inst.yearshtml = null;
        }, 0);
      }
    },
    _shouldFocusInput: function (inst) {
      return inst.input && inst.input.is(':visible') && !inst.input.is(':disabled') && !inst.input.is(':focus');
    },
    _checkOffset: function (inst, offset, isFixed) {
      var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() : 0, inputHeight = inst.input ? inst.input.outerHeight() : 0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
      offset.left -= this._get(inst, 'isRTL') ? dpWidth - inputWidth : 0;
      offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0;
      offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0;
      offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
      offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0);
      return offset;
    },
    _findPos: function (obj) {
      var position, inst = this._getInst(obj), isRTL = this._get(inst, 'isRTL');
      while (obj && (obj.type === 'hidden' || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
        obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
      }
      position = $(obj).offset();
      return [
        position.left,
        position.top
      ];
    },
    _hideDatepicker: function (input) {
      var showAnim, duration, postProcess, onClose, inst = this._curInst;
      if (!inst || input && inst !== $.data(input, PROP_NAME)) {
        return;
      }
      if (this._datepickerShowing) {
        showAnim = this._get(inst, 'showAnim');
        duration = this._get(inst, 'duration');
        postProcess = function () {
          $.datepicker._tidyDialog(inst);
        };
        if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
          inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
        } else {
          inst.dpDiv[showAnim === 'slideDown' ? 'slideUp' : showAnim === 'fadeIn' ? 'fadeOut' : 'hide'](showAnim ? duration : null, postProcess);
        }
        if (!showAnim) {
          postProcess();
        }
        this._datepickerShowing = false;
        onClose = this._get(inst, 'onClose');
        if (onClose) {
          onClose.apply(inst.input ? inst.input[0] : null, [
            inst.input ? inst.input.val() : '',
            inst
          ]);
        }
        this._lastInput = null;
        if (this._inDialog) {
          this._dialogInput.css({
            position: 'absolute',
            left: '0',
            top: '-100px'
          });
          if ($.blockUI) {
            $.unblockUI();
            $('body').append(this.dpDiv);
          }
        }
        this._inDialog = false;
      }
    },
    _tidyDialog: function (inst) {
      inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
    },
    _checkExternalClick: function (event) {
      if (!$.datepicker._curInst) {
        return;
      }
      var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
      if ($target[0].id !== $.datepicker._mainDivId && $target.parents('#' + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest('.' + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) {
        $.datepicker._hideDatepicker();
      }
    },
    _adjustDate: function (id, offset, period) {
      var target = $(id), inst = this._getInst(target[0]);
      if (this._isDisabledDatepicker(target[0])) {
        return;
      }
      this._adjustInstDate(inst, offset + (period === 'M' ? this._get(inst, 'showCurrentAtPos') : 0), period);
      this._updateDatepicker(inst);
    },
    _gotoToday: function (id) {
      var date, target = $(id), inst = this._getInst(target[0]);
      if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
        inst.selectedDay = inst.currentDay;
        inst.drawMonth = inst.selectedMonth = inst.currentMonth;
        inst.drawYear = inst.selectedYear = inst.currentYear;
      } else {
        date = new Date();
        inst.selectedDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = date.getFullYear();
      }
      this._notifyChange(inst);
      this._adjustDate(target);
    },
    _selectMonthYear: function (id, select, period) {
      var target = $(id), inst = this._getInst(target[0]);
      inst['selected' + (period === 'M' ? 'Month' : 'Year')] = inst['draw' + (period === 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
      this._notifyChange(inst);
      this._adjustDate(target);
    },
    _selectDay: function (id, month, year, td) {
      var inst, target = $(id);
      if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
        return;
      }
      inst = this._getInst(target[0]);
      inst.selectedDay = inst.currentDay = $('a', td).html();
      inst.selectedMonth = inst.currentMonth = month;
      inst.selectedYear = inst.currentYear = year;
      this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
    },
    _clearDate: function (id) {
      var target = $(id);
      this._selectDate(target, '');
    },
    _selectDate: function (id, dateStr) {
      var onSelect, target = $(id), inst = this._getInst(target[0]);
      dateStr = dateStr != null ? dateStr : this._formatDate(inst);
      if (inst.input) {
        inst.input.val(dateStr);
      }
      this._updateAlternate(inst);
      onSelect = this._get(inst, 'onSelect');
      if (onSelect) {
        onSelect.apply(inst.input ? inst.input[0] : null, [
          dateStr,
          inst
        ]);
      } else if (inst.input) {
        inst.input.trigger('change');
      }
      if (inst.inline) {
        this._updateDatepicker(inst);
      } else {
        this._hideDatepicker();
        this._lastInput = inst.input[0];
        if (typeof inst.input[0] !== 'object') {
          inst.input.focus();
        }
        this._lastInput = null;
      }
    },
    _updateAlternate: function (inst) {
      var altFormat, date, dateStr, altField = this._get(inst, 'altField');
      if (altField) {
        altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
        date = this._getDate(inst);
        dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
        $(altField).each(function () {
          $(this).val(dateStr);
        });
      }
    },
    noWeekends: function (date) {
      var day = date.getDay();
      return [
        day > 0 && day < 6,
        ''
      ];
    },
    iso8601Week: function (date) {
      var time, checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
    },
    parseDate: function (format, value, settings) {
      if (format == null || value == null) {
        throw 'Invalid arguments';
      }
      value = typeof value === 'object' ? value.toString() : value + '';
      if (value === '') {
        return null;
      }
      var iFormat, dim, extra, iValue = 0, shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, shortYearCutoff = typeof shortYearCutoffTemp !== 'string' ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10), dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = function (match) {
          var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        }, getNumber = function (match) {
          var isDoubled = lookAhead(match), size = match === '@' ? 14 : match === '!' ? 20 : match === 'y' && isDoubled ? 4 : match === 'o' ? 3 : 2, digits = new RegExp('^\\d{1,' + size + '}'), num = value.substring(iValue).match(digits);
          if (!num) {
            throw 'Missing number at position ' + iValue;
          }
          iValue += num[0].length;
          return parseInt(num[0], 10);
        }, getName = function (match, shortNames, longNames) {
          var index = -1, names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
              return [[
                  k,
                  v
                ]];
            }).sort(function (a, b) {
              return -(a[1].length - b[1].length);
            });
          $.each(names, function (i, pair) {
            var name = pair[1];
            if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
              index = pair[0];
              iValue += name.length;
              return false;
            }
          });
          if (index !== -1) {
            return index + 1;
          } else {
            throw 'Unknown name at position ' + iValue;
          }
        }, checkLiteral = function () {
          if (value.charAt(iValue) !== format.charAt(iFormat)) {
            throw 'Unexpected literal at position ' + iValue;
          }
          iValue++;
        };
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
          case 'd':
            day = getNumber('d');
            break;
          case 'D':
            getName('D', dayNamesShort, dayNames);
            break;
          case 'o':
            doy = getNumber('o');
            break;
          case 'm':
            month = getNumber('m');
            break;
          case 'M':
            month = getName('M', monthNamesShort, monthNames);
            break;
          case 'y':
            year = getNumber('y');
            break;
          case '@':
            date = new Date(getNumber('@'));
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case '!':
            date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case '\'':
            if (lookAhead('\'')) {
              checkLiteral();
            } else {
              literal = true;
            }
            break;
          default:
            checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        extra = value.substr(iValue);
        if (!/^\s+/.test(extra)) {
          throw 'Extra/unparsed characters found in date: ' + extra;
        }
      }
      if (year === -1) {
        year = new Date().getFullYear();
      } else if (year < 100) {
        year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        do {
          dim = this._getDaysInMonth(year, month - 1);
          if (day <= dim) {
            break;
          }
          month++;
          day -= dim;
        } while (true);
      }
      date = this._daylightSavingAdjust(new Date(year, month - 1, day));
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw 'Invalid date';
      }
      return date;
    },
    ATOM: 'yy-mm-dd',
    COOKIE: 'D, dd M yy',
    ISO_8601: 'yy-mm-dd',
    RFC_822: 'D, d M y',
    RFC_850: 'DD, dd-M-y',
    RFC_1036: 'D, d M y',
    RFC_1123: 'D, d M yy',
    RFC_2822: 'D, d M yy',
    RSS: 'D, d M y',
    TICKS: '!',
    TIMESTAMP: '@',
    W3C: 'yy-mm-dd',
    _ticksTo1970: ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000,
    formatDate: function (format, date, settings) {
      if (!date) {
        return '';
      }
      var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, lookAhead = function (match) {
          var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        }, formatNumber = function (match, value, len) {
          var num = '' + value;
          if (lookAhead(match)) {
            while (num.length < len) {
              num = '0' + num;
            }
          }
          return num;
        }, formatName = function (match, value, shortNames, longNames) {
          return lookAhead(match) ? longNames[value] : shortNames[value];
        }, output = '', literal = false;
      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
              literal = false;
            } else {
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', date.getDate(), 2);
              break;
            case 'D':
              output += formatName('D', date.getDay(), dayNamesShort, dayNames);
              break;
            case 'o':
              output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
              break;
            case 'm':
              output += formatNumber('m', date.getMonth() + 1, 2);
              break;
            case 'M':
              output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
              break;
            case 'y':
              output += lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100;
              break;
            case '@':
              output += date.getTime();
              break;
            case '!':
              output += date.getTime() * 10000 + this._ticksTo1970;
              break;
            case '\'':
              if (lookAhead('\'')) {
                output += '\'';
              } else {
                literal = true;
              }
              break;
            default:
              output += format.charAt(iFormat);
            }
          }
        }
      }
      return output;
    },
    _possibleChars: function (format) {
      var iFormat, chars = '', literal = false, lookAhead = function (match) {
          var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        };
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
            literal = false;
          } else {
            chars += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
          case 'd':
          case 'm':
          case 'y':
          case '@':
            chars += '0123456789';
            break;
          case 'D':
          case 'M':
            return null;
          case '\'':
            if (lookAhead('\'')) {
              chars += '\'';
            } else {
              literal = true;
            }
            break;
          default:
            chars += format.charAt(iFormat);
          }
        }
      }
      return chars;
    },
    _get: function (inst, name) {
      return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
    },
    _setDateFromField: function (inst, noDefault) {
      if (inst.input.val() === inst.lastVal) {
        return;
      }
      var dateFormat = this._get(inst, 'dateFormat'), dates = inst.lastVal = inst.input ? inst.input.val() : null, defaultDate = this._getDefaultDate(inst), date = defaultDate, settings = this._getFormatConfig(inst);
      try {
        date = this.parseDate(dateFormat, dates, settings) || defaultDate;
      } catch (event) {
        dates = noDefault ? '' : dates;
      }
      inst.selectedDay = date.getDate();
      inst.drawMonth = inst.selectedMonth = date.getMonth();
      inst.drawYear = inst.selectedYear = date.getFullYear();
      inst.currentDay = dates ? date.getDate() : 0;
      inst.currentMonth = dates ? date.getMonth() : 0;
      inst.currentYear = dates ? date.getFullYear() : 0;
      this._adjustInstDate(inst);
    },
    _getDefaultDate: function (inst) {
      return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
    },
    _determineDate: function (inst, date, defaultDate) {
      var offsetNumeric = function (offset) {
          var date = new Date();
          date.setDate(date.getDate() + offset);
          return date;
        }, offsetString = function (offset) {
          try {
            return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), offset, $.datepicker._getFormatConfig(inst));
          } catch (e) {
          }
          var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset);
          while (matches) {
            switch (matches[2] || 'd') {
            case 'd':
            case 'D':
              day += parseInt(matches[1], 10);
              break;
            case 'w':
            case 'W':
              day += parseInt(matches[1], 10) * 7;
              break;
            case 'm':
            case 'M':
              month += parseInt(matches[1], 10);
              day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
              break;
            case 'y':
            case 'Y':
              year += parseInt(matches[1], 10);
              day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
              break;
            }
            matches = pattern.exec(offset);
          }
          return new Date(year, month, day);
        }, newDate = date == null || date === '' ? defaultDate : typeof date === 'string' ? offsetString(date) : typeof date === 'number' ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
      newDate = newDate && newDate.toString() === 'Invalid Date' ? defaultDate : newDate;
      if (newDate) {
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
      }
      return this._daylightSavingAdjust(newDate);
    },
    _daylightSavingAdjust: function (date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    },
    _setDate: function (inst, date, noChange) {
      var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
      inst.selectedDay = inst.currentDay = newDate.getDate();
      inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
      inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
      if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
        this._notifyChange(inst);
      }
      this._adjustInstDate(inst);
      if (inst.input) {
        inst.input.val(clear ? '' : this._formatDate(inst));
      }
    },
    _getDate: function (inst) {
      var startDate = !inst.currentYear || inst.input && inst.input.val() === '' ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
      return startDate;
    },
    _attachHandlers: function (inst) {
      var stepMonths = this._get(inst, 'stepMonths'), id = '#' + inst.id.replace(/\\\\/g, '\\');
      inst.dpDiv.find('[data-handler]').map(function () {
        var handler = {
            prev: function () {
              $.datepicker._adjustDate(id, -stepMonths, 'M');
            },
            next: function () {
              $.datepicker._adjustDate(id, +stepMonths, 'M');
            },
            hide: function () {
              $.datepicker._hideDatepicker();
            },
            today: function () {
              $.datepicker._gotoToday(id);
            },
            selectDay: function () {
              $.datepicker._selectDay(id, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this);
              return false;
            },
            selectMonth: function () {
              $.datepicker._selectMonthYear(id, this, 'M');
              return false;
            },
            selectYear: function () {
              $.datepicker._selectMonthYear(id, this, 'Y');
              return false;
            }
          };
        $(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
      });
    },
    _generateHTML: function (inst) {
      var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date(), today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), isRTL = this._get(inst, 'isRTL'), showButtonPanel = this._get(inst, 'showButtonPanel'), hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext'), navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat'), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, 'showCurrentAtPos'), stepMonths = this._get(inst, 'stepMonths'), isMultiMonth = numMonths[0] !== 1 || numMonths[1] !== 1, currentDate = this._daylightSavingAdjust(!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)), minDate = this._getMinMaxDate(inst, 'min'), maxDate = this._getMinMaxDate(inst, 'max'), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
      if (drawMonth < 0) {
        drawMonth += 12;
        drawYear--;
      }
      if (maxDate) {
        maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
        maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
        while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
          drawMonth--;
          if (drawMonth < 0) {
            drawMonth = 11;
            drawYear--;
          }
        }
      }
      inst.drawMonth = drawMonth;
      inst.drawYear = drawYear;
      prevText = this._get(inst, 'prevText');
      prevText = !navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst));
      prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class=\'ui-datepicker-prev ui-corner-all\' data-handler=\'prev\' data-event=\'click\'' + ' title=\'' + prevText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '\'>' + prevText + '</span></a>' : hideIfNoPrevNext ? '' : '<a class=\'ui-datepicker-prev ui-corner-all ui-state-disabled\' title=\'' + prevText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '\'>' + prevText + '</span></a>';
      nextText = this._get(inst, 'nextText');
      nextText = !navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst));
      next = this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class=\'ui-datepicker-next ui-corner-all\' data-handler=\'next\' data-event=\'click\'' + ' title=\'' + nextText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '\'>' + nextText + '</span></a>' : hideIfNoPrevNext ? '' : '<a class=\'ui-datepicker-next ui-corner-all ui-state-disabled\' title=\'' + nextText + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '\'>' + nextText + '</span></a>';
      currentText = this._get(inst, 'currentText');
      gotoDate = this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today;
      currentText = !navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));
      controls = !inst.inline ? '<button type=\'button\' class=\'ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all\' data-handler=\'hide\' data-event=\'click\'>' + this._get(inst, 'closeText') + '</button>' : '';
      buttonPanel = showButtonPanel ? '<div class=\'ui-datepicker-buttonpane ui-widget-content\'>' + (isRTL ? controls : '') + (this._isInRange(inst, gotoDate) ? '<button type=\'button\' class=\'ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all\' data-handler=\'today\' data-event=\'click\'' + '>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
      firstDay = parseInt(this._get(inst, 'firstDay'), 10);
      firstDay = isNaN(firstDay) ? 0 : firstDay;
      showWeek = this._get(inst, 'showWeek');
      dayNames = this._get(inst, 'dayNames');
      dayNamesMin = this._get(inst, 'dayNamesMin');
      monthNames = this._get(inst, 'monthNames');
      monthNamesShort = this._get(inst, 'monthNamesShort');
      beforeShowDay = this._get(inst, 'beforeShowDay');
      showOtherMonths = this._get(inst, 'showOtherMonths');
      selectOtherMonths = this._get(inst, 'selectOtherMonths');
      defaultDate = this._getDefaultDate(inst);
      html = '';
      dow;
      for (row = 0; row < numMonths[0]; row++) {
        group = '';
        this.maxRows = 4;
        for (col = 0; col < numMonths[1]; col++) {
          selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
          cornerClass = ' ui-corner-all';
          calender = '';
          if (isMultiMonth) {
            calender += '<div class=\'ui-datepicker-group';
            if (numMonths[1] > 1) {
              switch (col) {
              case 0:
                calender += ' ui-datepicker-group-first';
                cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left');
                break;
              case numMonths[1] - 1:
                calender += ' ui-datepicker-group-last';
                cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right');
                break;
              default:
                calender += ' ui-datepicker-group-middle';
                cornerClass = '';
                break;
              }
            }
            calender += '\'>';
          }
          calender += '<div class=\'ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '\'>' + (/all|left/.test(cornerClass) && row === 0 ? isRTL ? next : prev : '') + (/all|right/.test(cornerClass) && row === 0 ? isRTL ? prev : next : '') + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class=\'ui-datepicker-calendar\'><thead>' + '<tr>';
          thead = showWeek ? '<th class=\'ui-datepicker-week-col\'>' + this._get(inst, 'weekHeader') + '</th>' : '';
          for (dow = 0; dow < 7; dow++) {
            day = (dow + firstDay) % 7;
            thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class=\'ui-datepicker-week-end\'' : '') + '>' + '<span title=\'' + dayNames[day] + '\'>' + dayNamesMin[day] + '</span></th>';
          }
          calender += thead + '</tr></thead><tbody>';
          daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
          if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
            inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
          }
          leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
          curRows = Math.ceil((leadDays + daysInMonth) / 7);
          numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows;
          this.maxRows = numRows;
          printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
          for (dRow = 0; dRow < numRows; dRow++) {
            calender += '<tr>';
            tbody = !showWeek ? '' : '<td class=\'ui-datepicker-week-col\'>' + this._get(inst, 'calculateWeek')(printDate) + '</td>';
            for (dow = 0; dow < 7; dow++) {
              daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [
                true,
                ''
              ];
              otherMonth = printDate.getMonth() !== drawMonth;
              unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
              tbody += '<td class=\'' + ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + (otherMonth ? ' ui-datepicker-other-month' : '') + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? ' ' + this._dayOverClass : '') + (unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? ' ' + this._currentClass : '') + (printDate.getTime() === today.getTime() ? ' ui-datepicker-today' : '')) + '\'' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title=\'' + daySettings[2].replace(/'/g, '&#39;') + '\'' : '') + (unselectable ? '' : ' data-handler=\'selectDay\' data-event=\'click\' data-month=\'' + printDate.getMonth() + '\' data-year=\'' + printDate.getFullYear() + '\'') + '>' + (otherMonth && !showOtherMonths ? '&#xa0;' : unselectable ? '<span class=\'ui-state-default\'>' + printDate.getDate() + '</span>' : '<a class=\'ui-state-default' + (printDate.getTime() === today.getTime() ? ' ui-state-highlight' : '') + (printDate.getTime() === currentDate.getTime() ? ' ui-state-active' : '') + (otherMonth ? ' ui-priority-secondary' : '') + '\' href=\'#\'>' + printDate.getDate() + '</a>') + '</td>';
              printDate.setDate(printDate.getDate() + 1);
              printDate = this._daylightSavingAdjust(printDate);
            }
            calender += tbody + '</tr>';
          }
          drawMonth++;
          if (drawMonth > 11) {
            drawMonth = 0;
            drawYear++;
          }
          calender += '</tbody></table>' + (isMultiMonth ? '</div>' + (numMonths[0] > 0 && col === numMonths[1] - 1 ? '<div class=\'ui-datepicker-row-break\'></div>' : '') : '');
          group += calender;
        }
        html += group;
      }
      html += buttonPanel;
      inst._keyEvent = false;
      return html;
    },
    _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
      var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, 'changeMonth'), changeYear = this._get(inst, 'changeYear'), showMonthAfterYear = this._get(inst, 'showMonthAfterYear'), html = '<div class=\'ui-datepicker-title\'>', monthHtml = '';
      if (secondary || !changeMonth) {
        monthHtml += '<span class=\'ui-datepicker-month\'>' + monthNames[drawMonth] + '</span>';
      } else {
        inMinYear = minDate && minDate.getFullYear() === drawYear;
        inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
        monthHtml += '<select class=\'ui-datepicker-month\' data-handler=\'selectMonth\' data-event=\'change\'>';
        for (month = 0; month < 12; month++) {
          if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
            monthHtml += '<option value=\'' + month + '\'' + (month === drawMonth ? ' selected=\'selected\'' : '') + '>' + monthNamesShort[month] + '</option>';
          }
        }
        monthHtml += '</select>';
      }
      if (!showMonthAfterYear) {
        html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
      }
      if (!inst.yearshtml) {
        inst.yearshtml = '';
        if (secondary || !changeYear) {
          html += '<span class=\'ui-datepicker-year\'>' + drawYear + '</span>';
        } else {
          years = this._get(inst, 'yearRange').split(':');
          thisYear = new Date().getFullYear();
          determineYear = function (value) {
            var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
            return isNaN(year) ? thisYear : year;
          };
          year = determineYear(years[0]);
          endYear = Math.max(year, determineYear(years[1] || ''));
          year = minDate ? Math.max(year, minDate.getFullYear()) : year;
          endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear;
          inst.yearshtml += '<select class=\'ui-datepicker-year\' data-handler=\'selectYear\' data-event=\'change\'>';
          for (; year <= endYear; year++) {
            inst.yearshtml += '<option value=\'' + year + '\'' + (year === drawYear ? ' selected=\'selected\'' : '') + '>' + year + '</option>';
          }
          inst.yearshtml += '</select>';
          html += inst.yearshtml;
          inst.yearshtml = null;
        }
      }
      html += this._get(inst, 'yearSuffix');
      if (showMonthAfterYear) {
        html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
      }
      html += '</div>';
      return html;
    },
    _adjustInstDate: function (inst, offset, period) {
      var year = inst.drawYear + (period === 'Y' ? offset : 0), month = inst.drawMonth + (period === 'M' ? offset : 0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === 'D' ? offset : 0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
      inst.selectedDay = date.getDate();
      inst.drawMonth = inst.selectedMonth = date.getMonth();
      inst.drawYear = inst.selectedYear = date.getFullYear();
      if (period === 'M' || period === 'Y') {
        this._notifyChange(inst);
      }
    },
    _restrictMinMax: function (inst, date) {
      var minDate = this._getMinMaxDate(inst, 'min'), maxDate = this._getMinMaxDate(inst, 'max'), newDate = minDate && date < minDate ? minDate : date;
      return maxDate && newDate > maxDate ? maxDate : newDate;
    },
    _notifyChange: function (inst) {
      var onChange = this._get(inst, 'onChangeMonthYear');
      if (onChange) {
        onChange.apply(inst.input ? inst.input[0] : null, [
          inst.selectedYear,
          inst.selectedMonth + 1,
          inst
        ]);
      }
    },
    _getNumberOfMonths: function (inst) {
      var numMonths = this._get(inst, 'numberOfMonths');
      return numMonths == null ? [
        1,
        1
      ] : typeof numMonths === 'number' ? [
        1,
        numMonths
      ] : numMonths;
    },
    _getMinMaxDate: function (inst, minMax) {
      return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
    },
    _getDaysInMonth: function (year, month) {
      return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
    },
    _getFirstDayOfMonth: function (year, month) {
      return new Date(year, month, 1).getDay();
    },
    _canAdjustMonth: function (inst, offset, curYear, curMonth) {
      var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
      if (offset < 0) {
        date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
      }
      return this._isInRange(inst, date);
    },
    _isInRange: function (inst, date) {
      var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, 'min'), maxDate = this._getMinMaxDate(inst, 'max'), minYear = null, maxYear = null, years = this._get(inst, 'yearRange');
      if (years) {
        yearSplit = years.split(':');
        currentYear = new Date().getFullYear();
        minYear = parseInt(yearSplit[0], 10);
        maxYear = parseInt(yearSplit[1], 10);
        if (yearSplit[0].match(/[+\-].*/)) {
          minYear += currentYear;
        }
        if (yearSplit[1].match(/[+\-].*/)) {
          maxYear += currentYear;
        }
      }
      return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
    },
    _getFormatConfig: function (inst) {
      var shortYearCutoff = this._get(inst, 'shortYearCutoff');
      shortYearCutoff = typeof shortYearCutoff !== 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
      return {
        shortYearCutoff: shortYearCutoff,
        dayNamesShort: this._get(inst, 'dayNamesShort'),
        dayNames: this._get(inst, 'dayNames'),
        monthNamesShort: this._get(inst, 'monthNamesShort'),
        monthNames: this._get(inst, 'monthNames')
      };
    },
    _formatDate: function (inst, day, month, year) {
      if (!day) {
        inst.currentDay = inst.selectedDay;
        inst.currentMonth = inst.selectedMonth;
        inst.currentYear = inst.selectedYear;
      }
      var date = day ? typeof day === 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
      return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
    }
  });
  function bindHover(dpDiv) {
    var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
    return dpDiv.delegate(selector, 'mouseout', function () {
      $(this).removeClass('ui-state-hover');
      if (this.className.indexOf('ui-datepicker-prev') !== -1) {
        $(this).removeClass('ui-datepicker-prev-hover');
      }
      if (this.className.indexOf('ui-datepicker-next') !== -1) {
        $(this).removeClass('ui-datepicker-next-hover');
      }
    }).delegate(selector, 'mouseover', function () {
      if (!$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
        $(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
        $(this).addClass('ui-state-hover');
        if (this.className.indexOf('ui-datepicker-prev') !== -1) {
          $(this).addClass('ui-datepicker-prev-hover');
        }
        if (this.className.indexOf('ui-datepicker-next') !== -1) {
          $(this).addClass('ui-datepicker-next-hover');
        }
      }
    });
  }
  function extendRemove(target, props) {
    $.extend(target, props);
    for (var name in props) {
      if (props[name] == null) {
        target[name] = props[name];
      }
    }
    return target;
  }
  $.fn.datepicker = function (options) {
    if (!this.length) {
      return this;
    }
    if (!$.datepicker.initialized) {
      $(document).mousedown($.datepicker._checkExternalClick);
      $.datepicker.initialized = true;
    }
    if ($('#' + $.datepicker._mainDivId).length === 0) {
      $('body').append($.datepicker.dpDiv);
    }
    var otherArgs = Array.prototype.slice.call(arguments, 1);
    if (typeof options === 'string' && (options === 'isDisabled' || options === 'getDate' || options === 'widget')) {
      return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
    }
    if (options === 'option' && arguments.length === 2 && typeof arguments[1] === 'string') {
      return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
    }
    return this.each(function () {
      typeof options === 'string' ? $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
    });
  };
  $.datepicker = new Datepicker();
  $.datepicker.initialized = false;
  $.datepicker.uuid = new Date().getTime();
  $.datepicker.version = '1.10.3';
}(jQuery));
(function ($, undefined) {
  var sizeRelatedOptions = {
      buttons: true,
      height: true,
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true,
      width: true
    }, resizableRelatedOptions = {
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true
    };
  $.widget('ui.dialog', {
    version: '1.10.3',
    options: {
      appendTo: 'body',
      autoOpen: true,
      buttons: [],
      closeOnEscape: true,
      closeText: 'close',
      dialogClass: '',
      draggable: true,
      hide: null,
      height: 'auto',
      maxHeight: null,
      maxWidth: null,
      minHeight: 150,
      minWidth: 150,
      modal: false,
      position: {
        my: 'center',
        at: 'center',
        of: window,
        collision: 'fit',
        using: function (pos) {
          var topOffset = $(this).css(pos).offset().top;
          if (topOffset < 0) {
            $(this).css('top', pos.top - topOffset);
          }
        }
      },
      resizable: true,
      show: null,
      title: null,
      width: 300,
      beforeClose: null,
      close: null,
      drag: null,
      dragStart: null,
      dragStop: null,
      focus: null,
      open: null,
      resize: null,
      resizeStart: null,
      resizeStop: null
    },
    _create: function () {
      this.originalCss = {
        display: this.element[0].style.display,
        width: this.element[0].style.width,
        minHeight: this.element[0].style.minHeight,
        maxHeight: this.element[0].style.maxHeight,
        height: this.element[0].style.height
      };
      this.originalPosition = {
        parent: this.element.parent(),
        index: this.element.parent().children().index(this.element)
      };
      this.originalTitle = this.element.attr('title');
      this.options.title = this.options.title || this.originalTitle;
      this._createWrapper();
      this.element.show().removeAttr('title').addClass('ui-dialog-content ui-widget-content').appendTo(this.uiDialog);
      this._createTitlebar();
      this._createButtonPane();
      if (this.options.draggable && $.fn.draggable) {
        this._makeDraggable();
      }
      if (this.options.resizable && $.fn.resizable) {
        this._makeResizable();
      }
      this._isOpen = false;
    },
    _init: function () {
      if (this.options.autoOpen) {
        this.open();
      }
    },
    _appendTo: function () {
      var element = this.options.appendTo;
      if (element && (element.jquery || element.nodeType)) {
        return $(element);
      }
      return this.document.find(element || 'body').eq(0);
    },
    _destroy: function () {
      var next, originalPosition = this.originalPosition;
      this._destroyOverlay();
      this.element.removeUniqueId().removeClass('ui-dialog-content ui-widget-content').css(this.originalCss).detach();
      this.uiDialog.stop(true, true).remove();
      if (this.originalTitle) {
        this.element.attr('title', this.originalTitle);
      }
      next = originalPosition.parent.children().eq(originalPosition.index);
      if (next.length && next[0] !== this.element[0]) {
        next.before(this.element);
      } else {
        originalPosition.parent.append(this.element);
      }
    },
    widget: function () {
      return this.uiDialog;
    },
    disable: $.noop,
    enable: $.noop,
    close: function (event) {
      var that = this;
      if (!this._isOpen || this._trigger('beforeClose', event) === false) {
        return;
      }
      this._isOpen = false;
      this._destroyOverlay();
      if (!this.opener.filter(':focusable').focus().length) {
        $(this.document[0].activeElement).blur();
      }
      this._hide(this.uiDialog, this.options.hide, function () {
        that._trigger('close', event);
      });
    },
    isOpen: function () {
      return this._isOpen;
    },
    moveToTop: function () {
      this._moveToTop();
    },
    _moveToTop: function (event, silent) {
      var moved = !!this.uiDialog.nextAll(':visible').insertBefore(this.uiDialog).length;
      if (moved && !silent) {
        this._trigger('focus', event);
      }
      return moved;
    },
    open: function () {
      var that = this;
      if (this._isOpen) {
        if (this._moveToTop()) {
          this._focusTabbable();
        }
        return;
      }
      this._isOpen = true;
      this.opener = $(this.document[0].activeElement);
      this._size();
      this._position();
      this._createOverlay();
      this._moveToTop(null, true);
      this._show(this.uiDialog, this.options.show, function () {
        that._focusTabbable();
        that._trigger('focus');
      });
      this._trigger('open');
    },
    _focusTabbable: function () {
      var hasFocus = this.element.find('[autofocus]');
      if (!hasFocus.length) {
        hasFocus = this.element.find(':tabbable');
      }
      if (!hasFocus.length) {
        hasFocus = this.uiDialogButtonPane.find(':tabbable');
      }
      if (!hasFocus.length) {
        hasFocus = this.uiDialogTitlebarClose.filter(':tabbable');
      }
      if (!hasFocus.length) {
        hasFocus = this.uiDialog;
      }
      hasFocus.eq(0).focus();
    },
    _keepFocus: function (event) {
      function checkFocus() {
        var activeElement = this.document[0].activeElement, isActive = this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0], activeElement);
        if (!isActive) {
          this._focusTabbable();
        }
      }
      event.preventDefault();
      checkFocus.call(this);
      this._delay(checkFocus);
    },
    _createWrapper: function () {
      this.uiDialog = $('<div>').addClass('ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ' + this.options.dialogClass).hide().attr({
        tabIndex: -1,
        role: 'dialog'
      }).appendTo(this._appendTo());
      this._on(this.uiDialog, {
        keydown: function (event) {
          if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
            event.preventDefault();
            this.close(event);
            return;
          }
          if (event.keyCode !== $.ui.keyCode.TAB) {
            return;
          }
          var tabbables = this.uiDialog.find(':tabbable'), first = tabbables.filter(':first'), last = tabbables.filter(':last');
          if ((event.target === last[0] || event.target === this.uiDialog[0]) && !event.shiftKey) {
            first.focus(1);
            event.preventDefault();
          } else if ((event.target === first[0] || event.target === this.uiDialog[0]) && event.shiftKey) {
            last.focus(1);
            event.preventDefault();
          }
        },
        mousedown: function (event) {
          if (this._moveToTop(event)) {
            this._focusTabbable();
          }
        }
      });
      if (!this.element.find('[aria-describedby]').length) {
        this.uiDialog.attr({ 'aria-describedby': this.element.uniqueId().attr('id') });
      }
    },
    _createTitlebar: function () {
      var uiDialogTitle;
      this.uiDialogTitlebar = $('<div>').addClass('ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix').prependTo(this.uiDialog);
      this._on(this.uiDialogTitlebar, {
        mousedown: function (event) {
          if (!$(event.target).closest('.ui-dialog-titlebar-close')) {
            this.uiDialog.focus();
          }
        }
      });
      this.uiDialogTitlebarClose = $('<button></button>').button({
        label: this.options.closeText,
        icons: { primary: 'ui-icon-closethick' },
        text: false
      }).addClass('ui-dialog-titlebar-close').appendTo(this.uiDialogTitlebar);
      this._on(this.uiDialogTitlebarClose, {
        click: function (event) {
          event.preventDefault();
          this.close(event);
        }
      });
      uiDialogTitle = $('<span>').uniqueId().addClass('ui-dialog-title').prependTo(this.uiDialogTitlebar);
      this._title(uiDialogTitle);
      this.uiDialog.attr({ 'aria-labelledby': uiDialogTitle.attr('id') });
    },
    _title: function (title) {
      if (!this.options.title) {
        title.html('&#160;');
      }
      title.text(this.options.title);
    },
    _createButtonPane: function () {
      this.uiDialogButtonPane = $('<div>').addClass('ui-dialog-buttonpane ui-widget-content ui-helper-clearfix');
      this.uiButtonSet = $('<div>').addClass('ui-dialog-buttonset').appendTo(this.uiDialogButtonPane);
      this._createButtons();
    },
    _createButtons: function () {
      var that = this, buttons = this.options.buttons;
      this.uiDialogButtonPane.remove();
      this.uiButtonSet.empty();
      if ($.isEmptyObject(buttons) || $.isArray(buttons) && !buttons.length) {
        this.uiDialog.removeClass('ui-dialog-buttons');
        return;
      }
      $.each(buttons, function (name, props) {
        var click, buttonOptions;
        props = $.isFunction(props) ? {
          click: props,
          text: name
        } : props;
        props = $.extend({ type: 'button' }, props);
        click = props.click;
        props.click = function () {
          click.apply(that.element[0], arguments);
        };
        buttonOptions = {
          icons: props.icons,
          text: props.showText
        };
        delete props.icons;
        delete props.showText;
        $('<button></button>', props).button(buttonOptions).appendTo(that.uiButtonSet);
      });
      this.uiDialog.addClass('ui-dialog-buttons');
      this.uiDialogButtonPane.appendTo(this.uiDialog);
    },
    _makeDraggable: function () {
      var that = this, options = this.options;
      function filteredUi(ui) {
        return {
          position: ui.position,
          offset: ui.offset
        };
      }
      this.uiDialog.draggable({
        cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
        handle: '.ui-dialog-titlebar',
        containment: 'document',
        start: function (event, ui) {
          $(this).addClass('ui-dialog-dragging');
          that._blockFrames();
          that._trigger('dragStart', event, filteredUi(ui));
        },
        drag: function (event, ui) {
          that._trigger('drag', event, filteredUi(ui));
        },
        stop: function (event, ui) {
          options.position = [
            ui.position.left - that.document.scrollLeft(),
            ui.position.top - that.document.scrollTop()
          ];
          $(this).removeClass('ui-dialog-dragging');
          that._unblockFrames();
          that._trigger('dragStop', event, filteredUi(ui));
        }
      });
    },
    _makeResizable: function () {
      var that = this, options = this.options, handles = options.resizable, position = this.uiDialog.css('position'), resizeHandles = typeof handles === 'string' ? handles : 'n,e,s,w,se,sw,ne,nw';
      function filteredUi(ui) {
        return {
          originalPosition: ui.originalPosition,
          originalSize: ui.originalSize,
          position: ui.position,
          size: ui.size
        };
      }
      this.uiDialog.resizable({
        cancel: '.ui-dialog-content',
        containment: 'document',
        alsoResize: this.element,
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight,
        minWidth: options.minWidth,
        minHeight: this._minHeight(),
        handles: resizeHandles,
        start: function (event, ui) {
          $(this).addClass('ui-dialog-resizing');
          that._blockFrames();
          that._trigger('resizeStart', event, filteredUi(ui));
        },
        resize: function (event, ui) {
          that._trigger('resize', event, filteredUi(ui));
        },
        stop: function (event, ui) {
          options.height = $(this).height();
          options.width = $(this).width();
          $(this).removeClass('ui-dialog-resizing');
          that._unblockFrames();
          that._trigger('resizeStop', event, filteredUi(ui));
        }
      }).css('position', position);
    },
    _minHeight: function () {
      var options = this.options;
      return options.height === 'auto' ? options.minHeight : Math.min(options.minHeight, options.height);
    },
    _position: function () {
      var isVisible = this.uiDialog.is(':visible');
      if (!isVisible) {
        this.uiDialog.show();
      }
      this.uiDialog.position(this.options.position);
      if (!isVisible) {
        this.uiDialog.hide();
      }
    },
    _setOptions: function (options) {
      var that = this, resize = false, resizableOptions = {};
      $.each(options, function (key, value) {
        that._setOption(key, value);
        if (key in sizeRelatedOptions) {
          resize = true;
        }
        if (key in resizableRelatedOptions) {
          resizableOptions[key] = value;
        }
      });
      if (resize) {
        this._size();
        this._position();
      }
      if (this.uiDialog.is(':data(ui-resizable)')) {
        this.uiDialog.resizable('option', resizableOptions);
      }
    },
    _setOption: function (key, value) {
      var isDraggable, isResizable, uiDialog = this.uiDialog;
      if (key === 'dialogClass') {
        uiDialog.removeClass(this.options.dialogClass).addClass(value);
      }
      if (key === 'disabled') {
        return;
      }
      this._super(key, value);
      if (key === 'appendTo') {
        this.uiDialog.appendTo(this._appendTo());
      }
      if (key === 'buttons') {
        this._createButtons();
      }
      if (key === 'closeText') {
        this.uiDialogTitlebarClose.button({ label: '' + value });
      }
      if (key === 'draggable') {
        isDraggable = uiDialog.is(':data(ui-draggable)');
        if (isDraggable && !value) {
          uiDialog.draggable('destroy');
        }
        if (!isDraggable && value) {
          this._makeDraggable();
        }
      }
      if (key === 'position') {
        this._position();
      }
      if (key === 'resizable') {
        isResizable = uiDialog.is(':data(ui-resizable)');
        if (isResizable && !value) {
          uiDialog.resizable('destroy');
        }
        if (isResizable && typeof value === 'string') {
          uiDialog.resizable('option', 'handles', value);
        }
        if (!isResizable && value !== false) {
          this._makeResizable();
        }
      }
      if (key === 'title') {
        this._title(this.uiDialogTitlebar.find('.ui-dialog-title'));
      }
    },
    _size: function () {
      var nonContentHeight, minContentHeight, maxContentHeight, options = this.options;
      this.element.show().css({
        width: 'auto',
        minHeight: 0,
        maxHeight: 'none',
        height: 0
      });
      if (options.minWidth > options.width) {
        options.width = options.minWidth;
      }
      nonContentHeight = this.uiDialog.css({
        height: 'auto',
        width: options.width
      }).outerHeight();
      minContentHeight = Math.max(0, options.minHeight - nonContentHeight);
      maxContentHeight = typeof options.maxHeight === 'number' ? Math.max(0, options.maxHeight - nonContentHeight) : 'none';
      if (options.height === 'auto') {
        this.element.css({
          minHeight: minContentHeight,
          maxHeight: maxContentHeight,
          height: 'auto'
        });
      } else {
        this.element.height(Math.max(0, options.height - nonContentHeight));
      }
      if (this.uiDialog.is(':data(ui-resizable)')) {
        this.uiDialog.resizable('option', 'minHeight', this._minHeight());
      }
    },
    _blockFrames: function () {
      this.iframeBlocks = this.document.find('iframe').map(function () {
        var iframe = $(this);
        return $('<div>').css({
          position: 'absolute',
          width: iframe.outerWidth(),
          height: iframe.outerHeight()
        }).appendTo(iframe.parent()).offset(iframe.offset())[0];
      });
    },
    _unblockFrames: function () {
      if (this.iframeBlocks) {
        this.iframeBlocks.remove();
        delete this.iframeBlocks;
      }
    },
    _allowInteraction: function (event) {
      if ($(event.target).closest('.ui-dialog').length) {
        return true;
      }
      return !!$(event.target).closest('.ui-datepicker').length;
    },
    _createOverlay: function () {
      if (!this.options.modal) {
        return;
      }
      var that = this, widgetFullName = this.widgetFullName;
      if (!$.ui.dialog.overlayInstances) {
        this._delay(function () {
          if ($.ui.dialog.overlayInstances) {
            this.document.bind('focusin.dialog', function (event) {
              if (!that._allowInteraction(event)) {
                event.preventDefault();
                $('.ui-dialog:visible:last .ui-dialog-content').data(widgetFullName)._focusTabbable();
              }
            });
          }
        });
      }
      this.overlay = $('<div>').addClass('ui-widget-overlay ui-front').appendTo(this._appendTo());
      this._on(this.overlay, { mousedown: '_keepFocus' });
      $.ui.dialog.overlayInstances++;
    },
    _destroyOverlay: function () {
      if (!this.options.modal) {
        return;
      }
      if (this.overlay) {
        $.ui.dialog.overlayInstances--;
        if (!$.ui.dialog.overlayInstances) {
          this.document.unbind('focusin.dialog');
        }
        this.overlay.remove();
        this.overlay = null;
      }
    }
  });
  $.ui.dialog.overlayInstances = 0;
  if ($.uiBackCompat !== false) {
    $.widget('ui.dialog', $.ui.dialog, {
      _position: function () {
        var position = this.options.position, myAt = [], offset = [
            0,
            0
          ], isVisible;
        if (position) {
          if (typeof position === 'string' || typeof position === 'object' && '0' in position) {
            myAt = position.split ? position.split(' ') : [
              position[0],
              position[1]
            ];
            if (myAt.length === 1) {
              myAt[1] = myAt[0];
            }
            $.each([
              'left',
              'top'
            ], function (i, offsetPosition) {
              if (+myAt[i] === myAt[i]) {
                offset[i] = myAt[i];
                myAt[i] = offsetPosition;
              }
            });
            position = {
              my: myAt[0] + (offset[0] < 0 ? offset[0] : '+' + offset[0]) + ' ' + myAt[1] + (offset[1] < 0 ? offset[1] : '+' + offset[1]),
              at: myAt.join(' ')
            };
          }
          position = $.extend({}, $.ui.dialog.prototype.options.position, position);
        } else {
          position = $.ui.dialog.prototype.options.position;
        }
        isVisible = this.uiDialog.is(':visible');
        if (!isVisible) {
          this.uiDialog.show();
        }
        this.uiDialog.position(position);
        if (!isVisible) {
          this.uiDialog.hide();
        }
      }
    });
  }
}(jQuery));
(function ($, undefined) {
  var rvertical = /up|down|vertical/, rpositivemotion = /up|left|vertical|horizontal/;
  $.effects.effect.blind = function (o, done) {
    var el = $(this), props = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'height',
        'width'
      ], mode = $.effects.setMode(el, o.mode || 'hide'), direction = o.direction || 'up', vertical = rvertical.test(direction), ref = vertical ? 'height' : 'width', ref2 = vertical ? 'top' : 'left', motion = rpositivemotion.test(direction), animation = {}, show = mode === 'show', wrapper, distance, margin;
    if (el.parent().is('.ui-effects-wrapper')) {
      $.effects.save(el.parent(), props);
    } else {
      $.effects.save(el, props);
    }
    el.show();
    wrapper = $.effects.createWrapper(el).css({ overflow: 'hidden' });
    distance = wrapper[ref]();
    margin = parseFloat(wrapper.css(ref2)) || 0;
    animation[ref] = show ? distance : 0;
    if (!motion) {
      el.css(vertical ? 'bottom' : 'right', 0).css(vertical ? 'top' : 'left', 'auto').css({ position: 'absolute' });
      animation[ref2] = show ? margin : distance + margin;
    }
    if (show) {
      wrapper.css(ref, 0);
      if (!motion) {
        wrapper.css(ref2, margin + distance);
      }
    }
    wrapper.animate(animation, {
      duration: o.duration,
      easing: o.easing,
      queue: false,
      complete: function () {
        if (mode === 'hide') {
          el.hide();
        }
        $.effects.restore(el, props);
        $.effects.removeWrapper(el);
        done();
      }
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.bounce = function (o, done) {
    var el = $(this), props = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'height',
        'width'
      ], mode = $.effects.setMode(el, o.mode || 'effect'), hide = mode === 'hide', show = mode === 'show', direction = o.direction || 'up', distance = o.distance, times = o.times || 5, anims = times * 2 + (show || hide ? 1 : 0), speed = o.duration / anims, easing = o.easing, ref = direction === 'up' || direction === 'down' ? 'top' : 'left', motion = direction === 'up' || direction === 'left', i, upAnim, downAnim, queue = el.queue(), queuelen = queue.length;
    if (show || hide) {
      props.push('opacity');
    }
    $.effects.save(el, props);
    el.show();
    $.effects.createWrapper(el);
    if (!distance) {
      distance = el[ref === 'top' ? 'outerHeight' : 'outerWidth']() / 3;
    }
    if (show) {
      downAnim = { opacity: 1 };
      downAnim[ref] = 0;
      el.css('opacity', 0).css(ref, motion ? -distance * 2 : distance * 2).animate(downAnim, speed, easing);
    }
    if (hide) {
      distance = distance / Math.pow(2, times - 1);
    }
    downAnim = {};
    downAnim[ref] = 0;
    for (i = 0; i < times; i++) {
      upAnim = {};
      upAnim[ref] = (motion ? '-=' : '+=') + distance;
      el.animate(upAnim, speed, easing).animate(downAnim, speed, easing);
      distance = hide ? distance * 2 : distance / 2;
    }
    if (hide) {
      upAnim = { opacity: 0 };
      upAnim[ref] = (motion ? '-=' : '+=') + distance;
      el.animate(upAnim, speed, easing);
    }
    el.queue(function () {
      if (hide) {
        el.hide();
      }
      $.effects.restore(el, props);
      $.effects.removeWrapper(el);
      done();
    });
    if (queuelen > 1) {
      queue.splice.apply(queue, [
        1,
        0
      ].concat(queue.splice(queuelen, anims + 1)));
    }
    el.dequeue();
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.clip = function (o, done) {
    var el = $(this), props = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'height',
        'width'
      ], mode = $.effects.setMode(el, o.mode || 'hide'), show = mode === 'show', direction = o.direction || 'vertical', vert = direction === 'vertical', size = vert ? 'height' : 'width', position = vert ? 'top' : 'left', animation = {}, wrapper, animate, distance;
    $.effects.save(el, props);
    el.show();
    wrapper = $.effects.createWrapper(el).css({ overflow: 'hidden' });
    animate = el[0].tagName === 'IMG' ? wrapper : el;
    distance = animate[size]();
    if (show) {
      animate.css(size, 0);
      animate.css(position, distance / 2);
    }
    animation[size] = show ? distance : 0;
    animation[position] = show ? 0 : distance / 2;
    animate.animate(animation, {
      queue: false,
      duration: o.duration,
      easing: o.easing,
      complete: function () {
        if (!show) {
          el.hide();
        }
        $.effects.restore(el, props);
        $.effects.removeWrapper(el);
        done();
      }
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.drop = function (o, done) {
    var el = $(this), props = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'opacity',
        'height',
        'width'
      ], mode = $.effects.setMode(el, o.mode || 'hide'), show = mode === 'show', direction = o.direction || 'left', ref = direction === 'up' || direction === 'down' ? 'top' : 'left', motion = direction === 'up' || direction === 'left' ? 'pos' : 'neg', animation = { opacity: show ? 1 : 0 }, distance;
    $.effects.save(el, props);
    el.show();
    $.effects.createWrapper(el);
    distance = o.distance || el[ref === 'top' ? 'outerHeight' : 'outerWidth'](true) / 2;
    if (show) {
      el.css('opacity', 0).css(ref, motion === 'pos' ? -distance : distance);
    }
    animation[ref] = (show ? motion === 'pos' ? '+=' : '-=' : motion === 'pos' ? '-=' : '+=') + distance;
    el.animate(animation, {
      queue: false,
      duration: o.duration,
      easing: o.easing,
      complete: function () {
        if (mode === 'hide') {
          el.hide();
        }
        $.effects.restore(el, props);
        $.effects.removeWrapper(el);
        done();
      }
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.explode = function (o, done) {
    var rows = o.pieces ? Math.round(Math.sqrt(o.pieces)) : 3, cells = rows, el = $(this), mode = $.effects.setMode(el, o.mode || 'hide'), show = mode === 'show', offset = el.show().css('visibility', 'hidden').offset(), width = Math.ceil(el.outerWidth() / cells), height = Math.ceil(el.outerHeight() / rows), pieces = [], i, j, left, top, mx, my;
    function childComplete() {
      pieces.push(this);
      if (pieces.length === rows * cells) {
        animComplete();
      }
    }
    for (i = 0; i < rows; i++) {
      top = offset.top + i * height;
      my = i - (rows - 1) / 2;
      for (j = 0; j < cells; j++) {
        left = offset.left + j * width;
        mx = j - (cells - 1) / 2;
        el.clone().appendTo('body').wrap('<div></div>').css({
          position: 'absolute',
          visibility: 'visible',
          left: -j * width,
          top: -i * height
        }).parent().addClass('ui-effects-explode').css({
          position: 'absolute',
          overflow: 'hidden',
          width: width,
          height: height,
          left: left + (show ? mx * width : 0),
          top: top + (show ? my * height : 0),
          opacity: show ? 0 : 1
        }).animate({
          left: left + (show ? 0 : mx * width),
          top: top + (show ? 0 : my * height),
          opacity: show ? 1 : 0
        }, o.duration || 500, o.easing, childComplete);
      }
    }
    function animComplete() {
      el.css({ visibility: 'visible' });
      $(pieces).remove();
      if (!show) {
        el.hide();
      }
      done();
    }
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.fade = function (o, done) {
    var el = $(this), mode = $.effects.setMode(el, o.mode || 'toggle');
    el.animate({ opacity: mode }, {
      queue: false,
      duration: o.duration,
      easing: o.easing,
      complete: done
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.fold = function (o, done) {
    var el = $(this), props = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'height',
        'width'
      ], mode = $.effects.setMode(el, o.mode || 'hide'), show = mode === 'show', hide = mode === 'hide', size = o.size || 15, percent = /([0-9]+)%/.exec(size), horizFirst = !!o.horizFirst, widthFirst = show !== horizFirst, ref = widthFirst ? [
        'width',
        'height'
      ] : [
        'height',
        'width'
      ], duration = o.duration / 2, wrapper, distance, animation1 = {}, animation2 = {};
    $.effects.save(el, props);
    el.show();
    wrapper = $.effects.createWrapper(el).css({ overflow: 'hidden' });
    distance = widthFirst ? [
      wrapper.width(),
      wrapper.height()
    ] : [
      wrapper.height(),
      wrapper.width()
    ];
    if (percent) {
      size = parseInt(percent[1], 10) / 100 * distance[hide ? 0 : 1];
    }
    if (show) {
      wrapper.css(horizFirst ? {
        height: 0,
        width: size
      } : {
        height: size,
        width: 0
      });
    }
    animation1[ref[0]] = show ? distance[0] : size;
    animation2[ref[1]] = show ? distance[1] : 0;
    wrapper.animate(animation1, duration, o.easing).animate(animation2, duration, o.easing, function () {
      if (hide) {
        el.hide();
      }
      $.effects.restore(el, props);
      $.effects.removeWrapper(el);
      done();
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.highlight = function (o, done) {
    var elem = $(this), props = [
        'backgroundImage',
        'backgroundColor',
        'opacity'
      ], mode = $.effects.setMode(elem, o.mode || 'show'), animation = { backgroundColor: elem.css('backgroundColor') };
    if (mode === 'hide') {
      animation.opacity = 0;
    }
    $.effects.save(elem, props);
    elem.show().css({
      backgroundImage: 'none',
      backgroundColor: o.color || '#ffff99'
    }).animate(animation, {
      queue: false,
      duration: o.duration,
      easing: o.easing,
      complete: function () {
        if (mode === 'hide') {
          elem.hide();
        }
        $.effects.restore(elem, props);
        done();
      }
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.pulsate = function (o, done) {
    var elem = $(this), mode = $.effects.setMode(elem, o.mode || 'show'), show = mode === 'show', hide = mode === 'hide', showhide = show || mode === 'hide', anims = (o.times || 5) * 2 + (showhide ? 1 : 0), duration = o.duration / anims, animateTo = 0, queue = elem.queue(), queuelen = queue.length, i;
    if (show || !elem.is(':visible')) {
      elem.css('opacity', 0).show();
      animateTo = 1;
    }
    for (i = 1; i < anims; i++) {
      elem.animate({ opacity: animateTo }, duration, o.easing);
      animateTo = 1 - animateTo;
    }
    elem.animate({ opacity: animateTo }, duration, o.easing);
    elem.queue(function () {
      if (hide) {
        elem.hide();
      }
      done();
    });
    if (queuelen > 1) {
      queue.splice.apply(queue, [
        1,
        0
      ].concat(queue.splice(queuelen, anims + 1)));
    }
    elem.dequeue();
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.puff = function (o, done) {
    var elem = $(this), mode = $.effects.setMode(elem, o.mode || 'hide'), hide = mode === 'hide', percent = parseInt(o.percent, 10) || 150, factor = percent / 100, original = {
        height: elem.height(),
        width: elem.width(),
        outerHeight: elem.outerHeight(),
        outerWidth: elem.outerWidth()
      };
    $.extend(o, {
      effect: 'scale',
      queue: false,
      fade: true,
      mode: mode,
      complete: done,
      percent: hide ? percent : 100,
      from: hide ? original : {
        height: original.height * factor,
        width: original.width * factor,
        outerHeight: original.outerHeight * factor,
        outerWidth: original.outerWidth * factor
      }
    });
    elem.effect(o);
  };
  $.effects.effect.scale = function (o, done) {
    var el = $(this), options = $.extend(true, {}, o), mode = $.effects.setMode(el, o.mode || 'effect'), percent = parseInt(o.percent, 10) || (parseInt(o.percent, 10) === 0 ? 0 : mode === 'hide' ? 0 : 100), direction = o.direction || 'both', origin = o.origin, original = {
        height: el.height(),
        width: el.width(),
        outerHeight: el.outerHeight(),
        outerWidth: el.outerWidth()
      }, factor = {
        y: direction !== 'horizontal' ? percent / 100 : 1,
        x: direction !== 'vertical' ? percent / 100 : 1
      };
    options.effect = 'size';
    options.queue = false;
    options.complete = done;
    if (mode !== 'effect') {
      options.origin = origin || [
        'middle',
        'center'
      ];
      options.restore = true;
    }
    options.from = o.from || (mode === 'show' ? {
      height: 0,
      width: 0,
      outerHeight: 0,
      outerWidth: 0
    } : original);
    options.to = {
      height: original.height * factor.y,
      width: original.width * factor.x,
      outerHeight: original.outerHeight * factor.y,
      outerWidth: original.outerWidth * factor.x
    };
    if (options.fade) {
      if (mode === 'show') {
        options.from.opacity = 0;
        options.to.opacity = 1;
      }
      if (mode === 'hide') {
        options.from.opacity = 1;
        options.to.opacity = 0;
      }
    }
    el.effect(options);
  };
  $.effects.effect.size = function (o, done) {
    var original, baseline, factor, el = $(this), props0 = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'width',
        'height',
        'overflow',
        'opacity'
      ], props1 = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'overflow',
        'opacity'
      ], props2 = [
        'width',
        'height',
        'overflow'
      ], cProps = ['fontSize'], vProps = [
        'borderTopWidth',
        'borderBottomWidth',
        'paddingTop',
        'paddingBottom'
      ], hProps = [
        'borderLeftWidth',
        'borderRightWidth',
        'paddingLeft',
        'paddingRight'
      ], mode = $.effects.setMode(el, o.mode || 'effect'), restore = o.restore || mode !== 'effect', scale = o.scale || 'both', origin = o.origin || [
        'middle',
        'center'
      ], position = el.css('position'), props = restore ? props0 : props1, zero = {
        height: 0,
        width: 0,
        outerHeight: 0,
        outerWidth: 0
      };
    if (mode === 'show') {
      el.show();
    }
    original = {
      height: el.height(),
      width: el.width(),
      outerHeight: el.outerHeight(),
      outerWidth: el.outerWidth()
    };
    if (o.mode === 'toggle' && mode === 'show') {
      el.from = o.to || zero;
      el.to = o.from || original;
    } else {
      el.from = o.from || (mode === 'show' ? zero : original);
      el.to = o.to || (mode === 'hide' ? zero : original);
    }
    factor = {
      from: {
        y: el.from.height / original.height,
        x: el.from.width / original.width
      },
      to: {
        y: el.to.height / original.height,
        x: el.to.width / original.width
      }
    };
    if (scale === 'box' || scale === 'both') {
      if (factor.from.y !== factor.to.y) {
        props = props.concat(vProps);
        el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from);
        el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to);
      }
      if (factor.from.x !== factor.to.x) {
        props = props.concat(hProps);
        el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from);
        el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to);
      }
    }
    if (scale === 'content' || scale === 'both') {
      if (factor.from.y !== factor.to.y) {
        props = props.concat(cProps).concat(props2);
        el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from);
        el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to);
      }
    }
    $.effects.save(el, props);
    el.show();
    $.effects.createWrapper(el);
    el.css('overflow', 'hidden').css(el.from);
    if (origin) {
      baseline = $.effects.getBaseline(origin, original);
      el.from.top = (original.outerHeight - el.outerHeight()) * baseline.y;
      el.from.left = (original.outerWidth - el.outerWidth()) * baseline.x;
      el.to.top = (original.outerHeight - el.to.outerHeight) * baseline.y;
      el.to.left = (original.outerWidth - el.to.outerWidth) * baseline.x;
    }
    el.css(el.from);
    if (scale === 'content' || scale === 'both') {
      vProps = vProps.concat([
        'marginTop',
        'marginBottom'
      ]).concat(cProps);
      hProps = hProps.concat([
        'marginLeft',
        'marginRight'
      ]);
      props2 = props0.concat(vProps).concat(hProps);
      el.find('*[width]').each(function () {
        var child = $(this), c_original = {
            height: child.height(),
            width: child.width(),
            outerHeight: child.outerHeight(),
            outerWidth: child.outerWidth()
          };
        if (restore) {
          $.effects.save(child, props2);
        }
        child.from = {
          height: c_original.height * factor.from.y,
          width: c_original.width * factor.from.x,
          outerHeight: c_original.outerHeight * factor.from.y,
          outerWidth: c_original.outerWidth * factor.from.x
        };
        child.to = {
          height: c_original.height * factor.to.y,
          width: c_original.width * factor.to.x,
          outerHeight: c_original.height * factor.to.y,
          outerWidth: c_original.width * factor.to.x
        };
        if (factor.from.y !== factor.to.y) {
          child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from);
          child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to);
        }
        if (factor.from.x !== factor.to.x) {
          child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from);
          child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to);
        }
        child.css(child.from);
        child.animate(child.to, o.duration, o.easing, function () {
          if (restore) {
            $.effects.restore(child, props2);
          }
        });
      });
    }
    el.animate(el.to, {
      queue: false,
      duration: o.duration,
      easing: o.easing,
      complete: function () {
        if (el.to.opacity === 0) {
          el.css('opacity', el.from.opacity);
        }
        if (mode === 'hide') {
          el.hide();
        }
        $.effects.restore(el, props);
        if (!restore) {
          if (position === 'static') {
            el.css({
              position: 'relative',
              top: el.to.top,
              left: el.to.left
            });
          } else {
            $.each([
              'top',
              'left'
            ], function (idx, pos) {
              el.css(pos, function (_, str) {
                var val = parseInt(str, 10), toRef = idx ? el.to.left : el.to.top;
                if (str === 'auto') {
                  return toRef + 'px';
                }
                return val + toRef + 'px';
              });
            });
          }
        }
        $.effects.removeWrapper(el);
        done();
      }
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.shake = function (o, done) {
    var el = $(this), props = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'height',
        'width'
      ], mode = $.effects.setMode(el, o.mode || 'effect'), direction = o.direction || 'left', distance = o.distance || 20, times = o.times || 3, anims = times * 2 + 1, speed = Math.round(o.duration / anims), ref = direction === 'up' || direction === 'down' ? 'top' : 'left', positiveMotion = direction === 'up' || direction === 'left', animation = {}, animation1 = {}, animation2 = {}, i, queue = el.queue(), queuelen = queue.length;
    $.effects.save(el, props);
    el.show();
    $.effects.createWrapper(el);
    animation[ref] = (positiveMotion ? '-=' : '+=') + distance;
    animation1[ref] = (positiveMotion ? '+=' : '-=') + distance * 2;
    animation2[ref] = (positiveMotion ? '-=' : '+=') + distance * 2;
    el.animate(animation, speed, o.easing);
    for (i = 1; i < times; i++) {
      el.animate(animation1, speed, o.easing).animate(animation2, speed, o.easing);
    }
    el.animate(animation1, speed, o.easing).animate(animation, speed / 2, o.easing).queue(function () {
      if (mode === 'hide') {
        el.hide();
      }
      $.effects.restore(el, props);
      $.effects.removeWrapper(el);
      done();
    });
    if (queuelen > 1) {
      queue.splice.apply(queue, [
        1,
        0
      ].concat(queue.splice(queuelen, anims + 1)));
    }
    el.dequeue();
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.slide = function (o, done) {
    var el = $(this), props = [
        'position',
        'top',
        'bottom',
        'left',
        'right',
        'width',
        'height'
      ], mode = $.effects.setMode(el, o.mode || 'show'), show = mode === 'show', direction = o.direction || 'left', ref = direction === 'up' || direction === 'down' ? 'top' : 'left', positiveMotion = direction === 'up' || direction === 'left', distance, animation = {};
    $.effects.save(el, props);
    el.show();
    distance = o.distance || el[ref === 'top' ? 'outerHeight' : 'outerWidth'](true);
    $.effects.createWrapper(el).css({ overflow: 'hidden' });
    if (show) {
      el.css(ref, positiveMotion ? isNaN(distance) ? '-' + distance : -distance : distance);
    }
    animation[ref] = (show ? positiveMotion ? '+=' : '-=' : positiveMotion ? '-=' : '+=') + distance;
    el.animate(animation, {
      queue: false,
      duration: o.duration,
      easing: o.easing,
      complete: function () {
        if (mode === 'hide') {
          el.hide();
        }
        $.effects.restore(el, props);
        $.effects.removeWrapper(el);
        done();
      }
    });
  };
}(jQuery));
(function ($, undefined) {
  $.effects.effect.transfer = function (o, done) {
    var elem = $(this), target = $(o.to), targetFixed = target.css('position') === 'fixed', body = $('body'), fixTop = targetFixed ? body.scrollTop() : 0, fixLeft = targetFixed ? body.scrollLeft() : 0, endPosition = target.offset(), animation = {
        top: endPosition.top - fixTop,
        left: endPosition.left - fixLeft,
        height: target.innerHeight(),
        width: target.innerWidth()
      }, startPosition = elem.offset(), transfer = $('<div class=\'ui-effects-transfer\'></div>').appendTo(document.body).addClass(o.className).css({
        top: startPosition.top - fixTop,
        left: startPosition.left - fixLeft,
        height: elem.innerHeight(),
        width: elem.innerWidth(),
        position: targetFixed ? 'fixed' : 'absolute'
      }).animate(animation, o.duration, o.easing, function () {
        transfer.remove();
        done();
      });
  };
}(jQuery));
(function ($, undefined) {
  $.widget('ui.menu', {
    version: '1.10.3',
    defaultElement: '<ul>',
    delay: 300,
    options: {
      icons: { submenu: 'ui-icon-carat-1-e' },
      menus: 'ul',
      position: {
        my: 'left top',
        at: 'right top'
      },
      role: 'menu',
      blur: null,
      focus: null,
      select: null
    },
    _create: function () {
      this.activeMenu = this.element;
      this.mouseHandled = false;
      this.element.uniqueId().addClass('ui-menu ui-widget ui-widget-content ui-corner-all').toggleClass('ui-menu-icons', !!this.element.find('.ui-icon').length).attr({
        role: this.options.role,
        tabIndex: 0
      }).bind('click' + this.eventNamespace, $.proxy(function (event) {
        if (this.options.disabled) {
          event.preventDefault();
        }
      }, this));
      if (this.options.disabled) {
        this.element.addClass('ui-state-disabled').attr('aria-disabled', 'true');
      }
      this._on({
        'mousedown .ui-menu-item > a': function (event) {
          event.preventDefault();
        },
        'click .ui-state-disabled > a': function (event) {
          event.preventDefault();
        },
        'click .ui-menu-item:has(a)': function (event) {
          var target = $(event.target).closest('.ui-menu-item');
          if (!this.mouseHandled && target.not('.ui-state-disabled').length) {
            this.mouseHandled = true;
            this.select(event);
            if (target.has('.ui-menu').length) {
              this.expand(event);
            } else if (!this.element.is(':focus')) {
              this.element.trigger('focus', [true]);
              if (this.active && this.active.parents('.ui-menu').length === 1) {
                clearTimeout(this.timer);
              }
            }
          }
        },
        'mouseenter .ui-menu-item': function (event) {
          var target = $(event.currentTarget);
          target.siblings().children('.ui-state-active').removeClass('ui-state-active');
          this.focus(event, target);
        },
        mouseleave: 'collapseAll',
        'mouseleave .ui-menu': 'collapseAll',
        focus: function (event, keepActiveItem) {
          var item = this.active || this.element.children('.ui-menu-item').eq(0);
          if (!keepActiveItem) {
            this.focus(event, item);
          }
        },
        blur: function (event) {
          this._delay(function () {
            if (!$.contains(this.element[0], this.document[0].activeElement)) {
              this.collapseAll(event);
            }
          });
        },
        keydown: '_keydown'
      });
      this.refresh();
      this._on(this.document, {
        click: function (event) {
          if (!$(event.target).closest('.ui-menu').length) {
            this.collapseAll(event);
          }
          this.mouseHandled = false;
        }
      });
    },
    _destroy: function () {
      this.element.removeAttr('aria-activedescendant').find('.ui-menu').addBack().removeClass('ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons').removeAttr('role').removeAttr('tabIndex').removeAttr('aria-labelledby').removeAttr('aria-expanded').removeAttr('aria-hidden').removeAttr('aria-disabled').removeUniqueId().show();
      this.element.find('.ui-menu-item').removeClass('ui-menu-item').removeAttr('role').removeAttr('aria-disabled').children('a').removeUniqueId().removeClass('ui-corner-all ui-state-hover').removeAttr('tabIndex').removeAttr('role').removeAttr('aria-haspopup').children().each(function () {
        var elem = $(this);
        if (elem.data('ui-menu-submenu-carat')) {
          elem.remove();
        }
      });
      this.element.find('.ui-menu-divider').removeClass('ui-menu-divider ui-widget-content');
    },
    _keydown: function (event) {
      var match, prev, character, skip, regex, preventDefault = true;
      function escape(value) {
        return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
      }
      switch (event.keyCode) {
      case $.ui.keyCode.PAGE_UP:
        this.previousPage(event);
        break;
      case $.ui.keyCode.PAGE_DOWN:
        this.nextPage(event);
        break;
      case $.ui.keyCode.HOME:
        this._move('first', 'first', event);
        break;
      case $.ui.keyCode.END:
        this._move('last', 'last', event);
        break;
      case $.ui.keyCode.UP:
        this.previous(event);
        break;
      case $.ui.keyCode.DOWN:
        this.next(event);
        break;
      case $.ui.keyCode.LEFT:
        this.collapse(event);
        break;
      case $.ui.keyCode.RIGHT:
        if (this.active && !this.active.is('.ui-state-disabled')) {
          this.expand(event);
        }
        break;
      case $.ui.keyCode.ENTER:
      case $.ui.keyCode.SPACE:
        this._activate(event);
        break;
      case $.ui.keyCode.ESCAPE:
        this.collapse(event);
        break;
      default:
        preventDefault = false;
        prev = this.previousFilter || '';
        character = String.fromCharCode(event.keyCode);
        skip = false;
        clearTimeout(this.filterTimer);
        if (character === prev) {
          skip = true;
        } else {
          character = prev + character;
        }
        regex = new RegExp('^' + escape(character), 'i');
        match = this.activeMenu.children('.ui-menu-item').filter(function () {
          return regex.test($(this).children('a').text());
        });
        match = skip && match.index(this.active.next()) !== -1 ? this.active.nextAll('.ui-menu-item') : match;
        if (!match.length) {
          character = String.fromCharCode(event.keyCode);
          regex = new RegExp('^' + escape(character), 'i');
          match = this.activeMenu.children('.ui-menu-item').filter(function () {
            return regex.test($(this).children('a').text());
          });
        }
        if (match.length) {
          this.focus(event, match);
          if (match.length > 1) {
            this.previousFilter = character;
            this.filterTimer = this._delay(function () {
              delete this.previousFilter;
            }, 1000);
          } else {
            delete this.previousFilter;
          }
        } else {
          delete this.previousFilter;
        }
      }
      if (preventDefault) {
        event.preventDefault();
      }
    },
    _activate: function (event) {
      if (!this.active.is('.ui-state-disabled')) {
        if (this.active.children('a[aria-haspopup=\'true\']').length) {
          this.expand(event);
        } else {
          this.select(event);
        }
      }
    },
    refresh: function () {
      var menus, icon = this.options.icons.submenu, submenus = this.element.find(this.options.menus);
      submenus.filter(':not(.ui-menu)').addClass('ui-menu ui-widget ui-widget-content ui-corner-all').hide().attr({
        role: this.options.role,
        'aria-hidden': 'true',
        'aria-expanded': 'false'
      }).each(function () {
        var menu = $(this), item = menu.prev('a'), submenuCarat = $('<span>').addClass('ui-menu-icon ui-icon ' + icon).data('ui-menu-submenu-carat', true);
        item.attr('aria-haspopup', 'true').prepend(submenuCarat);
        menu.attr('aria-labelledby', item.attr('id'));
      });
      menus = submenus.add(this.element);
      menus.children(':not(.ui-menu-item):has(a)').addClass('ui-menu-item').attr('role', 'presentation').children('a').uniqueId().addClass('ui-corner-all').attr({
        tabIndex: -1,
        role: this._itemRole()
      });
      menus.children(':not(.ui-menu-item)').each(function () {
        var item = $(this);
        if (!/[^\-\u2014\u2013\s]/.test(item.text())) {
          item.addClass('ui-widget-content ui-menu-divider');
        }
      });
      menus.children('.ui-state-disabled').attr('aria-disabled', 'true');
      if (this.active && !$.contains(this.element[0], this.active[0])) {
        this.blur();
      }
    },
    _itemRole: function () {
      return {
        menu: 'menuitem',
        listbox: 'option'
      }[this.options.role];
    },
    _setOption: function (key, value) {
      if (key === 'icons') {
        this.element.find('.ui-menu-icon').removeClass(this.options.icons.submenu).addClass(value.submenu);
      }
      this._super(key, value);
    },
    focus: function (event, item) {
      var nested, focused;
      this.blur(event, event && event.type === 'focus');
      this._scrollIntoView(item);
      this.active = item.first();
      focused = this.active.children('a').addClass('ui-state-focus');
      if (this.options.role) {
        this.element.attr('aria-activedescendant', focused.attr('id'));
      }
      this.active.parent().closest('.ui-menu-item').children('a:first').addClass('ui-state-active');
      if (event && event.type === 'keydown') {
        this._close();
      } else {
        this.timer = this._delay(function () {
          this._close();
        }, this.delay);
      }
      nested = item.children('.ui-menu');
      if (nested.length && /^mouse/.test(event.type)) {
        this._startOpening(nested);
      }
      this.activeMenu = item.parent();
      this._trigger('focus', event, { item: item });
    },
    _scrollIntoView: function (item) {
      var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
      if (this._hasScroll()) {
        borderTop = parseFloat($.css(this.activeMenu[0], 'borderTopWidth')) || 0;
        paddingTop = parseFloat($.css(this.activeMenu[0], 'paddingTop')) || 0;
        offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
        scroll = this.activeMenu.scrollTop();
        elementHeight = this.activeMenu.height();
        itemHeight = item.height();
        if (offset < 0) {
          this.activeMenu.scrollTop(scroll + offset);
        } else if (offset + itemHeight > elementHeight) {
          this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight);
        }
      }
    },
    blur: function (event, fromFocus) {
      if (!fromFocus) {
        clearTimeout(this.timer);
      }
      if (!this.active) {
        return;
      }
      this.active.children('a').removeClass('ui-state-focus');
      this.active = null;
      this._trigger('blur', event, { item: this.active });
    },
    _startOpening: function (submenu) {
      clearTimeout(this.timer);
      if (submenu.attr('aria-hidden') !== 'true') {
        return;
      }
      this.timer = this._delay(function () {
        this._close();
        this._open(submenu);
      }, this.delay);
    },
    _open: function (submenu) {
      var position = $.extend({ of: this.active }, this.options.position);
      clearTimeout(this.timer);
      this.element.find('.ui-menu').not(submenu.parents('.ui-menu')).hide().attr('aria-hidden', 'true');
      submenu.show().removeAttr('aria-hidden').attr('aria-expanded', 'true').position(position);
    },
    collapseAll: function (event, all) {
      clearTimeout(this.timer);
      this.timer = this._delay(function () {
        var currentMenu = all ? this.element : $(event && event.target).closest(this.element.find('.ui-menu'));
        if (!currentMenu.length) {
          currentMenu = this.element;
        }
        this._close(currentMenu);
        this.blur(event);
        this.activeMenu = currentMenu;
      }, this.delay);
    },
    _close: function (startMenu) {
      if (!startMenu) {
        startMenu = this.active ? this.active.parent() : this.element;
      }
      startMenu.find('.ui-menu').hide().attr('aria-hidden', 'true').attr('aria-expanded', 'false').end().find('a.ui-state-active').removeClass('ui-state-active');
    },
    collapse: function (event) {
      var newItem = this.active && this.active.parent().closest('.ui-menu-item', this.element);
      if (newItem && newItem.length) {
        this._close();
        this.focus(event, newItem);
      }
    },
    expand: function (event) {
      var newItem = this.active && this.active.children('.ui-menu ').children('.ui-menu-item').first();
      if (newItem && newItem.length) {
        this._open(newItem.parent());
        this._delay(function () {
          this.focus(event, newItem);
        });
      }
    },
    next: function (event) {
      this._move('next', 'first', event);
    },
    previous: function (event) {
      this._move('prev', 'last', event);
    },
    isFirstItem: function () {
      return this.active && !this.active.prevAll('.ui-menu-item').length;
    },
    isLastItem: function () {
      return this.active && !this.active.nextAll('.ui-menu-item').length;
    },
    _move: function (direction, filter, event) {
      var next;
      if (this.active) {
        if (direction === 'first' || direction === 'last') {
          next = this.active[direction === 'first' ? 'prevAll' : 'nextAll']('.ui-menu-item').eq(-1);
        } else {
          next = this.active[direction + 'All']('.ui-menu-item').eq(0);
        }
      }
      if (!next || !next.length || !this.active) {
        next = this.activeMenu.children('.ui-menu-item')[filter]();
      }
      this.focus(event, next);
    },
    nextPage: function (event) {
      var item, base, height;
      if (!this.active) {
        this.next(event);
        return;
      }
      if (this.isLastItem()) {
        return;
      }
      if (this._hasScroll()) {
        base = this.active.offset().top;
        height = this.element.height();
        this.active.nextAll('.ui-menu-item').each(function () {
          item = $(this);
          return item.offset().top - base - height < 0;
        });
        this.focus(event, item);
      } else {
        this.focus(event, this.activeMenu.children('.ui-menu-item')[!this.active ? 'first' : 'last']());
      }
    },
    previousPage: function (event) {
      var item, base, height;
      if (!this.active) {
        this.next(event);
        return;
      }
      if (this.isFirstItem()) {
        return;
      }
      if (this._hasScroll()) {
        base = this.active.offset().top;
        height = this.element.height();
        this.active.prevAll('.ui-menu-item').each(function () {
          item = $(this);
          return item.offset().top - base + height > 0;
        });
        this.focus(event, item);
      } else {
        this.focus(event, this.activeMenu.children('.ui-menu-item').first());
      }
    },
    _hasScroll: function () {
      return this.element.outerHeight() < this.element.prop('scrollHeight');
    },
    select: function (event) {
      this.active = this.active || $(event.target).closest('.ui-menu-item');
      var ui = { item: this.active };
      if (!this.active.has('.ui-menu').length) {
        this.collapseAll(event, true);
      }
      this._trigger('select', event, ui);
    }
  });
}(jQuery));
(function ($, undefined) {
  $.ui = $.ui || {};
  var cachedScrollbarWidth, max = Math.max, abs = Math.abs, round = Math.round, rhorizontal = /left|center|right/, rvertical = /top|center|bottom/, roffset = /[\+\-]\d+(\.[\d]+)?%?/, rposition = /^\w+/, rpercent = /%$/, _position = $.fn.position;
  function getOffsets(offsets, width, height) {
    return [
      parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
      parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
    ];
  }
  function parseCss(element, property) {
    return parseInt($.css(element, property), 10) || 0;
  }
  function getDimensions(elem) {
    var raw = elem[0];
    if (raw.nodeType === 9) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: 0,
          left: 0
        }
      };
    }
    if ($.isWindow(raw)) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: elem.scrollTop(),
          left: elem.scrollLeft()
        }
      };
    }
    if (raw.preventDefault) {
      return {
        width: 0,
        height: 0,
        offset: {
          top: raw.pageY,
          left: raw.pageX
        }
      };
    }
    return {
      width: elem.outerWidth(),
      height: elem.outerHeight(),
      offset: elem.offset()
    };
  }
  $.position = {
    scrollbarWidth: function () {
      if (cachedScrollbarWidth !== undefined) {
        return cachedScrollbarWidth;
      }
      var w1, w2, div = $('<div style=\'display:block;width:50px;height:50px;overflow:hidden;\'><div style=\'height:100px;width:auto;\'></div></div>'), innerDiv = div.children()[0];
      $('body').append(div);
      w1 = innerDiv.offsetWidth;
      div.css('overflow', 'scroll');
      w2 = innerDiv.offsetWidth;
      if (w1 === w2) {
        w2 = div[0].clientWidth;
      }
      div.remove();
      return cachedScrollbarWidth = w1 - w2;
    },
    getScrollInfo: function (within) {
      var overflowX = within.isWindow ? '' : within.element.css('overflow-x'), overflowY = within.isWindow ? '' : within.element.css('overflow-y'), hasOverflowX = overflowX === 'scroll' || overflowX === 'auto' && within.width < within.element[0].scrollWidth, hasOverflowY = overflowY === 'scroll' || overflowY === 'auto' && within.height < within.element[0].scrollHeight;
      return {
        width: hasOverflowY ? $.position.scrollbarWidth() : 0,
        height: hasOverflowX ? $.position.scrollbarWidth() : 0
      };
    },
    getWithinInfo: function (element) {
      var withinElement = $(element || window), isWindow = $.isWindow(withinElement[0]);
      return {
        element: withinElement,
        isWindow: isWindow,
        offset: withinElement.offset() || {
          left: 0,
          top: 0
        },
        scrollLeft: withinElement.scrollLeft(),
        scrollTop: withinElement.scrollTop(),
        width: isWindow ? withinElement.width() : withinElement.outerWidth(),
        height: isWindow ? withinElement.height() : withinElement.outerHeight()
      };
    }
  };
  $.fn.position = function (options) {
    if (!options || !options.of) {
      return _position.apply(this, arguments);
    }
    options = $.extend({}, options);
    var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = $(options.of), within = $.position.getWithinInfo(options.within), scrollInfo = $.position.getScrollInfo(within), collision = (options.collision || 'flip').split(' '), offsets = {};
    dimensions = getDimensions(target);
    if (target[0].preventDefault) {
      options.at = 'left top';
    }
    targetWidth = dimensions.width;
    targetHeight = dimensions.height;
    targetOffset = dimensions.offset;
    basePosition = $.extend({}, targetOffset);
    $.each([
      'my',
      'at'
    ], function () {
      var pos = (options[this] || '').split(' '), horizontalOffset, verticalOffset;
      if (pos.length === 1) {
        pos = rhorizontal.test(pos[0]) ? pos.concat(['center']) : rvertical.test(pos[0]) ? ['center'].concat(pos) : [
          'center',
          'center'
        ];
      }
      pos[0] = rhorizontal.test(pos[0]) ? pos[0] : 'center';
      pos[1] = rvertical.test(pos[1]) ? pos[1] : 'center';
      horizontalOffset = roffset.exec(pos[0]);
      verticalOffset = roffset.exec(pos[1]);
      offsets[this] = [
        horizontalOffset ? horizontalOffset[0] : 0,
        verticalOffset ? verticalOffset[0] : 0
      ];
      options[this] = [
        rposition.exec(pos[0])[0],
        rposition.exec(pos[1])[0]
      ];
    });
    if (collision.length === 1) {
      collision[1] = collision[0];
    }
    if (options.at[0] === 'right') {
      basePosition.left += targetWidth;
    } else if (options.at[0] === 'center') {
      basePosition.left += targetWidth / 2;
    }
    if (options.at[1] === 'bottom') {
      basePosition.top += targetHeight;
    } else if (options.at[1] === 'center') {
      basePosition.top += targetHeight / 2;
    }
    atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
    basePosition.left += atOffset[0];
    basePosition.top += atOffset[1];
    return this.each(function () {
      var collisionPosition, using, elem = $(this), elemWidth = elem.outerWidth(), elemHeight = elem.outerHeight(), marginLeft = parseCss(this, 'marginLeft'), marginTop = parseCss(this, 'marginTop'), collisionWidth = elemWidth + marginLeft + parseCss(this, 'marginRight') + scrollInfo.width, collisionHeight = elemHeight + marginTop + parseCss(this, 'marginBottom') + scrollInfo.height, position = $.extend({}, basePosition), myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
      if (options.my[0] === 'right') {
        position.left -= elemWidth;
      } else if (options.my[0] === 'center') {
        position.left -= elemWidth / 2;
      }
      if (options.my[1] === 'bottom') {
        position.top -= elemHeight;
      } else if (options.my[1] === 'center') {
        position.top -= elemHeight / 2;
      }
      position.left += myOffset[0];
      position.top += myOffset[1];
      if (!$.support.offsetFractions) {
        position.left = round(position.left);
        position.top = round(position.top);
      }
      collisionPosition = {
        marginLeft: marginLeft,
        marginTop: marginTop
      };
      $.each([
        'left',
        'top'
      ], function (i, dir) {
        if ($.ui.position[collision[i]]) {
          $.ui.position[collision[i]][dir](position, {
            targetWidth: targetWidth,
            targetHeight: targetHeight,
            elemWidth: elemWidth,
            elemHeight: elemHeight,
            collisionPosition: collisionPosition,
            collisionWidth: collisionWidth,
            collisionHeight: collisionHeight,
            offset: [
              atOffset[0] + myOffset[0],
              atOffset[1] + myOffset[1]
            ],
            my: options.my,
            at: options.at,
            within: within,
            elem: elem
          });
        }
      });
      if (options.using) {
        using = function (props) {
          var left = targetOffset.left - position.left, right = left + targetWidth - elemWidth, top = targetOffset.top - position.top, bottom = top + targetHeight - elemHeight, feedback = {
              target: {
                element: target,
                left: targetOffset.left,
                top: targetOffset.top,
                width: targetWidth,
                height: targetHeight
              },
              element: {
                element: elem,
                left: position.left,
                top: position.top,
                width: elemWidth,
                height: elemHeight
              },
              horizontal: right < 0 ? 'left' : left > 0 ? 'right' : 'center',
              vertical: bottom < 0 ? 'top' : top > 0 ? 'bottom' : 'middle'
            };
          if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
            feedback.horizontal = 'center';
          }
          if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
            feedback.vertical = 'middle';
          }
          if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
            feedback.important = 'horizontal';
          } else {
            feedback.important = 'vertical';
          }
          options.using.call(this, props, feedback);
        };
      }
      elem.offset($.extend(position, { using: using }));
    });
  };
  $.ui.position = {
    fit: {
      left: function (position, data) {
        var within = data.within, withinOffset = within.isWindow ? within.scrollLeft : within.offset.left, outerWidth = within.width, collisionPosLeft = position.left - data.collisionPosition.marginLeft, overLeft = withinOffset - collisionPosLeft, overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset, newOverRight;
        if (data.collisionWidth > outerWidth) {
          if (overLeft > 0 && overRight <= 0) {
            newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
            position.left += overLeft - newOverRight;
          } else if (overRight > 0 && overLeft <= 0) {
            position.left = withinOffset;
          } else {
            if (overLeft > overRight) {
              position.left = withinOffset + outerWidth - data.collisionWidth;
            } else {
              position.left = withinOffset;
            }
          }
        } else if (overLeft > 0) {
          position.left += overLeft;
        } else if (overRight > 0) {
          position.left -= overRight;
        } else {
          position.left = max(position.left - collisionPosLeft, position.left);
        }
      },
      top: function (position, data) {
        var within = data.within, withinOffset = within.isWindow ? within.scrollTop : within.offset.top, outerHeight = data.within.height, collisionPosTop = position.top - data.collisionPosition.marginTop, overTop = withinOffset - collisionPosTop, overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset, newOverBottom;
        if (data.collisionHeight > outerHeight) {
          if (overTop > 0 && overBottom <= 0) {
            newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
            position.top += overTop - newOverBottom;
          } else if (overBottom > 0 && overTop <= 0) {
            position.top = withinOffset;
          } else {
            if (overTop > overBottom) {
              position.top = withinOffset + outerHeight - data.collisionHeight;
            } else {
              position.top = withinOffset;
            }
          }
        } else if (overTop > 0) {
          position.top += overTop;
        } else if (overBottom > 0) {
          position.top -= overBottom;
        } else {
          position.top = max(position.top - collisionPosTop, position.top);
        }
      }
    },
    flip: {
      left: function (position, data) {
        var within = data.within, withinOffset = within.offset.left + within.scrollLeft, outerWidth = within.width, offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left, collisionPosLeft = position.left - data.collisionPosition.marginLeft, overLeft = collisionPosLeft - offsetLeft, overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft, myOffset = data.my[0] === 'left' ? -data.elemWidth : data.my[0] === 'right' ? data.elemWidth : 0, atOffset = data.at[0] === 'left' ? data.targetWidth : data.at[0] === 'right' ? -data.targetWidth : 0, offset = -2 * data.offset[0], newOverRight, newOverLeft;
        if (overLeft < 0) {
          newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
          if (newOverRight < 0 || newOverRight < abs(overLeft)) {
            position.left += myOffset + atOffset + offset;
          }
        } else if (overRight > 0) {
          newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
          if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
            position.left += myOffset + atOffset + offset;
          }
        }
      },
      top: function (position, data) {
        var within = data.within, withinOffset = within.offset.top + within.scrollTop, outerHeight = within.height, offsetTop = within.isWindow ? within.scrollTop : within.offset.top, collisionPosTop = position.top - data.collisionPosition.marginTop, overTop = collisionPosTop - offsetTop, overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop, top = data.my[1] === 'top', myOffset = top ? -data.elemHeight : data.my[1] === 'bottom' ? data.elemHeight : 0, atOffset = data.at[1] === 'top' ? data.targetHeight : data.at[1] === 'bottom' ? -data.targetHeight : 0, offset = -2 * data.offset[1], newOverTop, newOverBottom;
        if (overTop < 0) {
          newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
          if (position.top + myOffset + atOffset + offset > overTop && (newOverBottom < 0 || newOverBottom < abs(overTop))) {
            position.top += myOffset + atOffset + offset;
          }
        } else if (overBottom > 0) {
          newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
          if (position.top + myOffset + atOffset + offset > overBottom && (newOverTop > 0 || abs(newOverTop) < overBottom)) {
            position.top += myOffset + atOffset + offset;
          }
        }
      }
    },
    flipfit: {
      left: function () {
        $.ui.position.flip.left.apply(this, arguments);
        $.ui.position.fit.left.apply(this, arguments);
      },
      top: function () {
        $.ui.position.flip.top.apply(this, arguments);
        $.ui.position.fit.top.apply(this, arguments);
      }
    }
  };
  (function () {
    var testElement, testElementParent, testElementStyle, offsetLeft, i, body = document.getElementsByTagName('body')[0], div = document.createElement('div');
    testElement = document.createElement(body ? 'div' : 'body');
    testElementStyle = {
      visibility: 'hidden',
      width: 0,
      height: 0,
      border: 0,
      margin: 0,
      background: 'none'
    };
    if (body) {
      $.extend(testElementStyle, {
        position: 'absolute',
        left: '-1000px',
        top: '-1000px'
      });
    }
    for (i in testElementStyle) {
      testElement.style[i] = testElementStyle[i];
    }
    testElement.appendChild(div);
    testElementParent = body || document.documentElement;
    testElementParent.insertBefore(testElement, testElementParent.firstChild);
    div.style.cssText = 'position: absolute; left: 10.7432222px;';
    offsetLeft = $(div).offset().left;
    $.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;
    testElement.innerHTML = '';
    testElementParent.removeChild(testElement);
  }());
}(jQuery));
(function ($, undefined) {
  $.widget('ui.progressbar', {
    version: '1.10.3',
    options: {
      max: 100,
      value: 0,
      change: null,
      complete: null
    },
    min: 0,
    _create: function () {
      this.oldValue = this.options.value = this._constrainedValue();
      this.element.addClass('ui-progressbar ui-widget ui-widget-content ui-corner-all').attr({
        role: 'progressbar',
        'aria-valuemin': this.min
      });
      this.valueDiv = $('<div class=\'ui-progressbar-value ui-widget-header ui-corner-left\'></div>').appendTo(this.element);
      this._refreshValue();
    },
    _destroy: function () {
      this.element.removeClass('ui-progressbar ui-widget ui-widget-content ui-corner-all').removeAttr('role').removeAttr('aria-valuemin').removeAttr('aria-valuemax').removeAttr('aria-valuenow');
      this.valueDiv.remove();
    },
    value: function (newValue) {
      if (newValue === undefined) {
        return this.options.value;
      }
      this.options.value = this._constrainedValue(newValue);
      this._refreshValue();
    },
    _constrainedValue: function (newValue) {
      if (newValue === undefined) {
        newValue = this.options.value;
      }
      this.indeterminate = newValue === false;
      if (typeof newValue !== 'number') {
        newValue = 0;
      }
      return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, newValue));
    },
    _setOptions: function (options) {
      var value = options.value;
      delete options.value;
      this._super(options);
      this.options.value = this._constrainedValue(value);
      this._refreshValue();
    },
    _setOption: function (key, value) {
      if (key === 'max') {
        value = Math.max(this.min, value);
      }
      this._super(key, value);
    },
    _percentage: function () {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
    },
    _refreshValue: function () {
      var value = this.options.value, percentage = this._percentage();
      this.valueDiv.toggle(this.indeterminate || value > this.min).toggleClass('ui-corner-right', value === this.options.max).width(percentage.toFixed(0) + '%');
      this.element.toggleClass('ui-progressbar-indeterminate', this.indeterminate);
      if (this.indeterminate) {
        this.element.removeAttr('aria-valuenow');
        if (!this.overlayDiv) {
          this.overlayDiv = $('<div class=\'ui-progressbar-overlay\'></div>').appendTo(this.valueDiv);
        }
      } else {
        this.element.attr({
          'aria-valuemax': this.options.max,
          'aria-valuenow': value
        });
        if (this.overlayDiv) {
          this.overlayDiv.remove();
          this.overlayDiv = null;
        }
      }
      if (this.oldValue !== value) {
        this.oldValue = value;
        this._trigger('change');
      }
      if (value === this.options.max) {
        this._trigger('complete');
      }
    }
  });
}(jQuery));
(function ($, undefined) {
  var numPages = 5;
  $.widget('ui.slider', $.ui.mouse, {
    version: '1.10.3',
    widgetEventPrefix: 'slide',
    options: {
      animate: false,
      distance: 0,
      max: 100,
      min: 0,
      orientation: 'horizontal',
      range: false,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    _create: function () {
      this._keySliding = false;
      this._mouseSliding = false;
      this._animateOff = true;
      this._handleIndex = null;
      this._detectOrientation();
      this._mouseInit();
      this.element.addClass('ui-slider' + ' ui-slider-' + this.orientation + ' ui-widget' + ' ui-widget-content' + ' ui-corner-all');
      this._refresh();
      this._setOption('disabled', this.options.disabled);
      this._animateOff = false;
    },
    _refresh: function () {
      this._createRange();
      this._createHandles();
      this._setupEvents();
      this._refreshValue();
    },
    _createHandles: function () {
      var i, handleCount, options = this.options, existingHandles = this.element.find('.ui-slider-handle').addClass('ui-state-default ui-corner-all'), handle = '<a class=\'ui-slider-handle ui-state-default ui-corner-all\' href=\'#\'></a>', handles = [];
      handleCount = options.values && options.values.length || 1;
      if (existingHandles.length > handleCount) {
        existingHandles.slice(handleCount).remove();
        existingHandles = existingHandles.slice(0, handleCount);
      }
      for (i = existingHandles.length; i < handleCount; i++) {
        handles.push(handle);
      }
      this.handles = existingHandles.add($(handles.join('')).appendTo(this.element));
      this.handle = this.handles.eq(0);
      this.handles.each(function (i) {
        $(this).data('ui-slider-handle-index', i);
      });
    },
    _createRange: function () {
      var options = this.options, classes = '';
      if (options.range) {
        if (options.range === true) {
          if (!options.values) {
            options.values = [
              this._valueMin(),
              this._valueMin()
            ];
          } else if (options.values.length && options.values.length !== 2) {
            options.values = [
              options.values[0],
              options.values[0]
            ];
          } else if ($.isArray(options.values)) {
            options.values = options.values.slice(0);
          }
        }
        if (!this.range || !this.range.length) {
          this.range = $('<div></div>').appendTo(this.element);
          classes = 'ui-slider-range' + ' ui-widget-header ui-corner-all';
        } else {
          this.range.removeClass('ui-slider-range-min ui-slider-range-max').css({
            'left': '',
            'bottom': ''
          });
        }
        this.range.addClass(classes + (options.range === 'min' || options.range === 'max' ? ' ui-slider-range-' + options.range : ''));
      } else {
        this.range = $([]);
      }
    },
    _setupEvents: function () {
      var elements = this.handles.add(this.range).filter('a');
      this._off(elements);
      this._on(elements, this._handleEvents);
      this._hoverable(elements);
      this._focusable(elements);
    },
    _destroy: function () {
      this.handles.remove();
      this.range.remove();
      this.element.removeClass('ui-slider' + ' ui-slider-horizontal' + ' ui-slider-vertical' + ' ui-widget' + ' ui-widget-content' + ' ui-corner-all');
      this._mouseDestroy();
    },
    _mouseCapture: function (event) {
      var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle, that = this, o = this.options;
      if (o.disabled) {
        return false;
      }
      this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      };
      this.elementOffset = this.element.offset();
      position = {
        x: event.pageX,
        y: event.pageY
      };
      normValue = this._normValueFromMouse(position);
      distance = this._valueMax() - this._valueMin() + 1;
      this.handles.each(function (i) {
        var thisDistance = Math.abs(normValue - that.values(i));
        if (distance > thisDistance || distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min)) {
          distance = thisDistance;
          closestHandle = $(this);
          index = i;
        }
      });
      allowed = this._start(event, index);
      if (allowed === false) {
        return false;
      }
      this._mouseSliding = true;
      this._handleIndex = index;
      closestHandle.addClass('ui-state-active').focus();
      offset = closestHandle.offset();
      mouseOverHandle = !$(event.target).parents().addBack().is('.ui-slider-handle');
      this._clickOffset = mouseOverHandle ? {
        left: 0,
        top: 0
      } : {
        left: event.pageX - offset.left - closestHandle.width() / 2,
        top: event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css('borderTopWidth'), 10) || 0) - (parseInt(closestHandle.css('borderBottomWidth'), 10) || 0) + (parseInt(closestHandle.css('marginTop'), 10) || 0)
      };
      if (!this.handles.hasClass('ui-state-hover')) {
        this._slide(event, index, normValue);
      }
      this._animateOff = true;
      return true;
    },
    _mouseStart: function () {
      return true;
    },
    _mouseDrag: function (event) {
      var position = {
          x: event.pageX,
          y: event.pageY
        }, normValue = this._normValueFromMouse(position);
      this._slide(event, this._handleIndex, normValue);
      return false;
    },
    _mouseStop: function (event) {
      this.handles.removeClass('ui-state-active');
      this._mouseSliding = false;
      this._stop(event, this._handleIndex);
      this._change(event, this._handleIndex);
      this._handleIndex = null;
      this._clickOffset = null;
      this._animateOff = false;
      return false;
    },
    _detectOrientation: function () {
      this.orientation = this.options.orientation === 'vertical' ? 'vertical' : 'horizontal';
    },
    _normValueFromMouse: function (position) {
      var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
      if (this.orientation === 'horizontal') {
        pixelTotal = this.elementSize.width;
        pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0);
      } else {
        pixelTotal = this.elementSize.height;
        pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
      }
      percentMouse = pixelMouse / pixelTotal;
      if (percentMouse > 1) {
        percentMouse = 1;
      }
      if (percentMouse < 0) {
        percentMouse = 0;
      }
      if (this.orientation === 'vertical') {
        percentMouse = 1 - percentMouse;
      }
      valueTotal = this._valueMax() - this._valueMin();
      valueMouse = this._valueMin() + percentMouse * valueTotal;
      return this._trimAlignValue(valueMouse);
    },
    _start: function (event, index) {
      var uiHash = {
          handle: this.handles[index],
          value: this.value()
        };
      if (this.options.values && this.options.values.length) {
        uiHash.value = this.values(index);
        uiHash.values = this.values();
      }
      return this._trigger('start', event, uiHash);
    },
    _slide: function (event, index, newVal) {
      var otherVal, newValues, allowed;
      if (this.options.values && this.options.values.length) {
        otherVal = this.values(index ? 0 : 1);
        if (this.options.values.length === 2 && this.options.range === true && (index === 0 && newVal > otherVal || index === 1 && newVal < otherVal)) {
          newVal = otherVal;
        }
        if (newVal !== this.values(index)) {
          newValues = this.values();
          newValues[index] = newVal;
          allowed = this._trigger('slide', event, {
            handle: this.handles[index],
            value: newVal,
            values: newValues
          });
          otherVal = this.values(index ? 0 : 1);
          if (allowed !== false) {
            this.values(index, newVal, true);
          }
        }
      } else {
        if (newVal !== this.value()) {
          allowed = this._trigger('slide', event, {
            handle: this.handles[index],
            value: newVal
          });
          if (allowed !== false) {
            this.value(newVal);
          }
        }
      }
    },
    _stop: function (event, index) {
      var uiHash = {
          handle: this.handles[index],
          value: this.value()
        };
      if (this.options.values && this.options.values.length) {
        uiHash.value = this.values(index);
        uiHash.values = this.values();
      }
      this._trigger('stop', event, uiHash);
    },
    _change: function (event, index) {
      if (!this._keySliding && !this._mouseSliding) {
        var uiHash = {
            handle: this.handles[index],
            value: this.value()
          };
        if (this.options.values && this.options.values.length) {
          uiHash.value = this.values(index);
          uiHash.values = this.values();
        }
        this._lastChangedValue = index;
        this._trigger('change', event, uiHash);
      }
    },
    value: function (newValue) {
      if (arguments.length) {
        this.options.value = this._trimAlignValue(newValue);
        this._refreshValue();
        this._change(null, 0);
        return;
      }
      return this._value();
    },
    values: function (index, newValue) {
      var vals, newValues, i;
      if (arguments.length > 1) {
        this.options.values[index] = this._trimAlignValue(newValue);
        this._refreshValue();
        this._change(null, index);
        return;
      }
      if (arguments.length) {
        if ($.isArray(arguments[0])) {
          vals = this.options.values;
          newValues = arguments[0];
          for (i = 0; i < vals.length; i += 1) {
            vals[i] = this._trimAlignValue(newValues[i]);
            this._change(null, i);
          }
          this._refreshValue();
        } else {
          if (this.options.values && this.options.values.length) {
            return this._values(index);
          } else {
            return this.value();
          }
        }
      } else {
        return this._values();
      }
    },
    _setOption: function (key, value) {
      var i, valsLength = 0;
      if (key === 'range' && this.options.range === true) {
        if (value === 'min') {
          this.options.value = this._values(0);
          this.options.values = null;
        } else if (value === 'max') {
          this.options.value = this._values(this.options.values.length - 1);
          this.options.values = null;
        }
      }
      if ($.isArray(this.options.values)) {
        valsLength = this.options.values.length;
      }
      $.Widget.prototype._setOption.apply(this, arguments);
      switch (key) {
      case 'orientation':
        this._detectOrientation();
        this.element.removeClass('ui-slider-horizontal ui-slider-vertical').addClass('ui-slider-' + this.orientation);
        this._refreshValue();
        break;
      case 'value':
        this._animateOff = true;
        this._refreshValue();
        this._change(null, 0);
        this._animateOff = false;
        break;
      case 'values':
        this._animateOff = true;
        this._refreshValue();
        for (i = 0; i < valsLength; i += 1) {
          this._change(null, i);
        }
        this._animateOff = false;
        break;
      case 'min':
      case 'max':
        this._animateOff = true;
        this._refreshValue();
        this._animateOff = false;
        break;
      case 'range':
        this._animateOff = true;
        this._refresh();
        this._animateOff = false;
        break;
      }
    },
    _value: function () {
      var val = this.options.value;
      val = this._trimAlignValue(val);
      return val;
    },
    _values: function (index) {
      var val, vals, i;
      if (arguments.length) {
        val = this.options.values[index];
        val = this._trimAlignValue(val);
        return val;
      } else if (this.options.values && this.options.values.length) {
        vals = this.options.values.slice();
        for (i = 0; i < vals.length; i += 1) {
          vals[i] = this._trimAlignValue(vals[i]);
        }
        return vals;
      } else {
        return [];
      }
    },
    _trimAlignValue: function (val) {
      if (val <= this._valueMin()) {
        return this._valueMin();
      }
      if (val >= this._valueMax()) {
        return this._valueMax();
      }
      var step = this.options.step > 0 ? this.options.step : 1, valModStep = (val - this._valueMin()) % step, alignValue = val - valModStep;
      if (Math.abs(valModStep) * 2 >= step) {
        alignValue += valModStep > 0 ? step : -step;
      }
      return parseFloat(alignValue.toFixed(5));
    },
    _valueMin: function () {
      return this.options.min;
    },
    _valueMax: function () {
      return this.options.max;
    },
    _refreshValue: function () {
      var lastValPercent, valPercent, value, valueMin, valueMax, oRange = this.options.range, o = this.options, that = this, animate = !this._animateOff ? o.animate : false, _set = {};
      if (this.options.values && this.options.values.length) {
        this.handles.each(function (i) {
          valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100;
          _set[that.orientation === 'horizontal' ? 'left' : 'bottom'] = valPercent + '%';
          $(this).stop(1, 1)[animate ? 'animate' : 'css'](_set, o.animate);
          if (that.options.range === true) {
            if (that.orientation === 'horizontal') {
              if (i === 0) {
                that.range.stop(1, 1)[animate ? 'animate' : 'css']({ left: valPercent + '%' }, o.animate);
              }
              if (i === 1) {
                that.range[animate ? 'animate' : 'css']({ width: valPercent - lastValPercent + '%' }, {
                  queue: false,
                  duration: o.animate
                });
              }
            } else {
              if (i === 0) {
                that.range.stop(1, 1)[animate ? 'animate' : 'css']({ bottom: valPercent + '%' }, o.animate);
              }
              if (i === 1) {
                that.range[animate ? 'animate' : 'css']({ height: valPercent - lastValPercent + '%' }, {
                  queue: false,
                  duration: o.animate
                });
              }
            }
          }
          lastValPercent = valPercent;
        });
      } else {
        value = this.value();
        valueMin = this._valueMin();
        valueMax = this._valueMax();
        valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0;
        _set[this.orientation === 'horizontal' ? 'left' : 'bottom'] = valPercent + '%';
        this.handle.stop(1, 1)[animate ? 'animate' : 'css'](_set, o.animate);
        if (oRange === 'min' && this.orientation === 'horizontal') {
          this.range.stop(1, 1)[animate ? 'animate' : 'css']({ width: valPercent + '%' }, o.animate);
        }
        if (oRange === 'max' && this.orientation === 'horizontal') {
          this.range[animate ? 'animate' : 'css']({ width: 100 - valPercent + '%' }, {
            queue: false,
            duration: o.animate
          });
        }
        if (oRange === 'min' && this.orientation === 'vertical') {
          this.range.stop(1, 1)[animate ? 'animate' : 'css']({ height: valPercent + '%' }, o.animate);
        }
        if (oRange === 'max' && this.orientation === 'vertical') {
          this.range[animate ? 'animate' : 'css']({ height: 100 - valPercent + '%' }, {
            queue: false,
            duration: o.animate
          });
        }
      }
    },
    _handleEvents: {
      keydown: function (event) {
        var allowed, curVal, newVal, step, index = $(event.target).data('ui-slider-handle-index');
        switch (event.keyCode) {
        case $.ui.keyCode.HOME:
        case $.ui.keyCode.END:
        case $.ui.keyCode.PAGE_UP:
        case $.ui.keyCode.PAGE_DOWN:
        case $.ui.keyCode.UP:
        case $.ui.keyCode.RIGHT:
        case $.ui.keyCode.DOWN:
        case $.ui.keyCode.LEFT:
          event.preventDefault();
          if (!this._keySliding) {
            this._keySliding = true;
            $(event.target).addClass('ui-state-active');
            allowed = this._start(event, index);
            if (allowed === false) {
              return;
            }
          }
          break;
        }
        step = this.options.step;
        if (this.options.values && this.options.values.length) {
          curVal = newVal = this.values(index);
        } else {
          curVal = newVal = this.value();
        }
        switch (event.keyCode) {
        case $.ui.keyCode.HOME:
          newVal = this._valueMin();
          break;
        case $.ui.keyCode.END:
          newVal = this._valueMax();
          break;
        case $.ui.keyCode.PAGE_UP:
          newVal = this._trimAlignValue(curVal + (this._valueMax() - this._valueMin()) / numPages);
          break;
        case $.ui.keyCode.PAGE_DOWN:
          newVal = this._trimAlignValue(curVal - (this._valueMax() - this._valueMin()) / numPages);
          break;
        case $.ui.keyCode.UP:
        case $.ui.keyCode.RIGHT:
          if (curVal === this._valueMax()) {
            return;
          }
          newVal = this._trimAlignValue(curVal + step);
          break;
        case $.ui.keyCode.DOWN:
        case $.ui.keyCode.LEFT:
          if (curVal === this._valueMin()) {
            return;
          }
          newVal = this._trimAlignValue(curVal - step);
          break;
        }
        this._slide(event, index, newVal);
      },
      click: function (event) {
        event.preventDefault();
      },
      keyup: function (event) {
        var index = $(event.target).data('ui-slider-handle-index');
        if (this._keySliding) {
          this._keySliding = false;
          this._stop(event, index);
          this._change(event, index);
          $(event.target).removeClass('ui-state-active');
        }
      }
    }
  });
}(jQuery));
(function ($) {
  function modifier(fn) {
    return function () {
      var previous = this.element.val();
      fn.apply(this, arguments);
      this._refresh();
      if (previous !== this.element.val()) {
        this._trigger('change');
      }
    };
  }
  $.widget('ui.spinner', {
    version: '1.10.3',
    defaultElement: '<input>',
    widgetEventPrefix: 'spin',
    options: {
      culture: null,
      icons: {
        down: 'ui-icon-triangle-1-s',
        up: 'ui-icon-triangle-1-n'
      },
      incremental: true,
      max: null,
      min: null,
      numberFormat: null,
      page: 10,
      step: 1,
      change: null,
      spin: null,
      start: null,
      stop: null
    },
    _create: function () {
      this._setOption('max', this.options.max);
      this._setOption('min', this.options.min);
      this._setOption('step', this.options.step);
      this._value(this.element.val(), true);
      this._draw();
      this._on(this._events);
      this._refresh();
      this._on(this.window, {
        beforeunload: function () {
          this.element.removeAttr('autocomplete');
        }
      });
    },
    _getCreateOptions: function () {
      var options = {}, element = this.element;
      $.each([
        'min',
        'max',
        'step'
      ], function (i, option) {
        var value = element.attr(option);
        if (value !== undefined && value.length) {
          options[option] = value;
        }
      });
      return options;
    },
    _events: {
      keydown: function (event) {
        if (this._start(event) && this._keydown(event)) {
          event.preventDefault();
        }
      },
      keyup: '_stop',
      focus: function () {
        this.previous = this.element.val();
      },
      blur: function (event) {
        if (this.cancelBlur) {
          delete this.cancelBlur;
          return;
        }
        this._stop();
        this._refresh();
        if (this.previous !== this.element.val()) {
          this._trigger('change', event);
        }
      },
      mousewheel: function (event, delta) {
        if (!delta) {
          return;
        }
        if (!this.spinning && !this._start(event)) {
          return false;
        }
        this._spin((delta > 0 ? 1 : -1) * this.options.step, event);
        clearTimeout(this.mousewheelTimer);
        this.mousewheelTimer = this._delay(function () {
          if (this.spinning) {
            this._stop(event);
          }
        }, 100);
        event.preventDefault();
      },
      'mousedown .ui-spinner-button': function (event) {
        var previous;
        previous = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();
        function checkFocus() {
          var isActive = this.element[0] === this.document[0].activeElement;
          if (!isActive) {
            this.element.focus();
            this.previous = previous;
            this._delay(function () {
              this.previous = previous;
            });
          }
        }
        event.preventDefault();
        checkFocus.call(this);
        this.cancelBlur = true;
        this._delay(function () {
          delete this.cancelBlur;
          checkFocus.call(this);
        });
        if (this._start(event) === false) {
          return;
        }
        this._repeat(null, $(event.currentTarget).hasClass('ui-spinner-up') ? 1 : -1, event);
      },
      'mouseup .ui-spinner-button': '_stop',
      'mouseenter .ui-spinner-button': function (event) {
        if (!$(event.currentTarget).hasClass('ui-state-active')) {
          return;
        }
        if (this._start(event) === false) {
          return false;
        }
        this._repeat(null, $(event.currentTarget).hasClass('ui-spinner-up') ? 1 : -1, event);
      },
      'mouseleave .ui-spinner-button': '_stop'
    },
    _draw: function () {
      var uiSpinner = this.uiSpinner = this.element.addClass('ui-spinner-input').attr('autocomplete', 'off').wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
      this.element.attr('role', 'spinbutton');
      this.buttons = uiSpinner.find('.ui-spinner-button').attr('tabIndex', -1).button().removeClass('ui-corner-all');
      if (this.buttons.height() > Math.ceil(uiSpinner.height() * 0.5) && uiSpinner.height() > 0) {
        uiSpinner.height(uiSpinner.height());
      }
      if (this.options.disabled) {
        this.disable();
      }
    },
    _keydown: function (event) {
      var options = this.options, keyCode = $.ui.keyCode;
      switch (event.keyCode) {
      case keyCode.UP:
        this._repeat(null, 1, event);
        return true;
      case keyCode.DOWN:
        this._repeat(null, -1, event);
        return true;
      case keyCode.PAGE_UP:
        this._repeat(null, options.page, event);
        return true;
      case keyCode.PAGE_DOWN:
        this._repeat(null, -options.page, event);
        return true;
      }
      return false;
    },
    _uiSpinnerHtml: function () {
      return '<span class=\'ui-spinner ui-widget ui-widget-content ui-corner-all\'></span>';
    },
    _buttonHtml: function () {
      return '' + '<a class=\'ui-spinner-button ui-spinner-up ui-corner-tr\'>' + '<span class=\'ui-icon ' + this.options.icons.up + '\'>&#9650;</span>' + '</a>' + '<a class=\'ui-spinner-button ui-spinner-down ui-corner-br\'>' + '<span class=\'ui-icon ' + this.options.icons.down + '\'>&#9660;</span>' + '</a>';
    },
    _start: function (event) {
      if (!this.spinning && this._trigger('start', event) === false) {
        return false;
      }
      if (!this.counter) {
        this.counter = 1;
      }
      this.spinning = true;
      return true;
    },
    _repeat: function (i, steps, event) {
      i = i || 500;
      clearTimeout(this.timer);
      this.timer = this._delay(function () {
        this._repeat(40, steps, event);
      }, i);
      this._spin(steps * this.options.step, event);
    },
    _spin: function (step, event) {
      var value = this.value() || 0;
      if (!this.counter) {
        this.counter = 1;
      }
      value = this._adjustValue(value + step * this._increment(this.counter));
      if (!this.spinning || this._trigger('spin', event, { value: value }) !== false) {
        this._value(value);
        this.counter++;
      }
    },
    _increment: function (i) {
      var incremental = this.options.incremental;
      if (incremental) {
        return $.isFunction(incremental) ? incremental(i) : Math.floor(i * i * i / 50000 - i * i / 500 + 17 * i / 200 + 1);
      }
      return 1;
    },
    _precision: function () {
      var precision = this._precisionOf(this.options.step);
      if (this.options.min !== null) {
        precision = Math.max(precision, this._precisionOf(this.options.min));
      }
      return precision;
    },
    _precisionOf: function (num) {
      var str = num.toString(), decimal = str.indexOf('.');
      return decimal === -1 ? 0 : str.length - decimal - 1;
    },
    _adjustValue: function (value) {
      var base, aboveMin, options = this.options;
      base = options.min !== null ? options.min : 0;
      aboveMin = value - base;
      aboveMin = Math.round(aboveMin / options.step) * options.step;
      value = base + aboveMin;
      value = parseFloat(value.toFixed(this._precision()));
      if (options.max !== null && value > options.max) {
        return options.max;
      }
      if (options.min !== null && value < options.min) {
        return options.min;
      }
      return value;
    },
    _stop: function (event) {
      if (!this.spinning) {
        return;
      }
      clearTimeout(this.timer);
      clearTimeout(this.mousewheelTimer);
      this.counter = 0;
      this.spinning = false;
      this._trigger('stop', event);
    },
    _setOption: function (key, value) {
      if (key === 'culture' || key === 'numberFormat') {
        var prevValue = this._parse(this.element.val());
        this.options[key] = value;
        this.element.val(this._format(prevValue));
        return;
      }
      if (key === 'max' || key === 'min' || key === 'step') {
        if (typeof value === 'string') {
          value = this._parse(value);
        }
      }
      if (key === 'icons') {
        this.buttons.first().find('.ui-icon').removeClass(this.options.icons.up).addClass(value.up);
        this.buttons.last().find('.ui-icon').removeClass(this.options.icons.down).addClass(value.down);
      }
      this._super(key, value);
      if (key === 'disabled') {
        if (value) {
          this.element.prop('disabled', true);
          this.buttons.button('disable');
        } else {
          this.element.prop('disabled', false);
          this.buttons.button('enable');
        }
      }
    },
    _setOptions: modifier(function (options) {
      this._super(options);
      this._value(this.element.val());
    }),
    _parse: function (val) {
      if (typeof val === 'string' && val !== '') {
        val = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(val, 10, this.options.culture) : +val;
      }
      return val === '' || isNaN(val) ? null : val;
    },
    _format: function (value) {
      if (value === '') {
        return '';
      }
      return window.Globalize && this.options.numberFormat ? Globalize.format(value, this.options.numberFormat, this.options.culture) : value;
    },
    _refresh: function () {
      this.element.attr({
        'aria-valuemin': this.options.min,
        'aria-valuemax': this.options.max,
        'aria-valuenow': this._parse(this.element.val())
      });
    },
    _value: function (value, allowAny) {
      var parsed;
      if (value !== '') {
        parsed = this._parse(value);
        if (parsed !== null) {
          if (!allowAny) {
            parsed = this._adjustValue(parsed);
          }
          value = this._format(parsed);
        }
      }
      this.element.val(value);
      this._refresh();
    },
    _destroy: function () {
      this.element.removeClass('ui-spinner-input').prop('disabled', false).removeAttr('autocomplete').removeAttr('role').removeAttr('aria-valuemin').removeAttr('aria-valuemax').removeAttr('aria-valuenow');
      this.uiSpinner.replaceWith(this.element);
    },
    stepUp: modifier(function (steps) {
      this._stepUp(steps);
    }),
    _stepUp: function (steps) {
      if (this._start()) {
        this._spin((steps || 1) * this.options.step);
        this._stop();
      }
    },
    stepDown: modifier(function (steps) {
      this._stepDown(steps);
    }),
    _stepDown: function (steps) {
      if (this._start()) {
        this._spin((steps || 1) * -this.options.step);
        this._stop();
      }
    },
    pageUp: modifier(function (pages) {
      this._stepUp((pages || 1) * this.options.page);
    }),
    pageDown: modifier(function (pages) {
      this._stepDown((pages || 1) * this.options.page);
    }),
    value: function (newVal) {
      if (!arguments.length) {
        return this._parse(this.element.val());
      }
      modifier(this._value).call(this, newVal);
    },
    widget: function () {
      return this.uiSpinner;
    }
  });
}(jQuery));
(function ($, undefined) {
  var tabId = 0, rhash = /#.*$/;
  function getNextTabId() {
    return ++tabId;
  }
  function isLocal(anchor) {
    return anchor.hash.length > 1 && decodeURIComponent(anchor.href.replace(rhash, '')) === decodeURIComponent(location.href.replace(rhash, ''));
  }
  $.widget('ui.tabs', {
    version: '1.10.3',
    delay: 300,
    options: {
      active: null,
      collapsible: false,
      event: 'click',
      heightStyle: 'content',
      hide: null,
      show: null,
      activate: null,
      beforeActivate: null,
      beforeLoad: null,
      load: null
    },
    _create: function () {
      var that = this, options = this.options;
      this.running = false;
      this.element.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all').toggleClass('ui-tabs-collapsible', options.collapsible).delegate('.ui-tabs-nav > li', 'mousedown' + this.eventNamespace, function (event) {
        if ($(this).is('.ui-state-disabled')) {
          event.preventDefault();
        }
      }).delegate('.ui-tabs-anchor', 'focus' + this.eventNamespace, function () {
        if ($(this).closest('li').is('.ui-state-disabled')) {
          this.blur();
        }
      });
      this._processTabs();
      options.active = this._initialActive();
      if ($.isArray(options.disabled)) {
        options.disabled = $.unique(options.disabled.concat($.map(this.tabs.filter('.ui-state-disabled'), function (li) {
          return that.tabs.index(li);
        }))).sort();
      }
      if (this.options.active !== false && this.anchors.length) {
        this.active = this._findActive(options.active);
      } else {
        this.active = $();
      }
      this._refresh();
      if (this.active.length) {
        this.load(options.active);
      }
    },
    _initialActive: function () {
      var active = this.options.active, collapsible = this.options.collapsible, locationHash = location.hash.substring(1);
      if (active === null) {
        if (locationHash) {
          this.tabs.each(function (i, tab) {
            if ($(tab).attr('aria-controls') === locationHash) {
              active = i;
              return false;
            }
          });
        }
        if (active === null) {
          active = this.tabs.index(this.tabs.filter('.ui-tabs-active'));
        }
        if (active === null || active === -1) {
          active = this.tabs.length ? 0 : false;
        }
      }
      if (active !== false) {
        active = this.tabs.index(this.tabs.eq(active));
        if (active === -1) {
          active = collapsible ? false : 0;
        }
      }
      if (!collapsible && active === false && this.anchors.length) {
        active = 0;
      }
      return active;
    },
    _getCreateEventData: function () {
      return {
        tab: this.active,
        panel: !this.active.length ? $() : this._getPanelForTab(this.active)
      };
    },
    _tabKeydown: function (event) {
      var focusedTab = $(this.document[0].activeElement).closest('li'), selectedIndex = this.tabs.index(focusedTab), goingForward = true;
      if (this._handlePageNav(event)) {
        return;
      }
      switch (event.keyCode) {
      case $.ui.keyCode.RIGHT:
      case $.ui.keyCode.DOWN:
        selectedIndex++;
        break;
      case $.ui.keyCode.UP:
      case $.ui.keyCode.LEFT:
        goingForward = false;
        selectedIndex--;
        break;
      case $.ui.keyCode.END:
        selectedIndex = this.anchors.length - 1;
        break;
      case $.ui.keyCode.HOME:
        selectedIndex = 0;
        break;
      case $.ui.keyCode.SPACE:
        event.preventDefault();
        clearTimeout(this.activating);
        this._activate(selectedIndex);
        return;
      case $.ui.keyCode.ENTER:
        event.preventDefault();
        clearTimeout(this.activating);
        this._activate(selectedIndex === this.options.active ? false : selectedIndex);
        return;
      default:
        return;
      }
      event.preventDefault();
      clearTimeout(this.activating);
      selectedIndex = this._focusNextTab(selectedIndex, goingForward);
      if (!event.ctrlKey) {
        focusedTab.attr('aria-selected', 'false');
        this.tabs.eq(selectedIndex).attr('aria-selected', 'true');
        this.activating = this._delay(function () {
          this.option('active', selectedIndex);
        }, this.delay);
      }
    },
    _panelKeydown: function (event) {
      if (this._handlePageNav(event)) {
        return;
      }
      if (event.ctrlKey && event.keyCode === $.ui.keyCode.UP) {
        event.preventDefault();
        this.active.focus();
      }
    },
    _handlePageNav: function (event) {
      if (event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP) {
        this._activate(this._focusNextTab(this.options.active - 1, false));
        return true;
      }
      if (event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN) {
        this._activate(this._focusNextTab(this.options.active + 1, true));
        return true;
      }
    },
    _findNextTab: function (index, goingForward) {
      var lastTabIndex = this.tabs.length - 1;
      function constrain() {
        if (index > lastTabIndex) {
          index = 0;
        }
        if (index < 0) {
          index = lastTabIndex;
        }
        return index;
      }
      while ($.inArray(constrain(), this.options.disabled) !== -1) {
        index = goingForward ? index + 1 : index - 1;
      }
      return index;
    },
    _focusNextTab: function (index, goingForward) {
      index = this._findNextTab(index, goingForward);
      this.tabs.eq(index).focus();
      return index;
    },
    _setOption: function (key, value) {
      if (key === 'active') {
        this._activate(value);
        return;
      }
      if (key === 'disabled') {
        this._setupDisabled(value);
        return;
      }
      this._super(key, value);
      if (key === 'collapsible') {
        this.element.toggleClass('ui-tabs-collapsible', value);
        if (!value && this.options.active === false) {
          this._activate(0);
        }
      }
      if (key === 'event') {
        this._setupEvents(value);
      }
      if (key === 'heightStyle') {
        this._setupHeightStyle(value);
      }
    },
    _tabId: function (tab) {
      return tab.attr('aria-controls') || 'ui-tabs-' + getNextTabId();
    },
    _sanitizeSelector: function (hash) {
      return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, '\\$&') : '';
    },
    refresh: function () {
      var options = this.options, lis = this.tablist.children(':has(a[href])');
      options.disabled = $.map(lis.filter('.ui-state-disabled'), function (tab) {
        return lis.index(tab);
      });
      this._processTabs();
      if (options.active === false || !this.anchors.length) {
        options.active = false;
        this.active = $();
      } else if (this.active.length && !$.contains(this.tablist[0], this.active[0])) {
        if (this.tabs.length === options.disabled.length) {
          options.active = false;
          this.active = $();
        } else {
          this._activate(this._findNextTab(Math.max(0, options.active - 1), false));
        }
      } else {
        options.active = this.tabs.index(this.active);
      }
      this._refresh();
    },
    _refresh: function () {
      this._setupDisabled(this.options.disabled);
      this._setupEvents(this.options.event);
      this._setupHeightStyle(this.options.heightStyle);
      this.tabs.not(this.active).attr({
        'aria-selected': 'false',
        tabIndex: -1
      });
      this.panels.not(this._getPanelForTab(this.active)).hide().attr({
        'aria-expanded': 'false',
        'aria-hidden': 'true'
      });
      if (!this.active.length) {
        this.tabs.eq(0).attr('tabIndex', 0);
      } else {
        this.active.addClass('ui-tabs-active ui-state-active').attr({
          'aria-selected': 'true',
          tabIndex: 0
        });
        this._getPanelForTab(this.active).show().attr({
          'aria-expanded': 'true',
          'aria-hidden': 'false'
        });
      }
    },
    _processTabs: function () {
      var that = this;
      this.tablist = this._getList().addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all').attr('role', 'tablist');
      this.tabs = this.tablist.find('> li:has(a[href])').addClass('ui-state-default ui-corner-top').attr({
        role: 'tab',
        tabIndex: -1
      });
      this.anchors = this.tabs.map(function () {
        return $('a', this)[0];
      }).addClass('ui-tabs-anchor').attr({
        role: 'presentation',
        tabIndex: -1
      });
      this.panels = $();
      this.anchors.each(function (i, anchor) {
        var selector, panel, panelId, anchorId = $(anchor).uniqueId().attr('id'), tab = $(anchor).closest('li'), originalAriaControls = tab.attr('aria-controls');
        if (isLocal(anchor)) {
          selector = anchor.hash;
          panel = that.element.find(that._sanitizeSelector(selector));
        } else {
          panelId = that._tabId(tab);
          selector = '#' + panelId;
          panel = that.element.find(selector);
          if (!panel.length) {
            panel = that._createPanel(panelId);
            panel.insertAfter(that.panels[i - 1] || that.tablist);
          }
          panel.attr('aria-live', 'polite');
        }
        if (panel.length) {
          that.panels = that.panels.add(panel);
        }
        if (originalAriaControls) {
          tab.data('ui-tabs-aria-controls', originalAriaControls);
        }
        tab.attr({
          'aria-controls': selector.substring(1),
          'aria-labelledby': anchorId
        });
        panel.attr('aria-labelledby', anchorId);
      });
      this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom').attr('role', 'tabpanel');
    },
    _getList: function () {
      return this.element.find('ol,ul').eq(0);
    },
    _createPanel: function (id) {
      return $('<div>').attr('id', id).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom').data('ui-tabs-destroy', true);
    },
    _setupDisabled: function (disabled) {
      if ($.isArray(disabled)) {
        if (!disabled.length) {
          disabled = false;
        } else if (disabled.length === this.anchors.length) {
          disabled = true;
        }
      }
      for (var i = 0, li; li = this.tabs[i]; i++) {
        if (disabled === true || $.inArray(i, disabled) !== -1) {
          $(li).addClass('ui-state-disabled').attr('aria-disabled', 'true');
        } else {
          $(li).removeClass('ui-state-disabled').removeAttr('aria-disabled');
        }
      }
      this.options.disabled = disabled;
    },
    _setupEvents: function (event) {
      var events = {
          click: function (event) {
            event.preventDefault();
          }
        };
      if (event) {
        $.each(event.split(' '), function (index, eventName) {
          events[eventName] = '_eventHandler';
        });
      }
      this._off(this.anchors.add(this.tabs).add(this.panels));
      this._on(this.anchors, events);
      this._on(this.tabs, { keydown: '_tabKeydown' });
      this._on(this.panels, { keydown: '_panelKeydown' });
      this._focusable(this.tabs);
      this._hoverable(this.tabs);
    },
    _setupHeightStyle: function (heightStyle) {
      var maxHeight, parent = this.element.parent();
      if (heightStyle === 'fill') {
        maxHeight = parent.height();
        maxHeight -= this.element.outerHeight() - this.element.height();
        this.element.siblings(':visible').each(function () {
          var elem = $(this), position = elem.css('position');
          if (position === 'absolute' || position === 'fixed') {
            return;
          }
          maxHeight -= elem.outerHeight(true);
        });
        this.element.children().not(this.panels).each(function () {
          maxHeight -= $(this).outerHeight(true);
        });
        this.panels.each(function () {
          $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()));
        }).css('overflow', 'auto');
      } else if (heightStyle === 'auto') {
        maxHeight = 0;
        this.panels.each(function () {
          maxHeight = Math.max(maxHeight, $(this).height('').height());
        }).height(maxHeight);
      }
    },
    _eventHandler: function (event) {
      var options = this.options, active = this.active, anchor = $(event.currentTarget), tab = anchor.closest('li'), clickedIsActive = tab[0] === active[0], collapsing = clickedIsActive && options.collapsible, toShow = collapsing ? $() : this._getPanelForTab(tab), toHide = !active.length ? $() : this._getPanelForTab(active), eventData = {
          oldTab: active,
          oldPanel: toHide,
          newTab: collapsing ? $() : tab,
          newPanel: toShow
        };
      event.preventDefault();
      if (tab.hasClass('ui-state-disabled') || tab.hasClass('ui-tabs-loading') || this.running || clickedIsActive && !options.collapsible || this._trigger('beforeActivate', event, eventData) === false) {
        return;
      }
      options.active = collapsing ? false : this.tabs.index(tab);
      this.active = clickedIsActive ? $() : tab;
      if (this.xhr) {
        this.xhr.abort();
      }
      if (!toHide.length && !toShow.length) {
        $.error('jQuery UI Tabs: Mismatching fragment identifier.');
      }
      if (toShow.length) {
        this.load(this.tabs.index(tab), event);
      }
      this._toggle(event, eventData);
    },
    _toggle: function (event, eventData) {
      var that = this, toShow = eventData.newPanel, toHide = eventData.oldPanel;
      this.running = true;
      function complete() {
        that.running = false;
        that._trigger('activate', event, eventData);
      }
      function show() {
        eventData.newTab.closest('li').addClass('ui-tabs-active ui-state-active');
        if (toShow.length && that.options.show) {
          that._show(toShow, that.options.show, complete);
        } else {
          toShow.show();
          complete();
        }
      }
      if (toHide.length && this.options.hide) {
        this._hide(toHide, this.options.hide, function () {
          eventData.oldTab.closest('li').removeClass('ui-tabs-active ui-state-active');
          show();
        });
      } else {
        eventData.oldTab.closest('li').removeClass('ui-tabs-active ui-state-active');
        toHide.hide();
        show();
      }
      toHide.attr({
        'aria-expanded': 'false',
        'aria-hidden': 'true'
      });
      eventData.oldTab.attr('aria-selected', 'false');
      if (toShow.length && toHide.length) {
        eventData.oldTab.attr('tabIndex', -1);
      } else if (toShow.length) {
        this.tabs.filter(function () {
          return $(this).attr('tabIndex') === 0;
        }).attr('tabIndex', -1);
      }
      toShow.attr({
        'aria-expanded': 'true',
        'aria-hidden': 'false'
      });
      eventData.newTab.attr({
        'aria-selected': 'true',
        tabIndex: 0
      });
    },
    _activate: function (index) {
      var anchor, active = this._findActive(index);
      if (active[0] === this.active[0]) {
        return;
      }
      if (!active.length) {
        active = this.active;
      }
      anchor = active.find('.ui-tabs-anchor')[0];
      this._eventHandler({
        target: anchor,
        currentTarget: anchor,
        preventDefault: $.noop
      });
    },
    _findActive: function (index) {
      return index === false ? $() : this.tabs.eq(index);
    },
    _getIndex: function (index) {
      if (typeof index === 'string') {
        index = this.anchors.index(this.anchors.filter('[href$=\'' + index + '\']'));
      }
      return index;
    },
    _destroy: function () {
      if (this.xhr) {
        this.xhr.abort();
      }
      this.element.removeClass('ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible');
      this.tablist.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all').removeAttr('role');
      this.anchors.removeClass('ui-tabs-anchor').removeAttr('role').removeAttr('tabIndex').removeUniqueId();
      this.tabs.add(this.panels).each(function () {
        if ($.data(this, 'ui-tabs-destroy')) {
          $(this).remove();
        } else {
          $(this).removeClass('ui-state-default ui-state-active ui-state-disabled ' + 'ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel').removeAttr('tabIndex').removeAttr('aria-live').removeAttr('aria-busy').removeAttr('aria-selected').removeAttr('aria-labelledby').removeAttr('aria-hidden').removeAttr('aria-expanded').removeAttr('role');
        }
      });
      this.tabs.each(function () {
        var li = $(this), prev = li.data('ui-tabs-aria-controls');
        if (prev) {
          li.attr('aria-controls', prev).removeData('ui-tabs-aria-controls');
        } else {
          li.removeAttr('aria-controls');
        }
      });
      this.panels.show();
      if (this.options.heightStyle !== 'content') {
        this.panels.css('height', '');
      }
    },
    enable: function (index) {
      var disabled = this.options.disabled;
      if (disabled === false) {
        return;
      }
      if (index === undefined) {
        disabled = false;
      } else {
        index = this._getIndex(index);
        if ($.isArray(disabled)) {
          disabled = $.map(disabled, function (num) {
            return num !== index ? num : null;
          });
        } else {
          disabled = $.map(this.tabs, function (li, num) {
            return num !== index ? num : null;
          });
        }
      }
      this._setupDisabled(disabled);
    },
    disable: function (index) {
      var disabled = this.options.disabled;
      if (disabled === true) {
        return;
      }
      if (index === undefined) {
        disabled = true;
      } else {
        index = this._getIndex(index);
        if ($.inArray(index, disabled) !== -1) {
          return;
        }
        if ($.isArray(disabled)) {
          disabled = $.merge([index], disabled).sort();
        } else {
          disabled = [index];
        }
      }
      this._setupDisabled(disabled);
    },
    load: function (index, event) {
      index = this._getIndex(index);
      var that = this, tab = this.tabs.eq(index), anchor = tab.find('.ui-tabs-anchor'), panel = this._getPanelForTab(tab), eventData = {
          tab: tab,
          panel: panel
        };
      if (isLocal(anchor[0])) {
        return;
      }
      this.xhr = $.ajax(this._ajaxSettings(anchor, event, eventData));
      if (this.xhr && this.xhr.statusText !== 'canceled') {
        tab.addClass('ui-tabs-loading');
        panel.attr('aria-busy', 'true');
        this.xhr.success(function (response) {
          setTimeout(function () {
            panel.html(response);
            that._trigger('load', event, eventData);
          }, 1);
        }).complete(function (jqXHR, status) {
          setTimeout(function () {
            if (status === 'abort') {
              that.panels.stop(false, true);
            }
            tab.removeClass('ui-tabs-loading');
            panel.removeAttr('aria-busy');
            if (jqXHR === that.xhr) {
              delete that.xhr;
            }
          }, 1);
        });
      }
    },
    _ajaxSettings: function (anchor, event, eventData) {
      var that = this;
      return {
        url: anchor.attr('href'),
        beforeSend: function (jqXHR, settings) {
          return that._trigger('beforeLoad', event, $.extend({
            jqXHR: jqXHR,
            ajaxSettings: settings
          }, eventData));
        }
      };
    },
    _getPanelForTab: function (tab) {
      var id = $(tab).attr('aria-controls');
      return this.element.find(this._sanitizeSelector('#' + id));
    }
  });
}(jQuery));
(function ($) {
  var increments = 0;
  function addDescribedBy(elem, id) {
    var describedby = (elem.attr('aria-describedby') || '').split(/\s+/);
    describedby.push(id);
    elem.data('ui-tooltip-id', id).attr('aria-describedby', $.trim(describedby.join(' ')));
  }
  function removeDescribedBy(elem) {
    var id = elem.data('ui-tooltip-id'), describedby = (elem.attr('aria-describedby') || '').split(/\s+/), index = $.inArray(id, describedby);
    if (index !== -1) {
      describedby.splice(index, 1);
    }
    elem.removeData('ui-tooltip-id');
    describedby = $.trim(describedby.join(' '));
    if (describedby) {
      elem.attr('aria-describedby', describedby);
    } else {
      elem.removeAttr('aria-describedby');
    }
  }
  $.widget('ui.tooltip', {
    version: '1.10.3',
    options: {
      content: function () {
        var title = $(this).attr('title') || '';
        return $('<a>').text(title).html();
      },
      hide: true,
      items: '[title]:not([disabled])',
      position: {
        my: 'left top+15',
        at: 'left bottom',
        collision: 'flipfit flip'
      },
      show: true,
      tooltipClass: null,
      track: false,
      close: null,
      open: null
    },
    _create: function () {
      this._on({
        mouseover: 'open',
        focusin: 'open'
      });
      this.tooltips = {};
      this.parents = {};
      if (this.options.disabled) {
        this._disable();
      }
    },
    _setOption: function (key, value) {
      var that = this;
      if (key === 'disabled') {
        this[value ? '_disable' : '_enable']();
        this.options[key] = value;
        return;
      }
      this._super(key, value);
      if (key === 'content') {
        $.each(this.tooltips, function (id, element) {
          that._updateContent(element);
        });
      }
    },
    _disable: function () {
      var that = this;
      $.each(this.tooltips, function (id, element) {
        var event = $.Event('blur');
        event.target = event.currentTarget = element[0];
        that.close(event, true);
      });
      this.element.find(this.options.items).addBack().each(function () {
        var element = $(this);
        if (element.is('[title]')) {
          element.data('ui-tooltip-title', element.attr('title')).attr('title', '');
        }
      });
    },
    _enable: function () {
      this.element.find(this.options.items).addBack().each(function () {
        var element = $(this);
        if (element.data('ui-tooltip-title')) {
          element.attr('title', element.data('ui-tooltip-title'));
        }
      });
    },
    open: function (event) {
      var that = this, target = $(event ? event.target : this.element).closest(this.options.items);
      if (!target.length || target.data('ui-tooltip-id')) {
        return;
      }
      if (target.attr('title')) {
        target.data('ui-tooltip-title', target.attr('title'));
      }
      target.data('ui-tooltip-open', true);
      if (event && event.type === 'mouseover') {
        target.parents().each(function () {
          var parent = $(this), blurEvent;
          if (parent.data('ui-tooltip-open')) {
            blurEvent = $.Event('blur');
            blurEvent.target = blurEvent.currentTarget = this;
            that.close(blurEvent, true);
          }
          if (parent.attr('title')) {
            parent.uniqueId();
            that.parents[this.id] = {
              element: this,
              title: parent.attr('title')
            };
            parent.attr('title', '');
          }
        });
      }
      this._updateContent(target, event);
    },
    _updateContent: function (target, event) {
      var content, contentOption = this.options.content, that = this, eventType = event ? event.type : null;
      if (typeof contentOption === 'string') {
        return this._open(event, target, contentOption);
      }
      content = contentOption.call(target[0], function (response) {
        if (!target.data('ui-tooltip-open')) {
          return;
        }
        that._delay(function () {
          if (event) {
            event.type = eventType;
          }
          this._open(event, target, response);
        });
      });
      if (content) {
        this._open(event, target, content);
      }
    },
    _open: function (event, target, content) {
      var tooltip, events, delayedShow, positionOption = $.extend({}, this.options.position);
      if (!content) {
        return;
      }
      tooltip = this._find(target);
      if (tooltip.length) {
        tooltip.find('.ui-tooltip-content').html(content);
        return;
      }
      if (target.is('[title]')) {
        if (event && event.type === 'mouseover') {
          target.attr('title', '');
        } else {
          target.removeAttr('title');
        }
      }
      tooltip = this._tooltip(target);
      addDescribedBy(target, tooltip.attr('id'));
      tooltip.find('.ui-tooltip-content').html(content);
      function position(event) {
        positionOption.of = event;
        if (tooltip.is(':hidden')) {
          return;
        }
        tooltip.position(positionOption);
      }
      if (this.options.track && event && /^mouse/.test(event.type)) {
        this._on(this.document, { mousemove: position });
        position(event);
      } else {
        tooltip.position($.extend({ of: target }, this.options.position));
      }
      tooltip.hide();
      this._show(tooltip, this.options.show);
      if (this.options.show && this.options.show.delay) {
        delayedShow = this.delayedShow = setInterval(function () {
          if (tooltip.is(':visible')) {
            position(positionOption.of);
            clearInterval(delayedShow);
          }
        }, $.fx.interval);
      }
      this._trigger('open', event, { tooltip: tooltip });
      events = {
        keyup: function (event) {
          if (event.keyCode === $.ui.keyCode.ESCAPE) {
            var fakeEvent = $.Event(event);
            fakeEvent.currentTarget = target[0];
            this.close(fakeEvent, true);
          }
        },
        remove: function () {
          this._removeTooltip(tooltip);
        }
      };
      if (!event || event.type === 'mouseover') {
        events.mouseleave = 'close';
      }
      if (!event || event.type === 'focusin') {
        events.focusout = 'close';
      }
      this._on(true, target, events);
    },
    close: function (event) {
      var that = this, target = $(event ? event.currentTarget : this.element), tooltip = this._find(target);
      if (this.closing) {
        return;
      }
      clearInterval(this.delayedShow);
      if (target.data('ui-tooltip-title')) {
        target.attr('title', target.data('ui-tooltip-title'));
      }
      removeDescribedBy(target);
      tooltip.stop(true);
      this._hide(tooltip, this.options.hide, function () {
        that._removeTooltip($(this));
      });
      target.removeData('ui-tooltip-open');
      this._off(target, 'mouseleave focusout keyup');
      if (target[0] !== this.element[0]) {
        this._off(target, 'remove');
      }
      this._off(this.document, 'mousemove');
      if (event && event.type === 'mouseleave') {
        $.each(this.parents, function (id, parent) {
          $(parent.element).attr('title', parent.title);
          delete that.parents[id];
        });
      }
      this.closing = true;
      this._trigger('close', event, { tooltip: tooltip });
      this.closing = false;
    },
    _tooltip: function (element) {
      var id = 'ui-tooltip-' + increments++, tooltip = $('<div>').attr({
          id: id,
          role: 'tooltip'
        }).addClass('ui-tooltip ui-widget ui-corner-all ui-widget-content ' + (this.options.tooltipClass || ''));
      $('<div>').addClass('ui-tooltip-content').appendTo(tooltip);
      tooltip.appendTo(this.document[0].body);
      this.tooltips[id] = element;
      return tooltip;
    },
    _find: function (target) {
      var id = target.data('ui-tooltip-id');
      return id ? $('#' + id) : $();
    },
    _removeTooltip: function (tooltip) {
      tooltip.remove();
      delete this.tooltips[tooltip.attr('id')];
    },
    _destroy: function () {
      var that = this;
      $.each(this.tooltips, function (id, element) {
        var event = $.Event('blur');
        event.target = event.currentTarget = element[0];
        that.close(event, true);
        $('#' + id).remove();
        if (element.data('ui-tooltip-title')) {
          element.attr('title', element.data('ui-tooltip-title'));
          element.removeData('ui-tooltip-title');
        }
      });
    }
  });
}(jQuery));
(function ($) {
  if (typeof $.fn.each2 == 'undefined') {
    $.extend($.fn, {
      each2: function (c) {
        var j = $([0]), i = -1, l = this.length;
        while (++i < l && (j.context = j[0] = this[i]) && c.call(j[0], i, j) !== false);
        return this;
      }
    });
  }
}(jQuery));
(function ($, undefined) {
  'use strict';
  if (window.Select2 !== undefined) {
    return;
  }
  var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer, lastMousePosition = {
      x: 0,
      y: 0
    }, $document, scrollBarDimensions, KEY = {
      TAB: 9,
      ENTER: 13,
      ESC: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      HOME: 36,
      END: 35,
      BACKSPACE: 8,
      DELETE: 46,
      isArrow: function (k) {
        k = k.which ? k.which : k;
        switch (k) {
        case KEY.LEFT:
        case KEY.RIGHT:
        case KEY.UP:
        case KEY.DOWN:
          return true;
        }
        return false;
      },
      isControl: function (e) {
        var k = e.which;
        switch (k) {
        case KEY.SHIFT:
        case KEY.CTRL:
        case KEY.ALT:
          return true;
        }
        if (e.metaKey)
          return true;
        return false;
      },
      isFunctionKey: function (k) {
        k = k.which ? k.which : k;
        return k >= 112 && k <= 123;
      }
    }, MEASURE_SCROLLBAR_TEMPLATE = '<div class=\'select2-measure-scrollbar\'></div>', DIACRITICS = {
      '\u24b6': 'A',
      '\uff21': 'A',
      '\xc0': 'A',
      '\xc1': 'A',
      '\xc2': 'A',
      '\u1ea6': 'A',
      '\u1ea4': 'A',
      '\u1eaa': 'A',
      '\u1ea8': 'A',
      '\xc3': 'A',
      '\u0100': 'A',
      '\u0102': 'A',
      '\u1eb0': 'A',
      '\u1eae': 'A',
      '\u1eb4': 'A',
      '\u1eb2': 'A',
      '\u0226': 'A',
      '\u01e0': 'A',
      '\xc4': 'A',
      '\u01de': 'A',
      '\u1ea2': 'A',
      '\xc5': 'A',
      '\u01fa': 'A',
      '\u01cd': 'A',
      '\u0200': 'A',
      '\u0202': 'A',
      '\u1ea0': 'A',
      '\u1eac': 'A',
      '\u1eb6': 'A',
      '\u1e00': 'A',
      '\u0104': 'A',
      '\u023a': 'A',
      '\u2c6f': 'A',
      '\ua732': 'AA',
      '\xc6': 'AE',
      '\u01fc': 'AE',
      '\u01e2': 'AE',
      '\ua734': 'AO',
      '\ua736': 'AU',
      '\ua738': 'AV',
      '\ua73a': 'AV',
      '\ua73c': 'AY',
      '\u24b7': 'B',
      '\uff22': 'B',
      '\u1e02': 'B',
      '\u1e04': 'B',
      '\u1e06': 'B',
      '\u0243': 'B',
      '\u0182': 'B',
      '\u0181': 'B',
      '\u24b8': 'C',
      '\uff23': 'C',
      '\u0106': 'C',
      '\u0108': 'C',
      '\u010a': 'C',
      '\u010c': 'C',
      '\xc7': 'C',
      '\u1e08': 'C',
      '\u0187': 'C',
      '\u023b': 'C',
      '\ua73e': 'C',
      '\u24b9': 'D',
      '\uff24': 'D',
      '\u1e0a': 'D',
      '\u010e': 'D',
      '\u1e0c': 'D',
      '\u1e10': 'D',
      '\u1e12': 'D',
      '\u1e0e': 'D',
      '\u0110': 'D',
      '\u018b': 'D',
      '\u018a': 'D',
      '\u0189': 'D',
      '\ua779': 'D',
      '\u01f1': 'DZ',
      '\u01c4': 'DZ',
      '\u01f2': 'Dz',
      '\u01c5': 'Dz',
      '\u24ba': 'E',
      '\uff25': 'E',
      '\xc8': 'E',
      '\xc9': 'E',
      '\xca': 'E',
      '\u1ec0': 'E',
      '\u1ebe': 'E',
      '\u1ec4': 'E',
      '\u1ec2': 'E',
      '\u1ebc': 'E',
      '\u0112': 'E',
      '\u1e14': 'E',
      '\u1e16': 'E',
      '\u0114': 'E',
      '\u0116': 'E',
      '\xcb': 'E',
      '\u1eba': 'E',
      '\u011a': 'E',
      '\u0204': 'E',
      '\u0206': 'E',
      '\u1eb8': 'E',
      '\u1ec6': 'E',
      '\u0228': 'E',
      '\u1e1c': 'E',
      '\u0118': 'E',
      '\u1e18': 'E',
      '\u1e1a': 'E',
      '\u0190': 'E',
      '\u018e': 'E',
      '\u24bb': 'F',
      '\uff26': 'F',
      '\u1e1e': 'F',
      '\u0191': 'F',
      '\ua77b': 'F',
      '\u24bc': 'G',
      '\uff27': 'G',
      '\u01f4': 'G',
      '\u011c': 'G',
      '\u1e20': 'G',
      '\u011e': 'G',
      '\u0120': 'G',
      '\u01e6': 'G',
      '\u0122': 'G',
      '\u01e4': 'G',
      '\u0193': 'G',
      '\ua7a0': 'G',
      '\ua77d': 'G',
      '\ua77e': 'G',
      '\u24bd': 'H',
      '\uff28': 'H',
      '\u0124': 'H',
      '\u1e22': 'H',
      '\u1e26': 'H',
      '\u021e': 'H',
      '\u1e24': 'H',
      '\u1e28': 'H',
      '\u1e2a': 'H',
      '\u0126': 'H',
      '\u2c67': 'H',
      '\u2c75': 'H',
      '\ua78d': 'H',
      '\u24be': 'I',
      '\uff29': 'I',
      '\xcc': 'I',
      '\xcd': 'I',
      '\xce': 'I',
      '\u0128': 'I',
      '\u012a': 'I',
      '\u012c': 'I',
      '\u0130': 'I',
      '\xcf': 'I',
      '\u1e2e': 'I',
      '\u1ec8': 'I',
      '\u01cf': 'I',
      '\u0208': 'I',
      '\u020a': 'I',
      '\u1eca': 'I',
      '\u012e': 'I',
      '\u1e2c': 'I',
      '\u0197': 'I',
      '\u24bf': 'J',
      '\uff2a': 'J',
      '\u0134': 'J',
      '\u0248': 'J',
      '\u24c0': 'K',
      '\uff2b': 'K',
      '\u1e30': 'K',
      '\u01e8': 'K',
      '\u1e32': 'K',
      '\u0136': 'K',
      '\u1e34': 'K',
      '\u0198': 'K',
      '\u2c69': 'K',
      '\ua740': 'K',
      '\ua742': 'K',
      '\ua744': 'K',
      '\ua7a2': 'K',
      '\u24c1': 'L',
      '\uff2c': 'L',
      '\u013f': 'L',
      '\u0139': 'L',
      '\u013d': 'L',
      '\u1e36': 'L',
      '\u1e38': 'L',
      '\u013b': 'L',
      '\u1e3c': 'L',
      '\u1e3a': 'L',
      '\u0141': 'L',
      '\u023d': 'L',
      '\u2c62': 'L',
      '\u2c60': 'L',
      '\ua748': 'L',
      '\ua746': 'L',
      '\ua780': 'L',
      '\u01c7': 'LJ',
      '\u01c8': 'Lj',
      '\u24c2': 'M',
      '\uff2d': 'M',
      '\u1e3e': 'M',
      '\u1e40': 'M',
      '\u1e42': 'M',
      '\u2c6e': 'M',
      '\u019c': 'M',
      '\u24c3': 'N',
      '\uff2e': 'N',
      '\u01f8': 'N',
      '\u0143': 'N',
      '\xd1': 'N',
      '\u1e44': 'N',
      '\u0147': 'N',
      '\u1e46': 'N',
      '\u0145': 'N',
      '\u1e4a': 'N',
      '\u1e48': 'N',
      '\u0220': 'N',
      '\u019d': 'N',
      '\ua790': 'N',
      '\ua7a4': 'N',
      '\u01ca': 'NJ',
      '\u01cb': 'Nj',
      '\u24c4': 'O',
      '\uff2f': 'O',
      '\xd2': 'O',
      '\xd3': 'O',
      '\xd4': 'O',
      '\u1ed2': 'O',
      '\u1ed0': 'O',
      '\u1ed6': 'O',
      '\u1ed4': 'O',
      '\xd5': 'O',
      '\u1e4c': 'O',
      '\u022c': 'O',
      '\u1e4e': 'O',
      '\u014c': 'O',
      '\u1e50': 'O',
      '\u1e52': 'O',
      '\u014e': 'O',
      '\u022e': 'O',
      '\u0230': 'O',
      '\xd6': 'O',
      '\u022a': 'O',
      '\u1ece': 'O',
      '\u0150': 'O',
      '\u01d1': 'O',
      '\u020c': 'O',
      '\u020e': 'O',
      '\u01a0': 'O',
      '\u1edc': 'O',
      '\u1eda': 'O',
      '\u1ee0': 'O',
      '\u1ede': 'O',
      '\u1ee2': 'O',
      '\u1ecc': 'O',
      '\u1ed8': 'O',
      '\u01ea': 'O',
      '\u01ec': 'O',
      '\xd8': 'O',
      '\u01fe': 'O',
      '\u0186': 'O',
      '\u019f': 'O',
      '\ua74a': 'O',
      '\ua74c': 'O',
      '\u01a2': 'OI',
      '\ua74e': 'OO',
      '\u0222': 'OU',
      '\u24c5': 'P',
      '\uff30': 'P',
      '\u1e54': 'P',
      '\u1e56': 'P',
      '\u01a4': 'P',
      '\u2c63': 'P',
      '\ua750': 'P',
      '\ua752': 'P',
      '\ua754': 'P',
      '\u24c6': 'Q',
      '\uff31': 'Q',
      '\ua756': 'Q',
      '\ua758': 'Q',
      '\u024a': 'Q',
      '\u24c7': 'R',
      '\uff32': 'R',
      '\u0154': 'R',
      '\u1e58': 'R',
      '\u0158': 'R',
      '\u0210': 'R',
      '\u0212': 'R',
      '\u1e5a': 'R',
      '\u1e5c': 'R',
      '\u0156': 'R',
      '\u1e5e': 'R',
      '\u024c': 'R',
      '\u2c64': 'R',
      '\ua75a': 'R',
      '\ua7a6': 'R',
      '\ua782': 'R',
      '\u24c8': 'S',
      '\uff33': 'S',
      '\u1e9e': 'S',
      '\u015a': 'S',
      '\u1e64': 'S',
      '\u015c': 'S',
      '\u1e60': 'S',
      '\u0160': 'S',
      '\u1e66': 'S',
      '\u1e62': 'S',
      '\u1e68': 'S',
      '\u0218': 'S',
      '\u015e': 'S',
      '\u2c7e': 'S',
      '\ua7a8': 'S',
      '\ua784': 'S',
      '\u24c9': 'T',
      '\uff34': 'T',
      '\u1e6a': 'T',
      '\u0164': 'T',
      '\u1e6c': 'T',
      '\u021a': 'T',
      '\u0162': 'T',
      '\u1e70': 'T',
      '\u1e6e': 'T',
      '\u0166': 'T',
      '\u01ac': 'T',
      '\u01ae': 'T',
      '\u023e': 'T',
      '\ua786': 'T',
      '\ua728': 'TZ',
      '\u24ca': 'U',
      '\uff35': 'U',
      '\xd9': 'U',
      '\xda': 'U',
      '\xdb': 'U',
      '\u0168': 'U',
      '\u1e78': 'U',
      '\u016a': 'U',
      '\u1e7a': 'U',
      '\u016c': 'U',
      '\xdc': 'U',
      '\u01db': 'U',
      '\u01d7': 'U',
      '\u01d5': 'U',
      '\u01d9': 'U',
      '\u1ee6': 'U',
      '\u016e': 'U',
      '\u0170': 'U',
      '\u01d3': 'U',
      '\u0214': 'U',
      '\u0216': 'U',
      '\u01af': 'U',
      '\u1eea': 'U',
      '\u1ee8': 'U',
      '\u1eee': 'U',
      '\u1eec': 'U',
      '\u1ef0': 'U',
      '\u1ee4': 'U',
      '\u1e72': 'U',
      '\u0172': 'U',
      '\u1e76': 'U',
      '\u1e74': 'U',
      '\u0244': 'U',
      '\u24cb': 'V',
      '\uff36': 'V',
      '\u1e7c': 'V',
      '\u1e7e': 'V',
      '\u01b2': 'V',
      '\ua75e': 'V',
      '\u0245': 'V',
      '\ua760': 'VY',
      '\u24cc': 'W',
      '\uff37': 'W',
      '\u1e80': 'W',
      '\u1e82': 'W',
      '\u0174': 'W',
      '\u1e86': 'W',
      '\u1e84': 'W',
      '\u1e88': 'W',
      '\u2c72': 'W',
      '\u24cd': 'X',
      '\uff38': 'X',
      '\u1e8a': 'X',
      '\u1e8c': 'X',
      '\u24ce': 'Y',
      '\uff39': 'Y',
      '\u1ef2': 'Y',
      '\xdd': 'Y',
      '\u0176': 'Y',
      '\u1ef8': 'Y',
      '\u0232': 'Y',
      '\u1e8e': 'Y',
      '\u0178': 'Y',
      '\u1ef6': 'Y',
      '\u1ef4': 'Y',
      '\u01b3': 'Y',
      '\u024e': 'Y',
      '\u1efe': 'Y',
      '\u24cf': 'Z',
      '\uff3a': 'Z',
      '\u0179': 'Z',
      '\u1e90': 'Z',
      '\u017b': 'Z',
      '\u017d': 'Z',
      '\u1e92': 'Z',
      '\u1e94': 'Z',
      '\u01b5': 'Z',
      '\u0224': 'Z',
      '\u2c7f': 'Z',
      '\u2c6b': 'Z',
      '\ua762': 'Z',
      '\u24d0': 'a',
      '\uff41': 'a',
      '\u1e9a': 'a',
      '\xe0': 'a',
      '\xe1': 'a',
      '\xe2': 'a',
      '\u1ea7': 'a',
      '\u1ea5': 'a',
      '\u1eab': 'a',
      '\u1ea9': 'a',
      '\xe3': 'a',
      '\u0101': 'a',
      '\u0103': 'a',
      '\u1eb1': 'a',
      '\u1eaf': 'a',
      '\u1eb5': 'a',
      '\u1eb3': 'a',
      '\u0227': 'a',
      '\u01e1': 'a',
      '\xe4': 'a',
      '\u01df': 'a',
      '\u1ea3': 'a',
      '\xe5': 'a',
      '\u01fb': 'a',
      '\u01ce': 'a',
      '\u0201': 'a',
      '\u0203': 'a',
      '\u1ea1': 'a',
      '\u1ead': 'a',
      '\u1eb7': 'a',
      '\u1e01': 'a',
      '\u0105': 'a',
      '\u2c65': 'a',
      '\u0250': 'a',
      '\ua733': 'aa',
      '\xe6': 'ae',
      '\u01fd': 'ae',
      '\u01e3': 'ae',
      '\ua735': 'ao',
      '\ua737': 'au',
      '\ua739': 'av',
      '\ua73b': 'av',
      '\ua73d': 'ay',
      '\u24d1': 'b',
      '\uff42': 'b',
      '\u1e03': 'b',
      '\u1e05': 'b',
      '\u1e07': 'b',
      '\u0180': 'b',
      '\u0183': 'b',
      '\u0253': 'b',
      '\u24d2': 'c',
      '\uff43': 'c',
      '\u0107': 'c',
      '\u0109': 'c',
      '\u010b': 'c',
      '\u010d': 'c',
      '\xe7': 'c',
      '\u1e09': 'c',
      '\u0188': 'c',
      '\u023c': 'c',
      '\ua73f': 'c',
      '\u2184': 'c',
      '\u24d3': 'd',
      '\uff44': 'd',
      '\u1e0b': 'd',
      '\u010f': 'd',
      '\u1e0d': 'd',
      '\u1e11': 'd',
      '\u1e13': 'd',
      '\u1e0f': 'd',
      '\u0111': 'd',
      '\u018c': 'd',
      '\u0256': 'd',
      '\u0257': 'd',
      '\ua77a': 'd',
      '\u01f3': 'dz',
      '\u01c6': 'dz',
      '\u24d4': 'e',
      '\uff45': 'e',
      '\xe8': 'e',
      '\xe9': 'e',
      '\xea': 'e',
      '\u1ec1': 'e',
      '\u1ebf': 'e',
      '\u1ec5': 'e',
      '\u1ec3': 'e',
      '\u1ebd': 'e',
      '\u0113': 'e',
      '\u1e15': 'e',
      '\u1e17': 'e',
      '\u0115': 'e',
      '\u0117': 'e',
      '\xeb': 'e',
      '\u1ebb': 'e',
      '\u011b': 'e',
      '\u0205': 'e',
      '\u0207': 'e',
      '\u1eb9': 'e',
      '\u1ec7': 'e',
      '\u0229': 'e',
      '\u1e1d': 'e',
      '\u0119': 'e',
      '\u1e19': 'e',
      '\u1e1b': 'e',
      '\u0247': 'e',
      '\u025b': 'e',
      '\u01dd': 'e',
      '\u24d5': 'f',
      '\uff46': 'f',
      '\u1e1f': 'f',
      '\u0192': 'f',
      '\ua77c': 'f',
      '\u24d6': 'g',
      '\uff47': 'g',
      '\u01f5': 'g',
      '\u011d': 'g',
      '\u1e21': 'g',
      '\u011f': 'g',
      '\u0121': 'g',
      '\u01e7': 'g',
      '\u0123': 'g',
      '\u01e5': 'g',
      '\u0260': 'g',
      '\ua7a1': 'g',
      '\u1d79': 'g',
      '\ua77f': 'g',
      '\u24d7': 'h',
      '\uff48': 'h',
      '\u0125': 'h',
      '\u1e23': 'h',
      '\u1e27': 'h',
      '\u021f': 'h',
      '\u1e25': 'h',
      '\u1e29': 'h',
      '\u1e2b': 'h',
      '\u1e96': 'h',
      '\u0127': 'h',
      '\u2c68': 'h',
      '\u2c76': 'h',
      '\u0265': 'h',
      '\u0195': 'hv',
      '\u24d8': 'i',
      '\uff49': 'i',
      '\xec': 'i',
      '\xed': 'i',
      '\xee': 'i',
      '\u0129': 'i',
      '\u012b': 'i',
      '\u012d': 'i',
      '\xef': 'i',
      '\u1e2f': 'i',
      '\u1ec9': 'i',
      '\u01d0': 'i',
      '\u0209': 'i',
      '\u020b': 'i',
      '\u1ecb': 'i',
      '\u012f': 'i',
      '\u1e2d': 'i',
      '\u0268': 'i',
      '\u0131': 'i',
      '\u24d9': 'j',
      '\uff4a': 'j',
      '\u0135': 'j',
      '\u01f0': 'j',
      '\u0249': 'j',
      '\u24da': 'k',
      '\uff4b': 'k',
      '\u1e31': 'k',
      '\u01e9': 'k',
      '\u1e33': 'k',
      '\u0137': 'k',
      '\u1e35': 'k',
      '\u0199': 'k',
      '\u2c6a': 'k',
      '\ua741': 'k',
      '\ua743': 'k',
      '\ua745': 'k',
      '\ua7a3': 'k',
      '\u24db': 'l',
      '\uff4c': 'l',
      '\u0140': 'l',
      '\u013a': 'l',
      '\u013e': 'l',
      '\u1e37': 'l',
      '\u1e39': 'l',
      '\u013c': 'l',
      '\u1e3d': 'l',
      '\u1e3b': 'l',
      '\u017f': 'l',
      '\u0142': 'l',
      '\u019a': 'l',
      '\u026b': 'l',
      '\u2c61': 'l',
      '\ua749': 'l',
      '\ua781': 'l',
      '\ua747': 'l',
      '\u01c9': 'lj',
      '\u24dc': 'm',
      '\uff4d': 'm',
      '\u1e3f': 'm',
      '\u1e41': 'm',
      '\u1e43': 'm',
      '\u0271': 'm',
      '\u026f': 'm',
      '\u24dd': 'n',
      '\uff4e': 'n',
      '\u01f9': 'n',
      '\u0144': 'n',
      '\xf1': 'n',
      '\u1e45': 'n',
      '\u0148': 'n',
      '\u1e47': 'n',
      '\u0146': 'n',
      '\u1e4b': 'n',
      '\u1e49': 'n',
      '\u019e': 'n',
      '\u0272': 'n',
      '\u0149': 'n',
      '\ua791': 'n',
      '\ua7a5': 'n',
      '\u01cc': 'nj',
      '\u24de': 'o',
      '\uff4f': 'o',
      '\xf2': 'o',
      '\xf3': 'o',
      '\xf4': 'o',
      '\u1ed3': 'o',
      '\u1ed1': 'o',
      '\u1ed7': 'o',
      '\u1ed5': 'o',
      '\xf5': 'o',
      '\u1e4d': 'o',
      '\u022d': 'o',
      '\u1e4f': 'o',
      '\u014d': 'o',
      '\u1e51': 'o',
      '\u1e53': 'o',
      '\u014f': 'o',
      '\u022f': 'o',
      '\u0231': 'o',
      '\xf6': 'o',
      '\u022b': 'o',
      '\u1ecf': 'o',
      '\u0151': 'o',
      '\u01d2': 'o',
      '\u020d': 'o',
      '\u020f': 'o',
      '\u01a1': 'o',
      '\u1edd': 'o',
      '\u1edb': 'o',
      '\u1ee1': 'o',
      '\u1edf': 'o',
      '\u1ee3': 'o',
      '\u1ecd': 'o',
      '\u1ed9': 'o',
      '\u01eb': 'o',
      '\u01ed': 'o',
      '\xf8': 'o',
      '\u01ff': 'o',
      '\u0254': 'o',
      '\ua74b': 'o',
      '\ua74d': 'o',
      '\u0275': 'o',
      '\u01a3': 'oi',
      '\u0223': 'ou',
      '\ua74f': 'oo',
      '\u24df': 'p',
      '\uff50': 'p',
      '\u1e55': 'p',
      '\u1e57': 'p',
      '\u01a5': 'p',
      '\u1d7d': 'p',
      '\ua751': 'p',
      '\ua753': 'p',
      '\ua755': 'p',
      '\u24e0': 'q',
      '\uff51': 'q',
      '\u024b': 'q',
      '\ua757': 'q',
      '\ua759': 'q',
      '\u24e1': 'r',
      '\uff52': 'r',
      '\u0155': 'r',
      '\u1e59': 'r',
      '\u0159': 'r',
      '\u0211': 'r',
      '\u0213': 'r',
      '\u1e5b': 'r',
      '\u1e5d': 'r',
      '\u0157': 'r',
      '\u1e5f': 'r',
      '\u024d': 'r',
      '\u027d': 'r',
      '\ua75b': 'r',
      '\ua7a7': 'r',
      '\ua783': 'r',
      '\u24e2': 's',
      '\uff53': 's',
      '\xdf': 's',
      '\u015b': 's',
      '\u1e65': 's',
      '\u015d': 's',
      '\u1e61': 's',
      '\u0161': 's',
      '\u1e67': 's',
      '\u1e63': 's',
      '\u1e69': 's',
      '\u0219': 's',
      '\u015f': 's',
      '\u023f': 's',
      '\ua7a9': 's',
      '\ua785': 's',
      '\u1e9b': 's',
      '\u24e3': 't',
      '\uff54': 't',
      '\u1e6b': 't',
      '\u1e97': 't',
      '\u0165': 't',
      '\u1e6d': 't',
      '\u021b': 't',
      '\u0163': 't',
      '\u1e71': 't',
      '\u1e6f': 't',
      '\u0167': 't',
      '\u01ad': 't',
      '\u0288': 't',
      '\u2c66': 't',
      '\ua787': 't',
      '\ua729': 'tz',
      '\u24e4': 'u',
      '\uff55': 'u',
      '\xf9': 'u',
      '\xfa': 'u',
      '\xfb': 'u',
      '\u0169': 'u',
      '\u1e79': 'u',
      '\u016b': 'u',
      '\u1e7b': 'u',
      '\u016d': 'u',
      '\xfc': 'u',
      '\u01dc': 'u',
      '\u01d8': 'u',
      '\u01d6': 'u',
      '\u01da': 'u',
      '\u1ee7': 'u',
      '\u016f': 'u',
      '\u0171': 'u',
      '\u01d4': 'u',
      '\u0215': 'u',
      '\u0217': 'u',
      '\u01b0': 'u',
      '\u1eeb': 'u',
      '\u1ee9': 'u',
      '\u1eef': 'u',
      '\u1eed': 'u',
      '\u1ef1': 'u',
      '\u1ee5': 'u',
      '\u1e73': 'u',
      '\u0173': 'u',
      '\u1e77': 'u',
      '\u1e75': 'u',
      '\u0289': 'u',
      '\u24e5': 'v',
      '\uff56': 'v',
      '\u1e7d': 'v',
      '\u1e7f': 'v',
      '\u028b': 'v',
      '\ua75f': 'v',
      '\u028c': 'v',
      '\ua761': 'vy',
      '\u24e6': 'w',
      '\uff57': 'w',
      '\u1e81': 'w',
      '\u1e83': 'w',
      '\u0175': 'w',
      '\u1e87': 'w',
      '\u1e85': 'w',
      '\u1e98': 'w',
      '\u1e89': 'w',
      '\u2c73': 'w',
      '\u24e7': 'x',
      '\uff58': 'x',
      '\u1e8b': 'x',
      '\u1e8d': 'x',
      '\u24e8': 'y',
      '\uff59': 'y',
      '\u1ef3': 'y',
      '\xfd': 'y',
      '\u0177': 'y',
      '\u1ef9': 'y',
      '\u0233': 'y',
      '\u1e8f': 'y',
      '\xff': 'y',
      '\u1ef7': 'y',
      '\u1e99': 'y',
      '\u1ef5': 'y',
      '\u01b4': 'y',
      '\u024f': 'y',
      '\u1eff': 'y',
      '\u24e9': 'z',
      '\uff5a': 'z',
      '\u017a': 'z',
      '\u1e91': 'z',
      '\u017c': 'z',
      '\u017e': 'z',
      '\u1e93': 'z',
      '\u1e95': 'z',
      '\u01b6': 'z',
      '\u0225': 'z',
      '\u0240': 'z',
      '\u2c6c': 'z',
      '\ua763': 'z'
    };
  $document = $(document);
  nextUid = function () {
    var counter = 1;
    return function () {
      return counter++;
    };
  }();
  function stripDiacritics(str) {
    var ret, i, l, c;
    if (!str || str.length < 1)
      return str;
    ret = '';
    for (i = 0, l = str.length; i < l; i++) {
      c = str.charAt(i);
      ret += DIACRITICS[c] || c;
    }
    return ret;
  }
  function indexOf(value, array) {
    var i = 0, l = array.length;
    for (; i < l; i = i + 1) {
      if (equal(value, array[i]))
        return i;
    }
    return -1;
  }
  function measureScrollbar() {
    var $template = $(MEASURE_SCROLLBAR_TEMPLATE);
    $template.appendTo('body');
    var dim = {
        width: $template.width() - $template[0].clientWidth,
        height: $template.height() - $template[0].clientHeight
      };
    $template.remove();
    return dim;
  }
  function equal(a, b) {
    if (a === b)
      return true;
    if (a === undefined || b === undefined)
      return false;
    if (a === null || b === null)
      return false;
    if (a.constructor === String)
      return a + '' === b + '';
    if (b.constructor === String)
      return b + '' === a + '';
    return false;
  }
  function splitVal(string, separator) {
    var val, i, l;
    if (string === null || string.length < 1)
      return [];
    val = string.split(separator);
    for (i = 0, l = val.length; i < l; i = i + 1)
      val[i] = $.trim(val[i]);
    return val;
  }
  function getSideBorderPadding(element) {
    return element.outerWidth(false) - element.width();
  }
  function installKeyUpChangeEvent(element) {
    var key = 'keyup-change-value';
    element.on('keydown', function () {
      if ($.data(element, key) === undefined) {
        $.data(element, key, element.val());
      }
    });
    element.on('keyup', function () {
      var val = $.data(element, key);
      if (val !== undefined && element.val() !== val) {
        $.removeData(element, key);
        element.trigger('keyup-change');
      }
    });
  }
  $document.on('mousemove', function (e) {
    lastMousePosition.x = e.pageX;
    lastMousePosition.y = e.pageY;
  });
  function installFilteredMouseMove(element) {
    element.on('mousemove', function (e) {
      var lastpos = lastMousePosition;
      if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {
        $(e.target).trigger('mousemove-filtered', e);
      }
    });
  }
  function debounce(quietMillis, fn, ctx) {
    ctx = ctx || undefined;
    var timeout;
    return function () {
      var args = arguments;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(function () {
        fn.apply(ctx, args);
      }, quietMillis);
    };
  }
  function thunk(formula) {
    var evaluated = false, value;
    return function () {
      if (evaluated === false) {
        value = formula();
        evaluated = true;
      }
      return value;
    };
  }
  ;
  function installDebouncedScroll(threshold, element) {
    var notify = debounce(threshold, function (e) {
        element.trigger('scroll-debounced', e);
      });
    element.on('scroll', function (e) {
      if (indexOf(e.target, element.get()) >= 0)
        notify(e);
    });
  }
  function focus($el) {
    if ($el[0] === document.activeElement)
      return;
    window.setTimeout(function () {
      var el = $el[0], pos = $el.val().length, range;
      $el.focus();
      if ($el.is(':visible') && el === document.activeElement) {
        if (el.setSelectionRange) {
          el.setSelectionRange(pos, pos);
        } else if (el.createTextRange) {
          range = el.createTextRange();
          range.collapse(false);
          range.select();
        }
      }
    }, 0);
  }
  function getCursorInfo(el) {
    el = $(el)[0];
    var offset = 0;
    var length = 0;
    if ('selectionStart' in el) {
      offset = el.selectionStart;
      length = el.selectionEnd - offset;
    } else if ('selection' in document) {
      el.focus();
      var sel = document.selection.createRange();
      length = document.selection.createRange().text.length;
      sel.moveStart('character', -el.value.length);
      offset = sel.text.length - length;
    }
    return {
      offset: offset,
      length: length
    };
  }
  function killEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function killEventImmediately(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  function measureTextWidth(e) {
    if (!sizer) {
      var style = e[0].currentStyle || window.getComputedStyle(e[0], null);
      sizer = $(document.createElement('div')).css({
        position: 'absolute',
        left: '-10000px',
        top: '-10000px',
        display: 'none',
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        fontStyle: style.fontStyle,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        textTransform: style.textTransform,
        whiteSpace: 'nowrap'
      });
      sizer.attr('class', 'select2-sizer');
      $('body').append(sizer);
    }
    sizer.text(e.val());
    return sizer.width();
  }
  function syncCssClasses(dest, src, adapter) {
    var classes, replacements = [], adapted;
    classes = dest.attr('class');
    if (classes) {
      classes = '' + classes;
      $(classes.split(' ')).each2(function () {
        if (this.indexOf('select2-') === 0) {
          replacements.push(this);
        }
      });
    }
    classes = src.attr('class');
    if (classes) {
      classes = '' + classes;
      $(classes.split(' ')).each2(function () {
        if (this.indexOf('select2-') !== 0) {
          adapted = adapter(this);
          if (adapted) {
            replacements.push(adapted);
          }
        }
      });
    }
    dest.attr('class', replacements.join(' '));
  }
  function markMatch(text, term, markup, escapeMarkup) {
    var match = stripDiacritics(text.toUpperCase()).indexOf(stripDiacritics(term.toUpperCase())), tl = term.length;
    if (match < 0) {
      markup.push(escapeMarkup(text));
      return;
    }
    markup.push(escapeMarkup(text.substring(0, match)));
    markup.push('<span class=\'select2-match\'>');
    markup.push(escapeMarkup(text.substring(match, match + tl)));
    markup.push('</span>');
    markup.push(escapeMarkup(text.substring(match + tl, text.length)));
  }
  function defaultEscapeMarkup(markup) {
    var replace_map = {
        '\\': '&#92;',
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#47;'
      };
    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replace_map[match];
    });
  }
  function ajax(options) {
    var timeout, handler = null, quietMillis = options.quietMillis || 100, ajaxUrl = options.url, self = this;
    return function (query) {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(function () {
        var data = options.data, url = ajaxUrl, transport = options.transport || $.fn.select2.ajaxDefaults.transport, deprecated = {
            type: options.type || 'GET',
            cache: options.cache || false,
            jsonpCallback: options.jsonpCallback || undefined,
            dataType: options.dataType || 'json'
          }, params = $.extend({}, $.fn.select2.ajaxDefaults.params, deprecated);
        data = data ? data.call(self, query.term, query.page, query.context) : null;
        url = typeof url === 'function' ? url.call(self, query.term, query.page, query.context) : url;
        if (handler) {
          handler.abort();
        }
        if (options.params) {
          if ($.isFunction(options.params)) {
            $.extend(params, options.params.call(self));
          } else {
            $.extend(params, options.params);
          }
        }
        $.extend(params, {
          url: url,
          dataType: options.dataType,
          data: data,
          success: function (data) {
            var results = options.results(data, query.page);
            query.callback(results);
          }
        });
        handler = transport.call(self, params);
      }, quietMillis);
    };
  }
  function local(options) {
    var data = options, dataText, tmp, text = function (item) {
        return '' + item.text;
      };
    if ($.isArray(data)) {
      tmp = data;
      data = { results: tmp };
    }
    if ($.isFunction(data) === false) {
      tmp = data;
      data = function () {
        return tmp;
      };
    }
    var dataItem = data();
    if (dataItem.text) {
      text = dataItem.text;
      if (!$.isFunction(text)) {
        dataText = dataItem.text;
        text = function (item) {
          return item[dataText];
        };
      }
    }
    return function (query) {
      var t = query.term, filtered = { results: [] }, process;
      if (t === '') {
        query.callback(data());
        return;
      }
      process = function (datum, collection) {
        var group, attr;
        datum = datum[0];
        if (datum.children) {
          group = {};
          for (attr in datum) {
            if (datum.hasOwnProperty(attr))
              group[attr] = datum[attr];
          }
          group.children = [];
          $(datum.children).each2(function (i, childDatum) {
            process(childDatum, group.children);
          });
          if (group.children.length || query.matcher(t, text(group), datum)) {
            collection.push(group);
          }
        } else {
          if (query.matcher(t, text(datum), datum)) {
            collection.push(datum);
          }
        }
      };
      $(data().results).each2(function (i, datum) {
        process(datum, filtered.results);
      });
      query.callback(filtered);
    };
  }
  function tags(data) {
    var isFunc = $.isFunction(data);
    return function (query) {
      var t = query.term, filtered = { results: [] };
      $(isFunc ? data() : data).each(function () {
        var isObject = this.text !== undefined, text = isObject ? this.text : this;
        if (t === '' || query.matcher(t, text)) {
          filtered.results.push(isObject ? this : {
            id: this,
            text: this
          });
        }
      });
      query.callback(filtered);
    };
  }
  function checkFormatter(formatter, formatterName) {
    if ($.isFunction(formatter))
      return true;
    if (!formatter)
      return false;
    throw new Error(formatterName + ' must be a function or a falsy value');
  }
  function evaluate(val) {
    return $.isFunction(val) ? val() : val;
  }
  function countResults(results) {
    var count = 0;
    $.each(results, function (i, item) {
      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    });
    return count;
  }
  function defaultTokenizer(input, selection, selectCallback, opts) {
    var original = input, dupe = false, token, index, i, l, separator;
    if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1)
      return undefined;
    while (true) {
      index = -1;
      for (i = 0, l = opts.tokenSeparators.length; i < l; i++) {
        separator = opts.tokenSeparators[i];
        index = input.indexOf(separator);
        if (index >= 0)
          break;
      }
      if (index < 0)
        break;
      token = input.substring(0, index);
      input = input.substring(index + separator.length);
      if (token.length > 0) {
        token = opts.createSearchChoice.call(this, token, selection);
        if (token !== undefined && token !== null && opts.id(token) !== undefined && opts.id(token) !== null) {
          dupe = false;
          for (i = 0, l = selection.length; i < l; i++) {
            if (equal(opts.id(token), opts.id(selection[i]))) {
              dupe = true;
              break;
            }
          }
          if (!dupe)
            selectCallback(token);
        }
      }
    }
    if (original !== input)
      return input;
  }
  function clazz(SuperClass, methods) {
    var constructor = function () {
    };
    constructor.prototype = new SuperClass();
    constructor.prototype.constructor = constructor;
    constructor.prototype.parent = SuperClass.prototype;
    constructor.prototype = $.extend(constructor.prototype, methods);
    return constructor;
  }
  AbstractSelect2 = clazz(Object, {
    bind: function (func) {
      var self = this;
      return function () {
        func.apply(self, arguments);
      };
    },
    init: function (opts) {
      var results, search, resultsSelector = '.select2-results';
      this.opts = opts = this.prepareOpts(opts);
      this.id = opts.id;
      if (opts.element.data('select2') !== undefined && opts.element.data('select2') !== null) {
        opts.element.data('select2').destroy();
      }
      this.container = this.createContainer();
      this.containerId = 's2id_' + (opts.element.attr('id') || 'autogen' + nextUid());
      this.containerSelector = '#' + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
      this.container.attr('id', this.containerId);
      this.body = thunk(function () {
        return opts.element.closest('body');
      });
      syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);
      this.container.attr('style', opts.element.attr('style'));
      this.container.css(evaluate(opts.containerCss));
      this.container.addClass(evaluate(opts.containerCssClass));
      this.elementTabIndex = this.opts.element.attr('tabindex');
      this.opts.element.data('select2', this).attr('tabindex', '-1').before(this.container).on('click.select2', killEvent);
      this.container.data('select2', this);
      this.dropdown = this.container.find('.select2-drop');
      syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);
      this.dropdown.addClass(evaluate(opts.dropdownCssClass));
      this.dropdown.data('select2', this);
      this.dropdown.on('click', killEvent);
      this.results = results = this.container.find(resultsSelector);
      this.search = search = this.container.find('input.select2-input');
      this.queryCount = 0;
      this.resultsPage = 0;
      this.context = null;
      this.initContainer();
      this.container.on('click', killEvent);
      installFilteredMouseMove(this.results);
      this.dropdown.on('mousemove-filtered touchstart touchmove touchend', resultsSelector, this.bind(this.highlightUnderEvent));
      installDebouncedScroll(80, this.results);
      this.dropdown.on('scroll-debounced', resultsSelector, this.bind(this.loadMoreIfNeeded));
      $(this.container).on('change', '.select2-input', function (e) {
        e.stopPropagation();
      });
      $(this.dropdown).on('change', '.select2-input', function (e) {
        e.stopPropagation();
      });
      if ($.fn.mousewheel) {
        results.mousewheel(function (e, delta, deltaX, deltaY) {
          var top = results.scrollTop();
          if (deltaY > 0 && top - deltaY <= 0) {
            results.scrollTop(0);
            killEvent(e);
          } else if (deltaY < 0 && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height()) {
            results.scrollTop(results.get(0).scrollHeight - results.height());
            killEvent(e);
          }
        });
      }
      installKeyUpChangeEvent(search);
      search.on('keyup-change input paste', this.bind(this.updateResults));
      search.on('focus', function () {
        search.addClass('select2-focused');
      });
      search.on('blur', function () {
        search.removeClass('select2-focused');
      });
      this.dropdown.on('mouseup', resultsSelector, this.bind(function (e) {
        if ($(e.target).closest('.select2-result-selectable').length > 0) {
          this.highlightUnderEvent(e);
          this.selectHighlighted(e);
        }
      }));
      this.dropdown.on('click mouseup mousedown', function (e) {
        e.stopPropagation();
      });
      if ($.isFunction(this.opts.initSelection)) {
        this.initSelection();
        this.monitorSource();
      }
      if (opts.maximumInputLength !== null) {
        this.search.attr('maxlength', opts.maximumInputLength);
      }
      var disabled = opts.element.prop('disabled');
      if (disabled === undefined)
        disabled = false;
      this.enable(!disabled);
      var readonly = opts.element.prop('readonly');
      if (readonly === undefined)
        readonly = false;
      this.readonly(readonly);
      scrollBarDimensions = scrollBarDimensions || measureScrollbar();
      this.autofocus = opts.element.prop('autofocus');
      opts.element.prop('autofocus', false);
      if (this.autofocus)
        this.focus();
      this.nextSearchTerm = undefined;
    },
    destroy: function () {
      var element = this.opts.element, select2 = element.data('select2');
      this.close();
      if (this.propertyObserver) {
        delete this.propertyObserver;
        this.propertyObserver = null;
      }
      if (select2 !== undefined) {
        select2.container.remove();
        select2.dropdown.remove();
        element.removeClass('select2-offscreen').removeData('select2').off('.select2').prop('autofocus', this.autofocus || false);
        if (this.elementTabIndex) {
          element.attr({ tabindex: this.elementTabIndex });
        } else {
          element.removeAttr('tabindex');
        }
        element.show();
      }
    },
    optionToData: function (element) {
      if (element.is('option')) {
        return {
          id: element.prop('value'),
          text: element.text(),
          element: element.get(),
          css: element.attr('class'),
          disabled: element.prop('disabled'),
          locked: equal(element.attr('locked'), 'locked') || equal(element.data('locked'), true)
        };
      } else if (element.is('optgroup')) {
        return {
          text: element.attr('label'),
          children: [],
          element: element.get(),
          css: element.attr('class')
        };
      }
    },
    prepareOpts: function (opts) {
      var element, select, idKey, ajaxUrl, self = this;
      element = opts.element;
      if (element.get(0).tagName.toLowerCase() === 'select') {
        this.select = select = opts.element;
      }
      if (select) {
        $.each([
          'id',
          'multiple',
          'ajax',
          'query',
          'createSearchChoice',
          'initSelection',
          'data',
          'tags'
        ], function () {
          if (this in opts) {
            throw new Error('Option \'' + this + '\' is not allowed for Select2 when attached to a <select> element.');
          }
        });
      }
      opts = $.extend({}, {
        populateResults: function (container, results, query) {
          var populate, id = this.opts.id;
          populate = function (results, container, depth) {
            var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;
            results = opts.sortResults(results, container, query);
            for (i = 0, l = results.length; i < l; i = i + 1) {
              result = results[i];
              disabled = result.disabled === true;
              selectable = !disabled && id(result) !== undefined;
              compound = result.children && result.children.length > 0;
              node = $('<li></li>');
              node.addClass('select2-results-dept-' + depth);
              node.addClass('select2-result');
              node.addClass(selectable ? 'select2-result-selectable' : 'select2-result-unselectable');
              if (disabled) {
                node.addClass('select2-disabled');
              }
              if (compound) {
                node.addClass('select2-result-with-children');
              }
              node.addClass(self.opts.formatResultCssClass(result));
              label = $(document.createElement('div'));
              label.addClass('select2-result-label');
              formatted = opts.formatResult(result, label, query, self.opts.escapeMarkup);
              if (formatted !== undefined) {
                label.html(formatted);
              }
              node.append(label);
              if (compound) {
                innerContainer = $('<ul></ul>');
                innerContainer.addClass('select2-result-sub');
                populate(result.children, innerContainer, depth + 1);
                node.append(innerContainer);
              }
              node.data('select2-data', result);
              container.append(node);
            }
          };
          populate(results, container, 0);
        }
      }, $.fn.select2.defaults, opts);
      if (typeof opts.id !== 'function') {
        idKey = opts.id;
        opts.id = function (e) {
          return e[idKey];
        };
      }
      if ($.isArray(opts.element.data('select2Tags'))) {
        if ('tags' in opts) {
          throw 'tags specified as both an attribute \'data-select2-tags\' and in options of Select2 ' + opts.element.attr('id');
        }
        opts.tags = opts.element.data('select2Tags');
      }
      if (select) {
        opts.query = this.bind(function (query) {
          var data = {
              results: [],
              more: false
            }, term = query.term, children, placeholderOption, process;
          process = function (element, collection) {
            var group;
            if (element.is('option')) {
              if (query.matcher(term, element.text(), element)) {
                collection.push(self.optionToData(element));
              }
            } else if (element.is('optgroup')) {
              group = self.optionToData(element);
              element.children().each2(function (i, elm) {
                process(elm, group.children);
              });
              if (group.children.length > 0) {
                collection.push(group);
              }
            }
          };
          children = element.children();
          if (this.getPlaceholder() !== undefined && children.length > 0) {
            placeholderOption = this.getPlaceholderOption();
            if (placeholderOption) {
              children = children.not(placeholderOption);
            }
          }
          children.each2(function (i, elm) {
            process(elm, data.results);
          });
          query.callback(data);
        });
        opts.id = function (e) {
          return e.id;
        };
        opts.formatResultCssClass = function (data) {
          return data.css;
        };
      } else {
        if (!('query' in opts)) {
          if ('ajax' in opts) {
            ajaxUrl = opts.element.data('ajax-url');
            if (ajaxUrl && ajaxUrl.length > 0) {
              opts.ajax.url = ajaxUrl;
            }
            opts.query = ajax.call(opts.element, opts.ajax);
          } else if ('data' in opts) {
            opts.query = local(opts.data);
          } else if ('tags' in opts) {
            opts.query = tags(opts.tags);
            if (opts.createSearchChoice === undefined) {
              opts.createSearchChoice = function (term) {
                return {
                  id: $.trim(term),
                  text: $.trim(term)
                };
              };
            }
            if (opts.initSelection === undefined) {
              opts.initSelection = function (element, callback) {
                var data = [];
                $(splitVal(element.val(), opts.separator)).each(function () {
                  var obj = {
                      id: this,
                      text: this
                    }, tags = opts.tags;
                  if ($.isFunction(tags))
                    tags = tags();
                  $(tags).each(function () {
                    if (equal(this.id, obj.id)) {
                      obj = this;
                      return false;
                    }
                  });
                  data.push(obj);
                });
                callback(data);
              };
            }
          }
        }
      }
      if (typeof opts.query !== 'function') {
        throw 'query function not defined for Select2 ' + opts.element.attr('id');
      }
      return opts;
    },
    monitorSource: function () {
      var el = this.opts.element, sync, observer;
      el.on('change.select2', this.bind(function (e) {
        if (this.opts.element.data('select2-change-triggered') !== true) {
          this.initSelection();
        }
      }));
      sync = this.bind(function () {
        var disabled = el.prop('disabled');
        if (disabled === undefined)
          disabled = false;
        this.enable(!disabled);
        var readonly = el.prop('readonly');
        if (readonly === undefined)
          readonly = false;
        this.readonly(readonly);
        syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);
        this.container.addClass(evaluate(this.opts.containerCssClass));
        syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);
        this.dropdown.addClass(evaluate(this.opts.dropdownCssClass));
      });
      el.on('propertychange.select2', sync);
      if (this.mutationCallback === undefined) {
        this.mutationCallback = function (mutations) {
          mutations.forEach(sync);
        };
      }
      observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      if (observer !== undefined) {
        if (this.propertyObserver) {
          delete this.propertyObserver;
          this.propertyObserver = null;
        }
        this.propertyObserver = new observer(this.mutationCallback);
        this.propertyObserver.observe(el.get(0), {
          attributes: true,
          subtree: false
        });
      }
    },
    triggerSelect: function (data) {
      var evt = $.Event('select2-selecting', {
          val: this.id(data),
          object: data
        });
      this.opts.element.trigger(evt);
      return !evt.isDefaultPrevented();
    },
    triggerChange: function (details) {
      details = details || {};
      details = $.extend({}, details, {
        type: 'change',
        val: this.val()
      });
      this.opts.element.data('select2-change-triggered', true);
      this.opts.element.trigger(details);
      this.opts.element.data('select2-change-triggered', false);
      this.opts.element.click();
      if (this.opts.blurOnChange)
        this.opts.element.blur();
    },
    isInterfaceEnabled: function () {
      return this.enabledInterface === true;
    },
    enableInterface: function () {
      var enabled = this._enabled && !this._readonly, disabled = !enabled;
      if (enabled === this.enabledInterface)
        return false;
      this.container.toggleClass('select2-container-disabled', disabled);
      this.close();
      this.enabledInterface = enabled;
      return true;
    },
    enable: function (enabled) {
      if (enabled === undefined)
        enabled = true;
      if (this._enabled === enabled)
        return;
      this._enabled = enabled;
      this.opts.element.prop('disabled', !enabled);
      this.enableInterface();
    },
    disable: function () {
      this.enable(false);
    },
    readonly: function (enabled) {
      if (enabled === undefined)
        enabled = false;
      if (this._readonly === enabled)
        return false;
      this._readonly = enabled;
      this.opts.element.prop('readonly', enabled);
      this.enableInterface();
      return true;
    },
    opened: function () {
      return this.container.hasClass('select2-dropdown-open');
    },
    positionDropdown: function () {
      var $dropdown = this.dropdown, offset = this.container.offset(), height = this.container.outerHeight(false), width = this.container.outerWidth(false), dropHeight = $dropdown.outerHeight(false), $window = $(window), windowWidth = $window.width(), windowHeight = $window.height(), viewPortRight = $window.scrollLeft() + windowWidth, viewportBottom = $window.scrollTop() + windowHeight, dropTop = offset.top + height, dropLeft = offset.left, enoughRoomBelow = dropTop + dropHeight <= viewportBottom, enoughRoomAbove = offset.top - dropHeight >= this.body().scrollTop(), dropWidth = $dropdown.outerWidth(false), enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight, aboveNow = $dropdown.hasClass('select2-drop-above'), bodyOffset, above, changeDirection, css, resultsListNode;
      if (aboveNow) {
        above = true;
        if (!enoughRoomAbove && enoughRoomBelow) {
          changeDirection = true;
          above = false;
        }
      } else {
        above = false;
        if (!enoughRoomBelow && enoughRoomAbove) {
          changeDirection = true;
          above = true;
        }
      }
      if (changeDirection) {
        $dropdown.hide();
        offset = this.container.offset();
        height = this.container.outerHeight(false);
        width = this.container.outerWidth(false);
        dropHeight = $dropdown.outerHeight(false);
        viewPortRight = $window.scrollLeft() + windowWidth;
        viewportBottom = $window.scrollTop() + windowHeight;
        dropTop = offset.top + height;
        dropLeft = offset.left;
        dropWidth = $dropdown.outerWidth(false);
        enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight;
        $dropdown.show();
      }
      if (this.opts.dropdownAutoWidth) {
        resultsListNode = $('.select2-results', $dropdown)[0];
        $dropdown.addClass('select2-drop-auto-width');
        $dropdown.css('width', '');
        dropWidth = $dropdown.outerWidth(false) + (resultsListNode.scrollHeight === resultsListNode.clientHeight ? 0 : scrollBarDimensions.width);
        dropWidth > width ? width = dropWidth : dropWidth = width;
        enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight;
      } else {
        this.container.removeClass('select2-drop-auto-width');
      }
      if (this.body().css('position') !== 'static') {
        bodyOffset = this.body().offset();
        dropTop -= bodyOffset.top;
        dropLeft -= bodyOffset.left;
      }
      if (!enoughRoomOnRight) {
        dropLeft = offset.left + width - dropWidth;
      }
      css = {
        left: dropLeft,
        width: width
      };
      if (above) {
        css.bottom = windowHeight - offset.top;
        css.top = 'auto';
        this.container.addClass('select2-drop-above');
        $dropdown.addClass('select2-drop-above');
      } else {
        css.top = dropTop;
        css.bottom = 'auto';
        this.container.removeClass('select2-drop-above');
        $dropdown.removeClass('select2-drop-above');
      }
      css = $.extend(css, evaluate(this.opts.dropdownCss));
      $dropdown.css(css);
    },
    shouldOpen: function () {
      var event;
      if (this.opened())
        return false;
      if (this._enabled === false || this._readonly === true)
        return false;
      event = $.Event('select2-opening');
      this.opts.element.trigger(event);
      return !event.isDefaultPrevented();
    },
    clearDropdownAlignmentPreference: function () {
      this.container.removeClass('select2-drop-above');
      this.dropdown.removeClass('select2-drop-above');
    },
    open: function () {
      if (!this.shouldOpen())
        return false;
      this.opening();
      return true;
    },
    opening: function () {
      var cid = this.containerId, scroll = 'scroll.' + cid, resize = 'resize.' + cid, orient = 'orientationchange.' + cid, mask;
      this.container.addClass('select2-dropdown-open').addClass('select2-container-active');
      this.clearDropdownAlignmentPreference();
      if (this.dropdown[0] !== this.body().children().last()[0]) {
        this.dropdown.detach().appendTo(this.body());
      }
      mask = $('#select2-drop-mask');
      if (mask.length == 0) {
        mask = $(document.createElement('div'));
        mask.attr('id', 'select2-drop-mask').attr('class', 'select2-drop-mask');
        mask.hide();
        mask.appendTo(this.body());
        mask.on('mousedown touchstart click', function (e) {
          var dropdown = $('#select2-drop'), self;
          if (dropdown.length > 0) {
            self = dropdown.data('select2');
            if (self.opts.selectOnBlur) {
              self.selectHighlighted({ noFocus: true });
            }
            self.close({ focus: true });
            e.preventDefault();
            e.stopPropagation();
          }
        });
      }
      if (this.dropdown.prev()[0] !== mask[0]) {
        this.dropdown.before(mask);
      }
      $('#select2-drop').removeAttr('id');
      this.dropdown.attr('id', 'select2-drop');
      mask.show();
      this.positionDropdown();
      this.dropdown.show();
      this.positionDropdown();
      this.dropdown.addClass('select2-drop-active');
      var that = this;
      this.container.parents().add(window).each(function () {
        $(this).on(resize + ' ' + scroll + ' ' + orient, function (e) {
          that.positionDropdown();
        });
      });
    },
    close: function () {
      if (!this.opened())
        return;
      var cid = this.containerId, scroll = 'scroll.' + cid, resize = 'resize.' + cid, orient = 'orientationchange.' + cid;
      this.container.parents().add(window).each(function () {
        $(this).off(scroll).off(resize).off(orient);
      });
      this.clearDropdownAlignmentPreference();
      $('#select2-drop-mask').hide();
      this.dropdown.removeAttr('id');
      this.dropdown.hide();
      this.container.removeClass('select2-dropdown-open').removeClass('select2-container-active');
      this.results.empty();
      this.clearSearch();
      this.search.removeClass('select2-active');
      this.opts.element.trigger($.Event('select2-close'));
    },
    externalSearch: function (term) {
      this.open();
      this.search.val(term);
      this.updateResults(false);
    },
    clearSearch: function () {
    },
    getMaximumSelectionSize: function () {
      return evaluate(this.opts.maximumSelectionSize);
    },
    ensureHighlightVisible: function () {
      var results = this.results, children, index, child, hb, rb, y, more;
      index = this.highlight();
      if (index < 0)
        return;
      if (index == 0) {
        results.scrollTop(0);
        return;
      }
      children = this.findHighlightableChoices().find('.select2-result-label');
      child = $(children[index]);
      hb = child.offset().top + child.outerHeight(true);
      if (index === children.length - 1) {
        more = results.find('li.select2-more-results');
        if (more.length > 0) {
          hb = more.offset().top + more.outerHeight(true);
        }
      }
      rb = results.offset().top + results.outerHeight(true);
      if (hb > rb) {
        results.scrollTop(results.scrollTop() + (hb - rb));
      }
      y = child.offset().top - results.offset().top;
      if (y < 0 && child.css('display') != 'none') {
        results.scrollTop(results.scrollTop() + y);
      }
    },
    findHighlightableChoices: function () {
      return this.results.find('.select2-result-selectable:not(.select2-disabled, .select2-selected)');
    },
    moveHighlight: function (delta) {
      var choices = this.findHighlightableChoices(), index = this.highlight();
      while (index > -1 && index < choices.length) {
        index += delta;
        var choice = $(choices[index]);
        if (choice.hasClass('select2-result-selectable') && !choice.hasClass('select2-disabled') && !choice.hasClass('select2-selected')) {
          this.highlight(index);
          break;
        }
      }
    },
    highlight: function (index) {
      var choices = this.findHighlightableChoices(), choice, data;
      if (arguments.length === 0) {
        return indexOf(choices.filter('.select2-highlighted')[0], choices.get());
      }
      if (index >= choices.length)
        index = choices.length - 1;
      if (index < 0)
        index = 0;
      this.removeHighlight();
      choice = $(choices[index]);
      choice.addClass('select2-highlighted');
      this.ensureHighlightVisible();
      data = choice.data('select2-data');
      if (data) {
        this.opts.element.trigger({
          type: 'select2-highlight',
          val: this.id(data),
          choice: data
        });
      }
    },
    removeHighlight: function () {
      this.results.find('.select2-highlighted').removeClass('select2-highlighted');
    },
    countSelectableResults: function () {
      return this.findHighlightableChoices().length;
    },
    highlightUnderEvent: function (event) {
      var el = $(event.target).closest('.select2-result-selectable');
      if (el.length > 0 && !el.is('.select2-highlighted')) {
        var choices = this.findHighlightableChoices();
        this.highlight(choices.index(el));
      } else if (el.length == 0) {
        this.removeHighlight();
      }
    },
    loadMoreIfNeeded: function () {
      var results = this.results, more = results.find('li.select2-more-results'), below, page = this.resultsPage + 1, self = this, term = this.search.val(), context = this.context;
      if (more.length === 0)
        return;
      below = more.offset().top - results.offset().top - results.height();
      if (below <= this.opts.loadMorePadding) {
        more.addClass('select2-active');
        this.opts.query({
          element: this.opts.element,
          term: term,
          page: page,
          context: context,
          matcher: this.opts.matcher,
          callback: this.bind(function (data) {
            if (!self.opened())
              return;
            self.opts.populateResults.call(this, results, data.results, {
              term: term,
              page: page,
              context: context
            });
            self.postprocessResults(data, false, false);
            if (data.more === true) {
              more.detach().appendTo(results).text(self.opts.formatLoadMore(page + 1));
              window.setTimeout(function () {
                self.loadMoreIfNeeded();
              }, 10);
            } else {
              more.remove();
            }
            self.positionDropdown();
            self.resultsPage = page;
            self.context = data.context;
            this.opts.element.trigger({
              type: 'select2-loaded',
              items: data
            });
          })
        });
      }
    },
    tokenize: function () {
    },
    updateResults: function (initial) {
      var search = this.search, results = this.results, opts = this.opts, data, self = this, input, term = search.val(), lastTerm = $.data(this.container, 'select2-last-term'), queryNumber;
      if (initial !== true && lastTerm && equal(term, lastTerm))
        return;
      $.data(this.container, 'select2-last-term', term);
      if (initial !== true && (this.showSearchInput === false || !this.opened())) {
        return;
      }
      function postRender() {
        search.removeClass('select2-active');
        self.positionDropdown();
      }
      function render(html) {
        results.html(html);
        postRender();
      }
      queryNumber = ++this.queryCount;
      var maxSelSize = this.getMaximumSelectionSize();
      if (maxSelSize >= 1) {
        data = this.data();
        if ($.isArray(data) && data.length >= maxSelSize && checkFormatter(opts.formatSelectionTooBig, 'formatSelectionTooBig')) {
          render('<li class=\'select2-selection-limit\'>' + opts.formatSelectionTooBig(maxSelSize) + '</li>');
          return;
        }
      }
      if (search.val().length < opts.minimumInputLength) {
        if (checkFormatter(opts.formatInputTooShort, 'formatInputTooShort')) {
          render('<li class=\'select2-no-results\'>' + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + '</li>');
        } else {
          render('');
        }
        if (initial && this.showSearch)
          this.showSearch(true);
        return;
      }
      if (opts.maximumInputLength && search.val().length > opts.maximumInputLength) {
        if (checkFormatter(opts.formatInputTooLong, 'formatInputTooLong')) {
          render('<li class=\'select2-no-results\'>' + opts.formatInputTooLong(search.val(), opts.maximumInputLength) + '</li>');
        } else {
          render('');
        }
        return;
      }
      if (opts.formatSearching && this.findHighlightableChoices().length === 0) {
        render('<li class=\'select2-searching\'>' + opts.formatSearching() + '</li>');
      }
      search.addClass('select2-active');
      this.removeHighlight();
      input = this.tokenize();
      if (input != undefined && input != null) {
        search.val(input);
      }
      this.resultsPage = 1;
      opts.query({
        element: opts.element,
        term: search.val(),
        page: this.resultsPage,
        context: null,
        matcher: opts.matcher,
        callback: this.bind(function (data) {
          var def;
          if (queryNumber != this.queryCount) {
            return;
          }
          if (!this.opened()) {
            this.search.removeClass('select2-active');
            return;
          }
          this.context = data.context === undefined ? null : data.context;
          if (this.opts.createSearchChoice && search.val() !== '') {
            def = this.opts.createSearchChoice.call(self, search.val(), data.results);
            if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {
              if ($(data.results).filter(function () {
                  return equal(self.id(this), self.id(def));
                }).length === 0) {
                data.results.unshift(def);
              }
            }
          }
          if (data.results.length === 0 && checkFormatter(opts.formatNoMatches, 'formatNoMatches')) {
            render('<li class=\'select2-no-results\'>' + opts.formatNoMatches(search.val()) + '</li>');
            return;
          }
          results.empty();
          self.opts.populateResults.call(this, results, data.results, {
            term: search.val(),
            page: this.resultsPage,
            context: null
          });
          if (data.more === true && checkFormatter(opts.formatLoadMore, 'formatLoadMore')) {
            results.append('<li class=\'select2-more-results\'>' + self.opts.escapeMarkup(opts.formatLoadMore(this.resultsPage)) + '</li>');
            window.setTimeout(function () {
              self.loadMoreIfNeeded();
            }, 10);
          }
          this.postprocessResults(data, initial);
          postRender();
          this.opts.element.trigger({
            type: 'select2-loaded',
            items: data
          });
        })
      });
    },
    cancel: function () {
      this.close();
    },
    blur: function () {
      if (this.opts.selectOnBlur)
        this.selectHighlighted({ noFocus: true });
      this.close();
      this.container.removeClass('select2-container-active');
      if (this.search[0] === document.activeElement) {
        this.search.blur();
      }
      this.clearSearch();
      this.selection.find('.select2-search-choice-focus').removeClass('select2-search-choice-focus');
    },
    focusSearch: function () {
      focus(this.search);
    },
    selectHighlighted: function (options) {
      var index = this.highlight(), highlighted = this.results.find('.select2-highlighted'), data = highlighted.closest('.select2-result').data('select2-data');
      if (data) {
        this.highlight(index);
        this.onSelect(data, options);
      } else if (options && options.noFocus) {
        this.close();
      }
    },
    getPlaceholder: function () {
      var placeholderOption;
      return this.opts.element.attr('placeholder') || this.opts.element.attr('data-placeholder') || this.opts.element.data('placeholder') || this.opts.placeholder || ((placeholderOption = this.getPlaceholderOption()) !== undefined ? placeholderOption.text() : undefined);
    },
    getPlaceholderOption: function () {
      if (this.select) {
        var firstOption = this.select.children('option').first();
        if (this.opts.placeholderOption !== undefined) {
          return this.opts.placeholderOption === 'first' && firstOption || typeof this.opts.placeholderOption === 'function' && this.opts.placeholderOption(this.select);
        } else if (firstOption.text() === '' && firstOption.val() === '') {
          return firstOption;
        }
      }
    },
    initContainerWidth: function () {
      function resolveContainerWidth() {
        var style, attrs, matches, i, l, attr;
        if (this.opts.width === 'off') {
          return null;
        } else if (this.opts.width === 'element') {
          return this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px';
        } else if (this.opts.width === 'copy' || this.opts.width === 'resolve') {
          style = this.opts.element.attr('style');
          if (style !== undefined) {
            attrs = style.split(';');
            for (i = 0, l = attrs.length; i < l; i = i + 1) {
              attr = attrs[i].replace(/\s/g, '');
              matches = attr.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);
              if (matches !== null && matches.length >= 1)
                return matches[1];
            }
          }
          if (this.opts.width === 'resolve') {
            style = this.opts.element.css('width');
            if (style.indexOf('%') > 0)
              return style;
            return this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px';
          }
          return null;
        } else if ($.isFunction(this.opts.width)) {
          return this.opts.width();
        } else {
          return this.opts.width;
        }
      }
      ;
      var width = resolveContainerWidth.call(this);
      if (width !== null) {
        this.container.css('width', width);
      }
    }
  });
  SingleSelect2 = clazz(AbstractSelect2, {
    createContainer: function () {
      var container = $(document.createElement('div')).attr({ 'class': 'select2-container' }).html([
          '<a href=\'javascript:void(0)\' onclick=\'return false;\' class=\'select2-choice\' tabindex=\'-1\'>',
          '   <span class=\'select2-chosen\'>&nbsp;</span><abbr class=\'select2-search-choice-close\'></abbr>',
          '   <span class=\'select2-arrow\'><b></b></span>',
          '</a>',
          '<input class=\'select2-focusser select2-offscreen\' type=\'text\'/>',
          '<div class=\'select2-drop select2-display-none\'>',
          '   <div class=\'select2-search\'>',
          '       <input type=\'text\' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\' class=\'select2-input\'/>',
          '   </div>',
          '   <ul class=\'select2-results\'>',
          '   </ul>',
          '</div>'
        ].join(''));
      return container;
    },
    enableInterface: function () {
      if (this.parent.enableInterface.apply(this, arguments)) {
        this.focusser.prop('disabled', !this.isInterfaceEnabled());
      }
    },
    opening: function () {
      var el, range, len;
      if (this.opts.minimumResultsForSearch >= 0) {
        this.showSearch(true);
      }
      this.parent.opening.apply(this, arguments);
      if (this.showSearchInput !== false) {
        this.search.val(this.focusser.val());
      }
      this.search.focus();
      el = this.search.get(0);
      if (el.createTextRange) {
        range = el.createTextRange();
        range.collapse(false);
        range.select();
      } else if (el.setSelectionRange) {
        len = this.search.val().length;
        el.setSelectionRange(len, len);
      }
      if (this.search.val() === '') {
        if (this.nextSearchTerm != undefined) {
          this.search.val(this.nextSearchTerm);
          this.search.select();
        }
      }
      this.focusser.prop('disabled', true).val('');
      this.updateResults(true);
      this.opts.element.trigger($.Event('select2-open'));
    },
    close: function (params) {
      if (!this.opened())
        return;
      this.parent.close.apply(this, arguments);
      params = params || { focus: true };
      this.focusser.removeAttr('disabled');
      if (params.focus) {
        this.focusser.focus();
      }
    },
    focus: function () {
      if (this.opened()) {
        this.close();
      } else {
        this.focusser.removeAttr('disabled');
        this.focusser.focus();
      }
    },
    isFocused: function () {
      return this.container.hasClass('select2-container-active');
    },
    cancel: function () {
      this.parent.cancel.apply(this, arguments);
      this.focusser.removeAttr('disabled');
      this.focusser.focus();
    },
    destroy: function () {
      $('label[for=\'' + this.focusser.attr('id') + '\']').attr('for', this.opts.element.attr('id'));
      this.parent.destroy.apply(this, arguments);
    },
    initContainer: function () {
      var selection, container = this.container, dropdown = this.dropdown;
      if (this.opts.minimumResultsForSearch < 0) {
        this.showSearch(false);
      } else {
        this.showSearch(true);
      }
      this.selection = selection = container.find('.select2-choice');
      this.focusser = container.find('.select2-focusser');
      this.focusser.attr('id', 's2id_autogen' + nextUid());
      $('label[for=\'' + this.opts.element.attr('id') + '\']').attr('for', this.focusser.attr('id'));
      this.focusser.attr('tabindex', this.elementTabIndex);
      this.search.on('keydown', this.bind(function (e) {
        if (!this.isInterfaceEnabled())
          return;
        if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
          killEvent(e);
          return;
        }
        switch (e.which) {
        case KEY.UP:
        case KEY.DOWN:
          this.moveHighlight(e.which === KEY.UP ? -1 : 1);
          killEvent(e);
          return;
        case KEY.ENTER:
          this.selectHighlighted();
          killEvent(e);
          return;
        case KEY.TAB:
          this.selectHighlighted({ noFocus: true });
          return;
        case KEY.ESC:
          this.cancel(e);
          killEvent(e);
          return;
        }
      }));
      this.search.on('blur', this.bind(function (e) {
        if (document.activeElement === this.body().get(0)) {
          window.setTimeout(this.bind(function () {
            this.search.focus();
          }), 0);
        }
      }));
      this.focusser.on('keydown', this.bind(function (e) {
        if (!this.isInterfaceEnabled())
          return;
        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
          return;
        }
        if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {
          killEvent(e);
          return;
        }
        if (e.which == KEY.DOWN || e.which == KEY.UP || e.which == KEY.ENTER && this.opts.openOnEnter) {
          if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)
            return;
          this.open();
          killEvent(e);
          return;
        }
        if (e.which == KEY.DELETE || e.which == KEY.BACKSPACE) {
          if (this.opts.allowClear) {
            this.clear();
          }
          killEvent(e);
          return;
        }
      }));
      installKeyUpChangeEvent(this.focusser);
      this.focusser.on('keyup-change input', this.bind(function (e) {
        if (this.opts.minimumResultsForSearch >= 0) {
          e.stopPropagation();
          if (this.opened())
            return;
          this.open();
        }
      }));
      selection.on('mousedown', 'abbr', this.bind(function (e) {
        if (!this.isInterfaceEnabled())
          return;
        this.clear();
        killEventImmediately(e);
        this.close();
        this.selection.focus();
      }));
      selection.on('mousedown', this.bind(function (e) {
        if (!this.container.hasClass('select2-container-active')) {
          this.opts.element.trigger($.Event('select2-focus'));
        }
        if (this.opened()) {
          this.close();
        } else if (this.isInterfaceEnabled()) {
          this.open();
        }
        killEvent(e);
      }));
      dropdown.on('mousedown', this.bind(function () {
        this.search.focus();
      }));
      selection.on('focus', this.bind(function (e) {
        killEvent(e);
      }));
      this.focusser.on('focus', this.bind(function () {
        if (!this.container.hasClass('select2-container-active')) {
          this.opts.element.trigger($.Event('select2-focus'));
        }
        this.container.addClass('select2-container-active');
      })).on('blur', this.bind(function () {
        if (!this.opened()) {
          this.container.removeClass('select2-container-active');
          this.opts.element.trigger($.Event('select2-blur'));
        }
      }));
      this.search.on('focus', this.bind(function () {
        if (!this.container.hasClass('select2-container-active')) {
          this.opts.element.trigger($.Event('select2-focus'));
        }
        this.container.addClass('select2-container-active');
      }));
      this.initContainerWidth();
      this.opts.element.addClass('select2-offscreen');
      this.setPlaceholder();
    },
    clear: function (triggerChange) {
      var data = this.selection.data('select2-data');
      if (data) {
        var evt = $.Event('select2-clearing');
        this.opts.element.trigger(evt);
        if (evt.isDefaultPrevented()) {
          return;
        }
        var placeholderOption = this.getPlaceholderOption();
        this.opts.element.val(placeholderOption ? placeholderOption.val() : '');
        this.selection.find('.select2-chosen').empty();
        this.selection.removeData('select2-data');
        this.setPlaceholder();
        if (triggerChange !== false) {
          this.opts.element.trigger({
            type: 'select2-removed',
            val: this.id(data),
            choice: data
          });
          this.triggerChange({ removed: data });
        }
      }
    },
    initSelection: function () {
      var selected;
      if (this.isPlaceholderOptionSelected()) {
        this.updateSelection(null);
        this.close();
        this.setPlaceholder();
      } else {
        var self = this;
        this.opts.initSelection.call(null, this.opts.element, function (selected) {
          if (selected !== undefined && selected !== null) {
            self.updateSelection(selected);
            self.close();
            self.setPlaceholder();
          }
        });
      }
    },
    isPlaceholderOptionSelected: function () {
      var placeholderOption;
      if (!this.getPlaceholder())
        return false;
      return (placeholderOption = this.getPlaceholderOption()) !== undefined && placeholderOption.prop('selected') || this.opts.element.val() === '' || this.opts.element.val() === undefined || this.opts.element.val() === null;
    },
    prepareOpts: function () {
      var opts = this.parent.prepareOpts.apply(this, arguments), self = this;
      if (opts.element.get(0).tagName.toLowerCase() === 'select') {
        opts.initSelection = function (element, callback) {
          var selected = element.find('option').filter(function () {
              return this.selected;
            });
          callback(self.optionToData(selected));
        };
      } else if ('data' in opts) {
        opts.initSelection = opts.initSelection || function (element, callback) {
          var id = element.val();
          var match = null;
          opts.query({
            matcher: function (term, text, el) {
              var is_match = equal(id, opts.id(el));
              if (is_match) {
                match = el;
              }
              return is_match;
            },
            callback: !$.isFunction(callback) ? $.noop : function () {
              callback(match);
            }
          });
        };
      }
      return opts;
    },
    getPlaceholder: function () {
      if (this.select) {
        if (this.getPlaceholderOption() === undefined) {
          return undefined;
        }
      }
      return this.parent.getPlaceholder.apply(this, arguments);
    },
    setPlaceholder: function () {
      var placeholder = this.getPlaceholder();
      if (this.isPlaceholderOptionSelected() && placeholder !== undefined) {
        if (this.select && this.getPlaceholderOption() === undefined)
          return;
        this.selection.find('.select2-chosen').html(this.opts.escapeMarkup(placeholder));
        this.selection.addClass('select2-default');
        this.container.removeClass('select2-allowclear');
      }
    },
    postprocessResults: function (data, initial, noHighlightUpdate) {
      var selected = 0, self = this, showSearchInput = true;
      this.findHighlightableChoices().each2(function (i, elm) {
        if (equal(self.id(elm.data('select2-data')), self.opts.element.val())) {
          selected = i;
          return false;
        }
      });
      if (noHighlightUpdate !== false) {
        if (initial === true && selected >= 0) {
          this.highlight(selected);
        } else {
          this.highlight(0);
        }
      }
      if (initial === true) {
        var min = this.opts.minimumResultsForSearch;
        if (min >= 0) {
          this.showSearch(countResults(data.results) >= min);
        }
      }
    },
    showSearch: function (showSearchInput) {
      if (this.showSearchInput === showSearchInput)
        return;
      this.showSearchInput = showSearchInput;
      this.dropdown.find('.select2-search').toggleClass('select2-search-hidden', !showSearchInput);
      this.dropdown.find('.select2-search').toggleClass('select2-offscreen', !showSearchInput);
      $(this.dropdown, this.container).toggleClass('select2-with-searchbox', showSearchInput);
    },
    onSelect: function (data, options) {
      if (!this.triggerSelect(data)) {
        return;
      }
      var old = this.opts.element.val(), oldData = this.data();
      this.opts.element.val(this.id(data));
      this.updateSelection(data);
      this.opts.element.trigger({
        type: 'select2-selected',
        val: this.id(data),
        choice: data
      });
      this.nextSearchTerm = this.opts.nextSearchTerm(data, this.search.val());
      this.close();
      if (!options || !options.noFocus)
        this.focusser.focus();
      if (!equal(old, this.id(data))) {
        this.triggerChange({
          added: data,
          removed: oldData
        });
      }
    },
    updateSelection: function (data) {
      var container = this.selection.find('.select2-chosen'), formatted, cssClass;
      this.selection.data('select2-data', data);
      container.empty();
      if (data !== null) {
        formatted = this.opts.formatSelection(data, container, this.opts.escapeMarkup);
      }
      if (formatted !== undefined) {
        container.append(formatted);
      }
      cssClass = this.opts.formatSelectionCssClass(data, container);
      if (cssClass !== undefined) {
        container.addClass(cssClass);
      }
      this.selection.removeClass('select2-default');
      if (this.opts.allowClear && this.getPlaceholder() !== undefined) {
        this.container.addClass('select2-allowclear');
      }
    },
    val: function () {
      var val, triggerChange = false, data = null, self = this, oldData = this.data();
      if (arguments.length === 0) {
        return this.opts.element.val();
      }
      val = arguments[0];
      if (arguments.length > 1) {
        triggerChange = arguments[1];
      }
      if (this.select) {
        this.select.val(val).find('option').filter(function () {
          return this.selected;
        }).each2(function (i, elm) {
          data = self.optionToData(elm);
          return false;
        });
        this.updateSelection(data);
        this.setPlaceholder();
        if (triggerChange) {
          this.triggerChange({
            added: data,
            removed: oldData
          });
        }
      } else {
        if (!val && val !== 0) {
          this.clear(triggerChange);
          return;
        }
        if (this.opts.initSelection === undefined) {
          throw new Error('cannot call val() if initSelection() is not defined');
        }
        this.opts.element.val(val);
        this.opts.initSelection(this.opts.element, function (data) {
          self.opts.element.val(!data ? '' : self.id(data));
          self.updateSelection(data);
          self.setPlaceholder();
          if (triggerChange) {
            self.triggerChange({
              added: data,
              removed: oldData
            });
          }
        });
      }
    },
    clearSearch: function () {
      this.search.val('');
      this.focusser.val('');
    },
    data: function (value) {
      var data, triggerChange = false;
      if (arguments.length === 0) {
        data = this.selection.data('select2-data');
        if (data == undefined)
          data = null;
        return data;
      } else {
        if (arguments.length > 1) {
          triggerChange = arguments[1];
        }
        if (!value) {
          this.clear(triggerChange);
        } else {
          data = this.data();
          this.opts.element.val(!value ? '' : this.id(value));
          this.updateSelection(value);
          if (triggerChange) {
            this.triggerChange({
              added: value,
              removed: data
            });
          }
        }
      }
    }
  });
  MultiSelect2 = clazz(AbstractSelect2, {
    createContainer: function () {
      var container = $(document.createElement('div')).attr({ 'class': 'select2-container select2-container-multi' }).html([
          '<ul class=\'select2-choices\'>',
          '  <li class=\'select2-search-field\'>',
          '    <input type=\'text\' autocomplete=\'off\' autocorrect=\'off\' autocapitalize=\'off\' spellcheck=\'false\' class=\'select2-input\'>',
          '  </li>',
          '</ul>',
          '<div class=\'select2-drop select2-drop-multi select2-display-none\'>',
          '   <ul class=\'select2-results\'>',
          '   </ul>',
          '</div>'
        ].join(''));
      return container;
    },
    prepareOpts: function () {
      var opts = this.parent.prepareOpts.apply(this, arguments), self = this;
      if (opts.element.get(0).tagName.toLowerCase() === 'select') {
        opts.initSelection = function (element, callback) {
          var data = [];
          element.find('option').filter(function () {
            return this.selected;
          }).each2(function (i, elm) {
            data.push(self.optionToData(elm));
          });
          callback(data);
        };
      } else if ('data' in opts) {
        opts.initSelection = opts.initSelection || function (element, callback) {
          var ids = splitVal(element.val(), opts.separator);
          var matches = [];
          opts.query({
            matcher: function (term, text, el) {
              var is_match = $.grep(ids, function (id) {
                  return equal(id, opts.id(el));
                }).length;
              if (is_match) {
                matches.push(el);
              }
              return is_match;
            },
            callback: !$.isFunction(callback) ? $.noop : function () {
              var ordered = [];
              for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                for (var j = 0; j < matches.length; j++) {
                  var match = matches[j];
                  if (equal(id, opts.id(match))) {
                    ordered.push(match);
                    matches.splice(j, 1);
                    break;
                  }
                }
              }
              callback(ordered);
            }
          });
        };
      }
      return opts;
    },
    selectChoice: function (choice) {
      var selected = this.container.find('.select2-search-choice-focus');
      if (selected.length && choice && choice[0] == selected[0]) {
      } else {
        if (selected.length) {
          this.opts.element.trigger('choice-deselected', selected);
        }
        selected.removeClass('select2-search-choice-focus');
        if (choice && choice.length) {
          this.close();
          choice.addClass('select2-search-choice-focus');
          this.opts.element.trigger('choice-selected', choice);
        }
      }
    },
    destroy: function () {
      $('label[for=\'' + this.search.attr('id') + '\']').attr('for', this.opts.element.attr('id'));
      this.parent.destroy.apply(this, arguments);
    },
    initContainer: function () {
      var selector = '.select2-choices', selection;
      this.searchContainer = this.container.find('.select2-search-field');
      this.selection = selection = this.container.find(selector);
      var _this = this;
      this.selection.on('click', '.select2-search-choice:not(.select2-locked)', function (e) {
        _this.search[0].focus();
        _this.selectChoice($(this));
      });
      this.search.attr('id', 's2id_autogen' + nextUid());
      $('label[for=\'' + this.opts.element.attr('id') + '\']').attr('for', this.search.attr('id'));
      this.search.on('input paste', this.bind(function () {
        if (!this.isInterfaceEnabled())
          return;
        if (!this.opened()) {
          this.open();
        }
      }));
      this.search.attr('tabindex', this.elementTabIndex);
      this.keydowns = 0;
      this.search.on('keydown', this.bind(function (e) {
        if (!this.isInterfaceEnabled())
          return;
        ++this.keydowns;
        var selected = selection.find('.select2-search-choice-focus');
        var prev = selected.prev('.select2-search-choice:not(.select2-locked)');
        var next = selected.next('.select2-search-choice:not(.select2-locked)');
        var pos = getCursorInfo(this.search);
        if (selected.length && (e.which == KEY.LEFT || e.which == KEY.RIGHT || e.which == KEY.BACKSPACE || e.which == KEY.DELETE || e.which == KEY.ENTER)) {
          var selectedChoice = selected;
          if (e.which == KEY.LEFT && prev.length) {
            selectedChoice = prev;
          } else if (e.which == KEY.RIGHT) {
            selectedChoice = next.length ? next : null;
          } else if (e.which === KEY.BACKSPACE) {
            this.unselect(selected.first());
            this.search.width(10);
            selectedChoice = prev.length ? prev : next;
          } else if (e.which == KEY.DELETE) {
            this.unselect(selected.first());
            this.search.width(10);
            selectedChoice = next.length ? next : null;
          } else if (e.which == KEY.ENTER) {
            selectedChoice = null;
          }
          this.selectChoice(selectedChoice);
          killEvent(e);
          if (!selectedChoice || !selectedChoice.length) {
            this.open();
          }
          return;
        } else if ((e.which === KEY.BACKSPACE && this.keydowns == 1 || e.which == KEY.LEFT) && (pos.offset == 0 && !pos.length)) {
          this.selectChoice(selection.find('.select2-search-choice:not(.select2-locked)').last());
          killEvent(e);
          return;
        } else {
          this.selectChoice(null);
        }
        if (this.opened()) {
          switch (e.which) {
          case KEY.UP:
          case KEY.DOWN:
            this.moveHighlight(e.which === KEY.UP ? -1 : 1);
            killEvent(e);
            return;
          case KEY.ENTER:
            this.selectHighlighted();
            killEvent(e);
            return;
          case KEY.TAB:
            this.selectHighlighted({ noFocus: true });
            this.close();
            return;
          case KEY.ESC:
            this.cancel(e);
            killEvent(e);
            return;
          }
        }
        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.BACKSPACE || e.which === KEY.ESC) {
          return;
        }
        if (e.which === KEY.ENTER) {
          if (this.opts.openOnEnter === false) {
            return;
          } else if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
            return;
          }
        }
        this.open();
        if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
          killEvent(e);
        }
        if (e.which === KEY.ENTER) {
          killEvent(e);
        }
      }));
      this.search.on('keyup', this.bind(function (e) {
        this.keydowns = 0;
        this.resizeSearch();
      }));
      this.search.on('blur', this.bind(function (e) {
        this.container.removeClass('select2-container-active');
        this.search.removeClass('select2-focused');
        this.selectChoice(null);
        if (!this.opened())
          this.clearSearch();
        e.stopImmediatePropagation();
        this.opts.element.trigger($.Event('select2-blur'));
      }));
      this.container.on('click', selector, this.bind(function (e) {
        if (!this.isInterfaceEnabled())
          return;
        if ($(e.target).closest('.select2-search-choice').length > 0) {
          return;
        }
        this.selectChoice(null);
        this.clearPlaceholder();
        if (!this.container.hasClass('select2-container-active')) {
          this.opts.element.trigger($.Event('select2-focus'));
        }
        this.open();
        this.focusSearch();
        e.preventDefault();
      }));
      this.container.on('focus', selector, this.bind(function () {
        if (!this.isInterfaceEnabled())
          return;
        if (!this.container.hasClass('select2-container-active')) {
          this.opts.element.trigger($.Event('select2-focus'));
        }
        this.container.addClass('select2-container-active');
        this.dropdown.addClass('select2-drop-active');
        this.clearPlaceholder();
      }));
      this.initContainerWidth();
      this.opts.element.addClass('select2-offscreen');
      this.clearSearch();
    },
    enableInterface: function () {
      if (this.parent.enableInterface.apply(this, arguments)) {
        this.search.prop('disabled', !this.isInterfaceEnabled());
      }
    },
    initSelection: function () {
      var data;
      if (this.opts.element.val() === '' && this.opts.element.text() === '') {
        this.updateSelection([]);
        this.close();
        this.clearSearch();
      }
      if (this.select || this.opts.element.val() !== '') {
        var self = this;
        this.opts.initSelection.call(null, this.opts.element, function (data) {
          if (data !== undefined && data !== null) {
            self.updateSelection(data);
            self.close();
            self.clearSearch();
          }
        });
      }
    },
    clearSearch: function () {
      var placeholder = this.getPlaceholder(), maxWidth = this.getMaxSearchWidth();
      if (placeholder !== undefined && this.getVal().length === 0 && this.search.hasClass('select2-focused') === false) {
        this.search.val(placeholder).addClass('select2-default');
        this.search.width(maxWidth > 0 ? maxWidth : this.container.css('width'));
      } else {
        this.search.val('').width(10);
      }
    },
    clearPlaceholder: function () {
      if (this.search.hasClass('select2-default')) {
        this.search.val('').removeClass('select2-default');
      }
    },
    opening: function () {
      this.clearPlaceholder();
      this.resizeSearch();
      this.parent.opening.apply(this, arguments);
      this.focusSearch();
      this.updateResults(true);
      this.search.focus();
      this.opts.element.trigger($.Event('select2-open'));
    },
    close: function () {
      if (!this.opened())
        return;
      this.parent.close.apply(this, arguments);
    },
    focus: function () {
      this.close();
      this.search.focus();
    },
    isFocused: function () {
      return this.search.hasClass('select2-focused');
    },
    updateSelection: function (data) {
      var ids = [], filtered = [], self = this;
      $(data).each(function () {
        if (indexOf(self.id(this), ids) < 0) {
          ids.push(self.id(this));
          filtered.push(this);
        }
      });
      data = filtered;
      this.selection.find('.select2-search-choice').remove();
      $(data).each(function () {
        self.addSelectedChoice(this);
      });
      self.postprocessResults();
    },
    tokenize: function () {
      var input = this.search.val();
      input = this.opts.tokenizer.call(this, input, this.data(), this.bind(this.onSelect), this.opts);
      if (input != null && input != undefined) {
        this.search.val(input);
        if (input.length > 0) {
          this.open();
        }
      }
    },
    onSelect: function (data, options) {
      if (!this.triggerSelect(data)) {
        return;
      }
      this.addSelectedChoice(data);
      this.opts.element.trigger({
        type: 'selected',
        val: this.id(data),
        choice: data
      });
      if (this.select || !this.opts.closeOnSelect)
        this.postprocessResults(data, false, this.opts.closeOnSelect === true);
      if (this.opts.closeOnSelect) {
        this.close();
        this.search.width(10);
      } else {
        if (this.countSelectableResults() > 0) {
          this.search.width(10);
          this.resizeSearch();
          if (this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize()) {
            this.updateResults(true);
          }
          this.positionDropdown();
        } else {
          this.close();
          this.search.width(10);
        }
      }
      this.triggerChange({ added: data });
      if (!options || !options.noFocus)
        this.focusSearch();
    },
    cancel: function () {
      this.close();
      this.focusSearch();
    },
    addSelectedChoice: function (data) {
      var enableChoice = !data.locked, enabledItem = $('<li class=\'select2-search-choice\'>' + '    <div></div>' + '    <a href=\'#\' onclick=\'return false;\' class=\'select2-search-choice-close\' tabindex=\'-1\'></a>' + '</li>'), disabledItem = $('<li class=\'select2-search-choice select2-locked\'>' + '<div></div>' + '</li>');
      var choice = enableChoice ? enabledItem : disabledItem, id = this.id(data), val = this.getVal(), formatted, cssClass;
      formatted = this.opts.formatSelection(data, choice.find('div'), this.opts.escapeMarkup);
      if (formatted != undefined) {
        choice.find('div').replaceWith('<div>' + formatted + '</div>');
      }
      cssClass = this.opts.formatSelectionCssClass(data, choice.find('div'));
      if (cssClass != undefined) {
        choice.addClass(cssClass);
      }
      if (enableChoice) {
        choice.find('.select2-search-choice-close').on('mousedown', killEvent).on('click dblclick', this.bind(function (e) {
          if (!this.isInterfaceEnabled())
            return;
          $(e.target).closest('.select2-search-choice').fadeOut('fast', this.bind(function () {
            this.unselect($(e.target));
            this.selection.find('.select2-search-choice-focus').removeClass('select2-search-choice-focus');
            this.close();
            this.focusSearch();
          })).dequeue();
          killEvent(e);
        })).on('focus', this.bind(function () {
          if (!this.isInterfaceEnabled())
            return;
          this.container.addClass('select2-container-active');
          this.dropdown.addClass('select2-drop-active');
        }));
      }
      choice.data('select2-data', data);
      choice.insertBefore(this.searchContainer);
      val.push(id);
      this.setVal(val);
    },
    unselect: function (selected) {
      var val = this.getVal(), data, index;
      selected = selected.closest('.select2-search-choice');
      if (selected.length === 0) {
        throw 'Invalid argument: ' + selected + '. Must be .select2-search-choice';
      }
      data = selected.data('select2-data');
      if (!data) {
        return;
      }
      while ((index = indexOf(this.id(data), val)) >= 0) {
        val.splice(index, 1);
        this.setVal(val);
        if (this.select)
          this.postprocessResults();
      }
      var evt = $.Event('select2-removing');
      evt.val = this.id(data);
      evt.choice = data;
      this.opts.element.trigger(evt);
      if (evt.isDefaultPrevented()) {
        return;
      }
      selected.remove();
      this.opts.element.trigger({
        type: 'select2-removed',
        val: this.id(data),
        choice: data
      });
      this.triggerChange({ removed: data });
    },
    postprocessResults: function (data, initial, noHighlightUpdate) {
      var val = this.getVal(), choices = this.results.find('.select2-result'), compound = this.results.find('.select2-result-with-children'), self = this;
      choices.each2(function (i, choice) {
        var id = self.id(choice.data('select2-data'));
        if (indexOf(id, val) >= 0) {
          choice.addClass('select2-selected');
          choice.find('.select2-result-selectable').addClass('select2-selected');
        }
      });
      compound.each2(function (i, choice) {
        if (!choice.is('.select2-result-selectable') && choice.find('.select2-result-selectable:not(.select2-selected)').length === 0) {
          choice.addClass('select2-selected');
        }
      });
      if (this.highlight() == -1 && noHighlightUpdate !== false) {
        self.highlight(0);
      }
      if (!this.opts.createSearchChoice && !choices.filter('.select2-result:not(.select2-selected)').length > 0) {
        if (!data || data && !data.more && this.results.find('.select2-no-results').length === 0) {
          if (checkFormatter(self.opts.formatNoMatches, 'formatNoMatches')) {
            this.results.append('<li class=\'select2-no-results\'>' + self.opts.formatNoMatches(self.search.val()) + '</li>');
          }
        }
      }
    },
    getMaxSearchWidth: function () {
      return this.selection.width() - getSideBorderPadding(this.search);
    },
    resizeSearch: function () {
      var minimumWidth, left, maxWidth, containerLeft, searchWidth, sideBorderPadding = getSideBorderPadding(this.search);
      minimumWidth = measureTextWidth(this.search) + 10;
      left = this.search.offset().left;
      maxWidth = this.selection.width();
      containerLeft = this.selection.offset().left;
      searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding;
      if (searchWidth < minimumWidth) {
        searchWidth = maxWidth - sideBorderPadding;
      }
      if (searchWidth < 40) {
        searchWidth = maxWidth - sideBorderPadding;
      }
      if (searchWidth <= 0) {
        searchWidth = minimumWidth;
      }
      this.search.width(Math.floor(searchWidth));
    },
    getVal: function () {
      var val;
      if (this.select) {
        val = this.select.val();
        return val === null ? [] : val;
      } else {
        val = this.opts.element.val();
        return splitVal(val, this.opts.separator);
      }
    },
    setVal: function (val) {
      var unique;
      if (this.select) {
        this.select.val(val);
      } else {
        unique = [];
        $(val).each(function () {
          if (indexOf(this, unique) < 0)
            unique.push(this);
        });
        this.opts.element.val(unique.length === 0 ? '' : unique.join(this.opts.separator));
      }
    },
    buildChangeDetails: function (old, current) {
      var current = current.slice(0), old = old.slice(0);
      for (var i = 0; i < current.length; i++) {
        for (var j = 0; j < old.length; j++) {
          if (equal(this.opts.id(current[i]), this.opts.id(old[j]))) {
            current.splice(i, 1);
            if (i > 0) {
              i--;
            }
            old.splice(j, 1);
            j--;
          }
        }
      }
      return {
        added: current,
        removed: old
      };
    },
    val: function (val, triggerChange) {
      var oldData, self = this;
      if (arguments.length === 0) {
        return this.getVal();
      }
      oldData = this.data();
      if (!oldData.length)
        oldData = [];
      if (!val && val !== 0) {
        this.opts.element.val('');
        this.updateSelection([]);
        this.clearSearch();
        if (triggerChange) {
          this.triggerChange({
            added: this.data(),
            removed: oldData
          });
        }
        return;
      }
      this.setVal(val);
      if (this.select) {
        this.opts.initSelection(this.select, this.bind(this.updateSelection));
        if (triggerChange) {
          this.triggerChange(this.buildChangeDetails(oldData, this.data()));
        }
      } else {
        if (this.opts.initSelection === undefined) {
          throw new Error('val() cannot be called if initSelection() is not defined');
        }
        this.opts.initSelection(this.opts.element, function (data) {
          var ids = $.map(data, self.id);
          self.setVal(ids);
          self.updateSelection(data);
          self.clearSearch();
          if (triggerChange) {
            self.triggerChange(self.buildChangeDetails(oldData, self.data()));
          }
        });
      }
      this.clearSearch();
    },
    onSortStart: function () {
      if (this.select) {
        throw new Error('Sorting of elements is not supported when attached to <select>. Attach to <input type=\'hidden\'/> instead.');
      }
      this.search.width(0);
      this.searchContainer.hide();
    },
    onSortEnd: function () {
      var val = [], self = this;
      this.searchContainer.show();
      this.searchContainer.appendTo(this.searchContainer.parent());
      this.resizeSearch();
      this.selection.find('.select2-search-choice').each(function () {
        val.push(self.opts.id($(this).data('select2-data')));
      });
      this.setVal(val);
      this.triggerChange();
    },
    data: function (values, triggerChange) {
      var self = this, ids, old;
      if (arguments.length === 0) {
        return this.selection.find('.select2-search-choice').map(function () {
          return $(this).data('select2-data');
        }).get();
      } else {
        old = this.data();
        if (!values) {
          values = [];
        }
        ids = $.map(values, function (e) {
          return self.opts.id(e);
        });
        this.setVal(ids);
        this.updateSelection(values);
        this.clearSearch();
        if (triggerChange) {
          this.triggerChange(this.buildChangeDetails(old, this.data()));
        }
      }
    }
  });
  $.fn.select2 = function () {
    var args = Array.prototype.slice.call(arguments, 0), opts, select2, method, value, multiple, allowedMethods = [
        'val',
        'destroy',
        'opened',
        'open',
        'close',
        'focus',
        'isFocused',
        'container',
        'dropdown',
        'onSortStart',
        'onSortEnd',
        'enable',
        'disable',
        'readonly',
        'positionDropdown',
        'data',
        'search'
      ], valueMethods = [
        'opened',
        'isFocused',
        'container',
        'dropdown'
      ], propertyMethods = [
        'val',
        'data'
      ], methodsMap = { search: 'externalSearch' };
    this.each(function () {
      if (args.length === 0 || typeof args[0] === 'object') {
        opts = args.length === 0 ? {} : $.extend({}, args[0]);
        opts.element = $(this);
        if (opts.element.get(0).tagName.toLowerCase() === 'select') {
          multiple = opts.element.prop('multiple');
        } else {
          multiple = opts.multiple || false;
          if ('tags' in opts) {
            opts.multiple = multiple = true;
          }
        }
        select2 = multiple ? new MultiSelect2() : new SingleSelect2();
        select2.init(opts);
      } else if (typeof args[0] === 'string') {
        if (indexOf(args[0], allowedMethods) < 0) {
          throw 'Unknown method: ' + args[0];
        }
        value = undefined;
        select2 = $(this).data('select2');
        if (select2 === undefined)
          return;
        method = args[0];
        if (method === 'container') {
          value = select2.container;
        } else if (method === 'dropdown') {
          value = select2.dropdown;
        } else {
          if (methodsMap[method])
            method = methodsMap[method];
          value = select2[method].apply(select2, args.slice(1));
        }
        if (indexOf(args[0], valueMethods) >= 0 || indexOf(args[0], propertyMethods) && args.length == 1) {
          return false;
        }
      } else {
        throw 'Invalid arguments to select2 plugin: ' + args;
      }
    });
    return value === undefined ? this : value;
  };
  $.fn.select2.defaults = {
    width: 'copy',
    loadMorePadding: 0,
    closeOnSelect: true,
    openOnEnter: true,
    containerCss: {},
    dropdownCss: {},
    containerCssClass: '',
    dropdownCssClass: '',
    formatResult: function (result, container, query, escapeMarkup) {
      var markup = [];
      markMatch(result.text, query.term, markup, escapeMarkup);
      return markup.join('');
    },
    formatSelection: function (data, container, escapeMarkup) {
      return data ? escapeMarkup(data.text) : undefined;
    },
    sortResults: function (results, container, query) {
      return results;
    },
    formatResultCssClass: function (data) {
      return undefined;
    },
    formatSelectionCssClass: function (data, container) {
      return undefined;
    },
    formatNoMatches: function () {
      return 'No matches found';
    },
    formatInputTooShort: function (input, min) {
      var n = min - input.length;
      return 'Please enter ' + n + ' more character' + (n == 1 ? '' : 's');
    },
    formatInputTooLong: function (input, max) {
      var n = input.length - max;
      return 'Please delete ' + n + ' character' + (n == 1 ? '' : 's');
    },
    formatSelectionTooBig: function (limit) {
      return 'You can only select ' + limit + ' item' + (limit == 1 ? '' : 's');
    },
    formatLoadMore: function (pageNumber) {
      return 'Loading more results...';
    },
    formatSearching: function () {
      return 'Searching...';
    },
    minimumResultsForSearch: 0,
    minimumInputLength: 0,
    maximumInputLength: null,
    maximumSelectionSize: 0,
    id: function (e) {
      return e.id;
    },
    matcher: function (term, text) {
      return stripDiacritics('' + text).toUpperCase().indexOf(stripDiacritics('' + term).toUpperCase()) >= 0;
    },
    separator: ',',
    tokenSeparators: [],
    tokenizer: defaultTokenizer,
    escapeMarkup: defaultEscapeMarkup,
    blurOnChange: false,
    selectOnBlur: false,
    adaptContainerCssClass: function (c) {
      return c;
    },
    adaptDropdownCssClass: function (c) {
      return null;
    },
    nextSearchTerm: function (selectedObject, currentSearchTerm) {
      return undefined;
    }
  };
  $.fn.select2.ajaxDefaults = {
    transport: $.ajax,
    params: {
      type: 'GET',
      cache: false,
      dataType: 'json'
    }
  };
  window.Select2 = {
    query: {
      ajax: ajax,
      local: local,
      tags: tags
    },
    util: {
      debounce: debounce,
      markMatch: markMatch,
      escapeMarkup: defaultEscapeMarkup,
      stripDiacritics: stripDiacritics
    },
    'class': {
      'abstract': AbstractSelect2,
      'single': SingleSelect2,
      'multi': MultiSelect2
    }
  };
}(jQuery));