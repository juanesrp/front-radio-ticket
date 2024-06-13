"use client"
import { refresh } from '@/utils/refresh';
import React, { useEffect } from 'react';

const Refreshtoken2 = () => {
  
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refresh();
        console.log(response.message);
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    };

    refreshToken();

    const intervalId = setInterval(refreshToken, 30 * 60 * 1000);  

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    </>
  );
};

export default Refreshtoken2;
