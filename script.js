function lazyLoad() {
	$(".lazy_load").each(function () {
		var t = $(this),
			e = t.attr("data-src"),
			i = t.attr("data-background-image");
		e && (console.log(e), t.on("load", imgLoaded(t[0])).attr("src", e)), i && (console.log(i), t.on("load", imgLoaded(t[0])).css("background-image", "url(" + i + ")"))
	})
}

function imgLoaded(t) {
	(t = $(t)).parent().addClass("loaded")
}

function sidePanel() {
	function o() {
		var t = $("#side-panel"),
			e = $("#page-main"),
			i = $(".overlay");
		return $(".indicator").removeClass("active"), t.removeClass("open-side-panel").find(".side-panel-block").addClass("hide"), t.removeClass("open-side-panel"), e.removeClass("open-side-panel"), i.removeClass("open-side-panel"), !1
	}
	$('a[href^="#openside-"]').click(function () {
		return function (t) {
			var e = $("#side-panel");
			e.addClass("open-side-panel");
			var i = e.find(t),
				s = $("#page-main"),
				n = $(".overlay");
			i.hasClass("hide") ? (o(), i.removeClass("hide"), e.addClass("open-side-panel"), s.addClass("open-side-panel"), n.addClass("open-side-panel")) : o()
		}("#" + $(this).attr("href").replace("#openside-", "")), !1
	}), $('a[href="#closeside"]').click(function () {
		return o(), !1
	})
}

function drags(r, a, l) {
	r.on("mousedown touchstart", function (t) {
		r.addClass("draggable"), a.addClass("resizable");
		var e = t.pageX ? t.pageX : t.originalEvent.touches[0].pageX,
			i = r.outerWidth(),
			s = r.offset().left + i - e,
			n = l.offset().left,
			o = l.outerWidth();
		minLeft = n + 10, maxLeft = n + o - i - 10, r.parents().on("mousemove touchmove", function (t) {
			var e = t.pageX ? t.pageX : t.originalEvent.touches[0].pageX;
			leftValue = e + s - i, leftValue < minLeft ? leftValue = minLeft : leftValue > maxLeft && (leftValue = maxLeft), widthValue = 100 * (leftValue + i / 2 - n) / o + "%", $(".draggable").css("left", widthValue).on("mouseup touchend touchcancel", function () {
				$(this).removeClass("draggable"), a.removeClass("resizable")
			}), $(".resizable").css("width", widthValue)
		}).on("mouseup touchend touchcancel", function () {
			r.removeClass("draggable"), a.removeClass("resizable")
		}), t.preventDefault()
	}).on("mouseup touchend touchcancel", function (t) {
		r.removeClass("draggable"), a.removeClass("resizable")
	})
}

function openeOverlay(t) {
	closeOverlay(), $(".overlay").addClass("active"), $(t).addClass("active"), $(".overlay .overlay-cell").attr("style", ""), $(t).hasClass("vertical-align-top") && $(".overlay .overlay-cell").css("vertical-align", "top"), $("body").addClass("noscroll"), $(t).find("form").validate().checkForm() ? $(t).find('button[type="submit"]').removeClass("disabled") : $(t).find('button[type="submit"]').addClass("disabled")
}

function closeOverlay() {
	$(".overlay").removeClass("active"), $(".overlay-modal").removeClass("active"), $("body").removeClass("noscroll")
}

function mobileSidePanelHeight() {
	function t() {
		if ($(window).width() <= 768) {
			var t = window.innerHeight;
			$("#sidemenu").css("min-height", t + "px")
		} else $("#sidemenu").attr("style", "")
	}
	t(), $(window).scroll(function () {
		t()
	}), $(window).resize(function () {
		t()
	})
}

function textDot() {
	var t = $("#block-sidebar-reviews .block-item .message");
	t.dotdotdot({
		keep: ".toogle"
	});
	t.data("dotdotdot");
	t.on("click", ".toogle", function () {
		var t = $(this).parents(".message"),
			e = t.data("dotdotdot");
		return t.hasClass("ddd-truncated") ? (e.restore(), t.addClass("full")) : (t.removeClass("full"), e.truncate(), e.watch()), !1
	}), $("#main-block-7 .block-item .message").dotdotdot({
		keep: ".full"
	});
	var e = $("#doctors-block-2 .block-item .p");
	e.dotdotdot({
		watch: !0
	}), $(window).resize(function () {
		e.watch()
	})
}

function slide1Form() {
	$('a[href="#open-slide-1-form"]').click(function () {
		return $(".block-beauty-text.form").addClass("form-open"), !1
	}), $('a[href="#close-slide-1-form"]').click(function () {
		return $(".block-beauty-text.form").removeClass("form-open"), $(".block-beauty-text.form form").removeClass("success-form"), !1
	}), $('a[href="#open-footer-form"]').click(function () {
		return $("footer .form").addClass("form-open"), $(".footer-address").addClass("d-md-none"), !1
	}), $('a[href="#close-footer-form"]').click(function () {
		return $("footer .form").removeClass("form-open"), $("footer .form form").removeClass("success-form"), $(".footer-address").removeClass("d-md-none"), !1
	}), $('a[href="#overlay-ok"]').click(function () {
		return $(this).parents("form").removeClass("success-form"), closeOverlay(), !1
	}), $("input[name=telephone]").mask("+7 (999) 999-99-99"), $("input[name=date]").mask("99.99.9999"), $.validator.methods.email = function (t, e) {
		return this.optional(e) || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(t)
	}, $("form").each(function () {
		var i = $(this),
			t = i.validate({
				rules: {
					mail: {
						email: !0
					},
					hiddenRecaptcha: {
						required: function () {
							return "" == grecaptcha.getResponse()
						}
					}
				},
				messages: {},
				submitHandler: function (t) {
					var e;
					return i.attr("id"), (e = new FormData(i[0])).append("action", "feedback"), $.ajax({
						type: "post",
						dataType: "json",
						url: "/wp-admin/admin-ajax.php",
						data: e,
						processData: !1,
						contentType: !1,
						success: function (t) {
							"success" == t.status && i.addClass("success-form")
						}
					}), !1
				},
				errorPlacement: function (t, e) {},
				highlight: function (t, e, i) {
					$(t).removeClass(e);
					setTimeout(function () {
						$(t).addClass(e).removeClass(i)
					}, 1)
				},
				unhighlight: function (t, e, i) {
					$(t).removeClass(e).addClass(i)
				}
			});

		function e(t) {
			t.checkForm() ? i.find('button[type="submit"]').removeClass("disabled") : i.find('button[type="submit"]').addClass("disabled")
		}
		e(t), i.find("input, textarea").change(function () {
			e(t)
		}), i.find("input, textarea").keyup(function () {
			e(t)
		})
	})
}

function headerFix() {
	function e(t) {
		var e = $("header");
		if (!$("#side-panel").hasClass('always-fix')) {
			40 < jQuery(window).scrollTop() ? (e.addClass("fix"), $("#side-panel").addClass("fix-close-position")) : (e.removeClass("fix"), $("#side-panel").removeClass("fix-close-position"))
		}
	}
	e(name), $(window).on("scroll", function (t) {
		e(name)
	})
}

function slider() {
	function t() {
		$(".slider-nav-line").each(function () {
			var t = $(this);
			$(this).find(".line").css({
				left: t.find("li.active").position().left
			}).width(t.find("li.active").width())
		}), $(".slider-nav-points").each(function () {
			var t = $(this);
			$(this).find(".circle").css({
				left: t.find("li.active").position().left
			})
		}), $(".block-slider").each(function () {
			n($(this))
		})
	}

	function s(t, e, i) {
		if (0 < t.find(".slider-nav").find("li.oldactive").length)
			return !1;
		t.find(".slider-nav").each(function () {
			$(this).find("li").eq(e).addClass("oldactive")
		}), t.find(".slide-bg").eq(e).addClass("oldactive"), t.find(".slide-content").eq(e).addClass("oldactive"), setTimeout(function () {
			t.find(".slider-nav li").removeClass("oldactive"), t.find(".slide-bg").removeClass("oldactive"), t.find(".slide-content").removeClass("oldactive")
		}, 800), t.find(".slider-nav").each(function () {
			$(this).find("li").eq(i).addClass("active").siblings("li").removeClass("active")
		}), t.find(".slider-control").each(function () {
			$(this).find(".control-slide").eq(i).addClass("active").siblings(".control-slide").removeClass("active")
		}), t.find(".slide-bg").eq(i).removeClass("oldactive").addClass("active").siblings(".slide-bg").removeClass("active"), t.find(".slide-content").eq(i).removeClass("oldactive").addClass("active").siblings(".slide-content").removeClass("active"), 1 <= t.find(".slider-nav-line").length && t.find(".slider-nav-line .line").css({
			left: t.find(".slider-nav-line li").eq(i).position().left
		}).width(t.find(".slider-nav-line li").eq(i).width()), 1 <= t.find(".slider-nav-points").length && t.find(".slider-nav-points .circle").css({
			left: t.find(".slider-nav-points li").eq(i).position().left
		}), n(t)
	}

	function n(t) {
		if (t.is("#clinic-block-5"))
			if ($(window).width() <= 767) {
				var e = (o = t.find(".slide-content.active").height()) + 395,
					i = e - 52 + 7;
				$("#clinic-block-5 .big-b-1").height(e - 30 + "px"), $("#clinic-block-5 .big-b-2").css("height", i / 2 + "px")
			} else $("#clinic-block-5 .big-b-1").attr("style", ""), $("#clinic-block-5 .big-b-2").attr("style", "");
		if (t.is("#main-block-5"))
			if ($(window).width() <= 767) {
				var s = (o = t.find(".slide-content.active .block-slider-text .p").height()) + 32,
					n = s + 309;
				$("#main-block-5 .slide-content .block-slider-text").height(s + "px"), $("#main-block-5").height(n + "px")
			} else $("#main-block-5 .slide-content .block-slider-text").attr("style", ""), $("#main-block-5").attr("style", "");
		if (t.is("#main-block-7"))
			if ($(window).width() <= 767) {
				var o = t.find(".slide-content.active").height();
				console.log(o);
				n = o + 711 - 567 - 55;
				$("#main-block-7").height(n + "px")
			} else $("#main-block-7").attr("style", "")
	}
	if ($(".block-slider").each(function () {
			var i = $(this);
			i.find(".slider-control").on("click", ".control-slide", function () {
				var t = $(this).parents(".slider-control").find(".control-slide").index($(this).parent(".slider-control").find(".control-slide.active")),
					e = $(this).parents(".slider-control").find(".control-slide").index($(this));
				console.log('t=' + t + ', e=' + e);
				return r = !0, s(i, t, e), !1
			}), i.find(".slider-nav").on("click", "a", function () {
				var t = $(this).parents(".slider-nav").find("li").index($(this).parents(".slider-nav").find("li.active")),
					e = $(this).parents(".slider-nav").find("li").index($(this).parent("li"));
				console.log('t=' + t + ', e=' + e);
				return r = !0, s(i, t, e), !1
			}), i.on("click", 'a[href="#slide-next"]', function () {
				var t, e = i.find(".slider-nav:eq(0)").find("li").index(i.find(".slider-nav:eq(0)").find("li.active"));
				return t = e + 1 == i.find(".slider-nav:eq(0)").find("li").length ? 0 : e + 1, s(i, e, t), !1
			}), i.on("click", 'a[href="#slide-prev"]', function () {
				var t, e = i.find(".slider-nav:eq(0)").find("li").index(i.find(".slider-nav:eq(0)").find("li.active"));
				return t = e - 1 == -1 ? i.find(".slider-nav:eq(0)").find("li").length - 1 : e - 1, s(i, e, t), !1
			}), i.on("click", ".block-bg", function () {
				if (1 == i.data("action-xs-bg-next")) {
					var t, e = i.find(".slider-nav:eq(0)").find("li").index(i.find(".slider-nav:eq(0)").find("li.active"));
					return t = e + 1 == i.find(".slider-nav:eq(0)").find("li").length ? 0 : e + 1, r = !0, s(i, e, t), !1
				}
			})
		}), setTimeout(function () {
			t()
		}, 200), $(window).resize(function () {
			t()
		}), 0 < $("#main-block-3-new").length) {
		var i = $("#main-block-3-new .slider-nav .circle").height();
		$(window).resize(function () {
			i = $("#main-block-3-new .slider-nav .circle").height(), $("#main-block-3-new .slider-nav .circle").circleProgress({
				size: i,
				fill: {
					color: "rgba(222,222,221,.5)"
				}
			})
		}), $("#main-block-3-new .slider-nav .circle").circleProgress({
			value: 0,
			size: i,
			fill: {
				color: "rgba(222,222,221,.5)"
			}
		});
		var o = $("#main-block-3-new"),
			r = !1,
			a = 1,
			l = 0;
		setInterval(function () {
			if (r)
				a && ($("#main-block-3-new .slider-nav .circle").circleProgress({
					animationStartValue: l / 5e3,
					size: i,
					value: 1
				}), a = 0);
			else {
				if ($("#main-block-3-new .slider-nav .circle").circleProgress({
						animationStartValue: l / 8e3,
						size: i,
						value: (l + 1e3) / 8e3
					}), 8e3 <= l) {
					l = 0;
					var t, e = o.find(".slider-nav:eq(0)").find("li").index(o.find(".slider-nav:eq(0)").find("li.active"));
					return t = e + 1 == o.find(".slider-nav:eq(0)").find("li").length ? 0 : e + 1, s(o, e, t), !1
				}
				l += 1e3
			}
		}, 1e3)
	}
}

function unfoldingList() {
	$(".main-block-list").on("click", ".h3", function () {
		var t = $(this).parents(".block-item");
		if (t.find(".unfolding-list").is(".open"))
			t.find(".unfolding-list").removeClass("open").siblings(".h3").removeClass("open"), t.find(".unfolding-list").removeAttr("style");
		else {
			t.find(".unfolding-list").addClass("open").siblings(".h3").addClass("open").parents(".block-item").siblings(".block-item").find(".unfolding-list").removeClass("open").siblings(".h3").removeClass("open");
			var e = t.find(".unfolding-list")[0].scrollHeight;
			t.find(".unfolding-list").removeAttr("style").css("height", e).parents(".block-item").siblings(".block-item").find(".unfolding-list").removeAttr("style")
		}
	}), $(".block-list").on("click", ".h3", function () {
		var t = $(this).parents(".block-item");
		if (t.find(".unfolding-list").is(".open"))
			t.find(".unfolding-list").removeClass("open").siblings(".h3").removeClass("open"), t.find(".unfolding-list").removeAttr("style");
		else {
			t.find(".unfolding-list").addClass("open").siblings(".h3").addClass("open").parents(".block-item").siblings(".block-item").find(".unfolding-list").removeClass("open").siblings(".h3").removeClass("open");
			var e = t.find(".unfolding-list")[0].scrollHeight;
			t.find(".unfolding-list").removeAttr("style").css("height", e).parents(".block-item").siblings(".block-item").find(".unfolding-list").removeAttr("style")
		}
	})
}

function filterMenu() {
	$("a[href ^= '#filter-block-']").click(function () {
		var t = $($(this).attr("href"));
		return t.is(".open") ? t.removeClass("open") : t.addClass("open"), !1
	}), $(document).mouseup(function (t) {
		var e = $(".filter-block");
		e.is(t.target) || 0 !== e.has(t.target).length || $(".filter-block").removeClass("open")
	})
}

function getMore() {
	$("a[href ^= '#more']").click(function () {
		var t, e = $(this).data("posttype"),
			i = $(this).data("filter"),
			s = $(this).data("filterid"),
			n = $(this).data("perpage"),
			o = $(this).data("page"),
			r = $(this).data("pages");
		return (t = new FormData).append("action", "get_special_posts_ajax"), t.append("posttype", e), t.append("filter", i), t.append("filterid", s), t.append("perpage", n), t.append("page", o), $.ajax({
			type: "post",
			dataType: "json",
			url: "/wp-admin/admin-ajax.php",
			data: t,
			processData: !1,
			contentType: !1,
			success: function (t) {
				"success" == t.status && ($("#paginator").before(t.html), ++o <= r ? $("a[href ^= '#more']").data("page", o) : $("a[href ^= '#more']").addClass("d-none"))
			}
		}), !1
	})
}

function fixedBlock() {
	function t() {
		$(".fixed-block").each(function () {
			var t = $(this);
			t.removeClass("fixed-active").attr("style", ""), t.css("width", t.width()), s_top = $(window).scrollTop(), m_top = t.data("fixed"), yes = t.offset().top, footer = $("footer").prev().offset().top + $("footer").prev().height(), m_bottom = s_top + m_top + t.height(), m_height = t.height(), footer <= m_bottom ? t.removeClass("fixed-active").css("margin-top", $("footer").prev().height() - m_height + "px") : s_top + m_top > yes && t.addClass("fixed-active").css("top", m_top + "px")
		})
	}
	t(), $(window).scroll(function () {
		t()
	}), $(window).resize(function () {
		t()
	})
}

function beforeAfter() {
	0 < $(".before-after").length && $(".before-after").twentytwenty()
}

function fancy_youtube() {
	$(".youtube").fancybox({
		youtube: {
			controls: 0,
			showinfo: 0
		}
	})
}

