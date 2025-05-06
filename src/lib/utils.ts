import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes efficiently.
 * Uses clsx for conditional class application and tailwind-merge to resolve conflicts.
 * 
 * @param inputs - Class values to be combined (strings, objects, or arrays)
 * @returns A string of combined and optimized class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}