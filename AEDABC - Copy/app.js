document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper for the gallery
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000, // Auto-slide every 3 seconds
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // Scroll to contact section on button click
    const contactButton = document.getElementById('scrollToContact');
    contactButton.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Handle service item click to enlarge image
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', () => {
            const modal = createModal(item.dataset.img, item.dataset.description, item.dataset.alt);
            document.body.appendChild(modal);
        });
    });

    // Function to create a modal for services
    const createModal = (imgSrc, description, altText) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imgSrc}" alt="${altText}" />
                <p>${description}</p>
                <button class="close-modal">Sulge</button>
            </div>
        `;

        // Close the modal on clicking the close button or outside the modal content
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.classList.contains('close-modal')) {
                document.body.removeChild(modal);
            }
        });

        return modal;
    };

    // Formspree submission handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
            });
            if (response.ok) {
                document.querySelector('.form-success').style.display = 'block';
                contactForm.reset();
            } else {
                document.querySelector('.form-error').style.display = 'block';
            }
        } catch (error) {
            document.querySelector('.form-error').style.display = 'block';
        }
    });
});
