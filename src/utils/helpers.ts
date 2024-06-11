import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single string, merging Tailwind CSS classes intelligently.
 *
 * This function takes multiple class value inputs, combines them using `clsx` to handle conditional
 * class names and other complex class combinations, and then merges them using `twMerge` to remove
 * duplicate Tailwind CSS classes and resolve conflicts.
 *
 * @param {...ClassValue[]} inputs - An array of class values that can include strings, objects, arrays, etc.
 * @returns {string} A single string of combined class names, optimized for Tailwind CSS.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Transforms the given text to lowercase.
 * @param {string} text - The text to be transformed.
 * @returns {string} The lowercase version of the text.
 */
export function lower(text: string): string {
	return text.toLowerCase();
}

/**
 * Capitalizes the first letter of the given string.
 *
 * This function takes a string input and returns the string with the first letter capitalized.
 * If the input is not a string or is an empty string, it returns the input unchanged.
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} The string with the first letter capitalized.
 */
export function capitalize(str: string) {
	if (!str || typeof str !== "string") return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}
