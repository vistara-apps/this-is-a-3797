/**
 * Share content using the Web Share API
 * @param {Object} data - Share data
 * @param {string} data.title - Share title
 * @param {string} data.text - Share text
 * @param {string} data.url - Share URL
 * @returns {Promise<void>}
 */
export const shareContent = async (data) => {
  try {
    // Check if Web Share API is supported
    if (!navigator.share) {
      throw new Error('Web Share API is not supported in your browser');
    }
    
    // Share content
    await navigator.share(data);
    
    return true;
  } catch (error) {
    console.error('Sharing error:', error);
    throw error;
  }
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Whether the copy was successful
 */
export const copyToClipboard = async (text) => {
  try {
    // Check if Clipboard API is supported
    if (!navigator.clipboard) {
      throw new Error('Clipboard API is not supported in your browser');
    }
    
    // Copy text to clipboard
    await navigator.clipboard.writeText(text);
    
    return true;
  } catch (error) {
    console.error('Clipboard error:', error);
    throw error;
  }
};

/**
 * Generate a shareable URL
 * @param {string} type - URL type ('rights', 'script', 'recording')
 * @param {string} id - Content ID
 * @param {Object} params - Additional URL parameters
 * @returns {string} - Shareable URL
 */
export const generateShareableUrl = (type, id, params = {}) => {
  try {
    // Create URL object
    const url = new URL(`${window.location.origin}/share/${type}/${id}`);
    
    // Add parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    return url.toString();
  } catch (error) {
    console.error('URL generation error:', error);
    throw error;
  }
};

/**
 * Share via email
 * @param {Object} data - Email data
 * @param {string} data.subject - Email subject
 * @param {string} data.body - Email body
 * @returns {string} - Email URL
 */
export const shareViaEmail = (data) => {
  try {
    // Create mailto URL
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
    
    // Open mailto URL
    window.open(mailtoUrl, '_blank');
    
    return mailtoUrl;
  } catch (error) {
    console.error('Email sharing error:', error);
    throw error;
  }
};

/**
 * Share via SMS
 * @param {string} body - SMS body
 * @returns {string} - SMS URL
 */
export const shareViaSms = (body) => {
  try {
    // Create SMS URL
    const smsUrl = `sms:?body=${encodeURIComponent(body)}`;
    
    // Open SMS URL
    window.open(smsUrl, '_blank');
    
    return smsUrl;
  } catch (error) {
    console.error('SMS sharing error:', error);
    throw error;
  }
};
