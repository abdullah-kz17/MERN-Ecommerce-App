import React from 'react'
import { FaFootballBall, FaBasketballBall, FaTableTennis, FaRunning, FaDumbbell, FaSwimmer } from 'react-icons/fa'
import Hero from "../components/home/Hero.jsx";
import Services from "../components/home/Services.jsx";
import Testionials from "../components/home/Testionials.jsx";

export default function Home() {
  return (
    <div>
        <Hero />
        <Services />
        <Testionials />
    </div>
  )
}

