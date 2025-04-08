import { createContext, useState, useCallback, useMemo } from 'react';
import api from '@/utils/api';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const [nearbyCollections, setNearbyCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const response = await api.get('/api/collections');
      setCollections(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching collections');
    } finally {
      setLoading(false);
    }
  }, []);

  const reportBin = useCallback(async (binData) => {
    try {
      setLoading(true);
      clearError();
      const response = await api.post('/api/collections', binData);
      setCollections(prev => [...prev, response.data.data]);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error reporting bin');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getNearbyCollections = useCallback(async (latitude, longitude, radius = 1000) => {
    try {
      setLoading(true);
      clearError();
      const response = await api.get(
        `/api/collections/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      );
      setNearbyCollections(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching nearby collections');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCollection = useCallback(async (id, updateData) => {
    try {
      setLoading(true);
      clearError();
      const response = await api.put(`/api/collections/${id}`, updateData);
      setCollections(prev =>
        prev.map(col => (col._id === id ? response.data.data : col))
      );
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating collection');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserCollections = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const response = await api.get('/api/collections/user');
      setUserCollections(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching user collections');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    collections,
    userCollections,
    nearbyCollections,
    loading,
    error,
    reportBin,
    fetchCollections,
    getNearbyCollections,
    updateCollection,
    fetchUserCollections,
    clearError,
  }), [
    collections,
    userCollections,
    nearbyCollections,
    loading,
    error,
    reportBin,
    fetchCollections,
    getNearbyCollections,
    updateCollection,
    fetchUserCollections,
  ]);

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};
