// components/features/VideoTutorials.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const { width: screenWidth } = Dimensions.get('window');

type TutorialVideo = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: keyof typeof Feather.glyphMap;
  videoUrl: string;
  gradient: string[];
  duration: string;
};

const VideoTutorials = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const tutorials: TutorialVideo[] = [
    {
      id: 'search',
      titleKey: 'searchTutorialTitle',
      descriptionKey: 'searchTutorialDesc',
      icon: 'search',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      gradient: ['#667eea', '#764ba2'],
      duration: '2:30',
    },
    {
      id: 'ride',
      titleKey: 'rideTutorialTitle',
      descriptionKey: 'rideTutorialDesc',
      icon: 'map-pin',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      gradient: ['#f093fb', '#f5576c'],
      duration: '3:15',
    },
    {
      id: 'go',
      titleKey: 'goTutorialTitle',
      descriptionKey: 'goTutorialDesc',
      icon: 'navigation',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      gradient: ['#4facfe', '#00f2fe'],
      duration: '2:45',
    },
  ];

  // Extended translations for the component
  const getTranslations = () => ({
    searchTutorialTitle: t('locale') === 'fr' ? 'Comment Rechercher' : 'How to Search',
    searchTutorialDesc: t('locale') === 'fr' 
      ? 'Découvrez comment trouver facilement des trajets qui correspondent à vos besoins'
      : 'Learn how to easily find rides that match your needs',
    rideTutorialTitle: t('locale') === 'fr' ? 'Réserver un Trajet' : 'Book a Ride',
    rideTutorialDesc: t('locale') === 'fr'
      ? 'Apprenez à réserver et gérer vos trajets en quelques étapes simples'
      : 'Learn how to book and manage your rides in a few simple steps',
    goTutorialTitle: t('locale') === 'fr' ? 'Proposer un Trajet' : 'Offer a Ride',
    goTutorialDesc: t('locale') === 'fr'
      ? 'Découvrez comment proposer vos trajets et gagner de l\'argent'
      : 'Discover how to offer your rides and earn money',
    howItWorks: t('locale') === 'fr' ? 'Comment ça marche' : 'How it works',
    watchTutorial: t('locale') === 'fr' ? 'Regarder le tutoriel' : 'Watch tutorial',
    videoTutorials: t('locale') === 'fr' ? 'Tutoriels Vidéo' : 'Video Tutorials',
    learnBasics: t('locale') === 'fr' 
      ? 'Apprenez les bases en quelques minutes'
      : 'Learn the basics in just a few minutes',
  });

  const translations = getTranslations();

  const playVideo = (videoId: string) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  const VideoCard = ({ tutorial, index }: { tutorial: TutorialVideo; index: number }) => {
    const isActive = activeVideo === tutorial.id;
    const cardScale = useRef(new Animated.Value(1)).current;

    const animatePress = () => {
      Animated.sequence([
        Animated.timing(cardScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    };

    return (
      <Animated.View
        style={[
          tw`mx-3 rounded-3xl overflow-hidden shadow-lg`,
          { 
            width: screenWidth - 60,
            transform: [{ scale: cardScale }]
          }
        ]}
      >
        <LinearGradient
          colors={tutorial.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`relative`}
        >
          {/* Video Container */}
          <View style={tw`h-64 bg-black bg-opacity-20 relative justify-center items-center`}>
            {isActive ? (
              <Video
                source={{ uri: tutorial.videoUrl }}
                style={tw`w-full h-full`}
                useNativeControls
                resizeMode="cover"
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                  if (status.isLoaded && status.didJustFinish) {
                    setActiveVideo(null);
                  }
                }}
              />
            ) : (
              <>
                {/* Play Button Overlay */}
                <TouchableOpacity
                  style={tw`w-20 h-20 bg-white bg-opacity-30 rounded-full justify-center items-center backdrop-blur-sm`}
                  onPress={() => {
                    animatePress();
                    playVideo(tutorial.id);
                  }}
                  activeOpacity={0.8}
                >
                  <Feather name="play" size={32} color="white" style={tw`ml-1`} />
                </TouchableOpacity>

                {/* Duration Badge */}
                <View style={tw`absolute top-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-full`}>
                  <Text style={tw`text-white text-sm font-medium`}>
                    {tutorial.duration}
                  </Text>
                </View>

                {/* Feature Icon */}
                <View style={tw`absolute top-4 left-4 w-12 h-12 bg-white bg-opacity-20 rounded-full justify-center items-center`}>
                  <Feather name={tutorial.icon} size={24} color="white" />
                </View>
              </>
            )}
          </View>

          {/* Content Section */}
          <View style={tw`p-6 bg-white bg-opacity-10 backdrop-blur-sm`}>
            <Text style={tw`text-white text-xl font-bold mb-2`}>
              {translations[tutorial.titleKey as keyof typeof translations]}
            </Text>
            <Text style={tw`text-white text-opacity-90 text-base leading-6 mb-4`}>
              {translations[tutorial.descriptionKey as keyof typeof translations]}
            </Text>
            
            <TouchableOpacity
              style={tw`flex-row items-center justify-center bg-white bg-opacity-20 rounded-xl py-3 px-6 border border-white border-opacity-30`}
              onPress={() => {
                animatePress();
                playVideo(tutorial.id);
              }}
              activeOpacity={0.8}
            >
              <Feather name="play-circle" size={20} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white font-semibold text-base`}>
                {translations.watchTutorial}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const Pagination = () => {
    return (
      <View style={tw`flex-row justify-center items-center mt-6 mb-4`}>
        {tutorials.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                tw.style(
                  'w-3 h-3 rounded-full mx-1',
                  theme.name === 'dark' ? 'bg-white' : 'bg-gray-800'
                ),
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={tw.style(
      'py-8',
      theme.name === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Header Section */}
      <View style={tw`px-6 mb-8`}>
        <View style={tw`flex-row items-center mb-3`}>
          <View style={tw.style(
            'w-12 h-12 rounded-2xl justify-center items-center mr-4',
            theme.name === 'dark' ? 'bg-blue-500' : 'bg-blue-100'
          )}>
            <Feather 
              name="video" 
              size={24} 
              color={theme.name === 'dark' ? 'white' : '#3B82F6'} 
            />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw.style(
              'text-2xl font-bold',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {translations.videoTutorials}
            </Text>
            <Text style={tw.style(
              'text-base mt-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
            )}>
              {translations.learnBasics}
            </Text>
          </View>
        </View>
      </View>

      {/* Video Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-3`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const slide = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentSlide(slide);
        }}
      >
        {tutorials.map((tutorial, index) => (
          <VideoCard key={tutorial.id} tutorial={tutorial} index={index} />
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <Pagination />

      {/* How it Works Section */}
      <View style={tw`px-6 mt-8`}>
        <View style={tw.style(
          'rounded-3xl p-6 border',
          theme.name === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        )}>
          <View style={tw`flex-row items-center mb-4`}>
            <Feather 
              name="help-circle" 
              size={24} 
              color={theme.name === 'dark' ? '#FF8C00' : '#FF8C00'} 
            />
            <Text style={tw.style(
              'text-lg font-bold ml-3',
              theme.name === 'dark' ? 'text-white' : 'text-gray-800'
            )}>
              {translations.howItWorks}
            </Text>
          </View>
          
          <View style={tw`space-y-3`}>
            {tutorials.map((tutorial, index) => (
              <View key={tutorial.id} style={tw`flex-row items-center`}>
                <View style={tw.style(
                  'w-8 h-8 rounded-full justify-center items-center mr-4',
                  'bg-primary'
                )}>
                  <Text style={tw`text-white font-bold text-sm`}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={tw.style(
                  'flex-1 text-base',
                  theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
                )}>
                  {translations[tutorial.titleKey as keyof typeof translations]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoTutorials;