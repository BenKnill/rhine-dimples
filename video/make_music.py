"""An original ambient score, synthesized from scratch (no samples), timed to the acts in timing{TAG}.json.

Pads (detuned soft saws), a sub bass, and plucked arpeggios whose density follows the story;
a synthetic reverb on top. Writes music{TAG}.wav (48 kHz stereo).
"""
import json, os
from pathlib import Path
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, oaconvolve

HERE = Path(__file__).resolve().parent
TAG = os.environ.get('TAG', '3')
T = json.loads((HERE / f'timing{TAG}.json').read_text())
SR, BPM = 48000, 72
BEAT = 60 / BPM; BAR = 4 * BEAT
DUR = T['duration'] + 7.0
N = int(DUR * SR)
L = np.zeros(N); R = np.zeros(N); PL = np.zeros(N); PR = np.zeros(N); SUB = np.zeros(N)
hz = lambda m: 440 * 2 ** ((m - 69) / 12)

CH = {  # voicings (MIDI)
    'Dmaj9': [50, 57, 61, 64, 66], 'Bm9': [47, 54, 57, 61, 62], 'Gmaj7': [43, 50, 54, 59, 62], 'Asus4': [45, 52, 57, 62, 64],
    'A': [45, 52, 57, 61, 64], 'Em9': [40, 47, 54, 55, 62], 'F#m7': [42, 49, 52, 57, 61], 'D/F#': [42, 50, 57, 62, 66],
}
# per act: progression, bars per chord, arpeggio step (in beats; 0 = none), pluck level, pad brightness
PLAN = {
    'open':    (['Dmaj9', 'Bm9', 'Gmaj7', 'Asus4'], 2, 0,    0.0, 0.35),
    'under':   (['Bm9', 'Gmaj7', 'Em9', 'F#m7'], 2, 2,      0.35, 0.25),
    'rings':   (['Dmaj9', 'A', 'Bm9', 'Gmaj7'], 1, 0.5,     0.8, 0.7),
    'river':   (['Gmaj7', 'D/F#', 'Em9', 'Asus4'], 2, 1,    0.6, 0.55),
    'flat':    (['Gmaj7', 'Bm9', 'Em9', 'A'], 2, 2,         0.45, 0.45),
    'reading': (['Dmaj9', 'Gmaj7', 'Bm9', 'Asus4'], 2, 0.5, 0.55, 0.6),
}
# a soft, band-limited saw wavetable
TBL = np.zeros(4096); ph = np.arange(4096) / 4096 * 2 * np.pi
for n in range(1, 9): TBL += np.sin(n * ph) / n ** 1.4
TBL /= np.abs(TBL).max()

def env(n, att, rel, total):
    t = np.arange(n) / SR; e = np.minimum(1, t / att); tail = t > total
    e[tail] *= np.exp(-(t[tail] - total) / rel); return e

def add(buf, i0, sig):
    i1 = min(len(buf), i0 + len(sig)); buf[i0:i1] += sig[:i1 - i0]

def pad(t0, dur, notes, bright, gain):
    n = int((dur + 3.0) * SR); t = np.arange(n) / SR; e = env(n, 1.4, 1.2, dur)
    for k, m in enumerate(notes):
        for side, det in ((0, -5), (1, 5)):
            f = hz(m) * 2 ** (det / 1200); idx = (f * t * 4096) % 4096
            s = np.interp(idx, np.arange(4097), np.append(TBL, TBL[0])) * e * gain * (0.8 if k == 0 else 1.0)
            add(L if side == 0 else R, int(t0 * SR), s)
    root = hz(notes[0] - 12); add(SUB, int(t0 * SR), 0.5 * gain * np.sin(2 * np.pi * root * t) * e)

def pluck(t0, m, gain, pan):
    n = int(1.6 * SR); t = np.arange(n) / SR; f = hz(m)
    s = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) * np.exp(-t / 0.25) + 0.12 * np.sin(6 * np.pi * f * t) * np.exp(-t / 0.12))
    s *= np.exp(-t / 0.55) * np.minimum(1, t / 0.004) * gain
    add(PL, int(t0 * SR), s * (1 - pan)); add(PR, int(t0 * SR), s * (1 + pan))

beats = list(T['beats'].items())
for bi, (bid, b) in enumerate(beats):
    prog, bars, step, plev, bright = PLAN[bid]
    t_end = beats[bi + 1][1]['start'] if bi + 1 < len(beats) else DUR - 1.0
    t, k = b['start'], 0
    while t < t_end - 0.5:
        ch = CH[prog[k % len(prog)]]; d = min(bars * BAR, t_end - t)
        pad(t, d, ch, bright, 0.055)
        if step and plev > 0:
            arp = ch[1:] + [ch[2] + 12, ch[3] + 12]; j = 0; tt = t
            while tt < t + d - 0.05:
                m = arp[j % len(arp)] + 12; pluck(tt, m, 0.06 * plev, 0.35 * (1 if j % 2 else -1)); j += 1; tt += step * BEAT
        t += d; k += 1

# tone: pad lowpass, pluck highpass, then a synthetic reverb
lp = butter(2, 1800, 'lowpass', fs=SR, output='sos'); L = sosfilt(lp, L); R = sosfilt(lp, R)
hp = butter(2, 220, 'highpass', fs=SR, output='sos'); PL = sosfilt(hp, PL); PR = sosfilt(hp, PR)
SUB = sosfilt(butter(2, 160, 'lowpass', fs=SR, output='sos'), SUB)
dryL, dryR = L + PL + SUB, R + PR + SUB
rng = np.random.default_rng(7); n_ir = int(2.6 * SR); t_ir = np.arange(n_ir) / SR
ir = lambda: sosfilt(butter(1, 4500, 'lowpass', fs=SR, output='sos'), rng.standard_normal(n_ir) * np.exp(-t_ir / 0.75))
irL, irR = ir(), ir(); irL /= np.sqrt((irL ** 2).sum()); irR /= np.sqrt((irR ** 2).sum())
wetL = oaconvolve(dryL, irL)[:N]; wetR = oaconvolve(dryR, irR)[:N]
outL, outR = 0.75 * dryL + 0.55 * wetL, 0.75 * dryR + 0.55 * wetR
fade = np.ones(N); fi = int(2.5 * SR); fade[:fi] = np.linspace(0, 1, fi); fo = int(5.0 * SR); fade[-fo:] = np.linspace(1, 0, fo) ** 2
out = np.stack([outL * fade, outR * fade], 1); out *= 0.5 / (np.abs(out).max() + 1e-9)
sf.write(HERE / f'music{TAG}.wav', out.astype(np.float32), SR, subtype='FLOAT')
print(f'music{TAG}.wav', f'{DUR:.1f}s')
