/**
 * Main Application Coordinator
 * Sree Ayyappa Bhaktha Samithi — Sree Ayyappa Swamy Temple, Somajiguda
 * Pure JavaScript ES6 Module
 */

import { CONFIG } from './config.js';
import { TRANSLATIONS } from './i18n/translations.js';
import { templeRepository } from './repository/templeRepository.js';
import { MockBookingAdapter } from './repository/bookingAdapter.js';

class TempleApp {
    constructor() {
        this.currentLocale = localStorage.getItem('temple_locale') || CONFIG.DEFAULT_LOCALE;
        this.currentTheme = localStorage.getItem('temple_theme') || 'ivory';
        this.timingData = null;
        this.selectedSeva = null;
        this.bookingDraft = {
            sevaId: '',
            sevaName: '',
            priceInInr: 0,
            preferredDateIso: '',
            sessionSlot: 'MORNING',
            devoteeName: '',
            gothram: '',
            nakshatram: '',
            phone: '',
            email: '',
            postalAddressForPrasadam: ''
        };

        this.init();
    }

    async init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        await this.loadAllContent();
        this.renderAll();
        this.initTimingEngineWatcher();
    }

    // --- I18N SYSTEM ---
    setLocale(newLocale) {
        if (!CONFIG.SUPPORTED_LOCALES.includes(newLocale)) return;
        this.currentLocale = newLocale;
        localStorage.setItem('temple_locale', newLocale);
        document.documentElement.lang = newLocale;
        
        // Update language switcher buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.locale === newLocale);
        });

        this.renderAll();
        this.showToast(
            newLocale === 'te' ? 'భాష తెలుగుకు మార్చబడింది' :
            newLocale === 'hi' ? 'भाषा हिन्दी में बदली गई' : 'Language set to English',
            'fa-language'
        );
    }

    t(key) {
        return TRANSLATIONS[this.currentLocale]?.[key] || TRANSLATIONS['en']?.[key] || key;
    }

    getLocalized(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[this.currentLocale] || obj['en'] || Object.values(obj)[0] || '';
    }

    // --- THEME SYSTEM ---
    applyTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('temple_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('theme-toggle-icon');
        if (icon) {
            icon.className = theme === 'charcoal' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        const nextTheme = this.currentTheme === 'charcoal' ? 'ivory' : 'charcoal';
        this.applyTheme(nextTheme);
        this.showToast(nextTheme === 'charcoal' ? 'Sanctum Nocturnal Theme Activated' : 'Temple Ivory Theme Activated', 'fa-palette');
    }

    // --- CONTENT LOADING ---
    async loadAllContent() {
        try {
            this.templeInfo = await templeRepository.getTempleInfo();
            this.deities = await templeRepository.getDeities();
            this.sevas = await templeRepository.getSevas();
            this.timingData = await templeRepository.getTodayTimings();
            this.weeklySchedule = await templeRepository.getWeeklySchedule();
            this.events = await templeRepository.getUpcomingEvents();
            this.announcements = await templeRepository.getAnnouncements();
            this.galleryItems = await templeRepository.getGalleryItems('ALL');
            this.faqs = await templeRepository.getFaqs();
        } catch (err) {
            console.error('Error loading temple data:', err);
        }
    }

    // --- RENDERING ---
    renderAll() {
        this.renderStaticText();
        this.renderAnnouncements();
        this.renderTodayTiming();
        this.renderDeities();
        this.renderSevas();
        this.renderFestivals();
        this.renderGallery();
        this.renderFaqs();
        this.renderContact();
    }

    renderStaticText() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
    }

    renderAnnouncements() {
        const barContainer = document.getElementById('announcement-top-bar');
        const cardsContainer = document.getElementById('announcements-grid');
        
        if (!this.announcements || this.announcements.length === 0) {
            if (barContainer) barContainer.style.display = 'none';
            if (cardsContainer) cardsContainer.innerHTML = '<p class="empty-state">No current announcements.</p>';
            return;
        }

        const topNotice = this.announcements[0];
        if (barContainer && topNotice) {
            barContainer.style.display = 'block';
            barContainer.innerHTML = `
                <div class="container top-notice-content">
                    <span class="notice-badge"><i class="fas fa-bullhorn"></i> ${topNotice.urgency === 'IMPORTANT' ? 'IMPORTANT' : 'NOTICE'}</span>
                    <span class="notice-text"><strong>${this.getLocalized(topNotice.title)}:</strong> ${this.getLocalized(topNotice.content)}</span>
                    ${topNotice.actionUrl ? `<a href="${topNotice.actionUrl}" class="notice-link">${this.getLocalized(topNotice.actionText) || 'Details'} <i class="fas fa-arrow-right"></i></a>` : ''}
                </div>
            `;
        }

        if (cardsContainer) {
            cardsContainer.innerHTML = this.announcements.map(a => `
                <div class="announcement-card urgency-${a.urgency.toLowerCase()}">
                    <div class="announcement-header">
                        <span class="announcement-badge">${a.urgency}</span>
                        <h3>${this.getLocalized(a.title)}</h3>
                    </div>
                    <p>${this.getLocalized(a.content)}</p>
                    ${a.actionUrl ? `<a href="${a.actionUrl}" class="btn-text">${this.getLocalized(a.actionText) || 'Learn More'} <i class="fas fa-angle-right"></i></a>` : ''}
                </div>
            `).join('');
        }
    }

    renderTodayTiming() {
        const container = document.getElementById('today-timing-widget');
        if (!container || !this.timingData) return;

        const { isOpen, currentSession, nextSession, nextRitual, specialNotice, resolvedFrom } = this.timingData;

        container.innerHTML = `
            <div class="timing-status-banner ${isOpen ? 'is-open' : 'is-closed'}">
                <div class="status-indicator">
                    <span class="status-dot"></span>
                    <span class="status-label">${isOpen ? this.t('statusOpen') : this.t('statusClosed')}</span>
                </div>
                <div class="status-meta">
                    <span><i class="fas fa-clock"></i> India Standard Time (Asia/Kolkata)</span>
                    ${resolvedFrom === 'special' ? '<span class="override-pill"><i class="fas fa-star"></i> Special Festival Schedule</span>' : ''}
                </div>
            </div>

            ${specialNotice ? `
                <div class="special-notice-callout">
                    <i class="fas fa-circle-exclamation"></i>
                    <div>
                        <strong>${this.t('specialNoticeTitle')}</strong>
                        <p>${this.getLocalized(specialNotice)}</p>
                    </div>
                </div>
            ` : ''}

            <div class="timing-details-grid">
                <div class="timing-col">
                    <span class="timing-col-label">${isOpen ? this.t('currentSession') : this.t('nextSessionOpens')}</span>
                    <h4>${isOpen && currentSession ? this.getLocalized(currentSession.label) : (nextSession ? this.getLocalized(nextSession.label) : 'Morning Darshan')}</h4>
                    <p class="timing-hours">
                        <i class="fas fa-door-open"></i>
                        ${isOpen && currentSession 
                            ? `Closes at <strong>${currentSession.closesAt24}</strong> (${currentSession.timeRemainingMinutes} mins remaining)` 
                            : (nextSession ? `Opens at <strong>${nextSession.opensAt24}</strong> ${nextSession.isTomorrow ? '(Tomorrow)' : '(Today)'}` : '05:30 AM')}
                    </p>
                </div>

                <div class="timing-col">
                    <span class="timing-col-label">${this.t('nextRitual')}</span>
                    <h4>${nextRitual ? this.getLocalized(nextRitual.name) : 'Deeparadhana & Aarti'}</h4>
                    <p class="timing-hours">
                        <i class="fas fa-fire-burner"></i>
                        Scheduled at <strong>${nextRitual ? nextRitual.time24 : '18:30'}</strong>
                    </p>
                </div>

                <div class="timing-col action-col">
                    <button class="btn btn-outline" id="btn-view-schedule">
                        <i class="fas fa-calendar-week"></i> ${this.t('viewFullSchedule')}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('btn-view-schedule')?.addEventListener('click', () => this.openScheduleModal());
    }

    renderDeities() {
        const container = document.getElementById('deities-grid');
        if (!container || !this.deities) return;

        container.innerHTML = this.deities.map(d => `
            <div class="deity-card">
                <div class="deity-image-box">
                    <img src="${d.image}" alt="${this.getLocalized(d.name)}" loading="lazy">
                    <div class="deity-badge">${d.id === 'ayyappa-swamy' ? 'Moolavar' : 'Consecrated'}</div>
                </div>
                <div class="deity-card-body">
                    <span class="deity-mantra">${d.sanskritMantra}</span>
                    <h3>${this.getLocalized(d.name)}</h3>
                    <p class="deity-title">${this.getLocalized(d.title)}</p>
                    <p class="deity-desc">${this.getLocalized(d.shortDescription)}</p>
                    <button class="btn-text btn-deity-detail" data-deity-id="${d.id}">
                        ${this.t('learnMore')} <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.btn-deity-detail').forEach(btn => {
            btn.addEventListener('click', () => {
                const deityId = btn.getAttribute('data-deity-id');
                const deity = this.deities.find(d => d.id === deityId);
                if (deity) this.openDeityModal(deity);
            });
        });
    }

    renderSevas() {
        const container = document.getElementById('sevas-grid');
        if (!container || !this.sevas) return;

        container.innerHTML = this.sevas.map(s => `
            <div class="seva-card">
                <div class="seva-top-row">
                    <span class="demo-tag"><i class="fas fa-clipboard-check"></i> ${this.t('demoNoticeBadge')}</span>
                    ${s.seasonal ? `<span class="seasonal-tag"><i class="fas fa-leaf"></i> ${this.getLocalized(s.seasonalPeriod)}</span>` : ''}
                </div>
                <h3>${this.getLocalized(s.name)}</h3>
                <p class="seva-desc">${this.getLocalized(s.description)}</p>
                <div class="seva-meta">
                    <span class="seva-duration"><i class="fas fa-hourglass-half"></i> ${s.durationMinutes || 45} mins</span>
                    <span class="seva-price">₹${s.priceInInr.toLocaleString('en-IN')}</span>
                </div>
                <div class="seva-card-footer">
                    <button class="btn btn-primary btn-book-seva" data-seva-id="${s.id}">
                        <i class="fas fa-hand-holding-hand"></i> ${this.t('bookNow')}
                    </button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.btn-book-seva').forEach(btn => {
            btn.addEventListener('click', () => {
                const sevaId = btn.getAttribute('data-seva-id');
                const seva = this.sevas.find(s => s.id === sevaId);
                if (seva) this.startBookingWizard(seva);
            });
        });
    }

    renderFestivals() {
        const container = document.getElementById('festivals-timeline');
        if (!container || !this.events) return;

        container.innerHTML = this.events.map(ev => `
            <div class="festival-card">
                <div class="festival-date-badge">
                    <i class="fas fa-calendar-day"></i>
                    <span class="date-str">${ev.startDateIso ? ev.startDateIso : this.t('dateToBeAnnounced')}</span>
                </div>
                <div class="festival-body">
                    <h3>${this.getLocalized(ev.name)}</h3>
                    <p class="festival-timings"><i class="fas fa-clock"></i> ${this.getLocalized(ev.timingsDescription)}</p>
                    <p class="festival-desc">${this.getLocalized(ev.fullDescription)}</p>
                </div>
            </div>
        `).join('');
    }

    renderGallery() {
        const container = document.getElementById('gallery-masonry');
        if (!container || !this.galleryItems) return;

        container.innerHTML = this.galleryItems.map(g => `
            <div class="gallery-item" data-category="${g.category}" data-img="${g.src}" data-caption="${this.getLocalized(g.caption)}">
                <div class="gallery-thumb-box">
                    <img src="${g.src}" alt="${this.getLocalized(g.altText)}" loading="lazy">
                    <div class="gallery-hover-overlay">
                        <i class="fas fa-magnifying-glass-plus"></i>
                        <p>${this.getLocalized(g.caption)}</p>
                    </div>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-img');
                const caption = item.getAttribute('data-caption');
                this.openLightbox(src, caption);
            });
        });
    }

    renderFaqs() {
        const container = document.getElementById('faqs-accordion');
        if (!container || !this.faqs) return;

        container.innerHTML = this.faqs.map((faq, idx) => `
            <div class="accordion-item ${idx === 0 ? 'active' : ''}">
                <button class="accordion-header" aria-expanded="${idx === 0}">
                    <span>${this.getLocalized(faq.question)}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="accordion-body">
                    <p>${this.getLocalized(faq.answer)}</p>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.accordion-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
                const item = hdr.parentElement;
                const isActive = item.classList.contains('active');
                container.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }

    renderContact() {
        if (!this.templeInfo) return;
        const addressEl = document.getElementById('contact-address');
        const phoneEl = document.getElementById('contact-phone');
        const emailEl = document.getElementById('contact-email');
        const hoursEl = document.getElementById('contact-hours');

        if (addressEl) addressEl.textContent = this.templeInfo.address.formatted;
        if (phoneEl) {
            phoneEl.textContent = this.templeInfo.contact.phone || this.t('unconfirmedContact');
            if (!this.templeInfo.contact.phone) phoneEl.classList.add('unconfirmed-note');
        }
        if (emailEl) {
            emailEl.textContent = this.templeInfo.contact.email || this.t('unconfirmedContact');
            if (!this.templeInfo.contact.email) emailEl.classList.add('unconfirmed-note');
        }
        if (hoursEl) hoursEl.textContent = this.getLocalized(this.templeInfo.contact.officeHours);
    }

    // --- TIMING ENGINE WATCHER (EVERY MINUTE) ---
    initTimingEngineWatcher() {
        setInterval(async () => {
            this.timingData = await templeRepository.getTodayTimings();
            this.renderTodayTiming();
        }, 60000);
    }

    // --- SEVA BOOKING WIZARD FLOW ---
    startBookingWizard(seva) {
        this.selectedSeva = seva;
        this.bookingDraft.sevaId = seva.id;
        this.bookingDraft.sevaName = this.getLocalized(seva.name);
        this.bookingDraft.priceInInr = seva.priceInInr;
        
        // Reset wizard to Step 1
        this.setWizardStep(1);
        this.updateWizardSummary();

        // Set minimum booking date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            const dateStr = tomorrow.toISOString().split('T')[0];
            dateInput.min = dateStr;
            dateInput.value = dateStr;
            this.bookingDraft.preferredDateIso = dateStr;
        }

        const modal = document.getElementById('booking-modal');
        if (modal) modal.classList.add('active');
    }

    setWizardStep(stepNumber) {
        document.querySelectorAll('.wizard-step-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.wizard-stepper-item').forEach(s => {
            const step = parseInt(s.getAttribute('data-step'), 10);
            s.classList.toggle('active', step === stepNumber);
            s.classList.toggle('completed', step < stepNumber);
        });

        const activePanel = document.getElementById(`wizard-step-${stepNumber}`);
        if (activePanel) activePanel.classList.add('active');
    }

    updateWizardSummary() {
        const titleEl = document.getElementById('wizard-seva-title');
        const priceEl = document.getElementById('wizard-seva-price');
        const reviewSevaEl = document.getElementById('review-seva-name');
        const reviewPriceEl = document.getElementById('review-price');
        const reviewDateEl = document.getElementById('review-date');
        const reviewSlotEl = document.getElementById('review-slot');
        const reviewNameEl = document.getElementById('review-devotee-name');
        const reviewPhoneEl = document.getElementById('review-phone');
        const reviewGotraEl = document.getElementById('review-gotra');

        if (titleEl) titleEl.textContent = this.bookingDraft.sevaName;
        if (priceEl) priceEl.textContent = `₹${this.bookingDraft.priceInInr.toLocaleString('en-IN')}`;
        if (reviewSevaEl) reviewSevaEl.textContent = this.bookingDraft.sevaName;
        if (reviewPriceEl) reviewPriceEl.textContent = `₹${this.bookingDraft.priceInInr.toLocaleString('en-IN')}`;
        if (reviewDateEl) reviewDateEl.textContent = this.bookingDraft.preferredDateIso || 'Not selected';
        if (reviewSlotEl) reviewSlotEl.textContent = this.bookingDraft.sessionSlot === 'MORNING' ? 'Morning Darshan' : 'Evening Darshan';
        if (reviewNameEl) reviewNameEl.textContent = this.bookingDraft.devoteeName || '—';
        if (reviewPhoneEl) reviewPhoneEl.textContent = this.bookingDraft.phone || '—';
        if (reviewGotraEl) reviewGotraEl.textContent = `${this.bookingDraft.gothram || '—'} / ${this.bookingDraft.nakshatram || '—'}`;
    }

    async submitBookingRequest() {
        try {
            const submitBtn = document.getElementById('btn-wizard-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting Request...';
            }

            const result = await MockBookingAdapter.submitRequest(this.bookingDraft);

            // Transition to Step 4 (Confirmation Screen)
            this.setWizardStep(4);
            const refEl = document.getElementById('confirm-ref-id');
            const msgEl = document.getElementById('confirm-message');
            const whatsappBox = document.getElementById('confirm-whatsapp-box');

            if (refEl) refEl.textContent = result.referenceId;
            if (msgEl) msgEl.textContent = this.getLocalized(result.message);
            if (whatsappBox) {
                if (result.whatsappInquiryLink) {
                    whatsappBox.style.display = 'block';
                    whatsappBox.querySelector('a').href = result.whatsappInquiryLink;
                } else {
                    whatsappBox.style.display = 'none';
                }
            }

            this.showToast(`Booking request submitted: ${result.referenceId}`, 'fa-circle-check');
        } catch (err) {
            alert(err.message);
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm & Submit Request';
            }
        }
    }

    // --- MODAL DIALOGS ---
    openDeityModal(deity) {
        const modal = document.getElementById('deity-modal');
        if (!modal) return;
        document.getElementById('deity-modal-img').src = deity.image;
        document.getElementById('deity-modal-name').textContent = this.getLocalized(deity.name);
        document.getElementById('deity-modal-mantra').textContent = deity.sanskritMantra;
        document.getElementById('deity-modal-title').textContent = this.getLocalized(deity.title);
        document.getElementById('deity-modal-body').textContent = this.getLocalized(deity.fullDescription);
        modal.classList.add('active');
    }

    openScheduleModal() {
        const modal = document.getElementById('schedule-modal');
        const container = document.getElementById('weekly-schedule-table-wrap');
        if (!modal || !container || !this.weeklySchedule) return;

        const schedule = this.weeklySchedule[0];
        container.innerHTML = `
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>Session</th>
                        <th>Timings (IST)</th>
                        <th>Sacred Rituals & Poojas</th>
                    </tr>
                </thead>
                <tbody>
                    ${schedule.sessions.map(s => `
                        <tr>
                            <td><strong>${this.getLocalized(s.label)}</strong></td>
                            <td class="time-cell">${s.openTime24} – ${s.closeTime24}</td>
                            <td>
                                <ul class="table-rituals-list">
                                    ${s.rituals.map(r => `
                                        <li><strong>${r.time24}</strong> — ${this.getLocalized(r.name)}</li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        modal.classList.add('active');
    }

    openLightbox(src, caption) {
        const lightbox = document.getElementById('lightbox-modal');
        if (!lightbox) return;
        document.getElementById('lightbox-img').src = src;
        document.getElementById('lightbox-caption-text').textContent = caption;
        lightbox.classList.add('active');
    }

    // --- TOAST NOTIFICATIONS ---
    showToast(message, iconClass = 'fa-om') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas ${iconClass}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // --- EVENT LISTENERS ---
    setupEventListeners() {
        // Language Switcher Buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setLocale(btn.dataset.locale));
        });

        // Theme Toggle
        document.getElementById('theme-toggle-btn')?.addEventListener('click', () => this.toggleTheme());

        // Mobile Nav Drawer Toggle
        const hamburger = document.getElementById('mobile-hamburger');
        const drawer = document.getElementById('mobile-drawer');
        const drawerOverlay = document.getElementById('drawer-overlay');

        const toggleDrawer = () => {
            const isOpen = drawer.classList.toggle('active');
            drawerOverlay?.classList.toggle('active', isOpen);
            hamburger?.classList.toggle('active', isOpen);
        };

        hamburger?.addEventListener('click', toggleDrawer);
        drawerOverlay?.addEventListener('click', toggleDrawer);
        drawer?.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', toggleDrawer);
        });

        // Modal Close Buttons
        document.querySelectorAll('.modal-close, .modal-backdrop-close').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal-wrapper').forEach(m => m.classList.remove('active'));
            });
        });

        // ESC Key to Close Modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-wrapper.active').forEach(m => m.classList.remove('active'));
            }
        });

        // Gallery Filter Buttons
        document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-category');
                document.querySelectorAll('.gallery-item').forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    item.style.display = (cat === 'ALL' || itemCat === cat) ? 'block' : 'none';
                });
            });
        });

        // Interactive Map Lazy Load Click
        const mapFacade = document.getElementById('map-facade');
        mapFacade?.addEventListener('click', () => {
            mapFacade.innerHTML = `
                <iframe 
                    title="Sree Ayyappa Swamy Temple Somajiguda Map"
                    src="https://maps.google.com/maps?q=17.4283,78.4603(Sree+Ayyappa+Swamy+Temple+Somajiguda)&hl=en&z=17&output=embed"
                    width="100%" 
                    height="420" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            `;
            mapFacade.classList.add('loaded');
        });

        // Copy Coordinates Button
        document.getElementById('btn-copy-coords')?.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText('17.4283, 78.4603').then(() => {
                this.showToast('Coordinates copied to clipboard: 17.4283° N, 78.4603° E', 'fa-copy');
            });
        });

        // Seva Wizard Form Handlers
        document.getElementById('btn-wizard-next-1')?.addEventListener('click', () => {
            const dateInput = document.getElementById('booking-date');
            const slotInput = document.querySelector('input[name="session-slot"]:checked');
            if (!dateInput.value) {
                alert('Please select a valid date for the seva.');
                return;
            }
            this.bookingDraft.preferredDateIso = dateInput.value;
            this.bookingDraft.sessionSlot = slotInput ? slotInput.value : 'MORNING';
            this.setWizardStep(2);
        });

        document.getElementById('btn-wizard-back-2')?.addEventListener('click', () => this.setWizardStep(1));
        document.getElementById('btn-wizard-next-2')?.addEventListener('click', () => {
            const name = document.getElementById('devotee-full-name').value.trim();
            const phone = document.getElementById('devotee-phone').value.trim();
            if (!name || !phone) {
                alert('Please enter your Name and WhatsApp / Mobile number.');
                return;
            }
            this.bookingDraft.devoteeName = name;
            this.bookingDraft.phone = phone;
            this.bookingDraft.gothram = document.getElementById('devotee-gotra')?.value.trim() || '';
            this.bookingDraft.nakshatram = document.getElementById('devotee-star')?.value.trim() || '';
            this.bookingDraft.email = document.getElementById('devotee-email')?.value.trim() || '';
            this.bookingDraft.postalAddressForPrasadam = document.getElementById('devotee-address')?.value.trim() || '';

            this.updateWizardSummary();
            this.setWizardStep(3);
        });

        document.getElementById('btn-wizard-back-3')?.addEventListener('click', () => this.setWizardStep(2));
        document.getElementById('btn-wizard-submit')?.addEventListener('click', () => this.submitBookingRequest());

        // Contact Form
        document.getElementById('contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cf-name').value;
            e.target.reset();
            this.showToast(`Thank you, ${name}. Your message has been received by the temple office.`, 'fa-envelope-circle-check');
        });
    }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.templeApp = new TempleApp();
});
