const view = ({ model, controller }) => [
  [
    { class: 'block' },

    [{ _: 'h2', class: 'title', onclick: controller.checkState({}) }, 'Inputs'],
    [
      {
        _: 'button',
        onclick: controller.checkState({}),
        class: model.stepPossible ? 'green' : 'disable'
        // style: { display: model.stepPossible ? 'initial' : 'none' }
      },
      [{ _: 'strong' }, '⮷'],
      'next step'
    ],
    ...model.ins.mapToArray((value, key) => [
      { _: 'button', onclick: controller.toggle(key) },
      [{ _: 'strong' }, value[0]],
      key
    ])
  ],
  [
    { class: 'block' },
    ...model.states.mapToArray((value, key) => [
      { class: key === model.state ? 'state active' : 'state' },
      [{ _: 'h2' }, key],

      [
        { class: 'bl' },
        value.transitions.map(({ name, conditions }) => [
          ...conditions.map((and, index) => [
            { class: 'contents' },
            index ? '&' : '',
            ...and.map(({ name, value: [v] }, index) => [
              { class: 'contents' },
              index ? '|' : '',
              [{ _: 'p', class: v ? 'condition active' : 'condition' }, name]
            ])
          ]),
          ' => ',
          [{ _: 'strong' }, name]
        ])
      ]
    ])
  ]
];

export default view;
