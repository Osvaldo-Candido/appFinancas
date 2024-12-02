import { Picker } from '@react-native-picker/picker';
import { PickerView } from './styles';
export default function PickerComponent({ onChange, tipo }) {
  return (
    <PickerView>
      <Picker
        onValueChange={(value) => onChange(value)}
        selectedValue={tipo}
        style={{ width: '100%' }}
      >
        <Picker.Item label="Receita" value="receita" />
        <Picker.Item label="Despesa" value="despesa" />
      </Picker>
    </PickerView>
  );
}
