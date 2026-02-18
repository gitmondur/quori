import St, { app as kr, BrowserWindow as Ol, dialog as fc } from "electron";
import { fileURLToPath as dc } from "node:url";
import dt from "node:path";
import ht from "fs";
import hc from "constants";
import hr from "stream";
import Qi from "util";
import Il from "assert";
import Ie from "path";
import qr from "child_process";
import Dl from "events";
import pr from "crypto";
import Nl from "tty";
import $r from "os";
import pt from "url";
import Fl from "zlib";
import pc from "http";
var Je = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, _t = {}, Kr = {}, Tr = {}, Sa;
function We() {
  return Sa || (Sa = 1, Tr.fromCallback = function(n) {
    return Object.defineProperty(function(...d) {
      if (typeof d[d.length - 1] == "function") n.apply(this, d);
      else
        return new Promise((m, c) => {
          d.push((f, u) => f != null ? c(f) : m(u)), n.apply(this, d);
        });
    }, "name", { value: n.name });
  }, Tr.fromPromise = function(n) {
    return Object.defineProperty(function(...d) {
      const m = d[d.length - 1];
      if (typeof m != "function") return n.apply(this, d);
      d.pop(), n.apply(this, d).then((c) => m(null, c), m);
    }, "name", { value: n.name });
  }), Tr;
}
var Jr, Ca;
function mc() {
  if (Ca) return Jr;
  Ca = 1;
  var n = hc, d = process.cwd, m = null, c = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return m || (m = d.call(process)), m;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var f = process.chdir;
    process.chdir = function(a) {
      m = null, f.call(process, a);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
  }
  Jr = u;
  function u(a) {
    n.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && l(a), a.lutimes || o(a), a.chown = t(a.chown), a.fchown = t(a.fchown), a.lchown = t(a.lchown), a.chmod = s(a.chmod), a.fchmod = s(a.fchmod), a.lchmod = s(a.lchmod), a.chownSync = r(a.chownSync), a.fchownSync = r(a.fchownSync), a.lchownSync = r(a.lchownSync), a.chmodSync = i(a.chmodSync), a.fchmodSync = i(a.fchmodSync), a.lchmodSync = i(a.lchmodSync), a.stat = h(a.stat), a.fstat = h(a.fstat), a.lstat = h(a.lstat), a.statSync = g(a.statSync), a.fstatSync = g(a.fstatSync), a.lstatSync = g(a.lstatSync), a.chmod && !a.lchmod && (a.lchmod = function(p, w, T) {
      T && process.nextTick(T);
    }, a.lchmodSync = function() {
    }), a.chown && !a.lchown && (a.lchown = function(p, w, T, P) {
      P && process.nextTick(P);
    }, a.lchownSync = function() {
    }), c === "win32" && (a.rename = typeof a.rename != "function" ? a.rename : (function(p) {
      function w(T, P, I) {
        var b = Date.now(), O = 0;
        p(T, P, function S(A) {
          if (A && (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") && Date.now() - b < 6e4) {
            setTimeout(function() {
              a.stat(P, function(v, k) {
                v && v.code === "ENOENT" ? p(T, P, S) : I(A);
              });
            }, O), O < 100 && (O += 10);
            return;
          }
          I && I(A);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, p), w;
    })(a.rename)), a.read = typeof a.read != "function" ? a.read : (function(p) {
      function w(T, P, I, b, O, S) {
        var A;
        if (S && typeof S == "function") {
          var v = 0;
          A = function(k, q, x) {
            if (k && k.code === "EAGAIN" && v < 10)
              return v++, p.call(a, T, P, I, b, O, A);
            S.apply(this, arguments);
          };
        }
        return p.call(a, T, P, I, b, O, A);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(w, p), w;
    })(a.read), a.readSync = typeof a.readSync != "function" ? a.readSync : /* @__PURE__ */ (function(p) {
      return function(w, T, P, I, b) {
        for (var O = 0; ; )
          try {
            return p.call(a, w, T, P, I, b);
          } catch (S) {
            if (S.code === "EAGAIN" && O < 10) {
              O++;
              continue;
            }
            throw S;
          }
      };
    })(a.readSync);
    function l(p) {
      p.lchmod = function(w, T, P) {
        p.open(
          w,
          n.O_WRONLY | n.O_SYMLINK,
          T,
          function(I, b) {
            if (I) {
              P && P(I);
              return;
            }
            p.fchmod(b, T, function(O) {
              p.close(b, function(S) {
                P && P(O || S);
              });
            });
          }
        );
      }, p.lchmodSync = function(w, T) {
        var P = p.openSync(w, n.O_WRONLY | n.O_SYMLINK, T), I = !0, b;
        try {
          b = p.fchmodSync(P, T), I = !1;
        } finally {
          if (I)
            try {
              p.closeSync(P);
            } catch {
            }
          else
            p.closeSync(P);
        }
        return b;
      };
    }
    function o(p) {
      n.hasOwnProperty("O_SYMLINK") && p.futimes ? (p.lutimes = function(w, T, P, I) {
        p.open(w, n.O_SYMLINK, function(b, O) {
          if (b) {
            I && I(b);
            return;
          }
          p.futimes(O, T, P, function(S) {
            p.close(O, function(A) {
              I && I(S || A);
            });
          });
        });
      }, p.lutimesSync = function(w, T, P) {
        var I = p.openSync(w, n.O_SYMLINK), b, O = !0;
        try {
          b = p.futimesSync(I, T, P), O = !1;
        } finally {
          if (O)
            try {
              p.closeSync(I);
            } catch {
            }
          else
            p.closeSync(I);
        }
        return b;
      }) : p.futimes && (p.lutimes = function(w, T, P, I) {
        I && process.nextTick(I);
      }, p.lutimesSync = function() {
      });
    }
    function s(p) {
      return p && function(w, T, P) {
        return p.call(a, w, T, function(I) {
          y(I) && (I = null), P && P.apply(this, arguments);
        });
      };
    }
    function i(p) {
      return p && function(w, T) {
        try {
          return p.call(a, w, T);
        } catch (P) {
          if (!y(P)) throw P;
        }
      };
    }
    function t(p) {
      return p && function(w, T, P, I) {
        return p.call(a, w, T, P, function(b) {
          y(b) && (b = null), I && I.apply(this, arguments);
        });
      };
    }
    function r(p) {
      return p && function(w, T, P) {
        try {
          return p.call(a, w, T, P);
        } catch (I) {
          if (!y(I)) throw I;
        }
      };
    }
    function h(p) {
      return p && function(w, T, P) {
        typeof T == "function" && (P = T, T = null);
        function I(b, O) {
          O && (O.uid < 0 && (O.uid += 4294967296), O.gid < 0 && (O.gid += 4294967296)), P && P.apply(this, arguments);
        }
        return T ? p.call(a, w, T, I) : p.call(a, w, I);
      };
    }
    function g(p) {
      return p && function(w, T) {
        var P = T ? p.call(a, w, T) : p.call(a, w);
        return P && (P.uid < 0 && (P.uid += 4294967296), P.gid < 0 && (P.gid += 4294967296)), P;
      };
    }
    function y(p) {
      if (!p || p.code === "ENOSYS")
        return !0;
      var w = !process.getuid || process.getuid() !== 0;
      return !!(w && (p.code === "EINVAL" || p.code === "EPERM"));
    }
  }
  return Jr;
}
var Qr, ba;
function gc() {
  if (ba) return Qr;
  ba = 1;
  var n = hr.Stream;
  Qr = d;
  function d(m) {
    return {
      ReadStream: c,
      WriteStream: f
    };
    function c(u, a) {
      if (!(this instanceof c)) return new c(u, a);
      n.call(this);
      var l = this;
      this.path = u, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, a = a || {};
      for (var o = Object.keys(a), s = 0, i = o.length; s < i; s++) {
        var t = o[s];
        this[t] = a[t];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          l._read();
        });
        return;
      }
      m.open(this.path, this.flags, this.mode, function(r, h) {
        if (r) {
          l.emit("error", r), l.readable = !1;
          return;
        }
        l.fd = h, l.emit("open", h), l._read();
      });
    }
    function f(u, a) {
      if (!(this instanceof f)) return new f(u, a);
      n.call(this), this.path = u, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, a = a || {};
      for (var l = Object.keys(a), o = 0, s = l.length; o < s; o++) {
        var i = l[o];
        this[i] = a[i];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = m.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Qr;
}
var Zr, Pa;
function vc() {
  if (Pa) return Zr;
  Pa = 1, Zr = d;
  var n = Object.getPrototypeOf || function(m) {
    return m.__proto__;
  };
  function d(m) {
    if (m === null || typeof m != "object")
      return m;
    if (m instanceof Object)
      var c = { __proto__: n(m) };
    else
      var c = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(m).forEach(function(f) {
      Object.defineProperty(c, f, Object.getOwnPropertyDescriptor(m, f));
    }), c;
  }
  return Zr;
}
var Sr, Oa;
function je() {
  if (Oa) return Sr;
  Oa = 1;
  var n = ht, d = mc(), m = gc(), c = vc(), f = Qi, u, a;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (u = /* @__PURE__ */ Symbol.for("graceful-fs.queue"), a = /* @__PURE__ */ Symbol.for("graceful-fs.previous")) : (u = "___graceful-fs.queue", a = "___graceful-fs.previous");
  function l() {
  }
  function o(p, w) {
    Object.defineProperty(p, u, {
      get: function() {
        return w;
      }
    });
  }
  var s = l;
  if (f.debuglog ? s = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (s = function() {
    var p = f.format.apply(f, arguments);
    p = "GFS4: " + p.split(/\n/).join(`
GFS4: `), console.error(p);
  }), !n[u]) {
    var i = Je[u] || [];
    o(n, i), n.close = (function(p) {
      function w(T, P) {
        return p.call(n, T, function(I) {
          I || g(), typeof P == "function" && P.apply(this, arguments);
        });
      }
      return Object.defineProperty(w, a, {
        value: p
      }), w;
    })(n.close), n.closeSync = (function(p) {
      function w(T) {
        p.apply(n, arguments), g();
      }
      return Object.defineProperty(w, a, {
        value: p
      }), w;
    })(n.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      s(n[u]), Il.equal(n[u].length, 0);
    });
  }
  Je[u] || o(Je, n[u]), Sr = t(c(n)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !n.__patched && (Sr = t(n), n.__patched = !0);
  function t(p) {
    d(p), p.gracefulify = t, p.createReadStream = de, p.createWriteStream = ie;
    var w = p.readFile;
    p.readFile = T;
    function T(Q, ge, _) {
      return typeof ge == "function" && (_ = ge, ge = null), E(Q, ge, _);
      function E(H, F, ce, he) {
        return w(H, F, function(pe) {
          pe && (pe.code === "EMFILE" || pe.code === "ENFILE") ? r([E, [H, F, ce], pe, he || Date.now(), Date.now()]) : typeof ce == "function" && ce.apply(this, arguments);
        });
      }
    }
    var P = p.writeFile;
    p.writeFile = I;
    function I(Q, ge, _, E) {
      return typeof _ == "function" && (E = _, _ = null), H(Q, ge, _, E);
      function H(F, ce, he, pe, _e) {
        return P(F, ce, he, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? r([H, [F, ce, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var b = p.appendFile;
    b && (p.appendFile = O);
    function O(Q, ge, _, E) {
      return typeof _ == "function" && (E = _, _ = null), H(Q, ge, _, E);
      function H(F, ce, he, pe, _e) {
        return b(F, ce, he, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? r([H, [F, ce, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var S = p.copyFile;
    S && (p.copyFile = A);
    function A(Q, ge, _, E) {
      return typeof _ == "function" && (E = _, _ = 0), H(Q, ge, _, E);
      function H(F, ce, he, pe, _e) {
        return S(F, ce, he, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? r([H, [F, ce, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var v = p.readdir;
    p.readdir = q;
    var k = /^v[0-5]\./;
    function q(Q, ge, _) {
      typeof ge == "function" && (_ = ge, ge = null);
      var E = k.test(process.version) ? function(ce, he, pe, _e) {
        return v(ce, H(
          ce,
          he,
          pe,
          _e
        ));
      } : function(ce, he, pe, _e) {
        return v(ce, he, H(
          ce,
          he,
          pe,
          _e
        ));
      };
      return E(Q, ge, _);
      function H(F, ce, he, pe) {
        return function(_e, Ee) {
          _e && (_e.code === "EMFILE" || _e.code === "ENFILE") ? r([
            E,
            [F, ce, he],
            _e,
            pe || Date.now(),
            Date.now()
          ]) : (Ee && Ee.sort && Ee.sort(), typeof he == "function" && he.call(this, _e, Ee));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var x = m(p);
      D = x.ReadStream, V = x.WriteStream;
    }
    var $ = p.ReadStream;
    $ && (D.prototype = Object.create($.prototype), D.prototype.open = G);
    var L = p.WriteStream;
    L && (V.prototype = Object.create(L.prototype), V.prototype.open = te), Object.defineProperty(p, "ReadStream", {
      get: function() {
        return D;
      },
      set: function(Q) {
        D = Q;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(p, "WriteStream", {
      get: function() {
        return V;
      },
      set: function(Q) {
        V = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var N = D;
    Object.defineProperty(p, "FileReadStream", {
      get: function() {
        return N;
      },
      set: function(Q) {
        N = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    var j = V;
    Object.defineProperty(p, "FileWriteStream", {
      get: function() {
        return j;
      },
      set: function(Q) {
        j = Q;
      },
      enumerable: !0,
      configurable: !0
    });
    function D(Q, ge) {
      return this instanceof D ? ($.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
    }
    function G() {
      var Q = this;
      ve(Q.path, Q.flags, Q.mode, function(ge, _) {
        ge ? (Q.autoClose && Q.destroy(), Q.emit("error", ge)) : (Q.fd = _, Q.emit("open", _), Q.read());
      });
    }
    function V(Q, ge) {
      return this instanceof V ? (L.apply(this, arguments), this) : V.apply(Object.create(V.prototype), arguments);
    }
    function te() {
      var Q = this;
      ve(Q.path, Q.flags, Q.mode, function(ge, _) {
        ge ? (Q.destroy(), Q.emit("error", ge)) : (Q.fd = _, Q.emit("open", _));
      });
    }
    function de(Q, ge) {
      return new p.ReadStream(Q, ge);
    }
    function ie(Q, ge) {
      return new p.WriteStream(Q, ge);
    }
    var we = p.open;
    p.open = ve;
    function ve(Q, ge, _, E) {
      return typeof _ == "function" && (E = _, _ = null), H(Q, ge, _, E);
      function H(F, ce, he, pe, _e) {
        return we(F, ce, he, function(Ee, He) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? r([H, [F, ce, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    return p;
  }
  function r(p) {
    s("ENQUEUE", p[0].name, p[1]), n[u].push(p), y();
  }
  var h;
  function g() {
    for (var p = Date.now(), w = 0; w < n[u].length; ++w)
      n[u][w].length > 2 && (n[u][w][3] = p, n[u][w][4] = p);
    y();
  }
  function y() {
    if (clearTimeout(h), h = void 0, n[u].length !== 0) {
      var p = n[u].shift(), w = p[0], T = p[1], P = p[2], I = p[3], b = p[4];
      if (I === void 0)
        s("RETRY", w.name, T), w.apply(null, T);
      else if (Date.now() - I >= 6e4) {
        s("TIMEOUT", w.name, T);
        var O = T.pop();
        typeof O == "function" && O.call(null, P);
      } else {
        var S = Date.now() - b, A = Math.max(b - I, 1), v = Math.min(A * 1.2, 100);
        S >= v ? (s("RETRY", w.name, T), w.apply(null, T.concat([I]))) : n[u].push(p);
      }
      h === void 0 && (h = setTimeout(y, 0));
    }
  }
  return Sr;
}
var Ia;
function qt() {
  return Ia || (Ia = 1, (function(n) {
    const d = We().fromCallback, m = je(), c = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((f) => typeof m[f] == "function");
    Object.assign(n, m), c.forEach((f) => {
      n[f] = d(m[f]);
    }), n.exists = function(f, u) {
      return typeof u == "function" ? m.exists(f, u) : new Promise((a) => m.exists(f, a));
    }, n.read = function(f, u, a, l, o, s) {
      return typeof s == "function" ? m.read(f, u, a, l, o, s) : new Promise((i, t) => {
        m.read(f, u, a, l, o, (r, h, g) => {
          if (r) return t(r);
          i({ bytesRead: h, buffer: g });
        });
      });
    }, n.write = function(f, u, ...a) {
      return typeof a[a.length - 1] == "function" ? m.write(f, u, ...a) : new Promise((l, o) => {
        m.write(f, u, ...a, (s, i, t) => {
          if (s) return o(s);
          l({ bytesWritten: i, buffer: t });
        });
      });
    }, typeof m.writev == "function" && (n.writev = function(f, u, ...a) {
      return typeof a[a.length - 1] == "function" ? m.writev(f, u, ...a) : new Promise((l, o) => {
        m.writev(f, u, ...a, (s, i, t) => {
          if (s) return o(s);
          l({ bytesWritten: i, buffers: t });
        });
      });
    }), typeof m.realpath.native == "function" ? n.realpath.native = d(m.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(Kr)), Kr;
}
var Cr = {}, en = {}, Da;
function Ec() {
  if (Da) return en;
  Da = 1;
  const n = Ie;
  return en.checkPath = function(m) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(m.replace(n.parse(m).root, ""))) {
      const f = new Error(`Path contains invalid characters: ${m}`);
      throw f.code = "EINVAL", f;
    }
  }, en;
}
var Na;
function yc() {
  if (Na) return Cr;
  Na = 1;
  const n = /* @__PURE__ */ qt(), { checkPath: d } = /* @__PURE__ */ Ec(), m = (c) => {
    const f = { mode: 511 };
    return typeof c == "number" ? c : { ...f, ...c }.mode;
  };
  return Cr.makeDir = async (c, f) => (d(c), n.mkdir(c, {
    mode: m(f),
    recursive: !0
  })), Cr.makeDirSync = (c, f) => (d(c), n.mkdirSync(c, {
    mode: m(f),
    recursive: !0
  })), Cr;
}
var tn, Fa;
function tt() {
  if (Fa) return tn;
  Fa = 1;
  const n = We().fromPromise, { makeDir: d, makeDirSync: m } = /* @__PURE__ */ yc(), c = n(d);
  return tn = {
    mkdirs: c,
    mkdirsSync: m,
    // alias
    mkdirp: c,
    mkdirpSync: m,
    ensureDir: c,
    ensureDirSync: m
  }, tn;
}
var rn, La;
function Ct() {
  if (La) return rn;
  La = 1;
  const n = We().fromPromise, d = /* @__PURE__ */ qt();
  function m(c) {
    return d.access(c).then(() => !0).catch(() => !1);
  }
  return rn = {
    pathExists: n(m),
    pathExistsSync: d.existsSync
  }, rn;
}
var nn, xa;
function Ll() {
  if (xa) return nn;
  xa = 1;
  const n = je();
  function d(c, f, u, a) {
    n.open(c, "r+", (l, o) => {
      if (l) return a(l);
      n.futimes(o, f, u, (s) => {
        n.close(o, (i) => {
          a && a(s || i);
        });
      });
    });
  }
  function m(c, f, u) {
    const a = n.openSync(c, "r+");
    return n.futimesSync(a, f, u), n.closeSync(a);
  }
  return nn = {
    utimesMillis: d,
    utimesMillisSync: m
  }, nn;
}
var an, Ua;
function $t() {
  if (Ua) return an;
  Ua = 1;
  const n = /* @__PURE__ */ qt(), d = Ie, m = Qi;
  function c(r, h, g) {
    const y = g.dereference ? (p) => n.stat(p, { bigint: !0 }) : (p) => n.lstat(p, { bigint: !0 });
    return Promise.all([
      y(r),
      y(h).catch((p) => {
        if (p.code === "ENOENT") return null;
        throw p;
      })
    ]).then(([p, w]) => ({ srcStat: p, destStat: w }));
  }
  function f(r, h, g) {
    let y;
    const p = g.dereference ? (T) => n.statSync(T, { bigint: !0 }) : (T) => n.lstatSync(T, { bigint: !0 }), w = p(r);
    try {
      y = p(h);
    } catch (T) {
      if (T.code === "ENOENT") return { srcStat: w, destStat: null };
      throw T;
    }
    return { srcStat: w, destStat: y };
  }
  function u(r, h, g, y, p) {
    m.callbackify(c)(r, h, y, (w, T) => {
      if (w) return p(w);
      const { srcStat: P, destStat: I } = T;
      if (I) {
        if (s(P, I)) {
          const b = d.basename(r), O = d.basename(h);
          return g === "move" && b !== O && b.toLowerCase() === O.toLowerCase() ? p(null, { srcStat: P, destStat: I, isChangingCase: !0 }) : p(new Error("Source and destination must not be the same."));
        }
        if (P.isDirectory() && !I.isDirectory())
          return p(new Error(`Cannot overwrite non-directory '${h}' with directory '${r}'.`));
        if (!P.isDirectory() && I.isDirectory())
          return p(new Error(`Cannot overwrite directory '${h}' with non-directory '${r}'.`));
      }
      return P.isDirectory() && i(r, h) ? p(new Error(t(r, h, g))) : p(null, { srcStat: P, destStat: I });
    });
  }
  function a(r, h, g, y) {
    const { srcStat: p, destStat: w } = f(r, h, y);
    if (w) {
      if (s(p, w)) {
        const T = d.basename(r), P = d.basename(h);
        if (g === "move" && T !== P && T.toLowerCase() === P.toLowerCase())
          return { srcStat: p, destStat: w, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (p.isDirectory() && !w.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${h}' with directory '${r}'.`);
      if (!p.isDirectory() && w.isDirectory())
        throw new Error(`Cannot overwrite directory '${h}' with non-directory '${r}'.`);
    }
    if (p.isDirectory() && i(r, h))
      throw new Error(t(r, h, g));
    return { srcStat: p, destStat: w };
  }
  function l(r, h, g, y, p) {
    const w = d.resolve(d.dirname(r)), T = d.resolve(d.dirname(g));
    if (T === w || T === d.parse(T).root) return p();
    n.stat(T, { bigint: !0 }, (P, I) => P ? P.code === "ENOENT" ? p() : p(P) : s(h, I) ? p(new Error(t(r, g, y))) : l(r, h, T, y, p));
  }
  function o(r, h, g, y) {
    const p = d.resolve(d.dirname(r)), w = d.resolve(d.dirname(g));
    if (w === p || w === d.parse(w).root) return;
    let T;
    try {
      T = n.statSync(w, { bigint: !0 });
    } catch (P) {
      if (P.code === "ENOENT") return;
      throw P;
    }
    if (s(h, T))
      throw new Error(t(r, g, y));
    return o(r, h, w, y);
  }
  function s(r, h) {
    return h.ino && h.dev && h.ino === r.ino && h.dev === r.dev;
  }
  function i(r, h) {
    const g = d.resolve(r).split(d.sep).filter((p) => p), y = d.resolve(h).split(d.sep).filter((p) => p);
    return g.reduce((p, w, T) => p && y[T] === w, !0);
  }
  function t(r, h, g) {
    return `Cannot ${g} '${r}' to a subdirectory of itself, '${h}'.`;
  }
  return an = {
    checkPaths: u,
    checkPathsSync: a,
    checkParentPaths: l,
    checkParentPathsSync: o,
    isSrcSubdir: i,
    areIdentical: s
  }, an;
}
var on, ka;
function wc() {
  if (ka) return on;
  ka = 1;
  const n = je(), d = Ie, m = tt().mkdirs, c = Ct().pathExists, f = Ll().utimesMillis, u = /* @__PURE__ */ $t();
  function a(q, x, $, L) {
    typeof $ == "function" && !L ? (L = $, $ = {}) : typeof $ == "function" && ($ = { filter: $ }), L = L || function() {
    }, $ = $ || {}, $.clobber = "clobber" in $ ? !!$.clobber : !0, $.overwrite = "overwrite" in $ ? !!$.overwrite : $.clobber, $.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), u.checkPaths(q, x, "copy", $, (N, j) => {
      if (N) return L(N);
      const { srcStat: D, destStat: G } = j;
      u.checkParentPaths(q, D, x, "copy", (V) => V ? L(V) : $.filter ? o(l, G, q, x, $, L) : l(G, q, x, $, L));
    });
  }
  function l(q, x, $, L, N) {
    const j = d.dirname($);
    c(j, (D, G) => {
      if (D) return N(D);
      if (G) return i(q, x, $, L, N);
      m(j, (V) => V ? N(V) : i(q, x, $, L, N));
    });
  }
  function o(q, x, $, L, N, j) {
    Promise.resolve(N.filter($, L)).then((D) => D ? q(x, $, L, N, j) : j(), (D) => j(D));
  }
  function s(q, x, $, L, N) {
    return L.filter ? o(i, q, x, $, L, N) : i(q, x, $, L, N);
  }
  function i(q, x, $, L, N) {
    (L.dereference ? n.stat : n.lstat)(x, (D, G) => D ? N(D) : G.isDirectory() ? I(G, q, x, $, L, N) : G.isFile() || G.isCharacterDevice() || G.isBlockDevice() ? t(G, q, x, $, L, N) : G.isSymbolicLink() ? v(q, x, $, L, N) : G.isSocket() ? N(new Error(`Cannot copy a socket file: ${x}`)) : G.isFIFO() ? N(new Error(`Cannot copy a FIFO pipe: ${x}`)) : N(new Error(`Unknown file: ${x}`)));
  }
  function t(q, x, $, L, N, j) {
    return x ? r(q, $, L, N, j) : h(q, $, L, N, j);
  }
  function r(q, x, $, L, N) {
    if (L.overwrite)
      n.unlink($, (j) => j ? N(j) : h(q, x, $, L, N));
    else return L.errorOnExist ? N(new Error(`'${$}' already exists`)) : N();
  }
  function h(q, x, $, L, N) {
    n.copyFile(x, $, (j) => j ? N(j) : L.preserveTimestamps ? g(q.mode, x, $, N) : T($, q.mode, N));
  }
  function g(q, x, $, L) {
    return y(q) ? p($, q, (N) => N ? L(N) : w(q, x, $, L)) : w(q, x, $, L);
  }
  function y(q) {
    return (q & 128) === 0;
  }
  function p(q, x, $) {
    return T(q, x | 128, $);
  }
  function w(q, x, $, L) {
    P(x, $, (N) => N ? L(N) : T($, q, L));
  }
  function T(q, x, $) {
    return n.chmod(q, x, $);
  }
  function P(q, x, $) {
    n.stat(q, (L, N) => L ? $(L) : f(x, N.atime, N.mtime, $));
  }
  function I(q, x, $, L, N, j) {
    return x ? O($, L, N, j) : b(q.mode, $, L, N, j);
  }
  function b(q, x, $, L, N) {
    n.mkdir($, (j) => {
      if (j) return N(j);
      O(x, $, L, (D) => D ? N(D) : T($, q, N));
    });
  }
  function O(q, x, $, L) {
    n.readdir(q, (N, j) => N ? L(N) : S(j, q, x, $, L));
  }
  function S(q, x, $, L, N) {
    const j = q.pop();
    return j ? A(q, j, x, $, L, N) : N();
  }
  function A(q, x, $, L, N, j) {
    const D = d.join($, x), G = d.join(L, x);
    u.checkPaths(D, G, "copy", N, (V, te) => {
      if (V) return j(V);
      const { destStat: de } = te;
      s(de, D, G, N, (ie) => ie ? j(ie) : S(q, $, L, N, j));
    });
  }
  function v(q, x, $, L, N) {
    n.readlink(x, (j, D) => {
      if (j) return N(j);
      if (L.dereference && (D = d.resolve(process.cwd(), D)), q)
        n.readlink($, (G, V) => G ? G.code === "EINVAL" || G.code === "UNKNOWN" ? n.symlink(D, $, N) : N(G) : (L.dereference && (V = d.resolve(process.cwd(), V)), u.isSrcSubdir(D, V) ? N(new Error(`Cannot copy '${D}' to a subdirectory of itself, '${V}'.`)) : q.isDirectory() && u.isSrcSubdir(V, D) ? N(new Error(`Cannot overwrite '${V}' with '${D}'.`)) : k(D, $, N)));
      else
        return n.symlink(D, $, N);
    });
  }
  function k(q, x, $) {
    n.unlink(x, (L) => L ? $(L) : n.symlink(q, x, $));
  }
  return on = a, on;
}
var sn, qa;
function _c() {
  if (qa) return sn;
  qa = 1;
  const n = je(), d = Ie, m = tt().mkdirsSync, c = Ll().utimesMillisSync, f = /* @__PURE__ */ $t();
  function u(S, A, v) {
    typeof v == "function" && (v = { filter: v }), v = v || {}, v.clobber = "clobber" in v ? !!v.clobber : !0, v.overwrite = "overwrite" in v ? !!v.overwrite : v.clobber, v.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: k, destStat: q } = f.checkPathsSync(S, A, "copy", v);
    return f.checkParentPathsSync(S, k, A, "copy"), a(q, S, A, v);
  }
  function a(S, A, v, k) {
    if (k.filter && !k.filter(A, v)) return;
    const q = d.dirname(v);
    return n.existsSync(q) || m(q), o(S, A, v, k);
  }
  function l(S, A, v, k) {
    if (!(k.filter && !k.filter(A, v)))
      return o(S, A, v, k);
  }
  function o(S, A, v, k) {
    const x = (k.dereference ? n.statSync : n.lstatSync)(A);
    if (x.isDirectory()) return w(x, S, A, v, k);
    if (x.isFile() || x.isCharacterDevice() || x.isBlockDevice()) return s(x, S, A, v, k);
    if (x.isSymbolicLink()) return b(S, A, v, k);
    throw x.isSocket() ? new Error(`Cannot copy a socket file: ${A}`) : x.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${A}`) : new Error(`Unknown file: ${A}`);
  }
  function s(S, A, v, k, q) {
    return A ? i(S, v, k, q) : t(S, v, k, q);
  }
  function i(S, A, v, k) {
    if (k.overwrite)
      return n.unlinkSync(v), t(S, A, v, k);
    if (k.errorOnExist)
      throw new Error(`'${v}' already exists`);
  }
  function t(S, A, v, k) {
    return n.copyFileSync(A, v), k.preserveTimestamps && r(S.mode, A, v), y(v, S.mode);
  }
  function r(S, A, v) {
    return h(S) && g(v, S), p(A, v);
  }
  function h(S) {
    return (S & 128) === 0;
  }
  function g(S, A) {
    return y(S, A | 128);
  }
  function y(S, A) {
    return n.chmodSync(S, A);
  }
  function p(S, A) {
    const v = n.statSync(S);
    return c(A, v.atime, v.mtime);
  }
  function w(S, A, v, k, q) {
    return A ? P(v, k, q) : T(S.mode, v, k, q);
  }
  function T(S, A, v, k) {
    return n.mkdirSync(v), P(A, v, k), y(v, S);
  }
  function P(S, A, v) {
    n.readdirSync(S).forEach((k) => I(k, S, A, v));
  }
  function I(S, A, v, k) {
    const q = d.join(A, S), x = d.join(v, S), { destStat: $ } = f.checkPathsSync(q, x, "copy", k);
    return l($, q, x, k);
  }
  function b(S, A, v, k) {
    let q = n.readlinkSync(A);
    if (k.dereference && (q = d.resolve(process.cwd(), q)), S) {
      let x;
      try {
        x = n.readlinkSync(v);
      } catch ($) {
        if ($.code === "EINVAL" || $.code === "UNKNOWN") return n.symlinkSync(q, v);
        throw $;
      }
      if (k.dereference && (x = d.resolve(process.cwd(), x)), f.isSrcSubdir(q, x))
        throw new Error(`Cannot copy '${q}' to a subdirectory of itself, '${x}'.`);
      if (n.statSync(v).isDirectory() && f.isSrcSubdir(x, q))
        throw new Error(`Cannot overwrite '${x}' with '${q}'.`);
      return O(q, v);
    } else
      return n.symlinkSync(q, v);
  }
  function O(S, A) {
    return n.unlinkSync(A), n.symlinkSync(S, A);
  }
  return sn = u, sn;
}
var ln, $a;
function Zi() {
  if ($a) return ln;
  $a = 1;
  const n = We().fromCallback;
  return ln = {
    copy: n(/* @__PURE__ */ wc()),
    copySync: /* @__PURE__ */ _c()
  }, ln;
}
var un, Ma;
function Rc() {
  if (Ma) return un;
  Ma = 1;
  const n = je(), d = Ie, m = Il, c = process.platform === "win32";
  function f(g) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((p) => {
      g[p] = g[p] || n[p], p = p + "Sync", g[p] = g[p] || n[p];
    }), g.maxBusyTries = g.maxBusyTries || 3;
  }
  function u(g, y, p) {
    let w = 0;
    typeof y == "function" && (p = y, y = {}), m(g, "rimraf: missing path"), m.strictEqual(typeof g, "string", "rimraf: path should be a string"), m.strictEqual(typeof p, "function", "rimraf: callback function required"), m(y, "rimraf: invalid options argument provided"), m.strictEqual(typeof y, "object", "rimraf: options should be object"), f(y), a(g, y, function T(P) {
      if (P) {
        if ((P.code === "EBUSY" || P.code === "ENOTEMPTY" || P.code === "EPERM") && w < y.maxBusyTries) {
          w++;
          const I = w * 100;
          return setTimeout(() => a(g, y, T), I);
        }
        P.code === "ENOENT" && (P = null);
      }
      p(P);
    });
  }
  function a(g, y, p) {
    m(g), m(y), m(typeof p == "function"), y.lstat(g, (w, T) => {
      if (w && w.code === "ENOENT")
        return p(null);
      if (w && w.code === "EPERM" && c)
        return l(g, y, w, p);
      if (T && T.isDirectory())
        return s(g, y, w, p);
      y.unlink(g, (P) => {
        if (P) {
          if (P.code === "ENOENT")
            return p(null);
          if (P.code === "EPERM")
            return c ? l(g, y, P, p) : s(g, y, P, p);
          if (P.code === "EISDIR")
            return s(g, y, P, p);
        }
        return p(P);
      });
    });
  }
  function l(g, y, p, w) {
    m(g), m(y), m(typeof w == "function"), y.chmod(g, 438, (T) => {
      T ? w(T.code === "ENOENT" ? null : p) : y.stat(g, (P, I) => {
        P ? w(P.code === "ENOENT" ? null : p) : I.isDirectory() ? s(g, y, p, w) : y.unlink(g, w);
      });
    });
  }
  function o(g, y, p) {
    let w;
    m(g), m(y);
    try {
      y.chmodSync(g, 438);
    } catch (T) {
      if (T.code === "ENOENT")
        return;
      throw p;
    }
    try {
      w = y.statSync(g);
    } catch (T) {
      if (T.code === "ENOENT")
        return;
      throw p;
    }
    w.isDirectory() ? r(g, y, p) : y.unlinkSync(g);
  }
  function s(g, y, p, w) {
    m(g), m(y), m(typeof w == "function"), y.rmdir(g, (T) => {
      T && (T.code === "ENOTEMPTY" || T.code === "EEXIST" || T.code === "EPERM") ? i(g, y, w) : T && T.code === "ENOTDIR" ? w(p) : w(T);
    });
  }
  function i(g, y, p) {
    m(g), m(y), m(typeof p == "function"), y.readdir(g, (w, T) => {
      if (w) return p(w);
      let P = T.length, I;
      if (P === 0) return y.rmdir(g, p);
      T.forEach((b) => {
        u(d.join(g, b), y, (O) => {
          if (!I) {
            if (O) return p(I = O);
            --P === 0 && y.rmdir(g, p);
          }
        });
      });
    });
  }
  function t(g, y) {
    let p;
    y = y || {}, f(y), m(g, "rimraf: missing path"), m.strictEqual(typeof g, "string", "rimraf: path should be a string"), m(y, "rimraf: missing options"), m.strictEqual(typeof y, "object", "rimraf: options should be object");
    try {
      p = y.lstatSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      w.code === "EPERM" && c && o(g, y, w);
    }
    try {
      p && p.isDirectory() ? r(g, y, null) : y.unlinkSync(g);
    } catch (w) {
      if (w.code === "ENOENT")
        return;
      if (w.code === "EPERM")
        return c ? o(g, y, w) : r(g, y, w);
      if (w.code !== "EISDIR")
        throw w;
      r(g, y, w);
    }
  }
  function r(g, y, p) {
    m(g), m(y);
    try {
      y.rmdirSync(g);
    } catch (w) {
      if (w.code === "ENOTDIR")
        throw p;
      if (w.code === "ENOTEMPTY" || w.code === "EEXIST" || w.code === "EPERM")
        h(g, y);
      else if (w.code !== "ENOENT")
        throw w;
    }
  }
  function h(g, y) {
    if (m(g), m(y), y.readdirSync(g).forEach((p) => t(d.join(g, p), y)), c) {
      const p = Date.now();
      do
        try {
          return y.rmdirSync(g, y);
        } catch {
        }
      while (Date.now() - p < 500);
    } else
      return y.rmdirSync(g, y);
  }
  return un = u, u.sync = t, un;
}
var cn, Ba;
function Mr() {
  if (Ba) return cn;
  Ba = 1;
  const n = je(), d = We().fromCallback, m = /* @__PURE__ */ Rc();
  function c(u, a) {
    if (n.rm) return n.rm(u, { recursive: !0, force: !0 }, a);
    m(u, a);
  }
  function f(u) {
    if (n.rmSync) return n.rmSync(u, { recursive: !0, force: !0 });
    m.sync(u);
  }
  return cn = {
    remove: d(c),
    removeSync: f
  }, cn;
}
var fn, Ha;
function Ac() {
  if (Ha) return fn;
  Ha = 1;
  const n = We().fromPromise, d = /* @__PURE__ */ qt(), m = Ie, c = /* @__PURE__ */ tt(), f = /* @__PURE__ */ Mr(), u = n(async function(o) {
    let s;
    try {
      s = await d.readdir(o);
    } catch {
      return c.mkdirs(o);
    }
    return Promise.all(s.map((i) => f.remove(m.join(o, i))));
  });
  function a(l) {
    let o;
    try {
      o = d.readdirSync(l);
    } catch {
      return c.mkdirsSync(l);
    }
    o.forEach((s) => {
      s = m.join(l, s), f.removeSync(s);
    });
  }
  return fn = {
    emptyDirSync: a,
    emptydirSync: a,
    emptyDir: u,
    emptydir: u
  }, fn;
}
var dn, ja;
function Tc() {
  if (ja) return dn;
  ja = 1;
  const n = We().fromCallback, d = Ie, m = je(), c = /* @__PURE__ */ tt();
  function f(a, l) {
    function o() {
      m.writeFile(a, "", (s) => {
        if (s) return l(s);
        l();
      });
    }
    m.stat(a, (s, i) => {
      if (!s && i.isFile()) return l();
      const t = d.dirname(a);
      m.stat(t, (r, h) => {
        if (r)
          return r.code === "ENOENT" ? c.mkdirs(t, (g) => {
            if (g) return l(g);
            o();
          }) : l(r);
        h.isDirectory() ? o() : m.readdir(t, (g) => {
          if (g) return l(g);
        });
      });
    });
  }
  function u(a) {
    let l;
    try {
      l = m.statSync(a);
    } catch {
    }
    if (l && l.isFile()) return;
    const o = d.dirname(a);
    try {
      m.statSync(o).isDirectory() || m.readdirSync(o);
    } catch (s) {
      if (s && s.code === "ENOENT") c.mkdirsSync(o);
      else throw s;
    }
    m.writeFileSync(a, "");
  }
  return dn = {
    createFile: n(f),
    createFileSync: u
  }, dn;
}
var hn, Ga;
function Sc() {
  if (Ga) return hn;
  Ga = 1;
  const n = We().fromCallback, d = Ie, m = je(), c = /* @__PURE__ */ tt(), f = Ct().pathExists, { areIdentical: u } = /* @__PURE__ */ $t();
  function a(o, s, i) {
    function t(r, h) {
      m.link(r, h, (g) => {
        if (g) return i(g);
        i(null);
      });
    }
    m.lstat(s, (r, h) => {
      m.lstat(o, (g, y) => {
        if (g)
          return g.message = g.message.replace("lstat", "ensureLink"), i(g);
        if (h && u(y, h)) return i(null);
        const p = d.dirname(s);
        f(p, (w, T) => {
          if (w) return i(w);
          if (T) return t(o, s);
          c.mkdirs(p, (P) => {
            if (P) return i(P);
            t(o, s);
          });
        });
      });
    });
  }
  function l(o, s) {
    let i;
    try {
      i = m.lstatSync(s);
    } catch {
    }
    try {
      const h = m.lstatSync(o);
      if (i && u(h, i)) return;
    } catch (h) {
      throw h.message = h.message.replace("lstat", "ensureLink"), h;
    }
    const t = d.dirname(s);
    return m.existsSync(t) || c.mkdirsSync(t), m.linkSync(o, s);
  }
  return hn = {
    createLink: n(a),
    createLinkSync: l
  }, hn;
}
var pn, Wa;
function Cc() {
  if (Wa) return pn;
  Wa = 1;
  const n = Ie, d = je(), m = Ct().pathExists;
  function c(u, a, l) {
    if (n.isAbsolute(u))
      return d.lstat(u, (o) => o ? (o.message = o.message.replace("lstat", "ensureSymlink"), l(o)) : l(null, {
        toCwd: u,
        toDst: u
      }));
    {
      const o = n.dirname(a), s = n.join(o, u);
      return m(s, (i, t) => i ? l(i) : t ? l(null, {
        toCwd: s,
        toDst: u
      }) : d.lstat(u, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), l(r)) : l(null, {
        toCwd: u,
        toDst: n.relative(o, u)
      })));
    }
  }
  function f(u, a) {
    let l;
    if (n.isAbsolute(u)) {
      if (l = d.existsSync(u), !l) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: u,
        toDst: u
      };
    } else {
      const o = n.dirname(a), s = n.join(o, u);
      if (l = d.existsSync(s), l)
        return {
          toCwd: s,
          toDst: u
        };
      if (l = d.existsSync(u), !l) throw new Error("relative srcpath does not exist");
      return {
        toCwd: u,
        toDst: n.relative(o, u)
      };
    }
  }
  return pn = {
    symlinkPaths: c,
    symlinkPathsSync: f
  }, pn;
}
var mn, Va;
function bc() {
  if (Va) return mn;
  Va = 1;
  const n = je();
  function d(c, f, u) {
    if (u = typeof f == "function" ? f : u, f = typeof f == "function" ? !1 : f, f) return u(null, f);
    n.lstat(c, (a, l) => {
      if (a) return u(null, "file");
      f = l && l.isDirectory() ? "dir" : "file", u(null, f);
    });
  }
  function m(c, f) {
    let u;
    if (f) return f;
    try {
      u = n.lstatSync(c);
    } catch {
      return "file";
    }
    return u && u.isDirectory() ? "dir" : "file";
  }
  return mn = {
    symlinkType: d,
    symlinkTypeSync: m
  }, mn;
}
var gn, Ya;
function Pc() {
  if (Ya) return gn;
  Ya = 1;
  const n = We().fromCallback, d = Ie, m = /* @__PURE__ */ qt(), c = /* @__PURE__ */ tt(), f = c.mkdirs, u = c.mkdirsSync, a = /* @__PURE__ */ Cc(), l = a.symlinkPaths, o = a.symlinkPathsSync, s = /* @__PURE__ */ bc(), i = s.symlinkType, t = s.symlinkTypeSync, r = Ct().pathExists, { areIdentical: h } = /* @__PURE__ */ $t();
  function g(w, T, P, I) {
    I = typeof P == "function" ? P : I, P = typeof P == "function" ? !1 : P, m.lstat(T, (b, O) => {
      !b && O.isSymbolicLink() ? Promise.all([
        m.stat(w),
        m.stat(T)
      ]).then(([S, A]) => {
        if (h(S, A)) return I(null);
        y(w, T, P, I);
      }) : y(w, T, P, I);
    });
  }
  function y(w, T, P, I) {
    l(w, T, (b, O) => {
      if (b) return I(b);
      w = O.toDst, i(O.toCwd, P, (S, A) => {
        if (S) return I(S);
        const v = d.dirname(T);
        r(v, (k, q) => {
          if (k) return I(k);
          if (q) return m.symlink(w, T, A, I);
          f(v, (x) => {
            if (x) return I(x);
            m.symlink(w, T, A, I);
          });
        });
      });
    });
  }
  function p(w, T, P) {
    let I;
    try {
      I = m.lstatSync(T);
    } catch {
    }
    if (I && I.isSymbolicLink()) {
      const A = m.statSync(w), v = m.statSync(T);
      if (h(A, v)) return;
    }
    const b = o(w, T);
    w = b.toDst, P = t(b.toCwd, P);
    const O = d.dirname(T);
    return m.existsSync(O) || u(O), m.symlinkSync(w, T, P);
  }
  return gn = {
    createSymlink: n(g),
    createSymlinkSync: p
  }, gn;
}
var vn, za;
function Oc() {
  if (za) return vn;
  za = 1;
  const { createFile: n, createFileSync: d } = /* @__PURE__ */ Tc(), { createLink: m, createLinkSync: c } = /* @__PURE__ */ Sc(), { createSymlink: f, createSymlinkSync: u } = /* @__PURE__ */ Pc();
  return vn = {
    // file
    createFile: n,
    createFileSync: d,
    ensureFile: n,
    ensureFileSync: d,
    // link
    createLink: m,
    createLinkSync: c,
    ensureLink: m,
    ensureLinkSync: c,
    // symlink
    createSymlink: f,
    createSymlinkSync: u,
    ensureSymlink: f,
    ensureSymlinkSync: u
  }, vn;
}
var En, Xa;
function ea() {
  if (Xa) return En;
  Xa = 1;
  function n(m, { EOL: c = `
`, finalEOL: f = !0, replacer: u = null, spaces: a } = {}) {
    const l = f ? c : "";
    return JSON.stringify(m, u, a).replace(/\n/g, c) + l;
  }
  function d(m) {
    return Buffer.isBuffer(m) && (m = m.toString("utf8")), m.replace(/^\uFEFF/, "");
  }
  return En = { stringify: n, stripBom: d }, En;
}
var yn, Ka;
function Ic() {
  if (Ka) return yn;
  Ka = 1;
  let n;
  try {
    n = je();
  } catch {
    n = ht;
  }
  const d = We(), { stringify: m, stripBom: c } = ea();
  async function f(i, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const r = t.fs || n, h = "throws" in t ? t.throws : !0;
    let g = await d.fromCallback(r.readFile)(i, t);
    g = c(g);
    let y;
    try {
      y = JSON.parse(g, t ? t.reviver : null);
    } catch (p) {
      if (h)
        throw p.message = `${i}: ${p.message}`, p;
      return null;
    }
    return y;
  }
  const u = d.fromPromise(f);
  function a(i, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const r = t.fs || n, h = "throws" in t ? t.throws : !0;
    try {
      let g = r.readFileSync(i, t);
      return g = c(g), JSON.parse(g, t.reviver);
    } catch (g) {
      if (h)
        throw g.message = `${i}: ${g.message}`, g;
      return null;
    }
  }
  async function l(i, t, r = {}) {
    const h = r.fs || n, g = m(t, r);
    await d.fromCallback(h.writeFile)(i, g, r);
  }
  const o = d.fromPromise(l);
  function s(i, t, r = {}) {
    const h = r.fs || n, g = m(t, r);
    return h.writeFileSync(i, g, r);
  }
  return yn = {
    readFile: u,
    readFileSync: a,
    writeFile: o,
    writeFileSync: s
  }, yn;
}
var wn, Ja;
function Dc() {
  if (Ja) return wn;
  Ja = 1;
  const n = Ic();
  return wn = {
    // jsonfile exports
    readJson: n.readFile,
    readJsonSync: n.readFileSync,
    writeJson: n.writeFile,
    writeJsonSync: n.writeFileSync
  }, wn;
}
var _n, Qa;
function ta() {
  if (Qa) return _n;
  Qa = 1;
  const n = We().fromCallback, d = je(), m = Ie, c = /* @__PURE__ */ tt(), f = Ct().pathExists;
  function u(l, o, s, i) {
    typeof s == "function" && (i = s, s = "utf8");
    const t = m.dirname(l);
    f(t, (r, h) => {
      if (r) return i(r);
      if (h) return d.writeFile(l, o, s, i);
      c.mkdirs(t, (g) => {
        if (g) return i(g);
        d.writeFile(l, o, s, i);
      });
    });
  }
  function a(l, ...o) {
    const s = m.dirname(l);
    if (d.existsSync(s))
      return d.writeFileSync(l, ...o);
    c.mkdirsSync(s), d.writeFileSync(l, ...o);
  }
  return _n = {
    outputFile: n(u),
    outputFileSync: a
  }, _n;
}
var Rn, Za;
function Nc() {
  if (Za) return Rn;
  Za = 1;
  const { stringify: n } = ea(), { outputFile: d } = /* @__PURE__ */ ta();
  async function m(c, f, u = {}) {
    const a = n(f, u);
    await d(c, a, u);
  }
  return Rn = m, Rn;
}
var An, eo;
function Fc() {
  if (eo) return An;
  eo = 1;
  const { stringify: n } = ea(), { outputFileSync: d } = /* @__PURE__ */ ta();
  function m(c, f, u) {
    const a = n(f, u);
    d(c, a, u);
  }
  return An = m, An;
}
var Tn, to;
function Lc() {
  if (to) return Tn;
  to = 1;
  const n = We().fromPromise, d = /* @__PURE__ */ Dc();
  return d.outputJson = n(/* @__PURE__ */ Nc()), d.outputJsonSync = /* @__PURE__ */ Fc(), d.outputJSON = d.outputJson, d.outputJSONSync = d.outputJsonSync, d.writeJSON = d.writeJson, d.writeJSONSync = d.writeJsonSync, d.readJSON = d.readJson, d.readJSONSync = d.readJsonSync, Tn = d, Tn;
}
var Sn, ro;
function xc() {
  if (ro) return Sn;
  ro = 1;
  const n = je(), d = Ie, m = Zi().copy, c = Mr().remove, f = tt().mkdirp, u = Ct().pathExists, a = /* @__PURE__ */ $t();
  function l(r, h, g, y) {
    typeof g == "function" && (y = g, g = {}), g = g || {};
    const p = g.overwrite || g.clobber || !1;
    a.checkPaths(r, h, "move", g, (w, T) => {
      if (w) return y(w);
      const { srcStat: P, isChangingCase: I = !1 } = T;
      a.checkParentPaths(r, P, h, "move", (b) => {
        if (b) return y(b);
        if (o(h)) return s(r, h, p, I, y);
        f(d.dirname(h), (O) => O ? y(O) : s(r, h, p, I, y));
      });
    });
  }
  function o(r) {
    const h = d.dirname(r);
    return d.parse(h).root === h;
  }
  function s(r, h, g, y, p) {
    if (y) return i(r, h, g, p);
    if (g)
      return c(h, (w) => w ? p(w) : i(r, h, g, p));
    u(h, (w, T) => w ? p(w) : T ? p(new Error("dest already exists.")) : i(r, h, g, p));
  }
  function i(r, h, g, y) {
    n.rename(r, h, (p) => p ? p.code !== "EXDEV" ? y(p) : t(r, h, g, y) : y());
  }
  function t(r, h, g, y) {
    m(r, h, {
      overwrite: g,
      errorOnExist: !0
    }, (w) => w ? y(w) : c(r, y));
  }
  return Sn = l, Sn;
}
var Cn, no;
function Uc() {
  if (no) return Cn;
  no = 1;
  const n = je(), d = Ie, m = Zi().copySync, c = Mr().removeSync, f = tt().mkdirpSync, u = /* @__PURE__ */ $t();
  function a(t, r, h) {
    h = h || {};
    const g = h.overwrite || h.clobber || !1, { srcStat: y, isChangingCase: p = !1 } = u.checkPathsSync(t, r, "move", h);
    return u.checkParentPathsSync(t, y, r, "move"), l(r) || f(d.dirname(r)), o(t, r, g, p);
  }
  function l(t) {
    const r = d.dirname(t);
    return d.parse(r).root === r;
  }
  function o(t, r, h, g) {
    if (g) return s(t, r, h);
    if (h)
      return c(r), s(t, r, h);
    if (n.existsSync(r)) throw new Error("dest already exists.");
    return s(t, r, h);
  }
  function s(t, r, h) {
    try {
      n.renameSync(t, r);
    } catch (g) {
      if (g.code !== "EXDEV") throw g;
      return i(t, r, h);
    }
  }
  function i(t, r, h) {
    return m(t, r, {
      overwrite: h,
      errorOnExist: !0
    }), c(t);
  }
  return Cn = a, Cn;
}
var bn, io;
function kc() {
  if (io) return bn;
  io = 1;
  const n = We().fromCallback;
  return bn = {
    move: n(/* @__PURE__ */ xc()),
    moveSync: /* @__PURE__ */ Uc()
  }, bn;
}
var Pn, ao;
function mt() {
  return ao || (ao = 1, Pn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ qt(),
    // Export extra methods:
    .../* @__PURE__ */ Zi(),
    .../* @__PURE__ */ Ac(),
    .../* @__PURE__ */ Oc(),
    .../* @__PURE__ */ Lc(),
    .../* @__PURE__ */ tt(),
    .../* @__PURE__ */ kc(),
    .../* @__PURE__ */ ta(),
    .../* @__PURE__ */ Ct(),
    .../* @__PURE__ */ Mr()
  }), Pn;
}
var jt = {}, Rt = {}, On = {}, At = {}, oo;
function ra() {
  if (oo) return At;
  oo = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.CancellationError = At.CancellationToken = void 0;
  const n = Dl;
  let d = class extends n.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(f) {
      this.removeParentCancelHandler(), this._parent = f, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(f) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, f != null && (this.parent = f);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(f) {
      this.cancelled ? f() : this.once("cancel", f);
    }
    createPromise(f) {
      if (this.cancelled)
        return Promise.reject(new m());
      const u = () => {
        if (a != null)
          try {
            this.removeListener("cancel", a), a = null;
          } catch {
          }
      };
      let a = null;
      return new Promise((l, o) => {
        let s = null;
        if (a = () => {
          try {
            s != null && (s(), s = null);
          } finally {
            o(new m());
          }
        }, this.cancelled) {
          a();
          return;
        }
        this.onCancel(a), f(l, o, (i) => {
          s = i;
        });
      }).then((l) => (u(), l)).catch((l) => {
        throw u(), l;
      });
    }
    removeParentCancelHandler() {
      const f = this._parent;
      f != null && this.parentCancelHandler != null && (f.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  At.CancellationToken = d;
  class m extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return At.CancellationError = m, At;
}
var br = {}, so;
function Br() {
  if (so) return br;
  so = 1, Object.defineProperty(br, "__esModule", { value: !0 }), br.newError = n;
  function n(d, m) {
    const c = new Error(d);
    return c.code = m, c;
  }
  return br;
}
var ke = {}, Pr = { exports: {} }, Or = { exports: {} }, In, lo;
function qc() {
  if (lo) return In;
  lo = 1;
  var n = 1e3, d = n * 60, m = d * 60, c = m * 24, f = c * 7, u = c * 365.25;
  In = function(i, t) {
    t = t || {};
    var r = typeof i;
    if (r === "string" && i.length > 0)
      return a(i);
    if (r === "number" && isFinite(i))
      return t.long ? o(i) : l(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function a(i) {
    if (i = String(i), !(i.length > 100)) {
      var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (t) {
        var r = parseFloat(t[1]), h = (t[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * u;
          case "weeks":
          case "week":
          case "w":
            return r * f;
          case "days":
          case "day":
          case "d":
            return r * c;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * m;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * d;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function l(i) {
    var t = Math.abs(i);
    return t >= c ? Math.round(i / c) + "d" : t >= m ? Math.round(i / m) + "h" : t >= d ? Math.round(i / d) + "m" : t >= n ? Math.round(i / n) + "s" : i + "ms";
  }
  function o(i) {
    var t = Math.abs(i);
    return t >= c ? s(i, t, c, "day") : t >= m ? s(i, t, m, "hour") : t >= d ? s(i, t, d, "minute") : t >= n ? s(i, t, n, "second") : i + " ms";
  }
  function s(i, t, r, h) {
    var g = t >= r * 1.5;
    return Math.round(i / r) + " " + h + (g ? "s" : "");
  }
  return In;
}
var Dn, uo;
function xl() {
  if (uo) return Dn;
  uo = 1;
  function n(d) {
    c.debug = c, c.default = c, c.coerce = s, c.disable = l, c.enable = u, c.enabled = o, c.humanize = qc(), c.destroy = i, Object.keys(d).forEach((t) => {
      c[t] = d[t];
    }), c.names = [], c.skips = [], c.formatters = {};
    function m(t) {
      let r = 0;
      for (let h = 0; h < t.length; h++)
        r = (r << 5) - r + t.charCodeAt(h), r |= 0;
      return c.colors[Math.abs(r) % c.colors.length];
    }
    c.selectColor = m;
    function c(t) {
      let r, h = null, g, y;
      function p(...w) {
        if (!p.enabled)
          return;
        const T = p, P = Number(/* @__PURE__ */ new Date()), I = P - (r || P);
        T.diff = I, T.prev = r, T.curr = P, r = P, w[0] = c.coerce(w[0]), typeof w[0] != "string" && w.unshift("%O");
        let b = 0;
        w[0] = w[0].replace(/%([a-zA-Z%])/g, (S, A) => {
          if (S === "%%")
            return "%";
          b++;
          const v = c.formatters[A];
          if (typeof v == "function") {
            const k = w[b];
            S = v.call(T, k), w.splice(b, 1), b--;
          }
          return S;
        }), c.formatArgs.call(T, w), (T.log || c.log).apply(T, w);
      }
      return p.namespace = t, p.useColors = c.useColors(), p.color = c.selectColor(t), p.extend = f, p.destroy = c.destroy, Object.defineProperty(p, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (g !== c.namespaces && (g = c.namespaces, y = c.enabled(t)), y),
        set: (w) => {
          h = w;
        }
      }), typeof c.init == "function" && c.init(p), p;
    }
    function f(t, r) {
      const h = c(this.namespace + (typeof r > "u" ? ":" : r) + t);
      return h.log = this.log, h;
    }
    function u(t) {
      c.save(t), c.namespaces = t, c.names = [], c.skips = [];
      const r = (typeof t == "string" ? t : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of r)
        h[0] === "-" ? c.skips.push(h.slice(1)) : c.names.push(h);
    }
    function a(t, r) {
      let h = 0, g = 0, y = -1, p = 0;
      for (; h < t.length; )
        if (g < r.length && (r[g] === t[h] || r[g] === "*"))
          r[g] === "*" ? (y = g, p = h, g++) : (h++, g++);
        else if (y !== -1)
          g = y + 1, p++, h = p;
        else
          return !1;
      for (; g < r.length && r[g] === "*"; )
        g++;
      return g === r.length;
    }
    function l() {
      const t = [
        ...c.names,
        ...c.skips.map((r) => "-" + r)
      ].join(",");
      return c.enable(""), t;
    }
    function o(t) {
      for (const r of c.skips)
        if (a(t, r))
          return !1;
      for (const r of c.names)
        if (a(t, r))
          return !0;
      return !1;
    }
    function s(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }
    function i() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return c.enable(c.load()), c;
  }
  return Dn = n, Dn;
}
var co;
function $c() {
  return co || (co = 1, (function(n, d) {
    d.formatArgs = c, d.save = f, d.load = u, d.useColors = m, d.storage = a(), d.destroy = /* @__PURE__ */ (() => {
      let o = !1;
      return () => {
        o || (o = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), d.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function m() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let o;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (o = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(o[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function c(o) {
      if (o[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + o[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
        return;
      const s = "color: " + this.color;
      o.splice(1, 0, s, "color: inherit");
      let i = 0, t = 0;
      o[0].replace(/%[a-zA-Z%]/g, (r) => {
        r !== "%%" && (i++, r === "%c" && (t = i));
      }), o.splice(t, 0, s);
    }
    d.log = console.debug || console.log || (() => {
    });
    function f(o) {
      try {
        o ? d.storage.setItem("debug", o) : d.storage.removeItem("debug");
      } catch {
      }
    }
    function u() {
      let o;
      try {
        o = d.storage.getItem("debug") || d.storage.getItem("DEBUG");
      } catch {
      }
      return !o && typeof process < "u" && "env" in process && (o = process.env.DEBUG), o;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    n.exports = xl()(d);
    const { formatters: l } = n.exports;
    l.j = function(o) {
      try {
        return JSON.stringify(o);
      } catch (s) {
        return "[UnexpectedJSONParseError]: " + s.message;
      }
    };
  })(Or, Or.exports)), Or.exports;
}
var Ir = { exports: {} }, Nn, fo;
function Mc() {
  return fo || (fo = 1, Nn = (n, d = process.argv) => {
    const m = n.startsWith("-") ? "" : n.length === 1 ? "-" : "--", c = d.indexOf(m + n), f = d.indexOf("--");
    return c !== -1 && (f === -1 || c < f);
  }), Nn;
}
var Fn, ho;
function Bc() {
  if (ho) return Fn;
  ho = 1;
  const n = $r, d = Nl, m = Mc(), { env: c } = process;
  let f;
  m("no-color") || m("no-colors") || m("color=false") || m("color=never") ? f = 0 : (m("color") || m("colors") || m("color=true") || m("color=always")) && (f = 1), "FORCE_COLOR" in c && (c.FORCE_COLOR === "true" ? f = 1 : c.FORCE_COLOR === "false" ? f = 0 : f = c.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(c.FORCE_COLOR, 10), 3));
  function u(o) {
    return o === 0 ? !1 : {
      level: o,
      hasBasic: !0,
      has256: o >= 2,
      has16m: o >= 3
    };
  }
  function a(o, s) {
    if (f === 0)
      return 0;
    if (m("color=16m") || m("color=full") || m("color=truecolor"))
      return 3;
    if (m("color=256"))
      return 2;
    if (o && !s && f === void 0)
      return 0;
    const i = f || 0;
    if (c.TERM === "dumb")
      return i;
    if (process.platform === "win32") {
      const t = n.release().split(".");
      return Number(t[0]) >= 10 && Number(t[2]) >= 10586 ? Number(t[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in c)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((t) => t in c) || c.CI_NAME === "codeship" ? 1 : i;
    if ("TEAMCITY_VERSION" in c)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(c.TEAMCITY_VERSION) ? 1 : 0;
    if (c.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in c) {
      const t = parseInt((c.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (c.TERM_PROGRAM) {
        case "iTerm.app":
          return t >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(c.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(c.TERM) || "COLORTERM" in c ? 1 : i;
  }
  function l(o) {
    const s = a(o, o && o.isTTY);
    return u(s);
  }
  return Fn = {
    supportsColor: l,
    stdout: u(a(!0, d.isatty(1))),
    stderr: u(a(!0, d.isatty(2)))
  }, Fn;
}
var po;
function Hc() {
  return po || (po = 1, (function(n, d) {
    const m = Nl, c = Qi;
    d.init = i, d.log = l, d.formatArgs = u, d.save = o, d.load = s, d.useColors = f, d.destroy = c.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), d.colors = [6, 2, 3, 4, 5, 1];
    try {
      const r = Bc();
      r && (r.stderr || r).level >= 2 && (d.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    d.inspectOpts = Object.keys(process.env).filter((r) => /^debug_/i.test(r)).reduce((r, h) => {
      const g = h.substring(6).toLowerCase().replace(/_([a-z])/g, (p, w) => w.toUpperCase());
      let y = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), r[g] = y, r;
    }, {});
    function f() {
      return "colors" in d.inspectOpts ? !!d.inspectOpts.colors : m.isatty(process.stderr.fd);
    }
    function u(r) {
      const { namespace: h, useColors: g } = this;
      if (g) {
        const y = this.color, p = "\x1B[3" + (y < 8 ? y : "8;5;" + y), w = `  ${p};1m${h} \x1B[0m`;
        r[0] = w + r[0].split(`
`).join(`
` + w), r.push(p + "m+" + n.exports.humanize(this.diff) + "\x1B[0m");
      } else
        r[0] = a() + h + " " + r[0];
    }
    function a() {
      return d.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function l(...r) {
      return process.stderr.write(c.formatWithOptions(d.inspectOpts, ...r) + `
`);
    }
    function o(r) {
      r ? process.env.DEBUG = r : delete process.env.DEBUG;
    }
    function s() {
      return process.env.DEBUG;
    }
    function i(r) {
      r.inspectOpts = {};
      const h = Object.keys(d.inspectOpts);
      for (let g = 0; g < h.length; g++)
        r.inspectOpts[h[g]] = d.inspectOpts[h[g]];
    }
    n.exports = xl()(d);
    const { formatters: t } = n.exports;
    t.o = function(r) {
      return this.inspectOpts.colors = this.useColors, c.inspect(r, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, t.O = function(r) {
      return this.inspectOpts.colors = this.useColors, c.inspect(r, this.inspectOpts);
    };
  })(Ir, Ir.exports)), Ir.exports;
}
var mo;
function jc() {
  return mo || (mo = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Pr.exports = $c() : Pr.exports = Hc()), Pr.exports;
}
var Gt = {}, go;
function Ul() {
  if (go) return Gt;
  go = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.ProgressCallbackTransform = void 0;
  const n = hr;
  let d = class extends n.Transform {
    constructor(c, f, u) {
      super(), this.total = c, this.cancellationToken = f, this.onProgress = u, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(c, f, u) {
      if (this.cancellationToken.cancelled) {
        u(new Error("cancelled"), null);
        return;
      }
      this.transferred += c.length, this.delta += c.length;
      const a = Date.now();
      a >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = a + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((a - this.start) / 1e3))
      }), this.delta = 0), u(null, c);
    }
    _flush(c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, c(null);
    }
  };
  return Gt.ProgressCallbackTransform = d, Gt;
}
var vo;
function Gc() {
  if (vo) return ke;
  vo = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.DigestTransform = ke.HttpExecutor = ke.HttpError = void 0, ke.createHttpError = s, ke.parseJson = r, ke.configureRequestOptionsFromUrl = y, ke.configureRequestUrl = p, ke.safeGetHeader = P, ke.configureRequestOptions = b, ke.safeStringifyJson = O;
  const n = pr, d = jc(), m = ht, c = hr, f = pt, u = ra(), a = Br(), l = Ul(), o = (0, d.default)("electron-builder");
  function s(S, A = null) {
    return new t(S.statusCode || -1, `${S.statusCode} ${S.statusMessage}` + (A == null ? "" : `
` + JSON.stringify(A, null, "  ")) + `
Headers: ` + O(S.headers), A);
  }
  const i = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class t extends Error {
    constructor(A, v = `HTTP error: ${i.get(A) || A}`, k = null) {
      super(v), this.statusCode = A, this.description = k, this.name = "HttpError", this.code = `HTTP_ERROR_${A}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  ke.HttpError = t;
  function r(S) {
    return S.then((A) => A == null || A.length === 0 ? null : JSON.parse(A));
  }
  class h {
    constructor() {
      this.maxRedirects = 10;
    }
    request(A, v = new u.CancellationToken(), k) {
      b(A);
      const q = k == null ? void 0 : JSON.stringify(k), x = q ? Buffer.from(q) : void 0;
      if (x != null) {
        o(q);
        const { headers: $, ...L } = A;
        A = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": x.length,
            ...$
          },
          ...L
        };
      }
      return this.doApiRequest(A, v, ($) => $.end(x));
    }
    doApiRequest(A, v, k, q = 0) {
      return o.enabled && o(`Request: ${O(A)}`), v.createPromise((x, $, L) => {
        const N = this.createRequest(A, (j) => {
          try {
            this.handleResponse(j, A, v, x, $, q, k);
          } catch (D) {
            $(D);
          }
        });
        this.addErrorAndTimeoutHandlers(N, $, A.timeout), this.addRedirectHandlers(N, A, $, q, (j) => {
          this.doApiRequest(j, v, k, q).then(x).catch($);
        }), k(N, $), L(() => N.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(A, v, k, q, x) {
    }
    addErrorAndTimeoutHandlers(A, v, k = 60 * 1e3) {
      this.addTimeOutHandler(A, v, k), A.on("error", v), A.on("aborted", () => {
        v(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(A, v, k, q, x, $, L) {
      var N;
      if (o.enabled && o(`Response: ${A.statusCode} ${A.statusMessage}, request options: ${O(v)}`), A.statusCode === 404) {
        x(s(A, `method: ${v.method || "GET"} url: ${v.protocol || "https:"}//${v.hostname}${v.port ? `:${v.port}` : ""}${v.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (A.statusCode === 204) {
        q();
        return;
      }
      const j = (N = A.statusCode) !== null && N !== void 0 ? N : 0, D = j >= 300 && j < 400, G = P(A, "location");
      if (D && G != null) {
        if ($ > this.maxRedirects) {
          x(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(h.prepareRedirectUrlOptions(G, v), k, L, $).then(q).catch(x);
        return;
      }
      A.setEncoding("utf8");
      let V = "";
      A.on("error", x), A.on("data", (te) => V += te), A.on("end", () => {
        try {
          if (A.statusCode != null && A.statusCode >= 400) {
            const te = P(A, "content-type"), de = te != null && (Array.isArray(te) ? te.find((ie) => ie.includes("json")) != null : te.includes("json"));
            x(s(A, `method: ${v.method || "GET"} url: ${v.protocol || "https:"}//${v.hostname}${v.port ? `:${v.port}` : ""}${v.path}

          Data:
          ${de ? JSON.stringify(JSON.parse(V)) : V}
          `));
          } else
            q(V.length === 0 ? null : V);
        } catch (te) {
          x(te);
        }
      });
    }
    async downloadToBuffer(A, v) {
      return await v.cancellationToken.createPromise((k, q, x) => {
        const $ = [], L = {
          headers: v.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        p(A, L), b(L), this.doDownload(L, {
          destination: null,
          options: v,
          onCancel: x,
          callback: (N) => {
            N == null ? k(Buffer.concat($)) : q(N);
          },
          responseHandler: (N, j) => {
            let D = 0;
            N.on("data", (G) => {
              if (D += G.length, D > 524288e3) {
                j(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              $.push(G);
            }), N.on("end", () => {
              j(null);
            });
          }
        }, 0);
      });
    }
    doDownload(A, v, k) {
      const q = this.createRequest(A, (x) => {
        if (x.statusCode >= 400) {
          v.callback(new Error(`Cannot download "${A.protocol || "https:"}//${A.hostname}${A.path}", status ${x.statusCode}: ${x.statusMessage}`));
          return;
        }
        x.on("error", v.callback);
        const $ = P(x, "location");
        if ($ != null) {
          k < this.maxRedirects ? this.doDownload(h.prepareRedirectUrlOptions($, A), v, k++) : v.callback(this.createMaxRedirectError());
          return;
        }
        v.responseHandler == null ? I(v, x) : v.responseHandler(x, v.callback);
      });
      this.addErrorAndTimeoutHandlers(q, v.callback, A.timeout), this.addRedirectHandlers(q, A, v.callback, k, (x) => {
        this.doDownload(x, v, k++);
      }), q.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(A, v, k) {
      A.on("socket", (q) => {
        q.setTimeout(k, () => {
          A.abort(), v(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(A, v) {
      const k = y(A, { ...v }), q = k.headers;
      if (q?.authorization) {
        const x = h.reconstructOriginalUrl(v), $ = g(A, v);
        h.isCrossOriginRedirect(x, $) && (o.enabled && o(`Given the cross-origin redirect (from ${x.host} to ${$.host}), the Authorization header will be stripped out.`), delete q.authorization);
      }
      return k;
    }
    static reconstructOriginalUrl(A) {
      const v = A.protocol || "https:";
      if (!A.hostname)
        throw new Error("Missing hostname in request options");
      const k = A.hostname, q = A.port ? `:${A.port}` : "", x = A.path || "/";
      return new f.URL(`${v}//${k}${q}${x}`);
    }
    static isCrossOriginRedirect(A, v) {
      if (A.hostname.toLowerCase() !== v.hostname.toLowerCase())
        return !0;
      if (A.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
      ["80", ""].includes(A.port) && v.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
      ["443", ""].includes(v.port))
        return !1;
      if (A.protocol !== v.protocol)
        return !0;
      const k = A.port, q = v.port;
      return k !== q;
    }
    static retryOnServerError(A, v = 3) {
      for (let k = 0; ; k++)
        try {
          return A();
        } catch (q) {
          if (k < v && (q instanceof t && q.isServerError() || q.code === "EPIPE"))
            continue;
          throw q;
        }
    }
  }
  ke.HttpExecutor = h;
  function g(S, A) {
    try {
      return new f.URL(S);
    } catch {
      const v = A.hostname, k = A.protocol || "https:", q = A.port ? `:${A.port}` : "", x = `${k}//${v}${q}`;
      return new f.URL(S, x);
    }
  }
  function y(S, A) {
    const v = b(A), k = g(S, A);
    return p(k, v), v;
  }
  function p(S, A) {
    A.protocol = S.protocol, A.hostname = S.hostname, S.port ? A.port = S.port : A.port && delete A.port, A.path = S.pathname + S.search;
  }
  class w extends c.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(A, v = "sha512", k = "base64") {
      super(), this.expected = A, this.algorithm = v, this.encoding = k, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, n.createHash)(v);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(A, v, k) {
      this.digester.update(A), k(null, A);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(A) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (v) {
          A(v);
          return;
        }
      A(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, a.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, a.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  ke.DigestTransform = w;
  function T(S, A, v) {
    return S != null && A != null && S !== A ? (v(new Error(`checksum mismatch: expected ${A} but got ${S} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function P(S, A) {
    const v = S.headers[A];
    return v == null ? null : Array.isArray(v) ? v.length === 0 ? null : v[v.length - 1] : v;
  }
  function I(S, A) {
    if (!T(P(A, "X-Checksum-Sha2"), S.options.sha2, S.callback))
      return;
    const v = [];
    if (S.options.onProgress != null) {
      const $ = P(A, "content-length");
      $ != null && v.push(new l.ProgressCallbackTransform(parseInt($, 10), S.options.cancellationToken, S.options.onProgress));
    }
    const k = S.options.sha512;
    k != null ? v.push(new w(k, "sha512", k.length === 128 && !k.includes("+") && !k.includes("Z") && !k.includes("=") ? "hex" : "base64")) : S.options.sha2 != null && v.push(new w(S.options.sha2, "sha256", "hex"));
    const q = (0, m.createWriteStream)(S.destination);
    v.push(q);
    let x = A;
    for (const $ of v)
      $.on("error", (L) => {
        q.close(), S.options.cancellationToken.cancelled || S.callback(L);
      }), x = x.pipe($);
    q.on("finish", () => {
      q.close(S.callback);
    });
  }
  function b(S, A, v) {
    v != null && (S.method = v), S.headers = { ...S.headers };
    const k = S.headers;
    return A != null && (k.authorization = A.startsWith("Basic") || A.startsWith("Bearer") ? A : `token ${A}`), k["User-Agent"] == null && (k["User-Agent"] = "electron-builder"), (v == null || v === "GET" || k["Cache-Control"] == null) && (k["Cache-Control"] = "no-cache"), S.protocol == null && process.versions.electron != null && (S.protocol = "https:"), S;
  }
  function O(S, A) {
    return JSON.stringify(S, (v, k) => v.endsWith("Authorization") || v.endsWith("authorization") || v.endsWith("Password") || v.endsWith("PASSWORD") || v.endsWith("Token") || v.includes("password") || v.includes("token") || A != null && A.has(v) ? "<stripped sensitive data>" : k, 2);
  }
  return ke;
}
var Wt = {}, Eo;
function Wc() {
  if (Eo) return Wt;
  Eo = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.MemoLazy = void 0;
  let n = class {
    constructor(c, f) {
      this.selector = c, this.creator = f, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const c = this.selector();
      if (this._value !== void 0 && d(this.selected, c))
        return this._value;
      this.selected = c;
      const f = this.creator(c);
      return this.value = f, f;
    }
    set value(c) {
      this._value = c;
    }
  };
  Wt.MemoLazy = n;
  function d(m, c) {
    if (typeof m == "object" && m !== null && (typeof c == "object" && c !== null)) {
      const a = Object.keys(m), l = Object.keys(c);
      return a.length === l.length && a.every((o) => d(m[o], c[o]));
    }
    return m === c;
  }
  return Wt;
}
var Dt = {}, yo;
function Vc() {
  if (yo) return Dt;
  yo = 1, Object.defineProperty(Dt, "__esModule", { value: !0 }), Dt.githubUrl = n, Dt.githubTagPrefix = d, Dt.getS3LikeProviderBaseUrl = m;
  function n(a, l = "github.com") {
    return `${a.protocol || "https"}://${a.host || l}`;
  }
  function d(a) {
    var l;
    return a.tagNamePrefix ? a.tagNamePrefix : !((l = a.vPrefixedTagName) !== null && l !== void 0) || l ? "v" : "";
  }
  function m(a) {
    const l = a.provider;
    if (l === "s3")
      return c(a);
    if (l === "spaces")
      return u(a);
    throw new Error(`Not supported provider: ${l}`);
  }
  function c(a) {
    let l;
    if (a.accelerate == !0)
      l = `https://${a.bucket}.s3-accelerate.amazonaws.com`;
    else if (a.endpoint != null)
      l = `${a.endpoint}/${a.bucket}`;
    else if (a.bucket.includes(".")) {
      if (a.region == null)
        throw new Error(`Bucket name "${a.bucket}" includes a dot, but S3 region is missing`);
      a.region === "us-east-1" ? l = `https://s3.amazonaws.com/${a.bucket}` : l = `https://s3-${a.region}.amazonaws.com/${a.bucket}`;
    } else a.region === "cn-north-1" ? l = `https://${a.bucket}.s3.${a.region}.amazonaws.com.cn` : l = `https://${a.bucket}.s3.amazonaws.com`;
    return f(l, a.path);
  }
  function f(a, l) {
    return l != null && l.length > 0 && (l.startsWith("/") || (a += "/"), a += l), a;
  }
  function u(a) {
    if (a.name == null)
      throw new Error("name is missing");
    if (a.region == null)
      throw new Error("region is missing");
    return f(`https://${a.name}.${a.region}.digitaloceanspaces.com`, a.path);
  }
  return Dt;
}
var Dr = {}, wo;
function Yc() {
  if (wo) return Dr;
  wo = 1, Object.defineProperty(Dr, "__esModule", { value: !0 }), Dr.retry = d;
  const n = ra();
  async function d(m, c) {
    var f;
    const { retries: u, interval: a, backoff: l = 0, attempt: o = 0, shouldRetry: s, cancellationToken: i = new n.CancellationToken() } = c;
    try {
      return await m();
    } catch (t) {
      if (await Promise.resolve((f = s?.(t)) !== null && f !== void 0 ? f : !0) && u > 0 && !i.cancelled)
        return await new Promise((r) => setTimeout(r, a + l * o)), await d(m, { ...c, retries: u - 1, attempt: o + 1 });
      throw t;
    }
  }
  return Dr;
}
var Nr = {}, _o;
function zc() {
  if (_o) return Nr;
  _o = 1, Object.defineProperty(Nr, "__esModule", { value: !0 }), Nr.parseDn = n;
  function n(d) {
    let m = !1, c = null, f = "", u = 0;
    d = d.trim();
    const a = /* @__PURE__ */ new Map();
    for (let l = 0; l <= d.length; l++) {
      if (l === d.length) {
        c !== null && a.set(c, f);
        break;
      }
      const o = d[l];
      if (m) {
        if (o === '"') {
          m = !1;
          continue;
        }
      } else {
        if (o === '"') {
          m = !0;
          continue;
        }
        if (o === "\\") {
          l++;
          const s = parseInt(d.slice(l, l + 2), 16);
          Number.isNaN(s) ? f += d[l] : (l++, f += String.fromCharCode(s));
          continue;
        }
        if (c === null && o === "=") {
          c = f, f = "";
          continue;
        }
        if (o === "," || o === ";" || o === "+") {
          c !== null && a.set(c, f), c = null, f = "";
          continue;
        }
      }
      if (o === " " && !m) {
        if (f.length === 0)
          continue;
        if (l > u) {
          let s = l;
          for (; d[s] === " "; )
            s++;
          u = s;
        }
        if (u >= d.length || d[u] === "," || d[u] === ";" || c === null && d[u] === "=" || c !== null && d[u] === "+") {
          l = u - 1;
          continue;
        }
      }
      f += o;
    }
    return a;
  }
  return Nr;
}
var Tt = {}, Ro;
function Xc() {
  if (Ro) return Tt;
  Ro = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.nil = Tt.UUID = void 0;
  const n = pr, d = Br(), m = "options.name must be either a string or a Buffer", c = (0, n.randomBytes)(16);
  c[0] = c[0] | 1;
  const f = {}, u = [];
  for (let t = 0; t < 256; t++) {
    const r = (t + 256).toString(16).substr(1);
    f[r] = t, u[t] = r;
  }
  class a {
    constructor(r) {
      this.ascii = null, this.binary = null;
      const h = a.check(r);
      if (!h)
        throw new Error("not a UUID");
      this.version = h.version, h.format === "ascii" ? this.ascii = r : this.binary = r;
    }
    static v5(r, h) {
      return s(r, "sha1", 80, h);
    }
    toString() {
      return this.ascii == null && (this.ascii = i(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(r, h = 0) {
      if (typeof r == "string")
        return r = r.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(r) ? r === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (f[r[14] + r[15]] & 240) >> 4,
          variant: l((f[r[19] + r[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(r)) {
        if (r.length < h + 16)
          return !1;
        let g = 0;
        for (; g < 16 && r[h + g] === 0; g++)
          ;
        return g === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (r[h + 6] & 240) >> 4,
          variant: l((r[h + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, d.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(r) {
      const h = Buffer.allocUnsafe(16);
      let g = 0;
      for (let y = 0; y < 16; y++)
        h[y] = f[r[g++] + r[g++]], (y === 3 || y === 5 || y === 7 || y === 9) && (g += 1);
      return h;
    }
  }
  Tt.UUID = a, a.OID = a.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function l(t) {
    switch (t) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var o;
  (function(t) {
    t[t.ASCII = 0] = "ASCII", t[t.BINARY = 1] = "BINARY", t[t.OBJECT = 2] = "OBJECT";
  })(o || (o = {}));
  function s(t, r, h, g, y = o.ASCII) {
    const p = (0, n.createHash)(r);
    if (typeof t != "string" && !Buffer.isBuffer(t))
      throw (0, d.newError)(m, "ERR_INVALID_UUID_NAME");
    p.update(g), p.update(t);
    const T = p.digest();
    let P;
    switch (y) {
      case o.BINARY:
        T[6] = T[6] & 15 | h, T[8] = T[8] & 63 | 128, P = T;
        break;
      case o.OBJECT:
        T[6] = T[6] & 15 | h, T[8] = T[8] & 63 | 128, P = new a(T);
        break;
      default:
        P = u[T[0]] + u[T[1]] + u[T[2]] + u[T[3]] + "-" + u[T[4]] + u[T[5]] + "-" + u[T[6] & 15 | h] + u[T[7]] + "-" + u[T[8] & 63 | 128] + u[T[9]] + "-" + u[T[10]] + u[T[11]] + u[T[12]] + u[T[13]] + u[T[14]] + u[T[15]];
        break;
    }
    return P;
  }
  function i(t) {
    return u[t[0]] + u[t[1]] + u[t[2]] + u[t[3]] + "-" + u[t[4]] + u[t[5]] + "-" + u[t[6]] + u[t[7]] + "-" + u[t[8]] + u[t[9]] + "-" + u[t[10]] + u[t[11]] + u[t[12]] + u[t[13]] + u[t[14]] + u[t[15]];
  }
  return Tt.nil = new a("00000000-0000-0000-0000-000000000000"), Tt;
}
var Nt = {}, Ln = {}, Ao;
function Kc() {
  return Ao || (Ao = 1, (function(n) {
    (function(d) {
      d.parser = function(_, E) {
        return new c(_, E);
      }, d.SAXParser = c, d.SAXStream = i, d.createStream = s, d.MAX_BUFFER_LENGTH = 64 * 1024;
      var m = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      d.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function c(_, E) {
        if (!(this instanceof c))
          return new c(_, E);
        var H = this;
        u(H), H.q = H.c = "", H.bufferCheckPosition = d.MAX_BUFFER_LENGTH, H.opt = E || {}, H.opt.lowercase = H.opt.lowercase || H.opt.lowercasetags, H.looseCase = H.opt.lowercase ? "toLowerCase" : "toUpperCase", H.tags = [], H.closed = H.closedRoot = H.sawRoot = !1, H.tag = H.error = null, H.strict = !!_, H.noscript = !!(_ || H.opt.noscript), H.state = v.BEGIN, H.strictEntities = H.opt.strictEntities, H.ENTITIES = H.strictEntities ? Object.create(d.XML_ENTITIES) : Object.create(d.ENTITIES), H.attribList = [], H.opt.xmlns && (H.ns = Object.create(y)), H.opt.unquotedAttributeValues === void 0 && (H.opt.unquotedAttributeValues = !_), H.trackPosition = H.opt.position !== !1, H.trackPosition && (H.position = H.line = H.column = 0), q(H, "onready");
      }
      Object.create || (Object.create = function(_) {
        function E() {
        }
        E.prototype = _;
        var H = new E();
        return H;
      }), Object.keys || (Object.keys = function(_) {
        var E = [];
        for (var H in _) _.hasOwnProperty(H) && E.push(H);
        return E;
      });
      function f(_) {
        for (var E = Math.max(d.MAX_BUFFER_LENGTH, 10), H = 0, F = 0, ce = m.length; F < ce; F++) {
          var he = _[m[F]].length;
          if (he > E)
            switch (m[F]) {
              case "textNode":
                $(_);
                break;
              case "cdata":
                x(_, "oncdata", _.cdata), _.cdata = "";
                break;
              case "script":
                x(_, "onscript", _.script), _.script = "";
                break;
              default:
                N(_, "Max buffer length exceeded: " + m[F]);
            }
          H = Math.max(H, he);
        }
        var pe = d.MAX_BUFFER_LENGTH - H;
        _.bufferCheckPosition = pe + _.position;
      }
      function u(_) {
        for (var E = 0, H = m.length; E < H; E++)
          _[m[E]] = "";
      }
      function a(_) {
        $(_), _.cdata !== "" && (x(_, "oncdata", _.cdata), _.cdata = ""), _.script !== "" && (x(_, "onscript", _.script), _.script = "");
      }
      c.prototype = {
        end: function() {
          j(this);
        },
        write: ge,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          a(this);
        }
      };
      var l;
      try {
        l = require("stream").Stream;
      } catch {
        l = function() {
        };
      }
      l || (l = function() {
      });
      var o = d.EVENTS.filter(function(_) {
        return _ !== "error" && _ !== "end";
      });
      function s(_, E) {
        return new i(_, E);
      }
      function i(_, E) {
        if (!(this instanceof i))
          return new i(_, E);
        l.apply(this), this._parser = new c(_, E), this.writable = !0, this.readable = !0;
        var H = this;
        this._parser.onend = function() {
          H.emit("end");
        }, this._parser.onerror = function(F) {
          H.emit("error", F), H._parser.error = null;
        }, this._decoder = null, o.forEach(function(F) {
          Object.defineProperty(H, "on" + F, {
            get: function() {
              return H._parser["on" + F];
            },
            set: function(ce) {
              if (!ce)
                return H.removeAllListeners(F), H._parser["on" + F] = ce, ce;
              H.on(F, ce);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      i.prototype = Object.create(l.prototype, {
        constructor: {
          value: i
        }
      }), i.prototype.write = function(_) {
        return typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(_) && (this._decoder || (this._decoder = new TextDecoder("utf8")), _ = this._decoder.decode(_, { stream: !0 })), this._parser.write(_.toString()), this.emit("data", _), !0;
      }, i.prototype.end = function(_) {
        if (_ && _.length && this.write(_), this._decoder) {
          var E = this._decoder.decode();
          E && (this._parser.write(E), this.emit("data", E));
        }
        return this._parser.end(), !0;
      }, i.prototype.on = function(_, E) {
        var H = this;
        return !H._parser["on" + _] && o.indexOf(_) !== -1 && (H._parser["on" + _] = function() {
          var F = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          F.splice(0, 0, _), H.emit.apply(H, F);
        }), l.prototype.on.call(H, _, E);
      };
      var t = "[CDATA[", r = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", y = { xml: h, xmlns: g }, p = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, w = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, P = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function I(_) {
        return _ === " " || _ === `
` || _ === "\r" || _ === "	";
      }
      function b(_) {
        return _ === '"' || _ === "'";
      }
      function O(_) {
        return _ === ">" || I(_);
      }
      function S(_, E) {
        return _.test(E);
      }
      function A(_, E) {
        return !S(_, E);
      }
      var v = 0;
      d.STATE = {
        BEGIN: v++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: v++,
        // leading whitespace
        TEXT: v++,
        // general stuff
        TEXT_ENTITY: v++,
        // &amp and such.
        OPEN_WAKA: v++,
        // <
        SGML_DECL: v++,
        // <!BLARG
        SGML_DECL_QUOTED: v++,
        // <!BLARG foo "bar
        DOCTYPE: v++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: v++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: v++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: v++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: v++,
        // <!-
        COMMENT: v++,
        // <!--
        COMMENT_ENDING: v++,
        // <!-- blah -
        COMMENT_ENDED: v++,
        // <!-- blah --
        CDATA: v++,
        // <![CDATA[ something
        CDATA_ENDING: v++,
        // ]
        CDATA_ENDING_2: v++,
        // ]]
        PROC_INST: v++,
        // <?hi
        PROC_INST_BODY: v++,
        // <?hi there
        PROC_INST_ENDING: v++,
        // <?hi "there" ?
        OPEN_TAG: v++,
        // <strong
        OPEN_TAG_SLASH: v++,
        // <strong /
        ATTRIB: v++,
        // <a
        ATTRIB_NAME: v++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: v++,
        // <a foo _
        ATTRIB_VALUE: v++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: v++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: v++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: v++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: v++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: v++,
        // <foo bar=&quot
        CLOSE_TAG: v++,
        // </a
        CLOSE_TAG_SAW_WHITE: v++,
        // </a   >
        SCRIPT: v++,
        // <script> ...
        SCRIPT_ENDING: v++
        // <script> ... <
      }, d.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, d.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(d.ENTITIES).forEach(function(_) {
        var E = d.ENTITIES[_], H = typeof E == "number" ? String.fromCharCode(E) : E;
        d.ENTITIES[_] = H;
      });
      for (var k in d.STATE)
        d.STATE[d.STATE[k]] = k;
      v = d.STATE;
      function q(_, E, H) {
        _[E] && _[E](H);
      }
      function x(_, E, H) {
        _.textNode && $(_), q(_, E, H);
      }
      function $(_) {
        _.textNode = L(_.opt, _.textNode), _.textNode && q(_, "ontext", _.textNode), _.textNode = "";
      }
      function L(_, E) {
        return _.trim && (E = E.trim()), _.normalize && (E = E.replace(/\s+/g, " ")), E;
      }
      function N(_, E) {
        return $(_), _.trackPosition && (E += `
Line: ` + _.line + `
Column: ` + _.column + `
Char: ` + _.c), E = new Error(E), _.error = E, q(_, "onerror", E), _;
      }
      function j(_) {
        return _.sawRoot && !_.closedRoot && D(_, "Unclosed root tag"), _.state !== v.BEGIN && _.state !== v.BEGIN_WHITESPACE && _.state !== v.TEXT && N(_, "Unexpected end"), $(_), _.c = "", _.closed = !0, q(_, "onend"), c.call(_, _.strict, _.opt), _;
      }
      function D(_, E) {
        if (typeof _ != "object" || !(_ instanceof c))
          throw new Error("bad call to strictFail");
        _.strict && N(_, E);
      }
      function G(_) {
        _.strict || (_.tagName = _.tagName[_.looseCase]());
        var E = _.tags[_.tags.length - 1] || _, H = _.tag = { name: _.tagName, attributes: {} };
        _.opt.xmlns && (H.ns = E.ns), _.attribList.length = 0, x(_, "onopentagstart", H);
      }
      function V(_, E) {
        var H = _.indexOf(":"), F = H < 0 ? ["", _] : _.split(":"), ce = F[0], he = F[1];
        return E && _ === "xmlns" && (ce = "xmlns", he = ""), { prefix: ce, local: he };
      }
      function te(_) {
        if (_.strict || (_.attribName = _.attribName[_.looseCase]()), _.attribList.indexOf(_.attribName) !== -1 || _.tag.attributes.hasOwnProperty(_.attribName)) {
          _.attribName = _.attribValue = "";
          return;
        }
        if (_.opt.xmlns) {
          var E = V(_.attribName, !0), H = E.prefix, F = E.local;
          if (H === "xmlns")
            if (F === "xml" && _.attribValue !== h)
              D(
                _,
                "xml: prefix must be bound to " + h + `
Actual: ` + _.attribValue
              );
            else if (F === "xmlns" && _.attribValue !== g)
              D(
                _,
                "xmlns: prefix must be bound to " + g + `
Actual: ` + _.attribValue
              );
            else {
              var ce = _.tag, he = _.tags[_.tags.length - 1] || _;
              ce.ns === he.ns && (ce.ns = Object.create(he.ns)), ce.ns[F] = _.attribValue;
            }
          _.attribList.push([_.attribName, _.attribValue]);
        } else
          _.tag.attributes[_.attribName] = _.attribValue, x(_, "onattribute", {
            name: _.attribName,
            value: _.attribValue
          });
        _.attribName = _.attribValue = "";
      }
      function de(_, E) {
        if (_.opt.xmlns) {
          var H = _.tag, F = V(_.tagName);
          H.prefix = F.prefix, H.local = F.local, H.uri = H.ns[F.prefix] || "", H.prefix && !H.uri && (D(
            _,
            "Unbound namespace prefix: " + JSON.stringify(_.tagName)
          ), H.uri = F.prefix);
          var ce = _.tags[_.tags.length - 1] || _;
          H.ns && ce.ns !== H.ns && Object.keys(H.ns).forEach(function(e) {
            x(_, "onopennamespace", {
              prefix: e,
              uri: H.ns[e]
            });
          });
          for (var he = 0, pe = _.attribList.length; he < pe; he++) {
            var _e = _.attribList[he], Ee = _e[0], He = _e[1], Ae = V(Ee, !0), $e = Ae.prefix, ot = Ae.local, rt = $e === "" ? "" : H.ns[$e] || "", et = {
              name: Ee,
              value: He,
              prefix: $e,
              local: ot,
              uri: rt
            };
            $e && $e !== "xmlns" && !rt && (D(
              _,
              "Unbound namespace prefix: " + JSON.stringify($e)
            ), et.uri = $e), _.tag.attributes[Ee] = et, x(_, "onattribute", et);
          }
          _.attribList.length = 0;
        }
        _.tag.isSelfClosing = !!E, _.sawRoot = !0, _.tags.push(_.tag), x(_, "onopentag", _.tag), E || (!_.noscript && _.tagName.toLowerCase() === "script" ? _.state = v.SCRIPT : _.state = v.TEXT, _.tag = null, _.tagName = ""), _.attribName = _.attribValue = "", _.attribList.length = 0;
      }
      function ie(_) {
        if (!_.tagName) {
          D(_, "Weird empty close tag."), _.textNode += "</>", _.state = v.TEXT;
          return;
        }
        if (_.script) {
          if (_.tagName !== "script") {
            _.script += "</" + _.tagName + ">", _.tagName = "", _.state = v.SCRIPT;
            return;
          }
          x(_, "onscript", _.script), _.script = "";
        }
        var E = _.tags.length, H = _.tagName;
        _.strict || (H = H[_.looseCase]());
        for (var F = H; E--; ) {
          var ce = _.tags[E];
          if (ce.name !== F)
            D(_, "Unexpected close tag");
          else
            break;
        }
        if (E < 0) {
          D(_, "Unmatched closing tag: " + _.tagName), _.textNode += "</" + _.tagName + ">", _.state = v.TEXT;
          return;
        }
        _.tagName = H;
        for (var he = _.tags.length; he-- > E; ) {
          var pe = _.tag = _.tags.pop();
          _.tagName = _.tag.name, x(_, "onclosetag", _.tagName);
          var _e = {};
          for (var Ee in pe.ns)
            _e[Ee] = pe.ns[Ee];
          var He = _.tags[_.tags.length - 1] || _;
          _.opt.xmlns && pe.ns !== He.ns && Object.keys(pe.ns).forEach(function(Ae) {
            var $e = pe.ns[Ae];
            x(_, "onclosenamespace", { prefix: Ae, uri: $e });
          });
        }
        E === 0 && (_.closedRoot = !0), _.tagName = _.attribValue = _.attribName = "", _.attribList.length = 0, _.state = v.TEXT;
      }
      function we(_) {
        var E = _.entity, H = E.toLowerCase(), F, ce = "";
        return _.ENTITIES[E] ? _.ENTITIES[E] : _.ENTITIES[H] ? _.ENTITIES[H] : (E = H, E.charAt(0) === "#" && (E.charAt(1) === "x" ? (E = E.slice(2), F = parseInt(E, 16), ce = F.toString(16)) : (E = E.slice(1), F = parseInt(E, 10), ce = F.toString(10))), E = E.replace(/^0+/, ""), isNaN(F) || ce.toLowerCase() !== E || F < 0 || F > 1114111 ? (D(_, "Invalid character entity"), "&" + _.entity + ";") : String.fromCodePoint(F));
      }
      function ve(_, E) {
        E === "<" ? (_.state = v.OPEN_WAKA, _.startTagPosition = _.position) : I(E) || (D(_, "Non-whitespace before first tag."), _.textNode = E, _.state = v.TEXT);
      }
      function Q(_, E) {
        var H = "";
        return E < _.length && (H = _.charAt(E)), H;
      }
      function ge(_) {
        var E = this;
        if (this.error)
          throw this.error;
        if (E.closed)
          return N(
            E,
            "Cannot write after close. Assign an onready handler."
          );
        if (_ === null)
          return j(E);
        typeof _ == "object" && (_ = _.toString());
        for (var H = 0, F = ""; F = Q(_, H++), E.c = F, !!F; )
          switch (E.trackPosition && (E.position++, F === `
` ? (E.line++, E.column = 0) : E.column++), E.state) {
            case v.BEGIN:
              if (E.state = v.BEGIN_WHITESPACE, F === "\uFEFF")
                continue;
              ve(E, F);
              continue;
            case v.BEGIN_WHITESPACE:
              ve(E, F);
              continue;
            case v.TEXT:
              if (E.sawRoot && !E.closedRoot) {
                for (var he = H - 1; F && F !== "<" && F !== "&"; )
                  F = Q(_, H++), F && E.trackPosition && (E.position++, F === `
` ? (E.line++, E.column = 0) : E.column++);
                E.textNode += _.substring(he, H - 1);
              }
              F === "<" && !(E.sawRoot && E.closedRoot && !E.strict) ? (E.state = v.OPEN_WAKA, E.startTagPosition = E.position) : (!I(F) && (!E.sawRoot || E.closedRoot) && D(E, "Text data outside of root node."), F === "&" ? E.state = v.TEXT_ENTITY : E.textNode += F);
              continue;
            case v.SCRIPT:
              F === "<" ? E.state = v.SCRIPT_ENDING : E.script += F;
              continue;
            case v.SCRIPT_ENDING:
              F === "/" ? E.state = v.CLOSE_TAG : (E.script += "<" + F, E.state = v.SCRIPT);
              continue;
            case v.OPEN_WAKA:
              if (F === "!")
                E.state = v.SGML_DECL, E.sgmlDecl = "";
              else if (!I(F)) if (S(p, F))
                E.state = v.OPEN_TAG, E.tagName = F;
              else if (F === "/")
                E.state = v.CLOSE_TAG, E.tagName = "";
              else if (F === "?")
                E.state = v.PROC_INST, E.procInstName = E.procInstBody = "";
              else {
                if (D(E, "Unencoded <"), E.startTagPosition + 1 < E.position) {
                  var ce = E.position - E.startTagPosition;
                  F = new Array(ce).join(" ") + F;
                }
                E.textNode += "<" + F, E.state = v.TEXT;
              }
              continue;
            case v.SGML_DECL:
              if (E.sgmlDecl + F === "--") {
                E.state = v.COMMENT, E.comment = "", E.sgmlDecl = "";
                continue;
              }
              E.doctype && E.doctype !== !0 && E.sgmlDecl ? (E.state = v.DOCTYPE_DTD, E.doctype += "<!" + E.sgmlDecl + F, E.sgmlDecl = "") : (E.sgmlDecl + F).toUpperCase() === t ? (x(E, "onopencdata"), E.state = v.CDATA, E.sgmlDecl = "", E.cdata = "") : (E.sgmlDecl + F).toUpperCase() === r ? (E.state = v.DOCTYPE, (E.doctype || E.sawRoot) && D(
                E,
                "Inappropriately located doctype declaration"
              ), E.doctype = "", E.sgmlDecl = "") : F === ">" ? (x(E, "onsgmldeclaration", E.sgmlDecl), E.sgmlDecl = "", E.state = v.TEXT) : (b(F) && (E.state = v.SGML_DECL_QUOTED), E.sgmlDecl += F);
              continue;
            case v.SGML_DECL_QUOTED:
              F === E.q && (E.state = v.SGML_DECL, E.q = ""), E.sgmlDecl += F;
              continue;
            case v.DOCTYPE:
              F === ">" ? (E.state = v.TEXT, x(E, "ondoctype", E.doctype), E.doctype = !0) : (E.doctype += F, F === "[" ? E.state = v.DOCTYPE_DTD : b(F) && (E.state = v.DOCTYPE_QUOTED, E.q = F));
              continue;
            case v.DOCTYPE_QUOTED:
              E.doctype += F, F === E.q && (E.q = "", E.state = v.DOCTYPE);
              continue;
            case v.DOCTYPE_DTD:
              F === "]" ? (E.doctype += F, E.state = v.DOCTYPE) : F === "<" ? (E.state = v.OPEN_WAKA, E.startTagPosition = E.position) : b(F) ? (E.doctype += F, E.state = v.DOCTYPE_DTD_QUOTED, E.q = F) : E.doctype += F;
              continue;
            case v.DOCTYPE_DTD_QUOTED:
              E.doctype += F, F === E.q && (E.state = v.DOCTYPE_DTD, E.q = "");
              continue;
            case v.COMMENT:
              F === "-" ? E.state = v.COMMENT_ENDING : E.comment += F;
              continue;
            case v.COMMENT_ENDING:
              F === "-" ? (E.state = v.COMMENT_ENDED, E.comment = L(E.opt, E.comment), E.comment && x(E, "oncomment", E.comment), E.comment = "") : (E.comment += "-" + F, E.state = v.COMMENT);
              continue;
            case v.COMMENT_ENDED:
              F !== ">" ? (D(E, "Malformed comment"), E.comment += "--" + F, E.state = v.COMMENT) : E.doctype && E.doctype !== !0 ? E.state = v.DOCTYPE_DTD : E.state = v.TEXT;
              continue;
            case v.CDATA:
              for (var he = H - 1; F && F !== "]"; )
                F = Q(_, H++), F && E.trackPosition && (E.position++, F === `
` ? (E.line++, E.column = 0) : E.column++);
              E.cdata += _.substring(he, H - 1), F === "]" && (E.state = v.CDATA_ENDING);
              continue;
            case v.CDATA_ENDING:
              F === "]" ? E.state = v.CDATA_ENDING_2 : (E.cdata += "]" + F, E.state = v.CDATA);
              continue;
            case v.CDATA_ENDING_2:
              F === ">" ? (E.cdata && x(E, "oncdata", E.cdata), x(E, "onclosecdata"), E.cdata = "", E.state = v.TEXT) : F === "]" ? E.cdata += "]" : (E.cdata += "]]" + F, E.state = v.CDATA);
              continue;
            case v.PROC_INST:
              F === "?" ? E.state = v.PROC_INST_ENDING : I(F) ? E.state = v.PROC_INST_BODY : E.procInstName += F;
              continue;
            case v.PROC_INST_BODY:
              if (!E.procInstBody && I(F))
                continue;
              F === "?" ? E.state = v.PROC_INST_ENDING : E.procInstBody += F;
              continue;
            case v.PROC_INST_ENDING:
              F === ">" ? (x(E, "onprocessinginstruction", {
                name: E.procInstName,
                body: E.procInstBody
              }), E.procInstName = E.procInstBody = "", E.state = v.TEXT) : (E.procInstBody += "?" + F, E.state = v.PROC_INST_BODY);
              continue;
            case v.OPEN_TAG:
              S(w, F) ? E.tagName += F : (G(E), F === ">" ? de(E) : F === "/" ? E.state = v.OPEN_TAG_SLASH : (I(F) || D(E, "Invalid character in tag name"), E.state = v.ATTRIB));
              continue;
            case v.OPEN_TAG_SLASH:
              F === ">" ? (de(E, !0), ie(E)) : (D(
                E,
                "Forward-slash in opening tag not followed by >"
              ), E.state = v.ATTRIB);
              continue;
            case v.ATTRIB:
              if (I(F))
                continue;
              F === ">" ? de(E) : F === "/" ? E.state = v.OPEN_TAG_SLASH : S(p, F) ? (E.attribName = F, E.attribValue = "", E.state = v.ATTRIB_NAME) : D(E, "Invalid attribute name");
              continue;
            case v.ATTRIB_NAME:
              F === "=" ? E.state = v.ATTRIB_VALUE : F === ">" ? (D(E, "Attribute without value"), E.attribValue = E.attribName, te(E), de(E)) : I(F) ? E.state = v.ATTRIB_NAME_SAW_WHITE : S(w, F) ? E.attribName += F : D(E, "Invalid attribute name");
              continue;
            case v.ATTRIB_NAME_SAW_WHITE:
              if (F === "=")
                E.state = v.ATTRIB_VALUE;
              else {
                if (I(F))
                  continue;
                D(E, "Attribute without value"), E.tag.attributes[E.attribName] = "", E.attribValue = "", x(E, "onattribute", {
                  name: E.attribName,
                  value: ""
                }), E.attribName = "", F === ">" ? de(E) : S(p, F) ? (E.attribName = F, E.state = v.ATTRIB_NAME) : (D(E, "Invalid attribute name"), E.state = v.ATTRIB);
              }
              continue;
            case v.ATTRIB_VALUE:
              if (I(F))
                continue;
              b(F) ? (E.q = F, E.state = v.ATTRIB_VALUE_QUOTED) : (E.opt.unquotedAttributeValues || N(E, "Unquoted attribute value"), E.state = v.ATTRIB_VALUE_UNQUOTED, E.attribValue = F);
              continue;
            case v.ATTRIB_VALUE_QUOTED:
              if (F !== E.q) {
                F === "&" ? E.state = v.ATTRIB_VALUE_ENTITY_Q : E.attribValue += F;
                continue;
              }
              te(E), E.q = "", E.state = v.ATTRIB_VALUE_CLOSED;
              continue;
            case v.ATTRIB_VALUE_CLOSED:
              I(F) ? E.state = v.ATTRIB : F === ">" ? de(E) : F === "/" ? E.state = v.OPEN_TAG_SLASH : S(p, F) ? (D(E, "No whitespace between attributes"), E.attribName = F, E.attribValue = "", E.state = v.ATTRIB_NAME) : D(E, "Invalid attribute name");
              continue;
            case v.ATTRIB_VALUE_UNQUOTED:
              if (!O(F)) {
                F === "&" ? E.state = v.ATTRIB_VALUE_ENTITY_U : E.attribValue += F;
                continue;
              }
              te(E), F === ">" ? de(E) : E.state = v.ATTRIB;
              continue;
            case v.CLOSE_TAG:
              if (E.tagName)
                F === ">" ? ie(E) : S(w, F) ? E.tagName += F : E.script ? (E.script += "</" + E.tagName + F, E.tagName = "", E.state = v.SCRIPT) : (I(F) || D(E, "Invalid tagname in closing tag"), E.state = v.CLOSE_TAG_SAW_WHITE);
              else {
                if (I(F))
                  continue;
                A(p, F) ? E.script ? (E.script += "</" + F, E.state = v.SCRIPT) : D(E, "Invalid tagname in closing tag.") : E.tagName = F;
              }
              continue;
            case v.CLOSE_TAG_SAW_WHITE:
              if (I(F))
                continue;
              F === ">" ? ie(E) : D(E, "Invalid characters in closing tag");
              continue;
            case v.TEXT_ENTITY:
            case v.ATTRIB_VALUE_ENTITY_Q:
            case v.ATTRIB_VALUE_ENTITY_U:
              var pe, _e;
              switch (E.state) {
                case v.TEXT_ENTITY:
                  pe = v.TEXT, _e = "textNode";
                  break;
                case v.ATTRIB_VALUE_ENTITY_Q:
                  pe = v.ATTRIB_VALUE_QUOTED, _e = "attribValue";
                  break;
                case v.ATTRIB_VALUE_ENTITY_U:
                  pe = v.ATTRIB_VALUE_UNQUOTED, _e = "attribValue";
                  break;
              }
              if (F === ";") {
                var Ee = we(E);
                E.opt.unparsedEntities && !Object.values(d.XML_ENTITIES).includes(Ee) ? (E.entity = "", E.state = pe, E.write(Ee)) : (E[_e] += Ee, E.entity = "", E.state = pe);
              } else S(E.entity.length ? P : T, F) ? E.entity += F : (D(E, "Invalid character in entity name"), E[_e] += "&" + E.entity + F, E.entity = "", E.state = pe);
              continue;
            default:
              throw new Error(E, "Unknown state: " + E.state);
          }
        return E.position >= E.bufferCheckPosition && f(E), E;
      }
      String.fromCodePoint || (function() {
        var _ = String.fromCharCode, E = Math.floor, H = function() {
          var F = 16384, ce = [], he, pe, _e = -1, Ee = arguments.length;
          if (!Ee)
            return "";
          for (var He = ""; ++_e < Ee; ) {
            var Ae = Number(arguments[_e]);
            if (!isFinite(Ae) || // `NaN`, `+Infinity`, or `-Infinity`
            Ae < 0 || // not a valid Unicode code point
            Ae > 1114111 || // not a valid Unicode code point
            E(Ae) !== Ae)
              throw RangeError("Invalid code point: " + Ae);
            Ae <= 65535 ? ce.push(Ae) : (Ae -= 65536, he = (Ae >> 10) + 55296, pe = Ae % 1024 + 56320, ce.push(he, pe)), (_e + 1 === Ee || ce.length > F) && (He += _.apply(null, ce), ce.length = 0);
          }
          return He;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: H,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = H;
      })();
    })(n);
  })(Ln)), Ln;
}
var To;
function Jc() {
  if (To) return Nt;
  To = 1, Object.defineProperty(Nt, "__esModule", { value: !0 }), Nt.XElement = void 0, Nt.parseXml = a;
  const n = Kc(), d = Br();
  class m {
    constructor(o) {
      if (this.name = o, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !o)
        throw (0, d.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!f(o))
        throw (0, d.newError)(`Invalid element name: ${o}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(o) {
      const s = this.attributes === null ? null : this.attributes[o];
      if (s == null)
        throw (0, d.newError)(`No attribute "${o}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return s;
    }
    removeAttribute(o) {
      this.attributes !== null && delete this.attributes[o];
    }
    element(o, s = !1, i = null) {
      const t = this.elementOrNull(o, s);
      if (t === null)
        throw (0, d.newError)(i || `No element "${o}"`, "ERR_XML_MISSED_ELEMENT");
      return t;
    }
    elementOrNull(o, s = !1) {
      if (this.elements === null)
        return null;
      for (const i of this.elements)
        if (u(i, o, s))
          return i;
      return null;
    }
    getElements(o, s = !1) {
      return this.elements === null ? [] : this.elements.filter((i) => u(i, o, s));
    }
    elementValueOrEmpty(o, s = !1) {
      const i = this.elementOrNull(o, s);
      return i === null ? "" : i.value;
    }
  }
  Nt.XElement = m;
  const c = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function f(l) {
    return c.test(l);
  }
  function u(l, o, s) {
    const i = l.name;
    return i === o || s === !0 && i.length === o.length && i.toLowerCase() === o.toLowerCase();
  }
  function a(l) {
    let o = null;
    const s = n.parser(!0, {}), i = [];
    return s.onopentag = (t) => {
      const r = new m(t.name);
      if (r.attributes = t.attributes, o === null)
        o = r;
      else {
        const h = i[i.length - 1];
        h.elements == null && (h.elements = []), h.elements.push(r);
      }
      i.push(r);
    }, s.onclosetag = () => {
      i.pop();
    }, s.ontext = (t) => {
      i.length > 0 && (i[i.length - 1].value = t);
    }, s.oncdata = (t) => {
      const r = i[i.length - 1];
      r.value = t, r.isCData = !0;
    }, s.onerror = (t) => {
      throw t;
    }, s.write(l), o;
  }
  return Nt;
}
var So;
function Le() {
  return So || (So = 1, (function(n) {
    Object.defineProperty(n, "__esModule", { value: !0 }), n.CURRENT_APP_PACKAGE_FILE_NAME = n.CURRENT_APP_INSTALLER_FILE_NAME = n.XElement = n.parseXml = n.UUID = n.parseDn = n.retry = n.githubTagPrefix = n.githubUrl = n.getS3LikeProviderBaseUrl = n.ProgressCallbackTransform = n.MemoLazy = n.safeStringifyJson = n.safeGetHeader = n.parseJson = n.HttpExecutor = n.HttpError = n.DigestTransform = n.createHttpError = n.configureRequestUrl = n.configureRequestOptionsFromUrl = n.configureRequestOptions = n.newError = n.CancellationToken = n.CancellationError = void 0, n.asArray = t;
    var d = ra();
    Object.defineProperty(n, "CancellationError", { enumerable: !0, get: function() {
      return d.CancellationError;
    } }), Object.defineProperty(n, "CancellationToken", { enumerable: !0, get: function() {
      return d.CancellationToken;
    } });
    var m = Br();
    Object.defineProperty(n, "newError", { enumerable: !0, get: function() {
      return m.newError;
    } });
    var c = Gc();
    Object.defineProperty(n, "configureRequestOptions", { enumerable: !0, get: function() {
      return c.configureRequestOptions;
    } }), Object.defineProperty(n, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return c.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(n, "configureRequestUrl", { enumerable: !0, get: function() {
      return c.configureRequestUrl;
    } }), Object.defineProperty(n, "createHttpError", { enumerable: !0, get: function() {
      return c.createHttpError;
    } }), Object.defineProperty(n, "DigestTransform", { enumerable: !0, get: function() {
      return c.DigestTransform;
    } }), Object.defineProperty(n, "HttpError", { enumerable: !0, get: function() {
      return c.HttpError;
    } }), Object.defineProperty(n, "HttpExecutor", { enumerable: !0, get: function() {
      return c.HttpExecutor;
    } }), Object.defineProperty(n, "parseJson", { enumerable: !0, get: function() {
      return c.parseJson;
    } }), Object.defineProperty(n, "safeGetHeader", { enumerable: !0, get: function() {
      return c.safeGetHeader;
    } }), Object.defineProperty(n, "safeStringifyJson", { enumerable: !0, get: function() {
      return c.safeStringifyJson;
    } });
    var f = Wc();
    Object.defineProperty(n, "MemoLazy", { enumerable: !0, get: function() {
      return f.MemoLazy;
    } });
    var u = Ul();
    Object.defineProperty(n, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return u.ProgressCallbackTransform;
    } });
    var a = Vc();
    Object.defineProperty(n, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return a.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(n, "githubUrl", { enumerable: !0, get: function() {
      return a.githubUrl;
    } }), Object.defineProperty(n, "githubTagPrefix", { enumerable: !0, get: function() {
      return a.githubTagPrefix;
    } });
    var l = Yc();
    Object.defineProperty(n, "retry", { enumerable: !0, get: function() {
      return l.retry;
    } });
    var o = zc();
    Object.defineProperty(n, "parseDn", { enumerable: !0, get: function() {
      return o.parseDn;
    } });
    var s = Xc();
    Object.defineProperty(n, "UUID", { enumerable: !0, get: function() {
      return s.UUID;
    } });
    var i = Jc();
    Object.defineProperty(n, "parseXml", { enumerable: !0, get: function() {
      return i.parseXml;
    } }), Object.defineProperty(n, "XElement", { enumerable: !0, get: function() {
      return i.XElement;
    } }), n.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", n.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function t(r) {
      return r == null ? [] : Array.isArray(r) ? r : [r];
    }
  })(On)), On;
}
var qe = {}, Fr = {}, ct = {}, Co;
function mr() {
  if (Co) return ct;
  Co = 1;
  function n(a) {
    return typeof a > "u" || a === null;
  }
  function d(a) {
    return typeof a == "object" && a !== null;
  }
  function m(a) {
    return Array.isArray(a) ? a : n(a) ? [] : [a];
  }
  function c(a, l) {
    var o, s, i, t;
    if (l)
      for (t = Object.keys(l), o = 0, s = t.length; o < s; o += 1)
        i = t[o], a[i] = l[i];
    return a;
  }
  function f(a, l) {
    var o = "", s;
    for (s = 0; s < l; s += 1)
      o += a;
    return o;
  }
  function u(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return ct.isNothing = n, ct.isObject = d, ct.toArray = m, ct.repeat = f, ct.isNegativeZero = u, ct.extend = c, ct;
}
var xn, bo;
function gr() {
  if (bo) return xn;
  bo = 1;
  function n(m, c) {
    var f = "", u = m.reason || "(unknown reason)";
    return m.mark ? (m.mark.name && (f += 'in "' + m.mark.name + '" '), f += "(" + (m.mark.line + 1) + ":" + (m.mark.column + 1) + ")", !c && m.mark.snippet && (f += `

` + m.mark.snippet), u + " " + f) : u;
  }
  function d(m, c) {
    Error.call(this), this.name = "YAMLException", this.reason = m, this.mark = c, this.message = n(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return d.prototype = Object.create(Error.prototype), d.prototype.constructor = d, d.prototype.toString = function(c) {
    return this.name + ": " + n(this, c);
  }, xn = d, xn;
}
var Un, Po;
function Qc() {
  if (Po) return Un;
  Po = 1;
  var n = mr();
  function d(f, u, a, l, o) {
    var s = "", i = "", t = Math.floor(o / 2) - 1;
    return l - u > t && (s = " ... ", u = l - t + s.length), a - l > t && (i = " ...", a = l + t - i.length), {
      str: s + f.slice(u, a).replace(/\t/g, "→") + i,
      pos: l - u + s.length
      // relative position
    };
  }
  function m(f, u) {
    return n.repeat(" ", u - f.length) + f;
  }
  function c(f, u) {
    if (u = Object.create(u || null), !f.buffer) return null;
    u.maxLength || (u.maxLength = 79), typeof u.indent != "number" && (u.indent = 1), typeof u.linesBefore != "number" && (u.linesBefore = 3), typeof u.linesAfter != "number" && (u.linesAfter = 2);
    for (var a = /\r?\n|\r|\0/g, l = [0], o = [], s, i = -1; s = a.exec(f.buffer); )
      o.push(s.index), l.push(s.index + s[0].length), f.position <= s.index && i < 0 && (i = l.length - 2);
    i < 0 && (i = l.length - 1);
    var t = "", r, h, g = Math.min(f.line + u.linesAfter, o.length).toString().length, y = u.maxLength - (u.indent + g + 3);
    for (r = 1; r <= u.linesBefore && !(i - r < 0); r++)
      h = d(
        f.buffer,
        l[i - r],
        o[i - r],
        f.position - (l[i] - l[i - r]),
        y
      ), t = n.repeat(" ", u.indent) + m((f.line - r + 1).toString(), g) + " | " + h.str + `
` + t;
    for (h = d(f.buffer, l[i], o[i], f.position, y), t += n.repeat(" ", u.indent) + m((f.line + 1).toString(), g) + " | " + h.str + `
`, t += n.repeat("-", u.indent + g + 3 + h.pos) + `^
`, r = 1; r <= u.linesAfter && !(i + r >= o.length); r++)
      h = d(
        f.buffer,
        l[i + r],
        o[i + r],
        f.position - (l[i] - l[i + r]),
        y
      ), t += n.repeat(" ", u.indent) + m((f.line + r + 1).toString(), g) + " | " + h.str + `
`;
    return t.replace(/\n$/, "");
  }
  return Un = c, Un;
}
var kn, Oo;
function Me() {
  if (Oo) return kn;
  Oo = 1;
  var n = gr(), d = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], m = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function c(u) {
    var a = {};
    return u !== null && Object.keys(u).forEach(function(l) {
      u[l].forEach(function(o) {
        a[String(o)] = l;
      });
    }), a;
  }
  function f(u, a) {
    if (a = a || {}, Object.keys(a).forEach(function(l) {
      if (d.indexOf(l) === -1)
        throw new n('Unknown option "' + l + '" is met in definition of "' + u + '" YAML type.');
    }), this.options = a, this.tag = u, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(l) {
      return l;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = c(a.styleAliases || null), m.indexOf(this.kind) === -1)
      throw new n('Unknown kind "' + this.kind + '" is specified for "' + u + '" YAML type.');
  }
  return kn = f, kn;
}
var qn, Io;
function kl() {
  if (Io) return qn;
  Io = 1;
  var n = gr(), d = Me();
  function m(u, a) {
    var l = [];
    return u[a].forEach(function(o) {
      var s = l.length;
      l.forEach(function(i, t) {
        i.tag === o.tag && i.kind === o.kind && i.multi === o.multi && (s = t);
      }), l[s] = o;
    }), l;
  }
  function c() {
    var u = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, a, l;
    function o(s) {
      s.multi ? (u.multi[s.kind].push(s), u.multi.fallback.push(s)) : u[s.kind][s.tag] = u.fallback[s.tag] = s;
    }
    for (a = 0, l = arguments.length; a < l; a += 1)
      arguments[a].forEach(o);
    return u;
  }
  function f(u) {
    return this.extend(u);
  }
  return f.prototype.extend = function(a) {
    var l = [], o = [];
    if (a instanceof d)
      o.push(a);
    else if (Array.isArray(a))
      o = o.concat(a);
    else if (a && (Array.isArray(a.implicit) || Array.isArray(a.explicit)))
      a.implicit && (l = l.concat(a.implicit)), a.explicit && (o = o.concat(a.explicit));
    else
      throw new n("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    l.forEach(function(i) {
      if (!(i instanceof d))
        throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (i.loadKind && i.loadKind !== "scalar")
        throw new n("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (i.multi)
        throw new n("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), o.forEach(function(i) {
      if (!(i instanceof d))
        throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var s = Object.create(f.prototype);
    return s.implicit = (this.implicit || []).concat(l), s.explicit = (this.explicit || []).concat(o), s.compiledImplicit = m(s, "implicit"), s.compiledExplicit = m(s, "explicit"), s.compiledTypeMap = c(s.compiledImplicit, s.compiledExplicit), s;
  }, qn = f, qn;
}
var $n, Do;
function ql() {
  if (Do) return $n;
  Do = 1;
  var n = Me();
  return $n = new n("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(d) {
      return d !== null ? d : "";
    }
  }), $n;
}
var Mn, No;
function $l() {
  if (No) return Mn;
  No = 1;
  var n = Me();
  return Mn = new n("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(d) {
      return d !== null ? d : [];
    }
  }), Mn;
}
var Bn, Fo;
function Ml() {
  if (Fo) return Bn;
  Fo = 1;
  var n = Me();
  return Bn = new n("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(d) {
      return d !== null ? d : {};
    }
  }), Bn;
}
var Hn, Lo;
function Bl() {
  if (Lo) return Hn;
  Lo = 1;
  var n = kl();
  return Hn = new n({
    explicit: [
      ql(),
      $l(),
      Ml()
    ]
  }), Hn;
}
var jn, xo;
function Hl() {
  if (xo) return jn;
  xo = 1;
  var n = Me();
  function d(f) {
    if (f === null) return !0;
    var u = f.length;
    return u === 1 && f === "~" || u === 4 && (f === "null" || f === "Null" || f === "NULL");
  }
  function m() {
    return null;
  }
  function c(f) {
    return f === null;
  }
  return jn = new n("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: d,
    construct: m,
    predicate: c,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), jn;
}
var Gn, Uo;
function jl() {
  if (Uo) return Gn;
  Uo = 1;
  var n = Me();
  function d(f) {
    if (f === null) return !1;
    var u = f.length;
    return u === 4 && (f === "true" || f === "True" || f === "TRUE") || u === 5 && (f === "false" || f === "False" || f === "FALSE");
  }
  function m(f) {
    return f === "true" || f === "True" || f === "TRUE";
  }
  function c(f) {
    return Object.prototype.toString.call(f) === "[object Boolean]";
  }
  return Gn = new n("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: d,
    construct: m,
    predicate: c,
    represent: {
      lowercase: function(f) {
        return f ? "true" : "false";
      },
      uppercase: function(f) {
        return f ? "TRUE" : "FALSE";
      },
      camelcase: function(f) {
        return f ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), Gn;
}
var Wn, ko;
function Gl() {
  if (ko) return Wn;
  ko = 1;
  var n = mr(), d = Me();
  function m(o) {
    return 48 <= o && o <= 57 || 65 <= o && o <= 70 || 97 <= o && o <= 102;
  }
  function c(o) {
    return 48 <= o && o <= 55;
  }
  function f(o) {
    return 48 <= o && o <= 57;
  }
  function u(o) {
    if (o === null) return !1;
    var s = o.length, i = 0, t = !1, r;
    if (!s) return !1;
    if (r = o[i], (r === "-" || r === "+") && (r = o[++i]), r === "0") {
      if (i + 1 === s) return !0;
      if (r = o[++i], r === "b") {
        for (i++; i < s; i++)
          if (r = o[i], r !== "_") {
            if (r !== "0" && r !== "1") return !1;
            t = !0;
          }
        return t && r !== "_";
      }
      if (r === "x") {
        for (i++; i < s; i++)
          if (r = o[i], r !== "_") {
            if (!m(o.charCodeAt(i))) return !1;
            t = !0;
          }
        return t && r !== "_";
      }
      if (r === "o") {
        for (i++; i < s; i++)
          if (r = o[i], r !== "_") {
            if (!c(o.charCodeAt(i))) return !1;
            t = !0;
          }
        return t && r !== "_";
      }
    }
    if (r === "_") return !1;
    for (; i < s; i++)
      if (r = o[i], r !== "_") {
        if (!f(o.charCodeAt(i)))
          return !1;
        t = !0;
      }
    return !(!t || r === "_");
  }
  function a(o) {
    var s = o, i = 1, t;
    if (s.indexOf("_") !== -1 && (s = s.replace(/_/g, "")), t = s[0], (t === "-" || t === "+") && (t === "-" && (i = -1), s = s.slice(1), t = s[0]), s === "0") return 0;
    if (t === "0") {
      if (s[1] === "b") return i * parseInt(s.slice(2), 2);
      if (s[1] === "x") return i * parseInt(s.slice(2), 16);
      if (s[1] === "o") return i * parseInt(s.slice(2), 8);
    }
    return i * parseInt(s, 10);
  }
  function l(o) {
    return Object.prototype.toString.call(o) === "[object Number]" && o % 1 === 0 && !n.isNegativeZero(o);
  }
  return Wn = new d("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: u,
    construct: a,
    predicate: l,
    represent: {
      binary: function(o) {
        return o >= 0 ? "0b" + o.toString(2) : "-0b" + o.toString(2).slice(1);
      },
      octal: function(o) {
        return o >= 0 ? "0o" + o.toString(8) : "-0o" + o.toString(8).slice(1);
      },
      decimal: function(o) {
        return o.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(o) {
        return o >= 0 ? "0x" + o.toString(16).toUpperCase() : "-0x" + o.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), Wn;
}
var Vn, qo;
function Wl() {
  if (qo) return Vn;
  qo = 1;
  var n = mr(), d = Me(), m = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function c(o) {
    return !(o === null || !m.test(o) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    o[o.length - 1] === "_");
  }
  function f(o) {
    var s, i;
    return s = o.replace(/_/g, "").toLowerCase(), i = s[0] === "-" ? -1 : 1, "+-".indexOf(s[0]) >= 0 && (s = s.slice(1)), s === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : s === ".nan" ? NaN : i * parseFloat(s, 10);
  }
  var u = /^[-+]?[0-9]+e/;
  function a(o, s) {
    var i;
    if (isNaN(o))
      switch (s) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === o)
      switch (s) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === o)
      switch (s) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (n.isNegativeZero(o))
      return "-0.0";
    return i = o.toString(10), u.test(i) ? i.replace("e", ".e") : i;
  }
  function l(o) {
    return Object.prototype.toString.call(o) === "[object Number]" && (o % 1 !== 0 || n.isNegativeZero(o));
  }
  return Vn = new d("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: c,
    construct: f,
    predicate: l,
    represent: a,
    defaultStyle: "lowercase"
  }), Vn;
}
var Yn, $o;
function Vl() {
  return $o || ($o = 1, Yn = Bl().extend({
    implicit: [
      Hl(),
      jl(),
      Gl(),
      Wl()
    ]
  })), Yn;
}
var zn, Mo;
function Yl() {
  return Mo || (Mo = 1, zn = Vl()), zn;
}
var Xn, Bo;
function zl() {
  if (Bo) return Xn;
  Bo = 1;
  var n = Me(), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), m = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function c(a) {
    return a === null ? !1 : d.exec(a) !== null || m.exec(a) !== null;
  }
  function f(a) {
    var l, o, s, i, t, r, h, g = 0, y = null, p, w, T;
    if (l = d.exec(a), l === null && (l = m.exec(a)), l === null) throw new Error("Date resolve error");
    if (o = +l[1], s = +l[2] - 1, i = +l[3], !l[4])
      return new Date(Date.UTC(o, s, i));
    if (t = +l[4], r = +l[5], h = +l[6], l[7]) {
      for (g = l[7].slice(0, 3); g.length < 3; )
        g += "0";
      g = +g;
    }
    return l[9] && (p = +l[10], w = +(l[11] || 0), y = (p * 60 + w) * 6e4, l[9] === "-" && (y = -y)), T = new Date(Date.UTC(o, s, i, t, r, h, g)), y && T.setTime(T.getTime() - y), T;
  }
  function u(a) {
    return a.toISOString();
  }
  return Xn = new n("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: c,
    construct: f,
    instanceOf: Date,
    represent: u
  }), Xn;
}
var Kn, Ho;
function Xl() {
  if (Ho) return Kn;
  Ho = 1;
  var n = Me();
  function d(m) {
    return m === "<<" || m === null;
  }
  return Kn = new n("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: d
  }), Kn;
}
var Jn, jo;
function Kl() {
  if (jo) return Jn;
  jo = 1;
  var n = Me(), d = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function m(a) {
    if (a === null) return !1;
    var l, o, s = 0, i = a.length, t = d;
    for (o = 0; o < i; o++)
      if (l = t.indexOf(a.charAt(o)), !(l > 64)) {
        if (l < 0) return !1;
        s += 6;
      }
    return s % 8 === 0;
  }
  function c(a) {
    var l, o, s = a.replace(/[\r\n=]/g, ""), i = s.length, t = d, r = 0, h = [];
    for (l = 0; l < i; l++)
      l % 4 === 0 && l && (h.push(r >> 16 & 255), h.push(r >> 8 & 255), h.push(r & 255)), r = r << 6 | t.indexOf(s.charAt(l));
    return o = i % 4 * 6, o === 0 ? (h.push(r >> 16 & 255), h.push(r >> 8 & 255), h.push(r & 255)) : o === 18 ? (h.push(r >> 10 & 255), h.push(r >> 2 & 255)) : o === 12 && h.push(r >> 4 & 255), new Uint8Array(h);
  }
  function f(a) {
    var l = "", o = 0, s, i, t = a.length, r = d;
    for (s = 0; s < t; s++)
      s % 3 === 0 && s && (l += r[o >> 18 & 63], l += r[o >> 12 & 63], l += r[o >> 6 & 63], l += r[o & 63]), o = (o << 8) + a[s];
    return i = t % 3, i === 0 ? (l += r[o >> 18 & 63], l += r[o >> 12 & 63], l += r[o >> 6 & 63], l += r[o & 63]) : i === 2 ? (l += r[o >> 10 & 63], l += r[o >> 4 & 63], l += r[o << 2 & 63], l += r[64]) : i === 1 && (l += r[o >> 2 & 63], l += r[o << 4 & 63], l += r[64], l += r[64]), l;
  }
  function u(a) {
    return Object.prototype.toString.call(a) === "[object Uint8Array]";
  }
  return Jn = new n("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: m,
    construct: c,
    predicate: u,
    represent: f
  }), Jn;
}
var Qn, Go;
function Jl() {
  if (Go) return Qn;
  Go = 1;
  var n = Me(), d = Object.prototype.hasOwnProperty, m = Object.prototype.toString;
  function c(u) {
    if (u === null) return !0;
    var a = [], l, o, s, i, t, r = u;
    for (l = 0, o = r.length; l < o; l += 1) {
      if (s = r[l], t = !1, m.call(s) !== "[object Object]") return !1;
      for (i in s)
        if (d.call(s, i))
          if (!t) t = !0;
          else return !1;
      if (!t) return !1;
      if (a.indexOf(i) === -1) a.push(i);
      else return !1;
    }
    return !0;
  }
  function f(u) {
    return u !== null ? u : [];
  }
  return Qn = new n("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: c,
    construct: f
  }), Qn;
}
var Zn, Wo;
function Ql() {
  if (Wo) return Zn;
  Wo = 1;
  var n = Me(), d = Object.prototype.toString;
  function m(f) {
    if (f === null) return !0;
    var u, a, l, o, s, i = f;
    for (s = new Array(i.length), u = 0, a = i.length; u < a; u += 1) {
      if (l = i[u], d.call(l) !== "[object Object]" || (o = Object.keys(l), o.length !== 1)) return !1;
      s[u] = [o[0], l[o[0]]];
    }
    return !0;
  }
  function c(f) {
    if (f === null) return [];
    var u, a, l, o, s, i = f;
    for (s = new Array(i.length), u = 0, a = i.length; u < a; u += 1)
      l = i[u], o = Object.keys(l), s[u] = [o[0], l[o[0]]];
    return s;
  }
  return Zn = new n("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: m,
    construct: c
  }), Zn;
}
var ei, Vo;
function Zl() {
  if (Vo) return ei;
  Vo = 1;
  var n = Me(), d = Object.prototype.hasOwnProperty;
  function m(f) {
    if (f === null) return !0;
    var u, a = f;
    for (u in a)
      if (d.call(a, u) && a[u] !== null)
        return !1;
    return !0;
  }
  function c(f) {
    return f !== null ? f : {};
  }
  return ei = new n("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: m,
    construct: c
  }), ei;
}
var ti, Yo;
function na() {
  return Yo || (Yo = 1, ti = Yl().extend({
    implicit: [
      zl(),
      Xl()
    ],
    explicit: [
      Kl(),
      Jl(),
      Ql(),
      Zl()
    ]
  })), ti;
}
var zo;
function Zc() {
  if (zo) return Fr;
  zo = 1;
  var n = mr(), d = gr(), m = Qc(), c = na(), f = Object.prototype.hasOwnProperty, u = 1, a = 2, l = 3, o = 4, s = 1, i = 2, t = 3, r = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, h = /[\x85\u2028\u2029]/, g = /[,\[\]\{\}]/, y = /^(?:!|!!|![a-z\-]+!)$/i, p = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function w(e) {
    return Object.prototype.toString.call(e);
  }
  function T(e) {
    return e === 10 || e === 13;
  }
  function P(e) {
    return e === 9 || e === 32;
  }
  function I(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function b(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function O(e) {
    var B;
    return 48 <= e && e <= 57 ? e - 48 : (B = e | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function S(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function A(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function v(e) {
    return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
  }
  function k(e) {
    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
      (e - 65536 >> 10) + 55296,
      (e - 65536 & 1023) + 56320
    );
  }
  function q(e, B, W) {
    B === "__proto__" ? Object.defineProperty(e, B, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: W
    }) : e[B] = W;
  }
  for (var x = new Array(256), $ = new Array(256), L = 0; L < 256; L++)
    x[L] = v(L) ? 1 : 0, $[L] = v(L);
  function N(e, B) {
    this.input = e, this.filename = B.filename || null, this.schema = B.schema || c, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function j(e, B) {
    var W = {
      name: e.filename,
      buffer: e.input.slice(0, -1),
      // omit trailing \0
      position: e.position,
      line: e.line,
      column: e.position - e.lineStart
    };
    return W.snippet = m(W), new d(B, W);
  }
  function D(e, B) {
    throw j(e, B);
  }
  function G(e, B) {
    e.onWarning && e.onWarning.call(null, j(e, B));
  }
  var V = {
    YAML: function(B, W, ne) {
      var Y, re, Z;
      B.version !== null && D(B, "duplication of %YAML directive"), ne.length !== 1 && D(B, "YAML directive accepts exactly one argument"), Y = /^([0-9]+)\.([0-9]+)$/.exec(ne[0]), Y === null && D(B, "ill-formed argument of the YAML directive"), re = parseInt(Y[1], 10), Z = parseInt(Y[2], 10), re !== 1 && D(B, "unacceptable YAML version of the document"), B.version = ne[0], B.checkLineBreaks = Z < 2, Z !== 1 && Z !== 2 && G(B, "unsupported YAML version of the document");
    },
    TAG: function(B, W, ne) {
      var Y, re;
      ne.length !== 2 && D(B, "TAG directive accepts exactly two arguments"), Y = ne[0], re = ne[1], y.test(Y) || D(B, "ill-formed tag handle (first argument) of the TAG directive"), f.call(B.tagMap, Y) && D(B, 'there is a previously declared suffix for "' + Y + '" tag handle'), p.test(re) || D(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        re = decodeURIComponent(re);
      } catch {
        D(B, "tag prefix is malformed: " + re);
      }
      B.tagMap[Y] = re;
    }
  };
  function te(e, B, W, ne) {
    var Y, re, Z, oe;
    if (B < W) {
      if (oe = e.input.slice(B, W), ne)
        for (Y = 0, re = oe.length; Y < re; Y += 1)
          Z = oe.charCodeAt(Y), Z === 9 || 32 <= Z && Z <= 1114111 || D(e, "expected valid JSON character");
      else r.test(oe) && D(e, "the stream contains non-printable characters");
      e.result += oe;
    }
  }
  function de(e, B, W, ne) {
    var Y, re, Z, oe;
    for (n.isObject(W) || D(e, "cannot merge mappings; the provided source object is unacceptable"), Y = Object.keys(W), Z = 0, oe = Y.length; Z < oe; Z += 1)
      re = Y[Z], f.call(B, re) || (q(B, re, W[re]), ne[re] = !0);
  }
  function ie(e, B, W, ne, Y, re, Z, oe, ue) {
    var Te, Se;
    if (Array.isArray(Y))
      for (Y = Array.prototype.slice.call(Y), Te = 0, Se = Y.length; Te < Se; Te += 1)
        Array.isArray(Y[Te]) && D(e, "nested arrays are not supported inside keys"), typeof Y == "object" && w(Y[Te]) === "[object Object]" && (Y[Te] = "[object Object]");
    if (typeof Y == "object" && w(Y) === "[object Object]" && (Y = "[object Object]"), Y = String(Y), B === null && (B = {}), ne === "tag:yaml.org,2002:merge")
      if (Array.isArray(re))
        for (Te = 0, Se = re.length; Te < Se; Te += 1)
          de(e, B, re[Te], W);
      else
        de(e, B, re, W);
    else
      !e.json && !f.call(W, Y) && f.call(B, Y) && (e.line = Z || e.line, e.lineStart = oe || e.lineStart, e.position = ue || e.position, D(e, "duplicated mapping key")), q(B, Y, re), delete W[Y];
    return B;
  }
  function we(e) {
    var B;
    B = e.input.charCodeAt(e.position), B === 10 ? e.position++ : B === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : D(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
  }
  function ve(e, B, W) {
    for (var ne = 0, Y = e.input.charCodeAt(e.position); Y !== 0; ) {
      for (; P(Y); )
        Y === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), Y = e.input.charCodeAt(++e.position);
      if (B && Y === 35)
        do
          Y = e.input.charCodeAt(++e.position);
        while (Y !== 10 && Y !== 13 && Y !== 0);
      if (T(Y))
        for (we(e), Y = e.input.charCodeAt(e.position), ne++, e.lineIndent = 0; Y === 32; )
          e.lineIndent++, Y = e.input.charCodeAt(++e.position);
      else
        break;
    }
    return W !== -1 && ne !== 0 && e.lineIndent < W && G(e, "deficient indentation"), ne;
  }
  function Q(e) {
    var B = e.position, W;
    return W = e.input.charCodeAt(B), !!((W === 45 || W === 46) && W === e.input.charCodeAt(B + 1) && W === e.input.charCodeAt(B + 2) && (B += 3, W = e.input.charCodeAt(B), W === 0 || I(W)));
  }
  function ge(e, B) {
    B === 1 ? e.result += " " : B > 1 && (e.result += n.repeat(`
`, B - 1));
  }
  function _(e, B, W) {
    var ne, Y, re, Z, oe, ue, Te, Se, me = e.kind, R = e.result, M;
    if (M = e.input.charCodeAt(e.position), I(M) || b(M) || M === 35 || M === 38 || M === 42 || M === 33 || M === 124 || M === 62 || M === 39 || M === 34 || M === 37 || M === 64 || M === 96 || (M === 63 || M === 45) && (Y = e.input.charCodeAt(e.position + 1), I(Y) || W && b(Y)))
      return !1;
    for (e.kind = "scalar", e.result = "", re = Z = e.position, oe = !1; M !== 0; ) {
      if (M === 58) {
        if (Y = e.input.charCodeAt(e.position + 1), I(Y) || W && b(Y))
          break;
      } else if (M === 35) {
        if (ne = e.input.charCodeAt(e.position - 1), I(ne))
          break;
      } else {
        if (e.position === e.lineStart && Q(e) || W && b(M))
          break;
        if (T(M))
          if (ue = e.line, Te = e.lineStart, Se = e.lineIndent, ve(e, !1, -1), e.lineIndent >= B) {
            oe = !0, M = e.input.charCodeAt(e.position);
            continue;
          } else {
            e.position = Z, e.line = ue, e.lineStart = Te, e.lineIndent = Se;
            break;
          }
      }
      oe && (te(e, re, Z, !1), ge(e, e.line - ue), re = Z = e.position, oe = !1), P(M) || (Z = e.position + 1), M = e.input.charCodeAt(++e.position);
    }
    return te(e, re, Z, !1), e.result ? !0 : (e.kind = me, e.result = R, !1);
  }
  function E(e, B) {
    var W, ne, Y;
    if (W = e.input.charCodeAt(e.position), W !== 39)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, ne = Y = e.position; (W = e.input.charCodeAt(e.position)) !== 0; )
      if (W === 39)
        if (te(e, ne, e.position, !0), W = e.input.charCodeAt(++e.position), W === 39)
          ne = e.position, e.position++, Y = e.position;
        else
          return !0;
      else T(W) ? (te(e, ne, Y, !0), ge(e, ve(e, !1, B)), ne = Y = e.position) : e.position === e.lineStart && Q(e) ? D(e, "unexpected end of the document within a single quoted scalar") : (e.position++, Y = e.position);
    D(e, "unexpected end of the stream within a single quoted scalar");
  }
  function H(e, B) {
    var W, ne, Y, re, Z, oe;
    if (oe = e.input.charCodeAt(e.position), oe !== 34)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, W = ne = e.position; (oe = e.input.charCodeAt(e.position)) !== 0; ) {
      if (oe === 34)
        return te(e, W, e.position, !0), e.position++, !0;
      if (oe === 92) {
        if (te(e, W, e.position, !0), oe = e.input.charCodeAt(++e.position), T(oe))
          ve(e, !1, B);
        else if (oe < 256 && x[oe])
          e.result += $[oe], e.position++;
        else if ((Z = S(oe)) > 0) {
          for (Y = Z, re = 0; Y > 0; Y--)
            oe = e.input.charCodeAt(++e.position), (Z = O(oe)) >= 0 ? re = (re << 4) + Z : D(e, "expected hexadecimal character");
          e.result += k(re), e.position++;
        } else
          D(e, "unknown escape sequence");
        W = ne = e.position;
      } else T(oe) ? (te(e, W, ne, !0), ge(e, ve(e, !1, B)), W = ne = e.position) : e.position === e.lineStart && Q(e) ? D(e, "unexpected end of the document within a double quoted scalar") : (e.position++, ne = e.position);
    }
    D(e, "unexpected end of the stream within a double quoted scalar");
  }
  function F(e, B) {
    var W = !0, ne, Y, re, Z = e.tag, oe, ue = e.anchor, Te, Se, me, R, M, z = /* @__PURE__ */ Object.create(null), X, K, ae, ee;
    if (ee = e.input.charCodeAt(e.position), ee === 91)
      Se = 93, M = !1, oe = [];
    else if (ee === 123)
      Se = 125, M = !0, oe = {};
    else
      return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = oe), ee = e.input.charCodeAt(++e.position); ee !== 0; ) {
      if (ve(e, !0, B), ee = e.input.charCodeAt(e.position), ee === Se)
        return e.position++, e.tag = Z, e.anchor = ue, e.kind = M ? "mapping" : "sequence", e.result = oe, !0;
      W ? ee === 44 && D(e, "expected the node content, but found ','") : D(e, "missed comma between flow collection entries"), K = X = ae = null, me = R = !1, ee === 63 && (Te = e.input.charCodeAt(e.position + 1), I(Te) && (me = R = !0, e.position++, ve(e, !0, B))), ne = e.line, Y = e.lineStart, re = e.position, Ae(e, B, u, !1, !0), K = e.tag, X = e.result, ve(e, !0, B), ee = e.input.charCodeAt(e.position), (R || e.line === ne) && ee === 58 && (me = !0, ee = e.input.charCodeAt(++e.position), ve(e, !0, B), Ae(e, B, u, !1, !0), ae = e.result), M ? ie(e, oe, z, K, X, ae, ne, Y, re) : me ? oe.push(ie(e, null, z, K, X, ae, ne, Y, re)) : oe.push(X), ve(e, !0, B), ee = e.input.charCodeAt(e.position), ee === 44 ? (W = !0, ee = e.input.charCodeAt(++e.position)) : W = !1;
    }
    D(e, "unexpected end of the stream within a flow collection");
  }
  function ce(e, B) {
    var W, ne, Y = s, re = !1, Z = !1, oe = B, ue = 0, Te = !1, Se, me;
    if (me = e.input.charCodeAt(e.position), me === 124)
      ne = !1;
    else if (me === 62)
      ne = !0;
    else
      return !1;
    for (e.kind = "scalar", e.result = ""; me !== 0; )
      if (me = e.input.charCodeAt(++e.position), me === 43 || me === 45)
        s === Y ? Y = me === 43 ? t : i : D(e, "repeat of a chomping mode identifier");
      else if ((Se = A(me)) >= 0)
        Se === 0 ? D(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : Z ? D(e, "repeat of an indentation width identifier") : (oe = B + Se - 1, Z = !0);
      else
        break;
    if (P(me)) {
      do
        me = e.input.charCodeAt(++e.position);
      while (P(me));
      if (me === 35)
        do
          me = e.input.charCodeAt(++e.position);
        while (!T(me) && me !== 0);
    }
    for (; me !== 0; ) {
      for (we(e), e.lineIndent = 0, me = e.input.charCodeAt(e.position); (!Z || e.lineIndent < oe) && me === 32; )
        e.lineIndent++, me = e.input.charCodeAt(++e.position);
      if (!Z && e.lineIndent > oe && (oe = e.lineIndent), T(me)) {
        ue++;
        continue;
      }
      if (e.lineIndent < oe) {
        Y === t ? e.result += n.repeat(`
`, re ? 1 + ue : ue) : Y === s && re && (e.result += `
`);
        break;
      }
      for (ne ? P(me) ? (Te = !0, e.result += n.repeat(`
`, re ? 1 + ue : ue)) : Te ? (Te = !1, e.result += n.repeat(`
`, ue + 1)) : ue === 0 ? re && (e.result += " ") : e.result += n.repeat(`
`, ue) : e.result += n.repeat(`
`, re ? 1 + ue : ue), re = !0, Z = !0, ue = 0, W = e.position; !T(me) && me !== 0; )
        me = e.input.charCodeAt(++e.position);
      te(e, W, e.position, !1);
    }
    return !0;
  }
  function he(e, B) {
    var W, ne = e.tag, Y = e.anchor, re = [], Z, oe = !1, ue;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = re), ue = e.input.charCodeAt(e.position); ue !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, D(e, "tab characters must not be used in indentation")), !(ue !== 45 || (Z = e.input.charCodeAt(e.position + 1), !I(Z)))); ) {
      if (oe = !0, e.position++, ve(e, !0, -1) && e.lineIndent <= B) {
        re.push(null), ue = e.input.charCodeAt(e.position);
        continue;
      }
      if (W = e.line, Ae(e, B, l, !1, !0), re.push(e.result), ve(e, !0, -1), ue = e.input.charCodeAt(e.position), (e.line === W || e.lineIndent > B) && ue !== 0)
        D(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < B)
        break;
    }
    return oe ? (e.tag = ne, e.anchor = Y, e.kind = "sequence", e.result = re, !0) : !1;
  }
  function pe(e, B, W) {
    var ne, Y, re, Z, oe, ue, Te = e.tag, Se = e.anchor, me = {}, R = /* @__PURE__ */ Object.create(null), M = null, z = null, X = null, K = !1, ae = !1, ee;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = me), ee = e.input.charCodeAt(e.position); ee !== 0; ) {
      if (!K && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, D(e, "tab characters must not be used in indentation")), ne = e.input.charCodeAt(e.position + 1), re = e.line, (ee === 63 || ee === 58) && I(ne))
        ee === 63 ? (K && (ie(e, me, R, M, z, null, Z, oe, ue), M = z = X = null), ae = !0, K = !0, Y = !0) : K ? (K = !1, Y = !0) : D(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, ee = ne;
      else {
        if (Z = e.line, oe = e.lineStart, ue = e.position, !Ae(e, W, a, !1, !0))
          break;
        if (e.line === re) {
          for (ee = e.input.charCodeAt(e.position); P(ee); )
            ee = e.input.charCodeAt(++e.position);
          if (ee === 58)
            ee = e.input.charCodeAt(++e.position), I(ee) || D(e, "a whitespace character is expected after the key-value separator within a block mapping"), K && (ie(e, me, R, M, z, null, Z, oe, ue), M = z = X = null), ae = !0, K = !1, Y = !1, M = e.tag, z = e.result;
          else if (ae)
            D(e, "can not read an implicit mapping pair; a colon is missed");
          else
            return e.tag = Te, e.anchor = Se, !0;
        } else if (ae)
          D(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return e.tag = Te, e.anchor = Se, !0;
      }
      if ((e.line === re || e.lineIndent > B) && (K && (Z = e.line, oe = e.lineStart, ue = e.position), Ae(e, B, o, !0, Y) && (K ? z = e.result : X = e.result), K || (ie(e, me, R, M, z, X, Z, oe, ue), M = z = X = null), ve(e, !0, -1), ee = e.input.charCodeAt(e.position)), (e.line === re || e.lineIndent > B) && ee !== 0)
        D(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < B)
        break;
    }
    return K && ie(e, me, R, M, z, null, Z, oe, ue), ae && (e.tag = Te, e.anchor = Se, e.kind = "mapping", e.result = me), ae;
  }
  function _e(e) {
    var B, W = !1, ne = !1, Y, re, Z;
    if (Z = e.input.charCodeAt(e.position), Z !== 33) return !1;
    if (e.tag !== null && D(e, "duplication of a tag property"), Z = e.input.charCodeAt(++e.position), Z === 60 ? (W = !0, Z = e.input.charCodeAt(++e.position)) : Z === 33 ? (ne = !0, Y = "!!", Z = e.input.charCodeAt(++e.position)) : Y = "!", B = e.position, W) {
      do
        Z = e.input.charCodeAt(++e.position);
      while (Z !== 0 && Z !== 62);
      e.position < e.length ? (re = e.input.slice(B, e.position), Z = e.input.charCodeAt(++e.position)) : D(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Z !== 0 && !I(Z); )
        Z === 33 && (ne ? D(e, "tag suffix cannot contain exclamation marks") : (Y = e.input.slice(B - 1, e.position + 1), y.test(Y) || D(e, "named tag handle cannot contain such characters"), ne = !0, B = e.position + 1)), Z = e.input.charCodeAt(++e.position);
      re = e.input.slice(B, e.position), g.test(re) && D(e, "tag suffix cannot contain flow indicator characters");
    }
    re && !p.test(re) && D(e, "tag name cannot contain such characters: " + re);
    try {
      re = decodeURIComponent(re);
    } catch {
      D(e, "tag name is malformed: " + re);
    }
    return W ? e.tag = re : f.call(e.tagMap, Y) ? e.tag = e.tagMap[Y] + re : Y === "!" ? e.tag = "!" + re : Y === "!!" ? e.tag = "tag:yaml.org,2002:" + re : D(e, 'undeclared tag handle "' + Y + '"'), !0;
  }
  function Ee(e) {
    var B, W;
    if (W = e.input.charCodeAt(e.position), W !== 38) return !1;
    for (e.anchor !== null && D(e, "duplication of an anchor property"), W = e.input.charCodeAt(++e.position), B = e.position; W !== 0 && !I(W) && !b(W); )
      W = e.input.charCodeAt(++e.position);
    return e.position === B && D(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(B, e.position), !0;
  }
  function He(e) {
    var B, W, ne;
    if (ne = e.input.charCodeAt(e.position), ne !== 42) return !1;
    for (ne = e.input.charCodeAt(++e.position), B = e.position; ne !== 0 && !I(ne) && !b(ne); )
      ne = e.input.charCodeAt(++e.position);
    return e.position === B && D(e, "name of an alias node must contain at least one character"), W = e.input.slice(B, e.position), f.call(e.anchorMap, W) || D(e, 'unidentified alias "' + W + '"'), e.result = e.anchorMap[W], ve(e, !0, -1), !0;
  }
  function Ae(e, B, W, ne, Y) {
    var re, Z, oe, ue = 1, Te = !1, Se = !1, me, R, M, z, X, K;
    if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, re = Z = oe = o === W || l === W, ne && ve(e, !0, -1) && (Te = !0, e.lineIndent > B ? ue = 1 : e.lineIndent === B ? ue = 0 : e.lineIndent < B && (ue = -1)), ue === 1)
      for (; _e(e) || Ee(e); )
        ve(e, !0, -1) ? (Te = !0, oe = re, e.lineIndent > B ? ue = 1 : e.lineIndent === B ? ue = 0 : e.lineIndent < B && (ue = -1)) : oe = !1;
    if (oe && (oe = Te || Y), (ue === 1 || o === W) && (u === W || a === W ? X = B : X = B + 1, K = e.position - e.lineStart, ue === 1 ? oe && (he(e, K) || pe(e, K, X)) || F(e, X) ? Se = !0 : (Z && ce(e, X) || E(e, X) || H(e, X) ? Se = !0 : He(e) ? (Se = !0, (e.tag !== null || e.anchor !== null) && D(e, "alias node should not have any properties")) : _(e, X, u === W) && (Se = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : ue === 0 && (Se = oe && he(e, K))), e.tag === null)
      e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
    else if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && D(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), me = 0, R = e.implicitTypes.length; me < R; me += 1)
        if (z = e.implicitTypes[me], z.resolve(e.result)) {
          e.result = z.construct(e.result), e.tag = z.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else if (e.tag !== "!") {
      if (f.call(e.typeMap[e.kind || "fallback"], e.tag))
        z = e.typeMap[e.kind || "fallback"][e.tag];
      else
        for (z = null, M = e.typeMap.multi[e.kind || "fallback"], me = 0, R = M.length; me < R; me += 1)
          if (e.tag.slice(0, M[me].tag.length) === M[me].tag) {
            z = M[me];
            break;
          }
      z || D(e, "unknown tag !<" + e.tag + ">"), e.result !== null && z.kind !== e.kind && D(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + z.kind + '", not "' + e.kind + '"'), z.resolve(e.result, e.tag) ? (e.result = z.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : D(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
    }
    return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || Se;
  }
  function $e(e) {
    var B = e.position, W, ne, Y, re = !1, Z;
    for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (Z = e.input.charCodeAt(e.position)) !== 0 && (ve(e, !0, -1), Z = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || Z !== 37)); ) {
      for (re = !0, Z = e.input.charCodeAt(++e.position), W = e.position; Z !== 0 && !I(Z); )
        Z = e.input.charCodeAt(++e.position);
      for (ne = e.input.slice(W, e.position), Y = [], ne.length < 1 && D(e, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; P(Z); )
          Z = e.input.charCodeAt(++e.position);
        if (Z === 35) {
          do
            Z = e.input.charCodeAt(++e.position);
          while (Z !== 0 && !T(Z));
          break;
        }
        if (T(Z)) break;
        for (W = e.position; Z !== 0 && !I(Z); )
          Z = e.input.charCodeAt(++e.position);
        Y.push(e.input.slice(W, e.position));
      }
      Z !== 0 && we(e), f.call(V, ne) ? V[ne](e, ne, Y) : G(e, 'unknown document directive "' + ne + '"');
    }
    if (ve(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ve(e, !0, -1)) : re && D(e, "directives end mark is expected"), Ae(e, e.lineIndent - 1, o, !1, !0), ve(e, !0, -1), e.checkLineBreaks && h.test(e.input.slice(B, e.position)) && G(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Q(e)) {
      e.input.charCodeAt(e.position) === 46 && (e.position += 3, ve(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      D(e, "end of the stream or a document separator is expected");
    else
      return;
  }
  function ot(e, B) {
    e = String(e), B = B || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var W = new N(e, B), ne = e.indexOf("\0");
    for (ne !== -1 && (W.position = ne, D(W, "null byte is not allowed in input")), W.input += "\0"; W.input.charCodeAt(W.position) === 32; )
      W.lineIndent += 1, W.position += 1;
    for (; W.position < W.length - 1; )
      $e(W);
    return W.documents;
  }
  function rt(e, B, W) {
    B !== null && typeof B == "object" && typeof W > "u" && (W = B, B = null);
    var ne = ot(e, W);
    if (typeof B != "function")
      return ne;
    for (var Y = 0, re = ne.length; Y < re; Y += 1)
      B(ne[Y]);
  }
  function et(e, B) {
    var W = ot(e, B);
    if (W.length !== 0) {
      if (W.length === 1)
        return W[0];
      throw new d("expected a single document in the stream, but found more");
    }
  }
  return Fr.loadAll = rt, Fr.load = et, Fr;
}
var ri = {}, Xo;
function ef() {
  if (Xo) return ri;
  Xo = 1;
  var n = mr(), d = gr(), m = na(), c = Object.prototype.toString, f = Object.prototype.hasOwnProperty, u = 65279, a = 9, l = 10, o = 13, s = 32, i = 33, t = 34, r = 35, h = 37, g = 38, y = 39, p = 42, w = 44, T = 45, P = 58, I = 61, b = 62, O = 63, S = 64, A = 91, v = 93, k = 96, q = 123, x = 124, $ = 125, L = {};
  L[0] = "\\0", L[7] = "\\a", L[8] = "\\b", L[9] = "\\t", L[10] = "\\n", L[11] = "\\v", L[12] = "\\f", L[13] = "\\r", L[27] = "\\e", L[34] = '\\"', L[92] = "\\\\", L[133] = "\\N", L[160] = "\\_", L[8232] = "\\L", L[8233] = "\\P";
  var N = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], j = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function D(R, M) {
    var z, X, K, ae, ee, se, fe;
    if (M === null) return {};
    for (z = {}, X = Object.keys(M), K = 0, ae = X.length; K < ae; K += 1)
      ee = X[K], se = String(M[ee]), ee.slice(0, 2) === "!!" && (ee = "tag:yaml.org,2002:" + ee.slice(2)), fe = R.compiledTypeMap.fallback[ee], fe && f.call(fe.styleAliases, se) && (se = fe.styleAliases[se]), z[ee] = se;
    return z;
  }
  function G(R) {
    var M, z, X;
    if (M = R.toString(16).toUpperCase(), R <= 255)
      z = "x", X = 2;
    else if (R <= 65535)
      z = "u", X = 4;
    else if (R <= 4294967295)
      z = "U", X = 8;
    else
      throw new d("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + z + n.repeat("0", X - M.length) + M;
  }
  var V = 1, te = 2;
  function de(R) {
    this.schema = R.schema || m, this.indent = Math.max(1, R.indent || 2), this.noArrayIndent = R.noArrayIndent || !1, this.skipInvalid = R.skipInvalid || !1, this.flowLevel = n.isNothing(R.flowLevel) ? -1 : R.flowLevel, this.styleMap = D(this.schema, R.styles || null), this.sortKeys = R.sortKeys || !1, this.lineWidth = R.lineWidth || 80, this.noRefs = R.noRefs || !1, this.noCompatMode = R.noCompatMode || !1, this.condenseFlow = R.condenseFlow || !1, this.quotingType = R.quotingType === '"' ? te : V, this.forceQuotes = R.forceQuotes || !1, this.replacer = typeof R.replacer == "function" ? R.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ie(R, M) {
    for (var z = n.repeat(" ", M), X = 0, K = -1, ae = "", ee, se = R.length; X < se; )
      K = R.indexOf(`
`, X), K === -1 ? (ee = R.slice(X), X = se) : (ee = R.slice(X, K + 1), X = K + 1), ee.length && ee !== `
` && (ae += z), ae += ee;
    return ae;
  }
  function we(R, M) {
    return `
` + n.repeat(" ", R.indent * M);
  }
  function ve(R, M) {
    var z, X, K;
    for (z = 0, X = R.implicitTypes.length; z < X; z += 1)
      if (K = R.implicitTypes[z], K.resolve(M))
        return !0;
    return !1;
  }
  function Q(R) {
    return R === s || R === a;
  }
  function ge(R) {
    return 32 <= R && R <= 126 || 161 <= R && R <= 55295 && R !== 8232 && R !== 8233 || 57344 <= R && R <= 65533 && R !== u || 65536 <= R && R <= 1114111;
  }
  function _(R) {
    return ge(R) && R !== u && R !== o && R !== l;
  }
  function E(R, M, z) {
    var X = _(R), K = X && !Q(R);
    return (
      // ns-plain-safe
      (z ? (
        // c = flow-in
        X
      ) : X && R !== w && R !== A && R !== v && R !== q && R !== $) && R !== r && !(M === P && !K) || _(M) && !Q(M) && R === r || M === P && K
    );
  }
  function H(R) {
    return ge(R) && R !== u && !Q(R) && R !== T && R !== O && R !== P && R !== w && R !== A && R !== v && R !== q && R !== $ && R !== r && R !== g && R !== p && R !== i && R !== x && R !== I && R !== b && R !== y && R !== t && R !== h && R !== S && R !== k;
  }
  function F(R) {
    return !Q(R) && R !== P;
  }
  function ce(R, M) {
    var z = R.charCodeAt(M), X;
    return z >= 55296 && z <= 56319 && M + 1 < R.length && (X = R.charCodeAt(M + 1), X >= 56320 && X <= 57343) ? (z - 55296) * 1024 + X - 56320 + 65536 : z;
  }
  function he(R) {
    var M = /^\n* /;
    return M.test(R);
  }
  var pe = 1, _e = 2, Ee = 3, He = 4, Ae = 5;
  function $e(R, M, z, X, K, ae, ee, se) {
    var fe, ye = 0, be = null, De = !1, Ce = !1, Ot = X !== -1, Xe = -1, gt = H(ce(R, 0)) && F(ce(R, R.length - 1));
    if (M || ee)
      for (fe = 0; fe < R.length; ye >= 65536 ? fe += 2 : fe++) {
        if (ye = ce(R, fe), !ge(ye))
          return Ae;
        gt = gt && E(ye, be, se), be = ye;
      }
    else {
      for (fe = 0; fe < R.length; ye >= 65536 ? fe += 2 : fe++) {
        if (ye = ce(R, fe), ye === l)
          De = !0, Ot && (Ce = Ce || // Foldable line = too long, and not more-indented.
          fe - Xe - 1 > X && R[Xe + 1] !== " ", Xe = fe);
        else if (!ge(ye))
          return Ae;
        gt = gt && E(ye, be, se), be = ye;
      }
      Ce = Ce || Ot && fe - Xe - 1 > X && R[Xe + 1] !== " ";
    }
    return !De && !Ce ? gt && !ee && !K(R) ? pe : ae === te ? Ae : _e : z > 9 && he(R) ? Ae : ee ? ae === te ? Ae : _e : Ce ? He : Ee;
  }
  function ot(R, M, z, X, K) {
    R.dump = (function() {
      if (M.length === 0)
        return R.quotingType === te ? '""' : "''";
      if (!R.noCompatMode && (N.indexOf(M) !== -1 || j.test(M)))
        return R.quotingType === te ? '"' + M + '"' : "'" + M + "'";
      var ae = R.indent * Math.max(1, z), ee = R.lineWidth === -1 ? -1 : Math.max(Math.min(R.lineWidth, 40), R.lineWidth - ae), se = X || R.flowLevel > -1 && z >= R.flowLevel;
      function fe(ye) {
        return ve(R, ye);
      }
      switch ($e(
        M,
        se,
        R.indent,
        ee,
        fe,
        R.quotingType,
        R.forceQuotes && !X,
        K
      )) {
        case pe:
          return M;
        case _e:
          return "'" + M.replace(/'/g, "''") + "'";
        case Ee:
          return "|" + rt(M, R.indent) + et(ie(M, ae));
        case He:
          return ">" + rt(M, R.indent) + et(ie(e(M, ee), ae));
        case Ae:
          return '"' + W(M) + '"';
        default:
          throw new d("impossible error: invalid scalar style");
      }
    })();
  }
  function rt(R, M) {
    var z = he(R) ? String(M) : "", X = R[R.length - 1] === `
`, K = X && (R[R.length - 2] === `
` || R === `
`), ae = K ? "+" : X ? "" : "-";
    return z + ae + `
`;
  }
  function et(R) {
    return R[R.length - 1] === `
` ? R.slice(0, -1) : R;
  }
  function e(R, M) {
    for (var z = /(\n+)([^\n]*)/g, X = (function() {
      var ye = R.indexOf(`
`);
      return ye = ye !== -1 ? ye : R.length, z.lastIndex = ye, B(R.slice(0, ye), M);
    })(), K = R[0] === `
` || R[0] === " ", ae, ee; ee = z.exec(R); ) {
      var se = ee[1], fe = ee[2];
      ae = fe[0] === " ", X += se + (!K && !ae && fe !== "" ? `
` : "") + B(fe, M), K = ae;
    }
    return X;
  }
  function B(R, M) {
    if (R === "" || R[0] === " ") return R;
    for (var z = / [^ ]/g, X, K = 0, ae, ee = 0, se = 0, fe = ""; X = z.exec(R); )
      se = X.index, se - K > M && (ae = ee > K ? ee : se, fe += `
` + R.slice(K, ae), K = ae + 1), ee = se;
    return fe += `
`, R.length - K > M && ee > K ? fe += R.slice(K, ee) + `
` + R.slice(ee + 1) : fe += R.slice(K), fe.slice(1);
  }
  function W(R) {
    for (var M = "", z = 0, X, K = 0; K < R.length; z >= 65536 ? K += 2 : K++)
      z = ce(R, K), X = L[z], !X && ge(z) ? (M += R[K], z >= 65536 && (M += R[K + 1])) : M += X || G(z);
    return M;
  }
  function ne(R, M, z) {
    var X = "", K = R.tag, ae, ee, se;
    for (ae = 0, ee = z.length; ae < ee; ae += 1)
      se = z[ae], R.replacer && (se = R.replacer.call(z, String(ae), se)), (ue(R, M, se, !1, !1) || typeof se > "u" && ue(R, M, null, !1, !1)) && (X !== "" && (X += "," + (R.condenseFlow ? "" : " ")), X += R.dump);
    R.tag = K, R.dump = "[" + X + "]";
  }
  function Y(R, M, z, X) {
    var K = "", ae = R.tag, ee, se, fe;
    for (ee = 0, se = z.length; ee < se; ee += 1)
      fe = z[ee], R.replacer && (fe = R.replacer.call(z, String(ee), fe)), (ue(R, M + 1, fe, !0, !0, !1, !0) || typeof fe > "u" && ue(R, M + 1, null, !0, !0, !1, !0)) && ((!X || K !== "") && (K += we(R, M)), R.dump && l === R.dump.charCodeAt(0) ? K += "-" : K += "- ", K += R.dump);
    R.tag = ae, R.dump = K || "[]";
  }
  function re(R, M, z) {
    var X = "", K = R.tag, ae = Object.keys(z), ee, se, fe, ye, be;
    for (ee = 0, se = ae.length; ee < se; ee += 1)
      be = "", X !== "" && (be += ", "), R.condenseFlow && (be += '"'), fe = ae[ee], ye = z[fe], R.replacer && (ye = R.replacer.call(z, fe, ye)), ue(R, M, fe, !1, !1) && (R.dump.length > 1024 && (be += "? "), be += R.dump + (R.condenseFlow ? '"' : "") + ":" + (R.condenseFlow ? "" : " "), ue(R, M, ye, !1, !1) && (be += R.dump, X += be));
    R.tag = K, R.dump = "{" + X + "}";
  }
  function Z(R, M, z, X) {
    var K = "", ae = R.tag, ee = Object.keys(z), se, fe, ye, be, De, Ce;
    if (R.sortKeys === !0)
      ee.sort();
    else if (typeof R.sortKeys == "function")
      ee.sort(R.sortKeys);
    else if (R.sortKeys)
      throw new d("sortKeys must be a boolean or a function");
    for (se = 0, fe = ee.length; se < fe; se += 1)
      Ce = "", (!X || K !== "") && (Ce += we(R, M)), ye = ee[se], be = z[ye], R.replacer && (be = R.replacer.call(z, ye, be)), ue(R, M + 1, ye, !0, !0, !0) && (De = R.tag !== null && R.tag !== "?" || R.dump && R.dump.length > 1024, De && (R.dump && l === R.dump.charCodeAt(0) ? Ce += "?" : Ce += "? "), Ce += R.dump, De && (Ce += we(R, M)), ue(R, M + 1, be, !0, De) && (R.dump && l === R.dump.charCodeAt(0) ? Ce += ":" : Ce += ": ", Ce += R.dump, K += Ce));
    R.tag = ae, R.dump = K || "{}";
  }
  function oe(R, M, z) {
    var X, K, ae, ee, se, fe;
    for (K = z ? R.explicitTypes : R.implicitTypes, ae = 0, ee = K.length; ae < ee; ae += 1)
      if (se = K[ae], (se.instanceOf || se.predicate) && (!se.instanceOf || typeof M == "object" && M instanceof se.instanceOf) && (!se.predicate || se.predicate(M))) {
        if (z ? se.multi && se.representName ? R.tag = se.representName(M) : R.tag = se.tag : R.tag = "?", se.represent) {
          if (fe = R.styleMap[se.tag] || se.defaultStyle, c.call(se.represent) === "[object Function]")
            X = se.represent(M, fe);
          else if (f.call(se.represent, fe))
            X = se.represent[fe](M, fe);
          else
            throw new d("!<" + se.tag + '> tag resolver accepts not "' + fe + '" style');
          R.dump = X;
        }
        return !0;
      }
    return !1;
  }
  function ue(R, M, z, X, K, ae, ee) {
    R.tag = null, R.dump = z, oe(R, z, !1) || oe(R, z, !0);
    var se = c.call(R.dump), fe = X, ye;
    X && (X = R.flowLevel < 0 || R.flowLevel > M);
    var be = se === "[object Object]" || se === "[object Array]", De, Ce;
    if (be && (De = R.duplicates.indexOf(z), Ce = De !== -1), (R.tag !== null && R.tag !== "?" || Ce || R.indent !== 2 && M > 0) && (K = !1), Ce && R.usedDuplicates[De])
      R.dump = "*ref_" + De;
    else {
      if (be && Ce && !R.usedDuplicates[De] && (R.usedDuplicates[De] = !0), se === "[object Object]")
        X && Object.keys(R.dump).length !== 0 ? (Z(R, M, R.dump, K), Ce && (R.dump = "&ref_" + De + R.dump)) : (re(R, M, R.dump), Ce && (R.dump = "&ref_" + De + " " + R.dump));
      else if (se === "[object Array]")
        X && R.dump.length !== 0 ? (R.noArrayIndent && !ee && M > 0 ? Y(R, M - 1, R.dump, K) : Y(R, M, R.dump, K), Ce && (R.dump = "&ref_" + De + R.dump)) : (ne(R, M, R.dump), Ce && (R.dump = "&ref_" + De + " " + R.dump));
      else if (se === "[object String]")
        R.tag !== "?" && ot(R, R.dump, M, ae, fe);
      else {
        if (se === "[object Undefined]")
          return !1;
        if (R.skipInvalid) return !1;
        throw new d("unacceptable kind of an object to dump " + se);
      }
      R.tag !== null && R.tag !== "?" && (ye = encodeURI(
        R.tag[0] === "!" ? R.tag.slice(1) : R.tag
      ).replace(/!/g, "%21"), R.tag[0] === "!" ? ye = "!" + ye : ye.slice(0, 18) === "tag:yaml.org,2002:" ? ye = "!!" + ye.slice(18) : ye = "!<" + ye + ">", R.dump = ye + " " + R.dump);
    }
    return !0;
  }
  function Te(R, M) {
    var z = [], X = [], K, ae;
    for (Se(R, z, X), K = 0, ae = X.length; K < ae; K += 1)
      M.duplicates.push(z[X[K]]);
    M.usedDuplicates = new Array(ae);
  }
  function Se(R, M, z) {
    var X, K, ae;
    if (R !== null && typeof R == "object")
      if (K = M.indexOf(R), K !== -1)
        z.indexOf(K) === -1 && z.push(K);
      else if (M.push(R), Array.isArray(R))
        for (K = 0, ae = R.length; K < ae; K += 1)
          Se(R[K], M, z);
      else
        for (X = Object.keys(R), K = 0, ae = X.length; K < ae; K += 1)
          Se(R[X[K]], M, z);
  }
  function me(R, M) {
    M = M || {};
    var z = new de(M);
    z.noRefs || Te(R, z);
    var X = R;
    return z.replacer && (X = z.replacer.call({ "": X }, "", X)), ue(z, 0, X, !0, !0) ? z.dump + `
` : "";
  }
  return ri.dump = me, ri;
}
var Ko;
function ia() {
  if (Ko) return qe;
  Ko = 1;
  var n = Zc(), d = ef();
  function m(c, f) {
    return function() {
      throw new Error("Function yaml." + c + " is removed in js-yaml 4. Use yaml." + f + " instead, which is now safe by default.");
    };
  }
  return qe.Type = Me(), qe.Schema = kl(), qe.FAILSAFE_SCHEMA = Bl(), qe.JSON_SCHEMA = Vl(), qe.CORE_SCHEMA = Yl(), qe.DEFAULT_SCHEMA = na(), qe.load = n.load, qe.loadAll = n.loadAll, qe.dump = d.dump, qe.YAMLException = gr(), qe.types = {
    binary: Kl(),
    float: Wl(),
    map: Ml(),
    null: Hl(),
    pairs: Ql(),
    set: Zl(),
    timestamp: zl(),
    bool: jl(),
    int: Gl(),
    merge: Xl(),
    omap: Jl(),
    seq: $l(),
    str: ql()
  }, qe.safeLoad = m("safeLoad", "load"), qe.safeLoadAll = m("safeLoadAll", "loadAll"), qe.safeDump = m("safeDump", "dump"), qe;
}
var Vt = {}, Jo;
function tf() {
  if (Jo) return Vt;
  Jo = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.Lazy = void 0;
  class n {
    constructor(m) {
      this._value = null, this.creator = m;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const m = this.creator();
      return this.value = m, m;
    }
    set value(m) {
      this._value = m, this.creator = null;
    }
  }
  return Vt.Lazy = n, Vt;
}
var Lr = { exports: {} }, ni, Qo;
function Hr() {
  if (Qo) return ni;
  Qo = 1;
  const n = "2.0.0", d = 256, m = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, c = 16, f = d - 6;
  return ni = {
    MAX_LENGTH: d,
    MAX_SAFE_COMPONENT_LENGTH: c,
    MAX_SAFE_BUILD_LENGTH: f,
    MAX_SAFE_INTEGER: m,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: n,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ni;
}
var ii, Zo;
function jr() {
  return Zo || (Zo = 1, ii = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...d) => console.error("SEMVER", ...d) : () => {
  }), ii;
}
var es;
function vr() {
  return es || (es = 1, (function(n, d) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: m,
      MAX_SAFE_BUILD_LENGTH: c,
      MAX_LENGTH: f
    } = Hr(), u = jr();
    d = n.exports = {};
    const a = d.re = [], l = d.safeRe = [], o = d.src = [], s = d.safeSrc = [], i = d.t = {};
    let t = 0;
    const r = "[a-zA-Z0-9-]", h = [
      ["\\s", 1],
      ["\\d", f],
      [r, c]
    ], g = (p) => {
      for (const [w, T] of h)
        p = p.split(`${w}*`).join(`${w}{0,${T}}`).split(`${w}+`).join(`${w}{1,${T}}`);
      return p;
    }, y = (p, w, T) => {
      const P = g(w), I = t++;
      u(p, I, w), i[p] = I, o[I] = w, s[I] = P, a[I] = new RegExp(w, T ? "g" : void 0), l[I] = new RegExp(P, T ? "g" : void 0);
    };
    y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${r}*`), y("MAINVERSION", `(${o[i.NUMERICIDENTIFIER]})\\.(${o[i.NUMERICIDENTIFIER]})\\.(${o[i.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${o[i.NUMERICIDENTIFIERLOOSE]})\\.(${o[i.NUMERICIDENTIFIERLOOSE]})\\.(${o[i.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${o[i.NONNUMERICIDENTIFIER]}|${o[i.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${o[i.NONNUMERICIDENTIFIER]}|${o[i.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${o[i.PRERELEASEIDENTIFIER]}(?:\\.${o[i.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${o[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[i.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${r}+`), y("BUILD", `(?:\\+(${o[i.BUILDIDENTIFIER]}(?:\\.${o[i.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${o[i.MAINVERSION]}${o[i.PRERELEASE]}?${o[i.BUILD]}?`), y("FULL", `^${o[i.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${o[i.MAINVERSIONLOOSE]}${o[i.PRERELEASELOOSE]}?${o[i.BUILD]}?`), y("LOOSE", `^${o[i.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${o[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${o[i.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${o[i.XRANGEIDENTIFIER]})(?:\\.(${o[i.XRANGEIDENTIFIER]})(?:\\.(${o[i.XRANGEIDENTIFIER]})(?:${o[i.PRERELEASE]})?${o[i.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${o[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[i.XRANGEIDENTIFIERLOOSE]})(?:${o[i.PRERELEASELOOSE]})?${o[i.BUILD]}?)?)?`), y("XRANGE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${m}})(?:\\.(\\d{1,${m}}))?(?:\\.(\\d{1,${m}}))?`), y("COERCE", `${o[i.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", o[i.COERCEPLAIN] + `(?:${o[i.PRERELEASE]})?(?:${o[i.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", o[i.COERCE], !0), y("COERCERTLFULL", o[i.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${o[i.LONETILDE]}\\s+`, !0), d.tildeTrimReplace = "$1~", y("TILDE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${o[i.LONECARET]}\\s+`, !0), d.caretTrimReplace = "$1^", y("CARET", `^${o[i.LONECARET]}${o[i.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${o[i.LONECARET]}${o[i.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${o[i.GTLT]}\\s*(${o[i.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]}|${o[i.XRANGEPLAIN]})`, !0), d.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${o[i.XRANGEPLAIN]})\\s+-\\s+(${o[i.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${o[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${o[i.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Lr, Lr.exports)), Lr.exports;
}
var ai, ts;
function aa() {
  if (ts) return ai;
  ts = 1;
  const n = Object.freeze({ loose: !0 }), d = Object.freeze({});
  return ai = (c) => c ? typeof c != "object" ? n : c : d, ai;
}
var oi, rs;
function eu() {
  if (rs) return oi;
  rs = 1;
  const n = /^[0-9]+$/, d = (c, f) => {
    if (typeof c == "number" && typeof f == "number")
      return c === f ? 0 : c < f ? -1 : 1;
    const u = n.test(c), a = n.test(f);
    return u && a && (c = +c, f = +f), c === f ? 0 : u && !a ? -1 : a && !u ? 1 : c < f ? -1 : 1;
  };
  return oi = {
    compareIdentifiers: d,
    rcompareIdentifiers: (c, f) => d(f, c)
  }, oi;
}
var si, ns;
function Be() {
  if (ns) return si;
  ns = 1;
  const n = jr(), { MAX_LENGTH: d, MAX_SAFE_INTEGER: m } = Hr(), { safeRe: c, t: f } = vr(), u = aa(), { compareIdentifiers: a } = eu();
  class l {
    constructor(s, i) {
      if (i = u(i), s instanceof l) {
        if (s.loose === !!i.loose && s.includePrerelease === !!i.includePrerelease)
          return s;
        s = s.version;
      } else if (typeof s != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof s}".`);
      if (s.length > d)
        throw new TypeError(
          `version is longer than ${d} characters`
        );
      n("SemVer", s, i), this.options = i, this.loose = !!i.loose, this.includePrerelease = !!i.includePrerelease;
      const t = s.trim().match(i.loose ? c[f.LOOSE] : c[f.FULL]);
      if (!t)
        throw new TypeError(`Invalid Version: ${s}`);
      if (this.raw = s, this.major = +t[1], this.minor = +t[2], this.patch = +t[3], this.major > m || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > m || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > m || this.patch < 0)
        throw new TypeError("Invalid patch version");
      t[4] ? this.prerelease = t[4].split(".").map((r) => {
        if (/^[0-9]+$/.test(r)) {
          const h = +r;
          if (h >= 0 && h < m)
            return h;
        }
        return r;
      }) : this.prerelease = [], this.build = t[5] ? t[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(s) {
      if (n("SemVer.compare", this.version, this.options, s), !(s instanceof l)) {
        if (typeof s == "string" && s === this.version)
          return 0;
        s = new l(s, this.options);
      }
      return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
    }
    compareMain(s) {
      return s instanceof l || (s = new l(s, this.options)), this.major < s.major ? -1 : this.major > s.major ? 1 : this.minor < s.minor ? -1 : this.minor > s.minor ? 1 : this.patch < s.patch ? -1 : this.patch > s.patch ? 1 : 0;
    }
    comparePre(s) {
      if (s instanceof l || (s = new l(s, this.options)), this.prerelease.length && !s.prerelease.length)
        return -1;
      if (!this.prerelease.length && s.prerelease.length)
        return 1;
      if (!this.prerelease.length && !s.prerelease.length)
        return 0;
      let i = 0;
      do {
        const t = this.prerelease[i], r = s.prerelease[i];
        if (n("prerelease compare", i, t, r), t === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === r)
          continue;
        return a(t, r);
      } while (++i);
    }
    compareBuild(s) {
      s instanceof l || (s = new l(s, this.options));
      let i = 0;
      do {
        const t = this.build[i], r = s.build[i];
        if (n("build compare", i, t, r), t === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === r)
          continue;
        return a(t, r);
      } while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(s, i, t) {
      if (s.startsWith("pre")) {
        if (!i && t === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (i) {
          const r = `-${i}`.match(this.options.loose ? c[f.PRERELEASELOOSE] : c[f.PRERELEASE]);
          if (!r || r[1] !== i)
            throw new Error(`invalid identifier: ${i}`);
        }
      }
      switch (s) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", i, t);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", i, t);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", i, t), this.inc("pre", i, t);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", i, t), this.inc("pre", i, t);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const r = Number(t) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [r];
          else {
            let h = this.prerelease.length;
            for (; --h >= 0; )
              typeof this.prerelease[h] == "number" && (this.prerelease[h]++, h = -2);
            if (h === -1) {
              if (i === this.prerelease.join(".") && t === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(r);
            }
          }
          if (i) {
            let h = [i, r];
            t === !1 && (h = [i]), a(this.prerelease[0], i) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = h) : this.prerelease = h;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${s}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return si = l, si;
}
var li, is;
function Mt() {
  if (is) return li;
  is = 1;
  const n = Be();
  return li = (m, c, f = !1) => {
    if (m instanceof n)
      return m;
    try {
      return new n(m, c);
    } catch (u) {
      if (!f)
        return null;
      throw u;
    }
  }, li;
}
var ui, as;
function rf() {
  if (as) return ui;
  as = 1;
  const n = Mt();
  return ui = (m, c) => {
    const f = n(m, c);
    return f ? f.version : null;
  }, ui;
}
var ci, os;
function nf() {
  if (os) return ci;
  os = 1;
  const n = Mt();
  return ci = (m, c) => {
    const f = n(m.trim().replace(/^[=v]+/, ""), c);
    return f ? f.version : null;
  }, ci;
}
var fi, ss;
function af() {
  if (ss) return fi;
  ss = 1;
  const n = Be();
  return fi = (m, c, f, u, a) => {
    typeof f == "string" && (a = u, u = f, f = void 0);
    try {
      return new n(
        m instanceof n ? m.version : m,
        f
      ).inc(c, u, a).version;
    } catch {
      return null;
    }
  }, fi;
}
var di, ls;
function of() {
  if (ls) return di;
  ls = 1;
  const n = Mt();
  return di = (m, c) => {
    const f = n(m, null, !0), u = n(c, null, !0), a = f.compare(u);
    if (a === 0)
      return null;
    const l = a > 0, o = l ? f : u, s = l ? u : f, i = !!o.prerelease.length;
    if (!!s.prerelease.length && !i) {
      if (!s.patch && !s.minor)
        return "major";
      if (s.compareMain(o) === 0)
        return s.minor && !s.patch ? "minor" : "patch";
    }
    const r = i ? "pre" : "";
    return f.major !== u.major ? r + "major" : f.minor !== u.minor ? r + "minor" : f.patch !== u.patch ? r + "patch" : "prerelease";
  }, di;
}
var hi, us;
function sf() {
  if (us) return hi;
  us = 1;
  const n = Be();
  return hi = (m, c) => new n(m, c).major, hi;
}
var pi, cs;
function lf() {
  if (cs) return pi;
  cs = 1;
  const n = Be();
  return pi = (m, c) => new n(m, c).minor, pi;
}
var mi, fs;
function uf() {
  if (fs) return mi;
  fs = 1;
  const n = Be();
  return mi = (m, c) => new n(m, c).patch, mi;
}
var gi, ds;
function cf() {
  if (ds) return gi;
  ds = 1;
  const n = Mt();
  return gi = (m, c) => {
    const f = n(m, c);
    return f && f.prerelease.length ? f.prerelease : null;
  }, gi;
}
var vi, hs;
function Qe() {
  if (hs) return vi;
  hs = 1;
  const n = Be();
  return vi = (m, c, f) => new n(m, f).compare(new n(c, f)), vi;
}
var Ei, ps;
function ff() {
  if (ps) return Ei;
  ps = 1;
  const n = Qe();
  return Ei = (m, c, f) => n(c, m, f), Ei;
}
var yi, ms;
function df() {
  if (ms) return yi;
  ms = 1;
  const n = Qe();
  return yi = (m, c) => n(m, c, !0), yi;
}
var wi, gs;
function oa() {
  if (gs) return wi;
  gs = 1;
  const n = Be();
  return wi = (m, c, f) => {
    const u = new n(m, f), a = new n(c, f);
    return u.compare(a) || u.compareBuild(a);
  }, wi;
}
var _i, vs;
function hf() {
  if (vs) return _i;
  vs = 1;
  const n = oa();
  return _i = (m, c) => m.sort((f, u) => n(f, u, c)), _i;
}
var Ri, Es;
function pf() {
  if (Es) return Ri;
  Es = 1;
  const n = oa();
  return Ri = (m, c) => m.sort((f, u) => n(u, f, c)), Ri;
}
var Ai, ys;
function Gr() {
  if (ys) return Ai;
  ys = 1;
  const n = Qe();
  return Ai = (m, c, f) => n(m, c, f) > 0, Ai;
}
var Ti, ws;
function sa() {
  if (ws) return Ti;
  ws = 1;
  const n = Qe();
  return Ti = (m, c, f) => n(m, c, f) < 0, Ti;
}
var Si, _s;
function tu() {
  if (_s) return Si;
  _s = 1;
  const n = Qe();
  return Si = (m, c, f) => n(m, c, f) === 0, Si;
}
var Ci, Rs;
function ru() {
  if (Rs) return Ci;
  Rs = 1;
  const n = Qe();
  return Ci = (m, c, f) => n(m, c, f) !== 0, Ci;
}
var bi, As;
function la() {
  if (As) return bi;
  As = 1;
  const n = Qe();
  return bi = (m, c, f) => n(m, c, f) >= 0, bi;
}
var Pi, Ts;
function ua() {
  if (Ts) return Pi;
  Ts = 1;
  const n = Qe();
  return Pi = (m, c, f) => n(m, c, f) <= 0, Pi;
}
var Oi, Ss;
function nu() {
  if (Ss) return Oi;
  Ss = 1;
  const n = tu(), d = ru(), m = Gr(), c = la(), f = sa(), u = ua();
  return Oi = (l, o, s, i) => {
    switch (o) {
      case "===":
        return typeof l == "object" && (l = l.version), typeof s == "object" && (s = s.version), l === s;
      case "!==":
        return typeof l == "object" && (l = l.version), typeof s == "object" && (s = s.version), l !== s;
      case "":
      case "=":
      case "==":
        return n(l, s, i);
      case "!=":
        return d(l, s, i);
      case ">":
        return m(l, s, i);
      case ">=":
        return c(l, s, i);
      case "<":
        return f(l, s, i);
      case "<=":
        return u(l, s, i);
      default:
        throw new TypeError(`Invalid operator: ${o}`);
    }
  }, Oi;
}
var Ii, Cs;
function mf() {
  if (Cs) return Ii;
  Cs = 1;
  const n = Be(), d = Mt(), { safeRe: m, t: c } = vr();
  return Ii = (u, a) => {
    if (u instanceof n)
      return u;
    if (typeof u == "number" && (u = String(u)), typeof u != "string")
      return null;
    a = a || {};
    let l = null;
    if (!a.rtl)
      l = u.match(a.includePrerelease ? m[c.COERCEFULL] : m[c.COERCE]);
    else {
      const h = a.includePrerelease ? m[c.COERCERTLFULL] : m[c.COERCERTL];
      let g;
      for (; (g = h.exec(u)) && (!l || l.index + l[0].length !== u.length); )
        (!l || g.index + g[0].length !== l.index + l[0].length) && (l = g), h.lastIndex = g.index + g[1].length + g[2].length;
      h.lastIndex = -1;
    }
    if (l === null)
      return null;
    const o = l[2], s = l[3] || "0", i = l[4] || "0", t = a.includePrerelease && l[5] ? `-${l[5]}` : "", r = a.includePrerelease && l[6] ? `+${l[6]}` : "";
    return d(`${o}.${s}.${i}${t}${r}`, a);
  }, Ii;
}
var Di, bs;
function gf() {
  if (bs) return Di;
  bs = 1;
  class n {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(m) {
      const c = this.map.get(m);
      if (c !== void 0)
        return this.map.delete(m), this.map.set(m, c), c;
    }
    delete(m) {
      return this.map.delete(m);
    }
    set(m, c) {
      if (!this.delete(m) && c !== void 0) {
        if (this.map.size >= this.max) {
          const u = this.map.keys().next().value;
          this.delete(u);
        }
        this.map.set(m, c);
      }
      return this;
    }
  }
  return Di = n, Di;
}
var Ni, Ps;
function Ze() {
  if (Ps) return Ni;
  Ps = 1;
  const n = /\s+/g;
  class d {
    constructor(N, j) {
      if (j = f(j), N instanceof d)
        return N.loose === !!j.loose && N.includePrerelease === !!j.includePrerelease ? N : new d(N.raw, j);
      if (N instanceof u)
        return this.raw = N.value, this.set = [[N]], this.formatted = void 0, this;
      if (this.options = j, this.loose = !!j.loose, this.includePrerelease = !!j.includePrerelease, this.raw = N.trim().replace(n, " "), this.set = this.raw.split("||").map((D) => this.parseRange(D.trim())).filter((D) => D.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const D = this.set[0];
        if (this.set = this.set.filter((G) => !y(G[0])), this.set.length === 0)
          this.set = [D];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && p(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let N = 0; N < this.set.length; N++) {
          N > 0 && (this.formatted += "||");
          const j = this.set[N];
          for (let D = 0; D < j.length; D++)
            D > 0 && (this.formatted += " "), this.formatted += j[D].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(N) {
      const D = ((this.options.includePrerelease && h) | (this.options.loose && g)) + ":" + N, G = c.get(D);
      if (G)
        return G;
      const V = this.options.loose, te = V ? o[s.HYPHENRANGELOOSE] : o[s.HYPHENRANGE];
      N = N.replace(te, x(this.options.includePrerelease)), a("hyphen replace", N), N = N.replace(o[s.COMPARATORTRIM], i), a("comparator trim", N), N = N.replace(o[s.TILDETRIM], t), a("tilde trim", N), N = N.replace(o[s.CARETTRIM], r), a("caret trim", N);
      let de = N.split(" ").map((Q) => T(Q, this.options)).join(" ").split(/\s+/).map((Q) => q(Q, this.options));
      V && (de = de.filter((Q) => (a("loose invalid filter", Q, this.options), !!Q.match(o[s.COMPARATORLOOSE])))), a("range list", de);
      const ie = /* @__PURE__ */ new Map(), we = de.map((Q) => new u(Q, this.options));
      for (const Q of we) {
        if (y(Q))
          return [Q];
        ie.set(Q.value, Q);
      }
      ie.size > 1 && ie.has("") && ie.delete("");
      const ve = [...ie.values()];
      return c.set(D, ve), ve;
    }
    intersects(N, j) {
      if (!(N instanceof d))
        throw new TypeError("a Range is required");
      return this.set.some((D) => w(D, j) && N.set.some((G) => w(G, j) && D.every((V) => G.every((te) => V.intersects(te, j)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(N) {
      if (!N)
        return !1;
      if (typeof N == "string")
        try {
          N = new l(N, this.options);
        } catch {
          return !1;
        }
      for (let j = 0; j < this.set.length; j++)
        if ($(this.set[j], N, this.options))
          return !0;
      return !1;
    }
  }
  Ni = d;
  const m = gf(), c = new m(), f = aa(), u = Wr(), a = jr(), l = Be(), {
    safeRe: o,
    t: s,
    comparatorTrimReplace: i,
    tildeTrimReplace: t,
    caretTrimReplace: r
  } = vr(), { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: g } = Hr(), y = (L) => L.value === "<0.0.0-0", p = (L) => L.value === "", w = (L, N) => {
    let j = !0;
    const D = L.slice();
    let G = D.pop();
    for (; j && D.length; )
      j = D.every((V) => G.intersects(V, N)), G = D.pop();
    return j;
  }, T = (L, N) => (L = L.replace(o[s.BUILD], ""), a("comp", L, N), L = O(L, N), a("caret", L), L = I(L, N), a("tildes", L), L = A(L, N), a("xrange", L), L = k(L, N), a("stars", L), L), P = (L) => !L || L.toLowerCase() === "x" || L === "*", I = (L, N) => L.trim().split(/\s+/).map((j) => b(j, N)).join(" "), b = (L, N) => {
    const j = N.loose ? o[s.TILDELOOSE] : o[s.TILDE];
    return L.replace(j, (D, G, V, te, de) => {
      a("tilde", L, D, G, V, te, de);
      let ie;
      return P(G) ? ie = "" : P(V) ? ie = `>=${G}.0.0 <${+G + 1}.0.0-0` : P(te) ? ie = `>=${G}.${V}.0 <${G}.${+V + 1}.0-0` : de ? (a("replaceTilde pr", de), ie = `>=${G}.${V}.${te}-${de} <${G}.${+V + 1}.0-0`) : ie = `>=${G}.${V}.${te} <${G}.${+V + 1}.0-0`, a("tilde return", ie), ie;
    });
  }, O = (L, N) => L.trim().split(/\s+/).map((j) => S(j, N)).join(" "), S = (L, N) => {
    a("caret", L, N);
    const j = N.loose ? o[s.CARETLOOSE] : o[s.CARET], D = N.includePrerelease ? "-0" : "";
    return L.replace(j, (G, V, te, de, ie) => {
      a("caret", L, G, V, te, de, ie);
      let we;
      return P(V) ? we = "" : P(te) ? we = `>=${V}.0.0${D} <${+V + 1}.0.0-0` : P(de) ? V === "0" ? we = `>=${V}.${te}.0${D} <${V}.${+te + 1}.0-0` : we = `>=${V}.${te}.0${D} <${+V + 1}.0.0-0` : ie ? (a("replaceCaret pr", ie), V === "0" ? te === "0" ? we = `>=${V}.${te}.${de}-${ie} <${V}.${te}.${+de + 1}-0` : we = `>=${V}.${te}.${de}-${ie} <${V}.${+te + 1}.0-0` : we = `>=${V}.${te}.${de}-${ie} <${+V + 1}.0.0-0`) : (a("no pr"), V === "0" ? te === "0" ? we = `>=${V}.${te}.${de}${D} <${V}.${te}.${+de + 1}-0` : we = `>=${V}.${te}.${de}${D} <${V}.${+te + 1}.0-0` : we = `>=${V}.${te}.${de} <${+V + 1}.0.0-0`), a("caret return", we), we;
    });
  }, A = (L, N) => (a("replaceXRanges", L, N), L.split(/\s+/).map((j) => v(j, N)).join(" ")), v = (L, N) => {
    L = L.trim();
    const j = N.loose ? o[s.XRANGELOOSE] : o[s.XRANGE];
    return L.replace(j, (D, G, V, te, de, ie) => {
      a("xRange", L, D, G, V, te, de, ie);
      const we = P(V), ve = we || P(te), Q = ve || P(de), ge = Q;
      return G === "=" && ge && (G = ""), ie = N.includePrerelease ? "-0" : "", we ? G === ">" || G === "<" ? D = "<0.0.0-0" : D = "*" : G && ge ? (ve && (te = 0), de = 0, G === ">" ? (G = ">=", ve ? (V = +V + 1, te = 0, de = 0) : (te = +te + 1, de = 0)) : G === "<=" && (G = "<", ve ? V = +V + 1 : te = +te + 1), G === "<" && (ie = "-0"), D = `${G + V}.${te}.${de}${ie}`) : ve ? D = `>=${V}.0.0${ie} <${+V + 1}.0.0-0` : Q && (D = `>=${V}.${te}.0${ie} <${V}.${+te + 1}.0-0`), a("xRange return", D), D;
    });
  }, k = (L, N) => (a("replaceStars", L, N), L.trim().replace(o[s.STAR], "")), q = (L, N) => (a("replaceGTE0", L, N), L.trim().replace(o[N.includePrerelease ? s.GTE0PRE : s.GTE0], "")), x = (L) => (N, j, D, G, V, te, de, ie, we, ve, Q, ge) => (P(D) ? j = "" : P(G) ? j = `>=${D}.0.0${L ? "-0" : ""}` : P(V) ? j = `>=${D}.${G}.0${L ? "-0" : ""}` : te ? j = `>=${j}` : j = `>=${j}${L ? "-0" : ""}`, P(we) ? ie = "" : P(ve) ? ie = `<${+we + 1}.0.0-0` : P(Q) ? ie = `<${we}.${+ve + 1}.0-0` : ge ? ie = `<=${we}.${ve}.${Q}-${ge}` : L ? ie = `<${we}.${ve}.${+Q + 1}-0` : ie = `<=${ie}`, `${j} ${ie}`.trim()), $ = (L, N, j) => {
    for (let D = 0; D < L.length; D++)
      if (!L[D].test(N))
        return !1;
    if (N.prerelease.length && !j.includePrerelease) {
      for (let D = 0; D < L.length; D++)
        if (a(L[D].semver), L[D].semver !== u.ANY && L[D].semver.prerelease.length > 0) {
          const G = L[D].semver;
          if (G.major === N.major && G.minor === N.minor && G.patch === N.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ni;
}
var Fi, Os;
function Wr() {
  if (Os) return Fi;
  Os = 1;
  const n = /* @__PURE__ */ Symbol("SemVer ANY");
  class d {
    static get ANY() {
      return n;
    }
    constructor(i, t) {
      if (t = m(t), i instanceof d) {
        if (i.loose === !!t.loose)
          return i;
        i = i.value;
      }
      i = i.trim().split(/\s+/).join(" "), a("comparator", i, t), this.options = t, this.loose = !!t.loose, this.parse(i), this.semver === n ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(i) {
      const t = this.options.loose ? c[f.COMPARATORLOOSE] : c[f.COMPARATOR], r = i.match(t);
      if (!r)
        throw new TypeError(`Invalid comparator: ${i}`);
      this.operator = r[1] !== void 0 ? r[1] : "", this.operator === "=" && (this.operator = ""), r[2] ? this.semver = new l(r[2], this.options.loose) : this.semver = n;
    }
    toString() {
      return this.value;
    }
    test(i) {
      if (a("Comparator.test", i, this.options.loose), this.semver === n || i === n)
        return !0;
      if (typeof i == "string")
        try {
          i = new l(i, this.options);
        } catch {
          return !1;
        }
      return u(i, this.operator, this.semver, this.options);
    }
    intersects(i, t) {
      if (!(i instanceof d))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new o(i.value, t).test(this.value) : i.operator === "" ? i.value === "" ? !0 : new o(this.value, t).test(i.semver) : (t = m(t), t.includePrerelease && (this.value === "<0.0.0-0" || i.value === "<0.0.0-0") || !t.includePrerelease && (this.value.startsWith("<0.0.0") || i.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && i.operator.startsWith(">") || this.operator.startsWith("<") && i.operator.startsWith("<") || this.semver.version === i.semver.version && this.operator.includes("=") && i.operator.includes("=") || u(this.semver, "<", i.semver, t) && this.operator.startsWith(">") && i.operator.startsWith("<") || u(this.semver, ">", i.semver, t) && this.operator.startsWith("<") && i.operator.startsWith(">")));
    }
  }
  Fi = d;
  const m = aa(), { safeRe: c, t: f } = vr(), u = nu(), a = jr(), l = Be(), o = Ze();
  return Fi;
}
var Li, Is;
function Vr() {
  if (Is) return Li;
  Is = 1;
  const n = Ze();
  return Li = (m, c, f) => {
    try {
      c = new n(c, f);
    } catch {
      return !1;
    }
    return c.test(m);
  }, Li;
}
var xi, Ds;
function vf() {
  if (Ds) return xi;
  Ds = 1;
  const n = Ze();
  return xi = (m, c) => new n(m, c).set.map((f) => f.map((u) => u.value).join(" ").trim().split(" ")), xi;
}
var Ui, Ns;
function Ef() {
  if (Ns) return Ui;
  Ns = 1;
  const n = Be(), d = Ze();
  return Ui = (c, f, u) => {
    let a = null, l = null, o = null;
    try {
      o = new d(f, u);
    } catch {
      return null;
    }
    return c.forEach((s) => {
      o.test(s) && (!a || l.compare(s) === -1) && (a = s, l = new n(a, u));
    }), a;
  }, Ui;
}
var ki, Fs;
function yf() {
  if (Fs) return ki;
  Fs = 1;
  const n = Be(), d = Ze();
  return ki = (c, f, u) => {
    let a = null, l = null, o = null;
    try {
      o = new d(f, u);
    } catch {
      return null;
    }
    return c.forEach((s) => {
      o.test(s) && (!a || l.compare(s) === 1) && (a = s, l = new n(a, u));
    }), a;
  }, ki;
}
var qi, Ls;
function wf() {
  if (Ls) return qi;
  Ls = 1;
  const n = Be(), d = Ze(), m = Gr();
  return qi = (f, u) => {
    f = new d(f, u);
    let a = new n("0.0.0");
    if (f.test(a) || (a = new n("0.0.0-0"), f.test(a)))
      return a;
    a = null;
    for (let l = 0; l < f.set.length; ++l) {
      const o = f.set[l];
      let s = null;
      o.forEach((i) => {
        const t = new n(i.semver.version);
        switch (i.operator) {
          case ">":
            t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
          /* fallthrough */
          case "":
          case ">=":
            (!s || m(t, s)) && (s = t);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${i.operator}`);
        }
      }), s && (!a || m(a, s)) && (a = s);
    }
    return a && f.test(a) ? a : null;
  }, qi;
}
var $i, xs;
function _f() {
  if (xs) return $i;
  xs = 1;
  const n = Ze();
  return $i = (m, c) => {
    try {
      return new n(m, c).range || "*";
    } catch {
      return null;
    }
  }, $i;
}
var Mi, Us;
function ca() {
  if (Us) return Mi;
  Us = 1;
  const n = Be(), d = Wr(), { ANY: m } = d, c = Ze(), f = Vr(), u = Gr(), a = sa(), l = ua(), o = la();
  return Mi = (i, t, r, h) => {
    i = new n(i, h), t = new c(t, h);
    let g, y, p, w, T;
    switch (r) {
      case ">":
        g = u, y = l, p = a, w = ">", T = ">=";
        break;
      case "<":
        g = a, y = o, p = u, w = "<", T = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (f(i, t, h))
      return !1;
    for (let P = 0; P < t.set.length; ++P) {
      const I = t.set[P];
      let b = null, O = null;
      if (I.forEach((S) => {
        S.semver === m && (S = new d(">=0.0.0")), b = b || S, O = O || S, g(S.semver, b.semver, h) ? b = S : p(S.semver, O.semver, h) && (O = S);
      }), b.operator === w || b.operator === T || (!O.operator || O.operator === w) && y(i, O.semver))
        return !1;
      if (O.operator === T && p(i, O.semver))
        return !1;
    }
    return !0;
  }, Mi;
}
var Bi, ks;
function Rf() {
  if (ks) return Bi;
  ks = 1;
  const n = ca();
  return Bi = (m, c, f) => n(m, c, ">", f), Bi;
}
var Hi, qs;
function Af() {
  if (qs) return Hi;
  qs = 1;
  const n = ca();
  return Hi = (m, c, f) => n(m, c, "<", f), Hi;
}
var ji, $s;
function Tf() {
  if ($s) return ji;
  $s = 1;
  const n = Ze();
  return ji = (m, c, f) => (m = new n(m, f), c = new n(c, f), m.intersects(c, f)), ji;
}
var Gi, Ms;
function Sf() {
  if (Ms) return Gi;
  Ms = 1;
  const n = Vr(), d = Qe();
  return Gi = (m, c, f) => {
    const u = [];
    let a = null, l = null;
    const o = m.sort((r, h) => d(r, h, f));
    for (const r of o)
      n(r, c, f) ? (l = r, a || (a = r)) : (l && u.push([a, l]), l = null, a = null);
    a && u.push([a, null]);
    const s = [];
    for (const [r, h] of u)
      r === h ? s.push(r) : !h && r === o[0] ? s.push("*") : h ? r === o[0] ? s.push(`<=${h}`) : s.push(`${r} - ${h}`) : s.push(`>=${r}`);
    const i = s.join(" || "), t = typeof c.raw == "string" ? c.raw : String(c);
    return i.length < t.length ? i : c;
  }, Gi;
}
var Wi, Bs;
function Cf() {
  if (Bs) return Wi;
  Bs = 1;
  const n = Ze(), d = Wr(), { ANY: m } = d, c = Vr(), f = Qe(), u = (t, r, h = {}) => {
    if (t === r)
      return !0;
    t = new n(t, h), r = new n(r, h);
    let g = !1;
    e: for (const y of t.set) {
      for (const p of r.set) {
        const w = o(y, p, h);
        if (g = g || w !== null, w)
          continue e;
      }
      if (g)
        return !1;
    }
    return !0;
  }, a = [new d(">=0.0.0-0")], l = [new d(">=0.0.0")], o = (t, r, h) => {
    if (t === r)
      return !0;
    if (t.length === 1 && t[0].semver === m) {
      if (r.length === 1 && r[0].semver === m)
        return !0;
      h.includePrerelease ? t = a : t = l;
    }
    if (r.length === 1 && r[0].semver === m) {
      if (h.includePrerelease)
        return !0;
      r = l;
    }
    const g = /* @__PURE__ */ new Set();
    let y, p;
    for (const A of t)
      A.operator === ">" || A.operator === ">=" ? y = s(y, A, h) : A.operator === "<" || A.operator === "<=" ? p = i(p, A, h) : g.add(A.semver);
    if (g.size > 1)
      return null;
    let w;
    if (y && p) {
      if (w = f(y.semver, p.semver, h), w > 0)
        return null;
      if (w === 0 && (y.operator !== ">=" || p.operator !== "<="))
        return null;
    }
    for (const A of g) {
      if (y && !c(A, String(y), h) || p && !c(A, String(p), h))
        return null;
      for (const v of r)
        if (!c(A, String(v), h))
          return !1;
      return !0;
    }
    let T, P, I, b, O = p && !h.includePrerelease && p.semver.prerelease.length ? p.semver : !1, S = y && !h.includePrerelease && y.semver.prerelease.length ? y.semver : !1;
    O && O.prerelease.length === 1 && p.operator === "<" && O.prerelease[0] === 0 && (O = !1);
    for (const A of r) {
      if (b = b || A.operator === ">" || A.operator === ">=", I = I || A.operator === "<" || A.operator === "<=", y) {
        if (S && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === S.major && A.semver.minor === S.minor && A.semver.patch === S.patch && (S = !1), A.operator === ">" || A.operator === ">=") {
          if (T = s(y, A, h), T === A && T !== y)
            return !1;
        } else if (y.operator === ">=" && !c(y.semver, String(A), h))
          return !1;
      }
      if (p) {
        if (O && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === O.major && A.semver.minor === O.minor && A.semver.patch === O.patch && (O = !1), A.operator === "<" || A.operator === "<=") {
          if (P = i(p, A, h), P === A && P !== p)
            return !1;
        } else if (p.operator === "<=" && !c(p.semver, String(A), h))
          return !1;
      }
      if (!A.operator && (p || y) && w !== 0)
        return !1;
    }
    return !(y && I && !p && w !== 0 || p && b && !y && w !== 0 || S || O);
  }, s = (t, r, h) => {
    if (!t)
      return r;
    const g = f(t.semver, r.semver, h);
    return g > 0 ? t : g < 0 || r.operator === ">" && t.operator === ">=" ? r : t;
  }, i = (t, r, h) => {
    if (!t)
      return r;
    const g = f(t.semver, r.semver, h);
    return g < 0 ? t : g > 0 || r.operator === "<" && t.operator === "<=" ? r : t;
  };
  return Wi = u, Wi;
}
var Vi, Hs;
function iu() {
  if (Hs) return Vi;
  Hs = 1;
  const n = vr(), d = Hr(), m = Be(), c = eu(), f = Mt(), u = rf(), a = nf(), l = af(), o = of(), s = sf(), i = lf(), t = uf(), r = cf(), h = Qe(), g = ff(), y = df(), p = oa(), w = hf(), T = pf(), P = Gr(), I = sa(), b = tu(), O = ru(), S = la(), A = ua(), v = nu(), k = mf(), q = Wr(), x = Ze(), $ = Vr(), L = vf(), N = Ef(), j = yf(), D = wf(), G = _f(), V = ca(), te = Rf(), de = Af(), ie = Tf(), we = Sf(), ve = Cf();
  return Vi = {
    parse: f,
    valid: u,
    clean: a,
    inc: l,
    diff: o,
    major: s,
    minor: i,
    patch: t,
    prerelease: r,
    compare: h,
    rcompare: g,
    compareLoose: y,
    compareBuild: p,
    sort: w,
    rsort: T,
    gt: P,
    lt: I,
    eq: b,
    neq: O,
    gte: S,
    lte: A,
    cmp: v,
    coerce: k,
    Comparator: q,
    Range: x,
    satisfies: $,
    toComparators: L,
    maxSatisfying: N,
    minSatisfying: j,
    minVersion: D,
    validRange: G,
    outside: V,
    gtr: te,
    ltr: de,
    intersects: ie,
    simplifyRange: we,
    subset: ve,
    SemVer: m,
    re: n.re,
    src: n.src,
    tokens: n.t,
    SEMVER_SPEC_VERSION: d.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: d.RELEASE_TYPES,
    compareIdentifiers: c.compareIdentifiers,
    rcompareIdentifiers: c.rcompareIdentifiers
  }, Vi;
}
var Ft = {}, dr = { exports: {} };
dr.exports;
var js;
function bf() {
  return js || (js = 1, (function(n, d) {
    var m = 200, c = "__lodash_hash_undefined__", f = 1, u = 2, a = 9007199254740991, l = "[object Arguments]", o = "[object Array]", s = "[object AsyncFunction]", i = "[object Boolean]", t = "[object Date]", r = "[object Error]", h = "[object Function]", g = "[object GeneratorFunction]", y = "[object Map]", p = "[object Number]", w = "[object Null]", T = "[object Object]", P = "[object Promise]", I = "[object Proxy]", b = "[object RegExp]", O = "[object Set]", S = "[object String]", A = "[object Symbol]", v = "[object Undefined]", k = "[object WeakMap]", q = "[object ArrayBuffer]", x = "[object DataView]", $ = "[object Float32Array]", L = "[object Float64Array]", N = "[object Int8Array]", j = "[object Int16Array]", D = "[object Int32Array]", G = "[object Uint8Array]", V = "[object Uint8ClampedArray]", te = "[object Uint16Array]", de = "[object Uint32Array]", ie = /[\\^$.*+?()[\]{}|]/g, we = /^\[object .+?Constructor\]$/, ve = /^(?:0|[1-9]\d*)$/, Q = {};
    Q[$] = Q[L] = Q[N] = Q[j] = Q[D] = Q[G] = Q[V] = Q[te] = Q[de] = !0, Q[l] = Q[o] = Q[q] = Q[i] = Q[x] = Q[t] = Q[r] = Q[h] = Q[y] = Q[p] = Q[T] = Q[b] = Q[O] = Q[S] = Q[k] = !1;
    var ge = typeof Je == "object" && Je && Je.Object === Object && Je, _ = typeof self == "object" && self && self.Object === Object && self, E = ge || _ || Function("return this")(), H = d && !d.nodeType && d, F = H && !0 && n && !n.nodeType && n, ce = F && F.exports === H, he = ce && ge.process, pe = (function() {
      try {
        return he && he.binding && he.binding("util");
      } catch {
      }
    })(), _e = pe && pe.isTypedArray;
    function Ee(C, U) {
      for (var J = -1, le = C == null ? 0 : C.length, Pe = 0, Re = []; ++J < le; ) {
        var Ne = C[J];
        U(Ne, J, C) && (Re[Pe++] = Ne);
      }
      return Re;
    }
    function He(C, U) {
      for (var J = -1, le = U.length, Pe = C.length; ++J < le; )
        C[Pe + J] = U[J];
      return C;
    }
    function Ae(C, U) {
      for (var J = -1, le = C == null ? 0 : C.length; ++J < le; )
        if (U(C[J], J, C))
          return !0;
      return !1;
    }
    function $e(C, U) {
      for (var J = -1, le = Array(C); ++J < C; )
        le[J] = U(J);
      return le;
    }
    function ot(C) {
      return function(U) {
        return C(U);
      };
    }
    function rt(C, U) {
      return C.has(U);
    }
    function et(C, U) {
      return C?.[U];
    }
    function e(C) {
      var U = -1, J = Array(C.size);
      return C.forEach(function(le, Pe) {
        J[++U] = [Pe, le];
      }), J;
    }
    function B(C, U) {
      return function(J) {
        return C(U(J));
      };
    }
    function W(C) {
      var U = -1, J = Array(C.size);
      return C.forEach(function(le) {
        J[++U] = le;
      }), J;
    }
    var ne = Array.prototype, Y = Function.prototype, re = Object.prototype, Z = E["__core-js_shared__"], oe = Y.toString, ue = re.hasOwnProperty, Te = (function() {
      var C = /[^.]+$/.exec(Z && Z.keys && Z.keys.IE_PROTO || "");
      return C ? "Symbol(src)_1." + C : "";
    })(), Se = re.toString, me = RegExp(
      "^" + oe.call(ue).replace(ie, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), R = ce ? E.Buffer : void 0, M = E.Symbol, z = E.Uint8Array, X = re.propertyIsEnumerable, K = ne.splice, ae = M ? M.toStringTag : void 0, ee = Object.getOwnPropertySymbols, se = R ? R.isBuffer : void 0, fe = B(Object.keys, Object), ye = It(E, "DataView"), be = It(E, "Map"), De = It(E, "Promise"), Ce = It(E, "Set"), Ot = It(E, "WeakMap"), Xe = It(Object, "create"), gt = yt(ye), Eu = yt(be), yu = yt(De), wu = yt(Ce), _u = yt(Ot), pa = M ? M.prototype : void 0, zr = pa ? pa.valueOf : void 0;
    function vt(C) {
      var U = -1, J = C == null ? 0 : C.length;
      for (this.clear(); ++U < J; ) {
        var le = C[U];
        this.set(le[0], le[1]);
      }
    }
    function Ru() {
      this.__data__ = Xe ? Xe(null) : {}, this.size = 0;
    }
    function Au(C) {
      var U = this.has(C) && delete this.__data__[C];
      return this.size -= U ? 1 : 0, U;
    }
    function Tu(C) {
      var U = this.__data__;
      if (Xe) {
        var J = U[C];
        return J === c ? void 0 : J;
      }
      return ue.call(U, C) ? U[C] : void 0;
    }
    function Su(C) {
      var U = this.__data__;
      return Xe ? U[C] !== void 0 : ue.call(U, C);
    }
    function Cu(C, U) {
      var J = this.__data__;
      return this.size += this.has(C) ? 0 : 1, J[C] = Xe && U === void 0 ? c : U, this;
    }
    vt.prototype.clear = Ru, vt.prototype.delete = Au, vt.prototype.get = Tu, vt.prototype.has = Su, vt.prototype.set = Cu;
    function nt(C) {
      var U = -1, J = C == null ? 0 : C.length;
      for (this.clear(); ++U < J; ) {
        var le = C[U];
        this.set(le[0], le[1]);
      }
    }
    function bu() {
      this.__data__ = [], this.size = 0;
    }
    function Pu(C) {
      var U = this.__data__, J = yr(U, C);
      if (J < 0)
        return !1;
      var le = U.length - 1;
      return J == le ? U.pop() : K.call(U, J, 1), --this.size, !0;
    }
    function Ou(C) {
      var U = this.__data__, J = yr(U, C);
      return J < 0 ? void 0 : U[J][1];
    }
    function Iu(C) {
      return yr(this.__data__, C) > -1;
    }
    function Du(C, U) {
      var J = this.__data__, le = yr(J, C);
      return le < 0 ? (++this.size, J.push([C, U])) : J[le][1] = U, this;
    }
    nt.prototype.clear = bu, nt.prototype.delete = Pu, nt.prototype.get = Ou, nt.prototype.has = Iu, nt.prototype.set = Du;
    function Et(C) {
      var U = -1, J = C == null ? 0 : C.length;
      for (this.clear(); ++U < J; ) {
        var le = C[U];
        this.set(le[0], le[1]);
      }
    }
    function Nu() {
      this.size = 0, this.__data__ = {
        hash: new vt(),
        map: new (be || nt)(),
        string: new vt()
      };
    }
    function Fu(C) {
      var U = wr(this, C).delete(C);
      return this.size -= U ? 1 : 0, U;
    }
    function Lu(C) {
      return wr(this, C).get(C);
    }
    function xu(C) {
      return wr(this, C).has(C);
    }
    function Uu(C, U) {
      var J = wr(this, C), le = J.size;
      return J.set(C, U), this.size += J.size == le ? 0 : 1, this;
    }
    Et.prototype.clear = Nu, Et.prototype.delete = Fu, Et.prototype.get = Lu, Et.prototype.has = xu, Et.prototype.set = Uu;
    function Er(C) {
      var U = -1, J = C == null ? 0 : C.length;
      for (this.__data__ = new Et(); ++U < J; )
        this.add(C[U]);
    }
    function ku(C) {
      return this.__data__.set(C, c), this;
    }
    function qu(C) {
      return this.__data__.has(C);
    }
    Er.prototype.add = Er.prototype.push = ku, Er.prototype.has = qu;
    function st(C) {
      var U = this.__data__ = new nt(C);
      this.size = U.size;
    }
    function $u() {
      this.__data__ = new nt(), this.size = 0;
    }
    function Mu(C) {
      var U = this.__data__, J = U.delete(C);
      return this.size = U.size, J;
    }
    function Bu(C) {
      return this.__data__.get(C);
    }
    function Hu(C) {
      return this.__data__.has(C);
    }
    function ju(C, U) {
      var J = this.__data__;
      if (J instanceof nt) {
        var le = J.__data__;
        if (!be || le.length < m - 1)
          return le.push([C, U]), this.size = ++J.size, this;
        J = this.__data__ = new Et(le);
      }
      return J.set(C, U), this.size = J.size, this;
    }
    st.prototype.clear = $u, st.prototype.delete = Mu, st.prototype.get = Bu, st.prototype.has = Hu, st.prototype.set = ju;
    function Gu(C, U) {
      var J = _r(C), le = !J && ac(C), Pe = !J && !le && Xr(C), Re = !J && !le && !Pe && Aa(C), Ne = J || le || Pe || Re, Fe = Ne ? $e(C.length, String) : [], xe = Fe.length;
      for (var Oe in C)
        ue.call(C, Oe) && !(Ne && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Oe == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Pe && (Oe == "offset" || Oe == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Re && (Oe == "buffer" || Oe == "byteLength" || Oe == "byteOffset") || // Skip index properties.
        ec(Oe, xe))) && Fe.push(Oe);
      return Fe;
    }
    function yr(C, U) {
      for (var J = C.length; J--; )
        if (ya(C[J][0], U))
          return J;
      return -1;
    }
    function Wu(C, U, J) {
      var le = U(C);
      return _r(C) ? le : He(le, J(C));
    }
    function Bt(C) {
      return C == null ? C === void 0 ? v : w : ae && ae in Object(C) ? Qu(C) : ic(C);
    }
    function ma(C) {
      return Ht(C) && Bt(C) == l;
    }
    function ga(C, U, J, le, Pe) {
      return C === U ? !0 : C == null || U == null || !Ht(C) && !Ht(U) ? C !== C && U !== U : Vu(C, U, J, le, ga, Pe);
    }
    function Vu(C, U, J, le, Pe, Re) {
      var Ne = _r(C), Fe = _r(U), xe = Ne ? o : lt(C), Oe = Fe ? o : lt(U);
      xe = xe == l ? T : xe, Oe = Oe == l ? T : Oe;
      var Ge = xe == T, Ke = Oe == T, Ue = xe == Oe;
      if (Ue && Xr(C)) {
        if (!Xr(U))
          return !1;
        Ne = !0, Ge = !1;
      }
      if (Ue && !Ge)
        return Re || (Re = new st()), Ne || Aa(C) ? va(C, U, J, le, Pe, Re) : Ku(C, U, xe, J, le, Pe, Re);
      if (!(J & f)) {
        var Ye = Ge && ue.call(C, "__wrapped__"), ze = Ke && ue.call(U, "__wrapped__");
        if (Ye || ze) {
          var ut = Ye ? C.value() : C, it = ze ? U.value() : U;
          return Re || (Re = new st()), Pe(ut, it, J, le, Re);
        }
      }
      return Ue ? (Re || (Re = new st()), Ju(C, U, J, le, Pe, Re)) : !1;
    }
    function Yu(C) {
      if (!Ra(C) || rc(C))
        return !1;
      var U = wa(C) ? me : we;
      return U.test(yt(C));
    }
    function zu(C) {
      return Ht(C) && _a(C.length) && !!Q[Bt(C)];
    }
    function Xu(C) {
      if (!nc(C))
        return fe(C);
      var U = [];
      for (var J in Object(C))
        ue.call(C, J) && J != "constructor" && U.push(J);
      return U;
    }
    function va(C, U, J, le, Pe, Re) {
      var Ne = J & f, Fe = C.length, xe = U.length;
      if (Fe != xe && !(Ne && xe > Fe))
        return !1;
      var Oe = Re.get(C);
      if (Oe && Re.get(U))
        return Oe == U;
      var Ge = -1, Ke = !0, Ue = J & u ? new Er() : void 0;
      for (Re.set(C, U), Re.set(U, C); ++Ge < Fe; ) {
        var Ye = C[Ge], ze = U[Ge];
        if (le)
          var ut = Ne ? le(ze, Ye, Ge, U, C, Re) : le(Ye, ze, Ge, C, U, Re);
        if (ut !== void 0) {
          if (ut)
            continue;
          Ke = !1;
          break;
        }
        if (Ue) {
          if (!Ae(U, function(it, wt) {
            if (!rt(Ue, wt) && (Ye === it || Pe(Ye, it, J, le, Re)))
              return Ue.push(wt);
          })) {
            Ke = !1;
            break;
          }
        } else if (!(Ye === ze || Pe(Ye, ze, J, le, Re))) {
          Ke = !1;
          break;
        }
      }
      return Re.delete(C), Re.delete(U), Ke;
    }
    function Ku(C, U, J, le, Pe, Re, Ne) {
      switch (J) {
        case x:
          if (C.byteLength != U.byteLength || C.byteOffset != U.byteOffset)
            return !1;
          C = C.buffer, U = U.buffer;
        case q:
          return !(C.byteLength != U.byteLength || !Re(new z(C), new z(U)));
        case i:
        case t:
        case p:
          return ya(+C, +U);
        case r:
          return C.name == U.name && C.message == U.message;
        case b:
        case S:
          return C == U + "";
        case y:
          var Fe = e;
        case O:
          var xe = le & f;
          if (Fe || (Fe = W), C.size != U.size && !xe)
            return !1;
          var Oe = Ne.get(C);
          if (Oe)
            return Oe == U;
          le |= u, Ne.set(C, U);
          var Ge = va(Fe(C), Fe(U), le, Pe, Re, Ne);
          return Ne.delete(C), Ge;
        case A:
          if (zr)
            return zr.call(C) == zr.call(U);
      }
      return !1;
    }
    function Ju(C, U, J, le, Pe, Re) {
      var Ne = J & f, Fe = Ea(C), xe = Fe.length, Oe = Ea(U), Ge = Oe.length;
      if (xe != Ge && !Ne)
        return !1;
      for (var Ke = xe; Ke--; ) {
        var Ue = Fe[Ke];
        if (!(Ne ? Ue in U : ue.call(U, Ue)))
          return !1;
      }
      var Ye = Re.get(C);
      if (Ye && Re.get(U))
        return Ye == U;
      var ze = !0;
      Re.set(C, U), Re.set(U, C);
      for (var ut = Ne; ++Ke < xe; ) {
        Ue = Fe[Ke];
        var it = C[Ue], wt = U[Ue];
        if (le)
          var Ta = Ne ? le(wt, it, Ue, U, C, Re) : le(it, wt, Ue, C, U, Re);
        if (!(Ta === void 0 ? it === wt || Pe(it, wt, J, le, Re) : Ta)) {
          ze = !1;
          break;
        }
        ut || (ut = Ue == "constructor");
      }
      if (ze && !ut) {
        var Rr = C.constructor, Ar = U.constructor;
        Rr != Ar && "constructor" in C && "constructor" in U && !(typeof Rr == "function" && Rr instanceof Rr && typeof Ar == "function" && Ar instanceof Ar) && (ze = !1);
      }
      return Re.delete(C), Re.delete(U), ze;
    }
    function Ea(C) {
      return Wu(C, lc, Zu);
    }
    function wr(C, U) {
      var J = C.__data__;
      return tc(U) ? J[typeof U == "string" ? "string" : "hash"] : J.map;
    }
    function It(C, U) {
      var J = et(C, U);
      return Yu(J) ? J : void 0;
    }
    function Qu(C) {
      var U = ue.call(C, ae), J = C[ae];
      try {
        C[ae] = void 0;
        var le = !0;
      } catch {
      }
      var Pe = Se.call(C);
      return le && (U ? C[ae] = J : delete C[ae]), Pe;
    }
    var Zu = ee ? function(C) {
      return C == null ? [] : (C = Object(C), Ee(ee(C), function(U) {
        return X.call(C, U);
      }));
    } : uc, lt = Bt;
    (ye && lt(new ye(new ArrayBuffer(1))) != x || be && lt(new be()) != y || De && lt(De.resolve()) != P || Ce && lt(new Ce()) != O || Ot && lt(new Ot()) != k) && (lt = function(C) {
      var U = Bt(C), J = U == T ? C.constructor : void 0, le = J ? yt(J) : "";
      if (le)
        switch (le) {
          case gt:
            return x;
          case Eu:
            return y;
          case yu:
            return P;
          case wu:
            return O;
          case _u:
            return k;
        }
      return U;
    });
    function ec(C, U) {
      return U = U ?? a, !!U && (typeof C == "number" || ve.test(C)) && C > -1 && C % 1 == 0 && C < U;
    }
    function tc(C) {
      var U = typeof C;
      return U == "string" || U == "number" || U == "symbol" || U == "boolean" ? C !== "__proto__" : C === null;
    }
    function rc(C) {
      return !!Te && Te in C;
    }
    function nc(C) {
      var U = C && C.constructor, J = typeof U == "function" && U.prototype || re;
      return C === J;
    }
    function ic(C) {
      return Se.call(C);
    }
    function yt(C) {
      if (C != null) {
        try {
          return oe.call(C);
        } catch {
        }
        try {
          return C + "";
        } catch {
        }
      }
      return "";
    }
    function ya(C, U) {
      return C === U || C !== C && U !== U;
    }
    var ac = ma(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? ma : function(C) {
      return Ht(C) && ue.call(C, "callee") && !X.call(C, "callee");
    }, _r = Array.isArray;
    function oc(C) {
      return C != null && _a(C.length) && !wa(C);
    }
    var Xr = se || cc;
    function sc(C, U) {
      return ga(C, U);
    }
    function wa(C) {
      if (!Ra(C))
        return !1;
      var U = Bt(C);
      return U == h || U == g || U == s || U == I;
    }
    function _a(C) {
      return typeof C == "number" && C > -1 && C % 1 == 0 && C <= a;
    }
    function Ra(C) {
      var U = typeof C;
      return C != null && (U == "object" || U == "function");
    }
    function Ht(C) {
      return C != null && typeof C == "object";
    }
    var Aa = _e ? ot(_e) : zu;
    function lc(C) {
      return oc(C) ? Gu(C) : Xu(C);
    }
    function uc() {
      return [];
    }
    function cc() {
      return !1;
    }
    n.exports = sc;
  })(dr, dr.exports)), dr.exports;
}
var Gs;
function Pf() {
  if (Gs) return Ft;
  Gs = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.DownloadedUpdateHelper = void 0, Ft.createTempUpdateFile = l;
  const n = pr, d = ht, m = bf(), c = /* @__PURE__ */ mt(), f = Ie;
  let u = class {
    constructor(s) {
      this.cacheDir = s, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return f.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(s, i, t, r) {
      if (this.versionInfo != null && this.file === s && this.fileInfo != null)
        return m(this.versionInfo, i) && m(this.fileInfo.info, t.info) && await (0, c.pathExists)(s) ? s : null;
      const h = await this.getValidCachedUpdateFile(t, r);
      return h === null ? null : (r.info(`Update has already been downloaded to ${s}).`), this._file = h, h);
    }
    async setDownloadedFile(s, i, t, r, h, g) {
      this._file = s, this._packageFile = i, this.versionInfo = t, this.fileInfo = r, this._downloadedFileInfo = {
        fileName: h,
        sha512: r.info.sha512,
        isAdminRightsRequired: r.info.isAdminRightsRequired === !0
      }, g && await (0, c.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, c.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(s, i) {
      const t = this.getUpdateInfoFile();
      if (!await (0, c.pathExists)(t))
        return null;
      let h;
      try {
        h = await (0, c.readJson)(t);
      } catch (w) {
        let T = "No cached update info available";
        return w.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), T += ` (error on read: ${w.message})`), i.info(T), null;
      }
      if (!(h?.fileName !== null))
        return i.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (s.info.sha512 !== h.sha512)
        return i.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${h.sha512}, expected: ${s.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const y = f.join(this.cacheDirForPendingUpdate, h.fileName);
      if (!await (0, c.pathExists)(y))
        return i.info("Cached update file doesn't exist"), null;
      const p = await a(y);
      return s.info.sha512 !== p ? (i.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p}, expected: ${s.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = h, y);
    }
    getUpdateInfoFile() {
      return f.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  Ft.DownloadedUpdateHelper = u;
  function a(o, s = "sha512", i = "base64", t) {
    return new Promise((r, h) => {
      const g = (0, n.createHash)(s);
      g.on("error", h).setEncoding(i), (0, d.createReadStream)(o, {
        ...t,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", h).on("end", () => {
        g.end(), r(g.read());
      }).pipe(g, { end: !1 });
    });
  }
  async function l(o, s, i) {
    let t = 0, r = f.join(s, o);
    for (let h = 0; h < 3; h++)
      try {
        return await (0, c.unlink)(r), r;
      } catch (g) {
        if (g.code === "ENOENT")
          return r;
        i.warn(`Error on remove temp update file: ${g}`), r = f.join(s, `${t++}-${o}`);
      }
    return r;
  }
  return Ft;
}
var Yt = {}, xr = {}, Ws;
function Of() {
  if (Ws) return xr;
  Ws = 1, Object.defineProperty(xr, "__esModule", { value: !0 }), xr.getAppCacheDir = m;
  const n = Ie, d = $r;
  function m() {
    const c = (0, d.homedir)();
    let f;
    return process.platform === "win32" ? f = process.env.LOCALAPPDATA || n.join(c, "AppData", "Local") : process.platform === "darwin" ? f = n.join(c, "Library", "Caches") : f = process.env.XDG_CACHE_HOME || n.join(c, ".cache"), f;
  }
  return xr;
}
var Vs;
function If() {
  if (Vs) return Yt;
  Vs = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.ElectronAppAdapter = void 0;
  const n = Ie, d = Of();
  let m = class {
    constructor(f = St.app) {
      this.app = f;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? n.join(process.resourcesPath, "app-update.yml") : n.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, d.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(f) {
      this.app.once("quit", (u, a) => f(a));
    }
  };
  return Yt.ElectronAppAdapter = m, Yt;
}
var Yi = {}, Ys;
function Df() {
  return Ys || (Ys = 1, (function(n) {
    Object.defineProperty(n, "__esModule", { value: !0 }), n.ElectronHttpExecutor = n.NET_SESSION_NAME = void 0, n.getNetSession = m;
    const d = Le();
    n.NET_SESSION_NAME = "electron-updater";
    function m() {
      return St.session.fromPartition(n.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class c extends d.HttpExecutor {
      constructor(u) {
        super(), this.proxyLoginCallback = u, this.cachedSession = null;
      }
      async download(u, a, l) {
        return await l.cancellationToken.createPromise((o, s, i) => {
          const t = {
            headers: l.headers || void 0,
            redirect: "manual"
          };
          (0, d.configureRequestUrl)(u, t), (0, d.configureRequestOptions)(t), this.doDownload(t, {
            destination: a,
            options: l,
            onCancel: i,
            callback: (r) => {
              r == null ? o(a) : s(r);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(u, a) {
        u.headers && u.headers.Host && (u.host = u.headers.Host, delete u.headers.Host), this.cachedSession == null && (this.cachedSession = m());
        const l = St.net.request({
          ...u,
          session: this.cachedSession
        });
        return l.on("response", a), this.proxyLoginCallback != null && l.on("login", this.proxyLoginCallback), l;
      }
      addRedirectHandlers(u, a, l, o, s) {
        u.on("redirect", (i, t, r) => {
          u.abort(), o > this.maxRedirects ? l(this.createMaxRedirectError()) : s(d.HttpExecutor.prepareRedirectUrlOptions(r, a));
        });
      }
    }
    n.ElectronHttpExecutor = c;
  })(Yi)), Yi;
}
var zt = {}, Lt = {}, zs;
function bt() {
  if (zs) return Lt;
  zs = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.newBaseUrl = d, Lt.newUrlFromBase = m, Lt.getChannelFilename = c;
  const n = pt;
  function d(f) {
    const u = new n.URL(f);
    return u.pathname.endsWith("/") || (u.pathname += "/"), u;
  }
  function m(f, u, a = !1) {
    const l = new n.URL(f, u), o = u.search;
    return o != null && o.length !== 0 ? l.search = o : a && (l.search = `noCache=${Date.now().toString(32)}`), l;
  }
  function c(f) {
    return `${f}.yml`;
  }
  return Lt;
}
var at = {}, zi, Xs;
function au() {
  if (Xs) return zi;
  Xs = 1;
  var n = "[object Symbol]", d = /[\\^$.*+?()[\]{}|]/g, m = RegExp(d.source), c = typeof Je == "object" && Je && Je.Object === Object && Je, f = typeof self == "object" && self && self.Object === Object && self, u = c || f || Function("return this")(), a = Object.prototype, l = a.toString, o = u.Symbol, s = o ? o.prototype : void 0, i = s ? s.toString : void 0;
  function t(p) {
    if (typeof p == "string")
      return p;
    if (h(p))
      return i ? i.call(p) : "";
    var w = p + "";
    return w == "0" && 1 / p == -1 / 0 ? "-0" : w;
  }
  function r(p) {
    return !!p && typeof p == "object";
  }
  function h(p) {
    return typeof p == "symbol" || r(p) && l.call(p) == n;
  }
  function g(p) {
    return p == null ? "" : t(p);
  }
  function y(p) {
    return p = g(p), p && m.test(p) ? p.replace(d, "\\$&") : p;
  }
  return zi = y, zi;
}
var Ks;
function Ve() {
  if (Ks) return at;
  Ks = 1, Object.defineProperty(at, "__esModule", { value: !0 }), at.Provider = void 0, at.findFile = a, at.parseUpdateInfo = l, at.getFileList = o, at.resolveFiles = s;
  const n = Le(), d = ia(), m = pt, c = bt(), f = au();
  let u = class {
    constructor(t) {
      this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
    }
    // By default, the blockmap file is in the same directory as the main file
    // But some providers may have a different blockmap file, so we need to override this method
    getBlockMapFiles(t, r, h, g = null) {
      const y = (0, c.newUrlFromBase)(`${t.pathname}.blockmap`, t);
      return [(0, c.newUrlFromBase)(`${t.pathname.replace(new RegExp(f(h), "g"), r)}.blockmap`, g ? new m.URL(g) : t), y];
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const t = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (t === "x64" ? "" : `-${t}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(t) {
      return `${t}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(t) {
      this.requestHeaders = t;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(t, r, h) {
      return this.executor.request(this.createRequestOptions(t, r), h);
    }
    createRequestOptions(t, r) {
      const h = {};
      return this.requestHeaders == null ? r != null && (h.headers = r) : h.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, n.configureRequestUrl)(t, h), h;
    }
  };
  at.Provider = u;
  function a(i, t, r) {
    var h;
    if (i.length === 0)
      throw (0, n.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const g = i.filter((p) => p.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), y = (h = g.find((p) => [p.url.pathname, p.info.url].some((w) => w.includes(process.arch)))) !== null && h !== void 0 ? h : g.shift();
    return y || (r == null ? i[0] : i.find((p) => !r.some((w) => p.url.pathname.toLowerCase().endsWith(`.${w.toLowerCase()}`))));
  }
  function l(i, t, r) {
    if (i == null)
      throw (0, n.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let h;
    try {
      h = (0, d.load)(i);
    } catch (g) {
      throw (0, n.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${g.stack || g.message}, rawData: ${i}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return h;
  }
  function o(i) {
    const t = i.files;
    if (t != null && t.length > 0)
      return t;
    if (i.path != null)
      return [
        {
          url: i.path,
          sha2: i.sha2,
          sha512: i.sha512
        }
      ];
    throw (0, n.newError)(`No files provided: ${(0, n.safeStringifyJson)(i)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function s(i, t, r = (h) => h) {
    const g = o(i).map((w) => {
      if (w.sha2 == null && w.sha512 == null)
        throw (0, n.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, n.safeStringifyJson)(w)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, c.newUrlFromBase)(r(w.url), t),
        info: w
      };
    }), y = i.packages, p = y == null ? null : y[process.arch] || y.ia32;
    return p != null && (g[0].packageInfo = {
      ...p,
      path: (0, c.newUrlFromBase)(r(p.path), t).href
    }), g;
  }
  return at;
}
var Js;
function ou() {
  if (Js) return zt;
  Js = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.GenericProvider = void 0;
  const n = Le(), d = bt(), m = Ve();
  let c = class extends m.Provider {
    constructor(u, a, l) {
      super(l), this.configuration = u, this.updater = a, this.baseUrl = (0, d.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const u = this.updater.channel || this.configuration.channel;
      return u == null ? this.getDefaultChannelName() : this.getCustomChannelName(u);
    }
    async getLatestVersion() {
      const u = (0, d.getChannelFilename)(this.channel), a = (0, d.newUrlFromBase)(u, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let l = 0; ; l++)
        try {
          return (0, m.parseUpdateInfo)(await this.httpRequest(a), u, a);
        } catch (o) {
          if (o instanceof n.HttpError && o.statusCode === 404)
            throw (0, n.newError)(`Cannot find channel "${u}" update info: ${o.stack || o.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (o.code === "ECONNREFUSED" && l < 3) {
            await new Promise((s, i) => {
              try {
                setTimeout(s, 1e3 * l);
              } catch (t) {
                i(t);
              }
            });
            continue;
          }
          throw o;
        }
    }
    resolveFiles(u) {
      return (0, m.resolveFiles)(u, this.baseUrl);
    }
  };
  return zt.GenericProvider = c, zt;
}
var Xt = {}, Kt = {}, Qs;
function Nf() {
  if (Qs) return Kt;
  Qs = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.BitbucketProvider = void 0;
  const n = Le(), d = bt(), m = Ve();
  let c = class extends m.Provider {
    constructor(u, a, l) {
      super({
        ...l,
        isUseMultipleRangeRequest: !1
      }), this.configuration = u, this.updater = a;
      const { owner: o, slug: s } = u;
      this.baseUrl = (0, d.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${o}/${s}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const u = new n.CancellationToken(), a = (0, d.getChannelFilename)(this.getCustomChannelName(this.channel)), l = (0, d.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const o = await this.httpRequest(l, void 0, u);
        return (0, m.parseUpdateInfo)(o, a, l);
      } catch (o) {
        throw (0, n.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(u) {
      return (0, m.resolveFiles)(u, this.baseUrl);
    }
    toString() {
      const { owner: u, slug: a } = this.configuration;
      return `Bitbucket (owner: ${u}, slug: ${a}, channel: ${this.channel})`;
    }
  };
  return Kt.BitbucketProvider = c, Kt;
}
var ft = {}, Zs;
function su() {
  if (Zs) return ft;
  Zs = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.GitHubProvider = ft.BaseGitHubProvider = void 0, ft.computeReleaseNotes = s;
  const n = Le(), d = iu(), m = pt, c = bt(), f = Ve(), u = /\/tag\/([^/]+)$/;
  class a extends f.Provider {
    constructor(t, r, h) {
      super({
        ...h,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = t, this.baseUrl = (0, c.newBaseUrl)((0, n.githubUrl)(t, r));
      const g = r === "github.com" ? "api.github.com" : r;
      this.baseApiUrl = (0, c.newBaseUrl)((0, n.githubUrl)(t, g));
    }
    computeGithubBasePath(t) {
      const r = this.options.host;
      return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
    }
  }
  ft.BaseGitHubProvider = a;
  let l = class extends a {
    constructor(t, r, h) {
      super(t, "github.com", h), this.options = t, this.updater = r;
    }
    get channel() {
      const t = this.updater.channel || this.options.channel;
      return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
    }
    async getLatestVersion() {
      var t, r, h, g, y;
      const p = new n.CancellationToken(), w = await this.httpRequest((0, c.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, p), T = (0, n.parseXml)(w);
      let P = T.element("entry", !1, "No published versions on GitHub"), I = null;
      try {
        if (this.updater.allowPrerelease) {
          const k = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = d.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
          if (k === null)
            I = u.exec(P.element("link").attribute("href"))[1];
          else
            for (const q of T.getElements("entry")) {
              const x = u.exec(q.element("link").attribute("href"));
              if (x === null)
                continue;
              const $ = x[1], L = ((h = d.prerelease($)) === null || h === void 0 ? void 0 : h[0]) || null, N = !k || ["alpha", "beta"].includes(k), j = L !== null && !["alpha", "beta"].includes(String(L));
              if (N && !j && !(k === "beta" && L === "alpha")) {
                I = $;
                break;
              }
              if (L && L === k) {
                I = $;
                break;
              }
            }
        } else {
          I = await this.getLatestTagName(p);
          for (const k of T.getElements("entry"))
            if (u.exec(k.element("link").attribute("href"))[1] === I) {
              P = k;
              break;
            }
        }
      } catch (k) {
        throw (0, n.newError)(`Cannot parse releases feed: ${k.stack || k.message},
XML:
${w}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (I == null)
        throw (0, n.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let b, O = "", S = "";
      const A = async (k) => {
        O = (0, c.getChannelFilename)(k), S = (0, c.newUrlFromBase)(this.getBaseDownloadPath(String(I), O), this.baseUrl);
        const q = this.createRequestOptions(S);
        try {
          return await this.executor.request(q, p);
        } catch (x) {
          throw x instanceof n.HttpError && x.statusCode === 404 ? (0, n.newError)(`Cannot find ${O} in the latest release artifacts (${S}): ${x.stack || x.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : x;
        }
      };
      try {
        let k = this.channel;
        this.updater.allowPrerelease && (!((g = d.prerelease(I)) === null || g === void 0) && g[0]) && (k = this.getCustomChannelName(String((y = d.prerelease(I)) === null || y === void 0 ? void 0 : y[0]))), b = await A(k);
      } catch (k) {
        if (this.updater.allowPrerelease)
          b = await A(this.getDefaultChannelName());
        else
          throw k;
      }
      const v = (0, f.parseUpdateInfo)(b, O, S);
      return v.releaseName == null && (v.releaseName = P.elementValueOrEmpty("title")), v.releaseNotes == null && (v.releaseNotes = s(this.updater.currentVersion, this.updater.fullChangelog, T, P)), {
        tag: I,
        ...v
      };
    }
    async getLatestTagName(t) {
      const r = this.options, h = r.host == null || r.host === "github.com" ? (0, c.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new m.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const g = await this.httpRequest(h, { Accept: "application/json" }, t);
        return g == null ? null : JSON.parse(g).tag_name;
      } catch (g) {
        throw (0, n.newError)(`Unable to find latest version on GitHub (${h}), please ensure a production release exists: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(t) {
      return (0, f.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
    }
    getBaseDownloadPath(t, r) {
      return `${this.basePath}/download/${t}/${r}`;
    }
  };
  ft.GitHubProvider = l;
  function o(i) {
    const t = i.elementValueOrEmpty("content");
    return t === "No content." ? "" : t;
  }
  function s(i, t, r, h) {
    if (!t)
      return o(h);
    const g = [];
    for (const y of r.getElements("entry")) {
      const p = /\/tag\/v?([^/]+)$/.exec(y.element("link").attribute("href"))[1];
      d.lt(i, p) && g.push({
        version: p,
        note: o(y)
      });
    }
    return g.sort((y, p) => d.rcompare(y.version, p.version));
  }
  return ft;
}
var Jt = {}, el;
function Ff() {
  if (el) return Jt;
  el = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.GitLabProvider = void 0;
  const n = Le(), d = pt, m = au(), c = bt(), f = Ve();
  let u = class extends f.Provider {
    /**
     * Normalizes filenames by replacing spaces and underscores with dashes.
     *
     * This is a workaround to handle filename formatting differences between tools:
     * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
     * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
     *
     * Because of this mismatch, we can't reliably extract the correct filename from
     * the asset path without normalization. This function ensures consistent matching
     * across different filename formats by converting all spaces and underscores to dashes.
     *
     * @param filename The filename to normalize
     * @returns The normalized filename with spaces and underscores replaced by dashes
     */
    normalizeFilename(l) {
      return l.replace(/ |_/g, "-");
    }
    constructor(l, o, s) {
      super({
        ...s,
        // GitLab might not support multiple range requests efficiently
        isUseMultipleRangeRequest: !1
      }), this.options = l, this.updater = o, this.cachedLatestVersion = null;
      const t = l.host || "gitlab.com";
      this.baseApiUrl = (0, c.newBaseUrl)(`https://${t}/api/v4`);
    }
    get channel() {
      const l = this.updater.channel || this.options.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      const l = new n.CancellationToken(), o = (0, c.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
      let s;
      try {
        const T = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, P = await this.httpRequest(o, T, l);
        if (!P)
          throw (0, n.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
        s = JSON.parse(P);
      } catch (T) {
        throw (0, n.newError)(`Unable to find latest release on GitLab (${o}): ${T.stack || T.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      const i = s.tag_name;
      let t = null, r = "", h = null;
      const g = async (T) => {
        r = (0, c.getChannelFilename)(T);
        const P = s.assets.links.find((b) => b.name === r);
        if (!P)
          throw (0, n.newError)(`Cannot find ${r} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        h = new d.URL(P.direct_asset_url);
        const I = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
        try {
          const b = await this.httpRequest(h, I, l);
          if (!b)
            throw (0, n.newError)(`Empty response from ${h}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          return b;
        } catch (b) {
          throw b instanceof n.HttpError && b.statusCode === 404 ? (0, n.newError)(`Cannot find ${r} in the latest release artifacts (${h}): ${b.stack || b.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : b;
        }
      };
      try {
        t = await g(this.channel);
      } catch (T) {
        if (this.channel !== this.getDefaultChannelName())
          t = await g(this.getDefaultChannelName());
        else
          throw T;
      }
      if (!t)
        throw (0, n.newError)(`Unable to parse channel data from ${r}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
      const y = (0, f.parseUpdateInfo)(t, r, h);
      y.releaseName == null && (y.releaseName = s.name), y.releaseNotes == null && (y.releaseNotes = s.description || null);
      const p = /* @__PURE__ */ new Map();
      for (const T of s.assets.links)
        p.set(this.normalizeFilename(T.name), T.direct_asset_url);
      const w = {
        tag: i,
        assets: p,
        ...y
      };
      return this.cachedLatestVersion = w, w;
    }
    /**
     * Utility function to convert GitlabReleaseAsset to Map<string, string>
     * Maps asset names to their download URLs
     */
    convertAssetsToMap(l) {
      const o = /* @__PURE__ */ new Map();
      for (const s of l.links)
        o.set(this.normalizeFilename(s.name), s.direct_asset_url);
      return o;
    }
    /**
     * Find blockmap file URL in assets map for a specific filename
     */
    findBlockMapInAssets(l, o) {
      const s = [`${o}.blockmap`, `${this.normalizeFilename(o)}.blockmap`];
      for (const i of s) {
        const t = l.get(i);
        if (t)
          return new d.URL(t);
      }
      return null;
    }
    async fetchReleaseInfoByVersion(l) {
      const o = new n.CancellationToken(), s = [`v${l}`, l];
      for (const i of s) {
        const t = (0, c.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
        try {
          const r = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, h = await this.httpRequest(t, r, o);
          if (h)
            return JSON.parse(h);
        } catch (r) {
          if (r instanceof n.HttpError && r.statusCode === 404)
            continue;
          throw (0, n.newError)(`Unable to find release ${i} on GitLab (${t}): ${r.stack || r.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
        }
      }
      throw (0, n.newError)(`Unable to find release with version ${l} (tried: ${s.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
    }
    setAuthHeaderForToken(l) {
      const o = {};
      return l != null && (l.startsWith("Bearer") ? o.authorization = l : o["PRIVATE-TOKEN"] = l), o;
    }
    /**
     * Get version info for blockmap files, using cache when possible
     */
    async getVersionInfoForBlockMap(l) {
      if (this.cachedLatestVersion && this.cachedLatestVersion.version === l)
        return this.cachedLatestVersion.assets;
      const o = await this.fetchReleaseInfoByVersion(l);
      return o && o.assets ? this.convertAssetsToMap(o.assets) : null;
    }
    /**
     * Find blockmap URLs from version assets
     */
    async findBlockMapUrlsFromAssets(l, o, s) {
      let i = null, t = null;
      const r = await this.getVersionInfoForBlockMap(o);
      r && (i = this.findBlockMapInAssets(r, s));
      const h = await this.getVersionInfoForBlockMap(l);
      if (h) {
        const g = s.replace(new RegExp(m(o), "g"), l);
        t = this.findBlockMapInAssets(h, g);
      }
      return [t, i];
    }
    async getBlockMapFiles(l, o, s, i = null) {
      if (this.options.uploadTarget === "project_upload") {
        const t = l.pathname.split("/").pop() || "", [r, h] = await this.findBlockMapUrlsFromAssets(o, s, t);
        if (!h)
          throw (0, n.newError)(`Cannot find blockmap file for ${s} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        if (!r)
          throw (0, n.newError)(`Cannot find blockmap file for ${o} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        return [r, h];
      } else
        return super.getBlockMapFiles(l, o, s, i);
    }
    resolveFiles(l) {
      return (0, f.getFileList)(l).map((o) => {
        const i = [
          o.url,
          // Original filename
          this.normalizeFilename(o.url)
          // Normalized filename (spaces/underscores → dashes)
        ].find((r) => l.assets.has(r)), t = i ? l.assets.get(i) : void 0;
        if (!t)
          throw (0, n.newError)(`Cannot find asset "${o.url}" in GitLab release assets. Available assets: ${Array.from(l.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new d.URL(t),
          info: o
        };
      });
    }
    toString() {
      return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
    }
  };
  return Jt.GitLabProvider = u, Jt;
}
var Qt = {}, tl;
function Lf() {
  if (tl) return Qt;
  tl = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.KeygenProvider = void 0;
  const n = Le(), d = bt(), m = Ve();
  let c = class extends m.Provider {
    constructor(u, a, l) {
      super({
        ...l,
        isUseMultipleRangeRequest: !1
      }), this.configuration = u, this.updater = a, this.defaultHostname = "api.keygen.sh";
      const o = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, d.newBaseUrl)(`https://${o}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const u = new n.CancellationToken(), a = (0, d.getChannelFilename)(this.getCustomChannelName(this.channel)), l = (0, d.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const o = await this.httpRequest(l, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, u);
        return (0, m.parseUpdateInfo)(o, a, l);
      } catch (o) {
        throw (0, n.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(u) {
      return (0, m.resolveFiles)(u, this.baseUrl);
    }
    toString() {
      const { account: u, product: a, platform: l } = this.configuration;
      return `Keygen (account: ${u}, product: ${a}, platform: ${l}, channel: ${this.channel})`;
    }
  };
  return Qt.KeygenProvider = c, Qt;
}
var Zt = {}, rl;
function xf() {
  if (rl) return Zt;
  rl = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.PrivateGitHubProvider = void 0;
  const n = Le(), d = ia(), m = Ie, c = pt, f = bt(), u = su(), a = Ve();
  let l = class extends u.BaseGitHubProvider {
    constructor(s, i, t, r) {
      super(s, "api.github.com", r), this.updater = i, this.token = t;
    }
    createRequestOptions(s, i) {
      const t = super.createRequestOptions(s, i);
      return t.redirect = "manual", t;
    }
    async getLatestVersion() {
      const s = new n.CancellationToken(), i = (0, f.getChannelFilename)(this.getDefaultChannelName()), t = await this.getLatestVersionInfo(s), r = t.assets.find((y) => y.name === i);
      if (r == null)
        throw (0, n.newError)(`Cannot find ${i} in the release ${t.html_url || t.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const h = new c.URL(r.url);
      let g;
      try {
        g = (0, d.load)(await this.httpRequest(h, this.configureHeaders("application/octet-stream"), s));
      } catch (y) {
        throw y instanceof n.HttpError && y.statusCode === 404 ? (0, n.newError)(`Cannot find ${i} in the latest release artifacts (${h}): ${y.stack || y.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : y;
      }
      return g.assets = t.assets, g;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(s) {
      return {
        accept: s,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(s) {
      const i = this.updater.allowPrerelease;
      let t = this.basePath;
      i || (t = `${t}/latest`);
      const r = (0, f.newUrlFromBase)(t, this.baseUrl);
      try {
        const h = JSON.parse(await this.httpRequest(r, this.configureHeaders("application/vnd.github.v3+json"), s));
        return i ? h.find((g) => g.prerelease) || h[0] : h;
      } catch (h) {
        throw (0, n.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${h.stack || h.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(s) {
      return (0, a.getFileList)(s).map((i) => {
        const t = m.posix.basename(i.url).replace(/ /g, "-"), r = s.assets.find((h) => h != null && h.name === t);
        if (r == null)
          throw (0, n.newError)(`Cannot find asset "${t}" in: ${JSON.stringify(s.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new c.URL(r.url),
          info: i
        };
      });
    }
  };
  return Zt.PrivateGitHubProvider = l, Zt;
}
var nl;
function Uf() {
  if (nl) return Xt;
  nl = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.isUrlProbablySupportMultiRangeRequests = l, Xt.createClient = o;
  const n = Le(), d = Nf(), m = ou(), c = su(), f = Ff(), u = Lf(), a = xf();
  function l(s) {
    return !s.includes("s3.amazonaws.com");
  }
  function o(s, i, t) {
    if (typeof s == "string")
      throw (0, n.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const r = s.provider;
    switch (r) {
      case "github": {
        const h = s, g = (h.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || h.token;
        return g == null ? new c.GitHubProvider(h, i, t) : new a.PrivateGitHubProvider(h, i, g, t);
      }
      case "bitbucket":
        return new d.BitbucketProvider(s, i, t);
      case "gitlab":
        return new f.GitLabProvider(s, i, t);
      case "keygen":
        return new u.KeygenProvider(s, i, t);
      case "s3":
      case "spaces":
        return new m.GenericProvider({
          provider: "generic",
          url: (0, n.getS3LikeProviderBaseUrl)(s),
          channel: s.channel || null
        }, i, {
          ...t,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const h = s;
        return new m.GenericProvider(h, i, {
          ...t,
          isUseMultipleRangeRequest: h.useMultipleRangeRequest !== !1 && l(h.url)
        });
      }
      case "custom": {
        const h = s, g = h.updateProvider;
        if (!g)
          throw (0, n.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new g(h, i, t);
      }
      default:
        throw (0, n.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return Xt;
}
var er = {}, tr = {}, xt = {}, Ut = {}, il;
function fa() {
  if (il) return Ut;
  il = 1, Object.defineProperty(Ut, "__esModule", { value: !0 }), Ut.OperationKind = void 0, Ut.computeOperations = d;
  var n;
  (function(a) {
    a[a.COPY = 0] = "COPY", a[a.DOWNLOAD = 1] = "DOWNLOAD";
  })(n || (Ut.OperationKind = n = {}));
  function d(a, l, o) {
    const s = u(a.files), i = u(l.files);
    let t = null;
    const r = l.files[0], h = [], g = r.name, y = s.get(g);
    if (y == null)
      throw new Error(`no file ${g} in old blockmap`);
    const p = i.get(g);
    let w = 0;
    const { checksumToOffset: T, checksumToOldSize: P } = f(s.get(g), y.offset, o);
    let I = r.offset;
    for (let b = 0; b < p.checksums.length; I += p.sizes[b], b++) {
      const O = p.sizes[b], S = p.checksums[b];
      let A = T.get(S);
      A != null && P.get(S) !== O && (o.warn(`Checksum ("${S}") matches, but size differs (old: ${P.get(S)}, new: ${O})`), A = void 0), A === void 0 ? (w++, t != null && t.kind === n.DOWNLOAD && t.end === I ? t.end += O : (t = {
        kind: n.DOWNLOAD,
        start: I,
        end: I + O
        // oldBlocks: null,
      }, c(t, h, S, b))) : t != null && t.kind === n.COPY && t.end === A ? t.end += O : (t = {
        kind: n.COPY,
        start: A,
        end: A + O
        // oldBlocks: [checksum]
      }, c(t, h, S, b));
    }
    return w > 0 && o.info(`File${r.name === "file" ? "" : " " + r.name} has ${w} changed blocks`), h;
  }
  const m = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function c(a, l, o, s) {
    if (m && l.length !== 0) {
      const i = l[l.length - 1];
      if (i.kind === a.kind && a.start < i.end && a.start > i.start) {
        const t = [i.start, i.end, a.start, a.end].reduce((r, h) => r < h ? r : h);
        throw new Error(`operation (block index: ${s}, checksum: ${o}, kind: ${n[a.kind]}) overlaps previous operation (checksum: ${o}):
abs: ${i.start} until ${i.end} and ${a.start} until ${a.end}
rel: ${i.start - t} until ${i.end - t} and ${a.start - t} until ${a.end - t}`);
      }
    }
    l.push(a);
  }
  function f(a, l, o) {
    const s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    let t = l;
    for (let r = 0; r < a.checksums.length; r++) {
      const h = a.checksums[r], g = a.sizes[r], y = i.get(h);
      if (y === void 0)
        s.set(h, t), i.set(h, g);
      else if (o.debug != null) {
        const p = y === g ? "(same size)" : `(size: ${y}, this size: ${g})`;
        o.debug(`${h} duplicated in blockmap ${p}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      t += g;
    }
    return { checksumToOffset: s, checksumToOldSize: i };
  }
  function u(a) {
    const l = /* @__PURE__ */ new Map();
    for (const o of a)
      l.set(o.name, o);
    return l;
  }
  return Ut;
}
var al;
function lu() {
  if (al) return xt;
  al = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.DataSplitter = void 0, xt.copyData = a;
  const n = Le(), d = ht, m = hr, c = fa(), f = Buffer.from(`\r
\r
`);
  var u;
  (function(o) {
    o[o.INIT = 0] = "INIT", o[o.HEADER = 1] = "HEADER", o[o.BODY = 2] = "BODY";
  })(u || (u = {}));
  function a(o, s, i, t, r) {
    const h = (0, d.createReadStream)("", {
      fd: i,
      autoClose: !1,
      start: o.start,
      // end is inclusive
      end: o.end - 1
    });
    h.on("error", t), h.once("end", r), h.pipe(s, {
      end: !1
    });
  }
  let l = class extends m.Writable {
    constructor(s, i, t, r, h, g) {
      super(), this.out = s, this.options = i, this.partIndexToTaskIndex = t, this.partIndexToLength = h, this.finishHandler = g, this.partIndex = -1, this.headerListBuffer = null, this.readState = u.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = r.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(s, i, t) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${s.length} bytes`);
        return;
      }
      this.handleData(s).then(t).catch(t);
    }
    async handleData(s) {
      let i = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, n.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const t = Math.min(this.ignoreByteCount, s.length);
        this.ignoreByteCount -= t, i = t;
      } else if (this.remainingPartDataCount > 0) {
        const t = Math.min(this.remainingPartDataCount, s.length);
        this.remainingPartDataCount -= t, await this.processPartData(s, 0, t), i = t;
      }
      if (i !== s.length) {
        if (this.readState === u.HEADER) {
          const t = this.searchHeaderListEnd(s, i);
          if (t === -1)
            return;
          i = t, this.readState = u.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === u.BODY)
            this.readState = u.INIT;
          else {
            this.partIndex++;
            let g = this.partIndexToTaskIndex.get(this.partIndex);
            if (g == null)
              if (this.isFinished)
                g = this.options.end;
              else
                throw (0, n.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const y = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (y < g)
              await this.copyExistingData(y, g);
            else if (y > g)
              throw (0, n.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (i = this.searchHeaderListEnd(s, i), i === -1) {
              this.readState = u.HEADER;
              return;
            }
          }
          const t = this.partIndexToLength[this.partIndex], r = i + t, h = Math.min(r, s.length);
          if (await this.processPartStarted(s, i, h), this.remainingPartDataCount = t - (h - i), this.remainingPartDataCount > 0)
            return;
          if (i = r + this.boundaryLength, i >= s.length) {
            this.ignoreByteCount = this.boundaryLength - (s.length - r);
            return;
          }
        }
      }
    }
    copyExistingData(s, i) {
      return new Promise((t, r) => {
        const h = () => {
          if (s === i) {
            t();
            return;
          }
          const g = this.options.tasks[s];
          if (g.kind !== c.OperationKind.COPY) {
            r(new Error("Task kind must be COPY"));
            return;
          }
          a(g, this.out, this.options.oldFileFd, r, () => {
            s++, h();
          });
        };
        h();
      });
    }
    searchHeaderListEnd(s, i) {
      const t = s.indexOf(f, i);
      if (t !== -1)
        return t + f.length;
      const r = i === 0 ? s : s.slice(i);
      return this.headerListBuffer == null ? this.headerListBuffer = r : this.headerListBuffer = Buffer.concat([this.headerListBuffer, r]), -1;
    }
    onPartEnd() {
      const s = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== s)
        throw (0, n.newError)(`Expected length: ${s} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(s, i, t) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(s, i, t);
    }
    processPartData(s, i, t) {
      this.actualPartLength += t - i;
      const r = this.out;
      return r.write(i === 0 && s.length === t ? s : s.slice(i, t)) ? Promise.resolve() : new Promise((h, g) => {
        r.on("error", g), r.once("drain", () => {
          r.removeListener("error", g), h();
        });
      });
    }
  };
  return xt.DataSplitter = l, xt;
}
var rr = {}, ol;
function kf() {
  if (ol) return rr;
  ol = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.executeTasksUsingMultipleRangeRequests = c, rr.checkIsRangesSupported = u;
  const n = Le(), d = lu(), m = fa();
  function c(a, l, o, s, i) {
    const t = (r) => {
      if (r >= l.length) {
        a.fileMetadataBuffer != null && o.write(a.fileMetadataBuffer), o.end();
        return;
      }
      const h = r + 1e3;
      f(a, {
        tasks: l,
        start: r,
        end: Math.min(l.length, h),
        oldFileFd: s
      }, o, () => t(h), i);
    };
    return t;
  }
  function f(a, l, o, s, i) {
    let t = "bytes=", r = 0;
    const h = /* @__PURE__ */ new Map(), g = [];
    for (let w = l.start; w < l.end; w++) {
      const T = l.tasks[w];
      T.kind === m.OperationKind.DOWNLOAD && (t += `${T.start}-${T.end - 1}, `, h.set(r, w), r++, g.push(T.end - T.start));
    }
    if (r <= 1) {
      const w = (T) => {
        if (T >= l.end) {
          s();
          return;
        }
        const P = l.tasks[T++];
        if (P.kind === m.OperationKind.COPY)
          (0, d.copyData)(P, o, l.oldFileFd, i, () => w(T));
        else {
          const I = a.createRequestOptions();
          I.headers.Range = `bytes=${P.start}-${P.end - 1}`;
          const b = a.httpExecutor.createRequest(I, (O) => {
            O.on("error", i), u(O, i) && (O.pipe(o, {
              end: !1
            }), O.once("end", () => w(T)));
          });
          a.httpExecutor.addErrorAndTimeoutHandlers(b, i), b.end();
        }
      };
      w(l.start);
      return;
    }
    const y = a.createRequestOptions();
    y.headers.Range = t.substring(0, t.length - 2);
    const p = a.httpExecutor.createRequest(y, (w) => {
      if (!u(w, i))
        return;
      const T = (0, n.safeGetHeader)(w, "content-type"), P = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(T);
      if (P == null) {
        i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${T}"`));
        return;
      }
      const I = new d.DataSplitter(o, l, h, P[1] || P[2], g, s);
      I.on("error", i), w.pipe(I), w.on("end", () => {
        setTimeout(() => {
          p.abort(), i(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    a.httpExecutor.addErrorAndTimeoutHandlers(p, i), p.end();
  }
  function u(a, l) {
    if (a.statusCode >= 400)
      return l((0, n.createHttpError)(a)), !1;
    if (a.statusCode !== 206) {
      const o = (0, n.safeGetHeader)(a, "accept-ranges");
      if (o == null || o === "none")
        return l(new Error(`Server doesn't support Accept-Ranges (response code ${a.statusCode})`)), !1;
    }
    return !0;
  }
  return rr;
}
var nr = {}, sl;
function qf() {
  if (sl) return nr;
  sl = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.ProgressDifferentialDownloadCallbackTransform = void 0;
  const n = hr;
  var d;
  (function(c) {
    c[c.COPY = 0] = "COPY", c[c.DOWNLOAD = 1] = "DOWNLOAD";
  })(d || (d = {}));
  let m = class extends n.Transform {
    constructor(f, u, a) {
      super(), this.progressDifferentialDownloadInfo = f, this.cancellationToken = u, this.onProgress = a, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = d.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, u, a) {
      if (this.cancellationToken.cancelled) {
        a(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == d.COPY) {
        a(null, f);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const l = Date.now();
      l >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = l + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((l - this.start) / 1e3))
      }), this.delta = 0), a(null, f);
    }
    beginFileCopy() {
      this.operationType = d.COPY;
    }
    beginRangeDownload() {
      this.operationType = d.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, f(null);
    }
  };
  return nr.ProgressDifferentialDownloadCallbackTransform = m, nr;
}
var ll;
function uu() {
  if (ll) return tr;
  ll = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.DifferentialDownloader = void 0;
  const n = Le(), d = /* @__PURE__ */ mt(), m = ht, c = lu(), f = pt, u = fa(), a = kf(), l = qf();
  let o = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(r, h, g) {
      this.blockAwareFileInfo = r, this.httpExecutor = h, this.options = g, this.fileMetadataBuffer = null, this.logger = g.logger;
    }
    createRequestOptions() {
      const r = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, n.configureRequestUrl)(this.options.newUrl, r), (0, n.configureRequestOptions)(r), r;
    }
    doDownload(r, h) {
      if (r.version !== h.version)
        throw new Error(`version is different (${r.version} - ${h.version}), full download is required`);
      const g = this.logger, y = (0, u.computeOperations)(r, h, g);
      g.debug != null && g.debug(JSON.stringify(y, null, 2));
      let p = 0, w = 0;
      for (const P of y) {
        const I = P.end - P.start;
        P.kind === u.OperationKind.DOWNLOAD ? p += I : w += I;
      }
      const T = this.blockAwareFileInfo.size;
      if (p + w + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== T)
        throw new Error(`Internal error, size mismatch: downloadSize: ${p}, copySize: ${w}, newSize: ${T}`);
      return g.info(`Full: ${s(T)}, To download: ${s(p)} (${Math.round(p / (T / 100))}%)`), this.downloadFile(y);
    }
    downloadFile(r) {
      const h = [], g = () => Promise.all(h.map((y) => (0, d.close)(y.descriptor).catch((p) => {
        this.logger.error(`cannot close file "${y.path}": ${p}`);
      })));
      return this.doDownloadFile(r, h).then(g).catch((y) => g().catch((p) => {
        try {
          this.logger.error(`cannot close files: ${p}`);
        } catch (w) {
          try {
            console.error(w);
          } catch {
          }
        }
        throw y;
      }).then(() => {
        throw y;
      }));
    }
    async doDownloadFile(r, h) {
      const g = await (0, d.open)(this.options.oldFile, "r");
      h.push({ descriptor: g, path: this.options.oldFile });
      const y = await (0, d.open)(this.options.newFile, "w");
      h.push({ descriptor: y, path: this.options.newFile });
      const p = (0, m.createWriteStream)(this.options.newFile, { fd: y });
      await new Promise((w, T) => {
        const P = [];
        let I;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const x = [];
          let $ = 0;
          for (const N of r)
            N.kind === u.OperationKind.DOWNLOAD && (x.push(N.end - N.start), $ += N.end - N.start);
          const L = {
            expectedByteCounts: x,
            grandTotal: $
          };
          I = new l.ProgressDifferentialDownloadCallbackTransform(L, this.options.cancellationToken, this.options.onProgress), P.push(I);
        }
        const b = new n.DigestTransform(this.blockAwareFileInfo.sha512);
        b.isValidateOnEnd = !1, P.push(b), p.on("finish", () => {
          p.close(() => {
            h.splice(1, 1);
            try {
              b.validate();
            } catch (x) {
              T(x);
              return;
            }
            w(void 0);
          });
        }), P.push(p);
        let O = null;
        for (const x of P)
          x.on("error", T), O == null ? O = x : O = O.pipe(x);
        const S = P[0];
        let A;
        if (this.options.isUseMultipleRangeRequest) {
          A = (0, a.executeTasksUsingMultipleRangeRequests)(this, r, S, g, T), A(0);
          return;
        }
        let v = 0, k = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const q = this.createRequestOptions();
        q.redirect = "manual", A = (x) => {
          var $, L;
          if (x >= r.length) {
            this.fileMetadataBuffer != null && S.write(this.fileMetadataBuffer), S.end();
            return;
          }
          const N = r[x++];
          if (N.kind === u.OperationKind.COPY) {
            I && I.beginFileCopy(), (0, c.copyData)(N, S, g, T, () => A(x));
            return;
          }
          const j = `bytes=${N.start}-${N.end - 1}`;
          q.headers.range = j, (L = ($ = this.logger) === null || $ === void 0 ? void 0 : $.debug) === null || L === void 0 || L.call($, `download range: ${j}`), I && I.beginRangeDownload();
          const D = this.httpExecutor.createRequest(q, (G) => {
            G.on("error", T), G.on("aborted", () => {
              T(new Error("response has been aborted by the server"));
            }), G.statusCode >= 400 && T((0, n.createHttpError)(G)), G.pipe(S, {
              end: !1
            }), G.once("end", () => {
              I && I.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => A(x), 1e3)) : A(x);
            });
          });
          D.on("redirect", (G, V, te) => {
            this.logger.info(`Redirect to ${i(te)}`), k = te, (0, n.configureRequestUrl)(new f.URL(k), q), D.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(D, T), D.end();
        }, A(0);
      });
    }
    async readRemoteBytes(r, h) {
      const g = Buffer.allocUnsafe(h + 1 - r), y = this.createRequestOptions();
      y.headers.range = `bytes=${r}-${h}`;
      let p = 0;
      if (await this.request(y, (w) => {
        w.copy(g, p), p += w.length;
      }), p !== g.length)
        throw new Error(`Received data length ${p} is not equal to expected ${g.length}`);
      return g;
    }
    request(r, h) {
      return new Promise((g, y) => {
        const p = this.httpExecutor.createRequest(r, (w) => {
          (0, a.checkIsRangesSupported)(w, y) && (w.on("error", y), w.on("aborted", () => {
            y(new Error("response has been aborted by the server"));
          }), w.on("data", h), w.on("end", () => g()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(p, y), p.end();
      });
    }
  };
  tr.DifferentialDownloader = o;
  function s(t, r = " KB") {
    return new Intl.NumberFormat("en").format((t / 1024).toFixed(2)) + r;
  }
  function i(t) {
    const r = t.indexOf("?");
    return r < 0 ? t : t.substring(0, r);
  }
  return tr;
}
var ul;
function $f() {
  if (ul) return er;
  ul = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.GenericDifferentialDownloader = void 0;
  const n = uu();
  let d = class extends n.DifferentialDownloader {
    download(c, f) {
      return this.doDownload(c, f);
    }
  };
  return er.GenericDifferentialDownloader = d, er;
}
var Xi = {}, cl;
function Pt() {
  return cl || (cl = 1, (function(n) {
    Object.defineProperty(n, "__esModule", { value: !0 }), n.UpdaterSignal = n.UPDATE_DOWNLOADED = n.DOWNLOAD_PROGRESS = n.CancellationToken = void 0, n.addHandler = c;
    const d = Le();
    Object.defineProperty(n, "CancellationToken", { enumerable: !0, get: function() {
      return d.CancellationToken;
    } }), n.DOWNLOAD_PROGRESS = "download-progress", n.UPDATE_DOWNLOADED = "update-downloaded";
    class m {
      constructor(u) {
        this.emitter = u;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(u) {
        c(this.emitter, "login", u);
      }
      progress(u) {
        c(this.emitter, n.DOWNLOAD_PROGRESS, u);
      }
      updateDownloaded(u) {
        c(this.emitter, n.UPDATE_DOWNLOADED, u);
      }
      updateCancelled(u) {
        c(this.emitter, "update-cancelled", u);
      }
    }
    n.UpdaterSignal = m;
    function c(f, u, a) {
      f.on(u, a);
    }
  })(Xi)), Xi;
}
var fl;
function da() {
  if (fl) return Rt;
  fl = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.NoOpLogger = Rt.AppUpdater = void 0;
  const n = Le(), d = pr, m = $r, c = Dl, f = /* @__PURE__ */ mt(), u = ia(), a = tf(), l = Ie, o = iu(), s = Pf(), i = If(), t = Df(), r = ou(), h = Uf(), g = Fl, y = $f(), p = Pt();
  let w = class cu extends c.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(b) {
      if (this._channel != null) {
        if (typeof b != "string")
          throw (0, n.newError)(`Channel must be a string, but got: ${b}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (b.length === 0)
          throw (0, n.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = b, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(b) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: b
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, t.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(b) {
      this._logger = b ?? new P();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(b) {
      this.clientPromise = null, this._appUpdateConfigPath = b, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(b) {
      b && (this._isUpdateSupported = b);
    }
    /**
     * Allows developer to override default logic for determining if the user is below the rollout threshold.
     * The default logic compares the staging percentage with numerical representation of user ID.
     * An override can define custom logic, or bypass it if needed.
     */
    get isUserWithinRollout() {
      return this._isUserWithinRollout;
    }
    set isUserWithinRollout(b) {
      b && (this._isUserWithinRollout = b);
    }
    constructor(b, O) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new p.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (v) => this.checkIfUpdateSupported(v), this._isUserWithinRollout = (v) => this.isStagingMatch(v), this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (v) => {
        this._logger.error(`Error: ${v.stack || v.message}`);
      }), O == null ? (this.app = new i.ElectronAppAdapter(), this.httpExecutor = new t.ElectronHttpExecutor((v, k) => this.emit("login", v, k))) : (this.app = O, this.httpExecutor = null);
      const S = this.app.version, A = (0, o.parse)(S);
      if (A == null)
        throw (0, n.newError)(`App version is not a valid semver version: "${S}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = A, this.allowPrerelease = T(A), b != null && (this.setFeedURL(b), typeof b != "string" && b.requestHeaders && (this.requestHeaders = b.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(b) {
      const O = this.createProviderRuntimeOptions();
      let S;
      typeof b == "string" ? S = new r.GenericProvider({ provider: "generic", url: b }, this, {
        ...O,
        isUseMultipleRangeRequest: (0, h.isUrlProbablySupportMultiRangeRequests)(b)
      }) : S = (0, h.createClient)(b, this, O), this.clientPromise = Promise.resolve(S);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let b = this.checkForUpdatesPromise;
      if (b != null)
        return this._logger.info("Checking for update (already in progress)"), b;
      const O = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), b = this.doCheckForUpdates().then((S) => (O(), S)).catch((S) => {
        throw O(), this.emit("error", S, `Cannot check for updates: ${(S.stack || S).toString()}`), S;
      }), this.checkForUpdatesPromise = b, b;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(b) {
      return this.checkForUpdates().then((O) => O?.downloadPromise ? (O.downloadPromise.then(() => {
        const S = cu.formatDownloadNotification(O.updateInfo.version, this.app.name, b);
        new St.Notification(S).show();
      }), O) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), O));
    }
    static formatDownloadNotification(b, O, S) {
      return S == null && (S = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), S = {
        title: S.title.replace("{appName}", O).replace("{version}", b),
        body: S.body.replace("{appName}", O).replace("{version}", b)
      }, S;
    }
    async isStagingMatch(b) {
      const O = b.stagingPercentage;
      let S = O;
      if (S == null)
        return !0;
      if (S = parseInt(S, 10), isNaN(S))
        return this._logger.warn(`Staging percentage is NaN: ${O}`), !0;
      S = S / 100;
      const A = await this.stagingUserIdPromise.value, k = n.UUID.parse(A).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${S}, percentage: ${k}, user id: ${A}`), k < S;
    }
    computeFinalHeaders(b) {
      return this.requestHeaders != null && Object.assign(b, this.requestHeaders), b;
    }
    async isUpdateAvailable(b) {
      const O = (0, o.parse)(b.version);
      if (O == null)
        throw (0, n.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${b.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const S = this.currentVersion;
      if ((0, o.eq)(O, S) || !await Promise.resolve(this.isUpdateSupported(b)) || !await Promise.resolve(this.isUserWithinRollout(b)))
        return !1;
      const v = (0, o.gt)(O, S), k = (0, o.lt)(O, S);
      return v ? !0 : this.allowDowngrade && k;
    }
    checkIfUpdateSupported(b) {
      const O = b?.minimumSystemVersion, S = (0, m.release)();
      if (O)
        try {
          if ((0, o.lt)(S, O))
            return this._logger.info(`Current OS version ${S} is less than the minimum OS version required ${O} for version ${S}`), !1;
        } catch (A) {
          this._logger.warn(`Failed to compare current OS version(${S}) with minimum OS version(${O}): ${(A.message || A).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((S) => (0, h.createClient)(S, this, this.createProviderRuntimeOptions())));
      const b = await this.clientPromise, O = await this.stagingUserIdPromise.value;
      return b.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": O })), {
        info: await b.getLatestVersion(),
        provider: b
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const b = await this.getUpdateInfoAndProvider(), O = b.info;
      if (!await this.isUpdateAvailable(O))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${O.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", O), {
          isUpdateAvailable: !1,
          versionInfo: O,
          updateInfo: O
        };
      this.updateInfoAndProvider = b, this.onUpdateAvailable(O);
      const S = new n.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: O,
        updateInfo: O,
        cancellationToken: S,
        downloadPromise: this.autoDownload ? this.downloadUpdate(S) : null
      };
    }
    onUpdateAvailable(b) {
      this._logger.info(`Found version ${b.version} (url: ${(0, n.asArray)(b.files).map((O) => O.url).join(", ")})`), this.emit("update-available", b);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(b = new n.CancellationToken()) {
      const O = this.updateInfoAndProvider;
      if (O == null) {
        const A = new Error("Please check update first");
        return this.dispatchError(A), Promise.reject(A);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, n.asArray)(O.info.files).map((A) => A.url).join(", ")}`);
      const S = (A) => {
        if (!(A instanceof n.CancellationError))
          try {
            this.dispatchError(A);
          } catch (v) {
            this._logger.warn(`Cannot dispatch error event: ${v.stack || v}`);
          }
        return A;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: O,
        requestHeaders: this.computeRequestHeaders(O.provider),
        cancellationToken: b,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((A) => {
        throw S(A);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(b) {
      this.emit("error", b, (b.stack || b).toString());
    }
    dispatchUpdateDownloaded(b) {
      this.emit(p.UPDATE_DOWNLOADED, b);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, u.load)(await (0, f.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(b) {
      const O = b.fileExtraDownloadHeaders;
      if (O != null) {
        const S = this.requestHeaders;
        return S == null ? O : {
          ...O,
          ...S
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const b = l.join(this.app.userDataPath, ".updaterId");
      try {
        const S = await (0, f.readFile)(b, "utf-8");
        if (n.UUID.check(S))
          return S;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${S}`);
      } catch (S) {
        S.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${S}`);
      }
      const O = n.UUID.v5((0, d.randomBytes)(4096), n.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${O}`);
      try {
        await (0, f.outputFile)(b, O);
      } catch (S) {
        this._logger.warn(`Couldn't write out staging user ID: ${S}`);
      }
      return O;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const b = this.requestHeaders;
      if (b == null)
        return !0;
      for (const O of Object.keys(b)) {
        const S = O.toLowerCase();
        if (S === "authorization" || S === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let b = this.downloadedUpdateHelper;
      if (b == null) {
        const O = (await this.configOnDisk.value).updaterCacheDirName, S = this._logger;
        O == null && S.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const A = l.join(this.app.baseCachePath, O || this.app.name);
        S.debug != null && S.debug(`updater cache dir: ${A}`), b = new s.DownloadedUpdateHelper(A), this.downloadedUpdateHelper = b;
      }
      return b;
    }
    async executeDownload(b) {
      const O = b.fileInfo, S = {
        headers: b.downloadUpdateOptions.requestHeaders,
        cancellationToken: b.downloadUpdateOptions.cancellationToken,
        sha2: O.info.sha2,
        sha512: O.info.sha512
      };
      this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (S.onProgress = (ie) => this.emit(p.DOWNLOAD_PROGRESS, ie));
      const A = b.downloadUpdateOptions.updateInfoAndProvider.info, v = A.version, k = O.packageInfo;
      function q() {
        const ie = decodeURIComponent(b.fileInfo.url.pathname);
        return ie.toLowerCase().endsWith(`.${b.fileExtension.toLowerCase()}`) ? l.basename(ie) : b.fileInfo.info.url;
      }
      const x = await this.getOrCreateDownloadHelper(), $ = x.cacheDirForPendingUpdate;
      await (0, f.mkdir)($, { recursive: !0 });
      const L = q();
      let N = l.join($, L);
      const j = k == null ? null : l.join($, `package-${v}${l.extname(k.path) || ".7z"}`), D = async (ie) => {
        await x.setDownloadedFile(N, j, A, O, L, ie), await b.done({
          ...A,
          downloadedFile: N
        });
        const we = l.join($, "current.blockmap");
        return await (0, f.pathExists)(we) && await (0, f.copyFile)(we, l.join(x.cacheDir, "current.blockmap")), j == null ? [N] : [N, j];
      }, G = this._logger, V = await x.validateDownloadedPath(N, A, O, G);
      if (V != null)
        return N = V, await D(!1);
      const te = async () => (await x.clear().catch(() => {
      }), await (0, f.unlink)(N).catch(() => {
      })), de = await (0, s.createTempUpdateFile)(`temp-${L}`, $, G);
      try {
        await b.task(de, S, j, te), await (0, n.retry)(() => (0, f.rename)(de, N), {
          retries: 60,
          interval: 500,
          shouldRetry: (ie) => ie instanceof Error && /^EBUSY:/.test(ie.message) ? !0 : (G.warn(`Cannot rename temp file to final file: ${ie.message || ie.stack}`), !1)
        });
      } catch (ie) {
        throw await te(), ie instanceof n.CancellationError && (G.info("cancelled"), this.emit("update-cancelled", A)), ie;
      }
      return G.info(`New version ${v} has been downloaded to ${N}`), await D(!0);
    }
    async differentialDownloadInstaller(b, O, S, A, v) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const k = O.updateInfoAndProvider.provider, q = await k.getBlockMapFiles(b.url, this.app.version, O.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
        this._logger.info(`Download block maps (old: "${q[0]}", new: ${q[1]})`);
        const x = async (G) => {
          const V = await this.httpExecutor.downloadToBuffer(G, {
            headers: O.requestHeaders,
            cancellationToken: O.cancellationToken
          });
          if (V == null || V.length === 0)
            throw new Error(`Blockmap "${G.href}" is empty`);
          try {
            return JSON.parse((0, g.gunzipSync)(V).toString());
          } catch (te) {
            throw new Error(`Cannot parse blockmap "${G.href}", error: ${te}`);
          }
        }, $ = {
          newUrl: b.url,
          oldFile: l.join(this.downloadedUpdateHelper.cacheDir, v),
          logger: this._logger,
          newFile: S,
          isUseMultipleRangeRequest: k.isUseMultipleRangeRequest,
          requestHeaders: O.requestHeaders,
          cancellationToken: O.cancellationToken
        };
        this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && ($.onProgress = (G) => this.emit(p.DOWNLOAD_PROGRESS, G));
        const L = async (G, V) => {
          const te = l.join(V, "current.blockmap");
          await (0, f.outputFile)(te, (0, g.gzipSync)(JSON.stringify(G)));
        }, N = async (G) => {
          const V = l.join(G, "current.blockmap");
          try {
            if (await (0, f.pathExists)(V))
              return JSON.parse((0, g.gunzipSync)(await (0, f.readFile)(V)).toString());
          } catch (te) {
            this._logger.warn(`Cannot parse blockmap "${V}", error: ${te}`);
          }
          return null;
        }, j = await x(q[1]);
        await L(j, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
        let D = await N(this.downloadedUpdateHelper.cacheDir);
        return D == null && (D = await x(q[0])), await new y.GenericDifferentialDownloader(b.info, this.httpExecutor, $).download(D, j), !1;
      } catch (k) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${k.stack || k}`), this._testOnlyOptions != null)
          throw k;
        return !0;
      }
    }
  };
  Rt.AppUpdater = w;
  function T(I) {
    const b = (0, o.prerelease)(I);
    return b != null && b.length > 0;
  }
  class P {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(b) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(b) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(b) {
    }
  }
  return Rt.NoOpLogger = P, Rt;
}
var dl;
function Yr() {
  if (dl) return jt;
  dl = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.BaseUpdater = void 0;
  const n = qr, d = da();
  let m = class extends d.AppUpdater {
    constructor(f, u) {
      super(f, u), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(f = !1, u = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(f, f ? u : this.autoRunAppAfterInstall) ? setImmediate(() => {
        St.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(f) {
      return super.executeDownload({
        ...f,
        done: (u) => (this.dispatchUpdateDownloaded(u), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(f = !1, u = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, l = this.installerPath, o = a == null ? null : a.downloadedFileInfo;
      if (l == null || o == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${f}, isForceRunAfter: ${u}`), this.doInstall({
          isSilent: f,
          isForceRunAfter: u,
          isAdminRightsRequired: o.isAdminRightsRequired
        });
      } catch (s) {
        return this.dispatchError(s), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((f) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (f !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${f}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    spawnSyncLog(f, u = [], a = {}) {
      this._logger.info(`Executing: ${f} with args: ${u}`);
      const l = (0, n.spawnSync)(f, u, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }), { error: o, status: s, stdout: i, stderr: t } = l;
      if (o != null)
        throw this._logger.error(t), o;
      if (s != null && s !== 0)
        throw this._logger.error(t), new Error(`Command ${f} exited with code ${s}`);
      return i.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(f, u = [], a = void 0, l = "ignore") {
      return this._logger.info(`Executing: ${f} with args: ${u}`), new Promise((o, s) => {
        try {
          const i = { stdio: l, env: a, detached: !0 }, t = (0, n.spawn)(f, u, i);
          t.on("error", (r) => {
            s(r);
          }), t.unref(), t.pid !== void 0 && o(!0);
        } catch (i) {
          s(i);
        }
      });
    }
  };
  return jt.BaseUpdater = m, jt;
}
var ir = {}, ar = {}, hl;
function fu() {
  if (hl) return ar;
  hl = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const n = /* @__PURE__ */ mt(), d = uu(), m = Fl;
  let c = class extends d.DifferentialDownloader {
    async download() {
      const l = this.blockAwareFileInfo, o = l.size, s = o - (l.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(s, o - 1);
      const i = f(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await u(this.options.oldFile), i);
    }
  };
  ar.FileWithEmbeddedBlockMapDifferentialDownloader = c;
  function f(a) {
    return JSON.parse((0, m.inflateRawSync)(a).toString());
  }
  async function u(a) {
    const l = await (0, n.open)(a, "r");
    try {
      const o = (await (0, n.fstat)(l)).size, s = Buffer.allocUnsafe(4);
      await (0, n.read)(l, s, 0, s.length, o - s.length);
      const i = Buffer.allocUnsafe(s.readUInt32BE(0));
      return await (0, n.read)(l, i, 0, i.length, o - s.length - i.length), await (0, n.close)(l), f(i);
    } catch (o) {
      throw await (0, n.close)(l), o;
    }
  }
  return ar;
}
var pl;
function ml() {
  if (pl) return ir;
  pl = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.AppImageUpdater = void 0;
  const n = Le(), d = qr, m = /* @__PURE__ */ mt(), c = ht, f = Ie, u = Yr(), a = fu(), l = Ve(), o = Pt();
  let s = class extends u.BaseUpdater {
    constructor(t, r) {
      super(t, r);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(t) {
      const r = t.updateInfoAndProvider.provider, h = (0, l.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: h,
        downloadUpdateOptions: t,
        task: async (g, y) => {
          const p = process.env.APPIMAGE;
          if (p == null)
            throw (0, n.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (t.disableDifferentialDownload || await this.downloadDifferential(h, p, g, r, t)) && await this.httpExecutor.download(h.url, g, y), await (0, m.chmod)(g, 493);
        }
      });
    }
    async downloadDifferential(t, r, h, g, y) {
      try {
        const p = {
          newUrl: t.url,
          oldFile: r,
          logger: this._logger,
          newFile: h,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          requestHeaders: y.requestHeaders,
          cancellationToken: y.cancellationToken
        };
        return this.listenerCount(o.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (w) => this.emit(o.DOWNLOAD_PROGRESS, w)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, p).download(), !1;
      } catch (p) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${p.stack || p}`), process.platform === "linux";
      }
    }
    doInstall(t) {
      const r = process.env.APPIMAGE;
      if (r == null)
        throw (0, n.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, c.unlinkSync)(r);
      let h;
      const g = f.basename(r), y = this.installerPath;
      if (y == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      f.basename(y) === g || !/\d+\.\d+\.\d+/.test(g) ? h = r : h = f.join(f.dirname(r), f.basename(y)), (0, d.execFileSync)("mv", ["-f", y, h]), h !== r && this.emit("appimage-filename-updated", h);
      const p = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return t.isForceRunAfter ? this.spawnLog(h, [], p) : (p.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, d.execFileSync)(h, [], { env: p })), !0;
    }
  };
  return ir.AppImageUpdater = s, ir;
}
var or = {}, sr = {}, gl;
function ha() {
  if (gl) return sr;
  gl = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.LinuxUpdater = void 0;
  const n = Yr();
  let d = class extends n.BaseUpdater {
    constructor(c, f) {
      super(c, f);
    }
    /**
     * Returns true if the current process is running as root.
     */
    isRunningAsRoot() {
      var c;
      return ((c = process.getuid) === null || c === void 0 ? void 0 : c.call(process)) === 0;
    }
    /**
     * Sanitizies the installer path for using with command line tools.
     */
    get installerPath() {
      var c, f;
      return (f = (c = super.installerPath) === null || c === void 0 ? void 0 : c.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && f !== void 0 ? f : null;
    }
    runCommandWithSudoIfNeeded(c) {
      if (this.isRunningAsRoot())
        return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(c[0], c.slice(1));
      const { name: f } = this.app, u = `"${f} would like to update"`, a = this.sudoWithArgs(u);
      this._logger.info(`Running as non-root user, using sudo to install: ${a}`);
      let l = '"';
      return (/pkexec/i.test(a[0]) || a[0] === "sudo") && (l = ""), this.spawnSyncLog(a[0], [...a.length > 1 ? a.slice(1) : [], `${l}/bin/bash`, "-c", `'${c.join(" ")}'${l}`]);
    }
    sudoWithArgs(c) {
      const f = this.determineSudoCommand(), u = [f];
      return /kdesudo/i.test(f) ? (u.push("--comment", c), u.push("-c")) : /gksudo/i.test(f) ? u.push("--message", c) : /pkexec/i.test(f) && u.push("--disable-internal-agent"), u;
    }
    hasCommand(c) {
      try {
        return this.spawnSyncLog("command", ["-v", c]), !0;
      } catch {
        return !1;
      }
    }
    determineSudoCommand() {
      const c = ["gksudo", "kdesudo", "pkexec", "beesu"];
      for (const f of c)
        if (this.hasCommand(f))
          return f;
      return "sudo";
    }
    /**
     * Detects the package manager to use based on the available commands.
     * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
     * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
     * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
     * @param pms - An array of package manager commands to check for, in priority order.
     * @returns The detected package manager command or "unknown" if none are found.
     */
    detectPackageManager(c) {
      var f;
      const u = (f = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || f === void 0 ? void 0 : f.trim();
      if (u)
        return u;
      for (const a of c)
        if (this.hasCommand(a))
          return a;
      return this._logger.warn(`No package manager found in the list: ${c.join(", ")}. Defaulting to the first one: ${c[0]}`), c[0];
    }
  };
  return sr.LinuxUpdater = d, sr;
}
var vl;
function El() {
  if (vl) return or;
  vl = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.DebUpdater = void 0;
  const n = Ve(), d = Pt(), m = ha();
  let c = class du extends m.LinuxUpdater {
    constructor(u, a) {
      super(u, a);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const a = u.updateInfoAndProvider.provider, l = (0, n.findFile)(a.resolveFiles(u.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: l,
        downloadUpdateOptions: u,
        task: async (o, s) => {
          this.listenerCount(d.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (i) => this.emit(d.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(l.url, o, s);
        }
      });
    }
    doInstall(u) {
      const a = this.installerPath;
      if (a == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
        return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
      const l = ["dpkg", "apt"], o = this.detectPackageManager(l);
      try {
        du.installWithCommandRunner(o, a, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (s) {
        return this.dispatchError(s), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, a, l, o) {
      var s;
      if (u === "dpkg")
        try {
          l(["dpkg", "-i", a]);
        } catch (i) {
          o.warn((s = i.message) !== null && s !== void 0 ? s : i), o.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), l(["apt-get", "install", "-f", "-y"]);
        }
      else if (u === "apt")
        o.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), l([
          "apt",
          "install",
          "-y",
          "--allow-unauthenticated",
          // needed for unsigned .debs
          "--allow-downgrades",
          // allow lower version installs
          "--allow-change-held-packages",
          a
        ]);
      else
        throw new Error(`Package manager ${u} not supported`);
    }
  };
  return or.DebUpdater = c, or;
}
var lr = {}, yl;
function wl() {
  if (yl) return lr;
  yl = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.PacmanUpdater = void 0;
  const n = Pt(), d = Ve(), m = ha();
  let c = class hu extends m.LinuxUpdater {
    constructor(u, a) {
      super(u, a);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const a = u.updateInfoAndProvider.provider, l = (0, d.findFile)(a.resolveFiles(u.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: l,
        downloadUpdateOptions: u,
        task: async (o, s) => {
          this.listenerCount(n.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (i) => this.emit(n.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(l.url, o, s);
        }
      });
    }
    doInstall(u) {
      const a = this.installerPath;
      if (a == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      try {
        hu.installWithCommandRunner(a, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (l) {
        return this.dispatchError(l), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, a, l) {
      var o;
      try {
        a(["pacman", "-U", "--noconfirm", u]);
      } catch (s) {
        l.warn((o = s.message) !== null && o !== void 0 ? o : s), l.warn("pacman installation failed, attempting to update package database and retry");
        try {
          a(["pacman", "-Sy", "--noconfirm"]), a(["pacman", "-U", "--noconfirm", u]);
        } catch (i) {
          throw l.error("Retry after pacman -Sy failed"), i;
        }
      }
    }
  };
  return lr.PacmanUpdater = c, lr;
}
var ur = {}, _l;
function Rl() {
  if (_l) return ur;
  _l = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.RpmUpdater = void 0;
  const n = Pt(), d = Ve(), m = ha();
  let c = class pu extends m.LinuxUpdater {
    constructor(u, a) {
      super(u, a);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const a = u.updateInfoAndProvider.provider, l = (0, d.findFile)(a.resolveFiles(u.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: l,
        downloadUpdateOptions: u,
        task: async (o, s) => {
          this.listenerCount(n.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (i) => this.emit(n.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(l.url, o, s);
        }
      });
    }
    doInstall(u) {
      const a = this.installerPath;
      if (a == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const l = ["zypper", "dnf", "yum", "rpm"], o = this.detectPackageManager(l);
      try {
        pu.installWithCommandRunner(o, a, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (s) {
        return this.dispatchError(s), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, a, l, o) {
      if (u === "zypper")
        return l(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", a]);
      if (u === "dnf")
        return l(["dnf", "install", "--nogpgcheck", "-y", a]);
      if (u === "yum")
        return l(["yum", "install", "--nogpgcheck", "-y", a]);
      if (u === "rpm")
        return o.warn("Installing with rpm only (no dependency resolution)."), l(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", a]);
      throw new Error(`Package manager ${u} not supported`);
    }
  };
  return ur.RpmUpdater = c, ur;
}
var cr = {}, Al;
function Tl() {
  if (Al) return cr;
  Al = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.MacUpdater = void 0;
  const n = Le(), d = /* @__PURE__ */ mt(), m = ht, c = Ie, f = pc, u = da(), a = Ve(), l = qr, o = pr;
  let s = class extends u.AppUpdater {
    constructor(t, r) {
      super(t, r), this.nativeUpdater = St.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (h) => {
        this._logger.warn(h), this.emit("error", h);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(t) {
      this._logger.debug != null && this._logger.debug(t);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
        t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(t) {
      let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
      const h = this._logger, g = "sysctl.proc_translated";
      let y = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), y = (0, l.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), h.info(`Checked for macOS Rosetta environment (isRosetta=${y})`);
      } catch (b) {
        h.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${b}`);
      }
      let p = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const O = (0, l.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        h.info(`Checked 'uname -a': arm64=${O}`), p = p || O;
      } catch (b) {
        h.warn(`uname shell command to check for arm64 failed: ${b}`);
      }
      p = p || process.arch === "arm64" || y;
      const w = (b) => {
        var O;
        return b.url.pathname.includes("arm64") || ((O = b.info.url) === null || O === void 0 ? void 0 : O.includes("arm64"));
      };
      p && r.some(w) ? r = r.filter((b) => p === w(b)) : r = r.filter((b) => !w(b));
      const T = (0, a.findFile)(r, "zip", ["pkg", "dmg"]);
      if (T == null)
        throw (0, n.newError)(`ZIP file not provided: ${(0, n.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const P = t.updateInfoAndProvider.provider, I = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: T,
        downloadUpdateOptions: t,
        task: async (b, O) => {
          const S = c.join(this.downloadedUpdateHelper.cacheDir, I), A = () => (0, d.pathExistsSync)(S) ? !t.disableDifferentialDownload : (h.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let v = !0;
          A() && (v = await this.differentialDownloadInstaller(T, t, b, P, I)), v && await this.httpExecutor.download(T.url, b, O);
        },
        done: async (b) => {
          if (!t.disableDifferentialDownload)
            try {
              const O = c.join(this.downloadedUpdateHelper.cacheDir, I);
              await (0, d.copyFile)(b.downloadedFile, O);
            } catch (O) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${O.message}`);
            }
          return this.updateDownloaded(T, b);
        }
      });
    }
    async updateDownloaded(t, r) {
      var h;
      const g = r.downloadedFile, y = (h = t.info.size) !== null && h !== void 0 ? h : (await (0, d.stat)(g)).size, p = this._logger, w = `fileToProxy=${t.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${w})`), this.server = (0, f.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${w})`), this.server.on("close", () => {
        p.info(`Proxy server for native Squirrel.Mac is closed (${w})`);
      });
      const T = (P) => {
        const I = P.address();
        return typeof I == "string" ? I : `http://127.0.0.1:${I?.port}`;
      };
      return await new Promise((P, I) => {
        const b = (0, o.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), O = Buffer.from(`autoupdater:${b}`, "ascii"), S = `/${(0, o.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (A, v) => {
          const k = A.url;
          if (p.info(`${k} requested`), k === "/") {
            if (!A.headers.authorization || A.headers.authorization.indexOf("Basic ") === -1) {
              v.statusCode = 401, v.statusMessage = "Invalid Authentication Credentials", v.end(), p.warn("No authenthication info");
              return;
            }
            const $ = A.headers.authorization.split(" ")[1], L = Buffer.from($, "base64").toString("ascii"), [N, j] = L.split(":");
            if (N !== "autoupdater" || j !== b) {
              v.statusCode = 401, v.statusMessage = "Invalid Authentication Credentials", v.end(), p.warn("Invalid authenthication credentials");
              return;
            }
            const D = Buffer.from(`{ "url": "${T(this.server)}${S}" }`);
            v.writeHead(200, { "Content-Type": "application/json", "Content-Length": D.length }), v.end(D);
            return;
          }
          if (!k.startsWith(S)) {
            p.warn(`${k} requested, but not supported`), v.writeHead(404), v.end();
            return;
          }
          p.info(`${S} requested by Squirrel.Mac, pipe ${g}`);
          let q = !1;
          v.on("finish", () => {
            q || (this.nativeUpdater.removeListener("error", I), P([]));
          });
          const x = (0, m.createReadStream)(g);
          x.on("error", ($) => {
            try {
              v.end();
            } catch (L) {
              p.warn(`cannot end response: ${L}`);
            }
            q = !0, this.nativeUpdater.removeListener("error", I), I(new Error(`Cannot pipe "${g}": ${$}`));
          }), v.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": y
          }), x.pipe(v);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${w})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${T(this.server)}, ${w})`), this.nativeUpdater.setFeedURL({
            url: T(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${O.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", I), this.nativeUpdater.checkForUpdates()) : P([]);
        });
      });
    }
    handleUpdateDownloaded() {
      this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return cr.MacUpdater = s, cr;
}
var fr = {}, Ur = {}, Sl;
function Mf() {
  if (Sl) return Ur;
  Sl = 1, Object.defineProperty(Ur, "__esModule", { value: !0 }), Ur.verifySignature = u;
  const n = Le(), d = qr, m = $r, c = Ie;
  function f(s, i) {
    return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", s], {
      shell: !0,
      timeout: i
    }];
  }
  function u(s, i, t) {
    return new Promise((r, h) => {
      const g = i.replace(/'/g, "''");
      t.info(`Verifying signature ${g}`), (0, d.execFile)(...f(`"Get-AuthenticodeSignature -LiteralPath '${g}' | ConvertTo-Json -Compress"`, 20 * 1e3), (y, p, w) => {
        var T;
        try {
          if (y != null || w) {
            l(t, y, w, h), r(null);
            return;
          }
          const P = a(p);
          if (P.Status === 0) {
            try {
              const S = c.normalize(P.Path), A = c.normalize(i);
              if (t.info(`LiteralPath: ${S}. Update Path: ${A}`), S !== A) {
                l(t, new Error(`LiteralPath of ${S} is different than ${A}`), w, h), r(null);
                return;
              }
            } catch (S) {
              t.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(T = S.message) !== null && T !== void 0 ? T : S.stack}`);
            }
            const b = (0, n.parseDn)(P.SignerCertificate.Subject);
            let O = !1;
            for (const S of s) {
              const A = (0, n.parseDn)(S);
              if (A.size ? O = Array.from(A.keys()).every((k) => A.get(k) === b.get(k)) : S === b.get("CN") && (t.warn(`Signature validated using only CN ${S}. Please add your full Distinguished Name (DN) to publisherNames configuration`), O = !0), O) {
                r(null);
                return;
              }
            }
          }
          const I = `publisherNames: ${s.join(" | ")}, raw info: ` + JSON.stringify(P, (b, O) => b === "RawData" ? void 0 : O, 2);
          t.warn(`Sign verification failed, installer signed with incorrect certificate: ${I}`), r(I);
        } catch (P) {
          l(t, P, null, h), r(null);
          return;
        }
      });
    });
  }
  function a(s) {
    const i = JSON.parse(s);
    delete i.PrivateKey, delete i.IsOSBinary, delete i.SignatureType;
    const t = i.SignerCertificate;
    return t != null && (delete t.Archived, delete t.Extensions, delete t.Handle, delete t.HasPrivateKey, delete t.SubjectName), i;
  }
  function l(s, i, t, r) {
    if (o()) {
      s.warn(`Cannot execute Get-AuthenticodeSignature: ${i || t}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, d.execFileSync)(...f("ConvertTo-Json test", 10 * 1e3));
    } catch (h) {
      s.warn(`Cannot execute ConvertTo-Json: ${h.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    i != null && r(i), t && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${t}. Failing signature validation due to unknown stderr.`));
  }
  function o() {
    const s = m.release();
    return s.startsWith("6.") && !s.startsWith("6.3");
  }
  return Ur;
}
var Cl;
function bl() {
  if (Cl) return fr;
  Cl = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.NsisUpdater = void 0;
  const n = Le(), d = Ie, m = Yr(), c = fu(), f = Pt(), u = Ve(), a = /* @__PURE__ */ mt(), l = Mf(), o = pt;
  let s = class extends m.BaseUpdater {
    constructor(t, r) {
      super(t, r), this._verifyUpdateCodeSignature = (h, g) => (0, l.verifySignature)(h, g, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(t) {
      t && (this._verifyUpdateCodeSignature = t);
    }
    /*** @private */
    doDownloadUpdate(t) {
      const r = t.updateInfoAndProvider.provider, h = (0, u.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: t,
        fileInfo: h,
        task: async (g, y, p, w) => {
          const T = h.packageInfo, P = T != null && p != null;
          if (P && t.disableWebInstaller)
            throw (0, n.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !P && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (P || t.disableDifferentialDownload || await this.differentialDownloadInstaller(h, t, g, r, n.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(h.url, g, y);
          const I = await this.verifySignature(g);
          if (I != null)
            throw await w(), (0, n.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${I}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (P && await this.differentialDownloadWebPackage(t, T, p, r))
            try {
              await this.httpExecutor.download(new o.URL(T.path), p, {
                headers: t.requestHeaders,
                cancellationToken: t.cancellationToken,
                sha512: T.sha512
              });
            } catch (b) {
              try {
                await (0, a.unlink)(p);
              } catch {
              }
              throw b;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(t) {
      let r;
      try {
        if (r = (await this.configOnDisk.value).publisherName, r == null)
          return null;
      } catch (h) {
        if (h.code === "ENOENT")
          return null;
        throw h;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
    }
    doInstall(t) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const h = ["--updated"];
      t.isSilent && h.push("/S"), t.isForceRunAfter && h.push("--force-run"), this.installDirectory && h.push(`/D=${this.installDirectory}`);
      const g = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      g != null && h.push(`--package-file=${g}`);
      const y = () => {
        this.spawnLog(d.join(process.resourcesPath, "elevate.exe"), [r].concat(h)).catch((p) => this.dispatchError(p));
      };
      return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), y(), !0) : (this.spawnLog(r, h).catch((p) => {
        const w = p.code;
        this._logger.info(`Cannot run installer: error code: ${w}, error message: "${p.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), w === "UNKNOWN" || w === "EACCES" ? y() : w === "ENOENT" ? St.shell.openPath(r).catch((T) => this.dispatchError(T)) : this.dispatchError(p);
      }), !0);
    }
    async differentialDownloadWebPackage(t, r, h, g) {
      if (r.blockMapSize == null)
        return !0;
      try {
        const y = {
          newUrl: new o.URL(r.path),
          oldFile: d.join(this.downloadedUpdateHelper.cacheDir, n.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: h,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          cancellationToken: t.cancellationToken
        };
        this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (p) => this.emit(f.DOWNLOAD_PROGRESS, p)), await new c.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, y).download();
      } catch (y) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return fr.NsisUpdater = s, fr;
}
var Pl;
function Bf() {
  return Pl || (Pl = 1, (function(n) {
    var d = _t && _t.__createBinding || (Object.create ? (function(p, w, T, P) {
      P === void 0 && (P = T);
      var I = Object.getOwnPropertyDescriptor(w, T);
      (!I || ("get" in I ? !w.__esModule : I.writable || I.configurable)) && (I = { enumerable: !0, get: function() {
        return w[T];
      } }), Object.defineProperty(p, P, I);
    }) : (function(p, w, T, P) {
      P === void 0 && (P = T), p[P] = w[T];
    })), m = _t && _t.__exportStar || function(p, w) {
      for (var T in p) T !== "default" && !Object.prototype.hasOwnProperty.call(w, T) && d(w, p, T);
    };
    Object.defineProperty(n, "__esModule", { value: !0 }), n.NsisUpdater = n.MacUpdater = n.RpmUpdater = n.PacmanUpdater = n.DebUpdater = n.AppImageUpdater = n.Provider = n.NoOpLogger = n.AppUpdater = n.BaseUpdater = void 0;
    const c = /* @__PURE__ */ mt(), f = Ie;
    var u = Yr();
    Object.defineProperty(n, "BaseUpdater", { enumerable: !0, get: function() {
      return u.BaseUpdater;
    } });
    var a = da();
    Object.defineProperty(n, "AppUpdater", { enumerable: !0, get: function() {
      return a.AppUpdater;
    } }), Object.defineProperty(n, "NoOpLogger", { enumerable: !0, get: function() {
      return a.NoOpLogger;
    } });
    var l = Ve();
    Object.defineProperty(n, "Provider", { enumerable: !0, get: function() {
      return l.Provider;
    } });
    var o = ml();
    Object.defineProperty(n, "AppImageUpdater", { enumerable: !0, get: function() {
      return o.AppImageUpdater;
    } });
    var s = El();
    Object.defineProperty(n, "DebUpdater", { enumerable: !0, get: function() {
      return s.DebUpdater;
    } });
    var i = wl();
    Object.defineProperty(n, "PacmanUpdater", { enumerable: !0, get: function() {
      return i.PacmanUpdater;
    } });
    var t = Rl();
    Object.defineProperty(n, "RpmUpdater", { enumerable: !0, get: function() {
      return t.RpmUpdater;
    } });
    var r = Tl();
    Object.defineProperty(n, "MacUpdater", { enumerable: !0, get: function() {
      return r.MacUpdater;
    } });
    var h = bl();
    Object.defineProperty(n, "NsisUpdater", { enumerable: !0, get: function() {
      return h.NsisUpdater;
    } }), m(Pt(), n);
    let g;
    function y() {
      if (process.platform === "win32")
        g = new (bl()).NsisUpdater();
      else if (process.platform === "darwin")
        g = new (Tl()).MacUpdater();
      else {
        g = new (ml()).AppImageUpdater();
        try {
          const p = f.join(process.resourcesPath, "package-type");
          if (!(0, c.existsSync)(p))
            return g;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const w = (0, c.readFileSync)(p).toString().trim();
          switch (console.info("Found package-type:", w), w) {
            case "deb":
              g = new (El()).DebUpdater();
              break;
            case "rpm":
              g = new (Rl()).RpmUpdater();
              break;
            case "pacman":
              g = new (wl()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (p) {
          console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", p.message);
        }
      }
      return g;
    }
    Object.defineProperty(n, "autoUpdater", {
      enumerable: !0,
      get: () => g || y()
    });
  })(_t)), _t;
}
var Ki = Bf();
const mu = dt.dirname(dc(import.meta.url));
process.env.APP_ROOT = dt.join(mu, "..");
const Ji = process.env.VITE_DEV_SERVER_URL, bd = dt.join(process.env.APP_ROOT, "dist-electron"), gu = dt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ji ? dt.join(process.env.APP_ROOT, "public") : gu;
let kt;
function vu() {
  kt = new Ol({
    icon: dt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: dt.join(mu, "preload.mjs")
    }
  }), kt.webContents.on("did-finish-load", () => {
    kt?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ji ? kt.loadURL(Ji) : kt.loadFile(dt.join(gu, "index.html"));
}
kr.on("window-all-closed", () => {
  process.platform !== "darwin" && (kr.quit(), kt = null);
});
kr.on("activate", () => {
  Ol.getAllWindows().length === 0 && vu();
});
kr.whenReady().then(() => {
  vu(), Ki.autoUpdater.checkForUpdatesAndNotify();
});
Ki.autoUpdater.on("update-downloaded", () => {
  fc.showMessageBox({
    type: "info",
    title: "Update Ready",
    message: "A new version of Quory has been downloaded. Restart to apply?",
    buttons: ["Restart", "Later"]
  }).then((n) => {
    n.response === 0 && Ki.autoUpdater.quitAndInstall();
  });
});
export {
  bd as MAIN_DIST,
  gu as RENDERER_DIST,
  Ji as VITE_DEV_SERVER_URL
};
