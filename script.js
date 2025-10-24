fetch('header.html')
.then(response => response.text())
.then(data => {
    // Étape 1 : Placer le HTML du header dans le placeholder
    document.querySelector('#header-placeholder').innerHTML = data;
    console.log('Header chargé !');

    // Étape 2 : Maintenant que le header existe, exécuter le script du menu burger
    const burgerMenu = document.querySelector('#burgerMenu');
    console.log('Burger menu trouvé:', burgerMenu);
    const menuNav = document.querySelector('#menuNav');
    const menuOverlay = document.querySelector('#menuOverlay');
    
    // querySelectorAll était déjà correct pour sélectionner plusieurs éléments
    const menuLinks = document.querySelectorAll('.btn-header');

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        menuNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuNav.classList.contains('active') ? 'hidden' : '';
    }

    burgerMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 724) {
                toggleMenu();
            }
        });
    });
});

// Initialisation d'EmailJS avec ta clé publique
(function () {
    emailjs.init("y5pAgHYgNLQh76PVw");
})();

// Attendre que le DOM soit complètement chargé avant d'initialiser le formulaire
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById("contactForm");

    // Vérifier si le formulaire existe sur la page
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const btn = this.querySelector(".submit-btn");
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            // Récupération des données du formulaire
            const formData = {
                nom: document.getElementById("nom").value,
                prenom: document.getElementById("prenom").value,
                email: document.getElementById("email").value,
                entreprise: document.getElementById("entreprise").value,
                motif: document.getElementById("motif").value,
                message: document.getElementById("message").value
            };

            // Envoi via EmailJS
            emailjs.send("service_ayhb3rl", "template_ugancga", formData)
                .then(function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                    // Succès
                    btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                    btn.style.backgroundColor = "#4CAF50";

                    // Réinitialiser le formulaire après 3 secondes
                    setTimeout(function () {
                        contactForm.reset();
                        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                        btn.style.backgroundColor = "";
                        btn.disabled = false;
                    }, 3000);
                })
                .catch(function (error) {
                    console.error("Erreur EmailJS :", error);
                    btn.innerHTML = '<i class="fas fa-times"></i> Erreur lors de l\'envoi';
                    btn.style.backgroundColor = "#f44336";

                    setTimeout(function () {
                        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                        btn.style.backgroundColor = "";
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
});