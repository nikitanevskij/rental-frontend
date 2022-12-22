import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentData: [
    {
      key: '2022-12-22 13:42:15',
      userName: 'Газманов Олег',
      docNumber: 'MP123456',
      prefix: '29',
      phoneNumber: '+375 (29) 2343434',
      selectEquipment: ['blue4', 'blue5'],
      timeRental: 'a',
      dateTime: '2022-12-22 13:43:14',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 13:42:14',
      userName: 'Газманов Олег',
      docNumber: 'MP123456',
      prefix: '29',
      phoneNumber: '+375 (29) 2343434',
      selectEquipment: ['blue4', 'blue5'],
      timeRental: 'a',
      dateTime: '2022-12-22 13:42:18',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: '2022-12-22 13:42:16',
      userName: 'Газманов Олег',
      docNumber: 'MP123456',
      prefix: '29',
      phoneNumber: '+375 (29) 2343434',
      selectEquipment: ['blue4', 'blue5'],
      timeRental: 'a',
      dateTime: '2022-12-22 13:42:14',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
  ],
  data: [],
};

export const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    addRent: (state, action) => {
      state.currentData.unshift({ ...action.payload, key: action.payload.dateTime });
    },
  },
});

export const { addRent } = rentalSlice.actions;

export default rentalSlice.reducer;