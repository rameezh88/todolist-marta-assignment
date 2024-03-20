import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {Keyboard, Platform} from 'react-native';
import {Text} from 'react-native-paper';
import DateTimePickerDialog from '../DateTimePickerDialog';
import useHook from './hook';
import {Container, DateTimeEntryFieldWrapper} from './styles';
import {getTimeZone} from 'react-native-localize';

export interface DateTimeEntryProps {
  value?: Date | string | null;
  onValueChange?: (value: Date) => void;
}

const DateTimeEntry: React.FC<DateTimeEntryProps> = props => {
  // Hook for handling all the business logic
  const {
    datePickerValue,
    dateString,
    timeString,
    dateTimePickerVisible,
    dateTimePickerMode,
    handleOpenDateTimePicker,
    hideDialog,
    onDateValueSelected,
    onAndroidDatePickerChange,
  } = useHook(props);

  return (
    <Container onTouchStart={Keyboard.dismiss}>
      {/* Field to pick and show only the date */}
      <DateTimeEntryFieldWrapper
        onPress={() => {
          handleOpenDateTimePicker('date');
        }}>
        <Text variant="bodyLarge">{dateString}</Text>
      </DateTimeEntryFieldWrapper>
      {/* Field to pick and show only the time */}
      <DateTimeEntryFieldWrapper
        onPress={() => {
          handleOpenDateTimePicker('time');
        }}>
        <Text variant="bodyLarge">{timeString}</Text>
      </DateTimeEntryFieldWrapper>

      {dateTimePickerVisible && Platform.OS === 'android' && (
        // Show the default date and time picker for Android
        <RNDateTimePicker
          value={datePickerValue || new Date()}
          mode={dateTimePickerMode}
          is24Hour={true}
          onChange={onAndroidDatePickerChange}
          timeZoneName={getTimeZone()}
        />
      )}
      {/* Show the date and time picker in a custom dialog for iOS. */}
      <DateTimePickerDialog
        hideDialog={hideDialog}
        onValueSelected={onDateValueSelected}
        mode={dateTimePickerMode}
        visible={dateTimePickerVisible && Platform.OS === 'ios'}
      />
    </Container>
  );
};

export default DateTimeEntry;
