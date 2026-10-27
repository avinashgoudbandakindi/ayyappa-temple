/**
 * Sacred Ayyappa Swamy Temple — Interactive Engine
 * Features:
 * - 18 Sacred Steps (Pathinettam Padi) Interactive Explorer
 * - E-Seva & Pooja Booking Modal with Instant Receipt
 * - Auspicious E-Hundi Preset Calculator
 * - Web Audio API Sacred Temple Bell Chimes & Drone
 * - Dynamic Live Darshan & Aarti Countdown Timer
 * - Gallery Filter & Fullscreen Lightbox
 * - Sanctum Nocturnal Theme Toggle with LocalStorage
 * - Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initScrollProgress();
    initAartiTimer();
    init18SacredSteps();
    initSevaBooking();
    initDonations();
    initGallery();
    initTestimonials();
    initNewsletterAndContact();
    initDevotionalAudio();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL PROGRESS
   ========================================================================== */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Hamburger Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on navigation link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar Scroll Shadow & Styling (Respecting Dark Theme)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveSection();
    });

    // Active Section Spy
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

/* ==========================================================================
   2. SANCTUM THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('ayyappa_theme') || 'dark';

    // Apply saved theme (Default to dark for nocturnal sacred temple ambiance)
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ayyappa_theme', newTheme);
        updateThemeIcon(newTheme);
        showToast(newTheme === 'dark' ? 'Sanctum Dark Mode Activated 🌙' : 'Ivory Marble Mode Activated ☀️', 'fa-palette');
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

/* ==========================================================================
   3. 18 SACRED STEPS (PATHINETTAM PADI) INTERACTIVE EXPLORER
   ========================================================================== */

