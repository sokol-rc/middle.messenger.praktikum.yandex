import {
    fireEvent,
    getByLabelText,
    getByRole,
    getByTestId,
    getByTitle,
    queryByText,
    screen,
    waitFor,
} from '@testing-library/dom';
import { Block } from 'core';
import LoginPageContainer from './loginContainer';
import { renderBlock } from 'utils/renderUtils';

export async function step(_name: string, callback: () => void) {
    await callback();
}

const mockSubmit = jest.fn();
describe('pages/Login', () => {
    it('should login in login page and redirect to chat page', async () => {
        await step('render chatpage to dom', () => {
            mockSubmit.mockImplementation((event) => {
                event.preventDefault();
            });
            renderBlock({
                Block: LoginPageContainer as typeof Block,
                props: {},
            });

            getByTestId(document.body, 'loginForm').onsubmit = mockSubmit;
            const loginInput = getByLabelText(document.body, 'Login');
            const passwordInput = getByLabelText(document.body, 'Пароль');
            const loginButton = getByRole(document.body, 'button');
            loginInput.value = 'sokol-rc';
            passwordInput.value = '123QWEjkl';
            console.log(loginButton);
            fireEvent.submit(getByTestId(document.body, 'loginForm'));
            loginButton.click();
            // console.log(prettyDOM(document.body));
        });

        await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

        // await step('wait show login error', async () => {
        //     await waitFor(() => {
        //         expect(queryByText(document.body, 'div'));
        //     });
        // });
    });
});
