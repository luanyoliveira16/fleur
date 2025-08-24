import { useEffect, useState } from 'react';
import { getGestante, GestanteData } from '../services/gestanteService';

export function useGestante(uid: string) {
  const [gestante, setGestante] = useState<GestanteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGestante(uid).then(data => {
      setGestante(data);
      setLoading(false);
    });
  }, [uid]);

  return { gestante, loading };
}