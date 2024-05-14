// Scroll smooth vers les sections avec centrage vertical
document.querySelectorAll(".nav-link-menu").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const sectionId = this.getAttribute("href");
    const section = document.querySelector(sectionId);
    const windowHeight = window.innerHeight;
    const sectionHeight = section.clientHeight;
    const sectionTop = section.offsetTop;

    // Calcul de l'offset pour centrer la section verticalement
    const offset = sectionTop - (windowHeight - sectionHeight) / 1.9;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

// Fonction pour basculer vers la version française du site
function switchToFrench() {
  window.location.href = "index.html"; // Remplacez "index_fr.html" par le nom de votre fichier HTML en français
}

// Fonction pour basculer vers la version anglaise du site
function switchToEnglish() {
  window.location.href = "index-eng.html"; // Remplacez "index_fr.html" par le nom de votre fichier HTML en français
}

// theme sombre
const toggleButton = document.getElementById("toggle-theme");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


// MENU SECTION "A PROPOS"
document.querySelectorAll(".nav-link-propos").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Récupérer l'ID de la sous-section correspondante
    const targetId = this.getAttribute("href").substring(1);

    // Récupérer la sous-section correspondante
    const subSection = document.getElementById(targetId);

    // Vérifier si la sous-section est déjà active
    const isActive = subSection.classList.contains("active");

    // Masquer toutes les sous-sections
    document.querySelectorAll(".sub-section-propos").forEach((subSection) => {
      subSection.classList.remove("active");
    });

    // Si la sous-section est déjà active, désactivez-la et quittez la fonction
    if (isActive) {
      link.classList.remove("active"); // Supprimer la classe active du lien de menu
      return;
    }

    // Afficher la sous-section correspondante
    subSection.classList.add("active");

    // Mettre à jour les classes des liens du menu
    document.querySelectorAll(".nav-link-propos").forEach((navLink) => {
      navLink.classList.remove("active");
    });
    this.classList.add("active");

    // Faire défiler jusqu'à la sous-section active
    subSection.scrollIntoView({ behavior: 'smooth', block: 'end'});
  });
});

// MENU SECTION "PROJETS"
document.querySelectorAll(".nav-link-proj").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Récupérer l'ID de la sous-section correspondante
    const targetId = this.getAttribute("href").substring(1);

    // Récupérer la sous-section correspondante
    const subSection = document.getElementById(targetId);

    // Vérifier si la sous-section est déjà active
    const isActive = subSection.classList.contains("active");

    // Masquer toutes les sous-sections
    document.querySelectorAll(".sub-section-proj").forEach((subSection) => {
      subSection.classList.remove("active");
    });

    // Si la sous-section est déjà active, désactivez-la et quittez la fonction
    if (isActive) {
      link.classList.remove("active"); // Supprimer la classe active du lien de menu
      return;
    }

    // Afficher la sous-section correspondante
    subSection.classList.add("active");

    // Mettre à jour les classes des liens du menu
    document.querySelectorAll(".nav-link-proj").forEach((navLink) => {
      navLink.classList.remove("active");
    });
    this.classList.add("active");

    // Faire défiler jusqu'à la sous-section active
    subSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });
});

// CAROUSEL

document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner la piste du carrousel
  const trackCarousel = document.querySelector('.track-carousel');
  // Sélectionner tous les logos dans le carrousel
  const logoCarousels = document.querySelectorAll('.logo-carousel');
  // Cloner le premier logo pour l'ajouter à la fin
  const firstLogo = logoCarousels[0].cloneNode(true);
  // Cloner le dernier logo pour l'ajouter au début
  const lastLogo = logoCarousels[logoCarousels.length - 1].cloneNode(true);

  // Ajouter le clone du premier logo à la fin de la piste du carrousel
  trackCarousel.appendChild(firstLogo);
  // Insérer le clone du dernier logo au tout début de la piste du carrousel
  trackCarousel.insertBefore(lastLogo, logoCarousels[0]);
});


// Sélectionnez toutes les sections
const sections = document.querySelectorAll(".section");

// Parcourez chaque section
sections.forEach((section) => {
  // Récupérez l'ID de la section
  const sectionId = section.id;

  // Récupérez l'élément de menu correspondant
  const menuItem = document.querySelector(`[href="#${sectionId}"]`);

  // Ajoutez un écouteur d'événement de défilement pour détecter quand la section est en vue
  window.addEventListener("scroll", () => {
    // Récupérez la position de la section par rapport au haut de la fenêtre
    const sectionTop = section.getBoundingClientRect().top;

    // Vérifiez si la section est dans la vue
    if (sectionTop >= 0 && sectionTop < window.innerHeight) {
      // Ajoutez la classe "active" à l'élément de menu correspondant
      menuItem.classList.add("active");
    } else {
      // Sinon, retirez la classe "active"
      menuItem.classList.remove("active");
    }
  });
});

// DEFINI LA TAILLE DU FORMULAIRE SECTION "CONTACT"
document.addEventListener('DOMContentLoaded', function() {
  var formulaire = document.getElementById('monFormulaire');
  formulaire.style.width = '40vw'; // Définir la largeur à 80%
  formulaire.style.height = '120px'; // Définir la hauteur à 300px
});

// DEFINI L'EFFET HOVER DES CARTES SECTION
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {
    section.addEventListener("mousemove", handleHover);
    section.addEventListener("mouseleave", resetStyles);
  });

  function handleHover(e) {
    const section = e.target.closest('.section'); // On s'assure que le hover ne s'applique qu'à la section principale
    if (!section) return; // Si ce n'est pas une section, on ne fait rien

    const { clientX, clientY } = e;
    const { top, left, width, height } = section.getBoundingClientRect();

    const offsetY = (clientY - top) / height;
    const offsetX = (clientX - left) / width;

    const rotateX = (offsetY - 0.2) * -2;
    const rotateY = (offsetX - 0.2) * -2;

    // Appliquer la transformation à la section
    section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function resetStyles(e) {
    const section = e.target.closest('.section'); // Même validation
    if (!section) return;

    // Réinitialiser la transformation de la section
    section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }
});


// Obtenir toutes les images avec la classe "enlargeable"
const enlargeableImages = document.querySelectorAll('.enlargeable');

// Obtenir le modal et ses éléments
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

// Ajouter un événement de clic à chaque image enlargeable
enlargeableImages.forEach((image) => {
    image.addEventListener('click', () => {
        modalImage.src = image.src; // Changer la source de l'image de la modal
        modal.style.display = 'flex'; // Afficher le modal
    });
});

// Ajouter un événement pour fermer le modal avec le bouton de fermeture
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Cacher le modal
});

// Fermer le modal en cliquant à l'extérieur de l'image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // Cacher le modal
    }
});
