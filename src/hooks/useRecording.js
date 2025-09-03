import { useState, useEffect, useRef } from 'react';
import { useApp } from './useApp';

/**
 * Custom hook for handling media recording
 * @param {string} mediaType - Type of media to record ('audio' or 'video')
 * @returns {Object} Recording methods and state
 */
export const useRecording = (mediaType = 'audio') => {
  const { startRecording: appStartRecording, stopRecording: appStopRecording } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [recordingData, setRecordingData] = useState(null);
  const mediaRecorderRef = useRef(null);
  const mediaChunksRef = useRef([]);
  
  /**
   * Start recording
   */
  const startRecording = async () => {
    setError(null);
    
    try {
      // Request media permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: mediaType === 'video',
      });
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaChunksRef.current = [];
      
      // Set up event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mediaChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Create blob from chunks
        const blob = new Blob(mediaChunksRef.current, {
          type: mediaType === 'video' ? 'video/webm' : 'audio/webm',
        });
        
        // Create URL for blob
        const url = URL.createObjectURL(blob);
        
        // Set recording data
        setRecordingData({
          url,
          blob,
          type: mediaType,
          size: blob.size,
        });
        
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
        
        // Update app state
        appStopRecording({
          url,
          type: mediaType,
          size: blob.size,
        });
        
        setIsRecording(false);
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Update app state
      appStartRecording(mediaType);
    } catch (error) {
      console.error('Recording error:', error);
      setError(error.message);
    }
  };
  
  /**
   * Stop recording
   */
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);
  
  return {
    isRecording,
    error,
    recordingData,
    startRecording,
    stopRecording,
  };
};
