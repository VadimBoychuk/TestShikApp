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
              borderColor: '#0095c7',
              borderWidth: 2,
            }}>
            <Text
              style={{
                fontSize: 25,
                color: '#0095c7',
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
                color: '#00BFFF',
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
            fontSize: 40,
            fontWeight: '600',
            height: 40,
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
                  'https://megamoll.com.ua/wp-content/uploads/2017/07/IMG_20170705_160815_BURST001_COVER.jpg',
              }}
            />
          </View>
        ) : (
          <View style={{height: windowHeight * 0.65 - 80}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={{
                uri: 'https://trademaster.ua/im/8216314-_mg_9460.jpg',
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
                'https://megamoll.com.ua/wp-content/uploads/2017/07/IMG_20170705_160125.jpg',
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
                'https://megamoll.com.ua/wp-content/uploads/2017/07/IMG_20170705_160553_BURST001_COVER.jpg',
            }}
          />
        </View>
      </Swiper>
      {/* </GestureRecognizer> */}
    </View>
  );
}

export default InfoScreen;
