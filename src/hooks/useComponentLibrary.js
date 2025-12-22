/**
 * useComponentLibrary.js
 * 
 * 📍 WHERE TO PUT: src/hooks/useComponentLibrary.js
 * 
 * Custom React hook that provides the 93-component library
 */

import { useState, useEffect, useMemo, useCallback } from 'react';

export function useComponentLibrary() {
  const [builtInComponents, setBuiltInComponents] = useState([]);
  const [componentCategories, setComponentCategories] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Load from public folder
        const response = await fetch('/components-library.json');
        const data = await response.json();
        
        // Organize into categories
        const categorized = {};
        data.forEach(comp => {
          if (!categorized[comp.category]) {
            categorized[comp.category] = {};
          }
          if (!categorized[comp.category][comp.subcategory]) {
            categorized[comp.category][comp.subcategory] = [];
          }
          categorized[comp.category][comp.subcategory].push(comp);
        });
        
        setBuiltInComponents(data);
        setComponentCategories(categorized);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load component library:', error);
        setIsLoading(false);
      }
    };
    
    loadComponents();
  }, []);

  // Search components
  const searchComponents = useCallback((query) => {
    if (!query) return builtInComponents;
    
    const q = query.toLowerCase();
    return builtInComponents.filter(comp => 
      comp.name.toLowerCase().includes(q) ||
      comp.displayName.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q) ||
      comp.subcategory.toLowerCase().includes(q)
    );
  }, [builtInComponents]);

  // Get components by category
  const getComponentsByCategory = useCallback((category) => {
    return builtInComponents.filter(comp => comp.category === category);
  }, [builtInComponents]);

  // Get all categories
  const getCategories = useMemo(() => {
    return Object.keys(componentCategories);
  }, [componentCategories]);

  return {
    builtInComponents,
    componentCategories,
    isLoading,
    searchComponents,
    getComponentsByCategory,
    getCategories
  };
}
