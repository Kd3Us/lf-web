// src/hooks/usePortfolioData.ts
import { useState, useEffect } from 'react';
import { driveService, PortfolioProject } from '@/services/googleDriveService';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<Record<string, PortfolioProject[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await driveService.buildPortfolioData();
        setPortfolioData(data);
        
        // Si aucune donnée n'est chargée, on affiche une erreur
        const hasData = Object.values(data).some(category => category.length > 0);
        if (!hasData) {
          setError('Aucun projet trouvé dans Google Drive');
        }
      } catch (err) {
        setError('Erreur lors du chargement du portfolio');
        console.error('Erreur usePortfolioData:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPortfolioData();
  }, []);
  
  return { portfolioData, loading, error, refetch: () => window.location.reload() };
};