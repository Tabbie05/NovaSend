"use client";

import toast from "react-hot-toast";

export function showSuccess(message: string, id?: string) {
  toast.success(message, id ? { id } : undefined);
}

export function showError(message: string, id?: string) {
  toast.error(message, id ? { id } : undefined);
}

export function showLoading(message: string) {
  return toast.loading(message);
}
