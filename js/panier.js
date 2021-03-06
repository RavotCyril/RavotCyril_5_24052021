let cart = JSON.parse(localStorage.getItem("cart"));

function displayBasket() {

    //  5 articles,  13 Options =  13 Possibilités d'achats d'articles;

    if (cart != null) {
        let prixPaniertotal = 0;
        let quantitePaniertotal = 0;

        cart.forEach(element => {
            document.getElementById("basket_tablebody").innerHTML += "<tr id='Article1' class='row-fluid' data-id=" + element.idproduit +
                "><td class='Name'>" + element.name + "</td>" + "<td class='Varnish'>" +
                element.varnish + "</td>" + "<td class='Quantite'>" + element.quantite + "</td>" +
                "<td class='Prix'>" + numberWithSpacesEachThousand(element.prix) + "</td></tr>"
            prixPaniertotal = (parseInt(element.quantite) * parseInt(element.prix)) + parseInt(prixPaniertotal);
            quantitePaniertotal = element.quantite + quantitePaniertotal;
            localStorage.setItem("prixPaniertotal", prixPaniertotal);
        });

        document.getElementById("basket_tablebody").innerHTML += "<tr>" + "<td>" + "</td>" + "<td>" + "</td>" + "<td>" + quantitePaniertotal + "</td>" + "<td>" + numberWithSpacesEachThousand(prixPaniertotal) + "€" + "</td></tr>"
        document.getElementById("Formulaire").innerHTML += " <h2 class='my-4 text-center'>Veuillez remplir ce formulaire pour valider votre commande</h2>"
    } else {
        document.getElementById("Formulaire").innerHTML += " <h2 class='my-4 text-center'>Aucun article dans votre panier</h2>"
    }
}
displayBasket();

//  Function qui permet de mettre un espace au prix tous les centaines ( tous les 3 chiffres );

