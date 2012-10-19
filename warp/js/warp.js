/**
* @package   yoo_master
* @author    YOOtheme http://www.yootheme.com
* @copyright Copyright (C) YOOtheme GmbH
* @license   http://www.gnu.org/licenses/gpl.html GNU/GPL
*/

/*------------------------------------------------------------------------------------------------------------------------
    Author: Sean Goresht
    www: http://seangoresht.com/
    github: https://github.com/srsgores

    twitter: http://twitter.com/S.Goresht

     warp-kickstrap Joomla Template
     Licensed under the GNU Public License

    =============================================================================
    Filename:  warp.js
    =============================================================================
     This file is responsible for warp-specific javascript functions.  These include:
        --Browser checks: return user agent.  It is used by WARP, so it's probably not best to mess with this.  But remember for yourself that this is bad practice, and you should use Modernizr's feature detection instead.
        --MatchWidth(): used during the onMediaQuery event to match widths of certain elements.  To get a better result, try using masonry <script src="http://cdnjs.cloudflare.com/ajax/libs/masonry/2.1.04/jquery.masonry.min.js"></script>
        --MatchHeight(): same concept as matchWidth(), but for height.  Again, consider using masonry
        --smoothScroll(): smooth scrolling plugin, designed by YooTheme.  I think jQUery scrolLTo is a better choice, as it's more maintained <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/1.4.2/jquery.scrollTo.min.js"></script>
        --Joomla Placeholder text: function to aid in the replacing/filling in of text in the admin backend
--------------------------------------------------------------------------------------------------------------------- */

