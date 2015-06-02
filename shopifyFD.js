/*!



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
if(typeof Shopify !== 'undefined'){
if (typeof jQuery !== 'undefined') {	
if(!$('#shopifyjs').length){
var d = document,url = d.URL;
if(url.indexOf("myshopify.com/admin")>1){

	var _savelabel = 'Save',
	_editlabel = 'Edit',
	_deletelabel = 'Delete';

	/*

	 _   _ _____ __  __ _       ____        _                  _
	| | | |_   _|  \/  | |     / ___| _ __ (_)_ __  _ __   ___| |_ ___
	| |_| | | | | |\/| | |     \___ \| '_ \| | '_ \| '_ \ / _ \ __/ __|
	|  _  | | | | |  | | |___   ___) | | | | | |_) | |_) |  __/ |_\__ \
	|_| |_| |_| |_|  |_|_____| |____/|_| |_|_| .__/| .__/ \___|\__|___/
	                                         |_|   |_|

	*/

	var metafieldform = '<label style="margin-top:1em">Add New Metafield</label><input class="ssb" maxlength="20" type="text" id="metafield_namespace" placeholder="namespace" list="fd-dl-namespace"><datalist id="fd-dl-namespace"></datalist><input class="ssb" maxlength="30" type="text" id="metafield_key" placeholder="key" list="fd-dl-key"><datalist id="fd-dl-key"></datalist><textarea class="ssb" id="metafield_value" placeholder="value"></textarea><input type="hidden" id="metafield_id"><a class="btn fd-btn savemymeta" id="shopifyjs_savemetafield">'+_savelabel+'</a> <a class="int btn fd-btn savemymeta" id="shopifyjs_savemetafield_int">Save as Integer</a> <a id="shopifyjs_copymetafield" class="btn btn-slim hidden btn-primary tooltip tooltip-bottom"><span class="tooltip-container"><span class="tooltip-label">Copy Metafield to Virtual Clipboard</span></span>Copy</a> <a class="btn btn-slim hidden delete tooltip tooltip-bottom" id="shopifyjs_deletemetafield"><span class="tooltip-container"><span class="tooltip-label">There is no undo. Be careful...</span></span>'+_deletelabel+'</a><p style="margin:1em 0;line-height:1"><small>Please note: Using the save button top right will NOT save these metafields. Be sure to click '+_savelabel+' above.<br><br><a id="advanced_meta_features" href="#">Toggle helper buttons</a></small></p><div id="advanced_meta" class="hidden"><p style="border-bottom: 1px solid #ccc;margin-bottom:.5em">Handle Helper <a id="adv_clear_cache" style="float:right" href="#">Clear cache</a></p><p><a id="adv_get_collections" class="btn fd-btn" href="">Get collections</a></p><p><a id="adv_get_products" class="btn fd-btn" href="">Get 250 products</a></p><p><a id="adv_get_pages" class="btn fd-btn" href="">Get pages</a></p></div>';

	var metafieldloader = '<div class="sub_section-summary fadein sidebar-cell"><h1>Metafields <span id="metacount" class="animated bounce">0</span></h1><div class="metafield-content content"><i class="ico ico-20 ico-20-loading"></i></div></div>';

	var metafieldloaderSection = '<div class="section metafields"><div class="next-grid"><div class="next-grid__cell next-grid__cell--quarter"><div class="section-summary"><h1>Metafields</h1><p>Manage the metafields that belong to this collection.</p></div></div><div class="next-grid__cell"><div class="next-card"><div class="section-content" id="collection-metafields"><div class="next-card__section">'+metafieldloader+'</div></div></div></div></div></div>';

	var metafield_default = '<option value="">Select or create a metafield</option>';

	var metafield_copybox = '<div class="metafield-copy-paste"><a class="fd-btn btn" id="fd_copymetafields">Copy All Metafields</a> <a class="fd-btn btn" id="fd_pastemetafields">Paste Metafields</a> <a class="btn btn-slim tooltip tooltip-bottom" href="#" id="fd_whatmetafields"><span class="tooltip-container"><span class="tooltip-label">View what is in the clipboard</span></span>?</a></div>';

	var rte_menu_html = '<div id="rte_extra"><a class="btn fd-btn tooltip delete tooltip-bottom" id="clearformatting" href="#"><span class="tooltip-container"><span class="tooltip-label">Will remove all HTML on click</span></span>Purge html</a> <a class="btn fd-btn tooltip tooltip-bottom" id="clear-html-attributes" href="#"><span class="tooltip-container"><span class="tooltip-label">Removes HTML attributes except<br>target,class,href & src</span></span>Clean HTML</a> <a class="btn fd-btn tooltip tooltip-bottom" id="createbackup" href="#"><span class="tooltip-container"><span class="tooltip-label">Save contents as metafield</span></span>Create Backup</a> <a class="btn btn-slim" style="display:none;" id="restorebackup" href="#">Restore Backup</a> <a class="btn fd-btn tooltip tooltip-bottom" id="save_images_to_meta" href="#"><span class="tooltip-container"><span class="tooltip-label">Add image paths to a metafield</span></span>Images to Metafields</a></div>';

	var vbox = '<div class="vbox fadein"><fieldset><select>'+metafield_default+'</select><input id="mv_namespace" placeholder="namespace" /><input id="mv_key" placeholder="key" /><input id="mv_value" placeholder="value" /></fieldset><span class="mybuttons"><a class="save btn btn-slim" href="#">'+_savelabel+'</a> <a class="btn btn-slim saveinteger" href="#">'+_savelabel+' as Integer</a> <a title="Delete" class="delete ico ico-16 ico-delete" href="#">delete</a></span></div>';

	var appnav = '<li><a id="aboutapp" href="#">About ShopifyFD</a></li><li class="hidden"><a id="togglestyle" href="#" class="tooltip tooltip-bottom"><span class="tooltip-container"><span class="tooltip-label">Toggle ShopifyFD style overrides</span></span>Toggle CSS</a></li><li><a id="bulkmetafields" href="#" class="tooltip tooltip-bottom"><span class="tooltip-container"><span class="tooltip-label">Experimental feature - has limitations</span></span>Bulk Metafields</a></li><li><a href="#" class="disabled tooltip tooltip-bottom"><span class="tooltip-container"><span class="tooltip-label">Create an order</span></span>Order Create</a></li><li><a href="//freakdesign-us.s3.amazonaws.com/shopify/shopifyFD/freakdesign-shopifyfd-for-shopify-guide.pdf" target="_blank" class="tooltip tooltip-bottom"><span class="tooltip-container"><span class="tooltip-label">Open the help PDF in new window</span></span>Help</a></li><li class="animated delay bounce support-development"><a href="http://shopifyfd.com/#install" target="_blank" class="tooltip tooltip-bottom"><span class="tooltip-container"><span class="tooltip-label">Your support is appreciated.</span></span>Use this free tool? Tip me! ($)</a></li>';

	var bulk_html_box = '<h2 class="warning"><strong>ShopifyFD Warning:</strong> This section makes bulk changes to your product metafields. If something goes wrong it may adversely effect product metafields. There is no undo.</h2><table><tr><td>Namespace</td><td><input id="bulk_namespace" placeholder="Namespace" type="text" /></td></tr><tr><td>Key</td><td><input id="bulk_key" placeholder="Key" type="text" /></td></tr><tr><td>Value</td><td><input id="bulk_value" type="text" placeholder="value" /></td></tr><tr><td colspan="2"><p><strong>Note:</strong> Any existing metafield with the same namespace and key will be overwritten.</p></td></tr><tr><td><a class="btn create">Save</a> <a class="btn createint">Save Integer</a></td><td><span style="display:none"><a class="btn delete">Delete</a> <input type="text" style="width:50%" placeholder="Type delete" /></span></td></tr><tr><td colspan="2"><textarea class="debug" placeholder="Data Output (future use only)"></textarea></td></tr></table>';

	var autosave_html = '<li><a id="autosave" tabindex="-1" class="btn btn-slim tooltip tooltip-bottom disabled" href="#"><span class="tooltip-container"><span class="tooltip-label">Enable Autosave</span></span>Autosave</a></li>';

	var recent_emails_box = '<table><tr><td>How many days back do we search?</td><td><input value="30" id="from_recent_order_id" placeholder="days" type="text" /></td></tr><tr><td>Fulfillment Status</td><td><select id="recent_fulfillment_status"><option value="any">Any</option><option value="partial">Partial</option><option value="unshipped">Unshipped</option><option value="shipped">Shipped</option></select></td></tr><tr><td><a class="btn getdata">Get Emails</a></td><small>For now this grabs the email only and adds it to the box below. If you would like to see this work differently - let me know!</small><td></td></tr></table><textarea id="recent_emails_output" class="debug" placeholder="Email addresses will load here..."></textarea>';

	var html_about = '<p>ShopifyFD is "honor-ware", which means that we trust each other to be nice. As the developer of it, I\'m committed to keep the tool something that\'s actually useful. By releasing new features and correcting possible bugs on a constant basis I can do just that, but I need your support. If you use it and intend to keep it, please sponsor its development by making a small <a target="_blank" href="http://shopifyfd.com/">contribution</a>.</p><p>You can track changes by keeping an eye on the project page or following me on <a target="_blank" href="https://twitter.com/freakdesign">twitter</a>.</p><p><h4 style="margin-top:1em">Resources and links</h4><ul><li><a href="http://shopify.freakdesign.com.au" target="_blank">Project home page</a></li><li><a href="http://goo.gl/OsFK2d" target="_blank">Feature Request</a></li><li><a href="http://bit.ly/shopifyFD_forum" target="_blank">Shopify forum post</a></li></ul></p>';

	var aargh_msg = '<p>The page may need to be reloaded to see the changes.</p>';

	var bubble_html = '<div class="bubble hide fadein"><div class="bubble-content p"><h3 class="large">Orders</h3><div class="pr"><ul class="unstyled"></ul></div></div></div>';
	
	var bulk_tags = '<div><div class="clearfix em"><div class="half">Choose a collection</div><div class="half"><select data-action="collection"><option value="">Loading, please wait...</option></select></div></div><div class="clearfix em"><div class="half">Choose an action</div><div class="half"><select data-action="action"><option value="add">Add</option><option value="set">Set</option><option value="remove">Remove</option><option disabled value="toggle">Toggle</option><option value="purge" style="background:red;color:#fff">DELETE ALL</option></select></div></div><div class="clearfix em"><div class="half">Set the tag</div><div class="half"><input /></div></div><div class="half"><a class="btn" data-action="update_tags">Update tags</a></div><div class="half"><small>Add: Adds tags to the existing ones<br>Set: Replaces tags with new ones<br>Remove: Removes matching tags<br>Toggle: Future Use, disabled...</small></div></div>';

	var emergencyPanel = '<div class="emergency-panel">{contents}</div>';

	var supportingSite = ['citizen-reign','morfars'];

