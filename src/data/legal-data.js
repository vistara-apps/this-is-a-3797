/**
 * Sample legal data for different states
 * In a real app, this would be fetched from a backend API or database
 */
export const legalData = {
  'California': {
    overview: 'In California, you have specific rights during interactions with law enforcement. These include the right to remain silent, the right to refuse searches in many circumstances, and the right to an attorney if arrested.',
    rights: [
      {
        title: 'Right to Remain Silent',
        description: 'You have the right to remain silent and cannot be punished for refusing to answer questions. If you wish to remain silent, say so out loud. In California, you are only required to provide your name and identification if stopped while driving or if you are being detained with reasonable suspicion.',
      },
      {
        title: 'Right to Refuse Searches',
        description: 'You have the right to refuse consent to a search of yourself, your car, or your home. However, if police have probable cause, a warrant, or certain emergency circumstances exist, they may conduct a search without your consent.',
      },
      {
        title: 'Right to an Attorney',
        description: 'If you are arrested, you have the right to a government-appointed attorney if you cannot afford one. You can say, "I want to speak to an attorney" and remain silent until you have consulted with one.',
      },
      {
        title: 'Right to Record',
        description: 'In California, you have the right to record police officers performing their official duties in public places, as long as you do not interfere with their activities. However, you should clearly state that you are recording.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Stay calm and keep your hands visible',
        'State clearly if you wish to remain silent',
        'Ask if you are free to leave if not under arrest',
        'Ask for an attorney immediately if arrested',
        'Comply with lawful orders even if you plan to challenge them later',
      ],
      donts: [
        'Don\'t physically resist officers even if you believe they are violating your rights',
        'Don\'t provide false information or documents',
        'Don\'t consent to searches you don\'t want',
        'Don\'t discuss your immigration status with police unless you have an immigration attorney',
        'Don\'t make sudden movements or reach for anything without explaining first',
      ],
    },
    specialConsiderations: 'California has specific laws regarding immigration enforcement cooperation. Local law enforcement has limitations on cooperation with federal immigration authorities under the California Values Act (SB 54).',
  },
  'New York': {
    overview: 'In New York State, you have important rights during interactions with law enforcement. These include the right to remain silent, the right to refuse searches in many circumstances, and the right to an attorney if arrested.',
    rights: [
      {
        title: 'Right to Remain Silent',
        description: 'You have the right to remain silent and cannot be punished for refusing to answer questions. If you wish to remain silent, say so out loud. In New York, you are required to provide your name if stopped with reasonable suspicion, but you don\'t have to answer other questions.',
      },
      {
        title: 'Right to Refuse Searches',
        description: 'You have the right to refuse consent to a search of yourself, your car, or your home. However, if police have probable cause, a warrant, or certain emergency circumstances exist, they may conduct a search without your consent.',
      },
      {
        title: 'Right to an Attorney',
        description: 'If you are arrested, you have the right to a government-appointed attorney if you cannot afford one. You can say, "I want to speak to an attorney" and remain silent until you have consulted with one.',
      },
      {
        title: 'Right to Record',
        description: 'In New York, you have the right to record police officers performing their official duties in public places, as long as you do not interfere with their activities.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Stay calm and keep your hands visible',
        'State clearly if you wish to remain silent',
        'Ask if you are free to leave if not under arrest',
        'Ask for an attorney immediately if arrested',
        'Comply with lawful orders even if you plan to challenge them later',
      ],
      donts: [
        'Don\'t physically resist officers even if you believe they are violating your rights',
        'Don\'t provide false information or documents',
        'Don\'t consent to searches you don\'t want',
        'Don\'t discuss your immigration status with police unless you have an immigration attorney',
        'Don\'t make sudden movements or reach for anything without explaining first',
      ],
    },
    specialConsiderations: 'New York City has specific protections for immigrants through Executive Orders 34 and 41, limiting cooperation with federal immigration authorities.',
  },
  'Texas': {
    overview: 'In Texas, you have specific rights during interactions with law enforcement. These include the right to remain silent, the right to refuse searches in many circumstances, and the right to an attorney if arrested.',
    rights: [
      {
        title: 'Right to Remain Silent',
        description: 'You have the right to remain silent and cannot be punished for refusing to answer questions. If you wish to remain silent, say so out loud. In Texas, you are required to provide your name, residence address, and date of birth if lawfully arrested.',
      },
      {
        title: 'Right to Refuse Searches',
        description: 'You have the right to refuse consent to a search of yourself, your car, or your home. However, if police have probable cause, a warrant, or certain emergency circumstances exist, they may conduct a search without your consent.',
      },
      {
        title: 'Right to an Attorney',
        description: 'If you are arrested, you have the right to a government-appointed attorney if you cannot afford one. You can say, "I want to speak to an attorney" and remain silent until you have consulted with one.',
      },
      {
        title: 'Right to Record',
        description: 'In Texas, you have the right to record police officers performing their official duties in public places, as long as you do not interfere with their activities.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Stay calm and keep your hands visible',
        'State clearly if you wish to remain silent',
        'Ask if you are free to leave if not under arrest',
        'Ask for an attorney immediately if arrested',
        'Comply with lawful orders even if you plan to challenge them later',
      ],
      donts: [
        'Don\'t physically resist officers even if you believe they are violating your rights',
        'Don\'t provide false information or documents',
        'Don\'t consent to searches you don\'t want',
        'Don\'t discuss your immigration status with police unless you have an immigration attorney',
        'Don\'t make sudden movements or reach for anything without explaining first',
      ],
    },
    specialConsiderations: 'Texas has SB 4, which allows law enforcement officers to question the immigration status of anyone they detain or arrest.',
  },
};

/**
 * Get legal data for a specific state
 * @param {string} state - State name
 * @returns {Object|null} - Legal data for the state
 */
export const getLegalDataForState = (state) => {
  // If state exists in our data, return it
  if (legalData[state]) {
    return legalData[state];
  }
  
  // Otherwise, return a generic version
  return {
    overview: 'You have specific rights during interactions with law enforcement. These include the right to remain silent, the right to refuse searches in many circumstances, and the right to an attorney if arrested.',
    rights: [
      {
        title: 'Right to Remain Silent',
        description: 'You have the right to remain silent and cannot be punished for refusing to answer questions. If you wish to remain silent, say so out loud.',
      },
      {
        title: 'Right to Refuse Searches',
        description: 'You have the right to refuse consent to a search of yourself, your car, or your home. However, if police have probable cause, a warrant, or certain emergency circumstances exist, they may conduct a search without your consent.',
      },
      {
        title: 'Right to an Attorney',
        description: 'If you are arrested, you have the right to a government-appointed attorney if you cannot afford one. You can say, "I want to speak to an attorney" and remain silent until you have consulted with one.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Stay calm and keep your hands visible',
        'State clearly if you wish to remain silent',
        'Ask if you are free to leave if not under arrest',
        'Ask for an attorney immediately if arrested',
        'Comply with lawful orders even if you plan to challenge them later',
      ],
      donts: [
        'Don\'t physically resist officers even if you believe they are violating your rights',
        'Don\'t provide false information or documents',
        'Don\'t consent to searches you don\'t want',
        'Don\'t make sudden movements or reach for anything without explaining first',
      ],
    },
    specialConsiderations: 'Laws vary by state. This is general information that may not be specific to your location.',
  };
};

/**
 * Get a list of all available states
 * @returns {Array<string>} - List of state names
 */
export const getAvailableStates = () => {
  return [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
};
