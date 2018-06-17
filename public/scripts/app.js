"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*const obj = {
    name: "Robin",
    getName() {
        return this.name;
    }
};

const getName = obj.getName.bind(obj);

console.log(getName());*/

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.state = {
            title: "Indecision",
            subtitle: "Put your life in the hands of a computer",
            options: props.options
        };
        _this.deleteOptions = _this.deleteOptions.bind(_this);
        _this.pickOption = _this.pickOption.bind(_this);
        _this.addOption = _this.addOption.bind(_this);
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: "pickOption",
        value: function pickOption() {
            var optionsLength = this.state.options.length;
            if (optionsLength > 0) {
                alert(this.state.options[Math.floor(Math.random() * optionsLength)]);
            }
        }
    }, {
        key: "deleteOptions",
        value: function deleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "addOption",
        value: function addOption(option) {
            if (!option) {
                return "Enter valid value to add item";
            } else if (this.state.options.indexOf(option) > -1) {
                return 'This option already exists';
            }

            this.setState(function (prevState) {
                return { options: [].concat(_toConsumableArray(prevState.options), [option]) };
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Header, {
                    title: this.state.title,
                    subtitle: this.state.subtitle
                }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    pickOption: this.pickOption
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    deleteOptions: this.deleteOptions
                }),
                React.createElement(AddOption, { addOption: this.addOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

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

IndecisionApp.defaultProps = {
    options: []
};

var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            "p",
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'some default'

    /*class Action extends React.Component {
        render() {
            return (
                    <div>
                        <button onClick={this.props.pickOption} disabled={!this.props.hasOptions}>What should I do?</button>
                    </div>
                )
        }
    }*/

};var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            {
                onClick: props.pickOption,
                disabled: !props.hasOptions
            },
            "What should I do?"
        )
    );
};

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

var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.deleteOptions },
            "Remove All"
        ),
        React.createElement(
            "ul",
            null,
            props.options.map(function (option) {
                return React.createElement(Option, { key: option, option: option });
            })
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.optionSubmit = _this2.optionSubmit.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: "optionSubmit",
        value: function optionSubmit(e) {
            e.preventDefault();

            var option = e.target.elements.option.value.trim();
            var error = this.props.addOption(option);

            this.setState(function () {
                return error;
            });

            /*this.setState(() => {
                return {
                    error
                }
            })*/

            if (!error) {
                e.target.elements.option.value = "";
            }
            /*if(option) {
                this.props.addOption(option);
                e.target.elements.option.value = "";
            }*/
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.optionSubmit },
                this.state.error && React.createElement(
                    "p",
                    null,
                    this.state.error
                ),
                React.createElement("input", { type: "text", name: "option" }),
                React.createElement(
                    "button",
                    null,
                    "Add"
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

var Option = function (_React$Component3) {
    _inherits(Option, _React$Component3);

    function Option() {
        _classCallCheck(this, Option);

        return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
    }

    _createClass(Option, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "li",
                null,
                this.props.option
            );
        }
    }]);

    return Option;
}(React.Component);

/*const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
};*/

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
