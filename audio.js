let audioCtx, ambientGain, isSoundMuted = false;

function playEpicEntranceSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;

    // 1. Implosion Vacuum Swell (เสียงดูดมวลอากาศก่อนระเบิด)
    const vacuumOsc = audioCtx.createOscillator();
    const vacuumGain = audioCtx.createGain();
    vacuumOsc.type = 'sine';
    vacuumOsc.frequency.setValueAtTime(600, now);
    vacuumOsc.frequency.exponentialRampToValueAtTime(80, now + 0.7);
    vacuumGain.gain.setValueAtTime(0.01, now);
    vacuumGain.gain.linearRampToValueAtTime(0.6, now + 0.65);
    vacuumGain.gain.linearRampToValueAtTime(0.001, now + 0.72);
    vacuumOsc.connect(vacuumGain);
    vacuumGain.connect(audioCtx.destination);
    vacuumOsc.start(now);
    vacuumOsc.stop(now + 0.72);

    // 2. FM Synth Laser Charging Sweep (พลังงานเลเซอร์ชาร์จ)
    const carrier = audioCtx.createOscillator();
    const modulator = audioCtx.createOscillator();
    const modGain = audioCtx.createGain();
    const laserGain = audioCtx.createGain();

    carrier.type = 'sawtooth';
    modulator.type = 'square';

    modulator.frequency.setValueAtTime(30, now);
    modulator.frequency.exponentialRampToValueAtTime(300, now + 0.7);
    modGain.gain.setValueAtTime(500, now);

    carrier.frequency.setValueAtTime(100, now);
    carrier.frequency.exponentialRampToValueAtTime(2200, now + 0.7);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);

    laserGain.gain.setValueAtTime(0.01, now);
    laserGain.gain.linearRampToValueAtTime(0.4, now + 0.65);
    laserGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    carrier.connect(laserGain);
    laserGain.connect(audioCtx.destination);
    modulator.start(now);
    carrier.start(now);
    modulator.stop(now + 0.75);
    carrier.stop(now + 0.75);

    // 3. Main Sub-Drop Earth-Shatter Impact (เสียงระเบิดตูมกระแทกเบสลึก)
    setTimeout(() => {
        const impactNow = audioCtx.currentTime;
        const subOsc = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();

        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(280, impactNow);
        subOsc.frequency.exponentialRampToValueAtTime(18, impactNow + 3.5);

        subGain.gain.setValueAtTime(1.0, impactNow);
        subGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 3.8);

        subOsc.connect(subGain);
        subGain.connect(audioCtx.destination);
        subOsc.start(impactNow);
        subOsc.stop(impactNow + 3.8);

        // 4. White Noise Blast (คลื่นช็อกเวฟลมระเบิด)
        const bufferSize = audioCtx.sampleRate * 1.5;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(3000, impactNow);
        noiseFilter.frequency.exponentialRampToValueAtTime(100, impactNow + 1.2);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.7, impactNow);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, impactNow + 1.3);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(impactNow);

        // 5. Arpeggiated Cyber Chord Blast (เสียงเพลงคอร์ดวิบวับพุ่งทะลุมิติ)
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98, 2093.00];
        notes.forEach((freq, idx) => {
            const chordOsc = audioCtx.createOscillator();
            const chordGain = audioCtx.createGain();

            chordOsc.type = 'sine';
            chordOsc.frequency.setValueAtTime(freq, impactNow + (idx * 0.04));

            chordGain.gain.setValueAtTime(0.01, impactNow + (idx * 0.04));
            chordGain.gain.linearRampToValueAtTime(0.2, impactNow + 0.02 + (idx * 0.04));
            chordGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 2.8 + (idx * 0.04));

            chordOsc.connect(chordGain);
            chordGain.connect(audioCtx.destination);
            chordOsc.start(impactNow + (idx * 0.04));
            chordOsc.stop(impactNow + 3.0);
        });

        initAmbientDrone(impactNow + 1.5);
    }, 700);
}

function initAmbientDrone(startTime) {
    if (ambientGain) return;
    const ambOsc = audioCtx.createOscillator();
    const ambFilter = audioCtx.createBiquadFilter();
    ambientGain = audioCtx.createGain();

    ambOsc.type = 'sawtooth';
    ambOsc.frequency.setValueAtTime(55, startTime);
    ambFilter.type = 'lowpass';
    ambFilter.frequency.setValueAtTime(180, startTime);

    ambientGain.gain.setValueAtTime(0.001, startTime);
    ambientGain.gain.linearRampToValueAtTime(0.1, startTime + 2.5);

    ambOsc.connect(ambFilter);
    ambFilter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);
    ambOsc.start(startTime);
}

function playBubbleClickSound() {
    if (!audioCtx || isSoundMuted) return;
    const popOsc = audioCtx.createOscillator();
    const popGain = audioCtx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(500, audioCtx.currentTime);
    popOsc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
    popGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    popOsc.connect(popGain);
    popGain.connect(audioCtx.destination);
    popOsc.start();
    popOsc.stop(audioCtx.currentTime + 0.1);
}

document.getElementById('sound-toggle').addEventListener('click', () => {
    if (!ambientGain) return;
    isSoundMuted = !isSoundMuted;
    const soundIcon = document.getElementById('sound-icon');
    if (isSoundMuted) {
        ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        soundIcon.textContent = '🔇';
    } else {
        ambientGain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.3);
        soundIcon.textContent = '🔊';
    }
});
