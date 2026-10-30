// Spiritual Audio Engine for GyanDharam: Multi-Faith Synthesizers & Voice Profiles
// Uses Web Audio API for 100% offline, zero-latency authentic drones and acoustic ambiences

export type FaithType = 'hinduism' | 'islam' | 'christianity' | 'sikhism' | 'buddhism' | 'jainism';

export interface FaithAudioProfile {
  name: string;
  faith: FaithType;
  droneName: string;
  droneDescription: string;
  pitch: number;
  rate: number;
  bhavarthPitch: number;
  bhavarthRate: number;
  preferredLangs: string[];
  droneColor: string;
}

export const FAITH_PROFILES: Record<FaithType, FaithAudioProfile> = {
  hinduism: {
    name: 'Vedic Pandit Chant Profile (पंडित जी वैदिक पाठ)',
    faith: 'hinduism',
    droneName: '432Hz Om & Classical Tanpura Drone',
    droneDescription: 'Cosmic 136.1Hz Om & 432Hz Vedic resonance with harmonic Tanpura strings',
    pitch: 0.78, // Deep, reverent Pandit pitch
    rate: 0.68,  // Slow, authentic Vedic chanting cadence (पंडित जी की तरह शांत व स्पष्ट)
    bhavarthPitch: 0.90,
    bhavarthRate: 0.82, // Clear, peaceful Hindi explanation
    preferredLangs: ['sa-IN', 'hi-IN', 'sa', 'hi', 'en-IN'],
    droneColor: '#F59E0B',
  },
  islam: {
    name: 'Tilawat & Tarteel Profile',
    faith: 'islam',
    droneName: 'Acoustic Maqam Ambience',
    droneDescription: 'Soulful acoustic sanctuary reverb and solemn echo resonance',
    pitch: 0.94,
    rate: 0.78,
    bhavarthPitch: 0.94,
    bhavarthRate: 0.84,
    preferredLangs: ['ur-PK', 'ar-SA', 'ar', 'ur', 'hi-IN'],
    droneColor: '#10B981',
  },
  christianity: {
    name: 'Liturgical Narrator Profile',
    faith: 'christianity',
    droneName: 'Cathedral Sacred Ambience',
    droneDescription: 'Warm, expressive classical sanctuary acoustic depth',
    pitch: 0.98,
    rate: 0.86,
    bhavarthPitch: 0.98,
    bhavarthRate: 0.90,
    preferredLangs: ['en-GB', 'en-IN', 'en-US', 'hi-IN'],
    droneColor: '#38BDF8',
  },
  sikhism: {
    name: 'Gurbani Kirtan Profile',
    faith: 'sikhism',
    droneName: 'Sur-Mandal & Harmonium Drone',
    droneDescription: 'Devotional Sa-Pa harmonic acoustic resonance with spiritual warmth',
    pitch: 0.86,
    rate: 0.80,
    bhavarthPitch: 0.92,
    bhavarthRate: 0.86,
    preferredLangs: ['pa-IN', 'pa-PK', 'pa', 'hi-IN'],
    droneColor: '#FB923C',
  },
  buddhism: {
    name: 'Zen Meditative Profile',
    faith: 'buddhism',
    droneName: '528Hz Tibetan Singing Bowl',
    droneDescription: 'Deep calm, spaced-out Zen breathing frequency with bell chime',
    pitch: 0.76,
    rate: 0.72,
    bhavarthPitch: 0.88,
    bhavarthRate: 0.82,
    preferredLangs: ['hi-IN', 'en-IN', 'en', 'sa'],
    droneColor: '#EAB308',
  },
  jainism: {
    name: 'Ahimsa Peace Profile',
    faith: 'jainism',
    droneName: 'Navkar Serenity Drone',
    droneDescription: 'Gentle tranquil resonance for peaceful Prakrit & Sanskrit contemplation',
    pitch: 0.82,
    rate: 0.76,
    bhavarthPitch: 0.90,
    bhavarthRate: 0.84,
    preferredLangs: ['hi-IN', 'sa-IN', 'gu-IN', 'en-IN'],
    droneColor: '#EC4899',
  },
};