function numberWithSpacesEachThousand(SpaceMile) {
    return SpaceMile.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Function Principal du formulaire du panier 

function form() {

    let sectionTag = document.getElementById("Formulaire");
    let formContactTag = document.createElement("form");
    let inputFirstNameTag = document.createElement("input");
    let firstNameValid = document.createElement("span");
    let labelFirstName = document.createElement("label");

    let inputLastNameTag = document.createElement("input");
    let lastNameValid = document.createElement("span");
    let labelLastName = document.createElement("label");

    let inputAdresseTag = document.createElement("input");
    let adresseValid = document.createElement("span");
    let labelAdress = document.createElement("label");

    let inputCityTag = document.createElement("input");
    let cityValid = document.createElement("span");
    let labelCity = document.createElement("label");

    let inputEmailTag = document.createElement("input");
    let emailValid = document.createElement("span");
    let labelEmail = document.createElement("label");

    let inputButtonValidationCommandeTag = document.createElement("input");


    // Appel des classes- Boostrap- TextContent- Id des balises html qui construise le squelette de la page du formulaire.

    firstNameValid.className = 'ClassErrorInputFirstNameTag';
    lastNameValid.className = 'ClassErrorInputLastNameTag';
    adresseValid.className = 'ClassErrorInputAdresseTag';
    cityValid.className = 'ClassErrorInputCityTag';
    emailValid.className = 'ClassErrorInputMailTag d-flex justify-content-center';
    formContactTag.id = "Contact";
    formContactTag.setAttribute("method", "post");
    formContactTag.setAttribute("action", "confirmation-de-commande.html");
    formContactTag.className = "col-8 col-sm-6 col-md-6 mx-auto text-center";


    // Formulaire Prénom

    inputFirstNameTag.className = "Input-Page-Panier Largeur-Input col-12 my-4 mx-auto";
    inputFirstNameTag.id = "firstName";
    inputFirstNameTag.placeholder = "Entrer un Prénom";
    inputFirstNameTag.setAttribute("required", "");
    inputFirstNameTag.name = "firstName";
    inputFirstNameTag.type = "text";
    labelFirstName.htmlFor = "firstName";
    labelFirstName.name = "firstName";

    sectionTag.appendChild(formContactTag);
    formContactTag.appendChild(labelFirstName);
    formContactTag.appendChild(inputFirstNameTag);
    formContactTag.appendChild(firstNameValid);

    // Formulaire Nom

    inputLastNameTag.className = "Input-Page-Panier Largeur-Input col-12 my-4 mx-auto";
    inputLastNameTag.id = "lastName";
    inputLastNameTag.placeholder = "Entrer un Nom";
    inputLastNameTag.setAttribute("required", "");
    inputLastNameTag.name = "lastName";
    inputLastNameTag.type = "text";
    labelLastName.htmlFor = "lastName";
    formContactTag.appendChild(labelLastName);
    formContactTag.appendChild(inputLastNameTag);
    formContactTag.appendChild(lastNameValid);

    // Formulaire Adresse

    inputAdresseTag.className = "Input-Page-Panier Largeur-Input col-12 my-4 mx-auto";
    inputAdresseTag.id = "adress";
    inputAdresseTag.placeholder = "Entrer une Adresse";
    inputAdresseTag.setAttribute("required", "");
    inputAdresseTag.name = "adress";
    inputAdresseTag.type = "text";
    labelAdress.htmlFor = "adress";
    formContactTag.appendChild(labelAdress);
    formContactTag.appendChild(inputAdresseTag);
    formContactTag.appendChild(adresseValid);

    // Formulaire Ville

    inputCityTag.className = "Input-Page-Panier Largeur-Input col-12 my-4 mx-auto";
    inputCityTag.id = "city";
    inputCityTag.placeholder = "Entrer Une Ville";
    inputCityTag.setAttribute("required", "");
    inputCityTag.name = "city";
    inputCityTag.type = "text";
    labelCity.htmlFor = "city";
    formContactTag.appendChild(labelCity);
    formContactTag.appendChild(inputCityTag);
    formContactTag.appendChild(cityValid);

    // Formulaire  Email

    inputEmailTag.className = "Input-Page-Panier Largeur-Input col-12 my-4 mx-auto";
    inputEmailTag.id = "email";
    inputEmailTag.placeholder = "Entrer un email";
    inputEmailTag.setAttribute("required", "");
    inputEmailTag.name = "email";
    inputEmailTag.type = "email";
    labelEmail.htmlFor = "email";
    formContactTag.appendChild(labelEmail);
    formContactTag.appendChild(inputEmailTag);
    formContactTag.appendChild(emailValid);

    // Page Panier -> Boutton Validation Commande

    inputButtonValidationCommandeTag.id = "Validation Commande";
    inputButtonValidationCommandeTag.className = "Boutton-Largeur-Input my-5 mx-3";
    inputButtonValidationCommandeTag.setAttribute("required", "");
    inputButtonValidationCommandeTag.type = "submit";
    inputButtonValidationCommandeTag.value = "Validation Commande";
    formContactTag.appendChild(inputButtonValidationCommandeTag);


    // Variable errorTag -> Fonction du code d'erreur avec message en cas de mauvais caractères dans les inputs.

    let errorTag = (tag, message, valid, invalid) => {
        const container = document.querySelector("." + tag);

        if (invalid) {
            container.classList.add("invalid");
            container.textContent = message;
        } else if (valid) {
            container.classList.remove("invalid");
            container.textContent = message;
        }
    };
    // Variable validTag -> Fonction du code de validation avec message en cas de données exactes.

    let validTag = (tag, message, valid, invalid) => {
        const container = document.querySelector("." + tag);

        if (valid) {
            container.classList.add("valid");
            container.textContent = message;

        } else if (invalid) {
            container.classList.remove("valid");
            container.textContent = message;
        }
    };

    // Variable inputFirstName (Prénom) : Fonction du code de validation ou d'erreur selon la valeur tapper dans l'input.

    let inputFirstNameTagChecker = (value) => {
        if (value.length > 0 && (value.length < 3 || value.length > 20)) {
            errorTag("ClassErrorInputFirstNameTag", "Prénom non validé le prénom doit faire entre 3 et 20 caractères", false, true);
            inputFirstNameTag.style.outline = "1px solid red";
            inputFirstNameTag.style.border = "1px solid red";
            firstNameValid.style.color = "red";
        } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
            errorTag("ClassErrorInputFirstNameTag", "Le prénom ne doit pas contenir de caractères spéciaux", false, true);
            inputFirstNameTag.style.outline = "1px solid red";
            inputFirstNameTag.style.border = "1px solid red";
            firstNameValid.style.color = "red";
        } else if ((value.length === 0)) {
            errorTag("ClassErrorInputFirstNameTag", "Prénom non validé le prénom doit faire entre 3 et 20 caractères", false, true);
            inputFirstNameTag.style.outline = "1px solid red";
            inputFirstNameTag.style.border = "1px solid red";
            firstNameValid.style.color = "red";
        } else {
            validTag("ClassErrorInputFirstNameTag", "Prénom validé", true, false);
            inputFirstNameTag.style.outline = "1px solid green";
            inputFirstNameTag.style.border = "1px solid green";
            firstNameValid.style.color = "green";
        }
    };
    // Variable inputLastName (Nom) : Fonction du code de validation ou d'erreur selon la valeur tapper dans l'input.

    let inputLastNameTagChecker = (value) => {
        if (value.length > 0 && (value.length < 3 || value.length > 20)) {
            errorTag("ClassErrorInputLastNameTag", "Nom non validé le nom doit faire entre 3 et 20 caractères", false, true);
            inputLastNameTag.style.outline = "1px solid red";
            inputLastNameTag.style.border = "1px solid red";
            lastNameValid.style.color = "red";
        } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
            errorTag("ClassErrorInputLastNameTag", "Le nom ne doit pas contenir de caractères spéciaux", false, true);
            inputLastNameTag.style.outline = "1px solid red";
            inputLastNameTag.style.border = "1px solid red";
            lastNameValid.style.color = "red";
        } else if (value.length === 0) {
            errorTag("ClassErrorInputLastNameTag", "Nom non validé le nom doit faire entre 3 et 20 caractères", false, true);
            inputLastNameTag.style.outline = "1px solid red";
            inputLastNameTag.style.border = "1px solid red";
            lastNameValid.style.color = "red";
        } else {
            validTag("ClassErrorInputLastNameTag", "Nom validé", true, false);
            inputLastNameTag.style.outline = "1px solid green";
            inputLastNameTag.style.border = "1px solid green";
            lastNameValid.style.color = "green";
        }
    }

    // Variable adresse: Fonction du code de validation ou d'erreur selon la valeur tapper dans l'input.

    let inputAdresseTagChecker = (value) => {
            if (value.length > 0 && (value.length < 5 || value.length > 30)) {
                errorTag("ClassErrorInputAdresseTag", "Adresse non validé l'adresse doit faire entre 5 et 30 caractères", false, true);
                inputAdresseTag.style.outline = "1px solid red";
                inputAdresseTag.style.border = "1px solid red";
                adresseValid.style.color = "red";
            } else if (value.length === 0) {
                errorTag("ClassErrorInputAdresseTag", "Adresse non validé l'adresse doit faire entre 5 et 30 caractères", false, true);
                inputAdresseTag.style.outline = "1px solid red";
                inputAdresseTag.style.border = "1px solid red";
                adresseValid.style.color = "red";
            } else {
                validTag("ClassErrorInputAdresseTag", "Adresse validé", true, false);
                inputAdresseTag.style.outline = "1px solid green";
                inputAdresseTag.style.border = "1px solid green";
                adresseValid.style.color = "green";

            }
        }
        // Variable inputCityTagChecker (ville) : Fonction du code de validation ou d'erreur selon la valeur tapper dans l'input.

    let inputCityTagChecker = (value) => {
            if (value.length > 0 && (value.length < 3 || value.length > 20)) {
                errorTag("ClassErrorInputCityTag", "Ville non validé la ville doit faire entre 3 et 20 caractères", false, true);
                inputCityTag.style.outline = "1px solid red";
                inputCityTag.style.border = "1px solid red";
                cityValid.style.color = "red";
            } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
                errorTag("ClassErrorInputCityTag", "La ville ne doit pas contenir de caractères spéciaux", false, true);
                inputCityTag.style.outline = "1px solid red";
                inputCityTag.style.border = "1px solid red";
                cityValid.style.color = "red";
            } else if (value.length === 0) {
                errorTag("ClassErrorInputCityTag", "Ville non validé la ville doit faire entre 3 et 20 caractères", false, true);
                inputCityTag.style.outline = "1px solid red";
                inputCityTag.style.border = "1px solid red";
                cityValid.style.color = "red";
            } else {
                validTag("ClassErrorInputCityTag", "Ville validé", true, false);
                inputCityTag.style.outline = "1px solid green";
                inputCityTag.style.border = "1px solid green";
                cityValid.style.color = "green";
            }
        }
        // Variable inputEmailTagChecker(Email) : Fonction du code de validation ou d'erreur selon la valeur tapper dans l'input.

    let inputEmailTagChecker = (value) => {
        if (!value.match(/[a-z]+@[\w-]+\.[a-z]{2,4}$/i)) {
            errorTag("ClassErrorInputMailTag", "Le mail n'est pas validé il manque l'un des caractères indispensable suivant: @ ou .fr ou le .com", false, true);
            inputEmailTag.style.outline = "1px solid red";
            inputEmailTag.style.border = "1px solid red";
            emailValid.style.color = "red";
        } else {
            validTag("ClassErrorInputMailTag", "Email validé", true, false);
            inputEmailTag.style.outline = "1px solid green";
            inputEmailTag.style.border = "1px solid green";
            emailValid.style.color = "green";
        }
    };

    /* Avec la method ForEach sur linput du bouton validation Commande.
    Fonction qui contrôle si tout les inputs (champs) du formulaire ont bien été validés partout  avec la selection des ID des Inputs.
    Pour ensuite pouvoir cliquer sur le bouton validation Commande et envoyer le formulaire.*/
    // Constante inputs : Récupération - Sélection de tous les inputs de la page.

    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    // console.log(inputs);

    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            // console.log(e.target.id);
            switch (e.target.id) {

                case "firstName":
                    inputFirstNameTagChecker(e.target.value);
                    break;
                case "lastName":
                    inputLastNameTagChecker(e.target.value);
                    // console.log(e.target.value);
                    break;
                case "adress":
                    inputAdresseTagChecker(e.target.value);
                    // console.log(e.target.value);
                    break;
                case "city":
                    inputCityTagChecker(e.target.value);
                    // console.log(e.target.value);
                    break;
                case "email":
                    inputEmailTagChecker(e.target.value);
                    // console.log(e.target.value);
                    break;
                default:
                    nul;

            }
        });
    });

    // Avec AddEventListener. On regarde une fois que l'on envoie la demande du formulaire.
    //  Si toutes les données sont validés dans les ID de chaque inputs
    // On a ensuite un message de validation si les données sont bonnes.
    //  Ou un message d'erreur si ce n'est pas le cas.

    formContactTag.addEventListener("submit", (e) => {
        e.preventDefault();
        let inputFormulaire = document.querySelectorAll('input[type="text"], input[type="email"]');
        let firstName, lastName, address, city, email;
        inputFormulaire.forEach((input) => {
            switch (input.name) {

                case "firstName":
                    firstName = input.value;
                    break;
                case "lastName":
                    lastName = input.value;
                    break;
                case "adress":
                    address = input.value
                    break;
                case "city":
                    city = input.value;
                    break;
                case "email":
                    email = input.value;
                    break;
                default:
                    nul;
            }

        })
        if (firstName && lastName && address && city && email) {
            let contact = {
                firstName,
                lastName,
                address,
                city,
                email,
            };


            inputs.forEach((input) => (input.value = ""));
            firstName = null;
            lastName = null;
            address = null;
            city = null;
            email = null;

            // Permet de créer la méthode Post. Pour envoyer les données du formulaire à la page Confirmation de commande.
            /* "Get" - Obtenir  "myHeaders" pleins de méthodes.
                            "cors" = Permission ( requête )
                            cache : "default" */
            //   CRUD > Create(POST)(Ajouter), read(GET)(optenir), update(PUT)(ajouter), Delete(DELETE)(supprimer);
            // let products = JSON.parse(localStorage.getItem("cart"));
            let products = [];
            cart.forEach(element => {
                products.push(element.idproduit);
            });
            fetch('http://localhost:3000/api/furniture/order', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ contact, products })

                    //       //   mode: "cors",
                    //             //       //   credentials: "same-origin",

                    // lire le corps de réponse et donne le résultat en JSON.
                }).then((response) => response.json())
                .then(value => {
                    localStorage.setItem("orderConfirmation", value.orderId);
                    window.location.href = "confirmation-de-commande.html";
                });
            /* Permet d'aller à la page confirmation avec L'Id Order + le message de confirmation */

            alert("Panier et formulaire envoyé Inscription validée !");
        } else {
            alert("veuillez remplir correctement les champs");
        }
    });
}
form();