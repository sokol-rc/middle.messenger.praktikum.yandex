import { renderDOM } from 'core';
import { screen, getByTestId } from '@testing-library/dom';
import { Component } from 'core/Block';
import Button from './button';

type RenderDomParams = {
    Block: Component;
    props: any;
};

function renderBlock({ Block, props }: RenderDomParams) {
    document.body.innerHTML = '<div id="root"></div>';
    renderDOM(new Block(props));
}

describe('componens/button', () => {
    let btn = null;
    let answer = null;
    afterEach(() => {
        btn = null;
        answer = null;
    });
    it('should be render with or without label', () => {
        btn = new Button({});

        answer = btn.render();
        expect(answer).toBe(
            '<button class="{{className}}" type="submit" data-testid="btn-test">Кнопка</button>'
        );

        btn = new Button({ label: 'label' });
        answer = btn.render();

        expect(answer).toBe(
            '<button class="{{className}}" type="submit" data-testid="btn-test">label</button>'
        );
    });

    it('should be and be render with className', () => {
        renderBlock({
            Block: Button as any,
            props: { className: 'qwerty' },
        });
        expect(getByTestId(document.body, 'btn-test')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveClass('qwerty');
    });
    it('shoud be called onClick', () => {
        const mockClick = jest.fn();

        renderBlock({
            Block: Button as any,
            props: { onClick: mockClick },
        });

        const button = getByTestId(document.body, 'btn-test');
        button.click();
        expect(mockClick).toHaveBeenCalled();
    });
});
