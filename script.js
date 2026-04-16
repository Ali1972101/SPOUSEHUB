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

    
    const signupForm = document.getElementById('signup-form');
    const signupPhotoInput = document.getElementById('signup-photo');
    const photoPreview = document.getElementById('photo-preview');

    if (signupForm) {
    
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
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Logging in...';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 600);
        });
    }

    // ---- Dashboard Logic ----
    const matchesContainer = document.getElementById('matches-container');
    if (matchesContainer) {
        const mockUsers = [
            { id: 1, name: 'Emma', age: 28, bio: 'Love hiking and terrible puns.', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { id: 2, name: 'James', age: 31, bio: 'Coffee addict. Let\'s travel!', img: 'https://randomuser.me/api/portraits/men/46.jpg' },
            { id: 3, name: 'Sophia', age: 26, bio: 'Designer & dog mom.', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
            { id: 4, name: 'Michael', age: 29, bio: 'Musician looking for my muse.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { id: 5, name: 'Isabella', age: 27, bio: 'Foodie and movie enthusiast.', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
            { id: 6, name: 'William', age: 30, bio: 'Tech guy by day, chef by night.', img: 'https://randomuser.me/api/portraits/men/90.jpg' },
            { id: 7, name: 'Olivia', age: 25, bio: 'Yoga, tea, and good books.', img: 'https://randomuser.me/api/portraits/women/33.jpg' },
            { id: 8, name: 'Lucas', age: 32, bio: 'Architect. Passionate about art.', img: 'https://randomuser.me/api/portraits/men/62.jpg' }
        ];

        mockUsers.forEach((user, index) => {
            const card = document.createElement('div');
            card.className = 'match-card';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="match-img-wrapper">
                    <img src="${user.img}" alt="${user.name}" class="match-img">
                </div>
                <div class="match-info">
                    <div class="match-header">
                        <h3>${user.name}, ${user.age}</h3>
                    </div>
                    <p class="match-bio">${user.bio}</p>
                    <div class="match-actions">
                        <button class="action-btn like-btn" onclick="toggleLike(this)" title="Like Profile">
                            <i class="ph ph-heart"></i>
                        </button>
                        <button class="action-btn message-btn" onclick="openMessageModal('${user.name}')" title="Send Message">
                            <i class="ph ph-chat-circle"></i>
                        </button>
                    </div>
                </div>
            `;
            matchesContainer.appendChild(card);
        });
    }

    const messageModal = document.getElementById('message-modal');
    const closeModal = document.getElementById('close-modal');
    const sendMessageBtn = document.getElementById('send-message-btn');

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            messageModal.classList.remove('open');
        });
    }
    
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const btnOriginal = sendMessageBtn.innerHTML;
            sendMessageBtn.innerHTML = 'Sending...';
            setTimeout(() => {
                alert('Message sent successfully!');
                messageModal.classList.remove('open');
                document.getElementById('message-text').value = '';
                sendMessageBtn.innerHTML = btnOriginal;
            }, 600);
        });
    }

    if (messageModal) {
        messageModal.addEventListener('click', (e) => {
            if (e.target === messageModal) {
                messageModal.classList.remove('open');
            }
        });
    }
});

// Global functions for inline handlers
window.toggleLike = function(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('liked')) {
        icon.classList.remove('ph-heart');
        icon.classList.add('ph-heart', 'ph-fill');
    } else {
        icon.classList.remove('ph-fill');
        icon.classList.add('ph-heart');
    }
    
    // Add simple pop animation
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
};

window.openMessageModal = function(name) {
    const modal = document.getElementById('message-modal');
    const modalName = document.getElementById('modal-user-name');
    if (modal && modalName) {
        modalName.textContent = `Message ${name}`;
        modal.classList.add('open');
    }
};