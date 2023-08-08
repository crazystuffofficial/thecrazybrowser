! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.BareClient = t() : e.BareClient = t()
}(self, (() => (() => {
    var e = {
            487: e => {
                var t = {
                    utf8: {
                        stringToBytes: function (e) {
                            return t.bin.stringToBytes(unescape(encodeURIComponent(e)))
                        }
                        , bytesToString: function (e) {
                            return decodeURIComponent(escape(t.bin.bytesToString(e)))
                        }
                    }
                    , bin: {
                        stringToBytes: function (e) {
                            for (var t = [], s = 0; s < e.length; s++) t.push(255 & e.charCodeAt(s));
                            return t
                        }
                        , bytesToString: function (e) {
                            for (var t = [], s = 0; s < e.length; s++) t.push(String.fromCharCode(e[s]));
                            return t.join("")
                        }
                    }
                };
                e.exports = t
            }
            , 12: e => {
                var t, s;
                t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = {
                    rotl: function (e, t) {
                        return e << t | e >>> 32 - t
                    }
                    , rotr: function (e, t) {
                        return e << 32 - t | e >>> t
                    }
                    , endian: function (e) {
                        if (e.constructor == Number) return 16711935 & s.rotl(e, 8) | 4278255360 & s.rotl(e, 24);
                        for (var t = 0; t < e.length; t++) e[t] = s.endian(e[t]);
                        return e
                    }
                    , randomBytes: function (e) {
                        for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
                        return t
                    }
                    , bytesToWords: function (e) {
                        for (var t = [], s = 0, r = 0; s < e.length; s++, r += 8) t[r >>> 5] |= e[s] << 24 - r % 32;
                        return t
                    }
                    , wordsToBytes: function (e) {
                        for (var t = [], s = 0; s < 32 * e.length; s += 8) t.push(e[s >>> 5] >>> 24 - s % 32 & 255);
                        return t
                    }
                    , bytesToHex: function (e) {
                        for (var t = [], s = 0; s < e.length; s++) t.push((e[s] >>> 4)
                            .toString(16)), t.push((15 & e[s])
                            .toString(16));
                        return t.join("")
                    }
                    , hexToBytes: function (e) {
                        for (var t = [], s = 0; s < e.length; s += 2) t.push(parseInt(e.substr(s, 2), 16));
                        return t
                    }
                    , bytesToBase64: function (e) {
                        for (var s = [], r = 0; r < e.length; r += 3)
                            for (var o = e[r] << 16 | e[r + 1] << 8 | e[r + 2], n = 0; n < 4; n++) 8 * r + 6 * n <= 8 * e.length ? s.push(t.charAt(o >>> 6 * (3 - n) & 63)) : s.push("=");
                        return s.join("")
                    }
                    , base64ToBytes: function (e) {
                        e = e.replace(/[^A-Z0-9+\/]/gi, "");
                        for (var s = [], r = 0, o = 0; r < e.length; o = ++r % 4) 0 != o && s.push((t.indexOf(e.charAt(r - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | t.indexOf(e.charAt(r)) >>> 6 - 2 * o);
                        return s
                    }
                }, e.exports = s
            }
            , 738: e => {
                function t(e) {
                    return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                }
                e.exports = function (e) {
                    return null != e && (t(e) || function (e) {
                        return "function" == typeof e.readFloatLE && "function" == typeof e.slice && t(e.slice(0, 0))
                    }(e) || !!e._isBuffer)
                }
            }
            , 568: (e, t, s) => {
                var r, o, n, a, i;
                r = s(12), o = s(487)
                    .utf8, n = s(738), a = s(487)
                    .bin, (i = function (e, t) {
                        e.constructor == String ? e = t && "binary" === t.encoding ? a.stringToBytes(e) : o.stringToBytes(e) : n(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || e.constructor === Uint8Array || (e = e.toString());
                        for (var s = r.bytesToWords(e), c = 8 * e.length, h = 1732584193, d = -271733879, u = -1732584194, f = 271733878, l = 0; l < s.length; l++) s[l] = 16711935 & (s[l] << 8 | s[l] >>> 24) | 4278255360 & (s[l] << 24 | s[l] >>> 8);
                        s[c >>> 5] |= 128 << c % 32, s[14 + (c + 64 >>> 9 << 4)] = c;
                        var w = i._ff
                            , p = i._gg
                            , b = i._hh
                            , g = i._ii;
                        for (l = 0; l < s.length; l += 16) {
                            var y = h
                                , x = d
                                , v = u
                                , m = f;
                            h = w(h, d, u, f, s[l + 0], 7, -680876936), f = w(f, h, d, u, s[l + 1], 12, -389564586), u = w(u, f, h, d, s[l + 2], 17, 606105819), d = w(d, u, f, h, s[l + 3], 22, -1044525330), h = w(h, d, u, f, s[l + 4], 7, -176418897), f = w(f, h, d, u, s[l + 5], 12, 1200080426), u = w(u, f, h, d, s[l + 6], 17, -1473231341), d = w(d, u, f, h, s[l + 7], 22, -45705983), h = w(h, d, u, f, s[l + 8], 7, 1770035416), f = w(f, h, d, u, s[l + 9], 12, -1958414417), u = w(u, f, h, d, s[l + 10], 17, -42063), d = w(d, u, f, h, s[l + 11], 22, -1990404162), h = w(h, d, u, f, s[l + 12], 7, 1804603682), f = w(f, h, d, u, s[l + 13], 12, -40341101), u = w(u, f, h, d, s[l + 14], 17, -1502002290), h = p(h, d = w(d, u, f, h, s[l + 15], 22, 1236535329), u, f, s[l + 1], 5, -165796510), f = p(f, h, d, u, s[l + 6], 9, -1069501632), u = p(u, f, h, d, s[l + 11], 14, 643717713), d = p(d, u, f, h, s[l + 0], 20, -373897302), h = p(h, d, u, f, s[l + 5], 5, -701558691), f = p(f, h, d, u, s[l + 10], 9, 38016083), u = p(u, f, h, d, s[l + 15], 14, -660478335), d = p(d, u, f, h, s[l + 4], 20, -405537848), h = p(h, d, u, f, s[l + 9], 5, 568446438), f = p(f, h, d, u, s[l + 14], 9, -1019803690), u = p(u, f, h, d, s[l + 3], 14, -187363961), d = p(d, u, f, h, s[l + 8], 20, 1163531501), h = p(h, d, u, f, s[l + 13], 5, -1444681467), f = p(f, h, d, u, s[l + 2], 9, -51403784), u = p(u, f, h, d, s[l + 7], 14, 1735328473), h = b(h, d = p(d, u, f, h, s[l + 12], 20, -1926607734), u, f, s[l + 5], 4, -378558), f = b(f, h, d, u, s[l + 8], 11, -2022574463), u = b(u, f, h, d, s[l + 11], 16, 1839030562), d = b(d, u, f, h, s[l + 14], 23, -35309556), h = b(h, d, u, f, s[l + 1], 4, -1530992060), f = b(f, h, d, u, s[l + 4], 11, 1272893353), u = b(u, f, h, d, s[l + 7], 16, -155497632), d = b(d, u, f, h, s[l + 10], 23, -1094730640), h = b(h, d, u, f, s[l + 13], 4, 681279174), f = b(f, h, d, u, s[l + 0], 11, -358537222), u = b(u, f, h, d, s[l + 3], 16, -722521979), d = b(d, u, f, h, s[l + 6], 23, 76029189), h = b(h, d, u, f, s[l + 9], 4, -640364487), f = b(f, h, d, u, s[l + 12], 11, -421815835), u = b(u, f, h, d, s[l + 15], 16, 530742520), h = g(h, d = b(d, u, f, h, s[l + 2], 23, -995338651), u, f, s[l + 0], 6, -198630844), f = g(f, h, d, u, s[l + 7], 10, 1126891415), u = g(u, f, h, d, s[l + 14], 15, -1416354905), d = g(d, u, f, h, s[l + 5], 21, -57434055), h = g(h, d, u, f, s[l + 12], 6, 1700485571), f = g(f, h, d, u, s[l + 3], 10, -1894986606), u = g(u, f, h, d, s[l + 10], 15, -1051523), d = g(d, u, f, h, s[l + 1], 21, -2054922799), h = g(h, d, u, f, s[l + 8], 6, 1873313359), f = g(f, h, d, u, s[l + 15], 10, -30611744), u = g(u, f, h, d, s[l + 6], 15, -1560198380), d = g(d, u, f, h, s[l + 13], 21, 1309151649), h = g(h, d, u, f, s[l + 4], 6, -145523070), f = g(f, h, d, u, s[l + 11], 10, -1120210379), u = g(u, f, h, d, s[l + 2], 15, 718787259), d = g(d, u, f, h, s[l + 9], 21, -343485551), h = h + y >>> 0, d = d + x >>> 0, u = u + v >>> 0, f = f + m >>> 0
                        }
                        return r.endian([h, d, u, f])
                    })
                    ._ff = function (e, t, s, r, o, n, a) {
                        var i = e + (t & s | ~t & r) + (o >>> 0) + a;
                        return (i << n | i >>> 32 - n) + t
                    }, i._gg = function (e, t, s, r, o, n, a) {
                        var i = e + (t & r | s & ~r) + (o >>> 0) + a;
                        return (i << n | i >>> 32 - n) + t
                    }, i._hh = function (e, t, s, r, o, n, a) {
                        var i = e + (t ^ s ^ r) + (o >>> 0) + a;
                        return (i << n | i >>> 32 - n) + t
                    }, i._ii = function (e, t, s, r, o, n, a) {
                        var i = e + (s ^ (t | ~r)) + (o >>> 0) + a;
                        return (i << n | i >>> 32 - n) + t
                    }, i._blocksize = 16, i._digestsize = 16, e.exports = function (e, t) {
                        if (null == e) throw new Error("Illegal argument " + e);
                        var s = r.wordsToBytes(i(e, t));
                        return t && t.asBytes ? s : t && t.asString ? a.bytesToString(s) : r.bytesToHex(s)
                    }
            }
        }
        , t = {};
    
    function s(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var n = t[r] = {
            exports: {}
        };
        return e[r](n, n.exports, s), n.exports
    }
    s.d = (e, t) => {
        for (var r in t) s.o(t, r) && !s.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0
            , get: t[r]
        })
    }, s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var r = {};
    return (() => {
        "use strict";
        s.d(r, {
            default: () => v
        });
        const e = [101, 204, 205, 304]
            , t = [304]
            , o = [301, 302, 303, 307, 308];
        class n extends Error {
            constructor(e, t) {
                super(t.message), this.status = e, this.body = t
            }
        }
        class a {
            constructor(e) {
                this.bare = e, this.version = this.constructor.version, this.base = new URL(`./v${this.version}/`, this.bare.server)
            }
            async request() {
                throw new Error("Not implemented")
            }
            async connect() {
                throw new Error("Not implemented")
            }
        }
        
        function i(e) {
            e = e.toString();
            let t = "";
            for (let s = 0; s < e.length; s++) {
                const r = e[s];
                "!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~".includes(r) && !"%".includes(r) ? t += r : t += "%" + r.charCodeAt()
                    .toString(16)
                    .padStart(2, 0)
            }
            return t
        }
        let c, h;
        "object" == typeof self && void 0 !== self && (c = self), "object" == typeof globalThis && void 0 !== globalThis ? c = globalThis : "object" == typeof window && void 0 !== window && (c = window);
        const d = h = c
            , {
                fetch: u
                , WebSocket: f
            } = d;
        class l extends a {
            static version = 1;
            constructor(...e) {
                super(...e), this.ws = new URL(this.base), this.http = new URL(this.base), this.new_meta = new URL("./ws-new-meta", this.base), this.get_meta = new URL("./ws-meta", this.base), "https:" === this.ws.protocol ? this.ws.protocol = "wss:" : this.ws.protocol = "ws:"
            }
            async connect(e, t, s, r, o) {
                const a = await u(this.new_meta, {
                    method: "GET"
                });
                if (!a.ok) throw n(a.status, await a.json());
                const c = await a.text()
                    , h = new f(this.ws, ["bare", i(JSON.stringify({
                        remote: {
                            protocol: t
                            , host: s
                            , port: r
                            , path: o
                        }
                        , headers: e
                        , forward_headers: ["accept-encoding", "accept-language", "sec-websocket-extensions", "sec-websocket-key", "sec-websocket-version"]
                        , id: c
                    }))]);
                return h.meta = new Promise(((e, t) => {
                    h.addEventListener("open", (async () => {
                        const s = await u(this.get_meta, {
                            headers: {
                                "x-bare-id": c
                            }
                            , method: "GET"
                        });
                        s.ok || t(new n(s.status, await s.json())), e(await s.json())
                    })), h.addEventListener("error", t)
                })), h
            }
            async request(t, s, r, o, n, a, i, c, h) {
                if (o.startsWith("blob:")) {
                    const e = await u(`blob:${location.origin}${i}`);
                    return e.jsonHeaders = Object.fromEntries(e.headers.entries()), e
                }
                const d = {};
                if (s instanceof Headers)
                    for (let [e, t] of s) d[e] = t;
                else
                    for (let e in s) d[e] = s[e];
                const f = {
                    credentials: "omit"
                    , method: t
                    , signal: h
                };
                void 0 !== r && (f.body = r);
                const l = new Request(this.http, f);
                this.#e(l, o, n, i, a, d, ["accept-encoding", "accept-language"]);
                const w = await u(l)
                    , p = await this.#t(w);
                let b, {
                    status: g
                    , statusText: y
                    , headers: x
                    , rawHeaders: v
                } = p;
                return b = e.includes(g) ? new Response(void 0, {
                    status: g
                    , statusText: y
                    , headers: x
                }) : new Response(w.body, {
                    status: g
                    , statusText: y
                    , headers: x
                }), b.rawHeaders = v, b.rawResponse = rawResponse, b.cached = !1, b
            }
            async #t(e) {
                if (!e.ok) throw new n(e.status, await e.json());
                const t = parseInt(e.headers.get("x-bare-status"))
                    , s = e.headers.get("x-bare-status-text")
                    , r = JSON.parse(e.headers.get("x-bare-headers"));
                return {
                    status: t
                    , statusText: s
                    , rawHeaders: r
                    , headers: new Headers(r)
                }
            }
            #e(e, t, s, r, o, n, a) {
                e.headers.set("x-bare-protocol", t), e.headers.set("x-bare-host", s), e.headers.set("x-bare-path", r), e.headers.set("x-bare-port", o), e.headers.set("x-bare-headers", JSON.stringify(n)), e.headers.set("x-bare-forward-headers", JSON.stringify(a))
            }
        }
        const w = 3072;
        var p = s(568);
        const {
            fetch: b
            , WebSocket: g
            , Request: y
        } = d;
        class x extends a {
            static version = 2;
            constructor(...e) {
                super(...e), this.ws = new URL(this.base), this.http = new URL(this.base), this.new_meta = new URL("./ws-new-meta", this.base), this.get_meta = new URL("./ws-meta", this.base), "https:" === this.ws.protocol ? this.ws.protocol = "wss:" : this.ws.protocol = "ws:"
            }
            async connect(e, t, s, r, o) {
                const a = new y(this.new_meta);
                this.#e(a.headers, t, s, o, r, e);
                const i = await b(a);
                if (!i.ok) throw new n(i.status, await i.json());
                const c = await i.text()
                    , h = new g(this.ws, [c]);
                return h.meta = new Promise(((e, t) => {
                    h.addEventListener("open", (async () => {
                        const t = await b(this.get_meta, {
                            headers: {
                                "x-bare-id": c
                            }
                            , method: "GET"
                        });
                        e(await this.#t(t))
                    })), h.addEventListener("error", t)
                })), h
            }
            async request(s, r, o, n, a, i, c, h, d) {
                if (n.startsWith("blob:")) {
                    const e = await b(`blob:${location.origin}${c}`);
                    return e.jsonHeaders = Object.fromEntries(e.headers.entries()), e
                }
                const u = {};
                if (r instanceof Headers)
                    for (let [e, t] of r) u[e] = t;
                else
                    for (let e in r) u[e] = r[e];
                const f = {
                    credentials: "omit"
                    , method: s
                    , signal: d
                };
                "only-if-cached" !== h && (f.cache = h), void 0 !== o && (f.body = o);
                const l = new y(this.http + "?cache=" + p(`${n}${a}${i}${c}`), f);
                this.#e(l.headers, n, a, c, i, u);
                const w = await b(l)
                    , g = await this.#t(w);
                let x, {
                    status: v
                    , statusText: m
                    , headers: _
                    , rawHeaders: T
                } = g;
                return t.includes(v) && (v = w.status, m = w.statusText), x = e.includes(v) ? new Response(void 0, {
                    status: v
                    , statusText: m
                    , headers: _
                }) : new Response(w.body, {
                    status: v
                    , statusText: m
                    , headers: _
                }), x.rawHeaders = T, x.rawResponse = w, x.cached = t.includes(g.status), x
            }
            async #t(e) {
                if (!e.ok) throw new n(e.status, await e.json());
                const t = function (e) {
                    const t = "x-bare-headers";
                    if ((e = new Headers(e))
                        .has(`${t}-0`)) {
                        const s = [];
                        for (let [r, o] of e)
                            if (r.startsWith(t)) {
                                if (!o.startsWith(";")) return {
                                    error: {
                                        code: "INVALID_BARE_HEADER"
                                        , id: `request.headers.${r}`
                                        , message: "Value didn't begin with semi-colon."
                                    }
                                };
                                o = o.slice(1), s[parseInt(r.slice(t.length + 1))] = o, e.delete(r)
                            } e.set(t, s.join(""))
                    }
                    return e
                }(e.headers);
                if (t.error) throw new n(t.error);
                const s = parseInt(t.get("x-bare-status"))
                    , r = t.get("x-bare-status-text")
                    , o = JSON.parse(t.get("x-bare-headers"));
                return {
                    status: s
                    , statusText: r
                    , headers: new Headers(o)
                    , rawHeaders: o
                }
            }
            #e(e, t, s, r, o, n, a = [], i = [], c = []) {
                e.set("x-bare-protocol", t), e.set("x-bare-host", s), e.set("x-bare-path", r), e.set("x-bare-port", o), e.set("x-bare-headers", JSON.stringify(n));
                for (let t of a) e.append("x-bare-forward-headers", t);
                for (let t of i) e.append("x-bare-pass-headers", t);
                for (let t of c) e.append("x-bare-pass-status", t);
                return function (e) {
                    if ((e = new Headers(e))
                        .has("x-bare-headers")) {
                        const t = e.get("x-bare-headers");
                        if (t.length > w) {
                            e.delete("x-bare-headers");
                            let s = 0;
                            for (let r = 0; r < t.length; r += w) {
                                const o = t.slice(r, r + w)
                                    , n = s++;
                                e.set(`x-bare-headers-${n}`, `;${o}`)
                            }
                        }
                    }
                }(e), e
            }
        }
        class v {
            ready = !1;
            constructor(e, t) {
                this.server = new URL(e), "object" == typeof t && this.#s(t)
            }
            #s(e) {
                let t = !1;
                for (let s of [x, l])
                    if (e.versions.includes(`v${s.version}`)) {
                        this.client = new s(this), t = !0;
                        break
                    } if (!t) throw new Error("Unable to find compatible client version.");
                this.data = e, this.ready = !0
            }
            async #r() {
                if (!0 === this.ready) return;
                const e = await fetch(this.server);
                if (!e.ok) throw new Error(`Unable to fetch Bare meta: ${e.status} ${await e.text()}`);
                this.#s(await e.json())
            }
            async request(e, t, s, r, o, n, a, i, c) {
                return await this.#r(), this.client.request(e, t, s, r, o, n, a, i, c)
            }
            async connect(e, t, s, r, o) {
                return await this.#r(), this.client.connect(e, t, s, r, o)
            }
            async fetch(e, t = {}) {
                let s, r, n, a, i;
                e = new URL(e), s = "string" == typeof t.method ? t.method : "GET", void 0 !== t.body && null !== t.body && (r = t.body), n = "object" == typeof t.headers && null !== t.headers ? t.headers instanceof Headers ? Object.fromEntries(t.headers) : t.headers : {}, a = "string" == typeof t.cache ? t.cache : "default", t.signal instanceof AbortSignal && (i = t.signal);
                for (let c = 0;; c++) {
                    let h;
                    h = "" === e.port ? "https:" === e.protocol ? "443" : "80" : e.port, n.host = e.host;
                    const d = await this.request(s, n, r, e.protocol, e.hostname, h, e.pathname + e.search, a, i);
                    if (d.finalURL = e.toString(), !o.includes(d.status)) return d;
                    switch (t.redirect) {
                    case "follow":
                        if (20 > c && d.headers.has("location")) {
                            e = new URL(d.headers.get("location"), e);
                            continue
                        }
                        throw new TypeError("Failed to fetch");
                    case "error":
                        throw new TypeError("Failed to fetch");
                    default:
                        return d
                    }
                }
            }
        }
    })(), r.default
})()));
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/uv.sw-handler.js', {
        scope: __uv$config.prefix
        , updateViaCache: 'none'
    , });
};

