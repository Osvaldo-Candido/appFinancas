import { useState } from 'react';
import { Container } from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, TouchableOpacity, Texts } from 'react-native';

export default function DateTime({ date, onClose, onChange }) {
  const [dateNow, setDateNow] = useState(new Date(date));
  return (
    <Container>
      {Platform.OS === 'ios' && (
        <Header>
          <TouchableOpacity onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}
      <DateTimePicker
        mode="date"
        value={dateNow.toISOString().split('T')[0]}
        display="default"
        style={{ backgroundColor: '#fff' }}
        onChange={(e, d) => {
          const currentDate = d || dateNow.toISOString().split('T')[0];
          setDateNow(currentDate);
          onChange(currentDate);
        }}
      />
    </Container>
  );
}
