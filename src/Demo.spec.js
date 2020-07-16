import React from 'react'
// import { App } from './App'
import LearnMore from "./views/LandingPage/Sections/LearnMore.js";
import { mount } from 'cypress-react-unit-test'

describe('Landing Page Tests', () => {
  it.only('Mount test', () => {
    mount(<LearnMore />)
  })
})
