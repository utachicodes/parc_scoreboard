"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import { supabase } from '@/services/supabaseClient';

// Timer durations in seconds
const DURATIONS = [60, 60, 30];

type TechScoreForm = {
  team: string;
  round: string;
  submitted_by: string;
  phosphateRocks: number[];
  largePhosphateRock: boolean;
  overLimit: number[];
  robotOversize: boolean;
  sulfuricAcid: number[];
  ammonia: number[];
  defectiveAcid: number[];
  defectiveAmmonia: number[];
  mapProduced: number;
  dapProduced: number;
  correctDeliveries: number;
  wrongDeliveries: number;
};

type LeaderboardEntry = TechScoreForm & {
  id?: string;
  score: number | string;
  time: string;
};

const initialForm: TechScoreForm = {
  team: "",
  round: "Round 1",
  submitted_by: "",
  // Obj 1
  phosphateRocks: [0, 0, 0, 0], // 4 containers
  largePhosphateRock: false,
  overLimit: [0, 0, 0, 0],
  robotOversize: false,
  // Obj 2
  sulfuricAcid: [0, 0, 0, 0],
  ammonia: [0, 0, 0, 0],
  defectiveAcid: [0, 0, 0, 0],
  defectiveAmmonia: [0, 0, 0, 0],
  mapProduced: 0,
  dapProduced: 0,
  // Obj 3
  correctDeliveries: 0,
  wrongDeliveries: 0,
};

function calculateScore(form: TechScoreForm): number | string {
  if (form.robotOversize) return "Disqualified";
  let score = 0;
  // Obj 1
  for (let i = 0; i < 4; i++) {
    score += form.phosphateRocks[i] * 2;
    score -= form.overLimit[i] * 3;
  }
  if (form.largePhosphateRock) score += 5;
  // Obj 2
  for (let i = 0; i < 4; i++) {
    score += form.sulfuricAcid[i] * 2;
    score += form.ammonia[i] * 2;
    score -= form.defectiveAcid[i] * 2;
    score -= form.defectiveAmmonia[i] * 2;
  }
  score += form.mapProduced * 3;
  score += form.dapProduced * 4;
  // Obj 3
  score += form.correctDeliveries * 5;
  score -= form.wrongDeliveries * 3;
  return score;
}

