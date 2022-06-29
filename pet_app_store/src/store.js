import {configureStore} from '@reduxjs/toolkit';

import pets from './reducers/Pets';

const store = configureStore({reducer: pets});

export default store;
