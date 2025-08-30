import Se, { createContext as gr, useContext as hr, useState as T, useEffect as M } from "react";
import { Effect as B } from "effect";
var te = { exports: {} }, W = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function mr() {
  if (Oe) return W;
  Oe = 1;
  var l = Se, o = Symbol.for("react.element"), c = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, m = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(i, s, n) {
    var d, y = {}, R = null, w = null;
    n !== void 0 && (R = "" + n), s.key !== void 0 && (R = "" + s.key), s.ref !== void 0 && (w = s.ref);
    for (d in s) h.call(s, d) && !p.hasOwnProperty(d) && (y[d] = s[d]);
    if (i && i.defaultProps) for (d in s = i.defaultProps, s) y[d] === void 0 && (y[d] = s[d]);
    return { $$typeof: o, type: i, key: R, ref: w, props: y, _owner: m.current };
  }
  return W.Fragment = c, W.jsx = g, W.jsxs = g, W;
}
var Y = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function br() {
  return we || (we = 1, process.env.NODE_ENV !== "production" && function() {
    var l = Se, o = Symbol.for("react.element"), c = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), n = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), $ = Symbol.iterator, De = "@@iterator";
    function $e(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[De];
      return typeof r == "function" ? r : null;
    }
    var F = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        Fe("error", e, t);
      }
    }
    function Fe(e, r, t) {
      {
        var a = F.ReactDebugCurrentFrame, b = a.getStackAddendum();
        b !== "" && (r += "%s", t = t.concat([b]));
        var E = t.map(function(v) {
          return String(v);
        });
        E.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, E);
      }
    }
    var Ae = !1, Ne = !1, Le = !1, Ie = !1, We = !1, ne;
    ne = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === p || We || e === m || e === n || e === d || Ie || e === w || Ae || Ne || Le || typeof e == "object" && e !== null && (e.$$typeof === R || e.$$typeof === y || e.$$typeof === g || e.$$typeof === i || e.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ne || e.getModuleId !== void 0));
    }
    function Me(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var b = r.displayName || r.name || "";
      return b !== "" ? t + "(" + b + ")" : t;
    }
    function ae(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case c:
          return "Portal";
        case p:
          return "Profiler";
        case m:
          return "StrictMode";
        case n:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case i:
            var r = e;
            return ae(r) + ".Consumer";
          case g:
            var t = e;
            return ae(t._context) + ".Provider";
          case s:
            return Me(e, e.render, "ForwardRef");
          case y:
            var a = e.displayName || null;
            return a !== null ? a : S(e.type) || "Memo";
          case R: {
            var b = e, E = b._payload, v = b._init;
            try {
              return S(v(E));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var k = Object.assign, L = 0, ie, se, oe, ue, le, ce, fe;
    function de() {
    }
    de.__reactDisabledLog = !0;
    function Be() {
      {
        if (L === 0) {
          ie = console.log, se = console.info, oe = console.warn, ue = console.error, le = console.group, ce = console.groupCollapsed, fe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: de,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        L++;
      }
    }
    function Ue() {
      {
        if (L--, L === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: k({}, e, {
              value: ie
            }),
            info: k({}, e, {
              value: se
            }),
            warn: k({}, e, {
              value: oe
            }),
            error: k({}, e, {
              value: ue
            }),
            group: k({}, e, {
              value: le
            }),
            groupCollapsed: k({}, e, {
              value: ce
            }),
            groupEnd: k({}, e, {
              value: fe
            })
          });
        }
        L < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = F.ReactCurrentDispatcher, K;
    function V(e, r, t) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (b) {
            var a = b.stack.trim().match(/\n( *(at )?)/);
            K = a && a[1] || "";
          }
        return `
` + K + e;
      }
    }
    var X = !1, q;
    {
      var Ve = typeof WeakMap == "function" ? WeakMap : Map;
      q = new Ve();
    }
    function ve(e, r) {
      if (!e || X)
        return "";
      {
        var t = q.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      X = !0;
      var b = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var E;
      E = J.current, J.current = null, Be();
      try {
        if (r) {
          var v = function() {
            throw Error();
          };
          if (Object.defineProperty(v.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(v, []);
            } catch (C) {
              a = C;
            }
            Reflect.construct(e, [], v);
          } else {
            try {
              v.call();
            } catch (C) {
              a = C;
            }
            e.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (C) {
            a = C;
          }
          e();
        }
      } catch (C) {
        if (C && a && typeof C.stack == "string") {
          for (var u = C.stack.split(`
`), P = a.stack.split(`
`), x = u.length - 1, _ = P.length - 1; x >= 1 && _ >= 0 && u[x] !== P[_]; )
            _--;
          for (; x >= 1 && _ >= 0; x--, _--)
            if (u[x] !== P[_]) {
              if (x !== 1 || _ !== 1)
                do
                  if (x--, _--, _ < 0 || u[x] !== P[_]) {
                    var O = `
` + u[x].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && q.set(e, O), O;
                  }
                while (x >= 1 && _ >= 0);
              break;
            }
        }
      } finally {
        X = !1, J.current = E, Ue(), Error.prepareStackTrace = b;
      }
      var N = e ? e.displayName || e.name : "", D = N ? V(N) : "";
      return typeof e == "function" && q.set(e, D), D;
    }
    function qe(e, r, t) {
      return ve(e, !1);
    }
    function Ge(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function G(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, Ge(e));
      if (typeof e == "string")
        return V(e);
      switch (e) {
        case n:
          return V("Suspense");
        case d:
          return V("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case s:
            return qe(e.render);
          case y:
            return G(e.type, r, t);
          case R: {
            var a = e, b = a._payload, E = a._init;
            try {
              return G(E(b), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var I = Object.prototype.hasOwnProperty, pe = {}, ge = F.ReactDebugCurrentFrame;
    function z(e) {
      if (e) {
        var r = e._owner, t = G(e.type, e._source, r ? r.type : null);
        ge.setExtraStackFrame(t);
      } else
        ge.setExtraStackFrame(null);
    }
    function ze(e, r, t, a, b) {
      {
        var E = Function.call.bind(I);
        for (var v in e)
          if (E(e, v)) {
            var u = void 0;
            try {
              if (typeof e[v] != "function") {
                var P = Error((a || "React class") + ": " + t + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw P.name = "Invariant Violation", P;
              }
              u = e[v](r, v, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              u = x;
            }
            u && !(u instanceof Error) && (z(b), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, v, typeof u), z(null)), u instanceof Error && !(u.message in pe) && (pe[u.message] = !0, z(b), j("Failed %s type: %s", t, u.message), z(null));
          }
      }
    }
    var Je = Array.isArray;
    function H(e) {
      return Je(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Xe(e) {
      try {
        return he(e), !1;
      } catch {
        return !0;
      }
    }
    function he(e) {
      return "" + e;
    }
    function me(e) {
      if (Xe(e))
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), he(e);
    }
    var be = F.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ee, ye;
    function Ze(e) {
      if (I.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Qe(e) {
      if (I.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function er(e, r) {
      typeof e.ref == "string" && be.current;
    }
    function rr(e, r) {
      {
        var t = function() {
          Ee || (Ee = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var t = function() {
          ye || (ye = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var nr = function(e, r, t, a, b, E, v) {
      var u = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: v,
        // Record the component responsible for creating this element.
        _owner: E
      };
      return u._store = {}, Object.defineProperty(u._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(u, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(u, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.freeze && (Object.freeze(u.props), Object.freeze(u)), u;
    };
    function ar(e, r, t, a, b) {
      {
        var E, v = {}, u = null, P = null;
        t !== void 0 && (me(t), u = "" + t), Qe(r) && (me(r.key), u = "" + r.key), Ze(r) && (P = r.ref, er(r, b));
        for (E in r)
          I.call(r, E) && !He.hasOwnProperty(E) && (v[E] = r[E]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (E in x)
            v[E] === void 0 && (v[E] = x[E]);
        }
        if (u || P) {
          var _ = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          u && rr(v, _), P && tr(v, _);
        }
        return nr(e, u, P, b, a, be.current, v);
      }
    }
    var Z = F.ReactCurrentOwner, xe = F.ReactDebugCurrentFrame;
    function A(e) {
      if (e) {
        var r = e._owner, t = G(e.type, e._source, r ? r.type : null);
        xe.setExtraStackFrame(t);
      } else
        xe.setExtraStackFrame(null);
    }
    var Q;
    Q = !1;
    function ee(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function Re() {
      {
        if (Z.current) {
          var e = S(Z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ir(e) {
      return "";
    }
    var _e = {};
    function sr(e) {
      {
        var r = Re();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function je(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = sr(r);
        if (_e[t])
          return;
        _e[t] = !0;
        var a = "";
        e && e._owner && e._owner !== Z.current && (a = " It was passed a child from " + S(e._owner.type) + "."), A(e), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), A(null);
      }
    }
    function Pe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (H(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            ee(a) && je(a, r);
          }
        else if (ee(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var b = $e(e);
          if (typeof b == "function" && b !== e.entries)
            for (var E = b.call(e), v; !(v = E.next()).done; )
              ee(v.value) && je(v.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === s || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === y))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = S(r);
          ze(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !Q) {
          Q = !0;
          var b = S(r);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", b || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            A(e), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), A(null);
            break;
          }
        }
        e.ref !== null && (A(e), j("Invalid attribute `ref` supplied to `React.Fragment`."), A(null));
      }
    }
    var Te = {};
    function Ce(e, r, t, a, b, E) {
      {
        var v = Ye(e);
        if (!v) {
          var u = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var P = ir();
          P ? u += P : u += Re();
          var x;
          e === null ? x = "null" : H(e) ? x = "array" : e !== void 0 && e.$$typeof === o ? (x = "<" + (S(e.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, u);
        }
        var _ = ar(e, r, t, b, E);
        if (_ == null)
          return _;
        if (v) {
          var O = r.children;
          if (O !== void 0)
            if (a)
              if (H(O)) {
                for (var N = 0; N < O.length; N++)
                  Pe(O[N], e);
                Object.freeze && Object.freeze(O);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Pe(O, e);
        }
        if (I.call(r, "key")) {
          var D = S(e), C = Object.keys(r).filter(function(pr) {
            return pr !== "key";
          }), re = C.length > 0 ? "{key: someKey, " + C.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Te[D + re]) {
            var vr = C.length > 0 ? "{" + C.join(": ..., ") + ": ...}" : "{}";
            j(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, re, D, vr, D), Te[D + re] = !0;
          }
        }
        return e === h ? ur(_) : or(_), _;
      }
    }
    function lr(e, r, t) {
      return Ce(e, r, t, !0);
    }
    function cr(e, r, t) {
      return Ce(e, r, t, !1);
    }
    var fr = cr, dr = lr;
    Y.Fragment = h, Y.jsx = fr, Y.jsxs = dr;
  }()), Y;
}
process.env.NODE_ENV === "production" ? te.exports = mr() : te.exports = br();
var f = te.exports;
const ke = gr(void 0);
function Tr({
  children: l,
  clients: o,
  defaultClient: c
}) {
  const m = {
    clients: o,
    defaultClient: c,
    getClient: (p) => {
      if (p)
        return o[p];
      if (c)
        return o[c];
      const g = Object.keys(o);
      if (g.length === 1)
        return o[g[0]];
    }
  };
  return /* @__PURE__ */ f.jsx(ke.Provider, { value: m, children: l });
}
function U() {
  const l = hr(ke);
  if (l === void 0)
    throw new Error("useSkelegit must be used within a SkelegitProvider");
  return l;
}
function Cr(l, o, c) {
  const { getClient: h } = U(), [m, p] = T(null), [g, i] = T(!0), [s, n] = T(null);
  return M(() => {
    const d = h(c);
    if (!d) {
      n(new Error("No Git client available")), i(!1);
      return;
    }
    i(!0), n(null);
    const y = d.getRepository(l, o);
    B.runPromise(y).then((R) => {
      p(R), i(!1);
    }).catch((R) => {
      n(R), i(!1);
    });
  }, [l, o, c, h]), { repository: m, loading: g, error: s };
}
function Er(l, o) {
  const { getClient: c } = U(), [h, m] = T([]), [p, g] = T(!0), [i, s] = T(null);
  return M(() => {
    const n = c(o);
    if (!n) {
      s(new Error("No Git client available")), g(!1);
      return;
    }
    g(!0), s(null);
    const d = n.listRepositories(l);
    B.runPromise(d).then((y) => {
      m(y), g(!1);
    }).catch((y) => {
      s(y), g(!1);
    });
  }, [l, o, c]), { repositories: h, loading: p, error: i };
}
function Or({
  owner: l,
  clientName: o,
  onRepositorySelect: c,
  className: h = ""
}) {
  const { repositories: m, loading: p, error: g } = Er(l, o);
  return p ? /* @__PURE__ */ f.jsx("div", { className: `p-4 ${h}`, children: "Loading repositories..." }) : g ? /* @__PURE__ */ f.jsxs("div", { className: `p-4 text-red-600 ${h}`, children: [
    "Error loading repositories: ",
    g.message
  ] }) : /* @__PURE__ */ f.jsx("div", { className: `space-y-2 ${h}`, children: m.map((i) => /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: "p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer",
      onClick: () => c == null ? void 0 : c(i),
      children: [
        /* @__PURE__ */ f.jsx("h3", { className: "text-lg font-semibold text-gray-900", children: i.name }),
        i.description && /* @__PURE__ */ f.jsx("p", { className: "text-gray-600 mt-1", children: i.description }),
        /* @__PURE__ */ f.jsxs("div", { className: "flex items-center gap-4 mt-2 text-sm text-gray-500", children: [
          /* @__PURE__ */ f.jsx("span", { children: i.isPrivate ? "🔒 Private" : "🌐 Public" }),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Branch: ",
            i.defaultBranch
          ] }),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Updated: ",
            i.updatedAt.toLocaleDateString()
          ] })
        ] })
      ]
    },
    i.id
  )) });
}
function yr(l, o, c = "open", h) {
  const { getClient: m } = U(), [p, g] = T([]), [i, s] = T(!0), [n, d] = T(null);
  return M(() => {
    const y = m(h);
    if (!y) {
      d(new Error("No Git client available")), s(!1);
      return;
    }
    s(!0), d(null);
    const R = y.listPullRequests(l, o, c);
    B.runPromise(R).then((w) => {
      g(w), s(!1);
    }).catch((w) => {
      d(w), s(!1);
    });
  }, [l, o, c, h, m]), { pullRequests: p, loading: i, error: n };
}
function wr({
  owner: l,
  repo: o,
  state: c = "open",
  clientName: h,
  onPullRequestSelect: m,
  className: p = ""
}) {
  const { pullRequests: g, loading: i, error: s } = yr(l, o, c, h);
  return i ? /* @__PURE__ */ f.jsx("div", { className: `p-4 ${p}`, children: "Loading pull requests..." }) : s ? /* @__PURE__ */ f.jsxs("div", { className: `p-4 text-red-600 ${p}`, children: [
    "Error loading pull requests: ",
    s.message
  ] }) : /* @__PURE__ */ f.jsx("div", { className: `space-y-2 ${p}`, children: g.map((n) => /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: "p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer",
      onClick: () => m == null ? void 0 : m(n),
      children: [
        /* @__PURE__ */ f.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ f.jsxs("h3", { className: "text-lg font-semibold text-gray-900", children: [
            "#",
            n.number,
            " ",
            n.title
          ] }),
          /* @__PURE__ */ f.jsx("span", { className: `px-2 py-1 rounded text-sm ${n.state === "open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: n.state })
        ] }),
        n.description && /* @__PURE__ */ f.jsx("p", { className: "text-gray-600 mt-1", children: n.description }),
        /* @__PURE__ */ f.jsxs("div", { className: "flex items-center gap-4 mt-2 text-sm text-gray-500", children: [
          /* @__PURE__ */ f.jsxs("span", { children: [
            "By ",
            n.author.username
          ] }),
          /* @__PURE__ */ f.jsxs("span", { children: [
            n.sourceBranch,
            " → ",
            n.targetBranch
          ] }),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Updated: ",
            n.updatedAt.toLocaleDateString()
          ] })
        ] })
      ]
    },
    n.id
  )) });
}
function xr(l, o, c = "", h, m) {
  const { getClient: p } = U(), [g, i] = T([]), [s, n] = T(!0), [d, y] = T(null);
  return M(() => {
    const R = p(m);
    if (!R) {
      y(new Error("No Git client available")), n(!1);
      return;
    }
    n(!0), y(null);
    const w = R.listFiles(l, o, c, h);
    B.runPromise(w).then(($) => {
      i($), n(!1);
    }).catch(($) => {
      y($), n(!1);
    });
  }, [l, o, c, h, m, p]), { files: g, loading: s, error: d };
}
function Sr({
  owner: l,
  repo: o,
  path: c = "",
  ref: h,
  clientName: m,
  onFileSelect: p,
  className: g = ""
}) {
  const { files: i, loading: s, error: n } = xr(l, o, c, h, m);
  return s ? /* @__PURE__ */ f.jsx("div", { className: `p-4 ${g}`, children: "Loading files..." }) : n ? /* @__PURE__ */ f.jsxs("div", { className: `p-4 text-red-600 ${g}`, children: [
    "Error loading files: ",
    n.message
  ] }) : /* @__PURE__ */ f.jsx("div", { className: `space-y-1 ${g}`, children: i.map((d) => /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: "flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded",
      onClick: () => p == null ? void 0 : p(d),
      children: [
        /* @__PURE__ */ f.jsx("span", { className: "text-lg", children: d.type === "directory" ? "📁" : "📄" }),
        /* @__PURE__ */ f.jsx("span", { className: "text-gray-900", children: d.name }),
        d.size && /* @__PURE__ */ f.jsx("span", { className: "text-sm text-gray-500 ml-auto", children: Rr(d.size) })
      ]
    },
    d.path
  )) });
}
function Rr(l) {
  const o = ["B", "KB", "MB", "GB"];
  if (l === 0) return "0 B";
  const c = Math.floor(Math.log(l) / Math.log(1024));
  return Math.round(l / Math.pow(1024, c) * 100) / 100 + " " + o[c];
}
function _r(l, o, c) {
  const { getClient: h } = U(), [m, p] = T([]), [g, i] = T(!0), [s, n] = T(null);
  return M(() => {
    const d = h(c);
    if (!d) {
      n(new Error("No Git client available")), i(!1);
      return;
    }
    i(!0), n(null);
    const y = d.listBranches(l, o);
    B.runPromise(y).then((R) => {
      p(R), i(!1);
    }).catch((R) => {
      n(R), i(!1);
    });
  }, [l, o, c, h]), { branches: m, loading: g, error: s };
}
function kr({
  owner: l,
  repo: o,
  currentBranch: c,
  clientName: h,
  onBranchChange: m,
  className: p = ""
}) {
  const { branches: g, loading: i, error: s } = _r(l, o, h);
  return i ? /* @__PURE__ */ f.jsx("div", { className: `p-4 ${p}`, children: "Loading branches..." }) : s ? /* @__PURE__ */ f.jsxs("div", { className: `p-4 text-red-600 ${p}`, children: [
    "Error loading branches: ",
    s.message
  ] }) : /* @__PURE__ */ f.jsxs(
    "select",
    {
      className: `px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${p}`,
      value: c || "",
      onChange: (n) => m == null ? void 0 : m(n.target.value),
      children: [
        /* @__PURE__ */ f.jsx("option", { value: "", children: "Select a branch" }),
        g.map((n) => /* @__PURE__ */ f.jsxs("option", { value: n.name, children: [
          n.name,
          n.isDefault && " (default)",
          n.isProtected && " 🔒"
        ] }, n.name))
      ]
    }
  );
}
export {
  kr as BranchSelector,
  Sr as FileTree,
  wr as PullRequestList,
  Or as RepositoryList,
  Tr as SkelegitProvider,
  _r as useBranches,
  xr as useFiles,
  yr as usePullRequests,
  Er as useRepositories,
  Cr as useRepository,
  U as useSkelegit
};
