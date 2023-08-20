import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const initialState: Contact[] = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeContact: (state, action: PayloadAction<string>) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