const stepsData = [
    {
        num: 1,
        title: "Netra (Sense of Sight)",
        sanskrit: "ज्ञानचक्षुः — Vision of Truth",
        cat: "1-5",
        desc: "The first step signifies gaining mastery over the visual sense. The devotee vows to close their eyes to worldly illusions and behold the divine essence of God in all living beings.",
        virtue: "Purification of Sight: Seeing God in everyone."
    },
    {
        num: 2,
        title: "Srotra (Sense of Hearing)",
        sanskrit: "श्रोत्र शुद्धिः — Sacred Listening",
        cat: "1-5",
        desc: "The second step represents controlling what one listens to. Devotees restrain the ears from gossip and negative speech, listening only to Vedic mantras, bhajans, and truth.",
        virtue: "Purification of Hearing: Attunement to Divine Sound."
    },
    {
        num: 3,
        title: "Ghrana (Sense of Smell)",
        sanskrit: "घ्राण संयमः — Sacred Breath & Purity",
        cat: "1-5",
        desc: "The third step teaches non-attachment to sensory perfumes. Instead, one learns to appreciate the subtle divine fragrance of sandalwood, holy basil (Tulsi), and sacred ashes (Bhasma).",
        virtue: "Purification of Breath: Living in pristine satvik harmony."
    },
    {
        num: 4,
        title: "Rasana (Sense of Taste)",
        sanskrit: "रसना शुद्धिः — Satvik Diet & Pure Speech",
        cat: "1-5",
        desc: "The fourth step requires overcoming the cravings of the palate through a pure vegetarian, satvik diet during the 41-day Vrutham, accompanied by soft, truthful, and benevolent speech.",
        virtue: "Purification of Tongue: Satvik nourishment and sweet speech."
    },
    {
        num: 5,
        title: "Tvak (Sense of Touch)",
        sanskrit: "त्वक् संयमः — Celibacy & Simplicity",
        cat: "1-5",
        desc: "The fifth step signifies Brahmacharya (spiritual austerity and celibacy), sleeping on mats or the earth, walking barefoot, and transcending bodily comforts to realize the imperishable soul.",
        virtue: "Purification of Touch: Transcending physical body identification."
    },
    {
        num: 6,
        title: "Kama (Desire / Lust)",
        sanskrit: "काम त्यागः — Renunciation of Selfish Desire",
        cat: "6-13",
        desc: "The sixth step burns away selfish cravings and physical infatuations, sublimating desire into unconditional devotion to the Lord and welfare of all living beings.",
        virtue: "Victory over Lust: Transmutation of desire into divine love."
    },
    {
        num: 7,
        title: "Krodha (Anger / Wrath)",
        sanskrit: "क्रोध उपशमः — Peace & Forbearance",
        cat: "6-13",
        desc: "The seventh step teaches absolute mastery over anger and irritability. A true Ayyappa devotee meets every provocation with patience, seeing the same divinity in adversaries.",
        virtue: "Victory over Anger: Radiant patience and serenity."
    },
    {
        num: 8,
        title: "Lobha (Greed / Avarice)",
        sanskrit: "लोभ विसर्जनम् — Generosity of Heart",
        cat: "6-13",
        desc: "The eighth step liberates the soul from the trap of accumulating unnecessary wealth and possessions, inspiring joyful sharing through Annadanam and temple service.",
        virtue: "Victory over Greed: Joyful charity and contentment."
    },
    {
        num: 9,
        title: "Moha (Delusion / Attachment)",
        sanskrit: "मोह निवृत्तिः — Clarity of Wisdom",
        cat: "6-13",
        desc: "The ninth step removes emotional delusions and attachment to transient worldly objects, anchoring the intellect in the eternal reality of the Supreme Self.",
        virtue: "Victory over Delusion: Unclouded spiritual perception."
    },
    {
        num: 10,
        title: "Mada (Pride / Arrogance)",
        sanskrit: "मद नाशः — Sacred Humility",
        cat: "6-13",
        desc: "The tenth step dissolves ego, pride of birth, wealth, status, or learning. Before Lord Ayyappa, all devotees wear black, call each other 'Swami', and bow in humble brotherhood.",
        virtue: "Victory over Pride: Supreme humility and equality."
    },
    {
        num: 11,
        title: "Matsarya (Jealousy / Envy)",
        sanskrit: "मात्सर्य शमनम् — Universal Goodwill",
        cat: "6-13",
        desc: "The eleventh step cleanses the heart of envy toward others' success, replacing jealousy with Mudita (delight in the prosperity and joy of fellow beings).",
        virtue: "Victory over Jealousy: Celebration of others' blessings."
    },
    {
        num: 12,
        title: "Asuya (Fault-Finding / Cynicism)",
        sanskrit: "असूया त्यागः — Pure Hearted Seeing",
        cat: "6-13",
        desc: "The twelfth step eliminates the habit of seeking flaws in others. The devotee focuses entirely on self-purification and appreciating virtue wherever it exists.",
        virtue: "Victory over Cynicism: Focus on virtue and inner light."
    },
    {
        num: 13,
        title: "Dambha (Hypocrisy / Pretense)",
        sanskrit: "दम्भ निवारणम् — Transparent Truthfulness",
        cat: "6-13",
        desc: "The thirteenth step shatters religious hypocrisy and showing off. True devotion is an intimate, sincere communion between the soul and Lord Manikanta.",
        virtue: "Victory over Hypocrisy: Authentic, unpretentious devotion."
    },
    {
        num: 14,
        title: "Sattva Guna (Purity & Harmony)",
        sanskrit: "सत्त्व संवर्धनम् — Radiance of Goodness",
        cat: "14-16",
        desc: "The fourteenth step cultivates luminous clarity, compassion, peacefulness, and unshakeable inner balance in all situations of joy and sorrow.",
        virtue: "Harmonizing the mind with divine tranquility."
    },
    {
        num: 15,
        title: "Rajas Guna (Passion & Restlessness)",
        sanskrit: "रजस् नियमनम् — Channelling Dynamic Action",
        cat: "14-16",
        desc: "The fifteenth step channels active energy and passion away from selfish ambition and into selfless service (Nishkama Karma) and community welfare.",
        virtue: "Sublimation of restless energy into noble service."
    },
    {
        num: 16,
        title: "Tamas Guna (Inertia & Ignorance)",
        sanskrit: "तमस् उन्मूलनम् — Awakening from Slumber",
        cat: "14-16",
        desc: "The sixteenth step conquers laziness, lethargy, fear, and ignorance through early morning wakefulness (Brahma Muhurtham 4:00 AM) and rigorous Vedic discipline.",
        virtue: "Dispelling darkness and inertia through divine vigilance."
    },
    {
        num: 17,
        title: "Vidya (Spiritual Wisdom)",
        sanskrit: "विद्या प्रकाशः — Intuitive Realization",
        cat: "17-18",
        desc: "The seventeenth step represents Brahma Vidya — the realization of 'Tat Tvam Asi' (Thou Art That). The pilgrim realizes that the self within is none other than Lord Ayyappa.",
        virtue: "The dawn of non-dual spiritual knowledge."
    },
    {
        num: 18,
        title: "Avidya Nasham / Moksha (Liberation)",
        sanskrit: "कैवल्य मुक्तिः — Union with Lord Ayyappa",
        cat: "17-18",
        desc: "The final golden step represents the total dissolution of the separate ego, ascending into eternal bliss, spiritual liberation, and oneness with Supreme Consciousness.",
        virtue: "Swamiye Saranam Ayyappa: Final Liberation and Divine Bliss."
    }
];

