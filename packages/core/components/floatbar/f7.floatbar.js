const floatbarPlugin = {
  // Module Name
  name: 'floatbar',

  /* Install callback
     It will be executed right after component is installed
     Context of this callback points to Class where it was installed
  */
  install() {
    const Class = this;
  },

  /* Create callback
     It will be executed in the very beginning of class initilization (when we create new instance of the class)
  */
  create(instance) {
    const app = this;
  },

  /* Event handlers */
  on: {
    pageBeforeRemove(page) {
      if (page.$el[0].f7ScrollFloatbarHandler) {
        page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollToolbarHandler, true);
      }
    },
    pageBeforeIn(page) {
      const app = this;

      console.log("1111111111");
      console.log($('.floatbar'));
      debugger;

      let $floatbarEl = page.$el.find('.page-content').children('.floatbar');
      if ($floatbarEl.length === 0) {
        $floatbarEl = page.$el.find('.floatbar');
      }
      if ($floatbarEl.length === 0) {
        return;
      }

      // expand margin-top of the next element
      var $nextEl = $floatbarEl.next().filter(function() {
        var $this = $(this);
        return $this.css('position') == 'relative';
      });

      console.log($nextEl);

      if ($nextEl.length !== 0) {
        $nextEl = $($nextEl[0])
        var margin = parseInt($nextEl.css('margin-top'));
        if (isNaN(margin)) {
          margin = $floatbarEl.height()
        } else {
          margin += $floatbarEl.height()
        }
        $nextEl.css('margin-top', margin+"px")
      }

    },
    tabInit(page) {
    	console.log("333333333");
    },
    pageInit(page) {
	  var $ = Dom7;
      const app = this;
      const $pageEl = $(page.el);

      console.log("2222222");
      console.log($('.floatbar'));

      let $floatbarEl = page.$el.find('.page-content').children('.floatbar');
      if ($floatbarEl.length === 0) {
        $floatbarEl = page.$el.find('.floatbar');
      }
      if ($floatbarEl.length === 0) {
        return;
      }

      console.log($floatbarEl);

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
          navbarBottom = $navbarEl.offset().top + $navbarEl.height()
        }

        if (hideFb) {
          $floatbarEl.css({top: "0px"})
        } else {
          $floatbarEl.css({top: Math.max(toolbarBottom, navbarBottom)+"px"})
        }
      }

      $pageEl.on('scroll', '.page-content', handleScroll, true);
      $pageEl[0].f7ScrollFloatbarHandler = handleScroll;
    }
  },

  /* Handle clicks */
  clicks: {
  }
};