// check custom functions
document.addEventListener('keydown', key => {
    if (key.ctrlKey) {
        if (document.getElementsByClassName("chrome-tab")[key.key - 1]) {
            document.getElementsByClassName("chrome-tab")[key.key - 1].click()
            chromeTabs.setCurrentTab(document.getElementsByClassName("chrome-tab")[key.key - 1])
            setInfo(document.getElementsByClassName("chrome-tab")[key.key - 1].ifd + 1)
        }
    }
})
document.addEventListener('mousedown', pass => {
    if (pass.target.parentElement.id != "optionsdrop") hideId("optionsdrop")
    if (pass.target.parentElement.id != "ctx") hideId("ctx")
    
    // there HAS to be a better way to do this.
    if (!pass.target.classList.contains("extenico")) {
        if (document.querySelector(".extension_menu"))
            if (!pass.target.parentElement.classList.contains("extension_menu") && !pass.target.parentElement.parentElement.classList.contains("extension_menu") && !pass.target.classList.contains("extension_menu")) document.querySelector(".extension_menu")
                .style.display = "none"
    }
})
// xor function in one place for easy modification
class xor {
    static encode(str) {
        return encodeURIComponent(
            str
            .toString()
            .split('')
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            )
            .join('')
        );
    }
    static decode(str) {
        if (str.charAt(str.length - 1) == '/') str = str.slice(0, -1);
        return decodeURIComponent(str)
            .split('')
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            )
            .join('');
    }
}! function (i, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
        return e(i, t)
    }) : "object" == typeof module && module.exports ? module.exports = e(i, require("jquery")) : i.jQueryBridget = e(i, i.jQuery)
}(window, function (t, i) {
    "use strict";
    var c = Array.prototype.slice
        , e = t.console
        , p = void 0 === e ? function () {} : function (t) {
            e.error(t)
        };
    
    function n(d, o, u) {
        (u = u || i || t.jQuery) && (o.prototype.option || (o.prototype.option = function (t) {
            u.isPlainObject(t) && (this.options = u.extend(!0, this.options, t))
        }), u.fn[d] = function (t) {
            if ("string" == typeof t) {
                var i = c.call(arguments, 1);
                return s = i, a = "$()." + d + '("' + (r = t) + '")', (e = this)
                    .each(function (t, i) {
                        var e = u.data(i, d);
                        if (e) {
                            var n = e[r];
                            if (n && "_" != r.charAt(0)) {
                                var o = n.apply(e, s);
                                h = void 0 === h ? o : h
                            } else p(a + " is not a valid method")
                        } else p(d + " not initialized. Cannot call methods, i.e. " + a)
                    }), void 0 !== h ? h : e
            }
            var e, r, s, h, a, n;
            return n = t, this.each(function (t, i) {
                var e = u.data(i, d);
                e ? (e.option(n), e._init()) : (e = new o(i, n), u.data(i, d, e))
            }), this
        }, r(u))
    }
    
    function r(t) {
        !t || t && t.bridget || (t.bridget = n)
    }
    return r(i || t.jQuery), n
})
, function (t, i) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
        return i()
    }) : "object" == typeof module && module.exports ? module.exports = i() : t.getSize = i()
}(window, function () {
    "use strict";
    
    function m(t) {
        var i = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(i) && i
    }
    var e = "undefined" == typeof console ? function () {} : function (t) {
            console.error(t)
        }
        , y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]
        , b = y.length;
    
    function E(t) {
        var i = getComputedStyle(t);
        return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
    }
    var _, x = !1;
    
    function P(t) {
        if (function () {
                if (!x) {
                    x = !0;
                    var t = document.createElement("div");
                    t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(t);
                    var e = E(t);
                    P.isBoxSizeOuter = _ = 200 == m(e.width), i.removeChild(t)
                }
            }(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
            var i = E(t);
            if ("none" == i.display) return function () {
                for (var t = {
                        width: 0
                        , height: 0
                        , innerWidth: 0
                        , innerHeight: 0
                        , outerWidth: 0
                        , outerHeight: 0
                    }, i = 0; i < b; i++) t[y[i]] = 0;
                return t
            }();
            var e = {};
            e.width = t.offsetWidth, e.height = t.offsetHeight;
            for (var n = e.isBorderBox = "border-box" == i.boxSizing, o = 0; o < b; o++) {
                var r = y[o]
                    , s = i[r]
                    , h = parseFloat(s);
                e[r] = isNaN(h) ? 0 : h
            }
            var a = e.paddingLeft + e.paddingRight
                , d = e.paddingTop + e.paddingBottom
                , u = e.marginLeft + e.marginRight
                , c = e.marginTop + e.marginBottom
                , p = e.borderLeftWidth + e.borderRightWidth
                , f = e.borderTopWidth + e.borderBottomWidth
                , g = n && _
                , l = m(i.width);
            !1 !== l && (e.width = l + (g ? 0 : a + p));
            var v = m(i.height);
            return !1 !== v && (e.height = v + (g ? 0 : d + f)), e.innerWidth = e.width - (a + p), e.innerHeight = e.height - (d + f), e.outerWidth = e.width + u, e.outerHeight = e.height + c, e
        }
    }
    return P
})
, function (t, i) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", i) : "object" == typeof module && module.exports ? module.exports = i() : t.EvEmitter = i()
}("undefined" != typeof window ? window : this, function () {
    function t() {}
    var i = t.prototype;
    return i.on = function (t, i) {
        if (t && i) {
            var e = this._events = this._events || {}
                , n = e[t] = e[t] || [];
            return -1 == n.indexOf(i) && n.push(i), this
        }
    }, i.once = function (t, i) {
        if (t && i) {
            this.on(t, i);
            var e = this._onceEvents = this._onceEvents || {};
            return (e[t] = e[t] || {})[i] = !0, this
        }
    }, i.off = function (t, i) {
        var e = this._events && this._events[t];
        if (e && e.length) {
            var n = e.indexOf(i);
            return -1 != n && e.splice(n, 1), this
        }
    }, i.emitEvent = function (t, i) {
        var e = this._events && this._events[t];
        if (e && e.length) {
            e = e.slice(0), i = i || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < e.length; o++) {
                var r = e[o];
                n && n[r] && (this.off(t, r), delete n[r]), r.apply(this, i)
            }
            return this
        }
    }, i.allOff = function () {
        delete this._events, delete this._onceEvents
    }, t
})
, function (i, e) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (t) {
        return e(i, t)
    }) : "object" == typeof module && module.exports ? module.exports = e(i, require("ev-emitter")) : i.Unipointer = e(i, i.EvEmitter)
}(window, function (o, t) {
    function i() {}
    var e = i.prototype = Object.create(t.prototype);
    e.bindStartEvent = function (t) {
        this._bindStartEvent(t, !0)
    }, e.unbindStartEvent = function (t) {
        this._bindStartEvent(t, !1)
    }, e._bindStartEvent = function (t, i) {
        var e = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener"
            , n = "mousedown";
        o.PointerEvent ? n = "pointerdown" : "ontouchstart" in o && (n = "touchstart"), t[e](n, this)
    }, e.handleEvent = function (t) {
        var i = "on" + t.type;
        this[i] && this[i](t)
    }, e.getTouch = function (t) {
        for (var i = 0; i < t.length; i++) {
            var e = t[i];
            if (e.identifier == this.pointerIdentifier) return e
        }
    }, e.onmousedown = function (t) {
        var i = t.button;
        i && 0 !== i && 1 !== i || this._pointerDown(t, t)
    }, e.ontouchstart = function (t) {
        this._pointerDown(t, t.changedTouches[0])
    }, e.onpointerdown = function (t) {
        this._pointerDown(t, t)
    }, e._pointerDown = function (t, i) {
        t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== i.pointerId ? i.pointerId : i.identifier, this.pointerDown(t, i))
    }, e.pointerDown = function (t, i) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, i])
    };
    var n = {
        mousedown: ["mousemove", "mouseup"]
        , touchstart: ["touchmove", "touchend", "touchcancel"]
        , pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return e._bindPostStartEvents = function (t) {
        if (t) {
            var i = n[t.type];
            i.forEach(function (t) {
                o.addEventListener(t, this)
            }, this), this._boundPointerEvents = i
        }
    }, e._unbindPostStartEvents = function () {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function (t) {
            o.removeEventListener(t, this)
        }, this), delete this._boundPointerEvents)
    }, e.onmousemove = function (t) {
        this._pointerMove(t, t)
    }, e.onpointermove = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }, e.ontouchmove = function (t) {
        var i = this.getTouch(t.changedTouches);
        i && this._pointerMove(t, i)
    }, e._pointerMove = function (t, i) {
        this.pointerMove(t, i)
    }, e.pointerMove = function (t, i) {
        this.emitEvent("pointerMove", [t, i])
    }, e.onmouseup = function (t) {
        this._pointerUp(t, t)
    }, e.onpointerup = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, e.ontouchend = function (t) {
        var i = this.getTouch(t.changedTouches);
        i && this._pointerUp(t, i)
    }, e._pointerUp = function (t, i) {
        this._pointerDone(), this.pointerUp(t, i)
    }, e.pointerUp = function (t, i) {
        this.emitEvent("pointerUp", [t, i])
    }, e._pointerDone = function () {
        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
    }, e._pointerReset = function () {
        this.isPointerDown = !1, delete this.pointerIdentifier
    }, e.pointerDone = function () {}, e.onpointercancel = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }, e.ontouchcancel = function (t) {
        var i = this.getTouch(t.changedTouches);
        i && this._pointerCancel(t, i)
    }, e._pointerCancel = function (t, i) {
        this._pointerDone(), this.pointerCancel(t, i)
    }, e.pointerCancel = function (t, i) {
        this.emitEvent("pointerCancel", [t, i])
    }, i.getPointerPoint = function (t) {
        return {
            x: t.pageX
            , y: t.pageY
        }
    }, i
})
, function (i, e) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (t) {
        return e(i, t)
    }) : "object" == typeof module && module.exports ? module.exports = e(i, require("unipointer")) : i.Unidragger = e(i, i.Unipointer)
}(window, function (r, t) {
    function i() {}
    var e = i.prototype = Object.create(t.prototype);
    e.bindHandles = function () {
        this._bindHandles(!0)
    }, e.unbindHandles = function () {
        this._bindHandles(!1)
    }, e._bindHandles = function (t) {
        for (var i = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", e = t ? this._touchActionValue : "", n = 0; n < this.handles.length; n++) {
            var o = this.handles[n];
            this._bindStartEvent(o, t), o[i]("click", this), r.PointerEvent && (o.style.touchAction = e)
        }
    }, e._touchActionValue = "none", e.pointerDown = function (t, i) {
        this.okayPointerDown(t) && (this.pointerDownPointer = i, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, i]))
    };
    var o = {
            TEXTAREA: !0
            , INPUT: !0
            , SELECT: !0
            , OPTION: !0
        }
        , s = {
            radio: !0
            , checkbox: !0
            , button: !0
            , submit: !0
            , image: !0
            , file: !0
        };
    return e.okayPointerDown = function (t) {
        var i = o[t.target.nodeName]
            , e = s[t.target.type]
            , n = !i || e;
        return n || this._pointerReset(), n
    }, e.pointerDownBlur = function () {
        var t = document.activeElement;
        t && t.blur && t != document.body && t.blur()
    }, e.pointerMove = function (t, i) {
        var e = this._dragPointerMove(t, i);
        this.emitEvent("pointerMove", [t, i, e]), this._dragMove(t, i, e)
    }, e._dragPointerMove = function (t, i) {
        var e = {
            x: i.pageX - this.pointerDownPointer.pageX
            , y: i.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(e) && this._dragStart(t, i), e
    }, e.hasDragStarted = function (t) {
        return 3 < Math.abs(t.x) || 3 < Math.abs(t.y)
    }, e.pointerUp = function (t, i) {
        this.emitEvent("pointerUp", [t, i]), this._dragPointerUp(t, i)
    }, e._dragPointerUp = function (t, i) {
        this.isDragging ? this._dragEnd(t, i) : this._staticClick(t, i)
    }, e._dragStart = function (t, i) {
        this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, i)
    }, e.dragStart = function (t, i) {
        this.emitEvent("dragStart", [t, i])
    }, e._dragMove = function (t, i, e) {
        this.isDragging && this.dragMove(t, i, e)
    }, e.dragMove = function (t, i, e) {
        t.preventDefault(), this.emitEvent("dragMove", [t, i, e])
    }, e._dragEnd = function (t, i) {
        this.isDragging = !1, setTimeout(function () {
            delete this.isPreventingClicks
        }.bind(this)), this.dragEnd(t, i)
    }, e.dragEnd = function (t, i) {
        this.emitEvent("dragEnd", [t, i])
    }, e.onclick = function (t) {
        this.isPreventingClicks && t.preventDefault()
    }, e._staticClick = function (t, i) {
        this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, i), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
            delete this.isIgnoringMouseUp
        }.bind(this), 400)))
    }, e.staticClick = function (t, i) {
        this.emitEvent("staticClick", [t, i])
    }, i.getPointerPoint = t.getPointerPoint, i
})
, function (e, n) {
    "function" == typeof define && define.amd ? define(["get-size/get-size", "unidragger/unidragger"], function (t, i) {
        return n(e, t, i)
    }) : "object" == typeof module && module.exports ? module.exports = n(e, require("get-size"), require("unidragger")) : e.Draggabilly = n(e, e.getSize, e.Unidragger)
}(window, function (r, a, t) {
    function e(t, i) {
        for (var e in i) t[e] = i[e];
        return t
    }
    var n = r.jQuery;
    
    function i(t, i) {
        this.element = "string" == typeof t ? document.querySelector(t) : t, n && (this.$element = n(this.element)), this.options = e({}, this.constructor.defaults), this.option(i), this._create()
    }
    var o = i.prototype = Object.create(t.prototype);
    i.defaults = {}, o.option = function (t) {
        e(this.options, t)
    };
    var s = {
        relative: !0
        , absolute: !0
        , fixed: !0
    };
    
    function d(t, i, e) {
        return e = e || "round", i ? Math[e](t / i) * i : t
    }
    return o._create = function () {
        this.position = {}, this._getPosition(), this.startPoint = {
            x: 0
            , y: 0
        }, this.dragPoint = {
            x: 0
            , y: 0
        }, this.startPosition = e({}, this.position);
        var t = getComputedStyle(this.element);
        s[t.position] || (this.element.style.position = "relative"), this.on("pointerDown", this.onPointerDown), this.on("pointerMove", this.onPointerMove), this.on("pointerUp", this.onPointerUp), this.enable(), this.setHandles()
    }, o.setHandles = function () {
        this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element], this.bindHandles()
    }, o.dispatchEvent = function (t, i, e) {
        var n = [i].concat(e);
        this.emitEvent(t, n), this.dispatchJQueryEvent(t, i, e)
    }, o.dispatchJQueryEvent = function (t, i, e) {
        var n = r.jQuery;
        if (n && this.$element) {
            var o = n.Event(i);
            o.type = t, this.$element.trigger(o, e)
        }
    }, o._getPosition = function () {
        var t = getComputedStyle(this.element)
            , i = this._getPositionCoord(t.left, "width")
            , e = this._getPositionCoord(t.top, "height");
        this.position.x = isNaN(i) ? 0 : i, this.position.y = isNaN(e) ? 0 : e, this._addTransformPosition(t)
    }, o._getPositionCoord = function (t, i) {
        if (-1 != t.indexOf("%")) {
            var e = a(this.element.parentNode);
            return e ? parseFloat(t) / 100 * e[i] : 0
        }
        return parseInt(t, 10)
    }, o._addTransformPosition = function (t) {
        var i = t.transform;
        if (0 === i.indexOf("matrix")) {
            var e = i.split(",")
                , n = 0 === i.indexOf("matrix3d") ? 12 : 4
                , o = parseInt(e[n], 10)
                , r = parseInt(e[n + 1], 10);
            this.position.x += o, this.position.y += r
        }
    }, o.onPointerDown = function (t, i) {
        this.element.classList.add("is-pointer-down"), this.dispatchJQueryEvent("pointerDown", t, [i])
    }, o.dragStart = function (t, i) {
        this.isEnabled && (this._getPosition(), this.measureContainment(), this.startPosition.x = this.position.x, this.startPosition.y = this.position.y, this.setLeftTop(), this.dragPoint.x = 0, this.dragPoint.y = 0, this.element.classList.add("is-dragging"), this.dispatchEvent("dragStart", t, [i]), this.animate())
    }, o.measureContainment = function () {
        var t = this.getContainer();
        if (t) {
            var i = a(this.element)
                , e = a(t)
                , n = this.element.getBoundingClientRect()
                , o = t.getBoundingClientRect()
                , r = e.borderLeftWidth + e.borderRightWidth
                , s = e.borderTopWidth + e.borderBottomWidth
                , h = this.relativeStartPosition = {
                    x: n.left - (o.left + e.borderLeftWidth)
                    , y: n.top - (o.top + e.borderTopWidth)
                };
            this.containSize = {
                width: e.width - r - h.x - i.width
                , height: e.height - s - h.y - i.height
            }
        }
    }, o.getContainer = function () {
        var t = this.options.containment;
        if (t) return t instanceof HTMLElement ? t : "string" == typeof t ? document.querySelector(t) : this.element.parentNode
    }, o.onPointerMove = function (t, i, e) {
        this.dispatchJQueryEvent("pointerMove", t, [i, e])
    }, o.dragMove = function (t, i, e) {
        if (this.isEnabled) {
            var n = e.x
                , o = e.y
                , r = this.options.grid
                , s = r && r[0]
                , h = r && r[1];
            n = d(n, s), o = d(o, h), n = this.containDrag("x", n, s), o = this.containDrag("y", o, h), n = "y" == this.options.axis ? 0 : n, o = "x" == this.options.axis ? 0 : o, this.position.x = this.startPosition.x + n, this.position.y = this.startPosition.y + o, this.dragPoint.x = n, this.dragPoint.y = o, this.dispatchEvent("dragMove", t, [i, e])
        }
    }, o.containDrag = function (t, i, e) {
        if (!this.options.containment) return i;
        var n = "x" == t ? "width" : "height"
            , o = d(-this.relativeStartPosition[t], e, "ceil")
            , r = this.containSize[n];
        return r = d(r, e, "floor"), Math.max(o, Math.min(r, i))
    }, o.onPointerUp = function (t, i) {
        this.element.classList.remove("is-pointer-down"), this.dispatchJQueryEvent("pointerUp", t, [i])
    }, o.dragEnd = function (t, i) {
        this.isEnabled && (this.element.style.transform = "", this.setLeftTop(), this.element.classList.remove("is-dragging"), this.dispatchEvent("dragEnd", t, [i]))
    }, o.animate = function () {
        if (this.isDragging) {
            this.positionDrag();
            var t = this;
            requestAnimationFrame(function () {
                t.animate()
            })
        }
    }, o.setLeftTop = function () {
        this.element.style.left = this.position.x + "px", this.element.style.top = this.position.y + "px"
    }, o.positionDrag = function () {
        this.element.style.transform = "translate3d( " + this.dragPoint.x + "px, " + this.dragPoint.y + "px, 0)"
    }, o.staticClick = function (t, i) {
        this.dispatchEvent("staticClick", t, [i])
    }, o.setPosition = function (t, i) {
        this.position.x = t, this.position.y = i, this.setLeftTop()
    }, o.enable = function () {
        this.isEnabled = !0
    }, o.disable = function () {
        this.isEnabled = !1, this.isDragging && this.dragEnd()
    }, o.destroy = function () {
        this.disable(), this.element.style.transform = "", this.element.style.left = "", this.element.style.top = "", this.element.style.position = "", this.unbindHandles(), this.$element && this.$element.removeData("draggabilly")
    }, o._init = function () {}, n && n.bridget && n.bridget("draggabilly", i), i
});
((window, factory) => {
    if (typeof define == "function" && define.amd) {
        define(["draggabilly"], (Draggabilly) => factory(window, Draggabilly));
    } else if (typeof module == "object" && module.exports) {
        module.exports = factory(window, require("draggabilly"));
    } else {
        window.ChromeTabs = factory(window, window.Draggabilly);
    }
})(window, (window, Draggabilly) => {
    const TAB_CONTENT_MARGIN = 9;
    const TAB_CONTENT_OVERLAP_DISTANCE = 1;
    const TAB_OVERLAP_DISTANCE = TAB_CONTENT_MARGIN * 2 + TAB_CONTENT_OVERLAP_DISTANCE;
    const TAB_CONTENT_MIN_WIDTH = 23;
    const TAB_CONTENT_MAX_WIDTH = 240;
    const TAB_SIZE_SMALL = 83;
    const TAB_SIZE_SMALLER = 58;
    const TAB_SIZE_MINI = 47;
    const WINDOW_PADDING_OFFSET = 10 + TAB_CONTENT_MARGIN;
    const noop = (_) => {};
    const closest = (value, array) => {
        let closest = Infinity;
        let closestIndex = -1;
        
        array.forEach((v, i) => {
            if (Math.abs(value - v) < closest) {
                closest = Math.abs(value - v);
                closestIndex = i;
            }
        });
        return closestIndex;
    };
    
    var tabC = 1;
    const defaultTabProperties = {
        title: "New Tab"
        , favicon: false
    , };
    
    let instanceId = 0;
    
    class ChromeTabs {
        constructor() {
            this.draggabillies = [];
        }
        
        init(hypertabContainer) {
            this.hypertabContainer = hypertabContainer;
            
            this.instanceId = instanceId;
            this.hypertabContainer.setAttribute(
                "data-chrome-tabs-instance-id"
                , this.instanceId
            );
            instanceId += 1;
            
            this.setupCustomProperties();
            this.setupStyleEl();
            this.setupEvents();
            this.layoutTabs();
            this.setupDraggabilly();
        }
        
        emit(eventName, data) {
            this.hypertabContainer.dispatchEvent(
                new CustomEvent(eventName, {
                    detail: data
                })
            );
        }
        
        setupCustomProperties() {
            this.hypertabContainer.style.setProperty(
                "--tab-content-margin"
                , `${TAB_CONTENT_MARGIN}px`
            );
        }
        
        setupStyleEl() {
            this.styleEl = document.createElement("style");
            this.hypertabContainer.appendChild(this.styleEl);
        }
        
        setupEvents() {
            window.addEventListener("resize", (_) => {
                this.cleanUpPreviouslyDraggedTabs();
                this.layoutTabs();
            });
            
            this.hypertabContainer.addEventListener("dblclick", (event) => {
                if ([this.hypertabContainer, this.tabContentEl].includes(event.target))
                    newTab("ht://newtab");
            });
            
            this.tabEls.forEach((tabEl) => this.setTabCloseEventListener(tabEl));
        }
        
        get tabEls() {
            return Array.prototype.slice.call(
                this.hypertabContainer.querySelectorAll(".chrome-tab")
            );
        }
        get pinTabEls() {
            return Array.prototype.slice.call(
                this.hypertabContainer.querySelectorAll(".chrome-tab.pin")
            );
        }
        get nonPinTabEls() {
            return Array.prototype.slice.call(
                this.hypertabContainer.querySelectorAll(".chrome-tab:not(.chrome-tab.pin)")
            );
        }
        
        get tabContentEl() {
            return this.hypertabContainer.querySelector(".chrome-tabs-content");
        }
        
        get tabContentWidths() {
            const numberOfTabs = this.tabEls.length;
            const numberOfPinTabs = this.pinTabEls.length;
            const numberOfNonPinnedTabs = this.nonPinTabEls.length;
            const numberOfTabsMath = (numberOfNonPinnedTabs + (numberOfPinTabs * 0.137));
            const tabsContentWidth = this.tabContentEl.clientWidth - (numberOfPinTabs * 29);
            const tabsCumulativeOverlappedWidth = (numberOfTabsMath - 1) * TAB_CONTENT_OVERLAP_DISTANCE;
            const targetWidth = (tabsContentWidth - 2 * TAB_CONTENT_MARGIN + tabsCumulativeOverlappedWidth) / numberOfNonPinnedTabs;
            const clampedTargetWidth = Math.max(TAB_CONTENT_MIN_WIDTH, Math.min(TAB_CONTENT_MAX_WIDTH, targetWidth));
            const flooredClampedTargetWidth = Math.floor(clampedTargetWidth);
            const totalTabsWidthUsingTarget = flooredClampedTargetWidth * 3 * TAB_CONTENT_MARGIN - tabsCumulativeOverlappedWidth;
            const totalExtraWidthDueToFlooring = tabsContentWidth - totalTabsWidthUsingTarget;
            
            const widths = [];
            let extraWidthRemaining = totalExtraWidthDueToFlooring;
            for (let n = 0; n < numberOfTabs; ++n) {
                if (this.tabEls[n].classList.contains('pin')) {
                    widths.push(this.tabEls[n].getBoundingClientRect()
                        .width);
                    
                } else {
                    const extraWidth = flooredClampedTargetWidth < TAB_CONTENT_MAX_WIDTH && extraWidthRemaining > 0 ? 1 : 0;
                    widths.push(flooredClampedTargetWidth + extraWidth);
                    if (extraWidthRemaining > 0) extraWidthRemaining -= 1;
                }
            }
            
            return widths;
        }
        get tabContentPositions() {
            const positions = [];
            const widths = [];
            const tabContentWidths = this.tabContentWidths;
            let position = TAB_CONTENT_MARGIN;
            tabContentWidths.forEach((width, n) => {
                widths.push(width);
                if (widths[n - 1] == 47) {
                    position = position - 18;
                }
                const offset = n * TAB_CONTENT_OVERLAP_DISTANCE;
                positions.push(position - offset);
                position += width;
            });
            return positions;
        }
        
        get tabPositions() {
            const positions = [];
            this.tabContentPositions.forEach((contentPosition) => {
                positions.push(contentPosition - TAB_CONTENT_MARGIN);
            });
            
            return positions;
        }
        updateTabButton() {
            let toAdd = 12;
            if (document.getElementById(0)
                .children.length != 0) {
                [...document.getElementById('0')
                    .children].forEach(tab => {
                    toAdd += tab.clientWidth - WINDOW_PADDING_OFFSET;
                });
            }
            if (toAdd <= window.innerWidth - (WINDOW_PADDING_OFFSET * 2.52) && !(this.tabEls.length >= 12)) {
                document
                    .getElementById("createTab")
                    .setAttribute("style", "margin-left:" + (toAdd) + "px");
            } else {
                document
                    .getElementById("createTab")
                    .setAttribute(
                        "style"
                        , "margin-left:" + (window.innerWidth - 30) + "px"
                    );
            }
        }
        layoutTabs() {
            const tabContentWidths = this.tabContentWidths;
            
            this.tabEls.forEach((tabEl, i) => {
                const contentWidth = tabContentWidths[i];
                const width = contentWidth + 2 * TAB_CONTENT_MARGIN;
                
                tabEl.style.width = width + "px";
                tabEl.removeAttribute("is-small");
                tabEl.removeAttribute("is-smaller");
                tabEl.removeAttribute("is-mini");
                
                if (contentWidth < TAB_SIZE_SMALL) tabEl.setAttribute("is-small", "");
                if (contentWidth < TAB_SIZE_SMALLER)
                    tabEl.setAttribute("is-smaller", "");
                if (contentWidth < TAB_SIZE_MINI) tabEl.setAttribute("is-mini", "");
            });
            let styleHTML = "";
            this.tabPositions.forEach((position, n) => {
                styleHTML += `
                  .chrome-tabs[data-chrome-tabs-instance-id="${this.instanceId
          }"] .chrome-tab:nth-child(${n + 1}) {
                    transform: translate3d(${position}px, 0, 0)
                  }
                `;
            });
            this.styleEl.innerHTML = styleHTML;
            this.updateTabButton();
        }
        
        createNewTabEl() {
            const div = document.createElement("div");
            div.innerHTML = `<div ifd="${tabC++}"class="chrome-tab" onclick="opencity('${tabC}')">
              <div class="chrome-tab-dividers"></div>
              <div class="chrome-tab-background">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="chrome-tab-geometry-left" viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z"/></symbol><symbol id="chrome-tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#chrome-tab-geometry-left"/></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath></defs><svg width="52%" height="100%"><use xlink:href="#chrome-tab-geometry-left" width="214" height="36" class="chrome-tab-geometry"/></svg><g transform="scale(-1, 1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#chrome-tab-geometry-right" width="214" height="36" class="chrome-tab-geometry"/></svg></g></svg>
              </div>
              <div class="chrome-tab-content">
                <div class="chrome-tab-favicon" ></div>
                <div class="chrome-tab-title ${tabC}"></div>
                <div class="chrome-tab-drag-handle"></div>
                <div class="chrome-tab-close" onclick="document.getElementById(${tabC}).remove()"></div>
              </div>
            </div>`;
            return div.firstElementChild;
        }
        
        addTab(tabProperties, {
            animate = true
            , background = false
        } = {}) {
            const tabEl = this.createNewTabEl();
            
            if (animate) {
                tabEl.classList.add("chrome-tab-was-just-added");
                setTimeout(
                    () => tabEl.classList.remove("chrome-tab-was-just-added")
                    , 500
                );
            }
            tabEl.addEventListener(
                "contextmenu"
                , function (c) {
                    ctxTab = this.attributes[0].value;
                    document.getElementById("ctx")
                        .style.left = c.clientX + "px";
                    document.getElementById("ctx")
                        .style.top = c.clientY + "px";
                    //maybe make javascript that creates/destroys the elements when needed?
                    if (document.querySelector(`div[ifd="${+ctxTab}"]`)
                        .hasAttribute("tab-is-pinned")) {
                        document.getElementById('pin')
                            .textContent = "Unpin tab"
                        document.getElementById('pin')
                            .setAttribute("onclick", "toggleId('ctx');chromeTabs.unpinTab(ctxTab);")
                    } else {
                        document.getElementById('pin')
                            .textContent = "Pin tab"
                        document.getElementById('pin')
                            .setAttribute("onclick", "toggleId('ctx');chromeTabs.pinTab(ctxTab);")
                    }
                    openMenu("ctx");
                    c.preventDefault();
                }
                , false
            );
            tabProperties = Object.assign({}, defaultTabProperties, tabProperties);
            this.tabContentEl.appendChild(tabEl);
            this.setTabCloseEventListener(tabEl);
            this.updateTab(tabEl, tabProperties);
            this.emit("tabAdd", {
                tabEl
            });
            
            if (!background) this.setCurrentTab(tabEl);
            
            this.cleanUpPreviouslyDraggedTabs();
            this.layoutTabs();
            this.setupDraggabilly();
        }
        
        setTabCloseEventListener(tabEl) {
            tabEl
                .querySelector(".chrome-tab-close")
                .addEventListener("click", (_) => {
                    _.stopPropagation();
                    this.removeTab(tabEl);
                });
        }
        
        get activeTabEl() {
            return this.hypertabContainer.querySelector(".chrome-tab[active]");
        }
        
        hasActiveTab() {
            return !!this.activeTabEl;
        }
        
        setCurrentTab(tabEl) {
            const activeTabEl = this.activeTabEl;
            if (activeTabEl === tabEl) return;
            if (activeTabEl) activeTabEl.removeAttribute("active");
            tabEl.setAttribute("active", "");
            this.emit("activeTabChange", {
                tabEl
            });
        }
        
        removeTab(tabEl) {
            if (tabEl === this.activeTabEl) {
                if (tabEl.nextElementSibling) {
                    let tempval = +tabEl.nextElementSibling.getAttribute("ifd") + 1;
                    document.getElementById(tempval)
                        .style =
                        "display:inlinebackground: #FFFFFF";
                    this.setCurrentTab(tabEl.nextElementSibling);
                } else if (tabEl.previousElementSibling) {
                    let tempval = +tabEl.previousElementSibling.getAttribute("ifd") + 1;
                    document.getElementById(tempval)
                        .style =
                        "display:inlinebackground: #FFFFFF";
                    this.setCurrentTab(tabEl.previousElementSibling);
                }
            }
            tabEl.parentNode.removeChild(tabEl);
            this.emit("tabRemove", {
                tabEl
            });
            this.cleanUpPreviouslyDraggedTabs();
            this.layoutTabs();
            this.setupDraggabilly();
            if (getActiveFrameId()) setInfo(getActiveFrameId());
        }
        
        updateTab(tabEl, tabProperties) {
            tabEl.querySelector(".chrome-tab-title")
                .textContent =
                tabProperties.title;
            
            const faviconEl = tabEl.querySelector(".chrome-tab-favicon");
            if (tabProperties.favicon) {
                faviconEl.style.backgroundImage = `url('${tabProperties.favicon}')`;
                faviconEl.removeAttribute("hidden", "");
            } else {
                faviconEl.setAttribute("hidden", "");
                faviconEl.removeAttribute("style");
            }
            
            if (tabProperties.url) {}
            
            if (tabProperties.id) {
                tabEl.setAttribute("data-tab-id", tabProperties.id);
            }
        }
        
        cleanUpPreviouslyDraggedTabs() {
            this.tabEls.forEach((tabEl) =>
                tabEl.classList.remove("chrome-tab-was-just-dragged")
            );
        }
        //todo: make updating tab data better AND make it easier to delete them and make them properly update positions when they move.
        // ALSO: need to make elements move to the left/next to other pinned tabs when pinned and not let normal/pinned tabs be mixed
        pinTab(tabId) {
            // setInfo() function checks if a tab is pinned when things change so currently that's how a tab's url get's updated for pinned tabs. (I need to make it update after pins being moved tho which should be easy)
            let tabEL = document.querySelector(`div[ifd="${+tabId}"]`)
                , pins = JSON.parse(localStorage.getItem('ctPins'))
                , frmEl = document.getElementById(+tabId + 1);
            if (!localStorage.getItem('ctPins')) {
                pins = {};
                pins[0] = ({
                    'url': frmEl.contentDocument.URL
                });
                tabEL.setAttribute('tab-is-pinned', Object.keys(pins)
                    .length - 1);
                tabEL.classList.add('pin');
            } else if (tabId == 'update') {
                let pinNum = 0;
                pins = {};
                this.pinTabEls.forEach(tab => {
                    tab.setAttribute('tab-is-pinned', pinNum);
                    pins[pinNum] = {
                        'url': document.getElementById(+tab.getAttribute('ifd') + 1)
                            .contentDocument.URL
                    };
                    pinNum++;
                });
            } else if (tabEL.hasAttribute('tab-is-pinned')) {
                pins[+tabEL.getAttribute('tab-is-pinned')] = ({
                    'url': frmEl.contentDocument.URL
                });
            } else {
                pins[Object.keys(pins)
                    .length + 1] = ({
                    'url': frmEl.contentDocument.URL
                });
                tabEL.setAttribute('tab-is-pinned', Object.keys(pins)
                    .length);
                tabEL.classList.add('pin');
            }
            console.log('pin tab modification', frmEl, tabEL);
            localStorage.setItem('ctPins', JSON.stringify(pins))
            this.layoutTabs()
        }
        unpinTab(tabId) {
            let tabEL = document.querySelector(`div[ifd="${+tabId}"]`)
                , pins = JSON.parse(localStorage.getItem('ctPins'));
            delete pins[+tabEL.getAttribute('tab-is-pinned')];
            tabEL.removeAttribute('tab-is-pinned');
            tabEL.setAttribute('class', 'chrome-tab');
            let pinNum = 0;
            pins = {};
            this.pinTabEls.forEach(tab => {
                tab.setAttribute('tab-is-pinned', pinNum);
                pins[pinNum] = {
                    'url': document.getElementById(+tab.getAttribute('ifd') + 1)
                        .contentDocument.URL
                };
                pinNum++;
            });
            localStorage.setItem('ctPins', JSON.stringify(pins))
            this.layoutTabs();
        }
        setupDraggabilly() {
            const tabEls = this.tabEls;
            const tabPositions = this.tabPositions;
            
            if (this.isDragging) {
                this.isDragging = false;
                this.hypertabContainer.classList.remove("chrome-tabs-is-sorting");
                this.draggabillyDragging.element.classList.remove(
                    "chrome-tab-is-dragging"
                );
                this.draggabillyDragging.element.style.transform = "";
                this.draggabillyDragging.dragEnd();
                this.draggabillyDragging.isDragging = false;
                this.draggabillyDragging.positionDrag = noop; // Prevent Draggabilly from updating tabEl.style.transform in later frames
                this.draggabillyDragging.destroy();
                this.draggabillyDragging = null;
            }
            
            this.draggabillies.forEach((d) => d.destroy());
            
            tabEls.forEach((tabEl, originalIndex) => {
                const originalTabPositionX = tabPositions[originalIndex];
                const draggabilly = new Draggabilly(tabEl, {
                    axis: "x"
                    , handle: ".chrome-tab-drag-handle"
                    , containment: this.tabContentEl
                , });
                
                this.draggabillies.push(draggabilly);
                
                draggabilly.on("pointerDown", (_) => {
                    opencity(+tabEl.getAttribute("ifd") + 1);
                    this.setCurrentTab(tabEl);
                });
                
                draggabilly.on("dragStart", (_) => {
                    this.isDragging = true;
                    this.draggabillyDragging = draggabilly;
                    tabEl.classList.add("chrome-tab-is-dragging");
                    this.hypertabContainer.classList.add("chrome-tabs-is-sorting");
                });
                // prob modify this for pinning tabs too
                draggabilly.on("dragEnd", (_) => {
                    if (tabEl.hasAttribute('tab-is-pinned')) {
                        this.pinTab('update');
                    }
                    this.isDragging = false;
                    const finalTranslateX = parseFloat(tabEl.style.left, 10);
                    tabEl.style.transform = `translate3d(0, 0, 0)`;
                    
                    // Animate dragged tab back into its place
                    requestAnimationFrame((_) => {
                        tabEl.style.left = "0";
                        tabEl.style.transform = `translate3d(${finalTranslateX}px, 0, 0)`;
                        
                        requestAnimationFrame((_) => {
                            tabEl.classList.remove("chrome-tab-is-dragging");
                            this.hypertabContainer.classList.remove("chrome-tabs-is-sorting");
                            
                            tabEl.classList.add("chrome-tab-was-just-dragged");
                            
                            requestAnimationFrame((_) => {
                                tabEl.style.transform = "";
                                
                                this.layoutTabs();
                                this.setupDraggabilly();
                            });
                        });
                    });
                });
                
                draggabilly.on("dragMove", (event, pointer, moveVector) => {
                    // Current index be computed within the event since it can change during the dragMove
                    const tabEls = this.tabEls;
                    const currentIndex = tabEls.indexOf(tabEl);
                    
                    const currentTabPositionX = originalTabPositionX + moveVector.x;
                    const destinationIndexTarget = closest(
                        currentTabPositionX
                        , tabPositions
                    );
                    const destinationIndex = Math.max(
                        0
                        , Math.min(tabEls.length, destinationIndexTarget)
                    );
                    
                    if (currentIndex !== destinationIndex) {
                        this.animateTabMove(tabEl, currentIndex, destinationIndex);
                    }
                });
            });
        }
        
        animateTabMove(tabEl, originIndex, destinationIndex) {
            if (destinationIndex < originIndex) {
                tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex]);
            } else {
                tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex + 1]);
            }
            this.emit("tabReorder", {
                tabEl
                , originIndex
                , destinationIndex
            });
            this.layoutTabs();
        }
    }
    
    return ChromeTabs;
});
const internal_pages = {
    // YOU MUST ADD YOUR INTERNAL PAGE TO THIS FILE IF YOU WANT IT TO WORK!
    // This index is how HT can reference what page to what file
    newtab: "newTab.html"
    , extensionsmarketplace: "404.html"
    , extensions: "extensions.html"
    , games: "redirect.html/#https://crazystuffxyz.netlify.app"
}
const prefix = __uv$config.prefix;
const bare = new BareClient(__uv$config.bare);
const URL_BAR = document.getElementById('urlbar');
const ACTIVE_WINDOW = () => {
    return document.getElementById(getActiveFrameId())
        .contentWindow;
};
const CONTENT_WINDOW = (n) => {
    return document.getElementById(n)
        .contentWindow;
};
const ACTIVE_DOCUMENT = () => {
    return document.getElementById(getActiveFrameId())
        .contentDocument;
};

