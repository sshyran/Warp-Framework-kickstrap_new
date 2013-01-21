/*------------------------------------------------------------------------------------------------------------------------
 Author: Sean Goresht
 www: http://seangoresht.com/
 github: https://github.com/srsgores

 twitter: http://twitter.com/S.Goresht

 warp-kickstrap Joomla Template
 Licensed under the GNU Public License

 =============================================================================
 Filename:  mobile.js
 =============================================================================
 This file is responsible for creating the mobile-specific version of the site.

 --------------------------------------------------------------------------------------------------------------------- */

jQuery(function (a)
{
	var g = {nav: {nav: null, storage: null, init: function (c)
	{
		var b = this;
		this.nav = a("nav:first").hide();
		this.storage = a("#m-navigation-storage");
		a(c).bind("click", function ()
		{
			b.nav.is(":visible") ? b.hide() : b.show()
		});
		this.nav.find(".m-close").bind("click", function ()
		{
			b.hide()
		})
	}, show: function ()
	{
		scrollTo(0, 0);
		this.buildMenu(this.storage.find("ul.menu-mobile:first"));
		this.nav.show().addClass("fade in")
	}, hide: function ()
	{
		this.nav.hide()
	}, buildMenu: function (c)
	{
		var b = this, d = a("<ul />");
		c.parent().is("li") &&
		a("<li />").addClass("goback").html('<span class="button back">Back</span>').bind("click",function ()
		{
			b.buildMenu(c.parent().parent())
		}).appendTo(d);
		c.children().each(function ()
		{
			var c = a(this), f = c.find("ul:first"), e = a("<li />");
			c.find("> a, > span").clone().appendTo(e).bind("click", function (b)
			{
				a(this).is("a") && b.stopPropagation()
			});
			f.length && e.addClass("parent").bind("click", function ()
			{
				b.buildMenu(f)
			});
			d.append(e)
		});
		a("#m-navigation").children().remove();
		a("#m-navigation").append(d);
		d.css("opacity",
			1).show()
	}}, login: {login: null, init: function (c)
	{
		var b = this;
		this.login = a("#m-login").hide();
		a(c).bind("click", function ()
		{
			b.login.is(":visible") ? b.hide() : b.show()
		});
		this.login.find(".m-close").bind("click", function ()
		{
			b.hide()
		})
	}, show: function ()
	{
		scrollTo(0, 0);
		this.login.show().addClass("fade in")
	}, hide: function ()
	{
		this.login.hide()
	}}, search: {search: null, init: function (c)
	{
		var b = this;
		this.search = a("#m-search").hide();
		a(c).bind("click", function ()
		{
			b.search.is(":visible") ? b.hide() : b.show()
		});
		this.search.find(".m-close").bind("click",
			function ()
			{
				b.hide()
			})
	}, show: function ()
	{
		scrollTo(0, 0);
		this.search.show().addClass("fade in")
	}, hide: function ()
	{
		this.search.hide()
	}}};
	a("body").hasClass("mobile") ? a("#m-toolbar [data-button]").each(function ()
	{
		g[a(this).data("button")].init(this)
	}) : a('<a href="?mobile=1">Switch to Mobile Version</a>').addClass("mobile-switcher").appendTo(a("body"))
});