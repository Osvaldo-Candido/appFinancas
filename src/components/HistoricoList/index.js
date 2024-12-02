import Icon from '@expo/vector-icons/Feather';
import { Container, IconView, Tipo, TipoText, ValorText } from './styles';
import { TouchableWithoutFeedback } from 'react-native';

export default function HistoricoList({ data, deleteFunction }) {
  return (
    <TouchableWithoutFeedback onLongPress={() => deleteFunction(data)}>
      <Container>
        <Tipo>
          <IconView tipo={data.tipo}>
            <Icon
              name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
              color="#fff"
              size={30}
            />
            <TipoText>{data.tipo && data.tipo}</TipoText>
          </IconView>
        </Tipo>
        <ValorText>R$ {data.valor && data.valor}</ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
}
