// import Block from './Block';

// class TestBlock extends Block<any> {}
// jest.mock('./Block');

// beforeEach(() => {
//     Block.mockClear();
// });

// describe('core/block', () => {
//     const testBlock = new TestBlock();

//     it('should create an element based on the argument', () => {
//         const divElement = document.createElement('div');
//         const inputElement = document.createElement('input');

//         expect(testBlock._createDocumentElement('div')).toBeEmptyDOMElement();
//         expect(testBlock._createDocumentElement('div')).toEqual(divElement);
//         expect(testBlock._createDocumentElement('input')).toEqual(inputElement);
//     });

//     it('should be createResources when init', () => {
//         const tBlock = new Block({});
//         tBlock.init();

//         const mockTestBlock = Block.mock.instances[0];
//         const handleCreateResources = mockTestBlock._createResources;
//         console.log(handleCreateResources);
//         expect(handleCreateResources).toHaveBeenCalledTimes(1);
//     });
// });
