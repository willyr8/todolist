import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>(''); // State untuk menyimpan input
  const [todo, setTodo] = useState<any[]>([
    {
      id: 1,
      title: 'Kuliah',
      completed: false,
    },
    {
      id: 2,
      title: 'Belajar React Native',
      completed: false,
    },
    {
      id: 3,
      title: 'Lulus',
      completed: false,
    },
    {
      id: 4,
      title: 'Kerja',
      completed: false,
    },
  ]);
  const [editId, setEditId] = useState<number | null>(null); // State untuk menyimpan id yang sedang diedit

  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }

    // Jika sedang edit, update to-do yang sedang diedit
    if (editId !== null) {
      const updatedTodos = todo.map(item =>
        item.id === editId ? {...item, title} : item,
      );
      setTodo(updatedTodos);
      setEditId(null); // Reset edit mode
    } else {
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: false,
      };
      setTodo([...todo, newTodo]);
    }

    setTitle(''); // Kosongkan input setelah menambah atau mengedit
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todo.filter(item => item.id !== id);
    setTodo(filteredTodos);
  };

  const handleEditTodo = (id: number, currentTitle: string) => {
    setTitle(currentTitle); // Masukkan nilai to-do yang diedit ke dalam input
    setEditId(id); // Set ID dari to-do yang sedang diedit
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}>
        <TextInput
          placeholder="Enter your todo"
          style={{
            flex: 1,
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}>
          <Text style={{color: 'white'}}>
            {editId !== null ? 'Edit Todo' : 'Add Todo'}
          </Text>
        </Pressable>
      </View>

      {todo.map(item => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          }}>
          <Text style={{fontSize: 18, color: 'black'}}>{item.title}</Text>

          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              style={{backgroundColor: 'green', padding: 5, borderRadius: 5}}
              onPress={() => handleEditTodo(item.id, item.title)}>
              <Text style={{color: 'white'}}>Edit</Text>
            </Pressable>

            <Pressable
              style={{backgroundColor: 'red', padding: 5, borderRadius: 5}}
              onPress={() => handleDeleteTodo(item.id)}>
              <Text style={{color: 'white'}}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TodoList;
