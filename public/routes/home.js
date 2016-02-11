import React from 'react'
import sioRpc from 'socket.io-rpc-client'
import Async from 'react-promise'
import BoundInput from '../components/bound-input'
import Connected from '../components/connected'
import {observer} from 'mobservable-react'
import storedObservable from '../stores/stored-observable'
import connections from '../stores/connections'
import traverse from 'traverse'

const state = storedObservable('connStrings', {
  url: null,
  query: null,
  methods: null,
  selectedMethod: null
})

const explorer = (props) => {
  return <div>
    <Async before={(handlePromise) => {
      return <nav className='navbar'>
        <div className='navbar-item is-centered'>
          <BoundInput className='input' placeholder='http://url' source={state} name='url' type='url'/>
          <BoundInput className='input' placeholder='query=string' source={state} name='query' type='text'/>
        </div>
        <div className='navbar-item is-centered'>
          <button className='button is-primary' onClick={() => {
            connections.rpc = sioRpc(state.url, {
              query: state.query
            })
            handlePromise(connections.rpc.fetchNode(''))
          }}>fetch nodes</button>
        </div>
      </nav>
    }
      }
    then={(nodes) => {
      const methods = []
      traverse(nodes).forEach(function (val) {
        if (this.isLeaf) {
          methods.push(this.path.join('.'))
        }
      })
      return <Connected methods={methods}/>
    }}
    catch={(e) => <div>{e.message}</div>}
    />
  </div>
}

export default observer(explorer)
