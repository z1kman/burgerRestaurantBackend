import { build } from 'esbuild';
import fs from 'fs-extra';
import path from 'path';

const outDir = path.resolve('dist');
const prismaSrc = path.resolve('node_modules/.prisma/client');
const prismaDest = path.join(outDir, 'node_modules/.prisma/client');

await build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: path.join(outDir, 'index.js'),
  sourcemap: true,
});

await fs.ensureDir(path.dirname(prismaDest));
await fs.copy(prismaSrc, prismaDest);

console.log('✅ Build finished and Prisma client copied!');