import APIWrapper from '../src/index.js';

// Initialize with your API details
const api = new APIWrapper({
  apiKey: 'your-actual-api-key',
  baseURL: 'https://api.yourservice.com/v1',
  cacheTTL: 300000
});

async function demonstrateAPI() {
  try {
    // Get resource by ID
    const resource = await api.getResource('123', '/users');
    console.log('User:', resource);

    // Get all resources with filters
    const allUsers = await api.getAllResources('/users', {
      limit: 10,
      offset: 0,
      status: 'active'
    });
    console.log('All users:', allUsers);

    // Create new resource
    const newUser = await api.createResource({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    }, '/users');
    console.log('Created user:', newUser);

    // Update resource
    const updatedUser = await api.updateResource('123', {
      name: 'John Smith',
      status: 'verified'
    }, '/users');
    console.log('Updated user:', updatedUser);

    // Search resources
    const searchResults = await api.searchResources(
      'john',
      '/users/search',
      { role: 'user' }
    );
    console.log('Search results:', searchResults);

    // Delete resource
    await api.deleteResource('123', '/users');
    console.log('User deleted successfully');

  } catch (error) {
    console.error('API Error:', error.message);
  }
}

demonstrateAPI();
