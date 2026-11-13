import { useState } from 'react';
import { Copy, ChevronDown } from './ui/icons';

function legacyCopy(text: string) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    Object.assign(ta.style, { position: 'fixed', top: '0', left: '0', opacity: '0' });
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const range = document.createRange();
    range.selectNodeContents(ta);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function AIPrompt({ promptText, onCopied }: { promptText: string; onCopied: (ok: boolean) => void }) {
  const [full, setFull] = useState(false);

  const copy = () => {
    const ok = legacyCopy(promptText);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(promptText).then(() => { if (!ok) onCopied(true); }, () => { if (!ok) onCopied(false); });
    }
    if (ok) onCopied(true);
    else if (!navigator.clipboard) onCopied(false);
  };

  return (
    <div className="group">
      <div className={`prompt${full ? ' full' : ''}`}>
        <pre>{promptText}</pre>
        {!full && <button className="prompt-more" onClick={() => setFull(true)}>Показать полностью <ChevronDown size={13} /></button>}
      </div>
      <button className="row row-btn row-action" onClick={copy}>
        <Copy size={18} />
        <span>Скопировать промпт</span>
      </button>
    </div>
  );
}
