import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const  ActionItemsScreen = (props: any) =>{
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Action Items Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    props.navigation.navigate('Details', {
                        userId: 1,
                        userName: 'Awesome User',
                    });
                }
                }
            />
        </View>
    );
}

export default ActionItemsScreen