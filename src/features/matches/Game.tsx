import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";

const Game = ({
                teamACode,
                teamAScore,
                teamAName,
                teamBCode,
                teamBScore,
                teamBName,
                dateTime,
                isInPast,
              }) => (
  <View style={styles.gameContainerStyle}>
    <View style={styles.teamRow}>
      <View style={styles.teamCircle}>
        <Text>{teamACode}</Text>
      </View>
      <View style={styles.filler} />
      <Text>{teamAName}</Text>
    </View>
    {isInPast && (
      <View style={styles.scoreRow}>
        <Text>{teamAScore}</Text>
        <Text>AT</Text>
        <Text>{teamBScore}</Text>
      </View>
    )}
    <View style={styles.teamRow}>
      <View style={styles.teamCircle}>
        <Text>{teamBCode}</Text>
      </View>
      <View style={styles.filler} />
      <Text>{teamBName}</Text>
    </View>
    {dateTime && (
      <View style={styles.timeContainer}>
        <View style={styles.timeView}>
          <Text>{dateTime}</Text>
        </View>
      </View>
    )}
  </View>
);

export default Game;

const screenPaddings = 16;
const listWidth = Dimensions.get('window').width - screenPaddings * 2;

const styles = StyleSheet.create({
  gameContainerStyle: {
    flexDirection: 'column',
    minWidth: listWidth,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
    marginBottom: 4,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filler: {
    width: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timeView: {
    height: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    paddingHorizontal: 4,
  },
});
