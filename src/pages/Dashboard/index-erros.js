import React, { useState, useMemo, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '~/components/Background';
import Meetups from '~/components/Meetups';
import Header from '~/components/Header';
import {
  Container,
  List,
  SelectDate,
  ArrowButton,
  Dia,
  Novent,
  Msg,
  LoadView,
} from './styles';
import api from '~/services/api';

function Dashboard({ isFocused }) {
  const [meetup, setMeetup] = useState([]);
  const [dateselected, setDateselected] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(dateselected, "d 'de' MMMM", { locale: pt }),
    [dateselected]
  );

  function handlePrevDay() {
    setDateselected(subDays(dateselected, 1));
    setPage(1);
  }

  function handleNextDay() {
    setDateselected(addDays(dateselected, 1));
    setPage(1);
  }

  useEffect(() => {
    setLoading(true);
    async function loadMeetups() {
      const dateparam = format(dateselected, 'yyyy-MM-dd');

      const response = await api.get('allmeetups', {
        params: { date: dateparam, page },
      });

      const subscribes = await api.get('registered');

      response.data.map(meet => {
        const checkregister = subscribes.data.find(
          m => m.meetup_id === meet.id
        );
        // eslint-disable-next-line
        checkregister ? (meet.register = true) : (meet.register = false);
      });
      console.tron.log(`${response.data.length}, ${page}`);
      if (response.data.length > 0) {
        setMeetup([...meetup, ...response.data]);
      }
      setLoading(false);
    }
    loadMeetups();
    // eslint-disable-next-line
  }, [dateselected, isFocused, page]);

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
        <SelectDate>
          <ArrowButton onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </ArrowButton>
          <Dia>{dateFormatted}</Dia>
          <ArrowButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </ArrowButton>
        </SelectDate>

        {// eslint-disable-next-line
        !loading ? (
          meetup.length > 0 ? (
            <List
              data={meetup}
              keyExtractor={item => String(item.id)}
              onEndReachedThreshold={0.1}
              onEndReached={() => setPage(page + 1)}
              renderItem={({ item }) => (
                <Meetups
                  onSubscribe={() => handleSubscribe(item.id, item.register)}
                  data={item}
                />
              )}
            />
          ) : (
            <Novent>
              <Msg>Nenhum evento cadastrado para o dia {dateFormatted}</Msg>
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

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
