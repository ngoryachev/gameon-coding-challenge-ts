import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Image,
  Dimensions,
} from 'react-native';

const matches = require('./matches');
const teams = require('./teams');

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

const Title = ({title}) => (
  <View style={styles.titleStyle}>
    <Text>{title}</Text>
  </View>
);

const now = new Date();

const teamsAsHash = teams.reduce((memo, item) => {
  memo[item.TeamID] = item;
  return memo;
}, {});

const matchesWithTeams = matches.map(match => ({
  ...match,
  AwayTeamEntity: teamsAsHash[match.AwayTeamID],
  HomeTeamEntity: teamsAsHash[match.HomeTeamID],
  isInPast: match => new Date(match.DateTime) < now,
}));

const pastMatches = matchesWithTeams.filter(({isInPast}) => isInPast);
const upcomingMatches = matchesWithTeams.filter(({isInPast}) => !isInPast);

const data = [
  {
    title: 'Past',
    data: pastMatches,
  },
  {
    title: 'Upcoming',
    data: upcomingMatches,
  },
];

export default class Matches extends React.Component {
  renderItem = ({
    item: {
      AwayTeamScore,
      HomeTeamScore,
      DateTime,
      AwayTeam,
      HomeTeam,
      AwayTeamEntity: {Name: AwayTeamName},
      HomeTeamEntity: {Name: HomeTeamName},
      isInPast,
    },
  }) => (
    <Game
      dateTime={new Date(DateTime).toDateString()}
      teamACode={HomeTeam}
      teamBCode={AwayTeam}
      teamAScore={HomeTeamScore}
      teamBScore={AwayTeamScore}
      teamAName={HomeTeamName}
      teamBName={AwayTeamName}
      isInPast={isInPast}
    />
  );

  renderSectionHeader = ({section: {title}}) => <Title title={title} />;

  renderListHeaderComponent = ({}) => (
    <Image
      source={require('../../../assets/gameon_coding_challenge.png')}
      resizeMode="contain"
      style={styles.headerComponentStyle}
    />
  );

  keyExtractor = item => item.GameID;

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={data}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderListHeaderComponent}
        />
      </SafeAreaView>
    );
  };
}

const screenPaddings = 16;
const listWidth = Dimensions.get('window').width - screenPaddings * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  titleStyle: {
    minWidth: listWidth,
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  headerComponentStyle: {
    width: listWidth,
    height: listWidth * 0.65,
    marginTop: 44,
  },
});
