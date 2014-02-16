$(document).ready( function() {

	$("#editor").on("input blur paste", function(event) {
		$("#result").empty();
		var code = event.target.value;
		code = cleanCode(code);
		$("#test").html(code);
		formatCode(code, $("#result"));
		colorCode($("#result"));
	});


});

	function cleanCode(rawCode) {
		var code = rawCode.trim(); //remove space at beginning and ending
		code = code.replace(/ +/g, " "); //remplace plusieurs espace par un seul espace
		code = code.replace(/(\n)+/g,"\n"); //remplace plusieurs retour à la ligne par un seul retour à la ligne
		code = code.replace(/(\t)*/g, ""); //supprime les tabluations
		console.log(code);
		return code;
	}

	function formatCode(code, div) {

		var ligne = "";
		var bracket = 0
		var comment = ""
		for(var i=0; i < code.length; ++i) { //on parcourt le code
			
			if(code.charAt(i) == "\n") { 
				//si il y a un retour à la ligne (important pour les commentaires par exemple)
				//on créé l'élément p et on l'ajoute au résultat
				var p = document.createElement("p");
				var txt = document.createTextNode(ligne);  
				p.setAttribute("style", "margin-left: "+(bracket*50)+"px");
				p.appendChild(txt);
				div.append(p);
				ligne = "";
			}
			else if(i == code.length-1 || code.charAt(i) == delimiter || code.charAt(i) == "{" || code.charAt(i) == "}") { 
				//si on est à la fin du code 
				//ou si on est sur un délimiteur
				//ou on est sur un bracket
				//on ajoute le code restant dans un élément p qu'on ajoute au résultat
				ligne += code.charAt(i); 

				var p = document.createElement("p");
				var txt = document.createTextNode(ligne);  
				if(bracket > 0) p.setAttribute("style", "margin-left: "+(bracket*50)+"px");
				if(code.charAt(i) == "}" && bracket > 0) p.setAttribute("style", "margin-left: "+((bracket-1)*50)+"px");
				p.appendChild(txt);
				div.append(p);
				ligne = "";

				if(code.charAt(i) == "{") ++bracket;
				if(code.charAt(i) == "}") --bracket;
			}
			else ligne += code.charAt(i); //sinon on ajoute le caractère dans la ligne en cours
		}
	}

	function colorCode(div) {
		div.children('p').each(function () { //récupère tous les éléments du résultat formaté
			var p = $(this); 
			var code = $(this).html(); //récupère le code contenu dans l'élément p


			var kw = keywords.split(" "); //on récupère les mots clés du language en tableau
			$.each(kw, function(index, value) { // pour chaque fonction
				var regex = new RegExp(value.trim() + "\\b"); //regex "word boudary" pour ne pas prendre le mot clé "if" dans "modifié" par exemple
				code = code.replace(regex, "<span class='ybkwcss'>"+value.trim()+"</span>"); //on modifie la couleur via la classe css
			});


			var func = functions.split(" "); //on récupère les fonctions du language en tableau
			$.each(func, function(index, value) { // pour chaque fonction
				var regex = new RegExp(value.trim() + "\\b");
				code = code.replace(regex, "<span class='ybfcss'>"+value.trim()+"</span>"); //on modifie la couleur via la classe css
			});

			
			var ty = types.split(" "); //on récupère les types du language en tableau
			$.each(ty, function(index, value) { // pour chaque fonction
				var regex = new RegExp(value.trim() + "\\b");
				code = code.replace(regex, "<span class='ybtycss'>"+value.trim()+"</span>"); //on modifie la couleur via la classe css
			});

			$.each(commentsStart, function(index, value) {
				if(code.indexOf(value) != - 1) { //si on trouve un marqueur de début de commentaire
					var posStart = code.indexOf(value); 
					code = code.substr(0, posStart) + "<span class='comments'>" + code.substr(posStart); //on place le style de commentaire dans le code avant le marqueur
					
					if(value == "//") {
						console.log("comment start //");
						code +="</span><br />";
					}
					if(code.indexOf(commentsEnd[index]) != - 1) { //si on trouve dans cette ligne le marqueur de fin de commentaire
						var posEnd = code.indexOf(commentsEnd[index]);
						code = code.substr(0, posEnd+commentsEnd[index].length) + "</span><br />" + code.substr(posEnd+commentsEnd[index].length); //on ferme le style de commentaire
					}
					else { //sinon le commentaire est sur plusieurs lignes
						//on enregistre qu'on est en ligne de commentaire

						//on ferme notre balise pour cette ligne
						code += "</span>";
					}
				}
			});
			p.html(code); //on modifie le html de l'élément par le nouveau
			
		});
	}
