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

// const getSwipeRightFunction = (taskStatus:string, rightFunction: () => void) => {   //These are meant to determine if the task has already been completed and if it is then it can't be completed again
//     if (taskStatus === "uncompleted") return rightFunction                          //This could be used for whenever the task has been done to change the right/left function based on the task status
//     if (taskStatus === "failed") return undefined
//     if (taskStatus === "late") return undefined
//     if (taskStatus === "completed") return undefined
// }

// const getSwipeLeftFunction = (taskStatus:string, leftFunction: () => void) => {
//     if (taskStatus === "uncompleted") return leftFunction
//     if (taskStatus === "failed") return undefined
//     if (taskStatus === "late") return undefined
//     if (taskStatus === "completed") return undefined
// }

interface TaskItem {
  taskId: string;
  taskText: string;
  taskStatus: TaskStatus;
  taskType: TaskType;
}

interface DeadlineTaskItem extends TaskItem{
  taskDeadline: Date;
}

interface DailyTaskItem extends TaskItem{
  time:{
    hour: number
    minute: number
  }
}

enum TaskStatus{
  completed="completed",
  late="late",
  uncompleted="uncompleted",
  failed="failed"
}

type ScheduledTask = DailyTaskItem | DeadlineTaskItem

enum TaskType{
    daily="daily",
    deadline="deadline"
}

const getTaskInfo = (taskType:TaskType, taskDeadline?: Date) => {
    switch(taskType){
        case TaskType.deadline:{
            if(taskDeadline){
                return(
                    <Text>Deadline:  {(taskDeadline.getMonth()+1).toString()}/{taskDeadline.getDate().toString()}/{taskDeadline.getFullYear().toString()}  {taskDeadline.getHours().toString()}:{taskDeadline.getMinutes().toString()}</Text>
                )
            }
        }
    }
}


const Task = ({taskText,taskType,taskDeadline, taskStatus, onDelete, onComplete}:{taskText:string, taskType:TaskType,taskDeadline?:Date, taskStatus: string,onDelete: () => void, onComplete: () => void}) => {
    // const canDelete = taskStatus === "uncompleted" || taskStatus === "completed";
    // const canComplete = taskStatus === "uncompleted";
    
    //console.log(taskDeadline.getMonth().toString(),"/",taskDeadline.getDay().toString(),"/",taskDeadline.getFullYear().toString())
    return(
        <SwipeableWrapper functionSwipeLeft={onDelete} functionSwipeRight={onComplete}>
            <View style={getTaskStyle(taskStatus)}>
            <Text style={getTextTaskStyle(taskStatus)}>{taskText}</Text>
            
            <View style={styles.info}>
                {getTaskInfo(taskType, taskDeadline)}
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

export { Task, TaskType, TaskItem, DailyTaskItem, DeadlineTaskItem, ScheduledTask, TaskStatus };
