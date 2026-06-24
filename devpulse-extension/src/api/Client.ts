import axios, { AxiosInstance } from "axios";
import { API_TIMEOUT_MS, getApiUrl } from "../config/constants";
import { ApiKeyStore } from "../auth/ApiKeyStore";
import { DevPulseEvent } from "../models/Event";

export class Client {
  private client: AxiosInstance;

  constructor(private readonly apiKeyStore: ApiKeyStore) {
    this.client = axios.create({
      baseURL: getApiUrl(),
      timeout: API_TIMEOUT_MS
    });
  }

  async post(events: DevPulseEvent[]): Promise<void> {
    const apiKey = await this.apiKeyStore.get();
    if (!apiKey) {
      throw new Error("Missing DevPulse API key");
    }
    await this.client.post("/api/events/batch", events, {
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json"
      }
    });
  }
}
