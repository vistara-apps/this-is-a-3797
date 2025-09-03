import { useAuth } from '../hooks/useAuth';

/**
 * Check if a feature is available based on user's premium status
 * @param {string} featureKey - Feature key
 * @returns {boolean} - Whether the feature is available
 */
export const isFeatureAvailable = (featureKey) => {
  const { user } = useAuth();
  
  // Free features available to all users
  const freeFeatures = [
    'basic_rights_guide',
    'basic_scripts',
    'view_recordings',
  ];
  
  // Premium features only available to premium users
  const premiumFeatures = [
    'advanced_rights_guide',
    'multilingual_scripts',
    'unlimited_recordings',
    'emergency_alerts',
    'custom_cards',
  ];
  
  // Check if feature is free
  if (freeFeatures.includes(featureKey)) {
    return true;
  }
  
  // Check if feature is premium and user has premium
  if (premiumFeatures.includes(featureKey)) {
    return user?.isPremium === true;
  }
  
  // Unknown feature
  return false;
};

/**
 * Get premium plan options
 * @returns {Array<Object>} - Premium plan options
 */
export const getPremiumPlans = () => {
  return [
    {
      id: 'price_basic_monthly',
      name: 'Basic',
      price: 4.99,
      interval: 'month',
      features: [
        'Multilingual scripts',
        'Advanced rights guide',
        'Emergency alerts',
      ],
      recommended: false,
    },
    {
      id: 'price_premium_monthly',
      name: 'Premium',
      price: 9.99,
      interval: 'month',
      features: [
        'Multilingual scripts',
        'Advanced rights guide',
        'Emergency alerts',
        'Unlimited recordings',
        'Custom shareable cards',
        'Priority support',
      ],
      recommended: true,
    },
    {
      id: 'price_premium_yearly',
      name: 'Premium (Annual)',
      price: 99.99,
      interval: 'year',
      features: [
        'Multilingual scripts',
        'Advanced rights guide',
        'Emergency alerts',
        'Unlimited recordings',
        'Custom shareable cards',
        'Priority support',
        '2 months free',
      ],
      recommended: false,
    },
  ];
};

/**
 * Get premium feature details
 * @param {string} featureKey - Feature key
 * @returns {Object|null} - Feature details
 */
export const getPremiumFeatureDetails = (featureKey) => {
  const features = {
    advanced_rights_guide: {
      name: 'Advanced Rights Guide',
      description: 'Get detailed, state-specific legal information and rights summaries.',
      icon: 'Shield',
    },
    multilingual_scripts: {
      name: 'Multilingual Scripts',
      description: 'Access scripts in multiple languages, including Spanish.',
      icon: 'Languages',
    },
    unlimited_recordings: {
      name: 'Unlimited Recordings',
      description: 'Record and store unlimited audio and video interactions.',
      icon: 'VideoCamera',
    },
    emergency_alerts: {
      name: 'Emergency Alerts',
      description: 'Send automatic alerts with your location to emergency contacts.',
      icon: 'Bell',
    },
    custom_cards: {
      name: 'Custom Shareable Cards',
      description: 'Create and share customized rights information cards.',
      icon: 'Share',
    },
  };
  
  return features[featureKey] || null;
};
