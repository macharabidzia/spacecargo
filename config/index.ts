// config/index.ts

// This file acts as a barrel export for all configuration files.
// It simplifies imports by allowing you to import from '@/config'
// instead of individual files like '@/config/site' or '@/config/env'.

export * from './site'; // Re-exports everything from site.ts
export * from './env';  // Re-exports everything from env.ts

// Add other configuration files here as you create them, e.g.:
// export * from './constants';
// export * from './api';
