import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    top: 50,
    right: 20,
    width: 50,
    height: 50,
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