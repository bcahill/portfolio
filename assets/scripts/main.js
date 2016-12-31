/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page

      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
        $(".type-header").typed({
            strings: ["Hey there, I'm Bridget"],
            typeSpeed: 10,
            showCursor: false,
            contentType: 'html',
            onStringTyped: function() {          
                $(".type-header2").typed({
                    strings: ["I'm a web developer living in Chicago"],
                    typeSpeed: 10,
                    showCursor: false,
                    contentType: 'html',
                    onStringTyped: function() {
                        $(".type-header3").typed({
                            strings: ["I work at <a href='https://cliquestudios.com/' style='color: #f88601;'>Clique Studios</a> and build awesome sites"],
                            typeSpeed: 10,
                            showCursor: false,
                            contentType: 'html',
                            onStringTyped: function() {
                                $(".type-header4").typed({
                                    strings: [ "Take a look at some of <a href='/portfolio' style='color: red;'>my work</a> ..."],
                                    typeSpeed: 10,
                                    showCursor: false,
                                    contentType: 'html',
                                    onStringTyped: function() {

                                        $(".type-header5").typed({
                                            strings: [ "... or click <a href='/about' style='color: #5cb53e;'>here</a> to learn more about me!"],
                                            typeSpeed: 10,
                                            showCursor: false,
                                            contentType: 'html',
                                            onStringTyped: function() {
                                                $(".type-header6").typed({
                                                    strings: ["Anything else? Let <a href='/contact' style='color: #10418c;'>me</a> know "],
                                                    typeSpeed: 10,
                                                    showCursor: false,
                                                    contentType: 'html',
                                                });
                                            },
                                        });
                                    },
                                });
                            },
                        });
                    },

                });
            },
        });


        document.querySelector( "#nav-toggle" )
          .addEventListener( "click", function() {
            this.classList.toggle( "active" );
            $('.inner-nav').toggleClass('pizza');
            $(".border-bottom").toggleClass('overlay-nav');
          });
        $('.dot').on("hover", function(){
            $(this).toggleClass("grow");
            $(".dot").toggleClass("taco");
            $(".border-bottom").toggleClass('overlay');
        }); 
      }
    },
    // About us page, note the change from about-us to about_us.
    'about': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
