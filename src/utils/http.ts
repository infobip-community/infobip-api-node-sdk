import axios, { Axios } from 'axios';

class Http {
  baseUrl: string;
  axios: Axios;

  async post(url: string, body?: any, config?: any) {
    const response = await this.axios.post(url, body, config);
    return response;
  }

  async put(url: string, body: any) {
    const response = await this.axios.put(url, body);
    return response;
  }

  async get(url: string, params?: any) {
    const response = await this.axios.get(url, { params });
    return response;
  }

  async download(url: string) {
    const response = await this.axios.get(url, { responseType: 'stream' });
    return response;
  }

  async head(url: string, params?: any) {
    const response = await this.axios.head(url, { params });
    return response;
  }

  async delete(url: string, body?: any) {
    const response = await this.axios.delete(url, { data: body });
    return response;
  }

  constructor(baseUrl: string, authorization?: string) {
    this.baseUrl = !baseUrl.indexOf('http') ? baseUrl : `https://${baseUrl}`;
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authorization}`,
      },
    });
  }
}

export { Http };
