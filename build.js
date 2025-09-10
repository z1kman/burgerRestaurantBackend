import { build } from 'esbuild';

build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
}).catch(() => process.exit(1));