import {useEffect, useMemo, useState} from 'react';
import {DateTimeEntryProps} from '.';
import {format} from 'date-fns';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {DateTimePickerMode} from '../DateTimePickerDialog';

const useHook = ({value, onValueChange}: DateTimeEntryProps) => {
  // Date value initialed if it has already been set
  const [date, setDate] = useState<Date | null>(() => {
    if (value) {
      if (value instanceof Date) {
        return value;
      } else if (typeof value === 'string') {
        return new Date(value);
      }
    }
    return null;
  });
  // Time value initialed if it has already been set
  const [time, setTime] = useState<Date | null>(() => {
    if (value) {
      if (value instanceof Date) {
        return value;
      } else if (typeof value === 'string') {
        return new Date(value);
      }
    }
    return null;
  });
  // Determines if the date and time picker modal should be visible
  const [dateTimePickerVisible, setDateTimePickerVisible] =
    useState<boolean>(false);
  // Determines the mode of the date and time picker. eg. "date" or "time"
  const [dateTimePickerMode, setDateTimePickerMode] =
    useState<DateTimePickerMode>('date');

  const handleOpenDateTimePicker = (mode: DateTimePickerMode) => {
    setDateTimePickerVisible(true);
    setDateTimePickerMode(mode);
  };

  const hideDialog = () => {
    setDateTimePickerVisible(false);
  };

  const onDateValueSelected = (
    dateTime: Date | null,
    mode: DateTimePickerMode,
  ) => {
    if (mode === 'date') {
      setDate(dateTime);
    } else if (mode === 'time') {
      setTime(dateTime);
    }
  };

  // Calculates the date and time string based on the date and time value selected using
  // preset formats
  const {dateString, timeString, datePickerValue} = useMemo(
    () => ({
      datePickerValue: date ? date : time,
      dateString: date ? format(date, 'dd-MM-yyyy') : 'Pick a date',
      timeString: time ? format(time, 'HH:mm') : 'Pick a time',
    }),
    [date, time],
  );

  useEffect(() => {
    if ((date || time) && onValueChange) {
      let fullDate;
      if (date) {
        fullDate = new Date(date.toDateString());
      }

      if (date && time) {
        fullDate = new Date(date.toDateString() + ' ' + time.toTimeString());
      }

      if (fullDate) {
        // Updates the date and time value in the SymptomTrackerScreen parent component
        onValueChange(fullDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  const onAndroidDatePickerChange = (event: DateTimePickerEvent, d?: Date) => {
    setDateTimePickerVisible(false);

    if (event.type === 'set') {
      if (d) {
        onDateValueSelected(d, dateTimePickerMode);
      }
    }
  };

  return {
    datePickerValue,
    dateString,
    timeString,
    dateTimePickerVisible,
    dateTimePickerMode,
    handleOpenDateTimePicker,
    hideDialog,
    onDateValueSelected,
    onAndroidDatePickerChange,
  };
};

export default useHook;
