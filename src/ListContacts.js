import React from 'react';
import PropTypes from  'prop-types';

class ListContacts extends React.Component{

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query})

    }

    render(){
        return (
        <div className="list-contacts">
            <div className="list-contacts-top">
                <input
                 className='search-contacts'
                 type='text'
                 placeholder='search contacts'
                 value={this.state.query} 
                 onChange={(event) => this.updateQuery(event.target.value)}/>

            </div>
             <ol className="contact-list">
                {this.props.contacts.map((contact) => (
                <li key={contact.id} className='contact-list-item'>
                   <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}} />
                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>
                        <a href="#"  onClick={()=> this.props.onDeleteContact(contact)} className='contact-remove'>Remove</a>
                </li>
                ))}
            </ol>
        </div>
           
        )
    }
}



ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired ,
    onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts;