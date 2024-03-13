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
    marginTop: 170,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: 'lightblue',
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
  button_cat: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
  },
  atribuidoAMim: {
    backgroundColor: '#ADFAFF',
  },
  meuDia: {
    backgroundColor: '#FEFFC1',
  },
  planejado: {
    backgroundColor: '#BAFFC9',
  },
  importante: {
    backgroundColor: '#FFAFAF',
  },
  tarefas: {
    backgroundColor: '#EABCFF',
  },    
  modalContainer:{
    margin: 15,
    marginTop: 0
  },
});

export default styles;
