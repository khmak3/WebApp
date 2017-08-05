import React, { Component } from 'react';
import { NavLink} from 'reactstrap';
import * as firebase from 'firebase';
import { Button } from 'reactstrap';
import PostMessageView from './PostMessageView';
import RaisedButton from 'material-ui/RaisedButton';


class SignInButton extends  Component {

  componentDidMount() {
    var auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      console.log(user);
      this.setState({user: user});
    });
  }

  handleSignOut() {
    firebase.auth().signOut();
  }

  handleSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('publish_actions');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
 
  render() {
    if (this.state == null) {
      return (<div></div>);
    }
    if (this.state.user) {
      var imgURL = (this.state.user.photoURL || '/images/profile_placeholder.png');
      return (<div style={{alignItems: "center", display: "flex"}}><PostMessageView/>&nbsp;&nbsp;&nbsp;<img src={imgURL} style={{height:"20px", width:"20px"}}/>&nbsp;&nbsp;{this.state.user.displayName}&nbsp;&nbsp;<RaisedButton secondary={true} onClick={() => this.handleSignOut()}>Sign-out</RaisedButton></div>);
    }
    else
    {
      return (<RaisedButton onClick={() => this.handleSignIn()} primary={true} label="Sign-in with Facebook"/>);
    }
  }
}

export default SignInButton;
