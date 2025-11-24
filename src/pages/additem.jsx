import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function AddItem() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("items").insert([
      {
        title,
        description: desc,
        price,
        user_id: user.id,
      },
    ]);

    if (error) setMessage(error.message);
    else setMessage("Item added successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-8 flex justify-center">
      <form
        onSubmit={handleAdd}
        className="bg-gray-800 p-6 rounded-xl w-full max-w-lg border border-gray-700"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Auction Item</h1>

        {message && <p className="text-amber-400 mb-3">{message}</p>}

        <input
          type="text"
          placeholder="Item title"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button className="w-full bg-amber-600 hover:bg-amber-700 py-2 rounded">
          Upload Item
        </button>
      </form>
    </div>
  );
}