let history = {}
    , sir = true;

const htHandler = (url) => {
    // handle URLs accessed through the `ht://` "protocol"
    url = url.slice(5);
    return (
        internal_pages[url] ||
        internal_pages['newtab'] ||
        alert('something is very wrong, please refresh')
    );
};

const getActiveFrameId = () => {
    if (document.querySelector('.chrome-tab[active]'))
        return (
            +document.querySelector('.chrome-tab[active]')
            .getAttribute('ifd') + 1
        );
    return null;
};

function addPageToHistory(id, page) {
    if (!sir) {
        sir = true;
        return;
    }
    
    if (!(id in history)) {
        history[id] = [
            [], -1
        ];
    }
    
    if (history[id][1] < history[id][0].length - 1) {
        history[id][0] = history[id][0].slice(0, history[id][1] + 1);
    }
    
    if (history[id][0][
            [history[id].length - 1]
        ] == page) return;
    
    history[id][0].push(page);
    history[id][1] = history[id][0].length - 1;
}

function getPage(id) {
    return (
        ((history[id] || [])[0] || [])[history[id][1]] || htHandler('ht://newtab')
    );
}

function getBack(id) {
    sir = false;
    history[id][1]--;
    return getPage(id);
}

function getForward(id) {
    if (history[id][1] >= history[id][0].length - 1) return getPage(id);
    
    sir = false;
    history[id][1]++;
    return getPage(id);
}
// get's bookmark URL
async function getIcon(id) {
    let urlIco = CONTENT_WINDOW(id)
        .document.querySelector(
            'link[rel="favicon"], link[rel="shortcut icon"], link[rel="icon"]'
        );
    if (urlIco !== null) {
        if (urlIco.href.includes('data:image/png;base64')) return urlIco.href;
        
        const res = await bare.fetch(urlIco.href);
        const obj = URL.createObjectURL([await res.blob()], {
            type: res.headers.get('content-type') || 'image/x-icon'
        , });
        
        setTimeout(() => URL.revokeObjectURL(obj), 1e3);
        
        return obj;
    } else {
        const res = await bare.fetch(
            new URL('/favicon.ico', CONTENT_WINDOW(id)
                .location)
        );
        const obj = URL.createObjectURL([await res.blob()], {
            type: res.headers.get('content-type') || 'image/x-icon'
        , });
        
        setTimeout(() => URL.revokeObjectURL(obj), 1e3);
        
        return obj;
    }
}
// Sets tab information
async function setInfo(frameId) {
    //if the site we are on is not proxied.
    CONTENT_WINDOW(frameId)
        .addEventListener('keydown', function (key) {
            if (key.ctrlKey) {
                if (
                    window.parent.document.getElementsByClassName('chrome-tab')[key.key - 1]
                ) {
                    window.parent.document
                        .getElementsByClassName('chrome-tab')[key.key - 1].click();
                    chromeTabs.setCurrentTab(
                        document.getElementsByClassName('chrome-tab')[key.key - 1]
                    );
                }
            }
        });
    CONTENT_WINDOW(frameId)
        .addEventListener('mousedown', function () {
            window.parent.hideId('optionsdrop');
            window.parent.hideId('ctx');
            if (document.querySelectorAll('.extension_menu'))
                document
                .querySelectorAll('.extension_menu')
                .forEach((a) => (a.style.display = 'none'));
        });
    URL_BAR.value = '';
    if (!CONTENT_WINDOW(frameId)
        .location.href.includes(__uv$config.prefix)) {
        //do this for history then return..
        addPageToHistory(frameId, CONTENT_WINDOW(frameId)
            .location.href);
        return;
    }
    //get current page url.
    let regUrl = CONTENT_WINDOW(frameId)
        .location.href;
    //grabbing title stuff (corrosion sucks with this)
    if (
        CONTENT_WINDOW(frameId)
        .document.getElementsByTagName('title')[0].firstChild
        .textContent
    )
        document.getElementsByClassName(frameId)[0].firstChild.data =
        CONTENT_WINDOW(frameId)
        .document.getElementsByTagName(
            'title'
        )[0].firstChild.textContent;
    else
        document.getElementsByClassName(frameId)[0].firstChild.data = xor.decode(
            regUrl.split(__uv$config.prefix)
            .slice(1)
            .join(__uv$config.prefix)
        );
    //set url bar
    if (getActiveFrameId() == frameId) {
        URL_BAR.value = xor.decode(
            regUrl.split(__uv$config.prefix)
            .slice(1)
            .join(__uv$config.prefix)
        );
    }
    // set the favicon of page
    document.querySelector(
            `div[ifd="${+frameId - 1}"]`
        )
        .children[2].children[0].attributes[1].value = `background-image: url(${await getIcon(
		frameId
	)})`;
    if (
        document
        .querySelector(`div[ifd="${+frameId - 1}"]`)
        .hasAttribute('tab-is-pinned')
    ) {
        chromeTabs.pinTab(+frameId - 1);
    }
    // add the page to local history
    addPageToHistory(frameId, ACTIVE_WINDOW()
        .location.href);
}

