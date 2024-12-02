import { useContext } from 'react';
import { auth, database } from '../../services/firebase';
import { set, ref, child, push, update, get } from 'firebase/database';
import { AuthContext } from '../../contexts/auth';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import { useState } from 'react';
import PickerComponent from '../../components/PickerComponent/index.android';
import firebase from 'firebase/compat/app';
import { useNavigation } from '@react-navigation/native';

export default function New() {
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState('despesa');

  const navigation = useNavigation();

  const { user } = useContext(AuthContext);

  async function handleDispesa() {
    if (isNaN(parseFloat(valor)) || tipo === null) {
      Alert.alert('Preencha os campos correctamente');
    }

    Alert.alert('Confirmando os dados', `tipo ${tipo}, Valor: ${valor}`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Continuar',
        onPress: () => handleAdd(),
      },
    ]);
  }

  async function handleAdd() {
    try {
      const uid = user.uid;

      if (!uid) {
        throw new Error('Usuário não autenticado!');
      }

      // Referência correta para o histórico do usuário
      const historicoRef = ref(database, `historico/${uid}`);
      const keyRef = push(historicoRef);
      const key = keyRef.key;

      let historico = {
        valor: valor,
        tipo: tipo,
        data: new Date().toISOString().split('T')[0],
      };

      // Inserir diretamente na referência gerada
      await set(keyRef, historico);

      // Referência para o usuário
      const userRef = ref(database, `usuarios/${uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error('Usuário não encontrado.');
      }

      let saldo = parseFloat(snapshot.val().saldo) || 0;
      let valorNumerico = parseFloat(valor);
      tipo === 'despesa' ? (saldo -= valorNumerico) : (saldo += valorNumerico);

      // Atualizando o saldo
      await update(userRef, { saldo });

      // Finalizar ação
      Keyboard.dismiss();
      setValor('');
      navigation.navigate('Home');

      console.log('Dados adicionados e saldo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar dados:', error.message);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder="Insira o valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />
          <PickerComponent onChange={setTipo} tipo={tipo} />
          <SubmitButton onPress={handleDispesa}>
            <SubmitText>Movimentar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
