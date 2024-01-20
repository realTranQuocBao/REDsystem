import React, { useEffect } from "react";

interface IMainApp {
  $body: Element | null;
  $wrapper: HTMLElement | null;
  $leftMenuButton: JQuery<HTMLElement>;
  $menuItem: JQuery<HTMLElement>;
  initSlimscroll(): void;
  initLeftMenuCollapse(): void;
  initComponents(): void;
  initMenu(): void;
  activateMenuItem(): void;
  Preloader(): void;
  init(): void;
}

const MainScriptComponent: React.FC = () => {
  useEffect(() => {
    /**
     * Template Name: Zoogler - Bootstrap 4 Admin Dashboard
     * Custom by quocbaoit
     * File: MainScript.component.tsx
     */

    const jq = (window as any).jQuery;

    //Body
    function MainApp() {
      (window as any).$body = document.querySelector("body");
      (window as any).$wrapper = document.getElementById("wrapper");
      (window as any).$leftMenuButton = jq(".button-menu-mobile");
      (window as any).$menuItem = jq(".has_sub > a");
    }

    //Slim Scroll
    MainApp.prototype.initSlimscroll = function () {
      jq(".slimscrollleft").slimscroll({
        height: "auto",
        position: "right",
        size: "6px",
        color: "#babbde"
      });
    };

    //Left Menu
    MainApp.prototype.initLeftMenuCollapse = function () {
      var tempWindow = window;
      (window as any).$leftMenuButton.on("click", function (event: MouseEvent) {
        event.preventDefault();
        (tempWindow as any).$body.toggleClass("fixed-left-void");
        (tempWindow as any).$wrapper.toggleClass("enlarged");
      });
    };

    //Components
    MainApp.prototype.initComponents = function () {
      jq('[data-toggle="tooltip"]').tooltip();
      jq('[data-toggle="popover"]').popover();
    };

    //Menu
    MainApp.prototype.initMenu = function () {
      var tempWindow = window;
      (tempWindow as any).$menuItem.on("click", function () {
        var parent = jq(window).parent();
        var sub = parent.find("> ul");
        console.log("DDang giai quyet problem", parent, sub);

        if (!jq("body").hasClass("sidebar-collapsed")) {
          if (sub.is(":visible")) {
            sub.slideUp(300, function () {
              parent.removeClass("nav-active");
              jq(".body-content").css({ height: "" });
              adjustMainContentHeight();
            });
          } else {
            visibleSubMenuClose();

            parent.addClass("nav-active");
            sub.slideDown(300, function () {
              adjustMainContentHeight();
            });
          }
        }
        return false;
      });

      //inner functions
      function visibleSubMenuClose() {
        jq(".has_sub").each(function () {
          var t = jq(window);
          if (t.hasClass("nav-active")) {
            t.find("> ul").slideUp(300, function () {
              t.removeClass("nav-active");
            });
          }
        });
      }

      function adjustMainContentHeight() {
        // Adjust main content height
        var docHeight = jq(document).height();
        if (docHeight > jq(".body-content").height()) jq(".body-content").height(docHeight);
      }
    };

    //Menu item
    MainApp.prototype.activateMenuItem = function () {
      // === following js will activate the menu in left side bar based on url ====
      jq("#sidebar-menu a").each(function () {
        if ((window as any).href === window.location.href) {
          jq(window).addClass("active");
          jq(window).parent().addClass("active"); // add active to li of the current link
          jq(window).parent().parent().prev().addClass("active"); // add active class to an anchor
          jq(window).parent().parent().parent().addClass("active"); // add active class to an anchor
          jq(window).parent().parent().prev().click(); // click the item to make it drop
        }
      });
    };

    //Loader
    MainApp.prototype.Preloader = function () {
      jq(window).load(function () {
        jq("#status").fadeOut();
        jq("#preloader").delay(350).fadeOut("slow");
        jq("body").delay(350).css({
          overflow: "visible"
        });
      });
    };

    MainApp.prototype.init = function () {
      this.initSlimscroll();
      this.initLeftMenuCollapse();
      this.initComponents();
      this.initMenu();
      this.activateMenuItem();
      this.Preloader();
    };

    //init
    jq.MainApp = new (MainApp as any)() as IMainApp;
    jq.MainApp.Constructor = MainApp;

    //initializing
    (window as any).jQuery.MainApp.init();
  }, []); // Empty dependency array means this effect runs once on component mount

  return null; // No need to render anything
};

export default MainScriptComponent;
