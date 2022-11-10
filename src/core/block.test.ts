import Block from './Block';
import '@testing-library/jest-dom';

class TestBlock extends Block<any> {}

describe('core/block', () => {
    const testBlock = new TestBlock();

    it('should create an element based on the argument', () => {
        const divElement = document.createElement('div');
        const inputElement = document.createElement('input');

        expect(testBlock._createDocumentElement('div')).toBeEmptyDOMElement();
        expect(testBlock._createDocumentElement('div')).toEqual(divElement);
        expect(testBlock._createDocumentElement('input')).toEqual(inputElement);
    });

    it('should set props', () => {
        testBlock.setProps({ user: 'exampleUser' });
        expect(testBlock.getProps().user).toBe('exampleUser');
    });

    it('should add event to element', () => {
        const funcMock = jest.fn();
        testBlock._createResources();
        testBlock.setProps({ events: { click: funcMock } });
        const mockElem = testBlock.element;
        jest.spyOn<any, any>(
            mockElem,
            'addEventListener'
        ).mockImplementationOnce(() => '');
        testBlock._addEvents();
        expect(testBlock.element?.addEventListener).toHaveBeenCalledTimes(1);
    });

    it('should remove event from element', () => {
        const funcMock = jest.fn();
        testBlock._createResources();
        testBlock.setProps({ events: { click: funcMock } });
        const mockElem = testBlock.element;
        jest.spyOn<any, any>(
            mockElem,
            'removeEventListener'
        ).mockImplementationOnce(() => '');
        testBlock._removeEvents();
        expect(testBlock.element?.removeEventListener).toHaveBeenCalledTimes(1);
    });
});