function hideId(...x) {
    // Hides hypertab ID.
    x.forEach((frame) => {
        document.getElementById(frame)
            .style.display = 'none';
    });
}

function showId(...x) {
    // Shows hypertab ID.
    x.forEach((frame) => {
        document.getElementById(frame)
            .style.display = 'block';
    });
}

function toggleId(...x) {
    // Toggles between two hypertabs
    x.forEach((frame) => {
        if (getComputedStyle(document.getElementById(frame))
            .display === 'none') {
            showId(frame);
        } else {
            hideId(frame);
        }
    });
}

function openMenu(...x) {
    // displays additional settings!
    let elems = x.map((id) => document.getElementById(id));
    let shouldOpen = true;
    elems.forEach((elm) => {
        if (getComputedStyle(elm)
            .display !== 'none') shouldOpen = false;
    });
    if (shouldOpen) showId(elems[0].id);
    else elems.forEach((elm) => hideId(elm.id));
}

function inspect() {
    let firebug = document.createElement('script');
    firebug.setAttribute('src', '/fbl/firebug-lite-debug.js');
    ACTIVE_DOCUMENT()
        .body.appendChild(firebug)(function () {
            if (ACTIVE_WINDOW()
                .firebug.version) {
                ACTIVE_WINDOW()
                    .firebug.init();
            } else {
                setTimeout(arguments.callee);
            }
        })();
    void firebug;
}

