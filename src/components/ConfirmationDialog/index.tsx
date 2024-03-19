import {Pressable, Text} from 'react-native';
import {Button, Dialog, Portal, Title} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TitleContainer} from '../DateTimePickerDialog/styles';

import React from 'react';
import {Description} from './styles';

interface ConfirmationDialogProps {
  title?: string;
  description?: string;
  doneText?: string;
  visible: boolean;
  hideDialog: () => void;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  title,
  description,
  visible,
  doneText = 'Done',
  hideDialog,
  onConfirm,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm?.();
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <TitleContainer>
          <Title>{title}</Title>
          <Pressable onPress={hideDialog}>
            <Ionicons name="close-outline" size={30} color="black" />
          </Pressable>
        </TitleContainer>
        <Dialog.Content>
          <Description>{description}</Description>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleConfirm}>
            <Text>{doneText}</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
