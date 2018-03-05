import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import constants from '../../constants';
import Quote from "../../components/Quote/Quote";
import withLoader from '../../hoc/withLoader/withLoader';

class QuotesList extends Component {

    state = {
        quotes: [],
        category: null
    };

    _loadData = () => {
        let url = '/quotes2.json';
        let category = this.props.match.params.category;

        if (category) {
            url += '?orderBy="category"&equalTo="' + category + '"';
        }

        axios.get(url).then(response => {

            let quotes = Object.keys(response.data).map(key => {
                return {...response.data[key], id: key}
            });

            this.setState({quotes});
        })
    };

    componentDidMount () {
       this._loadData();
    };

    componentDidUpdate () {
        if (this.props.match.params.category !== this.state.category){
            this.setState({category: this.props.match.params.category});
            this._loadData();
        }
    }

    editHandler = (id) => {
        this.props.history.push('/edit-quote/' + id);
    };

    removeQuoteHandler = (id) => {
        const index = this.state.quotes.findIndex(item => item.id === id);
        const quotes = [...this.state.quotes];
        axios.delete(`/quotes2/${id}.json`).then(() => {
            quotes.splice(index,1);
            this.setState({quotes});
        })
    };


    render () {

        let quotes = this.state.quotes.map(quote => (
            <Quote
                key={quote.id}
                author={quote.author}
                body={quote.body}
                category={quote.category}
                edited={() => this.editHandler(quote.id)}
                deleted={() => this.removeQuoteHandler(quote.id)}
            />

        ));

        return (
            <div className="container content clearfix">
                <div className="sidebar">
                    <div className="categories">
                        {constants.categoties.map(category => (
                            <Link to={`/quotes/${category.id}`}
                                  className="category-link"
                                  key={category.id}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>

                </div>
                <div className="main-column">
                    {quotes}
                </div>

            </div>
        );

    }
}

export default withLoader(QuotesList, axios);