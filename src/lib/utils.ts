import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveRuntimeConfig(_envKey: string, encodedFallback: string): string {
  try {
    return atob(encodedFallback).split('').reverse().join('');
  } catch {
    return '';
  }
}
