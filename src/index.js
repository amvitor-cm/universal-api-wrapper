import APIClient from './client.js';

class APIWrapper {
  constructor(config = {}) {
    this.client = new APIClient(config);
  }

  // Data retrieval methods
  async getData(id, options = {}) {
    if (!id || typeof id !== 'string') {
      throw new Error('Valid ID is required');
    }

    return this.client.request(`/data/${id}`, options);
  }

  async getAllData(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/data?${queryString}` : '/data';
    
    return this.client.request(endpoint);
  }

  // Item creation
  async createItem(itemData) {
    if (!itemData || typeof itemData !== 'object') {
      throw new Error('Valid item data object is required');
    }

    if (!itemData.name || !itemData.description) {
      throw new Error('Item must have name and description');
    }

    return this.client.request('/items', {
      method: 'POST',
      body: itemData
    });
  }

  // Item update
  async updateItem(id, updates) {
    if (!id || typeof id !== 'string') {
      throw new Error('Valid ID is required');
    }

    if (!updates || typeof updates !== 'object') {
      throw new Error('Valid updates object is required');
    }

    return this.client.request(`/items/${id}`, {
      method: 'PUT',
      body: updates
    });
  }

  // Item deletion
  async deleteItem(id) {
    if (!id || typeof id !== 'string') {
      throw new Error('Valid ID is required');
    }

    return this.client.request(`/items/${id}`, {
      method: 'DELETE'
    });
  }

  // Search functionality
  async searchItems(query, filters = {}) {
    if (!query || typeof query !== 'string') {
      throw new Error('Valid search query is required');
    }

    const searchParams = new URLSearchParams({
      q: query,
      ...filters
    });

    return this.client.request(`/search?${searchParams}`);
  }

  // Utility methods
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
