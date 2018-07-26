import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should setup remove expense action object', () => {
    const remove = removeExpense({ id: '123b' });

    expect(remove).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123b'
    });
});

test('Should setup edit expense object', () => {
    const action = editExpense('123', { amount: 400 });

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            amount: 400
        }
    });
});

test('Should setup add expense with provided values', () => {
    const expense = {
        description: 'milk',
        amount: 5000,
        note: 'sharing',
        createdAt: 12000
    };

    const action = addExpense(expense);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String)
        }
    });
});

test('Should setup add expense with default values', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});
