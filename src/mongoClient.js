import { MongoClient } from 'mongodb';

// MongoDB configuration
const MONGODB_URI = process.env.REACT_APP_MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.REACT_APP_MONGODB_DATABASE || 'wix-component-studio';

let client = null;
let db = null;

/**
 * Initialize MongoDB connection
 */
const initMongoDB = async () => {
  if (db) return db;

  try {
    // For Atlas: Use the connection string directly
    // For local: Use mongodb://localhost:27017
    client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(DATABASE_NAME);
    
    console.log('✅ MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return null;
  }
};

/**
 * Get MongoDB database instance
 */
export const getDB = async () => {
  if (!db) {
    await initMongoDB();
  }
  return db;
};

/**
 * Check if MongoDB is configured
 */
export const isMongoDBConfigured = () => {
  return !!process.env.REACT_APP_MONGODB_URI;
};

// ============================================================================
// COMPONENTS CRUD OPERATIONS
// ============================================================================

/**
 * Save a component to MongoDB
 */
export const saveComponent = async (componentData) => {
  try {
    const database = await getDB();
    if (!database) {
      console.warn('MongoDB not configured');
      return { error: 'MongoDB not configured' };
    }

    const collection = database.collection('components');
    const result = await collection.insertOne({
      name: componentData.name,
      category: componentData.category || null,
      componentType: componentData.type || null,
      description: componentData.description || null,
      code: componentData.code,
      manifest: componentData.manifest || null,
      userPrompt: componentData.userPrompt || null,
      designBrief: componentData.designBrief || null,
      generatedBy: 'claude',
      tags: componentData.tags || [],
      isFavorite: false,
      usageCount: 0,
      bulkSessionId: componentData.bulkSessionId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Component saved:', result.insertedId);
    return { data: { id: result.insertedId.toString() }, error: null };
  } catch (error) {
    console.error('Error saving component:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get all components from library
 */
export const getComponents = async (filters = {}) => {
  try {
    const database = await getDB();
    if (!database) {
      return { data: [], error: 'MongoDB not configured' };
    }

    const collection = database.collection('components');
    const query = {};

    // Apply filters
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.type) {
      query.componentType = filters.type;
    }
    if (filters.isFavorite) {
      query.isFavorite = true;
    }

    const options = {
      sort: { createdAt: -1 }
    };

    if (filters.limit) {
      options.limit = filters.limit;
    }

    const components = await collection.find(query, options).toArray();
    
    // Convert MongoDB _id to id
    const formattedComponents = components.map(comp => ({
      ...comp,
      id: comp._id.toString(),
      _id: undefined
    }));

    return { data: formattedComponents, error: null };
  } catch (error) {
    console.error('Error fetching components:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get a single component by ID
 */
export const getComponent = async (id) => {
  try {
    const database = await getDB();
    if (!database) {
      return { data: null, error: 'MongoDB not configured' };
    }

    const { ObjectId } = require('mongodb');
    const collection = database.collection('components');
    const component = await collection.findOne({ _id: new ObjectId(id) });

    if (component) {
      return {
        data: {
          ...component,
          id: component._id.toString(),
          _id: undefined
        },
        error: null
      };
    } else {
      return { data: null, error: 'Component not found' };
    }
  } catch (error) {
    console.error('Error fetching component:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update a component
 */
export const updateComponent = async (id, updates) => {
  try {
    const database = await getDB();
    if (!database) {
      return { error: 'MongoDB not configured' };
    }

    const { ObjectId } = require('mongodb');
    const collection = database.collection('components');
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      }
    );

    return { error: null };
  } catch (error) {
    console.error('Error updating component:', error);
    return { error: error.message };
  }
};

/**
 * Delete a component
 */
export const deleteComponent = async (id) => {
  try {
    const database = await getDB();
    if (!database) {
      return { error: 'MongoDB not configured' };
    }

    const { ObjectId } = require('mongodb');
    const collection = database.collection('components');
    await collection.deleteOne({ _id: new ObjectId(id) });
    
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
  return updateComponent(id, { isFavorite });
};

/**
 * Increment usage count
 */
export const incrementUsageCount = async (id) => {
  try {
    const database = await getDB();
    if (!database) return;

    const { ObjectId } = require('mongodb');
    const collection = database.collection('components');
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $inc: { usageCount: 1 },
        $set: { updatedAt: new Date() }
      }
    );
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
  try {
    const database = await getDB();
    if (!database) {
      return { data: null, error: 'MongoDB not configured' };
    }

    const collection = database.collection('bulkSessions');
    const result = await collection.insertOne({
      totalRequested,
      totalGenerated: 0,
      totalFailed: 0,
      status: 'in_progress',
      csvFilename,
      createdAt: new Date(),
      completedAt: null
    });

    console.log('✅ Bulk session created:', result.insertedId);
    return { data: { id: result.insertedId.toString() }, error: null };
  } catch (error) {
    console.error('Error creating bulk session:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update bulk session progress
 */
export const updateBulkSession = async (sessionId, updates) => {
  try {
    const database = await getDB();
    if (!database) return { error: 'MongoDB not configured' };

    const { ObjectId } = require('mongodb');
    const collection = database.collection('bulkSessions');
    
    await collection.updateOne(
      { _id: new ObjectId(sessionId) },
      { $set: updates }
    );
    
    return { error: null };
  } catch (error) {
    console.error('Error updating bulk session:', error);
    return { error: error.message };
  }
};

/**
 * Complete a bulk session
 */
export const completeBulkSession = async (sessionId, totalGenerated, totalFailed) => {
  return updateBulkSession(sessionId, {
    totalGenerated,
    totalFailed,
    status: totalFailed === 0 ? 'completed' : 'partial',
    completedAt: new Date()
  });
};

/**
 * Get bulk sessions
 */
export const getBulkSessions = async () => {
  try {
    const database = await getDB();
    if (!database) {
      return { data: [], error: 'MongoDB not configured' };
    }

    const collection = database.collection('bulkSessions');
    const sessions = await collection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    
    const formattedSessions = sessions.map(session => ({
      ...session,
      id: session._id.toString(),
      _id: undefined
    }));

    return { data: formattedSessions, error: null };
  } catch (error) {
    console.error('Error fetching bulk sessions:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get components from a bulk session
 */
export const getBulkSessionComponents = async (sessionId) => {
  try {
    const database = await getDB();
    if (!database) {
      return { data: [], error: 'MongoDB not configured' };
    }

    const collection = database.collection('components');
    const components = await collection
      .find({ bulkSessionId: sessionId })
      .sort({ createdAt: 1 })
      .toArray();
    
    const formattedComponents = components.map(comp => ({
      ...comp,
      id: comp._id.toString(),
      _id: undefined
    }));

    return { data: formattedComponents, error: null };
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
  try {
    const database = await getDB();
    if (!database) {
      return { data: [], error: 'MongoDB not configured' };
    }

    const collection = database.collection('components');
    const components = await collection
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { componentType: { $regex: searchTerm, $options: 'i' } }
        ]
      })
      .toArray();
    
    const formattedComponents = components.map(comp => ({
      ...comp,
      id: comp._id.toString(),
      _id: undefined
    }));

    return { data: formattedComponents, error: null };
  } catch (error) {
    console.error('Error searching components:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get library statistics
 */
export const getLibraryStats = async () => {
  try {
    const database = await getDB();
    if (!database) {
      return { data: null, error: 'MongoDB not configured' };
    }

    const collection = database.collection('components');
    
    const totalComponents = await collection.countDocuments();
    const totalFavorites = await collection.countDocuments({ isFavorite: true });
    const categories = await collection.distinct('category');

    return {
      data: {
        totalComponents,
        totalFavorites,
        uniqueCategories: categories.filter(Boolean).length
      },
      error: null
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { data: null, error: error.message };
  }
};

export default {
  isMongoDBConfigured,
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



