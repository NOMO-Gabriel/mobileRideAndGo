// components/sections/Testimonials.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_MARGIN = 15;

const Testimonials = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Testimonials data with translations
  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'roleStudent',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'testimonial1'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      role: 'roleBusinessman',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'testimonial2'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      role: 'roleTeacher',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'testimonial3'
    },
    {
      id: 4,
      name: 'Lucas Bernard',
      role: 'roleEngineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment: 'testimonial4'
    },
    {
      id: 5,
      name: 'Emma Petit',
      role: 'roleDoctor',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'testimonial5'
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < testimonials.length - 1) {
        const nextIndex = currentIndex + 1;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (CARD_WIDTH + CARD_MARGIN),
          animated: true
        });
      } else {
        scrollViewRef.current?.scrollTo({
          x: 0,
          animated: true
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN));
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < rating;
      return (
        <Feather
          key={index}
          name="star"
          size={16}
          color={isFilled ? '#FF8C00' : theme.name === 'dark' ? '#374151' : '#E5E7EB'}
          fill={isFilled ? '#FF8C00' : 'transparent'}
        />
      );
    });
  };

  const TestimonialCard = ({ testimonial }) => (
    <View
      style={[
        tw.style(
          'rounded-3xl p-6 mx-2 shadow-lg',
          theme.name === 'dark' ? 'bg-gray-800' : 'bg-white'
        ),
        { width: CARD_WIDTH }
      ]}
    >
      {/* Quote icon */}
      <View style={tw.style(
        'absolute top-4 right-4 w-8 h-8 rounded-full items-center justify-center',
        'bg-primary bg-opacity-10'
      )}>
        <Feather name="quote" size={16} color="#FF8C00" />
      </View>

      {/* User info */}
      <View style={tw`flex-row items-center mb-4`}>
        <Image
          source={{ uri: testimonial.image }}
          style={tw.style(
            'w-16 h-16 rounded-2xl mr-4',
            theme.name === 'dark' ? 'border-2 border-gray-700' : 'border-2 border-gray-100'
          )}
        />
        <View style={tw`flex-1`}>
          <Text style={tw.style(
            'text-lg font-bold mb-1',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {testimonial.name}
          </Text>
          <Text style={tw.style(
            'text-sm mb-2',
            theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
          )}>
            {t(testimonial.role)}
          </Text>
          <View style={tw`flex-row`}>
            {renderStars(testimonial.rating)}
          </View>
        </View>
      </View>

      {/* Comment */}
      <Text style={tw.style(
        'text-base leading-relaxed',
        theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
      )}>
        "{t(testimonial.comment)}"
      </Text>

      {/* Decorative element */}
      <View style={tw.style(
        'absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl',
        'bg-gradient-to-r from-primary to-orange-600'
      )} />
    </View>
  );

  return (
    <View style={tw`py-8`}>
      {/* Header */}
      <View style={tw`px-5 mb-6`}>
        <View style={tw`flex-row items-center mb-3`}>
          <View style={tw.style(
            'w-1 h-8 rounded-full mr-3',
            'bg-primary'
          )} />
          <Text style={tw.style(
            'text-2xl font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('whatUsersSay')}
          </Text>
        </View>
        <Text style={tw.style(
          'text-base ml-4',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
        )}>
          {t('testimonialsSubtitle')}
        </Text>
      </View>

      {/* Testimonials ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        decelerationRate="fast"
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={tw`flex-row justify-center mt-6 px-5`}>
        {testimonials.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={tw.style(
              'w-2 h-2 rounded-full mx-1 transition-all duration-300',
              index === currentIndex ? 'bg-primary w-6' : theme.name === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
            )}
            onPress={() => {
              scrollViewRef.current?.scrollTo({
                x: index * (CARD_WIDTH + CARD_MARGIN),
                animated: true
              });
            }}
          />
        ))}
      </View>

      {/* Background decoration */}
      <View style={tw.style(
        'absolute -top-4 right-0 w-32 h-32 rounded-full opacity-5',
        'bg-primary'
      )} />
      <View style={tw.style(
        'absolute -bottom-8 left-0 w-24 h-24 rounded-full opacity-5',
        'bg-primary'
      )} />
    </View>
  );
};

export default Testimonials;