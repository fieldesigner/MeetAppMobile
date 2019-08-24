import React, { useState, useMemo, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '~/components/Background';
import Meetups from '~/components/Meetups';
import Header from '~/components/Header';
import { Container, List, Novent, Msg, LoadView } from './styles';
import api from '~/services/api';

function Registrations({ isFocused }) {
  const [meetup, setMeetup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function loadMeetups() {
    setLoading(true);
    const response = await api.get('registered');

    response.data.map(meet => (meet.Meetup.register = true));
    const newmeets = response.data.map(meet => meet.Meetup);

    setMeetup(newmeets);
    setLoading(false);
  }

  async function handleSubscribe(id, register) {
    setLoadingBtn(true);
    if (register === true) {
      try {
        await api.delete(`subscription/${id}`, {
          params: { id },
        });
        setMeetup(
          meetup.map(meet =>
            meet.id === id
              ? {
                  ...meet,
                  register: false,
                }
              : meet
          )
        );
        Alert.alert(
          'Confirmação',
          ' Tudo certo, você não esta mais inscrito para este evento!'
        );
      } catch (error) {
        Alert.alert('Erro', error);
      }
    } else {
      try {
        await api.post('subscription', { meetup_id: id });

        setMeetup(
          meetup.map(meet =>
            meet.id === id
              ? {
                  ...meet,
                  register: true,
                }
              : meet
          )
        );
        Alert.alert('Sucesso', 'Agora você esta inscrito para este evento!');
      } catch (error) {
        Alert.alert('Erro', error);
      }
    }
    setLoadingBtn(false);
  }

  return (
    <Background>
      <Container>
        <Header />

        {!loading ? (
          meetup.length > 0 ? (
            <List
              data={meetup}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetups
                  onSubscribe={() => handleSubscribe(item.id, item.register)}
                  data={item}
                />
              )}
            />
          ) : (
            <Novent>
              <Msg>Você não esta inscrito para nenhum evento</Msg>
            </Novent>
          )
        ) : (
          <Novent>
            <Msg>Carregando</Msg>
          </Novent>
        )}

        {loadingBtn ? (
          <LoadView>
            <ActivityIndicator size="large" color="#fff" />
          </LoadView>
        ) : null}
      </Container>
    </Background>
  );
}

Registrations.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
export default withNavigationFocus(Registrations);
