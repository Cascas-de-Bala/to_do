import React, { useContext } from 'react';
import Mensage from './message'
import { StyleSheet, View, StatusBar, Text, Touchable} from 'react-native';

export default function App() {

    return (
        <View>
            <Text>hehe</Text>
            <Text>hehe</Text>
            <Mensage
                title={'título'} body={'funciona'}
                
            />
            
        </View>
    );
}