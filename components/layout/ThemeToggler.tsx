import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native';
import { useTheme } from '@/context/Theme';
import Icon from 'react-native-vector-icons/Feather';

const ThemeToggler = () => {
  const { isDark, toggleTheme } = useTheme();
  const progress = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: false,
      damping: 10,
      stiffness: 100,
      mass: 0.7,
    }).start();
  }, [isDark]);

  const thumbTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 56],
  });

  const trackBackground = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#dfe4ea', '#2f2f2f'],
  });

  const thumbColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f5c518', '#4c8dff'],
  });

  return (
    <TouchableOpacity onPress={toggleTheme} activeOpacity={0.9}>
      <Animated.View style={[styles.track, { backgroundColor: trackBackground }]}>
        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbTranslate }],
              backgroundColor: thumbColor,
            },
          ]}
        >
          <Icon
            name={isDark ? 'moon' : 'sun'}
            size={16}
            color="#fff"
          />
        </Animated.View>
        {/* Static icons outside track */}
        <View style={styles.iconLeft}>
          <Icon name="sun" size={18} color={isDark ? '#666' : '#f5c518'} />
        </View>
        <View style={styles.iconRight}>
          <Icon name="moon" size={18} color={isDark ? '#4c8dff' : '#666'} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ThemeToggler;

const styles = StyleSheet.create({
  track: {
    width: 90,
    height: 38,
    borderRadius: 20,
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 4,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    top: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  iconLeft: {
    position: 'absolute',
    left: 10,
    top: 9,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    top: 9,
  },
});
