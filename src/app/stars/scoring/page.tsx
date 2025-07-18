"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/services/supabaseClient';

type StarsScoreForm = {
  team: string;
  round: string;
  submitted_by: string;
  trays: number;
  cases: number;
  agvCollisions1: number;
  defectiveCircle: number;
  defectiveTriangle: number;
  defectiveSquare: number;
  wrongBin: number;
  functionalInBin: number;
  redXRecycled: boolean;
  seriesCells: number;
  stack2: number;
  stack3: number;
  stackMore: number;
  covers: number;
  robotReturned: boolean;
  agvCollisions4: number;
  oversized: boolean;
  knockdown: boolean;
  sabotage: boolean;
};

type LeaderboardEntry = StarsScoreForm & {
  id?: string;
  score: number | string;
  time: string;
};

const initialForm: StarsScoreForm = {
  team: '',
  round: 'Round 1',
  submitted_by: '',
  trays: 0,
  cases: 0,
  agvCollisions1: 0,
  defectiveCircle: 0,
  defectiveTriangle: 0,
  defectiveSquare: 0,
  wrongBin: 0,
  functionalInBin: 0,
  redXRecycled: false,
  seriesCells: 0,
  stack2: 0,
  stack3: 0,
  stackMore: 0,
  covers: 0,
  robotReturned: false,
  agvCollisions4: 0,
  oversized: false,
  knockdown: false,
  sabotage: false,
};

function calculateScore(form: StarsScoreForm): number | string {
  if (form.oversized || form.sabotage) return 'Disqualified';
  let score = 0;
  // Objective 1
  score += form.trays * 3;
  score += form.cases * 1;
  score -= form.agvCollisions1 * 2;
  // Objective 2
  score += form.defectiveCircle * 1;
  score += form.defectiveTriangle * 2;
  score += form.defectiveSquare * 3;
  score -= form.wrongBin * 1;
  score -= form.functionalInBin * 2;
  if (form.redXRecycled) score -= 5;
  // Objective 3
  score += form.seriesCells * 2;
  score += form.stack2 * 3;
  score += form.stack3 * 4;
  score += form.stackMore * 5;
  // Objective 4
  score += form.covers * 3;
  if (form.robotReturned) score += 3;
  score -= form.agvCollisions4 * 2;
  // Penalties
  if (form.knockdown) score -= 5;
  return score;
}