export default function TechScoringPage() {
  const [form, setForm] = useState<TechScoreForm>(initialForm);
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
  const [editForm, setEditForm] = useState<TechScoreForm|null>(null);

  // Fetch leaderboard from API
  useEffect(() => {
    setLoading(true);
    // Initial fetch
    supabase
      .from('tech_scores')
      .select('*')
      .order('createdAt', { ascending: false })
      .then(({ data }) => {
        setLeaderboard(data || []);
        setLoading(false);
      });
    // Real-time subscription
    const channel = supabase
      .channel('tech_scores_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tech_scores' },
        payload => {
          // Refetch leaderboard on any change
          supabase
            .from('tech_scores')
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, dataset } = e.target;
    if (name.startsWith("phosphateRocks") || name.startsWith("overLimit") || name.startsWith("sulfuricAcid") || name.startsWith("ammonia") || name.startsWith("defectiveAcid") || name.startsWith("defectiveAmmonia")) {
      const idx = Number(dataset.idx);
      setForm(f => ({ ...f, [name]: (f[name as keyof TechScoreForm] as number[]).map((v, i) => i === idx ? Number(value) : v) }));
    } else if (type === "checkbox") {
      setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/tech-scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, score, time: new Date().toLocaleTimeString() }),
    });
    // Find the two most recent teams for this round
    const res = await fetch("/api/tech-scores");
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
    await fetch('/api/tech-scores', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editEntry.id, ...editForm, score: calculateScore(editForm) }),
    });
    closeEdit();
  }
  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, dataset } = e.target;
    if (!editForm) return;
    if (name.startsWith("phosphateRocks") || name.startsWith("overLimit") || name.startsWith("sulfuricAcid") || name.startsWith("ammonia") || name.startsWith("defectiveAcid") || name.startsWith("defectiveAmmonia")) {
      const idx = Number(dataset.idx);
      setEditForm(f => f ? { ...f, [name]: (f[name as keyof TechScoreForm] as number[]).map((v, i) => i === idx ? Number(value) : v) } : f);
    } else if (type === "checkbox") {
      setEditForm(f => f ? { ...f, [name]: (e.target as HTMLInputElement).checked } : f);
    } else {
      setEditForm(f => f ? { ...f, [name]: value } : f);
    }
  }
  // Delete handlers
  function openDelete(entry: LeaderboardEntry) { setDeleteEntry(entry); }
  function closeDelete() { setDeleteEntry(null); }
  async function handleDeleteConfirm() {
    if (!deleteEntry) return;
    await fetch('/api/tech-scores', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteEntry.id }),
    });
    closeDelete();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-orange-600 text-center">TECH League Scoring Form</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <input name="team" value={form.team} onChange={handleChange} placeholder="Team Name/Number" className="border p-2 rounded w-full md:w-1/2" required />
          <select name="round" value={form.round} onChange={handleChange} className="border p-2 rounded w-full md:w-1/4" required>
            <option value="Round 1">Round 1</option>
            <option value="Round 2">Round 2</option>
            <option value="Round 3">Round 3</option>
            <option value="Finals">Finals</option>
          </select>
          <input name="submitted_by" value={form.submitted_by} onChange={handleChange} placeholder="Manager Name or Email" className="border p-2 rounded w-full md:w-1/4" required />
        </div>

        {/* Objective 1: Mining & Transport */}
        <h2 className="text-xl font-semibold mb-2 mt-6 text-orange-500">Objective 1: Mining & Transport of Phosphate Rocks <span className='text-sm text-gray-500'>(1 min)</span></h2>
        <div className="mb-2 text-gray-700">Extract and transport phosphate rocks to containers in the mixing zone. Max 3 per container. Large rock bonus. Over limit penalty.</div>
        <label className="flex items-center gap-2 font-medium text-red-600 mb-4">
          <input type="checkbox" name="robotOversize" checked={form.robotOversize} onChange={handleChange} /> Robot Oversized (DQ)
        </label>
        <div className="mb-2 font-semibold">Phosphate Rocks in Containers (max 3 per):</div>
        {[0,1,2,3].map(i => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <span>Container {i+1}:</span>
            <input type="number" name="phosphateRocks" data-idx={i} min={0} max={10} value={form.phosphateRocks[i]} onChange={handleChange} className="border p-1 rounded w-16" />
            <span>Over Limit:</span>
            <input type="number" name="overLimit" data-idx={i} min={0} max={10} value={form.overLimit[i]} onChange={handleChange} className="border p-1 rounded w-16" />
          </div>
        ))}
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" name="largePhosphateRock" checked={form.largePhosphateRock} onChange={handleChange} /> Large Phosphate Rock Placed (+5)
        </label>

        {/* Objective 2: Chemical Processing & Fertilizer Formation */}
        <h2 className="text-xl font-semibold mb-2 mt-6 text-blue-500">Objective 2: Chemical Processing & Fertilizer Formation <span className='text-sm text-gray-500'>(1 min)</span></h2>
        <div className="mb-2 text-gray-700">Add 2 sulfuric acids (S discs) and ammonia (A discs) to each container. Avoid defective discs. Produce MAP/DAP. Defective penalty.</div>
        <div className="mb-2 font-semibold">Sulfuric Acid, Ammonia, Defective Discs per Container:</div>
        {[0,1,2,3].map(i => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <span>Container {i+1}:</span>
            <input type="number" name="sulfuricAcid" data-idx={i} min={0} max={10} value={form.sulfuricAcid[i]} onChange={handleChange} className="border p-1 rounded w-16" placeholder="S" />
            <input type="number" name="ammonia" data-idx={i} min={0} max={10} value={form.ammonia[i]} onChange={handleChange} className="border p-1 rounded w-16" placeholder="A" />
            <input type="number" name="defectiveAcid" data-idx={i} min={0} max={10} value={form.defectiveAcid[i]} onChange={handleChange} className="border p-1 rounded w-16" placeholder="Def S" />
            <input type="number" name="defectiveAmmonia" data-idx={i} min={0} max={10} value={form.defectiveAmmonia[i]} onChange={handleChange} className="border p-1 rounded w-16" placeholder="Def A" />
          </div>
        ))}
        <div className="flex gap-4 mt-4">
          <label className="flex flex-col">MAP Produced (+3 each)
            <input type="number" name="mapProduced" min={0} value={form.mapProduced} onChange={handleChange} className="border p-1 rounded" />
          </label>
          <label className="flex flex-col">DAP Produced (+4 each)
            <input type="number" name="dapProduced" min={0} value={form.dapProduced} onChange={handleChange} className="border p-1 rounded" />
          </label>
        </div>

        {/* Objective 3: Shipping */}
        <h2 className="text-xl font-semibold mb-2 mt-6 text-green-600">Objective 3: Transport & Ship Fertilizer <span className='text-sm text-gray-500'>(30 sec)</span></h2>
        <div className="mb-2 text-gray-700">Move containers to correct shipping zone (MAP, DAP, Unfinished). Correct delivery bonus. Wrong area penalty.</div>
        <div className="mb-2 font-semibold">Shipping:</div>
        <label className="flex flex-col mb-2">Correct Deliveries (+5 each)
          <input type="number" name="correctDeliveries" min={0} value={form.correctDeliveries} onChange={handleChange} className="border p-1 rounded" />
        </label>
        <label className="flex flex-col mb-2">Wrong Deliveries (−3 each)
          <input type="number" name="wrongDeliveries" min={0} value={form.wrongDeliveries} onChange={handleChange} className="border p-1 rounded" />
        </label>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-2xl font-bold text-orange-600">Total Score: <span className={score === "Disqualified" ? "text-red-600" : ""}>{score}</span></div>
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
                      <div>Phosphate Rocks: {team.phosphateRocks.join(', ')} | Large Rock: {team.largePhosphateRock ? 'Yes' : 'No'} | Over Limit: {team.overLimit.join(', ')}</div>
                      <div className="font-bold text-orange-500 mt-2 mb-1">Objective 2</div>
                      <div>Sulfuric Acid: {team.sulfuricAcid.join(', ')} | Ammonia: {team.ammonia.join(', ')} | Defective Acid: {team.defectiveAcid.join(', ')} | Defective Ammonia: {team.defectiveAmmonia.join(', ')}</div>
                      <div>MAP: {team.mapProduced} | DAP: {team.dapProduced}</div>
                      <div className="font-bold text-orange-500 mt-2 mb-1">Objective 3</div>
                      <div>Correct Deliveries: {team.correctDeliveries} | Wrong Deliveries: {team.wrongDeliveries}</div>
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
      <div className="bg-white rounded-xl shadow-lg p-6">
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
                <tr key={entry.id || idx} className={entry.score === "Disqualified" ? "bg-red-100 text-red-700" : idx === 0 ? "bg-yellow-100 font-bold" : ""}>
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
              {/* Reuse the form fields, but with editForm and handleEditChange */}
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
              <div className="mb-2 font-semibold">Phosphate Rocks in Containers (max 3 per):</div>
              {[0,1,2,3].map(i => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <span>Container {i+1}:</span>
                  <input type="number" name="phosphateRocks" data-idx={i} min={0} max={10} value={editForm.phosphateRocks[i]} onChange={handleEditChange} className="border p-1 rounded w-16" />
                  <span>Over Limit:</span>
                  <input type="number" name="overLimit" data-idx={i} min={0} max={10} value={editForm.overLimit[i]} onChange={handleEditChange} className="border p-1 rounded w-16" />
                </div>
              ))}
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" name="largePhosphateRock" checked={editForm.largePhosphateRock} onChange={handleEditChange} /> Large Phosphate Rock Placed (+5)
              </label>
              {/* Objective 2 */}
              <div className="mb-2 font-semibold mt-4">Sulfuric Acid, Ammonia, Defective Discs per Container:</div>
              {[0,1,2,3].map(i => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <span>Container {i+1}:</span>
                  <input type="number" name="sulfuricAcid" data-idx={i} min={0} max={10} value={editForm.sulfuricAcid[i]} onChange={handleEditChange} className="border p-1 rounded w-16" placeholder="S" />
                  <input type="number" name="ammonia" data-idx={i} min={0} max={10} value={editForm.ammonia[i]} onChange={handleEditChange} className="border p-1 rounded w-16" placeholder="A" />
                  <input type="number" name="defectiveAcid" data-idx={i} min={0} max={10} value={editForm.defectiveAcid[i]} onChange={handleEditChange} className="border p-1 rounded w-16" placeholder="Def S" />
                  <input type="number" name="defectiveAmmonia" data-idx={i} min={0} max={10} value={editForm.defectiveAmmonia[i]} onChange={handleEditChange} className="border p-1 rounded w-16" placeholder="Def A" />
                </div>
              ))}
              <div className="flex gap-4 mt-4">
                <label className="flex flex-col">MAP Produced (+3 each)
                  <input type="number" name="mapProduced" min={0} value={editForm.mapProduced} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
                <label className="flex flex-col">DAP Produced (+4 each)
                  <input type="number" name="dapProduced" min={0} value={editForm.dapProduced} onChange={handleEditChange} className="border p-1 rounded" />
                </label>
              </div>
              {/* Objective 3 */}
              <div className="mb-2 font-semibold mt-4">Shipping:</div>
              <label className="flex flex-col mb-2">Correct Deliveries (+5 each)
                <input type="number" name="correctDeliveries" min={0} value={editForm.correctDeliveries} onChange={handleEditChange} className="border p-1 rounded" />
              </label>
              <label className="flex flex-col mb-2">Wrong Deliveries (−3 each)
                <input type="number" name="wrongDeliveries" min={0} value={editForm.wrongDeliveries} onChange={handleEditChange} className="border p-1 rounded" />
              </label>
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