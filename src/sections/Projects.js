import React, {Component} from 'react'
import './Projects.css'
import './ProjectsExpanded.css'
import arrow from './images/left-arrow.svg'

class Projects extends Component {
  constructor(props) {
    super(props)
    this.openSection = this.openSection.bind(this)
    this.collapseProjects = this.collapseProjects.bind(this)
    this._wrapper = React.createRef()
    this._hero = React.createRef()
    this.state = {
      phase: '',
      heroCentered: 0
    }
  }

  componentDidUpdate = () =>
  {
    if (this.props.currentState.collapseFromMenu &&
    this.props.currentState.projectsOpen) {
      this.collapseProjects()
    }

    if (this.props.currentState.page !== 3) {
      const {scroll} = this.props.currentState
      const wrapperTop = this._wrapper.current.offsetTop
      const wrapperHeight = this._wrapper.current.offsetHeight
      const wrapperBottom = wrapperTop + wrapperHeight
      if (scroll+48 > wrapperTop && scroll+48 < wrapperBottom) {
        this.props.setPage(3)
      }
    }
  }

  scrollToHero = () =>
  {
    const wrapperTop = this._wrapper.current.offsetTop
    const heroTop = this._hero.current.offsetTop
    const heroCentered = (wrapperTop + heroTop)/2
    this.setState({heroCentered})
    window.scrollTo({top: heroCentered, behavior: 'smooth'})
  }

  openSection = () =>
  {
    this.scrollToHero()
    this.setState({phase: 'expanded'})
    setTimeout(
      () => this.setState({phase: 'open'}), 700
    )
    setTimeout(
      () => this.props.openProjects(), 1800
    )
    setTimeout(
      () => window.scrollTo({top: 0}), 1800
    )
  }

  collapseProjects = () =>
  {
    this.props.closeProjects()
    this.setState({phase: ''})
  }

  render() {
    const openProjects = this.props.openProjects
    const {projectsOpen} = this.props.currentState
    const {phase} = this.state
    return <section className="projects" id="projects">
        <div className={`wrapper ${projectsOpen ? 'open' : null }`}
        ref={this._wrapper}>
          <h1 className={`title ${projectsOpen ? 'settled' : phase}`}
          onClick={this.openSection}>Реализованные проекты</h1>
          <React.Fragment>{ !projectsOpen ? <div className={`hero ${phase}`}
           onClick={this.openSection} ref={this._hero}>
            <div className={`overlay`}>
            </div>
           </div>
            : null }</React.Fragment>
          <React.Fragment>
          {
            projectsOpen ? <ProjectsGrid
            collapseProjects={this.collapseProjects} /> : null
          }
          </React.Fragment>
        </div>
      </section>
  }
}

const projects = [
  {
    name: 'Международный аэропорт',
    city: 'Одесса',
    id: '1'
  },
  {
    name: 'Palace Del Mar',
    city: 'Одесса',
    id: '2'
  },
  {
    name: 'ПТК "Шабо"',
    city: 'Одесская область',
    id: '3'
  },
  {
    name: 'ТЦ "Сады победы"',
    city: 'Одесса',
    id: '4'
  },
  {
    name: 'ТЦ "Там-там"',
    city: 'Луцк',
    id: '5'
  },
  {
    name: 'БЦ "Eleven"',
    city: 'Киев',
    id: '6'
  },
  {
    name: 'Финбанк',
    city: 'Одесса',
    id: '7'
  },
  {
    name: 'Эпицентр',
    city: 'Николаев',
    id: '8'
  },
  {
    name: 'ТЦ "OBI"',
    city: 'Одесса',
    id: '9'
  },
  {
    name: 'БЦ "Пятый элемент"',
    city: 'Киев',
    id: '10'
  },
  {
    name: 'ЖК "Морская симфония"',
    city: 'Одесса',
    id: '11'
  },
  {
    name: 'БЦ "PROTASOV"',
    city: 'Киев',
    id: '12'
  }
]

const ProjectsGrid = props =>
  <div className="container">
    {
      projects.map(
        (project, i) =>
          <Project data={project} key={i} />
      )
    }
  </div>

class Project extends Component {

  render() {
    const {name, city, id} = this.props.data
    return <div className="project">
      <div className="project-img" id={`pr${id}`}></div>
      <div className="description">
        <h3>{name}</h3>
        <h4>, {city}</h4>
      </div>
    </div>
  }
}

export default Projects
