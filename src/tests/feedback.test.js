import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando a tela de Login', () => {
    it('Login test', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const email = 'test@hotmail.com';
        const name = 'ciclano';
        const loginInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        
        expect(loginInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        
        userEvent.type(loginInput, name)
        userEvent.type(emailInput, email)
        
        const playButton = await screen.getByRole('button', {name: /play/i});
        expect(playButton).toBeInTheDocument()
        expect(loginInput.value).toBe(name)
        userEvent.click(playButton);
        
        const emailLogin = await screen.findByText(name);
        expect(emailLogin).toBeInTheDocument()

        const { pathname } = history.location;
        expect(pathname).toBe('/game')
    })

    it('Login test Settings', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const settingsButton = screen.getByRole('button', {name: /Configuração/i});

        expect(settingsButton).toBeInTheDocument()
        userEvent.click(settingsButton);
        
        const settingsTittle = await screen.findByText('Configuração')
        expect(settingsTittle).toBeInTheDocument()

        const { pathname } = history.location;
        expect(pathname).toBe('/settings')
    })

    it('does clicking the rank button take you to the rank screen?', async () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

        expect(screen.getByRole('button', { name: /ranking/i })).toBeInTheDocument();

        userEvent.click(screen.getByRole('button', { name: /ranking/i }));

        expect(history.location.pathname).toBe('/ranking');
    });

      it('The "Play Again" button should return to the home screen', () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
        const textMotivation = screen.getByText('Could be better...');
        expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
        expect(textMotivation).toBeInTheDocument();

        userEvent.click(screen.getByTestId('btn-play-again'));
        const { pathname } = history.location;
        expect(pathname).toBe('/');
      });
})