/**
 * Formats Sanskrit shloka / mantra text for authentic Vedic Pandit chanting in Web Speech TTS.
 * Inserts rhythmic breathing pauses (यति/विराम) at padas (quarter-verses), dandas, and line breaks so the
 * speech synthesizer chants rhythmically like a temple priest.
 */
export function prepareSanskritChantForTTS(script: string): string {
  if (!script) return '';

  let text = script.trim();

  // Split into lines
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  const formattedLines = lines.map((line) => {
    // Replace double dandas ॥ with prolonged solemn pause
    let l = line.replace(/॥\s*(\d+)?\s*॥?/g, '... ').replace(/॥/g, '... ');
    // Replace single danda । with a clear breathing pause
    l = l.replace(/।/g, ', ');

    // If a line is long without any comma or pause, split in middle for pada pause (यति)
    // In Anushtup meter (16 syllables per line = 8 + 8), splitting near middle provides the vital pada pause
    const words = l.split(/\s+/).filter(Boolean);
    if (words.length >= 4 && !l.includes(',')) {
      const mid = Math.floor(words.length / 2);
      words[mid - 1] = words[mid - 1] + ',';
      l = words.join(' ');
    }
    return l;
  });

  return formattedLines.join(' ... ');
}

/**
 * Smart voice selector that prioritizes authentic Indian Hindi/Sanskrit male voices
 * (such as Microsoft Hemant, Madhur, Google हिन्दी) so that Sanskrit recitation
 * sounds dignified, natural, and like an authentic temple Pandit.
 */
export function getPanditVoice(
  voices: SpeechSynthesisVoice[],
  faith: FaithType | string = 'hinduism'
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const normalizedFaith = faith.toLowerCase();

  if (normalizedFaith === 'hinduism' || normalizedFaith === 'jainism') {
    // 1. Check for specific authentic male Indian voices (sounds like a Pandit)
    const panditMaleKeywords = ['hemant', 'madhur', 'ravi', 'deepak', 'tarun', 'male'];
    const hindiSanskritVoices = voices.filter(
      (v) =>
        v.lang.startsWith('hi') ||
        v.lang.startsWith('sa') ||
        v.name.toLowerCase().includes('hindi') ||
        v.name.toLowerCase().includes('sanskrit')
    );

    // Look for male Hindi voice
    for (const voice of hindiSanskritVoices) {
      const n = voice.name.toLowerCase();
      if (panditMaleKeywords.some((kw) => n.includes(kw))) {
        return voice;
      }
    }

    // 2. Google Hindi or Natural/Online Indian voices
    const naturalVoice = hindiSanskritVoices.find(
      (v) => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Online')
    );
    if (naturalVoice) return naturalVoice;

    // 3. Any Hindi or Sanskrit voice
    if (hindiSanskritVoices.length > 0) return hindiSanskritVoices[0];

    // 4. Any Indian English voice as fallback
    const indianVoice = voices.find(
      (v) => v.lang.includes('IN') || v.name.toLowerCase().includes('india')
    );
    if (indianVoice) return indianVoice;
  }

  // Fallback for other faiths
  const profile = FAITH_PROFILES[normalizedFaith as FaithType] || FAITH_PROFILES.hinduism;
  for (const lang of profile.preferredLangs) {
    const match = voices.find((v) =>
      v.lang.toLowerCase().replace('_', '-').startsWith(lang.toLowerCase())
    );
    if (match) return match;
  }

  return voices.find((v) => v.lang.startsWith('hi')) || voices[0];
}

