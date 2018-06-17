console.log('App.js is running!');

const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};

const formSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if(option) {
        app.options.push(option);
        console.log(app.options);
        e.target.elements.option.value = "";
        render();
    }
}

const appRoot = document.getElementById('app');

const removeAll = (e) => {
    e.preventDefault();
   app.options = [];
   console.log(app.options);
   render(); 
};

const makeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    console.log(option);
};

const render = () => {
    const template = (
      <div>
         {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
        <button disabled={app.options.length === 0} onClick={makeDecision}>What should I do?</button>
        <button onClick={removeAll}>Remove All</button>
        <ol>
            {
                app.options.map((option) => {
                    return <li key={option}>{option}</li>;
                })
            }            
        </ol>
        <form action="" onSubmit={formSubmit}>
            <input type="text" name="option"/>
            <button>Add Option</button>
        </form>
      </div>
    );

    ReactDOM.render(template, appRoot);
};

render();