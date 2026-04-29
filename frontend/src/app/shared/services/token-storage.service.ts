import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

const INTERNAL_JWT_STORAGE_KEY = 'ag_token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private cachedToken: string | null = null;

  async init(): Promise<void> {
    this.cachedToken = await this.loadToken();
  }

  getToken(): string | null {
    return this.cachedToken;
  }

  setToken(token: string): void {
    this.cachedToken = token;
    void this.persistToken(token);
  }

  clearToken(): void {
    this.cachedToken = null;
    void this.removeToken();
  }

  private async loadToken(): Promise<string | null> {
    if (this.isNativePlatform()) {
      try {
        const result = await SecureStoragePlugin.get({ key: INTERNAL_JWT_STORAGE_KEY });
        return result?.value ?? null;
      } catch {
        return null;
      }
    }

    return this.getWebToken();
  }

  private async persistToken(token: string): Promise<void> {
    if (this.isNativePlatform()) {
      try {
        await SecureStoragePlugin.set({ key: INTERNAL_JWT_STORAGE_KEY, value: token });
      } catch {
        // Ignore secure storage write errors.
      }
      return;
    }

    this.setWebToken(token);
  }

  private async removeToken(): Promise<void> {
    if (this.isNativePlatform()) {
      try {
        await SecureStoragePlugin.remove({ key: INTERNAL_JWT_STORAGE_KEY });
      } catch {
        // Ignore secure storage delete errors.
      }
      return;
    }

    this.removeWebToken();
  }

  private isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }

  private getWebToken(): string | null {
    try {
      return localStorage.getItem(INTERNAL_JWT_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private setWebToken(token: string): void {
    try {
      localStorage.setItem(INTERNAL_JWT_STORAGE_KEY, token);
    } catch {
      // Ignore storage write errors.
    }
  }

  private removeWebToken(): void {
    try {
      localStorage.removeItem(INTERNAL_JWT_STORAGE_KEY);
    } catch {
      // Ignore storage delete errors.
    }
  }
}
