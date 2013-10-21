/*



      ############# 
    ##            *## 
   #        %      **#
  #        %%%    ***#
 #       %%F%D%%   ****#
#          %%%    *****#
#   ###     %     ###***# 
#  # ####       #### #**# 
#  #     #     #     #**# 
#   #####  # #  #####***# 
#         #   #  *******# 
 ### #           **# ### 
     # - - - - - - #                 
      | | | | | | |
	
     freakdesign.com               



*/
(function(){
if(typeof Shopify != 'undefined'){
if (typeof jQuery != 'undefined') {	
if(!$('#shopifyjs').length){
var d = document,url = d.URL;
if(url.indexOf("myshopify.com/admin")>1){

	var _savelabel = 'Save',
		_editlabel = 'Edit',
		_deletelabel = 'Delete',
		jsvoid = 'javascript:void(0)';

	var metafieldform = '<label style="margin-top:1em">Add New Metafield</label><input class="ssb" type="text" id="metafield_namespace" placeholder="namespace"><input class="ssb" type="text" id="metafield_key" placeholder="key"><textarea class="ssb" id="metafield_value" placeholder="value"></textarea><input type="hidden" id="metafield_id"><a class="btn savemymeta" id="shopifyjs_savemetafield">'+_savelabel+'</a> <a class="int btn savemymeta" id="shopifyjs_savemetafield_int">Save as Integer</a> <a class="btn hidden delete" id="shopifyjs_deletemetafield">'+_deletelabel+'</a><p style="margin-top:1em;line-height:1"><small>Please note: Using the save button top right will NOT save these metafields. Be sure to click '+_savelabel+' above.</small></p>';

	var metafieldloader = '<div class="sub_section-summary"><h1><strong>Metafields</strong> <span id="metacount">0</span></h1><div class="content"><i class="ico ico-20 ico-20-loading"></i></div></div>';

	var metafield_default = '<option value="">Select or create a metafield</option>';

	var metafield_copybox = '<div><a class="btn" id="fd_copymetafields">Copy Metafields</a> <a class="btn" id="fd_pastemetafields">Paste Metafields</a> <a class="btn" title="What have I copied?" href="#" id="fd_whatmetafields">?</a></div>';
	
	var rte_menu = '<div id="rte_extra" style="background:#efefef"><a title="Careful, this method is brutal..." id="clearformatting" href="#">Purge html</a> <a id="createbackup" href="#">Create Backup</a> <a style="display:none;" id="restorebackup" href="#">Restore Backup</a> <a title="Add any images in the description to a Metafield" id="save_images_to_meta" href="#">Images to Metafields</a></div>';

	var vbox = '<div class="vbox"><fieldset><select>'+metafield_default+'</select><input id="mv_namespace" placeholder="namespace" /><input id="mv_key" placeholder="key" /><input id="mv_value" placeholder="value" /></fieldset><span class="mybuttons"><a class="save" href="#">'+_savelabel+'</a> <a class="saveinteger" href="#">'+_savelabel+' as Integer</a> <a title="Delete" class="delete ico ico-16 ico-delete" href="#">delete</a></span></div>';

	var appnav = '<li><a id="aboutapp" href="'+jsvoid+'">About this tool</a></li><li><a id="togglestyle" href="'+jsvoid+'">Toggle CSS</a></li><li><a id="themesettings" href="javascript:void(0)">Theme Settings</a></li><li><a id="manageinventory" href="'+jsvoid+'">Manage Inventory</a></li><li><a id="bulkmetafields" href="'+jsvoid+'">Bulk Metafields</a></li><li><a title="This tool is free, consider leaving a tip" href="http://shopify.freakdesign.com.au/#donate" target="_blank">Use this free tool? Tip me! ($)</a></li>';

	var bulk_html_box = '<h2 class="warning"><strong>Warning:</strong> This section can make bulk changes to your product metafields. There is no undo should something go wrong so be very sure you want to attempt this.</h2><table><tr><td>Namespace</td><td><input id="bulk_namespace" placeholder="Namespace" type="text" /></td></tr><tr><td>Key</td><td><input id="bulk_key" placeholder="Key" type="text" /></td></tr><tr><td>Value</td><td><input id="bulk_value" type="text" placeholder="value" /></td></tr><tr><td colspan="2"><p><strong>Note:</strong> Any existing metafield with the same namespace and key will be overwritten. Have I given you enough warning?</p></td></tr><tr><td><a class="btn create">Save</a> <a class="btn createint">Save Integer</a></td><td><span style="display:none"><a class="btn delete">Delete</a> <input type="text" style="width:50%" placeholder="Type delete" /></span></td></tr><tr><td colspan="2"><textarea class="debug" placeholder="Data Output (future use only)"></textarea></td></tr></table>';
	var autosave_html = '<li> <a id="autosave" tabindex="-1" class="btn slim tooltip" href="#"><span class="tooltip-container"><span class="tooltip-label">Enable Autosave</span></span>Autosave</a></li>';
	var recent_emails_box = '<table><tr><td>How many days back do we search?</td><td><input value="30" id="from_recent_order_id" placeholder="days" type="text" /></td></tr><tr><td>Fulfillment Status</td><td><select id="recent_fulfillment_status"><option value="any">Any</option><option value="partial">Partial</option><option value="unshipped">Unshipped</option><option value="shipped">Shipped</option></select></td></tr><tr><td><a class="btn getdata">Get Emails</a></td><small>For now this grabs the email only and adds it to the box below. If you would like to see this work differently - let me know!</small><td></td></tr></table><textarea id="recent_emails_output" class="debug" placeholder="Email addresses will load here..."></textarea>';

	var welcome_message = '<ul><li>Grab emails from recent orders now active.</li><li>Option to show SKUs on product page</li><li>Copy and paste metafields between products. Handy!</li><li>Bulk Metafield editor added. Be super careful with this one...</li></ul>';
	var welcome_title='What\'s new in ShopifyFD : 2013-10-09';

	var html_about = '<table><tbody><tr><td width="50%">Oh hey! This tool has been made by Jason from freakdesign. He is awesome, and likes talking in the third person...</td><td><h4>Resources and links</h4><ul><li><a href="http://shopify.freakdesign.com.au" target="_blank">Project home page</a></li><li><a href="http://goo.gl/OsFK2d" target="_blank">Feature Request</a></li><li><a href="http://ecommerce.shopify.com/c/shopify-discussion/t/tool-to-add-new-dashboard-features-151067" target="_blank">Shopify forum post</a></li></ul></td></tr></tbody></table>';

	var aargh_msg = '<p>Do note that once you run this you are going to have to manually refresh to see the updates. Annoying I know, but I have not found a way around this...</p>';

	
/* ===========================*/ 
var _ = (function(){

	var v = { 
		debug: false,
		drag_on:true,
		author: 'freakdesign',
		version: 20130829,
		alpha: false,
		omega: false,
		countries:false,
		wait: 1000,
		api_count:0, /* call count */
		api_limit:250,
		metafields:{},
		autosave: false,
		content: $('#content')
	};

return {
	escape:function (str) {
		return str
	    .replace(/[\\]/g, '\\\\')
	    .replace(/[\"]/g, '\\\"')
	    .replace(/[\/]/g, '\\/')
	    .replace(/[\b]/g, '\\b')
	    .replace(/[\f]/g, '\\f')
	    .replace(/[\n]/g, '\\n')
	    .replace(/[\r]/g, '\\r')
	    .replace(/[\t]/g, '\\t');
	},
	redirect:function(p){
		if(p){
			Batman.redirect(p);
		}
	},
	createCookie:function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	readCookie:function(name) {
		var nameEQ = name + "=",
			ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	notice:function(m,err){
		/*
		Show message at bottom of the screen
		*/
		if(err){
			Shopify.Flash.error(m);
		}else{
			Shopify.Flash.notice(m);
		}
	},
	about_app:function(){
		_.fd_modal(true,html_about,'About this tool',true);
		return false;
	},
	createbackup:function(id){
	if(id){
		var mycontent = $("iframe").contents().find("#tinymce"),
			myhtml = mycontent.html(),
			metaJSON = {
				"metafield": {
					"namespace": 'backups',
					"key": id,
					"value": myhtml,
					"value_type": "string"
				}
		};

		$.ajax({
			  type: "POST",
			  url: d.URL+'/metafields.json',
			  dataType: 'json',
			  data: metaJSON,
			  success: function(d){
			  	_.updatedropdown();
			  	_.notice('Backup saved');
			  }
		});

	
	}
},
	loadmeta:function(loadinto,v){

	var url = '/admin/'+_.data('alpha')+'/'+_.data('omega')+'/metafields.json';

	if(_.data('omega') ==='general'){url = '/admin/metafields.json';}
	if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json';}

	$.getJSON(url, function(data) {
		var h = '',
			m = data.metafields;

			if(m){

			_.data('m',m);

			if(_.data('alpha')=='products'){
				_.setup_copypaste();	
			}

			$('#metacount').text(m.length).addClass('active');

			if(m.length === 0){
				$('#metacount').removeClass('active');
			}else{
				$('#metacount').addClass('active');
			}

			for (var i = 0, len = m.length; i < len; i++) {
				h+= '<option data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
				v.metafields[m[i].id] = { namespace: m[i].namespace, value: m[i].value, key: m[i].key };
				if (m[i].namespace == "backups"){

					_.flog('hasbackup!');
					$('#restorebackup').show();
					_.data('hasbackup',true);

				}
			}
				h = '<select id="metafieldselect">' + metafield_default + h +'</select>';
			}else{
				h ='<select id="metafieldselect">' + metafield_default + '</select>';
			}

			loadinto.html(h).append(metafieldform);



		$('#metafieldselect').change(function(){
			var t = $(this).find(':selected');
			if(t.attr('data-id')){

				var m = v.metafields[t.attr('data-id')];

				$('#metafield_namespace').val(m.namespace).prop("disabled", true);
				$('#metafield_key').val(m.key).prop("disabled", true);
				$('#metafield_value').val(m.value);
				$('#metafield_id').val(t.attr('data-id'));

				$('#shopifyjs_deletemetafield').removeClass('hidden');
				/*$('#shopifyjs_savemetafield').text(_editlabel);*/
			}else{
				_.clearmetaform();
			}
		});



		$('#shopifyjs_deletemetafield').on('click',function(){
			
			var id=$('#metafield_id').val(),
			url = d.URL+'/metafields/'+id+'.json';

			if(_.data('omega') ==='general'){url = '/admin/metafields/'+id+'.json';}
			if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields/'+id+'.json';}
			
			if(id){
				$.ajax({
				  type: "DELETE",
				  url: url,
				  success: function(d){
				  	_.flog(d);
				  	_.notice('Metafield deleted');
				  	_.updatedropdown();
				  },
					error:function(d){
						_.notice('Failed to delete',true);
					}
				});
			}
		});



		$('div.sub_section-summary a.savemymeta').off('click').on('click',function(){

			var thistype = 'string';
			if($(this).hasClass('int')){thistype = 'integer'}

			var metafield_namespace = $('#metafield_namespace').val(),
				metafield_key = $('#metafield_key').val(),
				metafield_value = $('#metafield_value').val(),
				metafield_id = $('#metafield_id').val();

			var metaJSON = {
				"metafield": {
					"namespace": metafield_namespace,
					"key": metafield_key,
					"value": metafield_value,
					"value_type": thistype
				}
			};

			var metaupdateJSON = {
				"metafield": {
					"id": metafield_id,
					"value": metafield_value,
					"value_type": thistype
				}
			};


			if(metafield_id.length>5){

		var url = d.URL+'/metafields/'+metafield_id+'.json';



		if(_.data('omega') ==='general'){url = '/admin/metafields/'+metafield_id+'.json';}

			$.ajax({
				  type: "PUT",
				  url: url,
				  dataType: 'json',
				  data: metaupdateJSON,
				  success: function(d){
				  	_.updatedropdown();
				  	_.flog(d);
				  	_.notice('Metafield updated');
				  	Batman.DOM.Modal.hide();
				  }
			});


}else{

			var url = d.URL+'/metafields.json';
			if(_.data('omega') ==='general'){url = '/admin/metafields.json';}
			if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json';}

			$.ajax({
				  type: "POST",
				  url: url,
				  dataType: 'json',
				  data: metaJSON,
				  success: function(d){
				  	_.updatedropdown();
				  	_.notice('Metafield saved');
				  }
			});

}

			return false;
		});

		/* end of json get */
	});
},
	bulk_save_metafield_queue:function(m,i,debug_box){

						
		$.ajax({
			  type: "POST",
			  url: '/admin/products/'+_.data('products')[i].id+'/metafields.json',
			  dataType: 'json',
			  data: m,
			  success: function(d){
			  	if(debug_box){
			  		var fdmv = debug_box.val();
					debug_box.val(fdmv+i+': '+_.data('products')[i].id+': ok\n');
				}
			  	if(i+1 < _.data('products').length){
			  		_.bulk_save_metafield_queue(m,i+1,debug_box)
			  	}else{

			  		 if(_.data('alpha') == 'products'){
			  		 	_.updatedropdown();
			  		 }

			  		Shopify.Flash.notice("Bulk changes done!");
			  	}
			  }
		});


	},
	bulkmetafields:function(){

		var myhtml=$(bulk_html_box),
			nope = 'I did say these are not working right?',
			create_btn = myhtml.find('a.create'),
			createint_btn = myhtml.find('a.createint'),
			update_btn = myhtml.find('a.update'),
			delete_btn = myhtml.find('a.delete'),
			bulk_namespace=myhtml.find('#bulk_namespace'),
			bulk_key=myhtml.find('#bulk_key'),
			bulk_value=myhtml.find('#bulk_value'),
			debug_box = myhtml.find('textarea.debug'),
			ok=function(){return 1<bulk_namespace.val().length&&1<bulk_key.val().length&&1<bulk_value.val().length?!0:!1};


		create_btn.off('click').on('click',function(){

			if(ok){
				var metaJSON = {
					"metafield": {
						"namespace": bulk_namespace.val(),
						"key": bulk_key.val(),
						"value": bulk_value.val(),
						"value_type": 'string'
					}
				};
				_.bulk_save_metafield_queue(metaJSON,0,debug_box);
			}else{
				_.notice('No empty fields allowed');
			}

		});

		createint_btn.off('click').on('click',function(){
			if(ok){

				if(!isNaN(bulk_value.val())){
					debug_box.val(_.data('products'));
					var metaJSON = {
						"metafield": {
							"namespace": bulk_namespace.val(),
							"key": bulk_key.val(),
							"value": bulk_value.val(),
							"value_type": 'integer'
						}
					};
					_.bulk_save_metafield_queue(metaJSON,0,debug_box);
				}else{
					_.notice('Value not an integer',true);
				}

			}else{
				_.notice('No empty fields allowed',true);
			}	
		});


		$.ajax({
		type: "GET",
		url: '/admin/products.json?fields=id,title',
		dataType: 'json',
		success: function(d){
			if(d.products){
				if(d.products.length){
					_.data('products',d.products);
					_.fd_modal(true,myhtml,'Bulk Metafield editing (for '+ d.products.length +' products)',true);
				}else{
					_.notice('No products found',true);
				}
			}	
		},
		error:function(d){
			_.notice('Error getting products',true);
		}
		});


		/* -------------------- */

	},
	clearformatting:function(){
		var mycontent = $("iframe").contents().find("#tinymce"),
			div = document.createElement("div");

		div.innerHTML = mycontent.html();
		var text = div.textContent || div.innerText || "";
		mycontent.text(text);
	},
	clearmetaform: function(){
		$('#metafield_namespace').val('').prop("disabled", false);
		$('#metafield_key').val('').prop("disabled", false);
		$('#metafield_value').val('');
		$('#metafield_id').val('');
		$('#shopifyjs_deletemetafield').addClass('hidden');
	},
	supports_html5_storage:function(){
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	},
	kill_drag_drop:function(){
		if(_.data('drag_on')){
			var doc = document.documentElement;
			doc.className = '';
			doc.ondragover = function () {return false;};
			doc.ondragleave = function () {return false;};
			doc.ondragend = function () {return false;};
			doc.ondrop = function () {}
		}
	},
	set_drag_drop:function(){if(_.data('drag_on')){
		var dndSupported = function () {
			var div = document.createElement('div');
			return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
		};
		if(dndSupported()){
			_.flog('has dnd');

	/* --------------------------------------------- */

	var doc = document.documentElement;
	doc.ondragover = function () { 
		this.className = 'dragit'; return false; 
	};
	doc.ondragleave = function () { 
		this.className = ''; return false; 
	};
	doc.ondragend = function () { 
		this.className = '';
		return false; 
	};
	doc.ondrop = function (event) {
		
		

	event.preventDefault && event.preventDefault();

	var files = event.dataTransfer.files,
		files_count = files.length,
		files_index = 0,
		reader = new FileReader(),
		file_array = {};

		reader.onload = function (event) {
			_.flog('load');
			var fdata = event.target.result;
			var justdata = fdata.split(',')[1];

				file_array[files_index] = { "name": files[files_index].name, "data": justdata };
				files_index++;


			if(files_index < files_count){
				_.notice("Reading file ["+ (files_index+1 )+"] contents...");
				reader.readAsDataURL(files[files_index]);
			}else{
				_.do_upload(file_array);
			}

		};

		if(files_count){
			document.documentElement.className = 'dragit';
			_.notice("Reading file ["+ (files_index+1 )+"] contents...");
			reader.readAsDataURL(files[files_index]);
		}
	
	  return false;
	};



/* ---------------------------------------------- */

							}
						}/* end debug check */
	},
	do_upload:function(d){if(_.data('drag_on')){



		var files = d,
			files_count = Object.keys(d).length,
			files_index = 0,
			tid = _.data('themeID');

		if(_.data('alpha') == 'themes'){tid = _.data('omega');}
		if(_.data('omega') == 'settings' && !isNaN(_.data('alpha'))){tid = _.data('alpha');}

		

		if(tid){

		

		var doajax = function(){

		var myfile = {
			"asset": {"key": 'assets/'+files[files_index].name,"attachment": files[files_index].data}
		};

		$.ajax({
			type: "PUT",
			url: '/admin/themes/'+tid+'/assets.json',
			data: myfile,
			success: function(){
				_.notice(files[files_index].name + ' uploaded ('+(files_index+1)+'/'+files_count+')')

				files_index++;

				if(files_index < files_count){
					doajax();
				}
				
				if(files_index == files_count){
					document.documentElement.className = '';
				}

				
			},
			error:function(){
				_.notice('File upload failed',true);
				document.documentElement.className = '';
			}
		});

		}

		doajax();

	}else{
		_.notice('Theme ID not found',true);
	}

	}},
	get_product_count:function(){
		$.ajax({
			type: "GET",
			url: '/admin/products/count.json',
			success: function(d){
				if(d){
					_.data('product_count',d.count)
				}
			}
		});
	},
	get_all_product_metafields:function(){
		/* this may make the api limit kick in. hold on to your hats! */
		if(_.data('product_count')<=_.data('api_limit')){

		}else{
			/* we are going to have a bad time with the api limit. How slow should we run each one?
			500 per 5 minute block...*/
		}
	},
	save_variant_metafield:function(id,namespace,key,value,vid,type){
							/* add validation in here */

							_.flog(id,namespace,key,value,vid,type);
							var thistype = 'string';
							if(type){thistype = 'integer'}

							if(!vid.length){

								var meta = {"metafield": {"namespace": namespace,"key": key,"value": value,"value_type": thistype}};
								$.ajax({
										type: "POST",
										url: '/admin/variants/'+id+'/metafields.json',
										data: meta,
										success: function(d){
											_.flog(d);
											_.setup_vrow(id);
											_.notice('Metafield saved');
										},
										error:function(d){
											_.setup_vrow(id);
											_.notice('Error Saving',true);
										}
								});
							}else{

								var meta = {"metafield": {"id": vid,"value": value,"value_type": thistype}};

								$.ajax({
										type: "PUT",
										url: '/admin/variants/'+id+'/metafields/'+vid+'.json',
										data: meta,
										success: function(d){
											_.flog(d);
											_.setup_vrow(id);
											_.notice('Metafield updated');
										},
										error:function(d){
											_.setup_vrow(id);
											_.notice('Error saving',true);
										}
								});
							}

	},
	delete_variant_metafield:function(id,vid){
							$.ajax({
									type: "DELETE",
									url: '/admin/variants/'+id+'/metafields/'+vid+'.json',
									success: function(d){
										_.flog(d);
										_.setup_vrow(id);
										_.notice('Metafield deleted');
									},
									error:function(d){
										_.setup_vrow(id);
										_.notice('Failed to delete',true);
									}
							});
	},
	variant_fillfields:function(id){
							var found = false;
							for (var i = 0, len = _.data('vm').length; i < len; i++) {
								o = _.data('vm')[i];
								if(parseInt(o.id) == parseInt(id)){
									return(o);
								}
							};
							return found;

	},
	setup_vrow:function(v){
							Batman.DOM.Modal.show();
							$('#mv_namespace').val('').prop("disabled", false);
							$('#mv_key').val('').prop("disabled", false);
							$('#mv_value').val('');
							_.data('current_vid','');
							
							var option = function(o){
/*
	REMOVED AS PER FEEDBACK FROM DAVE
	return '<option class="meta" value="'+o.id+'">'+v+'.'+o.namespace+'.'+o.key+'</option>';
*/
								return '<option class="meta" value="'+o.id+'">'+o.namespace+'.'+o.key+'</option>';
							}

							/*$('#vrow .mybuttons').hide();*/

	if(v){

			$.ajax({
				type: "GET",
				url: '/admin/variants/'+v+'/metafields.json',
				success: function(d){

					$('#vrow option.meta').remove();
					m = d.metafields;

					if(m){
						_.data('vm',m);

						if(m.length){
							$('#vrow select').addClass('active');
						}else{
							$('#vrow select').removeClass('active');
						}
					}

					for (var i = 0, len = m.length; i < len; i++) {
						$('#vrow select').append(option(m[i]));
					}
					
					$('#vrow .delete').hide();

					$('#vrow .save').off('click').on('click',function(){
						Batman.DOM.Modal.show();
						/*$('#vrow .mybuttons').hide();*/
						if(!_.data('current_vid')){
							_.data('current_vid','');
						}
						_.save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_.data('current_vid'));
						return false;
					});

					$('#vrow .saveinteger').off('click').on('click',function(){
						Batman.DOM.Modal.show();
						/*$('#vrow .mybuttons').hide();*/
						if(!_.data('current_vid')){
							_.data('current_vid','');
						}
						_.save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_.data('current_vid'),true);
						return false;
					});

					$('#vrow .delete').off('click').on('click',function(){
						Batman.DOM.Modal.show();
						/*$('#vrow .mybuttons').hide();*/
						_.delete_variant_metafield(v,_.data('current_vid'));
						return false;
					});

					$('#vrow select').eq(0).off('change').change(function(){
						var v_val = $(this).val();
						_.data('current_vid',v_val);
						_.flog(_.data('vm'));

						if(v_val.length){
							$('#mv_namespace').prop("disabled", true);
							$('#mv_key').prop("disabled", true);
							$('#vrow .delete').show();
							var o = _.variant_fillfields(v_val);
							if(o){
								$('#mv_namespace').val(o.namespace);
								$('#mv_key').val(o.key);
								$('#mv_value').val(o.value);
							}
						}else{
							$('#mv_namespace').prop("disabled", false);
							$('#mv_key').prop("disabled", false);
							$('#vrow .delete').hide();
						}



					});

					$('#vrow .mybuttons').fadeIn(function(){
						Batman.DOM.Modal.hide();
					});

					
				},
				error:function(d){
					Shopify.Flash.error("Error grabbing metafields");
					Batman.DOM.Modal.hide();
				}
			});
							}else{
								Shopify.Flash.error("Could not find ID");
							}

						},
						panel_editvariantmeta:function(){

							$('.row.section.inventory .section-summary p').after('<p class="box notice">To edit metafields for the variant click on the variant ID number.</p>');
							$('td.vid').on('click', function() {
								Batman.DOM.Modal.show();
								$('#vrow').remove();

								var v = $(this).text();

								_.flog(v);

								_.data('currentvrow',v);

								$('tr.variant.active').removeClass('active');
								$(this).parent().addClass('active').after('<tr id="vrow"><td colspan="8">'+vbox+'</td></tr>');
									/*_.data('current_vid',v);*/
									_.setup_vrow(v);
							});

						},
						btn_removealltags:function(){
							$('div.row.section.tags div.section-summary').eq(0).append('<a id="addalltags" href="#" class="btn">Add all tags</a> <a id="removealltags" href="#" class="btn">Remove all tags</a>');

							$('#removealltags').on('click',function(){
								$('ul.tokenized-list').eq(0).find('a').click();
								return false;
							});

							$('#addalltags').on('click',function(){
								$('ul.addtags').eq(0).find('span:not(.inactive)').click();
								return false;
							});

						},
						flog:function(o){
							/* wrapper for a console - makes it easier to kill off the calls this way. */
							if(_.data('debug')){
								console.log(o);
							}
						},
	fd_modal_update:function(hide,content,title){
		/* hide gives us a chance to toggle content -- useful for hold states */
		var my_fdmodal = $('#fdmodal');
		if(my_fdmodal.length){ 
			my_fdmodal.remove(); 
		}

	},
	fd_modal:function(show,content,title,persist){

		_.flog('fdmodal');

		var my_fdmodal = $('#fdmodal');

		if(show){
			
			if(my_fdmodal.length){ my_fdmodal.remove(); }

			var m = $('<div id="fdmodal" class="modalWindow"><div class="main content"><header></header></div></div>');

			if(title){
				m.find('header').html('<h2>'+title+'</h2>');
			}
			if(content){
				var d = $('<div/>',{}).append(content);
				m.find('div.main.content').append(d);
			}

			if(!persist){
				m.fadeIn().on('click',function(){
					_.fd_modal(false);
				});
			}else{
				var mclose = $('<a href="#" class="close-modal">x</a>');
				mclose.on('click',function(){
					_.fd_modal(false);
					return false;
				});
				m.find('header').prepend(mclose).end().fadeIn();
			}
			$('body').append(m);
			
		}else{
			my_fdmodal.off('click').remove();
		}

	},
	create_discounts:function(quantity){


	},
	restorebackup:function(id){
		var mycontent = $("iframe").contents().find("#tinymce");
		var m = _.data('m');

		if(m){
			for (var i = 0, len = m.length; i < len; i++) {
			if(m[i].namespace == 'backups'){
			mycontent.html(m[i].value);
			_.notice('Backup restored');
			}}
		}else{
			_.notice('Error, nothing to restore');
		}
	},
	setup_discounts:function(){

		var u = $('<ul/>',{
			'class':'segmented',
			'id':'showsku'
			}),
			l = $('<li/>'),
			a = $('<a/>',{
				'class':'btn btn-separate',
				'href':'#',
				'title':'Disable all codes below'
			}).html('Disable codes').on('click',function(){
				$('#discount-table a[data-event-click="discount.disable"]').click();
				return false;
			}),
			b = $('<a/>',{
				'class':'btn btn-separate',
				'href':'#',
				'title':'Enable all codes below'
			}).html('Enable codes').on('click',function(){
				$('#discount-table a[data-event-click="discount.enable"]').click();
				return false;
			}),
			c = $('<a/>',{
				'class':'btn btn-separate disabled',
				'href':'#'
			}).html('Bulk create').on('click',function(){
				if(_.data('debug')){
					/* <br><br><div><h2>Discount details</h2><div class="span1">How many times can this discount be used?</div><div class="span2"><input value="1" /></div><h2 class="clearfix">Discount type</h2><div class="span1">How many times can this discount be used?</div><div class="span2"><input /></div><h2>Date range</h2><div class="span1">How many times can this discount be used?</div><div class="span2"><input /></div> */
				}else{
					_.fd_modal(true,'<p>This is on the todo list. Will get to it soon(ish)</p></div>','Bulk create discount codes',true);
				}
				return false;
			});

			l.append(a,b,c);
			u.append(l);

			$('.header-right .segmented').eq(0).after(u);

	},
	setup_articles:function(){
		_.flog('setup_articles');
		$('div.span6.section-summary a.view-in-store').remove();
		$('div.span6.section-summary').eq(0).find('p, h1').remove().end().append(metafieldloader);

		var loadinto = $('div.sub_section-summary .content');
		_.loadmeta(loadinto,v);
	},
	setup_blogs:function(){

		$('div.span6.section-summary a.view-in-store').remove();
		$('div.span6.section-summary').eq(0).find('p, h1').remove().end().append(metafieldloader);
		var loadinto = $('div.sub_section-summary .content');

		/* Blogs load slower in the admin that other sections - weird... */
		window.setTimeout(function(){
			_.loadmeta(loadinto,v);
		},250);

	},
	setup_rte:function(){

		if(_.data('hasbackup')){
			$('#restorebackup').show();
		}

		$('#clearformatting').on('click',function(){
			_.clearformatting();
			return false;
		});

		$('#createbackup').on('click',function(){
			_.createbackup(_.data('omega'));
			return false;
		});

		$('#restorebackup').on('click',function(){
			_.restorebackup(_.data('omega'));
			return false;
		});

		$('#save_images_to_meta').on('click',function(){
			_.save_images_to_meta();
			return false;
		});

	},
	save_images_to_meta:function(){
		var images = $("iframe").contents().find("#tinymce").find('img');

		if(images && images.length){
			var meta = '';

			images.each(function(i) {
				var src = $(this).prop('src').replace(/https:/i,'');
				meta += src;
				if(i < images.length-1){meta+=',';}
			});

			var metaJSON = {
			"metafield": {"namespace": 'helpers',"key": 'images',"value": meta,"value_type": "string"}
			};

			$.ajax({
				  type: "POST",
				  url: d.URL+'/metafields.json',
				  dataType: 'json',
				  data: metaJSON,
				  success: function(d){
				  	_.updatedropdown();
				  	_.notice('Images saved to metafield');
				  },
					error:function(d){
						_.notice('Error saving',true);
				}
			});
		}else{
			_.notice('No images found',true);
		}

	},
	setup_products_list:function(){
			if(!$('#showsku').length){
				var u = $('<ul/>',{
					'class':'segmented',
					'id':'showsku'
					}),
					l = $('<li/>'),
					a = $('<a/>',{
						'class':'btn',
						'href':'#'
					}).html('Show SKUs').on('click',function(){
						var p = [],
							sku =[],
							a_list = $('#all-products td.name a');

						a_list.each(function(){
							p.push($(this).attr('href').split(/[/]+/).pop());
						});

						if(p.length){
							var i=0,
				getsku = function(p,i){


				$.ajax({
					type: "GET",
					url: '/admin/products/'+p[i]+'.json?fields=variants',
					dataType: 'json',
					success: function(d){
						var s = d.product.variants[0].sku;
						if(s){
							a_list.eq(i).before('<span title="SKU" class="sku label">'+s+'</span>');
						}

						if(i+1 < p.length){
							getsku(p,i+1);
						}else{
							_.fd_modal(false);
						}

					}	
					
				});


				};

				_.fd_modal(true,'Loading SKUs, please wait...','Loading',true);
				getsku(p,i);

						}
						return false;
				});

				l.append(a);
				u.append(l);

				$('.header-right .segmented').eq(1).after(u);

			}
		},
		seo_description:function(){

			var sdt = $('#seo-description-tag');
			var sdt_textarea = $('<textarea/>');
			sdt_textarea.val(sdt.val()).keyup(function(){
				sdt.val($(this).val());
			});

			sdt.after(sdt_textarea).hide();

		},
						setup_copypaste:function(){

							var a = $(metafield_copybox),
								p = a.find('#fd_pastemetafields'),
								q = a.find('#fd_whatmetafields');

							a.find('#fd_copymetafields').on('click',function(){
								if(_.data('m')){
									_.data('m-copy',_.data('m'));
									_.notice(_.data('m-copy').length + " Metafields copied");
									p.show();
									q.show();
								}else{
									p.hide();
									q.hide();
								}
								return false;
							});

							q.on('click',function(){

								if(_.data('m-copy')){
									var h = '';
									var m = _.data('m-copy');
									for (var i = 0, len = m.length; i < len; i++) {
											h+= '<p><strong>'+m[i].namespace+'.'+m[i].key+' ('+m[i].value_type+')</strong><br>'+m[i].value+'</p><hr>';
									}
									_.fd_modal(true,h,'In the virtual clipboard...');
								}

								return false;
							});

							p.on('click',function(){
								
								if(_.data('m-copy')){
									_.save_metafield_queue(_.data('m-copy'),0);
								}

								

								return false;
							});

							if(!_.data('m-copy')){
								p.hide();
								q.hide();
							}

							$('div.sub_section-summary').after(a);

						},
						save_metafield_queue:function(q,i){

								_.fd_modal(true,'','Please wait whilst we past the metafields',true);

								var metaJSON = {
									"metafield": {
										"namespace": q[i].namespace,
										"key": q[i].key,
										"value": q[i].value,
										"value_type": q[i].value_type
									}
								};

							

							$.ajax({
								  type: "POST",
								  url: d.URL+'/metafields.json',
								  dataType: 'json',
								  data: metaJSON,
								  success: function(d){
							
								  	if(i+1 < q.length){
								  		_.save_metafield_queue(q,i+1);
								  	}else{
								  		 _.updatedropdown();
								  		 _.fd_modal(false);
								  		Shopify.Flash.notice("Pasted!");
								  	}
								  }
							});


							
							

						},
						setup_products:function(){

							$('div.span6.section-summary').eq(0).append(metafieldloader).find('div:first-child').remove();
							

							/*$('iframe')*/
							if ($('#rte_extra').length == 0){
								$('#product-body-html_ifr').eq(0).after(rte_menu);
								_.setup_rte();
							}else{
								_.notice('Bug! I tried to load the content editor twice.',true);
							}

if(_.data('debug')){
	/*
	$('.rtetools-buttons ul.fr').eq(1).append(autosave_html);
	$('#autosave').on('click',function(){

	

		var t = $(this);
		if(t.hasClass('rte-command-active')){
			Shopify.Flash.notice("Autosave disabled");
			clearInterval(_.data('autosave'));
		}else{
			Shopify.Flash.notice("Autosave enabled");
			_.data('autosave',setInterval(function(){
				$('header input[type="submit"]').click()
			},30000));
		
		}

		$(this).toggleClass('rte-command-active');
	
		return false;

	});
*/
}

							_.btn_removealltags();
							_.seo_description();

							var view_in_store = $('div.span6.section-summary a.view-in-store'),
								page_title = $('h1.header-main span[data-bind="product.title"]'),
								loadinto = $('div.sub_section-summary .content'),
								variants_ids = {};

							page_title.addClass('view-in-store').html('<a target="shopify_storeview" href="'+view_in_store.prop('href')+'">'+page_title.text()+'</a>').prop('title', 'View in store');
							view_in_store.remove();

							/* load away! */
							_.loadmeta(loadinto,v);

							$('#product-inner-variants th:last-child').before('<th>Variant ID</th>');
							$('th.inventory.tc').text('#').prop('title', 'Quantity');
							
							$('tr.variant').each(function(i){
								var variant_id = $('td.sku input.mock-edit-on-hover').eq(i).prop('id').split(/[- ]+/).pop();
								variants_ids['variant_'+i] = {'id':variant_id};
								$(this).find('td:last-child').before('<td class="vid">'+variant_id+'</td>');
							}).promise().done(function(){
								_.panel_editvariantmeta();
							});

							/* here we can set what the default collection metafield should be */
							var tpc = $('table.product-collections').eq(0);
							tpc.find('tr').each(function(){
								var a=$('<a/>',{
									'class':'btn',
									'href':'#',
									'title':'Set a metafield with this collection handle'
								}).text('Set as preferred').on('click',function(){
									_.fd_modal(true,'soon...','Future function');
									return false;
								});
								$(this).find('td.col-remove').prepend(a);
							});
							




						},
						setup_pages:function(){
								/* add new details box, and remove some of the extra crap we don't need to see that's taking up space... */

							var view_in_store = $('div.span6.section-summary a.view-in-store'),
								page_title = $('h1.header-main span[data-bind="page.title"]');


							
							$('#page-content_ifr').eq(0).after(rte_menu);
							
							_.setup_rte();

							page_title.addClass('view-in-store').html('<a target="shopify_storeview" href="'+view_in_store.prop('href')+'">'+page_title.text()+'</a>').prop('title', 'View in store');

							_.seo_description();
							view_in_store.remove();

							$('div.span6.section-summary').eq(0).find('p, h1').remove().end().append(metafieldloader);

							/* defined what we are loading into */
							var loadinto = $('div.sub_section-summary .content');

							/* load away! */
							_.loadmeta(loadinto,v);


							$.ajax({
								type: "GET",
								url: '/admin/pages.json',
								dataType: 'json',
								success: function(d){
									if(d){
										pages = d.pages;
										var response = '';
										for (var i = 0, len = pages.length; i < len; i++) {

											if(_.data('omega') !== pages[i].id.toString()){
												response +='<option value="'+pages[i].id+'">'+pages[i].title+'</option>';
											}
										}

										$('.header-row .header-right').prepend('<select id="shopifyjs_pageselect"><option>Choose another page to edit</option>'+response+'</select>');
										$('#shopifyjs_pageselect').change(function(){
											var v = $(this).val();
											if(v){
												 _.redirect('/pages/'+v);
											}
										});
									}
									
								},
								error:function(d){
									_.notice('Error loading page data',true);
								}
							});

						},
	shipping_remove_all:function(i,c){

			if(i>=0){
				$.ajax({
					type: "DELETE",
					url: '/admin/countries/'+c[i].id+'.json',
					dataType: 'json',
					success: function(d){
						Shopify.Flash.notice('removed '+c[i].name);
						i = i-1;
						_.shipping_remove_all(i,c);
					}
				});
			}else{
				var url = '/admin/settings/shipping';
				$.ajax({
					'url': url,
					'success': function(){
						$('div.shipping-rate-table').remove();
						_.fd_modal(false);
						_.redirect('/settings/shipping');
					}
					});

				
				/*
					Shopify.Flash.notice('All removed, though Shopify will not let the go. Hard refresh the page...');
					window.location = d.URL; 
				*/
			}

	},
	setup_shipping:function(){

		var shippingSettings = $('#settings-shipping'),
			new_buttons = $('<div class="header-right"><div class="header-action"><ul class="segmented"><li><a class="btn" href="#">Bulk Updates</a></li><li><a class="btn delete btn-separate" href="#">Delete all rates</a></li></ul></div></div>');

		new_buttons.find('a').eq(0).on('click',function(){

			var myhtml = $('<h2 class="warning"><strong>Warning:</strong> This section can make bulk changes to your Shipping rates. There is no undo.</h2><div><div class="span1"><p>Soon...</p></div><div class="span2">'+aargh_msg+'</div></div>');

			_.fd_modal(true,myhtml,'Bulk Updates',true);

			return false;
		});

		new_buttons.find('a').eq(1).on('click',function(){
			var myhtml = $('<h2 class="warning"><strong>Warning:</strong> This will delete ALL of your shipping rates. There is no undo.</h2><div><div class="span1"><a href="#" class="btn delete_all delete">Delete</a></div><div class="span2">'+aargh_msg+'</div></div>');

			myhtml.find('a.delete_all').on('click',function(){


				$.ajax({
					type: "GET",
					url: '/admin/countries.json',
					dataType: 'json',
					success: function(d){
						if(d.countries.length){
							v.countries = d.countries;
							_.notice(d.countries.length + " countries returned");
							_.shipping_remove_all(d.countries.length-1,d.countries);
						}else{
							_.notice("The list did not return as expected... empty?",true);
						}
					}
				});


				return false;
			});

			_.fd_modal(true,myhtml,'Delete all shipping rates',true);

			return false;
		});


		shippingSettings.find('header').eq(0).append(new_buttons);


/* the usual interface edit 
		
		shippingSettings.find('div.row.shipping-rates').before('<div class="row section"><div class="span6 section-summary"><h1>Bulk Updates (soon)</h1><p>Add new shipping settings to all countries at once.</p><p></p></div><div class="span18 section-content">Soon, my little shipping monkeys!</div></div>');
*/		
		if(_.data('debug')){
/*
		shippingSettings.find('a[data-modal="settings/shipping/add_country_modal"]').after('<p class="section"><a id="removeallcountries" class="btn delete" href="#">Remove all countries</a></p><p><small>Please note that after running this the page MUST reload. Remember to add this script back into the page...</small></p>');
*/
		/* bulk shipping stuff in here please! */

		function make_weight_based_shipping_rate(cid, minWeight, maxWeight, name, price) {
			$.post('/admin/weight_based_shipping_rates.json', {
				weight_based_shipping_rate: {
					country_id: cid,
					name: name,
					offsets: [], 
					weight_high: maxWeight,
					weight_low: minWeight,
					price: price
				}
			});
		}

		/* ============================================================= */
		}
							

						},
						setup_custom_collections:function(){
							$('div.row.section.visibility').eq(0).after('<div class="row section" id="customer_meta_box"><div class="span12 section-summary">'+metafieldloader+'</div></div>');
							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);
						},
						setup_settings_general:function(){

							var section = $("<div>", {
								id: "general_metafields",
								'class':'row section description'
							}),
							summary = $('<div>', {
								'class':'span6 section-summary'
							}),
							sectionContent = $('<div>',{
								'class':'span18 section-content'
							});

							summary.html('<h1>Store Metafields</h1><p>Edit your most awesome shop level metafields here...</p>');
							sectionContent.html(metafieldloader);
							section.append(summary).append(sectionContent);

							$('div.row.section.description.first-section').eq(0).after(section);

							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);



						},
						setup_customers:function(){
							$('section.customer-details.ssb .box-details').eq(0).after('<div id="customer_meta_box" class="box box-details"><div class="box-header p"><h3>Metafields</h3></div><div class="box-content p">'+metafieldloader+'</div>');
							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);


						},
						setup_single_order:function(){
							$('div.order-sidebar .box-details').eq(0).after('<div id="customer_meta_box" class="box box-details"><div class="box-header p"><h3>Metafields</h3></div><div class="box-content p">'+metafieldloader+'</div>');
							var loadinto = $('div.sub_section-summary .content');
							_.loadmeta(loadinto,v);


						},
						setup_orders:function(){

/*
http://ecommerce.shopify.com/c/shopify-discussion/t/export-email-addresses-from-costumers-156837#comment-157042
*/

							var u = $('<ul/>',{
								'class':'segmented',
								'id':'showsku'
								}),
								l = $('<li/>'),
								a = $('<a/>',{
									'class':'btn',
									'href':'#'
								}).html('Get emails').on('click',function(){

							var myhtml = $(recent_emails_box);

							myhtml.find('a.getdata').on('click',function(){

								var t = $('#recent_emails_output'),
									time = new Date(),
									o = 30,
									o_val = $('#from_recent_order_id').val(),
									f_status = $('#recent_fulfillment_status').val(); 

								/* reset the textarea */
								t.val('');

								if(o_val.length>0){o=parseInt(o_val)}

								time.setDate(time.getDate()- o);

								var d = time.getDate(),
									m = time.getMonth() + 1,
    								y = time.getFullYear();

								var strdate = y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) +' 00:00';

								_.flog(time);
								_.flog(strdate);

								$.ajax({
									type: "GET",
									url: '/admin/orders.json?fields=email&fulfillment_status='+f_status+'&created_at_min='+strdate,
									success: function(d){
										if(d.orders.length){
											var orders = d.orders,
											output = '';

											for (var i = 0, len = orders.length; i < len; i++) {
												_.flog(orders[i].email);
												output+=orders[i].email+',\n';
											}

											t.val(output);

										}else{

											_.notice("Error. No results returned",true);

										}
									}
								});


							});



									
									_.fd_modal(true,myhtml,'Get recent order emails',true);
									return false;

								});

								l.append(a);
								u.append(l);

								$('.header-right .segmented').eq(1).after(u);


						},
						get_recent_emails:function(a){
							/* a = offset */
						},
						shortcut_to_open_orders:function(){
						/*

						Binds click event to the small box showing open orders.
						Makes it a one click method, rather than two.

						*/

							$('#sidebar span[data-bind="Order.openCount"]').on('click',function(){
								_.redirect('/orders?query=+financial_status%3Aany+status%3Aopen');
							}).prop('title','Jump to open orders');
							
						},
						updatedropdown:function(){
								var url = d.URL+'/metafields.json';
								if(_.data('omega') ==='general'){url = '/admin/metafields.json';}

								if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json';}

								$.getJSON(url, function(data) {
									
								var response = '';
								var m = data.metafields;
								

								if(m.length){

									_.data('m',m);
									$('#metacount').text(m.length).addClass('active');
									for (var i = 0, len = m.length; i < len; i++) {
										response+= '<option data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
										v.metafields[m[i].id] = { namespace: m[i].namespace, value: m[i].value, key: m[i].key };

										if (m[i].namespace == 'backups'){
											$('#restorebackup').show();
										}
									}
									response = metafield_default + response;
								}else{
									$('#metacount').text('0').removeClass('active');
									_.data('m',false);
									$('#restorebackup').hide();
									response = metafield_default;
								}

								$('#metafieldselect').html(response);

								_.clearmetaform();

								});		



						},
						load_css:function(){
							/* Load the CSS */
							var shopifyCSS = document.createElement("link");
							shopifyCSS.type = "text/css";
							shopifyCSS.rel = "stylesheet";
							shopifyCSS.id = "shopifyjs";
							shopifyCSS.href = "//rawgithub.com/freakdesign/shopifyFD/master/shopifyFD.css";
							document.body.appendChild(shopifyCSS);
						},
						get_theme_data:function(){

							if(!_.data('themeID')){
								$.ajax({
									type: "GET",
									url: '/admin/themes.json',
									success: function(d){
										if(d){
											for (var i = 0, len = d.themes.length; i < len; i++) {
												if(d.themes[i].role ==='main'){
													_.flog(d.themes[i].id);
													_.data('themeID',d["themes"][i].id);
													_.data('themeName',d["themes"][i].name);
												}
											}
										}
									}
								});
							};

						},
	init:function(){
		_.shortcut_to_open_orders();
		_.set_drag_drop();
		_.get_theme_data();
		if(!_.data('debug')){
			if(!_.readCookie('shopifyfd')){
				_.fd_modal(true,welcome_message,welcome_title);
				_.createCookie('shopifyfd','loaded',3);
			}
		}
		/* enable the styles */
		$('#togglestyle').click(); 

		/* 

		Alpha Omega check. 
		This just keep an eye on the url so we know if something should be fired off or not...

		*/

						



setInterval(function(){

/* do nothing whilst the shopify is in loading mode. This is not the greatest method but it seems reliable enough to detect when Shopify has finished loading its stuff...
*/

if(!_.data('content').hasClass('loading')){ 
/* ========================================================================= */
	/*
	Was added for the autosave. Removed for now.
	clearInterval(_.data('autosave'));
	*/

	/*
	Added support to remove the hash from the equation.
	It was break when a javascript errors forced a true return for the button actions...

	*/

	var u_array = d.URL.split('#')[0].split('?')[0].split('/'),
		alpha = u_array[u_array.length - 2],
		omega = d.URL.split('/').pop();


	if( alpha !== _.data('alpha') || omega !== _.data('omega') ){

		_.data('alpha',alpha);
		_.data('omega',omega);

		_.flog(_.data('alpha')+','+_.data('omega'));

/* ========================================================================= */



	if( _.data('alpha') == 'customers' && !isNaN(_.data('omega'))){
		_.setup_customers();
	}


	if( _.data('alpha') == 'articles' && !isNaN(_.data('omega'))){
		_.setup_articles();
	}


	if( _.data('alpha') == 'pages' && !isNaN(_.data('omega'))){
		_.setup_pages();
	}

	if( _.data('alpha') == 'smart_collections' && !isNaN(_.data('omega'))){
		_.setup_custom_collections(); 
	}

	if( _.data('alpha') == 'custom_collections' && !isNaN(_.data('omega'))){
		 _.setup_custom_collections(); 
	}

	if( _.data('alpha') == 'blogs' && !isNaN(_.data('omega'))){
		/*_.setup_blogs();*/
	}

	if( _.data('alpha') == 'settings' && _.data('omega') == 'general' ){
		_.setup_settings_general();
	}

	if( _.data('alpha') == 'products'){
		_.setup_products();
	}

	if( _.data('alpha') == 'admin' && _.data('omega') == 'products' ){
		_.setup_products_list();
	}
	
	if( _.data('alpha') == 'orders' && !isNaN(_.data('omega'))){
		_.setup_single_order();
	}

	if( _.data('alpha') == 'admin' && _.data('omega') == 'orders' ){
		_.setup_orders();
	}

	if( _.data('alpha') == 'admin' && _.data('omega') == 'discounts' ){
		_.setup_discounts();
	}

	if( _.data('alpha') == 'settings' && _.data('omega') == 'shipping' ){
		_.setup_shipping();
	}

	if( _.data('alpha') == 'settings' && _.data('omega') == 'taxes' ){

	}


} /* end page change check */
} /* end hasclass loading */
}, _.data('wait')); /* end interval */
/* end init */},
	data: function(a,b){
		if("undefined"===typeof b)return v[a];v[a]=b
	},
	toggleStyle: function(){
		/* used to be body, by shopify changed this... */
		$('html').toggleClass('shopifyJSoverride');
		_.flog('toggleStyle');
	},
	getMetafields: function(){
		/* old */
		alert('getMetafields');
	},
	isloading:function(){
		return _.data('content').hasClass('loading');
	}
}}());
				

_.load_css();

				/* create some elements */
	var b = $('body'),
		bar = $("<div>", {id: "shopifyJSbar",'class':'loading'}),
		wrapper = $("<div>", {'class': "wrapper clearfix"}),
		nav = $("<ul>", {id: "shopifyJSnav"});


				/* create some elements */
				nav.html(appnav);

				nav.find('a').on('click',function(){
					if(!_.isloading()){ 

					var t = $(this),
						id=t.prop('id');
					if(id){

					if( id=='manageinventory' && _.data('alpha') !== 'inventory' ){
						_.redirect('/variants');
					}

					if(id=='bulkmetafields'){
						_.bulkmetafields();
					}
					


					if(id=='themesettings' && isNaN(_.data('alpha')) ){
/*
--------------------------
Thanks to Caroline Schnapp for pointing out that this is not required, when simply 
/admin/themes/current/settings will do...
--------------------------
	if(!_.data('themeID')){
		_.flog('no theme set');
		$.ajax({
			type: "GET",
			url: '/admin/themes.json',
			success: function(d){
			if(d){

				for (var i = 0, len = d.themes.length; i < len; i++) {
					if(d.themes[i].role ==='main'){
						_.flog(d.themes[i].id);
						_.data('themeID',d.themes[i].id);
						_.redirect('/themes/'+_.data('themeID') + '/settings');
						break;
					}
				}
			}
			}
		});

	}else{
		_.redirect('/themes/'+_.data('themeID') + '/settings');
	}
*/
_.redirect('/themes/current/settings');
					}

					if(id=='togglestyle'){
						_.toggleStyle();
						t.toggleClass('active');
					}

					if(id=='aboutapp'){_.about_app();}

				}else{
					return true;
				}
					}else{
						Shopify.Flash.error("We better wait for this page to load first...");
					} /* end loading check */

					return false;
				});

				/* put the jigsaw together*/
				wrapper.append(nav);
				bar.append(wrapper);
				
				/* add to page */
				b.append(bar);
				bar.removeClass('loading');
				/* for developers */
				_.notice("ShopifyFD loaded");
				Batman.DOM.Modal.hide();
				_.init();

		}else{
			alert('Error. This should be run within the Shopify Admin page.');
		}

	}else{
		_.notice("Error. ShopifyFD already loaded!",true);
	}
}else{
	alert('Error. jQuery not found.')
}
}}());