import React, {Component} from 'react';
import constants from "../../constants";
import './QuoteForm.css';

class QuoteForm extends Component {
    state = {
        quote: {
            category : constants.categoties[0].id,
            author: '',
            body: ''
        }
    };

    constructor (props) {
        super (props);

         if (props.quote) {
             this.state = {quote: props.quote}
         } else {
             this.state = {
                 quote: {
                     category : constants.categoties[0].id,
                     author: '',
                     body: ''
                 }
             };
         }
    }

    inputChangeHandler = event => {
        event.persist();
        this.setState(prevState => {
            const quoteCopy = {...prevState.quote};
            quoteCopy[event.target.name] = event.target.value;
            return {quote: quoteCopy}
        })
    };

    submitHandler = event => {
        event.preventDefault();
        this.props.saved(this.state.quote);
    };


    render () {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="form-row">
                    <label htmlFor="category">Select category of quote</label>
                    <select value={this.state.quote.category}
                            onChange={this.inputChangeHandler}
                            name="category"
                            id="category">
                        {constants.categoties.map(category => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <input
                        className="field"
                        type="text"
                        name="author"
                        placeholder="Enter author name"
                        onChange={this.inputChangeHandler}
                        value={this.state.quote.author}
                    />
                </div>
                <div className="form-row">
                    <textarea
                        name="body"
                        className="field area"
                        placeholder="Enter quote"
                        onChange={this.inputChangeHandler}
                        value={this.state.quote.body}
                    />
                </div>
                <div className="form-row-btn">
                    <button className="form-btn">Publish</button>
                </div>

            </form>
        )
    }
}

export default QuoteForm;