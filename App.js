/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  ImageBackground,
  Button,
} from 'react-native';
// import ControlledGifView from 'react-native-controlled-gif';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const [guestAndPet, setGuestAndPet] = useState({guest: '', pet: ''});
  const [waiting, setWaiting] = useState({
    one: [{id: 90}, {id: 91}, {id: 92}, {id: 93}, {id: 94}],
    two: [{id: 95}, {id: 96}, {id: 97}, {id: 98}, {id: 99}],
  });

  const callApi = async () => {
    await axios
      .get('https://port-0-fastapi-ngsnp25lbt6bmuh.gksl2.cloudtype.app/wait')
      .then(res => {
        let temp = res.data;
        if (temp.two.length !== 5) {
          let num2 = 5 - temp.two.length;
          for (let i = 1; i <= num2; i++) {
            temp.two.push({id: 70 + i});
          }
          if (temp.one.length !== 5) {
            let num1 = 5 - temp.one.length;
            for (let i = 1; i <= num1; i++) {
              temp.one.push({id: 80 + i});
            }
          }
        }
        setGuestAndPet(temp.now);
        setWaiting(temp);
      })
      .catch(e => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      callApi();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  const image = require('./assets/image/logo-point.png');
  const backgroundStyle = {
    flex: 10,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ImageBackground
        source={image}
        resizeMode={'contain'}
        style={styles.bgImage}
        imageStyle={styles.bgImageStyle}>
        <View style={styles.mainView}>
          {guestAndPet.pet !== '' ? (
            <>
              <Text style={styles.mainText_pet}>{guestAndPet.pet}</Text>
              {guestAndPet.guest === '' ? (
                ''
              ) : (
                <Text style={styles.mainText_host}>{guestAndPet.guest}님</Text>
              )}
            </>
          ) : (
            <View style={styles.gifZone}>
              <Image
                source={require('./assets/gif/cat3.gif')}
                resizeMode={'repeat'}
                style={styles.gifCat}
              />
            </View>
          )}
        </View>
        <View style={styles.subView}>
          <View style={styles.lineOne}>
            {waiting
              ? waiting.one.map(item => (
                  <View
                    key={item.id}
                    style={item.id !== 5 ? styles.block : styles.blockLast}>
                    <Text style={styles.subText_pet}>{item.pet}</Text>
                    <Text style={styles.subText_host}>
                      {item.guest !== undefined ? `${item.guest}님` : ''}
                    </Text>
                  </View>
                ))
              : ''}
          </View>

          <View style={styles.lineTwo}>
            {waiting
              ? waiting.two.map(item => (
                  <View
                    key={item.id}
                    style={item.id !== 10 ? styles.block : styles.blockLast}>
                    <Text style={styles.subText_pet}>{item.pet}</Text>
                    <Text style={styles.subText_host}>
                      {item.guest !== undefined ? `${item.guest}님` : ''}
                    </Text>
                  </View>
                ))
              : ''}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'balck',
    borderBottomWidth: 1,
  },
  mainText_pet: {
    color: '#333',
    fontSize: 60,
    fontWeight: '700',
  },
  mainText_host: {
    color: '#333',
    fontSize: 40,
  },

  subText_pet: {
    color: '#333',
    fontSize: 20,
    fontWeight: '500',
  },
  subText_host: {
    color: '#333',
    fontSize: 15,
  },

  subView: {
    flex: 4,
  },

  lineOne: {
    flex: 2,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  lineTwo: {
    flex: 2,
    flexDirection: 'row',
  },

  block: {
    flex: 0.4,
    borderRightColor: 'black',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  blockLast: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gifZone: {
    flex: 6,
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  gifCat: {
    width: 100,
    height: 100,
    marginRight: 3,
    marginBottom: -10,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: 'white',
    flex: 10,
  },
  bgImageStyle: {
    backgroundColor: 'white',
    width: '100%',
    opacity: 0.2,
  },
});

export default App;
