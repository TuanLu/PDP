var mst = jQuery.noConflict();
mst(document).ready(function($){
    $('img.bg').load(function(){
        var w = $(this).width(),
            h = $(this).height();
        $(this).parents('.pdp_side').css({
                width: w+'px',
                height: h+'px'
            })
    });
    $('.pdp_info_items img').load(function(){
        var w = $(this).width(),
            h = $(this).height();
        $('.pdp_info_items').width($('.pdp_info_items table').width());
    })
    $('.pdp_sides_control > div').click(function(){
        if($(this).hasClass('pdp_display_all')){
            $('.pdp_sides_control > div:not(.pdp_remove_background)').removeClass('active');
            $(this).addClass("active");
            $('.pdp_design_view .pdp_side, .pdp_info_items').show();
        }
        if($(this).hasClass('pdp_display_all_side')){
            $('.pdp_sides_control > div:not(.pdp_remove_background)').removeClass('active');
            $(this).addClass("active");
            $('.pdp_design_view .pdp_side').show();
            $('.pdp_info_items').hide();
        }
        if($(this).hasClass('pdp_remove_background')){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $('img.bg').show();
            }else{
                $(this).addClass("active");
                $('img.bg').hide();
            }
        }
        if($(this).hasClass('pdp_items_info')){
            $('.pdp_sides_control > div').removeClass('active');
            $(this).addClass("active");
            $('.pdp_design_view .pdp_side').hide();
            $('img.bg').show();
            $('.pdp_info_items').show();
        }
        if($(this).hasClass('pdp_side')){
            $('.pdp_sides_control > div:not(.pdp_remove_background)').removeClass('active');
            $(this).addClass("active");
            var side_name = $(this).attr('side_name');
            $('.pdp_info_items, .pdp_design_view .pdp_side').hide();
            $('.pdp_design_view .pdp_side[alt='+side_name+']').show();
        }
    })
    $('.wrap_inlay .pdp_item').each(function(){
        var _this =  $(this), index = _this.attr('pos');
        _this.children('p,img').css({
            '-moz-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            '-o-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            '-webkit-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            '-ms-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            'transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')'
        });
        $('tr.item_id_'+index).find('.font_size').html(_this.children('p').css('font-size'));
        $('tr.item_id_'+index).find('.font_family').html(_this.children('p').css('font-family'));
        $('tr.item_id_'+index).find('.font_color').html(rgb2hex(_this.children('p').css('color')));
        var shadow = _this.children('p').css('text-shadow').match(/(-?\d+px)|(rgb\(.+\))/g),
            shadow_color = rgb2hex(shadow[0]);
        $('tr.item_id_'+index).find('.shadow_info').html(shadow_color + ' ' + shadow[1] + ' ' + shadow[2] + ' ' + shadow[3]);
    });
function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]).toUpperCase() + hex(rgb[2]).toUpperCase() + hex(rgb[3]).toUpperCase();
}
});