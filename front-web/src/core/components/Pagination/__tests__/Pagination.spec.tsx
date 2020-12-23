import React from 'react';
import { render , screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import Pagination from '..';

test('should render Pagination', () => {
     
    // Arrange
    const totalPages = 3;
    const activePages = 0;
    const onChange = () => null;

    // act
    render(
        <Pagination 
        totalPages={totalPages}
        activePage={activePages}
        onChange={onChange}
        />
    );

    // assert
    const previousElement = screen.getByTestId('arrow-icon-previous');
    const nextElement = screen.getByTestId('arrow-icon-next');
    const firsPageItem = screen.getByText('1');
    const secondPageItem = screen.getByText('2');
    const thirdPageItem = screen.getByText('3');

    expect(previousElement).toBeInTheDocument();
    expect(previousElement).toHaveClass('page-inactive');

    expect(nextElement).toBeInTheDocument();
    expect(nextElement).toHaveClass('page-active');

    expect(firsPageItem).toBeInTheDocument();
    expect(firsPageItem).toHaveClass('active');

    expect(secondPageItem).toBeInTheDocument();
    expect(secondPageItem).not.toHaveClass('active')
    
    
    expect(thirdPageItem).toBeInTheDocument();
    expect(thirdPageItem).not.toHaveClass('active')

});

test('should enable previous action and disable next action', () => {

    // Arrange
    const totalPages = 3;
    const activePages = 2;
    const onChange = () => null;

    // act
    render(
        <Pagination 
        totalPages={totalPages}
        activePage={activePages}
        onChange={onChange}
        />
    );

    const previousElement = screen.getByTestId('arrow-icon-previous');
    const nextElement = screen.getByTestId('arrow-icon-next');    

    expect(previousElement).toBeInTheDocument();
    expect(previousElement).toHaveClass('page-active');

    expect(nextElement).toBeInTheDocument();
    expect(nextElement).toHaveClass('page-inactive');

})

test('should trigger onChange action', () => {
    
    const totalPages = 3;
    const activePages = 1;
    const onChange = jest.fn();

    
    render(
        <Pagination 
        totalPages={totalPages}
        activePage={activePages}
        onChange={onChange}
        />
    );

    const previousElement = screen.getByTestId('arrow-icon-previous');
    const nextElement = screen.getByTestId('arrow-icon-next');
    const firsPageItem = screen.getByText('1');
    
    userEvent.click(firsPageItem);
    expect(onChange).toHaveBeenCalledWith(0);

    userEvent.click(previousElement);
    expect(onChange).toHaveBeenCalledWith(0);


    userEvent.click(nextElement);
    expect(onChange).toHaveBeenCalledWith(2);

});