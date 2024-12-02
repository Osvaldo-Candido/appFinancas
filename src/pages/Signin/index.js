import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Background,
  Container,
  InputArea,
  Input,
  SubmitButton,
  SubmitText,
  Logo,
  Link,
  LinkText,
} from './styles';
import { AuthContext } from '../../contexts/auth';
import { ActivityIndicator } from 'react-native';

function Signin() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signInUser, loadingAuth } = useContext(AuthContext);

  function handlerSignIn() {
    signInUser(email, password);
  }

  return (
    <Background>
      <Container>
        {/* LOGO */}

        <Logo source={require('../../assets/Logo.png')} />

        {/* Input Email */}
        <InputArea>
          <Input
            placeholder="Insira o email"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </InputArea>

        {/* Input Password */}
        <InputArea>
          <Input
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </InputArea>

        {/* Button Submit */}
        <SubmitButton onPress={handlerSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Enviar</SubmitText>
          )}
        </SubmitButton>

        {/* Link */}
        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}

export default Signin;