export class SpiritualAmbientSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private lfo: OscillatorNode | null = null;
  private isRunning: boolean = false;
  private currentFaith: FaithType = 'hinduism';

  constructor() {}

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setTargetAtTime(clamped * 0.35, this.ctx.currentTime, 0.05);
    }
  }

  public startDrone(faith: string = 'hinduism', volume: number = 0.25) {
    const normalizedFaith: FaithType = (
      ['hinduism', 'islam', 'christianity', 'sikhism', 'buddhism', 'jainism'].includes(faith.toLowerCase())
        ? faith.toLowerCase()
        : 'hinduism'
    ) as FaithType;

    this.stopDrone();
    this.initContext();

    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.currentFaith = normalizedFaith;
    this.isRunning = true;
    this.setVolume(volume);

    const now = this.ctx.currentTime;

    if (normalizedFaith === 'hinduism') {
      // 136.1Hz (Om / Earth Tone) + 432Hz Overtones + Tanpura LFO Sweep
      const freqs = [136.1, 272.2, 408.3, 432.0];
      const gains = [0.35, 0.2, 0.12, 0.08];

      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.exponentialRampToValueAtTime(gains[idx] || 0.1, now + 1.5);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        this.oscillators.push(osc);
        this.gainNodes.push(g);
      });

      // LFO for slow meditative breathing modulation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now); // ~8 sec breath cycle
      lfoGain.gain.setValueAtTime(0.05, now);
      lfo.connect(lfoGain);
      if (this.gainNodes[0]) {
        lfoGain.connect(this.gainNodes[0].gain);
      }
      lfo.start(now);
      this.lfo = lfo;
    } else if (normalizedFaith === 'islam') {
      // Acoustic Maqam: 147Hz, 220Hz (A3), 330Hz (E4), 440Hz warm acoustics
      const freqs = [147.0, 220.0, 329.6, 440.0];
      const gains = [0.25, 0.2, 0.1, 0.05];

      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.exponentialRampToValueAtTime(gains[idx] || 0.1, now + 1.2);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        this.oscillators.push(osc);
        this.gainNodes.push(g);
      });
    } else if (normalizedFaith === 'sikhism') {
      // Sur-Mandal & Harmonium Drone: Sa (C3 130.8Hz) - Pa (G3 196Hz) - Sa (C4 261.6Hz)
      const freqs = [130.81, 196.0, 261.63, 392.0];
      const gains = [0.3, 0.25, 0.15, 0.08];

      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.exponentialRampToValueAtTime(gains[idx] || 0.1, now + 1.5);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        this.oscillators.push(osc);
        this.gainNodes.push(g);
      });
    } else if (normalizedFaith === 'buddhism') {
      // 528Hz Solfeggio & Tibetan Singing Bowl resonance
      const freqs = [108.0, 216.0, 528.0, 1056.0];
      const gains = [0.3, 0.2, 0.12, 0.04];

      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.exponentialRampToValueAtTime(gains[idx] || 0.1, now + 2.0);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        this.oscillators.push(osc);
        this.gainNodes.push(g);
      });
    } else {
      // Default Serenity Cathedral & Ahimsa (Christianity / Jainism)
      const freqs = [174.0, 285.0, 396.0];
      const gains = [0.25, 0.18, 0.1];

      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.exponentialRampToValueAtTime(gains[idx] || 0.1, now + 1.5);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        this.oscillators.push(osc);
        this.gainNodes.push(g);
      });
    }
  }

  // Play a sacred chime on verse completion or chapter start
  public playZenChime(faith: string = 'buddhism') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const freq = faith === 'buddhism' ? 528 : faith === 'hinduism' ? 432 : 639;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 3.0);
  }

  public stopDrone() {
    if (this.ctx && this.oscillators.length > 0) {
      const now = this.ctx.currentTime;
      this.gainNodes.forEach((g) => {
        try {
          g.gain.setValueAtTime(g.gain.value, now);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        } catch (e) {}
      });

      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        this.gainNodes.forEach((g) => {
          try {
            g.disconnect();
          } catch (e) {}
        });
        this.oscillators = [];
        this.gainNodes = [];
      }, 500);
    }

    if (this.lfo) {
      try {
        this.lfo.stop();
        this.lfo.disconnect();
      } catch (e) {}
      this.lfo = null;
    }

    this.isRunning = false;
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      faith: this.currentFaith,
    };
  }
}

// Global singleton instance for easy access anywhere
export const ambientSynth = typeof window !== 'undefined' ? new SpiritualAmbientSynthesizer() : null;
