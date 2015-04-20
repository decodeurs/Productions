var fJS;
jQuery(document).ready(function($) {

  

  $(function () {

    

    // Récupération des données avec Gselper

    var donnees = new Array();

    // Création de l'instance de Gselper
    var doc = new Gselper({

        // Identifiant du document
        key: "0Apd2dyc491ZXdG1QOWVFR3VybDhMbmQ0Y1F6a00wcHc",
        // Le worksheet du document
        worksheet: "od6",

        // La fonction à appeler lorsque le document est chargé
        onComplete: function(data) {

            // Ici faites ce qu'il vous chante
            // Par exemple, afficher dans la console le contenu de la première case
            

            // Ou parcourir le document ligne après ligne
            $.each(doc.get(), function(i, line) {
                donnees.push(
                {
                  id: parseInt(line.id),
                  ville: line.ville,
                  longitude: Number(line.longitude),
                  latitude: Number(line.latitude),
                  sexe: line.sexe,
                  prenom: line.prenom,
                  nom: line.nom,
                  parti: line.parti,
                  mandatparl: line.mandatparl,
                  mandats: line.mandats,
                  situation: line.situation,
                  priorite: line.priorite,
                  lien: line.lien,
                  region: line.region,
                  departement: line.departement              
                })

            });
            fJS = filterInit(donnees);
             
        }
    });
      


    /* Script de détection des "hashs" (dièses) dans l'url http://oshyn.com/_blog/General/post/JavaScript_Navigation_using_Hash_Change/ */

        //set up hash detection 

        var hash = window.location.hash;
        if (top.location != self.document.location)
        {
          hash = window.parent.location.hash
        }
        var hashlength = hash.length;
        var hashort = window.parent.location.hash.substring(1, hashlength);
        hashort = hashort.replace(/\+/,' ');
        if(hash){ // Remplissage du champ de recherche avec le contenu du hash dans l'url
         $("#search_box").val(hashort);
        $("#nomville").html('<h1 class=\"tt20\">&raquo; '+hashort+'</h1>');
        }
               
  });

  

    $('.outremer').click(function(e){
      e.preventDefault();
      valeur = $(this).data('value');
      googleMap.outreMer(valeur);
     });

});

