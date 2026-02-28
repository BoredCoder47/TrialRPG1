// src/engine/cooldowns.js

// Decrement entity cooldowns and remove expired ones
export function tickCooldownsForEntity(ent) {
  if (!ent || !ent._cooldowns) return;

  for (const key of Object.keys(ent._cooldowns)) {
    const v = Number(ent._cooldowns[key]) || 0;
    if (v <= 0) {
      delete ent._cooldowns[key];
    } else {
      const next = Math.max(0, v - 1);
      if (next === 0) delete ent._cooldowns[key];
      else ent._cooldowns[key] = next;
    }
  }
}

// Apply cooldown to an entity key
export function setCooldownOnEntity(ent, key, cooldown) {
  if (!ent || !key) return;

  const cd = Number(cooldown) || 0;
  if (cd <= 0) return;

  ent._cooldowns = ent._cooldowns || {};
  ent._cooldowns[key] = Math.max(0, Math.floor(cd));
}

// Get remaining cooldown (0 if none)
export function getCooldown(ent, key) {
  if (!ent || !ent._cooldowns) return 0;
  return Number(ent._cooldowns[key]) || 0;
}