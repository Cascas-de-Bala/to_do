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
  const [longitude, setLongitude] = useState(null); // Estado adicionado para armazenar os valores de latitude e longitude


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
  const [filter, setFilter] = useState('Todos'); // Novo estado para o filtro

  const categoryColors = { // Mapeamento de categorias para cores
    'Atribuído a Mim': '#ADFAFF',
    'Meu Dia': '#FEFFC1',
    'Planejado': '#BAFFC9',
    'Importante': '#FFAFAF',
    'Tarefas': '#EABCFF',
    'Todos': '#DDDDDD'
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
      color: categoryColors[taskCategory], // Adicione a cor aqui
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

  const handleFilter = (category) => { // Nova função para lidar com o filtro
    setFilter(category);
  };

  const filteredTasks = tasks.filter(task => { // Filtrar as tarefas com base no filtro atual
    if (filter === 'Todos') {
      return true;
    }
    return task.category === filter;
  });

  // Ordenar as tarefas filtradas por data e hora
  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate(), a.time.getHours(), a.time.getMinutes());
    const dateB = new Date(b.date.getFullYear(), b.date.getMonth(), b.date.getDate(), b.time.getHours(), b.time.getMinutes());
    return dateB - dateA;
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
        timeInterval: 1000,  // Atualizar a localização a cada 1 segundo
        distanceInterval: 1  // Ou sempre que o dispositivo se mover 1 metro
      }, (location) => {
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.021,
        });
        setLatitude(location.coords.latitude); // Salvando a latitude
        setLongitude(location.coords.longitude); // Salvando a longitude
      });

      // Não se esqueça de parar de observar a localização quando o componente for desmontado
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

    // Salvando os valores de latitude e longitude
    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);

    // Corrected logging
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
        <TouchableOpacity style={[styles.button_cat, {backgroundColor: categoryColors['Atribuído a Mim']}]} onPress={() => handleFilter('Atribuído a Mim')}>
          <Text style={styles.buttonText}>Atribuído a Mim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, {backgroundColor: categoryColors['Meu Dia']}]} onPress={() => handleFilter('Meu Dia')}>
          <Text style={styles.buttonText}>Meu Dia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, {backgroundColor: categoryColors['Planejado']}]} onPress={() => handleFilter('Planejado')}>
          <Text style={styles.buttonText}>Planejado</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity style={[styles.button_cat, {backgroundColor: categoryColors['Importante']}]} onPress={() => handleFilter('Importante')}>
          <Text style={styles.buttonText}>Importante</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_cat, {backgroundColor: categoryColors['Tarefas']}]} onPress={() => handleFilter('Tarefas')}>
          <Text style={styles.buttonText}>Tarefas</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={[styles.button_cat, {backgroundColor: categoryColors['Todos']}]} onPress={() => handleFilter('Todos')}> 
          <Text style={styles.buttonText}>Todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedTasks} // Use as tarefas ordenadas aqui
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.taskContainer,
              { backgroundColor: item.color }, // Use a cor aqui
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
                style={{width: '100%',
                height: 200,}}
                initialRegion={location}
                onPress={onMapPress} // Adicione o manipulador de eventos onPress aqui
              >
                {markerLocation && (
                  <Marker
                    coordinate={markerLocation}
                    title="Novo Marcador"
                  />
                )}
              </MapView>
            )}
            {markerLocation ? (
              <Text style={styles.input}>
                Latitude: {latitude}, Longitude: {longitude}
              </Text>
            ) : (
              <Text style={styles.input}>
                Selecione uma localização no mapa.
              </Text>
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
