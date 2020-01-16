import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Circle, Column, Row} from '../../components';
import {Match} from './MatchesContainer';
import sizes from '../../styles/sizes';
import {Filler, Spacer} from '../../utils/uiUtils';
import moment from 'moment';
import colors from '../../styles/colors';

const styleCode: any = {
  fontSize: 18,
  fontWeight: 'bold',
  color: colors.baseColor,
};
const style: any = {fontSize: 14, fontWeight: 'bold', color: colors.textColor};
const style_: any = {fontSize: 16, fontWeight: 'bold', color: colors.textColor};
const LogoAndText = (props: {code: string; city: string; name: string}) => (
  <Column alignCenter style={{minWidth: 80}}>
    <Circle size={60} borderColor={colors.shadowColor}>
      <Text style={styleCode}>{props.code}</Text>
    </Circle>
    <Spacer h={10} />
    <Text style={style}>{props.city}</Text>
    <Text style={style}>{props.name}</Text>
  </Column>
);

const Score = (props: Match) => (
  <Row
    style={{
      backgroundColor: colors.accentColor,
      paddingHorizontal: sizes.halfPadding,
      borderRadius: sizes.borderRadius,
    }}>
    <Text style={style_}>1</Text>
    <Text style={style_}>:</Text>
    <Text style={style_}>0</Text>
  </Row>
);

const Game = (props: Match) => (
  <>
    <Column
      style={{
        borderRadius: sizes.borderDoubleRadius,
        borderWidth: 1,
        borderColor: colors.shadowColor,
        padding: sizes.padding,
      }}>
      <Spacer h={16} />
      <Row alignCenter>
        <Filler />
        <LogoAndText
          code={props.HomeTeam}
          city={props.HomeTeamEntity.City}
          name={props.HomeTeamEntity.Name}
        />
        <Filler />
        {props.IsClosed ? <Score {...props} /> : <Text style={style_}>VS</Text>}
        <Filler />
        <LogoAndText
          code={props.AwayTeam}
          city={props.AwayTeamEntity.City}
          name={props.AwayTeamEntity.Name}
        />
        <Filler />
      </Row>
    </Column>
    <Row style={{marginHorizontal: sizes.padding}}>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          backgroundColor: colors.baseColor,
          color: 'white',
          height: 30,
          borderBottomLeftRadius: sizes.borderDoubleRadius,
          fontWeight: 'bold',
          fontSize: 16,
          textAlignVertical: 'center',
        }}>
        FINISHED
      </Text>
      <Column
        style={{
          backgroundColor: colors.accentColor,
          paddingHorizontal: sizes.padding,
          paddingVertical: 4,
          borderBottomLeftRadius: sizes.halfPadding,
          borderBottomRightRadius: sizes.halfPadding,
        }}>
        <Text style={{color: colors.baseColor, fontWeight: 'bold'}}>
          {moment(props.DateTime).format('MM/DD/YY')}
        </Text>
        <Text style={{color: colors.baseColor, fontWeight: 'bold'}}>
          {moment(props.DateTime).format('h:mm A')}
        </Text>
      </Column>
    </Row>
  </>
);

export default Game;

const styles = StyleSheet.create({});
