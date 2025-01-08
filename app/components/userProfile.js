import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'dodgerblue', marginRight: 5, marginLeft: -5 }} />
        <Text style={{ fontSize: 20 }}>Username</Text>
      </View>
      <Ionicons name="mail-outline" size={34} color="#a5a5b1" onPress={() => navigation.navigate('Message')} />
    </View>
  );
};

export default UserProfile;