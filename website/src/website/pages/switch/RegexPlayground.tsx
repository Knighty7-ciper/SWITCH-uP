import * as React from "react";
import { ControlledMonacoDiffEditor } from "../../components/monaco/MonacoEditor";

export function RegexPlayground({
  open,
  onClose,
  language,
  original,
}: {
  open: boolean;
  onClose: () => void;
  language: string;
  original: string;
}) {
  const [pattern, setPattern] = React.useState("");
  const [flags, setFlags] = React.useState<string>("g");
  const [modified, setModified] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(()=>{
    if (!open) return;
    try {
      setError(undefined);
      const rx = new RegExp(pattern || "", flags);
      const matches = Array.from(original.matchAll(rx)).map(m=>m[0]);
      setModified(matches.join("\n"));
    } catch(e:any) {
      setError(e?.message || String(e));
      setModified("");
    }
  }, [open, pattern, flags, original]);

  if (!open) return null;

  function toggleFlag(f: string) {
    setFlags((prev)=> prev.includes(f) ? prev.replace(f, "") : prev + f);
  }

  return (
    <div className="switch-modal-backdrop" onClick={onClose}>
      <div className="switch-modal switch-modal-large" onClick={(e)=>e.stopPropagation()}>
        <div className="switch-modal-header">
          <div>Regex Playground</div>
          <button className="switch-secondary-btn" onClick={onClose}>Close</button>
        </div>
        <div className="switch-modal-body">
          <div className="switch-regex-controls">
            <input placeholder="Pattern" value={pattern} onChange={(e)=>setPattern(e.target.value)} />
            <div className="switch-regex-flags">
              {(["g","i","m","s","u","y"]).map((f)=> (
                <label key={f}><input type="checkbox" checked={flags.includes(f)} onChange={()=>toggleFlag(f)} /> {f}</label>
              ))}
            </div>
            {error && <div className="switch-error">{error}</div>}
          </div>
          <div style={{height: 400}}>
            <ControlledMonacoDiffEditor originalValue={original} modifiedValue={modified} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}
