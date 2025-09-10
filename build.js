import { build } from 'esbuild';
import fs from 'fs-extra';
import path from 'path';

const outDir = path.resolve('dist');

await build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: path.join(outDir, 'index.js'),
  sourcemap: true,
});

const prismaSrc = path.resolve('node_modules/.prisma/client');
const prismaDest = path.join(outDir, 'node_modules/.prisma/client');

const swaggerSrc = path.resolve('src/swagger');
const swaggerDest = path.join(outDir, 'swagger');

await fs.ensureDir(path.dirname(prismaDest));
await fs.copy(prismaSrc, prismaDest);

await fs.ensureDir(path.dirname(prismaDest));
await fs.copy(swaggerSrc, swaggerDest);

console.log('✅ Build finished and Prisma client copied!');