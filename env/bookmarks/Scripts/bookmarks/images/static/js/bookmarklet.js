(function (){

   var jquery_version = '3.4.1';
   var site_url = 'https://127.0.0.1:8000/';
   var static_url = site_url + 'static/';
   var min_width = 100;
   var min_height = 100;


   function bookmarklet(msg){

       //carrega o css
       var css = $('<link>');
       css.attr({
       rel: 'stylesheet',
       type: 'text/css',
       href: static_url + 'css/bookmarklet.css?r=' +
       Math.floor(Math.random()*9999999999999999)
   });
   $('head').append(css);

   //carrega o html
   box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
   $('body').append(box_html);
   //evento close
   $('#bookmarklet #close').click(function(){
	   jQuery('#bookmarklet').remove();
   });
   };
   //encontra e exibe as images
   jQuery.each(jQuery('img[src$="jpg"]'), function(index, image){
	   if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height)
	   {
		   image_url = jQuery(image).attr('src');
		   jQuery('#bookmarklet .images').append('<a href="#"><img src="'+image_url+'"/></a>');
	   }
   });
         // when an image is selected open URL with it
         jQuery('#bookmarklet .images a').click(function(e){
            selected_image = jQuery(this).children('img').attr('src');
            // hide bookmarklet
            jQuery('#bookmarklet').hide();
            // open new window to submit the image
            window.open(site_url +'images/create/?url='
                        + encodeURIComponent(selected_image)
                        + '&title='
                        + encodeURIComponent(jQuery('title').text()),
                        '_blank');
          });
   
   //Verifica se a JQuery está carregada

   if(typeof window.jQuery == 'undefined'){
       bookmarklet();

   }else{
       //Verifica se há conflitos
       var conflict = typeof window.$ != 'undefined';
       //Cria o script para aponta para  a API Google
       var script = document.createElement('script');
       script.src = '//ajax.googleapis.com/ajax/libs/jquery/' + jquery_versions + '/jquery.min.js';
       //Adiciona o script no 'head' para processamento
       document.head.appendChild(script);
       //Determina uma forma de esperar até que o script seja carregado
       var attempts = 15;
       (function()
       {      
           //Verifica novamente se a JQuery está definida
           if(typeof window.jQuery != 'undefined'){
            
               if(--attempts>0){
                   //Chama a si mesmo em alguns milissegundos
                   window.setTimeout(arguments.callee, 250)
               }else{
                   //Exeesso de tentativas para carregar, envia um erro
                   alert('An error ocurred while loading JQuery')
               }
           }else{
               
               bookmarklet();
           }

       })();
   }


})();

