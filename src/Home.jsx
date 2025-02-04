import { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Tag, Edit, Trash, Plus, Search, ArrowUpDown } from 'lucide-react';
import NoteCardForm from './CardForm';
import NoteCard from './NoteCard';
import NewNoteCard from './NewNoteCard';


// Enhanced NotecardList component
const NotecardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'desc' });
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Load cards from localStorage
  useEffect(() => {
    const savedCards = localStorage.getItem('notecards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  // Save cards to localStorage
  useEffect(() => {
    localStorage.setItem('notecards', JSON.stringify(cards));
  }, [cards]);

  const categories = ['all', ...new Set(cards.map(card => card.category))];

  // Enhanced filtering with search
  const filteredCards = cards
    .filter(card => {
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      if (sortConfig.field === 'title') {
        return direction * a.title.localeCompare(b.title);
      } else if (sortConfig.field === 'category') {
        return direction * a.category.localeCompare(b.category);
      }
      return direction * (a.id - b.id);
    });

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSave = (cardData) => {
    if (editingCard) {
      setCards(cards.map(card => 
        card.id === editingCard.id 
          ? { ...cardData, id: card.id } 
          : card
      ));
      setEditingCard(null);
    } else {
      const newCard = {
        ...cardData,
        id: Date.now(),
      };
      setCards(prevCards => [...prevCards, newCard]);
      setIsAdding(false); // Immediately exit form after saving
    }
  };

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleCardClick = (card) => {
    setExpandedCardId(expandedCardId === card.id ? null : card.id);
  };

  const handleCardExpand = (card) => {
    setExpandedCard(card);
  };

  const handleCloseExpanded = () => {
    setExpandedCard(null);
  };
  

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Search and Controls Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 p-2 w-full border rounded"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleSort('title')}
              className="flex items-center gap-1 px-4 py-2 bg-gray-400 rounded hover:bg-purple-200"
            >
              <ArrowUpDown size={16} />
              Title
            </button>
            <button
              onClick={() => handleSort('category')}
              className="flex items-center gap-1 px-4 py-2 bg-gray-400 rounded hover:bg-red-200"
            >
              <ArrowUpDown size={16} />
              Category
            </button>
            <button
              onClick={() => handleSort('id')}
              className="flex items-center gap-1 px-4 py-2 bg-gray-400 rounded hover:bg-yellow-200"
            >
              <ArrowUpDown size={16} />
              Date
            </button>
          </div>
        </div>

        {/* Category Filters and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {!isAdding && !editingCard && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Plus size={16} />
              Add Card
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      {(isAdding || editingCard) && (
        <div className="mb-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{editingCard ? 'Edit Card' : 'Add New Card'}</CardTitle>
            </CardHeader>
            <CardContent>
              <NoteCardForm
                card={editingCard}
                onSave={handleSave}
                onCancel={() => {
                  setIsAdding(false);
                  setEditingCard(null);
                }}
              />
            </CardContent>
          </Card>
          <div className="w-full h-px bg-gray-200 my-4" />
        </div>
      )}

      {/* Cards List Section */}
      <div className="space-y-4">
        {filteredCards.map(card => (
          <NewNoteCard
            key={card.id}
            card={card}
            onClick={handleCardClick}
            onDelete={handleDelete}
            isExpanded={expandedCardId === card.id}
          />
        ))}
        {filteredCards.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No cards found. Try adjusting your search or filters.
          </div>
        )}
      </div>
      
    </div>
  );
};

export default NotecardList;