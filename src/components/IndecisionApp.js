import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
  
    handleDeleteAllOptions = () => {
        this.setState(() => ({ options: [] }));
    }
  
    handleDeleteOneOption = (optionToRemove) => {
        console.log(optionToRemove);
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
  
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    }
  
    handleAddOption = (option) => {
        if (!option) {
            return 'Invalid input'
        } else if (this.state.options.indexOf(option) >= 0) {
            return 'This value already exists'
        }
    
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}))
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
  
    render() {
        const subtitle = 'Put your life in the hands of a React.js app';
    
        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteAllOptions={this.handleDeleteAllOptions}
                            handleDeleteOneOption={this.handleDeleteOneOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}