export type useDateTimePickerHookProps = {
  initialStartDate: string;
  initialEndDate: string;
};

export type useDateTimePickerState = {
  showDateTimePicker: boolean;
  selectedStartDate: Date;
  selectedEndDate: Date;
  mode: 'time' | 'date';
  selectedDate: Date;
  pickingField: 'startDate' | 'endDate' | 'startTime' | 'endTime' | null;
};

export type PickerFieldType = 'startTime' | 'endTime' | 'startDate' | 'endDate' | null;
