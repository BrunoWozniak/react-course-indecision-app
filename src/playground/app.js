class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteAllOptions = this.handleDeleteAllOptions.bind(this);
    this.handleDeleteOneOption = this.handleDeleteOneOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      let options = JSON.parse(json);
  
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch(e) {
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  handleDeleteAllOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOneOption(optionToRemove) {
    console.log(optionToRemove);
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Invalid input'
    } else if (this.state.options.indexOf(option) >= 0) {
      return 'This value already exists'
    }

    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteAllOptions={this.handleDeleteAllOptions}
          handleDeleteOneOption={this.handleDeleteOneOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}
  
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
title: 'Indecision'
};
  
const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );
}
  
const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteAllOptions}>Remove all</button>
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      {
        props.options.map((option) => (
          <Option
            key={option}
            optionText={option}
            handleDeleteOneOption={props.handleDeleteOneOption}
          />
        ))
      }
    </div>
  );
}
  
const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button onClick={(e) => {
        props.handleDeleteOneOption(props.optionText);
      }}
      >
        Remove
      </button>
    </div>
  );
}
  
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
          {this.state.error && <p>{this.state.error}</p>}
          <form onSubmit={this.handleAddOption}>
              <input type="text" name="option"></input>
              <button>Add option</button>
          </form>
      </div>

    );
  }
}
  
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
  