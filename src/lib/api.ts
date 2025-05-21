
import axios from 'axios';

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Leagues
export const getLeagues = async () => {
  const response = await api.get('/leagues');
  return response.data;
};

export const getLeagueById = async (id: number) => {
  const response = await api.get(`/leagues/${id}`);
  return response.data;
};

export const createLeague = async (leagueData: any) => {
  const response = await api.post('/leagues', leagueData);
  return response.data;
};

// Tournaments
export const getTournaments = async () => {
  const response = await api.get('/tournaments');
  return response.data;
};

export const getTournamentById = async (id: number) => {
  const response = await api.get(`/tournaments/${id}`);
  return response.data;
};

export const createTournament = async (tournamentData: any) => {
  const response = await api.post('/tournaments', tournamentData);
  return response.data;
};

// Players
export const getPlayers = async () => {
  const response = await api.get('/players');
  return response.data;
};

export const getPlayerById = async (id: number) => {
  const response = await api.get(`/players/${id}`);
  return response.data;
};

export const createPlayer = async (playerData: any) => {
  const response = await api.post('/players', playerData);
  return response.data;
};

// Matches
export const getMatches = async () => {
  const response = await api.get('/matches');
  return response.data;
};

export const getUpcomingMatches = async () => {
  const response = await api.get('/matches/upcoming');
  return response.data;
};

export const getRecentMatches = async () => {
  const response = await api.get('/matches/recent');
  return response.data;
};

export const getMatchById = async (id: number) => {
  const response = await api.get(`/matches/${id}`);
  return response.data;
};

export const createMatch = async (matchData: any) => {
  const response = await api.post('/matches', matchData);
  return response.data;
};

export const recordMatchResult = async (id: number, resultData: any) => {
  const response = await api.put(`/matches/${id}/result`, resultData);
  return response.data;
};

export default api;
