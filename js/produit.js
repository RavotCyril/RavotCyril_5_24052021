    // Function Principal du squelette html de la page

    (async function() {
        // Déclaration de toutes les variables de la page HTML

        let b = document.body;
        document.querySelector("header");
        let newMain = document.createElement("Main");
        let sectionTag = document.createElement("section");

        //---Appel du paramètre GetId pour mettre 
        //  la valeur de l'id à la variable idproduit----------------------------------------------

        let idproduit = getId();
        let h1Tag = document.createElement("h1");

        //--------------------- Appel de toutes les variables pour créer les balises HTML----------------------------------------------
        //  NewMain - SectionTag - h1Tag

        sectionTag.id = "Fourniture";
        sectionTag.className = "Content";
        h1Tag.textContent = "Catalogue : Meubles en chêne";

        b.appendChild(h1Tag);
        b.appendChild(newMain);
        newMain.appendChild(sectionTag);

        //---------------------- Fin Appel de toutes les variables pour créer les balises HTML---------------------------------------------

        /*Constante article. Qui permet de récupérer avec la function getARticle 
        le résultat de la méthode Fetch pour récupérer les donnéees de l'API  */

        const article = await getArticle(idproduit);
        // console.log(article);
        // Fonction - > APi Déclaration

        displayArticle(sectionTag, article);

    })();

    // Methode Get Permet de récupérer l'?id= des paramètres de l'URL, l'identifiant.

    function getId() {
        const param = window.location.search;
        const id = param.replace("?id=", "");
        // console.log(id);
        return id;
    }
    // Methode fetch. Permet de récupérer les données de l'API.Avec le paramètre Id.(Valeur : id produit);

    async function getArticle(id) {
        try {
            let resultat = await fetch("http://localhost:3000/api/furniture/" + id);
            // console.log(resultat);
            return await resultat.json();
        } catch (error) {
            alert("Serveur indisponible.Veuillez contacter l'administrateur du site");
        }

    }

    // Déclaration - Variable et Fonction - > Articles - H2 -figure - div - img -figcaption -p : Object, Id , imageUrl Name, Prix, Description, ...

    function displayArticle(sectionTag, article) {

        let articleTag = document.createElement("article");
        let titleTag = document.createElement("h2");
        let figureTag = document.createElement("figure");
        let divImageTag = document.createElement("div");
        let imageTag = document.createElement("img");
        let figcaptionTag = document.createElement("figcaption");
        let prixTag = document.createElement("p");
        let descriptionTag = document.createElement("p");

        // Appel - Variable et Fonction - > Id

        articleTag.id = article._id;
        articleTag.className = "Article";

        // Créer un élément style
        // Appel - Variable et Fonction - > Name + Description Figcaption

        titleTag.textContent = article.name;
        // Appel - Variable et Fonction - > Titre h2 + Figure

        sectionTag.appendChild(articleTag);
        articleTag.appendChild(titleTag);
        articleTag.appendChild(figureTag);

        // Appel - Variable et Fonction - >  Image + Figcaption

        imageTag.src = article.imageUrl;
        divImageTag.className = "Div-Image";
        figureTag.appendChild(divImageTag);
        divImageTag.appendChild(imageTag);
        figureTag.appendChild(figcaptionTag);

        // Appel - Variable et Fonction - > description

        figcaptionTag.appendChild(descriptionTag);
        descriptionTag.className = "Produit-Figcaption-Description";
        descriptionTag.textContent = article.description;


        // on affiche le prix sans centimes et avec des valeurs plus raisonnables. 
        // Price divisé / 100.

        prixTag.textContent = (parseInt(article.price) / 100) + "€";
        prixTag.className = "Prix";
        figcaptionTag.appendChild(prixTag);

        // Appel- personnalisation - Select > Varnish

        let spanLabelSelect = document.createElement("span");
        let labelTag = document.createElement("label");
        let selectTag = document.createElement("select");
        figcaptionTag.appendChild(spanLabelSelect);
        spanLabelSelect.appendChild(labelTag);
        spanLabelSelect.appendChild(selectTag);
        labelTag.forName = "Meuble-select";
        labelTag.textContent = "Choisir la couleur";
        labelTag.className = "Personnalisation";
        selectTag.name = "Meuble";
        selectTag.id = "Meuble-Select";
        selectTag.className = "Taille-Select";
        spanLabelSelect.className = "Taille-Span"

        for (let i in article.varnish) {
            // console.log(article.varnish[i]);
            let optionTag = document.createElement("option");
            selectTag.appendChild(optionTag);
            optionTag.value = article.varnish[i];
            optionTag.text = article.varnish[i];
        }

        // Permet de créer les variables et la fonction du  bouton panier

        let bouttonTag = document.createElement("form");
        let inputTag = document.createElement("input");
        let spanMessageAjouterAuPanierTag = document.createElement("span");
        bouttonTag.className = "Form-Produit";
        inputTag.className = "Boutton-Produit";
        spanMessageAjouterAuPanierTag.className = "Message-Ajout-Panier-Validation-Erreur";
        inputTag.type = "button";
        inputTag.value = "Ajouter au Panier";
        articleTag.appendChild(bouttonTag);
        bouttonTag.appendChild(inputTag);
        bouttonTag.appendChild(spanMessageAjouterAuPanierTag);

        /* Créaction de la variable validTag avec des paramètres classe, message et valid suivis d'une fonction.
         Qui permet d'afficher une alerte " Article ajouté au panier "" à chaque clic */

        let validTag = (NomClasse, message, valid) => {
            const container = document.querySelector("." + NomClasse);
            if (valid) {
                container.classList.add("valid");
                container.textContent = message;
            }
        }


        /* Déclaration de la variable " cart "dans laquelle on met les valeurs du localStorage stocké. 
        /* Permet de créer la récupération de L'iD selectionné sur la page catalogue et la quantité dans le panier.  Clef / Valeur. Get Item.
            Pour mémoriser des valeurs complexes et l'afficher, on utilisera le format JSON (JavaScript Objet Notation)  JSON.Parse.
            on sérialise (ou linéarise)*/

        inputTag.addEventListener("click", function() {

            /* JSON.parse --> La méthode JSON.parse() convertit la chaîne de caractères JSON en un objet JavaScript.  ( l'inverse de JSON.stringify )*/
            let cart = JSON.parse(localStorage.getItem("cart"));
            // console.log(cart);
            let varnish = document.getElementById("Meuble-Select");
            let optionSelected = varnish.options[varnish.selectedIndex].text;
            /* 
            L'opérateur d'inégalité (!=) vérifie si ses deux opérandes ne sont pas égaux et renvoie un booléen correspondant au résultat.   
            À la différence de l'opérateur d'inégalité stricte, l'opérateur d'inégalité tente
            une conversion de ses opérandes avant la comparaison si ceux-ci sont de types différents.

            La valeur null est un littéral JavaScript représentant la nullité au sens où aucune valeur pour 
            l'objet n'est présente.C'est une des valeurs primitives de JavaScript */

            if (cart != null) {

                // Verifie que l'article que je souhaite ajouter existe dans le panier.
                // Verification d'une correspondance entre un Id de l'API et un Id d'un article selectionné.
                // Verification que l'id produit soit égale à un id de l'API avec en même temps l'option selectionné.

                let articlePresent = cart.find(x => x.idproduit == article._id && x.varnish == optionSelected);
                if (articlePresent != null) {
                    cart[cart.indexOf(articlePresent)].quantite += 1;
                    validTag("Message-Ajout-Panier-Validation-Erreur", alert("Article ajouté au panier"), true);
                } else {
                    cart.push({ "idproduit": article._id, "varnish": optionSelected, "name": article.name, "prix": (article.price / 100), "quantite": 1 });
                }
            } else {
                cart = [];
                cart.push({ "idproduit": article._id, "varnish": optionSelected, "name": article.name, "prix": (article.price / 100), "quantite": 1 });
            }
            /* l’objet avec la syntaxe JSON.stringify().La méthode JSON.stringify() convertit les objets JavaScript en chaîne JSON
             et stock les données dans local storage  ( l'inverse de JSON.Parse )*/
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart);
        })
    }