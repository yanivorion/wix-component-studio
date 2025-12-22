import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// ============================================================================
// COMPONENTS CRUD OPERATIONS
// ============================================================================

/**
 * Save a component to Supabase
 */
export const saveComponent = async (componentData) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return { error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('components')
      .insert([{
        name: componentData.name,
        category: componentData.category,
        component_type: componentData.type,
        description: componentData.description,
        code: componentData.code,
        manifest: componentData.manifest,
        user_prompt: componentData.userPrompt,
        design_brief: componentData.designBrief,
        tags: componentData.tags || [],
        bulk_session_id: componentData.bulkSessionId
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving component:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get all components from library
 */
export const getComponents = async (filters = {}) => {
  if (!supabase) {
    return { data: [], error: 'Supabase not configured' };
  }

  try {
    let query = supabase
      .from('components')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.type) {
      query = query.eq('component_type', filters.type);
    }
    if (filters.isFavorite) {
      query = query.eq('is_favorite', true);
    }
    if (filters.tags && filters.tags.length > 0) {
      query = query.contains('tags', filters.tags);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching components:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get a single component by ID
 */
export const getComponent = async (id) => {
  if (!supabase) {
    return { data: null, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching component:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update a component
 */
export const updateComponent = async (id, updates) => {
  if (!supabase) {
    return { error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('components')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating component:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Delete a component
 */
export const deleteComponent = async (id) => {
  if (!supabase) {
    return { error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase
      .from('components')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting component:', error);
    return { error: error.message };
  }
};

/**
 * Toggle favorite status
 */
export const toggleFavorite = async (id, isFavorite) => {
  return updateComponent(id, { is_favorite: isFavorite });
};

/**
 * Increment usage count
 */
export const incrementUsageCount = async (id) => {
  if (!supabase) return;

  try {
    await supabase.rpc('increment_usage', { component_id: id });
  } catch (error) {
    console.error('Error incrementing usage:', error);
  }
};

// ============================================================================
// BULK SESSION OPERATIONS
// ============================================================================

/**
 * Create a bulk generation session
 */
export const createBulkSession = async (totalRequested, csvFilename = null) => {
  if (!supabase) {
    return { data: null, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('bulk_sessions')
      .insert([{
        total_requested: totalRequested,
        csv_filename: csvFilename
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating bulk session:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update bulk session progress
 */
export const updateBulkSession = async (sessionId, updates) => {
  if (!supabase) return { error: 'Supabase not configured' };

  try {
    const { data, error } = await supabase
      .from('bulk_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating bulk session:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Complete a bulk session
 */
export const completeBulkSession = async (sessionId, totalGenerated, totalFailed) => {
  return updateBulkSession(sessionId, {
    total_generated: totalGenerated,
    total_failed: totalFailed,
    status: totalFailed === 0 ? 'completed' : 'partial',
    completed_at: new Date().toISOString()
  });
};

/**
 * Get bulk sessions with component counts
 */
export const getBulkSessions = async () => {
  if (!supabase) {
    return { data: [], error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('bulk_sessions')
      .select(`
        *,
        components:components(count)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching bulk sessions:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get components from a bulk session
 */
export const getBulkSessionComponents = async (sessionId) => {
  if (!supabase) {
    return { data: [], error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .eq('bulk_session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching session components:', error);
    return { data: [], error: error.message };
  }
};

// ============================================================================
// SEARCH & STATS
// ============================================================================

/**
 * Search components
 */
export const searchComponents = async (searchTerm) => {
  if (!supabase) {
    return { data: [], error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error searching components:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get library statistics
 */
export const getLibraryStats = async () => {
  if (!supabase) {
    return { data: null, error: 'Supabase not configured' };
  }

  try {
    const { count: totalComponents } = await supabase
      .from('components')
      .select('*', { count: 'exact', head: true });

    const { count: totalFavorites } = await supabase
      .from('components')
      .select('*', { count: 'exact', head: true })
      .eq('is_favorite', true);

    const { data: categories } = await supabase
      .from('components')
      .select('category')
      .not('category', 'is', null);

    const uniqueCategories = [...new Set(categories?.map(c => c.category) || [])].length;

    return {
      data: {
        totalComponents,
        totalFavorites,
        uniqueCategories
      },
      error: null
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { data: null, error: error.message };
  }
};

export default {
  supabase,
  isSupabaseConfigured,
  saveComponent,
  getComponents,
  getComponent,
  updateComponent,
  deleteComponent,
  toggleFavorite,
  incrementUsageCount,
  createBulkSession,
  updateBulkSession,
  completeBulkSession,
  getBulkSessions,
  getBulkSessionComponents,
  searchComponents,
  getLibraryStats
};


