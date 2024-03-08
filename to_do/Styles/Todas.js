import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 50,
      margin: 0,
    },
    title: {
      marginTop: 45,
      marginBottom: 15,
      fontSize: 24,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderWidth: 0,
      marginBottom: 10,
      paddingHorizontal: 10,
      fontSize: 20,
    },
    buttonContainer: {
      marginTop: 150,
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
    // taskContainer: {
      
    // },
    
    // adicione estes estilos
    atribuidoAMim: {
      backgroundColor: 'lightblue',
    },
    meuDia: {
      backgroundColor: 'lightyellow',
    },
    planejado: {
      backgroundColor: 'lightgreen',
    },
    importante: {
      backgroundColor: 'lightcoral',
    },
    tarefas: {
      backgroundColor: 'plum',
    },    
    modalContainer:{
      margin: 15,
      marginTop: 0
    }
  });

  

  export default styles;