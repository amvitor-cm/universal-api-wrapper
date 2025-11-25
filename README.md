```markdown
# Universal API Wrapper

A production-ready, dependency-free JavaScript API client for seamless REST API integration. Built with best practices for reliability, performance, and developer experience.

## 🚀 Features

- **Universal Compatibility** - Works in Node.js 18+ and all modern browsers
- **Zero Dependencies** - Uses native fetch API, no bloat
- **Smart Caching** - Configurable request caching with TTL support
- **Comprehensive Error Handling** - Meaningful error messages and recovery
- **Input Validation** - Parameter validation before requests
- **TypeScript Ready** - Full type support out of the box
- **Production Ready** - Battle-tested patterns used in production apps
- **Fully Configurable** - Customizable endpoints, headers, and timeouts

## 📦 Installation

```bash
npm install universal-api-wrapper
```

## ⚡ Quick Start

```javascript
import APIWrapper from 'universal-api-wrapper';

// Initialize with your API configuration
const api = new APIWrapper({
  apiKey: 'your-api-key-here',
  baseURL: 'https://api.yourservice.com/v1',
  cacheTTL: 300000 // 5 minutes cache
});

// Start making requests
async function fetchUser() {
  try {
    const user = await api.getResource('user-123', '/users');
    console.log('User data:', user);
  } catch (error) {
    console.error('API Error:', error.message);
  }
}
```

## 🔧 Configuration

### Basic Setup

```javascript
const api = new APIWrapper({
  apiKey: 'your-api-key',           // Required
  baseURL: 'https://api.example.com/v1', // Required
  cacheTTL: 300000,                 // Cache TTL in milliseconds
  headers: {                         // Custom headers
    'X-API-Version': '2023-10-01',
    'User-Agent': 'MyApp/1.0.0'
  }
});
```

### Environment Variables

```bash
export API_KEY="your-actual-api-key"
export BASE_URL="https://api.example.com/v1"
```

```javascript
// Automatically uses environment variables
const api = new APIWrapper();
```

## 📚 API Reference

### Core Methods

#### `getResource(id, endpoint)`
Retrieve a single resource by ID.

```javascript
const user = await api.getResource('123', '/users');
const product = await api.getResource('456', '/products');
```

#### `getAllResources(endpoint, params)`
List resources with pagination and filtering.

```javascript
const users = await api.getAllResources('/users', {
  limit: 10,
  offset: 0,
  status: 'active',
  sort: 'created_at'
});
```

#### `createResource(data, endpoint)`
Create a new resource.

```javascript
const newUser = await api.createResource({
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'admin'
}, '/users');
```

#### `updateResource(id, updates, endpoint)`
Update an existing resource.

```javascript
const updatedUser = await api.updateResource('123', {
  name: 'Jane Doe',
  status: 'verified'
}, '/users');
```

#### `deleteResource(id, endpoint)`
Delete a resource.

```javascript
await api.deleteResource('123', '/users');
```

#### `searchResources(query, endpoint, filters)`
Search with query and filters.

```javascript
const results = await api.searchResources(
  'laptop',
  '/products/search',
  { 
    category: 'electronics',
    price_max: 1000,
    in_stock: true
  }
);
```

### Utility Methods

#### `clearCache()`
Clear all cached requests.

```javascript
api.clearCache();
```

#### `setApiKey(apiKey)`
Update API key at runtime.

```javascript
api.setApiKey('new-api-key-here');
```

#### `setBaseURL(baseURL)`
Update base URL.

```javascript
api.setBaseURL('https://api.newexample.com/v2');
```

## 🛡️ Error Handling

```javascript
try {
  const data = await api.getResource('invalid-id', '/users');
} catch (error) {
  console.error('Error details:', {
    message: error.message,
    timestamp: new Date().toISOString()
  });
  
  // Handle specific error types
  if (error.message.includes('404')) {
    // Resource not found
    showNotFoundError();
  } else if (error.message.includes('Network error')) {
    // Network connectivity issue
    showOfflineMessage();
  } else {
    // Generic error handling
    showErrorMessage(error.message);
  }
}
```

## 💾 Caching

### Automatic Caching
GET requests are automatically cached with configurable TTL:

```javascript
const api = new APIWrapper({
  apiKey: 'your-key',
  baseURL: 'https://api.example.com/v1',
  cacheTTL: 600000 // 10 minutes cache
});
```

### Manual Cache Control
```javascript
// Clear specific cache or all cache
api.clearCache();

// Cache is automatically invalidated on POST/PUT/DELETE requests
```

## 🔄 Advanced Usage

### Custom Request Headers
```javascript
const api = new APIWrapper({
  apiKey: 'your-key',
  baseURL: 'https://api.example.com/v1',
  headers: {
    'X-API-Version': '2023-10-01',
    'Accept-Language': 'en-US',
    'User-Agent': 'MyApp/1.0.0'
  }
});
```

### Dynamic Endpoint Management
```javascript
// Reuse wrapper across different API sections
class UserAPI {
  constructor(apiClient) {
    this.api = apiClient;
  }
  
  async getUser(id) {
    return this.api.getResource(id, '/users');
  }
  
  async createUser(userData) {
    return this.api.createResource(userData, '/users');
  }
}

const userAPI = new UserAPI(api);
const user = await userAPI.getUser('123');
```

## 🧪 Testing

Run the included examples:

```bash
npm run test
```

Check the `examples/` directory for comprehensive usage patterns.

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🏆 Credits

Built with ❤️ by [Tam](https://github.com/amvitor-cm)

---

**Ready to power your next project?** Star ⭐ the repo if you find this useful!
```
