/*


function click(){
	console.log("hey")

	$("#message p").html("");
  // Win groups [start cell,increment]
  var gps=[[0,5,"diagonale"],[3,3,"diagonale"],                    // Diagonale
	   [0,1,"ligne"],[4,1,"ligne"],[8,1,"ligne"],[12,1,"ligne"], // Ligne
	   [0,4,"colonne"],[1,4,"colonne"],[2,4,"colonne"],[3,4,"colonne"]],   // Colonne
    clicks=['freecell', 'win', 'clicked'],   // Cellules qui comptent comme cliquées
    cells=this.pTable.getElementsByTagName('td'),
    wins=[];
  if(clicks.indexOf(this.className)>0) {
    this.title='Cliquez pour sélectionner';
    this.className='';
  } else {
    this.title='Cliquez pour désélectionner';
    this.className='clicked';
  }
  // Loop through each group and check for wins
  for(var ol=0;(g=gps[ol]); ol++) {
  	var serie = ol;
    var cnt=0;
    // Check each cell in this group for a win, resetting win status
    for(var i=0,cell; i<4 && (cell=cells[g[0]+(i*g[1])]); i++) {
    	
      id=clicks.indexOf(cell.className);
    	if(id>=0) {
			cnt++;
			if(id==1) cell.className='clicked';
      	}
    }

    if(cnt==4) {
    	var longueur = wins.length+1
    	
    	wins.push(g);
    	// Comptage
    		var lignes = 0, colonnes = 0, diagonales = 0;
    		for(var i = 0;i < wins.length;i++) {
    			if(wins[i][2] == "ligne") lignes++;
    			if(wins[i][2] == "colonne") colonnes++;
    			if(wins[i][2] == "diagonale") diagonales++;
    		}
    		if(colonnes == 4) {
    			$("#message p").html("Bravo, vous avez rempli toute la grille !");
    		}
    		else if(lignes > 0 || colonnes > 0 || diagonales > 0){
    			$("#message p").html("Vous avez rempli ");
    			if(lignes > 0 && colonnes > 0 && diagonales > 0) {
    				var liaison = 3
    			}
    			else if((lignes > 0 && colonnes > 0) || (colonnes > 0 && diagonales > 0) || (lignes > 0 && diagonales > 0)) {
    				var liaison = 2
    			}

    			if(lignes > 0) {
    				if(lignes > 1) {
    					pluriel = "s";
    				}
    				else {
    					pluriel = ""
    				}
    				$("#message p").append(lignes.toString() +" ligne"+ pluriel);
    			}
    			if(colonnes > 0) {
    				if(colonnes > 1) {
    					pluriel = "s";
    				}
    				else {
    					pluriel = ""
    				}
    				if(liaison == 2) {
    					$("#message p").append(" et ");
    				}
    				if(liaison == 3) {
    					$("#message p").append(", ");
    				}
    				$("#message p").append(colonnes.toString() +" colonne"+ pluriel);
    			}
    			if(diagonales > 0) {
    				if(diagonales > 1) {
    					pluriel = "s";
    				}
    				else {
    					pluriel = ""
    				}
    				if(liaison == 2 || liaison == 3) {
    					$("#message p").append(" et ");
    				}
    				$("#message p").append(diagonales.toString() +" diagonale"+ pluriel);
    			}
    			$("#message p").append(". Continuez !");
    		}

    	/*	$("#message p").html("Bravo, vous avez rempli "+ longueur +" "+gps[ol][2]+" !");*/

    /*	console.log("Lignes : "+lignes+" - Colonnes : "+colonnes+" - Diagonales : "+diagonales)
    }
  }

  // highlight all winning cell groups
if(wins.length) {
    for(var ol=0; (g=wins[ol]); ol++) {
	    for(var i=0; i<4; i++) {
			cells[g[0]+(i*g[1])].className='win';
			
		}
	}
	
}
	
}
function enable_clicks() {
	console.log("hay")
	var tbls=document.getElementsByTagName('table');
	for(var t=0,tbl; (tbl=tbls[t]); t++) {
		if(tbl.className='card'){
			var tds=tbl.getElementsByTagName('td');
			for(var i=0,td;(td=tds[i]);i++) {
				td.pTable=tbl;
				if(td.className!='freecell'){
					td.title='Click to mark cell';
					td.onclick=click;
				}
			}
		}
	}
}

// Run functions at page load
function loader(func) {
	if (document.addEventListener ) {
		window.addEventListener("load", func, false);
	} else if ( document.attachEvent ) {
		window.attachEvent("onload", func);
	} else {
		if(!window._onload_queue){
	    window._onload_queue=[];
	    if(window.onload)
				window._onload_queue.push(window.onload);
		}
		window._onload_queue.push(func);
	}
}
loader(enable_clicks);*/
