import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './paginator.css';

class Paginator extends Component {
    state = {
        currentPage: 1,
        rangeBottom: 1,
        rangeTop: 1,
        currentSearchValue: null
    }

    componentDidMount() {
        this.setPageRange(this.state.currentPage);
    }

    componentDidUpdate(nextProps) {
        if (nextProps.currentSearch !== this.state.currentSearchValue) {
            this.setState({ currentSearchValue: nextProps.currentSearch, currentPage: 1 });
            this.setPageRange(1);
        }
    }

    render () {
        const numArray = [];

        for (let i = this.state.rangeBottom; i <= this.state.rangeTop; i++) {
            numArray.push(<div style={{cursor: 'pointer'}} className={ this.state.currentPage === i ? 'highlighted' : 'no-highlight' } key={i} onClick={() => this.selectPageNumber(i)}>{i}</div>);
        }

        return (
            <div className="flex-row paginator-container" style={{width: '50%', margin: 'auto', padding: '50px 0px', justifyContent: 'center'}}>
                <i className="material-icons focus-pointer" onClick={() => this.selectPageNumber(1)}>first_page</i>
                <i className="material-icons focus-pointer" style={{marginLeft: '10px', marginRight: '10px'}} onClick={() => this.selectPageNumber(this.state.currentPage - 1)}>chevron_left</i>
                <div className="flex-row">
                    {numArray.map(num => {
                        return num;
                    })}
                </div>
                <i className="material-icons focus-pointer" style={{marginLeft: '10px', marginRight: '10px'}} onClick={() => this.selectPageNumber(this.state.currentPage + 1)}>chevron_right</i>
                <i className="material-icons focus-pointer" onClick={() => this.selectPageNumber(this.props.pageData.total_pages ? this.props.pageData.total_pages : 1)}>last_page</i>
            </div>
        )
    }

    selectPageNumber(pageNumber) {
        this.setPageRange(pageNumber);
    }

    pageBack() {
        this.setState({ currentPage: (this.state.currentPage - 1) });
    }

    pageForward() {
        this.setState({ currentPage: (this.state.currentPage + 1) });
    }

    firstPage() {
        this.setState({ currentPage: 1 });
    }

    lastPage() {
        this.setState({ currentPage: this.props.pageData.total_pages });
    }

    setPageRange(currentPage) {
        if (this.props.pageData.total_pages && (currentPage > this.props.pageData.total_pages)) {
            return;
        } else if (currentPage < 1) {
            return;
        } else if (!this.props.pageData.total_pages && currentPage > 1) {
            return;
        } else {
            this.setState({ currentPage: currentPage });
            this.props.searchMovies(this.props.currentSearch, currentPage);
        
            if (currentPage > 2) {
                this.setState({ rangeBottom: currentPage - 2, rangeTop: (currentPage + 2) > this.props.pageData.total_pages ? this.props.pageData.total_pages : (currentPage + 2)});
            } else if (currentPage === 2) {
                this.setState({ rangeBottom: 1, rangeTop: (currentPage + 3) > this.props.pageData.total_pages ? this.props.pageData.total_pages : (currentPage + 3)});
            } else {
                this.setState({ rangeBottom: 1, rangeTop: (currentPage + 4) > this.props.pageData.total_pages ? this.props.pageData.total_pages : (currentPage + 4)});
            }
            
            if (!this.props.pageData.total_pages) {
                this.setState({ rangeTop: 1 });
            }
        }
    }
}

export default connect(null, actions)(Paginator);