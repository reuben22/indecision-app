/*const obj = {
    name: "Robin",
    getName() {
        return this.name;
    }
};

const getName = obj.getName.bind(obj);

console.log(getName());*/

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Indecision",
            subtitle: "Put your life in the hands of a computer",
            //options: props.options
            options: []
        }
        this.deleteOptions = this.deleteOptions.bind(this);
        this.pickOption = this.pickOption.bind(this);
        this.addOption = this.addOption.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
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
/*        console.log(prevPops);
        console.log(prevState);*/
    }

    componentWillUnmount() {
        console.log('unmounted');
    }

    pickOption() {
        const optionsLength = this.state.options.length;
        if(optionsLength > 0) {
            alert(this.state.options[Math.floor(Math.random() * optionsLength)]);
        }
    }

    deleteOptions() {
        this.setState(() => ({options: []}));
    }

    addOption(option) {
        if(!option) {
            return "Enter valid value to add item";
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({options: [...prevState.options, option]}));
    }

    deleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => 
                (option !== optionToRemove)
            )
        }));
    }

    render() {
        return (
                <div>
                    <Header 
                        title={this.state.title} 
                        subtitle={this.state.subtitle}
                    />
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        pickOption={this.pickOption}
                    />
                    <Options  
                        options={this.state.options}
                        deleteOptions={this.deleteOptions}
                        deleteOption={this.deleteOption}
                    />
                    <AddOption addOption={this.addOption}/>
                </div>
            )
    }
}

/*class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>
            </div>
        )
    }
}*/

/*IndecisionApp.defaultProps =     {
    options: []
}*/

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <p>{props.subtitle}</p>}
        </div>
    )
}

Header.defaultProps = {
    title: 'some default'
}

/*class Action extends React.Component {
    render() {
        return (
                <div>
                    <button onClick={this.props.pickOption} disabled={!this.props.hasOptions}>What should I do?</button>
                </div>
            )
    }
}*/

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.pickOption} 
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    )
}

/*class Options extends React.Component {
    render() {
        return (
                <div>
                    <button onClick={this.props.deleteOptions}>Remove All</button>
                    <ul>
                        {
                            this.props.options.map((option) => {
                                return <Option key={option} option={option}/>;
                                //return <p>{options}</p>;
                            })
                        }
                    </ul>
                </div>
            )
    }
}*/

const Options = (props) => {
    return (
        <div>
            <button onClick={props.deleteOptions}>Remove All</button>
            <ul>
                { props.options.length === 0 && <p>No options</p>}
                {
                    props.options.map((option) => (
                        <Option 
                            key={option} 
                            option={option}
                            deleteOption={props.deleteOption}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.optionSubmit = this.optionSubmit.bind(this);
        this.state = {
            error: undefined
        }
    }

    optionSubmit(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.addOption(option);

        this.setState(() => ({error}));

        /*this.setState(() => {
            return {
                error
            }
        })*/

        if(!error) {
            e.target.elements.option.value = "";
        }
        /*if(option) {
            this.props.addOption(option);
            e.target.elements.option.value = "";
        }*/
    }

    render() {
        return(
                <form onSubmit={this.optionSubmit}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input type="text" name="option"/>
                    <button>Add</button>
                </form>
            )
    }
}

/*class Option extends React.Component {
    render() {
        return (
                <li>{this.props.option}</li>
            )
    }
}*/

const Option = (props) => {
    return (
        <div>
            <li>{props.option}</li>
            <button 
                onClick={
                    (e) => {
                        props.deleteOption(props.option);
                    }
                }
            >
                Remove
            </button>
        </div>
    )
}

/*const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
};*/

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));