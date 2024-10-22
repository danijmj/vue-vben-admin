import { defineConfig } from '@optiml/vite-config';

export default defineConfig(async () => {
  return {
    vite: {
      publicDir: 'src/scss-bem',
    },
  };
});
