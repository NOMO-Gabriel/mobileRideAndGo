// src/hooks/useTranslation.js (mise à jour des traductions)
import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Translations
const translations = {
  fr: {
    welcome: 'Bienvenue sur notre application',
    theme: 'Thème',
    language: 'Langue',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    continueButton: 'Continuer',
    findRide: 'Trouver un trajet',
    offerRide: 'Proposer un trajet',
    profile: 'Profil',
    settings: 'Paramètres',
    home: 'Accueil',
    ride: 'Trajet',
    go: 'Partir',
    fareCalculator: 'Tarifs',
    search: 'Rechercher',
    dashboard: 'Tableau de bord',
    whereToGo: 'Où allez-vous ?',
    startingPoint: 'Point de départ',
    destination: 'Destination',
    searchRides: 'Rechercher des trajets',
    availableRides: 'Trajets disponibles',
    noRidesFound: 'Aucun trajet trouvé',
    estimatedFare: 'Tarif estimé',
    duration: 'Durée',
    distance: 'Distance',
    bookNow: 'Réserver maintenant',
    calculateFare: 'Calculer le tarif',
    todaysOffers: 'Offres du jour',
    popularDestinations: 'Destinations populaires',

    //newTranslations
     // Testimonials translations
    whatUsersSay: 'Ce que disent nos utilisateurs',
    testimonialsSubtitle: 'Découvrez les avis de nos utilisateurs satisfaits',
    
    // User roles
    roleStudent: 'Étudiante',
    roleBusinessman: 'Homme d\'affaires',
    roleTeacher: 'Enseignante',
    roleEngineer: 'Ingénieur',
    roleDoctor: 'Médecin',
    
    // Testimonials content
    testimonial1: 'Cette application a complètement changé ma façon de voyager. Interface intuitive et service impeccable !',
    testimonial2: 'Un gain de temps énorme pour mes déplacements professionnels. Je recommande vivement !',
    testimonial3: 'Parfait pour mes trajets quotidiens. L\'équipe est très réactive et professionnelle.',
    testimonial4: 'Une solution moderne et efficace. L\'application fonctionne parfaitement.',
    testimonial5: 'Service client exceptionnel et application très bien conçue. Bravo à l\'équipe !',
    
    // Team translations
    meetOurTeam: 'Rencontrez notre équipe',
    teamSubtitle: 'Des professionnels passionnés qui donnent vie à votre application',
    management: 'Direction',
    developers: 'Développeurs',
    manager: 'Manager',
    experience: 'd\'expérience',
    about: 'À propos',
    expertise: 'Expertise',
    contact: 'Contacter',
    
    // Team roles
    roleProjectManager: 'Chef de Projet',
    roleTechnicalDirector: 'Directrice Technique',
    roleFullStackDeveloper: 'Développeur Full Stack',
    roleFrontendDeveloper: 'Développeuse Frontend',
    roleBackendDeveloper: 'Développeur Backend',
    roleMobileDeveloper: 'Développeuse Mobile',
    roleDevOpsEngineer: 'Ingénieur DevOps',
    
    // Team expertise
    expertiseProjectManagement: 'Gestion de projet',
    expertiseTeamLeadership: 'Leadership d\'équipe',
    expertiseAgile: 'Méthodologies Agile',
    expertiseSystemArchitecture: 'Architecture système',
    
  },
  en: {
    welcome: 'Welcome to our application',
    theme: 'Theme',
    language: 'Language',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    continueButton: 'Continue',
    findRide: 'Find a ride',
    offerRide: 'Offer a ride',
    profile: 'Profile',
    settings: 'Settings',
    home: 'Home',
    ride: 'Ride',
    go: 'Go',
    fareCalculator: 'Fares',
    search: 'Search',
    dashboard: 'Dashboard',
    whereToGo: 'Where are you going?',
    startingPoint: 'Starting point',
    destination: 'Destination',
    searchRides: 'Search rides',
    availableRides: 'Available rides',
    noRidesFound: 'No rides found',
    estimatedFare: 'Estimated fare',
    duration: 'Duration',
    distance: 'Distance',
    bookNow: 'Book now',
    calculateFare: 'Calculate fare',
    todaysOffers: 'Today\'s offers',
    popularDestinations: 'Popular destinations',
  }
};

// Le reste du code demeure inchangé...
export const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState('fr');

  // Charger la langue au démarrage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLocale = await AsyncStorage.getItem('locale');
        if (savedLocale) {
          setLocale(savedLocale);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };
    
    loadLanguage();
  }, []);

  // Changer de langue
  const changeLocale = async (newLocale) => {
    try {
      await AsyncStorage.setItem('locale', newLocale);
      setLocale(newLocale);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Fonction de traduction
  const t = (key) => {
    return translations[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook personnalisé pour l'internationalisation
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

