import React, { Component } from 'react';
import './App.css';
import Home from './sections/Home'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Navbar from './Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.getScrollPosition = this.getScrollPosition.bind(this)
    this.openProjects = this.openProjects.bind(this)
    this.closeProjects = this.closeProjects.bind(this)
    this.setPage = this.setPage.bind(this)
    this.state = {
      scroll: 0,
      projectsOpen: false,
      page: 1
    }
  }

  componentDidMount = () =>
    window.addEventListener('scroll', this.getScrollPosition)

  getScrollPosition = () =>
    this.setState({scroll: window.scrollY})

  openProjects = () =>
    this.setState({projectsOpen: true})

  closeProjects = () =>
    this.setState({projectsOpen: false})

  setPage = pageNumber =>
    this.setState({page: pageNumber})

  render() {
    const {openProjects, projectsOpen} = this.state
    return (
      <div className="App">
        <Navbar currentState={this.state} />
        {
          !projectsOpen ? <React.Fragment>
          <Home currentState={this.state} setPage={this.setPage}/>
          <About currentState={this.state} setPage={this.setPage} />
          </React.Fragment>  :
          null
        }
        <Projects currentState={this.state}
        openProjects={this.openProjects} closeProjects={this.closeProjects}
        setPage={this.setPage} />
        {
          !projectsOpen ? <Contact currentState={this.state}
          setPage={this.setPage} /> : null
        }
      </div>
    );
  }
}

export default App;
