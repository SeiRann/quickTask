import { Task, TaskType } from '@/components/Task';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Second, call scheduleNotificationAsync()
Notifications.scheduleNotificationAsync({
  content: {
    title: 'Look at that notification',
    body: "I'm so proud of myself!",
    sound: "default",
  },                    //TODO make the deadline and daily notifications
  trigger:{
    type: SchedulableTriggerInputTypes.DAILY,
    hour:8,
    minute:2
  },
});


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

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<ScheduledTask[]>([

  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(true);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(()=>{
    if(selectedIndex === 1){
      setShowDatePicker(false)
    } else {
      setShowDatePicker(true)
    }
  },[selectedIndex])

  const addTask = () => {
    if (newTaskText.trim()) {
      switch(selectedIndex){
        case 0:
          const newDeadlineTask: DeadlineTaskItem = {
            taskId: Date.now().toString(),
            taskText: newTaskText,
            taskType: TaskType.deadline,
            taskDeadline: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
            taskStatus: TaskStatus.uncompleted,
          };
          // console.log(newTask.taskDeadline.getMonth().toString())
          setTasks([...tasks, newDeadlineTask]);
          setNewTaskText('');
          setModalVisible(false);
          Notifications.scheduleNotificationAsync({
          content: {
            title: 'Reminder',
            body: newTaskText,
            sound: "default",
          },                    //TODO make the deadline and daily notifications
          trigger:{
            type: SchedulableTriggerInputTypes.DATE,
            date: newDeadlineTask.taskDeadline
          },
        });
          break
        case 1:
          const newDailyTask: DailyTaskItem = {
            taskId: Date.now().toString(),
            taskText: newTaskText,
            taskType: TaskType.daily,
            time:{
              hour: time.getHours(),
              minute: time.getMinutes(),
            },
            taskStatus: TaskStatus.uncompleted,
          };
          // console.log(newTask.taskDeadline.getMonth().toString())
          setTasks([...tasks, newDailyTask]);
          setNewTaskText('');
          setModalVisible(false);
          Notifications.scheduleNotificationAsync({
          content: {
            title: 'Reminder',
            body: newTaskText,
            sound: "default",
          },                    
          trigger:{
            type: SchedulableTriggerInputTypes.DAILY,
            hour: newDailyTask.time.hour,
            minute: newDailyTask.time.minute
          }})
          break
      }
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
    // console.log("completed task with id:", taskId);
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
              <SegmentedControl
                values={['Deadline', 'Daily']}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                  setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                appearance="dark"
                style={styles.segmentedControl}
              />
              {showDatePicker && (
                <View style={styles.deadlineStyle}>
                  <Text>Date deadline:</Text>
                  <DateTimePicker 
                    testID={"dateTimePicker"}
                    value = {date}
                    mode={"date"}
                    is24Hour={false}
                    onChange = {onDateChange}
                  />
                </View>
              )}
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
              taskDeadline={"taskDeadline" in task ? task.taskDeadline: undefined}
              taskType={task.taskType}
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
  },
  segmentedControl:{
    backgroundColor: "grey",
    height: 50,
    width: 200,
    borderRadius: 5
  }
});