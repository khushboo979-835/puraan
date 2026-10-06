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
    name: 'Vedic Chant Profile',
    faith: 'hinduism',
    droneName: '432Hz Om & Tanpura Drone',
    droneDescription: 'Cosmic 136.1Hz & 432Hz Vedic resonance with harmonic Tanpura sweep',
    pitch: 0.84,
    rate: 0.86,
    bhavarthPitch: 0.95,
    bhavarthRate: 0.92,
    preferredLangs: ['hi-IN', 'sa-IN', 'hi', 'en-IN'],
    droneColor: '#F59E0B',
  },
  islam: {
    name: 'Tilawat & Tarteel Profile',
    faith: 'islam',
    droneName: 'Acoustic Maqam Ambience',
    droneDescription: 'Soulful acoustic sanctuary reverb and solemn echo resonance',
    pitch: 0.96,
    rate: 0.82,
    bhavarthPitch: 0.96,
    bhavarthRate: 0.88,
    preferredLangs: ['ur-PK', 'ar-SA', 'ar', 'ur', 'hi-IN'],
    droneColor: '#10B981',
  },
  christianity: {
    name: 'Liturgical Narrator Profile',
    faith: 'christianity',
    droneName: 'Cathedral Sacred Ambience',
    droneDescription: 'Warm, expressive classical sanctuary acoustic depth',
    pitch: 1.0,
    rate: 0.92,
    bhavarthPitch: 1.0,
    bhavarthRate: 0.95,
    preferredLangs: ['en-GB', 'en-IN', 'en-US', 'hi-IN'],
    droneColor: '#38BDF8',
  },
  sikhism: {
    name: 'Gurbani Kirtan Profile',
    faith: 'sikhism',
    droneName: 'Sur-Mandal & Harmonium Drone',
    droneDescription: 'Devotional Sa-Pa harmonic acoustic resonance with spiritual warmth',
    pitch: 0.88,
    rate: 0.84,
    bhavarthPitch: 0.94,
    bhavarthRate: 0.9,
    preferredLangs: ['pa-IN', 'pa-PK', 'pa', 'hi-IN'],
    droneColor: '#FB923C',
  },
  buddhism: {
    name: 'Zen Meditative Profile',
    faith: 'buddhism',
    droneName: '528Hz Tibetan Singing Bowl',
    droneDescription: 'Deep calm, spaced-out Zen breathing frequency with bell chime',
    pitch: 0.8,
    rate: 0.78,
    bhavarthPitch: 0.9,
    bhavarthRate: 0.85,
    preferredLangs: ['hi-IN', 'en-IN', 'en', 'sa'],
    droneColor: '#EAB308',
  },
  jainism: {
    name: 'Ahimsa Peace Profile',
    faith: 'jainism',
    droneName: 'Navkar Serenity Drone',
    droneDescription: 'Gentle tranquil resonance for peaceful Prakrit & Sanskrit contemplation',
    pitch: 0.86,
    rate: 0.82,
    bhavarthPitch: 0.94,
    bhavarthRate: 0.9,
    preferredLangs: ['hi-IN', 'sa-IN', 'gu-IN', 'en-IN'],
    droneColor: '#EC4899',
  },
};

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
