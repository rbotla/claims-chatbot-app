/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'

class App extends React.Component {
  state = {
    messages: [],
    count: 1
  }
  constructor(props) {
    super(props);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderText = this.renderText.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://cdn3.iconfinder.com/data/icons/artificial-intelligence-solid/57/056_-_Medical_Bot-512.png',
          },
        },
      ],
    })
  }

  onQuickReply(quickReply) {
    console.log('quick reply: ', quickReply, ' content type: ', quickReply.contentType);
    if(quickReply.contentType === "text") {
    } else if (quickReply.contentType === "location") {
        // send location
    } else if (quickReply.contentType === "camera") {
      // open camera then send video / image
    }
    else {
      this.onSend(
        [
          {
            _id: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100000),
            key: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100000),
            text: quickReply[0].title,
            payload: quickReply[0].value,
            createdAt: new Date(),
            "user": {"_id": 1}
          }
        ]
      , true)
    }
    // infinite possibilities 
 } 

  onSend(messages = [], isButtonClick = false) {
    const that = this;
    console.log('onSend enter: ', messages);

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
//console.log(">>>>> ", messages[0].payload, " -------- \n", messages[0].text);
    axios.post('https://demobot.hexia.org:5005/webhooks/rest/webhook', {
      message: isButtonClick ? messages[0].payload : messages[0].text
    })
    .then(function (response) {
      const resp = JSON.parse(response.request['_response']);
      const textMsgs = that.renderText(resp);
      const btnMsgs = that.renderButtons(resp);
      const allMessages = [btnMsgs, ...textMsgs];

      that.setState(previousState => {
        console.log(previousState)
        return ({
        messages: GiftedChat.append(previousState.messages, allMessages),
      })
      })
    })
    .catch(function (error) { 
      console.log(error);
    }); 
  }

  renderButtons(resp) {
    const buttons = resp ? resp.map(r => r.buttons) : [];
    const buttonValues = buttons && buttons[0] ? buttons[0].map( b => ({title: b.title, value: b.payload}) ) : [];
    const btnMsgs = (buttonValues.length > 0) ?
      {
        _id: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100000),
        key: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100000),
        createdAt: new Date(),
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: false,
          values: buttonValues,
        },
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://cdn3.iconfinder.com/data/icons/artificial-intelligence-solid/57/056_-_Medical_Bot-512.png',
        },
      } : {};
    // console.log('in renderButton: ', btnMsgs);
    return btnMsgs;
  }

  renderText(resp) {
    const textList = resp ? resp.map(r => r.text) : [];
    const messages = textList.map(m => ({
      _id: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100000),
      key: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100000),
      text: m,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://cdn3.iconfinder.com/data/icons/artificial-intelligence-solid/57/056_-_Medical_Bot-512.png',
      },
    }))
    console.log('in rendertext: ', messages);
    return messages;
  }

  render() {
    return (
    <>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        onQuickReply={quickReply => this.onQuickReply(quickReply)}
        user={{
          _id: 1,
        }}
      />
    </>
    )
  }
}

export default App;
