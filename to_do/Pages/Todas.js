import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../Styles/Todas.js';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { getLatitude } from '../Components/mapa.js';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function App() {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [taskLocation, setTaskLocation] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState('Pendentes'); // Alterado de 'Todos' para 'Pendentes'

  const categoryColors = {
    'Atribuído a Mim': '#ADFAFF',
    'Meu Dia': '#FEFFC1',
    'Planejado': '#BAFFC9',
    'Importante': '#FFAFAF',
    'Tarefas': '#EABCFF',
    'Pendentes': '#DDDDDD', // Alterado de 'Todos' para 'Pendentes'
    'Concluído': '#D3D3D3'
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      date: taskDate,
      time: taskTime,
      location: taskLocation,
      category: taskCategory,
      color: categoryColors[taskCategory],
      completed: false,
    };

    if (isEditing) {
      setTasks(tasks.map(task => selectedTasks.includes(task.id) ? newTask : task));
      setIsEditing(false);
      setSelectedTasks([]);
    } else {
      setTasks([newTask, ...tasks]);
    }

    setTaskTitle('');
    setTaskDate(new Date());
    setTaskTime(new Date());
    setTaskLocation('');
    setTaskCategory('');
    setModalVisible(false);
  };

  const handleSelectTask = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const handleEditTask = (task) => {
    setTaskTitle(task.title);
    setTaskDate(task.date);
    setTaskTime(task.time);
    setTaskLocation(task.location);
    setTaskCategory(task.category);
    setSelectedTasks([task.id]);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDeleteTasks = () => {
    setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || taskDate;
    setDatePickerVisible(Platform.OS === 'ios');
    setTaskDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || taskTime;
    setTimePickerVisible(Platform.OS === 'ios');
    setTaskTime(currentTime);
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pendentes') {
      return !task.completed;
    } else if (filter === 'Concluído') {
      return task.completed;
    }
    return task.category === filter && !task.completed; // Adicionado !task.completed para excluir tarefas concluídas
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate(), a.time.getHours(), a.time.getMinutes());
    const dateB = new Date(b.date.getFullYear(), b.date.getMonth(), b.date.getDate(), b.time.getHours(), b.time.getMinutes());
    return dateA - dateB;
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      let locationWatcher = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1
      }, (location) => {
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.021,
        });
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      });

      return () => {
        locationWatcher.remove();
      };
    })();
  }, []);

  const onMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setMarkerLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0921,
    });

    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);

    console.log('Novo valor de markerLocation:', {
      latitudeValue: coordinate.latitude,
      longitudeValue: coordinate.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Configurações')}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Atribuído a Mim'] }]} onPress={() => handleFilter('Atribuído a Mim')}>
          <Text style={styles.buttonText}>Atribuído a Mim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Meu Dia'] }]} onPress={() => handleFilter('Meu Dia')}>
          <Text style={styles.buttonText}>Meu Dia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Planejado'] }]} onPress={() => handleFilter('Planejado')}>
          <Text style={styles.buttonText}>Planejado</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Importante'] }]} onPress={() => handleFilter('Importante')}>
          <Text style={styles.buttonText}>Importante</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Tarefas'] }]} onPress={() => handleFilter('Tarefas')}>
          <Text style={styles.buttonText}>Tarefas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Pendentes'] }]} onPress={() => handleFilter('Pendentes')}>
          <Text style={styles.buttonText}>Pendentes</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={[styles.button_cat, { backgroundColor: categoryColors['Concluído'] }]} onPress={() => handleFilter('Concluído')}>
          <Text style={styles.buttonText}>Concluído</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              style={[
                { backgroundColor: item.color },
                selectedTasks.includes(item.id) && styles.selectedTask,
              ]}
              onPress={() => handleEditTask(item)}
              onLongPress={() => handleSelectTask(item.id)}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDate}>{item.date.toLocaleDateString()}</Text>
              <Text style={styles.taskTime}>{item.time.toLocaleTimeString()}</Text>
              <Text style={styles.taskLocation}>{item.location}</Text>
            </TouchableOpacity>
            <Switch               value={item.completed}
              onValueChange={(newValue) => {
                setTasks(tasks.map(task => task.id === item.id ? {...task, completed: newValue} : task));
              }}
            />
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      {selectedTasks.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteTasks}
        >
          <Text style={styles.deleteButtonText}>Deletar selecionados</Text>
        </TouchableOpacity>
      )}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{isEditing ? 'Editar Lembrete' : 'Novo Lembrete'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <Text style={styles.input}>{taskDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {datePickerVisible && (
            <DateTimePicker
              testID="datePicker"
              value={taskDate}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
            <Text style={styles.input}>{taskTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {timePickerVisible && (
            <DateTimePicker
              testID="timePicker"
              value={taskTime}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
          <View>
              
            <Text style={styles.input}>Selecione a localização:</Text>
            {location && (
              <MapView
                style={{
                  width: '100%',
                  height: 200,
                }}
                initialRegion={location}
                onPress={onMapPress}
              >
                {markerLocation && (
                  <Marker
                    coordinate={markerLocation}
                    title="Novo Marcador"
                  />
                )}
              </MapView>
            )}
           
            
          </View>
          <Picker
            selectedValue={taskCategory}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setTaskCategory(itemValue)}
          >
            <Picker.Item label="Atribuído a Mim" value="Atribuído a Mim" />
            <Picker.Item label="Meu Dia" value="Meu Dia" />
            <Picker.Item label="Planejado" value="Planejado" />
            <Picker.Item label="Importante" value="Importante" />
            <Picker.Item label="Tarefas" value="Tarefas" />
          </Picker>
          <View style={styles.buttonContainer}>
            <Button title={isEditing ? 'Salvar' : 'Adicionar'} onPress={handleAddTask} />
            <Button title="Cancelar" onPress={() => {
              setModalVisible(false);
              setIsEditing(false);
              setSelectedTasks([]);
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
