import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface to define the structure of a contact
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

// Initial state of the contacts array
const initialState: Contact[] = [];

// Create a slice for managing contacts using Redux Toolkit
const contactsSlice = createSlice({
  name: 'contacts', // Slice name
  initialState,   // Initial state
  reducers: {
    // Reducer function to add a new contact
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    // Reducer function to update an existing contact
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Reducer function to remove a contact by ID
    removeContact: (state, action: PayloadAction<string>) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

// Export the action creators and the reducer
export const { addContact, updateContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
