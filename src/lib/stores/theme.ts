import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'pastel' | 'dracula';

function createThemeStore() {
    const { subscribe, set, update } = writable<Theme>('pastel');

    return {
        subscribe,
        set: (theme: Theme) => {
            if (browser) {
                localStorage.setItem('theme', theme);
                document.documentElement.setAttribute('data-theme', theme);
            }
            set(theme);
        },
        toggle: () => {
            update(current => {
                const newTheme: Theme = current === 'pastel' ? 'dracula' : 'pastel';
                if (browser) {
                    localStorage.setItem('theme', newTheme);
                    document.documentElement.setAttribute('data-theme', newTheme);
                }
                return newTheme;
            });
        },
        init: () => {
            if (browser) {
                const savedTheme = (localStorage.getItem('theme') as Theme) || 'pastel';
                document.documentElement.setAttribute('data-theme', savedTheme);
                set(savedTheme);
            }
        }
    };
}

export const theme = createThemeStore();