function init18SacredSteps() {
    const grid = document.getElementById('steps-selector-grid');
    const badge = document.getElementById('step-badge');
    const title = document.getElementById('step-title');
    const sanskrit = document.getElementById('step-sanskrit');
    const desc = document.getElementById('step-desc');
    const virtue = document.getElementById('step-virtue');
    const catBtns = document.querySelectorAll('.step-cat-btn');

    if (!grid) return;

    // Render 18 Step Tiles
    grid.innerHTML = '';
    stepsData.forEach((step, index) => {
        const tile = document.createElement('div');
        tile.className = `step-tile ${index === 0 ? 'active' : ''}`;
        tile.setAttribute('data-step-index', index);
        tile.setAttribute('data-cat', step.cat);
        tile.innerHTML = `
            <span class="step-num">${step.num}</span>
            <span class="step-sub">${step.title.split(' ')[0]}</span>
        `;
        tile.addEventListener('click', () => selectStep(index));
        grid.appendChild(tile);
    });

    // Category Tabs Filtering
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const range = btn.getAttribute('data-range');
            const tiles = document.querySelectorAll('.step-tile');
            let firstVisibleIndex = -1;

            tiles.forEach(tile => {
                const stepCat = tile.getAttribute('data-cat');
                if (stepCat === range) {
                    tile.style.display = 'flex';
                    if (firstVisibleIndex === -1) {
                        firstVisibleIndex = parseInt(tile.getAttribute('data-step-index'));
                    }
                } else {
                    tile.style.display = 'none';
                }
            });

            if (firstVisibleIndex !== -1) {
                selectStep(firstVisibleIndex);
            }
        });
    });

    function selectStep(index) {
        const step = stepsData[index];
        const allTiles = document.querySelectorAll('.step-tile');

        allTiles.forEach(t => t.classList.remove('active'));
        const activeTile = document.querySelector(`.step-tile[data-step-index="${index}"]`);
        if (activeTile) activeTile.classList.add('active');

        // Update detail card
        badge.textContent = `Step ${step.num}`;
        title.textContent = step.title;
        sanskrit.textContent = step.sanskrit;
        desc.textContent = step.desc;
        virtue.textContent = step.virtue;
    }
}

/* ==========================================================================
   4. E-SEVA & POOJA BOOKING MODAL
   ========================================================================== */

function initSevaBooking() {
    const modal = document.getElementById('seva-modal');
    const closeBtn = document.getElementById('seva-modal-close');
    const titleEl = document.getElementById('modal-seva-title');
    const priceEl = document.getElementById('modal-seva-price');
    const form = document.getElementById('seva-booking-form');
    const bookBtns = document.querySelectorAll('.book-seva-btn');

    if (!modal) return;

    // Set minimum date to today
    const dateInput = document.getElementById('seva-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    bookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sevaName = btn.getAttribute('data-seva');
            const sevaPrice = btn.getAttribute('data-price');

            titleEl.textContent = `Book ${sevaName}`;
            priceEl.textContent = `₹ ${parseInt(sevaPrice).toLocaleString('en-IN')}`;
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const devoteeName = document.getElementById('seva-devotee-name').value;
        const phone = document.getElementById('seva-phone').value;
        const date = document.getElementById('seva-date').value;
        const seva = titleEl.textContent.replace('Book ', '');

        modal.classList.remove('active');
        form.reset();

        showToast(`Blessings! ${seva} booked for ${devoteeName} on ${date}. An SMS confirmation has been sent to ${phone}.`, 'fa-circle-check');
    });
}

