import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('Should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submit', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
    const value = 'New Description';

    const wrapper = shallow(<ExpenseForm />);

    wrapper
        .find('input')
        .at(0)
        .simulate('change', {
            target: { value }
        });

    expect(wrapper.state('description')).toBe(value);
});

test('Should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(
        <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
    );

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        createdAt: expenses[0].createdAt,
        amount: expenses[0].amount,
        note: expenses[0].note
    });
});

test('Should set new date onDateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});
