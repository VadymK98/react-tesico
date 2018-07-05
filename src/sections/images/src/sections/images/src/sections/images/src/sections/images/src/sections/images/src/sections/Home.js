import React, {Component} from 'react'
import './Home.css'
import logo from './images/logo.svg'

class Home extends Component {

  constructor(props) {
    super(props)
    this._wrapper = React.createRef()
  }

  componentDidUpdate = () =>
  {
    if (this.props.currentState.page !== 1) {
      const {scroll} = this.props.currentState
      const wrapperTop = this._wrapper.current.offsetTop
      const wrapperHeight = this._wrapper.current.offsetHeight
      const wrapperBottom = wrapperTop + wrapperHeight
      if (scroll > wrapperTop && scroll+48 < wrapperBottom) {
        this.props.setPage(1)
      }
    }
  }

  render() {
    return <section className="home" id="main">
      <div className="wrapper" ref={this._wrapper}>
        <Logo />
        <Subtext />
      </div>
    </section>
  }
}

class Logo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hidden: true
    }
  }

  componentDidMount = () =>
    setTimeout(
      () => this.setState({hidden: false}),
      300
    )

  render() {
    return <React.Fragment>
      <img src={logo} className={
        this.state.hidden ? "logo hidden" : "logo"
      } alt="logo" />
    </React.Fragment>
  }
}

class Subtext extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hidden: true
    }
  }

  componentDidMount = () =>
    setTimeout(
      () => this.setState({hidden: false}),
      500
    )

  render() {
    return <div className={
      this.state.hidden ? "subtext hidden" : "subtext"
    }>
        <h6>
          Инжинерные климатические системы<br />
          в промышленном и гражданском строительстве
        </h6>
      </div>
  }

}


export default Home
