import APIClient from './client.js';

class APIWrapper {
  constructor(config = {}) {
    this.client = new APIClient(config);
  }

  async getResource(id, endpoint = '/resources') {
    if (!id || typeof id !== 'string') {
      throw new Error('Valid ID is required');
    }
    return this.client.request(`${endpoint}/${id}`);
  }

  async getAllResources(endpoint = '/resources', params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.client.request(url);
  }

  async createResource(resourceData, endpoint = '/resources') {
    if (!resourceData || typeof resourceData !== 'object') {
      throw new Error('Valid resource data object is required');
    }
    return this.client.request(endpoint, {
      method: 'POST',
      body: resourceData
    });
  }

  async updateResource(id, updates, endpoint = '/resources') {
    if (!id || typeof id !== 'string') {
      throw new Error('Valid ID is required');
    }
    if (!updates || typeof updates !== 'object') {
      throw new Error('Valid updates object is required');
    }
    return this.client.request(`${endpoint}/${id}`, {
      method: 'PUT',
      body: updates
    });
  }

  async deleteResource(id, endpoint = '/resources') {
    if (!id || typeof id !== 'string') {
      throw new Error('Valid ID is required');
    }
    return this.client.request(`${endpoint}/${id}`, {
      method: 'DELETE'
    });
  }

  async searchResources(query, endpoint = '/search', filters = {}) {
    if (!query || typeof query !== 'string') {
      throw new Error('Valid search query is required');
    }
    const searchParams = new URLSearchParams({
      q: query,
      ...filters
    });
    return this.client.request(`${endpoint}?${searchParams}`);
  }

  clearCache() {
    this.client.clearCache();
  }

  setApiKey(apiKey) {
    this.client.apiKey = apiKey;
  }

  setBaseURL(baseURL) {
    this.client.baseURL = baseURL;
  }
}

export default APIWrapper;
