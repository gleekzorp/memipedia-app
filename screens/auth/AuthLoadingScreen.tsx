import React, {useEffect, useContext} from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/api';


interface IauthLoadingScreenProps {
  navigation: {
    navigate: (screenName: string) => string
  }
}

export default (props: IauthLoadingScreenProps) => {
  const { setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const token = await SecureStore.getItemAsync("memipedia_secure_token");

    console.log('in check login in the auth loading screen')

    if (token) {
      api
        .get("logged_in", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('response from checkLogin', response.data);
          
          if (response.data.memipedia_user) {
            setCurrentUser(response.data.memipedia_user);
            props.navigation.navigate('App');
          } else {
            setCurrentUser(null);
            props.navigation.navigate('Auth');
          }
        })
        .catch((error) => {
          setCurrentUser(null);
          props.navigation.navigate('Auth');
        })
    } else {
      setCurrentUser(null);
      props.navigation.navigate('Auth');
    }
  }

  return <View />
}