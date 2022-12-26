import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentData: [
    {
      key: '2022-12-22 13:45:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: [
        'Silverback L синий 1 bike',
        'Silverback L синий 2 bike',
        'Silverback L синий 3 bike',
      ],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-26 14:55:00',
      startTimeRegistration: '2022-12-26 14:45:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 14:30:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: [
        'Silverback L синий 1 bike',
        'Silverback L синий 2 bike',
        'Silverback L синий 3 bike',
      ],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-26 14:40:00',
      startTimeRegistration: '2022-12-26 14:30:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 13:00:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: [
        'Silverback L синий 1 bike',
        'Silverback L синий 2 bike',
        'Xiaomi m365 1 sam',
      ],
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-26 13:10:00',
      startTimeRegistration: '2022-12-26 13:00:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 12:00:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Xiaomi m365 1 sam', 'Xiaomi m365 2 sam'],
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
