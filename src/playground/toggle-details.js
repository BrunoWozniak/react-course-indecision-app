let visible = false;
const thing = {
  title: 'Short description',
  details: 'Yo, here are the details'
}

const onToggle = () => {
  visible = !visible;
  render();
}

const appRoot = document.getElementById('app');

const render = () => {
  const template = (
    <div>
      <h1>Toggle Details</h1>
      <h3>{thing.title}</h3>
      <div>
        <p>{visible ? thing.details : ''}</p>
      </div>
      <button onClick={onToggle}>{visible ? 'Hide Details' : 'Show Details'}</button>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
