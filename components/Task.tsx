import { Text } from "@react-navigation/elements";
import { Button, View } from "react-native";

import { StyleSheet } from "react-native";

const Task = ({taskText,taskDeadline, onDelete}:{taskText:String, taskDeadline:Date,onDelete: () => void}) => {

    //console.log(taskDeadline.getMonth().toString(),"/",taskDeadline.getDay().toString(),"/",taskDeadline.getFullYear().toString())
    return(
        <View style={styles.container}>
            <Text>{taskText}</Text>
            
            <View style={styles.rightSide}>
                <Text>Deadline:  {(taskDeadline.getMonth()+1).toString()}/{taskDeadline.getDay().toString()}/{taskDeadline.getFullYear().toString()}  {taskDeadline.getHours().toString()}:{taskDeadline.getMinutes().toString()}</Text>
                <Button title={"Delete"} onPress={onDelete}/>        
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
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