/* ==========================================================================
   5. AUSPICIOUS E-HUNDI DONATION PRESET CALCULATOR
   ========================================================================== */

function initDonations() {
    const presetBtns = document.querySelectorAll('.preset-btn');
    const amountInput = document.getElementById('donation-amount');
    const donationForm = document.getElementById('donation-form');

    if (!amountInput) return;

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-val');
            amountInput.value = val;
        });
    });

    amountInput.addEventListener('input', () => {
        const currentVal = amountInput.value;
        let matched = false;
        presetBtns.forEach(btn => {
            if (btn.getAttribute('data-val') === currentVal) {
                btn.classList.add('active');
                matched = true;
            } else {
                btn.classList.remove('active');
            }
        });
        if (!matched) {
            presetBtns.forEach(btn => btn.classList.remove('active'));
        }
    });

    if (donationForm) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const donorName = document.getElementById('donor-name').value;
            const amount = amountInput.value;
            const purpose = document.getElementById('donation-purpose').options[document.getElementById('donation-purpose').selectedIndex].text;

            donationForm.reset();
            amountInput.value = '501';
            presetBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('.preset-btn[data-val="501"]').classList.add('active');

            showToast(`Heartfelt gratitude, ${donorName}! Your sacred offering of ₹${parseInt(amount).toLocaleString('en-IN')} for ${purpose} has been received. May Lord Ayyappa bless your family.`, 'fa-hands-praying');
        });
    }
}

/* ==========================================================================
   6. GALLERY FILTERING & FULLSCREEN LIGHTBOX
   ========================================================================== */

function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    if (!galleryItems.length) return;

    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');
                if (category === 'all' || itemCat === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-overlay h3')?.textContent || 'Temple Sanctum';
            const desc = item.querySelector('.gallery-overlay p')?.textContent || '';

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;
            lightbox.classList.add('active');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
}

/* ==========================================================================
   7. DEVOTEE TESTIMONIALS & MODAL
   ========================================================================== */

