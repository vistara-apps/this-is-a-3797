import OpenAI from 'openai';

// Initialize OpenAI client
// In a real app, you would use an environment variable for the API key
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your API key or use environment variable
  dangerouslyAllowBrowser: true, // Only for demo purposes, in production use a backend proxy
});

/**
 * Generate a script for a specific scenario and language
 * @param {string} scenario - Scenario description
 * @param {string} language - Language code ('en' or 'es')
 * @param {string} state - State name for location-specific content
 * @returns {Promise<string>} - Generated script
 */
export const generateScript = async (scenario, language = 'en', state = null) => {
  try {
    const stateContext = state ? `in the state of ${state}` : '';
    const languagePrompt = language === 'es' ? 'in Spanish' : 'in English';
    
    const prompt = `
      Generate a concise, helpful script for what to say during a police interaction 
      for the following scenario: "${scenario}" ${stateContext}.
      
      The script should:
      1. Be written ${languagePrompt}
      2. Be respectful but clear about legal rights
      3. Help de-escalate the situation
      4. Avoid self-incrimination
      5. Be around 3-5 sentences
      
      Return only the script text without any additional formatting or explanation.
    `;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a legal rights assistant helping people navigate interactions with law enforcement.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 250,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI script generation error:', error);
    throw new Error('Failed to generate script. Please try again later.');
  }
};

/**
 * Generate a shareable card with rights information
 * @param {string} state - State name
 * @param {Object} location - Location data
 * @param {string} language - Language code ('en' or 'es')
 * @returns {Promise<Object>} - Card data
 */
export const generateCard = async (state, location, language = 'en') => {
  try {
    const languagePrompt = language === 'es' ? 'in Spanish' : 'in English';
    
    const prompt = `
      Generate a concise know-your-rights summary for the state of ${state} ${languagePrompt}.
      
      Include:
      1. Brief overview of key rights during police interactions
      2. 3-4 specific rights relevant to ${state} law
      3. 1-2 important dos and don'ts
      
      Format the response as JSON with the following structure:
      {
        "title": "Know Your Rights in ${state}",
        "summary": "Brief overview paragraph",
        "rights": ["Right 1", "Right 2", "Right 3"],
        "dosAndDonts": {
          "dos": ["Do 1", "Do 2"],
          "donts": ["Don't 1", "Don't 2"]
        }
      }
    `;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a legal rights assistant helping people navigate interactions with law enforcement.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });
    
    const cardData = JSON.parse(response.choices[0].message.content);
    
    // Add location and timestamp
    return {
      ...cardData,
      state,
      location: location ? {
        latitude: location.latitude,
        longitude: location.longitude,
      } : null,
      timestamp: new Date().toISOString(),
      language,
    };
  } catch (error) {
    console.error('OpenAI card generation error:', error);
    throw new Error('Failed to generate rights card. Please try again later.');
  }
};

/**
 * Generate state-specific rights information
 * @param {string} state - State name
 * @param {string} language - Language code ('en' or 'es')
 * @returns {Promise<Object>} - Rights data
 */
export const generateRightsInfo = async (state, language = 'en') => {
  try {
    const languagePrompt = language === 'es' ? 'in Spanish' : 'in English';
    
    const prompt = `
      Generate comprehensive know-your-rights information for the state of ${state} ${languagePrompt}.
      
      Include:
      1. Detailed overview of key rights during police interactions
      2. Specific rights relevant to ${state} law
      3. Important dos and don'ts
      4. Any special considerations for ${state}
      
      Format the response as JSON with the following structure:
      {
        "overview": "Detailed overview paragraph",
        "rights": [
          {"title": "Right 1 Title", "description": "Detailed explanation of right 1"},
          {"title": "Right 2 Title", "description": "Detailed explanation of right 2"},
          {"title": "Right 3 Title", "description": "Detailed explanation of right 3"}
        ],
        "dosAndDonts": {
          "dos": ["Detailed do 1", "Detailed do 2", "Detailed do 3"],
          "donts": ["Detailed don't 1", "Detailed don't 2", "Detailed don't 3"]
        },
        "specialConsiderations": "Any special considerations for this state"
      }
    `;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a legal rights assistant helping people navigate interactions with law enforcement.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });
    
    const rightsData = JSON.parse(response.choices[0].message.content);
    
    // Add state and language
    return {
      ...rightsData,
      state,
      language,
    };
  } catch (error) {
    console.error('OpenAI rights info generation error:', error);
    throw new Error('Failed to generate rights information. Please try again later.');
  }
};
