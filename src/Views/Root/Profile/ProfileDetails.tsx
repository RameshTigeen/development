import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import Button from '../../../Components/Button';
import Rating from '../../../Components/Rating';
import AppText from '../../../Components/AppText';

import useTheme from '../../../Hook/Utility/useTheme';

import {Fonts, ModerateScale} from '../../../Config/Theme';

import type {Renter} from '../../../types/Root/Profile';

export default function ProfileDetails({data}: {data: Renter | null}) {
  const Theme = useTheme();

  const profilePicture = React.useMemo(() => data?.image || data?.default_image, [data]);

  const KeyValuePair = React.useCallback(
    ({header, value}: {header: string; value: string}) => {
      return (
        <View style={style.SmallDetails}>
          <AppText color={Theme.colors.light} style={style.SmallDetailsText}>
            {header}
          </AppText>
          <AppText color={Theme.colors.light} numberOfLines={1} style={style.SecondaryText}>
            {value || ''}
          </AppText>
        </View>
      );
    },
    [data],
  );

  return (
    <View style={style.ProfileDescriptionContainer}>
      {profilePicture && (
        <Image
          style={{
            height: ModerateScale(180),
            width: ModerateScale(130),
            borderRadius: ModerateScale(5),
            overflow: 'hidden',
          }}
          resizeMode={'cover'}
          source={{
            uri: profilePicture ?? '',
          }}
        />
      )}
      <View style={style.DetailsContainer}>
        <View style={style.PrimeTextContainer}>
          <AppText color={Theme.colors.light} numberOfLines={1} mode={'bold'} style={style.PrimeText}>
            {data?.first_name ?? ''}
          </AppText>
          <AppText color={Theme.colors.light} numberOfLines={1} mode={'bold'} style={style.PrimeText}>
            {data?.last_name ?? ''}
          </AppText>
        </View>

        <View style={style.DetailsTextContainer}>
          <KeyValuePair key="Home Town" header="Home Town" value={data?.home_town ?? ''} />
          <KeyValuePair key="Club" header="Club" value={data?.club?.name || ''} />
          <KeyValuePair key="Favorite Course" header="Favorite Course" value={data?.course?.name || ''} />
          <KeyValuePair key="Handicap" header="Handicap" value={data?.handicap ?? ''} />
        </View>
        <View
          style={[
            style.SmallDetails,
            {
              alignItems: 'center',
              marginTop: ModerateScale(5),
              gap: ModerateScale(10),
              display: data?.user_type != 'user' ? 'flex' : 'none',
            },
          ]}>
          <Button
            text={data?.host_verified ? 'Host' : 'Renter'}
            variant="light"
            style={{
              height: ModerateScale(25),
              marginTop: ModerateScale(2),
            }}
            textStyle={{
              fontFamily: Fonts.bold.primary,
            }}
          />
          {Boolean(data?.rating) ? (
            <Rating size={ModerateScale(13)} inactiveColor={Theme.colors.warning} total={5} value={data?.rating ?? 0} />
          ) : (
            <AppText color={Theme.colors.light} numberOfLines={1} style={style.SecondaryText}>
              {'No Ratings Yet.'}
            </AppText>
          )}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  ProfileDescriptionContainer: {
    flexDirection: 'row',
    gap: ModerateScale(15),
  },
  DetailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    gap: ModerateScale(5),
  },
  DetailsTextContainer: {
    gap: ModerateScale(2),
  },
  SmallDetails: {
    gap: ModerateScale(5),
    width: '100%',
    flexDirection: 'row',
  },

  Logo: {
    height: '100%',
    width: '100%',
    borderRadius: ModerateScale(8),
  },
  PrimeTextContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  PrimeText: {
    fontSize: ModerateScale(25),
    lineHeight: ModerateScale(30),
  },
  SmallDetailsText: {
    fontSize: ModerateScale(14),
    width: ModerateScale(105),
  },
  SecondaryText: {
    fontSize: ModerateScale(14),
    flex: 1,
  },
});
