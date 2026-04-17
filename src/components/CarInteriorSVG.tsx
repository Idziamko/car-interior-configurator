import React from 'react';

interface CarInteriorSVGProps {
    colors: Record<string, string>;
    activeZone: string | null;
    onZoneClick: (zoneId: string) => void;
    trimId: string;
    trimColor: string;
}

export function CarInteriorSVG({ colors, activeZone, onZoneClick, trimId, trimColor }: CarInteriorSVGProps) {

    const gProps = (id: string, styleType: 'default' | 'stitch' | 'stroke' = 'default') => {
        const color = colors[id] || '#1A1A1A';
        const isActive = activeZone === id;

        if (styleType === 'stitch') {
            return {
                stroke: color,
                strokeWidth: isActive ? 4 : 2,
                strokeDasharray: "4 4",
                fill: "none",
                cursor: "pointer",
                style: { transition: "all 0.3s ease" },
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); onZoneClick(id); }
            };
        }

        if (styleType === 'stroke') {
            return {
                stroke: color,
                fill: "none",
                cursor: "pointer",
                filter: isActive ? 'drop-shadow(0 0 12px rgba(255,255,255,0.4))' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
                style: { transition: "all 0.3s ease" },
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); onZoneClick(id); }
            };
        }

        return {
            fill: color,
            stroke: isActive ? '#fff' : 'rgba(255,255,255,0.05)',
            strokeWidth: isActive ? 3 : 1,
            cursor: "pointer",
            filter: isActive ? 'drop-shadow(0 0 12px rgba(255,255,255,0.4))' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
            style: { transition: "all 0.3s ease", transformOrigin: 'center' },
            onClick: (e: React.MouseEvent) => { e.stopPropagation(); onZoneClick(id); }
        };
    };

    const getPiping = () => {
        return {
            stroke: colors.pp || '#1A1A1A',
            strokeWidth: 4,
            fill: "none",
            style: { pointerEvents: 'none' as const }
        };
    };

    // Trim strip fill based on trimId
    const getTrimFill = () => {
        if (trimId === 'carbon') return 'url(#carbonPattern)';
        if (trimId === 'wood_m') return 'url(#woodMattePattern)';
        if (trimId === 'wood_c') return 'url(#woodColorPattern)';
        if (trimId === 'leather') return colors.dt || '#1A1A1A';
        if (trimId === 'custom') return trimColor;
        return colors.dt || '#1A1A1A';
    };

    return (
        <div className="svg-stage">
            <svg
                viewBox="0 0 1000 1200"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}
            >
                <defs>
                    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#888" />
                        <stop offset="50%" stopColor="#ccc" />
                        <stop offset="100%" stopColor="#555" />
                    </linearGradient>
                    <linearGradient id="darkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
                    </linearGradient>

                    {/* Carbon fiber pattern: dark weave with subtle diagonal highlights */}
                    <pattern id="carbonPattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                        <rect width="14" height="14" fill="#0e0e10" />
                        <path d="M 0,7 L 7,0 L 14,7 L 7,14 Z" fill="#1e1e22" />
                        <path d="M 0,0 L 14,14 M 14,0 L 0,14" stroke="#2a2a30" strokeWidth="0.6" />
                    </pattern>

                    {/* Matte dark wood pattern */}
                    <pattern id="woodMattePattern" x="0" y="0" width="80" height="28" patternUnits="userSpaceOnUse">
                        <rect width="80" height="28" fill="#2c1a10" />
                        <path d="M 0,6 Q 20,4 40,6 T 80,6" stroke="#3a2418" strokeWidth="1.2" fill="none" opacity="0.7" />
                        <path d="M 0,14 Q 25,12 50,14 T 80,14" stroke="#1f120a" strokeWidth="0.8" fill="none" opacity="0.8" />
                        <path d="M 0,22 Q 15,20 35,22 T 80,22" stroke="#3a2418" strokeWidth="1" fill="none" opacity="0.6" />
                    </pattern>

                    {/* Light/colored wood (walnut) pattern */}
                    <pattern id="woodColorPattern" x="0" y="0" width="80" height="28" patternUnits="userSpaceOnUse">
                        <rect width="80" height="28" fill="#8b5a2b" />
                        <path d="M 0,6 Q 20,4 40,6 T 80,6" stroke="#6b3e18" strokeWidth="1.2" fill="none" opacity="0.8" />
                        <path d="M 0,14 Q 25,12 50,14 T 80,14" stroke="#a06e3d" strokeWidth="0.8" fill="none" opacity="0.7" />
                        <path d="M 0,22 Q 15,20 35,22 T 80,22" stroke="#5a321a" strokeWidth="1" fill="none" opacity="0.6" />
                    </pattern>
                </defs>

                {/* 1. FLOOR & FOOTWELLS */}
                <path d="M 50,200 L 450,200 L 450,1100 L 50,1100 Z" {...gProps("fw_d")} />
                <path d="M 550,200 L 950,200 L 950,1100 L 550,1100 Z" {...gProps("fw_p")} />

                {/* Floor Mats */}
                <path d="M 90,500 Q 90,480 110,480 L 410,480 Q 430,480 430,500 L 410,900 Q 400,950 350,950 L 150,950 Q 100,950 90,900 Z" {...gProps("mat_d")} />
                <path d="M 910,500 Q 910,480 890,480 L 590,480 Q 570,480 570,500 L 590,900 Q 600,950 650,950 L 850,950 Q 900,950 910,900 Z" {...gProps("mat_p")} />

                {/* 2. DASHBOARD */}
                {/* Top Dash */}
                <path d="M 20,250 Q 500,100 980,250 C 990,300 970,350 950,350 Q 500,280 50,350 C 30,350 10,300 20,250 Z" {...gProps("dt")} />
                {/* Bottom Dash */}
                <path d="M 50,350 Q 500,280 950,350 C 930,420 850,450 800,450 Q 500,420 200,450 C 150,450 70,420 50,350 Z" {...gProps("db")} />

                {/* TRIM STRIP (wood / carbon / leather) — decorative strip embedded in dashboard panel */}
                <path
                    d="M 140,345 Q 500,295 860,345 L 860,385 Q 500,335 140,385 Z"
                    fill={getTrimFill()}
                    stroke="rgba(0,0,0,0.35)"
                    strokeWidth={1}
                    style={{ pointerEvents: 'none' }}
                />
                {/* Subtle highlight on trim strip top edge */}
                <path
                    d="M 140,345 Q 500,295 860,345"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={1.5}
                    fill="none"
                    style={{ pointerEvents: 'none' }}
                />

                {/* 3. DOORS (Left & Right) */}
                {/* Left Door */}
                <path d="M 10,300 C 50,350 30,850 10,950 Q -10,600 10,300 Z" {...gProps("du_l")} />
                <path d="M 30,400 C 60,450 60,800 30,850 C 40,700 40,550 30,400 Z" {...gProps("da_l")} />
                <path d="M 40,430 C 80,480 80,780 40,820 C 50,700 50,550 40,430 Z" {...gProps("di_l")} />
                <path d="M 30,850 C 60,880 30,960 10,950 C 20,900 25,875 30,850 Z" {...gProps("dl_l")} />
                <rect x="55" y="550" width="15" height="120" rx="7" {...gProps("dh_l")} />
                <path d="M 40,430 C 80,480 80,780 40,820" {...getPiping()} />

                {/* Right Door */}
                <path d="M 990,300 C 950,350 970,850 990,950 Q 1010,600 990,300 Z" {...gProps("du_r")} />
                <path d="M 970,400 C 940,450 940,800 970,850 C 960,700 960,550 970,400 Z" {...gProps("da_r")} />
                <path d="M 960,430 C 920,480 920,780 960,820 C 950,700 950,550 960,430 Z" {...gProps("di_r")} />
                <path d="M 970,850 C 940,880 970,960 990,950 C 980,900 975,875 970,850 Z" {...gProps("dl_r")} />
                <rect x="930" y="550" width="15" height="120" rx="7" {...gProps("dh_r")} />
                <path d="M 960,430 C 920,480 920,780 960,820" {...getPiping()} />

                {/* 4. CENTER CONSOLE */}
                <path d="M 450,350 Q 500,320 550,350 L 560,1050 Q 500,1080 440,1050 Z" {...gProps("con")} />

                {/* Armrest */}
                <path d="M 460,750 Q 500,730 540,750 L 530,950 Q 500,970 470,950 Z" {...gProps("arm")} />
                <path d="M 460,750 Q 500,730 540,750 L 530,950 Q 500,970 470,950 Z" {...getPiping()} />

                {/* Shift Boot & Knob */}
                <path d="M 470,520 Q 500,500 530,520 L 525,620 Q 500,640 475,620 Z" {...gProps("sbo")} />
                <circle cx="500" cy="560" r="25" {...gProps("sk")} />

                {/* Handbrake Boot & Handle */}
                <path d="M 465,650 Q 480,640 495,650 L 490,720 Q 480,730 470,720 Z" {...gProps("hbo")} />
                <rect x="472" y="630" width="16" height="40" rx="8" {...gProps("hh")} />

                {/* 5. SEATS */}
                {/* DRIVER SEAT */}
                {/* Bolsters */}
                <path d="M 120,550 Q 150,500 250,500 Q 350,500 380,550 L 390,900 C 400,1000 350,1020 250,1020 C 150,1020 100,1000 110,900 Z" {...gProps("sv_d")} />
                {/* Base / Center Panel */}
                <path d="M 160,530 C 200,520 250,520 340,530 L 330,880 C 330,950 250,970 250,970 C 250,970 170,950 170,880 Z" {...gProps("sb_d")} />
                <path d="M 160,530 C 200,520 250,520 340,530 L 330,880 C 330,950 250,970 250,970 C 250,970 170,950 170,880 Z" {...getPiping()} />
                {/* Center Panel Ribs (Stitching detail) */}
                <path d="M 175,600 L 325,600 M 172,670 L 328,670 M 169,740 L 331,740 M 166,810 L 334,810" {...gProps("st", 'stitch')} />
                {/* Headrest — sits on the "head" end of the seat (bottom of image = top of seat back in real geometry) */}
                <path d="M 175,945 Q 250,925 325,945 Q 345,985 335,1035 Q 250,1060 165,1035 Q 155,985 175,945 Z" {...gProps("hr_d")} />

                {/* PASSENGER SEAT */}
                {/* Bolsters */}
                <path d="M 880,550 Q 850,500 750,500 Q 650,500 620,550 L 610,900 C 600,1000 650,1020 750,1020 C 850,1020 900,1000 890,900 Z" {...gProps("sv_p")} />
                {/* Base / Center Panel */}
                <path d="M 840,530 C 800,520 750,520 660,530 L 670,880 C 670,950 750,970 750,970 C 750,970 830,950 830,880 Z" {...gProps("sb_p")} />
                <path d="M 840,530 C 800,520 750,520 660,530 L 670,880 C 670,950 750,970 750,970 C 750,970 830,950 830,880 Z" {...getPiping()} />
                {/* Center Panel Ribs (Stitching detail) */}
                <path d="M 825,600 L 675,600 M 828,670 L 672,670 M 831,740 L 669,740 M 834,810 L 666,810" {...gProps("st", 'stitch')} />
                {/* Headrest */}
                <path d="M 825,945 Q 750,925 675,945 Q 655,985 665,1035 Q 750,1060 835,1035 Q 845,985 825,945 Z" {...gProps("hr_p")} />

                {/* 6. STEERING WHEEL */}
                {/* Steering column shadow */}
                <circle cx="250" cy="400" r="50" fill="#111" />

                {/* Wheel Bottom */}
                <path d="M 120,400 A 130 130 0 0 0 380,400" {...gProps("sw_b", 'stroke')} strokeWidth={26} strokeLinecap="round" />
                {/* Wheel Top */}
                <path d="M 120,400 A 130 130 0 0 1 380,400" {...gProps("sw_t", 'stroke')} strokeWidth={26} strokeLinecap="round" />

                {/* Wheel Sides (Grips) */}
                <path d="M 120,350 A 130 130 0 0 0 120,450" {...gProps("sw_s", 'stroke')} strokeWidth={32} strokeLinecap="round" />
                <path d="M 380,350 A 130 130 0 0 1 380,450" {...gProps("sw_s", 'stroke')} strokeWidth={32} strokeLinecap="round" />

                {/* Spokes — now a single colorable zone (sw_sp) */}
                <g>
                    <path d="M 130,400 L 215,400 L 220,420 L 140,430 Z" {...gProps("sw_sp")} />
                    <path d="M 370,400 L 285,400 L 280,420 L 360,430 Z" {...gProps("sw_sp")} />
                    <path d="M 235,430 L 265,430 L 260,520 L 240,520 Z" {...gProps("sw_sp")} />
                </g>

                {/* Center airbag pad — colorable zone (sw_c), with thin metal ring around */}
                <circle cx="250" cy="400" r="35" fill={colors.sw_sp || '#8A8A8E'} opacity={0.5} />
                <circle cx="250" cy="400" r="30" {...gProps("sw_c")} />
                {/* BMW-style roundel mark (non-interactive) */}
                <circle cx="250" cy="400" r="10" fill="#1a1a1a" stroke="#888" strokeWidth="1" style={{ pointerEvents: 'none' }} />

            </svg>
        </div>
    );
}
