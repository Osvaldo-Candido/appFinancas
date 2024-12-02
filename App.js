import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { StatusBar } from 'react-native';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
