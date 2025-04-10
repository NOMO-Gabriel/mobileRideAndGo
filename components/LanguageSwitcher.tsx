import React from 'react';
import { Button } from 'react-native';
import i18next from '@/i18next';

export const LanguageSwitcher = () =>
    (
        <>
            <Button title="English" onPress={() => i18next.changeLanguage('en')}/>
            <Button title="Français" onPress={() => i18next.changeLanguage('fr')}/>
        </>
    );