import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import SwipeableWrapper from "./SwipeableWrapper";


const getTaskStyle = (taskStatus:string) => {
    if (taskStatus === "completed") return styles.completedTask;
    if (taskStatus === "late") return styles.lateTask;
    if (taskStatus === "uncompleted") return styles.container;
    if (taskStatus === "failed") return styles.failedTask;
}

const getTextTaskStyle = (taskStatus:string) => {
    if (taskStatus === "completed") return styles.completedTaskText;
    if (taskStatus === "late") return styles.lateTaskText;
    if (taskStatus === "uncompleted") return undefined;
    if (taskStatus === "failed") return styles.failedTaskText;
}

const getSwipeRightFunction = (tastStatus:string) => {

} 
const Task = ({taskText,taskDeadline, taskStatus, onDelete, onComplete}:{taskText:string, taskDeadline:Date, taskStatus: string,onDelete: () => void, onComplete: () => void}) => {

    //console.log(taskDeadline.getMonth().toString(),"/",taskDeadline.getDay().toString(),"/",taskDeadline.getFullYear().toString())
    return(
        <SwipeableWrapper functionSwipeLeft={onDelete} functionSwipeRight={onComplete}>
            <View style={getTaskStyle(taskStatus)}>
            <Text style={getTextTaskStyle(taskStatus)}>{taskText}</Text>
            
            <View style={styles.info}>
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
    info:{
        alignItems:'center',
        flexDirection:"row",
        justifyContent:"space-around"
    },
    completedTask:{
        backgroundColor: "#3a5935",
        justifyContent:"space-between",
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    completedTaskText:{
        color:"#54e815",
    },
    lateTask:{
        backgroundColor: "#5c582c",
        justifyContent:"space-between",
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    lateTaskText:{
        color: "#c2b41b",
    },
    failedTask:{
        backgroundColor: "#571919",
        justifyContent:"space-between",
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    failedTaskText:{
        color: "#c21111",
    },
})

export { Task };
