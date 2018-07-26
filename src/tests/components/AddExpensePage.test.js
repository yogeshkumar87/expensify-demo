import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

test('Should render AddExpensePage Correctly', () => {
    const onSubmit = jest.fn();
    const history = { push: jest.fn() };
    const wrapper = shallow(
        <AddExpensePage addExpense={onSubmit} history={history} />
    );

    expect(wrapper).toMatchSnapshot();
});

test('Should submit AddExpensePage', () => {
    const onSubmit = jest.fn();
    const history = { push: jest.fn() };
    const wrapper = shallow(
        <AddExpensePage addExpense={onSubmit} history={history} />
    );

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

    expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});
