import { ApplicationFormData } from "@/types";
import { DRAFT_STORAGE_KEY, USER_TOKEN_KEY, ADMIN_TOKEN_KEY } from "@/lib/constants";

export function saveDraft(data: ApplicationFormData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
}

export function loadDraft(): ApplicationFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DRAFT_STORAGE_KEY);
}

export function saveUserToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_TOKEN_KEY, token);
}

export function getUserToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_TOKEN_KEY);
}

export function clearUserToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_TOKEN_KEY);
}

export function saveAdminToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
