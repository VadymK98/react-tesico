import React, {Component} from 'react'
import './Navbar.css'
import arrow from './sections/images/left-arrow.svg'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.state = {
      hamburgerClicked: false,
      hamburgerColor: '',
      menuShow:'hidden',
      menuOpen: false
    }
  }

  toggleMenu = props =>
  {
    this.setState({hamburgerClicked: !this.state.hamburgerClicked})
    if (!this.state.menuOpen) {
      this.setState({menuOpen: true})
    }
  }

  closeMenu = props =>
    this.setState({menuOpen: false})

  componentDidUpdate = prevProps =>
  {
    if (prevProps.currentState.page !== this.props.currentState.page) {
      const {page} = this.props.currentState
      page === 1 ? this.setState({hamburgerColor: ''}) :
        this.setState({hamburgerColor: 'blue'})
    }
  }

  componentDidMount = () =>
    setTimeout(
      () => this.setState({menuShow: ''}), 700)

  render() {
    const {hamburgerClicked, hamburgerColor, menuShow, menuOpen} = this.state
    const {projectsOpen} = this.props.currentState
    return <React.Fragment>
      <header className={menuShow}>
        {
          !projectsOpen ? <Hamburger clicked={hamburgerClicked} toggleBurger={this.toggleMenu}
        hamburgerColor={hamburgerColor} /> : <CollapseArrow
        collapseProjects={this.props.collapseProjects} />
        }
      </header>
      {
        menuOpen ? <Menu hamburgerClicked={hamburgerClicked}
        closeMenu={this.closeMenu} toggleMenu={this.toggleMenu}
        projectsOpen={projectsOpen} /> : null
      }
    </React.Fragment>
  }
}

const CollapseArrow = props =>
  <div className="arrow"
  onClick={props.collapseProjects} >
    <img src={arrow} alt="arrow" height="30px" />
  </div>

const Hamburger = props =>
  <div className={`hamburger-menu ${props.clicked ? 'open' : null}`}
  onClick={props.toggleBurger} >
    <span className={`stick ${props.hamburgerColor}`}></span>
    <span className={`stick ${props.hamburgerColor}`}></span>
    <span className={`stick ${props.hamburgerColor}`}></span>
    <span className={`stick ${props.hamburgerColor}`}></span>
  </div>

class Menu extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      phase: 'hidden'
    }
  }

  componentDidMount = () =>
  {
    setTimeout(
      () => this.setState({phase: ''}), 1
    )
  }

  componentDidUpdate = prevProps =>
  {
    if (!this.props.hamburgerClicked && prevProps.hamburgerClicked) {
      this.setState({phase: 'hidden'})
      setTimeout(
        () => this.props.closeMenu(), 700
      )
    }
  }

  handleClick = () =>
  {
    this.props.toggleMenu()
  }


  render() {
    const {phase, linkPhase} = this.state
    return <div className={`menu-wrapper ${phase}`}>
      <ul>
        <li className={`menu-item ${phase}`}>
          <a href="#main" onClick={this.handleClick} >Главная</a>
        </li>
        <li className={`menu-item ${phase}`}>
          <a href="#about" onClick={this.handleClick}>О компании</a>
        </li>
        <li className={`menu-item ${phase}`}>
          <a href="#projects" onClick={this.handleClick}>Проекты</a>
        </li>
        <li className={`menu-item ${phase}`}>
          <a href="#contact" onClick={this.handleClick}>Контакты</a>
        </li>
      </ul>
    </div>
  }
}

export default Navbar
