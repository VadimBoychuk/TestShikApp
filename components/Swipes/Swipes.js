/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BottomDrawer from 'rn-bottom-drawer';
import Icon from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';

class Swipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDrawerr: false,
      resetPosition: () => {},
      resetPositionState: () => {},
      showSwipeArea: true,
      toggleArrow: true,
      showSwipeAreaInAnyRoutes: true,
      hideAll: false,
      data: [
        {
          name: '1 screen',
          count: 0,
          numOfScr: 1,
        },
        {
          name: '2 screen',
          count: 0,
          numOfScr: 2,
        },
        {
          name: '3 screen',
          count: 1,
          numOfScr: 3,
        },
        {
          name: '4 screen',
          count: 2,
          numOfScr: 4,
        },
        {
          name: '5 screen',
          count: 0,
          numOfScr: 5,
        },
        {
          name: '6 screen',
          count: 1,
          numOfScr: 6,
        },
        {
          name: '7 screen',
          count: 0,
          numOfScr: 7,
        },
        {
          name: '8 screen',
          count: 3,
          numOfScr: 8,
        },
      ],
      end: true,
    };

    this.length = this.state.data.length;
    this.data = this.state.data.slice();
  }

  componentWillMount() {
    const route = this.props.currentRouteName;
    if (route !== 'Home') {
      this.setState({showSwipeAreaInAnyRoutes: false});
    } else if (route === 'Home') {
      this.setState({showSwipeAreaInAnyRoutes: true});
    }
  }

  componentWillReceiveProps(nexProps) {
    const route = nexProps.currentRouteName;
    this.state.resetPosition(windowHeight - 80);
    this.setState({toggleArrow: true});
    if (route !== 'Home') {
      this.setState({showSwipeAreaInAnyRoutes: false});
    } else if (route === 'Home') {
      this.setState({showSwipeAreaInAnyRoutes: true});
    }
  }

  checkScroll = ({layoutMeasurement, contentOffset, contentSize}) => {
    let offset = 300;
    if (this.state.data.length >= this.length * 3) {
      this.setState(prevState => ({
        data: prevState.data.slice(this.length * 2),
      }));
    }
    if (contentOffset.x <= offset) {
      this.setState(
        prevState => ({
          data: [...prevState.data, ...this.data],
        }),
        this.infListRef.scrollToIndex({
          index: this.length - 1,
          animated: false,
        }),
      );
    }
    if (
      layoutMeasurement.width + contentOffset.x >= contentSize.width - offset &&
      this.state.end
    ) {
      this.setState(prevState => ({
        data: [...prevState.data, ...this.data],
        end: false,
      }));
    } else {
      this.setState({
        end: true,
      });
    }
  };
  resetPositionHandler = func => {
    this.setState({
      resetPosition: func,
    });
  };

  onSwipeUp = () => {
    this.setState({showSwipeArea: false, toggleArrow: false});
  };

  onSwipeDown = () => {
    this.setState({showSwipeArea: true, toggleArrow: true});
  };
  _renderItem = ({item}) => {
    const {navigation} = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.current.navigate('InfoScreen', {item: item});
        }}>
        <View
          style={{
            height: 230,
            width: windowWidth / 2.6,
            backgroundColor: '#B9DEFF',
            borderRadius: 15,
            alignItems: 'center',
            marginTop: 4,
            marginHorizontal: 10,
          }}>
          {item.count ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: 'red',
                top: -4,
                right: 1,
                width: 20,
                height: 20,
                borderRadius: windowHeight / 2,
              }}>
              <Text
                style={{
                  color: 'white',
                  lineHeight: 15,
                  fontSize: 15,
                }}>
                {item.count}
              </Text>
            </View>
          ) : null}
          <Text style={{color: 'white'}}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    const {
      showSwipeArea,
      showSwipeAreaInAnyRoutes,
      toggleArrow,
      data,
    } = this.state;

    // if (hideAll) {
    //   return null;
    // }
    return (
      <BottomDrawer
        containerHeight={300}
        offset={0}
        backgroundColor="transparent"
        shadow={false}
        startUp={false}
        onExpanded={this.onSwipeUp}
        onCollapsed={this.onSwipeDown}
        resetPosition={this.resetPositionHandler}
        downDisplay={220}>
        <View style={{height: 220, paddingTop: 50}}>
          {showSwipeArea && showSwipeAreaInAnyRoutes && (
            <View
              style={{
                position: 'absolute',
                height: 250,
                width: '100%',
                top: -230,
              }}
            />
          )}
          <View
            style={{
              position: 'absolute',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 35,
              borderRadius: 5,
              borderColor: 'rgba(0, 0, 0, 0.2)',
              borderTopWidth: toggleArrow ? 0.5 : 0,
              borderBottomWidth: toggleArrow ? 0 : 0.5,
            }}>
            <Icon
              name={toggleArrow ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={35}
              color="grey"
            />
          </View>
          <View>
            <FlatList
              ref={ref => {
                this.infListRef = ref;
              }}
              horizontal={true}
              style={{height: 234}}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={this._renderItem}
              onScroll={({nativeEvent}) => this.checkScroll(nativeEvent)}
              initialScrollIndex={4}
              keyExtractor={(item, index) => item.numOfScr + index}
            />
          </View>
        </View>
      </BottomDrawer>
    );
  }
}

export default Swipes;
