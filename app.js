// Sample data - in a real app, this could come from an API or local storage
const suggestions = [
    { icon: '📧', title: 'Email', subtitle: 'Open Mail', keywords: 'email mail message inbox' },
    { icon: '🎵', title: 'Music', subtitle: 'Play songs', keywords: 'music spotify apple songs audio' },
    { icon: '📱', title: 'Messages', subtitle: 'Send text', keywords: 'messages sms text imessage chat' },
    { icon: '📷', title: 'Camera', subtitle: 'Take photo', keywords: 'camera photo picture snapshot' },
    { icon: '🗺️', title: 'Maps', subtitle: 'Navigation', keywords: 'maps navigation directions gps location' },
    { icon: '☁️', title: 'Weather', subtitle: 'Check forecast', keywords: 'weather forecast temperature climate' },
    { icon: '📅', title: 'Calendar', subtitle: 'View events', keywords: 'calendar events schedule meetings' },
    { icon: '⚙️', title: 'Settings', subtitle: 'Preferences', keywords: 'settings preferences config options' },
    { icon: '🔍', title: 'Safari', subtitle: 'Browse web', keywords: 'safari browser web internet chrome' },
    { icon: '💬', title: 'Slack', subtitle: 'Team chat', keywords: 'slack chat team communication work' },
    { icon: '📝', title: 'Notes', subtitle: 'Take notes', keywords: 'notes notepad writing memos' },
    { icon: '📊', title: 'Stocks', subtitle: 'Market data', keywords: 'stocks market finance trading investing' },
    { icon: '🎮', title: 'Games', subtitle: 'Play games', keywords: 'games gaming entertainment fun' },
    { icon: '📚', title: 'Books', subtitle: 'Read ebooks', keywords: 'books reading library kindle ebooks' },
    { icon: '🎨', title: 'Photos', subtitle: 'View photos', keywords: 'photos pictures gallery images albums' },
    { icon: '🎬', title: 'Videos', subtitle: 'Watch videos', keywords: 'videos movies films youtube netflix' },
    { icon: '💰', title: 'Wallet', subtitle: 'Payments', keywords: 'wallet payments money finance banking' },
    { icon: '🏃', title: 'Fitness', subtitle: 'Track activity', keywords: 'fitness health exercise workout gym' },
    { icon: '🎧', title: 'Podcasts', subtitle: 'Listen', keywords: 'podcasts audio shows listening' },
    { icon: '📰', title: 'News', subtitle: 'Read news', keywords: 'news articles headlines media' },
];

// Fuzzy search algorithm
function fuzzyMatch(pattern, text) {
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();

    let patternIdx = 0;
    let textIdx = 0;
    let score = 0;
    let matches = [];

    while (patternIdx < pattern.length && textIdx < text.length) {
        const patternChar = pattern[patternIdx];
        const textChar = text[textIdx];

        if (patternChar === textChar) {
            matches.push(textIdx);
            // Bonus for consecutive matches
            if (matches.length > 1 && matches[matches.length - 1] === matches[matches.length - 2] + 1) {
                score += 10;
            }
            score += 5;
            patternIdx++;
        }
        textIdx++;
    }

    // If we didn't match all pattern characters, it's not a match
    if (patternIdx !== pattern.length) {
        return null;
    }

    // Bonus for matching at the start
    if (matches[0] === 0) {
        score += 15;
    }

    // Penalty for longer distances between matches
    const matchSpread = matches[matches.length - 1] - matches[0];
    score -= matchSpread;

    return { score, matches };
}

function searchSuggestions(query) {
    if (!query.trim()) {
        return [];
    }

    const results = [];

    suggestions.forEach(suggestion => {
        const searchText = `${suggestion.title} ${suggestion.subtitle} ${suggestion.keywords}`;
        const match = fuzzyMatch(query, searchText);

        if (match) {
            results.push({
                ...suggestion,
                score: match.score,
                matches: match.matches
            });
        }
    });

    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);

    // Return top 10 results
    return results.slice(0, 10);
}

function highlightMatches(text, query) {
    const match = fuzzyMatch(query, text);
    if (!match) return text;

    let result = '';
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();

    let queryIdx = 0;
    for (let i = 0; i < text.length; i++) {
        if (queryIdx < queryLower.length && textLower[i] === queryLower[queryIdx]) {
            result += `<span class="suggestion-match">${text[i]}</span>`;
            queryIdx++;
        } else {
            result += text[i];
        }
    }

    return result;
}

function renderSuggestions(results) {
    const container = document.getElementById('suggestions');
    const query = document.getElementById('searchInput').value;

    if (results.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = results.map(result => `
        <div class="suggestion-bubble" data-title="${result.title}">
            <div class="suggestion-icon">${result.icon}</div>
            <div class="suggestion-title">${highlightMatches(result.title, query)}</div>
            <div class="suggestion-subtitle">${result.subtitle}</div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.suggestion-bubble').forEach(bubble => {
        bubble.addEventListener('click', () => {
            const title = bubble.dataset.title;
            alert(`Opening ${title}...`);
            // In a real app, this would trigger the actual action
        });
    });
}

// Main search handler
function handleSearch(event) {
    const query = event.target.value;
    const results = searchSuggestions(query);
    renderSuggestions(results);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');

    // Focus on input when page loads
    searchInput.focus();

    // Search as user types
    searchInput.addEventListener('input', handleSearch);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // CMD/Ctrl + K to focus search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }

        // Escape to clear
        if (e.key === 'Escape') {
            searchInput.value = '';
            renderSuggestions([]);
            searchInput.blur();
        }
    });
});
