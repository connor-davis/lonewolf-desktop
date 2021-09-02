/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { database } from '../state/database';

export default function useUserStatus(alias) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    database.get(alias).get('status').on(setIsOnline);
  }, []);

  return isOnline;
}
