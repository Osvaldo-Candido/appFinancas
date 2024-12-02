import React, { useContext } from 'react';
import {
  Container,
  Logout,
  NewLink,
  NewText,
  Nome,
  TextLogout,
} from './styles';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <Nome>{user.nome && user.nome}</Nome>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registrar Gastos</NewText>
      </NewLink>

      <Logout onPress={signOut}>
        <TextLogout>Sair</TextLogout>
      </Logout>
    </Container>
  );
}
