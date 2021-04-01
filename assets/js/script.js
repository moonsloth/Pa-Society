/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function () {
  'use strict';

  function e(e) {
    return e && '[object Function]' === {}.toString.call(e)
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = getComputedStyle(e, null);
    return t ? o[t] : o
  }

  function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host
  }

  function n(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case 'HTML':
      case 'BODY':
        return e.ownerDocument.body;
      case '#document':
        return e.body;
    }
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e))
  }

  (function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
      define(["jquery"], factory)
    } else if (typeof exports !== "undefined") {
      module.exports = factory(require("jquery"))
    } else {
      factory(jQuery)
    }
  })(function ($) {
    "use strict";
    var Slick = window.Slick || {};
    Slick = function () {
      var instanceUid = 0;

      function Slick(element, settings) {
        var _ = this,
          dataSettings;
        _.defaults = {
          accessibility: true,
          adaptiveHeight: false,
          appendArrows: $(element),
          appendDots: $(element),
          arrows: true,
          asNavFor: null,
          prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: false,
          autoplaySpeed: 3e3,
          centerMode: false,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (slider, i) {
            return $('<button type="button" />').text(i + 1)
          },
          dots: false,
          dotsClass: "slick-dots",
          draggable: true,
          easing: "linear",
          edgeFriction: .35,
          fade: false,
          focusOnSelect: false,
          focusOnChange: false,
          infinite: true,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: false,
          pauseOnHover: true,
          pauseOnFocus: true,
          pauseOnDotsHover: false,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: false,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: true,
          swipeToSlide: false,
          touchMove: true,
          touchThreshold: 5,
          useCSS: true,
          useTransform: true,
          variableWidth: false,
          vertical: false,
          verticalSwiping: false,
          waitForAnimate: true,
          zIndex: 1e3
        };
        _.initials = {
          animating: false,
          dragging: false,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: false,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: false,
          slideOffset: 0,
          swipeLeft: null,
          swiping: false,
          $list: null,
          touchObject: {},
          transformsEnabled: false,
          unslicked: false
        };
        $.extend(_, _.initials);
        _.activeBreakpoint = null;
        _.animType = null;
        _.animProp = null;
        _.breakpoints = [];
        _.breakpointSettings = [];
        _.cssTransitions = false;
        _.focussed = false;
        _.interrupted = false;
        _.hidden = "hidden";
        _.paused = true;
        _.positionProp = null;
        _.respondTo = null;
        _.rowCount = 1;
        _.shouldClick = true;
        _.$slider = $(element);
        _.$slidesCache = null;
        _.transformType = null;
        _.transitionType = null;
        _.visibilityChange = "visibilitychange";
        _.windowWidth = 0;
        _.windowTimer = null;
        dataSettings = $(element).data("slick") || {};
        _.options = $.extend({}, _.defaults, settings, dataSettings);
        _.currentSlide = _.options.initialSlide;
        _.originalSettings = _.options;
        if (typeof document.mozHidden !== "undefined") {
          _.hidden = "mozHidden";
          _.visibilityChange = "mozvisibilitychange"
        } else if (typeof document.webkitHidden !== "undefined") {
          _.hidden = "webkitHidden";
          _.visibilityChange = "webkitvisibilitychange"
        }
        _.autoPlay = $.proxy(_.autoPlay, _);
        _.autoPlayClear = $.proxy(_.autoPlayClear, _);
        _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
        _.changeSlide = $.proxy(_.changeSlide, _);
        _.clickHandler = $.proxy(_.clickHandler, _);
        _.selectHandler = $.proxy(_.selectHandler, _);
        _.setPosition = $.proxy(_.setPosition, _);
        _.swipeHandler = $.proxy(_.swipeHandler, _);
        _.dragHandler = $.proxy(_.dragHandler, _);
        _.keyHandler = $.proxy(_.keyHandler, _);
        _.instanceUid = instanceUid++;
        _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
        _.registerBreakpoints();
        _.init(true)
      }
      return Slick
    }();
    Slick.prototype.activateADA = function () {
      var _ = this;
      _.$slideTrack.find(".slick-active").attr({
        "aria-hidden": "false"
      }).find("a, input, button, select").attr({
        tabindex: "0"
      })
    };
    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
      var _ = this;
      if (typeof index === "boolean") {
        addBefore = index;
        index = null
      } else if (index < 0 || index >= _.slideCount) {
        return false
      }
      _.unload();
      if (typeof index === "number") {
        if (index === 0 && _.$slides.length === 0) {
          $(markup).appendTo(_.$slideTrack)
        } else if (addBefore) {
          $(markup).insertBefore(_.$slides.eq(index))
        } else {
          $(markup).insertAfter(_.$slides.eq(index))
        }
      } else {
        if (addBefore === true) {
          $(markup).prependTo(_.$slideTrack)
        } else {
          $(markup).appendTo(_.$slideTrack)
        }
      }
      _.$slides = _.$slideTrack.children(this.options.slide);
      _.$slideTrack.children(this.options.slide).detach();
      _.$slideTrack.append(_.$slides);
      _.$slides.each(function (index, element) {
        $(element).attr("data-slick-index", index)
      });
      _.$slidesCache = _.$slides;
      _.reinit()
    };
    Slick.prototype.animateHeight = function () {
      var _ = this;
      if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
        var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
        _.$list.animate({
          height: targetHeight
        }, _.options.speed)
      }
    };
    Slick.prototype.animateSlide = function (targetLeft, callback) {
      var animProps = {},
        _ = this;
      _.animateHeight();
      if (_.options.rtl === true && _.options.vertical === false) {
        targetLeft = -targetLeft
      }
      if (_.transformsEnabled === false) {
        if (_.options.vertical === false) {
          _.$slideTrack.animate({
            left: targetLeft
          }, _.options.speed, _.options.easing, callback)
        } else {
          _.$slideTrack.animate({
            top: targetLeft
          }, _.options.speed, _.options.easing, callback)
        }
      } else {
        if (_.cssTransitions === false) {
          if (_.options.rtl === true) {
            _.currentLeft = -_.currentLeft
          }
          $({
            animStart: _.currentLeft
          }).animate({
            animStart: targetLeft
          }, {
            duration: _.options.speed,
            easing: _.options.easing,
            step: function (now) {
              now = Math.ceil(now);
              if (_.options.vertical === false) {
                animProps[_.animType] = "translate(" + now + "px, 0px)";
                _.$slideTrack.css(animProps)
              } else {
                animProps[_.animType] = "translate(0px," + now + "px)";
                _.$slideTrack.css(animProps)
              }
            },
            complete: function () {
              if (callback) {
                callback.call()
              }
            }
          })
        } else {
          _.applyTransition();
          targetLeft = Math.ceil(targetLeft);
          if (_.options.vertical === false) {
            animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)"
          } else {
            animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)"
          }
          _.$slideTrack.css(animProps);
          if (callback) {
            setTimeout(function () {
              _.disableTransition();
              callback.call()
            }, _.options.speed)
          }
        }
      }
    };
    Slick.prototype.getNavTarget = function () {
      var _ = this,
        asNavFor = _.options.asNavFor;
      if (asNavFor && asNavFor !== null) {
        asNavFor = $(asNavFor).not(_.$slider)
      }
      return asNavFor
    };
    Slick.prototype.asNavFor = function (index) {
      var _ = this,
        asNavFor = _.getNavTarget();
      if (asNavFor !== null && typeof asNavFor === "object") {
        asNavFor.each(function () {
          var target = $(this).slick("getSlick");
          if (!target.unslicked) {
            target.slideHandler(index, true)
          }
        })
      }
    };
    Slick.prototype.applyTransition = function (slide) {
      var _ = this,
        transition = {};
      if (_.options.fade === false) {
        transition[_.transitionType] = _.transformType + " " + _.options.speed + "ms " + _.options.cssEase
      } else {
        transition[_.transitionType] = "opacity " + _.options.speed + "ms " + _.options.cssEase
      }
      if (_.options.fade === false) {
        _.$slideTrack.css(transition)
      } else {
        _.$slides.eq(slide).css(transition)
      }
    };
    Slick.prototype.autoPlay = function () {
      var _ = this;
      _.autoPlayClear();
      if (_.slideCount > _.options.slidesToShow) {
        _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed)
      }
    };
    Slick.prototype.autoPlayClear = function () {
      var _ = this;
      if (_.autoPlayTimer) {
        clearInterval(_.autoPlayTimer)
      }
    };
    Slick.prototype.autoPlayIterator = function () {
      var _ = this,
        slideTo = _.currentSlide + _.options.slidesToScroll;
      if (!_.paused && !_.interrupted && !_.focussed) {
        if (_.options.infinite === false) {
          if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
            _.direction = 0
          } else if (_.direction === 0) {
            slideTo = _.currentSlide - _.options.slidesToScroll;
            if (_.currentSlide - 1 === 0) {
              _.direction = 1
            }
          }
        }
        _.slideHandler(slideTo)
      }
    };
    Slick.prototype.buildArrows = function () {
      var _ = this;
      if (_.options.arrows === true) {
        _.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow");
        _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow");
        if (_.slideCount > _.options.slidesToShow) {
          _.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
          _.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
          if (_.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.prependTo(_.options.appendArrows)
          }
          if (_.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.appendTo(_.options.appendArrows)
          }
          if (_.options.infinite !== true) {
            _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")
          }
        } else {
          _.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
          })
        }
      }
    };
    Slick.prototype.buildDots = function () {
      var _ = this,
        i, dot;
      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
        _.$slider.addClass("slick-dotted");
        dot = $("<ul />").addClass(_.options.dotsClass);
        for (i = 0; i <= _.getDotCount(); i += 1) {
          dot.append($("<li />").append(_.options.customPaging.call(this, _, i)))
        }
        _.$dots = dot.appendTo(_.options.appendDots);
        _.$dots.find("li").first().addClass("slick-active")
      }
    };
    Slick.prototype.buildOut = function () {
      var _ = this;
      _.$slides = _.$slider.children(_.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
      _.slideCount = _.$slides.length;
      _.$slides.each(function (index, element) {
        $(element).attr("data-slick-index", index).data("originalStyling", $(element).attr("style") || "")
      });
      _.$slider.addClass("slick-slider");
      _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
      _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
      _.$slideTrack.css("opacity", 0);
      if (_.options.centerMode === true || _.options.swipeToSlide === true) {
        _.options.slidesToScroll = 1
      }
      $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading");
      _.setupInfinite();
      _.buildArrows();
      _.buildDots();
      _.updateDots();
      _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
      if (_.options.draggable === true) {
        _.$list.addClass("draggable")
      }
    };
    Slick.prototype.buildRows = function () {
      var _ = this,
        a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;
      newSlides = document.createDocumentFragment();
      originalSlides = _.$slider.children();
      if (_.options.rows > 0) {
        slidesPerSection = _.options.slidesPerRow * _.options.rows;
        numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
        for (a = 0; a < numOfSlides; a++) {
          var slide = document.createElement("div");
          for (b = 0; b < _.options.rows; b++) {
            var row = document.createElement("div");
            for (c = 0; c < _.options.slidesPerRow; c++) {
              var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
              if (originalSlides.get(target)) {
                row.appendChild(originalSlides.get(target))
              }
            }
            slide.appendChild(row)
          }
          newSlides.appendChild(slide)
        }
        _.$slider.empty().append(newSlides);
        _.$slider.children().children().children().css({
          width: 100 / _.options.slidesPerRow + "%",
          display: "inline-block"
        })
      }
    };
    Slick.prototype.checkResponsive = function (initial, forceUpdate) {
      var _ = this,
        breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
      var sliderWidth = _.$slider.width();
      var windowWidth = window.innerWidth || $(window).width();
      if (_.respondTo === "window") {
        respondToWidth = windowWidth
      } else if (_.respondTo === "slider") {
        respondToWidth = sliderWidth
      } else if (_.respondTo === "min") {
        respondToWidth = Math.min(windowWidth, sliderWidth)
      }
      if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
        targetBreakpoint = null;
        for (breakpoint in _.breakpoints) {
          if (_.breakpoints.hasOwnProperty(breakpoint)) {
            if (_.originalSettings.mobileFirst === false) {
              if (respondToWidth < _.breakpoints[breakpoint]) {
                targetBreakpoint = _.breakpoints[breakpoint]
              }
            } else {
              if (respondToWidth > _.breakpoints[breakpoint]) {
                targetBreakpoint = _.breakpoints[breakpoint]
              }
            }
          }
        }
        if (targetBreakpoint !== null) {
          if (_.activeBreakpoint !== null) {
            if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
              _.activeBreakpoint = targetBreakpoint;
              if (_.breakpointSettings[targetBreakpoint] === "unslick") {
                _.unslick(targetBreakpoint)
              } else {
                _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                if (initial === true) {
                  _.currentSlide = _.options.initialSlide
                }
                _.refresh(initial)
              }
              triggerBreakpoint = targetBreakpoint
            }
          } else {
            _.activeBreakpoint = targetBreakpoint;
            if (_.breakpointSettings[targetBreakpoint] === "unslick") {
              _.unslick(targetBreakpoint)
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
              if (initial === true) {
                _.currentSlide = _.options.initialSlide
              }
              _.refresh(initial)
            }
            triggerBreakpoint = targetBreakpoint
          }
        } else {
          if (_.activeBreakpoint !== null) {
            _.activeBreakpoint = null;
            _.options = _.originalSettings;
            if (initial === true) {
              _.currentSlide = _.options.initialSlide
            }
            _.refresh(initial);
            triggerBreakpoint = targetBreakpoint
          }
        }
        if (!initial && triggerBreakpoint !== false) {
          _.$slider.trigger("breakpoint", [_, triggerBreakpoint])
        }
      }
    };
    Slick.prototype.changeSlide = function (event, dontAnimate) {
      var _ = this,
        $target = $(event.currentTarget),
        indexOffset, slideOffset, unevenOffset;
      if ($target.is("a")) {
        event.preventDefault()
      }
      if (!$target.is("li")) {
        $target = $target.closest("li")
      }
      unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
      indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
      switch (event.data.message) {
        case "previous":
          slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
          if (_.slideCount > _.options.slidesToShow) {
            _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate)
          }
          break;
        case "next":
          slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
          if (_.slideCount > _.options.slidesToShow) {
            _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate)
          }
          break;
        case "index":
          var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
          _.slideHandler(_.checkNavigable(index), false, dontAnimate);
          $target.children().trigger("focus");
          break;
        default:
          return
      }
    };
    Slick.prototype.checkNavigable = function (index) {
      var _ = this,
        navigables, prevNavigable;
      navigables = _.getNavigableIndexes();
      prevNavigable = 0;
      if (index > navigables[navigables.length - 1]) {
        index = navigables[navigables.length - 1]
      } else {
        for (var n in navigables) {
          if (index < navigables[n]) {
            index = prevNavigable;
            break
          }
          prevNavigable = navigables[n]
        }
      }
      return index
    };
    Slick.prototype.cleanUpEvents = function () {
      var _ = this;
      if (_.options.dots && _.$dots !== null) {
        $("li", _.$dots).off("click.slick", _.changeSlide).off("mouseenter.slick", $.proxy(_.interrupt, _, true)).off("mouseleave.slick", $.proxy(_.interrupt, _, false));
        if (_.options.accessibility === true) {
          _.$dots.off("keydown.slick", _.keyHandler)
        }
      }
      _.$slider.off("focus.slick blur.slick");
      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        _.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide);
        _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide);
        if (_.options.accessibility === true) {
          _.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler);
          _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler)
        }
      }
      _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler);
      _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler);
      _.$list.off("touchend.slick mouseup.slick", _.swipeHandler);
      _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler);
      _.$list.off("click.slick", _.clickHandler);
      $(document).off(_.visibilityChange, _.visibility);
      _.cleanUpSlideEvents();
      if (_.options.accessibility === true) {
        _.$list.off("keydown.slick", _.keyHandler)
      }
      if (_.options.focusOnSelect === true) {
        $(_.$slideTrack).children().off("click.slick", _.selectHandler)
      }
      $(window).off("orientationchange.slick.slick-" + _.instanceUid, _.orientationChange);
      $(window).off("resize.slick.slick-" + _.instanceUid, _.resize);
      $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault);
      $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition)
    };
    Slick.prototype.cleanUpSlideEvents = function () {
      var _ = this;
      _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, true));
      _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, false))
    };
    Slick.prototype.cleanUpRows = function () {
      var _ = this,
        originalSlides;
      if (_.options.rows > 0) {
        originalSlides = _.$slides.children().children();
        originalSlides.removeAttr("style");
        _.$slider.empty().append(originalSlides)
      }
    };
    Slick.prototype.clickHandler = function (event) {
      var _ = this;
      if (_.shouldClick === false) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault()
      }
    };
    Slick.prototype.destroy = function (refresh) {
      var _ = this;
      _.autoPlayClear();
      _.touchObject = {};
      _.cleanUpEvents();
      $(".slick-cloned", _.$slider).detach();
      if (_.$dots) {
        _.$dots.remove()
      }
      if (_.$prevArrow && _.$prevArrow.length) {
        _.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.remove()
        }
      }
      if (_.$nextArrow && _.$nextArrow.length) {
        _.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.remove()
        }
      }
      if (_.$slides) {
        _.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
          $(this).attr("style", $(this).data("originalStyling"))
        });
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.detach();
        _.$list.detach();
        _.$slider.append(_.$slides)
      }
      _.cleanUpRows();
      _.$slider.removeClass("slick-slider");
      _.$slider.removeClass("slick-initialized");
      _.$slider.removeClass("slick-dotted");
      _.unslicked = true;
      if (!refresh) {
        _.$slider.trigger("destroy", [_])
      }
    };
    Slick.prototype.disableTransition = function (slide) {
      var _ = this,
        transition = {};
      transition[_.transitionType] = "";
      if (_.options.fade === false) {
        _.$slideTrack.css(transition)
      } else {
        _.$slides.eq(slide).css(transition)
      }
    };
    Slick.prototype.fadeSlide = function (slideIndex, callback) {
      var _ = this;
      if (_.cssTransitions === false) {
        _.$slides.eq(slideIndex).css({
          zIndex: _.options.zIndex
        });
        _.$slides.eq(slideIndex).animate({
          opacity: 1
        }, _.options.speed, _.options.easing, callback)
      } else {
        _.applyTransition(slideIndex);
        _.$slides.eq(slideIndex).css({
          opacity: 1,
          zIndex: _.options.zIndex
        });
        if (callback) {
          setTimeout(function () {
            _.disableTransition(slideIndex);
            callback.call()
          }, _.options.speed)
        }
      }
    };
    Slick.prototype.fadeSlideOut = function (slideIndex) {
      var _ = this;
      if (_.cssTransitions === false) {
        _.$slides.eq(slideIndex).animate({
          opacity: 0,
          zIndex: _.options.zIndex - 2
        }, _.options.speed, _.options.easing)
      } else {
        _.applyTransition(slideIndex);
        _.$slides.eq(slideIndex).css({
          opacity: 0,
          zIndex: _.options.zIndex - 2
        })
      }
    };
    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
      var _ = this;
      if (filter !== null) {
        _.$slidesCache = _.$slides;
        _.unload();
        _.$slideTrack.children(this.options.slide).detach();
        _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
        _.reinit()
      }
    };
    Slick.prototype.focusHandler = function () {
      var _ = this;
      _.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function (event) {
        var $sf = $(this);
        setTimeout(function () {
          if (_.options.pauseOnFocus) {
            if ($sf.is(":focus")) {
              _.focussed = true;
              _.autoPlay()
            }
          }
        }, 0)
      }).on("blur.slick", "*", function (event) {
        var $sf = $(this);
        if (_.options.pauseOnFocus) {
          _.focussed = false;
          _.autoPlay()
        }
      })
    };
    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
      var _ = this;
      return _.currentSlide
    };
    Slick.prototype.getDotCount = function () {
      var _ = this;
      var breakPoint = 0;
      var counter = 0;
      var pagerQty = 0;
      if (_.options.infinite === true) {
        if (_.slideCount <= _.options.slidesToShow) {
          ++pagerQty
        } else {
          while (breakPoint < _.slideCount) {
            ++pagerQty;
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
          }
        }
      } else if (_.options.centerMode === true) {
        pagerQty = _.slideCount
      } else if (!_.options.asNavFor) {
        pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll)
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
        }
      }
      return pagerQty - 1
    };
    Slick.prototype.getLeft = function (slideIndex) {
      var _ = this,
        targetLeft, verticalHeight, verticalOffset = 0,
        targetSlide, coef;
      _.slideOffset = 0;
      verticalHeight = _.$slides.first().outerHeight(true);
      if (_.options.infinite === true) {
        if (_.slideCount > _.options.slidesToShow) {
          _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
          coef = -1;
          if (_.options.vertical === true && _.options.centerMode === true) {
            if (_.options.slidesToShow === 2) {
              coef = -1.5
            } else if (_.options.slidesToShow === 1) {
              coef = -2
            }
          }
          verticalOffset = verticalHeight * _.options.slidesToShow * coef
        }
        if (_.slideCount % _.options.slidesToScroll !== 0) {
          if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
            if (slideIndex > _.slideCount) {
              _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
              verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1
            } else {
              _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
              verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1
            }
          }
        }
      } else {
        if (slideIndex + _.options.slidesToShow > _.slideCount) {
          _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
          verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight
        }
      }
      if (_.slideCount <= _.options.slidesToShow) {
        _.slideOffset = 0;
        verticalOffset = 0
      }
      if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2
      } else if (_.options.centerMode === true && _.options.infinite === true) {
        _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth
      } else if (_.options.centerMode === true) {
        _.slideOffset = 0;
        _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2)
      }
      if (_.options.vertical === false) {
        targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset
      } else {
        targetLeft = slideIndex * verticalHeight * -1 + verticalOffset
      }
      if (_.options.variableWidth === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex)
        } else {
          targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow)
        }
        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1
          } else {
            targetLeft = 0
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0
        }
        if (_.options.centerMode === true) {
          if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
            targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex)
          } else {
            targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow + 1)
          }
          if (_.options.rtl === true) {
            if (targetSlide[0]) {
              targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1
            } else {
              targetLeft = 0
            }
          } else {
            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0
          }
          targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2
        }
      }
      return targetLeft
    };
    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
      var _ = this;
      return _.options[option]
    };
    Slick.prototype.getNavigableIndexes = function () {
      var _ = this,
        breakPoint = 0,
        counter = 0,
        indexes = [],
        max;
      if (_.options.infinite === false) {
        max = _.slideCount
      } else {
        breakPoint = _.options.slidesToScroll * -1;
        counter = _.options.slidesToScroll * -1;
        max = _.slideCount * 2
      }
      while (breakPoint < max) {
        indexes.push(breakPoint);
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
      }
      return indexes
    };
    Slick.prototype.getSlick = function () {
      return this
    };
    Slick.prototype.getSlideCount = function () {
      var _ = this,
        slidesTraversed, swipedSlide, swipeTarget, centerOffset;
      centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
      swipeTarget = _.swipeLeft * -1 + centerOffset;
      if (_.options.swipeToSlide === true) {
        _.$slideTrack.find(".slick-slide").each(function (index, slide) {
          var slideOuterWidth, slideOffset, slideRightBoundary;
          slideOuterWidth = $(slide).outerWidth();
          slideOffset = slide.offsetLeft;
          if (_.options.centerMode !== true) {
            slideOffset += slideOuterWidth / 2
          }
          slideRightBoundary = slideOffset + slideOuterWidth;
          if (swipeTarget < slideRightBoundary) {
            swipedSlide = slide;
            return false
          }
        });
        slidesTraversed = Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1;
        return slidesTraversed
      } else {
        return _.options.slidesToScroll
      }
    };
    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
      var _ = this;
      _.changeSlide({
        data: {
          message: "index",
          index: parseInt(slide)
        }
      }, dontAnimate)
    };
    Slick.prototype.init = function (creation) {
      var _ = this;
      if (!$(_.$slider).hasClass("slick-initialized")) {
        $(_.$slider).addClass("slick-initialized");
        _.buildRows();
        _.buildOut();
        _.setProps();
        _.startLoad();
        _.loadSlider();
        _.initializeEvents();
        _.updateArrows();
        _.updateDots();
        _.checkResponsive(true);
        _.focusHandler()
      }
      if (creation) {
        _.$slider.trigger("init", [_])
      }
      if (_.options.accessibility === true) {
        _.initADA()
      }
      if (_.options.autoplay) {
        _.paused = false;
        _.autoPlay()
      }
    };
    Slick.prototype.initADA = function () {
      var _ = this,
        numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
        tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
          return val >= 0 && val < _.slideCount
        });
      _.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({
        "aria-hidden": "true",
        tabindex: "-1"
      }).find("a, input, button, select").attr({
        tabindex: "-1"
      });
      if (_.$dots !== null) {
        _.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function (i) {
          var slideControlIndex = tabControlIndexes.indexOf(i);
          $(this).attr({
            role: "tabpanel",
            id: "slick-slide" + _.instanceUid + i,
            tabindex: -1
          });
          if (slideControlIndex !== -1) {
            var ariaButtonControl = "slick-slide-control" + _.instanceUid + slideControlIndex;
            if ($("#" + ariaButtonControl).length) {
              $(this).attr({
                "aria-describedby": ariaButtonControl
              })
            }
          }
        });
        _.$dots.attr("role", "tablist").find("li").each(function (i) {
          var mappedSlideIndex = tabControlIndexes[i];
          $(this).attr({
            role: "presentation"
          });
          $(this).find("button").first().attr({
            role: "tab",
            id: "slick-slide-control" + _.instanceUid + i,
            "aria-controls": "slick-slide" + _.instanceUid + mappedSlideIndex,
            "aria-label": i + 1 + " of " + numDotGroups,
            "aria-selected": null,
            tabindex: "-1"
          })
        }).eq(_.currentSlide).find("button").attr({
          "aria-selected": "true",
          tabindex: "0"
        }).end()
      }
      for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
        if (_.options.focusOnChange) {
          _.$slides.eq(i).attr({
            tabindex: "0"
          })
        } else {
          _.$slides.eq(i).removeAttr("tabindex")
        }
      }
      _.activateADA()
    };
    Slick.prototype.initArrowEvents = function () {
      var _ = this;
      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        _.$prevArrow.off("click.slick").on("click.slick", {
          message: "previous"
        }, _.changeSlide);
        _.$nextArrow.off("click.slick").on("click.slick", {
          message: "next"
        }, _.changeSlide);
        if (_.options.accessibility === true) {
          _.$prevArrow.on("keydown.slick", _.keyHandler);
          _.$nextArrow.on("keydown.slick", _.keyHandler)
        }
      }
    };
    Slick.prototype.initDotEvents = function () {
      var _ = this;
      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
        $("li", _.$dots).on("click.slick", {
          message: "index"
        }, _.changeSlide);
        if (_.options.accessibility === true) {
          _.$dots.on("keydown.slick", _.keyHandler)
        }
      }
      if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
        $("li", _.$dots).on("mouseenter.slick", $.proxy(_.interrupt, _, true)).on("mouseleave.slick", $.proxy(_.interrupt, _, false))
      }
    };
    Slick.prototype.initSlideEvents = function () {
      var _ = this;
      if (_.options.pauseOnHover) {
        _.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, true));
        _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, false))
      }
    };
    Slick.prototype.initializeEvents = function () {
      var _ = this;
      _.initArrowEvents();
      _.initDotEvents();
      _.initSlideEvents();
      _.$list.on("touchstart.slick mousedown.slick", {
        action: "start"
      }, _.swipeHandler);
      _.$list.on("touchmove.slick mousemove.slick", {
        action: "move"
      }, _.swipeHandler);
      _.$list.on("touchend.slick mouseup.slick", {
        action: "end"
      }, _.swipeHandler);
      _.$list.on("touchcancel.slick mouseleave.slick", {
        action: "end"
      }, _.swipeHandler);
      _.$list.on("click.slick", _.clickHandler);
      $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
      if (_.options.accessibility === true) {
        _.$list.on("keydown.slick", _.keyHandler)
      }
      if (_.options.focusOnSelect === true) {
        $(_.$slideTrack).children().on("click.slick", _.selectHandler)
      }
      $(window).on("orientationchange.slick.slick-" + _.instanceUid, $.proxy(_.orientationChange, _));
      $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _));
      $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault);
      $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition);
      $(_.setPosition)
    };
    Slick.prototype.initUI = function () {
      var _ = this;
      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        _.$prevArrow.show();
        _.$nextArrow.show()
      }
      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
        _.$dots.show()
      }
    };
    Slick.prototype.keyHandler = function (event) {
      var _ = this;
      if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
        if (event.keyCode === 37 && _.options.accessibility === true) {
          _.changeSlide({
            data: {
              message: _.options.rtl === true ? "next" : "previous"
            }
          })
        } else if (event.keyCode === 39 && _.options.accessibility === true) {
          _.changeSlide({
            data: {
              message: _.options.rtl === true ? "previous" : "next"
            }
          })
        }
      }
    };
    Slick.prototype.lazyLoad = function () {
      var _ = this,
        loadRange, cloneRange, rangeStart, rangeEnd;

      function loadImages(imagesScope) {
        $("img[data-lazy]", imagesScope).each(function () {
          var image = $(this),
            imageSource = $(this).attr("data-lazy"),
            imageSrcSet = $(this).attr("data-srcset"),
            imageSizes = $(this).attr("data-sizes") || _.$slider.attr("data-sizes"),
            imageToLoad = document.createElement("img");
          imageToLoad.onload = function () {
            image.animate({
              opacity: 0
            }, 100, function () {
              if (imageSrcSet) {
                image.attr("srcset", imageSrcSet);
                if (imageSizes) {
                  image.attr("sizes", imageSizes)
                }
              }
              image.attr("src", imageSource).animate({
                opacity: 1
              }, 200, function () {
                image.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
              });
              _.$slider.trigger("lazyLoaded", [_, image, imageSource])
            })
          };
          imageToLoad.onerror = function () {
            image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
            _.$slider.trigger("lazyLoadError", [_, image, imageSource])
          };
          imageToLoad.src = imageSource
        })
      }
      if (_.options.centerMode === true) {
        if (_.options.infinite === true) {
          rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
          rangeEnd = rangeStart + _.options.slidesToShow + 2
        } else {
          rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
          rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide
        }
      } else {
        rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
        rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
        if (_.options.fade === true) {
          if (rangeStart > 0) rangeStart--;
          if (rangeEnd <= _.slideCount) rangeEnd++
        }
      }
      loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd);
      if (_.options.lazyLoad === "anticipated") {
        var prevSlide = rangeStart - 1,
          nextSlide = rangeEnd,
          $slides = _.$slider.find(".slick-slide");
        for (var i = 0; i < _.options.slidesToScroll; i++) {
          if (prevSlide < 0) prevSlide = _.slideCount - 1;
          loadRange = loadRange.add($slides.eq(prevSlide));
          loadRange = loadRange.add($slides.eq(nextSlide));
          prevSlide--;
          nextSlide++
        }
      }
      loadImages(loadRange);
      if (_.slideCount <= _.options.slidesToShow) {
        cloneRange = _.$slider.find(".slick-slide");
        loadImages(cloneRange)
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
        cloneRange = _.$slider.find(".slick-cloned").slice(0, _.options.slidesToShow);
        loadImages(cloneRange)
      } else if (_.currentSlide === 0) {
        cloneRange = _.$slider.find(".slick-cloned").slice(_.options.slidesToShow * -1);
        loadImages(cloneRange)
      }
    };
    Slick.prototype.loadSlider = function () {
      var _ = this;
      _.setPosition();
      _.$slideTrack.css({
        opacity: 1
      });
      _.$slider.removeClass("slick-loading");
      _.initUI();
      if (_.options.lazyLoad === "progressive") {
        _.progressiveLazyLoad()
      }
    };
    Slick.prototype.next = Slick.prototype.slickNext = function () {
      var _ = this;
      _.changeSlide({
        data: {
          message: "next"
        }
      })
    };
    Slick.prototype.orientationChange = function () {
      var _ = this;
      _.checkResponsive();
      _.setPosition()
    };
    Slick.prototype.pause = Slick.prototype.slickPause = function () {
      var _ = this;
      _.autoPlayClear();
      _.paused = true
    };
    Slick.prototype.play = Slick.prototype.slickPlay = function () {
      var _ = this;
      _.autoPlay();
      _.options.autoplay = true;
      _.paused = false;
      _.focussed = false;
      _.interrupted = false
    };
    Slick.prototype.postSlide = function (index) {
      var _ = this;
      if (!_.unslicked) {
        _.$slider.trigger("afterChange", [_, index]);
        _.animating = false;
        if (_.slideCount > _.options.slidesToShow) {
          _.setPosition()
        }
        _.swipeLeft = null;
        if (_.options.autoplay) {
          _.autoPlay()
        }
        if (_.options.accessibility === true) {
          _.initADA();
          if (_.options.focusOnChange) {
            var $currentSlide = $(_.$slides.get(_.currentSlide));
            $currentSlide.attr("tabindex", 0).focus()
          }
        }
      }
    };
    Slick.prototype.prev = Slick.prototype.slickPrev = function () {
      var _ = this;
      _.changeSlide({
        data: {
          message: "previous"
        }
      })
    };
    Slick.prototype.preventDefault = function (event) {
      event.preventDefault()
    };
    Slick.prototype.progressiveLazyLoad = function (tryCount) {
      tryCount = tryCount || 1;
      var _ = this,
        $imgsToLoad = $("img[data-lazy]", _.$slider),
        image, imageSource, imageSrcSet, imageSizes, imageToLoad;
      if ($imgsToLoad.length) {
        image = $imgsToLoad.first();
        imageSource = image.attr("data-lazy");
        imageSrcSet = image.attr("data-srcset");
        imageSizes = image.attr("data-sizes") || _.$slider.attr("data-sizes");
        imageToLoad = document.createElement("img");
        imageToLoad.onload = function () {
          if (imageSrcSet) {
            image.attr("srcset", imageSrcSet);
            if (imageSizes) {
              image.attr("sizes", imageSizes)
            }
          }
          image.attr("src", imageSource).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
          if (_.options.adaptiveHeight === true) {
            _.setPosition()
          }
          _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
          _.progressiveLazyLoad()
        };
        imageToLoad.onerror = function () {
          if (tryCount < 3) {
            setTimeout(function () {
              _.progressiveLazyLoad(tryCount + 1)
            }, 500)
          } else {
            image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
            _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
            _.progressiveLazyLoad()
          }
        };
        imageToLoad.src = imageSource
      } else {
        _.$slider.trigger("allImagesLoaded", [_])
      }
    };
    Slick.prototype.refresh = function (initializing) {
      var _ = this,
        currentSlide, lastVisibleIndex;
      lastVisibleIndex = _.slideCount - _.options.slidesToShow;
      if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
        _.currentSlide = lastVisibleIndex
      }
      if (_.slideCount <= _.options.slidesToShow) {
        _.currentSlide = 0
      }
      currentSlide = _.currentSlide;
      _.destroy(true);
      $.extend(_, _.initials, {
        currentSlide: currentSlide
      });
      _.init();
      if (!initializing) {
        _.changeSlide({
          data: {
            message: "index",
            index: currentSlide
          }
        }, false)
      }
    };
    Slick.prototype.registerBreakpoints = function () {
      var _ = this,
        breakpoint, currentBreakpoint, l, responsiveSettings = _.options.responsive || null;
      if ($.type(responsiveSettings) === "array" && responsiveSettings.length) {
        _.respondTo = _.options.respondTo || "window";
        for (breakpoint in responsiveSettings) {
          l = _.breakpoints.length - 1;
          if (responsiveSettings.hasOwnProperty(breakpoint)) {
            currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
            while (l >= 0) {
              if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                _.breakpoints.splice(l, 1)
              }
              l--
            }
            _.breakpoints.push(currentBreakpoint);
            _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings
          }
        }
        _.breakpoints.sort(function (a, b) {
          return _.options.mobileFirst ? a - b : b - a
        })
      }
    };
    Slick.prototype.reinit = function () {
      var _ = this;
      _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide");
      _.slideCount = _.$slides.length;
      if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
        _.currentSlide = _.currentSlide - _.options.slidesToScroll
      }
      if (_.slideCount <= _.options.slidesToShow) {
        _.currentSlide = 0
      }
      _.registerBreakpoints();
      _.setProps();
      _.setupInfinite();
      _.buildArrows();
      _.updateArrows();
      _.initArrowEvents();
      _.buildDots();
      _.updateDots();
      _.initDotEvents();
      _.cleanUpSlideEvents();
      _.initSlideEvents();
      _.checkResponsive(false, true);
      if (_.options.focusOnSelect === true) {
        $(_.$slideTrack).children().on("click.slick", _.selectHandler)
      }
      _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
      _.setPosition();
      _.focusHandler();
      _.paused = !_.options.autoplay;
      _.autoPlay();
      _.$slider.trigger("reInit", [_])
    };
    Slick.prototype.resize = function () {
      var _ = this;
      if ($(window).width() !== _.windowWidth) {
        clearTimeout(_.windowDelay);
        _.windowDelay = window.setTimeout(function () {
          _.windowWidth = $(window).width();
          _.checkResponsive();
          if (!_.unslicked) {
            _.setPosition()
          }
        }, 50)
      }
    };
    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
      var _ = this;
      if (typeof index === "boolean") {
        removeBefore = index;
        index = removeBefore === true ? 0 : _.slideCount - 1
      } else {
        index = removeBefore === true ? --index : index
      }
      if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
        return false
      }
      _.unload();
      if (removeAll === true) {
        _.$slideTrack.children().remove()
      } else {
        _.$slideTrack.children(this.options.slide).eq(index).remove()
      }
      _.$slides = _.$slideTrack.children(this.options.slide);
      _.$slideTrack.children(this.options.slide).detach();
      _.$slideTrack.append(_.$slides);
      _.$slidesCache = _.$slides;
      _.reinit()
    };
    Slick.prototype.setCSS = function (position) {
      var _ = this,
        positionProps = {},
        x, y;
      if (_.options.rtl === true) {
        position = -position
      }
      x = _.positionProp == "left" ? Math.ceil(position) + "px" : "0px";
      y = _.positionProp == "top" ? Math.ceil(position) + "px" : "0px";
      positionProps[_.positionProp] = position;
      if (_.transformsEnabled === false) {
        _.$slideTrack.css(positionProps)
      } else {
        positionProps = {};
        if (_.cssTransitions === false) {
          positionProps[_.animType] = "translate(" + x + ", " + y + ")";
          _.$slideTrack.css(positionProps)
        } else {
          positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)";
          _.$slideTrack.css(positionProps)
        }
      }
    };
    Slick.prototype.setDimensions = function () {
      var _ = this;
      if (_.options.vertical === false) {
        if (_.options.centerMode === true) {
          _.$list.css({
            padding: "0px " + _.options.centerPadding
          })
        }
      } else {
        _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
        if (_.options.centerMode === true) {
          _.$list.css({
            padding: _.options.centerPadding + " 0px"
          })
        }
      }
      _.listWidth = _.$list.width();
      _.listHeight = _.$list.height();
      if (_.options.vertical === false && _.options.variableWidth === false) {
        _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
        _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length))
      } else if (_.options.variableWidth === true) {
        _.$slideTrack.width(5e3 * _.slideCount)
      } else {
        _.slideWidth = Math.ceil(_.listWidth);
        _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children(".slick-slide").length))
      }
      var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
      if (_.options.variableWidth === false) _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset)
    };
    Slick.prototype.setFade = function () {
      var _ = this,
        targetLeft;
      _.$slides.each(function (index, element) {
        targetLeft = _.slideWidth * index * -1;
        if (_.options.rtl === true) {
          $(element).css({
            position: "relative",
            right: targetLeft,
            top: 0,
            zIndex: _.options.zIndex - 2,
            opacity: 0
          })
        } else {
          $(element).css({
            position: "relative",
            left: targetLeft,
            top: 0,
            zIndex: _.options.zIndex - 2,
            opacity: 0
          })
        }
      });
      _.$slides.eq(_.currentSlide).css({
        zIndex: _.options.zIndex - 1,
        opacity: 1
      })
    };
    Slick.prototype.setHeight = function () {
      var _ = this;
      if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
        var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
        _.$list.css("height", targetHeight)
      }
    };
    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
      var _ = this,
        l, item, option, value, refresh = false,
        type;
      if ($.type(arguments[0]) === "object") {
        option = arguments[0];
        refresh = arguments[1];
        type = "multiple"
      } else if ($.type(arguments[0]) === "string") {
        option = arguments[0];
        value = arguments[1];
        refresh = arguments[2];
        if (arguments[0] === "responsive" && $.type(arguments[1]) === "array") {
          type = "responsive"
        } else if (typeof arguments[1] !== "undefined") {
          type = "single"
        }
      }
      if (type === "single") {
        _.options[option] = value
      } else if (type === "multiple") {
        $.each(option, function (opt, val) {
          _.options[opt] = val
        })
      } else if (type === "responsive") {
        for (item in value) {
          if ($.type(_.options.responsive) !== "array") {
            _.options.responsive = [value[item]]
          } else {
            l = _.options.responsive.length - 1;
            while (l >= 0) {
              if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
                _.options.responsive.splice(l, 1)
              }
              l--
            }
            _.options.responsive.push(value[item])
          }
        }
      }
      if (refresh) {
        _.unload();
        _.reinit()
      }
    };
    Slick.prototype.setPosition = function () {
      var _ = this;
      _.setDimensions();
      _.setHeight();
      if (_.options.fade === false) {
        _.setCSS(_.getLeft(_.currentSlide))
      } else {
        _.setFade()
      }
      _.$slider.trigger("setPosition", [_])
    };
    Slick.prototype.setProps = function () {
      var _ = this,
        bodyStyle = document.body.style;
      _.positionProp = _.options.vertical === true ? "top" : "left";
      if (_.positionProp === "top") {
        _.$slider.addClass("slick-vertical")
      } else {
        _.$slider.removeClass("slick-vertical")
      }
      if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
        if (_.options.useCSS === true) {
          _.cssTransitions = true
        }
      }
      if (_.options.fade) {
        if (typeof _.options.zIndex === "number") {
          if (_.options.zIndex < 3) {
            _.options.zIndex = 3
          }
        } else {
          _.options.zIndex = _.defaults.zIndex
        }
      }
      if (bodyStyle.OTransform !== undefined) {
        _.animType = "OTransform";
        _.transformType = "-o-transform";
        _.transitionType = "OTransition";
        if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false
      }
      if (bodyStyle.MozTransform !== undefined) {
        _.animType = "MozTransform";
        _.transformType = "-moz-transform";
        _.transitionType = "MozTransition";
        if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false
      }
      if (bodyStyle.webkitTransform !== undefined) {
        _.animType = "webkitTransform";
        _.transformType = "-webkit-transform";
        _.transitionType = "webkitTransition";
        if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false
      }
      if (bodyStyle.msTransform !== undefined) {
        _.animType = "msTransform";
        _.transformType = "-ms-transform";
        _.transitionType = "msTransition";
        if (bodyStyle.msTransform === undefined) _.animType = false
      }
      if (bodyStyle.transform !== undefined && _.animType !== false) {
        _.animType = "transform";
        _.transformType = "transform";
        _.transitionType = "transition"
      }
      _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false)
    };
    Slick.prototype.setSlideClasses = function (index) {
      var _ = this,
        centerOffset, allSlides, indexOffset, remainder;
      allSlides = _.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
      _.$slides.eq(index).addClass("slick-current");
      if (_.options.centerMode === true) {
        var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
        centerOffset = Math.floor(_.options.slidesToShow / 2);
        if (_.options.infinite === true) {
          if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
            _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass("slick-active").attr("aria-hidden", "false")
          } else {
            indexOffset = _.options.slidesToShow + index;
            allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass("slick-active").attr("aria-hidden", "false")
          }
          if (index === 0) {
            allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass("slick-center")
          } else if (index === _.slideCount - 1) {
            allSlides.eq(_.options.slidesToShow).addClass("slick-center")
          }
        }
        _.$slides.eq(index).addClass("slick-center")
      } else {
        if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
          _.$slides.slice(index, index + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
        } else if (allSlides.length <= _.options.slidesToShow) {
          allSlides.addClass("slick-active").attr("aria-hidden", "false")
        } else {
          remainder = _.slideCount % _.options.slidesToShow;
          indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
          if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
            allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass("slick-active").attr("aria-hidden", "false")
          } else {
            allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
          }
        }
      }
      if (_.options.lazyLoad === "ondemand" || _.options.lazyLoad === "anticipated") {
        _.lazyLoad()
      }
    };
    Slick.prototype.setupInfinite = function () {
      var _ = this,
        i, slideIndex, infiniteCount;
      if (_.options.fade === true) {
        _.options.centerMode = false
      }
      if (_.options.infinite === true && _.options.fade === false) {
        slideIndex = null;
        if (_.slideCount > _.options.slidesToShow) {
          if (_.options.centerMode === true) {
            infiniteCount = _.options.slidesToShow + 1
          } else {
            infiniteCount = _.options.slidesToShow
          }
          for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
            slideIndex = i - 1;
            $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned")
          }
          for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
            slideIndex = i;
            $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned")
          }
          _.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
            $(this).attr("id", "")
          })
        }
      }
    };
    Slick.prototype.interrupt = function (toggle) {
      var _ = this;
      if (!toggle) {
        _.autoPlay()
      }
      _.interrupted = toggle
    };
    Slick.prototype.selectHandler = function (event) {
      var _ = this;
      var targetElement = $(event.target).is(".slick-slide") ? $(event.target) : $(event.target).parents(".slick-slide");
      var index = parseInt(targetElement.attr("data-slick-index"));
      if (!index) index = 0;
      if (_.slideCount <= _.options.slidesToShow) {
        _.slideHandler(index, false, true);
        return
      }
      _.slideHandler(index)
    };
    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
      var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
        _ = this,
        navTarget;
      sync = sync || false;
      if (_.animating === true && _.options.waitForAnimate === true) {
        return
      }
      if (_.options.fade === true && _.currentSlide === index) {
        return
      }
      if (sync === false) {
        _.asNavFor(index)
      }
      targetSlide = index;
      targetLeft = _.getLeft(targetSlide);
      slideLeft = _.getLeft(_.currentSlide);
      _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
      if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
        if (_.options.fade === false) {
          targetSlide = _.currentSlide;
          if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(slideLeft, function () {
              _.postSlide(targetSlide)
            })
          } else {
            _.postSlide(targetSlide)
          }
        }
        return
      } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
        if (_.options.fade === false) {
          targetSlide = _.currentSlide;
          if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(slideLeft, function () {
              _.postSlide(targetSlide)
            })
          } else {
            _.postSlide(targetSlide)
          }
        }
        return
      }
      if (_.options.autoplay) {
        clearInterval(_.autoPlayTimer)
      }
      if (targetSlide < 0) {
        if (_.slideCount % _.options.slidesToScroll !== 0) {
          animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll
        } else {
          animSlide = _.slideCount + targetSlide
        }
      } else if (targetSlide >= _.slideCount) {
        if (_.slideCount % _.options.slidesToScroll !== 0) {
          animSlide = 0
        } else {
          animSlide = targetSlide - _.slideCount
        }
      } else {
        animSlide = targetSlide
      }
      _.animating = true;
      _.$slider.trigger("beforeChange", [_, _.currentSlide, animSlide]);
      oldSlide = _.currentSlide;
      _.currentSlide = animSlide;
      _.setSlideClasses(_.currentSlide);
      if (_.options.asNavFor) {
        navTarget = _.getNavTarget();
        navTarget = navTarget.slick("getSlick");
        if (navTarget.slideCount <= navTarget.options.slidesToShow) {
          navTarget.setSlideClasses(_.currentSlide)
        }
      }
      _.updateDots();
      _.updateArrows();
      if (_.options.fade === true) {
        if (dontAnimate !== true) {
          _.fadeSlideOut(oldSlide);
          _.fadeSlide(animSlide, function () {
            _.postSlide(animSlide)
          })
        } else {
          _.postSlide(animSlide)
        }
        _.animateHeight();
        return
      }
      if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
        _.animateSlide(targetLeft, function () {
          _.postSlide(animSlide)
        })
      } else {
        _.postSlide(animSlide)
      }
    };
    Slick.prototype.startLoad = function () {
      var _ = this;
      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        _.$prevArrow.hide();
        _.$nextArrow.hide()
      }
      if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
        _.$dots.hide()
      }
      _.$slider.addClass("slick-loading")
    };
    Slick.prototype.swipeDirection = function () {
      var xDist, yDist, r, swipeAngle, _ = this;
      xDist = _.touchObject.startX - _.touchObject.curX;
      yDist = _.touchObject.startY - _.touchObject.curY;
      r = Math.atan2(yDist, xDist);
      swipeAngle = Math.round(r * 180 / Math.PI);
      if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle)
      }
      if (swipeAngle <= 45 && swipeAngle >= 0) {
        return _.options.rtl === false ? "left" : "right"
      }
      if (swipeAngle <= 360 && swipeAngle >= 315) {
        return _.options.rtl === false ? "left" : "right"
      }
      if (swipeAngle >= 135 && swipeAngle <= 225) {
        return _.options.rtl === false ? "right" : "left"
      }
      if (_.options.verticalSwiping === true) {
        if (swipeAngle >= 35 && swipeAngle <= 135) {
          return "down"
        } else {
          return "up"
        }
      }
      return "vertical"
    };
    Slick.prototype.swipeEnd = function (event) {
      var _ = this,
        slideCount, direction;
      _.dragging = false;
      _.swiping = false;
      if (_.scrolling) {
        _.scrolling = false;
        return false
      }
      _.interrupted = false;
      _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
      if (_.touchObject.curX === undefined) {
        return false
      }
      if (_.touchObject.edgeHit === true) {
        _.$slider.trigger("edge", [_, _.swipeDirection()])
      }
      if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
        direction = _.swipeDirection();
        switch (direction) {
          case "left":
          case "down":
            slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
            _.currentDirection = 0;
            break;
          case "right":
          case "up":
            slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
            _.currentDirection = 1;
            break;
          default:
        }
        if (direction != "vertical") {
          _.slideHandler(slideCount);
          _.touchObject = {};
          _.$slider.trigger("swipe", [_, direction])
        }
      } else {
        if (_.touchObject.startX !== _.touchObject.curX) {
          _.slideHandler(_.currentSlide);
          _.touchObject = {}
        }
      }
    };
    Slick.prototype.swipeHandler = function (event) {
      var _ = this;
      if (_.options.swipe === false || "ontouchend" in document && _.options.swipe === false) {
        return
      } else if (_.options.draggable === false && event.type.indexOf("mouse") !== -1) {
        return
      }
      _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
      _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
      if (_.options.verticalSwiping === true) {
        _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold
      }
      switch (event.data.action) {
        case "start":
          _.swipeStart(event);
          break;
        case "move":
          _.swipeMove(event);
          break;
        case "end":
          _.swipeEnd(event);
          break
      }
    };
    Slick.prototype.swipeMove = function (event) {
      var _ = this,
        edgeWasHit = false,
        curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;
      touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
      if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
        return false
      }
      curLeft = _.getLeft(_.currentSlide);
      _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
      _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
      _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
      verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
      if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
        _.scrolling = true;
        return false
      }
      if (_.options.verticalSwiping === true) {
        _.touchObject.swipeLength = verticalSwipeLength
      }
      swipeDirection = _.swipeDirection();
      if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
        _.swiping = true;
        event.preventDefault()
      }
      positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
      if (_.options.verticalSwiping === true) {
        positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1
      }
      swipeLength = _.touchObject.swipeLength;
      _.touchObject.edgeHit = false;
      if (_.options.infinite === false) {
        if (_.currentSlide === 0 && swipeDirection === "right" || _.currentSlide >= _.getDotCount() && swipeDirection === "left") {
          swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
          _.touchObject.edgeHit = true
        }
      }
      if (_.options.vertical === false) {
        _.swipeLeft = curLeft + swipeLength * positionOffset
      } else {
        _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset
      }
      if (_.options.verticalSwiping === true) {
        _.swipeLeft = curLeft + swipeLength * positionOffset
      }
      if (_.options.fade === true || _.options.touchMove === false) {
        return false
      }
      if (_.animating === true) {
        _.swipeLeft = null;
        return false
      }
      _.setCSS(_.swipeLeft)
    };
    Slick.prototype.swipeStart = function (event) {
      var _ = this,
        touches;
      _.interrupted = true;
      if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
        _.touchObject = {};
        return false
      }
      if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
        touches = event.originalEvent.touches[0]
      }
      _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
      _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
      _.dragging = true
    };
    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
      var _ = this;
      if (_.$slidesCache !== null) {
        _.unload();
        _.$slideTrack.children(this.options.slide).detach();
        _.$slidesCache.appendTo(_.$slideTrack);
        _.reinit()
      }
    };
    Slick.prototype.unload = function () {
      var _ = this;
      $(".slick-cloned", _.$slider).remove();
      if (_.$dots) {
        _.$dots.remove()
      }
      if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove()
      }
      if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove()
      }
      _.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    };
    Slick.prototype.unslick = function (fromBreakpoint) {
      var _ = this;
      _.$slider.trigger("unslick", [_, fromBreakpoint]);
      _.destroy()
    };
    Slick.prototype.updateArrows = function () {
      var _ = this,
        centerOffset;
      centerOffset = Math.floor(_.options.slidesToShow / 2);
      if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
        _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
        _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
        if (_.currentSlide === 0) {
          _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
          _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
          _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
          _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
        } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
          _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
          _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
        }
      }
    };
    Slick.prototype.updateDots = function () {
      var _ = this;
      if (_.$dots !== null) {
        _.$dots.find("li").removeClass("slick-active").end();
        _.$dots.find("li").eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass("slick-active")
      }
    };
    Slick.prototype.visibility = function () {
      var _ = this;
      if (_.options.autoplay) {
        if (document[_.hidden]) {
          _.interrupted = true
        } else {
          _.interrupted = false
        }
      }
    };
    $.fn.slick = function () {
      var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i, ret;
      for (i = 0; i < l; i++) {
        if (typeof opt == "object" || typeof opt == "undefined") _[i].slick = new Slick(_[i], opt);
        else ret = _[i].slick[opt].apply(_[i].slick, args);
        if (typeof ret != "undefined") return ret
      }
      return _
    }
  });


  function r(e) {
    var o = e && e.offsetParent,
      i = o && o.nodeName;
    return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : e ? e.ownerDocument.documentElement : document.documentElement
  }

  function p(e) {
    var t = e.nodeName;
    return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e)
  }

  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode)
  }

  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = o ? e : t,
      n = o ? t : e,
      a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    var l = a.commonAncestorContainer;
    if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l);
    var f = s(e);
    return f.host ? d(f.host, t) : d(e, s(t).host)
  }

  function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
      o = 'top' === t ? 'scrollTop' : 'scrollLeft',
      i = e.nodeName;
    if ('BODY' === i || 'HTML' === i) {
      var n = e.ownerDocument.documentElement,
        r = e.ownerDocument.scrollingElement || n;
      return r[o]
    }
    return e[o]
  }

  function l(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      i = a(t, 'top'),
      n = a(t, 'left'),
      r = o ? -1 : 1;
    return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e
  }

  function f(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
      i = 'Left' == o ? 'Right' : 'Bottom';
    return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + i + 'Width'], 10)
  }

  function m(e, t, o, i) {
    return J(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], ie() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0)
  }

  function h() {
    var e = document.body,
      t = document.documentElement,
      o = ie() && getComputedStyle(t);
    return {
      height: m('Height', e, t, o),
      width: m('Width', e, t, o)
    }
  }

  function c(e) {
    return se({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    })
  }

  function g(e) {
    var o = {};
    if (ie()) try {
      o = e.getBoundingClientRect();
      var i = a(e, 'top'),
        n = a(e, 'left');
      o.top += i, o.left += n, o.bottom += i, o.right += n
    } catch (e) {} else o = e.getBoundingClientRect();
    var r = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top
      },
      p = 'HTML' === e.nodeName ? h() : {},
      s = p.width || e.clientWidth || r.right - r.left,
      d = p.height || e.clientHeight || r.bottom - r.top,
      l = e.offsetWidth - s,
      m = e.offsetHeight - d;
    if (l || m) {
      var g = t(e);
      l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m
    }
    return c(r)
  }

  function u(e, o) {
    var i = ie(),
      r = 'HTML' === o.nodeName,
      p = g(e),
      s = g(o),
      d = n(e),
      a = t(o),
      f = parseFloat(a.borderTopWidth, 10),
      m = parseFloat(a.borderLeftWidth, 10),
      h = c({
        top: p.top - s.top - f,
        left: p.left - s.left - m,
        width: p.width,
        height: p.height
      });
    if (h.marginTop = 0, h.marginLeft = 0, !i && r) {
      var u = parseFloat(a.marginTop, 10),
        b = parseFloat(a.marginLeft, 10);
      h.top -= f - u, h.bottom -= f - u, h.left -= m - b, h.right -= m - b, h.marginTop = u, h.marginLeft = b
    }
    return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (h = l(h, o)), h
  }

  function b(e) {
    var t = e.ownerDocument.documentElement,
      o = u(e, t),
      i = J(t.clientWidth, window.innerWidth || 0),
      n = J(t.clientHeight, window.innerHeight || 0),
      r = a(t),
      p = a(t, 'left'),
      s = {
        top: r - o.top + o.marginTop,
        left: p - o.left + o.marginLeft,
        width: i,
        height: n
      };
    return c(s)
  }

  function w(e) {
    var i = e.nodeName;
    return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || w(o(e))
  }

  function y(e, t, i, r) {
    var p = {
        top: 0,
        left: 0
      },
      s = d(e, t);
    if ('viewport' === r) p = b(s);
    else {
      var a;
      'scrollParent' === r ? (a = n(o(t)), 'BODY' === a.nodeName && (a = e.ownerDocument.documentElement)) : 'window' === r ? a = e.ownerDocument.documentElement : a = r;
      var l = u(a, s);
      if ('HTML' === a.nodeName && !w(s)) {
        var f = h(),
          m = f.height,
          c = f.width;
        p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, p.right = c + l.left
      } else p = l
    }
    return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p
  }

  function E(e) {
    var t = e.width,
      o = e.height;
    return t * o
  }

  function v(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf('auto')) return e;
    var p = y(o, i, r, n),
      s = {
        top: {
          width: p.width,
          height: t.top - p.top
        },
        right: {
          width: p.right - t.right,
          height: p.height
        },
        bottom: {
          width: p.width,
          height: p.bottom - t.bottom
        },
        left: {
          width: t.left - p.left,
          height: p.height
        }
      },
      d = Object.keys(s).map(function (e) {
        return se({
          key: e
        }, s[e], {
          area: E(s[e])
        })
      }).sort(function (e, t) {
        return t.area - e.area
      }),
      a = d.filter(function (e) {
        var t = e.width,
          i = e.height;
        return t >= o.clientWidth && i >= o.clientHeight
      }),
      l = 0 < a.length ? a[0].key : d[0].key,
      f = e.split('-')[1];
    return l + (f ? '-' + f : '')
  }

  function O(e, t, o) {
    var i = d(t, o);
    return u(o, i)
  }

  function L(e) {
    var t = getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      n = {
        width: e.offsetWidth + i,
        height: e.offsetHeight + o
      };
    return n
  }

  function x(e) {
    var t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e]
    })
  }

  function S(e, t, o) {
    o = o.split('-')[0];
    var i = L(e),
      n = {
        width: i.width,
        height: i.height
      },
      r = -1 !== ['right', 'left'].indexOf(o),
      p = r ? 'top' : 'left',
      s = r ? 'left' : 'top',
      d = r ? 'height' : 'width',
      a = r ? 'width' : 'height';
    return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[x(s)], n
  }

  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0]
  }

  function D(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o
    });
    var i = T(e, function (e) {
      return e[t] === o
    });
    return e.indexOf(i)
  }

  function C(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, D(t, 'name', i));
    return n.forEach(function (t) {
      t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      var i = t['function'] || t.fn;
      t.enabled && e(i) && (o.offsets.popper = c(o.offsets.popper), o.offsets.reference = c(o.offsets.reference), o = i(o, t))
    }), o
  }

  function N() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = O(this.state, this.popper, this.reference), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = C(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
    }
  }

  function k(e, t) {
    return e.some(function (e) {
      var o = e.name,
        i = e.enabled;
      return i && o === t
    })
  }

  function W(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
      var i = t[n],
        r = i ? '' + i + o : e;
      if ('undefined' != typeof document.body.style[r]) return r
    }
    return null
  }

  function P() {
    return this.state.isDestroyed = !0, k(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[W('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
  }

  function B(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window
  }

  function H(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
      p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, {
      passive: !0
    }), r || H(n(p.parentNode), t, o, i), i.push(p)
  }

  function A(e, t, o, i) {
    o.updateBound = i, B(e).addEventListener('resize', o.updateBound, {
      passive: !0
    });
    var r = n(e);
    return H(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
  }

  function I() {
    this.state.eventsEnabled || (this.state = A(this.reference, this.options, this.state, this.scheduleUpdate))
  }

  function M(e, t) {
    return B(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound)
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
  }

  function R() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state))
  }

  function U(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
  }

  function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && U(t[o]) && (i = 'px'), e.style[o] = t[o] + i
    })
  }

  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o])
    })
  }

  function F(e, t, o) {
    var i = T(e, function (e) {
        var o = e.name;
        return o === t
      }),
      n = !!i && e.some(function (e) {
        return e.name === o && e.enabled && e.order < i.order
      });
    if (!n) {
      var r = '`' + t + '`';
      console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
    }
    return n
  }

  function K(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e
  }

  function q(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = ae.indexOf(e),
      i = ae.slice(o + 1).concat(ae.slice(0, o));
    return t ? i.reverse() : i
  }

  function V(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +n[1],
      p = n[2];
    if (!r) return e;
    if (0 === p.indexOf('%')) {
      var s;
      switch (p) {
        case '%p':
          s = o;
          break;
        case '%':
        case '%r':
        default:
          s = i;
      }
      var d = c(s);
      return d[t] / 100 * r
    }
    if ('vh' === p || 'vw' === p) {
      var a;
      return a = 'vh' === p ? J(document.documentElement.clientHeight, window.innerHeight || 0) : J(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
    }
    return r
  }

  function z(e, t, o, i) {
    var n = [0, 0],
      r = -1 !== ['right', 'left'].indexOf(i),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim()
      }),
      s = p.indexOf(T(p, function (e) {
        return -1 !== e.search(/,|\s/)
      }));
    p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    var d = /\s*,\s*|\s+/,
      a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map(function (e, i) {
      var n = (1 === i ? !r : r) ? 'height' : 'width',
        p = !1;
      return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
      }, []).map(function (e) {
        return V(e, n, t, o)
      })
    }), a.forEach(function (e, t) {
      e.forEach(function (o, i) {
        U(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1))
      })
    }), n
  }

  function G(e, t) {
    var o, i = t.offset,
      n = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = n.split('-')[0];
    return o = U(+i) ? [+i, 0] : z(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
  }
  for (var _ = Math.min, X = Math.floor, J = Math.max, Q = 'undefined' != typeof window && 'undefined' != typeof document, Z = ['Edge', 'Trident', 'Firefox'], $ = 0, ee = 0; ee < Z.length; ee += 1)
    if (Q && 0 <= navigator.userAgent.indexOf(Z[ee])) {
      $ = 1;
      break
    } var i, te = Q && window.Promise,
    oe = te ? function (e) {
      var t = !1;
      return function () {
        t || (t = !0, window.Promise.resolve().then(function () {
          t = !1, e()
        }))
      }
    } : function (e) {
      var t = !1;
      return function () {
        t || (t = !0, setTimeout(function () {
          t = !1, e()
        }, $))
      }
    },
    ie = function () {
      return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i
    },
    ne = function (e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
    },
    re = function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
      }
      return function (t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t
      }
    }(),
    pe = function (e, t, o) {
      return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = o, e
    },
    se = Object.assign || function (e) {
      for (var t, o = 1; o < arguments.length; o++)
        for (var i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      return e
    },
    de = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
    ae = de.slice(3),
    le = {
      FLIP: 'flip',
      CLOCKWISE: 'clockwise',
      COUNTERCLOCKWISE: 'counterclockwise'
    },
    fe = function () {
      function t(o, i) {
        var n = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        ne(this, t), this.scheduleUpdate = function () {
          return requestAnimationFrame(n.update)
        }, this.update = oe(this.update.bind(this)), this.options = se({}, t.Defaults, r), this.state = {
          isDestroyed: !1,
          isCreated: !1,
          scrollParents: []
        }, this.reference = o && o.jquery ? o[0] : o, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
          n.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
        }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
          return se({
            name: e
          }, n.options.modifiers[e])
        }).sort(function (e, t) {
          return e.order - t.order
        }), this.modifiers.forEach(function (t) {
          t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
        }), this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), this.state.eventsEnabled = p
      }
      return re(t, [{
        key: 'update',
        value: function () {
          return N.call(this)
        }
      }, {
        key: 'destroy',
        value: function () {
          return P.call(this)
        }
      }, {
        key: 'enableEventListeners',
        value: function () {
          return I.call(this)
        }
      }, {
        key: 'disableEventListeners',
        value: function () {
          return R.call(this)
        }
      }]), t
    }();
  return fe.Utils = ('undefined' == typeof window ? global : window).PopperUtils, fe.placements = de, fe.Defaults = {
    placement: 'bottom',
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function () {},
    onUpdate: function () {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function (e) {
          var t = e.placement,
            o = t.split('-')[0],
            i = t.split('-')[1];
          if (i) {
            var n = e.offsets,
              r = n.reference,
              p = n.popper,
              s = -1 !== ['bottom', 'top'].indexOf(o),
              d = s ? 'left' : 'top',
              a = s ? 'width' : 'height',
              l = {
                start: pe({}, d, r[d]),
                end: pe({}, d, r[d] + r[a] - p[a])
              };
            e.offsets.popper = se({}, p, l[i])
          }
          return e
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: G,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function (e, t) {
          var o = t.boundariesElement || r(e.instance.popper);
          e.instance.reference === o && (o = r(o));
          var i = y(e.instance.popper, e.instance.reference, t.padding, o);
          t.boundaries = i;
          var n = t.priority,
            p = e.offsets.popper,
            s = {
              primary: function (e) {
                var o = p[e];
                return p[e] < i[e] && !t.escapeWithReference && (o = J(p[e], i[e])), pe({}, e, o)
              },
              secondary: function (e) {
                var o = 'right' === e ? 'left' : 'top',
                  n = p[o];
                return p[e] > i[e] && !t.escapeWithReference && (n = _(p[o], i[e] - ('right' === e ? p.width : p.height))), pe({}, o, n)
              }
            };
          return n.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
            p = se({}, p, s[t](e))
          }), e.offsets.popper = p, e
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function (e) {
          var t = e.offsets,
            o = t.popper,
            i = t.reference,
            n = e.placement.split('-')[0],
            r = X,
            p = -1 !== ['top', 'bottom'].indexOf(n),
            s = p ? 'right' : 'bottom',
            d = p ? 'left' : 'top',
            a = p ? 'width' : 'height';
          return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function (e, o) {
          var i;
          if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          var n = o.element;
          if ('string' == typeof n) {
            if (n = e.instance.popper.querySelector(n), !n) return e;
          } else if (!e.instance.popper.contains(n)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
          var r = e.placement.split('-')[0],
            p = e.offsets,
            s = p.popper,
            d = p.reference,
            a = -1 !== ['left', 'right'].indexOf(r),
            l = a ? 'height' : 'width',
            f = a ? 'Top' : 'Left',
            m = f.toLowerCase(),
            h = a ? 'left' : 'top',
            g = a ? 'bottom' : 'right',
            u = L(n)[l];
          d[g] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[g] - u)), d[m] + u > s[g] && (e.offsets.popper[m] += d[m] + u - s[g]), e.offsets.popper = c(e.offsets.popper);
          var b = d[m] + d[l] / 2 - u / 2,
            w = t(e.instance.popper),
            y = parseFloat(w['margin' + f], 10),
            E = parseFloat(w['border' + f + 'Width'], 10),
            v = b - e.offsets.popper[m] - y - E;
          return v = J(_(s[l] - u, v), 0), e.arrowElement = n, e.offsets.arrow = (i = {}, pe(i, m, Math.round(v)), pe(i, h, ''), i), e
        },
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function (e, t) {
          if (k(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var o = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
            i = e.placement.split('-')[0],
            n = x(i),
            r = e.placement.split('-')[1] || '',
            p = [];
          switch (t.behavior) {
            case le.FLIP:
              p = [i, n];
              break;
            case le.CLOCKWISE:
              p = q(i);
              break;
            case le.COUNTERCLOCKWISE:
              p = q(i, !0);
              break;
            default:
              p = t.behavior;
          }
          return p.forEach(function (s, d) {
            if (i !== s || p.length === d + 1) return e;
            i = e.placement.split('-')[0], n = x(i);
            var a = e.offsets.popper,
              l = e.offsets.reference,
              f = X,
              m = 'left' === i && f(a.right) > f(l.left) || 'right' === i && f(a.left) < f(l.right) || 'top' === i && f(a.bottom) > f(l.top) || 'bottom' === i && f(a.top) < f(l.bottom),
              h = f(a.left) < f(o.left),
              c = f(a.right) > f(o.right),
              g = f(a.top) < f(o.top),
              u = f(a.bottom) > f(o.bottom),
              b = 'left' === i && h || 'right' === i && c || 'top' === i && g || 'bottom' === i && u,
              w = -1 !== ['top', 'bottom'].indexOf(i),
              y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
            (m || b || y) && (e.flipped = !0, (m || b) && (i = p[d + 1]), y && (r = K(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = se({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = C(e.instance.modifiers, e, 'flip'))
          }), e
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport'
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function (e) {
          var t = e.placement,
            o = t.split('-')[0],
            i = e.offsets,
            n = i.popper,
            r = i.reference,
            p = -1 !== ['left', 'right'].indexOf(o),
            s = -1 === ['top', 'left'].indexOf(o);
          return n[p ? 'left' : 'top'] = r[o] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = x(t), e.offsets.popper = c(n), e
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function (e) {
          if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          var t = e.offsets.reference,
            o = T(e.instance.modifiers, function (e) {
              return 'preventOverflow' === e.name
            }).boundaries;
          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
          }
          return e
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function (e, t) {
          var o = t.x,
            i = t.y,
            n = e.offsets.popper,
            p = T(e.instance.modifiers, function (e) {
              return 'applyStyle' === e.name
            }).gpuAcceleration;
          void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          var s, d, a = void 0 === p ? t.gpuAcceleration : p,
            l = r(e.instance.popper),
            f = g(l),
            m = {
              position: n.position
            },
            h = {
              left: X(n.left),
              top: X(n.top),
              bottom: X(n.bottom),
              right: X(n.right)
            },
            c = 'bottom' === o ? 'top' : 'bottom',
            u = 'right' === i ? 'left' : 'right',
            b = W('transform');
          if (d = 'bottom' == c ? -f.height + h.bottom : h.top, s = 'right' == u ? -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[u] = 0, m.willChange = 'transform';
          else {
            var w = 'bottom' == c ? -1 : 1,
              y = 'right' == u ? -1 : 1;
            m[c] = d * w, m[u] = s * y, m.willChange = c + ', ' + u
          }
          var E = {
            "x-placement": e.placement
          };
          return e.attributes = se({}, E, e.attributes), e.styles = se({}, m, e.styles), e.arrowStyles = se({}, e.offsets.arrow, e.arrowStyles), e
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function (e) {
          return Y(e.instance.popper, e.styles), j(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && Y(e.arrowElement, e.arrowStyles), e
        },
        onLoad: function (e, t, o, i, n) {
          var r = O(n, t, e),
            p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), Y(t, {
            position: 'absolute'
          }), o
        },
        gpuAcceleration: void 0
      }
    }
  }, fe
});

/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, e, n) {
  "use strict";

  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
    }
  }

  function s(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t
  }

  function r() {
    return (r = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
      }
      return t
    }).apply(this, arguments)
  }
  e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
  var o, a, l, h, c, u, f, d, _, g, p, m, v, E, T, y, C, I, A, b, D, S, w, N, O, k, P = function (t) {
      var e = !1;

      function n(e) {
        var n = this,
          s = !1;
        return t(this).one(i.TRANSITION_END, function () {
          s = !0
        }), setTimeout(function () {
          s || i.triggerTransitionEnd(n)
        }, e), this
      }
      var i = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
          do {
            t += ~~(1e6 * Math.random())
          } while (document.getElementById(t));
          return t
        },
        getSelectorFromElement: function (e) {
          var n, i = e.getAttribute("data-target");
          i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (n = i, i = n = "function" == typeof t.escapeSelector ? t.escapeSelector(n).substr(1) : n.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
          try {
            return t(document).find(i).length > 0 ? i : null
          } catch (t) {
            return null
          }
        },
        reflow: function (t) {
          return t.offsetHeight
        },
        triggerTransitionEnd: function (n) {
          t(n).trigger(e.end)
        },
        supportsTransitionEnd: function () {
          return Boolean(e)
        },
        isElement: function (t) {
          return (t[0] || t).nodeType
        },
        typeCheckConfig: function (t, e, n) {
          for (var s in n)
            if (Object.prototype.hasOwnProperty.call(n, s)) {
              var r = n[s],
                o = e[s],
                a = o && i.isElement(o) ? "element" : (l = o, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
              if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + a + '" but expected type "' + r + '".')
            } var l
        }
      };
      return e = ("undefined" == typeof window || !window.QUnit) && {
        end: "transitionend"
      }, t.fn.emulateTransitionEnd = n, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
        bindType: e.end,
        delegateType: e.end,
        handle: function (e) {
          if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
        }
      }), i
    }(e),
    L = (a = "alert", h = "." + (l = "bs.alert"), c = (o = e).fn[a], u = {
      CLOSE: "close" + h,
      CLOSED: "closed" + h,
      CLICK_DATA_API: "click" + h + ".data-api"
    }, f = "alert", d = "fade", _ = "show", g = function () {
      function t(t) {
        this._element = t
      }
      var e = t.prototype;
      return e.close = function (t) {
        t = t || this._element;
        var e = this._getRootElement(t);
        this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
      }, e.dispose = function () {
        o.removeData(this._element, l), this._element = null
      }, e._getRootElement = function (t) {
        var e = P.getSelectorFromElement(t),
          n = !1;
        return e && (n = o(e)[0]), n || (n = o(t).closest("." + f)[0]), n
      }, e._triggerCloseEvent = function (t) {
        var e = o.Event(u.CLOSE);
        return o(t).trigger(e), e
      }, e._removeElement = function (t) {
        var e = this;
        o(t).removeClass(_), P.supportsTransitionEnd() && o(t).hasClass(d) ? o(t).one(P.TRANSITION_END, function (n) {
          return e._destroyElement(t, n)
        }).emulateTransitionEnd(150) : this._destroyElement(t)
      }, e._destroyElement = function (t) {
        o(t).detach().trigger(u.CLOSED).remove()
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = o(this),
            i = n.data(l);
          i || (i = new t(this), n.data(l, i)), "close" === e && i[e](this)
        })
      }, t._handleDismiss = function (t) {
        return function (e) {
          e && e.preventDefault(), t.close(this)
        }
      }, s(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.0.0"
        }
      }]), t
    }(), o(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), o.fn[a] = g._jQueryInterface, o.fn[a].Constructor = g, o.fn[a].noConflict = function () {
      return o.fn[a] = c, g._jQueryInterface
    }, g),
    R = (m = "button", E = "." + (v = "bs.button"), T = ".data-api", y = (p = e).fn[m], C = "active", I = "btn", A = "focus", b = '[data-toggle^="button"]', D = '[data-toggle="buttons"]', S = "input", w = ".active", N = ".btn", O = {
      CLICK_DATA_API: "click" + E + T,
      FOCUS_BLUR_DATA_API: "focus" + E + T + " blur" + E + T
    }, k = function () {
      function t(t) {
        this._element = t
      }
      var e = t.prototype;
      return e.toggle = function () {
        var t = !0,
          e = !0,
          n = p(this._element).closest(D)[0];
        if (n) {
          var i = p(this._element).find(S)[0];
          if (i) {
            if ("radio" === i.type)
              if (i.checked && p(this._element).hasClass(C)) t = !1;
              else {
                var s = p(n).find(w)[0];
                s && p(s).removeClass(C)
              } if (t) {
              if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
              i.checked = !p(this._element).hasClass(C), p(i).trigger("change")
            }
            i.focus(), e = !1
          }
        }
        e && this._element.setAttribute("aria-pressed", !p(this._element).hasClass(C)), t && p(this._element).toggleClass(C)
      }, e.dispose = function () {
        p.removeData(this._element, v), this._element = null
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = p(this).data(v);
          n || (n = new t(this), p(this).data(v, n)), "toggle" === e && n[e]()
        })
      }, s(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.0.0"
        }
      }]), t
    }(), p(document).on(O.CLICK_DATA_API, b, function (t) {
      t.preventDefault();
      var e = t.target;
      p(e).hasClass(I) || (e = p(e).closest(N)), k._jQueryInterface.call(p(e), "toggle")
    }).on(O.FOCUS_BLUR_DATA_API, b, function (t) {
      var e = p(t.target).closest(N)[0];
      p(e).toggleClass(A, /^focus(in)?$/.test(t.type))
    }), p.fn[m] = k._jQueryInterface, p.fn[m].Constructor = k, p.fn[m].noConflict = function () {
      return p.fn[m] = y, k._jQueryInterface
    }, k),
    j = function (t) {
      var e = "carousel",
        n = "bs.carousel",
        i = "." + n,
        o = t.fn[e],
        a = {
          interval: 5e3,
          keyboard: !0,
          slide: !1,
          pause: "hover",
          wrap: !0
        },
        l = {
          interval: "(number|boolean)",
          keyboard: "boolean",
          slide: "(boolean|string)",
          pause: "(string|boolean)",
          wrap: "boolean"
        },
        h = "next",
        c = "prev",
        u = "left",
        f = "right",
        d = {
          SLIDE: "slide" + i,
          SLID: "slid" + i,
          KEYDOWN: "keydown" + i,
          MOUSEENTER: "mouseenter" + i,
          MOUSELEAVE: "mouseleave" + i,
          TOUCHEND: "touchend" + i,
          LOAD_DATA_API: "load" + i + ".data-api",
          CLICK_DATA_API: "click" + i + ".data-api"
        },
        _ = "carousel",
        g = "active",
        p = "slide",
        m = "carousel-item-right",
        v = "carousel-item-left",
        E = "carousel-item-next",
        T = "carousel-item-prev",
        y = {
          ACTIVE: ".active",
          ACTIVE_ITEM: ".active.carousel-item",
          ITEM: ".carousel-item",
          NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
          INDICATORS: ".carousel-indicators",
          DATA_SLIDE: "[data-slide], [data-slide-to]",
          DATA_RIDE: '[data-ride="carousel"]'
        },
        C = function () {
          function o(e, n) {
            this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(y.INDICATORS)[0], this._addEventListeners()
          }
          var C = o.prototype;
          return C.next = function () {
            this._isSliding || this._slide(h)
          }, C.nextWhenVisible = function () {
            !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
          }, C.prev = function () {
            this._isSliding || this._slide(c)
          }, C.pause = function (e) {
            e || (this._isPaused = !0), t(this._element).find(y.NEXT_PREV)[0] && P.supportsTransitionEnd() && (P.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
          }, C.cycle = function (t) {
            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
          }, C.to = function (e) {
            var n = this;
            this._activeElement = t(this._element).find(y.ACTIVE_ITEM)[0];
            var i = this._getItemIndex(this._activeElement);
            if (!(e > this._items.length - 1 || e < 0))
              if (this._isSliding) t(this._element).one(d.SLID, function () {
                return n.to(e)
              });
              else {
                if (i === e) return this.pause(), void this.cycle();
                var s = e > i ? h : c;
                this._slide(s, this._items[e])
              }
          }, C.dispose = function () {
            t(this._element).off(i), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
          }, C._getConfig = function (t) {
            return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
          }, C._addEventListeners = function () {
            var e = this;
            this._config.keyboard && t(this._element).on(d.KEYDOWN, function (t) {
              return e._keydown(t)
            }), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function (t) {
              return e.pause(t)
            }).on(d.MOUSELEAVE, function (t) {
              return e.cycle(t)
            }), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function () {
              e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
                return e.cycle(t)
              }, 500 + e._config.interval)
            }))
          }, C._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
              case 37:
                t.preventDefault(), this.prev();
                break;
              case 39:
                t.preventDefault(), this.next()
            }
          }, C._getItemIndex = function (e) {
            return this._items = t.makeArray(t(e).parent().find(y.ITEM)), this._items.indexOf(e)
          }, C._getItemByDirection = function (t, e) {
            var n = t === h,
              i = t === c,
              s = this._getItemIndex(e),
              r = this._items.length - 1;
            if ((i && 0 === s || n && s === r) && !this._config.wrap) return e;
            var o = (s + (t === c ? -1 : 1)) % this._items.length;
            return -1 === o ? this._items[this._items.length - 1] : this._items[o]
          }, C._triggerSlideEvent = function (e, n) {
            var i = this._getItemIndex(e),
              s = this._getItemIndex(t(this._element).find(y.ACTIVE_ITEM)[0]),
              r = t.Event(d.SLIDE, {
                relatedTarget: e,
                direction: n,
                from: s,
                to: i
              });
            return t(this._element).trigger(r), r
          }, C._setActiveIndicatorElement = function (e) {
            if (this._indicatorsElement) {
              t(this._indicatorsElement).find(y.ACTIVE).removeClass(g);
              var n = this._indicatorsElement.children[this._getItemIndex(e)];
              n && t(n).addClass(g)
            }
          }, C._slide = function (e, n) {
            var i, s, r, o = this,
              a = t(this._element).find(y.ACTIVE_ITEM)[0],
              l = this._getItemIndex(a),
              c = n || a && this._getItemByDirection(e, a),
              _ = this._getItemIndex(c),
              C = Boolean(this._interval);
            if (e === h ? (i = v, s = E, r = u) : (i = m, s = T, r = f), c && t(c).hasClass(g)) this._isSliding = !1;
            else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
              this._isSliding = !0, C && this.pause(), this._setActiveIndicatorElement(c);
              var I = t.Event(d.SLID, {
                relatedTarget: c,
                direction: r,
                from: l,
                to: _
              });
              P.supportsTransitionEnd() && t(this._element).hasClass(p) ? (t(c).addClass(s), P.reflow(c), t(a).addClass(i), t(c).addClass(i), t(a).one(P.TRANSITION_END, function () {
                t(c).removeClass(i + " " + s).addClass(g), t(a).removeClass(g + " " + s + " " + i), o._isSliding = !1, setTimeout(function () {
                  return t(o._element).trigger(I)
                }, 0)
              }).emulateTransitionEnd(600)) : (t(a).removeClass(g), t(c).addClass(g), this._isSliding = !1, t(this._element).trigger(I)), C && this.cycle()
            }
          }, o._jQueryInterface = function (e) {
            return this.each(function () {
              var i = t(this).data(n),
                s = r({}, a, t(this).data());
              "object" == typeof e && (s = r({}, s, e));
              var l = "string" == typeof e ? e : s.slide;
              if (i || (i = new o(this, s), t(this).data(n, i)), "number" == typeof e) i.to(e);
              else if ("string" == typeof l) {
                if ("undefined" == typeof i[l]) throw new TypeError('No method named "' + l + '"');
                i[l]()
              } else s.interval && (i.pause(), i.cycle())
            })
          }, o._dataApiClickHandler = function (e) {
            var i = P.getSelectorFromElement(this);
            if (i) {
              var s = t(i)[0];
              if (s && t(s).hasClass(_)) {
                var a = r({}, t(s).data(), t(this).data()),
                  l = this.getAttribute("data-slide-to");
                l && (a.interval = !1), o._jQueryInterface.call(t(s), a), l && t(s).data(n).to(l), e.preventDefault()
              }
            }
          }, s(o, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }, {
            key: "Default",
            get: function () {
              return a
            }
          }]), o
        }();
      return t(document).on(d.CLICK_DATA_API, y.DATA_SLIDE, C._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function () {
        t(y.DATA_RIDE).each(function () {
          var e = t(this);
          C._jQueryInterface.call(e, e.data())
        })
      }), t.fn[e] = C._jQueryInterface, t.fn[e].Constructor = C, t.fn[e].noConflict = function () {
        return t.fn[e] = o, C._jQueryInterface
      }, C
    }(e),
    H = function (t) {
      var e = "collapse",
        n = "bs.collapse",
        i = "." + n,
        o = t.fn[e],
        a = {
          toggle: !0,
          parent: ""
        },
        l = {
          toggle: "boolean",
          parent: "(string|element)"
        },
        h = {
          SHOW: "show" + i,
          SHOWN: "shown" + i,
          HIDE: "hide" + i,
          HIDDEN: "hidden" + i,
          CLICK_DATA_API: "click" + i + ".data-api"
        },
        c = "show",
        u = "collapse",
        f = "collapsing",
        d = "collapsed",
        _ = "width",
        g = "height",
        p = {
          ACTIVES: ".show, .collapsing",
          DATA_TOGGLE: '[data-toggle="collapse"]'
        },
        m = function () {
          function i(e, n) {
            this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
            for (var i = t(p.DATA_TOGGLE), s = 0; s < i.length; s++) {
              var r = i[s],
                o = P.getSelectorFromElement(r);
              null !== o && t(o).filter(e).length > 0 && (this._selector = o, this._triggerArray.push(r))
            }
            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
          }
          var o = i.prototype;
          return o.toggle = function () {
            t(this._element).hasClass(c) ? this.hide() : this.show()
          }, o.show = function () {
            var e, s, r = this;
            if (!this._isTransitioning && !t(this._element).hasClass(c) && (this._parent && 0 === (e = t.makeArray(t(this._parent).find(p.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (s = t(e).not(this._selector).data(n)) && s._isTransitioning))) {
              var o = t.Event(h.SHOW);
              if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
                e && (i._jQueryInterface.call(t(e).not(this._selector), "hide"), s || t(e).data(n, null));
                var a = this._getDimension();
                t(this._element).removeClass(u).addClass(f), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(d).attr("aria-expanded", !0), this.setTransitioning(!0);
                var l = function () {
                  t(r._element).removeClass(f).addClass(u).addClass(c), r._element.style[a] = "", r.setTransitioning(!1), t(r._element).trigger(h.SHOWN)
                };
                if (P.supportsTransitionEnd()) {
                  var _ = "scroll" + (a[0].toUpperCase() + a.slice(1));
                  t(this._element).one(P.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[_] + "px"
                } else l()
              }
            }
          }, o.hide = function () {
            var e = this;
            if (!this._isTransitioning && t(this._element).hasClass(c)) {
              var n = t.Event(h.HIDE);
              if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                var i = this._getDimension();
                if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", P.reflow(this._element), t(this._element).addClass(f).removeClass(u).removeClass(c), this._triggerArray.length > 0)
                  for (var s = 0; s < this._triggerArray.length; s++) {
                    var r = this._triggerArray[s],
                      o = P.getSelectorFromElement(r);
                    if (null !== o) t(o).hasClass(c) || t(r).addClass(d).attr("aria-expanded", !1)
                  }
                this.setTransitioning(!0);
                var a = function () {
                  e.setTransitioning(!1), t(e._element).removeClass(f).addClass(u).trigger(h.HIDDEN)
                };
                this._element.style[i] = "", P.supportsTransitionEnd() ? t(this._element).one(P.TRANSITION_END, a).emulateTransitionEnd(600) : a()
              }
            }
          }, o.setTransitioning = function (t) {
            this._isTransitioning = t
          }, o.dispose = function () {
            t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
          }, o._getConfig = function (t) {
            return (t = r({}, a, t)).toggle = Boolean(t.toggle), P.typeCheckConfig(e, t, l), t
          }, o._getDimension = function () {
            return t(this._element).hasClass(_) ? _ : g
          }, o._getParent = function () {
            var e = this,
              n = null;
            P.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
            var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
            return t(n).find(s).each(function (t, n) {
              e._addAriaAndCollapsedClass(i._getTargetFromElement(n), [n])
            }), n
          }, o._addAriaAndCollapsedClass = function (e, n) {
            if (e) {
              var i = t(e).hasClass(c);
              n.length > 0 && t(n).toggleClass(d, !i).attr("aria-expanded", i)
            }
          }, i._getTargetFromElement = function (e) {
            var n = P.getSelectorFromElement(e);
            return n ? t(n)[0] : null
          }, i._jQueryInterface = function (e) {
            return this.each(function () {
              var s = t(this),
                o = s.data(n),
                l = r({}, a, s.data(), "object" == typeof e && e);
              if (!o && l.toggle && /show|hide/.test(e) && (l.toggle = !1), o || (o = new i(this, l), s.data(n, o)), "string" == typeof e) {
                if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
                o[e]()
              }
            })
          }, s(i, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }, {
            key: "Default",
            get: function () {
              return a
            }
          }]), i
        }();
      return t(document).on(h.CLICK_DATA_API, p.DATA_TOGGLE, function (e) {
        "A" === e.currentTarget.tagName && e.preventDefault();
        var i = t(this),
          s = P.getSelectorFromElement(this);
        t(s).each(function () {
          var e = t(this),
            s = e.data(n) ? "toggle" : i.data();
          m._jQueryInterface.call(e, s)
        })
      }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
        return t.fn[e] = o, m._jQueryInterface
      }, m
    }(e),
    W = function (t) {
      var e = "dropdown",
        i = "bs.dropdown",
        o = "." + i,
        a = ".data-api",
        l = t.fn[e],
        h = new RegExp("38|40|27"),
        c = {
          HIDE: "hide" + o,
          HIDDEN: "hidden" + o,
          SHOW: "show" + o,
          SHOWN: "shown" + o,
          CLICK: "click" + o,
          CLICK_DATA_API: "click" + o + a,
          KEYDOWN_DATA_API: "keydown" + o + a,
          KEYUP_DATA_API: "keyup" + o + a
        },
        u = "disabled",
        f = "show",
        d = "dropup",
        _ = "dropright",
        g = "dropleft",
        p = "dropdown-menu-right",
        m = "dropdown-menu-left",
        v = "position-static",
        E = '[data-toggle="dropdown"]',
        T = ".dropdown form",
        y = ".dropdown-menu",
        C = ".navbar-nav",
        I = ".dropdown-menu .dropdown-item:not(.disabled)",
        A = "top-start",
        b = "top-end",
        D = "bottom-start",
        S = "bottom-end",
        w = "right-start",
        N = "left-start",
        O = {
          offset: 0,
          flip: !0,
          boundary: "scrollParent"
        },
        k = {
          offset: "(number|string|function)",
          flip: "boolean",
          boundary: "(string|element)"
        },
        L = function () {
          function a(t, e) {
            this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
          }
          var l = a.prototype;
          return l.toggle = function () {
            if (!this._element.disabled && !t(this._element).hasClass(u)) {
              var e = a._getParentFromElement(this._element),
                i = t(this._menu).hasClass(f);
              if (a._clearMenus(), !i) {
                var s = {
                    relatedTarget: this._element
                  },
                  r = t.Event(c.SHOW, s);
                if (t(e).trigger(r), !r.isDefaultPrevented()) {
                  if (!this._inNavbar) {
                    if ("undefined" == typeof n) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                    var o = this._element;
                    t(e).hasClass(d) && (t(this._menu).hasClass(m) || t(this._menu).hasClass(p)) && (o = e), "scrollParent" !== this._config.boundary && t(e).addClass(v), this._popper = new n(o, this._menu, this._getPopperConfig())
                  }
                  "ontouchstart" in document.documentElement && 0 === t(e).closest(C).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(f), t(e).toggleClass(f).trigger(t.Event(c.SHOWN, s))
                }
              }
            }
          }, l.dispose = function () {
            t.removeData(this._element, i), t(this._element).off(o), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
          }, l.update = function () {
            this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
          }, l._addEventListeners = function () {
            var e = this;
            t(this._element).on(c.CLICK, function (t) {
              t.preventDefault(), t.stopPropagation(), e.toggle()
            })
          }, l._getConfig = function (n) {
            return n = r({}, this.constructor.Default, t(this._element).data(), n), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
          }, l._getMenuElement = function () {
            if (!this._menu) {
              var e = a._getParentFromElement(this._element);
              this._menu = t(e).find(y)[0]
            }
            return this._menu
          }, l._getPlacement = function () {
            var e = t(this._element).parent(),
              n = D;
            return e.hasClass(d) ? (n = A, t(this._menu).hasClass(p) && (n = b)) : e.hasClass(_) ? n = w : e.hasClass(g) ? n = N : t(this._menu).hasClass(p) && (n = S), n
          }, l._detectNavbar = function () {
            return t(this._element).closest(".navbar").length > 0
          }, l._getPopperConfig = function () {
            var t = this,
              e = {};
            return "function" == typeof this._config.offset ? e.fn = function (e) {
              return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
            } : e.offset = this._config.offset, {
              placement: this._getPlacement(),
              modifiers: {
                offset: e,
                flip: {
                  enabled: this._config.flip
                },
                preventOverflow: {
                  boundariesElement: this._config.boundary
                }
              }
            }
          }, a._jQueryInterface = function (e) {
            return this.each(function () {
              var n = t(this).data(i);
              if (n || (n = new a(this, "object" == typeof e ? e : null), t(this).data(i, n)), "string" == typeof e) {
                if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                n[e]()
              }
            })
          }, a._clearMenus = function (e) {
            if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
              for (var n = t.makeArray(t(E)), s = 0; s < n.length; s++) {
                var r = a._getParentFromElement(n[s]),
                  o = t(n[s]).data(i),
                  l = {
                    relatedTarget: n[s]
                  };
                if (o) {
                  var h = o._menu;
                  if (t(r).hasClass(f) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(r, e.target))) {
                    var u = t.Event(c.HIDE, l);
                    t(r).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), n[s].setAttribute("aria-expanded", "false"), t(h).removeClass(f), t(r).removeClass(f).trigger(t.Event(c.HIDDEN, l)))
                  }
                }
              }
          }, a._getParentFromElement = function (e) {
            var n, i = P.getSelectorFromElement(e);
            return i && (n = t(i)[0]), n || e.parentNode
          }, a._dataApiKeydownHandler = function (e) {
            if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(y).length)) : h.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(u))) {
              var n = a._getParentFromElement(this),
                i = t(n).hasClass(f);
              if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
                var s = t(n).find(I).get();
                if (0 !== s.length) {
                  var r = s.indexOf(e.target);
                  38 === e.which && r > 0 && r--, 40 === e.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus()
                }
              } else {
                if (27 === e.which) {
                  var o = t(n).find(E)[0];
                  t(o).trigger("focus")
                }
                t(this).trigger("click")
              }
            }
          }, s(a, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }, {
            key: "Default",
            get: function () {
              return O
            }
          }, {
            key: "DefaultType",
            get: function () {
              return k
            }
          }]), a
        }();
      return t(document).on(c.KEYDOWN_DATA_API, E, L._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, y, L._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, L._clearMenus).on(c.CLICK_DATA_API, E, function (e) {
        e.preventDefault(), e.stopPropagation(), L._jQueryInterface.call(t(this), "toggle")
      }).on(c.CLICK_DATA_API, T, function (t) {
        t.stopPropagation()
      }), t.fn[e] = L._jQueryInterface, t.fn[e].Constructor = L, t.fn[e].noConflict = function () {
        return t.fn[e] = l, L._jQueryInterface
      }, L
    }(e),
    M = function (t) {
      var e = "modal",
        n = "bs.modal",
        i = "." + n,
        o = t.fn.modal,
        a = {
          backdrop: !0,
          keyboard: !0,
          focus: !0,
          show: !0
        },
        l = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          focus: "boolean",
          show: "boolean"
        },
        h = {
          HIDE: "hide" + i,
          HIDDEN: "hidden" + i,
          SHOW: "show" + i,
          SHOWN: "shown" + i,
          FOCUSIN: "focusin" + i,
          RESIZE: "resize" + i,
          CLICK_DISMISS: "click.dismiss" + i,
          KEYDOWN_DISMISS: "keydown.dismiss" + i,
          MOUSEUP_DISMISS: "mouseup.dismiss" + i,
          MOUSEDOWN_DISMISS: "mousedown.dismiss" + i,
          CLICK_DATA_API: "click" + i + ".data-api"
        },
        c = "modal-scrollbar-measure",
        u = "modal-backdrop",
        f = "modal-open",
        d = "fade",
        _ = "show",
        g = {
          DIALOG: ".modal-dialog",
          DATA_TOGGLE: '[data-toggle="modal"]',
          DATA_DISMISS: '[data-dismiss="modal"]',
          FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          STICKY_CONTENT: ".sticky-top",
          NAVBAR_TOGGLER: ".navbar-toggler"
        },
        p = function () {
          function o(e, n) {
            this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(g.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
          }
          var p = o.prototype;
          return p.toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t)
          }, p.show = function (e) {
            var n = this;
            if (!this._isTransitioning && !this._isShown) {
              P.supportsTransitionEnd() && t(this._element).hasClass(d) && (this._isTransitioning = !0);
              var i = t.Event(h.SHOW, {
                relatedTarget: e
              });
              t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(f), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(h.CLICK_DISMISS, g.DATA_DISMISS, function (t) {
                return n.hide(t)
              }), t(this._dialog).on(h.MOUSEDOWN_DISMISS, function () {
                t(n._element).one(h.MOUSEUP_DISMISS, function (e) {
                  t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                })
              }), this._showBackdrop(function () {
                return n._showElement(e)
              }))
            }
          }, p.hide = function (e) {
            var n = this;
            if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
              var i = t.Event(h.HIDE);
              if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                this._isShown = !1;
                var s = P.supportsTransitionEnd() && t(this._element).hasClass(d);
                s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(h.FOCUSIN), t(this._element).removeClass(_), t(this._element).off(h.CLICK_DISMISS), t(this._dialog).off(h.MOUSEDOWN_DISMISS), s ? t(this._element).one(P.TRANSITION_END, function (t) {
                  return n._hideModal(t)
                }).emulateTransitionEnd(300) : this._hideModal()
              }
            }
          }, p.dispose = function () {
            t.removeData(this._element, n), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
          }, p.handleUpdate = function () {
            this._adjustDialog()
          }, p._getConfig = function (t) {
            return t = r({}, a, t), P.typeCheckConfig(e, t, l), t
          }, p._showElement = function (e) {
            var n = this,
              i = P.supportsTransitionEnd() && t(this._element).hasClass(d);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && P.reflow(this._element), t(this._element).addClass(_), this._config.focus && this._enforceFocus();
            var s = t.Event(h.SHOWN, {
                relatedTarget: e
              }),
              r = function () {
                n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(s)
              };
            i ? t(this._dialog).one(P.TRANSITION_END, r).emulateTransitionEnd(300) : r()
          }, p._enforceFocus = function () {
            var e = this;
            t(document).off(h.FOCUSIN).on(h.FOCUSIN, function (n) {
              document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus()
            })
          }, p._setEscapeEvent = function () {
            var e = this;
            this._isShown && this._config.keyboard ? t(this._element).on(h.KEYDOWN_DISMISS, function (t) {
              27 === t.which && (t.preventDefault(), e.hide())
            }) : this._isShown || t(this._element).off(h.KEYDOWN_DISMISS)
          }, p._setResizeEvent = function () {
            var e = this;
            this._isShown ? t(window).on(h.RESIZE, function (t) {
              return e.handleUpdate(t)
            }) : t(window).off(h.RESIZE)
          }, p._hideModal = function () {
            var e = this;
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
              t(document.body).removeClass(f), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(h.HIDDEN)
            })
          }, p._removeBackdrop = function () {
            this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
          }, p._showBackdrop = function (e) {
            var n = this,
              i = t(this._element).hasClass(d) ? d : "";
            if (this._isShown && this._config.backdrop) {
              var s = P.supportsTransitionEnd() && i;
              if (this._backdrop = document.createElement("div"), this._backdrop.className = u, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(h.CLICK_DISMISS, function (t) {
                  n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                }), s && P.reflow(this._backdrop), t(this._backdrop).addClass(_), !e) return;
              if (!s) return void e();
              t(this._backdrop).one(P.TRANSITION_END, e).emulateTransitionEnd(150)
            } else if (!this._isShown && this._backdrop) {
              t(this._backdrop).removeClass(_);
              var r = function () {
                n._removeBackdrop(), e && e()
              };
              P.supportsTransitionEnd() && t(this._element).hasClass(d) ? t(this._backdrop).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r()
            } else e && e()
          }, p._adjustDialog = function () {
            var t = this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
          }, p._resetAdjustments = function () {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
          }, p._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
          }, p._setScrollbar = function () {
            var e = this;
            if (this._isBodyOverflowing) {
              t(g.FIXED_CONTENT).each(function (n, i) {
                var s = t(i)[0].style.paddingRight,
                  r = t(i).css("padding-right");
                t(i).data("padding-right", s).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px")
              }), t(g.STICKY_CONTENT).each(function (n, i) {
                var s = t(i)[0].style.marginRight,
                  r = t(i).css("margin-right");
                t(i).data("margin-right", s).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px")
              }), t(g.NAVBAR_TOGGLER).each(function (n, i) {
                var s = t(i)[0].style.marginRight,
                  r = t(i).css("margin-right");
                t(i).data("margin-right", s).css("margin-right", parseFloat(r) + e._scrollbarWidth + "px")
              });
              var n = document.body.style.paddingRight,
                i = t("body").css("padding-right");
              t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
            }
          }, p._resetScrollbar = function () {
            t(g.FIXED_CONTENT).each(function (e, n) {
              var i = t(n).data("padding-right");
              "undefined" != typeof i && t(n).css("padding-right", i).removeData("padding-right")
            }), t(g.STICKY_CONTENT + ", " + g.NAVBAR_TOGGLER).each(function (e, n) {
              var i = t(n).data("margin-right");
              "undefined" != typeof i && t(n).css("margin-right", i).removeData("margin-right")
            });
            var e = t("body").data("padding-right");
            "undefined" != typeof e && t("body").css("padding-right", e).removeData("padding-right")
          }, p._getScrollbarWidth = function () {
            var t = document.createElement("div");
            t.className = c, document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e
          }, o._jQueryInterface = function (e, i) {
            return this.each(function () {
              var s = t(this).data(n),
                a = r({}, o.Default, t(this).data(), "object" == typeof e && e);
              if (s || (s = new o(this, a), t(this).data(n, s)), "string" == typeof e) {
                if ("undefined" == typeof s[e]) throw new TypeError('No method named "' + e + '"');
                s[e](i)
              } else a.show && s.show(i)
            })
          }, s(o, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }, {
            key: "Default",
            get: function () {
              return a
            }
          }]), o
        }();
      return t(document).on(h.CLICK_DATA_API, g.DATA_TOGGLE, function (e) {
        var i, s = this,
          o = P.getSelectorFromElement(this);
        o && (i = t(o)[0]);
        var a = t(i).data(n) ? "toggle" : r({}, t(i).data(), t(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
        var l = t(i).one(h.SHOW, function (e) {
          e.isDefaultPrevented() || l.one(h.HIDDEN, function () {
            t(s).is(":visible") && s.focus()
          })
        });
        p._jQueryInterface.call(t(i), a, this)
      }), t.fn.modal = p._jQueryInterface, t.fn.modal.Constructor = p, t.fn.modal.noConflict = function () {
        return t.fn.modal = o, p._jQueryInterface
      }, p
    }(e),
    U = function (t) {
      var e = "tooltip",
        i = "bs.tooltip",
        o = "." + i,
        a = t.fn[e],
        l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        h = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)"
        },
        c = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left"
        },
        u = {
          animation: !0,
          template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: "hover focus",
          title: "",
          delay: 0,
          html: !1,
          selector: !1,
          placement: "top",
          offset: 0,
          container: !1,
          fallbackPlacement: "flip",
          boundary: "scrollParent"
        },
        f = "show",
        d = "out",
        _ = {
          HIDE: "hide" + o,
          HIDDEN: "hidden" + o,
          SHOW: "show" + o,
          SHOWN: "shown" + o,
          INSERTED: "inserted" + o,
          CLICK: "click" + o,
          FOCUSIN: "focusin" + o,
          FOCUSOUT: "focusout" + o,
          MOUSEENTER: "mouseenter" + o,
          MOUSELEAVE: "mouseleave" + o
        },
        g = "fade",
        p = "show",
        m = ".tooltip-inner",
        v = ".arrow",
        E = "hover",
        T = "focus",
        y = "click",
        C = "manual",
        I = function () {
          function a(t, e) {
            if ("undefined" == typeof n) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
            this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
          }
          var I = a.prototype;
          return I.enable = function () {
            this._isEnabled = !0
          }, I.disable = function () {
            this._isEnabled = !1
          }, I.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled
          }, I.toggle = function (e) {
            if (this._isEnabled)
              if (e) {
                var n = this.constructor.DATA_KEY,
                  i = t(e.currentTarget).data(n);
                i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
              } else {
                if (t(this.getTipElement()).hasClass(p)) return void this._leave(null, this);
                this._enter(null, this)
              }
          }, I.dispose = function () {
            clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
          }, I.show = function () {
            var e = this;
            if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
            var i = t.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              t(this.element).trigger(i);
              var s = t.contains(this.element.ownerDocument.documentElement, this.element);
              if (i.isDefaultPrevented() || !s) return;
              var r = this.getTipElement(),
                o = P.getUID(this.constructor.NAME);
              r.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && t(r).addClass(g);
              var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                h = this._getAttachment(l);
              this.addAttachmentClass(h);
              var c = !1 === this.config.container ? document.body : t(this.config.container);
              t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
                placement: h,
                modifiers: {
                  offset: {
                    offset: this.config.offset
                  },
                  flip: {
                    behavior: this.config.fallbackPlacement
                  },
                  arrow: {
                    element: v
                  },
                  preventOverflow: {
                    boundariesElement: this.config.boundary
                  }
                },
                onCreate: function (t) {
                  t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                },
                onUpdate: function (t) {
                  e._handlePopperPlacementChange(t)
                }
              }), t(r).addClass(p), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
              var u = function () {
                e.config.animation && e._fixTransition();
                var n = e._hoverState;
                e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === d && e._leave(null, e)
              };
              P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(this.tip).one(P.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION) : u()
            }
          }, I.hide = function (e) {
            var n = this,
              i = this.getTipElement(),
              s = t.Event(this.constructor.Event.HIDE),
              r = function () {
                n._hoverState !== f && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
              };
            t(this.element).trigger(s), s.isDefaultPrevented() || (t(i).removeClass(p), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[y] = !1, this._activeTrigger[T] = !1, this._activeTrigger[E] = !1, P.supportsTransitionEnd() && t(this.tip).hasClass(g) ? t(i).one(P.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
          }, I.update = function () {
            null !== this._popper && this._popper.scheduleUpdate()
          }, I.isWithContent = function () {
            return Boolean(this.getTitle())
          }, I.addAttachmentClass = function (e) {
            t(this.getTipElement()).addClass("bs-tooltip-" + e)
          }, I.getTipElement = function () {
            return this.tip = this.tip || t(this.config.template)[0], this.tip
          }, I.setContent = function () {
            var e = t(this.getTipElement());
            this.setElementContent(e.find(m), this.getTitle()), e.removeClass(g + " " + p)
          }, I.setElementContent = function (e, n) {
            var i = this.config.html;
            "object" == typeof n && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? "html" : "text"](n)
          }, I.getTitle = function () {
            var t = this.element.getAttribute("data-original-title");
            return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
          }, I._getAttachment = function (t) {
            return c[t.toUpperCase()]
          }, I._setListeners = function () {
            var e = this;
            this.config.trigger.split(" ").forEach(function (n) {
              if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                return e.toggle(t)
              });
              else if (n !== C) {
                var i = n === E ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                  s = n === E ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                t(e.element).on(i, e.config.selector, function (t) {
                  return e._enter(t)
                }).on(s, e.config.selector, function (t) {
                  return e._leave(t)
                })
              }
              t(e.element).closest(".modal").on("hide.bs.modal", function () {
                return e.hide()
              })
            }), this.config.selector ? this.config = r({}, this.config, {
              trigger: "manual",
              selector: ""
            }) : this._fixTitle()
          }, I._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
          }, I._enter = function (e, n) {
            var i = this.constructor.DATA_KEY;
            (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? T : E] = !0), t(n.getTipElement()).hasClass(p) || n._hoverState === f ? n._hoverState = f : (clearTimeout(n._timeout), n._hoverState = f, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
              n._hoverState === f && n.show()
            }, n.config.delay.show) : n.show())
          }, I._leave = function (e, n) {
            var i = this.constructor.DATA_KEY;
            (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? T : E] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = d, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
              n._hoverState === d && n.hide()
            }, n.config.delay.hide) : n.hide())
          }, I._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger)
              if (this._activeTrigger[t]) return !0;
            return !1
          }, I._getConfig = function (n) {
            return "number" == typeof (n = r({}, this.constructor.Default, t(this.element).data(), n)).delay && (n.delay = {
              show: n.delay,
              hide: n.delay
            }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), P.typeCheckConfig(e, n, this.constructor.DefaultType), n
          }, I._getDelegateConfig = function () {
            var t = {};
            if (this.config)
              for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
            return t
          }, I._cleanTipClass = function () {
            var e = t(this.getTipElement()),
              n = e.attr("class").match(l);
            null !== n && n.length > 0 && e.removeClass(n.join(""))
          }, I._handlePopperPlacementChange = function (t) {
            this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
          }, I._fixTransition = function () {
            var e = this.getTipElement(),
              n = this.config.animation;
            null === e.getAttribute("x-placement") && (t(e).removeClass(g), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
          }, a._jQueryInterface = function (e) {
            return this.each(function () {
              var n = t(this).data(i),
                s = "object" == typeof e && e;
              if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, s), t(this).data(i, n)), "string" == typeof e)) {
                if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                n[e]()
              }
            })
          }, s(a, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }, {
            key: "Default",
            get: function () {
              return u
            }
          }, {
            key: "NAME",
            get: function () {
              return e
            }
          }, {
            key: "DATA_KEY",
            get: function () {
              return i
            }
          }, {
            key: "Event",
            get: function () {
              return _
            }
          }, {
            key: "EVENT_KEY",
            get: function () {
              return o
            }
          }, {
            key: "DefaultType",
            get: function () {
              return h
            }
          }]), a
        }();
      return t.fn[e] = I._jQueryInterface, t.fn[e].Constructor = I, t.fn[e].noConflict = function () {
        return t.fn[e] = a, I._jQueryInterface
      }, I
    }(e),
    x = function (t) {
      var e = "popover",
        n = "bs.popover",
        i = "." + n,
        o = t.fn[e],
        a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        l = r({}, U.Default, {
          placement: "right",
          trigger: "click",
          content: "",
          template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        h = r({}, U.DefaultType, {
          content: "(string|element|function)"
        }),
        c = "fade",
        u = "show",
        f = ".popover-header",
        d = ".popover-body",
        _ = {
          HIDE: "hide" + i,
          HIDDEN: "hidden" + i,
          SHOW: "show" + i,
          SHOWN: "shown" + i,
          INSERTED: "inserted" + i,
          CLICK: "click" + i,
          FOCUSIN: "focusin" + i,
          FOCUSOUT: "focusout" + i,
          MOUSEENTER: "mouseenter" + i,
          MOUSELEAVE: "mouseleave" + i
        },
        g = function (r) {
          var o, g;

          function p() {
            return r.apply(this, arguments) || this
          }
          g = r, (o = p).prototype = Object.create(g.prototype), o.prototype.constructor = o, o.__proto__ = g;
          var m = p.prototype;
          return m.isWithContent = function () {
            return this.getTitle() || this._getContent()
          }, m.addAttachmentClass = function (e) {
            t(this.getTipElement()).addClass("bs-popover-" + e)
          }, m.getTipElement = function () {
            return this.tip = this.tip || t(this.config.template)[0], this.tip
          }, m.setContent = function () {
            var e = t(this.getTipElement());
            this.setElementContent(e.find(f), this.getTitle());
            var n = this._getContent();
            "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(d), n), e.removeClass(c + " " + u)
          }, m._getContent = function () {
            return this.element.getAttribute("data-content") || this.config.content
          }, m._cleanTipClass = function () {
            var e = t(this.getTipElement()),
              n = e.attr("class").match(a);
            null !== n && n.length > 0 && e.removeClass(n.join(""))
          }, p._jQueryInterface = function (e) {
            return this.each(function () {
              var i = t(this).data(n),
                s = "object" == typeof e ? e : null;
              if ((i || !/destroy|hide/.test(e)) && (i || (i = new p(this, s), t(this).data(n, i)), "string" == typeof e)) {
                if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                i[e]()
              }
            })
          }, s(p, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }, {
            key: "Default",
            get: function () {
              return l
            }
          }, {
            key: "NAME",
            get: function () {
              return e
            }
          }, {
            key: "DATA_KEY",
            get: function () {
              return n
            }
          }, {
            key: "Event",
            get: function () {
              return _
            }
          }, {
            key: "EVENT_KEY",
            get: function () {
              return i
            }
          }, {
            key: "DefaultType",
            get: function () {
              return h
            }
          }]), p
        }(U);
      return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
        return t.fn[e] = o, g._jQueryInterface
      }, g
    }(e),
    K = function (t) {
      var e = "scrollspy",
        n = "bs.scrollspy",
        i = "." + n,
        o = t.fn[e],
        a = {
          offset: 10,
          method: "auto",
          target: ""
        },
        l = {
          offset: "number",
          method: "string",
          target: "(string|element)"
        },
        h = {
          ACTIVATE: "activate" + i,
          SCROLL: "scroll" + i,
          LOAD_DATA_API: "load" + i + ".data-api"
        },
        c = "dropdown-item",
        u = "active",
        f = {
          DATA_SPY: '[data-spy="scroll"]',
          ACTIVE: ".active",
          NAV_LIST_GROUP: ".nav, .list-group",
          NAV_LINKS: ".nav-link",
          NAV_ITEMS: ".nav-item",
          LIST_ITEMS: ".list-group-item",
          DROPDOWN: ".dropdown",
          DROPDOWN_ITEMS: ".dropdown-item",
          DROPDOWN_TOGGLE: ".dropdown-toggle"
        },
        d = "offset",
        _ = "position",
        g = function () {
          function o(e, n) {
            var i = this;
            this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + f.NAV_LINKS + "," + this._config.target + " " + f.LIST_ITEMS + "," + this._config.target + " " + f.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function (t) {
              return i._process(t)
            }), this.refresh(), this._process()
          }
          var g = o.prototype;
          return g.refresh = function () {
            var e = this,
              n = this._scrollElement === this._scrollElement.window ? d : _,
              i = "auto" === this._config.method ? n : this._config.method,
              s = i === _ ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
              var n, r = P.getSelectorFromElement(e);
              if (r && (n = t(r)[0]), n) {
                var o = n.getBoundingClientRect();
                if (o.width || o.height) return [t(n)[i]().top + s, r]
              }
              return null
            }).filter(function (t) {
              return t
            }).sort(function (t, e) {
              return t[0] - e[0]
            }).forEach(function (t) {
              e._offsets.push(t[0]), e._targets.push(t[1])
            })
          }, g.dispose = function () {
            t.removeData(this._element, n), t(this._scrollElement).off(i), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
          }, g._getConfig = function (n) {
            if ("string" != typeof (n = r({}, a, n)).target) {
              var i = t(n.target).attr("id");
              i || (i = P.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
            }
            return P.typeCheckConfig(e, n, l), n
          }, g._getScrollTop = function () {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
          }, g._getScrollHeight = function () {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
          }, g._getOffsetHeight = function () {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
          }, g._process = function () {
            var t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              n = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), t >= n) {
              var i = this._targets[this._targets.length - 1];
              this._activeTarget !== i && this._activate(i)
            } else {
              if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
              for (var s = this._offsets.length; s--;) {
                this._activeTarget !== this._targets[s] && t >= this._offsets[s] && ("undefined" == typeof this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s])
              }
            }
          }, g._activate = function (e) {
            this._activeTarget = e, this._clear();
            var n = this._selector.split(",");
            n = n.map(function (t) {
              return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
            });
            var i = t(n.join(","));
            i.hasClass(c) ? (i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u), i.addClass(u)) : (i.addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_LINKS + ", " + f.LIST_ITEMS).addClass(u), i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)), t(this._scrollElement).trigger(h.ACTIVATE, {
              relatedTarget: e
            })
          }, g._clear = function () {
            t(this._selector).filter(f.ACTIVE).removeClass(u)
          }, o._jQueryInterface = function (e) {
            return this.each(function () {
              var i = t(this).data(n);
              if (i || (i = new o(this, "object" == typeof e && e), t(this).data(n, i)), "string" == typeof e) {
                if ("undefined" == typeof i[e]) throw new TypeError('No method named "' + e + '"');
                i[e]()
              }
            })
          }, s(o, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }, {
            key: "Default",
            get: function () {
              return a
            }
          }]), o
        }();
      return t(window).on(h.LOAD_DATA_API, function () {
        for (var e = t.makeArray(t(f.DATA_SPY)), n = e.length; n--;) {
          var i = t(e[n]);
          g._jQueryInterface.call(i, i.data())
        }
      }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
        return t.fn[e] = o, g._jQueryInterface
      }, g
    }(e),
    V = function (t) {
      var e = "bs.tab",
        n = "." + e,
        i = t.fn.tab,
        r = {
          HIDE: "hide" + n,
          HIDDEN: "hidden" + n,
          SHOW: "show" + n,
          SHOWN: "shown" + n,
          CLICK_DATA_API: "click.bs.tab.data-api"
        },
        o = "dropdown-menu",
        a = "active",
        l = "disabled",
        h = "fade",
        c = "show",
        u = ".dropdown",
        f = ".nav, .list-group",
        d = ".active",
        _ = "> li > .active",
        g = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        p = ".dropdown-toggle",
        m = "> .dropdown-menu .active",
        v = function () {
          function n(t) {
            this._element = t
          }
          var i = n.prototype;
          return i.show = function () {
            var e = this;
            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(a) || t(this._element).hasClass(l))) {
              var n, i, s = t(this._element).closest(f)[0],
                o = P.getSelectorFromElement(this._element);
              if (s) {
                var h = "UL" === s.nodeName ? _ : d;
                i = (i = t.makeArray(t(s).find(h)))[i.length - 1]
              }
              var c = t.Event(r.HIDE, {
                  relatedTarget: this._element
                }),
                u = t.Event(r.SHOW, {
                  relatedTarget: i
                });
              if (i && t(i).trigger(c), t(this._element).trigger(u), !u.isDefaultPrevented() && !c.isDefaultPrevented()) {
                o && (n = t(o)[0]), this._activate(this._element, s);
                var g = function () {
                  var n = t.Event(r.HIDDEN, {
                      relatedTarget: e._element
                    }),
                    s = t.Event(r.SHOWN, {
                      relatedTarget: i
                    });
                  t(i).trigger(n), t(e._element).trigger(s)
                };
                n ? this._activate(n, n.parentNode, g) : g()
              }
            }
          }, i.dispose = function () {
            t.removeData(this._element, e), this._element = null
          }, i._activate = function (e, n, i) {
            var s = this,
              r = ("UL" === n.nodeName ? t(n).find(_) : t(n).children(d))[0],
              o = i && P.supportsTransitionEnd() && r && t(r).hasClass(h),
              a = function () {
                return s._transitionComplete(e, r, i)
              };
            r && o ? t(r).one(P.TRANSITION_END, a).emulateTransitionEnd(150) : a()
          }, i._transitionComplete = function (e, n, i) {
            if (n) {
              t(n).removeClass(c + " " + a);
              var s = t(n.parentNode).find(m)[0];
              s && t(s).removeClass(a), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
            }
            if (t(e).addClass(a), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), P.reflow(e), t(e).addClass(c), e.parentNode && t(e.parentNode).hasClass(o)) {
              var r = t(e).closest(u)[0];
              r && t(r).find(p).addClass(a), e.setAttribute("aria-expanded", !0)
            }
            i && i()
          }, n._jQueryInterface = function (i) {
            return this.each(function () {
              var s = t(this),
                r = s.data(e);
              if (r || (r = new n(this), s.data(e, r)), "string" == typeof i) {
                if ("undefined" == typeof r[i]) throw new TypeError('No method named "' + i + '"');
                r[i]()
              }
            })
          }, s(n, null, [{
            key: "VERSION",
            get: function () {
              return "4.0.0"
            }
          }]), n
        }();
      return t(document).on(r.CLICK_DATA_API, g, function (e) {
        e.preventDefault(), v._jQueryInterface.call(t(this), "show")
      }), t.fn.tab = v._jQueryInterface, t.fn.tab.Constructor = v, t.fn.tab.noConflict = function () {
        return t.fn.tab = i, v._jQueryInterface
      }, v
    }(e);
  ! function (t) {
    if ("undefined" == typeof t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
  }(e), t.Util = P, t.Alert = L, t.Button = R, t.Carousel = j, t.Collapse = H, t.Dropdown = W, t.Modal = M, t.Popover = x, t.Scrollspy = K, t.Tab = V, t.Tooltip = U, Object.defineProperty(t, "__esModule", {
    value: !0
  })

});
//# sourceMappingURL=bootstrap.min.js.map