var _ = (function(){

	var v = { 
		debug: false,
		drag_on:false,
		alpha: false,
		omega: false,
		countries:false,
		wait: 1000,
		api_count:0, /* call count */
		api_limit:250,
		metafields:{},
		autosave: false,
		content: $('#content'), /* must be refreshed on each load */
		body:$('body')
	};

return {
	escape:function (str) {
		/*
		Escapes a string
		*/
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
	redirect:function(url) {
    	if(typeof url !== 'undefined' && typeof Turbolinks === 'function'){
			try {
				Turbolinks.visit(url);
			} catch (e) {
				return false;
			}
    	}
	},
	selectSort:function(a,b){
		if(!a.getAttribute('value')){
			return -1;
		}else if(!b.getAttribute('value')){
			return 1;
		}
		return (a.innerHTML > b.innerHTML) ? 1 : -1;
	},
	stripHTML:function(dirtyString) {
    	var container = document.createElement('div');
    	container.innerHTML = dirtyString;
    	return container.textContent || container.innerText;
	},
	supportsHTML5Storage:function(){
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	},
	createCookie:function(name,value,days) {

		/*
		  ____                _          ____            _    _
		 / ___|_ __ ___  __ _| |_ ___   / ___|___   ___ | | _(_) ___
		| |   | '__/ _ \/ _` | __/ _ \ | |   / _ \ / _ \| |/ / |/ _ \
		| |___| | |  __/ (_| | ||  __/ | |__| (_) | (_) |   <| |  __/
		 \____|_|  \___|\__,_|\__\___|  \____\___/ \___/|_|\_\_|\___|

		Creates a cookie. 

		*/

		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}else var expires = "";

		document.cookie = name+"="+value+expires+"; path=/";

	},
	readCookie:function(name) {

		/*
		 ____                _    ____            _    _
		|  _ \ ___  __ _  __| |  / ___|___   ___ | | _(_) ___
		| |_) / _ \/ _` |/ _` | | |   / _ \ / _ \| |/ / |/ _ \
		|  _ <  __/ (_| | (_| | | |__| (_) | (_) |   <| |  __/
		|_| \_\___|\__,_|\__,_|  \____\___/ \___/|_|\_\_|\___|

		well, this reads a cookie...

		*/
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
		 _   _       _   _
		| \ | | ___ | |_(_) ___ ___
		|  \| |/ _ \| __| |/ __/ _ \
		| |\  | (_) | |_| | (_|  __/
		|_| \_|\___/ \__|_|\___\___|

		Show message at bottom of the screen

		*/

		if('function' === typeof Shopify.Flash.error && 'function' === typeof Shopify.Flash.notice){
			if(err){
				Shopify.Flash.error(m);
			}else{
				Shopify.Flash.notice(m);
			}
		}

	},
	about_app:function(){

		/*
		       _                 _
		  __ _| |__   ___  _   _| |_    __ _ _ __  _ __
		 / _` | '_ \ / _ \| | | | __|  / _` | '_ \| '_ \
		| (_| | |_) | (_) | |_| | |_  | (_| | |_) | |_) |
		 \__,_|_.__/ \___/ \__,_|\__|  \__,_| .__/| .__/
		                                    |_|   |_|
		About this tool.

		*/

		_.fd_modal(true,html_about,'About this tool',true);
		return false;

	},
	createbackup:function(id){

		/*

		  ____                _         ____             _
		 / ___|_ __ ___  __ _| |_ ___  | __ )  __ _  ___| | ___   _ _ __
		| |   | '__/ _ \/ _` | __/ _ \ |  _ \ / _` |/ __| |/ / | | | '_ \
		| |___| | |  __/ (_| | ||  __/ | |_) | (_| | (__|   <| |_| | |_) |
		 \____|_|  \___|\__,_|\__\___| |____/ \__,_|\___|_|\_\\__,_| .__/
		                                                           |_|
		Create a backup of the current RTE html

		*/

		if(typeof id === 'undefined'){return}
		if(id){
			var mycontent = $("iframe:first").contents().find("#tinymce:first");
			var myhtml = mycontent.html();
			if(typeof myhtml === 'undefined'){ return }

			var metaJSON = {
				"metafield": {
					"namespace": 'backups',
					"key": id, /* consider using datestamp in the future for multiple backups */
					"value": myhtml,
					"value_type": "string"
				}
			};

			var url = d.URL+'/metafields.json';
			if(_.data('alpha') === 'articles'){
				url = '/admin/articles/' + id + '/metafields.json';
			}

			$.ajax({
				type: "POST",
				url: url,
				dataType: 'json',
				data: metaJSON,
				success: function(d){
					_.updatedropdown();
					_.notice('Backup saved');
				},
				error: function(d){
					var err = JSON.parse(d.responseText);
					_.notice(err.errors.value[0],true);
				}
			});

		}
	},
	loadmeta:function(loadinto,v){

		/*

		 _                 _                _
		| | ___   __ _  __| |_ __ ___   ___| |_ __ _
		| |/ _ \ / _` |/ _` | '_ ` _ \ / _ \ __/ _` |
		| | (_) | (_| | (_| | | | | | |  __/ || (_| |
		|_|\___/ \__,_|\__,_|_| |_| |_|\___|\__\__,_|

		Loads the metafields for the current view

		*/

		var url = '/admin/'+_.data('alpha')+'/'+_.data('omega')+'/metafields.json?limit=250';

		if(_.data('omega') ==='general'){url = '/admin/metafields.json?limit=250';}
		if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json?limit=250';}

		$.getJSON(url, function(data) {

			var h = '';
			var namespaceArray = _.data('datalistNamespace') || ['global'];
			var keyArray = _.data('datalistKey') || [];

			m = data.metafields;

			if(m){

				_.data('m',m);
				_.data('hasbackup',false); /* reset to default */
				$('#restorebackup').hide();

				if(_.data('alpha')==='products' || _.data('alpha')==='collections' || _.data('alpha')==='pages'){
					_.setup_copypaste();	
				}

				var metacount = $('#metacount');
				metacount.text(m.length).addClass('active');

				if(m.length === 0){
					metacount.removeClass('active');
				}else{
					metacount.addClass('active');
				}

				for (var i = 0, len = m.length; i < len; i++) {
					h+= '<option data-type="' +m[i].value_type + '" data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
					v.metafields[m[i].id] = { namespace: m[i].namespace, value: m[i].value, key: m[i].key };
					if (m[i].namespace == "backups"){
						if(_.data('hasbackup') === false){
							$('#restorebackup').show();
							_.data('hasbackup',true);
							_.setupRteBackupBtn();
						}
					}

					namespaceArray.push(m[i].namespace);
					keyArray.push(m[i].key);

				}

				namespaceArray = _.array_unique(namespaceArray);
				keyArray = _.array_unique(keyArray);

				_.data('datalistNamespace',namespaceArray);
				_.data('datalistKey',keyArray);

				h = '<select id="metafieldselect">' + metafield_default + h +'</select>';
			}else{
				h ='<select id="metafieldselect">' + metafield_default + '</select>';
			}

			loadinto.html(h).append(metafieldform);

			for (var i = 0; i < namespaceArray.length; i++) {
				var dlOption = $('<option />',{
					value:namespaceArray[i]
				});
				$('#fd-dl-namespace').append(dlOption)
			};
			
			for (var i = 0; i < keyArray.length; i++) {
				var dlOption = $('<option />',{
					value:keyArray[i]
				});
				$('#fd-dl-key').append(dlOption)
			};


			$('#advanced_meta_features').off('click').on('click',function(){
				var adv_meta = $('#advanced_meta').eq(0);
				adv_meta.toggleClass('hidden');
				return false;
			});

			$('#adv_clear_cache').off('click').on('click',function(){
				$('#advanced_meta').find('select').remove().end().find('a').show();
				_.data('products',false);
				_.data('collections',false);
				return false;
			});

		/* 
		note the double up functions 
		these should be merged into one
		*/
		$('#adv_get_products').off('click').on('click',function(){

			var t = $(this);
			if(!_.data('products')){
			$.ajax({
			type: "GET",
			url: '/admin/products.json?limit=250',
			dataType: 'json',
			success: function(d){
				if(d.products.length){
					_.data('products',d);
					var toappend='',
						select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
						}).html('<option value="">Add product handle as value</option>');

					for (var i = 0, len = d.products.length; i < len; i++) {
						toappend+='<option value="'+d.products[i].handle+'">'+d.products[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
				}
			},
			fail: function(){
				_.notice('Failed to load products',true);
			}
			});
			}else{
				var d = _.data('products');
				var toappend='',
					select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
					}).html('<option value="">Add product handle as value</option>');

					for (var i = 0, len = d.products.length; i < len; i++) {
						toappend+='<option value="'+d.products[i].handle+'">'+d.products[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
			}

			return false;

		});

		/* 
		note the double up functions 
		these should be merged into one
		*/
		$('#adv_get_pages').off('click').on('click',function(){

			var t = $(this);
			if(!_.data('products')){
				$.ajax({
				type: "GET",
				url: '/admin/pages.json',
				dataType: 'json',
				success: function(d){
					if(d.pages.length){
						_.data('pages',d);
						var toappend='',
							select=$('<select />',{}).change(function(){
								var t=$(this);
								$('#metafield_value').val(t.val());
							}).html('<option value="">Add page handle as value</option>');

						for (var i = 0, len = d.pages.length; i < len; i++) {
							toappend+='<option value="'+d.pages[i].handle+'">'+d.pages[i].title+'</option>';
						}

						select.append(toappend);
						t.after(select).hide();
					}
				},
				fail: function(){
					_.notice('Failed to load pages',true);
				}
				});
			}else{
				var d = _.data('products');
				var toappend='',
					select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
					}).html('<option value="">Add page handle as value</option>');

					for (var i = 0, len = d.pages.length; i < len; i++) {
						toappend+='<option value="'+d.pages[i].handle+'">'+d.pages[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
			}

			return false;

		});


		$('#adv_get_collections').off('click').on('click',function(){
			var t = $(this);
			if(!_.data('collections')){
			$.ajax({
			type: "GET",
			url: '/admin/collections.json?limit=250',
			dataType: 'json',
			success: function(d){
				if(d.collections.length){
					_.data('collections',d);
					var toappend='',
						select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
						}).html('<option value="">Add collection handle as value</option>');

					for (var i = 0, len = d.collections.length; i < len; i++) {
						toappend+='<option value="'+d.collections[i].handle+'">'+d.collections[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
				}
			},
			error: function(){
				_.notice('Failed to load collections',true);
			}
			});
			}else{
				var d = _.data('collections');
				var toappend='',
					select=$('<select />',{}).change(function(){
							var t=$(this);
							$('#metafield_value').val(t.val());
					}).html('<option value="">Add collection handle as value</option>');

					for (var i = 0, len = d.collections.length; i < len; i++) {
						toappend+='<option value="'+d.collections[i].handle+'">'+d.collections[i].title+'</option>';
					}

					select.append(toappend);
					t.after(select).hide();
			}
			return false;

		});


		$('#metafieldselect').change(function(){
			var t = $(this).find(':selected');
			if(t.attr('data-id')){

				var m = v.metafields[t.attr('data-id')],
				mtype = 'string',
				mtype_text ='Convert to integer';

				if(t.attr('data-type')==='integer'){mtype = 'integer';mtype_text ='Convert to string'}


				$('#metafield_namespace').val(m.namespace).prop("disabled", true);
				$('#metafield_key').val(m.key).prop("disabled", true);
				$('#metafield_value').val(m.value);
				$('#metafield_id').val(t.attr('data-id'));

				$('#shopifyjs_deletemetafield').removeClass('hidden');
				/*$('#shopifyjs_copymetafield').removeClass('hidden');*/


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

		if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields/'+metafield_id+'.json';}
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
				  },
				  error: function(d){
				  	var r = JSON.parse(d.responseText),
				  	e = '';
				  	
				  	if (r.errors.namespace){e+='Namespace '+_.escape(r.errors.namespace[0])+'. '}
				  	if (r.errors.key){e+='Key '+_.escape(r.errors.key[0])+'. '}
				  	if (r.errors.value){e+='Value '+_.escape(r.errors.value[0])+'. '}

				  	_.notice('Metafield failed to save: ' + e,true);
				  }
			});
		}

		return false;

		});


		});
	},
	bulk_save_metafield_queue:function(m,i,debug_box){

		/*
		                _         __ _      _     _
		 _ __ ___   ___| |_ __ _ / _(_) ___| | __| |   __ _ _   _  ___ _   _  ___
		| '_ ` _ \ / _ \ __/ _` | |_| |/ _ \ |/ _` |  / _` | | | |/ _ \ | | |/ _ \
		| | | | | |  __/ || (_| |  _| |  __/ | (_| | | (_| | |_| |  __/ |_| |  __/
		|_| |_| |_|\___|\__\__,_|_| |_|\___|_|\__,_|  \__, |\__,_|\___|\__,_|\___|
		                                                 |_|

		Bulk metafield queue

		*/
						
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

					_.notice("Bulk changes done!");
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
		url: '/admin/products.json?limit=250&fields=id,title',
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
		var mycontent = $("iframe:first").contents().find("#tinymce:first");
		var div = document.createElement("div");

		div.innerHTML = mycontent.html();
		var text = div.textContent || div.innerText || "";
		mycontent.text(text);
	},
	removeAttributes:function(){

		var mycontent = $("iframe:first").contents().find("#tinymce:first");
		var selector = mycontent.find('*');
		var whitelist = ['href','target','class','src'];
		selector.each(function(i,elem) {
			for (var i = elem.attributes.length -1; i >= 0 ; i--) {
				if(whitelist.indexOf(elem.attributes[i].name)<0){
					elem.removeAttribute(elem.attributes[i].name);
				}
			}
		});

	},
	clearmetaform: function(){
		$('#metafield_namespace').val('').prop("disabled", false);
		$('#metafield_key').val('').prop("disabled", false);
		$('#metafield_value').val('');
		$('#metafield_id').val('');
		$('#shopifyjs_deletemetafield').addClass('hidden');
		/*$('#shopifyjs_copymetafield').addClass('hidden');*/

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
	do_upload:function(d){
		/*
			 _                     _                 _
		  __| | ___    _   _ _ __ | | ___   __ _  __| |
		 / _` |/ _ \  | | | | '_ \| |/ _ \ / _` |/ _` |
		| (_| | (_) | | |_| | |_) | | (_) | (_| | (_| |
		 \__,_|\___/   \__,_| .__/|_|\___/ \__,_|\__,_|
		                    |_|

		grab the dropped files and upload them to the theme

		*/

		if(_.data('drag_on')){

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
	updateVariant:function(data,count,callback){

		_.notice('Updating Variant '+(count+1)+'/'+data.length+'...');

		if(typeof count === 'undefined'){var count = 0}
		if(typeof callback === 'undefined'){var callback = false}

		$.ajax({
			type: "PUT",
			url: '/admin/variants/'+data[count].variant.id,
			dataType: 'json',
			data: data[count],
			success: function(d){
				++count;
				if(count<data.length){
					_.updateVariant(data,count,callback);
				}else{
					_.notice('Variants updated');
					if(typeof callback === 'function'){
						callback();
					}
				}	
			},
			error:function(){
				_.notice('Update failed',true);
			}
		});
	},
	save_variant_metafield:function(id,namespace,key,value,vid,type){

		/*
                                       		   _             _                    _         __ _      _     _
		 ___  __ ___   _____  __   ____ _ _ __(_) __ _ _ __ | |_   _ __ ___   ___| |_ __ _ / _(_) ___| | __| |
		/ __|/ _` \ \ / / _ \ \ \ / / _` | '__| |/ _` | '_ \| __| | '_ ` _ \ / _ \ __/ _` | |_| |/ _ \ |/ _` |
		\__ \ (_| |\ V /  __/  \ V / (_| | |  | | (_| | | | | |_  | | | | | |  __/ || (_| |  _| |  __/ | (_| |
		|___/\__,_| \_/ \___|   \_/ \__,_|_|  |_|\__,_|_| |_|\__| |_| |_| |_|\___|\__\__,_|_| |_|\___|_|\__,_|

		save a metafield attached to a variant

		*/

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

		/*
		     _      _      _                         _             _                    _         __ _      _     _
		  __| | ___| | ___| |_ ___  __   ____ _ _ __(_) __ _ _ __ | |_   _ __ ___   ___| |_ __ _ / _(_) ___| | __| |
		 / _` |/ _ \ |/ _ \ __/ _ \ \ \ / / _` | '__| |/ _` | '_ \| __| | '_ ` _ \ / _ \ __/ _` | |_| |/ _ \ |/ _` |
		| (_| |  __/ |  __/ ||  __/  \ V / (_| | |  | | (_| | | | | |_  | | | | | |  __/ || (_| |  _| |  __/ | (_| |
		 \__,_|\___|_|\___|\__\___|   \_/ \__,_|_|  |_|\__,_|_| |_|\__| |_| |_| |_|\___|\__\__,_|_| |_|\___|_|\__,_|

		delete a metafield attached to a variant

		*/
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

		$('#mv_namespace').val('').prop("disabled", false);
		$('#mv_key').val('').prop("disabled", false);
		$('#mv_value').val('');
		_.data('current_vid','');
		
		var option = function(o){
			return '<option class="meta" value="'+o.id+'">'+o.namespace+'.'+o.key+'</option>';
		}

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


						if(!_.data('current_vid')){
							_.data('current_vid','');
						}
						_.save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_.data('current_vid'));
						return false;
					});

					$('#vrow .saveinteger').off('click').on('click',function(){

						/*$('#vrow .mybuttons').hide();*/
						if(!_.data('current_vid')){
							_.data('current_vid','');
						}
						_.save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_.data('current_vid'),true);
						return false;
					});

					$('#vrow .delete').off('click').on('click',function(){

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

					$('#vrow .mybuttons').fadeIn();

					
				},
				error:function(d){
					_.notice("Error grabbing metafields",true);
				}
			});
							}else{
								_.notice("Could not find ID",true);
							}

	},
	panel_editvariantmeta:function(){

							/*$('.row.section.inventory .section-summary p').eq(0).after('<p class="box notice">To edit metafields for the variant click in the variant ID number field.</p>');*/

							var tdVidInput = $('td.vid input');
							/* simple function to return val to default */
							tdVidInput.on('change', function() {
								var t = $(this);
								t.val(t.attr('data-val'));
							}).on('click',function(){
								var t = $(this);
								t.select();
							});

							var editVariantMetafieldBtn = $('.edit-variant-metafield');
							editVariantMetafieldBtn.on('click', function(e) {
								e.preventDefault();

								$('#vrow').remove();
								var t = $(this),
								v = t.attr('data-val');
								
								_.data('currentvrow',v);

								$('tr.variant.active').removeClass('active');
								
								var tp = t.parent().parent().parent();
								tp_td = tp.find('td').length+1;
								tp.addClass('active').after('<tr id="vrow"><td colspan="'+tp_td+'">'+vbox+'</td></tr>');

								_.setup_vrow(v);
							});

						},
	btn_removealltags:function(view){
		if(view !== 'product'){ return }

		var targetHTML = $('ul.js-tag-list').eq(0).parent();
		if(targetHTML.length){

			targetHTML.append('<a id="addalltags" href="#" class="fd-btn btn">Add all tags</a> <a id="removealltags" href="#" class="fd-btn btn delete">Remove all tags</a>');

			$('#removealltags').on('click',function(e){
				e.preventDefault();
				$('ul.next-token-list').eq(0).find('a').click();
			});

			$('#addalltags').on('click',function(e){
				e.preventDefault();
				$('.previous-tags li.next-token--clickable').click();
			});

		}else{
			_.notice('ShopifyFD error : btn_removealltags : target html not found',true);
		}

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
				var mclose = $('<a href="#" class="close-modal">&times;</a>');
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
	restorebackup:function(id){
		var mycontent = $("iframe").contents().find("#tinymce").eq(0);
		var m = _.data('m');

		if(m){
			for (var i = 0, len = m.length; i < len; i++) {
				if(m[i].namespace === 'backups'){
				mycontent.html(m[i].value);
				_.notice('Backup restored');
				return;
			}}
		}else{
			_.notice('Error, nothing to restore',true);
		}
	},
	setup_discounts:function(){

		/*var targetHTML = $('.header-row .header-right').eq(0);*/

		var targetHTML = $('.header .header__secondary-actions:first');
		

		if(targetHTML.length){
			var u = $('<ul/>',{
			'class':'segmented',
			'id':'discount_buttons'
			}),
			l = $('<li/>'),
			c = $('<a/>',{
				'class':'btn btn-separate disabled',
				'href':'#'
			}).html('Bulk create').on('click',function(e){
				e.preventDefault();

			});

			l.append(c);
			u.append(l);
			targetHTML.prepend(u);	

		}else{
			_.notice('ShopifyFD error : setup_discounts : target html not found',true);
		}

	},
	setup_articles:function(){

		var targetHTML = $('.section.description .section-summary').eq(0);
		var headerButtons = $('.header-row .header-right').eq(0);
		if(!headerButtons.length){headerButtons = $('.header .header__secondary-actions:first');}
		if(!headerButtons.length){headerButtons = $('.header .header__primary-actions:first')}

		if(targetHTML.length){
			var itemViewLink = targetHTML.find('a').eq(0).attr('href');	
			targetHTML.after(metafieldloader).remove();

			var loadinto = $('div.metafield-content');
			_.loadmeta(loadinto,v);

			var page_title = $('h1.header-main');

			if(page_title.length){

				var viewInStore = $('<a />',{
					href:itemViewLink,
					target:'_blank',
					style:'display: inline-block;vertical-align: top;',
					title:'View in Store'
				});

				viewInStore.append('<i class="next-icon next-icon--20 next-icon--header next-icon--website-slate-lightest"></i>');
				page_title.append(viewInStore);
			}

		}else{
			_.notice('ShopifyFD error : setup_articles : Metafield target HTML not found',true);
		}

		if(headerButtons.length){
			var u = $('<ul/>',{
			'class':'segmented',
			'id':'copy-object'
			}),
			l = $('<li/>'),
			c = $('<a/>',{
				'class':'btn btn-separate',
				'href':'#'
			}).html('Duplicate').on('click',function(e){
				e.preventDefault();
				var t = $(this);
				$.getJSON(d.URL+'.json', function(data) {
					var articleJSON = {
						article:{
							author:data.article.author,
							blog_id:data.article.blog_id,
							body_html:data.article.body_html,
							summary_html:data.article.summary_html,
							tags:data.article.tags,
							template_suffix:data.article.template_suffix,
							title:data.article.title + ' [copy]',
							published:false
						}
					};
					$.ajax({
						type: "POST",
						url: '/admin/blogs/'+data.article.blog_id+'/articles.json',
						dataType: 'json',
						data: articleJSON,
						success: function(d){
							_.redirect('/admin/blogs/'+d.article.blog_id+'/articles/'+d.article.id);
						},
						error:function(d){
							_.notice('Error saving',true);
						}
					});

				});

			});

			l.append(c);
			u.append(l);
			headerButtons.prepend(u);

		}else{
			_.notice('ShopifyFD error : setup_articles : Header button missing',true);
		}

		if ($('#rte_extra').length === 0){
			$('#article-content_iframecontainer').eq(0).after(rte_menu_html);
			_.setup_rte();
		}


	},
	setup_blogs:function(){

		var targetHTML = $('div.section.description');

		if(targetHTML.length){

			targetHTML.after(metafieldloaderSection);
			var loadinto = $('div.metafield-content');
			_.loadmeta(loadinto,v);

		}else{
			_.notice('ShopifyFD error : setup_blogs : target html not found',true);
		}

	},
	setupRteBackupBtn:function(){
		var restoreBackupBtn = $('#restorebackup');
		restoreBackupBtn.show().on('click',function(e){
			e.preventDefault();
			_.restorebackup(_.data('omega'));
		});
	},
	setup_rte:function(){

		/*
		          _                 ____ _____ _____
		 ___  ___| |_ _   _ _ __   |  _ \_   _| ____|
		/ __|/ _ \ __| | | | '_ \  | |_) || | |  _|
		\__ \  __/ |_| |_| | |_) | |  _ < | | | |___
		|___/\___|\__|\__,_| .__/  |_| \_\|_| |_____|
		                   |_|

		Run scripts for the real time editor

		*/

		var restoreBackupBtn = $('#restorebackup');
		if(restoreBackupBtn.length){
			if(_.data('hasbackup')){
				_.setupRteBackupBtn();
			}else{
				restoreBackupBtn.hide();
			}
		}

		$('#clearformatting').on('click',function(e){
			e.preventDefault();
			_.clearformatting();
		});

		$('#clear-html-attributes').on('click',function(e){
			e.preventDefault();
			_.removeAttributes();
		});
		

		$('#createbackup').on('click',function(){
			_.createbackup(_.data('omega'));
			return false;
		});

		$('#save_images_to_meta').on('click',function(){
			_.save_images_to_meta();
			return false;
		});

	},
	save_images_to_meta:function(){

		/*
		                       _                              _                         _
		 ___  __ ___   _____  (_)_ __ ___   __ _  __ _  ___  | |_ ___    _ __ ___   ___| |_ __ _
		/ __|/ _` \ \ / / _ \ | | '_ ` _ \ / _` |/ _` |/ _ \ | __/ _ \  | '_ ` _ \ / _ \ __/ _` |
		\__ \ (_| |\ V /  __/ | | | | | | | (_| | (_| |  __/ | || (_) | | | | | | |  __/ || (_| |
		|___/\__,_| \_/ \___| |_|_| |_| |_|\__,_|\__, |\___|  \__\___/  |_| |_| |_|\___|\__\__,_|
		                                         |___/

		Take any images from the rte and save as a metafield

		*/

		var images = $("iframe:first").contents().find("#tinymce:first").find('img');

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

			var url = d.URL+'/metafields.json';
			if(_.data('alpha') === 'articles'){
				url = '/admin/articles/' + _.data('omega') + '/metafields.json';
			}
			$.ajax({
				  type: "POST",
				  url: url,
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
	array_unique:function(array){
		var a = array.concat();
		for(var i=0; i<a.length; ++i) {
		for(var j=i+1; j<a.length; ++j) {
		if(a[i] === a[j])
		a.splice(j--, 1);
		}}

		return a;
	},
	showSkuHeaderCount:function(){
		var firstGridCell = $('div.header-row:first');
		if(firstGridCell.length){
			var skuGridCell = $('<div />',{
				'class':'row s-none'
			});

			$.ajax({
				type: "GET",
				url: '/admin/settings/general.json',
				dataType: 'json',
				success: function(d){
					var totalSkus = false;
					try {
						_.data('shop_settings', d.shop_settings);
						totalSkus = d.shop_settings.total_skus;
						skuGridCell.html(skuNoticeHtml);
					}catch (e) {}

					if(totalSkus){
						var skuNoticeHtml = '<div class="box notice header-notice has-ico"><i class="ico next-icon--16 next-icon--notice-blue in-gutter"></i>You are using %1 skus</div>';
						skuNoticeHtml = skuNoticeHtml.replace('%1',totalSkus);
						skuGridCell.html(skuNoticeHtml);
						firstGridCell.after(skuGridCell);
					}
				}
			});

		}
	},
	setup_products_list:function(){

		/*
		                     _            _     _ _     _
		 _ __  _ __ ___   __| |_   _  ___| |_  | (_)___| |_
		| '_ \| '__/ _ \ / _` | | | |/ __| __| | | / __| __|
		| |_) | | | (_) | (_| | |_| | (__| |_  | | \__ \ |_
		| .__/|_|  \___/ \__,_|\__,_|\___|\__| |_|_|___/\__|
		|_|

		*/
		_.showSkuHeaderCount();

		/*var targetHTML = $('.header-right .segmented').eq(0);*/
		var targetHTML = $('.header .header__secondary-actions:first');
		if(!targetHTML.length){targetHTML = $('.header .header__primary-actions:first')}

		if(targetHTML.length){

			if(!$('#showsku').length){

				var u = $('<ul/>',{
					'class':'segmented',
					'id':'showsku'
				}),
				l = $('<li/>'),
				a = $('<a/>',{
					'class':'btn fd-btn animated fadein',
					'href':'#',
					'title':'Show SKU and Variant IDs'
				}).html('Show SKUs & ID').on('click',function(e){
					e.preventDefault();
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
									var s = d.product.variants[0].sku,
									v = d.product.variants[0].id,
									skuspan ='';

									if(s || v){
										if(s){skuspan='<span title="SKU" class="sku label animated fadein">'+s+'</span>'}
										a_list.eq(i).before(skuspan+'<span title="VariantID" class="variant-label badge badge--small badge--left-margin animated fadein">'+v+'</span>');
									}

									if(i+1 < p.length){
										getsku(p,i+1);
									}else{
										_.notice('SKUs and Variant IDs Loaded');
									}

								}	
								
							});

						};

						_.notice('Loading SKUs and Variant IDs, please wait...');
						getsku(p,i);
					}

				});

				l.append(a);
				u.append(l);
				targetHTML.append(u);

			}
		}else{
			_.notice('Error : setup_products_list : html not found',true);
		}
	},
	setup_themes:function(){

			var publishedTitle = $('.published-theme-title'),
			customiseBtn = $('.btn.btn-primary').eq(0), /* for the published theme */
			customiseHREF = customiseBtn.attr('href'),
			themeBoxes = $('div.unpublished-box');

			var themeIDs = [];
			for (var i = 0; i < themeBoxes.length; i++) {
				var themeID = themeBoxes[i].id.split('_').pop();
				themeIDs.push(themeID);
				var contentBox = themeBoxes.eq(i).find('.next-card__section.tc'),
				div = $('<div />',{
					'class':'theme-id'
				}).html('<span class="tooltip-bottom tooltip"><span class="tooltip-container"><span class="tooltip-label">Theme ID</span></span>'+themeID+'</span>');
				contentBox.append(div);
			};

			if(publishedTitle.length){
				if(typeof customiseHREF !== 'undefined'){
					if(customiseHREF.indexOf('/admin/themes')>-1){
						var themeID = customiseHREF.split('/')[3];
						themeIDs.push(themeID);
						var span = $('<span />',{
							'class':'theme-id published'
						}).text(themeID);
						publishedTitle.append(span);
					}
				}
			}

			if(themeIDs.length > 1){
				var targetHeaderButton = $('.header .header__secondary-actions:first'); /*$('.header-right a:last')*/
				if(targetHeaderButton.length){
					var downloadAllThemesBtn= $('<a />',{
						'class':'btn fd-btn'
					}).text('Export all themes').on('click',function(e){
						e.preventDefault();
						for (var i = 0; i < themeIDs.length; i++) {
							var url = '/admin/themes/'+ themeIDs[i] +'/export';
							$.ajax({ 
								type: "POST", 
								data:{'_method':'post'},
								url: url 
							});
						};
						_.notice(themeIDs.length + ' export requests sent. Check your inbox');
					});
					targetHeaderButton.append(downloadAllThemesBtn);
				}
			}

	},
		setup_link_lists_single:function(){

			var targetHTML = $('.header .header__primary-actions:first'); /* $('.header-row .header-right') */
			if(targetHTML.length){
				$.ajax({
					type: "GET",
					url: '/admin/link_lists.json',
					dataType: 'json',
					success: function(d){
						if(d){
							link_lists = d.link_lists;
							var response = '';
							for (var i = 0, len = link_lists.length; i < len; i++) {

								if(_.data('omega') !== link_lists[i].id.toString()){
									response +='<option value="'+link_lists[i].id+'">'+link_lists[i].title+'</option>';
								}
							}

							var llselect = $('<select />',{
								'class':'header-select fadein'
							}).append('<option>Choose another linklist to edit</option>',response).change(function(){
								var v = $(this).val();
								if(v){
									 _.redirect('/admin/link_lists/'+v);
								}
							});

							targetHTML.prepend(llselect);

						}
						
					},
					error:function(d){
						_.notice('Error loading linklist data',true);
					}
				});
			}


		},
		setup_link_lists:function(){
			/* Setup the button and actions for link list duplication and creation */
			var llf = $('.next-card__section .next-grid__cell--no-flex'),
				create_collection_linklist = function(){

					$.ajax({
						type: "GET",
						url: '/admin/collections.json?limit=250',
						dataType: "json",
						success: function(d){

							var compiled = {};
							compiled['utf8'] = '✓';
							compiled['link_list[handle]'] = 'all-collections';
							compiled['link_list[title]'] = 'All Collections';
							var compiledParam = $.param(compiled);

							var l = {"link_list":{"handle":"all-collections","title":"All Collections","links":[]}};

							for (var i = 0, len = d.collections.length; i < len; ++i) {
								l.link_list.links.push({
									'position':i+1,
									'title': d.collections[i].title,
									'link_type':'collection',
									'subject_id':d.collections[i].id
								});

								var compiledLink = {};
								compiledLink['link_list[links][][position]'] = i+1;
								compiledLink['link_list[links][][title]'] = d.collections[i].title;
								compiledLink['link_list[links][][link_type]'] = 'collection';
								compiledLink['link_list[links][][subject_id]'] = d.collections[i].id;
								compiledParam +='&' + $.param(compiledLink);

							}

							/* create_a_linklist(l); // old method */
							create_a_linklist_FIX(compiledParam);

						},
						error:function(){
							_.notice('Error! Are you sure you have access to collections?',true);
						}
					});

					return false;
				},
				create_pages_linklist = function(){
					/* get the pages */

					$.ajax({
						type: "GET",
						url: '/admin/pages.json?limit=250',
						dataType: "json",
						success: function(d){

							var compiled = {};
							compiled['utf8'] = '✓';
							compiled['link_list[handle]'] = 'all-pages';
							compiled['link_list[title]'] = 'All Pages';
							var compiledParam = $.param(compiled);

							var l = {"link_list":{"handle":"all-pages","title":"All Pages","links":[]}};

							for (var i = 0, len = d.pages.length; i < len; ++i) {

								l.link_list.links.push({
									'position':i+1,
									'title': d.pages[i].title,
									'link_type':'page',
									'subject_id':d.pages[i].id
								})

								var compiledLink = {};
								compiledLink['link_list[links][][position]'] = i+1;
								compiledLink['link_list[links][][title]'] = d.pages[i].title;
								compiledLink['link_list[links][][link_type]'] = 'page';
								compiledLink['link_list[links][][subject_id]'] = d.pages[i].id;
								compiledParam +='&' + $.param(compiledLink);

							}

							/* create_a_linklist(l); */
							create_a_linklist_FIX(compiledParam);

						},
						error:function(){
							_.notice('Error! Are you sure you have access to pages?',true);
						}
					});

					return false;
				},
				create_vendors_linklist = function(){

					$.ajax({
						type: "GET",
						url: '/admin/products/vendors.json',
						dataType: "json",
						success: function(d){

							var compiled = {};
							compiled['utf8'] = '✓';
							compiled['link_list[handle]'] = 'all-vendors';
							compiled['link_list[title]'] = 'All Vendors';
							var compiledParam = $.param(compiled);

							var l = {
								utf8:'✓',
								_method:'create',
								link_list:{
									handle:"all-vendors",
									title:"All Vendors",
									links:[]
								}
							};

							for (var i = 0, len = d.vendors.length; i < len; ++i) {

								var link = {
									position:i+1,
									title: d.vendors[i],
									link_type:'http',
									subject:'/collections/vendors?q='+(encodeURIComponent(d.vendors[i].toLowerCase()).replace(/%20/g, '+'))
								};

								var compiledLink = {};
								compiledLink['link_list[links][][position]'] = i+1;
								compiledLink['link_list[links][][title]'] = d.vendors[i];
								compiledLink['link_list[links][][link_type]'] = 'http';
								compiledLink['link_list[links][][subject]'] = '/collections/vendors?q='+(encodeURIComponent(d.vendors[i].toLowerCase()).replace(/%20/g, '+'));
								compiledParam +='&' + $.param(compiledLink);

								l.link_list.links.push(link);


							}

							/* create_a_linklist(l); */
							create_a_linklist_FIX(compiledParam);

						}	
					});

				},
				create_a_linklist_FIX = function(linklist){

					if(typeof linklist === 'undefined'){return}

					$.ajax({
						type: "POST",
						url: '/admin/link_lists',
						data:linklist,
						success: function(d,o,h){

							var loc = h.getResponseHeader('X-XHR-Redirected-To'); /* this is not always sent */
							if(loc){

								linklistID = loc.split('/').pop();

								if(!isNaN(linklistID)){
									_.notice('Link list added');
									_.redirect('/admin/link_lists/'+linklistID);
								}else{
									_.notice('Error creating linklist - ID not returned',true);
								}
							}else{
								/* if the redirected header is not present we will need to parse the returned html for clues */
								var form = $(d).find('form').eq(0);
								linklistID = form.attr('action').split('/').pop();
								if(!isNaN(linklistID)){
									_.notice('Link list added');
									_.redirect('/admin/link_lists/'+linklistID);
								}
								
							}

						},
						error:function(){
							_.notice('Error creating linklist',true);
						}
					});

				},
				create_a_linklist = function(linklist){

					$.ajax({
						type: "POST",
						url: '/admin/link_lists.json',
						data:JSON.stringify(linklist),
						contentType: "application/json;charset=utf-8", 
						success: function(d){
							_.notice('Link list added');
							_.redirect('/admin/link_lists/'+d.link_list.id);
						},
						error:function(a){
							if(a.status === 406){
								_.notice('Linklist creation attempted. Reload page.');
								_.redirect('/admin/links');
							}else{
								_.notice('Error creating linklist',true);	
							}
							
						}
					});

				},
				a = $('<a/>',{
					'href':'#',
					'class':'tooltip-bottom tooltip',
					'style':'margin-right:1.5em'
				}).html('<span class="tooltip-container"><span class="tooltip-label">Make a copy of this linklist</span></span>Copy').on('click',function(e){
					e.preventDefault();
					var t = $(this),
						a = t.parent().find('a[href^="/admin/link_lists"]').eq(0);

						if(a.length){
							t.addClass('btn is-loading no-btn');
							href = a.attr('href').split('/').pop();

							/* prepare for html loading and parse */
							if(!isNaN(href)){
							$.ajax({
								type: "GET",
								url: '/admin/link_lists/'+href,
								success: function(d){

									var html = $(d);
									var targetString = '#edit_link_list_'+href;
									var target = html.find(targetString);

									if(target.length){

										/* remove the extra inputs we don't want */
										target.find('input[name="_method"]').remove();
										target.find('input[name="authenticity_token"]').remove();

										/* mark as a copy */
										var title = target.find('input[name="link_list[title]"]');
										title.val(title.val()+' [COPY]');
										
										/* find the type select dropdown */
										var types = target.find('select[name="link_list[links][][link_type]"]');

										/* this is a real dirty way of injecting data */
										types.each(function(index){
											var t = $(this);
											var v = t.val();
											if(v==='collection'){

												var selectTarget = target.find('div[context="collectionPicker'+index+'"]').eq(0);
												var collectionDef =  selectTarget.attr('define').split(',');

												if(typeof collectionDef[2] !== 'undefined'){
													var subjectID = parseInt(collectionDef[2].replace(/\D/g,''));
													selectTarget.after('<input name="link_list[links][][subject_id]" value="'+subjectID+'" />');
												}

											}else if(v==='page'){

												var selectTarget = target.find('div[context="pagePicker'+index+'"]').eq(0);
												var pageDef =  selectTarget.attr('define').split(',');

												if(typeof pageDef[2] !== 'undefined'){
													var subjectID = parseInt(pageDef[2].replace(/\D/g,''));
													selectTarget.after('<input name="link_list[links][][subject_id]" value="'+subjectID+'" />');
												}

											}else if(v==='product'){

												var selectTarget = target.find('div[context="productPicker'+index+'"]').eq(0);
												var productDef =  selectTarget.attr('define').split(',');

												if(typeof productDef[2] !== 'undefined'){
													var subjectID = parseInt(productDef[2].replace(/\D/g,''));
													selectTarget.after('<input name="link_list[links][][subject_id]" value="'+subjectID+'" />');
												}
												
											}
											
										});
										
										create_a_linklist_FIX(target.serialize());

									}


								},
								error:function(s,b,e){
									t.removeClass('btn is-loading no-btn');
									_.notice(e,true);
								}
							});
							}

						}else{
							_.notice('Can not copy this linklist. ID was not found',true);
						}
				});
	
				var deleteBtn = $('<a />',{
					'href':'#',
					'class':'tooltip-bottom tooltip',
					'style':'margin-right:1.5em'
					}).html('<span class="tooltip-container"><span class="tooltip-label">Delete Linklist on click</span></span><i class="ico ico-14-svg ico-delete"></i>').on('click',function(e){

							e.preventDefault();
							var t = $(this);
							var a = t.parent().find('a[href^="/admin/link_lists"]').eq(0);

							if(a.length){
								t.addClass('btn is-loading no-btn');
								href = a.attr('href').split('/').pop();

								if(!isNaN(href)){

									var data = {
										'utf8':'✓',
										'_method':'delete'
									};

									$.ajax({
										type: "POST",
										url: '/admin/link_lists/'+href,
										data:data,
										success: function(d){
											t.removeClass('btn is-loading no-btn').closest('.next-grid__cell.next-grid__cell--half').addClass('disable').css({'opacity':'.2','pointer-events' : 'none'});
										}
									});
								}
							}

				});

				if(llf.length > 1){

					llf.prepend(deleteBtn, a);

					$.ajax({
					type: "GET",
					url: '/admin/link_lists.json',
					dataType: 'json',
					success: function(d){
						if(d){
							_.data('link_lists',d);
							link_lists = d.link_lists;
							llf.each(function(index){
								var t = $(this);
								t.parent().find('h3').append('<span class="fadein" style="color:#ccc;display: block;font-size: 11px;font-family: monospace;">'+d.link_lists[index].handle+'</span>');
							});
						}
					}
					});

				}else{
					llf.prepend(a);
				}
				
				var d = $('.section-summary').eq(0),
				a1 = $('<a/>',{
					'class':'btn tooltip-bottom tooltip fd-btn',
					style:'margin-bottom:.5em',
					href:'#'
				}).html('<span class="tooltip-container"><span class="tooltip-label">Create a linklist with every collection</span></span>Create Collections linklist').on('click',function(){
					$(this).addClass('is-loading disabled');
					create_collection_linklist();
					return false;
				}),
				a2 = $('<a/>',{
					'class':'btn tooltip-bottom tooltip fd-btn',
					style:'margin-bottom:.5em',
					href:'#'
				}).html('<span class="tooltip-container"><span class="tooltip-label">Create a linklist with every page</span></span>Create Pages linklist').on('click',function(){
					$(this).addClass('is-loading disabled');
					create_pages_linklist();
					return false;
				}),
				a3 = $('<a/>',{
					'class':'btn tooltip-bottom tooltip fd-btn',
					style:'margin-bottom:.5em',
					href:'#'
				}).html('<span class="tooltip-container"><span class="tooltip-label">Create a linklist with all vendors</span></span>Create Vendor linklist').on('click',function(){
					$(this).addClass('is-loading disabled');
					create_vendors_linklist();
					return false;
				});

				if(d.length){d.append('<br>',a1,'<br>',a2,'<br>',a3);}

				var addLinkListBtn = $('.section-summary a[href="/admin/link_lists/new"]');
				if(addLinkListBtn.length){

					var linklistEditButtons = $('#link_lists .next-grid__cell header a:last-child');
					if(linklistEditButtons.length){

						var optionAppend = '';

						if(linklistEditButtons.length > 2){

							linklistEditButtons.each(function(){

								var t = $(this);
								var linklistTitle = t.parent().parent().find('h3').text();
								var linklistHREF = t.attr('href');

								if(linklistTitle.length && linklistHREF.length){
									optionAppend+='<option value="'+ linklistHREF +'">'+linklistTitle+'</option>'
								}
								
							});

							if(optionAppend.length){
								var selectLinkList = $('<select />',{
									'style':'margin-top:1em;border-radius:3px;border-color: #D3D3D3;color: #479ccf;width: 100%'
								}).on('change',function(){

									var t = $(this);
									var v = t.val();

									if(v.length){
										_.redirect(v);
									}

								}).html('<option value="">Jump to linklist</option>'+optionAppend);

								var div = $('<div />');
								div.append(selectLinkList,'<small style="display: block;background: #fff;padding: .5em;">Select a linklist to quickly jump to edit view. Useful for when you have many linklists...</small>');
								addLinkListBtn.after(div);
							}

						}

					}

				}

		},
		setup_collections:function(){

			_.showSkuHeaderCount();
			_.data('collections',false);
			
			/* var targetHTML = $('.header-right').eq(0); */
			var targetHTML = $('.header .header__secondary-actions:first');
			if(!targetHTML.length){targetHTML = $('.header .header__secondary-actions:first');}
			if(!targetHTML.length){targetHTML = $('.header .header__primary-actions:first')}

			if(targetHTML.length){
				
				var u = $('<ul/>',{
						'class':'segmented'
						}),
						l = $('<li/>'),
						getCountBtn = $('<a/>',{
							'class':'btn fd-btn',
							style:'margin-left:.5em',
							href:'#'
						}).text('Show Product Count').on('click',function(e){
							e.preventDefault();
							$.ajax({
								type: "GET",url: '/admin/collections.json?limit=250',dataType: 'json',
								success: function(d){
								if(d.collections.length){
									_.data('collections',d);
									for (var i = d.collections.length - 1; i >= 0; i--) {
										var collectionTable = $('#collections-results'),
										collectionLink = collectionTable.find('a[href="/admin/collections/'+d.collections[i].id+'"]:last');
										if(collectionLink.find('span').length === 0){
											collectionLink.append('<span class="sku label">'+d.collections[i].products_count+'</span>');
										}
									};
								}
								}
							});
						}),
						a = $('<a/>',{
							'class':'btn fd-btn',
							'href':'#',
							'title':'Add tags to entire collection'
						}).html('Bulk edit tags').on('click',function(){
							_.fd_modal(true,bulk_tags,'Edit tags for all products in a collection',true);
							var fdmodal = $("#fdmodal"),
							a = fdmodal.find('select[data-action="action"]'),
							b = fdmodal.find('a').eq(1),
							c = fdmodal.find('select[data-action="collection"]'),
							t = fdmodal.find('input').eq(0);

							a.change(function(event) {
								"purge"==a.val()||"set"==a.val()?("purge"==a.val()&&t.val("").attr("disabled","disabled"),b.addClass("delete")):(t.removeAttr("disabled"),b.removeClass("delete"));
							});

							var set_tags = function(_d,i,t,callback){
								/* Overwrite the existing tags */
								var id = _d.products[i].id,
								data = {
									"product": {
									"id": id,
									"tags": t
									}
								};

								b.text(i+1+'/'+_d.products.length);

								$.ajax({
								type: "PUT",
								url: '/admin/products/'+id+'.json',
								data: data,
								dataType: 'json',
								success: function(d){
									++i;
									if(i<_d.products.length){
										set_tags(_d,i,t,callback)
									}else{
										if(typeof callback === 'function'){
											callback();
										}
									}
								}
								});
							}

							var delete_tags = function(_d,i,t,callback){

								if(_d.products[i].tags){

									var a1 = t.replace(/, /g, ',').split(','),
										a2 = _d.products[i].tags.replace(/, /g, ',').split(','),
										a3 = $(a2).not(a1).get() + '',
										id = _d.products[i].id,
										data = {
											"product": {
											"id": id,
											"tags": a3
											}
										};

									b.text(i+1+'/'+_d.products.length);

									$.ajax({
										type: "PUT",
										url: '/admin/products/'+id+'.json',
										data: data,
										dataType: 'json',
										success: function(d){
											++i;
											if(i<_d.products.length){
												delete_tags(_d,i,t,callback)
											}else{
												if(typeof callback === 'function'){
													callback();
												}
											}
										}
									});

								}else{

									++i;
									if(i<_d.products.length){
										delete_tags(_d,i,t,callback)
									}else{
										if(typeof callback === 'function'){
											callback();
										}
									}

								}

							}

							var put_tags = function(_d,i,t,callback){

								var a1 = t.replace(/, /g, ',').split(','),
									a2 = _d.products[i].tags.split(','),
									a3 = _.array_unique(a1.concat(a2))+'',
									id = _d.products[i].id,
									data = {
										"product": {
										"id": id,
										"tags": a3
										}
									};

									b.text(i+1+'/'+_d.products.length);

								$.ajax({
									type: "PUT",
									url: '/admin/products/'+id+'.json',
									data: data,
									dataType: 'json',
									success: function(d){
										++i;
										if(i<_d.products.length){
											put_tags(_d,i,t,callback)
										}else{
											callback();
										}
									}
								});

							}

							b.on('click',function(){

							if(c.val().length){

								if(a.val()==='add' && t.val().length){

									$.ajax({
									type: "GET",
									url: '/admin/products.json?collection_id='+c.val()+'&fields=id,tags',
									dataType: 'json',
									success: function(d){
										b.addClass('disabled');	
										put_tags(d,0,t.val(),function(){
											_.notice('Done. Tags have been added');
											b.text('Update tags').removeClass('disabled');
										});
									}
									});
								}


								if(a.val()==='purge' || a.val()==='set'){

									$.ajax({
									type: "GET",
									url: '/admin/products.json?collection_id='+c.val()+'&fields=id',
									dataType: 'json',
									success: function(d){
										b.addClass('disabled');	
										set_tags(d,0,t.val(),function(){
											_.notice('Done.');
											b.text('Update tags').removeClass('disabled');
										});
									}
									});
								}

								if(a.val()==='remove'){

									$.ajax({
									type: "GET",
									url: '/admin/products.json?collection_id='+c.val()+'&fields=id,tags',
									dataType: 'json',
									success: function(d){
										b.addClass('disabled');	
										delete_tags(d,0,t.val(),function(){
											_.notice('Matched tags have been removed.');
											b.text('Update tags').removeClass('disabled');
										});
									}
									});
								}

							}else{ _.notice('Choose a collection',true); }

								return false;

							});

							a.hide();

							$.ajax({
								type: "GET",url: '/admin/collections.json?limit=250',dataType: 'json',
								success: function(d){
									if(d.collections.length){
										_.data('collections',d);
										var toappend='';

										for (var i = 0, len = d.collections.length; i < len; i++) {
											toappend+='<option value="'+d.collections[i].id+'">'+d.collections[i].title+'</option>';
										}

										c.append(toappend).find('option:eq(0)').text('Select a collection');
										a.show();
									}
								}
							});

							return false;
						});

				l.append(a,getCountBtn);
				u.append(l);
				targetHTML.prepend(u);

			}else{
				_.notice('ShopifyFD error : setup_collections : target html not found');
			}
		},
		setup_copypaste:function(){

			/*
			          _                                                       _
			 ___  ___| |_ _   _ _ __     ___ ___  _ __  _   _ _ __   __ _ ___| |_ ___
			/ __|/ _ \ __| | | | '_ \   / __/ _ \| '_ \| | | | '_ \ / _` / __| __/ _ \
			\__ \  __/ |_| |_| | |_) | | (_| (_) | |_) | |_| | |_) | (_| \__ \ ||  __/
			|___/\___|\__|\__,_| .__/   \___\___/| .__/ \__, | .__/ \__,_|___/\__\___|
			                   |_|               |_|    |___/|_|

			Save a metafield to local storage. 

			*/
			if(_.supportsHTML5Storage()){

				var a = $(metafield_copybox),
				p = a.find('#fd_pastemetafields'),
				q = a.find('#fd_whatmetafields');

				a.find('#fd_copymetafields').on('click',function(e){
					e.preventDefault();
					if('undefined' !== typeof _.data('m')){
						if(_.data('m').length > 0){
							localStorage["metafieldCopy"] = JSON.stringify(_.data('m'));
							_.notice(_.data('m').length + " Metafields copied");
							p.show();
							q.show();
						}else{
							_.notice('No metafields to copy',true);
						}

					}else{
						p.hide();
						q.hide();
					}
				});

				q.on('click',function(){

					if('undefined' !== typeof localStorage["metafieldCopy"]){

						var h = '';
						try {
							m = JSON.parse(localStorage["metafieldCopy"]);
						} catch (e) {
							m = false;
						}
						
						if(m){
							for (var i = 0, len = m.length; i < len; i++) {
								var metafieldValue = _.stripHTML(m[i].value);
								h+= '<p><strong>'+m[i].namespace+'.'+m[i].key+' ('+m[i].value_type+')</strong><br>'+metafieldValue+'</p><hr>';
							}
							_.fd_modal(true,h,'In the virtual clipboard...');
						}else{
							_.notice('Error reading virtual clipboard. Empty?',true);
						}
						

					}

					return false;
				});

				p.on('click',function(e){

					e.preventDefault();
					
					if('undefined' !== typeof localStorage["metafieldCopy"]){
						var copyData = JSON.parse(localStorage["metafieldCopy"]);
						if(copyData.length){
							_.data('m-copy',copyData);
							_.save_metafield_queue(_.data('m-copy'),0);
						}else{
							_.notice('Nothing to paste',true);
						}
					}else{
						_.notice('Nothing to paste',true);
					}		

				});

				if('undefined' === typeof localStorage["metafieldCopy"]){
					p.hide();
					q.hide();
				}

				$('div.sub_section-summary').append(a);
			}

		},
		save_metafield_queue:function(q,i){

			/*
			                                      _         __ _      _     _
			 ___  __ ___   _____   _ __ ___   ___| |_ __ _ / _(_) ___| | __| |   __ _ _   _  ___ _   _  ___
			/ __|/ _` \ \ / / _ \ | '_ ` _ \ / _ \ __/ _` | |_| |/ _ \ |/ _` |  / _` | | | |/ _ \ | | |/ _ \
			\__ \ (_| |\ V /  __/ | | | | | |  __/ || (_| |  _| |  __/ | (_| | | (_| | |_| |  __/ |_| |  __/
			|___/\__,_| \_/ \___| |_| |_| |_|\___|\__\__,_|_| |_|\___|_|\__,_|  \__, |\__,_|\___|\__,_|\___|
			                                                                       |_|

			*/

			if(typeof q !== 'undefined' && typeof i !== 'undefined'){

				_.notice('Please wait whilst we paste the metafields');

				var metaJSON = {
					"metafield": {
						"namespace": q[i].namespace,
						"key": q[i].key,
						"value": q[i].value,
						"value_type": q[i].value_type
					}
				};

				/* POST the metafield */
				$.ajax({
					type: "POST",
					url: d.URL+'/metafields.json',
					dataType: 'json',
					data: metaJSON,
					success: function(d){
						if(i+1 < q.length){
							_.save_metafield_queue(q,++i);
						}else{
							 _.updatedropdown();
							_.notice("All metafields pasted!");
						}
					}
				});		
			}

		},
		deleteProductImages:function(id,callback){
			if(typeof id === 'undefined'){ return }
			if(isNaN(id)){ return }
			$.ajax({
				type: "PUT",
				url: '/admin/products/'+ id +'.json',
				dataType: 'json',
				data: {'product': {'id': id,'images': ['']}},
				success: function(d){
					$('#product-images').parent().remove();
					_.notice('Images deleted. Reload product to check...');
				}
			});	

		},
		setup_products:function(){

			/*
			          _                                     _            _
			 ___  ___| |_ _   _ _ __    _ __  _ __ ___   __| |_   _  ___| |_ ___
			/ __|/ _ \ __| | | | '_ \  | '_ \| '__/ _ \ / _` | | | |/ __| __/ __|
			\__ \  __/ |_| |_| | |_) | | |_) | | | (_) | (_| | |_| | (__| |_\__ \
			|___/\___|\__|\__,_| .__/  | .__/|_|  \___/ \__,_|\__,_|\___|\__|___/
			                   |_|     |_|

			*/

			clearInterval(_.data('autosave'));
			
			var targetHTML = $('.next-layout__sidebar').eq(0); /*.section.description .section-summary*/
			if(!targetHTML.length){targetHTML = $('.next-grid__cell--third:first')}
			
			if(targetHTML.length){
				targetHTML.prepend(metafieldloader);
				var loadinto = $('div.metafield-content');
				_.loadmeta(loadinto,v);
			}else{
				_.notice('ShopifyFD error : setup_products : Metafield target HTML not found',true);
			}
			
			/* PRODUCT SWITCHER */
			var targetHTMLRightMenu = $('.header-row .header-right');
			if(!targetHTMLRightMenu.length){targetHTMLRightMenu = $('.header .header__secondary-actions:first');}
			if(!targetHTMLRightMenu.length){targetHTMLRightMenu = $('.header .header__primary-actions:first')}

			if(targetHTMLRightMenu.length){
				$.ajax({
					type: "GET",
					url: '/admin/products.json?limit=250&fields=id,title',
					dataType: 'json',
					success: function(d){
						if(d){
							products = d.products;
							var response = '',
							len = products.length;
							if(len<=250){
								for (var i = 0; i < len; i++) {
									if(_.data('omega') !== products[i].id.toString()){
										response +='<option value="'+products[i].id+'">'+products[i].title+'</option>';
									}
								}
								var pselect = $('<select />',{
									'class':'header-select fadein'
								}).append('<option>Choose another product to edit</option>',response).change(function(){
									var v = $(this).val();
									if(v){ _.redirect('/admin/products/'+v); }
								});
								pselect.find('option').sort(_.selectSort).appendTo(pselect);
								targetHTMLRightMenu.prepend(pselect);
							}
						}
						
					},
					error:function(d){
						_.notice('Error loading linklist data',true);
					}
				});
			}else{
				_.notice('ShopifyFD error : setup_products : Product switcher target HTML not found',true);
			}

			/* FAST REMOVE FROM COLLECTIONS */
			var collectionPanel = $('#js-collections');
			if(collectionPanel.length){
				var collectionRemoveButtons = collectionPanel.find('.list-of-added-collections a');
				if(collectionRemoveButtons.length){
					var removeFromAll = $('<a />',{
						'class':'btn fd-btn delete'
					}).text('Remove from all').on('click',function(e){
						e.preventDefault();
						collectionRemoveButtons.trigger('click');
					})
					collectionPanel.append(removeFromAll);
				}
			}

			/* ADD SITEMAP BUTTON */
			var sectionVisibility = $('.next-card.visibility .next-card__section:first');
			if(sectionVisibility.length){
				var seoHiddenBtn = $('<a />',{
					'class':'btn fd-btn'
				}).text('Hide from Sitemap').on('click',function(e){
					e.preventDefault();
					var metaJSON = {
						"metafield": {
							'namespace': 'seo',
							'key': 'hidden',
							'value': 1,
							'value_type': 'integer'
						}
					};

					/* POST the metafield */
					$.ajax({
						type: "POST",
						url: d.URL+'/metafields.json',
						dataType: 'json',
						data: metaJSON,
						success: function(d){
							 _.updatedropdown();
							_.notice("SEO hidden metafield added!");
						},
						error:function(){
							_.notice("Failed to save metafield",true);

						}
					});	

				});
				sectionVisibility.append('<p style="margin:1em 0">Add metafield to remove this product from the sitemap. It is <b>very</b> important that you <a href="http://docs.shopify.com/api/unlinked/hide-from-search-engines-and-sitemaps" target="_blank">understand</a> what doing this means. If you don\'t, leave it alone.</p>',seoHiddenBtn);
			}


			/* RTE ADD ON BUTTONS */
			if ($('#rte_extra').length === 0){

				$('#product-description_iframecontainer').eq(0).after(rte_menu_html);
				$('.rtetools-buttons ul.segmented:last').append(autosave_html);

				_.setup_rte();

				$('#autosave').on('click',function(){

					var t = $(this),
					rte_save_btn = false;

					if(t.hasClass('rte-command-active')){

						_.notice("Autosave disabled");
						clearInterval(_.data('autosave'));

					}else{

						rte_save_btn = $('#products-show header input[type="submit"]');
						_.notice("Autosave enabled");
						_.data('autosave',setInterval(function(){
							if(rte_save_btn.length){
								rte_save_btn.click();
							}else{
								clearInterval(_.data('autosave'));
								rte_save_btn = null;
								_.notice("Autosave disabled");
							}
						},30000));

					}

					/* toggle class - not the nicest method */
					$(this).toggleClass('rte-command-active');

					return false;
				});

			}

			_.btn_removealltags('product');

			/* images */

			var imageSection = $('div.next-card.images');
			if(imageSection.length){
				var removeImagesBtn = $('<a />',{
					'class':'btn fd-btn delete tooltip tooltip-bottom'
				}).html('Remove all images<span class="tooltip-container"><span class="tooltip-label">Instant, and no undo</span></span>').on('click',function(e){
					e.preventDefault();
					var t = $(this);
					var id = d.URL.split('/').pop();
					_.deleteProductImages(id);
				});
				
				var removeImagesCell = $('<div class="next-grid__cell next-grid__cell--no-flex"></div>');
				removeImagesCell.append(removeImagesBtn);
				$('.next-card.images header .next-grid__cell:last').after(removeImagesCell);

			}else{
				_.notice('Unable to find image section',true);
			}


			/*var page_title = $('h1.header-main'),*/
			
			/*
			if(page_title.length){
				if(typeof productViewLink !== 'undefined'){
					var viewInStore = $('<a />',{
						href:productViewLink,
						target:'_blank',
						style:'display: inline-block;vertical-align: top;',
						title:'View in Store'
					});

					viewInStore.append('<i class="next-icon next-icon--20 next-icon--header next-icon--website-slate-lightest"></i>');
					page_title.append(viewInStore);
				}

			}
			*/

			var variants_ids = {};

			/* INVENTORY AND VARIANTS PANEL */
			/*var inventorySummary = $('.section.inventory .section-summary').eq(0);*/
			var inventorySummary = $('#product-outer-variants');
			if(inventorySummary.length){

				var addVariantButton = inventorySummary.find('a.btn');
				var bulkPriceEdit = $('<div />',{
					'class':'next-card__section fadein hidden',
					'style':'background: #F5F6F7;'
				});
				var toggleBulkPriceEdit = $('<a />',{
					'class':'btn fd-btn btn-slim',
					'style':'margin-left:1em;margin-top: -3px;'
				}).text('Bulk Edits');

				toggleBulkPriceEdit.on('click',function(e){
					e.preventDefault();
					bulkPriceEdit.toggleClass('hidden');
				});

				bulkPriceEdit.html('<h2>Edit all variants</h2><p style="margin: .5em 0 1em;font-size: 12px;border-bottom: 1px solid #ccc;padding-bottom: .5em;">Bulk Editing comes with risks. Proceed with caution.</p><label style="margin-top:1.5em">Set Compare at Price<br><small>0 will clear the compare at price</small></label><input type="number" style="width:50%" value="0"> <a class="bulk-compare-save tooltip tooltip-bottom btn fd-btn"><span class="tooltip-container"><span class="tooltip-label">Save Compare at Price for all variants</span></span>Save</a>');
				bulkCompareSaveBtn = bulkPriceEdit.find('a.bulk-compare-save');
				bulkCompareFields = bulkPriceEdit.find('input');
				bulkCompareSaveBtn.on('click',function(e){
					e.preventDefault();

					var t = $(this);
					t.addClass('is-loading').attr('style','margin-left:1em;text-indent: -9999px;');
					var isDone = function(){
						t.removeClass('is-loading').attr('style','margin-left:1em');
					};

					var comparePrice = bulkCompareFields.val();
					if(isNaN(comparePrice) || comparePrice === '0' || comparePrice === ''){comparePrice = null;}



					if(comparePrice || comparePrice === null){
						if(typeof variants_ids ==='object'){
							if(Object.keys(variants_ids).length > 1){
								if(Object.keys(variants_ids).length === $('tr.variant').length){ /* sanity check */
									var data = [];
									for (var key in variants_ids) {
										var obj = variants_ids[key];
										for (var prop in obj) {
											if(obj.hasOwnProperty(prop)){
												var o = {
													"variant": {
														id: obj[prop],
														compare_at_price: comparePrice
													}
												}
												data.push(o);

											}
										}
									}
									if(data.length){
										_.updateVariant(data,0,isDone);
									}
								}else{
									_.notice('Unexpected variant found.',true);
								}
							}else{
								_.notice('You only have 1 variant. No need to bulk edit',true);
							}
						}
					}

				});

				inventorySummary.prepend(bulkPriceEdit);

			}else{
				_.notice('ShopifyFD error : setup_products : Inventory target HTML not found',true);
			}

			/* PUSH VARIANT ID AND METAFIELD ACTIONS */
			var variantCellTarget = $('#product-inner-variants th:last-child');
			if(variantCellTarget.length){
				$('#product-inner-variants th:last-child').before('<th class="variants-table__heading--indent-right tr">Variant ID</th>');

				var inventoryTH = $('th.tc:first');
				if(inventoryTH.length){
					if (inventoryTH.text() === 'Inventory'){
						inventoryTH.text('#').prop('title', 'Quantity');
					}
				}
				
				var variantRows = $('tr.variant');
				variantRows.each(function(i){

					var variantEditBtn = variantRows.eq(i).find('td:last a:first');
					var variant_id = variantEditBtn.prop('href').split('/').pop();
					var variantEditMetafieldBtn = $('<a />',{
						'class':'edit-variant-metafield btn btn-slim next-field--connected next-field--connected--no-flex tooltip tooltip-bottom',
						'data-val':variant_id
					}).html('<span><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="12" height="12" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"><path fill="#21C2A8" d="M0 0v12h12V0H0zM11 11H1V1h10V11zM5 9h2V7h2V5H7V3H5v2H3v2h2V9z"></path></svg></span><span class="tooltip-container"><span class="tooltip-label">Click to edit Metafields</span></span>');

					variants_ids['variant_'+i] = {'id':variant_id};
					variantEditBtn.after(variantEditMetafieldBtn);

					var beforeHTML = '<td class="vid new-variants-table__cell"><input class="mock-edit-on-hover tr" data-action="selectall" data-val="'+variant_id+'" type="text" value="'+variant_id+'" /></td>';
					$(this).find('td:last-child').before(beforeHTML);

				}).promise().done(function(){
					_.panel_editvariantmeta();
				});
			}


			/*var tpc = $('table.product-collections').eq(0);*/
			/* var tpc = $('ul.list-of-added-collections'); */
			var tpc = $('ul.product-collections-list');
			if(tpc.length){
				tpc.find('li').each(function(){
					var t = $(this);
					var collectionID = t.find('a').eq(0).attr('href').split('/').pop();
					var a=$('<a/>',{
						'class':'tooltip tooltip-bottom',
						'href':'#'
					}).html('<span class="next-icon next-icon--16 next-icon--sidebar next-icon--sidebar-collections"></span><span class="tooltip-container"><span class="tooltip-label">Set a metafield with this collection handle</span></span>').on('click',function(e){
						e.preventDefault();
						if(collectionID !== 'undefined'){
							$.ajax({
								type: "GET",
								url: '/admin/collections/'+collectionID+'.json?fields=handle',
								dataType: 'json',
								success: function(data){
									if (typeof data !== 'undefined' && typeof d.URL !== 'undefined'){
										var collectionHandle = data.collection.handle;
										$.ajax({
											type: "POST",
											url: d.URL+'/metafields.json',
											dataType: 'json',
											data: {
												"metafield": {
													"namespace": 'collection',
													"key": 'preferred',
													"value": collectionHandle,
													"value_type": "string"
												}
											},
											success: function(d){
												_.updatedropdown();
												_.notice('Preferred collection metafield saved');
											},
											error: function(d){
												var err = JSON.parse(d.responseText);
												_.notice(err.errors.value[0],true);
											}
										});	
									}
								},
								error: function(){
									_.notice('Failed to load collection',true);
								}
							});
						}
					});

					/*t.find('span.list-collections__name-wrapper').prepend(a);*/
					t.find('div.next-grid:first').prepend(a);


				});
			}else{
				_.notice('ShopifyFD error : setup_products : Unexpected collection table HTML',true);
				if($('.section-summary').length){
					_.fd_modal(true,'This version of ShopifyFD is not compatible with the older product page layout. There is a legacy version available that can help. <a href="http://freakdesign.com.au/blogs/news/17721025" target="_blank">More info</a>.','Legacy page detected',true);
				}
			}


			/* add in buttons for additional bulk variant updates */
			var bulkpanel = $('div.bulk-actions').eq(0);

			if(bulkpanel.length){

				var a=$('<a/>',{
					'href':'#',
					'class':'btn fd-btn hidden',
					'style':'padding-left:.5em'
				}).text('Edit selected weights').on('click',function(){

					_.fd_modal(true,'<label>New weight (grams)</label><input class="half" min="0" type="number" data-action="update-variant-weight" /><a data-action="update-variant-weight" href="#" class="btn btn-slim">Save</a><br><br><small>Note: You may need to reload this page before Shopify will show the new weight in the dashboard.</small>','Edit weight',true);

					var a = $('a[data-action="update-variant-weight"]'),
					w = $('input[data-action="update-variant-weight"]');

					if(a.length && w.length){

						a.on('click',function(){
							
							var checked = $('tr.variant input[type="checkbox"]:checked');

							if(checked.length && !isNaN(w.val())){

								var v = [];

								checked.each(function(){
									var t = $(this);
									var id = t.val();
									if(!isNaN(id)){v.push(parseInt(id))}
								});

								var update_weight = function(i,v){
									$.ajax({
										type: "PUT",
										url: '/admin/variants/'+v[i],
										dataType: 'json',
										data: {
											"variant": {
											"id": v[0],
											"grams": w.val()
											}
										},
										success: function(d){
											++i;
											if(i<v.length){
												update_weight(i,v);
											}else{
												_.notice('Weight updated');
												a.removeClass('is-loading').text('Save');
											}	
										
										}
									});
								};

								a.addClass('is-loading').text('');
								update_weight(0,v);

							}else{
								_.notice('Did you set a weight?',true);
							}
							return !1;

						});

					}

					return !1;

				}),
				b=$('<span/>',{
					'class':'hidden'
				});

				bulkpanel.append(a);

				/* check to see if we need to show our buttons */
				$('tr.variant input[type="checkbox"]').on('change',function(){
					var l = $('tr.variant input[type="checkbox"]:checked').length;

					if(l > 1){
						a.removeClass("hidden");
					}else{
						a.addClass("hidden");
					}

				});

			}

			if(inventorySummary.length){
				if(typeof variants_ids ==='object'){
					if(Object.keys(variants_ids).length > 1){
						inventorySummary.find('header a.btn--plain:last').after(toggleBulkPriceEdit)
					}
				}
			}
							
		},
		setup_pages:function(){

			/*

			 ____       _
			/ ___|  ___| |_ _   _ _ __    _ __   __ _  __ _  ___  ___
			\___ \ / _ \ __| | | | '_ \  | '_ \ / _` |/ _` |/ _ \/ __|
			 ___) |  __/ |_| |_| | |_) | | |_) | (_| | (_| |  __/\__ \
			|____/ \___|\__|\__,_| .__/  | .__/ \__,_|\__, |\___||___/
			                     |_|     |_|          |___/

			Get the page view all setup

			*/
			var targetHTML = $('.section.description .section-summary').eq(0);

			if(targetHTML.length){
				var previewButton = targetHTML.find('a').eq(0).clone(true);
				var itemViewLink = previewButton.attr('href');	
				targetHTML.after(metafieldloader).remove();

				var loadinto = $('div.metafield-content');
				_.loadmeta(loadinto,v);
			}else{
				_.notice('ShopifyFD error : setup_pages : Metafield target HTML not found',true);
			}

			var page_title = $('h1.header-main');
			if(page_title.length){
				if(typeof itemViewLink !== 'undefined'){
					var viewInStore = $('<a />',{
						href:itemViewLink,
						target:'_blank',
						style:'display: inline-block;vertical-align: top;',
						title:'View in Store'
					});

					viewInStore.append('<i class="next-icon next-icon--20 next-icon--header next-icon--website-slate-lightest"></i>');
					page_title.append(viewInStore);
				}else{
					page_title.append(previewButton); 
				}
			}

			/* RTE ADD ON BUTTONS */
			if ($('#rte_extra').length === 0){
				$('#page-content_iframecontainer').eq(0).after(rte_menu_html);
				_.setup_rte();
			}
			
			/* PAGE SWITCHER */
			var targetHTMLRightMenu = $('.header-row .header-right');
			if(!targetHTMLRightMenu.length){targetHTMLRightMenu = $('.header .header__secondary-actions:first');}
			if(!targetHTMLRightMenu.length){targetHTMLRightMenu = $('.header .header__primary-actions:first')}

			if(targetHTMLRightMenu.length){
				$.ajax({
					type: "GET",
					url: '/admin/pages.json?limit=250&fields=id,title',
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
							var pageSelect = $('<select />',{
								id:'shopifyjs_llselect',
								'class':'header-select fadein'
							}).append('<option>Choose another page to edit</option>',response).change(function(){
								var v = $(this).val();
								if(v){
									 _.redirect('/admin/pages/'+v);
								}
							});
							pageSelect.find('option').sort(_.selectSort).appendTo(pageSelect);
							targetHTMLRightMenu.prepend(pageSelect);

						}
						
					},
					error:function(d){
						_.notice('Error loading page data',true);
					}
				});
			}else{
				_.notice('ShopifyFD error : setup_pages : Page switcher target HTML not found',true);
			}

		},
		shipping_remove_all:function(i,c){

			/*

			 ____                                     _     _             _
			|  _ \ ___ _ __ ___   _____   _____   ___| |__ (_)_ __  _ __ (_)_ __   __ _
			| |_) / _ \ '_ ` _ \ / _ \ \ / / _ \ / __| '_ \| | '_ \| '_ \| | '_ \ / _` |
			|  _ <  __/ | | | | | (_) \ V /  __/ \__ \ | | | | |_) | |_) | | | | | (_| |
			|_| \_\___|_| |_| |_|\___/ \_/ \___| |___/_| |_|_| .__/| .__/|_|_| |_|\__, |
			                                                 |_|   |_|            |___/
			Remove all shipping entries

			*/

			if(i>=0){
				$.ajax({
					type: "DELETE",
					url: '/admin/countries/'+c[i].id+'.json',
					dataType: 'json',
					success: function(d){
						_.notice('removed '+c[i].name);
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
					}
					});
			}

		},
		save_new_rates_FIX:function(to_add,i,t){
			/*
			if this is not longer needed remember to change
			the save_new_rates function call back to the 
			original one...
			*/
			
			if('undefined' === typeof i){ return; }			
			if('undefined' === typeof to_add[i]){ return; }
			if('undefined' === typeof t){ return; }

			var cid = t.data('cid');
			var rate = to_add[i];
			var type = rate.type;

			if(type == 'weight'){
				rate.type = 'weight_based'
			}else if(type == 'price'){
				rate.type = 'price_based'
			}else if(type = 'carrier'){
				rate.type = 'carrier_based'
			}

			rate.country_id = cid; /* update to match the target country */
			rate.new_type = rate.type; /* NEW setting. Not sure what the use is... */

			/* be sure to include the utf8 var */
			var data = {
				utf8:'✓',
				shipping_rate:rate
			}

			_.notice('Pasting "'+rate.name +'"...');

			$.ajax({
				type: "POST",
				url: '/admin/shipping_rates',
				data: data,
				success: function(d, statusText, xhr){

					t.parent().parent().find('input.paste-checkbox').remove().end().removeClass('active-row').find('table').append('<tbody><tr style="background:#efefef"><td>'+to_add[i].name+'</td><td>New rate pasted.</td><td>'+to_add[i].price+'</td></tr></tbody>');

					if(i === (to_add.length-1)){
						_.notice('Paste complete');
					}else{
						i++;
						_.save_new_rates_FIX(to_add,i,t);
					}
				},
				error:function(d, statusText, xhr){
					_.notice('Error pasting. '+xhr, true);
				}
			});

		},
		save_new_rates:function(to_add,i,t){
			/*
			The endpoints in the dashboard have been removed.
			Use the slower but functional save_new_rate_FIX function for now.
			*/
			if('undefined' !== typeof to_add[i]){

				var d = to_add[i],
				o ={},
				type = d.type,
				path='';

				delete d.type; /* remove this */

				if('string' === typeof type){

					if(type === 'weight'){
						o = {weight_based_shipping_rate:{}};
						o.weight_based_shipping_rate = d;
						path='/admin/weight_based_shipping_rates.json';

					}else if(type === 'price'){
						o = {price_based_shipping_rate:{}}
						o.price_based_shipping_rate = d,
						path='/admin/price_based_shipping_rates.json';

					}else if (type === 'carrier'){
						o = {carrier_shipping_rate_provider:{}}
						o.carrier_shipping_rate_provider = d,
						path='/admin/carrier_shipping_rate_providers.json';
					}

					$.ajax({
						type: "POST",
						url: path,
						dataType: 'json',
						data: o,
						success: function(d){

							t.parent().parent().find('table').append('<tbody><tr style="background:#efefef"><td>'+to_add[i].name+'</td><td>New rate pasted.</td><td>'+to_add[i].price+'</td></tr></tbody>');

							if(i === (to_add.length-1)){
								_.notice('Paste complete');
							}else{
								i++;
								_.save_new_rates(to_add,i,t);
							}

						},
						error:function(){
							_.notice('Error pasting.', true);
						}
					});

				}else{
					_.notice('missing type: ' + type, true);
				}

			}else{
				_.notice('save_new_rates error - length',true);
			}
		},
		bulkPasteShippingQueue:function(checkedInputs,i){
			if(typeof checkedInputs === 'undefined'){ return }
			if(typeof i === 'undefined'){ var i = 0 }

			if(checkedInputs.length && i < checkedInputs.length){
				var t = checkedInputs.eq(i);
				t.parent().find('a.bulkpaste:first').click();
				setTimeout(function(){
					_.bulkPasteShippingQueue(checkedInputs,++i)
				},5000);
			}
		},
		setup_shipping:function(go){

			if('undefined' !== typeof go){

				/* TEMP ERROR WARNING */
				var sectionWarning = $('<div />',{'class':'box error animated fadein'}).html('Warning - The "Rates Copy and Paste" feature is experimental. Use with caution, and at your own risk.');
				$('div.header-row:first').after(sectionWarning);
				/* ================== */

				var shippingSettingsHeader = $('#settings-shipping header').eq(0);
				if(shippingSettingsHeader.length){

					var new_buttons = $('<div class="header-right animated fadein"><div class="header-action"><a class="btn fd-btn tooltip-bottom tooltip bulk-paste-btn hidden" href="#"><span class="tooltip-container"><span class="tooltip-label">Paste to selected countries</span></span>Bulk Paste</a> <a class="btn tooltip-bottom tooltip bulk-check-btn fd-btn hidden" href="#"><span class="tooltip-container"><span class="tooltip-label">Check all regions</span></span>Check All</a> <a class="btn fd-btn tooltip-bottom tooltip bulk-options" href="#"><span class="tooltip-container"><span class="tooltip-label">Show bulk delete options</span></span>Bulk Delete Options</a> <a class="btn fd-btn tooltip-bottom tooltip export-as-json" href="#"><span class="tooltip-container"><span class="tooltip-label">Export countries</span></span>Export JSON</a></div></div>');
					if(!$('.header__secondary-actions').length){
						new_buttons.addClass('header__secondary-actions');
					}
					new_buttons.find('a.export-as-json').on('click',function(e){
						e.preventDefault();
						_.fd_modal(true, '<textarea readonly style="min-height:300px">' + JSON.stringify( _.data('countries').countries ) + '</textarea><p><br><a href="/admin/countries.json" target="_blank">View original JSON object in new window</a></p>','Export all countries', true);
					});

					new_buttons.find('a.bulk-options').on('click',function(){

						var myhtml = $('<p class="box warning">This will delete ALL of your countries. There is no undo. Proceed at own risk!</p><div><div class="span1"><a href="#" class="btn delete_all delete">Delete</a></div><div class="span2">'+aargh_msg+'</div></div>');
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
									}
								},
								error:function(){
									_.notice('Error removing country. Process stopped.',true);
								}
							});

							return false;
						});

						_.fd_modal(true,myhtml,'Delete all countries',true);

						return false;
					});

					new_buttons.find('a.bulk-check-btn').on('click',function(e){
						e.preventDefault();
						$('input.paste-checkbox:not(.hidden)').prop('checked',true).change();
					});

					new_buttons.find('a.bulk-paste-btn').on('click',function(e){
						e.preventDefault();
						var checkedInputs = $('input.paste-checkbox:checked:not(.hidden)');
						_.bulkPasteShippingQueue(checkedInputs,0);
					});

					shippingSettingsHeader.append(new_buttons);

				}else{
					_.notice('ShopifyFD error : setup_shipping');
				}

				if($('div.shipping-rate-table').length === _.data('countries').countries.length){

					var shipping_rates = {
						weight_based_shipping_rates:[],
						price_based_shipping_rates:[],
						carrier_shipping_rate_providers:[]
					};

					var create_shipping_rate = function(c,to_add,t){

						if(to_add.length){

							var to_delete = [];

							$.ajax({
								type: "GET",
								url: '/admin/countries/'+c+'.json',
								dataType: 'json',
								success: function(d){

									/* 
										now that we have the delete list - let's delete
										we should queue them up, but let's try a mini burst 
										This could cause issues. Watch carefully.

									*/

									var w = d.country.weight_based_shipping_rates,
									p = d.country.price_based_shipping_rates,
									c = d.country.carrier_shipping_rate_providers;

									// build up the delete list

									for (var i = 0, len = w.length; i < len; i++) {
										to_delete.push([w[i].id,'weight_based']);
									}

									for (var i = 0, len = p.length; i < len; i++) {
										to_delete.push([p[i].id,'price_based']);
									}

									for (var i = 0, len = c.length; i < len; i++) {
										to_delete.push([c[i].id,'carrier_based']);
									}

									/*

									for (var i = 0, len = to_delete.length; i < len; i++) {

										var path = '';

										if(to_delete[i][1] === 'weight'){
											path='/admin/weight_based_shipping_rates/';
										}else if(to_delete[i][1] === 'price'){
											path='/admin/price_based_shipping_rates/';
										}else if(to_delete[i][1] === 'carrier'){
											path='/admin/carrier_shipping_rate_providers/';
										}

										$.ajax({
											type: "DELETE",
											url: path+to_delete[i][0]+'.json',
											dataType: 'json',
											success: function(d){},
											error: function(d){
												_.notice('Failed to replace rate',true);
											}
										});

									} 
									*/

									for (var i = 0, len = to_delete.length; i < len; i++) {

										var type = to_delete[i][1];

										$.ajax({
											type: "POST",
											url: '/admin/shipping_rates/'+to_delete[i][0],
											data:{
												utf8:'✓',
												_method:'delete',
												shipping_rate:{
													type:type
												}
											},
											success: function(d){},
											error: function(d){
												_.notice('Failed to replace rate',true);
											}
										});
									}

									_.save_new_rates_FIX(to_add,0,t);

								},
								fail:function(){
									_.notice('I failed to get the country.json',true);
								}
							}); /* end ajax */

						}else{
							_.notice('Missing items to add',true)
						}	
					}; /* end create_shipping_rate() */


					$('div.shipping-rate-table').each(function(index){

						var t=$(this);
						var copy = $('<a/>',{
							'href':'#',
							'data-country':_.data('countries').countries[index].name,
							'data-cid':_.data('countries').countries[index].id,
							'data-index':index,
							'class':'fadein btn fd-btn btn-slim copyrates tooltip tooltip-bottom',
							'style':'float:right;margin-right:.5em'
						}).html('<span class="tooltip-container"><span class="tooltip-label">Copy Rates to Memory</span></span>Copy').on('click',function(){

							var t=$(this),
								i = t.attr('data-index'),
								cname = t.attr('data-country'),
								cid = t.attr('data-cid');

							$('a.copyrates').removeClass('btn-primary');
							

							$.ajax({
								type: "GET",
								url: '/admin/countries/'+cid+'.json',
								dataType: 'json',
								success: function(d){
									shipping_rates.weight_based_shipping_rates = d.country.weight_based_shipping_rates;
									shipping_rates.price_based_shipping_rates = d.country.price_based_shipping_rates;
									shipping_rates.carrier_shipping_rate_providers = d.country.carrier_shipping_rate_providers;
									_.notice('Ready to paste '+cname+'.');

									/* lazy show all */
									$('a.bulkpaste, input.paste-checkbox').removeClass('hidden');
									t.addClass('btn-primary').parent().find('input.paste-checkbox').prop('checked', false).addClass('hidden');
									t.parent().find('a.bulkpaste').addClass('hidden');

									if($('input.paste-checkbox:checked').length === 0){
										$('a.bulk-check-btn').removeClass('hidden');
									}

								},
								error:function(){
									_.notice('Error copying rates',true);
								}
							});

							return false;
						});
						
						var pasteCheckbox = $('<input />',{
							'type':'checkbox',
							'style':'float:right',
							'class':'hidden paste-checkbox'
						}).change(function() {

							var t=$(this);
							if(this.checked) {
								t.parent().parent().addClass('active-row');
							}else{
								t.parent().parent().removeClass('active-row');
							}

							var inputCheckedLength = $('input.paste-checkbox:checked').length;

							if(inputCheckedLength === 0){
								$('a.bulk-check-btn').removeClass('hidden');
								$('a.bulk-paste-btn').addClass('hidden');
							}else{
								$('a.bulk-check-btn').addClass('hidden');
								$('a.bulk-paste-btn').removeClass('hidden');
							}
						});

						var paste = $('<a/>',{
							'href':'#',
							'data-country':_.data('countries').countries[index].name,
							'data-cid':_.data('countries').countries[index].id,
							'data-index':index,
							'class':'hidden fadein bulkpaste btn btn-slim fd-btn tooltip tooltip-bottom',
							'style':'float:right;margin-right:.5em'
						}).html('<span class="tooltip-container"><span class="tooltip-label">Will replace ALL existing rates.</span></span>Paste').on('click',function(){			
							var t=$(this),
							cid = t.attr('data-cid'),
							shipping_rates_copy = shipping_rates,
							weight = shipping_rates_copy.weight_based_shipping_rates,
							price = shipping_rates_copy.price_based_shipping_rates,
							carrier = shipping_rates_copy.carrier_shipping_rate_providers,
							to_add = [],
							count = 0;

							/* harsh, but may avoid conflicts */
							t.parent().parent().find('tbody').remove();
							/*t.parent().find('a.copyrates').remove();*/

							t.parent().find('a').addClass('hidden');

							for (var i = 0, len = weight.length; i < len; i++) {
								weight[i].country_id=cid;
								delete weight[i].id;
								weight[i].type = 'weight';

								/* add to add list */
								to_add[count] = weight[i];
								count++;
							}

							for (var i = 0, len = price.length; i < len; i++) {
								price[i].country_id=cid;
								delete price[i].id;
								price[i].type = 'price';

								/* add to add list */
								to_add[count] = price[i];
								count++;

							}

							for (var i = 0, len = carrier.length; i < len; i++) {
								carrier[i].country_id=cid;
								delete carrier[i].id;
								carrier[i].type = 'carrier';

								/* add to add list */
								to_add[count] = carrier[i];
								count++;

							}					

							/* We have the add list, let's do this */
							create_shipping_rate(cid,to_add,t);

							return false;

						}); /* end paste button */
					
						/* add the buttons */
						var appendAfter = t.find('a[bind-event-click="addShippingRateModal.show()"]');
						if(appendAfter.length){
							appendAfter.after(copy,paste,pasteCheckbox);
						}else{
							_.notice('Error. Unable to add copy button.',true);
							return false;
						}

					});

				}else{
					_.notice("Mismatch in country count. Reload this page.",true)
				}

			}else{

				_.notice('Loading current country list');

				$.ajax({
					type: "GET",
					url: '/admin/countries.json',
					dataType: 'json',
					success: function(d){
						if(d.countries.length){
							_.data('countries',d);
							_.notice(d.countries.length + " countries loaded");
							_.setup_shipping(true);
						}
					},
					error:function(){
						_.notice('Loading failed',true);
					}
				});
			}

		},
		setup_custom_collections:function(){

			var targetHTML = $('div.section.products').eq(0);

			var headerButtons = $('.header-row .header-right').eq(0);
			if(!headerButtons.length){headerButtons = $('.header .header__secondary-actions:first');}
			if(!headerButtons.length){headerButtons = $('.header .header__primary-actions:first')}

			if(targetHTML.length){

				targetHTML.after(metafieldloaderSection);

				var loadinto = $('div.metafield-content');
				_.loadmeta(loadinto,v);

				if ($('#rte_extra').length === 0){
					$('#collection-description_iframecontainer').eq(0).after(rte_menu_html);
					_.setup_rte();
				}

			}else{
				_.notice('ShopifyFD error : setup_custom_collections : target html not found',true);
			}

			if(headerButtons.length){
				var u = $('<ul/>',{
				'class':'segmented',
				'id':'copy-object'
				}),
				l = $('<li/>'),
				c = $('<a/>',{
					'class':'btn btn-separate',
					'href':'#'
				}).html('Duplicate').on('click',function(e){
					e.preventDefault();
					var t = $(this);
					t.addClass('disabled is-loading');

					$.getJSON(d.URL+'.json', function(data) {

						delete data.collection.disjunctive;
						delete data.collection.handle;
						delete data.collection.id;
						delete data.collection.products_count;
						delete data.collection.published_at;
						delete data.collection.published_scope;
						delete data.collection.updated_at;

						data.collection.published = false; /* set to unpublished by default */
						data.collection.title += ' [copy]';

						var collectionData = {};
						var collectionURL = '/admin/custom_collections.json'; /* default */
						var collectionType = data.collection.collection_type;

						delete data.collection.collection_type; /* no longer need type */

						if (collectionType === 'smart'){
							collectionData.smart_collection = data.collection;
							collectionURL = '/admin/smart_collections.json'; /* swap url */
						}else{
							collectionData.custom_collection = data.collection;
						}
						
						if(collectionType === 'smart'){

							$.ajax({
								type: "POST",
								url: collectionURL,
								contentType: "application/json;charset=utf-8",
								data: JSON.stringify(collectionData),
								success: function(d){
									try {
										var id = d[Object.keys(d)[0]].id;
										if(id !== 'undefined'){
											_.redirect('/admin/collections/'+id);
										}
									}
									catch (e) {/* error trap */}
								},
								error:function(){
									_.notice('Error duplicating.', true);
								}
							});

						}else{


							var count = 0;
							var id = document.URL.split('/').pop()
							var countCollects = function(){
								$.ajax({
									type:'GET',
									url:'/admin/collects/count.json?collection_id=' + id,
									success: function(d){
										count = d.count;
										if(count>0){
											getCollects(id,count,1)	
										}

									}
								});
							};

							var getCollects = function(id,count,page,collects){

								if(typeof id === 'undefined'){ return }
								if(typeof count === 'undefined'){ return }
								if(typeof page === 'undefined'){ var page = 1 }
								if(typeof collects === 'undefined'){ var collects = [] }

								_.notice('Duplicating collection, please wait...');
								var limit = 250;
								$.ajax({
									type:'GET',
									url:'/admin/collects.json?limit='+limit+'&fields=product_id&page='+page+'&collection_id=' + id,
									success: function(d){

										collects = collects.concat(d.collects);

										if(page*limit > count){

											collectionData.custom_collection.collects = collects;

											$.ajax({
												type: "POST",
												url: collectionURL,
												contentType: "application/json;charset=utf-8",
												data: JSON.stringify(collectionData),
												success: function(d){
													try {
														var id = d[Object.keys(d)[0]].id;
														if(id !== 'undefined'){
															_.redirect('/admin/collections/'+id);
														}
													}
													catch (e) {/* error trap */}
												},
												error:function(){
													_.notice('Error duplicating.', true);
												}
											});
										}else{
											getCollects(id,count,++page,collects);
										}

									}
								});
							}

							countCollects();
							

						}


					})
				});

				l.append(c);
				u.append(l);
				headerButtons.prepend(u);
			}else{
				_.notice('ShopifyFD error : setup_articles : Header button missing',true);
			}


		},
		get_files:function(i,pic_pages){

			var table = $('#settings-general table');

			if(table.length){
			_.notice('Loading files...');

			$.ajax({
				type: "GET",
				url: '/admin/files.json?limit=250&direction=next&page='+i,
				success: function(d,textStatus, request){
					if(d){

						var rows = $('');

						for (var i = 0, len = d.files.length; i < len; i++) {
							var row = $('<tr />',{
								'class':'file_row'
							}),
							td_image = $('<td />'),
							td_src = $('<td />'),
							td_path = $('<td />'),
							td_size = $('<td />',{'class':'tr'}),
							td_delete = $('<td />'),
							file_link = $('<a />',{
								href:'#',
								'data-src':d.files[i].public_url.replace('http:','')
							});

							if(d.files[i].content_type.indexOf('image')>-1){

								file_link.on('click',function(){
									var t = $(this);
									_.fd_modal(true,'<img src="'+ t.attr('data-src') +'" />','Image Preview',true);
									return false;
								}).text(d.files[i].key.replace('files/',''));

								var thumb = d.files[i].public_url.replace(/(\.[^\.]+)$/, '_thumb$1').replace('http:','');

								td_image.html('<img src="'+thumb+'" />');
								td_src.append(file_link);
								td_path.html('<input class="select-all-on-focus" value="'+ d.files[i].public_url +'">');
								
							}else{

								file_link.attr('href',d.files[i].public_url).attr('target','_blank').text(d.files[i].key.replace('files/',''));

							}

							td_size.html(Math.floor(d.files[i].size/1024)+' kB');
							row.append(td_image,td_src,td_path,td_size,td_delete);
							table.append(row);

						}


						if(i >= pic_pages){
							_.notice('All loaded');
							$('.header-right .segmented').hide();
						}else{
							++i;
							_.get_files(i,pic_pages);
						}

					}
				}
			});
			}

		},
		setup_files:function(){
			/*
			This function currently obselete due to recent dashboard edits.
			*/
			var targetHTML = $('.header-row .header-right').eq(0);
			if(targetHTML.length){

				var u = $('<ul/>',{
					'class':'segmented',
					'id':'get_all_images'
				}),
				l = $('<li/>'),
				a = $('<a/>',{
					'class':'btn',
					'href':'#',
					'style':'margin-left:1em'
				}).html('Show all files').on('click',function(){

					var t = $(this);
					t.addClass('is-loading').attr('style','margin-left:1em;text-indent: -9999px;');

					$.ajax({
						type: "GET",
						url: '/admin/files.json?limit=2&fields=id',
						success: function(d,textStatus, request){
							if(d){
								var limit = 50,
								total_pics = request.getResponseHeader('X-Total-Results');
								if(total_pics > limit){
									var pic_pages = Math.ceil(total_pics/limit);
									_.get_files(2,pic_pages);
								}else{
									_.notice('There are no more to load',true);
									t.removeClass('is-loading').attr('style','margin-left:1em');
								}
							}

						},
						error:function(){
							t.removeClass('is-loading').attr('style','margin-left:1em');
							_.notice('Error loading files',true);
						}
					});

					return false;

				});

				l.append(a);
				u.append(l);
				targetHTML.prepend(u);
			}
			
		},
		setup_settings_general:function(){

			var section = $("<div>", {
				id: "general_metafields",
				'class':'section description'
			}),
			nextGrid = $('<div />',{
				'class':'next-grid'
			}),
			nextGridWrap = $('<div />',{
				'class':'next-grid__cell next-grid__cell--quarter'
			}),
			summary = $('<div>', {
				'class':'section-summary'
			}),
			sectionContent = $('<div>',{
				'class':'next-grid__cell'
			});

			summary.html('<h1>Store Metafields</h1><p>Edit your shop level metafields here. Review the <a target="_blank" href="http://docs.shopify.com/themes/liquid-documentation/objects/metafield">Shopify documentation</a> for more info on Metafields.</p>');
			sectionContent.html(metafieldloader);

			nextGridWrap.append(summary);
			nextGrid.append(nextGridWrap).append(sectionContent);
			section.append(nextGrid);

			$('#settings-general div.section').eq(0).after(section);

			var loadinto = $('div.metafield-content');
			_.loadmeta(loadinto,v);

		},
		setup_customers:function(){
			var targetHTML = $('.next-card.next-card--aside').eq(1);
			if(targetHTML.length){
				targetHTML.after('<div id="customer_meta_box" class="next-card next-card--aside"><div class="box-content p">'+metafieldloader+'</div>');
				var loadinto = $('div.metafield-content');
				_.loadmeta(loadinto,v);
			}else{
				_.notice('ShopifyFD error : setup_customers : target HTML not found');
			}
		},
		setup_single_order:function(){

			var targetHTML = $('#order-sidebar');
			if(targetHTML.length){

				targetHTML.append('<div id="customer_meta_box" class="next-card next-card--aside"><div class="box-content p">'+metafieldloader+'</div>');
				var loadinto = $('div.metafield-content');
				_.loadmeta(loadinto,v);

			}else{
				_.notice('ShopifyFD error : setup_single_order : target html not found',true);
			}

			var billing_box = $('.box.box-details').eq(5),
			email = billing_box.find('a[bind-event-click="contactCustomer.show()"]');

			if(email.length){
				var input = $('<input />',{
					'value':email.text(),
					'readonly':'readonly',
					'class':'noprint',
					'style':'margin:1em 0'
				}).on('click',function(){
					$(this).select();
				});

				email.parent().after(input);
			}

		},
		setup_orders:function(){

			var targetHTML = $('.header-row .header-right').eq(0),
			visible_orders = $('.order.no-wrap a'),
			order_timer = false; 

			/* ORDER CREATION IMPORT */
				/* nothing here? ask for the beta version */
			/* END ORDER CREATION IMPORT */

			if(visible_orders.length){

				visible_orders.append(bubble_html).css({'position':'relative'}).hover(function(){

					var t = $(this);
					order_timer = setTimeout(function(){

						var l = t.find('ul').eq(0),
						a = t.attr('href');

						$('div.bubble').addClass('hide');

						if(!t.data('order')){

							$.ajax({
							type: "GET",
							url: a+'.json',
							success: function(d){
								if(d){
									var line_items = d.order.line_items,
										tracking_number=d.order.fulfillments,
										order_list = '';

									for (var i = 0, len = line_items.length; i < len; i++) {
										order_list +='<li style="white-space:normal">'+line_items[i].quantity + ' &times; '+line_items[i].name+'</li>';
									}

									if(d.order.fulfillment_status && tracking_number.length){
										order_list +='<li style="white-space:normal;border-top: 1px solid #ccc;margin-top: .5em;padding-top: .5em;">Tracking#: <b>'+tracking_number[0].tracking_number+'</b></li>';
									}

									t.data('order',order_list);
									l.html(order_list);
									t.find('div.bubble').removeClass('hide');
								}
							}});

						}else{
							t.find('div.bubble').removeClass('hide');	
						}

					},100);

				},function(){
					clearTimeout(order_timer);
					var t = $(this);
					t.find('div.bubble').addClass('hide');
				});
			}

		},
		updatedropdown:function(){

			/*

			 _   _           _       _             _                     _
			| | | |_ __   __| | __ _| |_ ___    __| |_ __ ___  _ __   __| | _____      ___ __
			| | | | '_ \ / _` |/ _` | __/ _ \  / _` | '__/ _ \| '_ \ / _` |/ _ \ \ /\ / / '_ \
			| |_| | |_) | (_| | (_| | ||  __/ | (_| | | | (_) | |_) | (_| | (_) \ V  V /| | | |
			 \___/| .__/ \__,_|\__,_|\__\___|  \__,_|_|  \___/| .__/ \__,_|\___/ \_/\_/ |_| |_|
			      |_|                                         |_|

			Keeps the metafields edit box select menu up to date
			
			*/

			var url = d.URL+'/metafields.json';

			if(_.data('omega') ==='general'){url = '/admin/metafields.json';}
			if(_.data('alpha') ==='articles'){url = '/admin/articles/'+_.data('omega')+'/metafields.json';}

			$.getJSON(url, function(data) {
				
				var response = '',
				m = data.metafields;

				if(m.length){

					_.data('m',m);
					$('#metacount').text(m.length).addClass('active');
					for (var i = 0, len = m.length; i < len; i++) {
						response+= '<option data-type="' +m[i].value_type + '" data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
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
		add_ui:function(){

			if($('#shopifyJSbar').length === 0){

				var b = $('body'),
				bar = $("<div>", {id: "shopifyJSbar",'class':'loading noprint fadein'}),
				wrapper = $("<div>", {'class': "wrapper clearfix"}),
				nav = $("<ul>", {id: "shopifyJSnav"});

				nav.html(appnav);

				nav.find('a').on('click',function(){

					if(!_.isloading()){

					var t = $(this),
						id=t.prop('id');

					if(id){

					if(id=='bulkmetafields'){_.bulkmetafields();}
					else if(id=='togglestyle'){_.toggleStyle();t.toggleClass('active')}
					else if(id=='aboutapp'){_.about_app()}

					}else{return true}
					}else{_.notice("We better wait for this page to load first...",true);
					} /* end loading check */

					return false;

				});

				/* put the jigsaw together*/
				wrapper.append(nav);
				bar.append(wrapper);
				
				/* add to page */
				b.append(bar);
				bar.removeClass('loading');
			}
		},
		load_css:function(){

			/* Load the CSS */
			var shopifyCSS = document.createElement("link");
			shopifyCSS.type = "text/css";
			shopifyCSS.rel = "stylesheet";
			shopifyCSS.id = "shopifyjs";
			/*
			https://dl.dropboxusercontent.com/s/m9ur11hivel2sou/shopifyFD.css
			"//freakdesign-us.s3.amazonaws.com/shopify/shopifyFD/s/shopifyFD.css";
			*/
			shopifyCSS.href = "//dl.dropboxusercontent.com/s/m9ur11hivel2sou/shopifyFD.css";
			document.getElementsByTagName('head')[0].appendChild(shopifyCSS);

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
		setup_announcements:function(){

			var insertionPoint = $('.section').eq(0);
			if(insertionPoint.length){
				var announcementPanel = insertionPoint.clone();
				var summary= announcementPanel.find('.section-summary');
				var title = summary.find('h1').eq(0);
				var summaryp = summary.find('p');
				var content = announcementPanel.find('.next-card');

				var box = $('<div />',{
					'class':'box box-details'
				});

				var ol = $('<ol />',{
					'class':'content-index content-index-img-icons'
				});

				$.ajax({
					type: "GET",
					url:'https://freakdesign-us.s3.amazonaws.com/shopify/shopifyFD/s/announcements.json',
					dataType: 'json',
					cache:false,
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success:function(d){

						for (var i = 0; i < d.announcements.length; i++) {
							var li = $('<li />',{
								'class':'content-index__item'
							}).html('<small>'+ d.announcements[i].date +'</small><br><strong>'+d.announcements[i].title+'</strong><p>'+d.announcements[i].description+'</p>');
							ol.append(li);
						};

						title.text('ShopifyFD updates');
						summaryp.text('Keep up to date with the latest edits and notes.');
						announcementPanel.removeClass('first-section').addClass('fadein');
						content.html('').append(box);
						box.append(ol);
						insertionPoint.after(announcementPanel);

					},
					error:function(xhr, status, error){
						_.notice(error,true);
					}
				});

			}else{
				_.notice('Unable to add ShopifyFD updates to page',true)
			}

		},
		init:function(){

			if(_.data('drag_on')){ _.set_drag_drop(); }
			$('html').addClass('shopifyJSoverride');

			_.get_theme_data();

			/* increase the default products per page */
			var productListButton = $('a[data-nav-sub-item="product_list"]');
			if(productListButton.length){
				productListButton.attr('href',productListButton[0].href+'?limit=250');
			}

			/* 

			Alpha Omega check. 
			This just keep an eye on the url so we know if something should be fired off or not...

			*/

			setInterval(function(){

				_.data('content',$('#content'));

				if(!_.data('content').hasClass('loading')){

					_.add_ui();

					var u_array = d.URL.split('#')[0].split('?')[0].split('/'),
					alpha = u_array[u_array.length - 2],
					omega = d.URL.split('/').pop().split('?')[0];

					if(omega !== 'next' && omega !== 'prev' ){
					if( alpha !== _.data('alpha') || omega !== _.data('omega') ){

						_.data('alpha',alpha);
						_.data('omega',omega);
						_.flog(_.data('alpha')+','+_.data('omega'));

						if( _.data('alpha') === 'customers' && !isNaN(_.data('omega'))){
							_.setup_customers();
						} else if( _.data('alpha') === 'articles' && !isNaN(_.data('omega'))){
							_.setup_articles();
						} else if( _.data('alpha') === 'pages' && !isNaN(_.data('omega'))){
							_.setup_pages();
						} else 	if( _.data('alpha') === 'smart_collections' && !isNaN(_.data('omega'))){
							_.setup_custom_collections(); 
						} else if( _.data('alpha') === 'custom_collections' && !isNaN(_.data('omega'))){
							 _.setup_custom_collections();
						} else if( _.data('alpha') === 'collections' && !isNaN(_.data('omega'))){
							 _.setup_custom_collections();
						} else if( _.data('alpha') === 'blogs' && !isNaN(_.data('omega'))){
							_.setup_blogs();
						} else if( _.data('alpha') === 'products' && !isNaN(_.data('omega'))){
								_.setup_products();
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'products' ){
							_.setup_products_list();
						} else if( _.data('alpha') === 'orders' && !isNaN(_.data('omega'))){
							_.setup_single_order();
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'orders' ){
							_.setup_orders();
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'collections' ){
							_.setup_collections();
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'link_lists' ){
							_.setup_link_lists();
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'links' ){
							_.setup_link_lists();
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'themes' ){
							_.setup_themes();
						} else if( _.data('alpha') === 'link_lists' && !isNaN(_.data('omega'))){
							_.setup_link_lists_single();
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'discounts' ){
							_.setup_discounts();
						} else if( _.data('alpha') === 'settings' && _.data('omega') === 'general' ){
							_.setup_settings_general();
						} else if( _.data('alpha') === 'settings' && _.data('omega') === 'files' ){
							/*_.setup_files();*/
						} else if( _.data('alpha') === 'settings' && _.data('omega') === 'shipping' ){
							_.setup_shipping();
						} else if( _.data('alpha') === 'settings' && _.data('omega') === 'taxes' ){
							/*_.setup_taxes();*/
						} else if( _.data('alpha') === 'admin' && _.data('omega') === 'announcements' ){
							_.setup_announcements();
						}

					} /* end page change check */
					}
				} /* end hasclass loading */
			}, _.data('wait')); /* end interval */

			_.notice("ShopifyFD loaded");

		},
		data: function(a,b){
			if("undefined"===typeof b)return v[a];v[a]=b
		},
		toggleStyle: function(){
			/* just in case this css breaks something, allow it to be disabled... */
			$('html').toggleClass('shopifyJSoverride');
		},
		isloading:function(){
			return _.data('content').hasClass('loading');
		}
	}
}());
				
	_.load_css();
	_.init();

}else{
alert('Error. This should be run within the Shopify Admin page.');
}}else{
if('function' === typeof Shopify.Flash.error){
Shopify.Flash.error('Error. ShopifyFD already loaded!');
}}}else{alert('Error. jQuery not found.')}}}());