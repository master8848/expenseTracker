import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './sqlGenerator/schemas/*',
  out: './sqlGenerator/gen',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
 
});