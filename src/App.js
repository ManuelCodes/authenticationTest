import React, { Component } from 'react';
import { View ,Text} from 'react-native';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBeJtaKtMqVcSp4tBDBO9rTcHQ5hMzZHCs',
            authDomain: 'auth-a0931.firebaseapp.com',
            databaseURL: 'https://auth-a0931.firebaseio.com',
            projectId: 'auth-a0931',
            storageBucket: 'auth-a0931.appspot.com',
            messagingSenderId: '934500086527'
          }
        );
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card >
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log out
                            </Button>
                        </CardSection>
                    </Card>
                );
            case false:
            return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;