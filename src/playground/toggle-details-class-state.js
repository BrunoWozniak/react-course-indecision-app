class ToggleDetailsApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.title = 'Short description of the item';
    this.details = 'Detailed description of the item';
    this.state = {
      showDetails: false
    };
  }

  handleToggle() {
    this.setState((prevState) => {
      return {showDetails: !this.state.showDetails}
    });
  }

  render() {
    return(
      <div>
        <h1>Toggle Details</h1>
        <h3>{this.title}</h3>
        <p>{this.state.showDetails ? this.details : ''}</p>
        <button onClick={this.handleToggle}>{this.state.showDetails ? 'Hide Details' : 'Show Details'}</button>
      </div>
    );
  }
}

ReactDOM.render(<ToggleDetailsApp />, document.getElementById('app'));
