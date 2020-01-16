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
import Game from './Game';
import {Match} from './MatchesContainer';
import {Spacer} from '../../utils/uiUtils';
import sizes from '../../styles/sizes';
import * as R from 'ramda';
import colors from '../../styles/colors';

const Title = ({title}) => (
  <View style={styles.titleStyle}>
    <Text style={{color: colors.textColor, fontSize: 14, fontWeight: 'bold'}}>
      {title}
    </Text>
  </View>
);

type MatchesProps = {
  data: Array<{
    title: string;
    data: Array<Match>;
  }>;
};

export default class Matches extends React.Component<MatchesProps> {
  renderItem = ({item}) => <Game {...item} />;

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
          ItemSeparatorComponent={R.always(<Spacer h={sizes.padding} />)}
          SectionSeparatorComponent={R.always(<Spacer h={sizes.padding} />)}
        />
      </SafeAreaView>
    );
  };
}

const listWidth = Dimensions.get('window').width - sizes.padding * 2;

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
    borderColor: colors.shadowColor,
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
