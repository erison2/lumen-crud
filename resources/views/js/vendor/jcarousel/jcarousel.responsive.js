(function ($) {
    $(function () {
        var jcarousel = $('.jcarousel');

        jcarousel.on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this), width = carousel.innerWidth();

            if (width >= 800) {
                width = width / 4;
            } else if (width >= 627) {
                width = width / 3;
            } else if (width >= 500) {
                width = width / 2;
            } else if (width >= 250) {
                width = width / 1;
            }
            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        }).jcarousel({
            wrap: 'circular'
        }).jcarouselAutoscroll({
            target: '+=4'
        });
        
        var jcarousel2 = $('.jcarousel2');
        
        jcarousel2.on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this), width = carousel.innerWidth();
            if (width >= 800) {
                width = width / 2;
            } else if (width >= 250) {
                width = width / 1;
            }
            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        }).jcarousel({
            wrap: 'circular'
        });

        $('.jcarousel-control-prev').jcarouselControl({
            target: '-=1'
        });

        $('.jcarousel-control-next').jcarouselControl({
            target: '+=1'
        });

        $('.jcarousel-pagination').on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
        }).on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
        }).on('click', function (e) {
            e.preventDefault();
        }).jcarouselPagination({
            perPage: 1,
            item: function (page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });
    });
})(jQuery);
