// Utility to clear localStorage safely
console.log('🧹 Clearing localStorage to fix theme parsing errors...');

// List current localStorage items
console.log('Current localStorage items:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`  ${key}: ${value}`);
}

// Clear all localStorage
localStorage.clear();

console.log('✅ localStorage cleared! Please refresh the page.');
console.log('🎨 Theme will be reset to default (light mode).');