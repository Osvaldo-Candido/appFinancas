import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import New from '../pages/New';

const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#fff', // Cor do texto ativo
        drawerInactiveTintColor: '#ddd', // Cor do texto inativo
        drawerActiveBackgroundColor: '#00b94a', // Fundo do item ativo
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#171717',
        },
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
      <AppDrawer.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <AppDrawer.Screen
        options={{ headerShown: false }}
        name="Perfil"
        component={Profile}
      />
      <AppDrawer.Screen
        options={{ headerShown: false }}
        name="Registrar"
        component={New}
      />
    </AppDrawer.Navigator>
  );
}