function initTestimonials() {
    const modal = document.getElementById('testimonial-modal');
    const openBtn = document.getElementById('share-experience-btn');
    const closeBtn = document.getElementById('testimonial-modal-close');
    const form = document.getElementById('testimonial-form');
    const grid = document.getElementById('testimonials-grid');

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('test-name').value;
        const location = document.getElementById('test-location').value;
        const msg = document.getElementById('test-message').value;
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text">"${msg}"</p>
            <div class="devotee-profile">
                <div class="devotee-avatar">${initials}</div>
                <div>
                    <strong>${name}</strong>
                    <span>${location} • Devotee</span>
                </div>
            </div>
        `;

        grid.prepend(card);
        modal.classList.remove('active');
        form.reset();

        showToast('Thank you for sharing your divine experience with the community! 🪔', 'fa-heart');
    });
}

/* ==========================================================================
   8. DYNAMIC AARTI & MAKARAVILAKKU COUNTDOWN TIMER
   ========================================================================== */

function initAartiTimer() {
    const aartiTag = document.getElementById('aarti-timer');
    const liveBadge = document.getElementById('live-darshan-badge');

    function updateTimes() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // Check if temple is currently open
        // Morning: 5:00 AM to 11:30 AM (5 to 11.5)
        // Evening: 5:00 PM to 9:00 PM (17 to 21)
        const isMorningOpen = (hours > 5 || (hours === 5 && minutes >= 0)) && (hours < 11 || (hours === 11 && minutes <= 30));
        const isEveningOpen = (hours >= 17 && hours < 21);

        if (liveBadge) {
            if (isMorningOpen || isEveningOpen) {
                liveBadge.innerHTML = `<span class="pulse-dot"></span><span class="status-text">Temple Open for Darshan</span>`;
                liveBadge.style.background = 'rgba(46, 125, 50, 0.25)';
            } else {
                liveBadge.innerHTML = `<span class="pulse-dot" style="background:#e65100"></span><span class="status-text">Sanctum Closed (Next: 5:00 PM)</span>`;
                liveBadge.style.background = 'rgba(230, 81, 0, 0.25)';
            }
        }

        // Calculate time to next Deeparadhana (6:30 PM = 18:30)
        let target = new Date();
        target.setHours(18, 30, 0, 0);

        if (now > target) {
            target.setDate(target.getDate() + 1);
        }

        const diffMs = target - now;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (aartiTag) {
            aartiTag.textContent = `In ${diffHrs}h ${diffMins}m`;
        }
    }

    updateTimes();
    setInterval(updateTimes, 60000); // Update every minute
}

/* ==========================================================================
   9. NEWSLETTER, CONTACT & EVENT REGISTRATION
   ========================================================================== */

function initNewsletterAndContact() {
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');
    const eventBtns = document.querySelectorAll('.register-event-btn');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.reset();
            showToast('Swamiye Saranam! You are subscribed to sacred temple notifications.', 'fa-bell');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            contactForm.reset();
            showToast(`Thank you, ${name}. Your message has reached the temple administration. We will reply promptly.`, 'fa-envelope-circle-check');
        });
    }

    eventBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const eventName = btn.getAttribute('data-event');
            showToast(`Interest registered for ${eventName}. Festival updates will be sent to your email.`, 'fa-calendar-check');
        });
    });
}

/* ==========================================================================
   10. DEVOTIONAL AUDIO SYSTEM (WEB AUDIO API TEMPLE CHIMES & OM DRONE)
   ========================================================================== */

function initDevotionalAudio() {
    const toggleBtn = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    let audioCtx = null;
    let isPlaying = false;
    let droneOsc = null;
    let droneGain = null;
    let chimeInterval = null;

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        if (!isPlaying) {
            startAudio();
        } else {
            stopAudio();
        }
    });

    function startAudio() {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Sacred Tanpura / Om Drone (F#2 = ~92.5Hz, C#3 = ~138.6Hz)
            droneGain = audioCtx.createGain();
            droneGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            droneGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);
            droneGain.connect(audioCtx.destination);

            droneOsc = audioCtx.createOscillator();
            droneOsc.type = 'sine';
            droneOsc.frequency.setValueAtTime(92.5, audioCtx.currentTime); // Fundamental
            droneOsc.connect(droneGain);
            droneOsc.start();

            // Play first bell chime immediately
            playTempleBell();

            // Recurring gentle temple bell chimes every 4.5 seconds
            chimeInterval = setInterval(() => {
                if (isPlaying) playTempleBell();
            }, 4500);

            isPlaying = true;
            toggleBtn.classList.add('playing');
            audioIcon.classList.remove('fa-volume-xmark');
            audioIcon.classList.add('fa-volume-high');
            showToast('Sacred Temple Chimes & Ambiance Playing 🔔', 'fa-bell');
        } catch (err) {
            console.error('Audio initialization error:', err);
        }
    }

    function stopAudio() {
        if (chimeInterval) clearInterval(chimeInterval);
        if (droneGain && audioCtx) {
            droneGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
            setTimeout(() => {
                if (droneOsc) droneOsc.stop();
                if (audioCtx) audioCtx.close();
            }, 1000);
        }
        isPlaying = false;
        toggleBtn.classList.remove('playing');
        audioIcon.classList.remove('fa-volume-high');
        audioIcon.classList.add('fa-volume-xmark');
        showToast('Temple Ambiance Muted', 'fa-volume-xmark');
    }

    // Synthesizes an authentic resonant brass temple bell with harmonics
    function playTempleBell() {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const freqs = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 harmonics

        freqs.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = idx === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            const initialVolume = idx === 0 ? 0.12 : 0.05 / (idx + 1);
            gain.gain.setValueAtTime(initialVolume, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2 + (idx * 0.4));

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now);
            osc.stop(now + 4.0);
        });
    }
}

/* ==========================================================================
   11. HELPER: TOAST NOTIFICATION
   ========================================================================== */

function showToast(message, iconClass = 'fa-om') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${iconClass}"></i><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 4500);
}

// Global hook for blog read more modals
window.openBlogModal = function(id) {
    const titles = [
        "The 41-Day Mandala Vrutham: Sacred Austerity and Science",
        "The Mystery of the Irumudi: Carrying Ghee to the Divine",
        "Harivarasanam: The Sacred Lullaby of Lord Ayyappa"
    ];
    showToast(`Opening complete spiritual discourse: "${titles[id - 1]}" 📜`, 'fa-book-open');
};