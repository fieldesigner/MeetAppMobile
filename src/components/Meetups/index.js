import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  File,
  Info,
  Title,
  Dado,
  Texto,
  SubmitButton,
  SubmitButtonOff,
  Desc,
} from './styles';

export default function Meetups({ data, onSubscribe }) {
  const idUser = useSelector(state => state.user.profile.id);

  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM yyyy, 'às' H':'mm 'h'", {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      {data.File.url ? <File source={{ uri: data.File.url }} /> : null}

      <Info>
        <Title>{`${data.title},${data.id}`}</Title>
        <Dado>
          <Icon name="event" size={20} color="#999" />
          <Texto>{dateParsed}</Texto>
        </Dado>
        <Dado>
          <Icon name="place" size={20} color="#999" />
          <Texto>{data.location}</Texto>
        </Dado>
        <Dado>
          <Icon name="person" size={20} color="#999" />
          <Texto>Organizador: {data.User.name}</Texto>
        </Dado>
        <Desc>{data.description}</Desc>
        {idUser != data.User.id ? (
          !data.past ? (
            !data.register ? (
              <SubmitButton onPress={onSubscribe}>
                Realizar Inscrição
              </SubmitButton>
            ) : (
              <SubmitButtonOff onPress={onSubscribe}>
                Cancelar Inscrição
              </SubmitButtonOff>
            )
          ) : null
        ) : null}
      </Info>
    </Container>
  );
}