(function (e)
{
    var f = {}, a = e.browser || function (a)
        {
            var a = a.toLowerCase(), //check browser.  Return user agent (this is poor practice, and we should really be using Modernizr's feature detection to do this)
                d = {}, a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
            d[a[1]] = !0;
            d.version = a[2] || "0";
            return d
        }(navigator.userAgent);
    e.fn.socialButtons = function (a) //Render social buttons on articles and within Zoo
    {
        a = e.extend(
        {
            wrapper: '<div class="socialbuttons clearfix" />'
        }, a);
        if (!a.twitter && !a.plusone && !a.facebook) return this;
        a.twitter && !f.twitter && (f.twitter = e.getScript("//platform.twitter.com/widgets.js"));
        a.plusone && !f.plusone && (f.plusone = e.getScript("//apis.google.com/js/plusone.js"));
        !window.FB && (a.facebook && !f.facebook) && (e("body").append('<div id="fb-root"></div>'), function (a, b, c)
        {
            var e = a.getElementsByTagName(b)[0];
            a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = "//connect.facebook.net/en_US/all.js#xfbml=1", e.parentNode.insertBefore(a, e))
        }(document, "script", "facebook-jssdk"), f.facebook = !0);
        return this.each(function ()
        {
            var d = e(this).data("permalink"),
                c = e(a.wrapper).appendTo(this);
            a.twitter && c.append('<div><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + d + '" data-count="none">Tweet</a></div>');
            a.plusone && c.append('<div><div class="g-plusone" data-size="medium" data-annotation="none" data-href="' + d + '"></div></div>');
            a.facebook && c.append('<div><div class="fb-like" data-href="' + d + '" data-send="false" data-layout="button_count" data-width="100" data-show-faces="false"></div></div>')
        })
    };
    var c = {};
    e.matchHeight = function (a, d, g)
    {
        var f = e(window),
            h = a && c[a];
        if (!h)
        {
            var h = c[a] = {
                id: a,
                elements: d,
                deepest: g,
                match: function ()
                {
                    var a = this.revert(),
                        b = 0;
                    e(this.elements).each(function ()
                    {
                        b = Math.max(b, e(this).outerHeight())
                    }).each(function (c)
                    {
                        var d = "outerHeight";
                        "border-box" == a[c].css("box-sizing") && (d = "height");
                        var g = e(this),
                            c = a[c],
                            d = c.height() + (b - g[d]());
                        c.css("min-height", d + "px")
                    })
                },
                revert: function ()
                {
                    var a = [],
                        b = this.deepest;
                    e(this.elements).each(function ()
                    {
                        var c = b ? e(this).find(b + ":first") : e(this);
                        a.push(c.css("min-height", ""))
                    });
                    return a
                },
                remove: function ()
                {
                    f.unbind("resize orientationchange", j);
                    this.revert();
                    delete c[this.id]
                }
            }, j = function ()
            {
                h.match()
            };
            f.bind("resize orientationchange", j)
        }
        return h
    };
    e.matchWidth = function (b, d, g)
    {
        var f = e(window),
            h = b && c[b];
        if (!h)
        {
            if (a.chrome || a.msie || a.mozilla) return c[b] = {
                match: function ()
                {},
                revert: function ()
                {},
                remove: function ()
                {}
            }, c[b];
            var h = c[b] = {
                id: b,
                elements: d,
                selector: g,
                match: function ()
                {
                    this.revert();
                    e(this.elements).each(function ()
                    {
                        var a = e(this),
                            b = a.width(),
                            c = a.children(g),
                            d = 0;
                        c.each(function (a)
                        {
                            a < c.length - 1 ? d += e(this).width() : e(this).width(b - d)
                        })
                    })
                },
                revert: function ()
                {
                    e(d).children(g).css("width", "")
                },
                remove: function ()
                {
                    f.unbind("resize orientationchange", j);
                    this.revert();
                    delete c[this.id]
                }
            }, j = function ()
            {
                h.match()
            };
            f.bind("resize orientationchange", j)
        }
        return h
    };
    e.fn.matchHeight = function (a)
    {
        var c = 0,
            g = [];
        this.each(function ()
        {
            var c = a ? e(this).find(a + ":first") : e(this);
            g.push(c);
            c.css("min-height", "")
        });
        this.each(function ()
        {
            c = Math.max(c, e(this).outerHeight())
        });
        return this.each(function (a)
        {
            var b = e(this),
                a = g[a],
                b = a.height() + (c - b.outerHeight());
            a.css("min-height", b + "px")
        })
    };
    e.fn.matchWidth = function (a)
    {
        return this.each(function ()
        {
            var c = e(this),
                g = c.children(a),
                f = 0;
            g.width(function (a, b)
            {
                return a < g.length - 1 ? (f += b, b) : c.width() - f
            })
        })
    };
    e.fn.smoothScroller = function (b)
    {
        b = e.extend(
        {
            duration: 1E3,
            transition: "easeOutExpo"
        }, b);
        return this.each(function ()
        {
            e(this).bind("click", function ()
            {
                var c = this.hash,
                    g = e(this.hash).offset().top,
                    f = window.location.href.replace(window.location.hash, ""),
                    h = a.opera ? "html:not(:animated)" : "html:not(:animated),body:not(:animated)";
                if (f + c == this) return e(h).animate(
                {
                    scrollTop: g
                }, b.duration, b.transition, function ()
                {
                    window.location.hash = c.replace("#", "")
                }), !1
            })
        })
    }
})(jQuery);
(function (e) //function for smooth scrolling.  Used only on the menu.  Can be completely taken out in favour of jQuery scrollTo (also included)
{
    e.easing.jswing = e.easing.swing;
    e.extend(e.easing,
    {
        def: "easeOutQuad",
        swing: function (f, a, c, b, d)
        {
            return e.easing[e.easing.def](f, a, c, b, d)
        },
        easeInQuad: function (f, a, c, b, d)
        {
            return b * (a /= d) * a + c
        },
        easeOutQuad: function (f, a, c, b, d)
        {
            return -b * (a /= d) * (a - 2) + c
        },
        easeInOutQuad: function (f, a, c, b, d)
        {
            return 1 > (a /= d / 2) ? b / 2 * a * a + c : -b / 2 * (--a * (a - 2) - 1) + c
        },
        easeInCubic: function (f, a, c, b, d)
        {
            return b * (a /= d) * a * a + c
        },
        easeOutCubic: function (f, a, c, b, d)
        {
            return b * ((a = a / d - 1) * a * a + 1) + c
        },
        easeInOutCubic: function (f, a, c, b, d)
        {
            return 1 > (a /= d / 2) ? b / 2 * a * a * a + c : b / 2 * ((a -= 2) * a * a + 2) + c
        },
        easeInQuart: function (f, a, c, b, d)
        {
            return b * (a /= d) * a * a * a + c
        },
        easeOutQuart: function (f, a, c, b, d)
        {
            return -b * ((a = a / d - 1) * a * a * a - 1) + c
        },
        easeInOutQuart: function (f, a, c, b, d)
        {
            return 1 > (a /= d / 2) ? b / 2 * a * a * a * a + c : -b / 2 * ((a -= 2) * a * a * a - 2) + c
        },
        easeInQuint: function (f, a, c, b, d)
        {
            return b * (a /= d) * a * a * a * a + c
        },
        easeOutQuint: function (f, a, c, b, d)
        {
            return b * ((a = a / d - 1) * a * a * a * a + 1) + c
        },
        easeInOutQuint: function (f, a, c, b, d)
        {
            return 1 > (a /= d / 2) ? b / 2 * a * a * a * a * a + c : b / 2 * ((a -= 2) * a * a * a * a + 2) + c
        },
        easeInSine: function (f, a,
        c, b, d)
        {
            return -b * Math.cos(a / d * (Math.PI / 2)) + b + c
        },
        easeOutSine: function (f, a, c, b, d)
        {
            return b * Math.sin(a / d * (Math.PI / 2)) + c
        },
        easeInOutSine: function (f, a, c, b, d)
        {
            return -b / 2 * (Math.cos(Math.PI * a / d) - 1) + c
        },
        easeInExpo: function (f, a, c, b, d)
        {
            return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c
        },
        easeOutExpo: function (f, a, c, b, d)
        {
            return a == d ? c + b : b * (-Math.pow(2, - 10 * a / d) + 1) + c
        },
        easeInOutExpo: function (f, a, c, b, d)
        {
            return 0 == a ? c : a == d ? c + b : 1 > (a /= d / 2) ? b / 2 * Math.pow(2, 10 * (a - 1)) + c : b / 2 * (-Math.pow(2, - 10 * --a) + 2) + c
        },
        easeInCirc: function (f, a, c, b, d)
        {
            return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c
        },
        easeOutCirc: function (f, a, c, b, d)
        {
            return b * Math.sqrt(1 - (a = a / d - 1) * a) + c
        },
        easeInOutCirc: function (f, a, c, b, d)
        {
            return 1 > (a /= d / 2) ? -b / 2 * (Math.sqrt(1 - a * a) - 1) + c : b / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + c
        },
        easeInElastic: function (f, a, c, b, d)
        {
            var f = 1.70158,
                g = 0,
                e = b;
            if (0 == a) return c;
            if (1 == (a /= d)) return c + b;
            g || (g = 0.3 * d);
            e < Math.abs(b) ? (e = b, f = g / 4) : f = g / (2 * Math.PI) * Math.asin(b / e);
            return -(e * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - f) * 2 * Math.PI / g)) + c
        },
        easeOutElastic: function (f, a, c, b, d)
        {
            var f = 1.70158,
                g = 0,
                e = b;
            if (0 == a) return c;
            if (1 == (a /= d)) return c + b;
            g || (g = 0.3 * d);
            e < Math.abs(b) ? (e = b, f = g / 4) : f = g / (2 * Math.PI) * Math.asin(b / e);
            return e * Math.pow(2, - 10 * a) * Math.sin((a * d - f) * 2 * Math.PI / g) + b + c
        },
        easeInOutElastic: function (e, a, c, b, d)
        {
            var e = 1.70158,
                g = 0,
                i = b;
            if (0 == a) return c;
            if (2 == (a /= d / 2)) return c + b;
            g || (g = d * 0.3 * 1.5);
            i < Math.abs(b) ? (i = b, e = g / 4) : e = g / (2 * Math.PI) * Math.asin(b / i);
            return 1 > a ? -0.5 * i * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - e) * 2 * Math.PI / g) + c : 0.5 * i * Math.pow(2, - 10 * (a -= 1)) * Math.sin((a * d - e) * 2 * Math.PI / g) + b + c
        },
        easeInBack: function (e,
        a, c, b, d, g)
        {
            void 0 == g && (g = 1.70158);
            return b * (a /= d) * a * ((g + 1) * a - g) + c
        },
        easeOutBack: function (e, a, c, b, d, g)
        {
            void 0 == g && (g = 1.70158);
            return b * ((a = a / d - 1) * a * ((g + 1) * a + g) + 1) + c
        },
        easeInOutBack: function (e, a, c, b, d, g)
        {
            void 0 == g && (g = 1.70158);
            return 1 > (a /= d / 2) ? b / 2 * a * a * (((g *= 1.525) + 1) * a - g) + c : b / 2 * ((a -= 2) * a * (((g *= 1.525) + 1) * a + g) + 2) + c
        },
        easeInBounce: function (f, a, c, b, d)
        {
            return b - e.easing.easeOutBounce(f, d - a, 0, b, d) + c
        },
        easeOutBounce: function (e, a, c, b, d)
        {
            return (a /= d) < 1 / 2.75 ? b * 7.5625 * a * a + c : a < 2 / 2.75 ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c : a < 2.5 / 2.75 ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c
        },
        easeInOutBounce: function (f, a, c, b, d)
        {
            return a < d / 2 ? 0.5 * e.easing.easeInBounce(f, 2 * a, 0, b, d) + c : 0.5 * e.easing.easeOutBounce(f, 2 * a - d, 0, b, d) + 0.5 * b + c
        }
    })
})(jQuery);
(function (e)
{
    function f(a)
    {
        var c = {}, b = /^jQuery\d+$/;
        e.each(a.attributes, function (a, d)
        {
            d.specified && !b.test(d.name) && (c[d.name] = d.value)
        });
        return c
    }
    function a()
    {
        var a = e(this);
        a.val() === a.attr("placeholder") && a.hasClass("placeholder") && (a.data("placeholder-password") ? a.hide().next().show().focus() : a.val("").removeClass("placeholder"))
    }
    function c()
    {
        var c, b = e(this);
        if ("" === b.val() || b.val() === b.attr("placeholder"))
        {
            if (b.is(":password"))
            {
                if (!b.data("placeholder-textinput"))
                {
                    try
                    {
                        c = b.clone().attr(
                        {
                            type: "text"
                        })
                    }
                    catch (d)
                    {
                        c = e("<input>").attr(e.extend(f(b[0]),
                        {
                            type: "text"
                        }))
                    }
                    c.removeAttr("name").data("placeholder-password", !0).bind("focus.placeholder", a);
                    b.data("placeholder-textinput", c).before(c)
                }
                b = b.hide().prev().show()
            }
            b.addClass("placeholder").val(b.attr("placeholder"))
        }
        else b.removeClass("placeholder")
    }
    var b = "placeholder" in document.createElement("input"),
        d = "placeholder" in document.createElement("textarea");
    e.fn.placeholder = b && d ? function ()
    {
        return this
    } : function ()
    {
        return this.filter((b ? "textarea" : ":input") + "[placeholder]").bind("focus.placeholder",
        a).bind("blur.placeholder", c).trigger("blur.placeholder").end()
    };
    e(function ()
    {
        e("form").bind("submit.placeholder", function ()
        {
            var b = e(".placeholder", this).each(a);
            setTimeout(function ()
            {
                b.each(c)
            }, 10)
        })
    });
    e(window).bind("unload.placeholder", function ()
    {
        e(".placeholder").val("")
    })
})(jQuery);