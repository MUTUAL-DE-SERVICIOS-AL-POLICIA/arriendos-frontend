import { PropertieModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const propertieSlice = createSlice({
  name: 'propertie',
  initialState: {
    properties: <PropertieModel[] | null>null,
  },
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload.properties;
    },
    addPropertie: (state, action) => {
      state.properties = [...state.properties!, action.payload.propertie]
    },
    updatePropertie: (state, action) => {
      state.properties = [...state.properties!.map((e: PropertieModel) => {
        if (e.id === action.payload.propertie.id) {
          return { ...action.payload.propertie }
        }
        return e
      })]
    },

    addRoom: (state, action) => {
      state.properties = [...state.properties!.map((e: PropertieModel) => {
        if (e.id === action.payload.room.property) {
          e.rooms = [...e.rooms, action.payload.room]
        }
        return e;
      })];
    },

    updateRoom: (state, action) => {

      const propertyIndex = state.properties!.findIndex((e) => e.id === action.payload.room.property)

      if (propertyIndex !== -1) {
        const updatedProperty = { ...state.properties![propertyIndex] }

        updatedProperty.rooms = updatedProperty.rooms.map((room) => {
          if (room.id === action.payload.room.id) {
            return { ...room, ...action.payload.room }
          }
          return room
        })
        state.properties![propertyIndex] = updatedProperty;
      }
    },
    clearProperties: (state,/* action*/) => {
      state.properties = null
    }
  }
});


// Action creators are generated for each case reducer function
export const { setProperties, addPropertie, updatePropertie, addRoom, updateRoom, clearProperties } = propertieSlice.actions;