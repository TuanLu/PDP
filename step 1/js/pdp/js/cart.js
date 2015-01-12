/** Show image in shopping cart page **/
var mst = jQuery.noConflict();
mst(document).ready(function($){
    var displayType = $("#display_type").val();
    //if (displayType != "full") {
        $('.pdp_cart_final_item').each(function(){
            var cart_id = $(this).attr('alt'),first=0;
            $(this).find('.pdp_side').each(function(){
                var pdp_side = $(this).attr('alt');
                if(first++==0){
                    var x = $(this).parents('tr').addClass('item_'+pdp_side).find('td:eq(0) img').attr('width'),y,scale=1;
                    $(this).parent().parent().parent().prev().find("a").attr("title","Click to view").addClass('inline group'+cart_id).attr("height",'auto').attr('href','#pdp_cart_view_'+pdp_side+'_'+cart_id);
                    $('#pdp_cart_view_'+pdp_side+'_'+cart_id).clone(false,false).removeAttr('id').addClass('img_scale').appendTo($(this).parents('tr').find('td:eq(0)').addClass("td_scale"));
                    $('.item_'+pdp_side+' .img_scale > img').load(function(){
                        y = $('.item_'+pdp_side+' .img_scale').width(); 
                        console.log(y);
                        scale = 75/513;
                        $('.img_scale').width(x).css({
                            '-webkit-transform':'scale('+scale+')',
                            '-moz-transform':'scale('+scale+')',
                            '-ms-transform':'scale('+scale+')',
                            'transform':'scale('+scale+')'
                        });
                    })
                    
                }else{
                    $(this).parent().parent().parent().prev().append('<a title="Click to view" class="no-display inline group'+cart_id+'" href="#pdp_cart_view_'+pdp_side+'_'+cart_id+'"></a>');
                }
            })
            $(this).parent().parent().prev().append('<p>Click to view</p>');
            //$(this).parent().remove();
            $(".group"+cart_id).colorbox({rel:'group'+cart_id});
            $(".inline").colorbox({inline:true, width:''});
        });
        $('.pdp_cart_final_item').hide();
    //}
    $('.pdp_item').each(function(){
        var _this =  $(this);
        _this.find('p, img').css({
            '-moz-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            '-o-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            '-webkit-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            '-ms-transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')',
            'transform': 'rotate(' + _this.attr('angle')*(-1) + 'deg) scaleX(' + _this.attr('scx') + ') scaleY(' + _this.attr('scy') + ')'
        })
    })
});