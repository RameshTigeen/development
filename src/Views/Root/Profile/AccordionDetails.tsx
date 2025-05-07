import React from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';

import AppText from '../../../Components/AppText';

import Accordion from '../../../@Library/Components/Accordion';

import useTheme from '../../../Hook/Utility/useTheme';

import {ModerateScale} from '../../../Config/Theme';

import {DateUtils} from '../../../Helper/DateUtil';

import type {RenterReservationData} from '../../../types/Reservation/RenterReservation';

export default function AccordionDetails({
  data,
  emptyText,
  hidden = false,
  loading = false,
  headerText,
  OnSuccess,
  OnCallback,
}: {
  loading?: boolean;
  data: RenterReservationData[];
  emptyText: string;
  headerText: string;
  OnSuccess: () => void;
  OnCallback: (id: number) => void;
  hidden: boolean;
}) {
  const Theme = useTheme();
  const RentalRenderItem = ({item}: {item: RenterReservationData}) => {
    return (
      <Pressable
        onPress={() => OnCallback(item.id)}
        style={{
          width: '100%',
          alignItems: 'flex-start',
          height: ModerateScale(60),
          gap: ModerateScale(2),
          paddingHorizontal: ModerateScale(10),
          borderRadius: ModerateScale(5),
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, gap: ModerateScale(2)}}>
            <AppText color={Theme.colors.light} mode="black" size={ModerateScale(14)} numberOfLines={1}>
              {item?.listing?.name ?? ''}
            </AppText>
            <AppText color={Theme.colors.light} numberOfLines={1} mode="bold" size={ModerateScale(10)}>
              {DateUtils.formatDate(new Date(item?.start_date ?? new Date()), 'MMMM DD, YYYY')}
              {'  '}
              {DateUtils.formatDate(new Date(item?.start_date ?? new Date()), 'hh:mm A')}
            </AppText>
            <AppText color={Theme.colors.light} numberOfLines={1} mode="bold" size={ModerateScale(11)}>
              {item?.course?.name ?? ''}
              {', '}
              {item?.course?.line_2 ?? ''}
            </AppText>
            {/* <Rating
              inactiveColor={Theme.colors.warning}
              size={ModerateScale(12)}
              total={5}
              value={item?.rating ?? 5}
              showRating={false}
            /> */}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <Accordion
      emptyText={emptyText}
      headerText={headerText}
      accordionContainerStyles={{display: !hidden ? 'flex' : 'none'}}>
      {data.length <= 0 || loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: ModerateScale(80),
          }}>
          {loading ? (
            <ActivityIndicator color={Theme.colors.light} size={ModerateScale(25)} />
          ) : (
            <AppText
              mode="bold"
              size={ModerateScale(12)}
              style={[
                {
                  color: Theme.colors.light,
                },
              ]}>
              {emptyText}
            </AppText>
          )}
        </View>
      ) : (
        <View style={{gap: ModerateScale(10)}}>
          {data.slice(0, 3).map((item, index) => {
            return <RentalRenderItem item={item} key={index} />;
          })}
        </View>
      )}
      {data.length > 3 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: ModerateScale(50),
          }}>
          <AppText
            onPress={OnSuccess}
            mode="bold"
            size={ModerateScale(10)}
            style={[
              {
                backgroundColor: Theme.colors.light,
                color: Theme.colors.dark,
                borderRadius: ModerateScale(15),
                padding: ModerateScale(8),
                paddingHorizontal: ModerateScale(15),
              },
            ]}>
            Show more
          </AppText>
        </View>
      )}
    </Accordion>
  );
}
