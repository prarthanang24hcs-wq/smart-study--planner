import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";

function NotesPage() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("smartStudyNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("smartStudyNotes", JSON.stringify(notes));
  }, [notes]);

  const addTextNote = () => {
    if (!title.trim() && !text.trim()) {
      alert("Please enter a note first.");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title || "Untitled Note",
      text,
      image: null,
    };

    setNotes((currentNotes) => [
      newNote,
      ...currentNotes,
    ]);

    setTitle("");
    setText("");
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const imageData = e.target.result;

        try {
          setIsExtracting(true);

          const result = await Tesseract.recognize(
            imageData,
            "eng"
          );

          const extractedText = result.data.text.trim();

          const newNote = {
            id: Date.now() + Math.random(),
            title: file.name,
            text:
              extractedText ||
              "No text could be detected.",
            image: imageData,
          };

          setNotes((currentNotes) => [
            newNote,
            ...currentNotes,
          ]);
        } catch (error) {
          console.error("OCR Error:", error);

          const newNote = {
            id: Date.now() + Math.random(),
            title: file.name,
            text: "Could not extract text from this image.",
            image: imageData,
          };

          setNotes((currentNotes) => [
            newNote,
            ...currentNotes,
          ]);
        } finally {
          setIsExtracting(false);
        }
      };

      reader.readAsDataURL(file);
    });

    event.target.value = "";
  };

  const deleteNote = (id) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );
  };

  return (
    <div className="notes-page">

      <div className="notes-header">

        <div>
          <h1>My Notes 📝</h1>

          <p>
            Write, save and upload your study notes in one place.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => fileInputRef.current.click()}
          disabled={isExtracting}
        >
          {isExtracting
            ? "🔍 Extracting Text..."
            : "🖼️ Upload Notes"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleImageUpload}
        />

      </div>

      <div className="notes-form">

        <h2>✏️ Write a Note</h2>

        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write or paste your notes here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="primary-button"
          onClick={addTextNote}
        >
          + Save Note
        </button>

      </div>

      <div className="notes-list">

        {notes.length === 0 ? (
          <div className="empty-notes">

            <div className="empty-notes-icon">
              📝
            </div>

            <h2>No Notes Yet</h2>

            <p>
              Write a note or upload an image of your notes
              to get started.
            </p>

          </div>
        ) : (
          notes.map((note) => (

            <div
              className="note-card"
              key={note.id}
            >

              <div className="note-card-header">

                <h2>
                  {note.title}
                </h2>

                <button
                  className="note-delete"
                  onClick={() => deleteNote(note.id)}
                >
                  🗑️
                </button>

              </div>

              {note.image && (
                <img
                  className="note-image"
                  src={note.image}
                  alt={note.title}
                />
              )}

              {note.text && (
                <p className="note-text">
                  {note.text}
                </p>
              )}
              {note.text && (
  <button
    className="primary-button"
    onClick={() => {
      localStorage.setItem("aiStudyText", note.text);
      alert("Note sent to AI Study Assistant!");
    }}
  >
    🤖 Simplify with AI
  </button>
)}

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default NotesPage;