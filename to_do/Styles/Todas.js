import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 50,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    taskContainer: {
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    taskTime: {
      fontSize: 16,
    },
    taskLocation: {
      fontSize: 16,
    },
    addButton: {
      backgroundColor: '#4CAF50',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 32,
    },
  });

  export default styles;