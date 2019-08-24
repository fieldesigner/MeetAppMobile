import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const SelectDate = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const ArrowButton = styled.TouchableOpacity`
  color: #fff;
  font-size: 20px;
  padding: 10px;
`;

export const Dia = styled.Text`
  font-size: 18px;
  color: #fff;
  text-transform: uppercase;
`;

export const Novent = styled.View`
  flex: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const Msg = styled.Text`
  color: #fff;
  text-transform: uppercase;
`;

export const LoadView = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`;