function opencity(frame) {
    // creates the actual frame inside the hypertab!
    let proxyFrames = document.getElementsByClassName('iframething');
    
    for (let iframeIndex = 0; iframeIndex < proxyFrames.length; iframeIndex++)
        proxyFrames[iframeIndex].style.display = 'none';
    
    document.getElementById(frame)
        .style = 'display:inline; background: #FFFFFF';
    document.getElementById(frame)
        .focus();
    
    let regUrl = ACTIVE_WINDOW()
        .location.href;
    URL_BAR.value = xor.decode(
        regUrl.split(__uv$config.prefix)
        .slice(1)
        .join(__uv$config.prefix)
    );
    // listen for attribute changes with soon to be favicon (not done)
}

function skipAd() {
    while (
        ACTIVE_DOCUMENT()
        .getElementsByClassName('video-ads')[0].innerHTML !== ''
    ) {
        var banner = false;
        for (
            var i = 0; i <
            ACTIVE_DOCUMENT()
            .getElementsByClassName('ytp-ad-overlay-close-button')
            .length; i++
        ) {
            ACTIVE_DOCUMENT()
                .getElementsByClassName('ytp-ad-overlay-close-button')[i].click();
            banner = true;
        }
        if (banner === false) {
            ACTIVE_DOCUMENT()
                .getElementsByClassName(
                    'html5-main-video'
                )[0].currentTime =
                ACTIVE_DOCUMENT()
                .getElementsByClassName(
                    'html5-main-video'
                )[0].duration;
            ACTIVE_DOCUMENT()
                .getElementsByClassName('ytp-ad-skip-button')[0].click();
        }
    }
}
let newTab = (url, uxor = true) => {
    // creates a new hypertab!!
    chromeTabs.addTab({
        title: 'New Tab'
        , favicon: 'favicon.ico'
    , });
    
    URL_BAR.value = '';
    
    let frameId = tabNum++;
    let frame = document.createElement('IFRAME');
    
    if (url.startsWith('ht://')) {
        frame.setAttribute('src', htHandler(url));
    } else if (uxor == false) {
        frame.setAttribute('src', url);
    } else {
        frame.setAttribute(
            'src'
            , '//' + location.host + __uv$config.prefix + xor.encode(url)
        );
    }
    
    frame.setAttribute('allow', 'fullscreen');
    frame.setAttribute(
        'sandbox'
        , 'allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock allow-modals'
    );
    document.body.appendChild(frame);
    frame.setAttribute('class', 'iframething');
    frame.setAttribute('style', 'display:none background: #FFFFFF');
    frame.setAttribute('id', frameId);
    frame.setAttribute('onload', `setInfo(` + frameId + `)`);
    
    opencity(frameId);
    return document.querySelector(`div[ifd="${+frameId - 1}"]`);
};
let hypertabContainer = document.querySelector('.chrome-tabs');
let chromeTabs = new ChromeTabs();
chromeTabs.init(hypertabContainer);
let tabNum = 2; // 0 and 1 are reserved for the GUI
let ctxTab = 1;
document.querySelector('#urlbar')
    .addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') {
            // suggest searches
            try {
                bare
                    .fetch(`https://duckduckgo.com/ac/?q=${URL_BAR.value}`)
                    .then((res) => res.json())
                    .then((a) => {
                        (document.getElementById('searchsuggestions')
                            .innerHTML = '')
                        , a.forEach((a) =>
                            addEl('option', document.getElementById('searchsuggestions'), {
                                className: 'search-opt'
                                , value: a.phrase
                            , })
                        );
                    });
            } catch {}
            return;
        }
        // if user is entering a new URL!
        URL_BAR.blur();
        if (URL_BAR.value.startsWith('javascript:')) {
            try {
                jsUri = decodeURIComponent(URL_BAR.value.substring(11));
            } catch {
                jsUri = URL_BAR.value.substring(11);
            }
            ACTIVE_WINDOW()
                .eval(jsUri);
            if (
                !ACTIVE_DOCUMENT()
                .baseURI.endsWith(
                    location.host + '/internal/newTab/main.php'
                )
            ) {
                URL_BAR.value = ACTIVE_DOCUMENT()
                    .baseURI;
            } else {
                URL_BAR.value = '';
            }
            return;
        }
        if (URL_BAR.value.startsWith('ht://')) {
            value = htHandler(URL_BAR.value);
            document.getElementById(getActiveFrameId())
                .src = value;
            return;
        }
        if (!URL_BAR.value.includes('.') || URL_BAR.value.includes(' ')) {
            value =
                '//' +
                location.host +
                __uv$config.prefix +
                xor.encode(window.searchEngine + encodeURIComponent(URL_BAR.value));
            document.getElementById(getActiveFrameId())
                .src = value;
            addPageToHistory(getActiveFrameId(), value);
            return;
        }
        if (
            !URL_BAR.value.startsWith('http://') &&
            !URL_BAR.value.startsWith('https://')
        ) {
            value =
                '//' +
                location.host +
                __uv$config.prefix +
                xor.encode('http://' + URL_BAR.value);
            document.getElementById(getActiveFrameId())
                .src = value;
        } else {
            value =
                '//' + location.host + __uv$config.prefix + xor.encode(URL_BAR.value);
            document.getElementById(getActiveFrameId())
                .src = value;
        }
        
        event.preventDefault();
    });

