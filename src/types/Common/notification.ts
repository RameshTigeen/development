export type NotificiationAdditionalData = {
  rental_id: string;
  target_user: 'renter' | 'host';
  action: 'rental_prepare' | 'rental_expired' | 'rental_confirmed' | 'rental_canceled' | 'rental_rating';
};

export type useNotificationProps = {
  event?: 'click' | 'foregroundWillDisplay';
  Callback: (data: NotificiationAdditionalData) => void;
  needInitialization?: boolean;
  deps?: React.DependencyList;
};
