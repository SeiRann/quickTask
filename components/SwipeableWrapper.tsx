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
                <Text style={styles.leftActionText}>Complete</Text>
            </View>
        </Reanimated.View>
    );
}

export default function SwipeableWrapper({
    children, 
    functionSwipeRight, 
    functionSwipeLeft,
    disableLeftSwipe = false,
    disableRightSwipe = false
}: {
    children: React.ReactNode, 
    functionSwipeRight?: () => void,
    functionSwipeLeft?: () => void,
    disableLeftSwipe?: boolean,
    disableRightSwipe?: boolean
}) {
    const swipeableRef = useRef<React.ComponentRef<typeof ReanimatedSwipeable>>(null);

    const handleSwipeableOpen = (direction: 'left' | 'right') => {
        if (direction === 'right' && functionSwipeRight && !disableRightSwipe) {
            functionSwipeRight();
            setTimeout(() => {
                swipeableRef.current?.reset();
            }, 100);
        } else if (direction === 'left' && functionSwipeLeft && !disableLeftSwipe) {
            functionSwipeLeft();
            setTimeout(() => {
                swipeableRef.current?.reset();
            }, 100);
        }
    };

    // Determine if any swipe is enabled
    const leftSwipeEnabled = functionSwipeRight && !disableRightSwipe;
    const rightSwipeEnabled = functionSwipeLeft && !disableLeftSwipe;

    // If no swipe functions are enabled, render without swipeable
    if (!leftSwipeEnabled && !rightSwipeEnabled) {
        return (
            <GestureHandlerRootView style={styles.container}>
                <View style={styles.swipeableContent}>
                    {children}
                </View>
            </GestureHandlerRootView>
        );
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <ReanimatedSwipeable
                ref={swipeableRef}
                containerStyle={styles.swipeable}
                friction={1}
                rightThreshold={rightSwipeEnabled ? 200 : 99999} // Very high threshold to effectively disable
                leftThreshold={leftSwipeEnabled ? 200 : 99999}   // Very high threshold to effectively disable
                renderRightActions={rightSwipeEnabled ? RightAction : undefined}
                renderLeftActions={leftSwipeEnabled ? LeftAction : undefined}
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
        backgroundColor: 'green',
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