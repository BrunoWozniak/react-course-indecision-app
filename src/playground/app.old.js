console.log('app.js is running');

const item = {
    title: 'Good title',
    subtitle: 'The story of a title',
    options: [
    ]
};

const appRoot = document.getElementById('app');

const resetOptions = () => {
    item.options = [];
    render();
}

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if (option) {
        item.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
}

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * item.options.length);
  const option = item.options[randomNum];
  alert(option);
}

const render = () => {
    const template = (
        <div>
            <h1>{item.title}</h1>
            {item.subtitle && <p>{item.subtitle}</p>}
            <p>{item.options && item.options.length > 0 ? 'Here are your options: ' : 'No options'}</p>
            <button disabled={item.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <ol>
                {item.options.map((option) => <li key={option}> {option} </li>)}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
            <button onClick={resetOptions}>Remove all</button>
            </div>
    );
    ReactDOM.render(template, appRoot);
}

render();

// renderCounterApp();

// let count = 0;
// const addOne = () => {
//   count++;
//   renderCounterApp();
// };
// const minusOne = () => {
//   count--;
//   renderCounterApp();
// };
// const reset = () => {
//   count = 0;
//   renderCounterApp();
// };

// const appRoot = document.getElementById('app');

// const renderCounterApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>reset</button>
//     </div>
//   );
//   ReactDOM.render(templateTwo, appRoot);
// };

// renderCounterApp();