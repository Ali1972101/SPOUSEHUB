document.addEventListener('DOMContentLoaded', () => {
    // ---- Navigation / Sidebar Logic (Only on Index Page) ----
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && sidebar && overlay) {
        // Function to toggle menu
        const toggleMenu = () => {
            hamburgerBtn.classList.toggle('open');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
            
            // Prevent body scrolling when menu is open
            if (sidebar.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        };

        // Event listener for hamburger button
        hamburgerBtn.addEventListener('click', toggleMenu);

        // Event listener for overlay (clicking outside the sidebar)
        overlay.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (sidebar.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                toggleMenu();
            }
        });
        console.log('Premium Sidebar Navigation Active');
    }

    // ---- Signup Page Logic ----
    const signupForm = document.getElementById('signup-form');
    const signupPhotoInput = document.getElementById('signup-photo');
    const photoPreview = document.getElementById('photo-preview');

    if (signupForm) {
        // Photo Preview Logic
        if (signupPhotoInput && photoPreview) {
            signupPhotoInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        photoPreview.style.backgroundImage = `url('${e.target.result}')`;
                        photoPreview.classList.add('has-image');
                    }
                    
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Signup completed! Welcome to SPOUSEHUB.');
            window.location.href = 'index.html';
        });
    }


    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login successful! Welcome back.');
            window.location.href = 'index.html';
        });
    }
});