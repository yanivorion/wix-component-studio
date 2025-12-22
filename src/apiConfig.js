// API Configuration for different environments

// For production (GitHub Pages), always use the deployed Render API
// For development, use localhost
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://wix-component-studio.onrender.com' // Hardcoded production URL
  : 'http://localhost:3001';

export const isProductionMode = () => process.env.NODE_ENV === 'production';

// Check if we're running in development mode
export const isDevelopmentMode = () => process.env.NODE_ENV === 'development';

// Check if we should use client-side API calls (for GitHub Pages deployment)
// NOTE: Client-side API won't work due to CORS restrictions from Claude API
// This is kept for future use with a CORS proxy
export const shouldUseClientSideAPI = () => {
  // Disabled - always use backend API
  return false;
  // return isProductionMode() && !process.env.REACT_APP_API_URL;
};

// Get full API endpoint
export const getApiEndpoint = (path) => {
  return `${API_URL}${path}`;
};

// API endpoints
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  CLAUDE_SINGLE: '/api/claude',
  CLAUDE_BULK: '/api/claude/bulk',
  CLAUDE_BULK_STREAM: '/api/claude/bulk-stream'
};

const config = {
  API_URL,
  API_ENDPOINTS,
  isProductionMode,
  isDevelopmentMode,
  shouldUseClientSideAPI,
  getApiEndpoint
};

export default config;