document.getElementById('optionsdrop')
    .style.display = 'none';
if (!('tabbkg' in localStorage)) {
    // theming! | redo this shit
    localStorage.setItem('tabbkg', '#202124');
    localStorage.setItem('tabhover', '#292b2e');
    localStorage.setItem('tabact', '#323639');
    localStorage.setItem('tabacttit', '#f1f3f4');
    localStorage.setItem('tabinatit', '#9ca1a7');
    localStorage.setItem('searchbar', '#202124');
    localStorage.setItem('mockb', '#323639');
    localStorage.setItem('nt', '#FFF');
    localStorage.setItem('ua', navigator.userAgent);
}

let items = [
    'tabbkg'
    
    
    
    
    
    
    , 'tabhover'
    
    
    
    
    
    
    , 'tabact'
    
    
    
    
    
    
    , 'tabacttit'
    
    
    
    
    
    
    , 'tabinatit'
    
    
    
    
    
    
    , 'searchbar'
    
    
    
    
    
    
    , 'ua'
    
    
    
    
    

, ];
// redo this
function applyTheme(frame) {
    switch (frame) {
    case 'Apply':
        for (let iframeIndex = 0; iframeIndex < items.length; iframeIndex++) {
            localStorage.setItem(
                items[iframeIndex]
                , `${document.getElementById(items[iframeIndex]).value}`
            );
        }
        localStorage.setItem('mockb', document.getElementById('tabact')
            .value);
        location.reload();
        break;
    case 'Dark':
    case 'Reset':
        localStorage.setItem('tabbkg', '#202124');
        localStorage.setItem('tabhover', '#202124');
        localStorage.setItem('tabact', '#323639');
        localStorage.setItem('tabacttit', '#9ca1a7');
        localStorage.setItem('tabacttit', '#f1f3f4');
        localStorage.setItem('tabinatit', '#9ca1a7');
        localStorage.setItem('searchbar', '#202124');
        localStorage.setItem('mockb', '#323639');
        localStorage.setItem('nt', '#FFF');
        location.reload();
        break;
    case 'Light':
        localStorage.setItem('tabbkg', '#f4f5f6');
        localStorage.setItem('tabhover', '#f4f5f6');
        localStorage.setItem('tabact', '#fff');
        localStorage.setItem('tabacttit', '#9ca1a7');
        localStorage.setItem('tabacttit', '#45474a');
        localStorage.setItem('tabinatit', '#5f6368');
        localStorage.setItem('searchbar', '#D0D8E8 ');
        localStorage.setItem('mockb', '#fff');
        localStorage.setItem('nt', '#323639');
        location.reload();
        break;
    }
}

