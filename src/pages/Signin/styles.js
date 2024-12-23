import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background: #131313;
`;
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const InputArea = styled.View`
  flex-direction: row;
`;
export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.2)',
})`
  background-color: rgba(0, 0, 0, 0.2);
  width: 90%;
  font-size: 16px;
  color: #fff;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 7px;
`;
export const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: #00b94a;
  width: 90%;
  padding: 10px;
  border-radius: 7px;
  margin-top: 10px;
`;
export const SubmitText = styled.Text`
  font-size: 18px;
`;
export const Logo = styled.Image`
  margin-bottom: 15px;
`;
export const Link = styled.TouchableOpacity`
  margin-top: 5px;
  margin-bottom: 9px;
`;
export const LinkText = styled.Text`
  color: #fff;
`;
