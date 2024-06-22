import React from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddHabit from '../components/AddHabit';

// Имитируем модуль AsyncStorage, чтобы использовать in-memory реализацию для тестирования
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
  );
// Создаем имитированный объект навигации с имитированной функцией 'goBack'
const mockNavigation = {
  goBack: jest.fn(),
};


describe('AddHabit', () => {
  // Очищаем все имитации перед каждым тестом
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Логируем сохраненные привычки после каждого теста
  afterEach(async () => {
    const savedHabits = JSON.parse(await AsyncStorage.getItem('habits'));
    console.log('Saved habits:', savedHabits);
  });

  test('adds a new habit and navigates back', async () => {
    // Отображаем компонент AddHabit с имитированной навигацией
    const { getByPlaceholderText, getByText } = render(<AddHabit navigation={mockNavigation} />);

    // Заполняем форму
    const titleInput = getByPlaceholderText('Привычка');
    const descriptionInput = getByPlaceholderText('Описание');
    fireEvent.changeText(titleInput, 'Новая привычка');
    fireEvent.changeText(descriptionInput, 'Описание новой привычки');

    // Имитируем нажатие на кнопку "ДОБАВИТЬ"
    const addButton = getByText('ДОБАВИТЬ');
    fireEvent.press(addButton);

    // Определяем ожидаемую новую привычку
    const expectedNewHabit = { title: 'Новая привычка', description: 'Описание новой привычки' };

    // Ждем, пока привычка будет сохранена, и проверяем, что она сохранена правильно
    await waitFor(async () => {
        const savedHabits = JSON.parse(await AsyncStorage.getItem('habits'));
  // Проверяем, что привычка была сохранена правильно 
        expect(savedHabits).toEqual([expectedNewHabit]); 
    })

    // Проверяем, что пользователь вернулся на главный экран
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});