function scroll_show_image() {
	function t() {
		var n = $(window).height(),
			o = $(window).scrollTop();
		$(".preload-b").each(function () {
			if (0 < $(this).data("background-image").length) {
				var t = $(this),
					e = t.outerHeight(),
					i = t.offset().top;
				if (i < 0 && (i = 0), o <= i && i <= o + n || o <= i + e && i + e <= o + n) {
					var s = t.data("background-image");
					jQuery(new Image).attr("src", s).load(function () {
						t.css("background-image", "url(" + s + ")"), setTimeout(function () {
							t.addClass("preloaded-b")
						}, 50)
					})
				}
			}
		})
	}
	t(), $(window).scroll(function () {
		t()
	})
}! function (g, m, v, _) {
	"use strict";

	function e(t) {
		var e = t.currentTarget,
			i = t.data ? t.data.options : {},
			s = t.data ? t.data.items : [],
			n = "",
			o = 0;
		t.preventDefault(), t.stopPropagation(), v(e).attr("data-fancybox") && (n = v(e).data("fancybox")), n ? o = (s = s.length ? s.filter('[data-fancybox="' + n + '"]') : v("[data-fancybox=" + n + "]")).index(e) : s = [e], v.fancybox.open(s, i, o)
	}
	if (!v)
		return;
	var t, n = {
			speed: 330,
			loop: !0,
			opacity: "auto",
			margin: [44, 0],
			gutter: 30,
			infobar: !0,
			buttons: !0,
			slideShow: !0,
			fullScreen: !0,
			thumbs: !0,
			closeBtn: !0,
			smallBtn: "auto",
			image: {
				preload: "auto",
				protect: !1
			},
			ajax: {
				settings: {
					data: {
						fancybox: !0
					}
				}
			},
			iframe: {
				tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
				preload: !0,
				scrolling: "no",
				css: {}
			},
			baseClass: "",
			slideClass: "",
			baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-controls"><div class="fancybox-infobar"><button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Previous"></button><div class="fancybox-infobar__body"><span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span></div><button data-fancybox-next class="fancybox-button fancybox-button--right" title="Next"></button></div><div class="fancybox-buttons"><button data-fancybox-close class="fancybox-button fancybox-button--close" title="Close (Esc)"></button></div></div><div class="fancybox-slider-wrap"><div class="fancybox-slider"></div></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div>',
			spinnerTpl: '<div class="fancybox-loading"></div>',
			errorTpl: '<div class="fancybox-error"><p>The requested content cannot be loaded. <br /> Please try again later.<p></div>',
			closeTpl: '<button data-fancybox-close class="fancybox-close-small"></button>',
			parentEl: "body",
			touch: !0,
			keyboard: !0,
			focus: !0,
			closeClickOutside: !0,
			beforeLoad: v.noop,
			afterLoad: v.noop,
			beforeMove: v.noop,
			afterMove: v.noop,
			onComplete: v.noop,
			onInit: v.noop,
			beforeClose: v.noop,
			afterClose: v.noop,
			onActivate: v.noop,
			onDeactivate: v.noop
		},
		h = v(g),
		o = v(m),
		r = 0,
		s = function (t) {
			return t && t.hasOwnProperty && t instanceof v
		},
		b = g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || function (t) {
			g.setTimeout(t, 1e3 / 60)
		},
		a = function (t, e, i) {
			var s = this;
			s.opts = v.extend(!0, {
				index: i
			}, n, e || {}), s.id = s.opts.id || ++r, s.group = [], s.currIndex = parseInt(s.opts.index, 10) || 0, s.prevIndex = null, s.prevPos = null, s.currPos = 0, s.firstRun = null, s.createGroup(t), s.group.length && (s.$lastFocus = v(m.activeElement).blur(), s.slides = {}, s.init(t))
		};
	v.extend(a.prototype, {
		init: function () {
			var t, e, i = this,
				s = !1;
			i.scrollTop = o.scrollTop(), i.scrollLeft = o.scrollLeft(), v.fancybox.getInstance() || (t = v("body").width(), v("html").addClass("fancybox-enabled"), v.fancybox.isTouch ? (v.each(i.group, function (t, e) {
				if ("image" !== e.type && "iframe" !== e.type)
					return !(s = !0)
			}), s && v("body").css({
				position: "fixed",
				width: t,
				top: -1 * i.scrollTop
			})) : 1 < (t = v("body").width() - t) && v('<style id="fancybox-noscroll" type="text/css">').html(".compensate-for-scrollbar, .fancybox-enabled body { margin-right: " + t + "px; }").appendTo("head")), e = v(i.opts.baseTpl).attr("id", "fancybox-container-" + i.id).data("FancyBox", i).addClass(i.opts.baseClass).hide().prependTo(i.opts.parentEl), i.$refs = {
				container: e,
				bg: e.find(".fancybox-bg"),
				controls: e.find(".fancybox-controls"),
				buttons: e.find(".fancybox-buttons"),
				slider_wrap: e.find(".fancybox-slider-wrap"),
				slider: e.find(".fancybox-slider"),
				caption: e.find(".fancybox-caption")
			}, i.trigger("onInit"), i.activate(), i.current || i.jumpTo(i.currIndex)
		},
		createGroup: function (t) {
			var c = this,
				e = v.makeArray(t);
			v.each(e, function (t, e) {
				var i, s, n, o, r = {},
					a = {},
					l = [];
				v.isPlainObject(e) ? a = (r = e).opts || {} : "object" === v.type(e) && v(e).length ? (a = "options" in (l = (i = v(e)).data()) ? l.options : {}, a = "object" === v.type(a) ? a : {}, r.type = "type" in l ? l.type : a.type, r.src = "src" in l ? l.src : a.src || i.attr("href"), a.width = "width" in l ? l.width : a.width, a.height = "height" in l ? l.height : a.height, a.thumb = "thumb" in l ? l.thumb : a.thumb, a.selector = "selector" in l ? l.selector : a.selector, "srcset" in l && (a.image = {
					srcset: l.srcset
				}), a.$orig = i) : r = {
					type: "html",
					content: e + ""
				}, r.opts = v.extend(!0, {}, c.opts, a), s = r.type, n = r.src || "", s || (r.content ? s = "html" : n.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : n.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : "#" === n.charAt(0) && (s = "inline"), r.type = s), r.index = c.group.length, r.opts.$orig && !r.opts.$orig.length && delete r.opts.$orig, !r.opts.$thumb && r.opts.$orig && (r.opts.$thumb = r.opts.$orig.find("img:first")), r.opts.$thumb && !r.opts.$thumb.length && delete r.opts.$thumb, "function" === v.type(r.opts.caption) ? r.opts.caption = r.opts.caption.apply(e, [c, r]) : "caption" in l ? r.opts.caption = l.caption : a.$orig && (r.opts.caption = i.attr("title")), r.opts.caption = r.opts.caption === _ ? "" : r.opts.caption + "", "ajax" === s && (1 < (o = n.split(/\s+/, 2)).length && (r.src = o.shift(), r.opts.selector = o.shift())), "auto" == r.opts.smallBtn && (-1 < v.inArray(s, ["html", "inline", "ajax"]) ? (r.opts.buttons = !1, r.opts.smallBtn = !0) : r.opts.smallBtn = !1), "pdf" === s && (r.type = "iframe", r.opts.closeBtn = !0, r.opts.smallBtn = !1, r.opts.iframe.preload = !1), r.opts.modal && v.extend(!0, r.opts, {
					infobar: 0,
					buttons: 0,
					keyboard: 0,
					slideShow: 0,
					fullScreen: 0,
					closeClickOutside: 0
				}), c.group.push(r)
			})
		},
		addEvents: function () {
			var s = this;
			s.removeEvents(), s.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
				t.stopPropagation(), t.preventDefault(), s.close(t)
			}).on("click.fb-previous", "[data-fancybox-previous]", function (t) {
				t.stopPropagation(), t.preventDefault(), s.previous()
			}).on("click.fb-next", "[data-fancybox-next]", function (t) {
				t.stopPropagation(), t.preventDefault(), s.next()
			}), v(g).on("orientationchange.fb resize.fb", function (t) {
				b(function () {
					t && t.originalEvent && "resize" === t.originalEvent.type ? s.update() : (s.$refs.slider_wrap.hide(), b(function () {
						s.$refs.slider_wrap.show(), s.update()
					}))
				})
			}), o.on("focusin.fb", function (t) {
				var e = v.fancybox ? v.fancybox.getInstance() : null;
				!e || v(t.target).hasClass("fancybox-container") || v.contains(e.$refs.container[0], t.target) || (t.stopPropagation(), e.focus(), h.scrollTop(s.scrollTop).scrollLeft(s.scrollLeft))
			}), o.on("keydown.fb", function (t) {
				var e = s.current,
					i = t.keyCode || t.which;
				if (e && e.opts.keyboard && !v(t.target).is("input") && !v(t.target).is("textarea")) {
					if (8 === i || 27 === i)
						return t.preventDefault(), void s.close(t);
					switch (i) {
						case 37:
						case 38:
							t.preventDefault(), s.previous();
							break;
						case 39:
						case 40:
							t.preventDefault(), s.next();
							break;
						case 80:
						case 32:
							t.preventDefault(), s.SlideShow && (t.preventDefault(), s.SlideShow.toggle());
							break;
						case 70:
							s.FullScreen && (t.preventDefault(), s.FullScreen.toggle());
							break;
						case 71:
							s.Thumbs && (t.preventDefault(), s.Thumbs.toggle())
					}
				}
			})
		},
		removeEvents: function () {
			h.off("scroll.fb resize.fb orientationchange.fb"), o.off("keydown.fb focusin.fb click.fb-close"), this.$refs.container.off("click.fb-close click.fb-previous click.fb-next")
		},
		previous: function (t) {
			this.jumpTo(this.currIndex - 1, t)
		},
		next: function (t) {
			this.jumpTo(this.currIndex + 1, t)
		},
		jumpTo: function (t, e) {
			var i, s, n, o, r = this;
			if (i = r.firstRun = null === r.firstRun, s = n = t = parseInt(t, 10), o = !!r.current && r.current.opts.loop, !r.isAnimating && (s != r.currIndex || i)) {
				if (1 < r.group.length && o)
					s = (s %= r.group.length) < 0 ? r.group.length + s : s, 2 == r.group.length ? n = t - r.currIndex + r.currPos : (n = s - r.currIndex + r.currPos, Math.abs(r.currPos - (n + r.group.length)) < Math.abs(r.currPos - n) ? n += r.group.length : Math.abs(r.currPos - (n - r.group.length)) < Math.abs(r.currPos - n) && (n -= r.group.length));
				else if (!r.group[s])
					return void r.update(!1, !1, e);
				r.current && (r.current.$slide.removeClass("fancybox-slide--current fancybox-slide--complete"), r.updateSlide(r.current, !0)), r.prevIndex = r.currIndex, r.prevPos = r.currPos, r.currIndex = s, r.currPos = n, r.current = r.createSlide(n), 1 < r.group.length && ((r.opts.loop || 0 <= n - 1) && r.createSlide(n - 1), (r.opts.loop || n + 1 < r.group.length) && r.createSlide(n + 1)), r.current.isMoved = !1, r.current.isComplete = !1, e = parseInt(e === _ ? 1.5 * r.current.opts.speed : e, 10), r.trigger("beforeMove"), r.updateControls(), i && (r.current.$slide.addClass("fancybox-slide--current"), r.$refs.container.show(), b(function () {
					r.$refs.bg.css("transition-duration", r.current.opts.speed + "ms"), r.$refs.container.addClass("fancybox-container--ready")
				})), r.update(!0, !1, i ? 0 : e, function () {
					r.afterMove()
				}), r.loadSlide(r.current), i && r.current.$ghost || r.preload()
			}
		},
		createSlide: function (t) {
			var e, i, s, n = this;
			if (i = (i = t % n.group.length) < 0 ? n.group.length + i : i, !n.slides[t] && n.group[i]) {
				if (n.opts.loop && 2 < n.group.length)
					for (var o in n.slides)
						if (n.slides[o].index === i)
							return (s = n.slides[o]).pos = t, n.slides[t] = s, delete n.slides[o], n.updateSlide(s), s;
				e = v('<div class="fancybox-slide"></div>').appendTo(n.$refs.slider), n.slides[t] = v.extend(!0, {}, n.group[i], {
					pos: t,
					$slide: e,
					isMoved: !1,
					isLoaded: !1
				})
			}
			return n.slides[t]
		},
		zoomInOut: function (e, t, i) {
			var s, n, o, r, a, l = this,
				c = l.current,
				h = c.$placeholder,
				d = c.opts.opacity,
				u = c.opts.$thumb,
				f = u ? u.offset() : 0,
				p = c.$slide.offset();
			return !(!(h && c.isMoved && f && (r = u, "function" == typeof v && r instanceof v && (r = r[0]), 0 < (a = r.getBoundingClientRect()).bottom && 0 < a.right && a.left < (g.innerWidth || m.documentElement.clientWidth) && a.top < (g.innerHeight || m.documentElement.clientHeight))) || "In" === e && !l.firstRun || (v.fancybox.stop(h), l.isAnimating = !0, s = {
				top: f.top - p.top + parseFloat(u.css("border-top-width") || 0),
				left: f.left - p.left + parseFloat(u.css("border-left-width") || 0),
				width: u.width(),
				height: u.height(),
				scaleX: 1,
				scaleY: 1
			}, "auto" == d && (d = .1 < Math.abs(c.width / c.height - s.width / s.height)), "In" === e ? (n = s, (o = l.getFitPos(c)).scaleX = o.width / n.width, o.scaleY = o.height / n.height, d && (n.opacity = .1, o.opacity = 1)) : (n = v.fancybox.getTranslate(h), o = s, c.$ghost && (c.$ghost.show(), c.$image && c.$image.remove()), n.scaleX = n.width / o.width, n.scaleY = n.height / o.height, n.width = o.width, n.height = o.height, d && (o.opacity = 0)), l.updateCursor(o.width, o.height), delete o.width, delete o.height, v.fancybox.setTranslate(h, n), h.show(), l.trigger("beforeZoom" + e), h.css("transition", "all " + t + "ms"), v.fancybox.setTranslate(h, o), setTimeout(function () {
				var t;
				h.css("transition", "none"), (t = v.fancybox.getTranslate(h)).scaleX = 1, t.scaleY = 1, v.fancybox.setTranslate(h, t), l.trigger("afterZoom" + e), i.apply(l), l.isAnimating = !1
			}, t), 0))
		},
		canPan: function () {
			var t = this.current,
				e = t.$placeholder,
				i = !1;
			return e && (i = this.getFitPos(t), i = 1 < Math.abs(e.width() - i.width) || 1 < Math.abs(e.height() - i.height)), i
		},
		isScaledDown: function () {
			var t = this.current,
				e = t.$placeholder,
				i = !1;
			return e && (i = (i = v.fancybox.getTranslate(e)).width < t.width || i.height < t.height), i
		},
		scaleToActual: function (t, e, i) {
			var s, n, o, r, a, l = this,
				c = l.current,
				h = c.$placeholder,
				d = parseInt(c.$slide.width(), 10),
				u = parseInt(c.$slide.height(), 10),
				f = c.width,
				p = c.height;
			h && (l.isAnimating = !0, t = t === _ ? .5 * d : t, e = e === _ ? .5 * u : e, r = f / (s = v.fancybox.getTranslate(h)).width, a = p / s.height, n = .5 * d - .5 * f, o = .5 * u - .5 * p, d < f && (0 < (n = s.left * r - (t * r - t)) && (n = 0), n < d - f && (n = d - f)), u < p && (0 < (o = s.top * a - (e * a - e)) && (o = 0), o < u - p && (o = u - p)), l.updateCursor(f, p), v.fancybox.animate(h, null, {
				top: o,
				left: n,
				scaleX: r,
				scaleY: a
			}, i || c.opts.speed, function () {
				l.isAnimating = !1
			}))
		},
		scaleToFit: function (t) {
			var e, i = this,
				s = i.current,
				n = s.$placeholder;
			n && (i.isAnimating = !0, e = i.getFitPos(s), i.updateCursor(e.width, e.height), v.fancybox.animate(n, null, {
				top: e.top,
				left: e.left,
				scaleX: e.width / n.width(),
				scaleY: e.height / n.height()
			}, t || s.opts.speed, function () {
				i.isAnimating = !1
			}))
		},
		getFitPos: function (t) {
			var e, i, s, n, o, r = t.$placeholder || t.$content,
				a = t.width,
				l = t.height,
				c = t.opts.margin;
			return !(!r || !r.length || !a && !l) && ("number" === v.type(c) && (c = [c, c]), 2 == c.length && (c = [c[0], c[1], c[0], c[1]]), h.width() < 800 && (c = [0, 0, 0, 0]), e = parseInt(t.$slide.width(), 10) - (c[1] + c[3]), i = parseInt(t.$slide.height(), 10) - (c[0] + c[2]), s = Math.min(1, e / a, i / l), n = Math.floor(s * a), o = Math.floor(s * l), {
				top: Math.floor(.5 * (i - o)) + c[0],
				left: Math.floor(.5 * (e - n)) + c[3],
				width: n,
				height: o
			})
		},
		update: function (t, i, e, s) {
			var n, o = this;
			!0 !== o.isAnimating && o.current && (n = o.current.pos * Math.floor(o.current.$slide.width()) * -1 - o.current.pos * o.current.opts.gutter, e = parseInt(e, 10) || 0, v.fancybox.stop(o.$refs.slider), !1 === t ? o.updateSlide(o.current, i) : v.each(o.slides, function (t, e) {
				o.updateSlide(e, i)
			}), e ? v.fancybox.animate(o.$refs.slider, null, {
				top: 0,
				left: n
			}, e, function () {
				o.current.isMoved = !0, "function" === v.type(s) && s.apply(o)
			}) : (v.fancybox.setTranslate(o.$refs.slider, {
				top: 0,
				left: n
			}), o.current.isMoved = !0, "function" === v.type(s) && s.apply(o)))
		},
		updateSlide: function (t, e) {
			var i, s = this,
				n = t.$placeholder;
			(t = t || s.current) && !s.isClosing && ((i = t.pos * Math.floor(t.$slide.width()) + t.pos * t.opts.gutter) !== t.leftPos && (v.fancybox.setTranslate(t.$slide, {
				top: 0,
				left: i
			}), t.leftPos = i), !1 !== e && n && (v.fancybox.setTranslate(n, s.getFitPos(t)), t.pos === s.currPos && s.updateCursor()), t.$slide.trigger("refresh"), s.trigger("onUpdate", t))
		},
		updateCursor: function (t, e) {
			var i = this,
				s = i.$refs.container.removeClass("fancybox-controls--canzoomIn fancybox-controls--canzoomOut fancybox-controls--canGrab");
			!i.isClosing && i.opts.touch && ((t !== _ && e !== _ ? t < i.current.width && e < i.current.height : i.isScaledDown()) ? s.addClass("fancybox-controls--canzoomIn") : i.group.length < 2 ? s.addClass("fancybox-controls--canzoomOut") : s.addClass("fancybox-controls--canGrab"))
		},
		loadSlide: function (i) {
			var t, e, s, n = this;
			if (i && !i.isLoaded && !i.isLoading) {
				switch (i.isLoading = !0, n.trigger("beforeLoad", i), t = i.type, (e = i.$slide).off("refresh").trigger("onReset").addClass("fancybox-slide--" + (t || "unknown")).addClass(i.opts.slideClass), t) {
					case "image":
						n.setImage(i);
						break;
					case "iframe":
						n.setIframe(i);
						break;
					case "html":
						n.setContent(i, i.content);
						break;
					case "inline":
						v(i.src).length ? n.setContent(i, v(i.src)) : n.setError(i);
						break;
					case "ajax":
						n.showLoading(i), s = v.ajax(v.extend({}, i.opts.ajax.settings, {
							url: i.src,
							success: function (t, e) {
								"success" === e && n.setContent(i, t)
							},
							error: function (t, e) {
								t && "abort" !== e && n.setError(i)
							}
						})), e.one("onReset", function () {
							s.abort()
						});
						break;
					default:
						n.setError(i)
				}
				return !0
			}
		},
		setImage: function (t) {
			var e, i, s, n, o = this,
				r = t.opts.image.srcset;
			if (!t.isLoaded || t.hasError) {
				if (r) {
					s = g.devicePixelRatio || 1, n = g.innerWidth * s, (i = r.split(",").map(function (t) {
						var s = {};
						return t.trim().split(/\s+/).forEach(function (t, e) {
							var i = parseInt(t.substring(0, t.length - 1), 10);
							return 0 === e ? s.url = t : void(i && (s.value = i, s.postfix = t[t.length - 1]))
						}), s
					})).sort(function (t, e) {
						return t.value - e.value
					});
					for (var a = 0; a < i.length; a++) {
						var l = i[a];
						if ("w" === l.postfix && l.value >= n || "x" === l.postfix && l.value >= s) {
							e = l;
							break
						}
					}!e && i.length && (e = i[i.length - 1]), e && (t.src = e.url, t.width && t.height && "w" == e.postfix && (t.height = t.width / t.height * e.value, t.width = e.value))
				}
				t.$placeholder = v('<div class="fancybox-placeholder"></div>').hide().appendTo(t.$slide), !1 !== t.opts.preload && t.opts.width && t.opts.height && (t.opts.thumb || t.opts.$thumb) ? (t.width = t.opts.width, t.height = t.opts.height, t.$ghost = v("<img />").one("load error", function () {
					o.isClosing || (v("<img/>")[0].src = t.src, o.revealImage(t, function () {
						o.setBigImage(t), o.firstRun && t.index === o.currIndex && o.preload()
					}))
				}).addClass("fancybox-image").appendTo(t.$placeholder).attr("src", t.opts.thumb || t.opts.$thumb.attr("src"))) : o.setBigImage(t)
			} else o.afterLoad(t)
		},
		setBigImage: function (t) {
			var e = this,
				i = v("<img />");
			t.$image = i.one("error", function () {
				e.setError(t)
			}).one("load", function () {
				clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = this.naturalWidth, t.height = this.naturalHeight, t.opts.image.srcset && i.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), e.afterLoad(t), t.$ghost && (t.timouts = setTimeout(function () {
					t.$ghost.hide()
				}, 350)))
			}).addClass("fancybox-image").attr("src", t.src).appendTo(t.$placeholder), i[0].complete ? i.trigger("load") : i[0].error ? i.trigger("error") : t.timouts = setTimeout(function () {
				i[0].complete || t.hasError || e.showLoading(t)
			}, 150), t.opts.image.protect && v('<div class="fancybox-spaceball"></div>').appendTo(t.$placeholder).on("contextmenu.fb", function (t) {
				return 2 == t.button && t.preventDefault(), !0
			})
		},
		revealImage: function (t, e) {
			var i = this;
			return e = e || v.noop, "image" !== t.type || t.hasError || !0 === t.isRevealed ? void e.apply(i) : (t.isRevealed = !0, void(t.pos === i.currPos && i.zoomInOut("In", t.opts.speed, e) || (t.$ghost && !t.isLoaded && i.updateSlide(t, !0), t.pos === i.currPos ? v.fancybox.animate(t.$placeholder, {
				opacity: 0
			}, {
				opacity: 1
			}, 300, e) : t.$placeholder.show(), e.apply(i))))
		},
		setIframe: function (o) {
			var r, e = this,
				a = o.opts.iframe,
				t = o.$slide;
			o.$content = v('<div class="fancybox-content"></div>').css(a.css).appendTo(t), r = v(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", v.fancybox.isTouch ? "auto" : a.scrolling).appendTo(o.$content), a.preload ? (o.$content.addClass("fancybox-tmp"), e.showLoading(o), r.on("load.fb error.fb", function (t) {
				this.isReady = 1, o.$slide.trigger("refresh"), e.afterLoad(o)
			}), t.on("refresh.fb", function () {
				var t, e, i, s, n = o.$content;
				if (1 === r[0].isReady) {
					try {
						t = r.contents().find("body")
					} catch (t) {}
					t && t.length && (a.css.width === _ || a.css.height === _) && (e = r[0].contentWindow.document.documentElement.scrollWidth, i = Math.ceil(t.outerWidth(!0) + (n.width() - e)), s = Math.ceil(t.outerHeight(!0)), n.css({
						width: a.css.width === _ ? i + (n.outerWidth() - n.innerWidth()) : a.css.width,
						height: a.css.height === _ ? s + (n.outerHeight() - n.innerHeight()) : a.css.height
					})), n.removeClass("fancybox-tmp")
				}
			})) : this.afterLoad(o), r.attr("src", o.src), o.opts.smallBtn && o.$content.prepend(o.opts.closeTpl), t.one("onReset", function () {
				try {
					v(this).find("iframe").hide().attr("src", "//about:blank")
				} catch (t) {}
				v(this).empty(), o.isLoaded = !1
			})
		},
		setContent: function (e, i) {
			this.isClosing || (this.hideLoading(e), e.$slide.empty(), s(i) && i.parent().length ? (i.data("placeholder") && i.parents(".fancybox-slide").trigger("onReset"), i.data({
				placeholder: v("<div></div>").hide().insertAfter(i)
			}).css("display", "inline-block")) : ("string" === v.type(i) && (3 === (i = v("<div>").append(i).contents())[0].nodeType && (i = v("<div>").html(i))), e.opts.selector && (i = v("<div>").html(i).find(e.opts.selector))), e.$slide.one("onReset", function () {
				var t = s(i) ? i.data("placeholder") : 0;
				t && (i.hide().replaceAll(t), i.data("placeholder", null)), e.hasError || (v(this).empty(), e.isLoaded = !1)
			}), e.$content = v(i).appendTo(e.$slide), !0 === e.opts.smallBtn && e.$content.find(".fancybox-close-small").remove().end().eq(0).append(e.opts.closeTpl), this.afterLoad(e))
		},
		setError: function (t) {
			t.hasError = !0, this.setContent(t, t.opts.errorTpl)
		},
		showLoading: function (t) {
			(t = t || this.current) && !t.$spinner && (t.$spinner = v(this.opts.spinnerTpl).appendTo(t.$slide))
		},
		hideLoading: function (t) {
			(t = t || this.current) && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
		},
		afterMove: function () {
			var i = this,
				t = i.current,
				s = {};
			t && (t.$slide.siblings().trigger("onReset"), v.each(i.slides, function (t, e) {
				e.pos >= i.currPos - 1 && e.pos <= i.currPos + 1 ? s[e.pos] = e : e && e.$slide.remove()
			}), i.slides = s, i.trigger("afterMove"), t.isLoaded && i.complete())
		},
		afterLoad: function (t) {
			var e = this;
			e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), t.$ghost || e.updateSlide(t, !0), t.index === e.currIndex && t.isMoved ? e.complete() : t.$ghost || e.revealImage(t))
		},
		complete: function () {
			var t = this,
				e = t.current;
			t.revealImage(e, function () {
				e.isComplete = !0, e.$slide.addClass("fancybox-slide--complete"), t.updateCursor(), t.trigger("onComplete"), e.opts.focus && "image" !== e.type && "iframe" !== e.type && t.focus()
			})
		},
		preload: function () {
			var t, e, i = this;
			i.group.length < 2 || (t = i.slides[i.currPos + 1], e = i.slides[i.currPos - 1], t && "image" === t.type && i.loadSlide(t), e && "image" === e.type && i.loadSlide(e))
		},
		focus: function () {
			var t, e = this.current;
			(t = e && e.isComplete ? e.$slide.find('button,:input,[tabindex],a:not(".disabled")').filter(":visible:first") : null) && t.length || (t = this.$refs.container), t.focus(), this.$refs.slider_wrap.scrollLeft(0), e && e.$slide.scrollTop(0)
		},
		activate: function () {
			var e = this;
			v(".fancybox-container").each(function () {
				var t = v(this).data("FancyBox");
				t && t.uid !== e.uid && !t.isClosing && t.trigger("onDeactivate")
			}), e.current && (0 < e.$refs.container.index() && e.$refs.container.prependTo(m.body), e.updateControls()), e.trigger("onActivate"), e.addEvents()
		},
		close: function (t) {
			var e = this,
				i = e.current,
				s = i.opts.speed,
				n = v.proxy(function () {
					e.cleanUp(t)
				}, this);
			return !e.isAnimating && !e.isClosing && (!1 === e.trigger("beforeClose", t) ? (v.fancybox.stop(e.$refs.slider), void b(function () {
				e.update(!0, !0, 150)
			})) : (e.isClosing = !0, i.timouts && clearTimeout(i.timouts), !0 !== t && v.fancybox.stop(e.$refs.slider), e.$refs.container.removeClass("fancybox-container--active").addClass("fancybox-container--closing"), i.$slide.removeClass("fancybox-slide--complete").siblings().remove(), i.isMoved || i.$slide.css("overflow", "visible"), e.removeEvents(), e.hideLoading(i), e.hideControls(), e.updateCursor(), e.$refs.bg.css("transition-duration", s + "ms"), this.$refs.container.removeClass("fancybox-container--ready"), void(!0 === t ? setTimeout(n, s) : e.zoomInOut("Out", s, n) || v.fancybox.animate(e.$refs.container, null, {
				opacity: 0
			}, s, "easeInSine", n))))
		},
		cleanUp: function (t) {
			var e, i = this;
			i.$refs.slider.children().trigger("onReset"), i.$refs.container.empty().remove(), i.trigger("afterClose", t), i.current = null, (e = v.fancybox.getInstance()) ? e.activate() : (v("html").removeClass("fancybox-enabled"), v("body").removeAttr("style"), h.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft), v("#fancybox-noscroll").remove()), i.$lastFocus && i.$lastFocus.focus()
		},
		trigger: function (t, e) {
			var i, s = Array.prototype.slice.call(arguments, 1),
				n = e && e.opts ? e : this.current;
			return n ? s.unshift(n) : n = this, s.unshift(this), v.isFunction(n.opts[t]) && (i = n.opts[t].apply(n, s)), !1 === i ? i : void("afterClose" === t ? v(m).trigger(t + ".fb", s) : this.$refs.container.trigger(t + ".fb", s))
		},
		toggleControls: function (t) {
			this.isHiddenControls ? this.updateControls(t) : this.hideControls()
		},
		hideControls: function () {
			this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-controls"), this.$refs.container.removeClass("fancybox-show-caption")
		},
		updateControls: function (t) {
			var e = this,
				i = e.$refs.container,
				s = e.$refs.caption,
				n = e.current,
				o = n.index,
				r = n.opts,
				a = r.caption;
			this.isHiddenControls && !0 !== t || (this.isHiddenControls = !1, i.addClass("fancybox-show-controls").toggleClass("fancybox-show-infobar", !!r.infobar && 1 < e.group.length).toggleClass("fancybox-show-buttons", !!r.buttons).toggleClass("fancybox-is-modal", !!r.modal), v(".fancybox-button--left", i).toggleClass("fancybox-button--disabled", !r.loop && o <= 0), v(".fancybox-button--right", i).toggleClass("fancybox-button--disabled", !r.loop && o >= e.group.length - 1), v(".fancybox-button--play", i).toggle(!!(r.slideShow && 1 < e.group.length)), v(".fancybox-button--close", i).toggle(!!r.closeBtn), v(".js-fancybox-count", i).html(e.group.length), v(".js-fancybox-index", i).html(o + 1), n.$slide.trigger("refresh"), s && s.empty(), a && a.length ? (s.html(a), this.$refs.container.addClass("fancybox-show-caption "), e.$caption = s) : this.$refs.container.removeClass("fancybox-show-caption"))
		}
	}), v.fancybox = {
		version: "3.0.47",
		defaults: n,
		getInstance: function (t) {
			var e = v('.fancybox-container:not(".fancybox-container--closing"):first').data("FancyBox"),
				i = Array.prototype.slice.call(arguments, 1);
			return e instanceof a && ("string" === v.type(t) ? e[t].apply(e, i) : "function" === v.type(t) && t.apply(e, i), e)
		},
		open: function (t, e, i) {
			return new a(t, e, i)
		},
		close: function (t) {
			var e = this.getInstance();
			e && (e.close(), !0 === t && this.close())
		},
		isTouch: m.createTouch !== _ && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
		use3d: (t = m.createElement("div"), g.getComputedStyle(t).getPropertyValue("transform") && !(m.documentMode && m.documentMode <= 11)),
		getTranslate: function (t) {
			var e, i;
			return !(!t || !t.length) && (e = t.get(0).getBoundingClientRect(), (i = t.eq(0).css("transform")) && -1 !== i.indexOf("matrix") ? i = (i = (i = i.split("(")[1]).split(")")[0]).split(",") : i = [], i.length ? i = (i = 10 < i.length ? [i[13], i[12], i[0], i[5]] : [i[5], i[4], i[0], i[3]]).map(parseFloat) : i = [0, 0, 1, 1], {
				top: i[0],
				left: i[1],
				scaleX: i[2],
				scaleY: i[3],
				opacity: parseFloat(t.css("opacity")),
				width: e.width,
				height: e.height
			})
		},
		setTranslate: function (t, e) {
			var i = "",
				s = {};
			if (t && e)
				return e.left === _ && e.top === _ || (i = (e.left === _ ? t.position().top : e.left) + "px, " + (e.top === _ ? t.position().top : e.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"), e.scaleX !== _ && e.scaleY !== _ && (i = (i.length ? i + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), i.length && (s.transform = i), e.opacity !== _ && (s.opacity = e.opacity), e.width !== _ && (s.width = e.width), e.height !== _ && (s.height = e.height), t.css(s)
		},
		easing: {
			easeOutCubic: function (t, e, i, s) {
				return i * ((t = t / s - 1) * t * t + 1) + e
			},
			easeInCubic: function (t, e, i, s) {
				return i * (t /= s) * t * t + e
			},
			easeOutSine: function (t, e, i, s) {
				return i * Math.sin(t / s * (Math.PI / 2)) + e
			},
			easeInSine: function (t, e, i, s) {
				return -i * Math.cos(t / s * (Math.PI / 2)) + i + e
			}
		},
		stop: function (t) {
			t.removeData("animateID")
		},
		animate: function (i, s, n, o, r, t) {
			var a, l, c, h = this,
				d = null,
				u = 0,
				f = function () {
					n.scaleX !== _ && n.scaleY !== _ && s && s.width !== _ && s.height !== _ && (n.width = s.width * n.scaleX, n.height = s.height * n.scaleY, n.scaleX = 1, n.scaleY = 1), h.setTranslate(i, n), t()
				},
				p = function (t) {
					if (a = [], l = 0, i.length && i.data("animateID") === c) {
						if (t = t || Date.now(), d && (l = t - d), d = t, o <= (u += l))
							return void f();
						for (var e in n)
							n.hasOwnProperty(e) && s[e] !== _ && (s[e] == n[e] ? a[e] = n[e] : a[e] = h.easing[r](u, s[e], n[e] - s[e], o));
						h.setTranslate(i, a), b(p)
					}
				};
			h.animateID = c = h.animateID === _ ? 1 : h.animateID + 1, i.data("animateID", c), t === _ && "function" == v.type(r) && (t = r, r = _), r || (r = "easeOutCubic"), t = t || v.noop, s ? this.setTranslate(i, s) : s = this.getTranslate(i), o ? (i.show(), b(p)) : f()
		}
	}, v.fn.fancybox = function (t) {
		return this.off("click.fb-start").on("click.fb-start", {
			items: this,
			options: t || {}
		}, e), this
	}, v(m).on("click.fb-start", "[data-fancybox]", e)
}(window, document, window.jQuery),
function (f) {
	"use strict";
	var p = function (i, t, e) {
			if (i)
				return e = e || "", "object" === f.type(e) && (e = f.param(e, !0)), f.each(t, function (t, e) {
					i = i.replace("$" + t, e || "")
				}), e.length && (i += (0 < i.indexOf("?") ? "&" : "?") + e), i
		},
		i = {
			youtube: {
				matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
				params: {
					autoplay: 1,
					autohide: 1,
					fs: 1,
					rel: 0,
					hd: 1,
					wmode: "transparent",
					enablejsapi: 1,
					html5: 1
				},
				paramPlace: 8,
				type: "iframe",
				url: "//www.youtube.com/embed/$4",
				thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
			},
			vimeo: {
				matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
				params: {
					autoplay: 1,
					hd: 1,
					show_title: 1,
					show_byline: 1,
					show_portrait: 0,
					fullscreen: 1,
					api: 1
				},
				paramPlace: 3,
				type: "iframe",
				url: "//player.vimeo.com/video/$2"
			},
			metacafe: {
				matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
				type: "iframe",
				url: "//www.metacafe.com/embed/$1/?ap=1"
			},
			dailymotion: {
				matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
				params: {
					additionalInfos: 0,
					autoStart: 1
				},
				type: "iframe",
				url: "//www.dailymotion.com/embed/video/$1"
			},
			vine: {
				matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
				type: "iframe",
				url: "//vine.co/v/$1/embed/simple"
			},
			instagram: {
				matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type: "image",
				url: "//$1/p/$2/media/?size=l"
			},
			google_maps: {
				matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
				type: "iframe",
				url: function (t) {
					return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && 0 < t[12].indexOf("layer=c") ? "svembed" : "embed")
				}
			}
		};
	f(document).on("onInit.fb", function (t, e) {
		f.each(e.group, function (t, n) {
			var o, r, a, l, c, h, d = n.src || "",
				u = !1;
			n.type || (f.each(i, function (t, e) {
				if (r = d.match(e.matcher), c = {}, h = t, r) {
					if (u = e.type, e.paramPlace && r[e.paramPlace]) {
						"?" == (l = r[e.paramPlace])[0] && (l = l.substring(1)), l = l.split("&");
						for (var i = 0; i < l.length; ++i) {
							var s = l[i].split("=", 2);
							2 == s.length && (c[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
						}
					}
					return a = f.extend(!0, {}, e.params, n.opts[t], c), d = "function" === f.type(e.url) ? e.url.call(this, r, a, n) : p(e.url, r, a), o = "function" === f.type(e.thumb) ? e.thumb.call(this, r, a, n) : p(e.thumb, r), "vimeo" === h && (d = d.replace("&%23", "#")), !1
				}
			}), u ? (n.src = d, n.type = u, n.opts.thumb || n.opts.$thumb && n.opts.$thumb.length || (n.opts.thumb = o), "iframe" === u && (f.extend(!0, n.opts, {
				iframe: {
					preload: !1,
					scrolling: "no"
				},
				smallBtn: !1,
				closeBtn: !0,
				fullScreen: !1,
				slideShow: !1
			}), n.opts.slideClass += " fancybox-slide--video")) : n.type = "iframe")
		})
	})
}(window.jQuery),
function (p, t, g) {
	"use strict";
	var m = p.requestAnimationFrame || p.webkitRequestAnimationFrame || p.mozRequestAnimationFrame || function (t) {
			p.setTimeout(t, 1e3 / 60)
		},
		a = function (t) {
			var e = [];
			for (var i in t = (t = t.originalEvent || t || p.e).touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t])
				t[i].pageX ? e.push({
					x: t[i].pageX,
					y: t[i].pageY
				}) : t[i].clientX && e.push({
					x: t[i].clientX,
					y: t[i].clientY
				});
			return e
		},
		v = function (t, e, i) {
			return e && t ? "x" === i ? t.x - e.x : "y" === i ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
		},
		o = function (t) {
			return t.is("a") || t.is("button") || t.is("input") || t.is("select") || t.is("textarea") || g.isFunction(t.get(0).onclick)
		},
		i = function (t) {
			var e = this;
			e.instance = t, e.$wrap = t.$refs.slider_wrap, e.$slider = t.$refs.slider, e.$container = t.$refs.container, e.destroy(), e.$wrap.on("touchstart.fb mousedown.fb", g.proxy(e, "ontouchstart"))
		};
	i.prototype.destroy = function () {
		this.$wrap.off("touchstart.fb mousedown.fb touchmove.fb mousemove.fb touchend.fb touchcancel.fb mouseup.fb mouseleave.fb")
	}, i.prototype.ontouchstart = function (t) {
		var e = this,
			i = g(t.target),
			s = e.instance.current,
			n = s.$content || s.$placeholder;
		return e.startPoints = a(t), e.$target = i, e.$content = n, e.canvasWidth = Math.round(s.$slide[0].clientWidth), e.canvasHeight = Math.round(s.$slide[0].clientHeight), (e.startEvent = t).originalEvent.clientX > e.canvasWidth + s.$slide.offset().left || (o(i) || o(i.parent()) || function (t) {
			for (var e = !1; i = t.get(0), s = p.getComputedStyle(i)["overflow-y"], n = p.getComputedStyle(i)["overflow-x"], o = ("scroll" === s || "auto" === s) && i.scrollHeight > i.clientHeight, r = ("scroll" === n || "auto" === n) && i.scrollWidth > i.clientWidth, !(e = o || r) && (t = t.parent()).length && !t.hasClass("fancybox-slider") && !t.is("body"););
			var i, s, n, o, r;
			return e
		}(i) ? void 0 : s.opts.touch ? void(t.originalEvent && 2 == t.originalEvent.button || (t.stopPropagation(), t.preventDefault(), !s || e.instance.isAnimating || e.instance.isClosing || !e.startPoints || 1 < e.startPoints.length && !s.isMoved || (e.$wrap.off("touchmove.fb mousemove.fb", g.proxy(e, "ontouchmove")), e.$wrap.off("touchend.fb touchcancel.fb mouseup.fb mouseleave.fb", g.proxy(e, "ontouchend")), e.$wrap.on("touchend.fb touchcancel.fb mouseup.fb mouseleave.fb", g.proxy(e, "ontouchend")), e.$wrap.on("touchmove.fb mousemove.fb", g.proxy(e, "ontouchmove")), e.startTime = (new Date).getTime(), e.distanceX = e.distanceY = e.distance = 0, e.canTap = !1, e.isPanning = !1, e.isSwiping = !1, e.isZooming = !1, e.sliderStartPos = g.fancybox.getTranslate(e.$slider), e.contentStartPos = g.fancybox.getTranslate(e.$content), e.contentLastPos = null, 1 !== e.startPoints.length || e.isZooming || (e.canTap = s.isMoved, "image" === s.type && (e.contentStartPos.width > e.canvasWidth + 1 || e.contentStartPos.height > e.canvasHeight + 1) ? (g.fancybox.stop(e.$content), e.isPanning = !0) : (g.fancybox.stop(e.$slider), e.isSwiping = !0), e.$container.addClass("fancybox-controls--isGrabbing")), 2 === e.startPoints.length && s.isMoved && !s.hasError && "image" === s.type && (s.isLoaded || s.$ghost) && (e.isZooming = !0, e.isSwiping = !1, e.isPanning = !1, g.fancybox.stop(e.$content), e.centerPointStartX = .5 * (e.startPoints[0].x + e.startPoints[1].x) - g(p).scrollLeft(), e.centerPointStartY = .5 * (e.startPoints[0].y + e.startPoints[1].y) - g(p).scrollTop(), e.percentageOfImageAtPinchPointX = (e.centerPointStartX - e.contentStartPos.left) / e.contentStartPos.width, e.percentageOfImageAtPinchPointY = (e.centerPointStartY - e.contentStartPos.top) / e.contentStartPos.height, e.startDistanceBetweenFingers = v(e.startPoints[0], e.startPoints[1]))))) : (e.endPoints = e.startPoints, e.ontap()))
	}, i.prototype.ontouchmove = function (t) {
		var e = this;
		t.preventDefault(), e.newPoints = a(t), e.newPoints && e.newPoints.length && (e.distanceX = v(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = v(e.newPoints[0], e.startPoints[0], "y"), e.distance = v(e.newPoints[0], e.startPoints[0]), 0 < e.distance && (e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))
	}, i.prototype.onSwipe = function () {
		var t, e = this,
			i = e.isSwiping,
			s = e.sliderStartPos.left;
		!0 === i ? 10 < Math.abs(e.distance) && (e.instance.group.length < 2 ? e.isSwiping = "y" : !e.instance.current.isMoved || !1 === e.instance.opts.touch.vertical || "auto" === e.instance.opts.touch.vertical && 800 < g(p).width() ? e.isSwiping = "x" : (t = Math.abs(180 * Math.atan2(e.distanceY, e.distanceX) / Math.PI), e.isSwiping = 45 < t && t < 135 ? "y" : "x"), e.canTap = !1, e.instance.current.isMoved = !1, e.startPoints = e.newPoints) : ("x" == i && (!e.instance.current.opts.loop && 0 === e.instance.current.index && 0 < e.distanceX ? s += Math.pow(e.distanceX, .8) : !e.instance.current.opts.loop && e.instance.current.index === e.instance.group.length - 1 && e.distanceX < 0 ? s -= Math.pow(-e.distanceX, .8) : s += e.distanceX), e.sliderLastPos = {
			top: "x" == i ? 0 : e.sliderStartPos.top + e.distanceY,
			left: s
		}, m(function () {
			g.fancybox.setTranslate(e.$slider, e.sliderLastPos)
		}))
	}, i.prototype.onPan = function () {
		var t, e, i, s = this;
		s.canTap = !1, t = s.contentStartPos.width > s.canvasWidth ? s.contentStartPos.left + s.distanceX : s.contentStartPos.left, e = s.contentStartPos.top + s.distanceY, (i = s.limitMovement(t, e, s.contentStartPos.width, s.contentStartPos.height)).scaleX = s.contentStartPos.scaleX, i.scaleY = s.contentStartPos.scaleY, s.contentLastPos = i, m(function () {
			g.fancybox.setTranslate(s.$content, s.contentLastPos)
		})
	}, i.prototype.limitMovement = function (t, e, i, s) {
		var n, o, r, a, l = this,
			c = l.canvasWidth,
			h = l.canvasHeight,
			d = l.contentStartPos.left,
			u = l.contentStartPos.top,
			f = l.distanceX,
			p = l.distanceY;
		return n = Math.max(0, .5 * c - .5 * i), o = Math.max(0, .5 * h - .5 * s), r = Math.min(c - i, .5 * c - .5 * i), a = Math.min(h - s, .5 * h - .5 * s), c < i && (0 < f && n < t && (t = n - 1 + Math.pow(-n + d + f, .8) || 0), f < 0 && t < r && (t = r + 1 - Math.pow(r - d - f, .8) || 0)), h < s && (0 < p && o < e && (e = o - 1 + Math.pow(-o + u + p, .8) || 0), p < 0 && e < a && (e = a + 1 - Math.pow(a - u - p, .8) || 0)), {
			top: e,
			left: t
		}
	}, i.prototype.limitPosition = function (t, e, i, s) {
		var n = this.canvasWidth,
			o = this.canvasHeight;
		return n < i ? t = (t = 0 < t ? 0 : t) < n - i ? n - i : t : t = Math.max(0, n / 2 - i / 2), o < s ? e = (e = 0 < e ? 0 : e) < o - s ? o - s : e : e = Math.max(0, o / 2 - s / 2), {
			top: e,
			left: t
		}
	}, i.prototype.onZoom = function () {
		var t = this,
			e = t.contentStartPos.width,
			i = t.contentStartPos.height,
			s = t.contentStartPos.left,
			n = t.contentStartPos.top,
			o = v(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers,
			r = Math.floor(e * o),
			a = Math.floor(i * o),
			l = (e - r) * t.percentageOfImageAtPinchPointX,
			c = (i - a) * t.percentageOfImageAtPinchPointY,
			h = (t.newPoints[0].x + t.newPoints[1].x) / 2 - g(p).scrollLeft(),
			d = (t.newPoints[0].y + t.newPoints[1].y) / 2 - g(p).scrollTop(),
			u = h - t.centerPointStartX,
			f = {
				top: n + (c + (d - t.centerPointStartY)),
				left: s + (l + u),
				scaleX: t.contentStartPos.scaleX * o,
				scaleY: t.contentStartPos.scaleY * o
			};
		t.canTap = !1, t.newWidth = r, t.newHeight = a, t.contentLastPos = f, m(function () {
			g.fancybox.setTranslate(t.$content, t.contentLastPos)
		})
	}, i.prototype.ontouchend = function (t) {
		var e = this,
			i = e.instance.current,
			s = Math.max((new Date).getTime() - e.startTime, 1),
			n = e.isSwiping,
			o = e.isPanning,
			r = e.isZooming;
		return e.endPoints = a(t), e.$container.removeClass("fancybox-controls--isGrabbing"), e.$wrap.off("touchmove.fb mousemove.fb", g.proxy(this, "ontouchmove")), e.$wrap.off("touchend.fb touchcancel.fb mouseup.fb mouseleave.fb", g.proxy(this, "ontouchend")), e.isSwiping = !1, e.isPanning = !1, e.isZooming = !1, e.canTap ? e.ontap() : (e.velocityX = e.distanceX / s * .5, e.velocityY = e.distanceY / s * .5, e.speed = i.opts.speed || 330, e.speedX = Math.max(.75 * e.speed, Math.min(1.5 * e.speed, 1 / Math.abs(e.velocityX) * e.speed)), e.speedY = Math.max(.75 * e.speed, Math.min(1.5 * e.speed, 1 / Math.abs(e.velocityY) * e.speed)), void(o ? e.endPanning() : r ? e.endZooming() : e.endSwiping(n)))
	}, i.prototype.endSwiping = function (t) {
		var e = this;
		"y" == t && 50 < Math.abs(e.distanceY) ? (g.fancybox.animate(e.$slider, null, {
			top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
			left: e.sliderStartPos.left,
			opacity: 0
		}, e.speedY), e.instance.close(!0)) : "x" == t && 50 < e.distanceX ? e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 ? e.instance.next(e.speedX) : e.instance.update(!1, !0, 150)
	}, i.prototype.endPanning = function () {
		var t, e, i, s = this;
		s.contentLastPos && (t = s.contentLastPos.left + s.velocityX * s.speed * 2, e = s.contentLastPos.top + s.velocityY * s.speed * 2, (i = s.limitPosition(t, e, s.contentStartPos.width, s.contentStartPos.height)).width = s.contentStartPos.width, i.height = s.contentStartPos.height, g.fancybox.animate(s.$content, null, i, s.speed, "easeOutSine"))
	}, i.prototype.endZooming = function () {
		var t, e, i, s, n = this,
			o = n.instance.current,
			r = n.newWidth,
			a = n.newHeight;
		n.contentLastPos && (t = n.contentLastPos.left, s = {
			top: e = n.contentLastPos.top,
			left: t,
			width: r,
			height: a,
			scaleX: 1,
			scaleY: 1
		}, g.fancybox.setTranslate(n.$content, s), r < n.canvasWidth && a < n.canvasHeight ? n.instance.scaleToFit(150) : r > o.width || a > o.height ? n.instance.scaleToActual(n.centerPointStartX, n.centerPointStartY, 150) : (i = n.limitPosition(t, e, r, a), g.fancybox.animate(n.$content, null, i, n.speed, "easeOutSine")))
	}, i.prototype.ontap = function () {
		var t = this,
			e = t.instance,
			i = e.current,
			s = t.endPoints[0].x,
			n = t.endPoints[0].y;
		if (s -= t.$wrap.offset().left, n -= t.$wrap.offset().top, e.SlideShow && e.SlideShow.isActive && e.SlideShow.stop(), !g.fancybox.isTouch)
			return i.opts.closeClickOutside && t.$target.is(".fancybox-slide") ? void e.close(t.startEvent) : void("image" == i.type && i.isMoved && (e.canPan() ? e.scaleToFit() : e.isScaledDown() ? e.scaleToActual(s, n) : e.group.length < 2 && e.close(t.startEvent)));
		if (t.tapped) {
			if (clearTimeout(t.tapped), t.tapped = null, 50 < Math.abs(s - t.x) || 50 < Math.abs(n - t.y) || !i.isMoved)
				return this;
			"image" == i.type && (i.isLoaded || i.$ghost) && (e.canPan() ? e.scaleToFit() : e.isScaledDown() && e.scaleToActual(s, n))
		} else t.x = s, t.y = n, t.tapped = setTimeout(function () {
			t.tapped = null, e.toggleControls(!0)
		}, 300);
		return this
	}, g(t).on("onActivate.fb", function (t, e) {
		e && !e.Guestures && (e.Guestures = new i(e))
	}), g(t).on("beforeClose.fb", function (t, e) {
		e && e.Guestures && e.Guestures.destroy()
	})
}(window, document, window.jQuery),
function (t, e) {
	"use strict";
	var i = function (t) {
		this.instance = t, this.init()
	};
	e.extend(i.prototype, {
		timer: null,
		isActive: !1,
		$button: null,
		speed: 3e3,
		init: function () {
			var t = this;
			t.$button = e('<button data-fancybox-play class="fancybox-button fancybox-button--play" title="Slideshow (P)"></button>').appendTo(t.instance.$refs.buttons), t.instance.$refs.container.on("click", "[data-fancybox-play]", function () {
				t.toggle()
			})
		},
		set: function () {
			var t = this;
			t.instance && t.instance.current && (t.instance.current.opts.loop || t.instance.currIndex < t.instance.group.length - 1) ? t.timer = setTimeout(function () {
				t.instance.next()
			}, t.instance.current.opts.slideShow.speed || t.speed) : t.stop()
		},
		clear: function () {
			clearTimeout(this.timer), this.timer = null
		},
		start: function () {
			var t = this;
			t.stop(), t.instance && t.instance.current && (t.instance.current.opts.loop || t.instance.currIndex < t.instance.group.length - 1) && (t.instance.$refs.container.on({
				"beforeLoad.fb.player": e.proxy(t, "clear"),
				"onComplete.fb.player": e.proxy(t, "set")
			}), t.isActive = !0, t.instance.current.isComplete && t.set(), t.instance.$refs.container.trigger("onPlayStart"), t.$button.addClass("fancybox-button--pause"))
		},
		stop: function () {
			this.clear(), this.instance.$refs.container.trigger("onPlayEnd").off(".player"), this.$button.removeClass("fancybox-button--pause"), this.isActive = !1
		},
		toggle: function () {
			this.isActive ? this.stop() : this.start()
		}
	}), e(t).on("onInit.fb", function (t, e) {
		e && 1 < e.group.length && e.opts.slideShow && !e.SlideShow && (e.SlideShow = new i(e))
	}), e(t).on("beforeClose.fb onDeactivate.fb", function (t, e) {
		e && e.SlideShow && e.SlideShow.stop()
	})
}(document, window.jQuery),
function (o, s) {
	"use strict";
	var e = function () {
		var t, e, i, s = [
				["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
				["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
				["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
				["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
				["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
			],
			n = {};
		for (e = 0; e < s.length; e++)
			if ((t = s[e]) && t[1] in o) {
				for (i = 0; i < t.length; i++)
					n[s[0][i]] = t[i];
				return n
			}
		return !1
	}();
	if (e) {
		var n = {
			request: function (t) {
				(t = t || o.documentElement)[e.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
			},
			exit: function () {
				o[e.exitFullscreen]()
			},
			toggle: function (t) {
				this.isFullscreen() ? this.exit() : this.request(t)
			},
			isFullscreen: function () {
				return Boolean(o[e.fullscreenElement])
			},
			enabled: function () {
				return Boolean(o[e.fullscreenEnabled])
			}
		};
		s(o).on({
			"onInit.fb": function (t, e) {
				var i;
				e && e.opts.fullScreen && !e.FullScreen && (i = e.$refs.container, e.$refs.button_fs = s('<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="Full screen (F)"></button>').appendTo(e.$refs.buttons), i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
					t.stopPropagation(), t.preventDefault(), n.toggle(i[0])
				}), !0 === e.opts.fullScreen.requestOnStart && n.request(i[0]))
			},
			"beforeMove.fb": function (t, e) {
				e && e.$refs.button_fs && e.$refs.button_fs.toggle(!!e.current.opts.fullScreen)
			},
			"beforeClose.fb": function () {
				n.exit()
			}
		}), s(o).on(e.fullscreenchange, function () {
			var t = s.fancybox.getInstance(),
				e = t ? t.current.$placeholder : null;
			e && (e.css("transition", "none"), t.isAnimating = !1, t.update(!0, !0, 0))
		})
	}
}(document, window.jQuery),
function (t, a) {
	"use strict";
	var n = function (t) {
		this.instance = t, this.init()
	};
	a.extend(n.prototype, {
		$button: null,
		$grid: null,
		$list: null,
		isVisible: !1,
		init: function () {
			var e = this;
			e.$button = a('<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="Thumbnails (G)"></button>').appendTo(this.instance.$refs.buttons).on("touchend click", function (t) {
				t.stopPropagation(), t.preventDefault(), e.toggle()
			})
		},
		create: function () {
			var i, s, t = this.instance;
			this.$grid = a('<div class="fancybox-thumbs"></div>').appendTo(t.$refs.container), i = "<ul>", a.each(t.group, function (t, e) {
				(s = e.opts.thumb || (e.opts.$thumb ? e.opts.$thumb.attr("src") : null)) || "image" !== e.type || (s = e.src), s && s.length && (i += '<li data-index="' + t + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + s + '" /></li>')
			}), i += "</ul>", this.$list = a(i).appendTo(this.$grid).on("click touchstart", "li", function () {
				t.jumpTo(a(this).data("index"))
			}), this.$list.find("img").hide().one("load", function () {
				var t, e, i, s, n = a(this).parent().removeClass("fancybox-thumbs-loading"),
					o = n.outerWidth(),
					r = n.outerHeight();
				t = this.naturalWidth || this.width, s = (e = this.naturalHeight || this.height) / r, 1 <= (i = t / o) && 1 <= s && (s < i ? (t /= s, e = r) : (t = o, e /= i)), a(this).css({
					width: Math.floor(t),
					height: Math.floor(e),
					"margin-top": Math.min(0, Math.floor(.3 * r - .3 * e)),
					"margin-left": Math.min(0, Math.floor(.5 * o - .5 * t))
				}).show()
			}).each(function () {
				this.src = a(this).data("src")
			})
		},
		focus: function () {
			this.instance.current && this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active").focus()
		},
		close: function () {
			this.$grid.hide()
		},
		update: function () {
			this.instance.$refs.container.toggleClass("fancybox-container--thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.$grid.show(), this.focus()) : this.$grid && this.$grid.hide(), this.instance.update()
		},
		hide: function () {
			this.isVisible = !1, this.update()
		},
		show: function () {
			this.isVisible = !0, this.update()
		},
		toggle: function () {
			this.isVisible ? this.hide() : this.show()
		}
	}), a(t).on("onInit.fb", function (t, e) {
		var i = e.group[0],
			s = e.group[1];
		e.opts.thumbs && !e.Thumbs && 1 < e.group.length && ("image" == i.type || i.opts.thumb || i.opts.$thumb) && ("image" == s.type || s.opts.thumb || s.opts.$thumb) && (e.Thumbs = new n(e))
	}), a(t).on("beforeMove.fb", function (t, e, i) {
		var s = e && e.Thumbs;
		s && (i.modal ? (s.$button.hide(), s.hide()) : (!0 === e.opts.thumbs.showOnStart && e.firstRun && s.show(), s.$button.show(), s.isVisible && s.focus()))
	}), a(t).on("beforeClose.fb", function (t, e) {
		e && e.Thumbs && (e.Thumbs.isVisible && !1 !== e.opts.thumbs.hideOnClosing && e.Thumbs.close(), e.Thumbs = null)
	})
}(document, window.jQuery),
function (o, r, i) {
	"use strict";

	function n() {
		var t = r.location.hash.substr(1),
			e = t.split("-"),
			i = 1 < e.length && /^\+?\d+$/.test(e[e.length - 1]) && parseInt(e.pop(-1), 10) || 1;
		return i < 1 && (i = 1), {
			hash: t,
			index: i,
			gallery: e.join("-")
		}
	}

	function e(t) {
		var e;
		"" !== t.gallery && ((e = i("[data-fancybox='" + i.escapeSelector(t.gallery) + "']").eq(t.index - 1)).length ? e.trigger("click") : i("#" + i.escapeSelector(t.gallery)).trigger("click"))
	}

	function a(t) {
		var e;
		return !!t && ((e = t.current ? t.current.opts : t.opts).$orig ? e.$orig.data("fancybox") : e.hash || "")
	}
	i.escapeSelector || (i.escapeSelector = function (t) {
		return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (t, e) {
			return e ? "\0" === t ? "" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
		})
	});
	var l = null;
	i(function () {
		setTimeout(function () {
			!1 !== i.fancybox.defaults.hash && (i(r).on("hashchange.fb", function () {
				var t = n();
				i.fancybox.getInstance() ? l && l !== t.gallery + "-" + t.index && (l = null, i.fancybox.close()) : "" !== t.gallery && e(t)
			}), i(o).on({
				"onInit.fb": function (t, e) {
					var i = n(),
						s = a(e);
					s && i.gallery && s == i.gallery && (e.currIndex = i.index - 1)
				},
				"beforeMove.fb": function (t, e, i) {
					var s = a(e);
					s && "" !== s && (r.location.hash.indexOf(s) < 0 && (e.opts.origHash = r.location.hash), l = s + (1 < e.group.length ? "-" + (i.index + 1) : ""), "pushState" in history ? history.pushState("", o.title, r.location.pathname + r.location.search + "#" + l) : r.location.hash = l)
				},
				"beforeClose.fb": function (t, e, i) {
					var s = a(e),
						n = e && e.opts.origHash ? e.opts.origHash : "";
					s && "" !== s && ("pushState" in history ? history.pushState("", o.title, r.location.pathname + r.location.search + n) : r.location.hash = n), l = null
				}
			}), e(n()))
		}, 50)
	})
}(document, window, window.jQuery),
function () {
	var a, i, n, r, o = {}.hasOwnProperty;
	(r = function () {
		function t() {
			this.options_index = 0, this.parsed = []
		}
		return t.prototype.add_node = function (t) {
			return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
		}, t.prototype.add_group = function (t) {
			var e, i, s, n, o, r;
			for (e = this.parsed.length, this.parsed.push({
					array_index: e,
					group: !0,
					label: t.label,
					title: t.title ? t.title : void 0,
					children: 0,
					disabled: t.disabled,
					classes: t.className
				}), r = [], i = 0, s = (o = t.childNodes).length; i < s; i++)
				n = o[i], r.push(this.add_option(n, e, t.disabled));
			return r
		}, t.prototype.add_option = function (t, e, i) {
			if ("OPTION" === t.nodeName.toUpperCase())
				return "" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
					array_index: this.parsed.length,
					options_index: this.options_index,
					value: t.value,
					text: t.text,
					html: t.innerHTML,
					title: t.title ? t.title : void 0,
					selected: t.selected,
					disabled: !0 === i ? i : t.disabled,
					group_array_index: e,
					group_label: null != e ? this.parsed[e].label : null,
					classes: t.className,
					style: t.style.cssText
				})) : this.parsed.push({
					array_index: this.parsed.length,
					options_index: this.options_index,
					empty: !0
				}), this.options_index += 1
		}, t
	}()).select_to_array = function (t) {
		var e, i, s, n, o;
		for (n = new r, i = 0, s = (o = t.childNodes).length; i < s; i++)
			e = o[i], n.add_node(e);
		return n.parsed
	}, i = function () {
		function n(t, e) {
			var i, s;
			this.form_field = t, this.options = null != e ? e : {}, this.label_click_handler = (i = this.label_click_handler, s = this, function () {
				return i.apply(s, arguments)
			}), n.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
		}
		return n.prototype.set_default_values = function () {
			var e, i;
			return this.click_test_action = (e = this, function (t) {
				return e.test_active_click(t)
			}), this.activate_action = (i = this, function (t) {
				return i.activate_field(t)
			}), this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select
		}, n.prototype.set_default_text = function () {
			return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || n.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || n.default_single_text, this.default_text = this.escape_html(this.default_text), this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || n.default_no_result_text
		}, n.prototype.choice_label = function (t) {
			return this.include_group_label_in_selected && null != t.group_label ? "<b class='group-name'>" + t.group_label + "</b>" + t.html : t.html
		}, n.prototype.mouse_enter = function () {
			return this.mouse_on_container = !0
		}, n.prototype.mouse_leave = function () {
			return this.mouse_on_container = !1
		}, n.prototype.input_focus = function (t) {
			if (this.is_multiple) {
				if (!this.active_field)
					return setTimeout((e = this, function () {
						return e.container_mousedown()
					}), 50)
			} else if (!this.active_field)
				return this.activate_field();
			var e
		}, n.prototype.input_blur = function (t) {
			if (!this.mouse_on_container)
				return this.active_field = !1, setTimeout((e = this, function () {
					return e.blur_test()
				}), 100);
			var e
		}, n.prototype.label_click_handler = function (t) {
			return this.is_multiple ? this.container_mousedown(t) : this.activate_field()
		}, n.prototype.results_option_build = function (t) {
			var e, i, s, n, o, r, a;
			for (e = "", n = a = 0, o = (r = this.results_data).length; n < o && ((s = "") !== (s = (i = r[n]).group ? this.result_add_group(i) : this.result_add_option(i)) && (a++, e += s), (null != t ? t.first : void 0) && (i.selected && this.is_multiple ? this.choice_build(i) : i.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(i))), !(a >= this.max_shown_results)); n++);
			return e
		}, n.prototype.result_add_option = function (t) {
			var e, i;
			return t.search_match && this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), (i = document.createElement("li")).className = e.join(" "), i.style.cssText = t.style, i.setAttribute("data-option-array-index", t.array_index), i.innerHTML = t.highlighted_html || t.html, t.title && (i.title = t.title), this.outerHTML(i)) : ""
		}, n.prototype.result_add_group = function (t) {
			var e, i;
			return (t.search_match || t.group_match) && 0 < t.active_options ? ((e = []).push("group-result"), t.classes && e.push(t.classes), (i = document.createElement("li")).className = e.join(" "), i.innerHTML = t.highlighted_html || this.escape_html(t.label), t.title && (i.title = t.title), this.outerHTML(i)) : ""
		}, n.prototype.results_update_field = function () {
			if (this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing)
				return this.winnow_results()
		}, n.prototype.reset_single_select_options = function () {
			var t, e, i, s, n;
			for (n = [], t = 0, e = (i = this.results_data).length; t < e; t++)(s = i[t]).selected ? n.push(s.selected = !1) : n.push(void 0);
			return n
		}, n.prototype.results_toggle = function () {
			return this.results_showing ? this.results_hide() : this.results_show()
		}, n.prototype.results_search = function (t) {
			return this.results_showing ? this.winnow_results() : this.results_show()
		}, n.prototype.winnow_results = function () {
			var t, e, i, s, n, o, r, a, l, c, h, d, u, f, p;
			for (this.no_results_clear(), c = 0, t = (r = this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), l = this.get_search_regex(t), i = 0, s = (a = this.results_data).length; i < s; i++)(n = a[i]).search_match = !1, d = h = null, n.highlighted_html = "", this.include_option_in_results(n) && (n.group && (n.group_match = !1, n.active_options = 0), null != n.group_array_index && this.results_data[n.group_array_index] && (0 === (h = this.results_data[n.group_array_index]).active_options && h.search_match && (c += 1), h.active_options += 1), p = n.group ? n.label : n.text, n.group && !this.group_search || (d = this.search_string_match(p, l), n.search_match = null != d, n.search_match && !n.group && (c += 1), n.search_match ? (r.length && (u = d.index, o = p.slice(0, u), e = p.slice(u, u + r.length), f = p.slice(u + r.length), n.highlighted_html = this.escape_html(o) + "<em>" + this.escape_html(e) + "</em>" + this.escape_html(f)), null != h && (h.group_match = !0)) : null != n.group_array_index && this.results_data[n.group_array_index].search_match && (n.search_match = !0)));
			return this.result_clear_highlight(), c < 1 && r.length ? (this.update_results_content(""), this.no_results(r)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
		}, n.prototype.get_search_regex = function (t) {
			var e, i;
			return i = this.search_contains ? t : "(^|\\s|\\b)" + t + "[^\\s]*", this.enable_split_word_search || this.search_contains || (i = "^" + i), e = this.case_sensitive_search ? "" : "i", new RegExp(i, e)
		}, n.prototype.search_string_match = function (t, e) {
			var i;
			return i = e.exec(t), !this.search_contains && (null != i ? i[1] : void 0) && (i.index += 1), i
		}, n.prototype.choices_count = function () {
			var t, e, i;
			if (null != this.selected_option_count)
				return this.selected_option_count;
			for (t = this.selected_option_count = 0, e = (i = this.form_field.options).length; t < e; t++)
				i[t].selected && (this.selected_option_count += 1);
			return this.selected_option_count
		}, n.prototype.choices_click = function (t) {
			if (t.preventDefault(), this.activate_field(), !this.results_showing && !this.is_disabled)
				return this.results_show()
		}, n.prototype.keydown_checker = function (t) {
			var e, i;
			switch (i = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), 8 !== i && this.pending_backstroke && this.clear_backstroke(), i) {
				case 8:
					this.backstroke_length = this.get_search_field_value().length;
					break;
				case 9:
					this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
					break;
				case 13:
				case 27:
					this.results_showing && t.preventDefault();
					break;
				case 32:
					this.disable_search && t.preventDefault();
					break;
				case 38:
					t.preventDefault(), this.keyup_arrow();
					break;
				case 40:
					t.preventDefault(), this.keydown_arrow()
			}
		}, n.prototype.keyup_checker = function (t) {
			var e, i;
			switch (i = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), i) {
				case 8:
					this.is_multiple && this.backstroke_length < 1 && 0 < this.choices_count() ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
					break;
				case 13:
					t.preventDefault(), this.results_showing && this.result_select(t);
					break;
				case 27:
					this.results_showing && this.results_hide();
					break;
				case 9:
				case 16:
				case 17:
				case 18:
				case 38:
				case 40:
				case 91:
					break;
				default:
					this.results_search()
			}
		}, n.prototype.clipboard_event_checker = function (t) {
			var e;
			if (!this.is_disabled)
				return setTimeout((e = this, function () {
					return e.results_search()
				}), 50)
		}, n.prototype.container_width = function () {
			return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px"
		}, n.prototype.include_option_in_results = function (t) {
			return !(this.is_multiple && !this.display_selected_options && t.selected) && (!(!this.display_disabled_options && t.disabled) && !t.empty)
		}, n.prototype.search_results_touchstart = function (t) {
			return this.touch_started = !0, this.search_results_mouseover(t)
		}, n.prototype.search_results_touchmove = function (t) {
			return this.touch_started = !1, this.search_results_mouseout(t)
		}, n.prototype.search_results_touchend = function (t) {
			if (this.touch_started)
				return this.search_results_mouseup(t)
		}, n.prototype.outerHTML = function (t) {
			var e;
			return t.outerHTML ? t.outerHTML : ((e = document.createElement("div")).appendChild(t), e.innerHTML)
		}, n.prototype.get_single_html = function () {
			return '<a class="chosen-single chosen-default">\n  <span>' + this.default_text + '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
		}, n.prototype.get_multi_html = function () {
			return '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' + this.default_text + '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
		}, n.prototype.get_no_results_html = function (t) {
			return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + this.escape_html(t) + "</span>\n</li>"
		}, n.browser_is_supported = function () {
			return "Microsoft Internet Explorer" === window.navigator.appName ? 8 <= document.documentMode : (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent), !0)
		}, n.default_multiple_text = "Select Some Options", n.default_single_text = "Select an Option", n.default_no_result_text = "No results match", n
	}(), (a = jQuery).fn.extend({
		chosen: function (s) {
			return i.browser_is_supported() ? this.each(function (t) {
				var e, i;
				i = (e = a(this)).data("chosen"), "destroy" !== s ? i instanceof n || e.data("chosen", new n(this, s)) : i instanceof n && i.destroy()
			}) : this
		}
	}), n = function (t) {
		function e() {
			return e.__super__.constructor.apply(this, arguments)
		}
		return function (t, e) {
			for (var i in e)
				o.call(e, i) && (t[i] = e[i]);

			function s() {
				this.constructor = t
			}
			s.prototype = e.prototype, t.prototype = new s, t.__super__ = e.prototype
		}(e, i), e.prototype.setup = function () {
			return this.form_field_jq = a(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex
		}, e.prototype.set_up_html = function () {
			var t, e;
			return (t = ["chosen-container"]).push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && t.push(this.form_field.className), this.is_rtl && t.push("chosen-rtl"), e = {
				class: t.join(" "),
				title: this.form_field.title
			}, this.form_field.id.length && (e.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = a("<div />", e), this.container.width(this.container_width()), this.is_multiple ? this.container.html(this.get_multi_html()) : this.container.html(this.get_single_html()), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
		}, e.prototype.on_ready = function () {
			return this.form_field_jq.trigger("chosen:ready", {
				chosen: this
			})
		}, e.prototype.register_observers = function () {
			var e, i, s, n, o, r, a, l, c, h, d, u, f, p, g, m, v, _, b, y, w, x, $, C;
			return this.container.on("touchstart.chosen", (e = this, function (t) {
				e.container_mousedown(t)
			})), this.container.on("touchend.chosen", (i = this, function (t) {
				i.container_mouseup(t)
			})), this.container.on("mousedown.chosen", (s = this, function (t) {
				s.container_mousedown(t)
			})), this.container.on("mouseup.chosen", (n = this, function (t) {
				n.container_mouseup(t)
			})), this.container.on("mouseenter.chosen", (o = this, function (t) {
				o.mouse_enter(t)
			})), this.container.on("mouseleave.chosen", (r = this, function (t) {
				r.mouse_leave(t)
			})), this.search_results.on("mouseup.chosen", (a = this, function (t) {
				a.search_results_mouseup(t)
			})), this.search_results.on("mouseover.chosen", (l = this, function (t) {
				l.search_results_mouseover(t)
			})), this.search_results.on("mouseout.chosen", (c = this, function (t) {
				c.search_results_mouseout(t)
			})), this.search_results.on("mousewheel.chosen DOMMouseScroll.chosen", (h = this, function (t) {
				h.search_results_mousewheel(t)
			})), this.search_results.on("touchstart.chosen", (d = this, function (t) {
				d.search_results_touchstart(t)
			})), this.search_results.on("touchmove.chosen", (u = this, function (t) {
				u.search_results_touchmove(t)
			})), this.search_results.on("touchend.chosen", (f = this, function (t) {
				f.search_results_touchend(t)
			})), this.form_field_jq.on("chosen:updated.chosen", (p = this, function (t) {
				p.results_update_field(t)
			})), this.form_field_jq.on("chosen:activate.chosen", (g = this, function (t) {
				g.activate_field(t)
			})), this.form_field_jq.on("chosen:open.chosen", (m = this, function (t) {
				m.container_mousedown(t)
			})), this.form_field_jq.on("chosen:close.chosen", (v = this, function (t) {
				v.close_field(t)
			})), this.search_field.on("blur.chosen", (_ = this, function (t) {
				_.input_blur(t)
			})), this.search_field.on("keyup.chosen", (b = this, function (t) {
				b.keyup_checker(t)
			})), this.search_field.on("keydown.chosen", (y = this, function (t) {
				y.keydown_checker(t)
			})), this.search_field.on("focus.chosen", (w = this, function (t) {
				w.input_focus(t)
			})), this.search_field.on("cut.chosen", (x = this, function (t) {
				x.clipboard_event_checker(t)
			})), this.search_field.on("paste.chosen", ($ = this, function (t) {
				$.clipboard_event_checker(t)
			})), this.is_multiple ? this.search_choices.on("click.chosen", (C = this, function (t) {
				C.choices_click(t)
			})) : this.container.on("click.chosen", function (t) {
				t.preventDefault()
			})
		}, e.prototype.destroy = function () {
			return a(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), 0 < this.form_field_label.length && this.form_field_label.off("click.chosen"), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
		}, e.prototype.search_field_disabled = function () {
			return this.is_disabled = this.form_field.disabled || this.form_field_jq.parents("fieldset").is(":disabled"), this.container.toggleClass("chosen-disabled", this.is_disabled), this.search_field[0].disabled = this.is_disabled, this.is_multiple || this.selected_item.off("focus.chosen", this.activate_field), this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.on("focus.chosen", this.activate_field)
		}, e.prototype.container_mousedown = function (t) {
			var e;
			if (!this.is_disabled)
				return !t || "mousedown" !== (e = t.type) && "touchstart" !== e || this.results_showing || t.preventDefault(), null != t && a(t.target).hasClass("search-choice-close") ? void 0 : (this.active_field ? this.is_multiple || !t || a(t.target)[0] !== this.selected_item[0] && !a(t.target).parents("a.chosen-single").length || (t.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), a(this.container[0].ownerDocument).on("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
		}, e.prototype.container_mouseup = function (t) {
			if ("ABBR" === t.target.nodeName && !this.is_disabled)
				return this.results_reset(t)
		}, e.prototype.search_results_mousewheel = function (t) {
			var e;
			if (t.originalEvent && (e = t.originalEvent.deltaY || -t.originalEvent.wheelDelta || t.originalEvent.detail), null != e)
				return t.preventDefault(), "DOMMouseScroll" === t.type && (e *= 40), this.search_results.scrollTop(e + this.search_results.scrollTop())
		}, e.prototype.blur_test = function (t) {
			if (!this.active_field && this.container.hasClass("chosen-container-active"))
				return this.close_field()
		}, e.prototype.close_field = function () {
			return a(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(), this.search_field.blur()
		}, e.prototype.activate_field = function () {
			if (!this.is_disabled)
				return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
		}, e.prototype.test_active_click = function (t) {
			var e;
			return (e = a(t.target).closest(".chosen-container")).length && this.container[0] === e[0] ? this.active_field = !0 : this.close_field()
		}, e.prototype.results_build = function () {
			return this.parsing = !0, this.selected_option_count = null, this.results_data = r.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
				first: !0
			})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
		}, e.prototype.result_do_highlight = function (t) {
			var e, i, s, n;
			if (t.length) {
				if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), (s = parseInt(this.search_results.css("maxHeight"), 10)) + (n = this.search_results.scrollTop()) <= (e = (i = this.result_highlight.position().top + this.search_results.scrollTop()) + this.result_highlight.outerHeight()))
					return this.search_results.scrollTop(0 < e - s ? e - s : 0);
				if (i < n)
					return this.search_results.scrollTop(i)
			}
		}, e.prototype.result_clear_highlight = function () {
			return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
		}, e.prototype.results_show = function () {
			return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
				chosen: this
			}), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.get_search_field_value()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
				chosen: this
			}))
		}, e.prototype.update_results_content = function (t) {
			return this.search_results.html(t)
		}, e.prototype.results_hide = function () {
			return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
				chosen: this
			})), this.results_showing = !1
		}, e.prototype.set_tab_index = function (t) {
			var e;
			if (this.form_field.tabIndex)
				return e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e
		}, e.prototype.set_label_behavior = function () {
			if (this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")), 0 < this.form_field_label.length)
				return this.form_field_label.on("click.chosen", this.label_click_handler)
		}, e.prototype.show_search_field_default = function () {
			return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
		}, e.prototype.search_results_mouseup = function (t) {
			var e;
			if ((e = a(t.target).hasClass("active-result") ? a(t.target) : a(t.target).parents(".active-result").first()).length)
				return this.result_highlight = e, this.result_select(t), this.search_field.focus()
		}, e.prototype.search_results_mouseover = function (t) {
			var e;
			if (e = a(t.target).hasClass("active-result") ? a(t.target) : a(t.target).parents(".active-result").first())
				return this.result_do_highlight(e)
		}, e.prototype.search_results_mouseout = function (t) {
			if (a(t.target).hasClass("active-result") || a(t.target).parents(".active-result").first())
				return this.result_clear_highlight()
		}, e.prototype.choice_build = function (t) {
			var e, i, s;
			return e = a("<li />", {
				class: "search-choice"
			}).html("<span>" + this.choice_label(t) + "</span>"), t.disabled ? e.addClass("search-choice-disabled") : ((i = a("<a />", {
				class: "search-choice-close",
				"data-option-array-index": t.array_index
			})).on("click.chosen", (s = this, function (t) {
				return s.choice_destroy_link_click(t)
			})), e.append(i)), this.search_container.before(e)
		}, e.prototype.choice_destroy_link_click = function (t) {
			if (t.preventDefault(), t.stopPropagation(), !this.is_disabled)
				return this.choice_destroy(a(t.target))
		}, e.prototype.choice_destroy = function (t) {
			if (this.result_deselect(t[0].getAttribute("data-option-array-index")))
				return this.active_field ? this.search_field.focus() : this.show_search_field_default(), this.is_multiple && 0 < this.choices_count() && this.get_search_field_value().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()
		}, e.prototype.results_reset = function () {
			if (this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.trigger_form_field_change(), this.active_field)
				return this.results_hide()
		}, e.prototype.results_reset_cleanup = function () {
			return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
		}, e.prototype.result_select = function (t) {
			var e, i;
			if (this.result_highlight)
				return e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
					chosen: this
				}), !1) : (this.is_multiple ? e.removeClass("active-result") : this.reset_single_select_options(), e.addClass("result-selected"), (i = this.results_data[e[0].getAttribute("data-option-array-index")]).selected = !0, this.form_field.options[i.options_index].selected = !0, this.selected_option_count = null, this.search_field.val(""), this.is_multiple ? this.choice_build(i) : this.single_set_selected_text(this.choice_label(i)), this.is_multiple && (!this.hide_results_on_select || t.metaKey || t.ctrlKey) ? this.winnow_results() : (this.results_hide(), this.show_search_field_default()), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change({
					selected: this.form_field.options[i.options_index].value
				}), this.current_selectedIndex = this.form_field.selectedIndex, t.preventDefault(), this.search_field_scale())
		}, e.prototype.single_set_selected_text = function (t) {
			return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(t)
		}, e.prototype.result_deselect = function (t) {
			var e;
			return e = this.results_data[t], !this.form_field.options[e.options_index].disabled && (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.trigger_form_field_change({
				deselected: this.form_field.options[e.options_index].value
			}), this.search_field_scale(), !0)
		}, e.prototype.single_deselect_control_build = function () {
			if (this.allow_single_deselect)
				return this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")
		}, e.prototype.get_search_field_value = function () {
			return this.search_field.val()
		}, e.prototype.get_search_text = function () {
			return a.trim(this.get_search_field_value())
		}, e.prototype.escape_html = function (t) {
			return a("<div/>").text(t).html()
		}, e.prototype.winnow_results_set_highlight = function () {
			var t, e;
			if (null != (t = (e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result")).length ? e.first() : this.search_results.find(".active-result").first()))
				return this.result_do_highlight(t)
		}, e.prototype.no_results = function (t) {
			var e;
			return e = this.get_no_results_html(t), this.search_results.append(e), this.form_field_jq.trigger("chosen:no_results", {
				chosen: this
			})
		}, e.prototype.no_results_clear = function () {
			return this.search_results.find(".no-results").remove()
		}, e.prototype.keydown_arrow = function () {
			var t;
			return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
		}, e.prototype.keyup_arrow = function () {
			var t;
			return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result")).length ? this.result_do_highlight(t.first()) : (0 < this.choices_count() && this.results_hide(), this.result_clear_highlight()) : void 0 : this.results_show()
		}, e.prototype.keydown_backstroke = function () {
			var t;
			return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last()).length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0
		}, e.prototype.clear_backstroke = function () {
			return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
		}, e.prototype.search_field_scale = function () {
			var t, e, i, s, n, o, r;
			if (this.is_multiple) {
				for (n = {
						position: "absolute",
						left: "-1000px",
						top: "-1000px",
						display: "none",
						whiteSpace: "pre"
					}, e = 0, i = (o = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"]).length; e < i; e++)
					n[s = o[e]] = this.search_field.css(s);
				return (t = a("<div />").css(n)).text(this.get_search_field_value()), a("body").append(t), r = t.width() + 25, t.remove(), this.container.is(":visible") && (r = Math.min(this.container.outerWidth() - 10, r)), this.search_field.width(r)
			}
		}, e.prototype.trigger_form_field_change = function (t) {
			return this.form_field_jq.trigger("input", t), this.form_field_jq.trigger("change", t)
		}, e
	}()
}.call(this),
	function (t) {
		"function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
	}(function (h) {
		h.extend(h.fn, {
			validate: function (t) {
				if (this.length) {
					var s = h.data(this[0], "validator");
					return s || (this.attr("novalidate", "novalidate"), s = new h.validator(t, this[0]), h.data(this[0], "validator", s), s.settings.onsubmit && (this.on("click.validate", ":submit", function (t) {
						s.settings.submitHandler && (s.submitButton = t.target), h(this).hasClass("cancel") && (s.cancelSubmit = !0), void 0 !== h(this).attr("formnovalidate") && (s.cancelSubmit = !0)
					}), this.on("submit.validate", function (i) {
						function t() {
							var t, e;
							return !s.settings.submitHandler || (s.submitButton && (t = h("<input type='hidden'/>").attr("name", s.submitButton.name).val(h(s.submitButton).val()).appendTo(s.currentForm)), e = s.settings.submitHandler.call(s, s.currentForm, i), s.submitButton && t.remove(), void 0 !== e && e)
						}
						return s.settings.debug && i.preventDefault(), s.cancelSubmit ? (s.cancelSubmit = !1, t()) : s.form() ? s.pendingRequest ? !(s.formSubmitted = !0) : t() : (s.focusInvalid(), !1)
					})), s)
				}
				t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
			},
			valid: function () {
				var t, e, i;
				return h(this[0]).is("form") ? t = this.validate().form() : (i = [], t = !0, e = h(this[0].form).validate(), this.each(function () {
					(t = e.element(this) && t) || (i = i.concat(e.errorList))
				}), e.errorList = i), t
			},
			rules: function (t, e) {
				var i, s, n, o, r, a, l = this[0];
				if (null != l && null != l.form) {
					if (t)
						switch (i = h.data(l.form, "validator").settings, s = i.rules, n = h.validator.staticRules(l), t) {
							case "add":
								h.extend(n, h.validator.normalizeRule(e)), delete n.messages, s[l.name] = n, e.messages && (i.messages[l.name] = h.extend(i.messages[l.name], e.messages));
								break;
							case "remove":
								return e ? (a = {}, h.each(e.split(/\s/), function (t, e) {
									a[e] = n[e], delete n[e], "required" === e && h(l).removeAttr("aria-required")
								}), a) : (delete s[l.name], n)
						}
					return (o = h.validator.normalizeRules(h.extend({}, h.validator.classRules(l), h.validator.attributeRules(l), h.validator.dataRules(l), h.validator.staticRules(l)), l)).required && (r = o.required, delete o.required, o = h.extend({
						required: r
					}, o), h(l).attr("aria-required", "true")), o.remote && (r = o.remote, delete o.remote, o = h.extend(o, {
						remote: r
					})), o
				}
			}
		}), h.extend(h.expr.pseudos || h.expr[":"], {
			blank: function (t) {
				return !h.trim("" + h(t).val())
			},
			filled: function (t) {
				var e = h(t).val();
				return null !== e && !!h.trim("" + e)
			},
			unchecked: function (t) {
				return !h(t).prop("checked")
			}
		}), h.validator = function (t, e) {
			this.settings = h.extend(!0, {}, h.validator.defaults, t), this.currentForm = e, this.init()
		}, h.validator.format = function (i, t) {
			return 1 === arguments.length ? function () {
				var t = h.makeArray(arguments);
				return t.unshift(i), h.validator.format.apply(this, t)
			} : (void 0 === t || (2 < arguments.length && t.constructor !== Array && (t = h.makeArray(arguments).slice(1)), t.constructor !== Array && (t = [t]), h.each(t, function (t, e) {
				i = i.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
					return e
				})
			})), i)
		}, h.extend(h.validator, {
			defaults: {
				messages: {},
				groups: {},
				rules: {},
				errorClass: "error",
				pendingClass: "pending",
				validClass: "valid",
				errorElement: "label",
				focusCleanup: !1,
				focusInvalid: !0,
				errorContainer: h([]),
				errorLabelContainer: h([]),
				onsubmit: !0,
				ignore: ":hidden",
				ignoreTitle: !1,
				onfocusin: function (t) {
					this.lastActive = t, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(t)))
				},
				onfocusout: function (t) {
					this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
				},
				onkeyup: function (t, e) {
					9 === e.which && "" === this.elementValue(t) || -1 !== h.inArray(e.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
				},
				onclick: function (t) {
					t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
				},
				highlight: function (t, e, i) {
					"radio" === t.type ? this.findByName(t.name).addClass(e).removeClass(i) : h(t).addClass(e).removeClass(i)
				},
				unhighlight: function (t, e, i) {
					"radio" === t.type ? this.findByName(t.name).removeClass(e).addClass(i) : h(t).removeClass(e).addClass(i)
				}
			},
			setDefaults: function (t) {
				h.extend(h.validator.defaults, t)
			},
			messages: {
				required: "This field is required.",
				remote: "Please fix this field.",
				email: "Please enter a valid email address.",
				url: "Please enter a valid URL.",
				date: "Please enter a valid date.",
				dateISO: "Please enter a valid date (ISO).",
				number: "Please enter a valid number.",
				digits: "Please enter only digits.",
				equalTo: "Please enter the same value again.",
				maxlength: h.validator.format("Please enter no more than {0} characters."),
				minlength: h.validator.format("Please enter at least {0} characters."),
				rangelength: h.validator.format("Please enter a value between {0} and {1} characters long."),
				range: h.validator.format("Please enter a value between {0} and {1}."),
				max: h.validator.format("Please enter a value less than or equal to {0}."),
				min: h.validator.format("Please enter a value greater than or equal to {0}."),
				step: h.validator.format("Please enter a multiple of {0}.")
			},
			autoCreateRanges: !1,
			prototype: {
				init: function () {
					function t(t) {
						!this.form && this.hasAttribute("contenteditable") && (this.form = h(this).closest("form")[0]);
						var e = h.data(this.form, "validator"),
							i = "on" + t.type.replace(/^validate/, ""),
							s = e.settings;
						s[i] && !h(this).is(s.ignore) && s[i].call(e, this, t)
					}
					this.labelContainer = h(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || h(this.currentForm), this.containers = h(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
					var i, s = this.groups = {};
					h.each(this.settings.groups, function (i, t) {
						"string" == typeof t && (t = t.split(/\s/)), h.each(t, function (t, e) {
							s[e] = i
						})
					}), i = this.settings.rules, h.each(i, function (t, e) {
						i[t] = h.validator.normalizeRule(e)
					}), h(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t), this.settings.invalidHandler && h(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), h(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
				},
				form: function () {
					return this.checkForm(), h.extend(this.submitted, this.errorMap), this.invalid = h.extend({}, this.errorMap), this.valid() || h(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
				},
				checkForm: function () {
					this.prepareForm();
					for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++)
						this.check(e[t]);
					return this.valid()
				},
				element: function (t) {
					var e, i, s = this.clean(t),
						n = this.validationTargetFor(s),
						o = this,
						r = !0;
					return void 0 === n ? delete this.invalid[s.name] : (this.prepareElement(n), this.currentElements = h(n), (i = this.groups[n.name]) && h.each(this.groups, function (t, e) {
						e === i && t !== n.name && ((s = o.validationTargetFor(o.clean(o.findByName(t)))) && s.name in o.invalid && (o.currentElements.push(s), r = o.check(s) && r))
					}), e = !1 !== this.check(n), r = r && e, this.invalid[n.name] = !e, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), h(t).attr("aria-invalid", !e)), r
				},
				showErrors: function (e) {
					if (e) {
						var i = this;
						h.extend(this.errorMap, e), this.errorList = h.map(this.errorMap, function (t, e) {
							return {
								message: t,
								element: i.findByName(e)[0]
							}
						}), this.successList = h.grep(this.successList, function (t) {
							return !(t.name in e)
						})
					}
					this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
				},
				resetForm: function () {
					h.fn.resetForm && h(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
					var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
					this.resetElements(t)
				},
				resetElements: function (t) {
					var e;
					if (this.settings.unhighlight)
						for (e = 0; t[e]; e++)
							this.settings.unhighlight.call(this, t[e], this.settings.errorClass, ""), this.findByName(t[e].name).removeClass(this.settings.validClass);
					else t.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
				},
				numberOfInvalids: function () {
					return this.objectLength(this.invalid)
				},
				objectLength: function (t) {
					var e, i = 0;
					for (e in t)
						t[e] && i++;
					return i
				},
				hideErrors: function () {
					this.hideThese(this.toHide)
				},
				hideThese: function (t) {
					t.not(this.containers).text(""), this.addWrapper(t).hide()
				},
				valid: function () {
					return 0 === this.size()
				},
				size: function () {
					return this.errorList.length
				},
				focusInvalid: function () {
					if (this.settings.focusInvalid)
						try {
							h(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
						} catch (t) {}
				},
				findLastActive: function () {
					var e = this.lastActive;
					return e && 1 === h.grep(this.errorList, function (t) {
						return t.element.name === e.name
					}).length && e
				},
				elements: function () {
					var e = this,
						i = {};
					return h(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
						var t = this.name || h(this).attr("name");
						return !t && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = h(this).closest("form")[0]), !(t in i || !e.objectLength(h(this).rules()) || (i[t] = !0, 0))
					})
				},
				clean: function (t) {
					return h(t)[0]
				},
				errors: function () {
					var t = this.settings.errorClass.split(" ").join(".");
					return h(this.settings.errorElement + "." + t, this.errorContext)
				},
				resetInternals: function () {
					this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = h([]), this.toHide = h([])
				},
				reset: function () {
					this.resetInternals(), this.currentElements = h([])
				},
				prepareForm: function () {
					this.reset(), this.toHide = this.errors().add(this.containers)
				},
				prepareElement: function (t) {
					this.reset(), this.toHide = this.errorsFor(t)
				},
				elementValue: function (t) {
					var e, i, s = h(t),
						n = t.type;
					return "radio" === n || "checkbox" === n ? this.findByName(t.name).filter(":checked").val() : "number" === n && void 0 !== t.validity ? t.validity.badInput ? "NaN" : s.val() : (e = t.hasAttribute("contenteditable") ? s.text() : s.val(), "file" === n ? "C:\\fakepath\\" === e.substr(0, 12) ? e.substr(12) : 0 <= (i = e.lastIndexOf("/")) ? e.substr(i + 1) : 0 <= (i = e.lastIndexOf("\\")) ? e.substr(i + 1) : e : "string" == typeof e ? e.replace(/\r/g, "") : e)
				},
				check: function (e) {
					e = this.validationTargetFor(this.clean(e));
					var t, i, s, n = h(e).rules(),
						o = h.map(n, function (t, e) {
							return e
						}).length,
						r = !1,
						a = this.elementValue(e);
					if ("function" == typeof n.normalizer) {
						if ("string" != typeof (a = n.normalizer.call(e, a)))
							throw new TypeError("The normalizer should return a string value.");
						delete n.normalizer
					}
					for (i in n) {
						s = {
							method: i,
							parameters: n[i]
						};
						try {
							if ("dependency-mismatch" === (t = h.validator.methods[i].call(this, a, e, s.parameters)) && 1 === o) {
								r = !0;
								continue
							}
							if (r = !1, "pending" === t)
								return void(this.toHide = this.toHide.not(this.errorsFor(e)));
							if (!t)
								return this.formatAndAdd(e, s), !1
						} catch (t) {
							throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + s.method + "' method.", t), t instanceof TypeError && (t.message += ".  Exception occurred when checking element " + e.id + ", check the '" + s.method + "' method."), t
						}
					}
					if (!r)
						return this.objectLength(n) && this.successList.push(e), !0
				},
				customDataMessage: function (t, e) {
					return h(t).data("msg" + e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()) || h(t).data("msg")
				},
				customMessage: function (t, e) {
					var i = this.settings.messages[t];
					return i && (i.constructor === String ? i : i[e])
				},
				findDefined: function () {
					for (var t = 0; t < arguments.length; t++)
						if (void 0 !== arguments[t])
							return arguments[t]
				},
				defaultMessage: function (t, e) {
					"string" == typeof e && (e = {
						method: e
					});
					var i = this.findDefined(this.customMessage(t.name, e.method), this.customDataMessage(t, e.method), !this.settings.ignoreTitle && t.title || void 0, h.validator.messages[e.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
						s = /\$?\{(\d+)\}/g;
					return "function" == typeof i ? i = i.call(this, e.parameters, t) : s.test(i) && (i = h.validator.format(i.replace(s, "{$1}"), e.parameters)), i
				},
				formatAndAdd: function (t, e) {
					var i = this.defaultMessage(t, e);
					this.errorList.push({
						message: i,
						element: t,
						method: e.method
					}), this.errorMap[t.name] = i, this.submitted[t.name] = i
				},
				addWrapper: function (t) {
					return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
				},
				defaultShowErrors: function () {
					var t, e, i;
					for (t = 0; this.errorList[t]; t++)
						i = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
					if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
						for (t = 0; this.successList[t]; t++)
							this.showLabel(this.successList[t]);
					if (this.settings.unhighlight)
						for (t = 0, e = this.validElements(); e[t]; t++)
							this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
					this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
				},
				validElements: function () {
					return this.currentElements.not(this.invalidElements())
				},
				invalidElements: function () {
					return h(this.errorList).map(function () {
						return this.element
					})
				},
				showLabel: function (t, e) {
					var i, s, n, o, r = this.errorsFor(t),
						a = this.idOrName(t),
						l = h(t).attr("aria-describedby");
					r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(e)) : (i = r = h("<" + this.settings.errorElement + ">").attr("id", a + "-error").addClass(this.settings.errorClass).html(e || ""), this.settings.wrapper && (i = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(i) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, i, h(t)) : i.insertAfter(t), r.is("label") ? r.attr("for", a) : 0 === r.parents("label[for='" + this.escapeCssMeta(a) + "']").length && (n = r.attr("id"), l ? l.match(new RegExp("\\b" + this.escapeCssMeta(n) + "\\b")) || (l += " " + n) : l = n, h(t).attr("aria-describedby", l), (s = this.groups[t.name]) && (o = this, h.each(o.groups, function (t, e) {
						e === s && h("[name='" + o.escapeCssMeta(t) + "']", o.currentForm).attr("aria-describedby", r.attr("id"))
					})))), !e && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t)), this.toShow = this.toShow.add(r)
				},
				errorsFor: function (t) {
					var e = this.escapeCssMeta(this.idOrName(t)),
						i = h(t).attr("aria-describedby"),
						s = "label[for='" + e + "'], label[for='" + e + "'] *";
					return i && (s = s + ", #" + this.escapeCssMeta(i).replace(/\s+/g, ", #")), this.errors().filter(s)
				},
				escapeCssMeta: function (t) {
					return t.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
				},
				idOrName: function (t) {
					return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
				},
				validationTargetFor: function (t) {
					return this.checkable(t) && (t = this.findByName(t.name)), h(t).not(this.settings.ignore)[0]
				},
				checkable: function (t) {
					return /radio|checkbox/i.test(t.type)
				},
				findByName: function (t) {
					return h(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
				},
				getLength: function (t, e) {
					switch (e.nodeName.toLowerCase()) {
						case "select":
							return h("option:selected", e).length;
						case "input":
							if (this.checkable(e))
								return this.findByName(e.name).filter(":checked").length
					}
					return t.length
				},
				depend: function (t, e) {
					return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
				},
				dependTypes: {
					boolean: function (t) {
						return t
					},
					string: function (t, e) {
						return !!h(t, e.form).length
					},
					function: function (t, e) {
						return t(e)
					}
				},
				optional: function (t) {
					var e = this.elementValue(t);
					return !h.validator.methods.required.call(this, e, t) && "dependency-mismatch"
				},
				startRequest: function (t) {
					this.pending[t.name] || (this.pendingRequest++, h(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
				},
				stopRequest: function (t, e) {
					this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], h(t).removeClass(this.settings.pendingClass), e && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (h(this.currentForm).submit(), this.formSubmitted = !1) : !e && 0 === this.pendingRequest && this.formSubmitted && (h(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
				},
				previousValue: function (t, e) {
					return e = "string" == typeof e && e || "remote", h.data(t, "previousValue") || h.data(t, "previousValue", {
						old: null,
						valid: !0,
						message: this.defaultMessage(t, {
							method: e
						})
					})
				},
				destroy: function () {
					this.resetForm(), h(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
				}
			},
			classRuleSettings: {
				required: {
					required: !0
				},
				email: {
					email: !0
				},
				url: {
					url: !0
				},
				date: {
					date: !0
				},
				dateISO: {
					dateISO: !0
				},
				number: {
					number: !0
				},
				digits: {
					digits: !0
				},
				creditcard: {
					creditcard: !0
				}
			},
			addClassRules: function (t, e) {
				t.constructor === String ? this.classRuleSettings[t] = e : h.extend(this.classRuleSettings, t)
			},
			classRules: function (t) {
				var e = {},
					i = h(t).attr("class");
				return i && h.each(i.split(" "), function () {
					this in h.validator.classRuleSettings && h.extend(e, h.validator.classRuleSettings[this])
				}), e
			},
			normalizeAttributeRule: function (t, e, i, s) {
				/min|max|step/.test(i) && (null === e || /number|range|text/.test(e)) && (s = Number(s), isNaN(s) && (s = void 0)), s || 0 === s ? t[i] = s : e === i && "range" !== e && (t[i] = !0)
			},
			attributeRules: function (t) {
				var e, i, s = {},
					n = h(t),
					o = t.getAttribute("type");
				for (e in h.validator.methods)
					"required" === e ? ("" === (i = t.getAttribute(e)) && (i = !0), i = !!i) : i = n.attr(e), this.normalizeAttributeRule(s, o, e, i);
				return s.maxlength && /-1|2147483647|524288/.test(s.maxlength) && delete s.maxlength, s
			},
			dataRules: function (t) {
				var e, i, s = {},
					n = h(t),
					o = t.getAttribute("type");
				for (e in h.validator.methods)
					i = n.data("rule" + e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()), this.normalizeAttributeRule(s, o, e, i);
				return s
			},
			staticRules: function (t) {
				var e = {},
					i = h.data(t.form, "validator");
				return i.settings.rules && (e = h.validator.normalizeRule(i.settings.rules[t.name]) || {}), e
			},
			normalizeRules: function (s, n) {
				return h.each(s, function (t, e) {
					if (!1 !== e) {
						if (e.param || e.depends) {
							var i = !0;
							switch (typeof e.depends) {
								case "string":
									i = !!h(e.depends, n.form).length;
									break;
								case "function":
									i = e.depends.call(n, n)
							}
							i ? s[t] = void 0 === e.param || e.param : (h.data(n.form, "validator").resetElements(h(n)), delete s[t])
						}
					} else delete s[t]
				}), h.each(s, function (t, e) {
					s[t] = h.isFunction(e) && "normalizer" !== t ? e(n) : e
				}), h.each(["minlength", "maxlength"], function () {
					s[this] && (s[this] = Number(s[this]))
				}), h.each(["rangelength", "range"], function () {
					var t;
					s[this] && (h.isArray(s[this]) ? s[this] = [Number(s[this][0]), Number(s[this][1])] : "string" == typeof s[this] && (t = s[this].replace(/[\[\]]/g, "").split(/[\s,]+/), s[this] = [Number(t[0]), Number(t[1])]))
				}), h.validator.autoCreateRanges && (null != s.min && null != s.max && (s.range = [s.min, s.max], delete s.min, delete s.max), null != s.minlength && null != s.maxlength && (s.rangelength = [s.minlength, s.maxlength], delete s.minlength, delete s.maxlength)), s
			},
			normalizeRule: function (t) {
				if ("string" == typeof t) {
					var e = {};
					h.each(t.split(/\s/), function () {
						e[this] = !0
					}), t = e
				}
				return t
			},
			addMethod: function (t, e, i) {
				h.validator.methods[t] = e, h.validator.messages[t] = void 0 !== i ? i : h.validator.messages[t], e.length < 3 && h.validator.addClassRules(t, h.validator.normalizeRule(t))
			},
			methods: {
				required: function (t, e, i) {
					if (!this.depend(i, e))
						return "dependency-mismatch";
					if ("select" === e.nodeName.toLowerCase()) {
						var s = h(e).val();
						return s && 0 < s.length
					}
					return this.checkable(e) ? 0 < this.getLength(t, e) : 0 < t.length
				},
				email: function (t, e) {
					return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
				},
				url: function (t, e) {
					return this.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(t)
				},
				date: function (t, e) {
					return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
				},
				dateISO: function (t, e) {
					return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
				},
				number: function (t, e) {
					return this.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
				},
				digits: function (t, e) {
					return this.optional(e) || /^\d+$/.test(t)
				},
				minlength: function (t, e, i) {
					var s = h.isArray(t) ? t.length : this.getLength(t, e);
					return this.optional(e) || i <= s
				},
				maxlength: function (t, e, i) {
					var s = h.isArray(t) ? t.length : this.getLength(t, e);
					return this.optional(e) || s <= i
				},
				rangelength: function (t, e, i) {
					var s = h.isArray(t) ? t.length : this.getLength(t, e);
					return this.optional(e) || s >= i[0] && s <= i[1]
				},
				min: function (t, e, i) {
					return this.optional(e) || i <= t
				},
				max: function (t, e, i) {
					return this.optional(e) || t <= i
				},
				range: function (t, e, i) {
					return this.optional(e) || t >= i[0] && t <= i[1]
				},
				step: function (t, e, i) {
					var s, n = h(e).attr("type"),
						o = "Step attribute on input type " + n + " is not supported.",
						r = new RegExp("\\b" + n + "\\b"),
						a = function (t) {
							var e = ("" + t).match(/(?:\.(\d+))?$/);
							return e && e[1] ? e[1].length : 0
						},
						l = function (t) {
							return Math.round(t * Math.pow(10, s))
						},
						c = !0;
					if (n && !r.test(["text", "number", "range"].join()))
						throw new Error(o);
					return s = a(i), (a(t) > s || l(t) % l(i) != 0) && (c = !1), this.optional(e) || c
				},
				equalTo: function (t, e, i) {
					var s = h(i);
					return this.settings.onfocusout && s.not(".validate-equalTo-blur").length && s.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
						h(e).valid()
					}), t === s.val()
				},
				remote: function (o, r, t, a) {
					if (this.optional(r))
						return "dependency-mismatch";
					a = "string" == typeof a && a || "remote";
					var l, e, i, c = this.previousValue(r, a);
					return this.settings.messages[r.name] || (this.settings.messages[r.name] = {}), c.originalMessage = c.originalMessage || this.settings.messages[r.name][a], this.settings.messages[r.name][a] = c.message, t = "string" == typeof t && {
						url: t
					} || t, i = h.param(h.extend({
						data: o
					}, t.data)), c.old === i ? c.valid : (c.old = i, (l = this).startRequest(r), (e = {})[r.name] = o, h.ajax(h.extend(!0, {
						mode: "abort",
						port: "validate" + r.name,
						dataType: "json",
						data: e,
						context: l.currentForm,
						success: function (t) {
							var e, i, s, n = !0 === t || "true" === t;
							l.settings.messages[r.name][a] = c.originalMessage, n ? (s = l.formSubmitted, l.resetInternals(), l.toHide = l.errorsFor(r), l.formSubmitted = s, l.successList.push(r), l.invalid[r.name] = !1, l.showErrors()) : (e = {}, i = t || l.defaultMessage(r, {
								method: a,
								parameters: o
							}), e[r.name] = c.message = i, l.invalid[r.name] = !0, l.showErrors(e)), c.valid = n, l.stopRequest(r, n)
						}
					}, t)), "pending")
				}
			}
		});
		var s, n = {};
		return h.ajaxPrefilter ? h.ajaxPrefilter(function (t, e, i) {
			var s = t.port;
			"abort" === t.mode && (n[s] && n[s].abort(), n[s] = i)
		}) : (s = h.ajax, h.ajax = function (t) {
			var e = ("mode" in t ? t : h.ajaxSettings).mode,
				i = ("port" in t ? t : h.ajaxSettings).port;
			return "abort" === e ? (n[i] && n[i].abort(), n[i] = s.apply(this, arguments), n[i]) : s.apply(this, arguments)
		}), h
	}),
	function (t) {
		"function" == typeof define && define.amd ? define(["jquery", "../jquery.validate"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
	}(function (t) {
		return t.extend(t.validator.messages, {
			required: "Это поле необходимо заполнить.",
			remote: "Пожалуйста, введите правильное значение.",
			email: "Пожалуйста, введите корректный адрес электронной почты.",
			url: "Пожалуйста, введите корректный URL.",
			date: "Пожалуйста, введите корректную дату.",
			dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
			number: "Пожалуйста, введите число.",
			digits: "Пожалуйста, вводите только цифры.",
			creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
			equalTo: "Пожалуйста, введите такое же значение ещё раз.",
			extension: "Пожалуйста, выберите файл с правильным расширением.",
			maxlength: t.validator.format("Пожалуйста, введите не больше {0} символов."),
			minlength: t.validator.format("Пожалуйста, введите не меньше {0} символов."),
			rangelength: t.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
			range: t.validator.format("Пожалуйста, введите число от {0} до {1}."),
			max: t.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
			min: t.validator.format("Пожалуйста, введите число, большее или равное {0}.")
		}), t
	}),
	function (t) {
		"function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
	}(function (C) {
		var s, t = navigator.userAgent,
			k = /iphone/i.test(t),
			n = /chrome/i.test(t),
			T = /android/i.test(t);
		C.mask = {
			definitions: {
				9: "[0-9]",
				a: "[A-Za-z]",
				"*": "[A-Za-z0-9]"
			},
			autoclear: !0,
			dataName: "rawMaskFn",
			placeholder: "_"
		}, C.fn.extend({
			caret: function (t, e) {
				var i;
				if (0 !== this.length && !this.is(":hidden"))
					return "number" == typeof t ? (e = "number" == typeof e ? e : t, this.each(function () {
						this.setSelectionRange ? this.setSelectionRange(t, e) : this.createTextRange && ((i = this.createTextRange()).collapse(!0), i.moveEnd("character", e), i.moveStart("character", t), i.select())
					})) : (this[0].setSelectionRange ? (t = this[0].selectionStart, e = this[0].selectionEnd) : document.selection && document.selection.createRange && (i = document.selection.createRange(), t = 0 - i.duplicate().moveStart("character", -1e5), e = t + i.text.length), {
						begin: t,
						end: e
					})
			},
			unmask: function () {
				return this.trigger("unmask")
			},
			mask: function (e, v) {
				var i, _, b, y, w, x, $;
				if (!e && 0 < this.length) {
					var t = C(this[0]).data(C.mask.dataName);
					return t ? t() : void 0
				}
				return v = C.extend({
					autoclear: C.mask.autoclear,
					placeholder: C.mask.placeholder,
					completed: null
				}, v), i = C.mask.definitions, _ = [], b = x = e.length, y = null, C.each(e.split(""), function (t, e) {
					"?" == e ? (x--, b = t) : i[e] ? (_.push(new RegExp(i[e])), null === y && (y = _.length - 1), t < b && (w = _.length - 1)) : _.push(null)
				}), this.trigger("unmask").each(function () {
					function r() {
						if (v.completed) {
							for (var t = y; t <= w; t++)
								if (_[t] && p[t] === a(t))
									return;
							v.completed.call(f)
						}
					}

					function a(t) {
						return v.placeholder.charAt(t < v.placeholder.length ? t : 0)
					}

					function l(t) {
						for (; ++t < x && !_[t];);
						return t
					}

					function c(t, e) {
						var i, s;
						if (!(t < 0)) {
							for (i = t, s = l(e); i < x; i++)
								if (_[i]) {
									if (!(s < x && _[i].test(p[s])))
										break;
									p[i] = p[s], p[s] = a(s), s = l(s)
								}
							d(), f.caret(Math.max(y, t))
						}
					}

					function o() {
						u(), f.val() != m && f.change()
					}

					function h(t, e) {
						var i;
						for (i = t; i < e && i < x; i++)
							_[i] && (p[i] = a(i))
					}

					function d() {
						f.val(p.join(""))
					}

					function u(t) {
						var e, i, s, n = f.val(),
							o = -1;
						for (s = e = 0; e < x; e++)
							if (_[e]) {
								for (p[e] = a(e); s++ < n.length;)
									if (i = n.charAt(s - 1), _[e].test(i)) {
										p[e] = i, o = e;
										break
									}
								if (s > n.length) {
									h(e + 1, x);
									break
								}
							} else p[e] === n.charAt(s) && s++, e < b && (o = e);
						return t ? d() : o + 1 < b ? v.autoclear || p.join("") === g ? (f.val() && f.val(""), h(0, x)) : d() : (d(), f.val(f.val().substring(0, o + 1))), b ? e : y
					}
					var f = C(this),
						p = C.map(e.split(""), function (t, e) {
							return "?" != t ? i[t] ? a(e) : t : void 0
						}),
						g = p.join(""),
						m = f.val();
					f.data(C.mask.dataName, function () {
						return C.map(p, function (t, e) {
							return _[e] && t != a(e) ? t : null
						}).join("")
					}), f.one("unmask", function () {
						f.off(".mask").removeData(C.mask.dataName)
					}).on("focus.mask", function () {
						var t;
						f.prop("readonly") || (clearTimeout(s), m = f.val(), t = u(), s = setTimeout(function () {
							f.get(0) === document.activeElement && (d(), t == e.replace("?", "").length ? f.caret(0, t) : f.caret(t))
						}, 10))
					}).on("blur.mask", o).on("keydown.mask", function (t) {
						if (!f.prop("readonly")) {
							var e, i, s, n = t.which || t.keyCode;
							$ = f.val(), 8 === n || 46 === n || k && 127 === n ? (i = (e = f.caret()).begin, (s = e.end) - i == 0 && (i = 46 !== n ? function (t) {
								for (; 0 <= --t && !_[t];);
								return t
							}(i) : s = l(i - 1), s = 46 === n ? l(s) : s), h(i, s), c(i, s - 1), t.preventDefault()) : 13 === n ? o.call(this, t) : 27 === n && (f.val(m), f.caret(0, u()), t.preventDefault())
						}
					}).on("keypress.mask", function (t) {
						if (!f.prop("readonly")) {
							var e, i, s, n = t.which || t.keyCode,
								o = f.caret();
							t.ctrlKey || t.altKey || t.metaKey || n < 32 || !n || 13 === n || (o.end - o.begin != 0 && (h(o.begin, o.end), c(o.begin, o.end - 1)), (e = l(o.begin - 1)) < x && (i = String.fromCharCode(n), _[e].test(i)) && (function (t) {
								var e, i, s, n;
								for (i = a(e = t); e < x; e++)
									if (_[e]) {
										if (s = l(e), n = p[e], p[e] = i, !(s < x && _[s].test(n)))
											break;
										i = n
									}
							}(e), p[e] = i, d(), s = l(e), T ? setTimeout(function () {
								C.proxy(C.fn.caret, f, s)()
							}, 0) : f.caret(s), o.begin <= w && r()), t.preventDefault())
						}
					}).on("input.mask paste.mask", function () {
						f.prop("readonly") || setTimeout(function () {
							var t = u(!0);
							f.caret(t), r()
						}, 0)
					}), n && T && f.off("input.mask").on("input.mask", function () {
						var t = f.val(),
							e = f.caret();
						if ($ && $.length && $.length > t.length) {
							for (u(!0); 0 < e.begin && !_[e.begin - 1];)
								e.begin--;
							if (0 === e.begin)
								for (; e.begin < y && !_[e.begin];)
									e.begin++;
							f.caret(e.begin, e.begin)
						} else {
							for (u(!0); e.begin < x && !_[e.begin];)
								e.begin++;
							f.caret(e.begin, e.begin)
						}
						r()
					}), u()
				})
			}
		})
	}), $(window).load(function () {
		lazyLoad()
	}), $(document).ready(function () {
		sidePanel()
	}),
	function (l) {
		"use strict";
		var c, e, s, n, o = "dotdotdot";
		l[o] && "3.2.2" < l[o].version || (l[o] = function (t, e) {
			this.$dot = t, this.api = ["getInstance", "truncate", "restore", "destroy", "watch", "unwatch"], this.opts = e;
			var i = this.$dot.data(o);
			return i && i.destroy(), this.init(), this.truncate(), this.opts.watch && this.watch(), this
		}, l[o].version = "3.2.2", l[o].uniqueId = 0, l[o].defaults = {
			ellipsis: "… ",
			callback: function (t) {},
			truncate: "word",
			tolerance: 0,
			keep: null,
			watch: "window",
			height: null
		}, l[o].prototype = {
			init: function () {
				this.watchTimeout = null, this.watchInterval = null, this.uniqueId = l[o].uniqueId++, this.originalStyle = this.$dot.attr("style") || "", this.originalContent = this._getOriginalContent(), "break-word" !== this.$dot.css("word-wrap") && this.$dot.css("word-wrap", "break-word"), "nowrap" === this.$dot.css("white-space") && this.$dot.css("white-space", "normal"), null === this.opts.height && (this.opts.height = this._getMaxHeight()), "string" == typeof this.opts.ellipsis && (this.opts.ellipsis = document.createTextNode(this.opts.ellipsis))
			},
			getInstance: function () {
				return this
			},
			truncate: function () {
				this.$inner = this.$dot.wrapInner("<div />").children().css({
					display: "block",
					height: "auto",
					width: "auto",
					border: "none",
					padding: 0,
					margin: 0
				}), this.$inner.empty().append(this.originalContent.clone(!0)), this.maxHeight = this._getMaxHeight();
				var t = !1;
				return this._fits() || (t = !0, this._truncateToNode(this.$inner[0])), this.$dot[t ? "addClass" : "removeClass"](c.truncated), this.$inner.replaceWith(this.$inner.contents()), this.$inner = null, this.opts.callback.call(this.$dot[0], t), t
			},
			restore: function () {
				this.unwatch(), this.$dot.empty().append(this.originalContent).attr("style", this.originalStyle).removeClass(c.truncated)
			},
			destroy: function () {
				this.restore(), this.$dot.data(o, null)
			},
			watch: function () {
				var e = this;
				this.unwatch();
				var i = {};
				"window" == this.opts.watch ? n.on(s.resize + e.uniqueId, function (t) {
					e.watchTimeout && clearTimeout(e.watchTimeout), e.watchTimeout = setTimeout(function () {
						i = e._watchSizes(i, n, "width", "height")
					}, 100)
				}) : this.watchInterval = setInterval(function () {
					i = e._watchSizes(i, e.$dot, "innerWidth", "innerHeight")
				}, 500)
			},
			unwatch: function () {
				n.off(s.resize + this.uniqueId), this.watchInterval && clearInterval(this.watchInterval), this.watchTimeout && clearTimeout(this.watchTimeout)
			},
			_api: function () {
				var i = this,
					s = {};
				return l.each(this.api, function (t) {
					var e = this;
					s[e] = function () {
						var t = i[e].apply(i, arguments);
						return void 0 === t ? s : t
					}
				}), s
			},
			_truncateToNode: function (t) {
				var i = [],
					s = [];
				if (l(t).contents().each(function () {
						var t = l(this);
						if (!t.hasClass(c.keep)) {
							var e = document.createComment("");
							t.replaceWith(e), s.push(this), i.push(e)
						}
					}), s.length) {
					for (var e = 0; e < s.length; e++) {
						l(i[e]).replaceWith(s[e]), l(s[e]).append(this.opts.ellipsis);
						var n = this._fits();
						if (l(this.opts.ellipsis, s[e]).remove(), !n) {
							if ("node" == this.opts.truncate && 1 < e)
								return void l(s[e - 2]).remove();
							break
						}
					}
					for (var o = e; o < i.length; o++)
						l(i[o]).remove();
					var r = s[Math.max(0, Math.min(e, s.length - 1))];
					if (1 == r.nodeType) {
						var a = l("<" + r.nodeName + " />");
						a.append(this.opts.ellipsis), l(r).replaceWith(a), this._fits() ? a.replaceWith(r) : (a.remove(), r = s[Math.max(0, e - 1)])
					}
					1 == r.nodeType ? this._truncateToNode(r) : this._truncateToWord(r)
				}
			},
			_truncateToWord: function (t) {
				for (var e = t, i = this, s = this.__getTextContent(e), n = -1 !== s.indexOf(" ") ? " " : "?", o = s.split(n), r = "", a = o.length; 0 <= a; a--)
					if (r = o.slice(0, a).join(n), i.__setTextContent(e, i._addEllipsis(r)), i._fits()) {
						"letter" == i.opts.truncate && (i.__setTextContent(e, o.slice(0, a + 1).join(n)), i._truncateToLetter(e));
						break
					}
			},
			_truncateToLetter: function (t) {
				for (var e = this.__getTextContent(t).split(""), i = "", s = e.length; 0 <= s && (!(i = e.slice(0, s).join("")).length || (this.__setTextContent(t, this._addEllipsis(i)), !this._fits())); s--);
			},
			_fits: function () {
				return this.$inner.innerHeight() <= this.maxHeight + this.opts.tolerance
			},
			_addEllipsis: function (t) {
				for (var e = [" ", "?", ",", ";", ".", "!", "?"]; - 1 < l.inArray(t.slice(-1), e);)
					t = t.slice(0, -1);
				return t += this.__getTextContent(this.opts.ellipsis)
			},
			_getOriginalContent: function () {
				var e = this;
				return this.$dot.find("script, style").addClass(c.keep), this.opts.keep && this.$dot.find(this.opts.keep).addClass(c.keep), this.$dot.find("*").not("." + c.keep).add(this.$dot).contents().each(function () {
					var t = l(this);
					if (3 == this.nodeType) {
						if ("" == l.trim(e.__getTextContent(this))) {
							if (t.parent().is("table, thead, tbody, tfoot, tr, dl, ul, ol, video"))
								return void t.remove();
							if (t.prev().is("div, p, table, td, td, dt, dd, li"))
								return void t.remove();
							if (t.next().is("div, p, table, td, td, dt, dd, li"))
								return void t.remove();
							if (!t.prev().length)
								return void t.remove();
							if (!t.next().length)
								return void t.remove()
						}
					} else 8 == this.nodeType && t.remove()
				}), this.$dot.contents()
			},
			_getMaxHeight: function () {
				if ("number" == typeof this.opts.height)
					return this.opts.height;
				for (var t = ["maxHeight", "height"], e = 0, i = 0; i < t.length; i++)
					if ("px" == (e = window.getComputedStyle(this.$dot[0])[t[i]]).slice(-2)) {
						e = parseFloat(e);
						break
					}
				t = [];
				switch (this.$dot.css("boxSizing")) {
					case "border-box":
						t.push("borderTopWidth"), t.push("borderBottomWidth");
					case "padding-box":
						t.push("paddingTop"), t.push("paddingBottom")
				}
				for (i = 0; i < t.length; i++) {
					var s = window.getComputedStyle(this.$dot[0])[t[i]];
					"px" == s.slice(-2) && (e -= parseFloat(s))
				}
				return Math.max(e, 0)
			},
			_watchSizes: function (t, e, i, s) {
				if (this.$dot.is(":visible")) {
					var n = {
						width: e[i](),
						height: e[s]()
					};
					return t.width == n.width && t.height == n.height || this.truncate(), n
				}
				return t
			},
			__getTextContent: function (t) {
				for (var e = ["nodeValue", "textContent", "innerText"], i = 0; i < e.length; i++)
					if ("string" == typeof t[e[i]])
						return t[e[i]];
				return ""
			},
			__setTextContent: function (t, e) {
				for (var i = ["nodeValue", "textContent", "innerText"], s = 0; s < i.length; s++)
					t[i[s]] = e
			}
		}, l.fn[o] = function (t) {
			return function () {
				n = l(window);
				c = {};
				e = {};
				s = {};
				l.each([c, e, s], function (t, s) {
					s.add = function (t) {
						t = t.split(" ");
						for (var e = 0, i = t.length; e < i; e++)
							s[t[e]] = s.ddd(t[e])
					}
				});
				c.ddd = function (t) {
					return "ddd-" + t
				};
				c.add("truncated keep");
				e.ddd = function (t) {
					return "ddd-" + t
				};
				s.ddd = function (t) {
					return t + ".ddd"
				};
				s.add("resize");
				(function () {})
			}(), t = l.extend(!0, {}, l[o].defaults, t), this.each(function () {
				l(this).data(o, new l[o](l(this), t)._api())
			})
		})
	}(jQuery), $(document).ready(function () {
		$(".ba-slider").each(function () {
			var t = $(this),
				e = t.width() + "px";
			t.find(".resize .img").css("width", e), drags(t.find(".handle"), t.find(".resize"), t)
		})
	}), $(window).resize(function () {
		$(".ba-slider").each(function () {
			var t = $(this),
				e = t.width() + "px";
			t.find(".resize .img").css("width", e)
		})
	}), $(document).ready(function () {
		$('a[href^= "#overlay-"]').click(function () {
			return "#overlay-ok" != $(this).attr("href") && openeOverlay($(this).attr("href")), !1
		}), $(".overlay a[href='#close-overlay']").click(function () {
			return closeOverlay(), !1
		})
	}),
	function (t) {
		if ("function" == typeof define && define.amd)
			define(["jquery"], t);
		else if ("object" == typeof module && module.exports) {
			var e = require("jquery");
			t(e), module.exports = e
		} else t(jQuery)
	}(function (f) {
		function r(t) {
			this.init(t)
		}
		r.prototype = {
			value: 0,
			size: 100,
			startAngle: -Math.PI,
			thickness: "auto",
			fill: {
				gradient: ["#3aeabb", "#fdd250"]
			},
			emptyFill: "rgba(0, 0, 0, 0)",
			animation: {
				duration: 1e3,
				easing: "linear"
			},
			animationStartValue: 0,
			reverse: !1,
			lineCap: "butt",
			insertMode: "prepend",
			constructor: r,
			el: null,
			canvas: null,
			ctx: null,
			radius: 0,
			arcFill: null,
			lastFrameValue: 0,
			init: function (t) {
				f.extend(this, t), this.radius = this.size / 2, this.initWidget(), this.initFill(), this.draw(), this.el.trigger("circle-inited")
			},
			initWidget: function () {
				this.canvas || (this.canvas = f("<canvas>")["prepend" == this.insertMode ? "prependTo" : "appendTo"](this.el)[0]);
				var t = this.canvas;
				if (t.width = this.size, t.height = this.size, this.ctx = t.getContext("2d"), 1 < window.devicePixelRatio) {
					var e = window.devicePixelRatio;
					t.style.width = t.style.height = this.size + "px", t.width = t.height = this.size * e, this.ctx.scale(e, e)
				}
			},
			initFill: function () {
				var e, i = this,
					t = this.fill,
					s = this.ctx,
					n = this.size;
				if (!t)
					throw Error("The fill is not specified!");
				if ("string" == typeof t && (t = {
						color: t
					}), t.color && (this.arcFill = t.color), t.gradient) {
					var o = t.gradient;
					if (1 == o.length)
						this.arcFill = o[0];
					else if (1 < o.length) {
						for (var r = t.gradientAngle || 0, a = t.gradientDirection || [n / 2 * (1 - Math.cos(r)), n / 2 * (1 + Math.sin(r)), n / 2 * (1 + Math.cos(r)), n / 2 * (1 - Math.sin(r))], l = s.createLinearGradient.apply(s, a), c = 0; c < o.length; c++) {
							var h = o[c],
								d = c / (o.length - 1);
							f.isArray(h) && (d = h[1], h = h[0]), l.addColorStop(d, h)
						}
						this.arcFill = l
					}
				}
				t.image && (t.image instanceof Image ? e = t.image : (e = new Image).src = t.image, e.complete ? u() : e.onload = u);

				function u() {
					var t = f("<canvas>")[0];
					t.width = i.size, t.height = i.size, t.getContext("2d").drawImage(e, 0, 0, n, n), i.arcFill = i.ctx.createPattern(t, "no-repeat"), i.drawFrame(i.lastFrameValue)
				}
			},
			draw: function () {
				this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value)
			},
			drawFrame: function (t) {
				this.lastFrameValue = t, this.ctx.clearRect(0, 0, this.size, this.size), this.drawEmptyArc(t), this.drawArc(t)
			},
			drawArc: function (t) {
				if (0 !== t) {
					var e = this.ctx,
						i = this.radius,
						s = this.getThickness(),
						n = this.startAngle;
					e.save(), e.beginPath(), this.reverse ? e.arc(i, i, i - s / 2, n - 2 * Math.PI * t, n) : e.arc(i, i, i - s / 2, n, n + 2 * Math.PI * t), e.lineWidth = s, e.lineCap = this.lineCap, e.strokeStyle = this.arcFill, e.stroke(), e.restore()
				}
			},
			drawEmptyArc: function (t) {
				var e = this.ctx,
					i = this.radius,
					s = this.getThickness(),
					n = this.startAngle;
				t < 1 && (e.save(), e.beginPath(), t <= 0 ? e.arc(i, i, i - s / 2, 0, 2 * Math.PI) : this.reverse ? e.arc(i, i, i - s / 2, n, n - 2 * Math.PI * t) : e.arc(i, i, i - s / 2, n + 2 * Math.PI * t, n), e.lineWidth = s, e.strokeStyle = this.emptyFill, e.stroke(), e.restore())
			},
			drawAnimated: function (i) {
				var s = this,
					n = this.el,
					t = f(this.canvas);
				t.stop(!0, !1), n.trigger("circle-animation-start"), t.css({
					animationProgress: 0
				}).animate({
					animationProgress: 1
				}, f.extend({}, this.animation, {
					step: function (t) {
						var e = s.animationStartValue * (1 - t) + i * t;
						s.drawFrame(e), n.trigger("circle-animation-progress", [t, e])
					}
				})).promise().always(function () {
					n.trigger("circle-animation-end")
				})
			},
			getThickness: function () {
				return 1
			},
			getValue: function () {
				return this.value
			},
			setValue: function (t) {
				this.animation && (this.animationStartValue = this.lastFrameValue), this.value = t, this.draw()
			}
		}, f.circleProgress = {
			defaults: r.prototype
		}, f.easing.circleProgressEasing = function (t) {
			return t < .5 ? .5 * (t *= 2) * t * t : 1 - .5 * (t = 2 - 2 * t) * t * t
		}, f.fn.circleProgress = function (n, t) {
			var o = "circle-progress",
				e = this.data(o);
			if ("widget" == n) {
				if (!e)
					throw Error('Calling "widget" method on not initialized instance is forbidden');
				return e.canvas
			}
			if ("value" == n) {
				if (!e)
					throw Error('Calling "value" method on not initialized instance is forbidden');
				if (void 0 === t)
					return e.getValue();
				var i = t;
				return this.each(function () {
					f(this).data(o).setValue(i)
				})
			}
			return this.each(function () {
				var t = f(this),
					e = t.data(o),
					i = f.isPlainObject(n) ? n : {};
				if (e)
					e.init(i);
				else {
					var s = f.extend({}, t.data());
					"string" == typeof s.fill && (s.fill = JSON.parse(s.fill)), "string" == typeof s.animation && (s.animation = JSON.parse(s.animation)), (i = f.extend(s, i)).el = t, e = new r(i), t.data(o, e)
				}
			})
		}
	}), $("#main-block-1-new .button.button-w").click(function () {
		$(this).css('color', $(this).attr('data-color'))
	}), $(document).ready(function () {
		$(".youtube-video .video-preview").click(function () {
			var t = $(this).parent(".youtube-video").find("iframe").attr("src");
			$(this).parent(".youtube-video").find("iframe").attr("src", t + "&autoplay=1"), $(this).parent(".youtube-video").addClass("play")
		})
	}), $(document).ready(function () {
		$(".choosen-select").chosen({
			disable_search_threshold: 10
		}), headerFix(), slider(), unfoldingList(), slide1Form(), textDot(), filterMenu(), getMore(), fixedBlock(), mobileSidePanelHeight(), scroll_show_image(), beforeAfter(), fancy_youtube(), null != typeof ymaps && "undefined" != typeof ymaps && "function" == typeof init && ymaps.ready(init)
	}), $(document).ready(function () {
		function hideSlides() {
			$('.main-slide').each(function () {
				if ($(this).hasClass('showed-back')) {
					$(this).removeClass('showed-back')
				} else if ($(this).hasClass('showed')) {
					$(this).removeClass('showed');
					$(this).addClass('showed-back')
				}
			});
			$('.slide-block-outer').each(function () {
				if ($(this).hasClass('showed-block-back')) {
					$(this).removeClass('showed-block-back')
				} else if ($(this).hasClass('showed-block')) {
					$(this).removeClass('showed-block');
					$(this).addClass('showed-block-back')
				}
			})
		}

		function showControls() {
			$('.control-slide').each(function () {
				$(this).removeClass('active')
			})
		}
		$(document).on('click', '.control-slide', function () {
			if ($(this).attr('data-id') == 1) {
				hideSlides();
				showControls();
				$('.slide-1').addClass('showed');
				$('.slide-block-outer-1').addClass('showed-block');
				$('.control-slide.innovation').addClass('active')
			} else if ($(this).attr('data-id') == 2) {
				hideSlides();
				showControls()
				$('.slide-2').addClass('showed');
				$('.slide-block-outer-2').addClass('showed-block');
				$('.control-slide.nadezh').addClass('active')
			} else if ($(this).attr('data-id') == 3) {
				hideSlides();
				showControls()
				$('.slide-3').addClass('showed');
				$('.slide-block-outer-3').addClass('showed-block');
				$('.control-slide.zabota').addClass('active')
			} else if ($(this).attr('data-id') == 4) {
				hideSlides();
				showControls()
				$('.slide-4').addClass('showed');
				$('.slide-block-outer-4').addClass('showed-block');
				$('.control-slide.kliniki').addClass('active')
			}
		})
	})