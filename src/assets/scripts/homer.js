$(document).ready(function() {
    setBodySmall();
    if ($('body').hasClass('sidebar-scroll')) {
        $('#navigation').slimScroll({
            height: '100%',
            opacity: 0.3,
            size: 0,
            wheelStep: 5
        });
    }
    $('.hide-menu').on('click', function(event) {
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    });
    $('#side-menu').metisMenu();
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    $('.animate-panel').animatePanel();
    $('.showhide').on('click', function(event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function() {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });
    $('.closebox').on('click', function(event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
        if ($('body').hasClass('fullscreen-panel-mode')) { $('body').removeClass('fullscreen-panel-mode'); }
    });
    $('.fullscreen').on('click', function() {
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        $('body').toggleClass('fullscreen-panel-mode');
        icon.toggleClass('fa-expand').toggleClass('fa-compress');
        hpanel.toggleClass('fullscreen');
        setTimeout(function() {
            $(window).trigger('resize');
        }, 100);
    });
    $('.right-sidebar-toggle').on('click', function() {
        $('#right-sidebar').toggleClass('sidebar-open');
    });
    $('.small-header-action').on('click', function(event) {
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });
    setTimeout(function() {
        fixWrapperHeight();
    });
    $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
        type: 'bar',
        barWidth: 7,
        height: '30px',
        barColor: '#62cb31',
        negBarColor: '#53ac2a'
    });
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });
    $("[data-toggle=popover]").popover();
    $('.modal').appendTo("body")
});
$(window).bind("load", function() {
    $('.splash').css('display', 'none')
});
$(window).bind("resize click", function() {
    setBodySmall();
    setTimeout(function() {
        fixWrapperHeight();
    }, 300);
});

function fixWrapperHeight() {
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');
    if (!effect) { effect = 'zoomIn' }
    if (!delay) { delay = 0.05 } else { delay = delay / 10 }
    if (!child) { child = '.row > div' } else { child = "." + child }
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;
    // Get all visible element and set opacity to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');
    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('stagger').addClass('animated-panel').addClass(effect);
    var panelsCount = panel.length + 10;
    var animateTime = (panelsCount * delay * 10000) / 10;
    // Add delay for each child elements
    panel.each(function(i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });
    // Clear animation after finish
    setTimeout(function() {
        $('.stagger').css('animation', '');
        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
    }, animateTime)
};