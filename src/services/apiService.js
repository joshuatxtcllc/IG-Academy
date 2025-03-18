/**
 * API Service for SocialGuardian
 * Provides client-side interaction with the backend API
 */

// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.socialguardian.com/v1';

// Helper for handling API responses
const handleResponse = async (response) => {
  // Check if request was successful
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Something went wrong');
    } catch (e) {
      // If we can't parse error JSON, use status text
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
  
  // Check if response is empty
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text();
  }
};

// Get auth headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Authentication service methods
const authService = {
  // Login user and get token
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await handleResponse(response);
    
    // Save token to localStorage
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    
    return data;
  },
  
  // Refresh expired token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    const data = await handleResponse(response);
    
    // Save new tokens
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    }
    
    return data;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Social accounts service methods
const accountsService = {
  // Get all connected accounts
  getAccounts: async () => {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Connect a new account
  connectAccount: async (platform, accessToken, refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/accounts/connect`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ platform, access_token: accessToken, refresh_token: refreshToken }),
    });
    
    return handleResponse(response);
  },
  
  // Disconnect an account
  disconnectAccount: async (accountId) => {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  }
};

// Content service methods
const contentService = {
  // Get all content
  getContent: async (filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/campaigns${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Get a specific campaign
  getCampaignById: async (campaignId) => {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Create new campaign
  createCampaign: async (campaignData) => {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(campaignData),
    });
    
    return handleResponse(response);
  },
  
  // Update campaign
  updateCampaign: async (campaignId, campaignData) => {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(campaignData),
    });
    
    return handleResponse(response);
  },
  
  // Delete campaign
  deleteCampaign: async (campaignId) => {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  }
};

// Influencer marketplace service methods
const influencerService = {
  // Search influencers
  searchInfluencers: async (filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.minFollowers) queryParams.append('minFollowers', filters.minFollowers);
    if (filters.maxFollowers) queryParams.append('maxFollowers', filters.maxFollowers);
    if (filters.platforms) queryParams.append('platforms', filters.platforms);
    if (filters.locations) queryParams.append('locations', filters.locations);
    if (filters.minEngagement) queryParams.append('minEngagement', filters.minEngagement);
    if (filters.availability) queryParams.append('availability', filters.availability);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/influencers${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Get influencer details
  getInfluencerById: async (influencerId) => {
    const response = await fetch(`${API_BASE_URL}/influencers/${influencerId}`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Create collaboration request
  createCollaborationRequest: async (influencerId, requestData) => {
    const response = await fetch(`${API_BASE_URL}/influencers/${influencerId}/collaborations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    
    return handleResponse(response);
  },
  
  // Get collaboration requests
  getCollaborationRequests: async (status, page = 1, limit = 20) => {
    const response = await fetch(`${API_BASE_URL}/collaborations?status=${status}&page=${page}&limit=${limit}`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  }
};

// Export all service modules
const apiService = {
  auth: authService,
  accounts: accountsService,
  content: contentService,
  ai: aiService,
  analytics: analyticsService,
  guardian: guardianService,
  campaigns: campaignsService,
  influencers: influencerService,
  
  // Interceptor for token refresh
  setupInterceptors: (navigate) => {
    // Original fetch
    const originalFetch = window.fetch;
    
    // Override fetch to handle 401 errors
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        // If response is 401 Unauthorized, try to refresh token
        if (response.status === 401) {
          try {
            // Try to refresh token
            await authService.refreshToken();
            
            // Update Authorization header with new token
            const newToken = localStorage.getItem('token');
            if (newToken) {
              // Update headers in the original request
              if (args[1] && args[1].headers) {
                args[1].headers['Authorization'] = `Bearer ${newToken}`;
              } else if (args[1]) {
                args[1].headers = { 'Authorization': `Bearer ${newToken}` };
              } else {
                args[1] = { headers: { 'Authorization': `Bearer ${newToken}` } };
              }
              
              // Retry the original request with new token
              return originalFetch(...args);
            }
          } catch (refreshError) {
            // If refresh fails, logout and redirect to login
            console.error('Token refresh failed:', refreshError);
            authService.logout();
            if (navigate) {
              navigate('/login');
            }
          }
        }
        
        return response;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    };
  }
};

export default apiService;();
    
    if (filters.accountId) queryParams.append('account_id', filters.accountId);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.fromDate) queryParams.append('from_date', filters.fromDate);
    if (filters.toDate) queryParams.append('to_date', filters.toDate);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/content${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Get a specific content item
  getContentById: async (contentId) => {
    const response = await fetch(`${API_BASE_URL}/content/${contentId}`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Create new content
  createContent: async (contentData) => {
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(contentData),
    });
    
    return handleResponse(response);
  },
  
  // Update content
  updateContent: async (contentId, contentData) => {
    const response = await fetch(`${API_BASE_URL}/content/${contentId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(contentData),
    });
    
    return handleResponse(response);
  },
  
  // Delete content
  deleteContent: async (contentId) => {
    const response = await fetch(`${API_BASE_URL}/content/${contentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  }
};

// AI service methods
const aiService = {
  // Generate captions
  generateCaptions: async (params) => {
    const response = await fetch(`${API_BASE_URL}/ai/generate/caption`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(params),
    });
    
    return handleResponse(response);
  }
};

// Analytics service methods
const analyticsService = {
  // Get analytics overview
  getAnalyticsOverview: async (params) => {
    // Build query string from params
    const queryParams = new URLSearchParams();
    
    if (params.accountId) queryParams.append('account_id', params.accountId);
    if (params.period) queryParams.append('period', params.period);
    if (params.startDate) queryParams.append('start_date', params.startDate);
    if (params.endDate) queryParams.append('end_date', params.endDate);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/analytics/overview${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  }
};

// Guardian service methods
const guardianService = {
  // Create follower backup
  createBackup: async (accountId) => {
    const response = await fetch(`${API_BASE_URL}/protection/backup`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ socialAccountId: accountId }),
    });
    
    return handleResponse(response);
  },
  
  // Get backup history
  getBackupHistory: async (accountId, page = 1, limit = 20) => {
    const response = await fetch(`${API_BASE_URL}/protection/backups?account_id=${accountId}&page=${page}&limit=${limit}`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
  
  // Generate recovery messages
  generateRecoveryMessages: async (accountId, backupId, newAccountHandle, reason) => {
    const response = await fetch(`${API_BASE_URL}/protection/recovery/message`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        socialAccountId: accountId,
        backupId,
        newAccountHandle,
        reason
      }),
    });
    
    return handleResponse(response);
  }
};

// Campaigns service methods
const campaignsService = {
  // Get all campaigns
  getCampaigns: async (filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams
