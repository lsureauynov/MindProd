import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import Home from './components/web/home/Home'
import Register from './components/web/auth/Register'
import Login from './components/web/auth/Login'
import SearchPage from './components/web/search/SearchPage'
import Story from './components/web/story/Story'
import Account from './components/web/account/Account'
import GameMenu from './components/game/gameMenu/GameMenu'
import Dialogue from './components/game/dialogue/Dialogue'
import Contact from './components/web/contact/Contact'
import AccusationWrapper from './components/game/accusation/AccusationWrapper'
import PrivateRoute from './components/routing/PrivateRoute'
import './App.css'

const App: React.FC = () => {
  return (
    <Box bg="gray.900" minH="100vh">
      <Header />
      <Box as="main" pt="80px">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<SearchPage />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />

          {/* Routes protégées */}
          <Route path="/account" element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/game/:id" element={
            <PrivateRoute>
              <GameMenu />
            </PrivateRoute>
          } />
          <Route path="/game/:id/dialogue/:characterId" element={
            <PrivateRoute>
              <Dialogue />
            </PrivateRoute>
          } />
          <Route path="/game/:id/accusation" element={
            <PrivateRoute>
              <AccusationWrapper />
            </PrivateRoute>
          } />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
