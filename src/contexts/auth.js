import { createContext, useEffect, useState } from 'react';
import { database, auth } from '../services/firebase';
import { get, set, ref } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    async function getUserStorage() {
      const userStorage = await AsyncStorage.getItem('usuario');
      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
      setLoading(false);
    }

    getUserStorage();
  }, []);

  async function signInUser(email, password) {
    setLoadingAuth(true);
    if (!email || !password) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      const userSignin = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { uid } = userSignin.user;

      const userRef = ref(database, `usuarios/${uid}`);
      const snapshot = await get(userRef);

      let userDataFromDb = snapshot.exists() ? snapshot.val() : {};

      let userData = {
        uid,
        nome: userDataFromDb.nome || '',
        email: userDataFromDb.email || '',
        saldo: userDataFromDb.saldo || 0,
      };

      setUser(userData);
      await asyncStorage(userData);
      setLoadingAuth(false);
    } catch (error) {
      Alert.alert('Erro ao fazer login:', error.message);
      setLoadingAuth(false);
    }
  }

  async function signUpUser(nome, email, password) {
    setLoadingAuth(true);
    if (!nome || !email || !password) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      const userCreated = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { uid } = userCreated.user;

      let userData = {
        nome,
        email,
        saldo: 0,
      };

      await set(ref(database, `usuarios/${uid}`), userData);
      setUser({ uid, ...userData });
      await asyncStorage({ uid, ...userData });
      setLoadingAuth(false);
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    setLoadingAuth(true);
    try {
      await auth.signOut();
      setUser(null);
      AsyncStorage.removeItem('usuario');
      setLoadingAuth(false);
    } catch (error) {
      console.log(error.message);
      setLoadingAuth(false);
    }
  }

  async function asyncStorage(user) {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUpUser,
        signInUser,
        loading,
        signOut,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
