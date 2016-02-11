import React, {PropTypes} from 'react'
import {observable} from 'mobservable'
import {observer} from 'mobservable-react'

const state = observable({
  selectedMethod: null
})

const Connected = (props) => {
  return <div>
    <nav className='navbar is-centered'>
      <p className='navbar-item is-centered'>connected to {state.url}</p>
    </nav>
    <div className='columns'>
      <div className='column is-3'>
        <nav className='menu'>
          <p className='menu-heading'>
            exposed methods
          </p>
          {props.methods.map((method) => {
            const activeCls = method === state.selectedMethod ? ' is-active' : ''
            const style = {}
            if (method === state.selectedMethod) {
              style.backgroundColor = 'red'
            }
            return <a className={'menu-block' + activeCls} style={style} onClick={(ev) => {
              state.selectedMethod = method
            }} key={method}>
              <span className='menu-icon'>
                <i className='fa fa-book' />
              </span>
              {method}
            </a>
          })}
        </nav>
      </div>
      <div className='column'>
        <textarea name='textarea'></textarea>
        <div className='menu-block'>
          <button className='button is-primary is-outlined is-fullwidth'>
            Call
          </button>
        </div>
      </div>
    </div>
  </div>
}
Connected.propTypes = {
  methods: PropTypes.array.isRequired
}

export default observer(Connected)
