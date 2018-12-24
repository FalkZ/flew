const controller = {
  toggle: ({ model, args, controller }) => {
    model.ins[args[0]][0] = model.ins[args[0]][0] ? 0 : 1;

    controller.checkState({});
  },
  checkState: ({
    model,
    controller,
    args: [{ count = 0, newState, nested }]
  }) => {
    newState = model.states[newState || model.state].checkTransitions();
    console.log(newState);
    count += 1;

    if (nested) {
      return { stepPossible: newState ? true : false };
    } else {
      controller.checkState({ count, newState, nested: true });
      return newState ? { state: newState } : {};
    }
  }
};

export default controller;
