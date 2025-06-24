import { Task } from '@/components/Task';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface TaskItem {
  taskId: string;
  taskText: string;
  taskDeadline: Date;
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());



  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: TaskItem = {
        taskId: Date.now().toString(),
        taskText: newTaskText,
        taskDeadline: new Date(date.getDate() ,time.getTime())
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setModalVisible(false);
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.taskId !== taskId));
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={styles.newNote}>+</Text>
            </Pressable>
          )
        }}
      />
      <View style={styles.mainView}>
        <ScrollView>
          <Modal
            animationType="fade"
            visible={modalVisible}
            transparent={false}
            
          >
            <View style={styles.newTaskModal}>
              <Text>New Task</Text>
              <TextInput 
                value={newTaskText}
                onChangeText={setNewTaskText}
                style={styles.newTaskInput}
              />
              <View style={styles.deadlineStyle}>
                <Text>Date deadline:</Text>
                {showDatePicker && (
                <DateTimePicker 
                  testID={"dateTimePicker"}
                  value={date}
                  mode={"date"}
                  is24Hour={false}
                />
              )}
              </View>
              <View style={styles.deadlineStyle}>
                <Text>Time deadline:</Text>
                {showDatePicker && (
                <DateTimePicker 
                  testID={"dateTimePicker"}
                  value={time}
                  mode={"time"}
                  is24Hour={false}
                />
              )}
              </View>
              <Button title="Close" onPress={() => setModalVisible(false)} />
              <Button title="Add Task" onPress={addTask} />
            </View>
          </Modal>
          
          {tasks.map(task => (
            <Task
              key={task.taskId}
              taskText={task.taskText}
              onDelete={() => deleteTask(task.taskId)}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 100,
  },
  newNote:{
    fontSize:36,
    color:"white",
    alignContent:"center",
    justifyContent:"center",
    textAlign:"center"
  },
  newTaskModal:{
    marginTop: 300,
    alignItems:"center",
    justifyContent:'center'
  },
  newTaskInput:{
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    paddingLeft: 10,
    width: 200,
    height: 50
  },
  deadlineStyle:{
    margin:5,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
});