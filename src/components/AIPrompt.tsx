import React, { useState } from 'react';

interface AIPromptProps {
    promptText: string;
}

export function AIPrompt({ promptText }: AIPromptProps) {
    const [copied, setCopied] = useState(false);

    // Synchronous fallback using textarea + execCommand — works in user gesture on iOS
    const execCommandCopy = (text: string): boolean => {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            // Keep off-screen but interactable — NO readonly (breaks selection on iOS)
            ta.style.position = 'fixed';
            ta.style.top = '0';
            ta.style.left = '0';
            ta.style.width = '1px';
            ta.style.height = '1px';
            ta.style.padding = '0';
            ta.style.border = 'none';
            ta.style.outline = 'none';
            ta.style.boxShadow = 'none';
            ta.style.background = 'transparent';
            ta.style.opacity = '0';
            document.body.appendChild(ta);

            ta.focus();
            ta.select();

            // iOS Safari/WebKit: Range+Selection+setSelectionRange combo is required
            const range = document.createRange();
            range.selectNodeContents(ta);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
            ta.setSelectionRange(0, text.length);

            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            return ok;
        } catch (e) {
            console.error('execCommand copy failed', e);
            return false;
        }
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();

        // Run synchronous fallback FIRST — guaranteed to stay inside user gesture on iOS
        let ok = execCommandCopy(promptText);

        // Also try modern Clipboard API as belt-and-suspenders (fire-and-forget)
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(promptText).then(
                () => { ok = true; },
                err => console.warn('clipboard.writeText failed', err)
            );
        }

        if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } else {
            alert('Не удалось скопировать. Выделите текст вручную.');
        }
    };

    return (
        <div className="panel" style={{ padding: '20px', backgroundColor: 'var(--card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', color: 'var(--text-dark)' }}>ПРОМПТ ДЛЯ AI</span>
                <button
                    onClick={handleCopy}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 14px', fontSize: '0.8rem', fontWeight: 600,
                        color: copied ? '#66d98a' : 'var(--text-main)',
                        background: copied ? 'rgba(102,217,138,0.1)' : 'var(--card-hover)',
                        border: `1px solid ${copied ? '#66d98a' : 'var(--border-active)'}`,
                        borderRadius: 'var(--radius-sm)',
                        transition: 'all 0.2s'
                    }}
                >
                    <span style={{ fontSize: '14px' }}>{copied ? '✓' : '📋'}</span>
                    {copied ? 'Скопировано' : 'Скопировать промпт'}
                </button>
            </div>
            <div
                className="mono"
                style={{
                    width: '100%',
                    minHeight: '120px',
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text-muted)',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    lineHeight: '1.6',
                    fontSize: '0.8rem',
                    border: '1px solid var(--border)',
                    whiteSpace: 'pre-wrap'
                }}
            >
                {promptText}
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.72rem', color: 'var(--text-dark)' }}>
                Промпт сгенерирован на английском — вставь в Midjourney / DALL·E / Stable Diffusion для фотореалистичной визуализации.
            </p>
        </div>
    );
}
