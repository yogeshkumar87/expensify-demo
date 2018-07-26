import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

const expenses = [
    {
        id: 1,
        description: 'milk',
        amount: 1200,
        createdAt: 0
    },
    {
        id: 2,
        description: 'coffee',
        amount: 458,
        createdAt: moment(0)
            .add(2, 'days')
            .valueOf()
    },
    {
        id: 3,
        description: 'gol gappe',
        amount: 200,
        createdAt: moment(0)
            .subtract(10, 'days')
            .valueOf()
    }
];

test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const action = selectExpenses(expenses, filters);

    expect(action).toEqual([expenses[1], expenses[0], expenses[2]]);
});
