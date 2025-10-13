import { useState, useEffect } from 'react'
import { supabase } from "./lib/supabaseclient.js";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  useEffect(() => {
    async function testConnection(){
      const {data, error} = await supabase.from('test').select('*');
      console.log("Supabase connected ✅", {data, error});
    }
    testConnection();
  },[]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">ANTIQ 2.0 🔥 Connected to Supabase</h1>
    </div>
  );
}

export default App;