export default function StarsScoringPage() {
  const [form, setForm] = useState<StarsScoreForm>(initialForm);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const score = calculateScore(form);
  const [filterRound, setFilterRound] = useState<string>("");
  const [filterSubmitter, setFilterSubmitter] = useState<string>("");
  const [sortBy, setSortBy] = useState<'score'|'time'>("score");
  const [sortDir, setSortDir] = useState<'asc'|'desc'>("desc");
  const [showSummary, setShowSummary] = useState(false);
  const [matchTeams, setMatchTeams] = useState<LeaderboardEntry[]>([]);
  const [editEntry, setEditEntry] = useState<LeaderboardEntry|null>(null);
  const [deleteEntry, setDeleteEntry] = useState<LeaderboardEntry|null>(null);
  const [editForm, setEditForm] = useState<StarsScoreForm|null>(null);

  useEffect(() => {
    setLoading(true);
    // Initial fetch
    supabase
      .from('stars_scores')
      .select('*')
      .order('createdAt', { ascending: false })
      .then(({ data }) => {
        setLeaderboard(data || []);
        setLoading(false);
      });
    // Real-time subscription
    const channel = supabase
      .channel('stars_scores_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stars_scores' },
        () => {
          // Refetch leaderboard on any change
          supabase
            .from('stars_scores')
            .select('*')
            .order('createdAt', { ascending: false })
            .then(({ data }) => setLeaderboard(data || []));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      // TypeScript: e.target is HTMLInputElement for checkboxes
      setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(f => ({
        ...f,
        [name]: Number.isNaN(Number(value)) ? value : Number(value),
      }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/stars-scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, score, time: new Date().toLocaleTimeString() }),
    });
    // Find the two most recent teams for this round
    const res = await fetch("/api/stars-scores");
    const all = await res.json();
    const recent = all.filter((entry: LeaderboardEntry) => entry.round === form.round)
      .sort((a: LeaderboardEntry, b: LeaderboardEntry) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 2);
    setMatchTeams(recent);
    setShowSummary(true);
    setForm(initialForm);
  }

  // Unique rounds and submitters for filter dropdowns
  const uniqueRounds = Array.from(new Set(leaderboard.map(e => e.round))).filter(Boolean);
  const uniqueSubmitters = Array.from(new Set(leaderboard.map(e => e.submitted_by))).filter(Boolean);

  // Filtered and sorted leaderboard
  const filteredLeaderboard = leaderboard
    .filter(e => (!filterRound || e.round === filterRound) && (!filterSubmitter || e.submitted_by === filterSubmitter))
    .sort((a, b) => {
      if (sortBy === 'score') {
        const aScore = a.score === 'Disqualified' ? -9999 : Number(a.score);
        const bScore = b.score === 'Disqualified' ? -9999 : Number(b.score);
        return sortDir === 'desc' ? bScore - aScore : aScore - bScore;
      } else {
        return sortDir === 'desc'
          ? new Date(b.time).getTime() - new Date(a.time).getTime()
          : new Date(a.time).getTime() - new Date(b.time).getTime();
      }
    });

  // Edit handlers
  function openEdit(entry: LeaderboardEntry) {
    setEditEntry(entry);
    setEditForm({ ...entry });
  }
  function closeEdit() {
    setEditEntry(null);
    setEditForm(null);
  }
  async function handleEditSave() {
    if (!editEntry || !editForm) return;
    await fetch('/api/stars-scores', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editEntry.id, ...editForm, score: calculateScore(editForm) }),
    });
    closeEdit();
  }
  function handleEditChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (!editForm) return;
    if (type === 'checkbox') {
      setEditForm(f => f ? { ...f, [name]: (e.target as HTMLInputElement).checked } : f);
    } else {
      setEditForm(f => f ? { ...f, [name]: Number.isNaN(Number(value)) ? value : Number(value) } : f);
    }
  }
  // Delete handlers
  function openDelete(entry: LeaderboardEntry) { setDeleteEntry(entry); }
  function closeDelete() { setDeleteEntry(null); }
  async function handleDeleteConfirm() {
    if (!deleteEntry) return;
    await fetch('/api/stars-scores', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteEntry.id }),
    });
    closeDelete();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-gray-900 print:bg-white">
      <h1 className="text-3xl font-bold mb-6 text-orange-600 text-center">STARS League Scoring Form</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-10 print:shadow-none print:border print:rounded-none">
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <input name="team" value={form.team} onChange={handleChange} placeholder="Team Name/Number" className="border p-2 rounded w-full md:w-1/2" required />
          <select name="round" value={form.round} onChange={handleChange} className="border p-2 rounded w-full md:w-1/4" required>
            <option value="Round 1">Round 1</option>
            <option value="Round 2">Round 2</option>
            <option value="Round 3">Round 3</option>
            <option value="Finals">Finals</option>
          </select>
          <input name="submitted_by" value={form.submitted_by} onChange={handleChange} placeholder="Manager Name or Email" className="border p-2 rounded w-full md:w-1/4" required />
          <label className="flex items-center gap-2 font-medium text-red-600">
            <input type="checkbox" name="oversized" checked={form.oversized} onChange={handleChange} /> Oversized Robot (DQ)
          </label>
          <label className="flex items-center gap-2 font-medium text-red-600">
            <input type="checkbox" name="sabotage" checked={form.sabotage} onChange={handleChange} /> Sabotage (DQ)
          </label>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-6 text-orange-500">Objective 1: Battery Structures</h2>
        <div className="flex gap-4 mb-2">
          <label className="flex flex-col">Trays (+3)
            <input type="number" name="trays" min={0} value={form.trays} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Cases (+1)
            <input type="number" name="cases" min={0} value={form.cases} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">AGV Collisions (−2)
            <input type="number" name="agvCollisions1" min={0} value={form.agvCollisions1} onChange={handleChange} className="border p-1 rounded" />
          </label>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-6 text-orange-500">Objective 2: Sorting Defective Cells</h2>
        <div className="flex gap-4 mb-2 flex-wrap">
          <label className="flex flex-col">Circle (+1)
            <input type="number" name="defectiveCircle" min={0} value={form.defectiveCircle} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Triangle (+2)
            <input type="number" name="defectiveTriangle" min={0} value={form.defectiveTriangle} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Square (+3)
            <input type="number" name="defectiveSquare" min={0} value={form.defectiveSquare} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Wrong Bin (−1)
            <input type="number" name="wrongBin" min={0} value={form.wrongBin} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Functional in Bin (−2)
            <input type="number" name="functionalInBin" min={0} value={form.functionalInBin} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex items-center gap-2 mt-6 font-medium text-red-600">
            <input type="checkbox" name="redXRecycled" checked={form.redXRecycled} onChange={handleChange} /> Red X Battery Recycled (−5)
          </label>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-6 text-orange-500">Objective 3: Battery Assembly</h2>
        <div className="flex gap-4 mb-2 flex-wrap">
          <label className="flex flex-col">Series Cells (+2 each)
            <input type="number" name="seriesCells" min={0} value={form.seriesCells} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Stack 2nd Layer (+3 each)
            <input type="number" name="stack2" min={0} value={form.stack2} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Stack 3rd Layer (+4 each)
            <input type="number" name="stack3" min={0} value={form.stack3} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">Stack More (+5 each)
            <input type="number" name="stackMore" min={0} value={form.stackMore} onChange={handleChange} className="border p-1 rounded" />
          </label>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-6 text-orange-500">Objective 4: Sealing & Return</h2>
        <div className="flex gap-4 mb-2 flex-wrap">
          <label className="flex flex-col">Covers (+3 each)
            <input type="number" name="covers" min={0} value={form.covers} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex items-center gap-2 mt-6">
            <input type="checkbox" name="robotReturned" checked={form.robotReturned} onChange={handleChange} /> Robot Returned (+3)
          </label>
          <label className="flex flex-col">AGV Collisions (−2)
            <input type="number" name="agvCollisions4" min={0} value={form.agvCollisions4} onChange={handleChange} className="border p-1 rounded" />
          </label>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-6 text-orange-500">Penalties</h2>
        <div className="flex gap-4 mb-2 flex-wrap">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="knockdown" checked={form.knockdown} onChange={handleChange} /> Knockdown Another Team (−5)
          </label>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-2xl font-bold text-orange-600">Total Score: <span className={score === 'Disqualified' ? 'text-red-600' : ''}>{score}</span></div>
          <button type="submit" className="px-8 py-3 bg-orange-500 text-white text-xl font-bold rounded-lg shadow hover:bg-orange-600 transition">Add to Leaderboard</button>
        </div>
      </form>
      {/* Match Summary Modal */}
      {showSummary && matchTeams.length === 2 && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative animate-pop">
            <button onClick={() => setShowSummary(false)} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-500">&times;</button>
            
            {/* Round Header */}
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-orange-600 mb-2">Match Summary</h2>
              <div className="text-2xl font-semibold text-gray-700 bg-orange-100 px-6 py-3 rounded-lg inline-block">
                {matchTeams[0]?.round || 'Round'}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {matchTeams.map((team, idx) => {
                const isWinner =
                  matchTeams.every(t => t.score !== 'Disqualified') &&
                  Number(team.score) === Math.max(...matchTeams.map(t => t.score === 'Disqualified' ? -9999 : Number(t.score)));
                
                return (
                  <div 
                    key={team.id || idx} 
                    className={`flex-1 rounded-xl p-6 shadow-lg border-4 transition-all duration-1000 ${
                      isWinner 
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 animate-winner-glow' 
                        : 'border-gray-200 bg-gray-50'
                    } ${team.score === 'Disqualified' ? 'bg-red-100 text-red-700 border-red-300' : ''}`}
                    style={{
                      animation: isWinner ? 'winnerGlow 2s ease-in-out infinite alternate, flyIn 1.5s ease-out' : '',
                      transform: isWinner ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: isWinner ? '0 0 30px rgba(255, 215, 0, 0.6)' : ''
                    }}
                  >
                    <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                      {team.team}
                      {isWinner && team.score !== 'Disqualified' && (
                        <span className="ml-2 text-yellow-500 animate-bounce text-3xl">🏆</span>
                      )}
                      {team.score === 'Disqualified' && <span className="ml-2 text-red-500 font-bold">DQ</span>}
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      Score: <span className={team.score === 'Disqualified' ? 'text-red-600' : 'text-orange-600'}>{team.score}</span>
                    </div>
                    <div className="mb-2 text-sm text-gray-500">Submitted by: {team.submitted_by}</div>
                    <div className="mt-2 text-sm">
                      <div className="font-bold text-orange-500 mb-1">Objective 1</div>
                      <div>Trays: {team.trays} | Cases: {team.cases} | AGV Collisions: {team.agvCollisions1}</div>
                      <div className="font-bold text-orange-500 mt-2 mb-1">Objective 2</div>
                      <div>Defective Circle: {team.defectiveCircle} | Triangle: {team.defectiveTriangle} | Square: {team.defectiveSquare}</div>
                      <div>Wrong Bin: {team.wrongBin} | Functional in Bin: {team.functionalInBin} | Red X Recycled: {team.redXRecycled ? 'Yes' : 'No'}</div>
                      <div className="font-bold text-orange-500 mt-2 mb-1">Objective 3</div>
                      <div>Series Cells: {team.seriesCells} | Stack 2nd: {team.stack2} | Stack 3rd: {team.stack3} | Stack More: {team.stackMore}</div>
                      <div className="font-bold text-orange-500 mt-2 mb-1">Objective 4</div>
                      <div>Covers: {team.covers} | Robot Returned: {team.robotReturned ? 'Yes' : 'No'} | AGV Collisions: {team.agvCollisions4}</div>
                      <div className="font-bold text-orange-500 mt-2 mb-1">Penalties</div>
                      <div>Knockdown: {team.knockdown ? 'Yes' : 'No'} | Sabotage: {team.sabotage ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Winner Announcement */}
            {matchTeams.some(team => 
              matchTeams.every(t => t.score !== 'Disqualified') &&
              Number(team.score) === Math.max(...matchTeams.map(t => t.score === 'Disqualified' ? -9999 : Number(t.score)))
            ) && (
              <div className="text-center mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-300">
                <div className="text-2xl font-bold text-yellow-700 animate-pulse">
                  🎉 Winner: {matchTeams.find(team => 
                    matchTeams.every(t => t.score !== 'Disqualified') &&
                    Number(team.score) === Math.max(...matchTeams.map(t => t.score === 'Disqualified' ? -9999 : Number(t.score)))
                  )?.team} 🎉
                </div>
              </div>
            )}
            
            <div className="text-center mt-6">
              <button onClick={() => setShowSummary(false)} className="px-8 py-3 bg-orange-500 text-white text-xl font-bold rounded-lg shadow hover:bg-orange-600 transition">Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-lg p-6 print:shadow-none print:border print:rounded-none">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">Leaderboard (Shared)</h2>
        {/* Filter and sort controls */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <label className="flex items-center gap-2">
            Round:
            <select value={filterRound} onChange={e => setFilterRound(e.target.value)} className="border p-1 rounded">
              <option value="">All</option>
              {uniqueRounds.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2">
            Submitter:
            <select value={filterSubmitter} onChange={e => setFilterSubmitter(e.target.value)} className="border p-1 rounded">
              <option value="">All</option>
              {uniqueSubmitters.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2">
            Sort by:
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'score'|'time')} className="border p-1 rounded">
              <option value="score">Score</option>
              <option value="time">Time</option>
            </select>
          </label>
          <button type="button" onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')} className="px-2 py-1 border rounded bg-orange-100 text-orange-700">
            {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
          <button type="button" onClick={() => { setFilterRound(""); setFilterSubmitter(""); }} className="ml-2 px-2 py-1 border rounded bg-gray-100 text-gray-700">Clear Filters</button>
        </div>
        {loading ? <div>Loading...</div> : (
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-2">Team</th>
                <th className="p-2">Score</th>
                <th className="p-2">Time</th>
                <th className="p-2">Round</th>
                <th className="p-2">Submitter</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((entry, idx) => (
                <tr key={entry.id || idx} className={entry.score === 'Disqualified' ? 'bg-red-100 text-red-700' : idx === 0 ? 'bg-yellow-100 font-bold' : ''}>
                  <td className="p-2">{entry.team}</td>
                  <td className="p-2">{entry.score}</td>
                  <td className="p-2">{entry.time}</td>
                  <td className="p-2">{entry.round}</td>
                  <td className="p-2">{entry.submitted_by}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => openEdit(entry)} className="text-blue-500 hover:text-blue-700" title="Edit"><span role="img" aria-label="edit">✏️</span></button>
                    <button onClick={() => openDelete(entry)} className="text-red-500 hover:text-red-700" title="Delete"><span role="img" aria-label="delete">🗑️</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Edit Modal */}
      {editEntry && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative animate-pop">
            <button onClick={closeEdit} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-500">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-orange-600">Edit Team Score</h2>
            <form onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <input name="team" value={editForm.team} onChange={handleEditChange} placeholder="Team Name/Number" className="border p-2 rounded w-full md:w-1/2" required />
                <select name="round" value={editForm.round} onChange={handleEditChange} className="border p-2 rounded w-full md:w-1/4" required>
                  <option value="Round 1">Round 1</option>
                  <option value="Round 2">Round 2</option>
                  <option value="Round 3">Round 3</option>
                  <option value="Finals">Finals</option>
                </select>
                <input name="submitted_by" value={editForm.submitted_by} onChange={handleEditChange} placeholder="Manager Name or Email" className="border p-2 rounded w-full md:w-1/4" required />
              </div>
              {/* Objective 1 */}
              <div className="flex gap-4 mb-2">
                <label className="flex flex-col">Trays (+3)
                  <input type="number" name="trays" min={0} value={editForm.trays} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Cases (+1)
                  <input type="number" name="cases" min={0} value={editForm.cases} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">AGV Collisions (−2)
                  <input type="number" name="agvCollisions1" min={0} value={editForm.agvCollisions1} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
              </div>
              {/* Objective 2 */}
              <div className="flex gap-4 mb-2 flex-wrap">
                <label className="flex flex-col">Circle (+1)
                  <input type="number" name="defectiveCircle" min={0} value={editForm.defectiveCircle} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Triangle (+2)
                  <input type="number" name="defectiveTriangle" min={0} value={editForm.defectiveTriangle} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Square (+3)
                  <input type="number" name="defectiveSquare" min={0} value={editForm.defectiveSquare} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Wrong Bin (−1)
                  <input type="number" name="wrongBin" min={0} value={editForm.wrongBin} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Functional in Bin (−2)
                  <input type="number" name="functionalInBin" min={0} value={editForm.functionalInBin} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex items-center gap-2 mt-6 font-medium text-red-600">
                  <input type="checkbox" name="redXRecycled" checked={editForm.redXRecycled} onChange={handleEditChange} /> Red X Battery Recycled (−5)
                </label>
              </div>
              {/* Objective 3 */}
              <div className="flex gap-4 mb-2 flex-wrap">
                <label className="flex flex-col">Series Cells (+2 each)
                  <input type="number" name="seriesCells" min={0} value={editForm.seriesCells} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Stack 2nd Layer (+3 each)
                  <input type="number" name="stack2" min={0} value={editForm.stack2} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Stack 3rd Layer (+4 each)
                  <input type="number" name="stack3" min={0} value={editForm.stack3} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">Stack More (+5 each)
                  <input type="number" name="stackMore" min={0} value={editForm.stackMore} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
              </div>
              {/* Objective 4 */}
              <div className="flex gap-4 mb-2 flex-wrap">
                <label className="flex flex-col">Covers (+3 each)
                  <input type="number" name="covers" min={0} value={editForm.covers} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex items-center gap-2 mt-6">
                  <input type="checkbox" name="robotReturned" checked={editForm.robotReturned} onChange={handleEditChange} /> Robot Returned (+3)
                </label>
                <label className="flex flex-col">AGV Collisions (−2)
                  <input type="number" name="agvCollisions4" min={0} value={editForm.agvCollisions4} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
              </div>
              {/* Penalties */}
              <div className="flex gap-4 mb-2 flex-wrap">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="knockdown" checked={editForm.knockdown} onChange={handleEditChange} /> Knockdown Another Team (−5)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="sabotage" checked={editForm.sabotage} onChange={handleEditChange} /> Sabotage (DQ)
                </label>
              </div>
              <div className="mt-6 flex gap-4 justify-end">
                <button type="button" onClick={closeEdit} className="px-6 py-2 bg-gray-300 text-gray-700 rounded font-bold">Cancel</button>
                <button type="submit" className="px-8 py-2 bg-orange-500 text-white text-xl font-bold rounded-lg shadow hover:bg-orange-600 transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      {deleteEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-pop">
            <button onClick={closeDelete} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-orange-500">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-red-600">Delete Team Score</h2>
            <div className="mb-4">Are you sure you want to delete <span className="font-bold">{deleteEntry.team}</span>'s score for <span className="font-bold">{deleteEntry.round}</span>?</div>
            <div className="flex gap-4 justify-end">
              <button onClick={closeDelete} className="px-6 py-2 bg-gray-300 text-gray-700 rounded font-bold">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-8 py-2 bg-red-500 text-white text-xl font-bold rounded-lg shadow hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 