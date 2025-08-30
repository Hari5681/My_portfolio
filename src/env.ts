// This file is intentionally left blank. 
// Environment variables are now accessed directly via process.env.
// This change was made to resolve a client-side error where
// Zod was attempting to parse a process.env object that had not
// yet been populated by Next.js. By removing the Zod schema
// for public variables, we allow Next.js's build process to
// correctly inline the values for browser-side code.
// Server-side validation can be added here if needed in the future.
export {};
