import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('showRightProgress:', prog.value);
    console.log('appliedTranslation:', drag.value);
    return {
      transform: [{ translateX: drag.value + 170 }],
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };
  });
  
  return (
    <Reanimated.View style={styleAnimation}>
      <View style={styles.rightAction}>
        <Text style={styles.rightActionText}>Delete</Text>
      </View>
    </Reanimated.View>
  );
}

function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('showLeftProgress:', prog.value);
    console.log('appliedTranslation:', drag.value);
    
    return {
      transform: [{ translateX: drag.value - 170 }],
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };
  });
  
  return (
    <Reanimated.View style={styleAnimation}>
      <View style={styles.leftAction}>
        <Text style={styles.leftActionText}>Archive</Text>
      </View>
    </Reanimated.View>
  );
}

export default function SwipeableWrapper({children, functionSwipeRight, functionSwipeLeft}:{children: React.ReactNode, functionSwipeRight?: () => void,functionSwipeLeft?: () => void}) {
  const swipeableRef = useRef<React.ComponentRef<typeof ReanimatedSwipeable>>(null);
  
  const handleSwipeableOpen = (direction: 'left' | 'right') => {
    if (direction === 'right' && functionSwipeRight) {
      functionSwipeRight();
      // Reset the swipeable after the function executes
      setTimeout(() => {
        swipeableRef.current?.reset();
      }, 100); // Small delay to ensure the function completes
    } else if (direction === 'left' && functionSwipeLeft) {
      functionSwipeLeft();
      // Reset the swipeable after the function executes
      setTimeout(() => {
        swipeableRef.current?.reset();
      }, 100);
    }
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <ReanimatedSwipeable
        ref={swipeableRef}
        containerStyle={styles.swipeable}
        friction={1}
        rightThreshold={200}
        leftThreshold={200}
        renderRightActions={functionSwipeLeft ? RightAction : undefined}
        renderLeftActions={functionSwipeRight ? LeftAction : undefined}
        overshootRight={false}
        overshootLeft={false}
        onSwipeableOpen={handleSwipeableOpen}
      >
        <View style={styles.swipeableContent}>
          {children}
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightAction: {
    width: 900,
    height: 100,
    paddingStart: 500,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  leftAction: {
    width: 900,
    height: 100,
    paddingEnd: 500,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  leftActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  swipeable: {
    height: 100,
  },
  swipeableContent: {
    height: 100,
  },
  swipeableText: {
    fontSize: 16,
    color: "black",
  },
});