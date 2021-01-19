import { action, autorun, observable } from 'mobx';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AntDesignTestScreen } from './AntDesignTestScreen';

export class DemoScreen extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{map}</Text>
        <Text>{list}</Text>
        {/* <Text>{temperature}</Text> */}
        <AntDesignTestScreen />
      </View>
    );
  }
}

const map = observable.map({ key: 'value' });
map.set('key', 'new value');
// console.log(map);

const list = observable([1, 2, 4]);
list[2] = 3;
// console.log(list);

const temperature = observable.box(20);
temperature.set(25);
// console.log(temperature);
let person = observable.object(
  {
    // observable 属性:
    name: 'John',
    age: 42,
    showAge: false,

    // 计算属性:
    get labelText() {
      return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    },

    // 动作:
    setAge(age: number) {
      this.age = age;
    },
  },
  {
    setAge: action,
  },
);

autorun(() => console.log(person.labelText));
console.log(1);
person.showAge = true;
console.log(1);
person.name = 'Dave';
person.setAge(21);

// 数组
let todos = observable([
  { title: 'Spoil tea', completed: true },
  { title: 'Make coffee', completed: false },
]);

autorun(() => {
  console.log(
    'Remaining:',
    todos
      .filter(todo => !todo.completed)
      .map(todo => todo.title)
      .join(', '),
  );
});
// 输出: 'Remaining: Make coffee'

todos[0].completed = false;
// 输出: 'Remaining: Spoil tea, Make coffee'

todos[2] = { title: 'Take a nap', completed: false };
// 输出: 'Remaining: Spoil tea, Make coffee, Take a nap'

todos.shift();
// 输出: 'Remaining: Make coffee, Take a nap'
