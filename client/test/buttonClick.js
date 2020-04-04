export function simulateOnClick(button, parentWrapper) {
    button.simulate('click');
    parentWrapper.update();
}