jQuery(document).ready(function ($) {  
    function setup_scrolling() {
        var tags = $('.pf-tags');
  
        var top = tags.offset().top - parseFloat(tags.css('marginTop').replace(/auto/, 0));
        $(window).scroll(function (event) {
            // what the y position of the scroll is
            var y = $(this).scrollTop();
  
            // whether that's below the form
            if (y >= top) {
                // if so, ad the fixed class
                tags.addClass('fixed');
            } else {
                // otherwise remove it
                tags.removeClass('fixed');
            }
        });
    }
    
    setTimeout(setup_scrolling, 1);
});

var start_time = null;

function recordStartTime() {
    start_time = (new Date()).getTime();
}

function getTimeElapsed() {
    var stop_time = (new Date()).getTime();
    return Math.round((stop_time - start_time) / 1000.0);
}

function fancybox_opening() {
    if (typeof _gaq !== "undefined") {
        var anchor = this.element;
    
        var item_id = jQuery(anchor).attr('item_id');
        _gaq.push(['_trackEvent', 'all_items', 'Item Open', item_id]);
    
        recordStartTime();
    }
}

function fancybox_closing() {
    if (typeof _gaq !== "undefined") {
        var elapsed_time = getTimeElapsed();
    
        var anchor = this.element;
        var item_id = jQuery(anchor).attr('item_id');
        _gaq.push(['_trackEvent', 'all_items', 'Item View Time', item_id, elapsed_time]);
    }
}