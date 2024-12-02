import { Picker } from '@react-native-picker/picker';

export default function PickerComponent() {
  return (
    <PickerView>
      <Picker style={{ width: '100%' }}>
        <Picker.Item label="Receita" value="receita" />
        <Picker.Item label="Despesa" value="despesa" />
      </Picker>
    </PickerView>
  );
}
