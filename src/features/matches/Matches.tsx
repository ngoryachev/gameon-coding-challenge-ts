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
import Game from "./Game";
import {Match} from "./MatchesContainer";

const Title = ({title}) => (
  <View style={styles.titleStyle}>
    <Text>{title}</Text>
  </View>
);

type MatchesProps = {
  data: Array<{
    title: string;
    data: Array<Match>;
  }>;
};

export default class Matches extends React.Component<MatchesProps> {
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

  renderSectionHeader = ({section: item}) => <Title title={item.title} />;

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
          sections={this.props.data}
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
