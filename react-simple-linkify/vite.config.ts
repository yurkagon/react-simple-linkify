/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rollup } from 'rollup';
import { dts } from 'rollup-plugin-dts';

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  MemoizedLinkify: resolve(__dirname, 'src/MemoizedLinkify.tsx'),
};

function bundleDts(): Plugin {
  return {
    name: 'bundle-dts',
    apply: 'build',
    async closeBundle() {
      for (const [name, input] of Object.entries(entries)) {
        const bundle = await rollup({
          input,
          external: [/^react/],
          plugins: [
            dts({ tsconfig: resolve(__dirname, 'tsconfig.build.json') }),
          ],
        });
        await bundle.write({ file: `dist/${name}.d.ts`, format: 'es' });
        await bundle.write({ file: `dist/${name}.d.cts`, format: 'cjs' });
        await bundle.close();
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), bundleDts()],
  build: {
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        // Rolldown strips 'use client' from ESM output but keeps it in CJS.
        // Re-inject for ESM only; CJS gets it from the source-level directive.
        banner: (chunk) =>
          chunk.name === 'MemoizedLinkify' && !chunk.fileName.endsWith('.cjs')
            ? `'use client';`
            : '',
      },
    },
    sourcemap: true,
    target: 'es2020',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**', 'src/index.ts'],
    },
  },
});
