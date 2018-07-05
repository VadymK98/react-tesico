import React, {Component} from 'react'
import './Contact.css'

class Contact extends Component {

  constructor(props) {
    super(props)
    this._wrapper = React.createRef()
  }

  componentDidUpdate = () =>
  {
    if (this.props.currentState.page !== 4) {
      const {scroll} = this.props.currentState
      const wrapperTop = this._wrapper.current.offsetTop
      const wrapperHeight = this._wrapper.current.offsetHeight
      const wrapperBottom = wrapperTop + wrapperHeight
      if (scroll+48 > wrapperTop && scroll < wrapperBottom) {
        this.props.setPage(4)
      }
    }
  }

  render() {
    return <section className="contact" id="contact">
      <div className="wrapper" ref={this._wrapper}>
        <Title />
        {
          contactData.map(
            (contact, i) =>
              <ContactCity city={contact.city} country={contact.country}
               street={contact.street} id={i+1} key={i} />
          )
        }
      </div>
    </section>
  }
}

const Title = props =>
  <div className="tile">
    <h2>Контакты</h2>
  </div>

const ContactCity = props =>
  <div className="tile" id={`c${props.id}`}>
    <div className="text">
      <h3>{props.city}, {props.country}</h3>
      {props.street}
    </div>
  </div>

const contactData = [
  {
    city: 'Киев',
    country: 'Украина',
    street: <p>ул. Симона Петлюры, 28 <br />ДБ «СТОЛИЧНЫЙ»<br/>тел. +38 (044) 492 79 26<br/>info@tesico.com.ua</p>
  },
  {
    city: 'Одесса',
    country: 'Украина',
    street: <p>ул. Атамана Головатого, 92,<br/>БЦ «СИЛЬВЕР-ЦЕНТР»<br/>тел. +38 (482) 357 030<br/>info@tesico.com.ua</p>
  },
  {
    city: 'Астана',
    country: 'Казахстан',
    street: <p>ул. Сыганак, 25,<br/>БЦ «АНСАР», 12 эт.<br/>тел. +7 (777) 810 87 21<br/>info@tesico.com.ua</p>
  }
]

export default Contact
