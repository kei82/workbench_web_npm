(function() {
    if (window.$fsx) {
        return;
    };
    var $fsx = window.$fsx = {}
    $fsx.f = {}
    // cached modules
    $fsx.m = {};
    $fsx.r = function(id) {
        var cached = $fsx.m[id];
        // resolve if in cache
        if (cached) {
            return cached.m.exports;
        }
        var file = $fsx.f[id];
        if (!file)
            return;
        cached = $fsx.m[id] = {};
        cached.exports = {};
        cached.m = { exports: cached.exports };
        file.call(cached.exports, cached.m, cached.exports);
        return cached.m.exports;
    };
})();
(function($fsx){
// default/common.js
$fsx.f[0] = function(){
var _promise = $fsx.r(1);
var _promise2 = _interopRequireDefault(_promise);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
var prettierStart = function prettierStart(data) {
    return prettier.format(data.toString(), prettierOptions);
};
var readFile = function readFile(file) {
    return fs.readFileSync(file);
};
var writeFile = function writeFile(outputFile, data) {
    fs.outputFile(outputFile, data);
};
var promiseStart = function promiseStart(str, func) {
    return new _promise2.default(function (resolve, reject) {
        if (!str && !func)
            reject('Error');
        else
            resolve(func(str));
    });
};
}
// babel-runtime/core-js/promise.js
$fsx.f[1] = function(module,exports){
module.exports = {
    'default': $fsx.r(2),
    __esModule: true
};
}
// core-js/library/fn/promise.js
$fsx.f[2] = function(module,exports){
$fsx.r(3);
$fsx.r(4);
$fsx.r(48);
$fsx.r(52);
$fsx.r(70);
$fsx.r(71);
module.exports = $fsx.r(12).Promise;
}
// core-js/library/modules/es6.object.to-string.js
$fsx.f[3] = function(){

}
// core-js/library/modules/es6.string.iterator.js
$fsx.f[4] = function(){
var $at = $fsx.r(5)(true);
$fsx.r(8)(String, 'String', function (iterated) {
    this._t = String(iterated);
    this._i = 0;
}, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length)
        return {
            value: undefined,
            done: true
        };
    point = $at(O, index);
    this._i += point.length;
    return {
        value: point,
        done: false
    };
});
}
// core-js/library/modules/_string-at.js
$fsx.f[5] = function(module,exports){
var toInteger = $fsx.r(6);
var defined = $fsx.r(7);
module.exports = function (TO_STRING) {
    return function (that, pos) {
        var s = String(defined(that));
        var i = toInteger(pos);
        var l = s.length;
        var a, b;
        if (i < 0 || i >= l)
            return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
    };
};
}
// core-js/library/modules/_to-integer.js
$fsx.f[6] = function(module,exports){
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
}
// core-js/library/modules/_defined.js
$fsx.f[7] = function(module,exports){
module.exports = function (it) {
    if (it == undefined)
        throw TypeError('Can\'t call method on  ' + it);
    return it;
};
}
// core-js/library/modules/_iter-define.js
$fsx.f[8] = function(module,exports){
var LIBRARY = $fsx.r(9);
var $export = $fsx.r(10);
var redefine = $fsx.r(26);
var hide = $fsx.r(15);
var Iterators = $fsx.r(27);
var $iterCreate = $fsx.r(28);
var setToStringTag = $fsx.r(44);
var getPrototypeOf = $fsx.r(46);
var ITERATOR = $fsx.r(45)('iterator');
var BUGGY = !([].keys && 'next' in [].keys());
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';
var returnThis = function () {
    return this;
};
module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
        if (!BUGGY && kind in proto)
            return proto[kind];
        switch (kind) {
        case KEYS:
            return function keys() {
                return new Constructor(this, kind);
            };
        case VALUES:
            return function values() {
                return new Constructor(this, kind);
            };
        }
        return function entries() {
            return new Constructor(this, kind);
        };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
            setToStringTag(IteratorPrototype, TAG, true);
            if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function')
                hide(IteratorPrototype, ITERATOR, returnThis);
        }
    }
    if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
            return $native.call(this);
        };
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
        methods = {
            values: DEF_VALUES ? $default : getMethod(VALUES),
            keys: IS_SET ? $default : getMethod(KEYS),
            entries: $entries
        };
        if (FORCED)
            for (key in methods) {
                if (!(key in proto))
                    redefine(proto, key, methods[key]);
            }
        else
            $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
};
}
// core-js/library/modules/_library.js
$fsx.f[9] = function(module,exports){
module.exports = true;
}
// core-js/library/modules/_export.js
$fsx.f[10] = function(module,exports){
var global = $fsx.r(11);
var core = $fsx.r(12);
var ctx = $fsx.r(13);
var hide = $fsx.r(15);
var has = $fsx.r(25);
var PROTOTYPE = 'prototype';
var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL)
        source = name;
    for (key in source) {
        own = !IS_FORCED && target && target[key] !== undefined;
        if (own && has(exports, key))
            continue;
        out = own ? target[key] : source[key];
        exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function (C) {
            var F = function (a, b, c) {
                if (this instanceof C) {
                    switch (arguments.length) {
                    case 0:
                        return new C();
                    case 1:
                        return new C(a);
                    case 2:
                        return new C(a, b);
                    }
                    return new C(a, b, c);
                }
                return C.apply(this, arguments);
            };
            F[PROTOTYPE] = C[PROTOTYPE];
            return F;
        }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
        if (IS_PROTO) {
            (exports.virtual || (exports.virtual = {}))[key] = out;
            if (type & $export.R && expProto && !expProto[key])
                hide(expProto, key, out);
        }
    }
};
$export.F = 1;
$export.G = 2;
$export.S = 4;
$export.P = 8;
$export.B = 16;
$export.W = 32;
$export.U = 64;
$export.R = 128;
module.exports = $export;
}
// core-js/library/modules/_global.js
$fsx.f[11] = function(module,exports){
var global = module.exports = 'object' != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number')
    __g = global;
}
// core-js/library/modules/_core.js
$fsx.f[12] = function(module,exports){
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number')
    __e = core;
}
// core-js/library/modules/_ctx.js
$fsx.f[13] = function(module,exports){
var aFunction = $fsx.r(14);
module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined)
        return fn;
    switch (length) {
    case 1:
        return function (a) {
            return fn.call(that, a);
        };
    case 2:
        return function (a, b) {
            return fn.call(that, a, b);
        };
    case 3:
        return function (a, b, c) {
            return fn.call(that, a, b, c);
        };
    }
    return function () {
        return fn.apply(that, arguments);
    };
};
}
// core-js/library/modules/_a-function.js
$fsx.f[14] = function(module,exports){
module.exports = function (it) {
    if (typeof it != 'function')
        throw TypeError(it + ' is not a function!');
    return it;
};
}
// core-js/library/modules/_hide.js
$fsx.f[15] = function(module,exports){
var dP = $fsx.r(16);
var createDesc = $fsx.r(24);
module.exports = $fsx.r(20) ? function (object, key, value) {
    return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
    object[key] = value;
    return object;
};
}
// core-js/library/modules/_object-dp.js
$fsx.f[16] = function(module,exports){
var anObject = $fsx.r(17);
var IE8_DOM_DEFINE = $fsx.r(19);
var toPrimitive = $fsx.r(23);
var dP = Object.defineProperty;
exports.f = $fsx.r(20) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (IE8_DOM_DEFINE)
        try {
            return dP(O, P, Attributes);
        } catch (e) {
        }
    if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported!');
    if ('value' in Attributes)
        O[P] = Attributes.value;
    return O;
};
}
// core-js/library/modules/_an-object.js
$fsx.f[17] = function(module,exports){
var isObject = $fsx.r(18);
module.exports = function (it) {
    if (!isObject(it))
        throw TypeError(it + ' is not an object!');
    return it;
};
}
// core-js/library/modules/_is-object.js
$fsx.f[18] = function(module,exports){
module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
};
}
// core-js/library/modules/_ie8-dom-define.js
$fsx.f[19] = function(module,exports){
module.exports = !$fsx.r(20) && !$fsx.r(21)(function () {
    return Object.defineProperty($fsx.r(22)('div'), 'a', {
        get: function () {
            return 7;
        }
    }).a != 7;
});
}
// core-js/library/modules/_descriptors.js
$fsx.f[20] = function(module,exports){
module.exports = !$fsx.r(21)(function () {
    return Object.defineProperty({}, 'a', {
        get: function () {
            return 7;
        }
    }).a != 7;
});
}
// core-js/library/modules/_fails.js
$fsx.f[21] = function(module,exports){
module.exports = function (exec) {
    try {
        return !!exec();
    } catch (e) {
        return true;
    }
};
}
// core-js/library/modules/_dom-create.js
$fsx.f[22] = function(module,exports){
var isObject = $fsx.r(18);
var document = $fsx.r(11).document;
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
    return is ? document.createElement(it) : {};
};
}
// core-js/library/modules/_to-primitive.js
$fsx.f[23] = function(module,exports){
var isObject = $fsx.r(18);
module.exports = function (it, S) {
    if (!isObject(it))
        return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))
        return val;
    if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))
        return val;
    if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))
        return val;
    throw TypeError('Can\'t convert object to primitive value');
};
}
// core-js/library/modules/_property-desc.js
$fsx.f[24] = function(module,exports){
module.exports = function (bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};
}
// core-js/library/modules/_has.js
$fsx.f[25] = function(module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
    return hasOwnProperty.call(it, key);
};
}
// core-js/library/modules/_redefine.js
$fsx.f[26] = function(module,exports){
module.exports = $fsx.r(15);
}
// core-js/library/modules/_iterators.js
$fsx.f[27] = function(module,exports){
module.exports = {};
}
// core-js/library/modules/_iter-create.js
$fsx.f[28] = function(module,exports){
var create = $fsx.r(29);
var descriptor = $fsx.r(24);
var setToStringTag = $fsx.r(44);
var IteratorPrototype = {};
$fsx.r(15)(IteratorPrototype, $fsx.r(45)('iterator'), function () {
    return this;
});
module.exports = function (Constructor, NAME, next) {
    Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag(Constructor, NAME + ' Iterator');
};
}
// core-js/library/modules/_object-create.js
$fsx.f[29] = function(module,exports){
var anObject = $fsx.r(17);
var dPs = $fsx.r(30);
var enumBugKeys = $fsx.r(42);
var IE_PROTO = $fsx.r(39)('IE_PROTO');
var Empty = function () {
};
var PROTOTYPE = 'prototype';
var createDict = function () {
    var iframe = $fsx.r(22)('iframe');
    var i = enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    $fsx.r(43).appendChild(iframe);
    iframe.src = 'javascript:';
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--)
        delete createDict[PROTOTYPE][enumBugKeys[i]];
    return createDict();
};
module.exports = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null;
        result[IE_PROTO] = O;
    } else
        result = createDict();
    return Properties === undefined ? result : dPs(result, Properties);
};
}
// core-js/library/modules/_object-dps.js
$fsx.f[30] = function(module,exports){
var dP = $fsx.r(16);
var anObject = $fsx.r(17);
var getKeys = $fsx.r(31);
module.exports = $fsx.r(20) ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = getKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i)
        dP.f(O, P = keys[i++], Properties[P]);
    return O;
};
}
// core-js/library/modules/_object-keys.js
$fsx.f[31] = function(module,exports){
var $keys = $fsx.r(32);
var enumBugKeys = $fsx.r(42);
module.exports = Object.keys || function keys(O) {
    return $keys(O, enumBugKeys);
};
}
// core-js/library/modules/_object-keys-internal.js
$fsx.f[32] = function(module,exports){
var has = $fsx.r(25);
var toIObject = $fsx.r(33);
var arrayIndexOf = $fsx.r(36)(false);
var IE_PROTO = $fsx.r(39)('IE_PROTO');
module.exports = function (object, names) {
    var O = toIObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O)
        if (key != IE_PROTO)
            has(O, key) && result.push(key);
    while (names.length > i)
        if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
    return result;
};
}
// core-js/library/modules/_to-iobject.js
$fsx.f[33] = function(module,exports){
var IObject = $fsx.r(34);
var defined = $fsx.r(7);
module.exports = function (it) {
    return IObject(defined(it));
};
}
// core-js/library/modules/_iobject.js
$fsx.f[34] = function(module,exports){
var cof = $fsx.r(35);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
};
}
// core-js/library/modules/_cof.js
$fsx.f[35] = function(module,exports){
var toString = {}.toString;
module.exports = function (it) {
    return toString.call(it).slice(8, -1);
};
}
// core-js/library/modules/_array-includes.js
$fsx.f[36] = function(module,exports){
var toIObject = $fsx.r(33);
var toLength = $fsx.r(37);
var toAbsoluteIndex = $fsx.r(38);
module.exports = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
        var O = toIObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        if (IS_INCLUDES && el != el)
            while (length > index) {
                value = O[index++];
                if (value != value)
                    return true;
            }
        else
            for (; length > index; index++)
                if (IS_INCLUDES || index in O) {
                    if (O[index] === el)
                        return IS_INCLUDES || index || 0;
                }
        return !IS_INCLUDES && -1;
    };
};
}
// core-js/library/modules/_to-length.js
$fsx.f[37] = function(module,exports){
var toInteger = $fsx.r(6);
var min = Math.min;
module.exports = function (it) {
    return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
};
}
// core-js/library/modules/_to-absolute-index.js
$fsx.f[38] = function(module,exports){
var toInteger = $fsx.r(6);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
};
}
// core-js/library/modules/_shared-key.js
$fsx.f[39] = function(module,exports){
var shared = $fsx.r(40)('keys');
var uid = $fsx.r(41);
module.exports = function (key) {
    return shared[key] || (shared[key] = uid(key));
};
}
// core-js/library/modules/_shared.js
$fsx.f[40] = function(module,exports){
var core = $fsx.r(12);
var global = $fsx.r(11);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
(module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
    version: core.version,
    mode: $fsx.r(9) ? 'pure' : 'global',
    copyright: '\xA9 2018 Denis Pushkarev (zloirock.ru)'
});
}
// core-js/library/modules/_uid.js
$fsx.f[41] = function(module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
}
// core-js/library/modules/_enum-bug-keys.js
$fsx.f[42] = function(module,exports){
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
}
// core-js/library/modules/_html.js
$fsx.f[43] = function(module,exports){
var document = $fsx.r(11).document;
module.exports = document && document.documentElement;
}
// core-js/library/modules/_set-to-string-tag.js
$fsx.f[44] = function(module,exports){
var def = $fsx.r(16).f;
var has = $fsx.r(25);
var TAG = $fsx.r(45)('toStringTag');
module.exports = function (it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG))
        def(it, TAG, {
            configurable: true,
            value: tag
        });
};
}
// core-js/library/modules/_wks.js
$fsx.f[45] = function(module,exports){
var store = $fsx.r(40)('wks');
var uid = $fsx.r(41);
var Symbol = $fsx.r(11).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';
var $exports = module.exports = function (name) {
    return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};
$exports.store = store;
}
// core-js/library/modules/_object-gpo.js
$fsx.f[46] = function(module,exports){
var has = $fsx.r(25);
var toObject = $fsx.r(47);
var IE_PROTO = $fsx.r(39)('IE_PROTO');
var ObjectProto = Object.prototype;
module.exports = Object.getPrototypeOf || function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO))
        return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
    }
    return O instanceof Object ? ObjectProto : null;
};
}
// core-js/library/modules/_to-object.js
$fsx.f[47] = function(module,exports){
var defined = $fsx.r(7);
module.exports = function (it) {
    return Object(defined(it));
};
}
// core-js/library/modules/web.dom.iterable.js
$fsx.f[48] = function(){
$fsx.r(49);
var global = $fsx.r(11);
var hide = $fsx.r(15);
var Iterators = $fsx.r(27);
var TO_STRING_TAG = $fsx.r(45)('toStringTag');
var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' + 'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' + 'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' + 'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' + 'TextTrackList,TouchList').split(',');
for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = global[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG])
        hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = Iterators.Array;
}
}
// core-js/library/modules/es6.array.iterator.js
$fsx.f[49] = function(module,exports){
var addToUnscopables = $fsx.r(50);
var step = $fsx.r(51);
var Iterators = $fsx.r(27);
var toIObject = $fsx.r(33);
module.exports = $fsx.r(8)(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
}, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
        this._t = undefined;
        return step(1);
    }
    if (kind == 'keys')
        return step(0, index);
    if (kind == 'values')
        return step(0, O[index]);
    return step(0, [
        index,
        O[index]
    ]);
}, 'values');
Iterators.Arguments = Iterators.Array;
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
}
// core-js/library/modules/_add-to-unscopables.js
$fsx.f[50] = function(module,exports){
module.exports = function () {
};
}
// core-js/library/modules/_iter-step.js
$fsx.f[51] = function(module,exports){
module.exports = function (done, value) {
    return {
        value: value,
        done: !!done
    };
};
}
// core-js/library/modules/es6.promise.js
$fsx.f[52] = function(){
var LIBRARY = $fsx.r(9);
var global = $fsx.r(11);
var ctx = $fsx.r(13);
var classof = $fsx.r(53);
var $export = $fsx.r(10);
var isObject = $fsx.r(18);
var aFunction = $fsx.r(14);
var anInstance = $fsx.r(54);
var forOf = $fsx.r(55);
var speciesConstructor = $fsx.r(59);
var task = $fsx.r(60).set;
var microtask = $fsx.r(62)();
var newPromiseCapabilityModule = $fsx.r(63);
var perform = $fsx.r(64);
var userAgent = $fsx.r(65);
var promiseResolve = $fsx.r(66);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () {
};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;
var USE_NATIVE = !!function () {
    try {
        var promise = $Promise.resolve(1);
        var FakePromise = (promise.constructor = {})[$fsx.r(45)('species')] = function (exec) {
            exec(empty, empty);
        };
        return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
    } catch (e) {
    }
}();
var isThenable = function (it) {
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
    if (promise._n)
        return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
        var value = promise._v;
        var ok = promise._s == 1;
        var i = 0;
        var run = function (reaction) {
            var handler = ok ? reaction.ok : reaction.fail;
            var resolve = reaction.resolve;
            var reject = reaction.reject;
            var domain = reaction.domain;
            var result, then, exited;
            try {
                if (handler) {
                    if (!ok) {
                        if (promise._h == 2)
                            onHandleUnhandled(promise);
                        promise._h = 1;
                    }
                    if (handler === true)
                        result = value;
                    else {
                        if (domain)
                            domain.enter();
                        result = handler(value);
                        if (domain) {
                            domain.exit();
                            exited = true;
                        }
                    }
                    if (result === reaction.promise) {
                        reject(TypeError('Promise-chain cycle'));
                    } else if (then = isThenable(result)) {
                        then.call(result, resolve, reject);
                    } else
                        resolve(result);
                } else
                    reject(value);
            } catch (e) {
                if (domain && !exited)
                    domain.exit();
                reject(e);
            }
        };
        while (chain.length > i)
            run(chain[i++]);
        promise._c = [];
        promise._n = false;
        if (isReject && !promise._h)
            onUnhandled(promise);
    });
};
var onUnhandled = function (promise) {
    task.call(global, function () {
        var value = promise._v;
        var unhandled = isUnhandled(promise);
        var result, handler, console;
        if (unhandled) {
            result = perform(function () {
                if (isNode) {
                    process.emit('unhandledRejection', value, promise);
                } else if (handler = global.onunhandledrejection) {
                    handler({
                        promise: promise,
                        reason: value
                    });
                } else if ((console = global.console) && console.error) {
                    console.error('Unhandled promise rejection', value);
                }
            });
            promise._h = isNode || isUnhandled(promise) ? 2 : 1;
        }
        promise._a = undefined;
        if (unhandled && result.e)
            throw result.v;
    });
};
var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
    task.call(global, function () {
        var handler;
        if (isNode) {
            process.emit('rejectionHandled', promise);
        } else if (handler = global.onrejectionhandled) {
            handler({
                promise: promise,
                reason: promise._v
            });
        }
    });
};
var $reject = function (value) {
    var promise = this;
    if (promise._d)
        return;
    promise._d = true;
    promise = promise._w || promise;
    promise._v = value;
    promise._s = 2;
    if (!promise._a)
        promise._a = promise._c.slice();
    notify(promise, true);
};
var $resolve = function (value) {
    var promise = this;
    var then;
    if (promise._d)
        return;
    promise._d = true;
    promise = promise._w || promise;
    try {
        if (promise === value)
            throw TypeError('Promise can\'t be resolved itself');
        if (then = isThenable(value)) {
            microtask(function () {
                var wrapper = {
                    _w: promise,
                    _d: false
                };
                try {
                    then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                } catch (e) {
                    $reject.call(wrapper, e);
                }
            });
        } else {
            promise._v = value;
            promise._s = 1;
            notify(promise, false);
        }
    } catch (e) {
        $reject.call({
            _w: promise,
            _d: false
        }, e);
    }
};
if (!USE_NATIVE) {
    $Promise = function Promise(executor) {
        anInstance(this, $Promise, PROMISE, '_h');
        aFunction(executor);
        Internal.call(this);
        try {
            executor(ctx($resolve, this, 1), ctx($reject, this, 1));
        } catch (err) {
            $reject.call(this, err);
        }
    };
    Internal = function Promise(executor) {
        this._c = [];
        this._a = undefined;
        this._s = 0;
        this._d = false;
        this._v = undefined;
        this._h = 0;
        this._n = false;
    };
    Internal.prototype = $fsx.r(67)($Promise.prototype, {
        then: function then(onFulfilled, onRejected) {
            var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
            reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
            reaction.fail = typeof onRejected == 'function' && onRejected;
            reaction.domain = isNode ? process.domain : undefined;
            this._c.push(reaction);
            if (this._a)
                this._a.push(reaction);
            if (this._s)
                notify(this, false);
            return reaction.promise;
        },
        'catch': function (onRejected) {
            return this.then(undefined, onRejected);
        }
    });
    OwnPromiseCapability = function () {
        var promise = new Internal();
        this.promise = promise;
        this.resolve = ctx($resolve, promise, 1);
        this.reject = ctx($reject, promise, 1);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
        return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };
}
$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
$fsx.r(44)($Promise, PROMISE);
$fsx.r(68)(PROMISE);
Wrapper = $fsx.r(12)[PROMISE];
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
    reject: function reject(r) {
        var capability = newPromiseCapability(this);
        var $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
    }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
    resolve: function resolve(x) {
        return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
    }
});
$export($export.S + $export.F * !(USE_NATIVE && $fsx.r(69)(function (iter) {
    $Promise.all(iter)['catch'](empty);
})), PROMISE, {
    all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
            var values = [];
            var index = 0;
            var remaining = 1;
            forOf(iterable, false, function (promise) {
                var $index = index++;
                var alreadyCalled = false;
                values.push(undefined);
                remaining++;
                C.resolve(promise).then(function (value) {
                    if (alreadyCalled)
                        return;
                    alreadyCalled = true;
                    values[$index] = value;
                    --remaining || resolve(values);
                }, reject);
            });
            --remaining || resolve(values);
        });
        if (result.e)
            reject(result.v);
        return capability.promise;
    },
    race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = perform(function () {
            forOf(iterable, false, function (promise) {
                C.resolve(promise).then(capability.resolve, reject);
            });
        });
        if (result.e)
            reject(result.v);
        return capability.promise;
    }
});
}
// core-js/library/modules/_classof.js
$fsx.f[53] = function(module,exports){
var cof = $fsx.r(35);
var TAG = $fsx.r(45)('toStringTag');
var ARG = cof(function () {
    return arguments;
}()) == 'Arguments';
var tryGet = function (it, key) {
    try {
        return it[key];
    } catch (e) {
    }
};
module.exports = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
}
// core-js/library/modules/_an-instance.js
$fsx.f[54] = function(module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
        throw TypeError(name + ': incorrect invocation!');
    }
    return it;
};
}
// core-js/library/modules/_for-of.js
$fsx.f[55] = function(module,exports){
var ctx = $fsx.r(13);
var call = $fsx.r(56);
var isArrayIter = $fsx.r(57);
var anObject = $fsx.r(17);
var toLength = $fsx.r(37);
var getIterFn = $fsx.r(58);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () {
        return iterable;
    } : getIterFn(iterable);
    var f = ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function')
        throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn))
        for (length = toLength(iterable.length); length > index; index++) {
            result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
            if (result === BREAK || result === RETURN)
                return result;
        }
    else
        for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
            result = call(iterator, f, step.value, entries);
            if (result === BREAK || result === RETURN)
                return result;
        }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
}
// core-js/library/modules/_iter-call.js
$fsx.f[56] = function(module,exports){
var anObject = $fsx.r(17);
module.exports = function (iterator, fn, value, entries) {
    try {
        return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
        var ret = iterator['return'];
        if (ret !== undefined)
            anObject(ret.call(iterator));
        throw e;
    }
};
}
// core-js/library/modules/_is-array-iter.js
$fsx.f[57] = function(module,exports){
var Iterators = $fsx.r(27);
var ITERATOR = $fsx.r(45)('iterator');
var ArrayProto = Array.prototype;
module.exports = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
}
// core-js/library/modules/core.get-iterator-method.js
$fsx.f[58] = function(module,exports){
var classof = $fsx.r(53);
var ITERATOR = $fsx.r(45)('iterator');
var Iterators = $fsx.r(27);
module.exports = $fsx.r(12).getIteratorMethod = function (it) {
    if (it != undefined)
        return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};
}
// core-js/library/modules/_species-constructor.js
$fsx.f[59] = function(module,exports){
var anObject = $fsx.r(17);
var aFunction = $fsx.r(14);
var SPECIES = $fsx.r(45)('species');
module.exports = function (O, D) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
}
// core-js/library/modules/_task.js
$fsx.f[60] = function(module,exports){
var ctx = $fsx.r(13);
var invoke = $fsx.r(61);
var html = $fsx.r(43);
var cel = $fsx.r(22);
var global = $fsx.r(11);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
    var id = +this;
    if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
    }
};
var listener = function (event) {
    run.call(event.data);
};
if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
        var args = [];
        var i = 1;
        while (arguments.length > i)
            args.push(arguments[i++]);
        queue[++counter] = function () {
            invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
    };
    clearTask = function clearImmediate(id) {
        delete queue[id];
    };
    if ($fsx.r(35)(process) == 'process') {
        defer = function (id) {
            process.nextTick(ctx(run, id, 1));
        };
    } else if (Dispatch && Dispatch.now) {
        defer = function (id) {
            Dispatch.now(ctx(run, id, 1));
        };
    } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = ctx(port.postMessage, port, 1);
    } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function (id) {
            global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listener, false);
    } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function (id) {
            html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
                html.removeChild(this);
                run.call(id);
            };
        };
    } else {
        defer = function (id) {
            setTimeout(ctx(run, id, 1), 0);
        };
    }
}
module.exports = {
    set: setTask,
    clear: clearTask
};
}
// core-js/library/modules/_invoke.js
$fsx.f[61] = function(module,exports){
module.exports = function (fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
    case 0:
        return un ? fn() : fn.call(that);
    case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
    case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
    case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
    case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
};
}
// core-js/library/modules/_microtask.js
$fsx.f[62] = function(module,exports){
var global = $fsx.r(11);
var macrotask = $fsx.r(60).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = $fsx.r(35)(process) == 'process';
module.exports = function () {
    var head, last, notify;
    var flush = function () {
        var parent, fn;
        if (isNode && (parent = process.domain))
            parent.exit();
        while (head) {
            fn = head.fn;
            head = head.next;
            try {
                fn();
            } catch (e) {
                if (head)
                    notify();
                else
                    last = undefined;
                throw e;
            }
        }
        last = undefined;
        if (parent)
            parent.enter();
    };
    if (isNode) {
        notify = function () {
            process.nextTick(flush);
        };
    } else if (Observer && !(global.navigator && global.navigator.standalone)) {
        var toggle = true;
        var node = document.createTextNode('');
        new Observer(flush).observe(node, { characterData: true });
        notify = function () {
            node.data = toggle = !toggle;
        };
    } else if (Promise && Promise.resolve) {
        var promise = Promise.resolve(undefined);
        notify = function () {
            promise.then(flush);
        };
    } else {
        notify = function () {
            macrotask.call(global, flush);
        };
    }
    return function (fn) {
        var task = {
            fn: fn,
            next: undefined
        };
        if (last)
            last.next = task;
        if (!head) {
            head = task;
            notify();
        }
        last = task;
    };
};
}
// core-js/library/modules/_new-promise-capability.js
$fsx.f[63] = function(module,exports){
var aFunction = $fsx.r(14);
function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined)
            throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
    });
    this.resolve = aFunction(resolve);
    this.reject = aFunction(reject);
}
module.exports.f = function (C) {
    return new PromiseCapability(C);
};
}
// core-js/library/modules/_perform.js
$fsx.f[64] = function(module,exports){
module.exports = function (exec) {
    try {
        return {
            e: false,
            v: exec()
        };
    } catch (e) {
        return {
            e: true,
            v: e
        };
    }
};
}
// core-js/library/modules/_user-agent.js
$fsx.f[65] = function(module,exports){
var global = $fsx.r(11);
var navigator = global.navigator;
module.exports = navigator && navigator.userAgent || '';
}
// core-js/library/modules/_promise-resolve.js
$fsx.f[66] = function(module,exports){
var anObject = $fsx.r(17);
var isObject = $fsx.r(18);
var newPromiseCapability = $fsx.r(63);
module.exports = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C)
        return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
};
}
// core-js/library/modules/_redefine-all.js
$fsx.f[67] = function(module,exports){
var hide = $fsx.r(15);
module.exports = function (target, src, safe) {
    for (var key in src) {
        if (safe && target[key])
            target[key] = src[key];
        else
            hide(target, key, src[key]);
    }
    return target;
};
}
// core-js/library/modules/_set-species.js
$fsx.f[68] = function(module,exports){
var global = $fsx.r(11);
var core = $fsx.r(12);
var dP = $fsx.r(16);
var DESCRIPTORS = $fsx.r(20);
var SPECIES = $fsx.r(45)('species');
module.exports = function (KEY) {
    var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
    if (DESCRIPTORS && C && !C[SPECIES])
        dP.f(C, SPECIES, {
            configurable: true,
            get: function () {
                return this;
            }
        });
};
}
// core-js/library/modules/_iter-detect.js
$fsx.f[69] = function(module,exports){
var ITERATOR = $fsx.r(45)('iterator');
var SAFE_CLOSING = false;
try {
    var riter = [7][ITERATOR]();
    riter['return'] = function () {
        SAFE_CLOSING = true;
    };
    Array.from(riter, function () {
        throw 2;
    });
} catch (e) {
}
module.exports = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING)
        return false;
    var safe = false;
    try {
        var arr = [7];
        var iter = arr[ITERATOR]();
        iter.next = function () {
            return { done: safe = true };
        };
        arr[ITERATOR] = function () {
            return iter;
        };
        exec(arr);
    } catch (e) {
    }
    return safe;
};
}
// core-js/library/modules/es7.promise.finally.js
$fsx.f[70] = function(){
var $export = $fsx.r(10);
var core = $fsx.r(12);
var global = $fsx.r(11);
var speciesConstructor = $fsx.r(59);
var promiseResolve = $fsx.r(66);
$export($export.P + $export.R, 'Promise', {
    'finally': function (onFinally) {
        var C = speciesConstructor(this, core.Promise || global.Promise);
        var isFunction = typeof onFinally == 'function';
        return this.then(isFunction ? function (x) {
            return promiseResolve(C, onFinally()).then(function () {
                return x;
            });
        } : onFinally, isFunction ? function (e) {
            return promiseResolve(C, onFinally()).then(function () {
                throw e;
            });
        } : onFinally);
    }
});
}
// core-js/library/modules/es7.promise.try.js
$fsx.f[71] = function(){
var $export = $fsx.r(10);
var newPromiseCapability = $fsx.r(63);
var perform = $fsx.r(64);
$export($export.S, 'Promise', {
    'try': function (callbackfn) {
        var promiseCapability = newPromiseCapability.f(this);
        var result = perform(callbackfn);
        (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
        return promiseCapability.promise;
    }
});
}
var global = window
$fsx.r(0)
})($fsx);