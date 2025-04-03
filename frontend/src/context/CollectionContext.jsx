import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

const CollectionContext = createContext();

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within CollectionProvider');
  }
  return context;
};

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reportBin = async (binData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/collections', binData);
      setCollections([...collections, data.data]);
      toast.success('Bin reported successfully!', {
        style: { background: "#2D6A4F", color: "#FFFFFF" }
      });
      return { success: true, data: data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Error reporting bin';
      toast.error(message, {
        style: { background: "#DC2626", color: "#FFFFFF" }
      });
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const getNearbyBins = async (latitude, longitude, radius = 1000) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/collections/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
      setCollections(data.data);
      return { success: true, data: data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Error fetching nearby bins';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CollectionContext.Provider value={{
      collections,
      loading,
      error,
      reportBin,
      getNearbyBins
    }}>
      {children}
    </CollectionContext.Provider>
  );
};