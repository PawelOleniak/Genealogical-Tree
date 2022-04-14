import { configureStore } from '@reduxjs/toolkit';

import addMembers from 'reducers';

export const store = configureStore({
  reducer: { membersSlice: addMembers },
});
