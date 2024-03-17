import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Pressable, Text} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Title} from '../common';
import {TitleContainer} from './styles';
import {getTimeZone} from 'react-native-localize';

export type DateTimePickerMode = 'date' | 'time';

export type DateTimePickerDialogProps = {
  visible: boolean;
  // Determines which mode the dialog is in. date or time.
  mode: DateTimePickerMode;
  hideDialog: () => void;
  onValueSelected: (date: Date, mode: DateTimePickerMode) => void;
};

const DateTimePickerDialog: React.FC<DateTimePickerDialogProps> = ({
  mode,
  visible,
  hideDialog,
  onValueSelected,
}) => {
  const [dateValue, setDateValue] = useState<Date>(new Date());

  const onDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDateValue(selectedDate);
    }
  };

  const handleDonePress = () => {
    if (dateValue) {
      // Set the date to the parent state.
      onValueSelected(dateValue, mode);
    }
    hideDialog();
  };

  const handleClose = () => {
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <TitleContainer>
          <Title>{`Pick a ${mode}`}</Title>
          <Pressable onPress={handleClose}>
            <Ionicons name="close-outline" size={30} color="black" />
          </Pressable>
        </TitleContainer>
        <Dialog.Content>
          <RNDateTimePicker
            testID="dateTimePicker"
            value={dateValue || new Date()}
            mode={mode}
            is24Hour={true}
            minimumDate={new Date()}
            onChange={onDateChange}
            display="spinner"
            timeZoneName={getTimeZone()}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDonePress}>
            <Text>Done</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DateTimePickerDialog;
