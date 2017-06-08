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

  "use strict";

  /* Sanity checks */
  if(document.URL.indexOf("myshopify.com/admin")<0){ return alert('Error: Shopify Admin not found') }
  if(typeof Shopify === 'undefined'){ return alert('Error: Shopify object not found') }
  if(typeof jQuery === 'undefined'){ return alert('Error: jQuery not found') }
  if(!!document.getElementById("shopifyfd-css")){
    var errorMessage = 'Error: ShopifyFD already loaded';
    "object" === typeof Shopify && Shopify.Flash && Shopify.Flash.error ? Shopify.Flash.error(errorMessage) : alert(errorMessage) ;
    return 
  };
  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {
    notice("Browser unsupported (classList)"); /* if you want to add support for classList, do so here */
    return;
  };

  var settings = {
    enableDragDrop:true,
    wait: 1000,
    apiLimit:250
  };

  /* Translations */
  var translation = window.shopifyfdTranslation || {
    save:'Save',
    edit:'Edit',
    delete:'Delete',
    about_shopifyfd:'About ShopifyFD',
    select_or_create_metafield:'Select or create a metafield',
    reload_page:'Reload page to check results.',
    add_new_metafield:'Add New Metafield',
    edit_metafield:'Edit Metafield',
    metafield_deleted:'Metafield deleted',
    hide_from_sitemap:'Hide from Sitemap'
  };

  var app = {
    alpha:false,
    omega:false,
    metafields:{},
    data:{},
    cache:{}
  };


  /* File paths */
  var paths = {
    css:'//freakdesign-us.s3.amazonaws.com/shopify/shopifyFD/s/shopifyFD.min.css?20160718',
    help:'//freakdesign-us.s3.amazonaws.com/shopify/shopifyFD/freakdesign-shopifyfd-for-shopify-guide.pdf'
  }

  var loadCss = function(){
    var shopifyCSS = document.createElement("link");
    shopifyCSS.type = "text/css";
    shopifyCSS.rel = "stylesheet";
    shopifyCSS.id = "shopifyfd-css";
    shopifyCSS.href = paths.css;
    document.getElementsByTagName('head')[0].appendChild(shopifyCSS);
  }
  loadCss();

  var shopifyfd_nav = '<ul id="shopifyfdnav" class="fadein ui-nav__group ui-nav__group--parent"><li class="ui-nav__item ui-nav__item--parent"><a href="https://freakdesign.com.au/pages/shopifyfd" target="_blank" class="ui-nav__link ui-nav__link--parent" style="color: #21c2a8;"><svg class="next-icon next-icon--size-20 next-icon--no-nudge" style="fill:#27c3aa"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#next-settings"></use> </svg><span class="ui-nav__label ui-nav__label--parent">ShopifyFD</span></a></li></ul>';
  var metafieldform = '<label class="metafield-next-label next-label">'+translation.add_new_metafield+'</label><input class="ssb" maxlength="20" type="text" id="metafield_namespace" placeholder="namespace" list="fd-dl-namespace"><datalist id="fd-dl-namespace"></datalist><input class="ssb" maxlength="30" type="text" id="metafield_key" placeholder="key" list="fd-dl-key"><datalist id="fd-dl-key"></datalist><textarea class="ssb" id="metafield_value" placeholder="value"></textarea><input type="hidden" id="metafield_id"><a class="btn btn-slim fd-btn savemymeta" id="shopifyjs_savemetafield">'+translation.save+'</a> <a class="int btn btn-slim fd-btn savemymeta" id="shopifyjs_savemetafield_int">Save as Integer</a> <a id="shopifyjs_copymetafield" class="btn btn-slim hide btn-primary tooltip tooltip-bottom"><span class="tooltip-container"><span class="tooltip-label">Copy Metafield to Virtual Clipboard</span></span>Copy</a> <a class="btn btn-slim hide delete tooltip tooltip-bottom" id="shopifyjs_deletemetafield"><span class="tooltip-container"><span class="tooltip-label">There is no undo. Be careful...</span></span>'+translation.delete+'</a><p style="margin:1em 0;line-height:1"><small><span class="metafield-save-note">Please note: Using the save button top right will NOT save these metafields. Be sure to click '+translation.save+' above.<br><br></span><a id="advanced_meta_features" href="#">Toggle helper buttons</a></small></p><div id="advanced_meta" class="hide"><p style="border-bottom: 1px solid #ccc;margin-bottom:.5em">Handle Helper <a id="adv_clear_cache" style="float:right" href="#">Clear cache</a></p><p><a id="adv_get_collections" class="btn fd-btn" href="">Get collections</a></p><p><a id="adv_get_products" class="btn fd-btn" href="">Get '+settings.apiLimit+' products</a></p></div>';
  var metafieldloader = '<div class="next-card-metafield next-card next-card--aside fadein"><section class="next-card__section"><h3 class="next-heading">Metafields <svg class="next-icon next-icon--size-16 metafield-fullscreen-btn"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#next-website"></use></svg><span id="metacount" class="hide">0</span></h3><div class="metafield-content content"><i class="ico ico-20 ico-20-loading"></i></div></section></div>';
  var metafieldloaderSection = '<div class="section metafields"><div class="next-grid"><div class="next-grid__cell next-grid__cell--quarter"><div class="section-summary"><h1>Metafields</h1><p>Manage the metafields that belong to this collection.</p></div></div><div class="next-grid__cell"><div class="next-card"><div class="section-content" id="collection-metafields"><div class="next-card__section">'+metafieldloader+'</div></div></div></div></div></div>';
  var metafield_default = '<option value="">'+translation.select_or_create_metafield+'</option>';
  var metafield_copybox = '<div class="metafield-copy-paste sst"><a class="fd-btn btn btn-slim" id="fd_copymetafields">Copy All Metafields</a> <a class="fd-btn btn btn-slim" id="fd_pastemetafields">Paste Metafields</a> <a class="btn btn-slim tooltip tooltip-bottom" href="#" id="fd_whatmetafields"><span class="tooltip-container"><span class="tooltip-label">View what is in the clipboard</span></span>?</a></div>';
  var rte_menu_html = '<div class="sst" id="rte_extra"><a class="btn btn-slim fd-btn tooltip btn-destroy tooltip-bottom" id="clearformatting" href="#"><span class="tooltip-container"><span class="tooltip-label">Will remove all HTML on click</span></span>Purge HTML</a> <a class="btn btn-slim fd-btn tooltip tooltip-bottom" id="clear-html-attributes" href="#"><span class="tooltip-container"><span class="tooltip-label">Removes HTML attributes except for <br>target,class,href & src</span></span>Clean HTML</a> <a class="btn btn-slim fd-btn tooltip tooltip-bottom" id="createbackup" href="#"><span class="tooltip-container"><span class="tooltip-label">Save contents as metafield</span></span>Backup</a> <a class="btn btn-slim fd-btn" style="display:none;" id="restorebackup" href="#">Restore Backup</a> <a class="btn btn-slim fd-btn" id="save_images_to_meta" href="#">Images to Metafields</a></div>';
  var vbox = '<div class="vbox fadein"><fieldset><select>'+metafield_default+'</select><input id="mv_namespace" placeholder="namespace" /><input id="mv_key" placeholder="key" /><input id="mv_value" placeholder="value" /></fieldset><span class="mybuttons"><a class="save btn btn-slim" href="#">'+translation.save+'</a> <a class="btn btn-slim saveinteger" href="#">'+translation.save+' as Integer</a> <a title="'+translation.delete+'" class="btn-slim delete hidden" href="#">'+translation.delete+'</a></span></div>';
  var vbox_single_html = '<div class="vbox-single-card next-card"><div class="next-card__section"><h2 class="next-heading--quarter-margin">Variant Metafields</h2><div id="vrow" class="single-variant">'+vbox+'</div></div></div>'
  var bulk_html_box = '<p class="warning">This section makes bulk changes to your product metafields. If something goes wrong it may adversely effect all product metafields. There is no undo.</p><table><tr><td>Namespace</td><td><input id="bulk_namespace" placeholder="Namespace" type="text" /></td></tr><tr><td>Key</td><td><input id="bulk_key" placeholder="Key" type="text" /></td></tr><tr><td>Value</td><td><input id="bulk_value" type="text" placeholder="value" /></td></tr><tr><td colspan="2"><p><strong>Note:</strong> Any existing metafield with the same namespace and key will be overwritten.</p></td></tr><tr><td><a class="btn create">'+translation.save+'</a> <a class="btn createint">Save Integer</a></td><td><span style="display:none"><a class="btn delete">Delete</a> <input type="text" style="width:50%" placeholder="Type delete" /></span></td></tr><tr><td colspan="2"><textarea class="debug" placeholder="Data Output (future use only)"></textarea></td></tr></table>';
  var autosave_html = ' <a id="autosave" tabindex="-1" class="btn btn-slim has-loading" href="#">Autosave</a>';
  var html_about = '<p>ShopifyFD is "honor-ware", which means that we trust each other to be nice. As the developer of it, I\'m committed to keep the tool something that\'s actually useful. By releasing new features and correcting possible bugs on a constant basis I can do just that, but I need your support. If you use it and intend to keep it, please sponsor its development by making a small <a target="_blank" href="http://shopifyfd.com/">contribution</a>.</p><p>You can track changes by keeping an eye on the project page or following me on <a target="_blank" href="https://twitter.com/freakdesign">twitter</a>.</p><p><h4 style="margin-top:1em">Resources and links</h4><ul><li><a href="http://freakdesign.com.au/pages/shopifyfd" target="_blank">Project home page</a></li><li><a href="http://goo.gl/OsFK2d" target="_blank">Feature Request</a></li><li><a href="http://bit.ly/shopifyFD_forum" target="_blank">Shopify forum post</a></li></ul></p>';
  var bubble_html = '<div class="bubble hide fadein"><div class="bubble-content p"><div class="pr"><ul class="unstyled"></ul></div></div></div>';
  var bulk_tags = '<div><div class="clearfix em"><div class="half">Choose a collection</div><div class="half"><select data-action="collection"><option value="">Loading, please wait...</option></select></div></div><div class="clearfix em"><div class="half">Choose an action</div><div class="half"><select data-action="action"><option value="add">Add</option><option value="set">Set</option><option value="remove">Remove</option><option disabled value="toggle">Toggle</option><option value="purge" style="background:red;color:#fff">DELETE ALL</option></select></div></div><div class="clearfix em"><div class="half">Set the tag</div><div class="half"><input /></div></div><div class="half"><a class="btn" data-action="update_tags">Update tags</a></div><div class="half"><small>Add: Adds tags to the existing ones<br>Set: Replaces tags with new ones<br>Remove: Removes matching tags<br>Toggle: Future Use, disabled...</small></div></div>';
  var next_item_HTML = '<div class="ui-layout__item"><div class="next-card"></div></div>';  

  var selector_next_secondary = '.ui-layout__section--secondary .ui-layout__item:last';
  var selector_next_primary = '.ui-layout__section--primary .ui-layout__item:last';
  var selector_sidebar = '.next-layout__sidebar:first';
  var selector_sidebar_child = '.next-layout__sidebar > div:first';
  var variant_edit_card = '#variant-edit-card';
  var selector_sidebar_cell = '.next-grid__cell--third:first';
  var selector_sidebar_cell_alt = '.ui-layout__section--secondary .ui-layout__item:first';
  var selector_mf_content = 'div.metafield-content';
  var selector_general_settings = '#settings-general section:first';

  var header_primary_action = '.header .header__primary-actions:first';
  var header_secondary_action = '.header .header__secondary-actions:first';
  var header_ui_title_bar = '.ui-title-bar';
  var header_ui_title = '.ui-title-bar .ui-title-bar__heading-group'; /* header_ui_action_bar_links */
  var header_ui_buttons = 'ui-title-bar__actions:first';
  var header_ui_buttons_secondary = '.ui-title-bar__actions.ui-title-bar__actions--secondary:first';
  var header_ui_action_bar_links = '.action-bar__top-links';

  var alphaOmega = function(url){
    /* return url parts for location / object detection */
    if(typeof url === 'undefined'){
      var url = [location.protocol, '//', location.host, location.pathname].join('');
    }
    var urlArray = url.split('/');
    var alpha = urlArray[urlArray.length - 2];
    var omega = urlArray.pop();
    return [alpha,omega,location.search.substring(1)];
  };


  var escape = function (str) {
    /* Escapes a string */
    return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
  };

  var windowResize = function(){
    window.dispatchEvent(new Event('resize'));
  };

  var redirect = function(url) {
    /* Redirects the page */
    if(typeof url !== 'undefined' && typeof Turbolinks === 'function'){
      try {
        Turbolinks.visit(url);
      } catch (e) {
        return false;
      }
    }
  };


  var selectSort = function(a,b){
    /* simple sorting */
    if(!a.getAttribute('value')){
      return -1;
    }else if(!b.getAttribute('value')){
      return 1;
    }
    return (a.innerHTML > b.innerHTML) ? 1 : -1;
  };


  var stripHTML = function(dirtyString) {
    /* removes html from a string */
    var container = document.createElement('div');
    container.innerHTML = dirtyString;
    return container.textContent || container.innerText;
  };


  var supportsHTML5Storage = function(){
    /* Simple check for Storage support */
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  };


  var notice = function(m,err){
    /* Show message at bottom of the screen using the inbult messaging system */
    if(typeof Shopify.Flash.error !== 'function' || typeof Shopify.Flash.notice !== 'function'){ return }
    err ? Shopify.Flash.error(m) : Shopify.Flash.notice(m);
  };


  var _data = function(a,b){
    /* setter and getter */
    if("undefined"===typeof b)return app[a];app[a]=b
  };


  var about_app = function(){
    /* About this tool. */
    fd_modal(true,html_about,translation.about_shopifyfd,true);
    return false;
  };


  var get_theme_data = function(){
    /* Get the main theme ID and store response (one time) */
    if(typeof app.data.themeId !== 'undefined'){ return }
    $.ajax({
      type: 'GET',
      url: '/admin/themes.json',
      success: function(d){
        if(d){
          app.data.themes = d.themes;
          for (var i = 0, len = d.themes.length; i < len; i++) {
            if(d.themes[i].role ==='main'){
              app.data.themeId = d.themes[i].id
              //_data('themeID',d["themes"][i].id);
            }
          }
        }
      }
    })
  };


  var add_ui = function(){

    /* option to increase working area */
    addNavClose();
    
    if(document.getElementById('shopifyfdnav')){ return false }

    /* get the first nav group */
    var navGroup = document.querySelectorAll('.ui-nav .ui-nav__group')[0];
    if(!navGroup){ return }

    /* create the wrapper and insert */
    var el = document.createElement('div');
    el.innerHTML = shopifyfd_nav;
    navGroup.parentNode.insertBefore(el, navGroup.nextSibling);

  }


  var createbackup = function(id,autosave){
    /* Create a backup of the current RTE html */

    if(typeof id === 'undefined' || !id){ return false }
    var rtePanel = $("iframe:first").contents().find("#tinymce:first");
    if(!rtePanel.length){ return false }

    var myhtml = rtePanel.html();
    var metafield = {
      "metafield": {
        "namespace": 'backups',
        "key": id,
        "value": myhtml,
        "value_type": "string"
      }
    };

    if(typeof autosave !== 'undefined'){

      /* sanity checks */
      if(window.location.href.indexOf('/admin/products/')<0){ return false }
      if(!$('#autosave').hasClass('active')){ return false }
      $('#autosave').addClass('is-loading').removeClass('active');

      metafield.metafield.namespace = 'autosave';
      metafield.metafield.key = 'html';

    }

    var url = [location.protocol, '//', location.host, location.pathname,'/metafields.json'].join('');
    if(_data('alpha') === 'articles'){ url = '/admin/articles/' + id + '/metafields.json' }

    $.ajax({
      type: "POST",
      url: url,
      dataType: 'json',
      data: metafield,
      success: function(d){
        updatedropdown();
        if (typeof autosave === 'undefined'){
          notice('Backup saved');
        }else{
          $('#autosave').removeClass('is-loading').addClass('active');
        }
      },
      error: function(d){
        var err = JSON.parse(d.responseText);
        notice(err.errors.value[0],true);
      }
    });
    return true;
  };


  var bulk_save_metafield_queue = function(m,i,debug_box){
    /* Bulk metafield queue handler */

    /* Sanity check */
    if(typeof m === 'undefined'){ return false }
    if(typeof i === 'undefined'){ return false }

    $.ajax({
      type: "POST",
      url: '/admin/products/'+_data('products')[i].id+'/metafields.json',
      dataType: 'json',
      data: m,
      success: function(d){
        if(debug_box){
          var fdmv = debug_box.val();
          debug_box.val(fdmv+i+': '+_data('products')[i].id+': ok\n');
        }
        if(i+1 < _data('products').length){
          bulk_save_metafield_queue(m,i+1,debug_box)
        }else{
          if(_data('alpha') == 'products'){ updatedropdown() }
          notice("Bulk changes done!");
        }
      }
    })
  };


  var getMetafieldUrl = function(id,url){
    /* Return the correct metafield url */

    if(typeof url === 'undefined'){
      var url = [location.protocol, '//', location.host, location.pathname].join('');
    }
    var pathEnd = '/metafields.json'; 
    var ao = alphaOmega(url);
    var alpha = ao[0];
    var omega = ao[1];

    if(typeof id !== 'undefined' && !isNaN(id)){
      pathEnd = '/metafields/'+id+'.json';
    }

    if(omega === 'general'){ return '/admin' + pathEnd }
    url = [location.protocol, '//', location.host, '/admin/', alpha, '/', omega, pathEnd].join(''); 

    return url;

  }


  var loadmeta = function(loadinto,v){

    /*

     _                 _                _
    | | ___   __ _  __| |_ __ ___   ___| |_ __ _
    | |/ _ \ / _` |/ _` | '_ ` _ \ / _ \ __/ _` |
    | | (_) | (_| | (_| | | | | | |  __/ || (_| |
    |_|\___/ \__,_|\__,_|_| |_| |_|\___|\__\__,_|

    Loads the metafields for the current view

    */

    var url = getMetafieldUrl() + '?limit='+settings.apiLimit;
    var body = $('body');
    app.cache.fullscreenMetafield = $('.metafield-fullscreen-btn');

    if(app.cache.fullscreenMetafield.length){

      app.cache.fullscreenMetafield.on('click',function(){
        if(body.hasClass('fullscreen-metafield')){
          body.removeClass('fullscreen-metafield');
        }else{
          body.addClass('fullscreen-metafield');
        }
      });

    }

    $.getJSON(url, function(data) {

      var h = '';
      var namespaceArray = _data('datalistNamespace') || ['global','test','theme'];
      var keyArray = _data('datalistKey') || [];
      var m = data.metafields;

      if(m){

        _data('m',m);
        _data('hasbackup',false); /* reset to default */
        $('#restorebackup').hide();

        if(_data('alpha')==='products' || _data('alpha')==='collections' || _data('alpha')==='pages'){
          setup_copypaste();  
        }

        var metacount = $('#metacount');
        metacount.text(m.length).removeClass('hide');

        if(m.length === 0){
          metacount.addClass('hide');
        }

        for (var i = 0, len = m.length; i < len; i++) {
          h+= '<option data-type="' +m[i].value_type + '" data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
          app.metafields[m[i].id] = { namespace: m[i].namespace, value: m[i].value, key: m[i].key };

          if (m[i].namespace == "backups"){
            if(_data('hasbackup') === false){
              $('#restorebackup').show();
              _data('hasbackup',true);
              setupRteBackupBtn();
            }
          }

          if(m[i].namespace === 'seo' && m[i].key === 'hidden' && m[i].value === 1){
            hiddenObject(m[i].id)
          }

          namespaceArray.push(m[i].namespace);
          keyArray.push(m[i].key);

        }

        namespaceArray = array_unique(namespaceArray);
        keyArray = array_unique(keyArray);

        _data('datalistNamespace',namespaceArray);
        _data('datalistKey',keyArray);

        h = '<select id="metafieldselect" class="ssb">' + metafield_default + h +'</select>';
      }else{
        h ='<select id="metafieldselect" class="ssb">' + metafield_default + '</select>';
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
        adv_meta.toggleClass('hide');
        return false;
      });

      $('#adv_clear_cache').off('click').on('click',function(){
        $('#advanced_meta').find('select').remove().end().find('a').show();
        _data('products',false);
        _data('collections',false);
        return false;
      });


    $('#adv_get_products').off('click').on('click',function(){

      var t = $(this);
      var add_select = function(d){
        var toappend='';
        var select=$('<select />').change(function(){
          var t=$(this);
          $('#metafield_value').val(t.val());
        }).html('<option value="">Add product handle as value</option>');
        for (var i = 0, len = d.products.length; i < len; i++) {
          toappend+='<option value="'+d.products[i].handle+'">'+d.products[i].title+'</option>';
        }
        select.append(toappend);
        t.after(select).hide();
      };

      if(!_data('products')){
        $.ajax({
          type: 'GET',
          url: '/admin/products.json?limit='+settings.apiLimit,
          dataType: 'json',
          success: function(d){
            if(d.products.length){
              _data('products',d);
              add_select(d);
            }
          },
          fail: function(){
            notice('Failed to load products',true);
          }
        });
      }else{
        var d = _data('products');
        add_select(d);
      }

      return false;

    });

    $('#adv_get_collections').off('click').on('click',function(){
      var t = $(this);
      var add_select = function(d){
        var toappend='';
        var select=$('<select />',{}).change(function(){
          var t=$(this);
          $('#metafield_value').val(t.val());
        }).html('<option value="">Add collection handle as value</option>');

        for (var i = 0, len = d.collections.length; i < len; i++) {
          toappend+='<option value="'+d.collections[i].handle+'">'+d.collections[i].title+'</option>';
        }

        select.append(toappend);
        t.after(select).hide();
      };
      if(!_data('collections')){
        $.ajax({
          type: 'GET',
          url: '/admin/collections.json?limit='+settings.apiLimit,
          dataType: 'json',
          success: function(d){
            if(d.collections.length){
              _data('collections',d);
              add_select(d);
            }
          },
          error: function(){
            notice('Failed to load collections',true);
          }
        });
      }else{
        var d = _data('collections');
        add_select(d);
      }
      return false;

    });


    $('#metafieldselect').change(function(){
      var t = $(this).find(':selected');
      if(t.attr('data-id')){

        var m = app.metafields[t.attr('data-id')];
        $('.metafield-next-label').text(translation.edit_metafield);
        $('#metafield_namespace').val(m.namespace).prop("disabled", true);
        $('#metafield_key').val(m.key).prop("disabled", true);
        $('#metafield_value').val(m.value);
        $('#metafield_id').val(t.attr('data-id'));
        $('#shopifyjs_deletemetafield').removeClass('hide');

      }else{
        clearmetaform();
      }
    });



    $('#shopifyjs_deletemetafield').on('click',function(e){

      e.preventDefault();
      var id = $('#metafield_id').val() || false;
      if(!id){
        notice('Object ID Missing',true);
        return false;
      }


      var url = getMetafieldUrl(id);

      /* sanity check */
      if(url.indexOf('?show_all_images')>-1){ return }
      if(url.indexOf('products.json')>-1){ return }
      
      $.ajax({
        type: "DELETE",
        url: url,
        success: function(d){
          notice(translation.metafield_deleted);
          updatedropdown();
        },
        error:function(d){
          notice('Failed to delete',true);
        }
      });

    });

    $('.metafield-content a.savemymeta').off('click').on('click',function(){

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

        var url = getMetafieldUrl(metafield_id);

        $.ajax({
            type: "PUT",
            url: url,
            dataType: 'json',
            data: metaupdateJSON,
            success: function(d){
              updatedropdown();
              flog(d);
              notice('Metafield updated');
            }
        });


      }else{

        var url = getMetafieldUrl();

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: metaJSON,
            success: function(d){
              updatedropdown();
              notice('Metafield saved');
            },
            error: function(d){
              var r = JSON.parse(d.responseText),
              e = '';
              
              if (r.errors.namespace){e+='Namespace '+escape(r.errors.namespace[0])+'. '}
              if (r.errors.key){e+='Key '+escape(r.errors.key[0])+'. '}
              if (r.errors.value){e+='Value '+escape(r.errors.value[0])+'. '}

              notice('Metafield failed to save: ' + e,true);
            }
        });
      }

      return false;

    });


    });
  }


  var clearformatting = function(){
    var mycontent = $("iframe:first").contents().find("#tinymce:first");
    if(!mycontent.length){ return false }

    var div = document.createElement("div");
    div.innerHTML = mycontent.html();
    var text = div.textContent || div.innerText || "";
    mycontent.text(text);
  };


  var removeAttributes = function(){
    var mycontent = $("iframe:first").contents().find("#tinymce:first");
    if(!mycontent.length){ return false }

    var selector = mycontent.find('*');
    var whitelist = ['href','target','class','src'];
    selector.each(function(i,elem) {
      for (var i = elem.attributes.length -1; i >= 0 ; i--) {
        if(whitelist.indexOf(elem.attributes[i].name)<0){
          elem.removeAttribute(elem.attributes[i].name);
        }
      }
    });
  };


  var clearmetaform = function(){
    $('.metafield-next-label').text(translation.add_new_metafield);
    $('#metafield_namespace').val('').prop("disabled", false);
    $('#metafield_key').val('').prop("disabled", false);
    $('#metafield_value').val('');
    $('#metafield_id').val('');
    $('#shopifyjs_deletemetafield').addClass('hide');
  };

  var jsonEndpointShow = function(a){

    var target = document.getElementsByClassName(header_ui_action_bar_links.replace('.',''));
    if(!target.length){ return }

    if(document.getElementsByClassName('view-json-endpoint-link').length){ return }
    var button = document.createElement("a"); 
    button.innerHTML = 'View JSON';
    button.target = '_blank';
    button.classList.add('btn','action-bar__link','btn--link');
    button.href =['//', location.host, location.pathname].join('')+'.json';
    target[0].appendChild(button);

  };

  var set_drag_drop = function(){
    if(!settings.enableDragDrop){ return false }
    var dndSupported = function () {
      var div = document.createElement('div');
      return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };
    if(dndSupported()){
      flog('has dnd');

      var doc = document.documentElement;
      doc.ondragover = function () { this.className = 'dragit'; return false; };
      doc.ondragleave = function () { this.className = ''; return false; };
      doc.ondragend = function () { this.className = '';return false; };
      doc.ondrop = function (event) {
        event.preventDefault && event.preventDefault();
        var files = event.dataTransfer.files;
        var files_count = files.length;
        var files_index = 0;
        var reader = new FileReader();
        var file_array = {};

        reader.onload = function (event) {
          flog('load');
          var fdata = event.target.result;
          var justdata = fdata.split(',')[1];

          file_array[files_index] = { "name": files[files_index].name, "data": justdata };
          files_index++;

          if(files_index < files_count){
            notice("Reading file ["+ (files_index+1 )+"] contents...");
            reader.readAsDataURL(files[files_index]);
          }else{
            do_upload(file_array);
          }
        };

        if(files_count){
          document.documentElement.className = 'dragit';
          notice("Reading file ["+ (files_index+1 )+"] contents...");
          reader.readAsDataURL(files[files_index]);
        }

        return false;
      }
    }
  };


  var do_upload = function(d){
    /* grab the dropped files and upload them to the theme */

    if(!settings.enableDragDrop){ return false }

    var tid = app.data.themeId; //_data('themeID');
    if(!tid || isNaN(tid)){ notice('Theme ID not found',true); return false; }

    var files = d;
    var files_count = Object.keys(d).length;
    var files_index = 0;
    
    if(_data('alpha') == 'themes'){tid = _data('omega');}
    if(_data('omega') == 'settings' && !isNaN(_data('alpha'))){tid = _data('alpha');}

    var doajax = function(){

      var myfile = {
        "asset": {"key": 'assets/'+files[files_index].name,"attachment": files[files_index].data}
      };

      $.ajax({
        type: "PUT",
        url: '/admin/themes/'+tid+'/assets.json',
        data: myfile,
        success: function(){
          notice(files[files_index].name + ' uploaded ('+(files_index+1)+'/'+files_count+')');
          files_index++;
          if(files_index < files_count){ doajax() } else {
            document.documentElement.className = '';
          }
        },
        error:function(){
          notice('File upload failed',true);
        }
      });
    }

    doajax();

  };


  var updateVariant = function(data,count,callback){

    if(typeof data === 'undefined'){ return false }
    notice('Updating Variant '+(count+1)+'/'+data.length+'...');

    if(typeof count === 'undefined'){ var count = 0 }
    if(typeof callback === 'undefined'){ var callback = false }

    $.ajax({
      type: "PUT",
      url: '/admin/variants/'+data[count].variant.id,
      dataType: 'json',
      data: data[count],
      success: function(d){
        ++count;
        if(count<data.length){
          updateVariant(data,count,callback);
        }else{
          notice('Variants updated');
          if(typeof callback === 'function'){
            callback();
          }
        } 
      },
      error:function(){
        notice('Update failed',true);
      }
    });
  };


  var save_variant_metafield = function(id,namespace,key,value,vid,type){

    /* save a metafield attached to a variant */

    var thistype='undefined' !== typeof type ? 'integer' : 'string';
    var ajaxType = 'post';
    var url = '/admin/variants/'+id+'/metafields.json';
    var meta = {"metafield": {"namespace": namespace,"key": key,"value": value,"value_type": thistype}};

    if(vid.length){
      if(isNaN(vid)){ return false }
      meta = {"metafield": {"id": vid,"value": value,"value_type": thistype}};
      url = '/admin/variants/'+id+'/metafields/'+vid+'.json';
      ajaxType = 'put';
    }

    $.ajax({
      type: ajaxType,
      url: url,
      data: meta,
      success: function(d){
        flog(d);
        setup_vrow(id);
        notice('Metafield saved');
      },
      error:function(d){
        setup_vrow(id);
        notice('Error Saving',true);
      }
    });

  };


  var delete_variant_metafield = function(id,vid){

    /* delete a metafield attached to a variant */
    var url = '/admin/variants/'+id+'/metafields/'+vid+'.json';

    if(url.indexOf('?')>-1){ return false }
    if(url.indexOf('products.json')>-1){ return false }

    $.ajax({
      type: "DELETE",
      url: url,
      success: function(d){
        flog(d);
        setup_vrow(id);
        notice(translation.metafield_deleted);
      },
      error:function(d){
        setup_vrow(id);
        notice('Failed to delete',true);
      }
    });
  };


  var variant_fillfields = function(id){
    var o;
    for (var i = 0, len = _data('vm').length; i < len; i++) {
      o = _data('vm')[i];
      if(parseInt(o.id) == parseInt(id)){
        return o;
      }
    };
    return false;
  }


  var setup_vrow = function(v){

    if(typeof v === 'undefined' || isNaN(v) || !v ){ notice("Could not find ID",true); return false }

    $('#mv_namespace').val('').prop("disabled", false);
    $('#mv_key').val('').prop("disabled", false);
    $('#mv_value').val('');
    _data('current_vid','');
    
    var option = function(o){
      return '<option class="meta" value="'+o.id+'">'+o.namespace+'.'+o.key+'</option>';
    }

    $.ajax({
      type: 'GET',
      url: '/admin/variants/'+v+'/metafields.json',
      success: function(d){

        $('#vrow option.meta').remove();
        var m = d.metafields;

        if(m){
          _data('vm',m);

          if(m.length){
            $('#vrow select').addClass('active');
          }else{
            $('#vrow select').removeClass('active');
          }
        }

        for (var i = 0, len = m.length; i < len; i++) {
          $('#vrow select').append(option(m[i]));
        }

        $('#vrow .save').off('click').on('click',function(){


          if(!_data('current_vid')){
            _data('current_vid','');
          }
          save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_data('current_vid'));
          return false;
        });

        $('#vrow .saveinteger').off('click').on('click',function(){

          /*$('#vrow .mybuttons').hide();*/
          if(!_data('current_vid')){
            _data('current_vid','');
          }
          save_variant_metafield(v,$('#mv_namespace').val(),$('#mv_key').val(),$('#mv_value').val(),_data('current_vid'),true);
          return false;
        });

        $('#vrow .delete').addClass('hidden').off('click').on('click',function(){

          /*$('#vrow .mybuttons').hide();*/
          delete_variant_metafield(v,_data('current_vid'));
          return false;
        });

        $('#vrow select').eq(0).off('change').change(function(){

          var v_val = $(this).val();
          _data('current_vid',v_val);
          flog(_data('vm'));

          if(v_val.length){
            $('#mv_namespace').prop("disabled", true);
            $('#mv_key').prop("disabled", true);
            $('#vrow .delete').removeClass('hidden');
            var o = variant_fillfields(v_val);
            if(o){
              $('#mv_namespace').val(o.namespace);
              $('#mv_key').val(o.key);
              $('#mv_value').val(o.value);
            }
          }else{
            $('#mv_namespace').val('').prop("disabled", false);
            $('#mv_key').val('').prop("disabled", false);
            $('#mv_value').val('');
            $('#vrow .delete').addClass('hidden');
          }

        });

        $('#vrow .mybuttons').fadeIn();

        
      },
      error:function(d){
        notice("Error grabbing metafields",true);
      }
    });

    windowResize();

  };


  var panel_editvariantmeta = function(){

    var tdVidInput = $('td.vid input');
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
      var t = $(this);

      $('#vrow').remove();
      if(t.hasClass('active')){ t.removeClass('active');return }
      
      editVariantMetafieldBtn.removeClass('active');
      t.addClass('active');

      var v = t.attr('data-val');
      _data('currentvrow',v);

      $('tr.variant.active').removeClass('active');
      var tp = t.parent().parent().parent();
      var tp_td = tp.find('td').length+1;
      tp.addClass('active').after('<tr id="vrow"><td colspan="'+tp_td+'">'+vbox+'</td></tr>');

      setup_vrow(v);
    });

  };


  var btn_removealltags = function(view){

    if(view !== 'product'){ return true }
    if (document.getElementById('removealltags') !== null){ return true }

    var targetHTML = $('ul.js-tag-list').eq(0).parent();

    if(targetHTML.length){
      targetHTML.append('<a style="margin-top:.75em" id="removealltags" href="#" class="fd-btn btn btn-destroy">Remove all tags</a>');
      $('#removealltags').on('click',function(e){
        e.preventDefault();
        $('ul.next-token-list').eq(0).find('a').click();
      });
    }else{
      notice('ShopifyFD error : btn_removealltags : target html not found',true);
    }

  };


  var flog = function(o){
    /* wrapper for a console - makes it easier to kill off the calls this way. */
    if(_data('debug')){
      console.log(o);
    }
  };


  var fd_modal = function(show,content,title,persist){

    flog('fdmodal');

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
          fd_modal(false);
        });
      }else{
        var mclose = $('<a href="#" class="close-modal"></a>');
        mclose.on('click',function(){
          fd_modal(false);
          return false;
        });
        m.find('header').prepend(mclose).end().fadeIn();
      }
      $('body').append(m);
      
    }else{
      my_fdmodal.off('click').remove();
    }

  };


  var restorebackup = function(id){
    var mycontent = $("iframe:first").contents().find("#tinymce:first")
    var m = _data('m');

    if(m){
      for (var i = 0, len = m.length; i < len; i++) {
        if(m[i].namespace === 'backups'){
        mycontent.html(m[i].value);
        notice('Backup restored');
        return;
      }}
    }else{
      notice('Error, nothing to restore',true);
    }
  };


  var setup_discounts = function(){

    var targetHTML = $(header_ui_title);
    if(!targetHTML.length){ notice('ShopifyFD error : setup_discounts : target html not found',true); return false }

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
    targetHTML.after(u);  

  };


  var setup_single_article = function(){

    var targetHTML = $(selector_next_secondary);

    var headerButtons = $(header_ui_action_bar_links);
    if(targetHTML.length){

      var nextCardSecondary = $(next_item_HTML);
      nextCardSecondary.find('.next-card').append(metafieldloader);
      targetHTML.after(nextCardSecondary);/* .remove() */

      var loadinto = $(selector_mf_content);
      loadmeta(loadinto);


    }else{
      notice('ShopifyFD error : setup_single_article : Metafield target HTML not found',true);
    }

    if(headerButtons.length){
      var c = $('<button/>',{
        'class':'btn action-bar__link btn--link',
        'href':'#'
      }).html('Duplicate').on('click',function(e){
        e.preventDefault();
        var t = $(this);
        $.getJSON(['//', location.host, location.pathname].join('') + '.json', function(data) {
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
              redirect('/admin/blogs/'+d.article.blog_id+'/articles/'+d.article.id);
            },
            error:function(d){
              notice('Error saving',true);
            }
          });

        });

      });

      headerButtons.append(c);

    }else{
      notice('ShopifyFD error : setup_single_article : Header button missing',true);
    }

    if ($('#rte_extra').length === 0){
      $('#article-content_parent:first').append(rte_menu_html);
      setup_rte();
    }


  };


  var setup_blogs = function(){

    targetHTML = $(selector_next_secondary);
    if(!targetHTML.length){ notice('ShopifyFD error : setup_blogs : target html not found',true); return false }

    targetHTML.prepend(metafieldloader);
    var loadinto = $(selector_mf_content);
    loadmeta(loadinto);

  };


  var setupRteBackupBtn = function(){
    var restoreBackupBtn = $('#restorebackup');
    restoreBackupBtn.show().on('click',function(e){
      e.preventDefault();
      restorebackup(_data('omega'));
    });
  };


  var setup_rte = function(){

    /* Run scripts for the real time editor */

    var restoreBackupBtn = $('#restorebackup');
    if(restoreBackupBtn.length){
      if(_data('hasbackup')){
        setupRteBackupBtn();
      }else{
        restoreBackupBtn.hide();
      }
    }

    $('#clearformatting').on('click',function(e){
      e.preventDefault();
      clearformatting();
    });

    $('#clear-html-attributes').on('click',function(e){
      e.preventDefault();
      removeAttributes();
    });
    

    $('#createbackup').on('click',function(e){
      e.preventDefault();
      createbackup(_data('omega'));
    });

    $('#save_images_to_meta').on('click',function(e){
      e.preventDefault();
      save_images_to_meta();
    });

    var rteShowHtml = $('#rte-show-html');
    if(rteShowHtml.length){
      var fullscreenRteBtn = $('<button name="" type="button" class="btn rte-tools__source-btn btn-slim fullscreen-rte-btn"><svg class="next-icon next-icon--color-slate next-icon--size-12"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#next-website"></use></svg></button>');
      fullscreenRteBtn.on('click',function(e){
        e.preventDefault();
        var descriptionRte = document.querySelectorAll('[data-context="descriptionRte"]');
        if(descriptionRte.length){
          descriptionRte[0].classList.toggle('fullscreen-rte')
        }
      })
      rteShowHtml.before(fullscreenRteBtn);
    }
    
  };

  var save_images_to_meta = function(){
    /* Take any images from the rte and save as a metafield */

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

      var url = [location.protocol, '//', location.host, location.pathname,'/metafields.json'].join('');
      if(_data('alpha') === 'articles'){
        url = '/admin/articles/' + _data('omega') + '/metafields.json';
      }
      $.ajax({
          type: "POST",
          url: url,
          dataType: 'json',
          data: metaJSON,
          success: function(d){
            updatedropdown();
            notice('Images saved to metafield');
          },
          error:function(d){
            notice('Error saving',true);
        }
      });
    }else{
      notice('No images found',true);
    }

  };


  var array_unique = function(array){
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
        if(a[i] === a[j])
        a.splice(j--, 1);
      }
    }
    return a;
  };


  var showSkuHeaderCount = function(){

    if(document.getElementsByClassName('sku-count-cell').length){ return }

    var firstGridCell = $('.next-tab__container:first');
    if(!firstGridCell.length){ return false }

    var skuGridCell = $('<div />',{
      'class':'row s-none sku-count-cell'
    });

    $.ajax({
      type: 'GET',
      url: '/admin/settings/general.json',
      dataType: 'json',
      success: function(d){
        var totalSkus = false;
        try {
          _data('shop_settings', d.shop_settings);
          totalSkus = d.shop_settings.total_skus;
          skuGridCell.html(skuNoticeHtml);
        }catch (e) {}

        if(totalSkus){
          var skuNoticeHtml = '<div style="background: #e3e7ea;"class="header-notice">You are using %1 skus</div>';
          skuNoticeHtml = skuNoticeHtml.replace('%1',totalSkus);
          skuGridCell.html(skuNoticeHtml);
          firstGridCell.before(skuGridCell);
        }
      }
    });

  };


  var setup_transfers = function(){
    return false;
  };


  var setup_products_list = function(){

    showSkuHeaderCount();

    var targetHTML = $(header_ui_action_bar_links);

    if(!targetHTML.length){ 
      notice('Error : setup_products_list : html not found',true); 
      return false 
    }

    if($('#showsku').length){ $('#showsku').remove() }

    var a = $('<button/>',{
      'class':'btn action-bar__link btn--link'
    }).html('Show SKUs & ID').on('click',function(e){
      e.preventDefault();
      var p = [];
      var sku =[];
      var a_list = $('#all-products td.name a[href]');

      a_list.each(function(){
        p.push($(this).attr('href').split(/[/]+/).pop());
      });

      if(p.length){
        var t = $(this);
        t.addClass('is-loading disabled');
        var i=0,
        getsku = function(p,i){

          $.ajax({
            type: 'GET',
            url: '/admin/products/'+p[i]+'.json?fields=variants',
            dataType: 'json',
            success: function(d){
              var s = d.product.variants[0].sku,
              v = d.product.variants[0].id,
              skuspan ='';

              if(s || v){
                if(s){skuspan='<span title="SKU" class="sku label badge badge--small badge--left-margin animated fadein">'+s+'</span>'}
                a_list.eq(i).before(skuspan+'<span title="VariantID" class="variant-label badge badge--small badge--left-margin animated fadein">'+v+'</span>');
              }

              if(i+1 < p.length){
                getsku(p,i+1);
              }else{
                notice('SKUs and Variant IDs Loaded');
                t.removeClass('is-loading').text('Data Loaded');
              }

            } 
            
          });

        };

        notice('Loading SKUs and Variant IDs, please wait...');
        getsku(p,i);
      }

    });

    targetHTML.append(a);
  };


  var setup_themes = function(){

    if(typeof app.data.themes === 'undefined'){
      $.ajax({
        type: 'GET',
        url: '/admin/themes.json',
        success: function(d){
          if(d){
            app.data.themes = d.themes;
            for (var i = 0, len = d.themes.length; i < len; i++) {
              if(d.themes[i].role === 'main'){
                app.data.themeId = d.themes[i].id
              }
            }
            setup_themes()
          }
        }
      });
      return
    }

    var getTheme = function(id){
      if(typeof app.data.themes === 'undefined' || typeof id === 'undefined'){ return false }
      id = parseInt(id);
      for (var i = app.data.themes.length - 1; i >= 0; i--) {
        if(app.data.themes[i].id === id){
          return app.data.themes[i];
        }
      }
    }

    var dateFormat = function(a){
      var d = new Date(a);
      return d.toString();
    };
    
    var publishedTitle = $('.published-theme-title');
    var unpublishedTitles = $('.unpublished-theme-title');
    var themeBoxes = $('div.unpublished-box');
    var themeIDs = [];

    for (var i = 0; i < themeBoxes.length; i++) {
      var themeID = themeBoxes[i].id.split('_').pop();
      themeIDs.push(themeID);
      var themeTitle = themeBoxes.eq(i).find('.unpublished-theme-title');
      var themeData = getTheme(themeID);
      var themeDates = '';
      if(themeData){
        themeDates += '<br>Created at: '+ dateFormat(themeData.created_at);
        themeDates += '<br>Updated at: '+ dateFormat(themeData.updated_at);
      }
      themeTitle.after('<div style="font-size:90%;opacity:.5" class="theme-data" data-id="'+themeID+'">Theme ID: '+themeID+themeDates+'</div>');
    };

    if(publishedTitle.length){
      var customiseBtn = $('.published-theme .btn-primary').eq(0); /* for the published theme */
      var customiseHREF = customiseBtn.attr('href');
      if(typeof customiseHREF !== 'undefined'){
        if(customiseHREF.indexOf('/admin/themes')>-1){
          var themeID = customiseHREF.split('/')[3];
          themeIDs.push(themeID);
          var themeData = getTheme(themeID);
          var themeDates = '';
          if(themeData){
          themeDates += '<br>Created at: '+ dateFormat(themeData.created_at);
          themeDates += '<br>Updated at: '+ dateFormat(themeData.updated_at);
          }
          publishedTitle.after('<div style="font-size:90%;opacity:.5" class="theme-data" data-id="'+themeID+'">Theme ID: '+themeID+themeDates+'</div>');
        }
      }
    }

    if(themeIDs.length < 2){ return }

    var target = $(header_ui_action_bar_links); 
    if(!target.length){ return }

    var downloadAll= $('<button/>',{
      'class':'btn action-bar__link btn--link',
      'style':'margin-right: 10px;'
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
      var plural = 1 < themeIDs.length ? 's' :'';
      notice(themeIDs.length + ' export request'+plural+' sent. Check your inbox');
    });
    target.after(downloadAll);


  };


  var setup_link_lists_single = function(v){

    /*
    notice('ShopifyFD for a single menu is currently disabled. Will be back soon.');
    return;
    */

    var targetHTML = $(header_primary_action);
    if(!targetHTML.length){ return false }
    $.ajax({
      type: 'GET',
      url: '/admin/link_lists.json',
      dataType: 'json',
      success: function(d){
        if(d){
          var link_lists = d.link_lists;
          var response = '';
          for (var i = 0, len = link_lists.length; i < len; i++) {
            if(_data('omega') !== link_lists[i].id.toString()){
              response +='<option value="'+link_lists[i].id+'">'+link_lists[i].title+'</option>';
            }
          }
          var llselect = $('<select />',{
            'class':'header-select fadein'
          }).append('<option>Edit other Menu</option>',response).change(function(){
            var v = $(this).val();
            if(v){
               redirect('/admin/link_lists/'+v);
            }
          });

          targetHTML.prepend(llselect);

        }
        
      },
      error:function(d){
        notice('Error loading linklist data',true);
      }
    });

  };


  var setup_link_lists = function(){
      /* Setup the button and actions for link list duplication and creation */

      /*
      notice('ShopifyFD for menus is currently disabled. Will be back soon.');
      return;
      */

      var llf = $('.next-card__section .next-grid__cell--no-flex');
      var create_collection_linklist = function(){

        $.ajax({
            type: 'GET',
            url: '/admin/collections.json?limit='+settings.apiLimit,
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
              notice('Error! Are you sure you have access to collections?',true);
            }
          });

          return false;
        };

        var create_pages_linklist = function(){
          /* get the pages */

          $.ajax({
            type: 'GET',
            url: '/admin/pages.json?limit='+settings.apiLimit,
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
              notice('Error! Are you sure you have access to pages?',true);
            }
          });

          return false;
        };

        var create_vendors_linklist = function(){

          $.ajax({
            type: 'GET',
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

        };

        var create_a_linklist_FIX = function(linklist,v){

          if(typeof v === 'undefined'){ var v = 1 }
          if(typeof linklist === 'undefined'){return}

          $.ajax({
            type: "POST",
            url: '/admin/link_lists',
            data:linklist,
            success: function(d,o,h){

              var loc = h.getResponseHeader('X-XHR-Redirected-To'); /* this is not always sent */
              if(loc){
                var linklistID = loc.split('/').pop();
                if(!isNaN(linklistID)){
                  notice('Link list added');
                  redirect('/admin/link_lists/'+linklistID);
                }else{
                  notice('Error creating linklist - ID not returned',true);
                }
              }else{
                /* if the redirected header is not present we will need to parse the returned html for clues */
                var form = $(d).find('form').eq(0);
                linklistID = form.attr('action').split('/').pop();
                if(!isNaN(linklistID)){
                  notice('Link list added');
                  redirect('/admin/link_lists/'+linklistID);
                }
                
              }

            },
            error:function(){
              notice('Error creating linklist',true);
            }
          });

        };

        var a = $('<a/>',{
          'href':'#',
          'class':'tooltip-bottom tooltip',
          'style':'margin-right:1.5em'
        }).html('<span class="tooltip-container"><span class="tooltip-label">Make a copy of this linklist</span></span>Duplicate').on('click',function(e){
          e.preventDefault();
          var t = $(this);
          var a = t.parent().find('a[href^="/admin/link_lists"]:first');
          if(!a.length){
            notice('Can not copy this linklist. ID was not found',true);
            return;
          }
          
          t.addClass('btn is-loading');
          var linkId = a.attr('href').split('/').pop();

          /* prepare for html loading and parse */
          if(isNaN(linkId)){ return }
          linkId = parseInt(linkId);

          var ll = _data('link_lists');
          var currentList = false;

          for (var i = 0; i < ll.length; i++) {
            if(linkId === ll[i].id){
              currentList = ll[i];
              break;
            }
          }
          
          if(!currentList){ return }

          var makeLinklistFromJson = function(a){
            var form;
            form+='utf8=✓';
            form+='&link_list[title]='+ a.title +' [COPY]';
            form+='&link_list[handle]='+ a.handle +'-copy';
            for (var i = 0; i < a.links.length; i++) {
              form+='&link_list[links][][title]='+ a.links[i].title;
              form+='&link_list[links][][link_type]='+ a.links[i].link_type;
              form+='&link_list[links][][subject_params]='+ (a.links[i].subject_params || '' );
              form+='&link_list[links][][subject_id]='+ (a.links[i].subject_id || '');
              form+='&link_list[links][][subject]='+ a.links[i].subject;
  
            };
            return form;

          };

          create_a_linklist_FIX(makeLinklistFromJson(currentList));
            

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
          type: 'GET',
          url: '/admin/link_lists.json',
          dataType: 'json',
          success: function(d){
            if(d && d.link_lists){
              _data('link_lists',d.link_lists);
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
        
        //var d = $('.section-summary').eq(0),
        var d = $('.ui-annotated-section__description').eq(0);
        var a1 = $('<a/>',{
          'class':'btn tooltip-bottom tooltip fd-btn sst',
          href:'#'
        }).html('<span class="tooltip-container"><span class="tooltip-label">Create a menu with every collection</span></span>Create Collections menu').on('click',function(){
          $(this).addClass('is-loading disabled');
          create_collection_linklist();
          return false;
        }),
        a2 = $('<a/>',{
          'class':'btn tooltip-bottom tooltip fd-btn sst',
          href:'#'
        }).html('<span class="tooltip-container"><span class="tooltip-label">Create a menu with every page</span></span>Create Pages menu').on('click',function(){
          $(this).addClass('is-loading disabled');
          create_pages_linklist();
          return false;
        }),
        a3 = $('<a/>',{
          'class':'btn tooltip-bottom tooltip fd-btn sst',
          href:'#'
        }).html('<span class="tooltip-container"><span class="tooltip-label">Create a menu with all vendors</span></span>Create Vendor menu').on('click',function(){
          $(this).addClass('is-loading disabled');
          create_vendors_linklist();
          return false;
        });

        if(d.length){d.append('<br>',a1,'<br>',a2,'<br>',a3);}

        var addLinkListBtn = $('.ui-annotated-section__description a[href="/admin/link_lists/new"]');
        if(addLinkListBtn.length){

          var linklistEditButtons = $('#link_lists .next-grid--no-outside-padding a:last-child');
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
                  'style':'width: 100%'
                }).on('change',function(){

                  var t = $(this);
                  var v = t.val();

                  if(v.length){
                    redirect(v);
                  }

                }).html('<option value="">Select Menu</option>'+optionAppend);

                var div = $('<div />',{'class':'sst'});
                div.append('<label class="next-label">Select a menu to quickly edit.</label>',selectLinkList);
                addLinkListBtn.after(div);
              }

            }

          }

        }

  };


  var bulk_redirects = function(d){

    if(typeof d === 'undefined'){ return }
    if(!d.length){ return }

    var redir = d[0];
    if (typeof redir !== 'object') { return }

    var redirectTextareaLog = $('textarea[name="bulk-redirect-log"]');
    var logVal = redirectTextareaLog.val();

    $.ajax({
      type: "POST",
      url: '/admin/redirects.json',
      dataType:'json',
      data:redir,
      success: function(data){
        logVal+=data.redirect.path + ', ' + data.redirect.target + ', success\n';
        redirectTextareaLog.val(logVal);
        d.shift();
        if(d.length > 0){
          bulk_redirects(d);
        }else{
          notice('Bulk redirection additions complete');
        }
      },
      error: function(data){
        logVal+=redir.redirect.path + ', ' + redir.redirect.target + ', ' + data.responseJSON.errors.path[0] +'\n';
        redirectTextareaLog.val(logVal);
        d.shift();
        if(d.length > 0){
          bulk_redirects(d);
        }else{
          notice('Bulk redirection additions complete');
        }
      }

    });
    
  };


  var setup_redirects = function(){

      if(document.getElementsByClassName('bulk-redirect-panel').length){ return }

      var targetHTML = $(header_secondary_action);
      var nextCard = $('.next-card.has-bulk-actions');
      if(!nextCard.length){ nextCard = $('#url_redirects') }

      if(!nextCard.length){ 
        notice('Could not add bulk redirect panel',true);
        return false;
      }

      var redirectPanel = $('<div class="bulk-redirect-panel next-grid next-grid--outer-grid" style="border-bottom: 1px solid #DADADA;margin-bottom: 1em;padding-bottom: 1em;"><div class="next-grid__cell next-grid__cell--third"><h2 class="next-heading">Bulk Redirects</h2><p>To bulk add redirects manually add the path (old url) and target (new url) separated with a comma to the input box. As with any bulk action, run a small sample first before processing 1000s of items.<br><br></p><ul><li>One redirect per line.</li><li>A log will show progress and any errors</li></ul></div><div class="next-grid__cell"><h2 class="next-heading">Paste URLs</h2><p>An example of the redirect is shown below:<br><code>http://freakdesign.com.au/old-url,http://freakdesign.com.au/new-url</code><br>or<br><code>/old-url,/pages/new-url</code></p><br><textarea name="bulk-redirect-paste"></textarea><br><br><button class="redirect-process btn fd-btn btn-primary">Add Redirects</button> <button class="redirect-reload btn fd-btn">Reload page</button><div class="fadein hide bulk-redirect-log"><br><br><h2 class="next-heading">Activity Log</h2><textarea name="bulk-redirect-log"></textarea></div></div></div>');
      var redirectButton = redirectPanel.find('.redirect-process');
      var reloadButton = redirectPanel.find('.redirect-reload');
      var redirectTextarea = redirectPanel.find('textarea[name="bulk-redirect-paste"]');
      var redirectTextareaLog = redirectPanel.find('textarea[name="bulk-redirect-log"]');

      reloadButton.on('click',function(e){
        e.preventDefault();
        redirect('/admin/redirects?'+Math.floor(Math.random() * 1000000));
      });

      redirectButton.on('click',function(e){
        e.preventDefault();
        var redirectVal = redirectTextarea.val().replace(/ /g, '');

        if(redirectVal.length < 4){ return }
        var redirectArray = redirectVal.split("\n");

        if(redirectArray.length){
          var redirectData = [];
          for (var i = 0; i < redirectArray.length; i++) {
            var v = redirectArray[i].split(',');
            if(v.length === 2){

              v[0] = v[0].trim();
              v[1] = v[1].trim();

              if(v[1].substring(0,1) !== '/' && v[1].substring(0,4) !== 'http' ){
                v[1]='/'+v[1];
              }

              var r = {
                'redirect': {
                  'path': v[0],
                  'target': v[1]
                }
              };
              redirectData.push(r);
            }
          };
          if(redirectData.length){
            redirectTextareaLog.val('').parent().removeClass('hide');
            bulk_redirects(redirectData);
          }
        }
      });

      nextCard.prepend(redirectPanel);
  };


  var setup_collections = function(){

      showSkuHeaderCount();
      jsonEndpointShow(true);
      _data('collections',false);
      
      var targetHTML = $(header_ui_title);
      if(!targetHTML.length){ notice('ShopifyFD error : setup_collections : target html not found'); return }
        
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
              type: 'GET',url: '/admin/collections.json?limit='+settings.apiLimit,dataType: 'json',
              success: function(d){
              if(d.collections.length){
                _data('collections',d);
                for (var i = d.collections.length - 1; i >= 0; i--) {
                  var collectionTable = $('#collections-results'),
                  collectionLink = collectionTable.find('a[href="/admin/collections/'+d.collections[i].id+'"]:last');
                  if(collectionLink.find('span').length === 0){
                    collectionLink.append('<span class="sku label badge badge--small badge--left-margin">'+d.collections[i].products_count+'</span>');
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
            fd_modal(true,bulk_tags,'Edit tags for all products in a collection',true);
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
                a3 = array_unique(a1.concat(a2))+'',
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
                type: 'GET',
                url: '/admin/products.json?collection_id='+c.val()+'&fields=id,tags',
                dataType: 'json',
                success: function(d){
                  b.addClass('disabled'); 
                  put_tags(d,0,t.val(),function(){
                    notice('Done. Tags have been added');
                    b.text('Update tags').removeClass('disabled');
                  });
                }
                });
              }


              if(a.val()==='purge' || a.val()==='set'){

                $.ajax({
                type: 'GET',
                url: '/admin/products.json?collection_id='+c.val()+'&fields=id',
                dataType: 'json',
                success: function(d){
                  b.addClass('disabled'); 
                  set_tags(d,0,t.val(),function(){
                    notice('Done.');
                    b.text('Update tags').removeClass('disabled');
                  });
                }
                });
              }

              if(a.val()==='remove'){

                $.ajax({
                type: 'GET',
                url: '/admin/products.json?collection_id='+c.val()+'&fields=id,tags',
                dataType: 'json',
                success: function(d){
                  b.addClass('disabled'); 
                  delete_tags(d,0,t.val(),function(){
                    notice('Matched tags have been removed.');
                    b.text('Update tags').removeClass('disabled');
                  });
                }
                });
              }

            }else{ notice('Choose a collection',true); }

              return false;

            });

            a.hide();

            $.ajax({
              type: 'GET',url: '/admin/collections.json?limit='+settings.apiLimit,dataType: 'json',
              success: function(d){
                if(d.collections.length){
                  _data('collections',d);
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
      targetHTML.after(u);


  };


  var setup_copypaste = function(){

      /*
                _                                                       _
       ___  ___| |_ _   _ _ __     ___ ___  _ __  _   _ _ __   __ _ ___| |_ ___
      / __|/ _ \ __| | | | '_ \   / __/ _ \| '_ \| | | | '_ \ / _` / __| __/ _ \
      \__ \  __/ |_| |_| | |_) | | (_| (_) | |_) | |_| | |_) | (_| \__ \ ||  __/
      |___/\___|\__|\__,_| .__/   \___\___/| .__/ \__, | .__/ \__,_|___/\__\___|
                         |_|               |_|    |___/|_|

      Save a metafield to local storage. 

      */
      if(!supportsHTML5Storage()){ return }

      var a = $(metafield_copybox),
      p = a.find('#fd_pastemetafields'),
      q = a.find('#fd_whatmetafields');

      a.find('#fd_copymetafields').on('click',function(e){
        e.preventDefault();
        if('undefined' !== typeof _data('m')){
          if(_data('m').length > 0){
            localStorage["metafieldCopy"] = JSON.stringify(_data('m'));
            notice(_data('m').length + " Metafields copied");
            p.show();
            q.show();
          }else{
            notice('No metafields to copy',true);
          }

        }else{
          p.hide();
          q.hide();
        }
      });

      q.on('click',function(e){

        e.preventDefault();

        if('undefined' !== typeof localStorage["metafieldCopy"]){

          var h = '';
          var m = false;
          try {
            m = JSON.parse(localStorage["metafieldCopy"]);
          } catch (e) {
            return false;
          }
          
          if(!m){ return }

          for (var i = 0, len = m.length; i < len; i++) {
            var metafieldValue = stripHTML(m[i].value);
            h+= '<p><strong>'+m[i].namespace+'.'+m[i].key+' ('+m[i].value_type+')</strong><br>'+metafieldValue+'</p><hr>';
          }
          fd_modal(true,h,'In the virtual clipboard...');

        }

      });

      p.on('click',function(e){

        e.preventDefault();
        
        if('undefined' !== typeof localStorage["metafieldCopy"]){
          var copyData = JSON.parse(localStorage["metafieldCopy"]);
          if(copyData.length){
            _data('m-copy',copyData);
            save_metafield_queue(_data('m-copy'),0);
          }else{
            notice('Nothing to paste',true);
          }
        }else{
          notice('Nothing to paste',true);
        }   

      });

      if('undefined' === typeof localStorage["metafieldCopy"]){
        p.hide();
        q.hide();
      }

      $('.metafield-content').after(a);

  };


  var save_metafield_queue = function(q,i){

    if(typeof q === 'undefined' || typeof i === 'undefined'){ return false }
    notice('Pasting metafields...');

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
      url: [location.protocol, '//', location.host, location.pathname,'/metafields.json'].join(''),
      dataType: 'json',
      data: metaJSON,
      success: function(d){
        if(i+1 < q.length){
          save_metafield_queue(q,++i);
        }else{
           updatedropdown();
          notice("All metafields pasted!");
        }
      }
    });

  };


  var deleteProductImages = function(id,callback){
    if(typeof id === 'undefined' || isNaN(id)){ return false }
    $.ajax({
      type: "PUT",
      url: '/admin/products/'+ id +'.json',
      dataType: 'json',
      data: {'product': {'id': id,'images': ['']}},
      success: function(d){
        $('#product-images').parent().remove();
        notice('Images deleted. Reload product to check...');
      }
    }); 
  };

  var add_sitemap_button = function(){

    if(document.getElementsByClassName('seo-hide-button').length){ return }
    var target = $('#ChannelsPublishingPanel');
    if(!target.length){ console.warn('add_sitemap_button(): target not found');return }

    var seohideBtn = $('<a />',{
      'class':'btn fd-btn seo-hide-button'
    }).text(translation.hide_from_sitemap).on('click',function(e){

      e.preventDefault();

      var t = $(this);
      var metafieldId = t.attr('data-id');

      if(metafieldId){
        $.ajax({
          type: "DELETE",
          url: ['//', location.host, location.pathname].join('')+'/metafields/'+metafieldId+'.json',
          success: function(d){
            updatedropdown();
          },
          error:function(d){
            notice('Failed to delete',true);
          }
        });
      }else{
        $.ajax({
          type: "POST",
          url: ['//', location.host, location.pathname].join('')+'/metafields.json',
          dataType: 'json',
          data: {
          "metafield": {
            'namespace': 'seo',
            'key': 'hidden',
            'value': 1,
            'value_type': 'integer'
          }
          },
          success: function(d){
             updatedropdown();
          },
          error:function(){
            notice("Failed to save metafield",true);
          }
        }); 
      }

      });
      
      var section = $('<section class="ui-card__section"><div class="ui-type-container"><div class="ui-stack ui-stack--wrap ui-stack--alignment-center"><div class="ui-stack-item ui-stack-item--fill"><h3 class="ui-subheading">Sitemap</h3><p style="margin:1em 0">Add metafield to remove this product from the sitemap. It is <b>very</b> important that you <a href="https://help.shopify.com/api/tutorials/updating-seo-data#hide-an-object-from-search-engines-and-sitemaps" target="_blank">understand</a> what doing this means. If you don\'t, leave it alone.</p></div></div></div></section>');
      section.find('.ui-stack-item').append(seohideBtn);
      target.append(section);


  };

  var setup_products = function(){

      /*
                _                                     _            _
       ___  ___| |_ _   _ _ __    _ __  _ __ ___   __| |_   _  ___| |_ ___
      / __|/ _ \ __| | | | '_ \  | '_ \| '__/ _ \ / _` | | | |/ __| __/ __|
      \__ \  __/ |_| |_| | |_) | | |_) | | | (_) | (_| | |_| | (__| |_\__ \
      |___/\___|\__|\__,_| .__/  | .__/|_|  \___/ \__,_|\__,_|\___|\__|___/
                         |_|     |_|

      */

      clearInterval(_data('autosave'));
      
      jsonEndpointShow(true);

      if(!document.getElementsByClassName('next-card-metafield').length){
        var targetHTML = $(selector_sidebar_cell);
        if(!targetHTML.length){ targetHTML = $(selector_sidebar_cell_alt) }
        if(targetHTML.length){
          targetHTML.prepend(metafieldloader);
          var loadinto = $(selector_mf_content);
          loadmeta(loadinto);
        }else{
          notice('ShopifyFD error : setup_products : Metafield target HTML not found',true);
        }
      }
      
      /* PRODUCT SWITCHER */
      var targetHTMLRightMenu = $(header_ui_action_bar_links);

      if(targetHTMLRightMenu.length && !document.getElementsByClassName('product-switcher').length){
        $.ajax({
          type: 'GET',
          url: '/admin/products.json?limit='+settings.apiLimit+'&fields=id,title',
          dataType: 'json',
          success: function(d){
            if(d){
              var products = d.products;
              var response = '';
              var productLength = products.length;
              if(productLength > settings.apiLimit){ return true }

              for (var i = 0; i < productLength; i++) {
                if(_data('omega') !== products[i].id.toString()){
                  response +='<option value="'+products[i].id+'">'+products[i].title+'</option>';
                }
              }
              var pselect = $('<select />',{
                'class':'product-switcher header-select fadein'
              }).append('<option selected>Edit other Product</option>',response).change(function(){
                var v = $(this).val();
                if(v){ redirect('/admin/products/'+v); }
              });
              /* pselect.find('option').sort(selectSort).appendTo(pselect); */

              targetHTMLRightMenu.append(pselect);

            }
            
          },
          error:function(d){
            notice('Error loading linklist data',true);
          }
        });
      }

      /* FAST REMOVE FROM COLLECTIONS */
      var collectionPanel = $('#product-collections');
      if(collectionPanel.length){
        var collectionRemoveButtons = collectionPanel.find('.product-collections-list a.btn');
        if(collectionRemoveButtons.length){
          var removeFromAll = $('<a />',{
            'class':'btn fd-btn btn-destroy'
          }).text('Remove from all').on('click',function(e){
            e.preventDefault();
            collectionRemoveButtons.trigger('click');
          })
          collectionPanel.append(removeFromAll);
        }
      }else{ console.warn('collectionPanel not found'); }

      /* variant helpers */
      if(!document.getElementsByClassName('additional-product-actions').length){

        var productOuterVariants = $('#product-outer-variants');
        var additionalSection = $('<div class="additional-product-actions ui-layout__item"><div class="next-card"><div class="next-card__header"><div class="wrappable"><div class="wrappable__item"><h2 class="next-heading">Additional actions</h2></div></div></div><section class="next-card__section additional-product-content"></section></div>');
        var additionalSectionContent = additionalSection.find('.additional-product-content');


        /* DELETE ALL IMAGES */
        if(!document.getElementsByClassName('remove-all-images').length){
          var removeImagesBtn = $('<a />',{
            'class':'btn btn-destroy tooltip tooltip-bottom'
          }).html('Remove all images<span class="tooltip-container"><span class="tooltip-label">Instant, and no undo</span></span>').on('click',function(e){
            e.preventDefault();
            var t = $(this);
            var id = window.location.pathname.split('/').pop()
            deleteProductImages(id);
          });
          additionalSectionContent.append(removeImagesBtn);
        }
        productOuterVariants.after(additionalSection);
      }


      

      /* RTE ADD ON BUTTONS */
      if (document.getElementById('rte_extra') === null){

        $('#product-description_iframecontainer').eq(0).after(rte_menu_html);
        $('#rte_extra').append(autosave_html);

        setup_rte();

        $('#autosave').on('click',function(){

          var t = $(this);

          if(t.hasClass('active')){

            notice("Autosave disabled");
            clearInterval(_data('autosave'));
            t.removeClass('active');
          }else{
            notice("Autosave enabled");
            t.addClass('active');
            _data('autosave',setInterval(function(){
              if(window.location.href.indexOf('/admin/products/')>-1){
                if(!createbackup(_data('omega'),true)){
                  clearInterval(_data('autosave'));
                }
              }else{
                clearInterval(_data('autosave'));
              }
            },30000));
          }

          return false;
        });

      }

      /* REMOVE ALL TAGS  */
      btn_removealltags('product');


      var inventorySummary = $('#product-outer-variants');

      /* INVENTORY AND VARIANTS PANEL */
      var variants_ids = variants_ids || {};
      if(!document.getElementsByClassName('bulk-variants-section').length){

        if(inventorySummary.length){

          var bulkPriceEdit = $('<div />',{
            'class':'next-card__section fadein hide bulk-variants-section',
            'style':'background: #f4f5f7;'
          });

          var toggleBulkPriceEdit = $('<a />',{
            'class':'btn--link',
            'style':'margin-left:1em;margin-top: -3px;'
          }).text('Bulk Edits').on('click',function(e){
            e.preventDefault();
            bulkPriceEdit.toggleClass('hide');
          });

          bulkPriceEdit.html('<h2>Edit all variants</h2><p style="margin: .5em 0 1em;font-size: 12px;border-bottom: 1px solid #ccc;padding-bottom: .5em;">Bulk Editing comes with risks. Proceed with caution.</p><label style="margin-top:1.5em">Set Compare at Price<br><small>0 will clear the compare at price</small></label><input type="number" style="width:50%" value="0"> <a class="bulk-compare-save tooltip tooltip-bottom btn btn-slim fd-btn"><span class="tooltip-container"><span class="tooltip-label">Save Compare at Price for all variants</span></span>Save</a>');
          var bulkCompareSaveBtn = bulkPriceEdit.find('a.bulk-compare-save');
          var bulkCompareFields = bulkPriceEdit.find('input');
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
                      updateVariant(data,0,isDone);
                    }
                  }else{
                    notice('Unexpected variant found.',true);
                  }
                }else{
                  notice('You only have 1 variant. No need to bulk edit',true);
                }
              }
            }

          });

          inventorySummary.find('.ui-card:first').append(bulkPriceEdit);

        }else{
          notice('ShopifyFD error : setup_products : Inventory target HTML not found',true);
        }
      }



      /* PUSH VARIANT ID AND METAFIELD ACTIONS */
      if(!document.getElementsByClassName('edit-variant-metafield').length){
        var variantCellTarget = $('#product-inner-variants th:last-child');
        if(variantCellTarget.length){

          variantCellTarget.before('<th class="variants-table__heading--indent-right tr">ID</th>');

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
            var variantEditCheck = $('input#variant_ids_'+variant_id);
            var variantEditMetafieldBtn = $('<a />',{
              'class':'edit-variant-metafield',
              'data-val':variant_id
            }).html('<span><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="16" height="16" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"><path fill="currentColor" d="M0 0v12h12V0H0zM11 11H1V1h10V11zM5 9h2V7h2V5H7V3H5v2H3v2h2V9z"></path></svg></span>');

            variants_ids['variant_'+i] = {'id':variant_id};
            variantEditCheck.after(variantEditMetafieldBtn);

            var beforeHTML = '<td class="vid new-variants-table__cell"><input class="mock-edit-on-hover tr" data-action="selectall" data-val="'+variant_id+'" type="text" value="'+variant_id+'" /></td>';
            $(this).find('td:last-child').before(beforeHTML);

          }).promise().done(function(){
            panel_editvariantmeta();
            windowResize();
          });
          /*
          $('.table__cell--sticky--right').attr('style','height: 53px; width:110px');
          $('.table-wrapper-sticky').attr('style','padding-left: 50px; padding-right: 110px;');
          */
        }else if(!document.getElementsByClassName('vbox-single-card').length){
          /* single variant product */
          if(document.getElementById('product_variant_id') != null){
            var variantID = document.getElementById('product_variant_id').value;
            $('#product-outer-variants').after(vbox_single_html);
            setup_vrow(variantID);
          }
        }
      }


      /* COLLECTION LIST */
      if(!document.getElementsByClassName('set-preferred-collection').length){

        var tpc = $('ul.product-collections-list');
        if(tpc.length){
          tpc.find('li').each(function(){
            var t = $(this);
            var collectionID = t.find('a').eq(0).attr('href').split('/').pop();
            var a=$('<a/>',{
              'class':'tooltip tooltip-bottom set-preferred-collection',
              'href':'#'
            }).html('<span class="next-icon next-icon--10" style="background:#21C2A8;left: -.5em;"></span><span class="tooltip-container"><span class="tooltip-label">Set a metafield with this collection handle</span></span>').on('click',function(e){
              e.preventDefault();
              if(collectionID !== 'undefined'){
                $.ajax({
                  type: 'GET',
                  url: '/admin/collections/'+collectionID+'.json?fields=handle',
                  dataType: 'json',
                  success: function(data){
                    if (typeof data !== 'undefined'){
                      var collectionHandle = data.collection.handle;
                      $.ajax({
                        type: "POST",
                        url: ['//', location.host, location.pathname].join('') +'/metafields.json',
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
                          updatedropdown();
                          notice('Preferred collection metafield saved');
                        },
                        error: function(d){
                          var err = JSON.parse(d.responseText);
                          notice(err.errors.value[0],true);
                        }
                      }); 
                    }
                  },
                  error: function(){
                    notice('Failed to load collection',true);
                  }
                });
              }
            });

            t.find('div.next-grid:first').prepend(a);

          });
        }
      }

      add_sitemap_button();

      /* add in buttons for additional bulk variant updates */
      if(!document.getElementsByClassName('edit-selected-weights').length){
        var bulkpanel = $('div.bulk-actions').eq(0);
        if(bulkpanel.length){

          var a=$('<a/>',{
            'href':'#',
            'class':'btn fd-btn btn-slim hide edit-selected-weights',
            'style':'padding-left:.5em'
          }).text('Edit selected weights').on('click',function(){

            fd_modal(true,'<label>New weight (grams)</label><input class="half" min="0" type="number" data-action="update-variant-weight" /><a data-action="update-variant-weight" href="#" class="btn btn-slim">Save</a><br><br><small>Note: You may need to reload this page before Shopify will show the new weight in the dashboard.</small>','Edit weight',true);

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
                          notice('Weight updated');
                          a.removeClass('is-loading').text(translation.save);
                        } 
                      }
                    });
                  };

                  a.addClass('is-loading').text('');
                  update_weight(0,v);

                }else{
                  notice('Did you set a weight?',true);
                }
                return !1;

              });

            }

            return !1;

          });

          bulkpanel.append(a);

          /* check to see if we need to show our buttons */
          $('tr.variant input[type="checkbox"]').on('change',function(){
            var l = $('tr.variant input[type="checkbox"]:checked').length;

            if(l > 1){
              a.removeClass("hide");
            }else{
              a.addClass("hide");
            }

          });

        }
      }

      if(inventorySummary.length){
        if(typeof variants_ids ==='object'){
          if(Object.keys(variants_ids).length > 1){
            inventorySummary.find('.ui-card__header .btn--link:last').after(toggleBulkPriceEdit)
          }
        }
      }

  };


  var setup_variants = function(){
    jsonEndpointShow(true);
    var targetHTML = $(variant_edit_card);
    if(!targetHTML.length){ return false }
    targetHTML.after(metafieldloader);
    loadmeta($(selector_mf_content));
  };


  var setup_bulk_editor = function(){
    if(!window.location.search.length){ return }
  }

  var setup_pages = function(){

    var targetHTML = $(selector_next_secondary);
    if(targetHTML.length){
      var nextCardSecondary = $(next_item_HTML);
      nextCardSecondary.find('.next-card').append(metafieldloader);
      targetHTML.after(nextCardSecondary);
      loadmeta($(selector_mf_content));
    }else{
      notice('ShopifyFD error : setup_pages : Metafield target HTML not found',true);
    }

    /* RTE ADD ON BUTTONS */
    if ($('#rte_extra').length === 0){
      $('#page-content_iframecontainer').eq(0).after(rte_menu_html);
      setup_rte();
    }
    
    /* PAGE SWITCHER */
    var targetHTMLRightMenu = $(header_ui_action_bar_links);

    if(targetHTMLRightMenu.length){
      $.ajax({
        type: 'GET',
        url: '/admin/pages.json?limit='+settings.apiLimit+'&fields=id,title',
        dataType: 'json',
        success: function(d){
          if(d){
            var pages = d.pages;
            var response = '';
            for (var i = 0, len = pages.length; i < len; i++) {

              if(_data('omega') !== pages[i].id.toString()){
                response +='<option value="'+pages[i].id+'">'+pages[i].title+'</option>';
              }
            }
            var pageSelect = $('<select />',{
              id:'shopifyjs_llselect',
              'class':'header-select'
            }).append('<option selected>Edit other Page</option>',response).change(function(){
              var v = $(this).val();
              if(v){
                 redirect('/admin/pages/'+v);
              }
            });
            pageSelect.find('option').sort(selectSort).appendTo(pageSelect);
            targetHTMLRightMenu.after(pageSelect);

          }
          
        },
        error:function(d){
          notice('Error loading page data',true);
        }
      });
    }else{
      notice('ShopifyFD error : setup_pages : Page switcher target HTML not found',true);
    }

  };


  var isJson = function(a) {
    try { JSON.parse(a) } catch (e) { return false }
    return true;
  }

  var setup_shipping_zones = function(){

    var getShippingZones = function(callback){
      $.ajax({
        type: "GET",
        dataType:'json',
        url: '/admin/settings/shipping_zones.json',
        success: function(d){
          app.data.shipping_zones = d.shipping_zones;
          if(typeof callback === 'function'){ callback(d) }
        },
        error: function(d){
          notice('Error getting JSON rates',true);
        }
      });
    };

    var ratesCheck = function(){
      var whitelist = ['price','weight'];
      for (var i = 0; i < whitelist.length; i++) {
        if( !isJson(localStorage['rates_'+whitelist[i]]) ){ continue }
        $('button.paste-rates[data-type="'+whitelist[i]+'"]')[0].disabled = false;
      };
    };

    var getZone = function(id,type){
      for (var i = 0; i < app.data.shipping_zones.length; i++) {
        if(app.data.shipping_zones[i].id === parseInt(id)){ 
          if(typeof type === 'undefined'){
            return app.data.shipping_zones[i]   
          }else{
            return app.data.shipping_zones[i][type+'_based_shipping_rates']
          }
          
        }
      };
      return false
    }


    getShippingZones(function(d){

      if(!supportsHTML5Storage()){ return }

      var whitelist = ['price','weight'];
      var buttons = {};
      var rateRows = {};

      var fields = {
        price:'<input type="hidden" name="shipping_zone[rates][][min_order_subtotal]" value="%min_order_subtotal%""><input type="hidden" name="shipping_zone[rates][][max_order_subtotal]" value="%max_order_subtotal%">',
        weight:'<input type="hidden" name="shipping_zone[rates][][weight_low]" value="%weight_low%"><input type="hidden" name="shipping_zone[rates][][weight_high]" value="%weight_high%">'
      }

      var priceRowHtml = ['<tr class="pasted-rate" style="opacity:.5;font-style:italic"><td><input name="shipping_zone[rates][][name]" value="%name%"></td><td>%range%</td><td>%amount%</td><td class="shipping-rate__actions type--right"><input type="hidden" name="shipping_zone[rates][][id]" value=""><input type="hidden" name="shipping_zone[rates][][price]" value="%price%"><input type="hidden" name="shipping_zone[rates][][type]" value="%type%">','Pasted<button class="btn btn--plain btn-remove-paste"><svg class="next-icon next-icon--size-10 next-icon--slate-lighter"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#next-remove"></use></svg></button></td></tr>'];

      var primaryButton = $('.header__primary-actions .btn-primary');

      var makeRateRow = function(rate,type){
        var row = priceRowHtml.join(fields[type]);

        for (var key in rate) {
          if (rate.hasOwnProperty(key)) {
            if(['max_order_subtotal','weight_high'].indexOf(key)>-1 && !rate[key]){
                row = row.replace('%'+key+'%','') ;
            }else{
              row = row.replace('%'+key+'%',rate[key])  
            }
          }
        }

        /* temp removal of range until we add that logic */
        var range = '';
        if(type === 'weight'){
          range = parseInt(rate.weight_low).toFixed(2) + ' ' + Shopify.shop.settings.defaultWeightUnit + ' - ' + parseInt(rate.weight_high).toFixed(2) + ' ' + Shopify.shop.settings.defaultWeightUnit;
        }else if(type === 'price'){
          if(rate.max_order_subtotal){
            range = Shopify.shop.settings.money_symbol + rate.min_order_subtotal + ' - ' + Shopify.shop.settings.money_symbol + rate.max_order_subtotal;
          }else{
            range = Shopify.shop.settings.money_symbol + rate.min_order_subtotal + ' and up';
          }
        }

        row = row.replace('%range%',range); 
        row = row.replace('%type%',type); 

        if(parseInt(rate.price) === 0){
          row = row.replace('%amount%','Free');
        }else{
          row = row.replace('%amount%',Shopify.shop.settings.money_symbol + rate.price);
        }
        
        return row;
      }

      for (var i = 0; i < whitelist.length; i++) {

        buttons[whitelist[i]] = $('button[data-bind-event-click="'+ whitelist[i] +'BasedShippingRateModal.open(), '+ whitelist[i] +'BasedShippingRateModal.new()"]');
        rateRows[whitelist[i]] = $('.table-wrapper[data-bind-show="'+ whitelist[i] +'BasedShippingRatesViewer.hasRates()"] .js-rates-container');

        if(!buttons[whitelist[i]].length){ continue }
        if($('.copy-paste-rates[data-type="'+ whitelist[i] +'"]').length){ continue }

        buttons[whitelist[i]].before('<button data-type="'+ whitelist[i] +'" class="copy-rates btn">Copy</button> <button data-type="'+ whitelist[i] +'" class="paste-rates btn" disabled>Paste</button> ');

      };

      var copyButtons = $('button.copy-rates');
      var pasteButtons = $('button.paste-rates');

      copyButtons.on('click',function(e){
        e.preventDefault();
        var t = $(this);
        var type = t.data('type');
        t.blur();
        var ao = alphaOmega();
        localStorage['rates_'+type] = JSON.stringify(getZone(ao[1],type));
        ratesCheck();
      });

      pasteButtons.on('click',function(e){

        e.preventDefault();
        var t = $(this);
        var type = t.data('type');
        t.blur();

        if(!isJson(localStorage['rates_'+type])){ return }
        if(typeof rateRows[type] === 'undefined'){ return }

        var rates = JSON.parse(localStorage['rates_'+type])
        if(!rates.length){ return }

        var ao = alphaOmega();
        var section = $('div[data-bind-show="'+type+'BasedShippingRatesViewer.hasRates()"]');

        section[0].classList.remove('hide');
        var subdued = $('div[data-bind-show="!'+type+'BasedShippingRatesViewer.hasRates()"]');
        if(subdued.length){
          subdued[0].classList.add('hide');
        }
        
        for (var i = 0; i < rates.length; i++) {
          rateRows[type].append(makeRateRow(rates[i],type))
        };

        $('.btn-remove-paste').off('click').on('click',function(e){
          e.preventDefault();
          $(this).parents('.pasted-rate').remove();
        });        

        if(primaryButton.length){
          primaryButton[0].disabled = false;
          primaryButton[0].classList.remove('disabled');
        }

      });
    
      ratesCheck();

    });

  };

  var setup_shipping = function(){
    $('.ui-annotated-section__annotation .ui-annotated-section__description').eq(2).append('<br><br><p>Shipping rates copy and paste has moved into each shipping zone.</p>');
    return;
  };


  var setup_custom_collections = function(){

    var targetHTML = $(selector_next_secondary); 
    var headerButtons = $(header_ui_title_bar);

    if(targetHTML.length){

      targetHTML.prepend(metafieldloader);
      var loadinto = $(selector_mf_content);
      loadmeta(loadinto);

      if ($('#rte_extra').length === 0){
        $('#collection-description_iframecontainer').eq(0).after(rte_menu_html);
        setup_rte();
      }

    }else{
      notice('ShopifyFD error : setup_custom_collections : target html not found',true);
    }

    if(headerButtons.length){
      var u = $('<ul/>',{
      'class':'segmented',
      'id':'copy-object'
      }),
      l = $('<li/>'),
      c = $('<a/>',{
        'class':'fd-btn btn btn-separate',
        'href':'#'
      }).html('Duplicate').on('click',function(e){
        e.preventDefault();
        var t = $(this);
        t.addClass('disabled is-loading');

        $.getJSON(['//', location.host, location.pathname].join('') +'.json', function(data) {

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
                    redirect('/admin/collections/'+id);
                  }
                }
                catch (e) {/* error trap */}
              },
              error:function(){
                notice('Error duplicating.', true);
              }
            });

          }else{


            var count = 0;
            var id = window.location.pathname.split('/').pop();
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

              notice('Duplicating collection, please wait...');

              $.ajax({
                type:'GET',
                url:'/admin/collects.json?limit='+settings.apiLimit+'&fields=product_id&page='+page+'&collection_id=' + id,
                success: function(d){

                  collects = collects.concat(d.collects);

                  if(page*settings.apiLimit > count){

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
                            redirect('/admin/collections/'+id);
                          }
                        }
                        catch (e) {/* error trap */}
                      },
                      error:function(){
                        notice('Error duplicating.', true);
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
      notice('ShopifyFD error : setup_single_article : Header button missing',true);
    }
  };


  var downloadBlob = function(blobData,filename){
    if(typeof filename === 'undefined'){ var filename = 'blob-'+ Math.floor(Date.now() / 1000) +'.txt' }

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blob = new Blob(["\ufeff",blobData],{type:'text/plain'}),
    link = window.URL.createObjectURL(blob);
    a.href = link;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(link);

  };


  var setup_files = function(){

    var targetHTML = $(header_ui_title);
    if(!targetHTML.length){ return }

    var u = $('<ul/>',{
      'class':'segmented',
      'id':'get_all_images'
    });
    var l = $('<li/>');
    var a = $('<a/>',{
      'class':'btn',
      'href':'#',
      'style':'margin-left:1em'
    }).html('Download file list').on('click',function(){

      var t = $(this);
      
      (function(){
        var fileArray = [];
        t.addClass('is-loading').attr('style','margin-left:1em;text-indent: -9999px;');
        var getFiles = function(url){
          if(typeof(url) === 'undefined'){ var url = '/admin/settings/files' }
          $.ajax({
            url: url,
            success: function(d){

              var html = $(d);
              var fields = html.find('.next-input.next-input--readonly');
              for (var i = 0; i < fields.length; i++) {
                fileArray.push(fields[i].value);
              };

              var next = html.find('#assets-table').next('.next-card__section').find('a:last');
              var nextUrl = next.length ? next[0].href : '';

              if(nextUrl.indexOf('direction=next')>-1){
                getFiles(nextUrl);
              }else{
                t.removeClass('is-loading').removeAttr('style');
                if(fileArray.length){
                  downloadBlob(fileArray,'files-list-'+ Math.floor(Date.now() / 1000) +'.txt');
                }else{
                  notice('No files exist. Nothing to list.',true)
                }
              }

            }
          });
        }
        getFiles();
      })();

      return false;

    });

    l.append(a);
    u.append(l);
    targetHTML.after(u);
    
  };


  var setup_settings_account = function(){
      var section = '<section class="ui-annotated-section"><div class="ui-annotated-section__annotation"><div class="ui-annotated-section__title"><h2 class="next-heading next-heading--no-margin">Purge / Delete all site content</h2></div><div class="ui-annotated-section__description"><p>Delete all content on the store to start fresh</p></div></div><div class="ui-annotated-section__content"><div class="next-card"><div class="next-card__section"><p>Coming soon...</p></div></div></div></section>';
      $('.ui-annotated-section:last').after(section);
      return;
  };


  var setupTaxes = function(){
      /* return; */
  };


  var setup_settings_general = function(){

    var targetHTML = $(selector_general_settings);
    if(!targetHTML.length){ return }

    var sectionNew = $('<section />',{
      'class':'ui-annotated-section'
    });
    var summary = $('<div>', {
      'class':'ui-annotated-section__annotation'
    });
    var sectionContent = $('<div>',{
      'class':'ui-annotated-section__content'
    });

    summary.html('<div class="ui-annotated-section__title"><h2 class="next-heading next-heading--no-margin">Store Metafields</h2></div><div class="ui-annotated-section__description"><p>Edit your shop level metafields here. Review the <a target="_blank" href="http://docs.shopify.com/themes/liquid-documentation/objects/metafield">Shopify documentation</a> for more info on Metafields.</p></div>');
    sectionContent.html(metafieldloader);
    sectionNew.append(summary,sectionContent);
    targetHTML.after(sectionNew);
    var loadinto = $(selector_mf_content);
    $('.next-card-metafield').removeClass('next-card--aside');
    loadmeta(loadinto);

  };


  var setup_customers = function(){

      var targetHTML = $(selector_next_secondary);
      if(!targetHTML.length){ notice('ShopifyFD error : setup_customers : target HTML not found'); return false }

      var nextCardSecondary = $(next_item_HTML);
      nextCardSecondary.find('.next-card').append(metafieldloader);
      targetHTML.after(nextCardSecondary);
      var loadinto = $(selector_mf_content);
      loadmeta(loadinto);

  };


  var setup_single_order = function(a){

    var targetHTML = $(selector_next_secondary);
    if(targetHTML.length){
      var nextCardSecondary = $(next_item_HTML);
      nextCardSecondary.find('.next-card').append(metafieldloader);
      targetHTML.after(nextCardSecondary);
      var loadinto = $(selector_mf_content);
      loadmeta(loadinto);

    }else{
      notice('ShopifyFD error : setup_single_order : target html not found',true);
    }

  };


  var setup_orders = function(){

    var visible_orders = $('.no-wrap a[data-nested-link-target="true"]');
    if(!visible_orders.length){ return false }

    var order_timer = false; 
    visible_orders.append(bubble_html).css({'position':'relative'}).hover(function(){

      var t = $(this);
      order_timer = setTimeout(function(){

        var l = t.find('ul').eq(0),
        a = t.attr('href');

        $('div.bubble').addClass('hide');

        if(!t.data('order')){

          $.ajax({
          type: 'GET',
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

  };

  var hiddenObject = function(a){
    if(typeof a !== 'undefined'){
      $('.seo-hide-button').addClass('active').attr('data-id',a).text('Show in Sitemap')
    }else{
      $('.seo-hide-button').removeClass('active').removeAttr('data-id').text(translation.hide_from_sitemap)
    }
  };

  var updatedropdown = function(){
    /* Keeps the metafields edit box select menu up to date */

    var url = getMetafieldUrl();
    $.getJSON(url, function(data) {
      
      var response = '';
      var m = data.metafields;

      hiddenObject();

      if(m.length){

        _data('m',m);

        $('#metacount').text(m.length).removeClass('hide');
        for (var i = 0, len = m.length; i < len; i++) {
          response+= '<option data-type="' +m[i].value_type + '" data-id="' +m[i].id + '">' +m[i].namespace + '.' + m[i].key + '</option>';
          app.metafields[m[i].id] = { namespace: m[i].namespace, value: m[i].value, key: m[i].key };

          if (m[i].namespace === 'backups'){
            $('#restorebackup').show();
          }

          if(m[i].namespace === 'seo' && m[i].key === 'hidden' && m[i].value === 1){
            hiddenObject(m[i].id);
          }
        }
        response = metafield_default + response;

      }else{

        $('#metacount').text('0').addClass('hide');
        _data('m',false);
        $('#restorebackup').hide();
        response = metafield_default;

      }

      $('#metafieldselect').html(response);
      clearmetaform();

    });   

  };

  var autocomplete = function(settings){
    /*

    autocomplete({query:'foo'});
    autocomplete('foo');

    */
    if(typeof settings === 'undefined'){ return false }
    if(typeof settings !== 'string' && typeof settings.query === 'undefined'){ return false }

    var searchString = settings.query;
    if(typeof settings !== 'string'){ searchString = settings }

    $.ajax({
      type: 'get',
      url: '/admin/products/autocomplete_search',
      data: {query:searchString},
      success: function(d){flog(d)},
      dataType: 'json'
    });

  }

  var addNavClose = function(){

    if($('#toggleBigMode').length){ return }
    var mainBody = $('.ui-app-frame__main');
    if(!mainBody.length){ return }
    
    var button = $('<a/>',{
      'id':'toggleBigMode',
      'title':'Toggle navigation'
    }).on('click',function(){
      $('body').toggleClass('big-view');
      return false;
    });
    button[0].innerHTML = '&lt;';
    mainBody.append(button);
  };

  var hasClass = function(e, c) {
    return (' '+e.className+' ').indexOf(' '+c+' ') > -1;
  };

  var isloading = function(){
    return app.cache.content.classList.contains('loading')
  };

  var init = function(){

    /* fire the main scripts */
    document.getElementsByTagName('html')[0].className += ' shopifyfd-loaded';
    if(settings.enableDragDrop){ set_drag_drop() }
    get_theme_data();

    /* increase the default products per page */
    var productListButton = document.querySelectorAll('a[href="/admin/products"]');
    if(productListButton.length){
      productListButton[0].href = '/admin/products?limit='+settings.apiLimit;
    }

    /* change app link to installed apps */
    var navAppsButton = document.querySelectorAll('a[href="' + [location.protocol, '//', location.host].join('')+'/admin/apps"]');
    if(navAppsButton.length){
      navAppsButton[0].href = '/admin/apps/installed';
    }

    setInterval(function(){
      app.cache.content = document.getElementById('content');
      if(!app.cache.content.classList.contains('loading')){

        add_ui();

        var ao = alphaOmega();
        var okToRun = false;

        var alpha = ao[0];
        var omega = ao[1];
        var query = ao[2];

        if(omega !== 'next' && omega !== 'prev' && ( alpha !== _data('alpha') || omega !== _data('omega') )){
          okToRun = true;
        }else if(omega !== 'next' && omega !== 'prev' && query != app.queryString ){
          /* edge case running when we need to run on the same page */
          if(alpha === 'products' && !isNaN(omega)){
            okToRun = true; /* product page */
          }else if(alpha === 'admin' && omega === 'products'){
            okToRun = true; /* product[s] page */
          }else if(alpha === 'admin' && omega === 'redirects'){
            okToRun = true; /* redirect page */
          }
        }

        if(okToRun){

          app.alpha = alpha;
          app.omega = omega;
          app.queryString = query;

          if( alpha === 'customers' && !isNaN(omega)){ setup_customers();
          } else if( alpha === 'articles' && !isNaN(omega)){ setup_single_article();
          } else if( alpha === 'blogs' && !isNaN(omega)){ setup_blogs();
          } else if( alpha === 'collections' && !isNaN(omega)){ setup_custom_collections();
          } else if( alpha === 'menus' && !isNaN(omega)){ setup_link_lists_single();
          } else if( alpha === 'orders' && !isNaN(omega)){ setup_single_order();
          } else if( alpha === 'draft_orders' && !isNaN(omega)){ setup_single_order('drafts');
          } else if( alpha === 'pages' && !isNaN(omega)){ setup_pages();
          } else if( alpha === 'products' && !isNaN(omega)){ setup_products();
          } else if( alpha === 'variants' && !isNaN(omega)){ setup_variants();
          } else if( alpha === 'admin' && omega === 'articles' ){ /*setup_articles();*/
          } else if( alpha === 'admin' && omega === 'apps' ){ /*setup_apps();*/
          } else if( alpha === 'admin' && omega === 'bulk' ){ setup_bulk_editor();
          } else if( alpha === 'admin' && omega === 'channels' ){ /*setup_channels();*/
          } else if( alpha === 'admin' && omega === 'collections' ){ setup_collections();
          } else if( alpha === 'admin' && omega === 'discounts' ){ setup_discounts();
          } else if( alpha === 'admin' && omega === 'draft_orders' ){ /*setup_draft_orders();*/
          } else if( alpha === 'admin' && omega === 'gift_cards' ){ /*setup_gift_cards();*/
          } else if( alpha === 'admin' && omega === 'menus' ){ setup_link_lists();
          } else if( alpha === 'admin' && omega === 'links' ){ setup_link_lists();
          } else if( alpha === 'admin' && omega === 'link_lists' ){ setup_link_lists();
          } else if( alpha === 'admin' && omega === 'orders' ){ setup_orders();
          } else if( alpha === 'admin' && omega === 'products' ){ setup_products_list();
          } else if( alpha === 'admin' && omega === 'redirects' ){ setup_redirects();
          } else if( alpha === 'admin' && omega === 'reports' ){ /*setup_reports(); */
          } else if( alpha === 'admin' && omega === 'themes' ){ setup_themes();
          } else if( alpha === 'admin' && omega === 'transfers' ){ setup_transfers();
          } else if( alpha === 'online_store' && omega === 'preferences' ){ /*setup_preferences();*/
          } else if( alpha === 'settings' && omega === 'account' ){ setup_settings_account();
          } else if( alpha === 'settings' && omega === 'files' ){ setup_files();
          } else if( alpha === 'settings' && omega === 'general' ){ setup_settings_general();
          } else if( alpha === 'settings' && omega === 'shipping' ){ setup_shipping();
          } else if( alpha === 'shipping_zones' && !isNaN(omega)){ setup_shipping_zones();
          } else if( alpha === 'settings' && omega === 'taxes' ){ setupTaxes();
          }
        }
      }
    }, settings.wait);
    notice("ShopifyFD loaded");
  };

  init();

}());