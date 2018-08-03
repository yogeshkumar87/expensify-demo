import {
    addExpense,
    editExpense,
    removeExpense,
    startAddExpense
} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', done => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store
        .dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database
                .ref(`expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then(snapshot => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});
