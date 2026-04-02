const express = require('express');
const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const router = express.Router();

// GET /api/resources
router.get('/', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️  Database not connected, using fallback resources');
      return res.json(getFallbackResources());
    }

    // Try to find existing resources
    let resources = await Resource.find().sort({ createdAt: -1 });
    
    // If no resources exist, create sample resources
    if (resources.length === 0) {
      console.log('No resources found, creating sample resources...');
      try {
        const sampleResources = [
          {
            title: 'Ocean Waves Meditation',
            type: 'audio',
            description: 'Listen to calming ocean sounds for deep relaxation',
            category: 'Audio',
            icon: 'headset-outline',
            gradient: ['#6A0DAD', '#9D4EDD'],
            duration: '10 min',
            difficulty: 'Beginner',
            contentUrl: 'https://example.com/ocean-waves.mp3',
            tags: ['relaxation', 'meditation', 'ocean', 'sleep']
          },
          {
            title: 'Forest Rain Sounds',
            type: 'audio',
            description: 'Peaceful rain sounds in a forest setting',
            category: 'Audio',
            icon: 'headset-outline',
            gradient: ['#6A0DAD', '#9D4EDD'],
            duration: '20 min',
            difficulty: 'Beginner',
            contentUrl: 'https://example.com/forest-rain.mp3',
            tags: ['nature', 'rain', 'forest', 'calm']
          },
          {
            title: 'Guided Mindfulness',
            type: 'audio',
            description: 'Expert-led mindfulness meditation session',
            category: 'Audio',
            icon: 'headset-outline',
            gradient: ['#6A0DAD', '#9D4EDD'],
            duration: '15 min',
            difficulty: 'Intermediate',
            contentUrl: 'https://example.com/mindfulness.mp3',
            tags: ['mindfulness', 'guided', 'meditation']
          },
          {
            title: '4-7-8 Breathing',
            type: 'breathing',
            description: 'Powerful breathing technique to reduce anxiety',
            category: 'Breathing',
            icon: 'leaf-outline',
            gradient: ['#9D4EDD', '#C77DFF'],
            duration: '5 min',
            difficulty: 'Beginner',
            contentUrl: 'https://example.com/478-breathing',
            tags: ['breathing', 'anxiety', 'stress-relief']
          },
          {
            title: 'Box Breathing',
            type: 'breathing',
            description: 'Military-grade breathing for focus and calm',
            category: 'Breathing',
            icon: 'leaf-outline',
            gradient: ['#9D4EDD', '#C77DFF'],
            duration: '8 min',
            difficulty: 'Intermediate',
            contentUrl: 'https://example.com/box-breathing',
            tags: ['breathing', 'focus', 'military', 'concentration']
          },
          {
            title: 'Belly Breathing',
            type: 'breathing',
            description: 'Deep diaphragmatic breathing for relaxation',
            category: 'Breathing',
            icon: 'leaf-outline',
            gradient: ['#9D4EDD', '#C77DFF'],
            duration: '6 min',
            difficulty: 'Beginner',
            contentUrl: 'https://example.com/belly-breathing',
            tags: ['breathing', 'relaxation', 'deep-breathing']
          },
          {
            title: 'Managing Anxiety',
            type: 'video',
            description: 'Expert psychologist explains anxiety management',
            category: 'Video',
            icon: 'play-circle-outline',
            gradient: ['#C77DFF', '#E0AAFF'],
            duration: '25 min',
            difficulty: 'Intermediate',
            contentUrl: 'https://example.com/anxiety-management.mp4',
            tags: ['anxiety', 'psychology', 'coping', 'expert']
          },
          {
            title: 'Stress Relief Techniques',
            type: 'video',
            description: 'Practical techniques to manage daily stress',
            category: 'Video',
            icon: 'play-circle-outline',
            gradient: ['#C77DFF', '#E0AAFF'],
            duration: '18 min',
            difficulty: 'Beginner',
            contentUrl: 'https://example.com/stress-relief.mp4',
            tags: ['stress', 'techniques', 'daily-life', 'practical']
          },
          {
            title: 'Understanding Depression',
            type: 'video',
            description: 'Educational video about depression and recovery',
            category: 'Video',
            icon: 'play-circle-outline',
            gradient: ['#C77DFF', '#E0AAFF'],
            duration: '30 min',
            difficulty: 'Advanced',
            contentUrl: 'https://example.com/depression-understanding.mp4',
            tags: ['depression', 'education', 'recovery', 'mental-health']
          },
          {
            title: 'Sleep Stories',
            type: 'sleep',
            description: 'Calming bedtime stories for better sleep',
            category: 'Sleep',
            icon: 'moon-outline',
            gradient: ['#E0AAFF', '#F3E8FF'],
            duration: '30 min',
            difficulty: 'Beginner',
            contentUrl: 'https://example.com/sleep-stories.mp3',
            tags: ['sleep', 'stories', 'bedtime', 'relaxation']
          },
          {
            title: 'Progressive Muscle Relaxation',
            type: 'sleep',
            description: 'Systematic muscle relaxation for deep sleep',
            category: 'Sleep',
            icon: 'moon-outline',
            gradient: ['#E0AAFF', '#F3E8FF'],
            duration: '20 min',
            difficulty: 'Intermediate',
            contentUrl: 'https://example.com/muscle-relaxation.mp3',
            tags: ['sleep', 'muscle-relaxation', 'progressive', 'deep-sleep']
          },
          {
            title: 'Night Time Meditation',
            type: 'sleep',
            description: 'Gentle meditation designed for bedtime',
            category: 'Sleep',
            icon: 'moon-outline',
            gradient: ['#E0AAFF', '#F3E8FF'],
            duration: '15 min',
            difficulty: 'Beginner',
            contentUrl: 'https://example.com/night-meditation.mp3',
            tags: ['sleep', 'meditation', 'bedtime', 'gentle']
          }
        ];

        resources = await Resource.insertMany(sampleResources);
        console.log(`Created ${resources.length} sample resources`);
      } catch (createError) {
        console.error('Failed to create sample resources:', createError.message);
        return res.json(getFallbackResources());
      }
    }
    
    res.json(resources);
  } catch (err) {
    console.error('Resources fetch error:', err.message);
    // Always provide fallback response
    res.json(getFallbackResources());
  }
});

