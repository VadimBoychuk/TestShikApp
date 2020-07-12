/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;
import GestureRecognizer from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function InfoScreen({navigation, route}) {
  const [statusHeight, setHeinghtStatusBar] = useState(40);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(response =>
        setHeinghtStatusBar(response.height),
      );
    }
  }, []);
  // #e7e7e7
  return (
    <View style={{flex: 1, backgroundColor: 'white', position: 'relative'}}>
      {/* <GestureRecognizer
        onSwipeDown={() => console.log('downnnnn')}
        style={{flex: 1}}> */}
      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          top: statusHeight + 10,
          right: 20,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('InfoDetail', {item: route.params.item});
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 35,
              height: 35,
              borderRadius: 50,
              borderColor: 'black',
              borderWidth: 2,
            }}>
            <Text
              style={{
                fontSize: 25,
                lineHeight: 30,
                fontWeight: '600',
              }}>
              i
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          top: statusHeight + 10,
          left: 20,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 35,
            }}>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 30,
                fontWeight: '400',
              }}>
              Go Home
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          height: windowHeight * 0.25,
          backgroundColor: 'grey',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            height: 25,
          }}>
          {route.params.item.name}
        </Text>
      </View>

      <Swiper
        style={{height: windowHeight * 0.65 - 100}}
        // showsPagination={false}
        paginationStyle={{
          bottom: windowHeight * 0.17,
        }}
        showsButtons={false}
        loop={false}>
        {route.params.item.numOfScr % 2 === 0 ? (
          <View style={{height: windowHeight * 0.65 - 80}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={{
                uri:
                  'https://i.pinimg.com/originals/5d/66/09/5d6609150b338d0f5829814c1f2fa4f9.jpg',
              }}
            />
          </View>
        ) : (
          <View style={{height: windowHeight * 0.65 - 80}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={{
                uri:
                  'https://images.unsplash.com/photo-1535332371349-a5d229f49cb5?ixlib=rb-1.2.1&w=1000&q=80',
              }}
            />
          </View>
        )}
        <View
          style={{
            height: windowHeight * 0.65 - 80,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={{
              uri:
                'https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg',
            }}
          />
        </View>
        <View
          style={{
            height: windowHeight * 0.65 - 80,
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={{
              uri:
                'https://lh3.googleusercontent.com/proxy/Ss0XMMllm-uemy4YaC-LQadj5Up4xZnt6Wok1OxBm6USKK7MHjpXbZHLKtD31T4i3qLdtQq74kOWaJWDEO4tEQDRYP8VEFu-aqTz9LLG9mMpy1CC0Xc',
            }}
          />
        </View>
      </Swiper>
      {/* </GestureRecognizer> */}
    </View>
  );
}

export default InfoScreen;
