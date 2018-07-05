import React, {Component} from 'react'
import './About.css'

class About extends Component {

  constructor(props) {
    super(props)
    this._wrapper = React.createRef()
  }

  componentDidUpdate = () =>
  {
    if (this.props.currentState.page !== 2) {
      const {scroll} = this.props.currentState
      const wrapperTop = this._wrapper.current.offsetTop
      const wrapperHeight = this._wrapper.current.offsetHeight
      const wrapperBottom = wrapperTop + wrapperHeight
      if (scroll+48 > wrapperTop && scroll+48 < wrapperBottom) {
        this.props.setPage(2)
      }
    }
  }

  render() {
    const content = sections.map(
      (section, i) =>
        <Section text={section.text} title={section.title} key={i}
        currentState={this.props.currentState} />
    )
    return <section className="about" id="about">
        <div className="wrapper" ref={this._wrapper}>
          {content}
        </div>
      </section>
  }
}

class Section extends Component {

  constructor(props) {
    super(props)
    this._section = React.createRef()
    this.state = {
      show: false
    }
  }

  componentDidUpdate = () =>
  {
    if (!this.state.show) {
      const {scroll} = this.props.currentState
      const sectionTop = this._section.current.offsetTop
      const sectionHeight = this._section.current.offsetHeight
      const height = window.innerHeight
      const sectionBottom = sectionTop + sectionHeight

      if (scroll + height > sectionBottom) {
        this.setState({show: true})
      }
    }
  }

  render(){
    const {title, text} = this.props
    const show = this.state.show
    return <div className={`section ${show ? null : 'hidden'}`}
    ref={this._section}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  }
}

const sections = [
  {
    title: 'О компании',
    text: 'Значимость этих проблем настолько очевидна, что сложившаяся структура организации играет важную роль в формировании модели развития. Рамки и место обучения кадров требуют от нас анализа позиций.'
  },
  {
    title: 'Секция 2',
    text: 'Значимость этих проблем настолько очевидна, что сложившаяся структура организации играет важную роль в формировании модели развития. Рамки и место обучения кадров требуют от нас анализа позиций.'
  },
  {
    title: 'Секция 3',
    text: 'Значимость этих проблем настолько очевидна, что сложившаяся структура организации играет важную роль в формировании модели развития. Рамки и место обучения кадров требуют от нас анализа позиций.'
  },
  {
    title: 'Секция 4',
    text: 'Значимость этих проблем настолько очевидна, что сложившаяся структура организации играет важную роль в формировании модели развития. Рамки и место обучения кадров требуют от нас анализа позиций.'
  },
]

export default About
