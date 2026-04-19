import React, { useState } from 'react';

interface AIPromptProps {
    promptText: string;
}

export function AIPrompt({ promptText }: AIPromptProps) {
    const [copied, setCopied] = useState(false);

    const execCommandCopy = (text: string): boolean => {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.top = '0'; ta.style.left = '0';
            ta.style.width = '1px'; ta.style.height = '1px';
            ta.style.padding = '0'; ta.style.border = 'none';
            ta.style.outline = 'none'; ta.style.boxShadow = 'none';
            ta.style.background = 'transparent'; ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus(); ta.select();
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
        let ok = execCommandCopy(promptText);
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
        <div style={{
            background: 'linear-gradient(180deg, var(--surface), var(--surface-2))',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: '22px',
            boxShadow: 'var(--shadow-md)',
        }}>
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: '14px', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: 'var(--accent)',
                        boxShadow: '0 0 12px var(--accent)',
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px',
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        color: 'var(--ink-2)',
                        textTransform: 'uppercase',
                    }}>Промпт для AI</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="btn btn-ghost"
                    style={{
                        padding: '10px 16px',
                        fontSize: '13px',
                        color: copied ? 'var(--ok)' : 'var(--ink)',
                        borderColor: copied ? 'rgba(100,227,161,0.5)' : 'var(--line)',
                        background: copied ? 'rgba(100,227,161,0.08)' : 'transparent',
                    }}
                >
                    <span style={{ fontSize: '14px' }}>{copied ? '✓' : '⎘'}</span>
                    {copied ? 'Скопировано' : 'Скопировать'}
                </button>
            </div>
            <div
                className="mono"
                style={{
                    width: '100%',
                    minHeight: '140px',
                    background: 'var(--bg)',
                    color: 'var(--ink-2)',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    lineHeight: '1.7',
                    fontSize: '12px',
                    border: '1px solid var(--line)',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {promptText}
            </div>
            <p style={{
                marginTop: '12px',
                fontSize: '11.5px',
                color: 'var(--ink-4)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
            }}>
                Вставь в Midjourney / DALL·E / Stable Diffusion для фотореалистичной визуализации.
            </p>
        </div>
    );
}
