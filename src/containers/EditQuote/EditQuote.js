import React, {Component} from 'react';
import axios from 'axios';

import QuoteForm from "../QuoteForm/QuoteForm";
import withLoader from '../../hoc/withLoader/withLoader';


class EditQuote extends Component {

    state = {
        quote: null
    };

    componentDidMount () {
        let id = this.props.match.params.id;
        axios.get('/quotes2/' + id + '.json').then(response => {
            this.setState({quote: response.data})
        })
    }

    editQuoteHandler = (quote) => {
        let id = this.props.match.params.id;
        axios.put('/quotes2/' + id + '.json', quote).then(() => {
            this.props.history.goBack();
        })
    };

    render () {
        let form = null;

        if (this.state.quote) {
            form = <QuoteForm quote={this.state.quote} saved={this.editQuoteHandler}/>;
        }

        return(
            <div className="form-block content">
                <h1 className="form-block-title">Adit quote</h1>
                {form}
            </div>
        )

    }
}

export default withLoader(EditQuote, axios);