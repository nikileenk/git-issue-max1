import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import IssueRow from "./components/IssueRow";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



class App extends Component {
  state = {
    data: false,
    search: ""
  };

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {

      axios.get(`https://api.github.com/repos/facebook/create-react-app/issues`)
      .then((res)=>{
        this.setState({ data: res.data });
        console.log("parsed json", res);
      })
      .catch((ex)=>{
        console.log("parsing failed", ex);
      });
  }

  render() {
    const { data } = this.state;

    if (!data || !data.length) {
      return <div className="loader">Loading...</div>;
    }

    const filteredData = data.filter(issue => {
      const lowerCaseTitle = issue.title.toLowerCase();
      const lowerCaseUser = issue.user.login.toLowerCase();
      const lowerCaseSearch = this.state.search.toLowerCase();
      return (
        lowerCaseTitle.includes(lowerCaseSearch) ||
        lowerCaseUser.includes(lowerCaseSearch)
      );
 
    });

    return (
      <div className="App">
        <Header />
        <div className="topnav">
       
        <input
          type="text"
          placeholder="Search"
          autoFocus
          value={this.state.search}
          onChange={(e)=>this.updateSearch(e)}
          
        />
        
        </div>

        <div className="issues-table">
          {filteredData.map(issue => (
            <IssueRow key={`${issue.id} _issue_row`} issue={issue} />
          ))}
         
        </div>
      </div>
    );
  }
}

export default App;
