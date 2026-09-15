/**
 * useComponentLibrary.js
 *
 * Built-in component library.
 *
 * The index (public/components-library.json) holds metadata only - no code - so
 * startup stays cheap. Each category's source lives in public/library/<slug>.json
 * and is fetched the first time that category is opened, then cached for the
 * session. Loading every component eagerly would mean ~7 MB on every page load.
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

const BASE = process.env.PUBLIC_URL || '';

export function useComponentLibrary() {
  const [builtInComponents, setBuiltInComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(null);

  // category slug -> { id: code }, cached for the session
  const codeCache = useRef({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(`${BASE}/components-library.json`);
        if (!response.ok) {
          throw new Error(`components-library.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setBuiltInComponents(Array.isArray(data) ? data : []);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load component library:', err);
        if (!cancelled) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // { [category]: { [subcategory]: Component[] } }
  const componentCategories = useMemo(() => {
    const grouped = {};
    for (const comp of builtInComponents) {
      const cat = comp.category || 'Uncategorized';
      const sub = comp.subcategory || 'General';
      if (!grouped[cat]) grouped[cat] = {};
      if (!grouped[cat][sub]) grouped[cat][sub] = [];
      grouped[cat][sub].push(comp);
    }
    return grouped;
  }, [builtInComponents]);

  const categoryNames = useMemo(
    () => Object.keys(componentCategories).sort(
      (a, b) => (componentCategories[b] && Object.values(componentCategories[b]).flat().length)
              - (componentCategories[a] && Object.values(componentCategories[a]).flat().length)
    ),
    [componentCategories]
  );

  /** Fetch (and cache) the code file a component belongs to. */
  const loadCategoryCode = useCallback(async (file) => {
    if (!file) return {};
    if (codeCache.current[file]) return codeCache.current[file];
    setLoadingCategory(file);
    try {
      const res = await fetch(`${BASE}/${file}`);
      if (!res.ok) throw new Error(`${file}: ${res.status} ${res.statusText}`);
      const map = await res.json();
      codeCache.current[file] = map;
      return map;
    } catch (err) {
      console.error('Failed to load category code:', err);
      return {};
    } finally {
      setLoadingCategory(null);
    }
  }, []);

  /** Resolve one component's source, fetching its category file if needed. */
  const getComponentCode = useCallback(async (component) => {
    if (!component) return null;
    if (component.code) return component.code;            // already inlined
    const map = await loadCategoryCode(component.file);
    return map[component.id] || null;
  }, [loadCategoryCode]);

  return {
    builtInComponents,
    componentCategories,
    categoryNames,
    isLoading,
    error,
    loadingCategory,
    loadCategoryCode,
    getComponentCode,
  };
}
