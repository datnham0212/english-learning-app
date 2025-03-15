import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const SettingsButton = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.settingsButton} 
      onPress={onPress}
    >
      <Icon name="cog" size={30} color="white" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = {
  settingsButton: {
    position: 'absolute',
    top: height * 0.155,
    right: width * 0.01,
    width: height * 0.08,
    height: height * 0.08,
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 0,
  },
};

export default SettingsButton;