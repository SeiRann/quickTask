import { Task } from '@/components/Task';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface TaskItem {
  taskId: string;
  taskText: string;
  taskStatus: TaskStatus;
  taskDeadline: Date;
}

enum TaskStatus{
  completed="completed",
  late="late",
  uncompleted="uncompleted",
  failed="failed"
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([

  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(true);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());


  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: TaskItem = {
        taskId: Date.now().toString(),
        taskText: newTaskText,
        taskDeadline: new Date(date.getFullYear(), date.getMonth(), date.getDay(), time.getHours(), time.getMinutes()),
        taskStatus: TaskStatus.uncompleted,
      };
      // console.log(newTask.taskDeadline.getMonth().toString())
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setModalVisible(false);
    }
  };

  const onDateChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate:Date|undefined = selectedDate;
    setShowDatePicker(false);
    if (currentDate !== undefined){
      // console.log(currentDate.getMonth().toString())
      setDate(currentDate)
      setShowDatePicker(true)
    }
  };

  const onTimeChange = (event:DateTimePickerEvent, selectedTime:Date|undefined) => {
    const currentTime:Date|undefined = selectedTime;
    setShowTimePicker(false);
    if (currentTime !== undefined){
      // console.log(currentTime)
      setTime(currentTime)
      setShowTimePicker(true)
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.taskId !== taskId));
  };

  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task => 
        task.taskId === taskId 
            ? { ...task, taskStatus: TaskStatus.completed }
            : task
    ));
    console.log("completed task with id:", taskId);
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
                  value = {date}
                  mode={"date"}
                  is24Hour={false}
                  onChange = {onDateChange}
                />
              )}
              </View>
              <View style={styles.deadlineStyle}>
                <Text>Time deadline:</Text>
                {showTimePicker && (
                <DateTimePicker 
                  testID={"dateTimePicker"}
                  value={time}
                  mode={"time"}
                  is24Hour={false}
                  onChange = {onTimeChange}
                />
              )}
              </View>
              <Button title="Close" onPress={() => setModalVisible(false)} />
              <Button title="Add Task" onPress={addTask} />
            </View>
          </Modal>
          {/* <Button title='Add Task' onPress={() => setModalVisible(true)}/>    Need for web and android      */}  
          {tasks.map(task => (
            <Task
              key={task.taskId}
              taskText={task.taskText}
              taskDeadline={task.taskDeadline}
              taskStatus={task.taskStatus}
              onDelete={() => deleteTask(task.taskId)}
              onComplete={() => completeTask(task.taskId)}
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