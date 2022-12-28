import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentData: [
    {
      key: '2022-12-22 13:45:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Silverback L синий bike_1'],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-28 12:30:00',
      startTimeRegistration: '2022-12-26 14:45:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 14:30:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Silverback L синий bike_1'],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-28 11:30:00',
      startTimeRegistration: '2022-12-28 10:30:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 13:00:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Silverback L синий bike_2'],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-28 11:10:00',
      startTimeRegistration: '2022-12-28 11:00:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 12:00:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Xiaomi m365 sam_2'],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-26 12:10:00',
      startTimeRegistration: '2022-12-26 12:00:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 12:33:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Xiaomi m365 sam_2'],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-26 12:10:00',
      startTimeRegistration: '2022-12-26 12:00:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 12:40:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Xiaomi m365 sam_2'],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-26 12:10:00',
      startTimeRegistration: '2022-12-26 12:00:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 12:30:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Xiaomi m365 sam_2'],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-26 12:10:00',
      startTimeRegistration: '2022-12-26 12:00:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
  ],
  data: [],
  finalСhecks: [],
};

export const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    addRent: (state, action) => {
      state.currentData.unshift({ ...action.payload, key: action.payload.startTimeTrip });
    },
  },
});

export const { addRent } = rentalSlice.actions;

export default rentalSlice.reducer;
