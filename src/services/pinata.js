import axios from 'axios';

// Pinata API configuration
// In a real app, you would use environment variables for these values
const PINATA_API_KEY = 'YOUR_PINATA_API_KEY';
const PINATA_SECRET_API_KEY = 'YOUR_PINATA_SECRET_API_KEY';
const PINATA_API_URL = 'https://api.pinata.cloud';

// Configure axios instance for Pinata
const pinataApi = axios.create({
  baseURL: PINATA_API_URL,
  headers: {
    'pinata_api_key': PINATA_API_KEY,
    'pinata_secret_api_key': PINATA_SECRET_API_KEY,
  },
});

/**
 * Upload a file to Pinata (IPFS)
 * @param {File|Blob} file - File or Blob to upload
 * @param {string} name - Name for the file
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} - Upload response with IPFS hash
 */
export const uploadFile = async (file, name, metadata = {}) => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Add metadata
    const pinataMetadata = {
      name: name || `file-${Date.now()}`,
      keyvalues: {
        ...metadata,
        timestamp: new Date().toISOString(),
      },
    };
    
    formData.append('pinataMetadata', JSON.stringify(pinataMetadata));
    
    // Add options
    const pinataOptions = {
      cidVersion: 1,
    };
    
    formData.append('pinataOptions', JSON.stringify(pinataOptions));
    
    // Upload to Pinata
    const response = await pinataApi.post('/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error('Pinata upload error:', error);
    throw new Error('Failed to upload file to IPFS. Please try again later.');
  }
};

/**
 * Upload JSON data to Pinata (IPFS)
 * @param {Object} jsonData - JSON data to upload
 * @param {string} name - Name for the data
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} - Upload response with IPFS hash
 */
export const uploadJson = async (jsonData, name, metadata = {}) => {
  try {
    // Prepare request body
    const body = {
      pinataContent: jsonData,
      pinataMetadata: {
        name: name || `json-${Date.now()}`,
        keyvalues: {
          ...metadata,
          timestamp: new Date().toISOString(),
        },
      },
      pinataOptions: {
        cidVersion: 1,
      },
    };
    
    // Upload to Pinata
    const response = await pinataApi.post('/pinning/pinJSONToIPFS', body);
    
    return {
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error('Pinata JSON upload error:', error);
    throw new Error('Failed to upload data to IPFS. Please try again later.');
  }
};

/**
 * Upload a recording to Pinata (IPFS)
 * @param {Blob} recordingBlob - Recording blob
 * @param {string} type - Recording type ('audio' or 'video')
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} - Upload response with IPFS hash
 */
export const uploadRecording = async (recordingBlob, type, metadata = {}) => {
  try {
    const timestamp = new Date().toISOString();
    const name = `${type}-recording-${timestamp}`;
    
    return await uploadFile(recordingBlob, name, {
      type,
      ...metadata,
    });
  } catch (error) {
    console.error('Recording upload error:', error);
    throw error;
  }
};

/**
 * Upload a rights card to Pinata (IPFS)
 * @param {Object} cardData - Card data
 * @returns {Promise<Object>} - Upload response with IPFS hash
 */
export const uploadCard = async (cardData) => {
  try {
    const timestamp = new Date().toISOString();
    const name = `rights-card-${cardData.state}-${timestamp}`;
    
    return await uploadJson(cardData, name, {
      type: 'rights-card',
      state: cardData.state,
      language: cardData.language,
    });
  } catch (error) {
    console.error('Card upload error:', error);
    throw error;
  }
};
