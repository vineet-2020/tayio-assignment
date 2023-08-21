import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addContact, updateContact, removeContact } from '../redux/contactsSlice';
import BarChart from './BarChart';
import CovidMap from './CovidMap';
import DataDisplay from './DataDisplay';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const ContactPage: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<'contacts' | 'charts'>('contacts');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Function to handle tab change
  const handleTabChange = (tab: 'contacts' | 'charts') => {
    setActiveTab(tab);
  };

  // Function to handle editing contact details
  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setPhoneNumber(contact.phoneNumber);
    setEmail(contact.email);
  };

  // Function to handle deleting a contact
  const handleDelete = (id: string) => {
    dispatch(removeContact(id));
    setSelectedContact(null);
  };

  // Function to handle updating a contact
  const handleUpdate = (contact: Contact) => {
    const newContact: Contact = {
      id: contact.id,
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    dispatch(updateContact(newContact));

    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setSelectedContact(null);
  };

  // Function to handle submitting a new contact
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact: Contact = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    dispatch(addContact(newContact));

    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setSelectedContact(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-center mb-6">Assignment</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-2 rounded-3xl mt-4 flex flex-col bg-gray-100 p-4">
          {/* Button for switching to Contacts tab */}
          <button
            className={`${activeTab === 'contacts' ? 'text-blue-500 bg-gray-300 font-bold rounded-2xl' : 'text-gray-600'
              } hover:text-blue-500 hover:bg-gray-300 rounded-2xl mb-4`}
            onClick={() => handleTabChange('contacts')}
          >
            Contacts
          </button>
          {/* Button for switching to Charts tab */}
          <button
            className={`${activeTab === 'charts' ? 'text-blue-500 bg-gray-300 font-bold rounded-2xl' : 'text-gray-600'
              } hover:text-blue-500 hover:bg-gray-300 rounded-2xl`}
            onClick={() => handleTabChange('charts')}
          >
            Charts
          </button>
        </div>
        <div className="md:col-span-8">
          {activeTab === 'contacts' ? (
            <div className="bg-gray-100 p-6 mt-4 rounded-3xl h-auto">
              <div className='flex mb-6'>
                <h3 className="text-lg font-semibold">
                  Contact List
                </h3>
                {/* Button to open the contact form */}
                <button
                  className="text-blue-500 hover:underline ml-4 bg-blue-100 rounded-[10px] px-2"
                  onClick={() => {
                    setSelectedContact({
                      id: '',
                      firstName: '',
                      lastName: '',
                      email: '',
                      phoneNumber: '',
                    });
                  }}
                >
                  Add Contact
                </button>
              </div>
              <div className=''>
                {/* Display message when no contacts are available */}
                {contacts.length === 0 ? (
                  <p className="text-blue-500 text-center hover:underline ml-4 bg-blue-100 rounded-[10px] px-2">No contacts have been saved.</p>
                ) : ('')}
              </div>
              <ul>
                {/* Render the list of contacts */}
                {contacts.map((contact) => (
                  <li key={contact.id} className="mb-2">
                    {contact.firstName} {contact.lastName}
                    <button
                      className="bg-green-500 rounded-[10px] ml-2 text-white py-1 px-4 rounded hover:bg-black hover:text-white"
                      onClick={() => handleEdit(contact)}
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
              {selectedContact && (
                <div className="mt-4">
                  {/* Display the contact form */}
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedContact.id ? 'Edit Contact' : 'Add New Contact'}
                  </h3>
                  <form onSubmit={handleSubmit}>
                    {/* Input fields for contact details */}
                    <div className="mb-2">
                      <label htmlFor="firstName" className="block text-gray-700">
                        First Name:
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full border rounded py-1 px-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    {/* ... Repeat for other fields ... */}
                    {selectedContact.id ? (
                      <button
                        onClick={() => handleUpdate(selectedContact)}
                        className="bg-blue-500 mr-2 rounded-[10px] text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        Edit Contact
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-blue-500 rounded-[10px] text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        Add Contact
                      </button>
                    )}
                    {selectedContact.id ? (
                      <button
                        onClick={() => handleDelete(selectedContact.id)}
                        className="bg-blue-500 rounded-[10px] text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        Delete Contact
                      </button>
                    ) : ('')}
                    {selectedContact.id && (
                      <button
                        className="bg-red-500 rounded-[10px] ml-2 text-white py-1 px-4 rounded hover:bg-black hover:text-white"
                        onClick={() => setSelectedContact(null)}
                      >
                        Cancel
                      </button>
                    )}
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-100 p-6 mt-4 rounded-3xl h-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Charts</h3>
                  <p>Charts will be displayed here.</p>
                </div>
                <DataDisplay />
              </div>
              {/* Render the BarChart component */}
              <div className="overflow-x-auto">
                <BarChart /> {/* Adjust width as needed */}
              </div>
              <CovidMap />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