// GET /api/resources/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }

    const resource = await Resource.findById(id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    res.json(resource);
  } catch (err) {
    console.error('Resource fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch resource' });
  }
});

// GET /api/resources/category/:category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    if (mongoose.connection.readyState !== 1) {
      const fallback = getFallbackResources().filter(r => 
        r.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(fallback);
    }

    const resources = await Resource.find({ 
      category: new RegExp(category, 'i') 
    }).sort({ createdAt: -1 });
    
    res.json(resources);
  } catch (err) {
    console.error('Category resources fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch category resources' });
  }
});

// Fallback resources function
function getFallbackResources() {
  return [
    {
      _id: 'fallback-1',
      title: 'Relaxation Audio',
      type: 'audio',
      description: 'Listen to calming sounds and guided meditation',
      category: 'Audio',
      icon: 'headset-outline',
      gradient: ['#6A0DAD', '#9D4EDD'],
      duration: '5-30 min',
      difficulty: 'Beginner',
      tags: ['relaxation', 'meditation', 'audio'],
      source: 'fallback'
    },
    {
      _id: 'fallback-2',
      title: 'Breathing Exercises',
      type: 'breathing',
      description: 'Follow breathing techniques to reduce stress',
      category: 'Breathing',
      icon: 'leaf-outline',
      gradient: ['#9D4EDD', '#C77DFF'],
      duration: '3-10 min',
      difficulty: 'Beginner',
      tags: ['breathing', 'stress-relief', 'techniques'],
      source: 'fallback'
    },
    {
      _id: 'fallback-3',
      title: 'Stress Management Videos',
      type: 'video',
      description: 'Watch expert videos to manage anxiety',
      category: 'Video',
      icon: 'play-circle-outline',
      gradient: ['#C77DFF', '#E0AAFF'],
      duration: '10-45 min',
      difficulty: 'Intermediate',
      tags: ['stress', 'anxiety', 'video', 'expert'],
      source: 'fallback'
    },
    {
      _id: 'fallback-4',
      title: 'Sleep Support',
      type: 'sleep',
      description: 'Improve sleep quality with guided content',
      category: 'Sleep',
      icon: 'moon-outline',
      gradient: ['#E0AAFF', '#F3E8FF'],
      duration: '15-60 min',
      difficulty: 'Beginner',
      tags: ['sleep', 'relaxation', 'guided'],
      source: 'fallback'
    }
  ];
}

module.exports = router;