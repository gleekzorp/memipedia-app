import React, {useEffect, useContext} from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CurrentUserContext from '../../contexts/CurrentUserContext';


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
      // TODO: call API to ensure logged in
    } else {
      setCurrentUser(null)
      props.navigation.navigate('Auth');
    }
  }

  return <View />
}