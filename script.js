fetch('header.html')
    .then(response => response.text())
    .then(data => {
        // Step 1: Place the header HTML into the placeholder
        document.getElementById('header-placeholder').innerHTML = data;
        console.log('Header chargé !');

        // Step 2: Now that the header exists, run the burger menu script
        const burgerMenu = document.getElementById('burgerMenu');
        console.log('Burger menu trouvé:', burgerMenu); 
        const menuNav = document.getElementById('menuNav');
        const menuOverlay = document.getElementById('menuOverlay');
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

// document.getElementById('contact_mail').addEventListener('click', function() {
//     window.location.href = "contact.html";
// });
// document.getElementById('linke').addEventListener('click', function() {
//     window.location.href = "https://linkedin.com/in/arthur-berton-6b1200338";
// });
// document.getElementById('git').addEventListener('click', function() {
//     window.location.href = "https://github.com/Kwakature";
// });
// document.getElementById('projet_eff').addEventListener('click', function() {
//     window.location.href = "https://github.com/Kwakature/fil-rouge-EFFICOM";
// });

// Initialisation d'EmailJS avec ta clé publique
(function() {
    emailjs.init("y5pAgHYgNLQh76PVw");
})();

// Attendre que le DOM soit complètement chargé avant d'initialiser le formulaire
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById("contactForm");
    
    // Vérifier si le formulaire existe sur la page
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
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
                .then(function(response) {
                    console.log("SUCCESS!", response.status, response.text);
                    // Succès
                    btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                    btn.style.backgroundColor = "#4CAF50";

                    // Réinitialiser le formulaire après 3 secondes
                    setTimeout(function() {
                        contactForm.reset();
                        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                        btn.style.backgroundColor = "";
                        btn.disabled = false;
                    }, 3000);
                })
                .catch(function(error) {
                    console.error("Erreur EmailJS :", error);
                    btn.innerHTML = '<i class="fas fa-times"></i> Erreur lors de l\'envoi';
                    btn.style.backgroundColor = "#f44336";

                    setTimeout(function() {
                        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                        btn.style.backgroundColor = "";
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
});