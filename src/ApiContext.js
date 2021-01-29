import React from 'react';

const ApiContext = React.createContext({
    pantry: [],
    diet: [],
    addFood: () => {},
    addDiet: () => {},
    deleteFood: () => {},
    eatFood: () => {}
})

export default ApiContext;