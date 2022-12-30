import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { finalPrice, msToTime } from '../helpers/helper';

const initialState = {
  currentData: [
    {
      key: '2022-12-22 13:45:00',
      comment: '',
      docNumber: 'MP123456',
      phoneNumber: '+375 (29) 2343434',
      prefix: '29',
      selectEquipment: ['Silverback L синий bike_1', 'Silverback L синий bike_2'],
      returnedEquipments: [
        {
          type: 'Silverback L синий bike_1',
          finalTime: '',
          totalCost: '',
          paid: 'true',
        },
      ], // оборудование принятое раньше основного
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2022-12-30 15:00:00',
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
      returnedEquipments: [],
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
      returnedEquipments: [],
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
      returnedEquipments: [],
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
      returnedEquipments: [],
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
      returnedEquipments: [],
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
      returnedEquipments: [],
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

    returnedEquipmentNow: (state, action) => {
      const { tag, key } = action.payload;
      const indexElement = state.currentData.findIndex((item) => item.key === key);
      const element = state.currentData[indexElement];

      const selectEquipment = [tag];
      const startTimeTrip = element.startTimeTrip;
      const price = finalPrice(selectEquipment, startTimeTrip);

      const diff = dayjs().diff(startTimeTrip);
      const rentalTime = msToTime(diff);

      const result = window.prompt(
        `Оборудование: ${tag}\nВремя аренды: ${rentalTime}\nК оплате: ${price} byn\nВведите сумму, если оплата сейчас или "0", если оплата потом`,
        price,
      );

      if (result !== null) {
        if (result.replace(/\d/g, '').length) {
          alert('Введите положительное число или 0');
          return;
        }

        element.returnedEquipments.push({
          type: tag,
          finalTime: '',
          paid: result,
        });

        element.selectEquipment = state.currentData[indexElement].selectEquipment.filter(
          (item) => item !== tag,
        );
      }
    }, //точечный возврат оборудование вне сдачи основного оборудования пользователя
  },
});

export const { addRent, returnedEquipmentNow } = rentalSlice.actions;

export default rentalSlice.reducer;
