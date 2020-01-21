import React from 'react';
import PropTypes from  'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends React.Component{

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query})

    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    render(){

        const {contacts, onDeleteContact} = this.props;
        const {query} = this.state;

        let showingContacts;
        if(query){
            const match = new RegExp(escapeRegExp(query, 'i'))
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = contacts;
        }

        showingContacts.sort(sortBy('name'))
        return (
        <div className="list-contacts">
            <div className="list-contacts-top">
                <input
                 className='search-contacts'
                 type='text'
                 placeholder='search contacts'
                 value={query} 
                 onChange={(event) => this.updateQuery(event.target.value)}/>

            </div>
            {showingContacts.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                    <button onClick={this.clearQuery}>Show All</button>
                </div>
               
            )}
             <ol className="contact-list">
                {showingContacts.map((contact) => (
                <li key={contact.id} className='contact-list-item'>
                   <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}} />
                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>
                        <a href="#"  onClick={()=> onDeleteContact(contact)} className='contact-remove'>Remove</a>
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