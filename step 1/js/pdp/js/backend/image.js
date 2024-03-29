var image = jQuery.noConflict();
image(function($){
	/**Image Action**/
	PDP.init();
	var baseUrl = $("#base_url").val();
	var mediaUrl = $("#media_url").val();
	ImgItem = {
        upload : function() {
            $("#upload-files-form").modal('show');
        },
		addColor : function(id) {
			$("#image-form").modal('hide');
			$('#colorModal').modal('show');
		},
		deleteColor : function(id) {
			if (!confirm("Are you sure?")) {
				return false;
			}
			var colorImg = id.split('_')[1];
			$.ajax({
				type:"POST",
				url: baseUrl + "pdp/index/deleteColor",
				data: {imagecolor_id : colorImg},
				beforeSend:function(){
					$("#loading-mask").attr("style","left: -2px; top: 0px; width: 1034px; height: 833px; z-index: 10000;");
					$("#loading-mask").show();
				},
				success:function(data){
					if(data == ""){
						if ($("#edit_color_image tr").length == 1) {
							$("#edit_color_image").html('');
						} else {
							$("#" + id).parent().parent().remove();
						}
						$("#loading-mask").hide();
					}else{
						alert(data);
						window.location.reload();
					}
				}
			});
		},
		updateImageInfo : function () {
			var selectedCategory = $("#category-image").val();
			var image_id = $('#image_id').val();
			
			$.ajax({
				type : "POST",
				url : baseUrl + "pdp/index/updateImageInfo",
				data : {category : selectedCategory, image_id : image_id},
				beforeSend : function () {
					$("#loading-mask").attr("style","left: -2px; top: 0px; width: 1034px; height: 833px; z-index: 10000;");
					$("#loading-mask").show();
				},
				success : function(data) {
					if (data == "") {
						$("#loading-mask").hide();
						location.reload();
					} else {
						alert("There are some error!");
						$("#loading-mask").hide();
					}
				}
			});
		},
		previewColorImage : function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //console.log(e);
                    $('#designImage').attr('src', e.target.result).load(function(){
                    
                    });
                    //$('#designImage').removeAttr('style');
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
		pagingCollection : function(id, action_link){
			/** Selector*/
			var current_page_selector = $('input[name="current_page"]');
			var page_size_selector = $('input[name="page_size"]');
			var category_selector = $('select[name="category_filter"]');
			/** End declare selector*/
			var current_page = current_page_selector.val();
			var category = category_selector.val();
			var page_size,
				page,
				view_per_page;
			switch(id){
				case 'next_page_btn':
					current_page ++;
					current_page_selector.val(current_page);
					break;
				case 'previous_page_btn':
					current_page --;
					current_page_selector.val(current_page);
					break;
				case 'view_per_page':
					view_per_page = $('#'+id).val();
					page_size_selector.val(view_per_page);
					current_page_selector.val(1);
					break;
				case 'category_filter':
					view_per_page = $('#view_per_page').val();
					page_size_selector.val(view_per_page);
					current_page_selector.val(1);
					break;	
					
			}
			//Get page_size and curent page
			page_size = page_size_selector.val();
			current_page = current_page_selector.val();
			//Request data from server
			var url= baseUrl + action_link;
			var adminhtmlKey = $("#secret_key").val().split('/key/')[1];
			$.ajax({
				type:"POST",
				url: url,
				data: {current_page : current_page, page_size : page_size, url : action_link, category : category},
				beforeSend:function(){
					$("#loading-mask").attr("style","left: -2px; top: 0px; width: 1034px; height: 833px;");
					$("#loading-mask").show();
				},
				success:function(data){
					if(data){
						var paging_collection = $.parseJSON(data);
						var paging_text = paging_collection.paging_text;
						var collection = paging_collection.collection;
						
						var imageItems = "",
							newColorUrl;
						if (collection != undefined) {
							for (var i = 0; i < collection.length; i++) {
								for (var j = 0; j < collection[i].length; j++) {
									newColorUrl = baseUrl + "pdp/adminhtml_pdp/artworkcolorinfo/image_id/"+ collection[i][j].image_id +"/key/" + adminhtmlKey;
									imageItems += '<div class="img-item">';
										imageItems += '<img rel="'+ newColorUrl +'" alt="" src="'+ mediaUrl + collection[i][j].filename +'">';
										imageItems += '<input type="checkbox" style="display:none;" id="img_'+ collection[i][j].image_id +'" class="checkbox-item">';
									imageItems += '</div>';
								}
							}
						} else {
							imageItems = '<div class="no-item"> No Items Found</div>';
						}
						//Add paging_text to div
						$('.paging-area').html(paging_text);
						$('#container').html(imageItems);
						$("#loading-mask").hide();
					}else{
						alert(data);
						window.location.reload();
					}
				}
			});
		}
	}
	/**Manage Image**/
	$('#container').on( 'click', '.img-item img', function() {
		var imgSrc = $(this).attr('src');
		var mediaUrl = $('#media_url').val();
		$('#edit_image').attr('src', imgSrc);
		/**Load image info**/
		$.ajax({
			type : "GET",
			url : $(this).attr("rel") + "isAjax=true",
			beforeSend : function () {
				$("#loading-mask").attr("style","left: -2px; top: 0px; width: 1034px; height: 833px;");
				$("#loading-mask").show();
			},
			error : function () {
				console.log('Transfer error!');
			},
			success : function (response) {
				if (response != "") {
					var jsonData = $.parseJSON(response);
					var imageCategory = jsonData.category_title;
					//Remove selected class before add
					$('#image-form .category-name span').text(imageCategory);
					$('#image_id').val(jsonData.image.image_id);
					$('#image_id_color').val(jsonData.image.image_id);
					//Add New Color Url
					$("#add_new_color").attr('onclick', "setLocation('" + jsonData.add_color_url + "')");
					/**Reset table before append**/
					$('#edit_color_image').html('');
					$("#no_result").remove();
					/**List Color and Image**/
					var color = jsonData.colorimage;
					if (color != "") {
						/**1-172-ColorImage_1371994436.png-29b1cc,2-172-ColorImage_1371996168.png-856c45**/
						var options = color.split(',,');
						var row = "";
						var colorImgId, hexcode, filename;
						var temp = new Array();
						for (var i = 0; i < options.length; i++) {
							temp = options[i].split('--');
							colorImgId = temp[0];
							filename = temp[2];
							hexcode = temp[3];
							row += "<tr>";
								row += "<td><div class='color-img-item' style='background:#"+ hexcode +";'><span>#"+ hexcode +"</span></div></td>";
								row += "<td><img width='50px' src='"+ mediaUrl + filename +"' /></td>";
								row += "<td><a id='deletecolor_" + colorImgId + "' href='#' onclick='ImgItem.deleteColor(this.id)'>Delete</a></td>";
							row += "</tr>";
						}
						$('#edit_color_image').html(row);
					} else {
						$("#image-color-tab").append("<span id='no_result'>No records found.</span>");
					}
					$('#loading-mask').hide();
					$('#image-form').modal();
				} else {
					alert('There are some errors!');
					location.reload();
				}
			}
		});
	});
	/**Color picker**/
	var defaultColor = $('#color').val();
	if (defaultColor == "") {
		defaultColor = "0000ff";
	}
	$('#colorSelector').ColorPicker({
		color: '#' + defaultColor,
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#previewColor input').css('backgroundColor', '#' + hex);
			$('#colorSelector div').css('backgroundColor', '#' + hex);
			$('#color').val("#" + hex);
		}
	});
});