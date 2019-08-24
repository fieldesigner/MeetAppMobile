import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
  colors: ['#211F2C', '#000'],
})`
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
`;
