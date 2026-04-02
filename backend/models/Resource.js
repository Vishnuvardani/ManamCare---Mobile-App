const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['audio', 'breathing', 'video', 'sleep'],
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    default: 'library-outline'
  },
  gradient: {
    type: [String],
    required: true,
    default: ['#6A0DAD', '#9D4EDD']
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  contentUrl: {
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
resourceSchema.index({ type: 1 });
resourceSchema.index({ category: 1 });
resourceSchema.index({ difficulty: 1 });
resourceSchema.index({ tags: 1 });
resourceSchema.index({ isActive: 1 });
resourceSchema.index({ createdAt: -1 });

// Text search index
resourceSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text'
});

// Virtual for formatted duration
resourceSchema.virtual('formattedDuration').get(function() {
  return this.duration;
});

// Method to increment view count
resourceSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Method to update rating
resourceSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating * this.ratingCount) + newRating;
  this.ratingCount += 1;
  this.rating = totalRating / this.ratingCount;
  return this.save();
};

// Static method to find by category
resourceSchema.statics.findByCategory = function(category) {
  return this.find({ 
    category: new RegExp(category, 'i'),
    isActive: true 
  }).sort({ createdAt: -1 });
};

// Static method to find by type
resourceSchema.statics.findByType = function(type) {
  return this.find({ 
    type: type.toLowerCase(),
    isActive: true 
  }).sort({ createdAt: -1 });
};

// Static method to search resources
resourceSchema.statics.searchResources = function(query) {
  return this.find({
    $text: { $search: query },
    isActive: true
  }).sort({ score: { $meta: 'textScore' } });
};

// Pre-save middleware to ensure gradient array has at least 2 colors
resourceSchema.pre('save', function(next) {
  if (this.gradient.length < 2) {
    this.gradient = ['#6A0DAD', '#9D4EDD'];
  }
  next();
});

module.exports = mongoose.model('Resource', resourceSchema);