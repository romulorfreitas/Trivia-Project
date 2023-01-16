import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Login from '../../pages/Login';
import App from '../../App';
import getCurrentValue from '../../services/apiTrivia';

const emailTest = 'tryber@teste.com';

describe('Testando a página Login', () => {
    it('Verifica link da página', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        expect(nameInput && emailInput).toBeInTheDocument();

        const { pathname } = history.location;
        expect(pathname).toBe('/');
    });

    it('Verifica se o botão configuração renderiza para /settings', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnSettings = screen.getByRole('button', {
            name: /configuração/i
        });
        expect(btnSettings).toBeInTheDocument();

        userEvent.click(btnSettings);
        const { pathname } = history.location;
        expect(pathname).toBe("/settings");
    });

    it('Verifica se o botão Play está sendo renderizado na tela quando habilitado', () => {
        renderWithRouterAndRedux(<Login />);

        const btnPlay = screen.getByRole('button', {
            name: /play/i
        });

        const userName = screen.getByTestId('input-player-name');
        const userEmail = screen.getByTestId('input-gravatar-email');

        userEvent.type(userName, 'teste');
        userEvent.type(userEmail, emailTest);

        expect(userEmail).toHaveValue('tryber@teste.com');

        expect(btnPlay).toBeEnabled();

        userEvent.type(userName, '');

        expect(btnPlay).toBeEnabled();
      
    });


    it('Verifica o botão Play mudar para rota /game', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const userName = screen.getByTestId('input-player-name');
        const userEmail = screen.getByTestId('input-gravatar-email');

        userEvent.type(userName, 'teste');
        userEvent.type(userEmail, 'tryber@teste.com');

        const btnPlay = screen.getByRole('button', {
            name: /play/i
        });
        userEvent.click(btnPlay);

        const { pathname } = history.location;
        setTimeout(() => { expect(pathname).toBe("/game"); }, 5000);
    });

    it('Verifica se a função getCurrentValue está trabalhando corretamente e retornando o token', async () => {
        const response = await getCurrentValue();
        expect(response).toHaveProperty('token');
    });

});