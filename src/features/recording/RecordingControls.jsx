import React, { useState } from 'react';
import { Mic, Video, StopCircle, AlertTriangle, Bell, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { ContactManager } from './ContactManager';
import { useRecording } from '../../hooks/useRecording';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../hooks/useApp';
import { uploadRecording } from '../../services/pinata';

/**
 * RecordingControls component for recording audio/video and sending alerts
 */
const RecordingControls = () => {
  const { isAuthenticated, user } = useAuth();
  const { location } = useLocation();
  const { settings } = useApp();
  const [recordingType, setRecordingType] = useState('audio');
  const [showContacts, setShowContacts] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [alertSent, setAlertSent] = useState(false);
  
  const {
    isRecording,
    error: recordingError,
    recordingData,
    startRecording,
    stopRecording,
  } = useRecording(recordingType);
  
  /**
   * Handle start recording
   * @param {string} type - Recording type ('audio' or 'video')
   */
  const handleStartRecording = (type) => {
    setRecordingType(type);
    startRecording();
  };
  
  /**
   * Handle stop recording
   */
  const handleStopRecording = () => {
    stopRecording();
  };
  
  /**
   * Handle send alert
   */
  const handleSendAlert = async () => {
    try {
      // In a real app, we would send alerts to emergency contacts
      // For demo purposes, we'll just simulate a successful alert
      
      // Check if user has emergency contacts
      if (!isAuthenticated) {
        throw new Error('You need to be logged in to send alerts.');
      }
      
      if (!settings.emergencyContacts || settings.emergencyContacts.length === 0) {
        setShowContacts(true);
        throw new Error('You need to add emergency contacts first.');
      }
      
      // Simulate sending alert
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAlertSent(true);
      
      // Reset alert sent status after 5 seconds
      setTimeout(() => {
        setAlertSent(false);
      }, 5000);
    } catch (error) {
      console.error('Alert error:', error);
      setUploadStatus({
        type: 'error',
        message: error.message,
      });
    }
  };
  
  /**
   * Handle upload recording
   */
  const handleUploadRecording = async () => {
    if (!recordingData) {
      return;
    }
    
    try {
      setUploadStatus({
        type: 'loading',
        message: 'Uploading recording...',
      });
      
      // In a real app, we would upload the recording to Pinata
      // For demo purposes, we'll just simulate a successful upload
      // const uploadResult = await uploadRecording(recordingData.blob, recordingType);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus({
        type: 'success',
        message: 'Recording uploaded successfully!',
        // url: uploadResult.url,
        url: 'https://example.com/recording',
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: 'Failed to upload recording. Please try again later.',
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Mic className="h-6 w-6 text-primary" />
        <h1 className="text-heading font-semibold">Quick Record & Alert System</h1>
      </div>
      
      {!isAuthenticated && (
        <AlertBanner
          variant="info"
          icon={<Info className="h-4 w-4" />}
        >
          <div className="flex justify-between items-center">
            <p>Sign up to save recordings and set up emergency contacts.</p>
            <Button size="sm" asChild>
              <a href="/register">Sign Up</a>
            </Button>
          </div>
        </AlertBanner>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Record Interaction</CardTitle>
            <CardDescription>
              Quickly record audio or video of an interaction with law enforcement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recordingError && (
              <AlertBanner
                variant="danger"
                icon={<AlertTriangle className="h-4 w-4" />}
              >
                {recordingError}
              </AlertBanner>
            )}
            
            {isRecording ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-error text-white mb-4">
                  <div className="h-4 w-4 rounded-full bg-white animate-pulse"></div>
                </div>
                <p className="text-lg font-semibold mb-2">Recording {recordingType}...</p>
                <p className="text-sm text-neutral-900/60 mb-4">
                  Tap the button below when you're ready to stop recording.
                </p>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleStopRecording}
                  className="px-8"
                >
                  <StopCircle className="h-5 w-5 mr-2" />
                  Stop Recording
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleStartRecording('audio')}
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Mic className="h-8 w-8 mb-2" />
                  <span>Record Audio</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleStartRecording('video')}
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Video className="h-8 w-8 mb-2" />
                  <span>Record Video</span>
                </Button>
              </div>
            )}
            
            {recordingData && !isRecording && (
              <div className="mt-6 space-y-4">
                <div className="bg-neutral-100 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Recording Complete</h3>
                  <p className="text-sm mb-4">
                    Your {recordingData.type} recording is ready. You can play it back, save it, or share it.
                  </p>
                  
                  {recordingData.type === 'audio' ? (
                    <audio
                      src={recordingData.url}
                      controls
                      className="w-full"
                    ></audio>
                  ) : (
                    <video
                      src={recordingData.url}
                      controls
                      className="w-full rounded-md"
                    ></video>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleUploadRecording}
                    disabled={uploadStatus?.type === 'loading' || uploadStatus?.type === 'success'}
                    className="flex-1"
                  >
                    {uploadStatus?.type === 'loading' ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Uploading...
                      </>
                    ) : uploadStatus?.type === 'success' ? (
                      'Uploaded'
                    ) : (
                      'Save Recording'
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleSendAlert}
                    disabled={alertSent}
                    className="flex-1"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    {alertSent ? 'Alert Sent' : 'Send Alert'}
                  </Button>
                </div>
                
                {uploadStatus && uploadStatus.type !== 'loading' && (
                  <AlertBanner
                    variant={uploadStatus.type === 'success' ? 'info' : 'danger'}
                    icon={uploadStatus.type === 'success' ? <Info className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  >
                    {uploadStatus.message}
                    {uploadStatus.url && (
                      <div className="mt-2">
                        <a
                          href={uploadStatus.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          View Recording
                        </a>
                      </div>
                    )}
                  </AlertBanner>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>
                Set up contacts to alert in case of an emergency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactManager
                showForm={showContacts}
                onToggleForm={() => setShowContacts(!showContacts)}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
              <CardDescription>
                Your current location will be included with alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {location ? (
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">State:</span> {location.state || 'Unknown'}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Coordinates:</span> {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Last Updated:</span> {new Date(location.timestamp).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-neutral-900/60">
                  Location information not available. Make sure location services are enabled.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-neutral-100 rounded-lg p-6">
        <p className="text-sm text-neutral-900/60 mb-4">
          <strong>Disclaimer:</strong> This recording feature is provided for documentation purposes only. Always prioritize your safety during interactions with law enforcement. Follow all lawful orders and inform officers if you are recording the interaction.
        </p>
      </div>
    </div>
  );
};

export default RecordingControls;
