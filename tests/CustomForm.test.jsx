import { describe, it, expect, vitest } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CustomForm from '../src/components/CustomForm/CustomForm';

describe('CustomForm', () => {
    it('should render Custom Form with name, email inputs and submit button', () => {
        render(<CustomForm/>);
        
        const nameInput = screen.getByPlaceholderText('Maria Souza');
        const emailInput = screen.getByPlaceholderText('meuemail@exemplo.com');
        const buttonSubmit = screen.getByRole('button');
        
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(buttonSubmit).toBeInTheDocument();
    })

    it('should render error message if name input is empty', () => {
        render(<CustomForm status="" message="" onValidated={() => {}}/>);
        
        const nameInput = screen.getByPlaceholderText('Maria Souza');
        fireEvent.change(nameInput, {target: {value: ' '}});
        expect(screen.getByText(/informe um nome/i)).toBeInTheDocument();
 
    })
    it('should render error message if name and email inputs are in the wrong format', () => {
        render(<CustomForm status="" message="" onValidated={() => {}}/>);
        
        const nameInput = screen.getByPlaceholderText('Maria Souza');
        const emailInput = screen.getByPlaceholderText('meuemail@exemplo.com');
        
        fireEvent.change(nameInput, {target: {value: '555'}});
        fireEvent.change(emailInput, {target: {value: 'meue@email'}})

        expect(screen.getByText(/nome inválido/i)).toBeInTheDocument();
        expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    })
    it('button should not be clickable if name and email inputs are in the wrong format', () => {
        render(<CustomForm status="" message="" onValidated={() => {}}/>);

        const nameInput = screen.getByPlaceholderText('Maria Souza');
        const emailInput = screen.getByPlaceholderText('meuemail@exemplo.com');
        
        fireEvent.change(nameInput, {target: {value: '123'}});
        fireEvent.change(emailInput, {target: {value: '45email'}})
        expect(screen.getByRole('button')).toBeDisabled()
    })
    it('button should be clickable if name and email inputs are in the right format', () => {
        render(<CustomForm status="" message="" onValidated={() => {}}/>);

        const nameInput = screen.getByPlaceholderText('Maria Souza');
        const emailInput = screen.getByPlaceholderText('meuemail@exemplo.com');
        
        fireEvent.change(nameInput, {target: {value: 'Maria'}});
        fireEvent.change(emailInput, {target: {value: 'meuemail@exemplo.com'}})
        expect(screen.getByRole('button')).toBeEnabled()
    })
    it('should render subscription confirmed when calls onValidated with valid input data', async () => {
        const onValidated = vitest.fn()
        const message = 'Thank you for subscribing!'
        render(<CustomForm status='success' message={message} onValidated={onValidated}/>);

        const nameInput = screen.getByPlaceholderText('Maria Souza');
        const emailInput = screen.getByPlaceholderText('meuemail@exemplo.com');
        
        fireEvent.change(nameInput, {target: {value: 'Maria'}});
        fireEvent.change(emailInput, {target: {value: 'maria@exemplo.com'}})
        fireEvent.click(screen.getByRole('button', {name: /Receber dicas/i}))

        await waitFor(() => {
            expect(onValidated).toHaveBeenCalledWith({
                EMAIL: 'maria@exemplo.com',
                MERGE1: 'Maria'
            })
            expect(screen.getByText(/Inscrição realizada!/i)).toBeInTheDocument();
        })

    })
    
})