import React from 'react';
import {View, Image, Pressable, useWindowDimensions} from 'react-native';

import Button from '../../../Components/Button';
import AppText from '../../../Components/AppText';

import useTheme from '../../../Hook/Utility/useTheme';

import {DateUtils} from '../../../Helper/DateUtil';
import {ModerateScale} from '../../../Config/Theme';

import type {RenterReservationData} from '../../../types/Reservation/RenterReservation';

export default function RentalsRenderItem({
  item,
  callback,
}: {
  item: RenterReservationData;
  callback: (id: number) => void;
}) {
  const Theme = useTheme();
  const {width} = useWindowDimensions();
  const isCanceled = Boolean(item.is_canceled);
  const isUpcomingRecords = new Date(item.start_date) >= new Date();

  return (
    <Pressable
      style={{
        height: width / 2.5,
        backgroundColor: Theme.colors.light,
        gap: ModerateScale(5),
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingHorizontal: ModerateScale(10),
      }}
      onPress={() => callback(item.id)}
      key={item.id}>
      <Button
        style={{
          zIndex: 1,
          position: 'absolute',
          top: ModerateScale(8),
          right: ModerateScale(8),
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: ModerateScale(35),
          borderRadius: ModerateScale(6),
          paddingHorizontal: ModerateScale(12),
          display: isUpcomingRecords || isCanceled ? 'flex' : 'none',
        }}
        fontSize={ModerateScale(10)}
        textColor={Theme.colors.light}
        color={item.status.color_code}
        text={item?.status?.name ?? ''}
      />

      <View style={{flex: 1, gap: ModerateScale(5)}}>
        <AppText numberOfLines={2} variant="bodyLarge" mode="bold">
          {item?.listing?.name ?? ''}
        </AppText>

        <View>
          <AppText numberOfLines={1} variant="labelMedium" color={Theme.colors.primary}>
            {DateUtils.formatDate(new Date(item?.start_date ?? new Date()), 'MMMM DD, YYYY')}
            {' - '}
            {DateUtils.formatDate(new Date(item?.start_date ?? new Date()), 'hh:mm A')}
          </AppText>
        </View>

        <View>
          <AppText numberOfLines={1} variant="labelMedium" color={Theme.colors.dark}>
            {item?.course?.name ?? ''}
          </AppText>
          <AppText numberOfLines={1} variant="bodySmall" color={Theme.colors.dark}>
            {item?.course?.line_1 ?? ''}
          </AppText>
          <AppText numberOfLines={1} variant="bodySmall" color={Theme.colors.dark}>
            {item.course?.line_2 ?? ''}
          </AppText>
        </View>
      </View>
      <Image
        resizeMode="cover"
        source={{uri: item?.listing?.image}}
        style={{width: width / 2.5, borderRadius: ModerateScale(10)}}
      />
    </Pressable>
  );
}
