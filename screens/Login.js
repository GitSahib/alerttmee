import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, alerttmeeTheme } from "../constants";


const { width, height } = Dimensions.get("screen");
class Login extends React.Component {
  state = {
    userEmail: '',
    userPassword:'',
    error: false,
    isLoading : false
  };
  constructor(props) {
    super(props);
    this.handleSubmitPress = this.handleSubmitPress.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePwd = this.updatePwd.bind(this);
  } 
  updateEmail(event){
    console.log(event.target.name);
    this.setState({userEmail: event.target.value});
  }
  updatePwd(event){
    this.state.userPassword = event.target.value;
  }
  setLoading(value){
    this.state.isLoading = value;
  }
  setErrortext(text){
    this.state.error = text;
  }
  handleSubmitPress(){
      // console.log(this.state);
      // if (!this.state.userEmail) {
      //   alert('Please fill Email');
      //   return;
      // }
      // if (this.state.userPassword) {
      //   alert('Please fill Password');
      //   return;
      // }
      this.setLoading(true);
      let dataToSend = {email: this.state.userEmail, password: this.state.userPassword};
      
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          this.setLoading(false);
          console.log(dataToSend);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.data.email) {
            AsyncStorage.setItem('user_id', responseJson.data.email);
           // console.log(responseJson.data[0].user_id);
            navigation.replace('DrawerNavigationRoutes');
          } else {
            this.setErrortext('Please check your email id or password');
            console.log('Please check your email id or password');
          }
        })
        .catch((error) => {
          //Hide Loader
          this.setLoading(false);
          console.error(error);
        });
    };
  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.loginContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Login with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or login here
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  > 
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        onChange={this.updateEmail}
                        placeholder="Email"
                        extContentType="emailAddress"
                        keyboardType="email-address"
                        borderless                        
                        iconContent={
                          <Icon
                            size={16}
                            color={alerttmeeTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="AlerttmeeExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        onChange={this.updatePwd}
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={alerttmeeTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="AlerttmeeExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={alerttmeeTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={alerttmeeTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block>
                    </Block>
                    <Text
                      style={styles.registerTextStyle}
                      onPress={() => navigation.navigate('Register')}>
                      New Here ? Register
                    </Text>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={alerttmeeTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: alerttmeeTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" onPress={this.handleSubmitPress} style={styles.createButton}>
                        <Text bold size={14} color={alerttmeeTheme.COLORS.WHITE}>
                          LOGIN
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: alerttmeeTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: alerttmeeTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: alerttmeeTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: alerttmeeTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  registerTextStyle: {
    color: alerttmeeTheme.COLORS.PRIMARY,
    fontSize: 14
  }
});

export default Login;
