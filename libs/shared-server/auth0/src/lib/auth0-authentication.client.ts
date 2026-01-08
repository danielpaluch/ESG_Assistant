import axios, { AxiosInstance } from 'axios';
import {
  Auth0AuthConfig,
  Auth0TokenResponse,
  Auth0User,
  CreateAuth0UserPayload,
} from '@shared/contracts/auth0';

export class Auth0AuthenticationClient {
  private http: AxiosInstance;

  private managementTokenPromise?: Promise<string>;

  constructor(private readonly config: Auth0AuthConfig) {
    this.http = axios.create({
      baseURL: `https://${config.domain}`,
    });
  }

  private async getManagementToken(): Promise<string> {
    if (!this.managementTokenPromise) {
      this.managementTokenPromise = (async () => {
        const { data } = await axios.post<Auth0TokenResponse>(
          `https://${this.config.domain}/oauth/token`,
          {
            grant_type: 'client_credentials',
            client_id: this.config.mgmt_clientId,
            client_secret: this.config.mgmt_clientSecret,
            audience: `${this.config.mgmt_audience}`,
          },
        );

        return data.access_token;
      })();
    }

    return this.managementTokenPromise;
  }

  async loginWithPassword(
    username: string,
    password: string,
  ): Promise<Auth0TokenResponse> {
    const { data } = await this.http.post<Auth0TokenResponse>('/oauth/token', {
      grant_type: 'password',
      realm: 'Username-Password-Authentication',
      username,
      password,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      scope: 'openid profile email',
    });

    const userInfo = await this.http.get<{ sub: string }>('/userinfo', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    return { ...data, sub: userInfo.data.sub };
  }

  async createUser(payload: CreateAuth0UserPayload): Promise<Auth0User> {
    const token = await this.getManagementToken();

    const { data } = await this.http.post<Auth0User>('api/v2/users', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  async refreshToken(refreshToken: string): Promise<Auth0TokenResponse> {
    const { data } = await this.http.post<Auth0TokenResponse>('/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });

    return data;
  }
}
