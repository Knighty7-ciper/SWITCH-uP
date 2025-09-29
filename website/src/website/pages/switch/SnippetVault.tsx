import * as React from "react";

export interface Snippet {
  id: string;
  title: string;
  code: string;
  tags: string[];
}

const STORAGE_KEY = "switch:snippets";

function loadSnippets(): Snippet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Snippet[]) : [];
  } catch {
    return [];
  }
}

function saveSnippets(list: Snippet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function SnippetVault({
  open,
  onClose,
  onInsert,
}: {
  open: boolean;
  onClose: () => void;
  onInsert: (code: string) => void;
}) {
  const [snippets, setSnippets] = React.useState<Snippet[]>(loadSnippets());
  const [q, setQ] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setSnippets(loadSnippets());
    }
  }, [open]);

  if (!open) return null;

  const filtered = snippets.filter((s) => {
    if (!q) return true;
    const t = q.toLowerCase();
    return (
      s.title.toLowerCase().includes(t) ||
      s.tags.join(",").toLowerCase().includes(t) ||
      s.code.toLowerCase().includes(t)
    );
  });

  function addSnippet() {
    if (!title.trim()) return;
    const next: Snippet = {
      id: String(Date.now()) + Math.random().toString(36).slice(2),
      title: title.trim(),
      code,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const list = [next, ...snippets];
    setSnippets(list);
    saveSnippets(list);
    setTitle("");
    setTags("");
    setCode("");
  }

  function removeSnippet(id: string) {
    const list = snippets.filter((s) => s.id !== id);
    setSnippets(list);
    saveSnippets(list);
  }

  return (
    <div className="switch-modal-backdrop" onClick={onClose}>
      <div className="switch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="switch-modal-header">
          <div>Snippet Vault</div>
          <button className="switch-secondary-btn" onClick={onClose}>Close</button>
        </div>
        <div className="switch-modal-body">
          <div className="switch-snippet-form">
            <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input placeholder="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
            <textarea placeholder="Code" value={code} onChange={(e)=>setCode(e.target.value)} rows={6} />
            <button className="switch-secondary-btn" onClick={addSnippet}>Add</button>
          </div>
          <div className="switch-snippet-search">
            <input placeholder="Search (title, tags, code)" value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>
          <ul className="switch-snippet-list">
            {filtered.map((s)=> (
              <li key={s.id} className="switch-snippet-item">
                <div className="switch-snippet-meta">
                  <div className="switch-snippet-title">{s.title}</div>
                  <div className="switch-snippet-tags">{s.tags.map((t)=> <span key={t} className="switch-tag">#{t}</span>)}</div>
                </div>
                <div className="switch-snippet-actions">
                  <button className="switch-secondary-btn" onClick={()=>onInsert(s.code)}>Insert</button>
                  <button className="switch-secondary-btn" onClick={()=>removeSnippet(s.id)}>Delete</button>
                </div>
              </li>
            ))}
            {filtered.length === 0 && <li className="switch-empty">No snippets</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
