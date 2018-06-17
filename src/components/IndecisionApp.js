import React from 'react';
import AddOption from './AddOption.js';
import Header from './Header.js';
import Action from './Action.js';
import Options from './Options.js';
import OptionModal from './OptionModal.js'

export default class IndecisionApp extends React.Component {
    state = {
        title: "Indecision",
        subtitle: "Put your life in the hands of a computer",
        //options: props.options
        options: [],
        selectedOption: undefined
    }

    pickOption = () => {
        const optionsLength = this.state.options.length;
        if(optionsLength > 0) {
            const selectedOption = this.state.options[Math.floor(Math.random() * optionsLength)];
            this.setState(() => ( { selectedOption }));
        }
    }

    deleteOptions = () => {
        this.setState(() => ({options: []}));
    }

    addOption = (option) => {
        if(!option) {
            return "Enter valid value to add item";
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({options: [...prevState.options, option]}));
    }

    deleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => 
                (option !== optionToRemove)
            )
        }));
    }

    clearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    render() {
        return (
                <div>
                    <Header 
                        title={this.state.title} 
                        subtitle={this.state.subtitle}
                    />
                    <div className="container">
                        <Action 
                            hasOptions={this.state.options.length > 0}
                            pickOption={this.pickOption}
                        />
                        <div className="widget">
                            <Options  
                                options={this.state.options}
                                deleteOptions={this.deleteOptions}
                                deleteOption={this.deleteOption}
                            />
                            <AddOption addOption={this.addOption}/>
                        </div>
                        <OptionModal 
                            selectedOption={this.state.selectedOption}
                            clearSelectedOption={this.clearSelectedOption}
                        />
                    </div>
                </div>
            )
    }

    componentDidMount() {
        console.log('mounted');
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState(() => ({options}));
            }
        } catch (e) {

        }
    }

    componentDidUpdate(prevPops, prevState) {
        if(prevState.optionsLength !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('unmounted');
    }
}