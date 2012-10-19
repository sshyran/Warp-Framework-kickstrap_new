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
 Filename:  config.js
 =============================================================================
 This file is responsible for rendering the administrator back-end's preset view for the template.
 This file is executed when you click on the template from Extensions -- Template Manager.

 --------------------------------------------------------------------------------------------------------------------- */

(function (a)
{
	a.fn.profiles = function (j)
	{
		function f(b)
		{
			"default" == b ? d.addClass("default") : d.removeClass("default");
			a("[data-profile]").not(a('[data-profile="' + b + '"]').show()).hide()
		}

		function g(b)
		{
			if (b && !a('option[value="' + b + '"]', e[0]).length)
			{
				var c = a(j).clone(!0).attr("data-profile", b);
				c.find('[name^="profile_data"]').attr("name", function (a, c)
				{
					return c.replace("profile_data[default]", "profile_data[" + b + "]")
				});
				c.children("li").each(function ()
				{
					a(this).addClass("ignore").children(".label").before('<input class="ignore" type="checkbox" />')
				});
				c.appendTo(a(j).parent());
				e.append('<option value="' + b + '">' + b + "</option>");
				a(e[0]).val(b).trigger("change")
			}
		}

		function l(b, c)
		{
			c && (b != c && !a('option[value="' + c + '"]', e[0]).length) && (a('[data-profile="' + b + '"]').attr("data-profile", c).find('[name^="profile_data"]').attr("name", function (a, d)
			{
				return d.replace("profile_data[" + b + "]", "profile_data[" + c + "]")
			}), a('input[name^="profile_map"][value="' + b + '"]', d).attr("value", c), e.find('option[value="' + b + '"]').attr("value", c).html(c))
		}

		function i(b)
		{
			h.find("option:selected").attr("selected", !1);
			h.find("option:disabled").attr("disabled", !1);
			a('input[type="hidden"]', d).each(function ()
			{
				var c = a(this).attr("name").replace(/^profile_map\[(.*)\]$/i, "$1"),
					d = a(this).val() == b ? "selected" : "disabled";
				h.find('[value="' + c + '"]').attr(d, !0)
			});
			h.show().find("select").focus()
		}

		function k(b)
		{
			a('input[name^="profile_map"][value="' + b + '"]', d).remove();
			h.find("option:selected").each(function ()
			{
				d.append('<input type="hidden" name="profile_map[' + a(this).val() + ']" value="' + b + '" />')
			})
		}

		var d = this.first(),
			e = a.merge(a("> select",
				d), a("select.profile")),
			h = a(".items", d);
		a('[data-profile][data-profile!="default"] > li').each(function ()
		{
			a(this).children(".label").before(a('<input class="ignore" type="checkbox" />').attr("checked", !a(this).hasClass("ignore")))
		});
		f("default");
		a("#config").delegate("input.ignore", "change", function ()
		{
			a(this).is(":checked") ? a(this).closest("li").removeClass("ignore") : a(this).closest("li").addClass("ignore")
		});
		a(e[0]).bind("change", function ()
		{
			f(a(this).val())
		});
		a("> a.add", d).bind("click", function (a)
		{
			a.preventDefault();
			g(prompt("Please enter a profile name"))
		});
		a("> a.rename", d).bind("click", function (b)
		{
			b.preventDefault();
			var b = a(e[0]).val(),
				c = prompt("Please enter a profile name", b);
			l(b, c)
		});
		a("> a.remove", d).bind("click", function (b)
		{
			b.preventDefault();
			b = a(e[0]).val();
			a('[data-profile="' + b + '"]').remove();
			a('input[name^="profile_map"][value="' + b + '"]', d).remove();
			e.find('option[value="' + b + '"]').remove();
			a(e[0]).trigger("change")
		});
		a("> a.assign", d).bind("click", function (b)
		{
			b.preventDefault();
			i(a(e[0]).val())
		});
		a("select",
			h).bind("blur", function ()
			{
				k(a(e[0]).val());
				h.hide()
			});
		return this
	};
	var k = {
		get:function (a)
		{
			return window.sessionStorage ? sessionStorage.getItem(a) : 0
		},
		set:function (a, f)
		{
			window.sessionStorage && sessionStorage.setItem(a, f)
		}
	};
	a.fn.tabs = function ()
	{
		return this.each(function ()
		{
			var j = a(this).addClass("content").wrap('<div class="tabs-box" />').before('<ul class="nav" />'),
				f = a(this).prev("ul.nav");
			j.children("li").each(function ()
			{
				f.append("<li><a>" + a(this).hide().attr("data-name") + "</a></li>")
			});
			f.children("li").bind("click",

				function (i)
				{
					i.preventDefault();
					var i = a("li", f).removeClass("active").index(a(this).addClass("active").get(0)),
						g = j.children("li").hide();
					a(g[i]).show();
					k.set("warp.settings.index", i)
				});
			var g = k.get("warp.settings.index") ? k.get("warp.settings.index") : 0,
				l = f.children();
			g >= l.length && (g = 0);
			l.eq(g).trigger("click")
		})
	}
})(jQuery);