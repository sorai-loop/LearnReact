import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { ArrowLeft, Save } from 'lucide-react';
import { use, useState } from 'react';
import noteAPI from '../../lib/api';

function NewNote() {
  const [title, setTitel] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const createNote = async () => {
    setSaving(true);
    await noteAPI.create({ title, content });
    navigate('/');
    setSaving(false);
  };

  return (
    <div className="new-note">
      <div className="new-note__header">
        <Link className="new-note__back-btn" to="/">
          <ArrowLeft className="new-note__back-icon" /> 戻る
        </Link>

        <div className="new-note__actions">
          <button className="new-note__save-btn"
            disabled={!title.trim() || !content.trim() || saving}
            onClick={createNote}>
            <Save className="new-note__save-icon" />
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      <div className="new-note__content">
        <div className="new-note__meta">
          <div className="new-note__title-container">
            <input
              type="text"
              placeholder="タイトルを入力..."
              className="new-note__title-input"
              value={title}
              onChange={(e) => setTitel(e.target.value)}
            />
          </div>
        </div>

        <div className="new-note__editor">
          <textarea
            placeholder="メモの内容を入力してください..."
            className="new-note__textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default NewNote;
