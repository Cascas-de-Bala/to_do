import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import styles from '../Styles/Todas.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskLocation, setTaskLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      time: taskTime,
      location: taskLocation,
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle('');
    setTaskTime('');
    setTaskLocation('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskTime}>{item.time}</Text>
            <Text style={styles.taskLocation}>{item.location}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Novo Lembrete</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Tempo"
            value={taskTime}
            onChangeText={setTaskTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Local"
            value={taskLocation}
            onChangeText={setTaskLocation}
          />
          <View style={styles.buttonContainer}>
            <Button title="Adicionar" onPress={handleAddTask} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
