var frontendPopup = jQuery.noConflict();
frontendPopup(function($) {
	var baseUrl = $("#base_url").val(),
		currentProductId = $("#current_product_id").val(),
		designPageUrl = baseUrl + "pdp/view/getDesignPage/",
		tempUrl,
        w_window = $(window).width();
	LoadDesign = {
		load : function() {
			$(".design-btn .design-product").on("click", function() {
				if (!$(this).hasClass("loaded")) {
					var cartItemId = $("#cart_item_id").val(),
						wishlistItemId = $("#wishlist_item_id").val(),
						shareId = $("#pdp_design_share").val();
					tempUrl = designPageUrl + "product-id/" + currentProductId;
					designPageUrl = tempUrl; 
					if (cartItemId != "") {
						tempUrl = designPageUrl + "/item-id/" + cartItemId;
						designPageUrl = tempUrl;
					}
					if (shareId != "") {
						tempUrl = designPageUrl + "/share-id/" + shareId;
						designPageUrl = tempUrl;
					}
					if (wishlistItemId) {
						tempUrl = designPageUrl + "/wishlist-id/" + wishlistItemId;
						designPageUrl = tempUrl;
					}
				    LoadDesign.sendRequest(designPageUrl, LoadDesign.prepareDesignPage);					
				} else {
					//show popup here
					$('#pdp_design_popup').show();
				}
			});
		}(),
		init : function() {
			var action = $("#pdp_design_action").val(),
				shareId = $("#pdp_design_share").val(),
				cartItemId = $("#cart_item_id").val(),
				wishlistItemId = $("#wishlist_item_id").val();
			//if (action != "" || shareId != "" || cartItemId != "" || wishlistItemId != "") {
				//Validate product form
				//var addToCartForm = new VarienForm('product_addtocart_form', true);
				//if (addToCartForm.validator.validate()) {
					$(window).load(function(){
						//$(".design-btn .design-product").click();
					});
				//}
			//}
		}(),
		sendRequest : function(url, callback) {
			$.ajax({
				type : "GET",
				url : url,
				beforeSend : function () {
					//console.log("Sending request...");
					$(".pdp_loading").show();
				},
				success : function(data) {
					callback(data);
					$(".pdp_loading").hide();
				}
			});
		},
		prepareDesignPage : function(data) {
			$(".design-btn .design-product").addClass('loaded');
			$("#pdp_design_popup").html(data);
			$('#pdp_design_popup').appendTo('body');
            $('#pdp_design_popup').append('<div class="overlay"></div>');
			$(".pdp_share_buttons").show();
			var w_pdp = $('#cboxLoadedContent').width();
			//PDPsetting.init(); 
            $('#pdp_design_popup .overlay').click(function(){
                $('#pdp_design_popup').hide();
            });
		},
		hidePdpCustomOption : function() {
			$('#product-options-wrapper dl dt').each(function(){
				if($(this).children('label').text() == 'pdpinfo'){
					$(this).hide();
					$(this).next("dd").addClass("pdp_info").hide();
				}
			});
		}(),
		updatePDPCustomOption : function(design) {
			$("#product-options-wrapper .pdp_info input").val(design);
            $("input[name='extra_options']").val(design);
		}
	}
});