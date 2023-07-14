! function(n) {
    function o(n) {
        return n < 10 ? "0" + n : n
    }
    n.fn.showclock = function() {
        var s = new Date,
            t = n(this).data("date").split("-"),
            a = [0, 0];
        if (null != n(this).data("time") && (a = n(this).data("time").split(":")), (e = new Date(t[0], t[1] - 1, t[2], a[0], a[1]).getTime() / 1e3 - s.getTime() / 1e3) <= 0 || isNaN(e)) return this.hide(), this;
        var c = Math.floor(e / 86400);
        e %= 86400, t = Math.floor(e / 3600), e %= 3600;
        a = Math.floor(e / 60);
        var e = Math.floor(e % 60);
        s = "";
        0 != c && (s += "<div class='countdown-container days'>", s += "<span class='countdown-value days-bottom'>" + o(c) + "</span>", s += "<span class='countdown-heading days-top'>Days</span>", s += "</div>"), s += "<div class='countdown-container hours'>", s += "<span class='countdown-value hours-bottom'>" + o(t) + "</span>", s += "<span class='countdown-heading hours-top'>Hours</span>", s += "</div>", s += "<div class='countdown-container minutes'>", s += "<span class='countdown-value minutes-bottom'>" + o(a) + "</span>", s += "<span class='countdown-heading minutes-top'>Mins</span>", s += "</div>", s += "<div class='countdown-container seconds'>", s += "<span class='countdown-value seconds-bottom'>" + o(e) + "</span>", s += "<span class='countdown-heading seconds-top'>Secs</span>", this.html(s += "</div>")
    }, n.fn.countdown = function() {
        var o = n(this);
        o.showclock(), setInterval((function() {
            o.showclock()
        }), 1e3)
    }
}(jQuery), jQuery(document).ready((function() {
    0 < jQuery(".countdown").length && jQuery(".countdown").each((function() {
        jQuery(this).countdown()
    }))
}));