import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
let app = null;
let db = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('⚠️ Firebase not configured - check environment variables');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

// Check if Firebase is configured
export const isFirebaseConfigured = () => {
  return db !== null;
};

// ============================================================================
// COMPONENTS CRUD OPERATIONS
// ============================================================================

/**
 * Save a component to Firebase
 */
export const saveComponent = async (componentData) => {
  if (!db) {
    console.warn('Firebase not configured');
    return { error: 'Firebase not configured' };
  }

  try {
    const docRef = await addDoc(collection(db, 'components'), {
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
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    console.log('✅ Component saved:', docRef.id);
    return { data: { id: docRef.id }, error: null };
  } catch (error) {
    console.error('Error saving component:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get all components from library
 */
export const getComponents = async (filters = {}) => {
  if (!db) {
    return { data: [], error: 'Firebase not configured' };
  }

  try {
    let q = query(
      collection(db, 'components'),
      orderBy('createdAt', 'desc')
    );

    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.type) {
      q = query(q, where('componentType', '==', filters.type));
    }
    if (filters.isFavorite) {
      q = query(q, where('isFavorite', '==', true));
    }
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const components = [];
    
    querySnapshot.forEach((doc) => {
      components.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });

    return { data: components, error: null };
  } catch (error) {
    console.error('Error fetching components:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get a single component by ID
 */
export const getComponent = async (id) => {
  if (!db) {
    return { data: null, error: 'Firebase not configured' };
  }

  try {
    const docRef = doc(db, 'components', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        data: {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate()
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
  if (!db) {
    return { error: 'Firebase not configured' };
  }

  try {
    const docRef = doc(db, 'components', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });

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
  if (!db) {
    return { error: 'Firebase not configured' };
  }

  try {
    await deleteDoc(doc(db, 'components', id));
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
  if (!db) return;

  try {
    const docRef = doc(db, 'components', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentCount = docSnap.data().usageCount || 0;
      await updateDoc(docRef, {
        usageCount: currentCount + 1,
        updatedAt: Timestamp.now()
      });
    }
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
  if (!db) {
    return { data: null, error: 'Firebase not configured' };
  }

  try {
    const docRef = await addDoc(collection(db, 'bulkSessions'), {
      totalRequested,
      totalGenerated: 0,
      totalFailed: 0,
      status: 'in_progress',
      csvFilename,
      createdAt: Timestamp.now(),
      completedAt: null
    });

    console.log('✅ Bulk session created:', docRef.id);
    return { data: { id: docRef.id }, error: null };
  } catch (error) {
    console.error('Error creating bulk session:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update bulk session progress
 */
export const updateBulkSession = async (sessionId, updates) => {
  if (!db) return { error: 'Firebase not configured' };

  try {
    const docRef = doc(db, 'bulkSessions', sessionId);
    await updateDoc(docRef, updates);
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
    completedAt: Timestamp.now()
  });
};

/**
 * Get bulk sessions
 */
export const getBulkSessions = async () => {
  if (!db) {
    return { data: [], error: 'Firebase not configured' };
  }

  try {
    const q = query(
      collection(db, 'bulkSessions'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = [];
    
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        completedAt: doc.data().completedAt?.toDate()
      });
    });

    return { data: sessions, error: null };
  } catch (error) {
    console.error('Error fetching bulk sessions:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get components from a bulk session
 */
export const getBulkSessionComponents = async (sessionId) => {
  if (!db) {
    return { data: [], error: 'Firebase not configured' };
  }

  try {
    const q = query(
      collection(db, 'components'),
      where('bulkSessionId', '==', sessionId),
      orderBy('createdAt', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const components = [];
    
    querySnapshot.forEach((doc) => {
      components.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });

    return { data: components, error: null };
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
  if (!db) {
    return { data: [], error: 'Firebase not configured' };
  }

  try {
    // Note: Firebase doesn't have full-text search built-in
    // This is a simple implementation that gets all and filters
    // For production, consider using Algolia or similar
    const querySnapshot = await getDocs(collection(db, 'components'));
    const components = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const searchLower = searchTerm.toLowerCase();
      
      if (
        data.name?.toLowerCase().includes(searchLower) ||
        data.description?.toLowerCase().includes(searchLower) ||
        data.category?.toLowerCase().includes(searchLower) ||
        data.componentType?.toLowerCase().includes(searchLower)
      ) {
        components.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        });
      }
    });

    return { data: components, error: null };
  } catch (error) {
    console.error('Error searching components:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get library statistics
 */
export const getLibraryStats = async () => {
  if (!db) {
    return { data: null, error: 'Firebase not configured' };
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'components'));
    let totalComponents = 0;
    let totalFavorites = 0;
    const categories = new Set();

    querySnapshot.forEach((doc) => {
      totalComponents++;
      if (doc.data().isFavorite) totalFavorites++;
      if (doc.data().category) categories.add(doc.data().category);
    });

    return {
      data: {
        totalComponents,
        totalFavorites,
        uniqueCategories: categories.size
      },
      error: null
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { data: null, error: error.message };
  }
};

export default {
  isFirebaseConfigured,
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

