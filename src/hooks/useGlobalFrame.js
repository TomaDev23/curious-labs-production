/**
 * @hook useGlobalFrame
 * @description Replacement for useFrame that uses centralized frame management
 * @purpose Prevent mobile crashes from multiple useFrame loops
 */

import { useEffect, useRef } from 'react';
import globalFrameManager from '../utils/GlobalFrameManager';

export const useGlobalFrame = (callback, priority = 'normal', deps = []) => {
  const callbackRef = useRef(callback);
  const subscriptionRef = useRef(null);
  const idRef = useRef(`frame_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    // Subscribe to global frame manager
    const unsubscribe = globalFrameManager.subscribe(
      idRef.current,
      (time) => {
        if (callbackRef.current) {
          callbackRef.current(time);
        }
      },
      priority
    );
    
    subscriptionRef.current = unsubscribe;
    
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current();
        subscriptionRef.current = null;
      }
    };
  }, [priority, ...deps]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current();
      }
    };
  }, []);
};

export default useGlobalFrame; 