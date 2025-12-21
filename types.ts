import React from 'react';

export enum ViewState {
  HOME = 'HOME',
  MAP = 'MAP',
  PERSONAGES = 'PERSONAGES',
  REALMS = 'REALMS',
  FAITHS = 'FAITHS',
  MAGIC = 'MAGIC',
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  faction: string;
  description: string;
  image: string;
  stats: {
    strength: number;
    intelligence: number;
    magic: number;
    cunning: number;
  }
}

export interface Realm {
  id: string;
  name: string;
  ruler: string;
  motto: string;
  description: string;
  bannerColor: string;
  // New detailed fields
  category: 'Great Power' | 'Minor Realm' | 'Other Faction';
  image: string; // Background/Atmosphere image
  secondaryImage?: string; // New right-panel image
  capital: string;
  subfactions: string[];
  orders: string[];
}

export interface MagicSchool {
  id: string;
  name: string;
  element: string;
  description: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}