import $ from '../../dom7';
import Utils from '../../utils/utils';


const Floatbar = {

  initSiblingMargin(pageEl) {
    const $pageEl = $(pageEl);

    let $floatbarEl = $pageEl.find('.page-content').children('.floatbar');
    if ($floatbarEl.length === 0) {
      $floatbarEl = $pageEl.find('.floatbar');
    }
    if ($floatbarEl.length === 0) {
      return;
    }
    if ($floatbarEl.hasClass('siblings-expanded')) {
      return;
    }

    // expand margin-top of the next element
    var $nextEl = $floatbarEl.siblings().filter(function() {
      var $this = $(this);
      return $this.css('position') == 'relative' || $this.css('position') == 'block';
    });

    if ($nextEl.length !== 0) {
      $nextEl = $($nextEl[0]);
      var margin = parseInt($nextEl.css('margin-top'));
      if (isNaN(margin)) {
        margin = $floatbarEl.height();
      } else {
        margin += $floatbarEl.height() - margin/2;
      }
      $nextEl.css('margin-top', margin+"px");
      $floatbarEl.addClass('siblings-expanded');
    }
  },

  initHandleOnScroll(pageEl) {
    const app = this;
    const $pageEl = $(pageEl);

    let $floatbarEl = $pageEl.find('.page-content').children('.floatbar');
    if ($floatbarEl.length === 0) {
      $floatbarEl = $pageEl.find('.floatbar');
    }
    if ($floatbarEl.length === 0) {
      return;
    }

    let $toolbarEl = $pageEl.parents('.view').find('.toolbar');
    let $navbarEl = $pageEl.parents('.view').find('.navbar');
    let $pageContentEl = $floatbarEl.parents('.page-content');

    function handleScroll() {
      if ($pageContentEl.length === 0) return
      if (!$pageContentEl.hasClass('hide-bars-on-scroll') && !$pageContentEl.hasClass('hide-navbar-on-scroll')) return

      var hideFb = true;
      var toolbarBottom = 0
      if ($toolbarEl.length !== 0 && !app.device.ios) {
        hideFb = hideFb && $toolbarEl.hasClass('toolbar-hidden');
        toolbarBottom = $toolbarEl.offset().top + $toolbarEl.height()
      }

      var navbarBottom = 0
      if ($navbarEl.length !== 0) {
        hideFb = hideFb && $navbarEl.hasClass('navbar-hidden');
        navbarBottom = $navbarEl.offset().top + $navbarEl.height();
      }

      if (hideFb) {
        $floatbarEl.css({top: "0px"})
      } else {
        $floatbarEl.css({top: Math.max(toolbarBottom, navbarBottom)+"px"});
      }
    }

    $pageEl.on('scroll', '.page-content', handleScroll, true);
    $pageEl[0].f7ScrollFloatbarHandler = handleScroll;
  }

}


export default {
  name: 'floatbar',

  /* Event handlers */
  on: {
    pageBeforeRemove(page) {
      if (page.$el[0].f7ScrollFloatbarHandler) {
        page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollToolbarHandler, true);
      }
    },
    pageBeforeIn(page) {
      Floatbar.initSiblingMargin.call(app, page.$el);
    },
    pageInit(page) {
      Floatbar.initHandleOnScroll.call(app, page.$el);
    },
    tabInit(tab) {
      Floatbar.initSiblingMargin.call(app, tab);
    }
  },
};
