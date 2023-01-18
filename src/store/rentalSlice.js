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
      equipment: [
        {
          key: '1',
          type: 'group',
          label: 'Текущее оборудование:',
          children: [
            { key: '1', label: 'Silverback L синий bike_1' },
            { key: '2', label: 'Silverback L синий bike_2' },
            { key: '3', label: 'Silverback L синий bike_6' },
            { key: '4', label: 'Silverback L синий bike_7' },
          ],
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          type: 'group',
          label: 'Ранее принятое оборудование:',
          children: [],
        },
      ], // оборудование
      returnedEquipments: [], // оборудование принятое раньше основного
      userName: 'Газманов Олег',
      timeRental: '15 мин',
      startTimeTrip: '2023-01-09 15:00:00',
      startTimeRegistration: '2022-12-26 14:45:00',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    // {
    //   key: '2022-12-22 14:30:00',
    //   comment: '',
    //   docNumber: 'MP123456',
    //   phoneNumber: '+375 (29) 2343434',
    //   prefix: '29',
    //   selectEquipment: ['Silverback L синий bike_1'],
    //   returnedEquipments: [],
    //   userName: 'Газманов Олег',
    //   timeRental: '15 мин',
    //   startTimeTrip: '2022-12-28 11:30:00',
    //   startTimeRegistration: '2022-12-28 10:30:00',
    //   description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    // },
    // {
    //   key: '2022-12-22 13:00:00',
    //   comment: '',
    //   docNumber: 'MP123456',
    //   phoneNumber: '+375 (29) 2343434',
    //   prefix: '29',
    //   selectEquipment: ['Silverback L синий bike_2'],
    //   returnedEquipments: [],
    //   userName: 'Газманов Олег',
    //   timeRental: '15 мин',
    //   startTimeTrip: '2022-12-28 11:10:00',
    //   startTimeRegistration: '2022-12-28 11:00:00',
    //   description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    // },
    // {
    //   key: '2022-12-22 12:00:00',
    //   comment: '',
    //   docNumber: 'MP123456',
    //   phoneNumber: '+375 (29) 2343434',
    //   prefix: '29',
    //   selectEquipment: ['Xiaomi m365 sam_2'],
    //   returnedEquipments: [],
    //   userName: 'Газманов Олег',
    //   timeRental: '15 мин',
    //   startTimeTrip: '2022-12-26 12:10:00',
    //   startTimeRegistration: '2022-12-26 12:00:00',
    //   description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    // },
    // {
    //   key: '2022-12-22 12:33:00',
    //   comment: '',
    //   docNumber: 'MP123456',
    //   phoneNumber: '+375 (29) 2343434',
    //   prefix: '29',
    //   selectEquipment: ['Xiaomi m365 sam_2'],
    //   returnedEquipments: [],
    //   userName: 'Газманов Олег',
    //   timeRental: '15 мин',
    //   startTimeTrip: '2022-12-26 12:10:00',
    //   startTimeRegistration: '2022-12-26 12:00:00',
    //   description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    // },
    // {
    //   key: '2022-12-22 12:40:00',
    //   comment: '',
    //   docNumber: 'MP123456',
    //   phoneNumber: '+375 (29) 2343434',
    //   prefix: '29',
    //   selectEquipment: ['Xiaomi m365 sam_2'],
    //   returnedEquipments: [],
    //   userName: 'Газманов Олег',
    //   timeRental: '15 мин',
    //   startTimeTrip: '2022-12-26 12:10:00',
    //   startTimeRegistration: '2022-12-26 12:00:00',
    //   description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    // },
    // {
    //   key: '2022-12-22 12:30:00',
    //   comment: '',
    //   docNumber: 'MP123456',
    //   phoneNumber: '+375 (29) 2343434',
    //   prefix: '29',
    //   selectEquipment: ['Xiaomi m365 sam_2'],
    //   returnedEquipments: [],
    //   userName: 'Газманов Олег',
    //   timeRental: '15 мин',
    //   startTimeTrip: '2022-12-26 12:10:00',
    //   startTimeRegistration: '2022-12-26 12:00:00',
    //   description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    // },
  ],
  complietedData: [],
};

export const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    addRentEquipment: (state, action) => {
      state.currentData.unshift(action.payload);
    }, // выдача основного оборудования

    updateStartTimeTrip: (state, action) => {
      const indexElement = state.currentData.findIndex((item) => item.key === action.payload);
      const element = state.currentData[indexElement];

      element.startTimeTrip = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, // обновление времени старта

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
        `Оборудование: ${tag.label}\nВремя аренды: ${rentalTime}\nК оплате: ${price} byn\nВведите сумму, если оплата сейчас или "0", если оплата потом`,
        price,
      );

      if (result === null) return;

      if (result !== null) {
        if (/[a-zа-яё-]/i.test(result) || result.length === 0) {
          alert('Введите положительное число или 0');
          return;
        }
      }

      element.equipment[2].children.push({
        key: String(element.equipment[2].children.length),
        label: tag.label,
        totalTime: rentalTime,
        paid: result,
      });

      element.equipment[0].children = element.equipment[0].children.filter(
        (item) => item.label !== tag.label,
      );
    }, //выборочный возврат оборудование вне сдачи основного оборудования пользователя

    addRentBabyCar: (state, action) => {
      const findCarCurrentData = state.currentData.findIndex(
        (item) => item.equipment[0].children[0].label === action.payload,
      );
      if (findCarCurrentData >= 0) {
        window.alert(`Детский автомобиль ${action.payload} уже взят в аренду. `);
        return;
      }
      const babyCar = {
        key: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        startTimeRegistration: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        userName: 'Детский электромобиль',
        docNumber: '',
        phoneNumber: '',
        timeRental: '15 мин',
        equipment: [
          {
            key: '1',
            type: 'group',
            label: 'Текущее оборудование:',
            children: [{ key: '1', label: action.payload }],
          },
        ],
        startTimeTrip: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        comment: '',
      };
      state.currentData.unshift(babyCar);
    }, // выдача детского электромобиля

    deleteRent: (state, action) => {
      state.complietedData.unshift(action.payload);
      state.currentData = state.currentData.filter((item) => item.key !== action.payload.key);
    }, // возврат оборудования
  },
});

export const {
  addRentEquipment,
  returnedEquipmentNow,
  addRentBabyCar,
  deleteRent,
  updateStartTimeTrip,
} = rentalSlice.actions;

export default rentalSlice.reducer;
