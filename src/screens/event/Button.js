import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function Button({ text, bgColor = '#FFF', color = '#000', borderWidth = 1, borderColor = '#000', onPress }) {
  return (
    <TouchableOpacity 
    activeOpacity={0.9} 
    style={[styles.button, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: borderWidth }]} 
    onPress={onPress}>
      <Text style={[styles.buttonText, {color: color}]}>{text}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.08,
    borderRadius: 50,
    //borderWidth: 2,
    //backgroundColor: '#FFF',
    //borderColor: '#B9A8FF',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    //fontWeight: 150,
    //color: '#B9A8FF',
  },
});