for (let iframeIndex = 0; iframeIndex < items.length; iframeIndex++) {
    // this is what ACTUALLY applies the theme to the tabs
    document.getElementById(items[iframeIndex])
        .value = localStorage.getItem(
            items[iframeIndex]
        );
}

document.cookie = `cua=${localStorage.getItem('ua')}`; // custom User Agent (TODO)
// document.head.insertAdjacentHTML("beforeend", `<style>.chrome-tabs.chrome-tabs-dark-theme {background: ${localStorage.getItem('tabbkg')}} .dropdown-content {background-color: ${localStorage.getItem('tabbkg')}} .mock-browser-content {background-color: ${localStorage.getItem('mockb')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tabs-bottom-bar {background-color: ${localStorage.getItem('tabact')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem('tabact')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem('tabhover')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-title {color: ${localStorage.getItem('tabacttit')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-title {color: ${localStorage.getItem('tabinatit')}} #urlbar {background: ${localStorage.getItem('searchbar')} color: ${localStorage.getItem('nt')} } #createTab {color: ${localStorage.getItem('nt')}} .dropdown-content frame {color: ${localStorage.getItem('nt')}} #urlbutton {color: ${localStorage.getItem('nt')}} #options {color: ${localStorage.getItem('nt')}} </style>`)

