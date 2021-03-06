import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import _ from 'lodash';

import Paginator from '../paginator/Paginator';

import './searchMovies.css';

class SearchMovies extends Component {
    state = {
        currentSearchValue: null,
    }
    componentDidMount() {
        this.props.searchMovies('searchMovieDefault');
    }
    
    render() {
        return (
            <div className="main-container">
                <div className="inner-main-container">
                    <div className="form_container">
                        <Card>
                            <form onSubmit={this.props.handleSubmit((values) => this.searchMovies(values))}>
                                <Field
                                    type="text"
                                    name="movieTitle"
                                    component="input"
                                    placeholder="Search movie title..."
                                    style={{width: '400px', paddingTop: '10px', color: '#07889B'}}
                                />
                            </form>
                        </Card>
                    </div>
                    <div className="moviesContainer">
                        {this.renderMovies()}
                    </div>
                    <div className="emptyGrow"></div>
                </div>
                <Paginator pageData={this.props.movieSearchResults.pageData} currentSearch={this.state.currentSearchValue !== null ? this.state.currentSearchValue : 'searchMovieDefault'}/>
            </div>
        );
    }

    renderMovies() {
        return this.props.movieSearchResults.movies.map(movie => {
            return (
                <div className="single_movie_container card" key={movie.id}>
                    <Link to={`/movie-details/${movie.id}`} className="linkStyle">
                        <div>
                            <div>
                                <img src={ `http://image.tmdb.org/t/p/w185//${movie.poster_path}` }
                                    alt="poster"/>
                            </div>
                            <div>
                                {movie.title}
                            </div>
                        </div>
                    </ Link>
                </div>
            );
        });
    }

    searchMovies(formValues) {
        this.props.searchMovies(formValues.movieTitle, 1);
        this.setState({ currentSearchValue: formValues.movieTitle });
    }

}

function mapStateToProps(state) {
    // If statements are required because form values don't exist on initial load
    if (_.has(state.form, 'searchMovies') && _.has(state.form.searchMovies, 'values')) {
        return { 
            movieSearchResults: state.movieSearchResults,
            formValues: state.form.searchMovies.values
        };
    } else {
        return {
            movieSearchResults: state.movieSearchResults,
        }
    }
}

SearchMovies = connect(mapStateToProps, actions)(SearchMovies);
export default reduxForm({
    form: 'searchMovies'
})(SearchMovies);