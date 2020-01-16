import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Circle, Column, Row} from '../../components';
import {Match} from './MatchesContainer';
import sizes from '../../styles/sizes';
import {Filler, Spacer} from '../../utils/uiUtils';
import moment from 'moment';
import colors from '../../styles/colors';
import {SvgUri} from 'react-native-svg';

const LogoAndText = (props: {
  code: string;
  city: string;
  name: string;
  uri: string;
}) => (
  <Column alignCenter style={styles.logoContainer}>
    <Circle size={60}>
      <SvgUri width={60} height={60} uri={props.uri} />
    </Circle>
    <Spacer h={10} />
    <Text style={styles.logoText}>{props.city}</Text>
    <Text style={styles.logoText}>{props.name}</Text>
  </Column>
);

const Score = (props: Match) => (
  <Row style={styles.scoreContainer}>
    <Text style={styles.scoreText}>{props.HomeTeamScore}</Text>
    <Text style={styles.scoreText}>:</Text>
    <Text style={styles.scoreText}>{props.AwayTeamScore}</Text>
  </Row>
);

const Game = (props: Match) => (
  <>
    <Column style={styles.gameContainer}>
      <Spacer h={16} />
      <Row alignCenter>
        <Filler />
        <LogoAndText
          code={props.HomeTeam}
          city={props.HomeTeamEntity.City}
          name={props.HomeTeamEntity.Name}
          uri={props.HomeTeamEntity.WikipediaLogoUrl}
        />
        <Filler />
        {props.IsClosed ? (
          <Score {...props} />
        ) : (
          <Text style={styles.scoreText}>VS</Text>
        )}
        <Filler />
        <LogoAndText
          code={props.AwayTeam}
          city={props.AwayTeamEntity.City}
          name={props.AwayTeamEntity.Name}
          uri={props.AwayTeamEntity.WikipediaLogoUrl}
        />
        <Filler />
      </Row>
    </Column>
    <Row style={styles.gameStatusContainer}>
      <Text style={styles.gameStatusText}>{props.IsClosed ? 'FINISHED' : 'NOT FINISHED'}</Text>
      <Column style={styles.gameDateContainer}>
        <Text style={styles.gameDateText}>
          {moment(props.DateTime).format('MM/DD/YY')}
        </Text>
        <Text style={styles.gameDateText}>
          {moment(props.DateTime).format('h:mm A')}
        </Text>
      </Column>
    </Row>
  </>
);

export default Game;

const styles = StyleSheet.create({
  logoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  logoContainer: {minWidth: 80},
  scoreContainer: {
    backgroundColor: colors.accentColor,
    paddingHorizontal: sizes.halfPadding,
    borderRadius: sizes.borderRadius,
  },
  gameContainer: {
    borderRadius: sizes.borderDoubleRadius,
    borderWidth: 1,
    borderColor: colors.shadowColor,
    padding: sizes.padding,
  },
  gameStatusContainer: {marginHorizontal: sizes.padding},
  gameDateContainer: {
    backgroundColor: colors.accentColor,
    paddingHorizontal: sizes.padding,
    paddingVertical: 4,
    borderBottomLeftRadius: sizes.halfPadding,
    borderBottomRightRadius: sizes.halfPadding,
  },
  gameDateText: {color: colors.baseColor, fontWeight: 'bold'},
  gameStatusText: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: colors.baseColor,
    color: 'white',
    height: 30,
    borderBottomLeftRadius: sizes.borderDoubleRadius,
    fontWeight: 'bold',
    fontSize: 16,
    textAlignVertical: 'center',
  },
});
