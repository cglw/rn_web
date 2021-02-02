import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  teacherName?: string;
  levelName?: string;
  photo?: string;
  introduction?: string;
};

export class TeacherComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.con}>
          {this.props.photo ? (
            <Image
              source={{ uri: this.props.photo }}
              style={{
                width: 70,
                height: 70,
                marginRight: 18,
                borderRadius: 100,
              }}
            />
          ) : null}
          <View style={styles.textInfo}>
            <Text
              style={{
                color: '#333333',
                fontSize: 15,
                fontWeight: '600',
                marginTop: 6.5,
              }}>
              {this.props.teacherName}
              <Text
                style={{
                  color: '#C69C41',
                  fontSize: 11,
                  marginLeft: 10,
                  fontWeight: 'normal',
                  borderWidth: 0.5,
                  borderColor: '#C69C41',
                  paddingRight: 6,
                  paddingLeft: 6,
                  borderRadius: 3,
                }}>
                {this.props.levelName}
              </Text>
            </Text>
            <Text style={{ color: '#999999', fontSize: 11, marginTop: 11 }}>
              {this.props.introduction}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: 'white',
    marginBottom: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  con: {
    flexDirection: 'row',
  },
  textInfo: {},
});
