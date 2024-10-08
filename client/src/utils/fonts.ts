import { Audiowide, Orbitron, Raleway } from 'next/font/google'

const aud = Audiowide({ subsets: ['latin'], weight: ['400'] });
const orb = Orbitron({ subsets: ['latin'] })
const ral = Raleway({ subsets: ['latin'] })

export const audiowide = aud.className;
export const raleway = ral.className;
export const orbitron = orb.className