function filterInit(donnees) {

  var view = function(donnee){
    googleMap.addMarker(donnee);

    if(donnee.situation == "cumul") { 
      situation = "Cumul en cas d'élection";
      conditionnel = "est";
       }
    if(donnee.situation == "promesse") {
      situation = "Promesse de non-cumul";
      conditionnel = "est";
    }
    if(donnee.situation == "incertain") { 
      situation = "Candidature non-confirmée";
      conditionnel = "pourrait être"
       }
    if(donnee.sexe == "Mme") { 
      feminisation = "candidate";
      if(donnee.mandatparl == "Député") { donnee.mandatparl = "députée" }
      if(donnee.mandatparl == "Sénateur") { donnee.mandatparl = "sénatrice" }
      if(donnee.mandatparl == "Eurodéputé") { donnee.mandatparl = "eurodéputée" }
    }
    else { 
      feminisation = "candidat";
    }
    donnee.mandats = donnee.mandats.replace(/\*/g, ' &middot; ');
    
    // Strippper le numéro du département pour ne garder que le nom
    /[0-9]{1,3} \- (.*)/.exec(donnee.departement);
    var departement = RegExp.$1;


    html = "<div class=\"box_personne\" title=\"Cliquez pour afficher dans notre application\"><div class=\"situation txt12 "+donnee.situation+"\">"+ situation + "</div><p class=\"candidat txt15_140\"><strong><span class=\"prenom\">"+ donnee.prenom + "</span> <span class=\"nom\">"+donnee.nom +"</span></strong></p><p class=\"parti txt12\">("+ donnee.mandatparl.toLowerCase() + " "+ donnee.parti +")</p></p><p class=\"ville txt15_140\">"
    if(donnee.lien) {
      html += "<a href=\""+ donnee.lien +"\" target=\"_blank\" title=\"Cliquez pour accéder à l'article source\">"+ conditionnel +" "+ feminisation + " à <strong>"+ donnee.ville +"</strong></a> ";
    }
    else {
      html += conditionnel +" "+ feminisation + " à <strong>"+ donnee.ville +"</strong> ";
    }
    html += "<span class=\"departement txt12\">("+ departement +")</span></p><hr><p class=\"mandats\">Ses mandats actuels :</p><p class=\"mandats2\">"+ donnee.mandats +"</p>";
    if(donnee.priorite) {
      html += "<hr><p class=\"priorite\">Sa priorité affichée :</p><p class=\"priorite2\">"+donnee.priorite+"</p>";
    }
    html += "<div class=\"clear\"></div></div>";
    return html;
       
  };

  var filter_callbacks = {
    after_filter: function(result){


			$("#embedcode").html("&lt;iframe src=&quot;"+window.location+"&quot; width=&quot;534&quot; height=&quot;515&quot; frameborder=&quot;0&quot; &gt;&lt;/iframe&gt;");
			
            if(result.length > 1) { 
              pluriel = "résultats" 
            } else { pluriel = "résultat"}
            $('#result_count').text(result.length + ' '+pluriel);
            if(result.length == 0) { // Si il n'y a pas de réponses
                $('#notule').html("<p class=\"aucunresultat txt14_140\">Nous n'avons référencé aucun candidat potentiellement cumulard correspondant à votre recherche.</p><p class=\"txt14_140\"><a href=\"https://docs.google.com/forms/d/1bP6TX_7o9K74irt2tuo7x8wjGjHLcEJkr7w55uyvJJU/viewform\" target=\"_blank\" class=\"btn\">Signaler un oubli ou une erreur</a></p>");
                $('#partagesocial').html("");
                googleMap.reCentrer();

             }
           else { 
            var hash = window.location.hash;
            adresseurl = adresseoriginale = "http://www.lemonde.fr/municipales/visuel/2014/02/18/municipales-risquez-vous-d-elire-un-futur-cumulard_4368751_1828682.html"+hash;      
            adresseurl = adresseurl.replace(/#/g, '%23'); 
            adresseurl = adresseurl.replace(/ /g, '+');
            adresseurl = adresseurl.replace(/\(/g, '%28');
            adresseurl = adresseurl.replace(/\)/g, '%29');  
            adressefb = adresseurl.replace(/\//g, '%2F');
            adressefb = adressefb.replace(/:/g, '%3A');
            $('#notule').html("<p class=\"txt14_140\"><a href=\"https://docs.google.com/forms/d/1bP6TX_7o9K74irt2tuo7x8wjGjHLcEJkr7w55uyvJJU/viewform\" target=\"_blank\" class=\"btn\">Signaler un oubli ou une erreur</a></p>");
            $('#partagesocial').html("<p><iframe allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" src=\"https://platform.twitter.com/widgets/tweet_button.html?url="+adresseurl+"&via=lemondefr&hashtags=alertecumul,municipales&lang=fr&count=horizontal\" style=\"width:95px; height:20px; float:left;\"></iframe><iframe src=\"//www.facebook.com/plugins/like.php?href="+adressefb+"&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=80&amp;appId=531696896847126\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; height:21px; width:80px; float:left;\" allowTransparency=\"true\"></iframe><img src=\"img/embed.png\" id=\"embedbutton\" title=\"Embeddez ce module\" /></p>");

                  $('#close').click(function() {
                      $('#overlay').css("display","none");
                  });

                    $('#embedbutton').click(function() {
                      $('#overlay').css("display","block");
                  });

            }
     
      googleMap.updateMarkers(result,donnees);

      $.each(result, function(i, id){ // Ajout du recentrage au clic sur un rÃ©sultat de la liste
        identifiant = '#fjs_'+id;
          $(identifiant).click( function() {
            ide = id-1;
            url = 
        "http://www.lemonde.fr/municipales/visuel/2014/02/18/municipales-risquez-vous-d-elire-un-futur-cumulard_4368751_1828682.html#"+donnees[ide].prenom+" "+donnees[ide].nom;
            window.open(url,'_blank');
          });
      });



    }
  };

  var settings = {
    search: {input: '#search_box', search_in: '.candidat, .ville, .departement, .parti', min_length: 1 },
    and_filter_on: false,
    callbacks: filter_callbacks, // Filter callback execute in filter init and each filtering event.
    id_field: 'id' //Default is id. This is only for usecase
  };

  $('.filter_by_link').click(function(e){
      e.preventDefault();
      $($(this).data('target')).val($(this).data('value'));
      fJS.filter();
  });



 googleMap.init();

    return FilterJS(donnees, "#resultats", view, settings);

  
};





var googleMap = {
        latlng: [46.9833,1.68333],
        zoom: 6,
        markers: {},
        map: null,
        

        init: function() {

          

                  var mapOptions = {
                    zoom: googleMap.zoom,
                    minZoom: 2,
                    maxZoom:12,
                    center: new google.maps.LatLng(this.latlng[0], this.latlng[1]),
                    mapTypeControlOptions: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    draggable: true,
                    panControl: false,
                    scrollwheel: true,
                    zoomControl: true,
                    // zoomControlOptions: {
                    //   style: google.maps.ZoomControlStyle.SMALL
                    // },
                    streetViewControl: false,
                    disableDoubleClickZoom: false,
                    styles: [
                      {
                      "elementType": "geometry",
                      "stylers": [
                        { "saturation": -50 }
                      ]
                      },{
                      "elementType": "labels",
                      "stylers": [
                        { "visibility": "on" }
                      ]
                      },{
                      "featureType": "water",
                      "stylers": [
                        { "saturation": 75 },
                        { "hue": "#004cff" }
                      ]
                      },{
                      "featureType": "road",
                      "elementType": "geometry",
                      "stylers": [
                        { "lightness": 80 }
                      ]
                      },{
                      }
                    ]
                  };
          this.map = new google.maps.Map(document.getElementById("carte"),mapOptions);

    },

    addMarker: function(donnee) {

                    longit = donnee['longitude'];
                    latit = donnee['latitude'];
                    ville = donnee['ville'];
                    nom = donnee['nom'];
                    prenom = donnee['prenom'];
                  
                    var marker = new google.maps.Marker({
                      position: new google.maps.LatLng(latit,longit),
                      map: this.map,
                      title: ville + "\n" + prenom + ' ' + nom
                    });
                    

                    this.markers[donnee.id] = marker

                    google.maps.event.addListener(marker, 'mouseover', function() {
                        $("#fjs_"+donnee.id).addClass("selectionne");
                    });

                    google.maps.event.addListener(marker, 'mouseout', function() {
                    
                        $("#fjs_"+donnee.id).removeClass("selectionne");
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                            url = 
                        "http://www.lemonde.fr/municipales/visuel/2014/02/18/municipales-risquez-vous-d-elire-un-futur-cumulard_4368751_1828682.html#"+donnee.prenom+" "+donnee.nom;
                            window.open(url,'_blank');
                          
                    });

                    if(donnee.situation == "cumul") {
                      marker.setIcon(new google.maps.MarkerImage('img/rouge.png',new google.maps.Size(16,16),new google.maps.Point(0,0)));
                    }
                    else if(donnee.situation == "incertain") {
                      marker.setIcon(new google.maps.MarkerImage('img/orange.png',new google.maps.Size(16,16),new google.maps.Point(0,0)));
                    }
                    else if(donnee.situation == "promesse") {
                      marker.setIcon(new google.maps.MarkerImage('img/vert.png',new google.maps.Size(16,16),new google.maps.Point(0,0)));
                    }


                    return marker;
      },

      updateMarkers: function(filtering_result,donnees){
        
                      var google_map = this;
                      var bounds = new google.maps.LatLngBounds();
                      
                      this.map.setZoom(googleMap.zoom);
                      
                      $.each(google_map.markers, function(){ 
                        this.setMap(null);
                        
                         })
                      $.each(filtering_result, function(i, id){
   
                        loc = new google.maps.LatLng(google_map.markers[id].position.d,google_map.markers[id].position.e);
                        bounds.extend(loc);
                        
                        google_map.markers[id].setMap(google_map.map);
                      });

                      if(filtering_result.length) {
                          if(filtering_result.length == donnees.length) { // Si le champ de recherche est vide
                            google_map.reCentrer(); }
                          else { 
                            google_map.setCenterPoint(); 
                            this.map.fitBounds(bounds);
                            this.map.panToBounds(bounds);

                          }
                      }

                      $.each(filtering_result,function(i, id){
                         
                          if(i%2 == 0) {
                            $("#fjs_"+id).removeClass("impair pair").addClass("impair");
                          }
                          else {
                            
                            $("#fjs_"+id).removeClass("impair pair").addClass("pair");
                          }
                         
                          
                      });
      },

      setCenterPoint: function(){
        var lat = 0, lng = 0; count = 0;

        //Calculate approximate center point.
        for(id in this.markers){
          var m = this.markers[id];

          if(m.map){
            lat += m.getPosition().lat();
            lng += m.getPosition().lng();
            count++;
          }

        }
        

        if(count > 0){
          if(count == 1) { 
            this.map.setZoom(9);
            // this.map.styles[0]["stylers"][0]["visibility"] = "on";
           } else { this.map.setZoom(googleMap.zoom) }
          this.map.setCenter(new google.maps.LatLng(lat/count,lng/count));
        }
      },

      reCentrer: function(){
        this.map.setCenter(new google.maps.LatLng(googleMap.latlng[0],googleMap.latlng[1]));

      },

      outreMer: function(valeur){

        this.map.setCenter(new google.maps.LatLng(valeur[0],valeur[1]));
        this.map.setZoom(valeur[2]);
      }


  }
