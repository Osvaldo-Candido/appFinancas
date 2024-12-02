import React, { useContext, useEffect, useState } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { AuthContext } from '../../contexts/auth';
import {
  Background,
  Container,
  Nome,
  Saldo,
  Title,
  List,
  Area,
} from './styles';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import {
  equalTo,
  get,
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  update,
} from 'firebase/database';
import { database } from '../../services/firebase';
import firebase from 'firebase/compat/app';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import DateTime from '../../components/DateTime';

function Home() {
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function buscarSaldo() {
      const saldoRef = ref(database, `usuarios/${user.uid}`);

      const usubscribe = onValue(saldoRef, (snapshot) => {
        if (snapshot.exists()) {
          setSaldo(snapshot.val().saldo);
        } else {
          setSaldo(0);
        }
      });

      return () => usubscribe();
    }

    buscarSaldo();

    async function buscarHistorico() {
      const histsRef = ref(database, `historico/${user.uid}`);

      const querySelect = query(
        histsRef,
        orderByChild('data'),
        equalTo(newDate.toISOString().split('T')[0]),
        limitToLast(10),
      );
      const unsubscribe = onValue(querySelect, (snapshot) => {
        let tempHistorico = [];

        snapshot.forEach((childItem) => {
          tempHistorico.push({
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            data: childItem.val().data,
          });

          setHistorico(tempHistorico);
        });
      });
      return () => unsubscribe();
    }

    buscarHistorico();
  }, [newDate]);

  function handleDelete(data) {
    const today = new Date().toISOString().split('T')[0];

    if (today !== data.data) {
      alert('Apenas datas de hoje');
      return;
    }
    Alert.alert(
      'Tens certeza desta acçção',
      `Apagar ${data.tipo} - ${data.valor} `,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => deleteTransicao(data),
        },
      ],
    );
  }

  async function deleteTransicao(data) {
    const userRef = ref(database, `usuarios/${user.uid}`);
    const response = await get(userRef);

    if (!response.exists()) {
      Alert.alert('Dados não encontrados');
    }
    let saldo = parseFloat(response.val().saldo) || 0;

    saldo = data.tipo === 'receita' ? (saldo -= data.valor) : saldo;

    await update(userRef, { saldo });

    const histRef = ref(database, `historico/${user.uid}/${data.key}`);
    await remove(histRef);
  }

  function handlePicker() {
    setShow(true);
  }

  function closeDatePicker() {
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date.toISOString().split('T')[0]);
    console.log();
  };

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user.nome && user.nome}</Nome>
        <Saldo>{saldo && saldo} R$</Saldo>

        <Area>
          <TouchableOpacity onPress={handlePicker}>
            <Icon name="event" size={30} color="#fff" />
          </TouchableOpacity>

          <Title>Últimas Transações</Title>
        </Area>

        <List
          showsVerticalScrollIndicator={false}
          data={historico}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <HistoricoList data={item} deleteFunction={handleDelete} />
          )}
        />
        {show && (
          <DateTime
            onClose={closeDatePicker}
            onChange={onChange}
            date={newDate}
          />
        )}
      </Container>
    </Background>
  );
}

export default Home;
