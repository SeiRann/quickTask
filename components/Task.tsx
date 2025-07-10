import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import SwipeableWrapper from "./SwipeableWrapper";


const Task = ({taskText,taskDeadline, onDelete}:{taskText:string, taskDeadline:Date,onDelete: () => void}) => {

    //console.log(taskDeadline.getMonth().toString(),"/",taskDeadline.getDay().toString(),"/",taskDeadline.getFullYear().toString())
    return(
        <SwipeableWrapper functionSwipeLeft={onDelete}>
            <View style={styles.container}>
            <Text>{taskText}</Text>
            
            <View style={styles.rightSide}>
                <Text>Deadline:  {(taskDeadline.getMonth()+1).toString()}/{taskDeadline.getDay().toString()}/{taskDeadline.getFullYear().toString()}  {taskDeadline.getHours().toString()}:{taskDeadline.getMinutes().toString()}</Text>    
            </View>
        </View>
        </SwipeableWrapper>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "black",
        justifyContent:"space-between",
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightSide:{
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"space-around"
    }
})

export { Task };
