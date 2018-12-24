import passepartout from 'passepartout';
import view from './view';
import controller from './controller';

const interpreter = demo => {
  console.log(demo);

  const {
    Title,
    Creator,
    Version,
    Inputs,
    Outputs,
    ['Global Transitions']: Global
  } = demo;

  delete demo.Title;
  delete demo.Creator;
  delete demo.Version;
  delete demo.Inputs;
  delete demo.Outputs;
  delete demo['Global Transitions'];

  const captialText = /[A-Z][A-Za-z ]+$/;
  const nonCaptialText = /[a-z][A-Za-z ]+$/;

  const trans = /[a-z |&]+(=>)/;

  const outs = Outputs.mapObj(() => [0]);

  const ins = Inputs.mapObj(() => [0]);

  window.ins = ins;

  class Pointer {
    constructor(value) {
      this.value = value;
    }
    set = v => {
      this.value = v;
    };
    get = () => this.value;
  }

  const t = new Pointer('val');
  window.t = t;

  console.log(t);

  const createConditions = cond =>
    cond.split('&').map(e =>
      e.split('|').map(e => {
        const v = e.trim();

        return {
          name: v,
          valid: nonCaptialText.test(v),
          exists: ins[v] ? true : false,
          value: ins[v]
        };
      })
    );
  window.states = demo.mapObj(exp => {
    const store = {
      transitions: [],
      checkTransitions: function() {
        return this.transitions.reduce(
          (old, { check }) => (old ? old : check()),
          null
        );
      }
    };
    exp.forEachObj((val, key) => {
      if (typeof val === 'string') {
        const stateLink = val.trim();
        const conditions = createConditions(key.replace('=>', '').trim());

        if (!trans.test(key))
          console.error(stateLink, " isn't a valid state name");
        const name = stateLink;
        if (!demo[name]) console.error(name, " isn't a valid state link");
        store.transitions.push({
          conditionString: key,
          conditions,
          name,
          exists: demo[name] ? true : false,
          check: function() {
            return conditions
              .map(condition =>
                condition
                  .map(({ value }) =>
                    value ? value[0] : console.log('no value')
                  )
                  .or()
              )
              .and()
              ? stateLink
              : null;
          }
        });
      } else {
      }
    });
    return store;
  });
  console.log(demo);

  const model = { ins, state: 'Init', states };

  passepartout({ model, view, controller });
};

export default interpreter;
