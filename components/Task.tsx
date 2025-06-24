import { Text } from "@react-navigation/elements";
import { Button, View } from "react-native";

import { StyleSheet } from "react-native";

const Task = ({taskText, onDelete}:{taskText:String, onDelete: () => void}) => {
    return(
        <View style={styles.container}>
            <Text>{taskText}</Text>
            <Button title={"Delete"} onPress={onDelete}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export { Task };
