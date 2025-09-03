/**
 * Sample script scenarios for different interaction types
 * In a real app, this would be fetched from a backend API or database
 */
export const scriptScenarios = [
  {
    id: 'traffic_stop',
    title: 'Traffic Stop',
    description: 'What to say when pulled over by police while driving',
    icon: 'Car',
    premium: false,
  },
  {
    id: 'pedestrian_stop',
    title: 'Pedestrian Stop',
    description: 'What to say when stopped by police while walking',
    icon: 'FootPrints',
    premium: false,
  },
  {
    id: 'home_visit',
    title: 'Home Visit',
    description: 'What to say when police come to your home',
    icon: 'Home',
    premium: false,
  },
  {
    id: 'search_request',
    title: 'Search Request',
    description: 'What to say when police ask to search you, your car, or your home',
    icon: 'Search',
    premium: false,
  },
  {
    id: 'arrest',
    title: 'Arrest',
    description: 'What to say if you are being arrested',
    icon: 'Handcuffs',
    premium: false,
  },
  {
    id: 'immigration',
    title: 'Immigration Questions',
    description: 'What to say when asked about immigration status',
    icon: 'Globe',
    premium: true,
  },
  {
    id: 'witness',
    title: 'Witness Interview',
    description: 'What to say when interviewed as a witness',
    icon: 'Eye',
    premium: true,
  },
  {
    id: 'protest',
    title: 'Protest or Demonstration',
    description: 'What to say when interacting with police at a protest',
    icon: 'Users',
    premium: true,
  },
  {
    id: 'recording',
    title: 'Recording Police',
    description: 'What to say when recording police activity',
    icon: 'Camera',
    premium: true,
  },
  {
    id: 'passenger',
    title: 'Vehicle Passenger',
    description: 'What to say when you are a passenger in a stopped vehicle',
    icon: 'UserPlus',
    premium: true,
  },
];

/**
 * Get a script scenario by ID
 * @param {string} id - Scenario ID
 * @returns {Object|null} - Scenario data
 */
export const getScenarioById = (id) => {
  return scriptScenarios.find(scenario => scenario.id === id) || null;
};

/**
 * Get all free scenarios
 * @returns {Array<Object>} - Free scenarios
 */
export const getFreeScenarios = () => {
  return scriptScenarios.filter(scenario => !scenario.premium);
};

/**
 * Get all premium scenarios
 * @returns {Array<Object>} - Premium scenarios
 */
export const getPremiumScenarios = () => {
  return scriptScenarios.filter(scenario => scenario.premium);
};

/**
 * Sample pre-written scripts for common scenarios
 * In a real app, these would be generated dynamically using OpenAI
 */
export const sampleScripts = {
  traffic_stop: {
    en: "I'm providing my license and registration as required by law. I don't consent to any searches. Am I free to go, or am I being detained? If I'm being detained, I'd like to know the reason. I'm exercising my right to remain silent and would like to speak with an attorney if I'm under arrest.",
    es: "Estoy proporcionando mi licencia y registro como lo exige la ley. No doy mi consentimiento para ningún registro. ¿Soy libre de irme o estoy siendo detenido? Si estoy siendo detenido, me gustaría saber la razón. Estoy ejerciendo mi derecho a guardar silencio y me gustaría hablar con un abogado si estoy bajo arresto.",
  },
  pedestrian_stop: {
    en: "I respectfully decline to answer questions. I don't consent to any searches of my person or belongings. Am I free to go, or am I being detained? If I'm being detained, I'd like to know the specific reason. I'm exercising my right to remain silent and would like to speak with an attorney if I'm under arrest.",
    es: "Respetuosamente me niego a responder preguntas. No doy mi consentimiento para ningún registro de mi persona o pertenencias. ¿Soy libre de irme o estoy siendo detenido? Si estoy siendo detenido, me gustaría saber la razón específica. Estoy ejerciendo mi derecho a guardar silencio y me gustaría hablar con un abogado si estoy bajo arresto.",
  },
  home_visit: {
    en: "I do not consent to you entering my home without a warrant. If you have a warrant, please slip it under the door or hold it up to the window so I can verify it. I'm exercising my right to remain silent and would like to speak with an attorney before answering any questions.",
    es: "No doy mi consentimiento para que entre a mi hogar sin una orden judicial. Si tiene una orden, por favor pásela por debajo de la puerta o sosténgala en la ventana para que pueda verificarla. Estoy ejerciendo mi derecho a guardar silencio y me gustaría hablar con un abogado antes de responder cualquier pregunta.",
  },
  search_request: {
    en: "I do not consent to any searches. I am exercising my constitutional right to refuse searches. If you have a warrant, I'd like to see it. Am I free to go, or am I being detained? If I'm being detained, I'd like to know the specific reason.",
    es: "No doy mi consentimiento para ningún registro. Estoy ejerciendo mi derecho constitucional a rechazar registros. Si tiene una orden judicial, me gustaría verla. ¿Soy libre de irme o estoy siendo detenido? Si estoy siendo detenido, me gustaría saber la razón específica.",
  },
  arrest: {
    en: "I am exercising my right to remain silent. I want to speak to an attorney immediately. I do not consent to any searches. I will not resist, but I do not waive any of my constitutional rights.",
    es: "Estoy ejerciendo mi derecho a guardar silencio. Quiero hablar con un abogado inmediatamente. No doy mi consentimiento para ningún registro. No me resistiré, pero no renuncio a ninguno de mis derechos constitucionales.",
  },
};
