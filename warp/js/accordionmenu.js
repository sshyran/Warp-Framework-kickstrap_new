/* Copyright (C) YOOtheme GmbH, http://www.gnu.org/licenses/gpl.html GNU/GPL */

(function (d)
{
	var a = function ()
	{
	};
	d.extend(a.prototype, {name:"accordionMenu", options:{mode:"default", display:null, collapseall:!1, toggler:"span.level1.parent", content:"ul.level2"}, initialize:function (a, b)
	{
		var b = d.extend({}, this.options, b), c = a.find(b.toggler);
		c.each(function (h)
		{
			var a = d(this), c = a.next(b.content).wrap("<div>").parent();
			c.data("height", c.height());
			a.hasClass("active") || h == b.display ? c.show() : c.hide().css("height", 0);
			a.bind("click", function ()
			{
				f(h)
			})
		});
		var f = function (a)
		{
			var a = d(c.get(a)), e =
				d([]);
			a.hasClass("active") && (e = a, a = d([]));
			b.collapseall && (e = c.filter(".active"));
			switch (b.mode)
			{
				case "slide":
					a.next().stop().show().animate({height:a.next().data("height")});
					e.next().stop().animate({height:0}, function ()
					{
						e.next().hide()
					});
					break;
				default:
					a.next().show().css("height", a.next().data("height")), e.next().hide().css("height", 0)
			}
			a.addClass("active").parent().addClass("active");
			e.removeClass("active").parent().removeClass("active")
		}
	}});
	d.fn[a.prototype.name] = function ()
	{
		var g = arguments, b = g[0] ?
			g[0] : null;
		return this.each(function ()
		{
			var c = d(this);
			if (a.prototype[b] && c.data(a.prototype.name) && "initialize" != b)
			{
				c.data(a.prototype.name)[b].apply(c.data(a.prototype.name), Array.prototype.slice.call(g, 1));
			}
			else if (!b || d.isPlainObject(b))
			{
				var f = new a;
				a.prototype.initialize && f.initialize.apply(f, d.merge([c], g));
				c.data(a.prototype.name, f)
			}
			else
			{
				d.error("Method " + b + " does not exist on jQuery." + a.name)
			}
		})
	}
})(jQuery);
