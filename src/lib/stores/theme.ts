import { browser } from "$app/environment";

export type Theme = "pastel";

function createThemeStore() {
  return {
    init: () => {
      if (browser) {
        document.documentElement.setAttribute("data-theme", "pastel");
      }
    },
  };
}

export const theme = createThemeStore();
