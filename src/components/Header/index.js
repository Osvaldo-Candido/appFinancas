import { ButtonMenu, Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Feather';

export default function Header() {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={30} color="#fff" />
      </ButtonMenu>
    </Container>
  );
}
