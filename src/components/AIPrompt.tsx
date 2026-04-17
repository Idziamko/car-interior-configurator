import { useState } from 'react';

interface AIPromptProps {
    promptText: string;
}

export function AIPrompt({ promptText }: AIPromptProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(promptText);
            } else {
                // Fallback for non-secure contexts (http, old browsers)
                const ta = document.createElement('textarea');
                ta.value = promptText;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (e) {
            console.error('Copy failed', e);
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
