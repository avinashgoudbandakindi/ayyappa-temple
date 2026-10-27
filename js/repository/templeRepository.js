/**
 * Temple Repository Abstraction
 * Implements LocalTempleRepository (current phase) and ApiTempleRepository (future stub).
 * The UI exclusively calls this repository layer.
 */

import { CONFIG } from '../config.js';
import { TEMPLE_DATA } from '../data/templeData.js';
import { DEITIES_DATA } from '../data/deitiesData.js';
import { SEVAS_DATA } from '../data/sevasData.js';
import { TIMINGS_DATA } from '../data/timingsData.js';
import { SPECIAL_TIMINGS_DATA } from '../data/specialTimingsData.js';
import { EVENTS_DATA } from '../data/eventsData.js';
import { ANNOUNCEMENTS_DATA } from '../data/announcementsData.js';
import { GALLERY_DATA } from '../data/galleryData.js';
import { FAQS_DATA } from '../data/faqsData.js';
import { resolveTempleTiming } from '../timing/timingEngine.js';

/**
 * Local Repository Implementation (Reads validated static datasets)
 */
class LocalTempleRepository {
    async getTempleInfo() {
        return TEMPLE_DATA;
    }

    async getDeities() {
        return DEITIES_DATA.filter(d => d.active).sort((a, b) => a.displayOrder - b.displayOrder);
    }

    async getSevas(filter = {}) {
        let list = SEVAS_DATA.filter(s => s.active);
        if (filter.deityId) {
            list = list.filter(s => s.deityId === filter.deityId);
        }
        if (filter.bookingEnabled !== undefined) {
            list = list.filter(s => s.bookingEnabled === filter.bookingEnabled);
        }
        return list.sort((a, b) => a.displayOrder - b.displayOrder);
    }

    async getSevaBySlug(slug) {
        return SEVAS_DATA.find(s => s.slug === slug && s.active) || null;
    }

    async getTodayTimings() {
        return resolveTempleTiming(new Date());
    }

    async getWeeklySchedule() {
        return TIMINGS_DATA.weeklySchedule;
    }

    async getSpecialTimings() {
        return SPECIAL_TIMINGS_DATA;
    }

    async getUpcomingEvents() {
        return EVENTS_DATA.filter(e => e.active).sort((a, b) => a.displayOrder - b.displayOrder);
    }

    async getAnnouncements() {
        const now = new Date().toISOString();
        return ANNOUNCEMENTS_DATA.filter(a => 
            a.published &&
            (!a.startsAtIso || a.startsAtIso <= now) &&
            (!a.endsAtIso || a.endsAtIso >= now)
        );
    }

    async getGalleryItems(category = 'ALL') {
        let list = GALLERY_DATA;
        if (category && category !== 'ALL') {
            list = list.filter(g => g.category === category);
        }
        return list.sort((a, b) => a.displayOrder - b.displayOrder);
    }

    async getFaqs(category = null) {
        let list = FAQS_DATA;
        if (category) {
            list = list.filter(f => f.category === category);
        }
        return list.sort((a, b) => a.displayOrder - b.displayOrder);
    }
}

/**
 * Future API Repository Stub
 * Implements the exact same method signatures calling the future REST API.
 */
class ApiTempleRepository {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async _fetch(endpoint) {
        const res = await fetch(`${this.baseUrl}${endpoint}`);
        if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
        return await res.json();
    }

    async getTempleInfo() { return this._fetch('/temple'); }
    async getDeities() { return this._fetch('/deities'); }
    async getSevas(filter) { return this._fetch(`/sevas?${new URLSearchParams(filter)}`); }
    async getSevaBySlug(slug) { return this._fetch(`/sevas/${slug}`); }
    async getTodayTimings() { return this._fetch('/timings/today'); }
    async getWeeklySchedule() { return this._fetch('/timings/weekly'); }
    async getSpecialTimings() { return this._fetch('/timings/special'); }
    async getUpcomingEvents() { return this._fetch('/events'); }
    async getAnnouncements() { return this._fetch('/announcements'); }
    async getGalleryItems(category) { return this._fetch(`/gallery?category=${category}`); }
    async getFaqs(category) { return this._fetch(`/faqs?category=${category}`); }
}

// Factory instantiation based on config
export const templeRepository = CONFIG.DATA_SOURCE === 'api'
    ? new ApiTempleRepository(CONFIG.API_BASE_URL)
    : new LocalTempleRepository();
