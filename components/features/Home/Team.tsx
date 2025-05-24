// components/sections/Team.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../hooks/useTheme';
import tw from '../../../utils/tailwind';

const Team = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedMember, setSelectedMember] = useState(null);

  // Team data
  const managers = [
    {
      id: 1,
      name: 'Alexandre Moreau',
      role: 'roleProjectManager',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&fit=crop&crop=face',
      bio: 'bioAlexandre',
      expertise: ['expertiseProjectManagement', 'expertiseTeamLeadership', 'expertiseAgile'],
      experience: '8 ans',
      linkedin: 'https://linkedin.com',
      email: 'alexandre@ridego.com'
    },
    {
      id: 2,
      name: 'Isabelle Rousseau',
      role: 'roleTechnicalDirector',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop&crop=face',
      bio: 'bioIsabelle',
      expertise: ['expertiseSystemArchitecture', 'expertiseCloudTech', 'expertiseDevOps'],
      experience: '12 ans',
      linkedin: 'https://linkedin.com',
      email: 'isabelle@ridego.com'
    }
  ];

  const developers = [
    {
      id: 3,
      name: 'Nathan Dubois',
      role: 'roleFullStackDeveloper',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop&crop=face',
      bio: 'bioNathan',
      expertise: ['expertiseReactNative', 'expertiseNodeJS', 'expertiseAWS'],
      experience: '5 ans',
      linkedin: 'https://linkedin.com',
      email: 'nathan@ridego.com'
    },
    {
      id: 4,
      name: 'Camille Martin',
      role: 'roleFrontendDeveloper',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&h=200&fit=crop&crop=face',
      bio: 'bioCamille',
      expertise: ['expertiseUIUX', 'expertiseReact', 'expertiseDesignSystems'],
      experience: '4 ans',
      linkedin: 'https://linkedin.com',
      email: 'camille@ridego.com'
    },
    {
      id: 5,
      name: 'Julien Leroy',
      role: 'roleBackendDeveloper',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop&crop=face',
      bio: 'bioJulien',
      expertise: ['expertisePython', 'expertiseAPI', 'expertiseDatabase'],
      experience: '6 ans',
      linkedin: 'https://linkedin.com',
      email: 'julien@ridego.com'
    },
    {
      id: 6,
      name: 'Léa Garnier',
      role: 'roleMobileDeveloper',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop&crop=face',
      bio: 'bioLea',
      expertise: ['expertiseFlutter', 'expertiseReactNative', 'expertiseiOS'],
      experience: '3 ans',
      linkedin: 'https://linkedin.com',
      email: 'lea@ridego.com'
    },
    {
      id: 7,
      name: 'Maxime Petit',
      role: 'roleDevOpsEngineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop&crop=face',
      bio: 'bioMaxime',
      expertise: ['expertiseDocker', 'expertiseKubernetes', 'expertiseCI_CD'],
      experience: '7 ans',
      linkedin: 'https://linkedin.com',
      email: 'maxime@ridego.com'
    }
  ];

  const TeamMemberCard = ({ member, isManager = false }) => (
    <TouchableOpacity
      style={tw.style(
        'rounded-3xl p-5 mb-4 shadow-lg transition-all duration-300',
        theme.name === 'dark' ? 'bg-gray-800' : 'bg-white',
        isManager ? 'border-2 border-primary border-opacity-30' : ''
      )}
      onPress={() => setSelectedMember(member)}
      activeOpacity={0.9}
    >
      {/* Manager badge */}
      {isManager && (
        <View style={tw.style(
          'absolute -top-2 -right-2 bg-primary rounded-full px-3 py-1 z-10'
        )}>
          <Text style={tw`text-white text-xs font-bold`}>
            {t('manager')}
          </Text>
        </View>
      )}

      <View style={tw`flex-row items-center`}>
        {/* Profile image with gradient border */}
        <View style={tw.style(
          'relative mr-4',
          isManager ? 'p-1 rounded-2xl bg-gradient-to-br from-primary to-orange-600' : ''
        )}>
          <Image
            source={{ uri: member.image }}
            style={tw.style(
              isManager ? 'w-20 h-20 rounded-2xl' : 'w-16 h-16 rounded-xl',
              theme.name === 'dark' ? 'border border-gray-700' : 'border border-gray-100'
            )}
          />
          {/* Online indicator */}
          <View style={tw.style(
            'absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2',
            theme.name === 'dark' ? 'border-gray-800' : 'border-white'
          )} />
        </View>

        {/* Member info */}
        <View style={tw`flex-1`}>
          <Text style={tw.style(
            isManager ? 'text-lg font-bold mb-1' : 'text-base font-bold mb-1',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {member.name}
          </Text>
          
          <Text style={tw.style(
            'text-sm mb-2',
            'text-primary font-medium'
          )}>
            {t(member.role)}
          </Text>

          <View style={tw`flex-row items-center`}>
            <Feather 
              name="briefcase" 
              size={12} 
              color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
            />
            <Text style={tw.style(
              'text-xs ml-1',
              theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}>
              {member.experience} {t('experience')}
            </Text>
          </View>
        </View>

        {/* Arrow icon */}
        <Feather 
          name="chevron-right" 
          size={20} 
          color={theme.name === 'dark' ? '#9CA3AF' : '#6B7280'} 
        />
      </View>

      {/* Expertise tags preview */}
      <View style={tw`flex-row flex-wrap mt-3 ml-20`}>
        {member.expertise.slice(0, 2).map((skill, index) => (
          <View
            key={index}
            style={tw.style(
              'rounded-full px-2 py-1 mr-2 mb-1',
              theme.name === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            )}
          >
            <Text style={tw.style(
              'text-xs',
              theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}>
              {t(skill)}
            </Text>
          </View>
        ))}
        {member.expertise.length > 2 && (
          <View style={tw.style(
            'rounded-full px-2 py-1',
            'bg-primary bg-opacity-20'
          )}>
            <Text style={tw`text-xs text-primary font-medium`}>
              +{member.expertise.length - 2}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const MemberDetailModal = () => (
    <Modal
      visible={selectedMember !== null}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setSelectedMember(null)}
    >
      <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
        <Pressable 
          style={tw`flex-1`} 
          onPress={() => setSelectedMember(null)} 
        />
        
        <View style={tw.style(
          'rounded-t-3xl p-6 max-h-4/5',
          theme.name === 'dark' ? 'bg-gray-900' : 'bg-white'
        )}>
          {selectedMember && (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={tw`flex-row justify-between items-start mb-6`}>
                <View style={tw`flex-row items-center flex-1`}>
                  <Image
                    source={{ uri: selectedMember.image }}
                    style={tw`w-20 h-20 rounded-2xl mr-4`}
                  />
                  <View style={tw`flex-1`}>
                    <Text style={tw.style(
                      'text-xl font-bold mb-1',
                      theme.name === 'dark' ? 'text-white' : 'text-gray-800'
                    )}>
                      {selectedMember.name}
                    </Text>
                    <Text style={tw`text-base text-primary font-medium mb-2`}>
                      {t(selectedMember.role)}
                    </Text>
                    <Text style={tw.style(
                      'text-sm',
                      theme.name === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    )}>
                      {selectedMember.experience} {t('experience')}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={tw.style(
                    'p-2 rounded-full',
                    theme.name === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  )}
                  onPress={() => setSelectedMember(null)}
                >
                  <Feather 
                    name="x" 
                    size={20} 
                    color={theme.name === 'dark' ? '#FFFFFF' : '#1B263B'} 
                  />
                </TouchableOpacity>
              </View>

              {/* Bio */}
              <View style={tw`mb-6`}>
                <Text style={tw.style(
                  'text-lg font-bold mb-3',
                  theme.name === 'dark' ? 'text-white' : 'text-gray-800'
                )}>
                  {t('about')}
                </Text>
                <Text style={tw.style(
                  'text-base leading-relaxed',
                  theme.name === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}>
                  {t(selectedMember.bio)}
                </Text>
              </View>

              {/* Expertise */}
              <View style={tw`mb-6`}>
                <Text style={tw.style(
                  'text-lg font-bold mb-3',
                  theme.name === 'dark' ? 'text-white' : 'text-gray-800'
                )}>
                  {t('expertise')}
                </Text>
                <View style={tw`flex-row flex-wrap`}>
                  {selectedMember.expertise.map((skill, index) => (
                    <View
                      key={index}
                      style={tw.style(
                        'rounded-xl px-4 py-2 mr-2 mb-2 border',
                        theme.name === 'dark' 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-gray-50 border-gray-200'
                      )}
                    >
                      <Text style={tw.style(
                        'text-sm font-medium',
                        theme.name === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      )}>
                        {t(skill)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Contact */}
              <View style={tw`flex-row space-x-4`}>
                <TouchableOpacity
                  style={tw`flex-1 bg-primary rounded-xl py-3 items-center flex-row justify-center`}
                >
                  <Feather name="mail" size={18} color="#FFFFFF" />
                  <Text style={tw`text-white font-bold ml-2`}>
                    {t('contact')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw.style(
                    'flex-1 rounded-xl py-3 items-center flex-row justify-center border-2 border-primary'
                  )}
                >
                  <Feather name="linkedin" size={18} color="#FF8C00" />
                  <Text style={tw`text-primary font-bold ml-2`}>
                    LinkedIn
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={tw`py-8`}>
      {/* Header */}
      <View style={tw`px-5 mb-8`}>
        <View style={tw`flex-row items-center mb-3`}>
          <View style={tw.style(
            'w-1 h-8 rounded-full mr-3',
            'bg-primary'
          )} />
          <Text style={tw.style(
            'text-2xl font-bold',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('meetOurTeam')}
          </Text>
        </View>
        <Text style={tw.style(
          'text-base ml-4',
          theme.name === 'dark' ? 'text-gray-400' : 'text-gray-600'
        )}>
          {t('teamSubtitle')}
        </Text>
      </View>

      <ScrollView style={tw`px-5`} showsVerticalScrollIndicator={false}>
        {/* Managers Section */}
        <View style={tw`mb-8`}>
          <Text style={tw.style(
            'text-lg font-bold mb-4',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('management')}
          </Text>
          {managers.map((manager) => (
            <TeamMemberCard key={manager.id} member={manager} isManager={true} />
          ))}
        </View>

        {/* Developers Section */}
        <View>
          <Text style={tw.style(
            'text-lg font-bold mb-4',
            theme.name === 'dark' ? 'text-white' : 'text-gray-800'
          )}>
            {t('developers')}
          </Text>
          {developers.map((developer) => (
            <TeamMemberCard key={developer.id} member={developer} />
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <MemberDetailModal />

      {/* Background decoration */}
      <View style={tw.style(
        'absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-5',
        'bg-primary'
      )} />
      <View style={tw.style(
        'absolute -bottom-16 -left-10 w-32 h-32 rounded-full opacity-5',
        'bg-primary'
      )} />
    </View>
  );
};

export default Team;