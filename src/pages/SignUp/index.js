import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { ActivityIndicator } from 'react-native';
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

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUpUser, loadingAuth } = useContext(AuthContext);

  function handleSignUp() {
    signUpUser(nome, email, password);
  }

  return (
    <Background>
      <Container>
        {/* Input Nome */}
        <InputArea>
          <Input
            placeholder="Insira o nome"
            autoCapitalize="none"
            autoCorrect={false}
            value={nome}
            onChangeText={(value) => setNome(value)}
          />
        </InputArea>
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
        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Enviar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
