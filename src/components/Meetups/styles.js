import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 50px;
  margin-top: -20px;
  padding: 0px;
  border-radius: 5px;
  background: #fff;

  display: flex;

  align-items: center;

  opacity: ${props => (props.past ? 0.7 : 1)};
`;

export const File = styled.Image`
  width: 100%;
  min-height: 150px;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const Info = styled.View`
  padding: 15px;
  width: 100%;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

export const Dado = styled.View`
  color: #999;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;
  margin-top: 4px;
  color: #999;
`;
export const Texto = styled.Text`
  padding-left: 7px;
`;
export const Desc = styled.Text`
  margin: 7px 0 0 0;
  color: #333;
`;
export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const SubmitButtonOff = styled(Button)`
  margin-top: 15px;
  background-color: #446d8c;
`;

export const Loading = styled.View`
  flex: 1;
  position: absolute;
  background: red;
`;
