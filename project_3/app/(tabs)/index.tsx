// @ts-nocheck
import React from 'react';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useGame } from '../context/GameContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const ScoreText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 60px;
`;

const ObjectContainer = styled(Animated.View)`
  width: 150px;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 75px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

const ObjectText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

export default function PlayScreen() {
  const { score, addScore, recordAction } = useGame();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const handleTap = () => {
    addScore(1);
    recordAction('taps');
  };

  const handleDoubleTap = () => {
    addScore(2);
    recordAction('doubleTaps');
  };

  const handleLongPress = () => {
    addScore(5);
    recordAction('longPresses');
  };

  const handlePan = () => {
    recordAction('pans');
  };

  const handleFlingRight = () => {
    addScore(Math.floor(Math.random() * 10) + 1);
    recordAction('flingRight');
  };

  const handleFlingLeft = () => {
    addScore(Math.floor(Math.random() * 10) + 1);
    recordAction('flingLeft');
  };

  const handlePinch = () => {
    addScore(3);
    recordAction('pinches');
  };

  const tap = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      runOnJS(handleTap)();
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(handleDoubleTap)();
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onEnd((_e, success) => {
      if (success) {
        runOnJS(handleLongPress)();
      }
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(handlePan)();
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(handleFlingRight)();
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      runOnJS(handleFlingLeft)();
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      runOnJS(handlePinch)();
    });

  const composedTap = Gesture.Exclusive(doubleTap, tap);
  
  const gestures = Gesture.Simultaneous(
    Gesture.Race(composedTap, longPress),
    pan,
    flingRight,
    flingLeft,
    pinch
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Container>
      <ScoreText>Score: {score}</ScoreText>
      <GestureDetector gesture={gestures}>
        <ObjectContainer style={animatedStyle}>
          <ObjectText>Interact</ObjectText>
        </ObjectContainer>
      </GestureDetector>
    </Container>
  );
}