// anti-GG
window.onbeforeunload = function () {
    return 't';
};

window.searchEngine =
    localStorage.getItem('searchEngine') || 'https://search.brave.com/search?q=';
document.getElementById('customSearch')
    .value = window.searchEngine;

//bookmarks
async function AddBookmark(id) {
    let data = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(
        CONTENT_WINDOW(id)
        .location.href +
        '  ' +
        (await getIcon(id)) +
        ' ' +
        CONTENT_WINDOW(id)
        .document.getElementsByTagName('title')[0].firstChild
        .textContent
    );
    data.push([
        CONTENT_WINDOW(id)
        .location.href
        
        
        
        
        
        
        , await getIcon(id)
        
        
        
        
        
        
        , CONTENT_WINDOW(id)
        .document.getElementsByTagName('title')[0].firstChild
        .textContent
        
        
        
        
        
    
    , ]);
    localStorage.setItem('bookmarks', JSON.stringify(data));
}

function setUA(ua) {
    switch (ua) {
    case 'chrome':
        break;
    case 'firefox':
        break;
    case 'iphone':
        break;
    case 'ipad':
        break;
    default:
        break;
    }
}
window.toggleActiveExtension = (ext) => {
    if (!ActiveExtensions.active.includes(ext)) {
        console.info('==== ADDED extension ====\n' + ext);
        window.ActiveExtensions.active.push(ext);
    } else {
        console.info('== REMOVED extension ====\n' + ext);
        window.ActiveExtensions.active.pop(ext);
    }
    localStorage.setItem('ActiveExtensions', JSON.stringify(ActiveExtensions));
    console.log(localStorage.getItem('ActiveExtensions'));
};

localStorage.getItem('ActiveExtensions') ||
    localStorage.setItem('ActiveExtensions', '{"active":["core"]}');
// custom dropdown menu code mf?

// activate all extensions from ActiveExtensions
try {
    window.ActiveExtensions = JSON.parse(
        localStorage.getItem('ActiveExtensions')
    );
} catch {
    alert('ActiveExtensions could not be initialized.');
    localStorage.setItem('ActiveExtensions', '{"active":["core"]}');
    window.ActiveExtensions = JSON.parse('{"active":["core"]}');
}
ActiveExtensions.active.forEach((ext) => {
    console.log('==== ACTIVE EXTENSION ====\n' + ext);
    let extScript = document.createElement('script');
    extScript.setAttribute('src', './js/x/' + ext + '.js');
    document.body.appendChild(extScript);
});
if (localStorage.getItem('ctPins')) {
    let pins = JSON.parse(localStorage.getItem('ctPins'));
    for (pin in pins) {
        var tab = newTab(pins[pin].url, false);
        tab.setAttribute('tab-is-pinned', pin);
        tab.classList.add('pin');
    }
}
let addEl = (a, b, c) =>
    Object.assign(b.appendChild(document.createElement(a)), c);

newTab('ht://newtab');

function load(){

if(localStorage.getItem("toload") == null){
localStorage.setItem("toload", "none");
}
if(localStorage.getItem("toload") != "none"){
newTab(localStorage.getItem("toload"));
localStorage.setItem("toload", "none");
}
}
setInterval(load, 0);
