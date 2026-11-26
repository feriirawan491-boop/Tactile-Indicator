import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import path from 'node:path';
const projectRoot=path.resolve(process.cwd());
export default function nextConfig(phase:string):NextConfig {
 return {
  // Keep the running dev compiler isolated from typegen/production builds.
  distDir:phase===PHASE_DEVELOPMENT_SERVER?'.next-local':'.next',
  turbopack:{root:projectRoot},
  outputFileTracingRoot:projectRoot,
  experimental:{agentUpgrade:'security'},
 };
}
