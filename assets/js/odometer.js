/*! odometer 0.4.8 */
(function() {
    var t, e, n, i, o, r, s, a, u, d, l, h, p, c, m, f, g, v, w, M = [].slice;
    t = /^\(?([^)]*)\)?(?:(.)(d+))?$/, h = document.createElement("div").style, i = null != h.transition || null != h.webkitTransition || null != h.mozTransition || null != h.oTransition, d = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, r = function(t) {
        var e;
        return (e = document.createElement("div")).innerHTML = t, e.children[0]
    }, u = function(t, e) {
        return t.className = t.className.replace(new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"), " ")
    }, o = function(t, e) {
        return u(t, e), t.className += " " + e
    }, p = function(t, e) {
        var n;
        return null != document.createEvent ? ((n = document.createEvent("HTMLEvents")).initEvent(e, !0, !0), t.dispatchEvent(n)) : void 0
    }, a = function() {
        var t, e;
        return null != (t = null != (e = window.performance) && "function" == typeof e.now ? e.now() : void 0) ? t : +new Date
    }, l = function(t, e) {
        return null == e && (e = 0), e ? (t *= Math.pow(10, e), t += .5, t = Math.floor(t), t /= Math.pow(10, e)) : Math.round(t)
    }, c = function(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t)
    }, s = function(t) {
        return t - l(t)
    }, f = !1, (m = function() {
        var t, e, n, i, o;
        if (!f && null != window.jQuery) {
            for (f = !0, o = [], e = 0, n = (i = ["html", "text"]).length; n > e; e++) t = i[e], o.push(function(t) {
                var e;
                return e = window.jQuery.fn[t], window.jQuery.fn[t] = function(t) {
                    var n;
                    return null == t || null == (null != (n = this[0]) ? n.odometer : void 0) ? e.apply(this, arguments) : this[0].odometer.update(t)
                }
            }(t));
            return o
        }
    })(), setTimeout(m, 0), (n = function() {
        function n(t) {
            var e, i, o, r, s, a, u, d, l, h = this;
            if (this.options = t, this.el = this.options.el, null != this.el.odometer) return this.el.odometer;
            for (e in this.el.odometer = this, u = n.options) o = u[e], null == this.options[e] && (this.options[e] = o);
            null == (r = this.options).duration && (r.duration = 2e3), this.MAX_VALUES = this.options.duration / (1e3 / 30) / 2 | 0, this.resetFormat(), this.value = this.cleanValue(null != (d = this.options.value) ? d : ""), this.renderInside(), this.render();
            try {
                for (s = 0, a = (l = ["innerHTML", "innerText", "textContent"]).length; a > s; s++) i = l[s], null != this.el[i] && function(t) {
                    Object.defineProperty(h.el, t, {
                        get: function() {
                            var e;
                            return "innerHTML" === t ? h.inside.outerHTML : null != (e = h.inside.innerText) ? e : h.inside.textContent
                        },
                        set: function(t) {
                            return h.update(t)
                        }
                    })
                }(i)
            } catch (t) {
                t,
                this.watchForMutations()
            }
        }
        return n.prototype.renderInside = function() {
            return this.inside = document.createElement("div"), this.inside.className = "odometer-inside", this.el.innerHTML = "", this.el.appendChild(this.inside)
        }, n.prototype.watchForMutations = function() {
            var t = this;
            if (null != e) try {
                return null == this.observer && (this.observer = new e((function(e) {
                    var n;
                    return n = t.el.innerText, t.renderInside(), t.render(t.value), t.update(n)
                }))), this.watchMutations = !0, this.startWatchingMutations()
            } catch (t) {
                t
            }
        }, n.prototype.startWatchingMutations = function() {
            return this.watchMutations ? this.observer.observe(this.el, {
                childList: !0
            }) : void 0
        }, n.prototype.stopWatchingMutations = function() {
            var t;
            return null != (t = this.observer) ? t.disconnect() : void 0
        }, n.prototype.cleanValue = function(t) {
            var e;
            return "string" == typeof t && (t = (t = (t = t.replace(null != (e = this.format.radix) ? e : ".", "<radix>")).replace(/[.,]/g, "")).replace("<radix>", "."), t = parseFloat(t, 10) || 0), l(t, this.format.precision)
        }, n.prototype.bindTransitionEnd = function() {
            var t, e, n, i, o, r, s = this;
            if (!this.transitionEndBound) {
                for (this.transitionEndBound = !0, e = !1, r = [], n = 0, i = (o = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd".split(" ")).length; i > n; n++) t = o[n], r.push(this.el.addEventListener(t, (function() {
                    return e || (e = !0, setTimeout((function() {
                        return s.render(), e = !1, p(s.el, "odometerdone")
                    }), 0)), !0
                }), !1));
                return r
            }
        }, n.prototype.resetFormat = function() {
            var e, n, i, o, r, s, a, u;
            if ((e = null != (a = this.options.format) ? a : "(,ddd).dd") || (e = "d"), !(i = t.exec(e))) throw new Error("Odometer: Unparsable digit format");
            return s = (u = i.slice(1, 4))[0], r = u[1], o = (null != (n = u[2]) ? n.length : void 0) || 0, this.format = {
                repeating: s,
                radix: r,
                precision: o
            }
        }, n.prototype.render = function(t) {
            var e, n, o, r, s, a, u;
            for (null == t && (t = this.value), this.stopWatchingMutations(), this.resetFormat(), this.inside.innerHTML = "", s = this.options.theme, r = [], a = 0, u = (e = this.el.className.split(" ")).length; u > a; a++)(n = e[a]).length && ((o = /^odometer-theme-(.+)$/.exec(n)) ? s = o[1] : /^odometer(-|$)/.test(n) || r.push(n));
            return r.push("odometer"), i || r.push("odometer-no-transitions"), s ? r.push("odometer-theme-" + s) : r.push("odometer-auto-theme"), this.el.className = r.join(" "), this.ribbons = {}, this.formatDigits(t), this.startWatchingMutations()
        }, n.prototype.formatDigits = function(t) {
            var e, n, i, o, r, a, u, d, l;
            if (this.digits = [], this.options.formatFunction)
                for (o = 0, a = (d = this.options.formatFunction(t).split("").reverse()).length; a > o; o++)(n = d[o]).match(/0-9/) ? ((e = this.renderDigit()).querySelector(".odometer-value").innerHTML = n, this.digits.push(e), this.insertDigit(e)) : this.addSpacer(n);
            else
                for (i = !this.format.precision || !s(t) || !1, r = 0, u = (l = t.toString().split("").reverse()).length; u > r; r++) "." === (e = l[r]) && (i = !0), this.addDigit(e, i)
        }, n.prototype.update = function(t) {
            var e, n = this;
            return (e = (t = this.cleanValue(t)) - this.value) ? (u(this.el, "odometer-animating-up odometer-animating-down odometer-animating"), o(this.el, e > 0 ? "odometer-animating-up" : "odometer-animating-down"), this.stopWatchingMutations(), this.animate(t), this.startWatchingMutations(), setTimeout((function() {
                return n.el.offsetHeight, o(n.el, "odometer-animating")
            }), 0), this.value = t) : void 0
        }, n.prototype.renderDigit = function() {
            return r('<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value"></span></span></span></span></span>')
        }, n.prototype.insertDigit = function(t, e) {
            return null != e ? this.inside.insertBefore(t, e) : this.inside.children.length ? this.inside.insertBefore(t, this.inside.children[0]) : this.inside.appendChild(t)
        }, n.prototype.addSpacer = function(t, e, n) {
            var i;
            return (i = r('<span class="odometer-formatting-mark"></span>')).innerHTML = t, n && o(i, n), this.insertDigit(i, e)
        }, n.prototype.addDigit = function(t, e) {
            var n, i, o, r;
            if (null == e && (e = !0), "-" === t) return this.addSpacer(t, null, "odometer-negation-mark");
            if ("." === t) return this.addSpacer(null != (r = this.format.radix) ? r : ".", null, "odometer-radix-mark");
            if (e)
                for (o = !1;;) {
                    if (!this.format.repeating.length) {
                        if (o) throw new Error("Bad odometer format without digits");
                        this.resetFormat(), o = !0
                    }
                    if (n = this.format.repeating[this.format.repeating.length - 1], this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1), "d" === n) break;
                    this.addSpacer(n)
                }
            return (i = this.renderDigit()).querySelector(".odometer-value").innerHTML = t, this.digits.push(i), this.insertDigit(i)
        }, n.prototype.animate = function(t) {
            return i && "count" !== this.options.animation ? this.animateSlide(t) : this.animateCount(t)
        }, n.prototype.animateCount = function(t) {
            var e, n, i, o, r, s = this;
            if (n = +t - this.value) return o = i = a(), e = this.value, (r = function() {
                var u, l;
                return a() - o > s.options.duration ? (s.value = t, s.render(), void p(s.el, "odometerdone")) : ((u = a() - i) > 50 && (i = a(), l = u / s.options.duration, e += n * l, s.render(Math.round(e))), null != d ? d(r) : setTimeout(r, 50))
            })()
        }, n.prototype.getDigitCount = function() {
            var t, e, n, i, o, r;
            for (t = o = 0, r = (i = 1 <= arguments.length ? M.call(arguments, 0) : []).length; r > o; t = ++o) n = i[t], i[t] = Math.abs(n);
            return e = Math.max.apply(Math, i), Math.ceil(Math.log(e + 1) / Math.log(10))
        }, n.prototype.getFractionalDigitCount = function() {
            var t, e, n, i, o, r, s;
            for (e = /^\-?\d*\.(\d*?)0*$/, t = r = 0, s = (o = 1 <= arguments.length ? M.call(arguments, 0) : []).length; s > r; t = ++r) i = o[t], o[t] = i.toString(), n = e.exec(o[t]), o[t] = null == n ? 0 : n[1].length;
            return Math.max.apply(Math, o)
        }, n.prototype.resetDigits = function() {
            return this.digits = [], this.ribbons = [], this.inside.innerHTML = "", this.resetFormat()
        }, n.prototype.animateSlide = function(t) {
            var e, n, i, r, s, a, u, d, l, h, p, m, f, g, v, w, M, y, b, T, E, x, S, D, L, F, A;
            if (w = this.value, (d = this.getFractionalDigitCount(w, t)) && (t *= Math.pow(10, d), w *= Math.pow(10, d)), i = t - w) {
                for (this.bindTransitionEnd(), r = this.getDigitCount(w, t), s = [], e = 0, p = b = 0; r >= 0 ? r > b : b > r; p = r >= 0 ? ++b : --b) {
                    if (M = c(w / Math.pow(10, r - p - 1)), a = (u = c(t / Math.pow(10, r - p - 1))) - M, Math.abs(a) > this.MAX_VALUES) {
                        for (h = [], m = a / (this.MAX_VALUES + this.MAX_VALUES * e * .5), n = M; a > 0 && u > n || 0 > a && n > u;) h.push(Math.round(n)), n += m;
                        h[h.length - 1] !== u && h.push(u), e++
                    } else h = function() {
                        A = [];
                        for (var t = M; u >= M ? u >= t : t >= u; u >= M ? t++ : t--) A.push(t);
                        return A
                    }.apply(this);
                    for (p = T = 0, x = h.length; x > T; p = ++T) l = h[p], h[p] = Math.abs(l % 10);
                    s.push(h)
                }
                for (this.resetDigits(), p = E = 0, S = (F = s.reverse()).length; S > E; p = ++E)
                    for (h = F[p], this.digits[p] || this.addDigit(" ", p >= d), null == (y = this.ribbons)[p] && (y[p] = this.digits[p].querySelector(".odometer-ribbon-inner")), this.ribbons[p].innerHTML = "", 0 > i && (h = h.reverse()), f = L = 0, D = h.length; D > L; f = ++L) l = h[f], (v = document.createElement("div")).className = "odometer-value", v.innerHTML = l, this.ribbons[p].appendChild(v), f === h.length - 1 && o(v, "odometer-last-value"), 0 === f && o(v, "odometer-first-value");
                return 0 > M && this.addDigit("-"), null != (g = this.inside.querySelector(".odometer-radix-mark")) && g.parent.removeChild(g), d ? this.addSpacer(this.format.radix, this.digits[d - 1], "odometer-radix-mark") : void 0
            }
        }, n
    }()).options = null != (v = window.odometerOptions) ? v : {}, setTimeout((function() {
        var t, e, i, o, r;
        if (window.odometerOptions) {
            for (t in r = [], o = window.odometerOptions) e = o[t], r.push(null != (i = n.options)[t] ? (i = n.options)[t] : i[t] = e);
            return r
        }
    }), 0), n.init = function() {
        var t, e, i, o, r, s;
        if (null != document.querySelectorAll) {
            for (s = [], i = 0, o = (e = document.querySelectorAll(n.options.selector || ".odometer")).length; o > i; i++) t = e[i], s.push(t.odometer = new n({
                el: t,
                value: null != (r = t.innerText) ? r : t.textContent
            }));
            return s
        }
    }, null != (null != (w = document.documentElement) ? w.doScroll : void 0) && null != document.createEventObject ? (g = document.onreadystatechange, document.onreadystatechange = function() {
        return "complete" === document.readyState && !1 !== n.options.auto && n.init(), null != g ? g.apply(this, arguments) : void 0
    }) : document.addEventListener("DOMContentLoaded", (function() {
        return !1 !== n.options.auto ? n.init() : void 0
    }), !1), "function" == typeof define && define.amd ? define([], (function() {
        return n
    })) : "undefined" != typeof exports && null !== exports ? module.exports = n : window.Odometer = n
}).call(this);