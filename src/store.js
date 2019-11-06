import { writable } from 'svelte/store';

export const query = writable('강아지');
export const notes = writable([]);
export const events = writable([]);
export const recentlyViewed = writable({});
