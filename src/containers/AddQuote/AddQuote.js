import React, {Component} from 'react';
import axios from 'axios';

import QuoteForm from "../QuoteForm/QuoteForm";
import withLoader from '../../hoc/withLoader/withLoader';


class AddQuote extends Component {

    addQuoteHandler = (quote) => {
        axios.post('/quotes2.json', quote).then(() => {
            this.props.history.push('/');
        })
    };

    render () {
        let form = <QuoteForm saved={this.addQuoteHandler}/>;

        return(
            <div className="form-block content">
                <h1 className="form-block-title">Add new quote</h1>
                {form}
            </div>
        )

    }
}

export default withLoader(AddQuote, axios);